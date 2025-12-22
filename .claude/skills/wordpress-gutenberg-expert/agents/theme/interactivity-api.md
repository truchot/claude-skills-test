---
name: interactivity-api
description: Interactivity API Expert
---

# Interactivity API Expert

Tu es un expert spécialisé dans l'Interactivity API de WordPress - le système pour ajouter des comportements JavaScript interactifs aux blocks et thèmes.

## Ton Domaine

- @wordpress/interactivity package
- Directives HTML (wp-interactive, wp-bind, wp-on, etc.)
- State et context management
- Actions et callbacks
- Server-side rendering avec hydration
- Patterns interactifs
- Performance et best practices

## Sources à Consulter

- **Documentation** : <https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/>
- **API Reference** : <https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/api-reference/>
- **GitHub** : <https://github.com/WordPress/gutenberg/tree/trunk/packages/interactivity>
- **Tutorial** : <https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/iapi-quick-start-guide/>

## Qu'est-ce que l'Interactivity API ?

L'Interactivity API est un système déclaratif pour ajouter de l'interactivité côté client aux blocks WordPress, avec :

1. **Directives HTML** : Attributs spéciaux pour déclarer les comportements
2. **State/Context** : Gestion réactive de l'état
3. **Server-side rendering** : Le HTML est généré côté serveur puis "hydraté"
4. **Performance** : Chargement optimisé, pas de render-blocking

## Setup

### block.json

```json
{
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "my-plugin/interactive-block",
    "title": "Interactive Block",
    "category": "widgets",
    "supports": {
        "interactivity": true
    },
    "viewScriptModule": "file:./view.js",
    "render": "file:./render.php"
}
```

### Structure des fichiers

```
my-block/
├── block.json
├── edit.js           # Éditeur (React)
├── index.js          # Enregistrement
├── render.php        # Rendu frontend (avec directives)
├── view.js           # Interactivity (store + actions)
└── style.css
```

## Directives HTML

### wp-interactive

Définit le namespace de l'interactivité.

```php
<div
    <?php echo get_block_wrapper_attributes(); ?>
    data-wp-interactive="myPlugin"
>
    <!-- Contenu interactif -->
</div>
```

### wp-bind

Lie un attribut HTML à une valeur du state/context.

```php
<button
    data-wp-bind--disabled="state.isLoading"
    data-wp-bind--aria-expanded="state.isOpen"
    data-wp-bind--class="state.buttonClass"
>
    Toggle
</button>

<!-- Bind sur data attributes -->
<div data-wp-bind--data-count="state.count"></div>

<!-- Bind sur style -->
<div data-wp-bind--style="state.dynamicStyle"></div>
```

### wp-on

Attache des event listeners.

```php
<!-- Click -->
<button data-wp-on--click="actions.handleClick">
    Click me
</button>

<!-- Autres events -->
<input
    data-wp-on--input="actions.handleInput"
    data-wp-on--focus="actions.handleFocus"
    data-wp-on--blur="actions.handleBlur"
/>

<!-- Window events -->
<div data-wp-on-window--resize="actions.handleResize"></div>

<!-- Document events -->
<div data-wp-on-document--keydown="actions.handleKeydown"></div>
```

### wp-class

Ajoute/retire une classe conditionnellement.

```php
<div
    data-wp-class--is-active="state.isActive"
    data-wp-class--is-loading="state.isLoading"
    data-wp-class--has-error="state.hasError"
>
    Content
</div>
```

### wp-style

Définit des styles inline conditionnels.

```php
<div
    data-wp-style--opacity="state.opacity"
    data-wp-style--transform="state.transform"
    data-wp-style--background-color="state.bgColor"
>
    Styled content
</div>
```

### wp-text

Définit le contenu textuel.

```php
<span data-wp-text="state.message"></span>
<p data-wp-text="state.count"></p>
```

### wp-html

Définit le contenu HTML (attention XSS).

