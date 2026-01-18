---
id: custom-post-type
name: Custom Post Type WordPress
version: 1.0.0
category: wordpress
status: active
phase: "4-realisation"
order: 4
agents:
  - wordpress-gutenberg-expert/custom-post-types/cpt-registration
  - wordpress-gutenberg-expert/custom-post-types/taxonomies
  - wordpress-gutenberg-expert/custom-post-types/capabilities
  - wordpress-gutenberg-expert/custom-post-types/meta-fields
consumes:
  - data-model
  - technical-specification
  - requirements-list
produces_for:
  - wordpress-gutenberg-expert/gutenberg-blocks/block-patterns
  - backend-developer/api/rest-design
  - content-management/editorial/workflow-controller
workflows:
  - id: wf-cpt-creation
    template: wf-creation
    phase: Réalisation
    name: Création de Custom Post Type
    duration: 0.5-1 jour
tags: [wordpress, cpt, custom-post-type, taxonomy, capabilities, meta]
---

# Custom Post Type WordPress

## Description

Type de contenu personnalisé WordPress avec ses taxonomies associées, capabilities custom et champs meta. Permet de modéliser des entités métier spécifiques (produits, événements, témoignages, etc.) avec leur propre interface d'administration.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Code PHP (plugin ou thème) |
| **Emplacement** | `wp-content/plugins/[plugin]/includes/post-types/` |
| **Nommage** | `class-[cpt-name]-post-type.php` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Éléments Obligatoires

- [ ] **CPT Registration** - `register_post_type()`
- [ ] **Labels** - Labels traduits complets
- [ ] **Arguments** - Configuration détaillée
- [ ] **REST API** - Support API activé

### Éléments Optionnels

- [ ] **Taxonomies** - Catégories/tags custom
- [ ] **Capabilities** - Permissions personnalisées
- [ ] **Meta fields** - Champs personnalisés
- [ ] **Admin columns** - Colonnes admin custom
- [ ] **Gutenberg template** - Template de blocs par défaut

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Labels complets | Tous les labels définis | Manuel | Oui |
| 2 | REST API | `show_in_rest: true` | Auto | Oui |
| 3 | i18n | Tous textes traduisibles | Manuel | Oui |
| 4 | Capabilities | Mappées correctement | Manuel | Oui |
| 5 | Flush rewrite | Sur activation/désactivation | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `direction-technique/*` | `data-model` | Modèle de données |
| `client-intake/*` | `requirements-list` | Besoins fonctionnels |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Labels | Client/CDP | Ajuster terminologie |
| 2 | Permissions | Admin | Corriger capabilities |
| 3 | API | Lead Dev | Vérifier endpoints |

## Exemple

### CPT Complet - Témoignages

