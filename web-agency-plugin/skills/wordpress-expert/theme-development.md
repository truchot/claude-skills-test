# WordPress Theme Development Reference

## Block Theme Structure

```
my-theme/
+-- style.css            # Theme header (required)
+-- functions.php        # Theme setup, enqueues
+-- theme.json           # Global settings & styles
+-- templates/
|   +-- index.html       # Fallback (required)
|   +-- single.html
|   +-- page.html
|   +-- archive.html
|   +-- 404.html
+-- parts/
|   +-- header.html
|   +-- footer.html
|   +-- sidebar.html
+-- patterns/
|   +-- hero.php
|   +-- cta.php
+-- styles/              # Style variations
|   +-- dark.json
+-- assets/
    +-- fonts/
    +-- images/
```

## theme.json Essentials

```json
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 3,
  "settings": {
    "color": {
      "palette": [
        { "slug": "primary", "color": "#1a56db", "name": "Primary" },
        { "slug": "secondary", "color": "#6b7280", "name": "Secondary" }
      ],
      "gradients": [],
      "custom": false
    },
    "typography": {
      "fontFamilies": [
        { "fontFamily": "Inter, sans-serif", "slug": "body", "name": "Body" }
      ],
      "fontSizes": [
        { "slug": "small", "size": "0.875rem", "name": "Small" },
        { "slug": "medium", "size": "1rem", "name": "Medium" }
      ]
    },
    "spacing": {
      "units": ["px", "rem", "%"],
      "spacingSizes": [
        { "slug": "10", "size": "0.5rem", "name": "XS" },
        { "slug": "20", "size": "1rem", "name": "S" }
      ]
    },
    "layout": { "contentSize": "800px", "wideSize": "1200px" }
  },
  "styles": {
    "color": { "background": "var(--wp--preset--color--base)" },
    "typography": { "fontFamily": "var(--wp--preset--font-family--body)" },
    "elements": {
      "link": { "color": { "text": "var(--wp--preset--color--primary)" } }
    }
  }
}
```

## Patterns Registration

```php
<?php
/**
 * Title: Hero Section
 * Slug: my-theme/hero
 * Categories: featured
 * Block Types: core/template-part/content
 */
?>
<!-- wp:cover {"dimRatio":50,"minHeight":600} -->
<div class="wp-block-cover" style="min-height:600px">
  <!-- wp:heading {"level":1,"textAlign":"center"} -->
  <h1 class="has-text-align-center">Welcome</h1>
  <!-- /wp:heading -->
</div>
<!-- /wp:cover -->
```

## Interactivity API

```php
// render.php
<div <?php echo get_block_wrapper_attributes(); ?>
  data-wp-interactive="my-plugin"
  data-wp-context='{"isOpen": false}'>
  <button data-wp-on--click="actions.toggle">Toggle</button>
  <div data-wp-bind--hidden="!context.isOpen">
    <p>Accordion content</p>
  </div>
</div>
```

```js
// view.js
import { store } from '@wordpress/interactivity';

store('my-plugin', {
  actions: {
    toggle: () => {
      const ctx = getContext();
      ctx.isOpen = !ctx.isOpen;
    },
  },
});
```

## Style Engine

- CSS generated from block supports via `wp_style_engine_get_styles()`
- Custom properties: `--wp--preset--color--primary`, `--wp--preset--font-size--medium`
- Utility classes: `.has-primary-color`, `.has-large-font-size`
- Style variations via `/styles/*.json` files

## Key Rules

- Always `add_theme_support('wp-block-styles')` in functions.php
- Use `wp_enqueue_block_style()` for per-block CSS (not global enqueue)
- Prefer CSS custom properties over hardcoded values
- Use template hierarchy: index.html < single.html < single-{type}.html
