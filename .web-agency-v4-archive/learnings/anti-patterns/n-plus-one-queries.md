---
id: antipattern-008
severity: medium
tags: [performance, database, wordpress, php]
first_occurrence: 2024-03-05
occurrence_count: 3
---

# Anti-Pattern: Requêtes N+1 en Boucle

## Symptôme

**Comment détecter ce problème :**

- Page lente avec beaucoup de contenu
- Query Monitor montre 100+ requêtes
- Temps de réponse augmente avec le nombre d'items
- Database CPU élevé

**Exemple de manifestation :**

```php
// ❌ MAUVAIS - N+1 queries
$posts = get_posts(['numberposts' => 100]);

foreach ($posts as $post) {
    // +1 requête par post pour les metas
    $author = get_post_meta($post->ID, 'custom_author', true);
    $views = get_post_meta($post->ID, 'views_count', true);

    // +1 requête par post pour les termes
    $categories = wp_get_post_terms($post->ID, 'category');
}
// Résultat: 1 + (100 * 3) = 301 requêtes !
```

## Pourquoi c'est un Problème

### Impact Technique

- Temps de réponse exponentiel
- Surcharge base de données
- Time To First Byte (TTFB) dégradé
- Cache inefficace

### Impact Business

- **Utilisateurs impatients** quittent
- **SEO impacté** (Core Web Vitals)
- **Coûts serveur** augmentés

### Coût Typique

| Aspect | Coût estimé |
|--------|-------------|
| Impact performance | x10 à x100 |
| Debug | 2-4h |
| Refactoring | 4-8h |

## Solution

### Précharger les Post Metas

```php
<?php
/**
 * Solution: update_postmeta_cache
 */
$posts = get_posts([
    'numberposts' => 100,
    'suppress_filters' => false,
]);

// Précharger TOUS les metas en 1 requête
$post_ids = wp_list_pluck($posts, 'ID');
update_postmeta_cache($post_ids);

foreach ($posts as $post) {
    // Maintenant ces appels utilisent le cache (0 requête)
    $author = get_post_meta($post->ID, 'custom_author', true);
    $views = get_post_meta($post->ID, 'views_count', true);
}
// Résultat: 1 + 1 = 2 requêtes !
```

### Précharger les Termes

```php
<?php
/**
 * Solution: update_object_term_cache
 */
$posts = get_posts(['numberposts' => 100]);
$post_ids = wp_list_pluck($posts, 'ID');

// Précharger tous les termes en 1 requête
update_object_term_cache($post_ids, 'post');

foreach ($posts as $post) {
    // Utilise le cache (0 requête)
    $categories = wp_get_post_terms($post->ID, 'category');
}
```

### WP_Query avec Preloading Automatique

```php
<?php
/**
 * WP_Query précharge automatiquement avec les bons args
 */
$query = new WP_Query([
    'posts_per_page' => 100,
    'update_post_meta_cache' => true,  // Défaut: true
    'update_post_term_cache' => true,  // Défaut: true
]);

// Les metas et termes sont déjà en cache
while ($query->have_posts()) {
    $query->the_post();
    $meta = get_post_meta(get_the_ID(), 'key', true); // Pas de requête
}
```

### Requête Custom avec JOIN

```php
<?php
/**
 * Pour des cas complexes: requête custom
 */
global $wpdb;

$results = $wpdb->get_results("
    SELECT
        p.ID,
        p.post_title,
        pm_author.meta_value as custom_author,
        pm_views.meta_value as views_count
    FROM {$wpdb->posts} p
    LEFT JOIN {$wpdb->postmeta} pm_author
        ON p.ID = pm_author.post_id AND pm_author.meta_key = 'custom_author'
    LEFT JOIN {$wpdb->postmeta} pm_views
        ON p.ID = pm_views.post_id AND pm_views.meta_key = 'views_count'
    WHERE p.post_type = 'post' AND p.post_status = 'publish'
    LIMIT 100
");
// 1 seule requête !
```

### Transient pour Données Complexes

```php
<?php
/**
 * Cache des résultats complexes
 */
function get_posts_with_stats() {
    $cache_key = 'posts_with_stats';
    $cached = get_transient($cache_key);

    if ($cached !== false) {
        return $cached;
    }

    // Requête complexe
    $data = expensive_query();

    // Cache 1 heure
    set_transient($cache_key, $data, HOUR_IN_SECONDS);

    return $data;
}
```

## Prévention

### Checklist

- [ ] Query Monitor installé en dev
- [ ] Vérifier nombre de requêtes sur pages avec listes
- [ ] Utiliser `update_postmeta_cache()` si boucle manuelle
- [ ] Ne pas désactiver `update_post_meta_cache` sans raison
- [ ] Considérer transients pour données complexes

### Query Monitor

```php
// Installer et activer Query Monitor
// https://wordpress.org/plugins/query-monitor/

// Affiche un warning si > 50 requêtes
// et montre les requêtes dupliquées
```

### Debug Mode

```php
// Dans wp-config.php (local uniquement)
define('SAVEQUERIES', true);

// Puis dans le code
global $wpdb;
error_log(print_r($wpdb->queries, true));
```

## Occurrences Documentées

| Projet | Date | Impact | Résolution |
|--------|------|--------|------------|
| Client A | 2024-03-05 | Page archive 8s | update_postmeta_cache |
| Client B | 2024-06-18 | 500 requêtes/page | WP_Query args |
| Client C | 2024-09-22 | Timeout serveur | JOIN + transient |

## Voir Aussi

- [Pattern: e2e-critical-paths](../patterns/e2e-critical-paths.md)
- [Anti-pattern: missing-error-handling](./missing-error-handling.md)

## Références

- [Query Monitor](https://wordpress.org/plugins/query-monitor/)
- [WordPress Database API](https://developer.wordpress.org/plugins/database/)
- [update_postmeta_cache](https://developer.wordpress.org/reference/functions/update_postmeta_cache/)
