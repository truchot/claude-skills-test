---
name: wordpress
description: WordPress et Gutenberg - blocks, thèmes, plugins, API
tags: [wordpress, gutenberg, php, blocks, theme, plugin, wp-cli]
sub-skills: [gutenberg, theme]
related-workflows: [wordpress-project-setup, wordpress-deployment, wordpress-migration-classic-to-block]
---

# WordPress

## Quand Utiliser
- Développer un thème WordPress (block theme)
- Créer des blocks Gutenberg custom
- Développer un plugin WordPress
- Utiliser l'API REST WordPress
- Configurer wp-env ou environnements

## Sous-Skills Disponibles

| Sous-skill | Fichier | Description |
|------------|---------|-------------|
| Gutenberg | `gutenberg.md` | Blocks custom, variations, data stores |
| Theme | `theme.md` | Block themes, theme.json, patterns, Interactivity API |

## Workflows Associés

> Les processus séquentiels (QUAND) sont dans `/workflows/wordpress/`

| Workflow | Fichier | Description |
|----------|---------|-------------|
| Project Setup | `workflows/wordpress/project-setup.md` | Init projet → Git → Env dev |
| Deployment | `workflows/wordpress/deployment.md` | SSH → Staging → Production |
| Migration | `workflows/wordpress/migration-classic-to-block.md` | Classic → Block Theme |

## Architecture WordPress

```
WordPress
├── Themes (block themes) → theme.md
│   ├── theme.json (settings, styles)
│   ├── templates/ (HTML templates)
│   ├── parts/ (template parts)
│   └── patterns/ (block patterns)
├── Plugins
│   ├── CPT (Custom Post Types)
│   ├── Taxonomies
│   └── Blocks custom → gutenberg.md
└── API REST
```

## Block Theme (theme.json)

```json
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 2,
  "settings": {
    "color": {
      "palette": [
        { "slug": "primary", "color": "#3b82f6", "name": "Primary" },
        { "slug": "secondary", "color": "#64748b", "name": "Secondary" }
      ]
    },
    "typography": {
      "fontFamilies": [
        { "slug": "sans", "fontFamily": "Inter, sans-serif", "name": "Sans" }
      ],
      "fontSizes": [
        { "slug": "small", "size": "0.875rem", "name": "Small" },
        { "slug": "medium", "size": "1rem", "name": "Medium" },
        { "slug": "large", "size": "1.25rem", "name": "Large" }
      ]
    },
    "spacing": {
      "spacingSizes": [
        { "slug": "10", "size": "0.5rem", "name": "Small" },
        { "slug": "20", "size": "1rem", "name": "Medium" },
        { "slug": "30", "size": "2rem", "name": "Large" }
      ]
    }
  },
  "styles": {
    "color": {
      "background": "var(--wp--preset--color--background)",
      "text": "var(--wp--preset--color--foreground)"
    }
  }
}
```

## Custom Post Type

```php
function register_portfolio_cpt() {
    register_post_type('portfolio', [
        'labels' => [
            'name' => __('Portfolio', 'theme'),
            'singular_name' => __('Project', 'theme'),
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true, // Gutenberg support
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
        'menu_icon' => 'dashicons-portfolio',
    ]);
}
add_action('init', 'register_portfolio_cpt');
```

## Custom Block

```jsx
// block.json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "theme/hero",
  "title": "Hero Section",
  "category": "theme",
  "icon": "cover-image",
  "supports": {
    "align": ["wide", "full"],
    "color": { "background": true, "text": true }
  },
  "attributes": {
    "title": { "type": "string" },
    "subtitle": { "type": "string" }
  }
}

// edit.js
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();
  
  return (
    <div {...blockProps}>
      <RichText
        tagName="h1"
        value={attributes.title}
        onChange={(title) => setAttributes({ title })}
        placeholder="Hero title..."
      />
    </div>
  );
}
```

## Hooks WordPress

```php
// Action - exécute du code
add_action('init', 'my_init_function');
add_action('wp_enqueue_scripts', 'my_enqueue_scripts');
add_action('save_post', 'my_save_post', 10, 3);

// Filter - modifie une valeur
add_filter('the_content', 'my_content_filter');
add_filter('excerpt_length', fn() => 20);
```

## Sécurité WordPress

```php
// Nonces (CSRF protection)
wp_nonce_field('my_action', 'my_nonce');
if (!wp_verify_nonce($_POST['my_nonce'], 'my_action')) {
    wp_die('Security check failed');
}

// Sanitization (input)
$title = sanitize_text_field($_POST['title']);
$email = sanitize_email($_POST['email']);
$html = wp_kses_post($_POST['content']);

// Escaping (output)
echo esc_html($title);
echo esc_attr($attribute);
echo esc_url($url);
echo wp_kses_post($html);
```

## WP-CLI

```bash
# Création
wp post create --post_type=page --post_title="About"
wp plugin scaffold my-plugin

# Base de données
wp db export backup.sql
wp search-replace 'old.com' 'new.com'

# Cache
wp cache flush
wp transient delete --all

# Users
wp user create editor editor@site.com --role=editor
```

## wp-env

```json
// .wp-env.json
{
  "core": "WordPress/WordPress#6.4",
  "plugins": [".", "./plugins/my-plugin"],
  "themes": ["./themes/my-theme"],
  "config": {
    "WP_DEBUG": true,
    "WP_DEBUG_LOG": true
  },
  "mappings": {
    "wp-content/uploads": "./uploads"
  }
}
```

```bash
# Commandes
wp-env start
wp-env stop
wp-env run cli wp plugin list
```

## Références
- https://developer.wordpress.org/
- https://developer.wordpress.org/block-editor/
- https://developer.wordpress.org/themes/
- https://make.wordpress.org/cli/handbook/
