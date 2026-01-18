---
id: rest-endpoint-wp
name: REST Endpoint WordPress
version: 1.0.0
category: wordpress
status: active
phase: "4-realisation"
order: 5
agents:
  - wordpress-gutenberg-expert/rest-api/endpoint-registration
  - wordpress-gutenberg-expert/rest-api/authentication
  - backend-developer/api/rest-design
consumes:
  - api-specification
  - custom-post-type
  - data-model
produces_for:
  - frontend-developer/javascript/api-integration
  - wordpress-gutenberg-expert/gutenberg-blocks/block-development
workflows:
  - id: wf-rest-endpoint
    template: wf-creation
    phase: Réalisation
    name: Création endpoint REST WordPress
    duration: 0.5-1 jour
tags: [wordpress, rest-api, endpoint, api, backend]
---

# REST Endpoint WordPress

## Description

Endpoint REST API personnalisé WordPress utilisant `register_rest_route()` ou une classe `WP_REST_Controller`. Permet d'exposer des données custom ou d'ajouter des actions non couvertes par l'API native.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Code PHP (classe ou fonctions) |
| **Emplacement** | `wp-content/plugins/[plugin]/includes/rest-api/` |
| **Nommage** | `class-[resource]-controller.php` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Éléments Obligatoires

- [ ] **Namespace** - Préfixe unique (ex: `artisanat/v1`)
- [ ] **Route** - Chemin de l'endpoint
- [ ] **Methods** - GET, POST, PUT, DELETE
- [ ] **Callback** - Fonction de traitement
- [ ] **Permission callback** - Vérification des droits
- [ ] **Schema** - Validation des données

### Éléments Optionnels

- [ ] **Args** - Paramètres avec validation
- [ ] **Pagination** - Pour les listes
- [ ] **Filtering** - Paramètres de filtre
- [ ] **Caching** - Headers cache

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Permission callback | Jamais retourner true sans vérification | Manuel | Oui |
| 2 | Sanitization | Tous les inputs sanitisés | Manuel | Oui |
| 3 | Validation | Schema défini | Auto | Oui |
| 4 | Nonce/Auth | Authentification si écriture | Manuel | Oui |
| 5 | HTTP Status | Codes appropriés (200, 201, 400, 403, 404) | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `direction-technique/*` | `api-specification` | Design de l'API |
| `wordpress-gutenberg-expert/*` | `custom-post-type` | CPT à exposer |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Design | Lead Dev | Revoir specs |
| 2 | Sécurité | Security review | Corriger |
| 3 | Tests | QA | Débugger |

## Exemple

### Controller Complet - Témoignages Featured

