---
id: schema-markup
name: Schema Markup JSON-LD WordPress
version: 1.0.0
category: wordpress
status: active
phase: "6-lancement"
order: 9
agents:
  - wordpress-gutenberg-expert/seo/schema-markup
  - marketing/seo/structured-data
  - direction-marketing/mesure/kpis-definition
consumes:
  - custom-post-type
  - technical-specification
produces_for:
  - marketing/seo/technical-seo
  - analytics-setup
workflows:
  - id: wf-schema-implementation
    template: wf-creation
    phase: Lancement
    name: Implémentation Schema.org
    duration: 0.5-1 jour
tags: [wordpress, seo, schema, json-ld, rich-snippets, structured-data]
---

# Schema Markup JSON-LD WordPress

## Description

Implémentation des données structurées Schema.org en JSON-LD pour améliorer le SEO et permettre les Rich Snippets dans les résultats Google (étoiles, prix, disponibilité, FAQ, etc.).

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | JSON-LD dans `<script>` |
| **Emplacement** | `<head>` via `wp_head` |
| **Nommage** | N/A |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Schemas Obligatoires (E-commerce)

- [ ] **Organization** - Infos entreprise
- [ ] **WebSite** - Site avec SearchAction
- [ ] **Product** - Fiche produit
- [ ] **BreadcrumbList** - Fil d'Ariane

### Schemas Optionnels

- [ ] **LocalBusiness** - Commerce local
- [ ] **FAQPage** - Page FAQ
- [ ] **Article** - Articles blog
- [ ] **Review** - Avis clients
- [ ] **AggregateRating** - Notes moyennes

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | JSON valide | Syntaxe correcte | Auto | Oui |
| 2 | Schema valide | Google Rich Results Test | Manuel | Oui |
| 3 | Pas de warnings | Pas d'erreurs Google | Manuel | Oui |
| 4 | Dynamique | Données réelles du produit | Manuel | Oui |

## Exemple

### Implémentation Complète E-commerce

