---
id: wp-hooks-implementation
name: WordPress Hooks Implementation
version: 1.0.0
category: wordpress
status: active
phase: "4-realisation"
order: 6
agents:
  - wordpress-gutenberg-expert/core/hooks-filters
  - wordpress-gutenberg-expert/core/actions
  - backend-developer/architecture/event-driven
consumes:
  - technical-specification
  - custom-post-type
produces_for:
  - wordpress-gutenberg-expert/gutenberg-blocks/block-development
  - testing-process/testing/unit-tests
workflows:
  - id: wf-hooks-implementation
    template: wf-creation
    phase: Réalisation
    name: Implémentation hooks WordPress
    duration: 0.5-1 jour
tags: [wordpress, hooks, actions, filters, events, extensibility]
---

# WordPress Hooks Implementation

## Description

Système d'actions et de filtres WordPress pour étendre les fonctionnalités du core, des thèmes ou plugins. Inclut la création de hooks custom pour rendre le code extensible par des tiers.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Code PHP |
| **Emplacement** | `wp-content/plugins/[plugin]/includes/hooks/` |
| **Nommage** | `class-[feature]-hooks.php` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Éléments Obligatoires

- [ ] **Hook registration** - `add_action()` / `add_filter()`
- [ ] **Callback function** - Fonction de traitement
- [ ] **Priority** - Ordre d'exécution
- [ ] **Documentation** - PHPDoc complet

### Éléments Optionnels

- [ ] **Custom hooks** - `do_action()` / `apply_filters()`
- [ ] **Conditional hooks** - Basés sur le contexte
- [ ] **Hook removal** - `remove_action()` / `remove_filter()`

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | PHPDoc | Tous hooks documentés | Auto (PHPCS) | Oui |
| 2 | Naming | Préfixe unique | Manuel | Oui |
| 3 | Priority | Justifiée si != 10 | Manuel | Oui |
| 4 | Testable | Hooks mockables | Manuel | Non |

## Exemple

### Hooks Complets - E-commerce Artisanat

