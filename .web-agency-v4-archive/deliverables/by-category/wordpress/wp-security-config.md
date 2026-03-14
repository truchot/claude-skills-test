---
id: wp-security-config
name: Configuration Sécurité WordPress
version: 1.0.0
category: wordpress
status: active
phase: "4-realisation"
order: 8
agents:
  - wordpress-gutenberg-expert/security/nonces
  - wordpress-gutenberg-expert/security/sanitization
  - wordpress-gutenberg-expert/security/escaping
  - direction-technique/securite/securite-applicative
consumes:
  - technical-specification
  - custom-post-type
  - rest-endpoint-wp
produces_for:
  - direction-technique/securite/audit-securite
workflows:
  - id: wf-security-setup
    template: wf-creation
    phase: Réalisation
    name: Implémentation sécurité WordPress
    duration: 0.5-1 jour
tags: [wordpress, security, nonce, sanitization, escaping, xss, csrf]
---

# Configuration Sécurité WordPress

## Description

Implémentation des bonnes pratiques de sécurité WordPress : nonces pour la protection CSRF, sanitization des entrées, escaping des sorties, validation des capabilities et protection contre les injections SQL.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Code PHP |
| **Emplacement** | Dans tout le code du plugin/thème |
| **Nommage** | N/A (intégré au code) |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Éléments Obligatoires

- [ ] **Nonces** - Tokens CSRF pour formulaires/AJAX
- [ ] **Sanitization** - Nettoyage des entrées
- [ ] **Escaping** - Protection des sorties
- [ ] **Capabilities** - Vérification des droits
- [ ] **SQL Protection** - Requêtes préparées

### Éléments Optionnels

- [ ] **Rate limiting** - Limitation des requêtes
- [ ] **Content Security Policy** - Headers CSP
- [ ] **File validation** - Validation uploads

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Nonces | Tous formulaires/AJAX | Auto (PHPCS) | Oui |
| 2 | Escaping | Toutes sorties | Auto (PHPCS) | Oui |
| 3 | Sanitization | Toutes entrées | Auto (PHPCS) | Oui |
| 4 | Capabilities | Toutes actions admin | Manuel | Oui |
| 5 | SQL | Toutes requêtes avec $wpdb | Auto (PHPCS) | Oui |

## Exemple

### Référence Complète Sécurité