```php
<?php
/**
 * Testimonial Custom Post Type
 *
 * @package Artisanat
 * @since 1.0.0
 */

namespace Artisanat\PostTypes;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Class Testimonial
 *
 * Registers the Testimonial custom post type.
 */
class Testimonial {

    /**
     * Post type slug.
     *
     * @var string
     */
    const POST_TYPE = 'testimonial';

    /**
     * Taxonomy slug.
     *
     * @var string
     */
    const TAXONOMY = 'testimonial_category';

    /**
     * Initialize the class.
     */
    public function __construct() {
        add_action( 'init', array( $this, 'register_post_type' ) );
        add_action( 'init', array( $this, 'register_taxonomy' ) );
        add_action( 'init', array( $this, 'register_meta_fields' ) );
        add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes' ) );
        add_action( 'save_post_' . self::POST_TYPE, array( $this, 'save_meta' ), 10, 2 );
        add_filter( 'manage_' . self::POST_TYPE . '_posts_columns', array( $this, 'admin_columns' ) );
        add_action( 'manage_' . self::POST_TYPE . '_posts_custom_column', array( $this, 'admin_column_content' ), 10, 2 );
    }

    /**
     * Register the custom post type.
     */
    public function register_post_type() {
        $labels = array(
            'name'                  => _x( 'Témoignages', 'Post type general name', 'artisanat' ),
            'singular_name'         => _x( 'Témoignage', 'Post type singular name', 'artisanat' ),
            'menu_name'             => _x( 'Témoignages', 'Admin Menu text', 'artisanat' ),
            'name_admin_bar'        => _x( 'Témoignage', 'Add New on Toolbar', 'artisanat' ),
            'add_new'               => __( 'Ajouter', 'artisanat' ),
            'add_new_item'          => __( 'Ajouter un témoignage', 'artisanat' ),
            'new_item'              => __( 'Nouveau témoignage', 'artisanat' ),
            'edit_item'             => __( 'Modifier le témoignage', 'artisanat' ),
            'view_item'             => __( 'Voir le témoignage', 'artisanat' ),
            'all_items'             => __( 'Tous les témoignages', 'artisanat' ),
            'search_items'          => __( 'Rechercher des témoignages', 'artisanat' ),
            'parent_item_colon'     => __( 'Témoignage parent :', 'artisanat' ),
            'not_found'             => __( 'Aucun témoignage trouvé.', 'artisanat' ),
            'not_found_in_trash'    => __( 'Aucun témoignage dans la corbeille.', 'artisanat' ),
            'featured_image'        => _x( 'Photo du client', 'Overrides the "Featured Image"', 'artisanat' ),
            'set_featured_image'    => _x( 'Définir la photo', 'Overrides the "Set featured image"', 'artisanat' ),
            'remove_featured_image' => _x( 'Retirer la photo', 'Overrides the "Remove featured image"', 'artisanat' ),
            'use_featured_image'    => _x( 'Utiliser comme photo', 'Overrides the "Use as featured image"', 'artisanat' ),
            'archives'              => _x( 'Archives des témoignages', 'The post type archive label', 'artisanat' ),
            'insert_into_item'      => _x( 'Insérer dans le témoignage', 'Overrides the "Insert into post"', 'artisanat' ),
            'uploaded_to_this_item' => _x( 'Téléversé pour ce témoignage', 'Overrides the "Uploaded to this post"', 'artisanat' ),
            'filter_items_list'     => _x( 'Filtrer les témoignages', 'Screen reader text', 'artisanat' ),
            'items_list_navigation' => _x( 'Navigation des témoignages', 'Screen reader text', 'artisanat' ),
            'items_list'            => _x( 'Liste des témoignages', 'Screen reader text', 'artisanat' ),
        );

        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'show_in_nav_menus'  => true,
            'show_in_admin_bar'  => true,
            'query_var'          => true,
            'rewrite'            => array(
                'slug'       => _x( 'temoignages', 'URL slug', 'artisanat' ),
                'with_front' => false,
            ),
            'capability_type'    => array( 'testimonial', 'testimonials' ),
            'map_meta_cap'       => true,
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => 25,
            'menu_icon'          => 'dashicons-format-quote',
            'supports'           => array(
                'title',
                'editor',
                'thumbnail',
                'excerpt',
                'custom-fields',
                'revisions',
            ),
            'show_in_rest'       => true,
            'rest_base'          => 'testimonials',
            'rest_controller_class' => 'WP_REST_Posts_Controller',
            'template'           => array(
                array(
                    'core/quote',
                    array(
                        'placeholder' => __( 'Écrivez le témoignage ici...', 'artisanat' ),
                    ),
                ),
            ),
            'template_lock'      => false,
        );

        register_post_type( self::POST_TYPE, $args );
    }

    /**
     * Register custom taxonomy.
     */
    public function register_taxonomy() {
        $labels = array(
            'name'                       => _x( 'Catégories', 'taxonomy general name', 'artisanat' ),
            'singular_name'              => _x( 'Catégorie', 'taxonomy singular name', 'artisanat' ),
            'search_items'               => __( 'Rechercher des catégories', 'artisanat' ),
            'popular_items'              => __( 'Catégories populaires', 'artisanat' ),
            'all_items'                  => __( 'Toutes les catégories', 'artisanat' ),
            'parent_item'                => __( 'Catégorie parente', 'artisanat' ),
            'parent_item_colon'          => __( 'Catégorie parente :', 'artisanat' ),
            'edit_item'                  => __( 'Modifier la catégorie', 'artisanat' ),
            'view_item'                  => __( 'Voir la catégorie', 'artisanat' ),
            'update_item'                => __( 'Mettre à jour la catégorie', 'artisanat' ),
            'add_new_item'               => __( 'Ajouter une catégorie', 'artisanat' ),
            'new_item_name'              => __( 'Nom de la nouvelle catégorie', 'artisanat' ),
            'separate_items_with_commas' => __( 'Séparer les catégories par des virgules', 'artisanat' ),
            'add_or_remove_items'        => __( 'Ajouter ou retirer des catégories', 'artisanat' ),
            'choose_from_most_used'      => __( 'Choisir parmi les plus utilisées', 'artisanat' ),
            'not_found'                  => __( 'Aucune catégorie trouvée.', 'artisanat' ),
            'no_terms'                   => __( 'Pas de catégories', 'artisanat' ),
            'filter_by_item'             => __( 'Filtrer par catégorie', 'artisanat' ),
            'items_list_navigation'      => __( 'Navigation des catégories', 'artisanat' ),
            'items_list'                 => __( 'Liste des catégories', 'artisanat' ),
            'back_to_items'              => __( '← Retour aux catégories', 'artisanat' ),
        );

        $args = array(
            'labels'             => $labels,
            'hierarchical'       => true,
            'public'             => true,
            'show_ui'            => true,
            'show_admin_column'  => true,
            'show_in_nav_menus'  => true,
            'show_tagcloud'      => false,
            'show_in_rest'       => true,
            'rest_base'          => 'testimonial-categories',
            'rewrite'            => array(
                'slug'         => _x( 'temoignages/categorie', 'URL slug', 'artisanat' ),
                'with_front'   => false,
                'hierarchical' => true,
            ),
        );

        register_taxonomy( self::TAXONOMY, array( self::POST_TYPE ), $args );
    }

    /**
     * Register meta fields for REST API.
     */
    public function register_meta_fields() {
        // Client name.
        register_post_meta(
            self::POST_TYPE,
            '_testimonial_client_name',
            array(
                'show_in_rest'      => true,
                'single'            => true,
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
                'auth_callback'     => function() {
                    return current_user_can( 'edit_testimonials' );
                },
            )
        );

        // Client role/company.
        register_post_meta(
            self::POST_TYPE,
            '_testimonial_client_role',
            array(
                'show_in_rest'      => true,
                'single'            => true,
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
                'auth_callback'     => function() {
                    return current_user_can( 'edit_testimonials' );
                },
            )
        );

        // Rating (1-5).
        register_post_meta(
            self::POST_TYPE,
            '_testimonial_rating',
            array(
                'show_in_rest'      => true,
                'single'            => true,
                'type'              => 'integer',
                'default'           => 5,
                'sanitize_callback' => function( $value ) {
                    return max( 1, min( 5, absint( $value ) ) );
                },
                'auth_callback'     => function() {
                    return current_user_can( 'edit_testimonials' );
                },
            )
        );

        // Featured testimonial.
        register_post_meta(
            self::POST_TYPE,
            '_testimonial_featured',
            array(
                'show_in_rest'      => true,
                'single'            => true,
                'type'              => 'boolean',
                'default'           => false,
                'sanitize_callback' => 'rest_sanitize_boolean',
                'auth_callback'     => function() {
                    return current_user_can( 'edit_testimonials' );
                },
            )
        );

        // Product ID (linked WooCommerce product).
        register_post_meta(
            self::POST_TYPE,
            '_testimonial_product_id',
            array(
                'show_in_rest'      => true,
                'single'            => true,
                'type'              => 'integer',
                'default'           => 0,
                'sanitize_callback' => 'absint',
                'auth_callback'     => function() {
                    return current_user_can( 'edit_testimonials' );
                },
            )
        );
    }

    /**
     * Add meta boxes.
     */
    public function add_meta_boxes() {
        add_meta_box(
            'testimonial_details',
            __( 'Détails du témoignage', 'artisanat' ),
            array( $this, 'render_meta_box' ),
            self::POST_TYPE,
            'side',
            'high'
        );
    }

    /**
     * Render meta box.
     *
     * @param WP_Post $post Current post.
     */
    public function render_meta_box( $post ) {
        wp_nonce_field( 'testimonial_meta_nonce', 'testimonial_meta_nonce_field' );

        $client_name = get_post_meta( $post->ID, '_testimonial_client_name', true );
        $client_role = get_post_meta( $post->ID, '_testimonial_client_role', true );
        $rating      = get_post_meta( $post->ID, '_testimonial_rating', true ) ?: 5;
        $featured    = get_post_meta( $post->ID, '_testimonial_featured', true );
        $product_id  = get_post_meta( $post->ID, '_testimonial_product_id', true );
        ?>
        <p>
            <label for="testimonial_client_name">
                <strong><?php esc_html_e( 'Nom du client', 'artisanat' ); ?></strong>
            </label>
            <input
                type="text"
                id="testimonial_client_name"
                name="testimonial_client_name"
                value="<?php echo esc_attr( $client_name ); ?>"
                class="widefat"
            />
        </p>

        <p>
            <label for="testimonial_client_role">
                <strong><?php esc_html_e( 'Fonction / Entreprise', 'artisanat' ); ?></strong>
            </label>
            <input
                type="text"
                id="testimonial_client_role"
                name="testimonial_client_role"
                value="<?php echo esc_attr( $client_role ); ?>"
                class="widefat"
                placeholder="<?php esc_attr_e( 'Ex: CEO de Entreprise', 'artisanat' ); ?>"
            />
        </p>

        <p>
            <label for="testimonial_rating">
                <strong><?php esc_html_e( 'Note', 'artisanat' ); ?></strong>
            </label>
            <select id="testimonial_rating" name="testimonial_rating" class="widefat">
                <?php for ( $i = 5; $i >= 1; $i-- ) : ?>
                    <option value="<?php echo esc_attr( $i ); ?>" <?php selected( $rating, $i ); ?>>
                        <?php echo esc_html( str_repeat( '★', $i ) . str_repeat( '☆', 5 - $i ) ); ?>
                    </option>
                <?php endfor; ?>
            </select>
        </p>

        <p>
            <label>
                <input
                    type="checkbox"
                    name="testimonial_featured"
                    value="1"
                    <?php checked( $featured ); ?>
                />
                <?php esc_html_e( 'Témoignage vedette', 'artisanat' ); ?>
            </label>
        </p>

        <?php if ( class_exists( 'WooCommerce' ) ) : ?>
            <p>
                <label for="testimonial_product_id">
                    <strong><?php esc_html_e( 'Produit associé', 'artisanat' ); ?></strong>
                </label>
                <select id="testimonial_product_id" name="testimonial_product_id" class="widefat">
                    <option value="0"><?php esc_html_e( '— Aucun —', 'artisanat' ); ?></option>
                    <?php
                    $products = wc_get_products( array( 'limit' => -1 ) );
                    foreach ( $products as $product ) :
                        ?>
                        <option value="<?php echo esc_attr( $product->get_id() ); ?>" <?php selected( $product_id, $product->get_id() ); ?>>
                            <?php echo esc_html( $product->get_name() ); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </p>
        <?php endif; ?>
        <?php
    }

    /**
     * Save meta fields.
     *
     * @param int     $post_id Post ID.
     * @param WP_Post $post    Post object.
     */
    public function save_meta( $post_id, $post ) {
        // Verify nonce.
        if ( ! isset( $_POST['testimonial_meta_nonce_field'] ) ||
             ! wp_verify_nonce( $_POST['testimonial_meta_nonce_field'], 'testimonial_meta_nonce' ) ) {
            return;
        }

        // Check autosave.
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return;
        }

        // Check permissions.
        if ( ! current_user_can( 'edit_testimonial', $post_id ) ) {
            return;
        }

        // Save fields.
        if ( isset( $_POST['testimonial_client_name'] ) ) {
            update_post_meta( $post_id, '_testimonial_client_name', sanitize_text_field( $_POST['testimonial_client_name'] ) );
        }

        if ( isset( $_POST['testimonial_client_role'] ) ) {
            update_post_meta( $post_id, '_testimonial_client_role', sanitize_text_field( $_POST['testimonial_client_role'] ) );
        }

        if ( isset( $_POST['testimonial_rating'] ) ) {
            update_post_meta( $post_id, '_testimonial_rating', max( 1, min( 5, absint( $_POST['testimonial_rating'] ) ) ) );
        }

        $featured = isset( $_POST['testimonial_featured'] ) ? true : false;
        update_post_meta( $post_id, '_testimonial_featured', $featured );

        if ( isset( $_POST['testimonial_product_id'] ) ) {
            update_post_meta( $post_id, '_testimonial_product_id', absint( $_POST['testimonial_product_id'] ) );
        }
    }

    /**
     * Add custom admin columns.
     *
     * @param array $columns Existing columns.
     * @return array Modified columns.
     */
    public function admin_columns( $columns ) {
        $new_columns = array();

        foreach ( $columns as $key => $value ) {
            $new_columns[ $key ] = $value;

            if ( 'title' === $key ) {
                $new_columns['client']   = __( 'Client', 'artisanat' );
                $new_columns['rating']   = __( 'Note', 'artisanat' );
                $new_columns['featured'] = __( 'Vedette', 'artisanat' );
            }
        }

        return $new_columns;
    }

    /**
     * Render custom admin column content.
     *
     * @param string $column  Column name.
     * @param int    $post_id Post ID.
     */
    public function admin_column_content( $column, $post_id ) {
        switch ( $column ) {
            case 'client':
                $name = get_post_meta( $post_id, '_testimonial_client_name', true );
                $role = get_post_meta( $post_id, '_testimonial_client_role', true );
                echo esc_html( $name );
                if ( $role ) {
                    echo '<br><small>' . esc_html( $role ) . '</small>';
                }
                break;

            case 'rating':
                $rating = get_post_meta( $post_id, '_testimonial_rating', true ) ?: 5;
                echo '<span style="color:#F59E0B;">' . esc_html( str_repeat( '★', $rating ) ) . '</span>';
                echo '<span style="color:#D1D5DB;">' . esc_html( str_repeat( '☆', 5 - $rating ) ) . '</span>';
                break;

            case 'featured':
                $featured = get_post_meta( $post_id, '_testimonial_featured', true );
                echo $featured ? '⭐' : '—';
                break;
        }
    }

    /**
     * Register capabilities on plugin activation.
     */
    public static function add_capabilities() {
        $roles = array( 'administrator', 'editor' );

        $capabilities = array(
            'edit_testimonial',
            'read_testimonial',
            'delete_testimonial',
            'edit_testimonials',
            'edit_others_testimonials',
            'publish_testimonials',
            'read_private_testimonials',
            'delete_testimonials',
            'delete_private_testimonials',
            'delete_published_testimonials',
            'delete_others_testimonials',
            'edit_private_testimonials',
            'edit_published_testimonials',
        );

        foreach ( $roles as $role_name ) {
            $role = get_role( $role_name );
            if ( $role ) {
                foreach ( $capabilities as $cap ) {
                    $role->add_cap( $cap );
                }
            }
        }
    }

    /**
     * Remove capabilities on plugin deactivation.
     */
    public static function remove_capabilities() {
        $roles = array( 'administrator', 'editor' );

        $capabilities = array(
            'edit_testimonial',
            'read_testimonial',
            'delete_testimonial',
            'edit_testimonials',
            'edit_others_testimonials',
            'publish_testimonials',
            'read_private_testimonials',
            'delete_testimonials',
            'delete_private_testimonials',
            'delete_published_testimonials',
            'delete_others_testimonials',
            'edit_private_testimonials',
            'edit_published_testimonials',
        );

        foreach ( $roles as $role_name ) {
            $role = get_role( $role_name );
            if ( $role ) {
                foreach ( $capabilities as $cap ) {
                    $role->remove_cap( $cap );
                }
            }
        }
    }
}
```

