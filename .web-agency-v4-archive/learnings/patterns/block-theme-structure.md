---
id: pattern-006
category: architecture
tags: [wordpress, gutenberg, theme, fse]
created: 2024-03-01
validated: true
usage_count: 6
---

# Pattern: Structure Block Theme FSE

## Contexte d'Application

**Quand utiliser ce pattern :**
- Nouveau thème WordPress 6.0+
- Full Site Editing (FSE) requis
- Design system cohérent
- Performance optimale

**Prérequis :**
- WordPress 6.0+
- Connaissance Gutenberg
- theme.json

## Solution

Structure standardisée pour thèmes block WordPress modernes.

### Structure

```
theme-name/
├── functions.php           # Minimal, chargement uniquement
├── style.css               # Métadonnées thème
├── theme.json              # Design tokens, settings
├── screenshot.png
│
├── parts/                  # Template parts
│   ├── header.html
│   ├── footer.html
│   └── sidebar.html
│
├── templates/              # Page templates
│   ├── index.html          # Fallback obligatoire
│   ├── single.html
│   ├── page.html
│   ├── archive.html
│   ├── 404.html
│   └── search.html
│
├── patterns/               # Block patterns
│   ├── hero.php
│   ├── cta.php
│   └── testimonials.php
│
├── styles/                 # Style variations
│   ├── dark.json
│   └── colorful.json
│
└── assets/
    ├── fonts/
    ├── images/
    └── css/
        └── custom.css      # CSS additionnel si nécessaire
```

### theme.json

```json
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 3,
  "settings": {
    "appearanceTools": true,
    "color": {
      "palette": [
        { "slug": "primary", "color": "#0066cc", "name": "Primary" },
        { "slug": "secondary", "color": "#333333", "name": "Secondary" },
        { "slug": "accent", "color": "#ff6600", "name": "Accent" },
        { "slug": "background", "color": "#ffffff", "name": "Background" },
        { "slug": "foreground", "color": "#1a1a1a", "name": "Foreground" }
      ],
      "gradients": [],
      "custom": false,
      "defaultPalette": false
    },
    "typography": {
      "fontFamilies": [
        {
          "slug": "heading",
          "name": "Heading",
          "fontFamily": "\"Inter\", sans-serif",
          "fontFace": [
            {
              "fontFamily": "Inter",
              "fontWeight": "700",
              "fontStyle": "normal",
              "src": ["file:./assets/fonts/inter-bold.woff2"]
            }
          ]
        },
        {
          "slug": "body",
          "name": "Body",
          "fontFamily": "\"Inter\", sans-serif"
        }
      ],
      "fontSizes": [
        { "slug": "small", "size": "0.875rem", "name": "Small" },
        { "slug": "medium", "size": "1rem", "name": "Medium" },
        { "slug": "large", "size": "1.25rem", "name": "Large" },
        { "slug": "x-large", "size": "1.5rem", "name": "Extra Large" },
        { "slug": "huge", "size": "2.5rem", "name": "Huge" }
      ],
      "customFontSize": false
    },
    "spacing": {
      "units": ["rem", "%"],
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
      "background": "var(--wp--preset--color--background)",
      "text": "var(--wp--preset--color--foreground)"
    },
    "typography": {
      "fontFamily": "var(--wp--preset--font-family--body)",
      "fontSize": "var(--wp--preset--font-size--medium)",
      "lineHeight": "1.6"
    },
    "elements": {
      "heading": {
        "typography": {
          "fontFamily": "var(--wp--preset--font-family--heading)",
          "fontWeight": "700"
        }
      },
      "link": {
        "color": {
          "text": "var(--wp--preset--color--primary)"
        }
      }
    }
  }
}
```

### templates/index.html

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">
  <!-- wp:query {"queryId":1,"query":{"perPage":10,"inherit":true}} -->
  <div class="wp-block-query">
    <!-- wp:post-template -->
    <!-- wp:post-title {"isLink":true} /-->
    <!-- wp:post-excerpt /-->
    <!-- /wp:post-template -->

    <!-- wp:query-pagination -->
    <!-- wp:query-pagination-previous /-->
    <!-- wp:query-pagination-numbers /-->
    <!-- wp:query-pagination-next /-->
    <!-- /wp:query-pagination -->
  </div>
  <!-- /wp:query -->
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

### patterns/hero.php

```php
<?php
/**
 * Title: Hero Section
 * Slug: theme-name/hero
 * Categories: featured
 * Keywords: hero, banner, header
 */
?>
<!-- wp:cover {"dimRatio":50,"minHeight":500,"align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:500px">
  <div class="wp-block-cover__inner-container">
    <!-- wp:heading {"textAlign":"center","level":1} -->
    <h1 class="has-text-align-center">Welcome</h1>
    <!-- /wp:heading -->
    <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
    <div class="wp-block-buttons">
      <!-- wp:button -->
      <div class="wp-block-button"><a class="wp-block-button__link wp-element-button">Get Started</a></div>
      <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->
  </div>
</div>
<!-- /wp:cover -->
```

### functions.php (minimal)

```php
<?php
/**
 * Theme functions - keep minimal for block themes
 */

if (!defined('ABSPATH')) exit;

// Enqueue custom CSS if needed
add_action('wp_enqueue_scripts', function() {
    $css_path = get_theme_file_path('assets/css/custom.css');
    if (file_exists($css_path)) {
        wp_enqueue_style(
            'theme-custom',
            get_theme_file_uri('assets/css/custom.css'),
            [],
            filemtime($css_path)
        );
    }
});

// Register block patterns category
add_action('init', function() {
    register_block_pattern_category('theme-name', [
        'label' => __('Theme Name', 'theme-name'),
    ]);
});
```

## Bénéfices

- **Performance** : Pas de PHP pour le rendu
- **Éditabilité** : Tout modifiable via Site Editor
- **Cohérence** : Design tokens centralisés
- **Futur-proof** : Architecture WordPress moderne

## Inconvénients / Trade-offs

- **Courbe d'apprentissage** : Nouvelle approche
- **Limitations** : Certaines features nécessitent du code
- **Compatibilité** : Plugins anciens parfois incompatibles

## Voir Aussi

- [Pattern: cpt-with-capabilities](./cpt-with-capabilities.md)
- [Decision: when-wpenv-vs-docker](../decisions/when-wpenv-vs-docker.md)

## Sources

- [Block Theme Documentation](https://developer.wordpress.org/themes/block-themes/)
- [theme.json Reference](https://developer.wordpress.org/themes/global-settings-and-styles/)
- [Create Block Theme Plugin](https://wordpress.org/plugins/create-block-theme/)
