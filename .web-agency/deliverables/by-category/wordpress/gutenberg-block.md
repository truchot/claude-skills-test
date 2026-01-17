---
id: gutenberg-block
name: Block Gutenberg Custom
version: 1.0.0
category: wordpress
status: active
phase: "4-realisation"
order: 2
agents:
  - wordpress-gutenberg-expert/gutenberg-blocks/block-development
  - wordpress-gutenberg-expert/gutenberg-blocks/block-supports
  - wordpress-gutenberg-expert/gutenberg-blocks/interactivity
  - wordpress-gutenberg-expert/data-management/custom-stores
consumes:
  - theme-json-config
  - component-specs
  - design-tokens
produces_for:
  - wordpress-gutenberg-expert/gutenberg-blocks/block-patterns
  - testing-process/testing/unit-tests
workflows:
  - id: wf-block-creation
    template: wf-creation
    phase: Réalisation
    name: Développement bloc Gutenberg
    duration: 0.5-2 jours
tags: [wordpress, gutenberg, block, react, editor, interactivity]
---

# Block Gutenberg Custom

## Description

Bloc personnalisé pour l'éditeur Gutenberg WordPress. Comprend la configuration (`block.json`), les composants React pour l'éditeur (`edit.js`) et le frontend (`save.js` ou `render.php`), ainsi que les styles et les interactions.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Plugin ou dossier dans thème |
| **Emplacement** | `wp-content/plugins/[plugin-name]/src/blocks/[block-name]/` |
| **Nommage** | `kebab-case` pour le dossier et slug |
| **Build** | `@wordpress/scripts` |

## Structure du Contenu

### Fichiers Obligatoires

- [ ] **block.json** - Métadonnées et configuration
- [ ] **edit.js** - Composant éditeur (React)
- [ ] **index.js** - Point d'entrée (registration)
- [ ] **editor.scss** - Styles éditeur uniquement
- [ ] **style.scss** - Styles front + éditeur

### Fichiers Optionnels

- [ ] **save.js** - Markup statique (si bloc statique)
- [ ] **render.php** - Rendu dynamique (si bloc dynamique)
- [ ] **view.js** - Interactivité frontend (Interactivity API)
- [ ] **variations.js** - Variations du bloc
- [ ] **transforms.js** - Transformations depuis/vers autres blocs

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | block.json valide | Schema WordPress | Auto | Oui |
| 2 | Fonctionne dans éditeur | Pas d'erreur console | Manuel | Oui |
| 3 | Rendu frontend | Identique à l'éditeur | Manuel | Oui |
| 4 | Accessibilité | ARIA, keyboard nav | Manuel | Oui |
| 5 | i18n | Textes traduisibles | Manuel | Oui |
| 6 | Supports | Couleur, spacing, typo | Manuel | Non |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `wordpress-gutenberg-expert/*` | `theme-json-config` | Design tokens |
| `design-system-foundations/*` | `component-specs` | Specs du composant |
| `ux-ui-design/*` | `wireframes` | Comportement attendu |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | block.json | Lead Dev | Corriger config |
| 2 | UX éditeur | Designer | Ajuster InspectorControls |
| 3 | Rendu front | QA | Débugger |
| 4 | Accessibilité | Expert a11y | Ajouter ARIA |

## Exemple

### Structure Complète - Bloc "Product Card"

```
src/blocks/product-card/
├── block.json         # Configuration
├── index.js           # Registration
├── edit.js            # Éditeur
├── save.js            # Markup statique (ou render.php)
├── view.js            # Interactivité (optionnel)
├── editor.scss        # Styles éditeur
├── style.scss         # Styles front + éditeur
└── variations.js      # Variations (optionnel)
```

---