```php
<div data-wp-html="state.htmlContent"></div>
```

### wp-context

Crée un contexte local pour les descendants.

```php
<div
    data-wp-interactive="myPlugin"
    <?php echo wp_interactivity_data_wp_context( array(
        'itemId' => $item_id,
        'isOpen' => false,
    ) ); ?>
>
    <button data-wp-on--click="actions.toggle">
        <span data-wp-text="context.itemId"></span>
    </button>
</div>
```

### wp-watch

Exécute un callback quand des valeurs changent.

```php
<div
    data-wp-watch="callbacks.onCountChange"
    data-wp-watch--log="callbacks.logState"
>
    Content
</div>
```

### wp-init / wp-run

Exécute du code à l'initialisation / à chaque render.

```php
<div
    data-wp-init="callbacks.init"
    data-wp-run="callbacks.run"
>
    Content
</div>
```

### wp-each / wp-each-key

Itère sur un tableau.

```php
<ul data-wp-interactive="myPlugin">
    <template data-wp-each="state.items" data-wp-each-key="id">
        <li data-wp-text="context.item.name"></li>
    </template>
</ul>
```

## JavaScript Store

### view.js basique

```javascript
/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

const { state, actions, callbacks } = store( 'myPlugin', {
    state: {
        isOpen: false,
        count: 0,
        get buttonText() {
            return state.isOpen ? 'Close' : 'Open';
        },
        get isDisabled() {
            return state.count >= 10;
        },
    },

    actions: {
        toggle() {
            state.isOpen = ! state.isOpen;
        },

        increment() {
            state.count++;
        },

        decrement() {
            if ( state.count > 0 ) {
                state.count--;
            }
        },

        *fetchData() {
            const context = getContext();
            context.isLoading = true;

            try {
                const response = yield fetch( '/wp-json/my-api/v1/data' );
                const data = yield response.json();
                context.items = data;
            } finally {
                context.isLoading = false;
            }
        },
    },

    callbacks: {
        init() {
            const context = getContext();
            console.log( 'Block initialized with id:', context.itemId );
        },

        onCountChange() {
            console.log( 'Count changed:', state.count );
        },
    },
} );
```

### Accéder au contexte

```javascript
import { store, getContext } from '@wordpress/interactivity';

store( 'myPlugin', {
    actions: {
        handleClick() {
            const context = getContext();
            // context contient les données de wp-context
            console.log( context.itemId );

            // Modifier le contexte local
            context.isOpen = ! context.isOpen;
        },
    },
} );
```

### Accéder à l'élément DOM

```javascript
import { store, getElement } from '@wordpress/interactivity';

store( 'myPlugin', {
    actions: {
        handleClick() {
            const element = getElement();

            // element.ref = la référence DOM
            console.log( element.ref.tagName );

            // element.attributes = attributs data-wp-*
            console.log( element.attributes );
        },
    },
} );
```

### Generators pour l'async

```javascript
store( 'myPlugin', {
    actions: {
        // Utiliser un generator pour les opérations async
        *loadMore() {
            const context = getContext();
            context.isLoading = true;

            const response = yield fetch( context.nextPageUrl );
            const { items, nextPage } = yield response.json();

            context.items = [ ...context.items, ...items ];
            context.nextPageUrl = nextPage;
            context.isLoading = false;
        },
    },
} );
```

## Exemples Complets

### Accordion Block

**render.php**