```php
<?php
/**
 * WordPress Security Best Practices Reference
 *
 * @package Artisanat
 */

namespace Artisanat\Security;

defined( 'ABSPATH' ) || exit;

/**
 * =============================================================================
 * 1. NONCES (CSRF Protection)
 * =============================================================================
 */

/**
 * Create nonce field in form.
 */
function render_secure_form() {
    ?>
    <form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
        <?php
        // Create nonce field
        wp_nonce_field( 'artisanat_save_settings', 'artisanat_nonce' );
        ?>
        <input type="hidden" name="action" value="artisanat_save_settings">
        <input type="text" name="product_name" />
        <button type="submit"><?php esc_html_e( 'Save', 'artisanat' ); ?></button>
    </form>
    <?php
}

/**
 * Verify nonce in form handler.
 */
function handle_form_submission() {
    // 1. Verify nonce
    if ( ! isset( $_POST['artisanat_nonce'] ) ||
         ! wp_verify_nonce( $_POST['artisanat_nonce'], 'artisanat_save_settings' ) ) {
        wp_die( __( 'Security check failed.', 'artisanat' ), 403 );
    }

    // 2. Check capabilities
    if ( ! current_user_can( 'manage_options' ) ) {
        wp_die( __( 'You do not have permission to do this.', 'artisanat' ), 403 );
    }

    // 3. Process form (with sanitization - see section 2)
    $product_name = isset( $_POST['product_name'] )
        ? sanitize_text_field( wp_unslash( $_POST['product_name'] ) )
        : '';

    // Save...
}
add_action( 'admin_post_artisanat_save_settings', __NAMESPACE__ . '\\handle_form_submission' );

/**
 * AJAX with nonce.
 */
function enqueue_ajax_scripts() {
    wp_enqueue_script( 'artisanat-ajax', ARTISANAT_URL . 'assets/js/ajax.js', array( 'jquery' ), '1.0.0', true );

    wp_localize_script( 'artisanat-ajax', 'artisanatAjax', array(
        'ajaxUrl' => admin_url( 'admin-ajax.php' ),
        'nonce'   => wp_create_nonce( 'artisanat_ajax_nonce' ),
    ) );
}

/**
 * Handle AJAX request with nonce verification.
 */
function handle_ajax_request() {
    // Verify nonce
    check_ajax_referer( 'artisanat_ajax_nonce', 'nonce' );

    // Check capabilities
    if ( ! current_user_can( 'edit_posts' ) ) {
        wp_send_json_error( array( 'message' => 'Unauthorized' ), 403 );
    }

    // Process request...
    $product_id = isset( $_POST['product_id'] ) ? absint( $_POST['product_id'] ) : 0;

    wp_send_json_success( array( 'product_id' => $product_id ) );
}
add_action( 'wp_ajax_artisanat_get_product', __NAMESPACE__ . '\\handle_ajax_request' );

/**
 * REST API nonce (via cookie auth).
 */
// JavaScript: Use wp.apiFetch which handles nonces automatically
// Or manually: fetch with X-WP-Nonce header = wpApiSettings.nonce

/**
 * =============================================================================
 * 2. SANITIZATION (Input Cleaning)
 * =============================================================================
 */

/**
 * Sanitization examples for different data types.
 *
 * @param array $input Raw input data.
 * @return array Sanitized data.
 */
function sanitize_form_data( $input ) {
    $sanitized = array();

    // Text field - removes tags, encodes special chars
    $sanitized['name'] = isset( $input['name'] )
        ? sanitize_text_field( wp_unslash( $input['name'] ) )
        : '';

    // Textarea - preserves line breaks, removes dangerous tags
    $sanitized['description'] = isset( $input['description'] )
        ? sanitize_textarea_field( wp_unslash( $input['description'] ) )
        : '';

    // HTML content - allows safe HTML
    $sanitized['content'] = isset( $input['content'] )
        ? wp_kses_post( wp_unslash( $input['content'] ) )
        : '';

    // Strict HTML - only specific tags allowed
    $sanitized['bio'] = isset( $input['bio'] )
        ? wp_kses( wp_unslash( $input['bio'] ), array(
            'a'      => array( 'href' => array(), 'title' => array() ),
            'strong' => array(),
            'em'     => array(),
            'br'     => array(),
        ) )
        : '';

    // Email
    $sanitized['email'] = isset( $input['email'] )
        ? sanitize_email( $input['email'] )
        : '';

    // URL
    $sanitized['website'] = isset( $input['website'] )
        ? esc_url_raw( $input['website'] )
        : '';

    // Integer (positive)
    $sanitized['quantity'] = isset( $input['quantity'] )
        ? absint( $input['quantity'] )
        : 0;

    // Integer (can be negative)
    $sanitized['offset'] = isset( $input['offset'] )
        ? intval( $input['offset'] )
        : 0;

    // Float
    $sanitized['price'] = isset( $input['price'] )
        ? floatval( $input['price'] )
        : 0.0;

    // Boolean
    $sanitized['featured'] = isset( $input['featured'] )
        ? rest_sanitize_boolean( $input['featured'] )
        : false;

    // Checkbox (from form)
    $sanitized['newsletter'] = ! empty( $input['newsletter'] );

    // Filename
    $sanitized['filename'] = isset( $input['filename'] )
        ? sanitize_file_name( $input['filename'] )
        : '';

    // Slug / key
    $sanitized['slug'] = isset( $input['slug'] )
        ? sanitize_key( $input['slug'] )
        : '';

    // Title (like sanitize_text_field but preserves some entities)
    $sanitized['title'] = isset( $input['title'] )
        ? sanitize_title( $input['title'] )
        : '';

    // Hex color
    $sanitized['color'] = isset( $input['color'] )
        ? sanitize_hex_color( $input['color'] )
        : '#000000';

    // Array of integers
    $sanitized['ids'] = isset( $input['ids'] ) && is_array( $input['ids'] )
        ? array_map( 'absint', $input['ids'] )
        : array();

    // Whitelist validation (enum)
    $allowed_status = array( 'draft', 'published', 'archived' );
    $sanitized['status'] = isset( $input['status'] ) && in_array( $input['status'], $allowed_status, true )
        ? $input['status']
        : 'draft';

    return $sanitized;
}

/**
 * =============================================================================
 * 3. ESCAPING (Output Protection)
 * =============================================================================
 */

/**
 * Output examples with proper escaping.
 *
 * @param object $product Product object.
 */
function render_product( $product ) {
    ?>
    <!-- esc_html: For text content -->
    <h1><?php echo esc_html( $product->title ); ?></h1>

    <!-- esc_attr: For HTML attributes -->
    <input type="text"
           value="<?php echo esc_attr( $product->sku ); ?>"
           data-id="<?php echo esc_attr( $product->id ); ?>"
           placeholder="<?php echo esc_attr__( 'Enter SKU', 'artisanat' ); ?>">

    <!-- esc_url: For URLs -->
    <a href="<?php echo esc_url( $product->url ); ?>">
        <?php echo esc_html( $product->title ); ?>
    </a>

    <!-- esc_url for JS URLs -->
    <a href="<?php echo esc_url( 'javascript:void(0)' ); ?>"
       onclick="openModal(<?php echo esc_js( $product->id ); ?>)">
        <?php esc_html_e( 'Quick view', 'artisanat' ); ?>
    </a>

    <!-- esc_textarea: For textarea content -->
    <textarea><?php echo esc_textarea( $product->description ); ?></textarea>

    <!-- wp_kses_post: For HTML content (post content) -->
    <div class="product-content">
        <?php echo wp_kses_post( $product->content ); ?>
    </div>

    <!-- esc_html + translation -->
    <p><?php echo esc_html__( 'Handmade product', 'artisanat' ); ?></p>
    <p><?php esc_html_e( 'Handmade product', 'artisanat' ); ?></p>

    <!-- esc_attr + translation -->
    <button title="<?php echo esc_attr__( 'Add to cart', 'artisanat' ); ?>">
        <?php esc_html_e( 'Add', 'artisanat' ); ?>
    </button>

    <!-- JSON output (for JavaScript) -->
    <script>
    var productData = <?php echo wp_json_encode( array(
        'id'    => $product->id,
        'title' => $product->title,
        'price' => $product->price,
    ) ); ?>;
    </script>

    <!-- Dynamic element ID (esc_attr for safety) -->
    <div id="product-<?php echo esc_attr( $product->id ); ?>">

    <!-- Image with proper attributes -->
    <?php
    printf(
        '<img src="%s" alt="%s" class="product-image" loading="lazy">',
        esc_url( $product->image_url ),
        esc_attr( $product->title )
    );
    ?>

    <!-- Formatted with placeholders -->
    <?php
    printf(
        /* translators: %1$s: product name, %2$s: price */
        esc_html__( '%1$s - %2$s', 'artisanat' ),
        esc_html( $product->title ),
        esc_html( wc_price( $product->price ) )
    );
    ?>
    <?php
}

/**
 * =============================================================================
 * 4. SQL INJECTION PROTECTION
 * =============================================================================
 */

/**
 * Safe database queries examples.
 *
 * @param string $search Search term.
 * @param int    $limit  Results limit.
 * @return array Results.
 */
function get_products_safe( $search, $limit = 10 ) {
    global $wpdb;

    // WRONG - SQL Injection vulnerable!
    // $results = $wpdb->get_results( "SELECT * FROM {$wpdb->posts} WHERE post_title LIKE '%{$search}%'" );

    // CORRECT - Using $wpdb->prepare()
    $results = $wpdb->get_results(
        $wpdb->prepare(
            "SELECT ID, post_title, post_content
             FROM {$wpdb->posts}
             WHERE post_type = %s
             AND post_status = %s
             AND post_title LIKE %s
             LIMIT %d",
            'product',                          // %s - string
            'publish',                          // %s - string
            '%' . $wpdb->esc_like( $search ) . '%', // %s - LIKE with escaping
            absint( $limit )                    // %d - integer
        )
    );

    return $results;
}

/**
 * Insert with prepare.
 *
 * @param array $data Data to insert.
 * @return int|false Insert ID or false.
 */
function insert_product_safe( $data ) {
    global $wpdb;

    $result = $wpdb->insert(
        $wpdb->prefix . 'artisanat_products',
        array(
            'name'       => sanitize_text_field( $data['name'] ),
            'price'      => floatval( $data['price'] ),
            'created_at' => current_time( 'mysql' ),
        ),
        array( '%s', '%f', '%s' ) // Format specifiers
    );

    return $result ? $wpdb->insert_id : false;
}

/**
 * Update with prepare.
 *
 * @param int   $id   Product ID.
 * @param array $data Data to update.
 * @return int|false Rows affected or false.
 */
function update_product_safe( $id, $data ) {
    global $wpdb;

    return $wpdb->update(
        $wpdb->prefix . 'artisanat_products',
        array(
            'name'  => sanitize_text_field( $data['name'] ),
            'price' => floatval( $data['price'] ),
        ),
        array( 'id' => absint( $id ) ),
        array( '%s', '%f' ),
        array( '%d' )
    );
}

/**
 * Delete with prepare.
 *
 * @param int $id Product ID.
 * @return int|false Rows affected or false.
 */
function delete_product_safe( $id ) {
    global $wpdb;

    return $wpdb->delete(
        $wpdb->prefix . 'artisanat_products',
        array( 'id' => absint( $id ) ),
        array( '%d' )
    );
}

/**
 * =============================================================================
 * 5. CAPABILITIES CHECK
 * =============================================================================
 */

/**
 * Check user capabilities before actions.
 *
 * @param int $post_id Post ID.
 */
function maybe_delete_product( $post_id ) {
    // Check if user can delete this specific post
    if ( ! current_user_can( 'delete_post', $post_id ) ) {
        wp_die(
            esc_html__( 'You do not have permission to delete this product.', 'artisanat' ),
            esc_html__( 'Permission Denied', 'artisanat' ),
            array( 'response' => 403 )
        );
    }

    // Proceed with deletion...
}

/**
 * Admin page with capability check.
 */
function add_admin_menu() {
    add_menu_page(
        __( 'Artisanat Settings', 'artisanat' ),
        __( 'Artisanat', 'artisanat' ),
        'manage_options', // Required capability
        'artisanat-settings',
        __NAMESPACE__ . '\\render_settings_page',
        'dashicons-store',
        30
    );
}

/**
 * =============================================================================
 * 6. FILE UPLOAD SECURITY
 * =============================================================================
 */

/**
 * Secure file upload handling.
 *
 * @param array $file $_FILES array element.
 * @return int|WP_Error Attachment ID or error.
 */
function handle_secure_upload( $file ) {
    // 1. Check if upload
    if ( ! isset( $file['tmp_name'] ) || ! is_uploaded_file( $file['tmp_name'] ) ) {
        return new \WP_Error( 'upload_error', __( 'Invalid upload.', 'artisanat' ) );
    }

    // 2. Check MIME type
    $allowed_types = array( 'image/jpeg', 'image/png', 'image/gif', 'image/webp' );
    $file_type = wp_check_filetype_and_ext( $file['tmp_name'], $file['name'] );

    if ( ! in_array( $file_type['type'], $allowed_types, true ) ) {
        return new \WP_Error( 'invalid_type', __( 'Invalid file type.', 'artisanat' ) );
    }

    // 3. Check file size (5MB max)
    $max_size = 5 * 1024 * 1024;
    if ( $file['size'] > $max_size ) {
        return new \WP_Error( 'file_too_large', __( 'File is too large.', 'artisanat' ) );
    }

    // 4. Use WordPress upload handler
    require_once ABSPATH . 'wp-admin/includes/image.php';
    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/media.php';

    $attachment_id = media_handle_upload( 'file_field_name', 0 );

    if ( is_wp_error( $attachment_id ) ) {
        return $attachment_id;
    }

    return $attachment_id;
}

/**
 * =============================================================================
 * 7. PHPCS SECURITY RULES
 * =============================================================================
 */

// phpcs.xml.dist configuration for security rules
/*
<?xml version="1.0"?>
<ruleset name="Artisanat Security">
    <rule ref="WordPress.Security"/>
    <rule ref="WordPress.DB.PreparedSQL"/>
    <rule ref="WordPress.DB.PreparedSQLPlaceholders"/>
    <rule ref="WordPress.Security.EscapeOutput"/>
    <rule ref="WordPress.Security.NonceVerification"/>
    <rule ref="WordPress.Security.ValidatedSanitizedInput"/>
</ruleset>
*/
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| `$_POST` direct | Données non sécurisées | Sanitize + wp_unslash |
| `echo $var` | XSS | `esc_html()` |
| SQL concatenation | SQL Injection | `$wpdb->prepare()` |
| Pas de nonce | CSRF | `wp_nonce_field()` |
| `current_user_can()` sans param | Pas de contexte | Passer l'ID du post |

## Références

- [WordPress Security](https://developer.wordpress.org/plugins/security/)
- [Data Validation](https://developer.wordpress.org/plugins/security/data-validation/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- Livrables liés : `custom-post-type`, `rest-endpoint-wp`, `security-audit`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | wordpress-gutenberg-expert | Création initiale |
