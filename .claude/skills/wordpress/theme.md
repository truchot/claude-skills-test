---
name: wordpress/theme
description: Block Themes WordPress - theme.json, templates, patterns
tags: [wordpress, theme, block-theme, fse, theme-json]
---

# Block Themes WordPress

## Quand Utiliser
- Créer un block theme (FSE)
- Configurer theme.json
- Créer des templates et patterns
- Utiliser l'Interactivity API

## Structure Block Theme

```
theme/
├── parts/
│   ├── header.html
│   └── footer.html
├── patterns/
│   └── hero.php
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

## theme.json

```json
{
    "$schema": "https://schemas.wp.org/trunk/theme.json",
    "version": 2,
    "settings": {
        "appearanceTools": true,
        "color": {
            "palette": [
                { "slug": "primary", "color": "#3b82f6", "name": "Primary" },
                { "slug": "secondary", "color": "#64748b", "name": "Secondary" },
                { "slug": "background", "color": "#ffffff", "name": "Background" },
                { "slug": "foreground", "color": "#1e293b", "name": "Foreground" }
            ],
            "gradients": [
                {
                    "slug": "primary-to-secondary",
                    "gradient": "linear-gradient(135deg, var(--wp--preset--color--primary), var(--wp--preset--color--secondary))",
                    "name": "Primary to Secondary"
                }
            ]
        },
        "typography": {
            "fontFamilies": [
                {
                    "slug": "sans",
                    "fontFamily": "Inter, system-ui, sans-serif",
                    "name": "Sans"
                },
                {
                    "slug": "mono",
                    "fontFamily": "'Fira Code', monospace",
                    "name": "Mono"
                }
            ],
            "fontSizes": [
                { "slug": "small", "size": "0.875rem", "name": "Small" },
                { "slug": "medium", "size": "1rem", "name": "Medium" },
                { "slug": "large", "size": "1.25rem", "name": "Large" },
                { "slug": "x-large", "size": "1.5rem", "name": "X-Large" },
                { "slug": "xx-large", "size": "2rem", "name": "XX-Large" }
            ],
            "fluid": true
        },
        "spacing": {
            "spacingSizes": [
                { "slug": "10", "size": "0.5rem", "name": "1" },
                { "slug": "20", "size": "1rem", "name": "2" },
                { "slug": "30", "size": "1.5rem", "name": "3" },
                { "slug": "40", "size": "2rem", "name": "4" },
                { "slug": "50", "size": "3rem", "name": "5" }
            ],
            "units": ["px", "em", "rem", "%", "vw", "vh"]
        },
        "layout": {
            "contentSize": "800px",
            "wideSize": "1200px"
        },
        "useRootPaddingAwareAlignments": true
    },
    "styles": {
        "color": {
            "background": "var(--wp--preset--color--background)",
            "text": "var(--wp--preset--color--foreground)"
        },
        "typography": {
            "fontFamily": "var(--wp--preset--font-family--sans)",
            "fontSize": "var(--wp--preset--font-size--medium)",
            "lineHeight": "1.6"
        },
        "spacing": {
            "padding": {
                "left": "var(--wp--preset--spacing--30)",
                "right": "var(--wp--preset--spacing--30)"
            }
        },
        "elements": {
            "link": {
                "color": {
                    "text": "var(--wp--preset--color--primary)"
                }
            },
            "h1": {
                "typography": {
                    "fontSize": "var(--wp--preset--font-size--xx-large)"
                }
            },
            "h2": {
                "typography": {
                    "fontSize": "var(--wp--preset--font-size--x-large)"
                }
            }
        },
        "blocks": {
            "core/button": {
                "border": {
                    "radius": "4px"
                },
                "color": {
                    "background": "var(--wp--preset--color--primary)",
                    "text": "#ffffff"
                }
            }
        }
    },
    "templateParts": [
        { "name": "header", "title": "Header", "area": "header" },
        { "name": "footer", "title": "Footer", "area": "footer" }
    ]
}
```

## Templates HTML

### index.html

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">
    <!-- wp:query {"queryId":1,"query":{"perPage":10,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","inherit":true}} -->
    <div class="wp-block-query">
        <!-- wp:post-template -->
            <!-- wp:post-featured-image /-->
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

### single.html

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">
    <!-- wp:post-featured-image /-->
    <!-- wp:post-title {"level":1} /-->
    <!-- wp:post-date /-->
    <!-- wp:post-content {"layout":{"type":"constrained"}} /-->
    <!-- wp:post-terms {"term":"category"} /-->
    
    <!-- wp:comments -->
        <!-- wp:comments-title /-->
        <!-- wp:comment-template -->
            <!-- wp:comment-author-name /-->
            <!-- wp:comment-date /-->
            <!-- wp:comment-content /-->
        <!-- /wp:comment-template -->
        <!-- wp:post-comments-form /-->
    <!-- /wp:comments -->
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

## Patterns

```php
<?php
// patterns/hero.php
/**
 * Title: Hero Section
 * Slug: theme/hero
 * Categories: featured
 * Keywords: hero, banner, header
 */
?>
<!-- wp:cover {"dimRatio":50,"overlayColor":"primary","minHeight":500,"align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:500px">
    <span class="wp-block-cover__background has-primary-background-color has-background-dim-50 has-background-dim"></span>
    <div class="wp-block-cover__inner-container">
        <!-- wp:heading {"textAlign":"center","level":1} -->
        <h1 class="wp-block-heading has-text-align-center">Welcome</h1>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"align":"center"} -->
        <p class="has-text-align-center">Your tagline here</p>
        <!-- /wp:paragraph -->
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

## Style Variations

```json
// styles/dark.json
{
    "$schema": "https://schemas.wp.org/trunk/theme.json",
    "version": 2,
    "title": "Dark",
    "settings": {
        "color": {
            "palette": [
                { "slug": "background", "color": "#1e293b", "name": "Background" },
                { "slug": "foreground", "color": "#f8fafc", "name": "Foreground" }
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

## Interactivity API

```html
<!-- Block avec interactivité -->
<!-- wp:my-theme/accordion {"data-wp-interactive":"my-theme"} -->
<div 
    data-wp-interactive="my-theme"
    data-wp-context='{"isOpen": false}'
>
    <button data-wp-on--click="actions.toggle">
        Toggle
    </button>
    <div data-wp-bind--hidden="!context.isOpen">
        Content here
    </div>
</div>
<!-- /wp:my-theme/accordion -->
```

```js
// view.js
import { store, getContext } from '@wordpress/interactivity';

store('my-theme', {
    actions: {
        toggle: () => {
            const context = getContext();
            context.isOpen = !context.isOpen;
        }
    }
});
```

## Variables CSS Disponibles

```css
/* Couleurs */
var(--wp--preset--color--primary)
var(--wp--preset--color--secondary)

/* Typography */
var(--wp--preset--font-family--sans)
var(--wp--preset--font-size--medium)

/* Spacing */
var(--wp--preset--spacing--20)

/* Layout */
var(--wp--style--global--content-size)
var(--wp--style--global--wide-size)
```

## Références

- https://developer.wordpress.org/themes/
- https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/
- https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/