### block.json

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "artisanat/product-card",
  "version": "1.0.0",
  "title": "Product Card",
  "category": "artisanat",
  "icon": "products",
  "description": "Affiche une carte produit avec image, titre, prix et bouton d'achat.",
  "keywords": ["product", "card", "shop", "woocommerce", "produit"],
  "textdomain": "artisanat-blocks",

  "attributes": {
    "productId": {
      "type": "number"
    },
    "showPrice": {
      "type": "boolean",
      "default": true
    },
    "showRating": {
      "type": "boolean",
      "default": true
    },
    "showAddToCart": {
      "type": "boolean",
      "default": true
    },
    "imageSize": {
      "type": "string",
      "default": "medium",
      "enum": ["thumbnail", "medium", "large", "full"]
    },
    "layout": {
      "type": "string",
      "default": "vertical",
      "enum": ["vertical", "horizontal"]
    }
  },

  "supports": {
    "html": false,
    "align": ["wide", "full"],
    "color": {
      "background": true,
      "text": true,
      "link": true,
      "__experimentalDefaultControls": {
        "background": true,
        "text": true
      }
    },
    "spacing": {
      "margin": true,
      "padding": true,
      "blockGap": true,
      "__experimentalDefaultControls": {
        "padding": true
      }
    },
    "typography": {
      "fontSize": true,
      "lineHeight": true,
      "__experimentalDefaultControls": {
        "fontSize": true
      }
    },
    "__experimentalBorder": {
      "color": true,
      "radius": true,
      "style": true,
      "width": true,
      "__experimentalDefaultControls": {
        "color": true,
        "radius": true
      }
    },
    "shadow": true
  },

  "usesContext": ["postId", "postType"],

  "example": {
    "attributes": {
      "productId": 123,
      "showPrice": true,
      "showRating": true,
      "showAddToCart": true,
      "layout": "vertical"
    }
  },

  "editorScript": "file:./index.js",
  "editorStyle": "file:./index.css",
  "style": "file:./style-index.css",
  "viewScript": "file:./view.js",
  "render": "file:./render.php"
}
```

---

### index.js

```javascript
/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import './style.scss';
import './editor.scss';

/**
 * Block registration
 */