```php
<?php
/**
 * REST API Controller for Featured Testimonials
 *
 * @package Artisanat
 * @since 1.0.0
 */

namespace Artisanat\RestAPI;

use WP_REST_Controller;
use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Class Featured_Testimonials_Controller
 *
 * Custom REST API endpoint for featured testimonials.
 * Endpoint: /wp-json/artisanat/v1/testimonials/featured
 */
class Featured_Testimonials_Controller extends WP_REST_Controller {

    /**
     * API namespace.
     *
     * @var string
     */
    protected $namespace = 'artisanat/v1';

    /**
     * Rest base.
     *
     * @var string
     */
    protected $rest_base = 'testimonials/featured';

    /**
     * Constructor.
     */
    public function __construct() {
        // Register routes on REST API init.
        add_action( 'rest_api_init', array( $this, 'register_routes' ) );
    }

    /**
     * Register the routes for the controller.
     */
    public function register_routes() {
        // GET /wp-json/artisanat/v1/testimonials/featured
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            array(
                array(
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_items' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
                    'args'                => $this->get_collection_params(),
                ),
                'schema' => array( $this, 'get_public_item_schema' ),
            )
        );

        // GET /wp-json/artisanat/v1/testimonials/featured/<id>
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<id>[\d]+)',
            array(
                'args'   => array(
                    'id' => array(
                        'description' => __( 'Unique identifier for the testimonial.', 'artisanat' ),
                        'type'        => 'integer',
                        'required'    => true,
                    ),
                ),
                array(
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_item' ),
                    'permission_callback' => array( $this, 'get_item_permissions_check' ),
                    'args'                => array(
                        'context' => $this->get_context_param( array( 'default' => 'view' ) ),
                    ),
                ),
                'schema' => array( $this, 'get_public_item_schema' ),
            )
        );

        // POST /wp-json/artisanat/v1/testimonials/featured/<id>/toggle
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<id>[\d]+)/toggle',
            array(
                'args' => array(
                    'id' => array(
                        'description' => __( 'Unique identifier for the testimonial.', 'artisanat' ),
                        'type'        => 'integer',
                        'required'    => true,
                    ),
                ),
                array(
                    'methods'             => WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'toggle_featured' ),
                    'permission_callback' => array( $this, 'update_item_permissions_check' ),
                ),
            )
        );
    }

    /**
     * Check if a given request has access to get items.
     *
     * @param WP_REST_Request $request Full details about the request.
     * @return true|WP_Error True if the request has read access, WP_Error object otherwise.
     */
    public function get_items_permissions_check( $request ) {
        // Public endpoint - anyone can read featured testimonials.
        return true;
    }

    /**
     * Check if a given request has access to get a specific item.
     *
     * @param WP_REST_Request $request Full details about the request.
     * @return true|WP_Error True if the request has read access, WP_Error object otherwise.
     */
    public function get_item_permissions_check( $request ) {
        $post = get_post( $request['id'] );

        if ( ! $post || 'testimonial' !== $post->post_type ) {
            return new WP_Error(
                'rest_testimonial_not_found',
                __( 'Testimonial not found.', 'artisanat' ),
                array( 'status' => 404 )
            );
        }

        // Check if published or user can read private.
        if ( 'publish' !== $post->post_status && ! current_user_can( 'read_private_testimonials' ) ) {
            return new WP_Error(
                'rest_testimonial_not_accessible',
                __( 'This testimonial is not accessible.', 'artisanat' ),
                array( 'status' => 403 )
            );
        }

        return true;
    }

    /**
     * Check if a given request has access to update items.
     *
     * @param WP_REST_Request $request Full details about the request.
     * @return true|WP_Error True if the request has update access, WP_Error object otherwise.
     */
    public function update_item_permissions_check( $request ) {
        $post = get_post( $request['id'] );

        if ( ! $post || 'testimonial' !== $post->post_type ) {
            return new WP_Error(
                'rest_testimonial_not_found',
                __( 'Testimonial not found.', 'artisanat' ),
                array( 'status' => 404 )
            );
        }

        if ( ! current_user_can( 'edit_testimonial', $post->ID ) ) {
            return new WP_Error(
                'rest_cannot_edit',
                __( 'Sorry, you are not allowed to edit this testimonial.', 'artisanat' ),
                array( 'status' => 403 )
            );
        }

        return true;
    }

    /**
     * Get a collection of featured testimonials.
     *
     * @param WP_REST_Request $request Full details about the request.
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_items( $request ) {
        $args = array(
            'post_type'      => 'testimonial',
            'post_status'    => 'publish',
            'posts_per_page' => $request['per_page'],
            'paged'          => $request['page'],
            'orderby'        => $request['orderby'],
            'order'          => $request['order'],
            'meta_query'     => array(
                array(
                    'key'     => '_testimonial_featured',
                    'value'   => '1',
                    'compare' => '=',
                ),
            ),
        );

        // Optional: filter by rating.
        if ( isset( $request['min_rating'] ) ) {
            $args['meta_query'][] = array(
                'key'     => '_testimonial_rating',
                'value'   => absint( $request['min_rating'] ),
                'compare' => '>=',
                'type'    => 'NUMERIC',
            );
        }

        // Optional: filter by category.
        if ( ! empty( $request['category'] ) ) {
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'testimonial_category',
                    'field'    => 'term_id',
                    'terms'    => absint( $request['category'] ),
                ),
            );
        }

        $query = new \WP_Query( $args );
        $items = array();

        foreach ( $query->posts as $post ) {
            $data    = $this->prepare_item_for_response( $post, $request );
            $items[] = $this->prepare_response_for_collection( $data );
        }

        $response = rest_ensure_response( $items );

        // Add pagination headers.
        $total_items = $query->found_posts;
        $max_pages   = ceil( $total_items / $request['per_page'] );

        $response->header( 'X-WP-Total', $total_items );
        $response->header( 'X-WP-TotalPages', $max_pages );

        // Add pagination links.
        $base = add_query_arg(
            urlencode_deep( $request->get_query_params() ),
            rest_url( sprintf( '%s/%s', $this->namespace, $this->rest_base ) )
        );

        if ( $request['page'] > 1 ) {
            $prev_link = add_query_arg( 'page', $request['page'] - 1, $base );
            $response->link_header( 'prev', $prev_link );
        }

        if ( $request['page'] < $max_pages ) {
            $next_link = add_query_arg( 'page', $request['page'] + 1, $base );
            $response->link_header( 'next', $next_link );
        }

        return $response;
    }

    /**
     * Get a single featured testimonial.
     *
     * @param WP_REST_Request $request Full details about the request.
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_item( $request ) {
        $post = get_post( $request['id'] );

        if ( ! $post || 'testimonial' !== $post->post_type ) {
            return new WP_Error(
                'rest_testimonial_not_found',
                __( 'Testimonial not found.', 'artisanat' ),
                array( 'status' => 404 )
            );
        }

        $data = $this->prepare_item_for_response( $post, $request );

        return rest_ensure_response( $data );
    }

    /**
     * Toggle featured status.
     *
     * @param WP_REST_Request $request Full details about the request.
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function toggle_featured( $request ) {
        $post = get_post( $request['id'] );

        if ( ! $post || 'testimonial' !== $post->post_type ) {
            return new WP_Error(
                'rest_testimonial_not_found',
                __( 'Testimonial not found.', 'artisanat' ),
                array( 'status' => 404 )
            );
        }

        $current_status = get_post_meta( $post->ID, '_testimonial_featured', true );
        $new_status     = ! $current_status;

        update_post_meta( $post->ID, '_testimonial_featured', $new_status );

        $data = $this->prepare_item_for_response( $post, $request );

        return rest_ensure_response( $data );
    }

    /**
     * Prepare a single testimonial for response.
     *
     * @param WP_Post         $post    Post object.
     * @param WP_REST_Request $request Request object.
     * @return WP_REST_Response Response object.
     */
    public function prepare_item_for_response( $post, $request ) {
        $data = array(
            'id'          => $post->ID,
            'date'        => mysql_to_rfc3339( $post->post_date ),
            'slug'        => $post->post_name,
            'link'        => get_permalink( $post ),
            'title'       => get_the_title( $post ),
            'content'     => apply_filters( 'the_content', $post->post_content ),
            'excerpt'     => get_the_excerpt( $post ),
            'client'      => array(
                'name' => get_post_meta( $post->ID, '_testimonial_client_name', true ),
                'role' => get_post_meta( $post->ID, '_testimonial_client_role', true ),
            ),
            'rating'      => (int) get_post_meta( $post->ID, '_testimonial_rating', true ) ?: 5,
            'featured'    => (bool) get_post_meta( $post->ID, '_testimonial_featured', true ),
            'product_id'  => (int) get_post_meta( $post->ID, '_testimonial_product_id', true ),
            'featured_image' => null,
            'categories'  => array(),
        );

        // Featured image.
        $thumbnail_id = get_post_thumbnail_id( $post );
        if ( $thumbnail_id ) {
            $data['featured_image'] = array(
                'id'     => $thumbnail_id,
                'url'    => wp_get_attachment_image_url( $thumbnail_id, 'medium' ),
                'srcset' => wp_get_attachment_image_srcset( $thumbnail_id, 'medium' ),
                'alt'    => get_post_meta( $thumbnail_id, '_wp_attachment_image_alt', true ),
            );
        }

        // Categories.
        $terms = get_the_terms( $post, 'testimonial_category' );
        if ( $terms && ! is_wp_error( $terms ) ) {
            $data['categories'] = array_map(
                function( $term ) {
                    return array(
                        'id'   => $term->term_id,
                        'name' => $term->name,
                        'slug' => $term->slug,
                    );
                },
                $terms
            );
        }

        // Linked product (if WooCommerce).
        if ( $data['product_id'] && function_exists( 'wc_get_product' ) ) {
            $product = wc_get_product( $data['product_id'] );
            if ( $product ) {
                $data['product'] = array(
                    'id'        => $product->get_id(),
                    'name'      => $product->get_name(),
                    'permalink' => $product->get_permalink(),
                    'price'     => $product->get_price(),
                    'image'     => wp_get_attachment_image_url( $product->get_image_id(), 'thumbnail' ),
                );
            }
        }

        $context = ! empty( $request['context'] ) ? $request['context'] : 'view';
        $data    = $this->add_additional_fields_to_object( $data, $request );
        $data    = $this->filter_response_by_context( $data, $context );

        $response = rest_ensure_response( $data );
        $response->add_links( $this->prepare_links( $post ) );

        return $response;
    }

    /**
     * Prepare links for the response.
     *
     * @param WP_Post $post Post object.
     * @return array Links for the response.
     */
    protected function prepare_links( $post ) {
        $links = array(
            'self'       => array(
                'href' => rest_url( sprintf( '%s/%s/%d', $this->namespace, $this->rest_base, $post->ID ) ),
            ),
            'collection' => array(
                'href' => rest_url( sprintf( '%s/%s', $this->namespace, $this->rest_base ) ),
            ),
        );

        return $links;
    }

    /**
     * Get the query params for collections.
     *
     * @return array Collection parameters.
     */
    public function get_collection_params() {
        $params = parent::get_collection_params();

        $params['per_page']['default'] = 10;
        $params['per_page']['maximum'] = 100;

        $params['orderby'] = array(
            'description' => __( 'Sort collection by attribute.', 'artisanat' ),
            'type'        => 'string',
            'default'     => 'date',
            'enum'        => array( 'date', 'title', 'rating', 'rand' ),
        );

        $params['order'] = array(
            'description' => __( 'Order sort attribute ascending or descending.', 'artisanat' ),
            'type'        => 'string',
            'default'     => 'desc',
            'enum'        => array( 'asc', 'desc' ),
        );

        $params['min_rating'] = array(
            'description'       => __( 'Filter by minimum rating.', 'artisanat' ),
            'type'              => 'integer',
            'minimum'           => 1,
            'maximum'           => 5,
            'sanitize_callback' => 'absint',
        );

        $params['category'] = array(
            'description'       => __( 'Filter by category ID.', 'artisanat' ),
            'type'              => 'integer',
            'sanitize_callback' => 'absint',
        );

        return $params;
    }

    /**
     * Get the testimonial schema.
     *
     * @return array Schema array.
     */
    public function get_item_schema() {
        if ( $this->schema ) {
            return $this->add_additional_fields_schema( $this->schema );
        }

        $this->schema = array(
            '$schema'    => 'http://json-schema.org/draft-04/schema#',
            'title'      => 'featured-testimonial',
            'type'       => 'object',
            'properties' => array(
                'id'       => array(
                    'description' => __( 'Unique identifier.', 'artisanat' ),
                    'type'        => 'integer',
                    'context'     => array( 'view', 'edit' ),
                    'readonly'    => true,
                ),
                'date'     => array(
                    'description' => __( 'Publication date.', 'artisanat' ),
                    'type'        => 'string',
                    'format'      => 'date-time',
                    'context'     => array( 'view', 'edit' ),
                    'readonly'    => true,
                ),
                'title'    => array(
                    'description' => __( 'Title.', 'artisanat' ),
                    'type'        => 'string',
                    'context'     => array( 'view', 'edit' ),
                ),
                'content'  => array(
                    'description' => __( 'Content.', 'artisanat' ),
                    'type'        => 'string',
                    'context'     => array( 'view', 'edit' ),
                ),
                'client'   => array(
                    'description' => __( 'Client information.', 'artisanat' ),
                    'type'        => 'object',
                    'context'     => array( 'view', 'edit' ),
                    'properties'  => array(
                        'name' => array( 'type' => 'string' ),
                        'role' => array( 'type' => 'string' ),
                    ),
                ),
                'rating'   => array(
                    'description' => __( 'Rating (1-5).', 'artisanat' ),
                    'type'        => 'integer',
                    'minimum'     => 1,
                    'maximum'     => 5,
                    'context'     => array( 'view', 'edit' ),
                ),
                'featured' => array(
                    'description' => __( 'Featured status.', 'artisanat' ),
                    'type'        => 'boolean',
                    'context'     => array( 'view', 'edit' ),
                ),
            ),
        );

        return $this->add_additional_fields_schema( $this->schema );
    }
}
```

