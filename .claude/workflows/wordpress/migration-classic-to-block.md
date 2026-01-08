---
name: wordpress-migration-classic-to-block
description: Processus de migration d'un thème classique vers un block theme FSE
triggers: [migration wordpress, classic to block, theme fse, moderniser theme wordpress]
skills: [wordpress, css, javascript]
roles: [fullstack-developer, frontend-developer]
---

# Workflow: Migration Classic Theme → Block Theme

## Objectif
Migrer un thème WordPress classique (PHP templates) vers un block theme moderne (FSE - Full Site Editing).

## Prérequis
- WordPress 6.0+
- Thème classique fonctionnel
- Backup complet du site
- Environnement de développement

## Durée Estimée
- Thème simple : 2-4 jours
- Thème moyen : 1-2 semaines
- Thème complexe : 2-4 semaines

## Étapes

### 1. Audit du Thème Existant
**Responsable**: Développeur
**Durée**: 2-4h

- [ ] Lister tous les templates PHP
- [ ] Identifier les zones de widgets
- [ ] Recenser les options Customizer
- [ ] Lister les shortcodes utilisés
- [ ] Identifier les hooks custom

**Output**: Document d'audit avec liste des éléments à migrer

#### Checklist Audit

| Élément | Fichier | Migration vers |
|---------|---------|----------------|
| header.php | ✓ | parts/header.html |
| footer.php | ✓ | parts/footer.html |
| sidebar.php | ✓ | Block ou Pattern |
| index.php | ✓ | templates/index.html |
| single.php | ✓ | templates/single.html |
| page.php | ✓ | templates/page.html |
| Customizer colors | ✓ | theme.json palette |
| Customizer fonts | ✓ | theme.json fontFamilies |
| Widgets | ✓ | Blocks ou Patterns |
| Menus | ✓ | Navigation block |

---

### 2. Créer la Structure Block Theme
**Responsable**: Développeur
**Durée**: 1-2h

- [ ] Créer les dossiers templates/, parts/, patterns/, styles/
- [ ] Créer theme.json de base
- [ ] Mettre à jour style.css
- [ ] Adapter functions.php

**Output**: Structure block theme vide

#### Structure Cible

```
mon-theme/
├── parts/
│   ├── header.html
│   ├── footer.html
│   └── sidebar.html
├── patterns/
│   ├── hero.php
│   └── cta.php
├── styles/
│   └── dark.json
├── templates/
│   ├── index.html
│   ├── single.html
│   ├── page.html
│   └── archive.html
├── functions.php
├── style.css
└── theme.json
```

---

### 3. Migrer les Styles vers theme.json
**Responsable**: Développeur
**Durée**: 2-4h

- [ ] Extraire la palette de couleurs
- [ ] Définir les font families
- [ ] Configurer les font sizes
- [ ] Définir les spacing
- [ ] Configurer le layout (contentSize, wideSize)

**Output**: theme.json avec design tokens

#### Avant (style.css + functions.php)

```css
:root {
    --primary-color: #0073aa;
    --secondary-color: #23282d;
    --font-main: 'Inter', sans-serif;
}
```

#### Après (theme.json)

```json
{
    "$schema": "https://schemas.wp.org/trunk/theme.json",
    "version": 3,
    "settings": {
        "color": {
            "palette": [
                { "slug": "primary", "color": "#0073aa", "name": "Primary" },
                { "slug": "secondary", "color": "#23282d", "name": "Secondary" }
            ]
        },
        "typography": {
            "fontFamilies": [
                {
                    "slug": "main",
                    "fontFamily": "'Inter', sans-serif",
                    "name": "Main"
                }
            ]
        },
        "layout": {
            "contentSize": "800px",
            "wideSize": "1200px"
        }
    }
}
```

---

### 4. Convertir Header et Footer
**Responsable**: Développeur
**Durée**: 2-4h

- [ ] Convertir header.php → parts/header.html
- [ ] Convertir footer.php → parts/footer.html
- [ ] Remplacer wp_nav_menu() par Navigation block
- [ ] Convertir logo/site title en blocks

**Output**: Header et footer en HTML blocks

#### Avant (header.php)

```php
<header class="site-header">
    <div class="logo">
        <?php the_custom_logo(); ?>
        <h1><?php bloginfo('name'); ?></h1>
    </div>
    <nav>
        <?php wp_nav_menu(['theme_location' => 'primary']); ?>
    </nav>
</header>
```

#### Après (parts/header.html)

```html
<!-- wp:group {"tagName":"header","className":"site-header","layout":{"type":"constrained"}} -->
<header class="wp-block-group site-header">
    <!-- wp:group {"layout":{"type":"flex","justifyContent":"space-between"}} -->
    <div class="wp-block-group">
        <!-- wp:site-logo /-->
        <!-- wp:site-title /-->
    </div>
    <!-- /wp:group -->
    <!-- wp:navigation /-->
</header>
<!-- /wp:group -->
```

---

### 5. Convertir les Templates
**Responsable**: Développeur
**Durée**: 4-8h

- [ ] Convertir index.php → templates/index.html
- [ ] Convertir single.php → templates/single.html
- [ ] Convertir page.php → templates/page.html
- [ ] Convertir archive.php → templates/archive.html