registerBlockType(metadata.name, {
  ...metadata,
  title: __('Product Card', 'artisanat-blocks'),
  description: __(
    'Affiche une carte produit avec image, titre, prix et bouton d\'achat.',
    'artisanat-blocks'
  ),
  edit: Edit,
  save,
});
```

---

### edit.js

```javascript
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InspectorControls,
  BlockControls,
} from '@wordpress/block-editor';
import {
  PanelBody,
  ToggleControl,
  SelectControl,
  Placeholder,
  Spinner,
  ToolbarGroup,
  ToolbarButton,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import ProductSelector from './components/product-selector';
import ProductCardPreview from './components/product-card-preview';

/**
 * Edit component
 *
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Set attributes function.
 * @param {boolean}  props.isSelected    Whether block is selected.
 * @return {JSX.Element} Block edit component.
 */
export default function Edit({ attributes, setAttributes, isSelected }) {
  const {
    productId,
    showPrice,
    showRating,
    showAddToCart,
    imageSize,
    layout,
  } = attributes;

  // Fetch product data
  const { product, isLoading } = useSelect(
    (select) => {
      if (!productId) {
        return { product: null, isLoading: false };
      }

      const { getEntityRecord, isResolving } = select(coreStore);

      return {
        product: getEntityRecord('postType', 'product', productId),
        isLoading: isResolving('getEntityRecord', [
          'postType',
          'product',
          productId,
        ]),
      };
    },
    [productId]
  );

  const blockProps = useBlockProps({
    className: `product-card product-card--${layout}`,
  });

  // No product selected - show selector
  if (!productId) {
    return (
      <div {...blockProps}>
        <Placeholder
          icon="products"
          label={__('Product Card', 'artisanat-blocks')}
          instructions={__(
            'Sélectionnez un produit à afficher.',
            'artisanat-blocks'
          )}
        >
          <ProductSelector
            onSelect={(id) => setAttributes({ productId: id })}
          />
        </Placeholder>
      </div>
    );
  }

  // Loading
  if (isLoading) {
    return (
      <div {...blockProps}>
        <Placeholder
          icon="products"
          label={__('Chargement...', 'artisanat-blocks')}
        >
          <Spinner />
        </Placeholder>
      </div>
    );
  }

  return (
    <>
      {/* Toolbar */}
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon="update"
            label={__('Changer de produit', 'artisanat-blocks')}
            onClick={() => setAttributes({ productId: undefined })}
          />
        </ToolbarGroup>
      </BlockControls>

      {/* Sidebar Inspector */}
      <InspectorControls>
        <PanelBody
          title={__('Paramètres', 'artisanat-blocks')}
          initialOpen={true}
        >
          <SelectControl
            label={__('Layout', 'artisanat-blocks')}
            value={layout}
            options={[
              { label: __('Vertical', 'artisanat-blocks'), value: 'vertical' },
              {
                label: __('Horizontal', 'artisanat-blocks'),
                value: 'horizontal',
              },
            ]}
            onChange={(value) => setAttributes({ layout: value })}
          />

          <SelectControl
            label={__('Taille de l\'image', 'artisanat-blocks')}
            value={imageSize}
            options={[
              { label: __('Miniature', 'artisanat-blocks'), value: 'thumbnail' },
              { label: __('Moyenne', 'artisanat-blocks'), value: 'medium' },
              { label: __('Grande', 'artisanat-blocks'), value: 'large' },
              { label: __('Originale', 'artisanat-blocks'), value: 'full' },
            ]}
            onChange={(value) => setAttributes({ imageSize: value })}
          />
        </PanelBody>

        <PanelBody
          title={__('Affichage', 'artisanat-blocks')}
          initialOpen={true}
        >
          <ToggleControl
            label={__('Afficher le prix', 'artisanat-blocks')}
            checked={showPrice}
            onChange={(value) => setAttributes({ showPrice: value })}
          />

          <ToggleControl
            label={__('Afficher les avis', 'artisanat-blocks')}
            checked={showRating}
            onChange={(value) => setAttributes({ showRating: value })}
          />

          <ToggleControl
            label={__('Bouton Ajouter au panier', 'artisanat-blocks')}
            checked={showAddToCart}
            onChange={(value) => setAttributes({ showAddToCart: value })}
          />
        </PanelBody>
      </InspectorControls>

      {/* Block Preview */}
      <div {...blockProps}>
        <ProductCardPreview
          product={product}
          imageSize={imageSize}
          showPrice={showPrice}
          showRating={showRating}
          showAddToCart={showAddToCart}
          layout={layout}
        />
      </div>
    </>
  );
}
```

---

### render.php (Bloc Dynamique)

```php
<?php
/**
 * Product Card Block - Server-side rendering
 *
 * @package Artisanat_Blocks
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content.
 * @var WP_Block $block      Block instance.
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

// Get attributes with defaults.
$product_id      = $attributes['productId'] ?? 0;
$show_price      = $attributes['showPrice'] ?? true;
$show_rating     = $attributes['showRating'] ?? true;
$show_add_to_cart = $attributes['showAddToCart'] ?? true;
$image_size      = $attributes['imageSize'] ?? 'medium';
$layout          = $attributes['layout'] ?? 'vertical';

// Bail if no product.
if ( ! $product_id ) {
    return;
}

// Get product.
$product = wc_get_product( $product_id );

if ( ! $product ) {
    return;
}

// Build wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes(
    array(
        'class' => sprintf(
            'product-card product-card--%s',
            esc_attr( $layout )
        ),
        'data-wp-interactive' => 'artisanat/product-card',
        'data-wp-context'     => wp_json_encode(
            array(
                'productId' => $product_id,
                'inCart'    => false,
                'loading'   => false,
            )
        ),
    )
);

// Get product data.
$permalink     = $product->get_permalink();
$title         = $product->get_name();
$image_id      = $product->get_image_id();
$price_html    = $product->get_price_html();
$average_rating = $product->get_average_rating();
$review_count  = $product->get_review_count();
?>

<article <?php echo $wrapper_attributes; // phpcs:ignore ?>>
    <?php if ( $image_id ) : ?>
        <a href="<?php echo esc_url( $permalink ); ?>" class="product-card__image-link">
            <?php echo wp_get_attachment_image( $image_id, $image_size, false, array( 'class' => 'product-card__image' ) ); ?>
        </a>
    <?php endif; ?>

    <div class="product-card__content">
        <h3 class="product-card__title">
            <a href="<?php echo esc_url( $permalink ); ?>">
                <?php echo esc_html( $title ); ?>
            </a>
        </h3>

        <?php if ( $show_rating && $average_rating > 0 ) : ?>
            <div class="product-card__rating" aria-label="<?php echo esc_attr( sprintf( __( 'Note : %s sur 5', 'artisanat-blocks' ), $average_rating ) ); ?>">
                <?php echo wc_get_rating_html( $average_rating, $review_count ); // phpcs:ignore ?>
                <span class="product-card__review-count">
                    (<?php echo esc_html( $review_count ); ?>)
                </span>
            </div>
        <?php endif; ?>

        <?php if ( $show_price ) : ?>
            <div class="product-card__price">
                <?php echo $price_html; // phpcs:ignore ?>
            </div>
        <?php endif; ?>

        <?php if ( $show_add_to_cart && $product->is_purchasable() && $product->is_in_stock() ) : ?>
            <button
                class="product-card__add-to-cart wp-element-button"
                data-wp-on--click="actions.addToCart"
                data-wp-class--is-loading="context.loading"
                data-wp-class--is-added="context.inCart"
                aria-label="<?php echo esc_attr( sprintf( __( 'Ajouter « %s » au panier', 'artisanat-blocks' ), $title ) ); ?>"
            >
                <span data-wp-text="state.buttonText">
                    <?php esc_html_e( 'Ajouter au panier', 'artisanat-blocks' ); ?>
                </span>
            </button>
        <?php endif; ?>
    </div>
</article>
```

---

### view.js (Interactivity API)

```javascript
/**
 * WordPress dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

/**
 * Store definition for Product Card block
 */
store('artisanat/product-card', {
  state: {
    get buttonText() {
      const context = getContext();

      if (context.loading) {
        return 'Ajout...';
      }

      if (context.inCart) {
        return '✓ Ajouté';
      }

      return 'Ajouter au panier';
    },
  },

  actions: {
    *addToCart() {
      const context = getContext();

      // Already in cart or loading
      if (context.inCart || context.loading) {
        return;
      }

      // Set loading state
      context.loading = true;

      try {
        // Call WooCommerce Store API
        const response = yield fetch('/wp-json/wc/store/v1/cart/add-item', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Nonce': window.wcBlocksMiddlewareConfig?.nonce || '',
          },
          body: JSON.stringify({
            id: context.productId,
            quantity: 1,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add to cart');
        }

        // Success
        context.inCart = true;

        // Trigger mini-cart refresh event
        document.dispatchEvent(
          new CustomEvent('wc-blocks_added_to_cart', {
            detail: { productId: context.productId },
          })
        );
      } catch (error) {
        console.error('Add to cart error:', error);
        // Could show error notification here
      } finally {
        context.loading = false;
      }
    },
  },
});
```

---

### style.scss

```scss
/**
 * Product Card Block - Frontend + Editor styles
 */

.product-card {
  display: flex;
  flex-direction: column;
  background: var(--wp--preset--color--surface);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: var(--wp--preset--shadow--lg);
    transform: translateY(-2px);
  }

  // Layouts
  &--vertical {
    flex-direction: column;
  }

  &--horizontal {
    flex-direction: row;

    .product-card__image-link {
      width: 40%;
      flex-shrink: 0;
    }

    .product-card__content {
      flex: 1;
    }
  }

  // Image
  &__image-link {
    display: block;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    transition: transform 0.3s ease;

    .product-card:hover & {
      transform: scale(1.05);
    }
  }

  // Content
  &__content {
    padding: var(--wp--preset--spacing--4);
    display: flex;
    flex-direction: column;
    gap: var(--wp--preset--spacing--2);
  }

  // Title
  &__title {
    font-family: var(--wp--preset--font-family--heading);
    font-size: var(--wp--preset--font-size--lg);
    font-weight: 600;
    margin: 0;
    line-height: 1.3;

    a {
      color: var(--wp--preset--color--secondary);
      text-decoration: none;

      &:hover {
        color: var(--wp--preset--color--primary);
      }
    }
  }

  // Rating
  &__rating {
    display: flex;
    align-items: center;
    gap: var(--wp--preset--spacing--1);
    font-size: var(--wp--preset--font-size--sm);
    color: var(--wp--preset--color--text-secondary);

    .star-rating {
      color: var(--wp--preset--color--warning);
    }
  }

  // Price
  &__price {
    font-size: var(--wp--preset--font-size--xl);
    font-weight: 700;
    color: var(--wp--preset--color--secondary);

    del {
      color: var(--wp--preset--color--text-muted);
      font-weight: 400;
      font-size: var(--wp--preset--font-size--base);
    }

    ins {
      text-decoration: none;
      color: var(--wp--preset--color--error);
    }
  }

  // Add to cart button
  &__add-to-cart {
    margin-top: auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wp--preset--spacing--2);
    cursor: pointer;

    &.is-loading {
      opacity: 0.7;
      cursor: wait;
    }

    &.is-added {
      background: var(--wp--preset--color--success);

      &:hover {
        background: var(--wp--preset--color--success);
      }
    }
  }
}
```

---

### Tests (Jest + @wordpress/scripts)

```javascript
// src/blocks/product-card/test/edit.test.js

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Edit from '../edit';

