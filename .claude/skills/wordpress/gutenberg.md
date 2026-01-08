---
name: wordpress/gutenberg
description: Gutenberg - création de blocks, variations, data stores
tags: [gutenberg, blocks, wordpress, react, block-editor]
---

# Gutenberg Blocks

## Quand Utiliser
- Créer un block custom from scratch
- Ajouter des variations de blocks existants
- Utiliser les data stores WordPress
- Ajouter des styles de blocks

## Créer un Block

### Scaffold avec create-block

```bash
# Block simple
npx @wordpress/create-block my-block

# Block dynamique (rendu PHP)
npx @wordpress/create-block my-block --variant dynamic

# Sans créer de plugin
npx @wordpress/create-block my-block --no-plugin
```

### Structure de Fichiers

```
my-block/
├── build/                # Compilé
├── src/
│   ├── block.json       # Métadonnées
│   ├── index.js         # Registration
│   ├── edit.js          # Éditeur
│   ├── save.js          # Frontend
│   ├── editor.scss      # Styles éditeur
│   └── style.scss       # Styles front + éditeur
└── my-block.php         # Plugin PHP
```

## block.json

```json
{
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "theme/my-block",
    "title": "My Block",
    "category": "theme",
    "icon": "star-filled",
    "description": "Description du block",
    "keywords": ["example", "custom"],
    "textdomain": "theme",

    "attributes": {
        "title": {
            "type": "string",
            "source": "html",
            "selector": "h2"
        },
        "content": {
            "type": "string",
            "source": "html",
            "selector": "p"
        },
        "mediaId": {
            "type": "number"
        },
        "mediaUrl": {
            "type": "string"
        }
    },

    "supports": {
        "html": false,
        "anchor": true,
        "align": ["wide", "full"],
        "color": {
            "background": true,
            "text": true
        },
        "spacing": {
            "margin": true,
            "padding": true
        },
        "typography": {
            "fontSize": true
        }
    },

    "editorScript": "file:./index.js",
    "editorStyle": "file:./index.css",
    "style": "file:./style-index.css"
}
```

## edit.js

```jsx
import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
    const { title, content, mediaId, mediaUrl } = attributes;
    const blockProps = useBlockProps();

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Settings', 'theme')}>
                    <MediaUpload
                        onSelect={(media) => setAttributes({
                            mediaId: media.id,
                            mediaUrl: media.url
                        })}
                        allowedTypes={['image']}
                        value={mediaId}
                        render={({ open }) => (
                            <Button onClick={open} variant="secondary">
                                {mediaUrl ? __('Change Image', 'theme') : __('Select Image', 'theme')}
                            </Button>
                        )}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {mediaUrl && <img src={mediaUrl} alt="" />}
                <RichText
                    tagName="h2"
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                    placeholder={__('Title...', 'theme')}
                />
                <RichText
                    tagName="p"
                    value={content}
                    onChange={(value) => setAttributes({ content: value })}
                    placeholder={__('Content...', 'theme')}
                />
            </div>
        </>
    );
}
```

## save.js

```jsx
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { title, content, mediaUrl } = attributes;
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            {mediaUrl && <img src={mediaUrl} alt="" />}
            <RichText.Content tagName="h2" value={title} />
            <RichText.Content tagName="p" value={content} />
        </div>
    );
}
```

## Block Dynamique (rendu PHP)

```php
// Dans block.json, remplacer save par render
"render": "file:./render.php"
```

```php
<?php
// render.php
$title = $attributes['title'] ?? '';
$content = $attributes['content'] ?? '';
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
    <?php if ($title) : ?>
        <h2><?php echo wp_kses_post($title); ?></h2>
    <?php endif; ?>
    <?php if ($content) : ?>
        <p><?php echo wp_kses_post($content); ?></p>
    <?php endif; ?>
</div>
```

## Block Variations

```js
import { registerBlockVariation } from '@wordpress/blocks';

registerBlockVariation('core/group', {
    name: 'card',
    title: 'Card',
    description: 'A card container',
    icon: 'index-card',
    scope: ['inserter'],
    attributes: {
        className: 'is-style-card',
        style: {
            spacing: { padding: '20px' },
            border: { radius: '8px' }
        }
    },
    innerBlocks: [
        ['core/heading', { level: 3 }],
        ['core/paragraph']
    ]
});
```

## Block Styles

```js
import { registerBlockStyle } from '@wordpress/blocks';

registerBlockStyle('core/button', {
    name: 'rounded',
    label: 'Rounded'
});

registerBlockStyle('core/button', {
    name: 'outline',
    label: 'Outline'
});
```

```css
.wp-block-button.is-style-rounded .wp-block-button__link {
    border-radius: 50px;
}

.wp-block-button.is-style-outline .wp-block-button__link {
    background: transparent;
    border: 2px solid currentColor;
}
```

## Data Stores (useSelect/useDispatch)

```jsx
import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

function MyComponent() {
    // Lecture de données
    const posts = useSelect((select) => {
        return select(coreStore).getEntityRecords('postType', 'post', {
            per_page: 5
        });
    }, []);

    // Accès au post courant
    const { postId, postType } = useSelect((select) => {
        const { getCurrentPostId, getCurrentPostType } = select('core/editor');
        return {
            postId: getCurrentPostId(),
            postType: getCurrentPostType()
        };
    }, []);

    // Modification de données
    const { editPost } = useDispatch('core/editor');
    
    const updateTitle = (newTitle) => {
        editPost({ title: newTitle });
    };

    return (/* ... */);
}
```

## Composants Utiles

| Composant | Usage |
|-----------|-------|
| `RichText` | Texte éditable |
| `MediaUpload` | Sélecteur média |
| `InspectorControls` | Panneau latéral |
| `BlockControls` | Toolbar du block |
| `InnerBlocks` | Blocks imbriqués |
| `useBlockProps` | Props du conteneur |

## Références

- https://developer.wordpress.org/block-editor/
- https://developer.wordpress.org/block-editor/reference-guides/block-api/
- https://github.com/WordPress/block-development-examples