```php
<?php
/**
 * Schema.org JSON-LD Implementation for Artisanat E-commerce
 *
 * @package Artisanat
 */

namespace Artisanat\SEO;

defined( 'ABSPATH' ) || exit;

/**
 * Class Schema
 */
class Schema {

    /**
     * Initialize schema output.
     */
    public function __construct() {
        add_action( 'wp_head', array( $this, 'output_schema' ), 1 );
    }

    /**
     * Output all applicable schemas.
     */
    public function output_schema() {
        $schemas = array();

        // Always output Organization
        $schemas[] = $this->get_organization_schema();

        // Always output WebSite with SearchAction
        $schemas[] = $this->get_website_schema();

        // Breadcrumbs on all pages except homepage
        if ( ! is_front_page() ) {
            $schemas[] = $this->get_breadcrumb_schema();
        }

        // Product page
        if ( is_singular( 'product' ) ) {
            $schemas[] = $this->get_product_schema();
        }

        // Shop/Archive
        if ( is_shop() || is_product_category() ) {
            $schemas[] = $this->get_itemlist_schema();
        }

        // Blog post
        if ( is_singular( 'post' ) ) {
            $schemas[] = $this->get_article_schema();
        }

        // FAQ page (check for FAQ blocks)
        if ( is_singular() && has_block( 'artisanat/faq' ) ) {
            $schemas[] = $this->get_faq_schema();
        }

        // Local Business (if physical store)
        if ( is_front_page() || is_page( 'contact' ) ) {
            $local = $this->get_local_business_schema();
            if ( $local ) {
                $schemas[] = $local;
            }
        }

        // Output schemas
        foreach ( array_filter( $schemas ) as $schema ) {
            $this->output_json_ld( $schema );
        }
    }

    /**
     * Output JSON-LD script tag.
     *
     * @param array $schema Schema data.
     */
    private function output_json_ld( $schema ) {
        echo '<script type="application/ld+json">';
        echo wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT );
        echo '</script>' . "\n";
    }

    /**
     * Organization schema.
     *
     * @return array Schema data.
     */
    private function get_organization_schema() {
        $schema = array(
            '@context' => 'https://schema.org',
            '@type'    => 'Organization',
            '@id'      => home_url( '/#organization' ),
            'name'     => get_bloginfo( 'name' ),
            'url'      => home_url( '/' ),
            'logo'     => array(
                '@type' => 'ImageObject',
                'url'   => $this->get_logo_url(),
            ),
            'sameAs'   => array_filter( array(
                get_option( 'artisanat_facebook' ),
                get_option( 'artisanat_instagram' ),
                get_option( 'artisanat_twitter' ),
                get_option( 'artisanat_linkedin' ),
            ) ),
        );

        // Contact info
        $phone = get_option( 'artisanat_phone' );
        if ( $phone ) {
            $schema['contactPoint'] = array(
                '@type'             => 'ContactPoint',
                'telephone'         => $phone,
                'contactType'       => 'customer service',
                'availableLanguage' => array( 'French', 'English' ),
            );
        }

        return apply_filters( 'artisanat_organization_schema', $schema );
    }

    /**
     * WebSite schema with SearchAction.
     *
     * @return array Schema data.
     */
    private function get_website_schema() {
        $schema = array(
            '@context'      => 'https://schema.org',
            '@type'         => 'WebSite',
            '@id'           => home_url( '/#website' ),
            'url'           => home_url( '/' ),
            'name'          => get_bloginfo( 'name' ),
            'description'   => get_bloginfo( 'description' ),
            'publisher'     => array(
                '@id' => home_url( '/#organization' ),
            ),
            'potentialAction' => array(
                '@type'       => 'SearchAction',
                'target'      => array(
                    '@type'       => 'EntryPoint',
                    'urlTemplate' => home_url( '/?s={search_term_string}' ),
                ),
                'query-input' => 'required name=search_term_string',
            ),
        );

        return apply_filters( 'artisanat_website_schema', $schema );
    }

    /**
     * Product schema for WooCommerce.
     *
     * @return array|null Schema data or null.
     */
    private function get_product_schema() {
        global $product;

        if ( ! $product || ! is_a( $product, 'WC_Product' ) ) {
            return null;
        }

        $schema = array(
            '@context'    => 'https://schema.org',
            '@type'       => 'Product',
            '@id'         => get_permalink() . '#product',
            'name'        => $product->get_name(),
            'description' => wp_strip_all_tags( $product->get_short_description() ?: $product->get_description() ),
            'url'         => get_permalink(),
            'sku'         => $product->get_sku(),
            'brand'       => array(
                '@type' => 'Brand',
                'name'  => get_bloginfo( 'name' ),
            ),
        );

        // Image
        $image_id = $product->get_image_id();
        if ( $image_id ) {
            $schema['image'] = wp_get_attachment_url( $image_id );
        }

        // Gallery images
        $gallery_ids = $product->get_gallery_image_ids();
        if ( ! empty( $gallery_ids ) ) {
            $schema['image'] = array_merge(
                (array) $schema['image'],
                array_map( 'wp_get_attachment_url', $gallery_ids )
            );
        }

        // Offers (pricing)
        $schema['offers'] = array(
            '@type'           => 'Offer',
            'url'             => get_permalink(),
            'priceCurrency'   => get_woocommerce_currency(),
            'price'           => $product->get_price(),
            'availability'    => $product->is_in_stock()
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            'itemCondition'   => 'https://schema.org/NewCondition',
            'seller'          => array(
                '@id' => home_url( '/#organization' ),
            ),
            'priceValidUntil' => date( 'Y-m-d', strtotime( '+1 year' ) ),
        );

        // Sale price
        if ( $product->is_on_sale() ) {
            $schema['offers']['price'] = $product->get_sale_price();
            $schema['offers']['priceSpecification'] = array(
                '@type'                  => 'PriceSpecification',
                'price'                  => $product->get_sale_price(),
                'priceCurrency'          => get_woocommerce_currency(),
                'valueAddedTaxIncluded'  => wc_prices_include_tax(),
            );
        }

        // Shipping
        $schema['offers']['shippingDetails'] = array(
            '@type'            => 'OfferShippingDetails',
            'shippingRate'     => array(
                '@type'    => 'MonetaryAmount',
                'value'    => '5.90',
                'currency' => get_woocommerce_currency(),
            ),
            'shippingDestination' => array(
                '@type'          => 'DefinedRegion',
                'addressCountry' => 'FR',
            ),
            'deliveryTime'     => array(
                '@type'         => 'ShippingDeliveryTime',
                'handlingTime'  => array(
                    '@type'    => 'QuantitativeValue',
                    'minValue' => 1,
                    'maxValue' => 2,
                    'unitCode' => 'd',
                ),
                'transitTime'   => array(
                    '@type'    => 'QuantitativeValue',
                    'minValue' => 2,
                    'maxValue' => 5,
                    'unitCode' => 'd',
                ),
            ),
        );

        // Reviews / Ratings
        $rating_count = $product->get_rating_count();
        if ( $rating_count > 0 ) {
            $schema['aggregateRating'] = array(
                '@type'       => 'AggregateRating',
                'ratingValue' => $product->get_average_rating(),
                'reviewCount' => $rating_count,
                'bestRating'  => '5',
                'worstRating' => '1',
            );

            // Individual reviews
            $reviews = get_comments( array(
                'post_id' => $product->get_id(),
                'status'  => 'approve',
                'type'    => 'review',
                'number'  => 10,
            ) );

            if ( ! empty( $reviews ) ) {
                $schema['review'] = array_map( function( $review ) {
                    $rating = get_comment_meta( $review->comment_ID, 'rating', true );
                    return array(
                        '@type'         => 'Review',
                        'author'        => array(
                            '@type' => 'Person',
                            'name'  => $review->comment_author,
                        ),
                        'datePublished' => get_comment_date( 'Y-m-d', $review ),
                        'reviewBody'    => $review->comment_content,
                        'reviewRating'  => array(
                            '@type'       => 'Rating',
                            'ratingValue' => $rating ?: 5,
                            'bestRating'  => '5',
                            'worstRating' => '1',
                        ),
                    );
                }, $reviews );
            }
        }

        // Categories
        $terms = get_the_terms( $product->get_id(), 'product_cat' );
        if ( $terms && ! is_wp_error( $terms ) ) {
            $schema['category'] = implode( ' > ', wp_list_pluck( $terms, 'name' ) );
        }

        // Artisan-specific: Handmade
        if ( $product->get_meta( '_is_handmade' ) ) {
            $schema['isHandmade'] = true;
            $schema['manufacturer'] = array(
                '@type' => 'Person',
                'name'  => $product->get_meta( '_artisan_name' ) ?: get_bloginfo( 'name' ),
            );
        }

        return apply_filters( 'artisanat_product_schema', $schema, $product );
    }

    /**
     * Breadcrumb schema.
     *
     * @return array Schema data.
     */
    private function get_breadcrumb_schema() {
        $crumbs = array();
        $position = 1;

        // Home
        $crumbs[] = array(
            '@type'    => 'ListItem',
            'position' => $position++,
            'name'     => __( 'Accueil', 'artisanat' ),
            'item'     => home_url( '/' ),
        );

        // Shop page
        if ( is_woocommerce() ) {
            $shop_page_id = wc_get_page_id( 'shop' );
            if ( $shop_page_id > 0 ) {
                $crumbs[] = array(
                    '@type'    => 'ListItem',
                    'position' => $position++,
                    'name'     => get_the_title( $shop_page_id ),
                    'item'     => get_permalink( $shop_page_id ),
                );
            }
        }

        // Category
        if ( is_product_category() ) {
            $term = get_queried_object();
            $crumbs[] = array(
                '@type'    => 'ListItem',
                'position' => $position++,
                'name'     => $term->name,
                'item'     => get_term_link( $term ),
            );
        }

        // Single product/post
        if ( is_singular() ) {
            $crumbs[] = array(
                '@type'    => 'ListItem',
                'position' => $position++,
                'name'     => get_the_title(),
                'item'     => get_permalink(),
            );
        }

        $schema = array(
            '@context'        => 'https://schema.org',
            '@type'           => 'BreadcrumbList',
            'itemListElement' => $crumbs,
        );

        return apply_filters( 'artisanat_breadcrumb_schema', $schema );
    }

    /**
     * FAQ Page schema (from FAQ blocks).
     *
     * @return array|null Schema data or null.
     */
    private function get_faq_schema() {
        global $post;

        if ( ! $post ) {
            return null;
        }

        $blocks = parse_blocks( $post->post_content );
        $faq_items = array();

        foreach ( $blocks as $block ) {
            if ( 'artisanat/faq' === $block['blockName'] ||
                 'yoast/faq-block' === $block['blockName'] ||
                 'core/details' === $block['blockName'] ) {

                $question = $block['attrs']['question'] ?? '';
                $answer = $block['attrs']['answer'] ?? '';

                // For core/details block
                if ( 'core/details' === $block['blockName'] ) {
                    $question = $block['attrs']['summary'] ?? '';
                    $answer = wp_strip_all_tags( render_block( $block ) );
                }

                if ( $question && $answer ) {
                    $faq_items[] = array(
                        '@type'          => 'Question',
                        'name'           => wp_strip_all_tags( $question ),
                        'acceptedAnswer' => array(
                            '@type' => 'Answer',
                            'text'  => wp_strip_all_tags( $answer ),
                        ),
                    );
                }
            }
        }

        if ( empty( $faq_items ) ) {
            return null;
        }

        $schema = array(
            '@context'   => 'https://schema.org',
            '@type'      => 'FAQPage',
            'mainEntity' => $faq_items,
        );

        return apply_filters( 'artisanat_faq_schema', $schema );
    }

    /**
     * Local Business schema.
     *
     * @return array|null Schema data or null.
     */
    private function get_local_business_schema() {
        $address = get_option( 'artisanat_address' );

        if ( ! $address ) {
            return null;
        }

        $schema = array(
            '@context'     => 'https://schema.org',
            '@type'        => 'Store',
            '@id'          => home_url( '/#localbusiness' ),
            'name'         => get_bloginfo( 'name' ),
            'image'        => $this->get_logo_url(),
            'url'          => home_url( '/' ),
            'telephone'    => get_option( 'artisanat_phone' ),
            'email'        => get_option( 'artisanat_email' ),
            'address'      => array(
                '@type'           => 'PostalAddress',
                'streetAddress'   => get_option( 'artisanat_street' ),
                'addressLocality' => get_option( 'artisanat_city' ),
                'postalCode'      => get_option( 'artisanat_postal_code' ),
                'addressCountry'  => 'FR',
            ),
            'geo'          => array(
                '@type'     => 'GeoCoordinates',
                'latitude'  => get_option( 'artisanat_latitude' ),
                'longitude' => get_option( 'artisanat_longitude' ),
            ),
            'openingHoursSpecification' => array(
                array(
                    '@type'     => 'OpeningHoursSpecification',
                    'dayOfWeek' => array( 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ),
                    'opens'     => '10:00',
                    'closes'    => '19:00',
                ),
                array(
                    '@type'     => 'OpeningHoursSpecification',
                    'dayOfWeek' => 'Saturday',
                    'opens'     => '10:00',
                    'closes'    => '18:00',
                ),
            ),
            'priceRange'   => '€€',
        );

        return apply_filters( 'artisanat_local_business_schema', $schema );
    }

    /**
     * Article schema for blog posts.
     *
     * @return array Schema data.
     */
    private function get_article_schema() {
        global $post;

        $schema = array(
            '@context'         => 'https://schema.org',
            '@type'            => 'Article',
            'headline'         => get_the_title(),
            'description'      => get_the_excerpt(),
            'url'              => get_permalink(),
            'datePublished'    => get_the_date( 'c' ),
            'dateModified'     => get_the_modified_date( 'c' ),
            'author'           => array(
                '@type' => 'Person',
                'name'  => get_the_author(),
                'url'   => get_author_posts_url( $post->post_author ),
            ),
            'publisher'        => array(
                '@id' => home_url( '/#organization' ),
            ),
            'mainEntityOfPage' => array(
                '@type' => 'WebPage',
                '@id'   => get_permalink(),
            ),
        );

        // Featured image
        $image_id = get_post_thumbnail_id();
        if ( $image_id ) {
            $image_data = wp_get_attachment_image_src( $image_id, 'full' );
            $schema['image'] = array(
                '@type'  => 'ImageObject',
                'url'    => $image_data[0],
                'width'  => $image_data[1],
                'height' => $image_data[2],
            );
        }

        return apply_filters( 'artisanat_article_schema', $schema );
    }

    /**
     * ItemList schema for shop/archive pages.
     *
     * @return array Schema data.
     */
    private function get_itemlist_schema() {
        global $wp_query;

        $items = array();
        $position = 1;

        foreach ( $wp_query->posts as $post ) {
            $product = wc_get_product( $post->ID );
            if ( ! $product ) {
                continue;
            }

            $items[] = array(
                '@type'    => 'ListItem',
                'position' => $position++,
                'url'      => get_permalink( $post->ID ),
                'name'     => $product->get_name(),
            );
        }

        $schema = array(
            '@context'        => 'https://schema.org',
            '@type'           => 'ItemList',
            'numberOfItems'   => count( $items ),
            'itemListElement' => $items,
        );

        return apply_filters( 'artisanat_itemlist_schema', $schema );
    }

    /**
     * Get logo URL.
     *
     * @return string Logo URL.
     */
    private function get_logo_url() {
        $custom_logo_id = get_theme_mod( 'custom_logo' );
        return $custom_logo_id
            ? wp_get_attachment_image_url( $custom_logo_id, 'full' )
            : home_url( '/wp-content/themes/artisanat/assets/images/logo.png' );
    }
}

// Initialize
new Schema();
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Données hardcodées | Non dynamique | Données from DB |
| JSON invalide | Non parsé par Google | `wp_json_encode()` |
| Prix sans devise | Erreur validation | Toujours `priceCurrency` |
| Pas de image | Warning Google | Toujours inclure |
| Reviews fictifs | Pénalité Google | Vraies reviews uniquement |

## Références

- [Schema.org](https://schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [WooCommerce Structured Data](https://woocommerce.com/document/seo-structured-data/)
- Livrables liés : `custom-post-type`, `analytics-setup`, `seo-audit`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | wordpress-gutenberg-expert | Création initiale |