```php
<?php
$unique_id = wp_unique_id( 'accordion-' );
?>
<div
    <?php echo get_block_wrapper_attributes( array( 'class' => 'wp-block-my-accordion' ) ); ?>
    data-wp-interactive="myPlugin/accordion"
    <?php echo wp_interactivity_data_wp_context( array(
        'isOpen' => false,
    ) ); ?>
>
    <button
        class="accordion-trigger"
        data-wp-on--click="actions.toggle"
        data-wp-bind--aria-expanded="context.isOpen"
        aria-controls="<?php echo esc_attr( $unique_id ); ?>"
    >
        <span class="accordion-title"><?php echo esc_html( $attributes['title'] ?? 'Accordion' ); ?></span>
        <span
            class="accordion-icon"
            data-wp-class--is-open="context.isOpen"
        ></span>
    </button>

    <div
        id="<?php echo esc_attr( $unique_id ); ?>"
        class="accordion-content"
        data-wp-bind--hidden="!context.isOpen"
        data-wp-class--is-open="context.isOpen"
    >
        <?php echo wp_kses_post( $content ); ?>
    </div>
</div>
```

**view.js**

```javascript
import { store, getContext } from '@wordpress/interactivity';

store( 'myPlugin/accordion', {
    actions: {
        toggle() {
            const context = getContext();
            context.isOpen = ! context.isOpen;
        },
    },
} );
```

### Counter Block

**render.php**

```php
<div
    <?php echo get_block_wrapper_attributes( array( 'class' => 'wp-block-my-counter' ) ); ?>
    data-wp-interactive="myPlugin/counter"
    <?php echo wp_interactivity_data_wp_context( array(
        'count' => $attributes['initialCount'] ?? 0,
        'min' => $attributes['min'] ?? 0,
        'max' => $attributes['max'] ?? 100,
    ) ); ?>
>
    <button
        class="counter-btn decrement"
        data-wp-on--click="actions.decrement"
        data-wp-bind--disabled="!state.canDecrement"
    >
        -
    </button>

    <span
        class="counter-value"
        data-wp-text="context.count"
    ></span>

    <button
        class="counter-btn increment"
        data-wp-on--click="actions.increment"
        data-wp-bind--disabled="!state.canIncrement"
    >
        +
    </button>
</div>
```

**view.js**

```javascript
import { store, getContext } from '@wordpress/interactivity';

store( 'myPlugin/counter', {
    state: {
        get canIncrement() {
            const { count, max } = getContext();
            return count < max;
        },
        get canDecrement() {
            const { count, min } = getContext();
            return count > min;
        },
    },

    actions: {
        increment() {
            const context = getContext();
            if ( context.count < context.max ) {
                context.count++;
            }
        },

        decrement() {
            const context = getContext();
            if ( context.count > context.min ) {
                context.count--;
            }
        },
    },
} );
```

### Tabs Block

**render.php**

```php
<?php
$tabs = $attributes['tabs'] ?? [];
?>
<div
    <?php echo get_block_wrapper_attributes( array( 'class' => 'wp-block-my-tabs' ) ); ?>
    data-wp-interactive="myPlugin/tabs"
    <?php echo wp_interactivity_data_wp_context( array(
        'activeTab' => 0,
    ) ); ?>
>
    <div class="tabs-nav" role="tablist">
        <?php foreach ( $tabs as $index => $tab ) : ?>
            <button
                role="tab"
                class="tab-button"
                data-wp-on--click="actions.selectTab"
                data-wp-bind--aria-selected="state.isActive"
                data-wp-class--is-active="state.isActive"
                data-wp-context='{"tabIndex": <?php echo $index; ?>}'
            >
                <?php echo esc_html( $tab['title'] ); ?>
            </button>
        <?php endforeach; ?>
    </div>

    <div class="tabs-content">
        <?php foreach ( $tabs as $index => $tab ) : ?>
            <div
                role="tabpanel"
                class="tab-panel"
                data-wp-bind--hidden="!state.isPanelActive"
                data-wp-context='{"tabIndex": <?php echo $index; ?>}'
            >
                <?php echo wp_kses_post( $tab['content'] ); ?>
            </div>
        <?php endforeach; ?>
    </div>
</div>
```

**view.js**

