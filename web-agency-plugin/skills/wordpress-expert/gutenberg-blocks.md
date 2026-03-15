# Gutenberg Blocks Reference

## Block Types Decision Tree

```
Besoin d'un block ?
|
+-- Block qui n'existe pas -> Custom Block (registerBlockType)
|
+-- Variante d'un block existant
|   +-- Comportement/attributs differents -> Block Variation
|   +-- Style CSS different -> Block Style
|
+-- Afficher des donnees custom dans un block natif -> Block Bindings
|
+-- Injecter un block auto dans templates -> Block Hooks
```

## Custom Blocks (block.json)

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "my-plugin/my-block",
  "title": "My Block",
  "category": "widgets",
  "icon": "smiley",
  "editorScript": "file:./index.js",
  "editorStyle": "file:./index.css",
  "style": "file:./style-index.css",
  "render": "file:./render.php",
  "attributes": {
    "content": { "type": "string" }
  },
  "supports": {
    "color": { "background": true, "text": true },
    "typography": { "fontSize": true },
    "spacing": { "margin": true, "padding": true }
  }
}
```

## Block Variations

```js
registerBlockVariation('core/group', {
  name: 'hero-section',
  title: 'Hero Section',
  icon: 'cover-image',
  attributes: { className: 'is-hero-section' },
  innerBlocks: [
    ['core/heading', { level: 1, placeholder: 'Hero Title' }],
    ['core/paragraph', { placeholder: 'Subtitle' }],
    ['core/buttons', {}, [['core/button', { text: 'CTA' }]]]
  ],
  isActive: (blockAttributes) =>
    blockAttributes.className?.includes('is-hero-section'),
});
```

## Block Bindings API (WP 6.5+)

```php
// Register custom source
register_block_bindings_source('my-plugin/meta', [
  'label' => 'Post Meta',
  'get_value_callback' => function ($args, $block) {
    return get_post_meta($block->context['postId'], $args['key'], true);
  },
]);
```

```html
<!-- Usage in template -->
<!-- wp:paragraph {"metadata":{"bindings":{"content":{"source":"my-plugin/meta","args":{"key":"subtitle"}}}}} -->
<p></p>
<!-- /wp:paragraph -->
```

## Data Stores

```js
import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

// Read data
const posts = useSelect((select) =>
  select(coreStore).getEntityRecords('postType', 'post', { per_page: 5 }),
[]);

// Write data
const { saveEntityRecord } = useDispatch(coreStore);
```

## DataViews (WP 6.7+) - Modern Admin Pages

```js
import { DataViews } from '@wordpress/dataviews';

<DataViews
  data={items}
  fields={[
    { id: 'title', header: 'Title', render: ({ item }) => item.title },
    { id: 'status', header: 'Status', elements: statusOptions },
  ]}
  view={view}
  onChangeView={setView}
  actions={[deleteAction, editAction]}
/>
```

## Key Rules

- Always use `@wordpress/create-block` for scaffolding
- API version 3 in block.json
- Prefer `render.php` for dynamic blocks (server-side rendering)
- Use `supports` in block.json for built-in color/typography/spacing
- Test with `@wordpress/e2e-test-utils-playwright`