// Mock WordPress dependencies
jest.mock('@wordpress/block-editor', () => ({
  useBlockProps: () => ({}),
  InspectorControls: ({ children }) => <div data-testid="inspector">{children}</div>,
  BlockControls: ({ children }) => <div data-testid="toolbar">{children}</div>,
}));

jest.mock('@wordpress/data', () => ({
  useSelect: jest.fn(),
}));

import { useSelect } from '@wordpress/data';

describe('Product Card Edit', () => {
  const defaultProps = {
    attributes: {
      productId: undefined,
      showPrice: true,
      showRating: true,
      showAddToCart: true,
      imageSize: 'medium',
      layout: 'vertical',
    },
    setAttributes: jest.fn(),
    isSelected: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useSelect.mockReturnValue({ product: null, isLoading: false });
  });

  it('shows placeholder when no product selected', () => {
    render(<Edit {...defaultProps} />);

    expect(screen.getByText('Product Card')).toBeInTheDocument();
    expect(screen.getByText(/Sélectionnez un produit/)).toBeInTheDocument();
  });

  it('shows spinner when loading', () => {
    useSelect.mockReturnValue({ product: null, isLoading: true });

    render(<Edit {...defaultProps} attributes={{ ...defaultProps.attributes, productId: 123 }} />);

    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  it('renders product preview when product is loaded', () => {
    const mockProduct = {
      id: 123,
      title: { rendered: 'Test Product' },
    };

    useSelect.mockReturnValue({ product: mockProduct, isLoading: false });

    render(<Edit {...defaultProps} attributes={{ ...defaultProps.attributes, productId: 123 }} />);

    expect(screen.getByTestId('inspector')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar')).toBeInTheDocument();
  });
});
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Pas de block.json | Configuration hardcodée | Toujours utiliser block.json |
| save.js pour dynamique | Markup obsolète | Utiliser render.php |
| Ignorer les supports | Pas de contrôles couleur/spacing | Activer les supports |
| Styles inline | Non maintenable | Utiliser SCSS + variables WP |
| Pas d'i18n | Non traduisible | Utiliser __() partout |
| Pas de a11y | Non accessible | ARIA + keyboard |

## Références

- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Interactivity API](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/)
- [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/)
- Livrables liés : `theme-json-config`, `block-pattern`, `component-specs`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | wordpress-gutenberg-expert | Création initiale |
