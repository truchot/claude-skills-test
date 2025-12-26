---
id: pattern-007
category: architecture
tags: [wordpress, cpt, capabilities, permissions]
created: 2024-03-15
validated: true
usage_count: 9
---

# Pattern: CPT avec Permissions Custom

## Contexte d'Application

**Quand utiliser ce pattern :**
- Custom Post Type nécessitant des permissions spécifiques
- Accès différencié par rôle (éditeur vs auteur)
- Contenu sensible (clients, commandes, etc.)
- Multi-auteurs avec restrictions

**Prérequis :**
- WordPress 5.0+
- Compréhension du système de capabilities

## Solution

Création de CPT avec capabilities personnalisées et assignation aux rôles.

### Structure

```
plugin/
├── plugin.php
├── includes/
│   ├── class-cpt-registration.php
│   ├── class-capabilities.php
│   └── class-activation.php
```

### Enregistrement du CPT

```php
<?php
/**
 * Enregistrement du CPT avec capabilities custom
 */
add_action('init', function() {
    register_post_type('client', [
        'labels' => [
            'name'               => __('Clients', 'plugin'),
            'singular_name'      => __('Client', 'plugin'),
            'add_new'            => __('Ajouter', 'plugin'),
            'add_new_item'       => __('Ajouter un client', 'plugin'),
            'edit_item'          => __('Modifier le client', 'plugin'),
            'view_item'          => __('Voir le client', 'plugin'),
            'search_items'       => __('Rechercher', 'plugin'),
            'not_found'          => __('Aucun client trouvé', 'plugin'),
        ],
        'public'              => false,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true,  // Pour Gutenberg
        'menu_icon'           => 'dashicons-businessperson',
        'supports'            => ['title', 'editor', 'thumbnail', 'custom-fields'],
        'has_archive'         => false,

        // Capabilities personnalisées
        'capability_type'     => 'client',
        'capabilities'        => [
            // Primitives (singular)
            'edit_post'           => 'edit_client',
            'read_post'           => 'read_client',
            'delete_post'         => 'delete_client',

            // Meta (plural)
            'edit_posts'          => 'edit_clients',
            'edit_others_posts'   => 'edit_others_clients',
            'publish_posts'       => 'publish_clients',
            'read_private_posts'  => 'read_private_clients',
            'delete_posts'        => 'delete_clients',
            'delete_others_posts' => 'delete_others_clients',
            'delete_private_posts'=> 'delete_private_clients',
            'delete_published_posts' => 'delete_published_clients',
            'edit_private_posts'  => 'edit_private_clients',
            'edit_published_posts'=> 'edit_published_clients',
            'create_posts'        => 'create_clients',
        ],
        'map_meta_cap'        => true,
    ]);
});
```

### Assignation des Capabilities

```php
<?php
/**
 * Activation du plugin - Ajouter les capabilities aux rôles
 */
function plugin_activate() {
    // Capabilities pour ce CPT
    $caps = [
        'edit_client',
        'read_client',
        'delete_client',
        'edit_clients',
        'edit_others_clients',
        'publish_clients',
        'read_private_clients',
        'delete_clients',
        'delete_others_clients',
        'delete_private_clients',
        'delete_published_clients',
        'edit_private_clients',
        'edit_published_clients',
        'create_clients',
    ];

    // Admin : toutes les capabilities
    $admin = get_role('administrator');
    foreach ($caps as $cap) {
        $admin->add_cap($cap);
    }

    // Éditeur : gérer tous les clients
    $editor = get_role('editor');
    foreach ($caps as $cap) {
        $editor->add_cap($cap);
    }

    // Auteur : uniquement ses propres clients
    $author = get_role('author');
    $author_caps = [
        'edit_client',
        'read_client',
        'delete_client',
        'edit_clients',
        'publish_clients',
        'delete_clients',
        'delete_published_clients',
        'edit_published_clients',
        'create_clients',
    ];
    foreach ($author_caps as $cap) {
        $author->add_cap($cap);
    }
}
register_activation_hook(__FILE__, 'plugin_activate');

/**
 * Désactivation - Retirer les capabilities
 */
function plugin_deactivate() {
    $caps = [
        'edit_client', 'read_client', 'delete_client',
        'edit_clients', 'edit_others_clients', 'publish_clients',
        'read_private_clients', 'delete_clients', 'delete_others_clients',
        'delete_private_clients', 'delete_published_clients',
        'edit_private_clients', 'edit_published_clients', 'create_clients',
    ];

    foreach (['administrator', 'editor', 'author'] as $role_name) {
        $role = get_role($role_name);
        if ($role) {
            foreach ($caps as $cap) {
                $role->remove_cap($cap);
            }
        }
    }
}
register_deactivation_hook(__FILE__, 'plugin_deactivate');
```

### Vérification des Permissions

```php
<?php
// Dans le code
if (current_user_can('edit_clients')) {
    // Afficher le lien d'édition
}

if (current_user_can('edit_client', $client_id)) {
    // Peut modifier ce client spécifique
}

if (current_user_can('edit_others_clients')) {
    // Peut modifier les clients des autres
}
```

### Matrice des Permissions

| Capability | Admin | Editor | Author |
|------------|-------|--------|--------|
| `create_clients` | ✅ | ✅ | ✅ |
| `edit_clients` | ✅ | ✅ | ✅ (own) |
| `edit_others_clients` | ✅ | ✅ | ❌ |
| `publish_clients` | ✅ | ✅ | ✅ |
| `delete_others_clients` | ✅ | ✅ | ❌ |
| `read_private_clients` | ✅ | ✅ | ❌ |

## Bénéfices

- **Sécurité** : Contrôle granulaire des accès
- **Flexibilité** : Rôles personnalisables
- **WordPress natif** : Utilise le système de capabilities
- **Scalable** : Fonctionne avec n'importe quel nombre de rôles

## Inconvénients / Trade-offs

- **Complexité** : Plus de code à maintenir
- **Activation** : Nécessite réactivation après ajout de caps
- **Debugging** : Permissions difficiles à diagnostiquer

## Projets l'ayant Utilisé

| Projet | Date | Résultat | Notes |
|--------|------|----------|-------|
| 9 projets | 2024 | Succès | CRM, gestion clients |

## Variantes

### Variante A : Rôle Custom

```php
add_role('client_manager', 'Client Manager', [
    'read' => true,
    'edit_clients' => true,
    'edit_others_clients' => true,
    'publish_clients' => true,
]);
```

### Variante B : Plugin Members

Utiliser le plugin Members pour gérer visuellement.

## Voir Aussi

- [Anti-pattern: missing-error-handling](../anti-patterns/missing-error-handling.md)
- [Pattern: block-theme-structure](./block-theme-structure.md)

## Sources

- [WordPress Roles and Capabilities](https://developer.wordpress.org/plugins/users/roles-and-capabilities/)
- [register_post_type capabilities](https://developer.wordpress.org/reference/functions/register_post_type/#capability_type)
