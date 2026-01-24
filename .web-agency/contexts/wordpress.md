# Contexte WordPress

Connaissances essentielles pour le développement WordPress/Gutenberg.

## Stack WordPress moderne

```
WordPress 6.4+
PHP 8.2+
Gutenberg (éditeur de blocs)
Full Site Editing (FSE)
```

## Structure thème block

```
theme/
├── style.css           # Métadonnées du thème
├── theme.json          # Configuration globale
├── functions.php       # Logique PHP
├── templates/          # Templates HTML
│   ├── index.html
│   ├── single.html
│   ├── page.html
│   └── archive.html
├── parts/              # Template parts
│   ├── header.html
│   ├── footer.html
│   └── sidebar.html
├── patterns/           # Block patterns
│   └── hero.php
└── assets/
    ├── css/
    └── js/
```

## theme.json

```json
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 2,
  "settings": {
    "color": {
      "palette": [
        { "slug": "primary", "color": "#0066cc", "name": "Primary" },
        { "slug": "secondary", "color": "#666666", "name": "Secondary" },
        { "slug": "accent", "color": "#ff6600", "name": "Accent" }
      ],
      "custom": false,
      "defaultPalette": false
    },
    "typography": {
      "fontFamilies": [
        {
          "fontFamily": "Inter, sans-serif",
          "slug": "inter",
          "name": "Inter"
        }
      ],
      "fontSizes": [
        { "slug": "small", "size": "0.875rem", "name": "Small" },
        { "slug": "medium", "size": "1rem", "name": "Medium" },
        { "slug": "large", "size": "1.25rem", "name": "Large" },
        { "slug": "x-large", "size": "1.5rem", "name": "Extra Large" }
      ]
    },
    "spacing": {
      "units": ["px", "rem", "%"],
      "spacingSizes": [
        { "slug": "10", "size": "0.5rem", "name": "XS" },
        { "slug": "20", "size": "1rem", "name": "S" },
        { "slug": "30", "size": "1.5rem", "name": "M" },
        { "slug": "40", "size": "2rem", "name": "L" },
        { "slug": "50", "size": "3rem", "name": "XL" }
      ]
    },
    "layout": {
      "contentSize": "800px",
      "wideSize": "1200px"
    }
  },
  "styles": {
    "color": {
      "background": "var(--wp--preset--color--white)",
      "text": "var(--wp--preset--color--secondary)"
    },
    "typography": {
      "fontFamily": "var(--wp--preset--font-family--inter)",
      "fontSize": "var(--wp--preset--font-size--medium)"
    },
    "elements": {
      "link": {
        "color": { "text": "var(--wp--preset--color--primary)" }
      },
      "button": {
        "color": {
          "background": "var(--wp--preset--color--primary)",
          "text": "#ffffff"
        },
        "border": { "radius": "4px" }
      }
    }
  }
}
```

## Templates HTML

```html
<!-- templates/single.html -->
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<main class="wp-block-group alignfull">
  <!-- wp:post-title {"level":1} /-->
  <!-- wp:post-featured-image /-->
  <!-- wp:post-content /-->
</main>

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

```html
<!-- parts/header.html -->
<!-- wp:group {"tagName":"header","className":"site-header"} -->
<header class="wp-block-group site-header">
  <!-- wp:site-title /-->
  <!-- wp:navigation /-->
</header>
<!-- /wp:group -->
```

## Block Patterns

```php
<?php
// patterns/hero.php
/**
 * Title: Hero Section
 * Slug: theme/hero
 * Categories: featured
 */
?>
<!-- wp:cover {"overlayColor":"primary","minHeight":500} -->
<div class="wp-block-cover" style="min-height:500px">
  <span class="wp-block-cover__background has-primary-background-color"></span>
  <div class="wp-block-cover__inner-container">
    <!-- wp:heading {"textAlign":"center","level":1} -->
    <h1 class="has-text-align-center">Bienvenue</h1>
    <!-- /wp:heading -->
    <!-- wp:paragraph {"align":"center"} -->
    <p class="has-text-align-center">Votre texte ici</p>
    <!-- /wp:paragraph -->
    <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
    <div class="wp-block-buttons">
      <!-- wp:button -->
      <div class="wp-block-button"><a class="wp-block-button__link">En savoir plus</a></div>
      <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->
  </div>