```php
<?php
/**
 * WooCommerce Hooks for Artisanat
 *
 * @package Artisanat
 * @since 1.0.0
 */

namespace Artisanat\Hooks;

defined( 'ABSPATH' ) || exit;

/**
 * Class WooCommerce_Hooks
 */
class WooCommerce_Hooks {

    /**
     * Initialize hooks.
     */
    public function __construct() {
        // === ACTIONS === //

        // After order completed - send thank you email
        add_action( 'woocommerce_order_status_completed', array( $this, 'send_artisan_thank_you' ), 20, 1 );

        // Before single product - add badges
        add_action( 'woocommerce_before_single_product', array( $this, 'add_product_badges' ), 5 );

        // After add to cart - track for analytics
        add_action( 'woocommerce_add_to_cart', array( $this, 'track_add_to_cart' ), 10, 6 );

        // Custom hook point for extensibility
        add_action( 'artisanat_after_product_badge', array( $this, 'maybe_add_custom_badge' ), 10, 2 );

        // === FILTERS === //

        // Modify product title display
        add_filter( 'the_title', array( $this, 'add_handmade_label' ), 10, 2 );

        // Custom price HTML
        add_filter( 'woocommerce_get_price_html', array( $this, 'customize_price_html' ), 10, 2 );

        // Add custom product tabs
        add_filter( 'woocommerce_product_tabs', array( $this, 'add_artisan_tab' ), 20, 1 );

        // Modify checkout fields
        add_filter( 'woocommerce_checkout_fields', array( $this, 'customize_checkout_fields' ), 10, 1 );

        // Custom email content
        add_filter( 'woocommerce_email_footer_text', array( $this, 'custom_email_footer' ), 10, 1 );
    }

    // =========================================================================
    // ACTIONS CALLBACKS
    // =========================================================================

    /**
     * Send personalized thank you email from artisan.
     *
     * @param int $order_id Order ID.
     */
    public function send_artisan_thank_you( $order_id ) {
        $order = wc_get_order( $order_id );

        if ( ! $order ) {
            return;
        }

        // Check if already sent
        if ( $order->get_meta( '_artisan_thank_you_sent' ) ) {
            return;
        }

        /**
         * Filter whether to send artisan thank you email.
         *
         * @since 1.0.0
         *
         * @param bool     $send     Whether to send. Default true.
         * @param WC_Order $order    Order object.
         */
        $should_send = apply_filters( 'artisanat_send_thank_you_email', true, $order );

        if ( ! $should_send ) {
            return;
        }

        // Send email logic here...
        $this->send_thank_you_email( $order );

        // Mark as sent
        $order->update_meta_data( '_artisan_thank_you_sent', true );
        $order->save();

        /**
         * Fires after artisan thank you email is sent.
         *
         * @since 1.0.0
         *
         * @param WC_Order $order Order object.
         */
        do_action( 'artisanat_after_thank_you_email_sent', $order );
    }

    /**
     * Add product badges (handmade, local, eco).
     */
    public function add_product_badges() {
        global $product;

        if ( ! $product ) {
            return;
        }

        $badges = array();

        // Handmade badge
        if ( $product->get_meta( '_is_handmade' ) ) {
            $badges[] = array(
                'type'  => 'handmade',
                'label' => __( 'Fait main', 'artisanat' ),
                'icon'  => 'hand',
            );
        }

        // Local badge
        if ( $product->get_meta( '_is_local' ) ) {
            $badges[] = array(
                'type'  => 'local',
                'label' => __( 'Production locale', 'artisanat' ),
                'icon'  => 'location',
            );
        }

        // Eco-friendly badge
        if ( $product->get_meta( '_is_eco_friendly' ) ) {
            $badges[] = array(
                'type'  => 'eco',
                'label' => __( 'Éco-responsable', 'artisanat' ),
                'icon'  => 'leaf',
            );
        }

        /**
         * Filter product badges.
         *
         * @since 1.0.0
         *
         * @param array      $badges  Array of badge data.
         * @param WC_Product $product Product object.
         */
        $badges = apply_filters( 'artisanat_product_badges', $badges, $product );

        if ( empty( $badges ) ) {
            return;
        }

        echo '<div class="artisanat-badges">';
        foreach ( $badges as $badge ) {
            printf(
                '<span class="artisanat-badge artisanat-badge--%s" title="%s">
                    <span class="artisanat-badge__icon dashicons dashicons-%s"></span>
                    <span class="artisanat-badge__label">%s</span>
                </span>',
                esc_attr( $badge['type'] ),
                esc_attr( $badge['label'] ),
                esc_attr( $badge['icon'] ),
                esc_html( $badge['label'] )
            );

            /**
             * Fires after each product badge.
             *
             * @since 1.0.0
             *
             * @param array      $badge   Badge data.
             * @param WC_Product $product Product object.
             */
            do_action( 'artisanat_after_product_badge', $badge, $product );
        }
        echo '</div>';
    }

    /**
     * Track add to cart for analytics.
     *
     * @param string $cart_item_key  Cart item key.
     * @param int    $product_id     Product ID.
     * @param int    $quantity       Quantity.
     * @param int    $variation_id   Variation ID.
     * @param array  $variation      Variation data.
     * @param array  $cart_item_data Cart item data.
     */
    public function track_add_to_cart( $cart_item_key, $product_id, $quantity, $variation_id, $variation, $cart_item_data ) {
        $product = wc_get_product( $variation_id ? $variation_id : $product_id );

        if ( ! $product ) {
            return;
        }

        $event_data = array(
            'event'       => 'add_to_cart',
            'product_id'  => $product_id,
            'product_name' => $product->get_name(),
            'price'       => $product->get_price(),
            'quantity'    => $quantity,
            'currency'    => get_woocommerce_currency(),
        );

        /**
         * Filter add to cart tracking data.
         *
         * @since 1.0.0
         *
         * @param array      $event_data Event data.
         * @param WC_Product $product    Product object.
         */
        $event_data = apply_filters( 'artisanat_add_to_cart_tracking_data', $event_data, $product );

        /**
         * Fires when product is added to cart (for tracking).
         *
         * @since 1.0.0
         *
         * @param array $event_data Tracking event data.
         */
        do_action( 'artisanat_track_add_to_cart', $event_data );
    }

    // =========================================================================
    // FILTERS CALLBACKS
    // =========================================================================

    /**
     * Add "Fait main" label to handmade product titles.
     *
     * @param string $title   Post title.
     * @param int    $post_id Post ID.
     * @return string Modified title.
     */
    public function add_handmade_label( $title, $post_id ) {
        // Only on frontend, for products, in main loop
        if ( is_admin() || ! is_singular( 'product' ) || ! in_the_loop() ) {
            return $title;
        }

        $product = wc_get_product( $post_id );

        if ( ! $product || ! $product->get_meta( '_is_handmade' ) ) {
            return $title;
        }

        /**
         * Filter the handmade label text.
         *
         * @since 1.0.0
         *
         * @param string     $label   Label text.
         * @param WC_Product $product Product object.
         */
        $label = apply_filters(
            'artisanat_handmade_label',
            __( '✋ Fait main', 'artisanat' ),
            $product
        );

        return $title . ' <span class="handmade-label">' . esc_html( $label ) . '</span>';
    }

    /**
     * Customize price HTML for artisan products.
     *
     * @param string     $price_html Price HTML.
     * @param WC_Product $product    Product object.
     * @return string Modified price HTML.
     */
    public function customize_price_html( $price_html, $product ) {
        // Add "Prix artisan" prefix
        if ( $product->get_meta( '_is_handmade' ) ) {
            $prefix = '<span class="artisan-price-prefix">' . esc_html__( 'Prix artisan :', 'artisanat' ) . '</span> ';
            $price_html = $prefix . $price_html;
        }

        /**
         * Filter customized price HTML.
         *
         * @since 1.0.0
         *
         * @param string     $price_html Modified price HTML.
         * @param WC_Product $product    Product object.
         */
        return apply_filters( 'artisanat_price_html', $price_html, $product );
    }

    /**
     * Add custom artisan story tab to product page.
     *
     * @param array $tabs Existing tabs.
     * @return array Modified tabs.
     */
    public function add_artisan_tab( $tabs ) {
        global $product;

        // Only add if product has artisan story
        $artisan_story = $product ? $product->get_meta( '_artisan_story' ) : '';

        if ( empty( $artisan_story ) ) {
            return $tabs;
        }

        $tabs['artisan_story'] = array(
            'title'    => __( 'L\'histoire de l\'artisan', 'artisanat' ),
            'priority' => 15,
            'callback' => array( $this, 'render_artisan_tab' ),
        );

        /**
         * Filter product tabs after artisan tab addition.
         *
         * @since 1.0.0
         *
         * @param array      $tabs    Product tabs.
         * @param WC_Product $product Product object.
         */
        return apply_filters( 'artisanat_product_tabs', $tabs, $product );
    }

    /**
     * Render artisan story tab content.
     */
    public function render_artisan_tab() {
        global $product;

        $artisan_story = $product->get_meta( '_artisan_story' );
        $artisan_name  = $product->get_meta( '_artisan_name' );
        $artisan_photo = $product->get_meta( '_artisan_photo_id' );

        /**
         * Fires before artisan tab content.
         *
         * @since 1.0.0
         *
         * @param WC_Product $product Product object.
         */
        do_action( 'artisanat_before_artisan_tab', $product );

        ?>
        <div class="artisan-story">
            <?php if ( $artisan_photo ) : ?>
                <div class="artisan-story__photo">
                    <?php echo wp_get_attachment_image( $artisan_photo, 'medium' ); ?>
                </div>
            <?php endif; ?>

            <?php if ( $artisan_name ) : ?>
                <h3 class="artisan-story__name"><?php echo esc_html( $artisan_name ); ?></h3>
            <?php endif; ?>

            <div class="artisan-story__content">
                <?php echo wp_kses_post( $artisan_story ); ?>
            </div>
        </div>
        <?php

        /**
         * Fires after artisan tab content.
         *
         * @since 1.0.0
         *
         * @param WC_Product $product Product object.
         */
        do_action( 'artisanat_after_artisan_tab', $product );
    }

    /**
     * Customize checkout fields.
     *
     * @param array $fields Checkout fields.
     * @return array Modified fields.
     */
    public function customize_checkout_fields( $fields ) {
        // Add gift message field
        $fields['order']['gift_message'] = array(
            'type'        => 'textarea',
            'label'       => __( 'Message cadeau', 'artisanat' ),
            'placeholder' => __( 'Ajoutez un message personnel (optionnel)', 'artisanat' ),
            'class'       => array( 'form-row-wide' ),
            'required'    => false,
            'priority'    => 90,
        );

        // Add gift wrapping checkbox
        $fields['order']['gift_wrapping'] = array(
            'type'    => 'checkbox',
            'label'   => __( 'Emballage cadeau (+5€)', 'artisanat' ),
            'class'   => array( 'form-row-wide' ),
            'required' => false,
            'priority' => 91,
        );

        /**
         * Filter checkout fields after customization.
         *
         * @since 1.0.0
         *
         * @param array $fields Checkout fields.
         */
        return apply_filters( 'artisanat_checkout_fields', $fields );
    }

    /**
     * Custom email footer text.
     *
     * @param string $footer_text Footer text.
     * @return string Modified footer text.
     */
    public function custom_email_footer( $footer_text ) {
        $custom_footer = sprintf(
            /* translators: %s: site name */
            __( 'Merci de soutenir l\'artisanat local ! — L\'équipe %s', 'artisanat' ),
            get_bloginfo( 'name' )
        );

        /**
         * Filter custom email footer.
         *
         * @since 1.0.0
         *
         * @param string $custom_footer Footer text.
         */
        return apply_filters( 'artisanat_email_footer', $custom_footer );
    }

    // =========================================================================
    // HELPER METHODS
    // =========================================================================

    /**
     * Send thank you email to customer.
     *
     * @param WC_Order $order Order object.
     */
    private function send_thank_you_email( $order ) {
        $to = $order->get_billing_email();
        $subject = sprintf(
            /* translators: %s: customer first name */
            __( 'Merci %s ! Votre commande est entre de bonnes mains', 'artisanat' ),
            $order->get_billing_first_name()
        );

        /**
         * Filter thank you email arguments.
         *
         * @since 1.0.0
         *
         * @param array    $args  Email arguments.
         * @param WC_Order $order Order object.
         */
        $args = apply_filters(
            'artisanat_thank_you_email_args',
            array(
                'to'      => $to,
                'subject' => $subject,
                'order'   => $order,
            ),
            $order
        );

        // Send email using WooCommerce mailer...
        // (implementation details)
    }

    /**
     * Maybe add custom badge from third-party.
     *
     * @param array      $badge   Badge data.
     * @param WC_Product $product Product object.
     */
    public function maybe_add_custom_badge( $badge, $product ) {
        // This hook allows third-party plugins to add content after each badge
        // Example: A certification plugin could add verification icons
    }
}
```