---

### Usage JavaScript (@wordpress/api-fetch)

```javascript
import apiFetch from '@wordpress/api-fetch';

// Get featured testimonials
const getFeaturedTestimonials = async (options = {}) => {
  const { page = 1, perPage = 10, minRating, category } = options;

  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });

  if (minRating) params.append('min_rating', minRating.toString());
  if (category) params.append('category', category.toString());

  return apiFetch({
    path: `/artisanat/v1/testimonials/featured?${params}`,
  });
};

// Toggle featured status
const toggleFeatured = async (id) => {
  return apiFetch({
    path: `/artisanat/v1/testimonials/featured/${id}/toggle`,
    method: 'POST',
  });
};

// Usage
const testimonials = await getFeaturedTestimonials({ minRating: 4 });
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| `'permission_callback' => '__return_true'` | Faille de sécurité | Toujours vérifier les droits |
| Pas de sanitization | Injection | `sanitize_*()` sur tous inputs |
| SQL direct | Injection SQL | `$wpdb->prepare()` |
| Pas de schema | Données invalides | Définir le schema |
| 200 pour les erreurs | API inconsistante | Codes HTTP appropriés |

## Références

- [REST API Handbook](https://developer.wordpress.org/rest-api/)
- [WP_REST_Controller](https://developer.wordpress.org/reference/classes/wp_rest_controller/)
- [REST API Authentication](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/)
- Livrables liés : `api-specification`, `custom-post-type`, `gutenberg-block`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | wordpress-gutenberg-expert | Création initiale |