</div>
<!-- /wp:cover -->
```

## Custom Blocks (React)

### Structure plugin

```
my-blocks/
├── my-blocks.php       # Plugin principal
├── package.json
├── src/
│   └── blocks/
│       └── my-block/
│           ├── block.json
│           ├── edit.js
│           ├── save.js
│           ├── index.js
│           └── style.scss
└── build/              # Compilé
```

### block.json

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "my-plugin/my-block",
  "version": "1.0.0",
  "title": "My Block",
  "category": "widgets",
  "icon": "smiley",
  "description": "A custom block",
  "supports": {
    "html": false,
    "color": {
      "background": true,
      "text": true
    },
    "spacing": {
      "margin": true,
      "padding": true
    }
  },
  "attributes": {
    "content": {
      "type": "string",
      "source": "html",
      "selector": "p"
    }
  },
  "textdomain": "my-plugin",
  "editorScript": "file:./index.js",
  "editorStyle": "file:./index.css",
  "style": "file:./style-index.css"
}
```

### edit.js

```jsx
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      <RichText
        tagName="p"
        value={attributes.content}
        onChange={(content) => setAttributes({ content })}
        placeholder={__('Enter text...', 'my-plugin')}
      />
    </div>
  );
}
```

### save.js

```jsx
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps}>
      <RichText.Content tagName="p" value={attributes.content} />
    </div>
  );
}
```

## PHP Moderne

### Plugin structure

```php
<?php
/**
 * Plugin Name: My Plugin
 * Version: 1.0.0
 * Requires PHP: 8.2
 */

declare(strict_types=1);

namespace MyPlugin;

// Autoloader
spl_autoload_register(function (string $class): void {
    if (!str_starts_with($class, __NAMESPACE__)) {
        return;
    }
    $path = __DIR__ . '/src/' . str_replace('\\', '/', substr($class, strlen(__NAMESPACE__) + 1)) . '.php';
    if (file_exists($path)) {
        require $path;
    }
});

// Bootstrap
add_action('init', fn() => (new Plugin())->init());
```

### Hooks modernes

```php
<?php
// Avec types
add_filter('the_title', function (string $title, int $post_id): string {
    return strtoupper($title);
}, 10, 2);

// Avec arrow functions
add_action('wp_enqueue_scripts', fn() => wp_enqueue_style('theme', get_stylesheet_uri()));

// Avec classes
class ThemeSetup {
    public function __construct() {
        add_action('after_setup_theme', [$this, 'setup']);
    }

    public function setup(): void {
        add_theme_support('post-thumbnails');
        add_theme_support('title-tag');
        add_theme_support('editor-styles');
    }
}
```

## WP-CLI

```bash
# Installation
wp core download
wp config create --dbname=mydb --dbuser=root --dbpass=xxx
wp core install --url=example.com --title="Site" --admin_user=admin --admin_email=admin@example.com

# Plugins
wp plugin install woocommerce --activate
wp plugin update --all

# Thèmes
wp theme activate my-theme

# Base de données
wp db export backup.sql
wp db import backup.sql

# Cache
wp cache flush

# Rechercher/Remplacer
wp search-replace 'old-domain.com' 'new-domain.com'
```

## Performance

```php
<?php
// Désactiver l'API REST pour les non-connectés
add_filter('rest_authentication_errors', function ($result) {
    if (!is_user_logged_in()) {
        return new WP_Error('rest_not_logged_in', 'Unauthorized', ['status' => 401]);
    }
    return $result;
});

// Désactiver les emojis
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

// Désactiver jQuery migrate
add_action('wp_default_scripts', function ($scripts) {
    if (!is_admin() && isset($scripts->registered['jquery'])) {
        $scripts->registered['jquery']->deps = array_diff(
            $scripts->registered['jquery']->deps,
            ['jquery-migrate']
        );
    }
});
```

## Sécurité

```php
<?php
// Sanitization
$title = sanitize_text_field($_POST['title'] ?? '');
$email = sanitize_email($_POST['email'] ?? '');
$html = wp_kses_post($_POST['content'] ?? '');

// Validation
if (!wp_verify_nonce($_POST['_wpnonce'] ?? '', 'my_action')) {
    wp_die('Security check failed');
}

// Capabilities
if (!current_user_can('edit_posts')) {
    wp_die('Unauthorized');
}

// Escaping output
echo esc_html($title);
echo esc_attr($attribute);
echo esc_url($url);
echo wp_kses_post($html);
```