---

### Hooks Reference Documentation

```php
<?php
/**
 * Artisanat Hooks Reference
 *
 * @package Artisanat
 */

/**
 * =============================================================================
 * ACTIONS
 * =============================================================================
 */

/**
 * Fires after artisan thank you email is sent.
 *
 * @since 1.0.0
 *
 * @param WC_Order $order Order object.
 */
do_action( 'artisanat_after_thank_you_email_sent', $order );

/**
 * Fires after each product badge.
 *
 * @since 1.0.0
 *
 * @param array      $badge   Badge data.
 * @param WC_Product $product Product object.
 */
do_action( 'artisanat_after_product_badge', $badge, $product );

/**
 * Fires when product is added to cart (for tracking).
 *
 * @since 1.0.0
 *
 * @param array $event_data Tracking event data.
 */
do_action( 'artisanat_track_add_to_cart', $event_data );

/**
 * Fires before artisan tab content.
 *
 * @since 1.0.0
 *
 * @param WC_Product $product Product object.
 */
do_action( 'artisanat_before_artisan_tab', $product );

/**
 * Fires after artisan tab content.
 *
 * @since 1.0.0
 *
 * @param WC_Product $product Product object.
 */
do_action( 'artisanat_after_artisan_tab', $product );

/**
 * =============================================================================
 * FILTERS
 * =============================================================================
 */

/**
 * Filter whether to send artisan thank you email.
 *
 * @since 1.0.0
 *
 * @param bool     $send  Whether to send. Default true.
 * @param WC_Order $order Order object.
 */
$should_send = apply_filters( 'artisanat_send_thank_you_email', true, $order );

/**
 * Filter product badges.
 *
 * @since 1.0.0
 *
 * @param array      $badges  Array of badge data.
 * @param WC_Product $product Product object.
 */
$badges = apply_filters( 'artisanat_product_badges', $badges, $product );

/**
 * Filter add to cart tracking data.
 *
 * @since 1.0.0
 *
 * @param array      $event_data Event data.
 * @param WC_Product $product    Product object.
 */
$event_data = apply_filters( 'artisanat_add_to_cart_tracking_data', $event_data, $product );

/**
 * Filter the handmade label text.
 *
 * @since 1.0.0
 *
 * @param string     $label   Label text.
 * @param WC_Product $product Product object.
 */
$label = apply_filters( 'artisanat_handmade_label', __( '✋ Fait main', 'artisanat' ), $product );

/**
 * Filter customized price HTML.
 *
 * @since 1.0.0
 *
 * @param string     $price_html Modified price HTML.
 * @param WC_Product $product    Product object.
 */
$price_html = apply_filters( 'artisanat_price_html', $price_html, $product );

/**
 * Filter checkout fields after customization.
 *
 * @since 1.0.0
 *
 * @param array $fields Checkout fields.
 */
$fields = apply_filters( 'artisanat_checkout_fields', $fields );

/**
 * Filter custom email footer.
 *
 * @since 1.0.0
 *
 * @param string $footer Footer text.
 */
$footer = apply_filters( 'artisanat_email_footer', $footer );
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Pas de préfixe | Collision de noms | Toujours préfixer |
| Priority 1 ou 999 | Difficile à overrider | Utiliser 10-20 par défaut |
| Pas de PHPDoc | Non documenté | Documenter tous les hooks |
| Callback inline | Non testable | Méthodes de classe |
| Pas de contexte | Hooks inutiles exécutés | Vérifier le contexte |

## Références

- [Plugin API/Hooks](https://developer.wordpress.org/plugins/hooks/)
- [Actions vs Filters](https://developer.wordpress.org/plugins/hooks/actions/)
- Livrables liés : `custom-post-type`, `rest-endpoint-wp`, `technical-specification`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | wordpress-gutenberg-expert | Création initiale |