---

### Plugin Activation/Deactivation

```php
<?php
/**
 * Plugin activation hook.
 */
function artisanat_activate() {
    // Register CPT to flush rewrite rules.
    $testimonial = new \Artisanat\PostTypes\Testimonial();
    $testimonial->register_post_type();
    $testimonial->register_taxonomy();

    // Add capabilities.
    \Artisanat\PostTypes\Testimonial::add_capabilities();

    // Flush rewrite rules.
    flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'artisanat_activate' );

/**
 * Plugin deactivation hook.
 */
function artisanat_deactivate() {
    // Remove capabilities.
    \Artisanat\PostTypes\Testimonial::remove_capabilities();

    // Flush rewrite rules.
    flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'artisanat_deactivate' );
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Labels incomplets | UX admin dégradée | Tous les 20+ labels |
| `show_in_rest: false` | Pas de Gutenberg/API | Toujours true |
| Pas de capabilities | Pas de contrôle permissions | Custom capabilities |
| Pas de flush rewrite | 404 sur les URLs | Flush à l'activation |
| Meta non enregistrées | Pas dans REST API | `register_post_meta()` |

## Références

- [register_post_type()](https://developer.wordpress.org/reference/functions/register_post_type/)
- [register_taxonomy()](https://developer.wordpress.org/reference/functions/register_taxonomy/)
- [Capabilities](https://developer.wordpress.org/plugins/users/roles-and-capabilities/)
- Livrables liés : `data-model`, `rest-endpoint-wp`, `gutenberg-block`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | wordpress-gutenberg-expert | Création initiale |