**Output**: Templates HTML avec blocks

#### Avant (single.php)

```php
<?php get_header(); ?>
<main>
    <?php while (have_posts()) : the_post(); ?>
        <article>
            <?php the_post_thumbnail(); ?>
            <h1><?php the_title(); ?></h1>
            <div class="meta"><?php the_date(); ?></div>
            <?php the_content(); ?>
        </article>
    <?php endwhile; ?>
</main>
<?php get_footer(); ?>
```

#### Après (templates/single.html)

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">
    <!-- wp:post-featured-image /-->
    <!-- wp:post-title {"level":1} /-->
    <!-- wp:post-date /-->
    <!-- wp:post-content {"layout":{"type":"constrained"}} /-->
    <!-- wp:post-terms {"term":"category"} /-->
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

---

### 6. Convertir les Widgets en Patterns/Blocks
**Responsable**: Développeur
**Durée**: 2-4h

- [ ] Identifier les widgets utilisés
- [ ] Créer des patterns équivalents
- [ ] Convertir sidebar en template part ou block

**Output**: Patterns PHP pour les anciens widgets

#### Créer un Pattern

```php
<?php
// patterns/sidebar-newsletter.php
/**
 * Title: Newsletter Sidebar
 * Slug: mon-theme/sidebar-newsletter
 * Categories: widgets
 */
?>
<!-- wp:group {"className":"widget-newsletter"} -->
<div class="wp-block-group widget-newsletter">
    <!-- wp:heading {"level":3} -->
    <h3>Newsletter</h3>
    <!-- /wp:heading -->
    <!-- wp:paragraph -->
    <p>Inscrivez-vous à notre newsletter</p>
    <!-- /wp:paragraph -->
    <!-- wp:buttons -->
    <div class="wp-block-buttons">
        <!-- wp:button -->
        <div class="wp-block-button"><a class="wp-block-button__link">S'inscrire</a></div>
        <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->
</div>
<!-- /wp:group -->
```

---

### 7. Migrer les Shortcodes vers Blocks
**Responsable**: Développeur
**Durée**: 2-8h (selon complexité)

- [ ] Lister tous les shortcodes
- [ ] Créer des blocks équivalents
- [ ] Ajouter transforms pour conversion automatique

**Output**: Blocks custom ou patterns remplaçant les shortcodes

#### Option 1: Block Custom (React)

```jsx
registerBlockType('mon-theme/cta-box', {
    title: 'CTA Box',
    attributes: {
        title: { type: 'string' },
        buttonText: { type: 'string' }
    },
    transforms: {
        from: [{
            type: 'shortcode',
            tag: 'cta_box',
            attributes: {
                title: { shortcode: ({named: {title}}) => title }
            }
        }]
    },
    // edit, save...
});
```

#### Option 2: Garder le Shortcode (transition)

```php
// Le shortcode continue de fonctionner dans les blocks
add_shortcode('cta_box', 'render_cta_box');
```

---

### 8. Tester et Valider
**Responsable**: Développeur + QA
**Durée**: 2-4h

- [ ] Tester toutes les pages
- [ ] Vérifier le responsive
- [ ] Tester l'éditeur de site (Site Editor)
- [ ] Vérifier les performances
- [ ] Valider avec le client

**Output**: Thème block validé

#### Checklist Tests

- [ ] Homepage s'affiche correctement
- [ ] Pages internes fonctionnent
- [ ] Articles single OK
- [ ] Archives OK
- [ ] 404 OK
- [ ] Recherche OK
- [ ] Navigation fonctionne
- [ ] Responsive mobile
- [ ] Site Editor accessible
- [ ] Patterns disponibles
- [ ] Styles globaux appliqués

---

### 9. Nettoyer et Documenter
**Responsable**: Développeur
**Durée**: 1-2h

- [ ] Supprimer les anciens fichiers PHP
- [ ] Nettoyer functions.php
- [ ] Mettre à jour README
- [ ] Documenter les patterns disponibles

**Output**: Thème propre et documenté

---

## Mapping de Conversion

| Élément Classic | Équivalent Block |
|-----------------|------------------|
| `get_header()` | `<!-- wp:template-part {"slug":"header"} /-->` |
| `get_footer()` | `<!-- wp:template-part {"slug":"footer"} /-->` |
| `the_title()` | `<!-- wp:post-title /-->` |
| `the_content()` | `<!-- wp:post-content /-->` |
| `the_excerpt()` | `<!-- wp:post-excerpt /-->` |
| `the_post_thumbnail()` | `<!-- wp:post-featured-image /-->` |
| `the_date()` | `<!-- wp:post-date /-->` |
| `wp_nav_menu()` | `<!-- wp:navigation /-->` |
| `the_custom_logo()` | `<!-- wp:site-logo /-->` |
| `bloginfo('name')` | `<!-- wp:site-title /-->` |
| `get_search_form()` | `<!-- wp:search /-->` |
| Widget area | Pattern ou Template Part |
| Customizer option | theme.json setting |

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Plugin incompatible FSE | Contacter l'éditeur ou trouver alternative |
| Shortcode complexe | Créer un block custom ou garder en transition |
| Design non reproductible | Utiliser CSS custom + theme.json |
| Performance dégradée | Audit avec Query Monitor |