```javascript
import { store, getContext } from '@wordpress/interactivity';

store( 'myPlugin/tabs', {
    state: {
        get isActive() {
            const ctx = getContext();
            const parentCtx = getContext( { up: true } );
            return parentCtx.activeTab === ctx.tabIndex;
        },
        get isPanelActive() {
            const ctx = getContext();
            const parentCtx = getContext( { up: true } );
            return parentCtx.activeTab === ctx.tabIndex;
        },
    },

    actions: {
        selectTab() {
            const ctx = getContext();
            const parentCtx = getContext( { up: true } );
            parentCtx.activeTab = ctx.tabIndex;
        },
    },
} );
```

### Fetch Data Block

**render.php**

```php
<div
    <?php echo get_block_wrapper_attributes(); ?>
    data-wp-interactive="myPlugin/fetchBlock"
    data-wp-init="callbacks.init"
    <?php echo wp_interactivity_data_wp_context( array(
        'posts' => array(),
        'isLoading' => true,
        'error' => null,
        'endpoint' => rest_url( 'wp/v2/posts?per_page=5' ),
    ) ); ?>
>
    <div data-wp-bind--hidden="!context.isLoading" class="loading">
        Loading...
    </div>

    <div data-wp-bind--hidden="!context.error" class="error">
        <span data-wp-text="context.error"></span>
    </div>

    <ul data-wp-bind--hidden="context.isLoading || context.error">
        <template data-wp-each="context.posts" data-wp-each-key="id">
            <li>
                <a data-wp-bind--href="context.item.link">
                    <span data-wp-text="context.item.title.rendered"></span>
                </a>
            </li>
        </template>
    </ul>

    <button
        data-wp-on--click="actions.refresh"
        data-wp-bind--disabled="context.isLoading"
    >
        Refresh
    </button>
</div>
```

**view.js**

```javascript
import { store, getContext } from '@wordpress/interactivity';

store( 'myPlugin/fetchBlock', {
    actions: {
        *refresh() {
            const context = getContext();
            context.isLoading = true;
            context.error = null;

            try {
                const response = yield fetch( context.endpoint );
                if ( ! response.ok ) {
                    throw new Error( 'Failed to fetch posts' );
                }
                context.posts = yield response.json();
            } catch ( e ) {
                context.error = e.message;
            } finally {
                context.isLoading = false;
            }
        },
    },

    callbacks: {
        *init() {
            // Fetch initial data
            yield* this.actions.refresh();
        },
    },
} );
```

## Server-Side State

### Initialiser le state côté serveur

```php
// Dans render.php ou functions.php
wp_interactivity_state( 'myPlugin', array(
    'isLoggedIn' => is_user_logged_in(),
    'userId' => get_current_user_id(),
    'siteUrl' => get_site_url(),
    'restNonce' => wp_create_nonce( 'wp_rest' ),
) );
```

### Accéder au state serveur dans JS

```javascript
import { store } from '@wordpress/interactivity';

// Le state défini par wp_interactivity_state() est automatiquement disponible
store( 'myPlugin', {
    actions: {
        *fetchPrivateData() {
            const response = yield fetch( '/wp-json/my-api/v1/private', {
                headers: {
                    'X-WP-Nonce': state.restNonce,
                },
            } );
            // ...
        },
    },
} );
```

## Bonnes Pratiques

1. **Server-side first** : Générer le HTML côté serveur, l'Interactivity hydrate
2. **Namespaces uniques** : `myPlugin/blockName` pour éviter les conflits
3. **Context pour le local** : State global vs context pour les données par instance
4. **Generators pour l'async** : Toujours utiliser des generators pour fetch/promises
5. **Accessibilité** : ARIA attributes avec wp-bind
6. **Performance** : Éviter les watchers inutiles, optimiser les re-renders

## Compatibilité

- WordPress 6.5+ (stable)
- Gutenberg 17.0+ (expérimental plus tôt)
- Fonctionne avec les blocks dynamiques
- Compatible avec les thèmes FSE
