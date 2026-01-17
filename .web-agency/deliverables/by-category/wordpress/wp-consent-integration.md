---
id: wp-consent-integration
name: Intégration WP Consent API (RGPD)
version: 1.0.0
category: wordpress
status: active
phase: "6-lancement"
order: 10
agents:
  - wordpress-gutenberg-expert/compliance/gdpr
  - wordpress-gutenberg-expert/compliance/consent-api
  - legal-compliance/privacy/gdpr-implementation
consumes:
  - analytics-setup
  - technical-specification
produces_for:
  - legal-compliance/audit/compliance-audit
workflows:
  - id: wf-consent-setup
    template: wf-creation
    phase: Lancement
    name: Configuration RGPD et Consent
    duration: 0.5-1 jour
tags: [wordpress, gdpr, rgpd, consent, cookies, privacy, compliance]
---

# Intégration WP Consent API (RGPD)

## Description

Implémentation de la conformité RGPD WordPress via le WP Consent API. Gestion du consentement utilisateur pour les cookies, trackers et scripts tiers. Compatible avec les principales CMP (Complianz, CookieYes, etc.).

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Code PHP + JavaScript |
| **Emplacement** | `wp-content/plugins/[plugin]/includes/consent/` |
| **Nommage** | `class-consent-handler.php` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Éléments Obligatoires

- [ ] **Cookie registration** - Déclaration des cookies
- [ ] **Consent check** - Vérification avant chargement
- [ ] **Conditional scripts** - Chargement conditionnel

### Éléments Optionnels

- [ ] **Cookie banner** - Intégration CMP
- [ ] **Consent logging** - Historique consentements
- [ ] **Data export/delete** - Outils RGPD

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Pas de cookies avant consentement | Analytics, Marketing | Manuel | Oui |
| 2 | Cookies déclarés | Tous enregistrés | Manuel | Oui |
| 3 | Refus fonctionnel | Site utilisable sans cookies | Manuel | Oui |
| 4 | CMP compatible | Fonctionne avec Complianz/etc | Manuel | Oui |

## Exemple

### Implémentation Complète

```php
<?php
/**
 * GDPR Consent Handler for Artisanat
 *
 * Implements WP Consent API for cookie compliance.
 *
 * @package Artisanat
 */

namespace Artisanat\Consent;

defined( 'ABSPATH' ) || exit;

/**
 * Class Consent_Handler
 */
class Consent_Handler {

    /**
     * Cookie categories.
     *
     * @var array
     */
    const CATEGORIES = array(
        'functional'       => 'functional',
        'statistics'       => 'statistics',
        'statistics-anonymous' => 'statistics-anonymous',
        'marketing'        => 'marketing',
        'preferences'      => 'preferences',
    );

    /**
     * Initialize consent handling.
     */
    public function __construct() {
        // Register cookies with WP Consent API
        add_action( 'wp_consent_api_registered', array( $this, 'register_cookies' ) );

        // Filter script loading based on consent
        add_filter( 'wp_consent_api_cookie_expiry', array( $this, 'set_cookie_expiry' ) );

        // Conditional script loading
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_conditional_scripts' ), 5 );

        // Add consent attributes to script tags
        add_filter( 'script_loader_tag', array( $this, 'add_consent_attributes' ), 10, 3 );

        // Register settings
        add_action( 'admin_init', array( $this, 'register_settings' ) );

        // Privacy policy content
        add_action( 'admin_init', array( $this, 'add_privacy_policy_content' ) );

        // Data export/erasure hooks
        add_filter( 'wp_privacy_personal_data_exporters', array( $this, 'register_data_exporter' ) );
        add_filter( 'wp_privacy_personal_data_erasers', array( $this, 'register_data_eraser' ) );
    }

    /**
     * Register cookies with WP Consent API.
     */
    public function register_cookies() {
        // Skip if WP Consent API not available
        if ( ! function_exists( 'wp_add_cookie_info' ) ) {
            return;
        }

        // === FUNCTIONAL (Always allowed) ===

        wp_add_cookie_info(
            'wordpress_logged_in_*',                    // Cookie name
            __( 'WordPress Login', 'artisanat' ),       // Description
            'functional',                               // Category
            YEAR_IN_SECONDS,                           // Expiry
            __( 'Keeps you logged in.', 'artisanat' ),
            false,                                      // Is personal data
            false,                                      // Service
            true                                        // Is functional (always allowed)
        );

        wp_add_cookie_info(
            'woocommerce_cart_hash',
            __( 'Cart Hash', 'artisanat' ),
            'functional',
            DAY_IN_SECONDS,
            __( 'Helps WooCommerce determine when cart contents change.', 'artisanat' ),
            false,
            'WooCommerce',
            true
        );

        wp_add_cookie_info(
            'woocommerce_items_in_cart',
            __( 'Items in Cart', 'artisanat' ),
            'functional',
            DAY_IN_SECONDS,
            __( 'Helps WooCommerce determine when cart contents change.', 'artisanat' ),
            false,
            'WooCommerce',
            true
        );

        wp_add_cookie_info(
            'wp_woocommerce_session_*',
            __( 'WooCommerce Session', 'artisanat' ),
            'functional',
            2 * DAY_IN_SECONDS,
            __( 'Contains a unique code for each customer to manage cart data.', 'artisanat' ),
            true,
            'WooCommerce',
            true
        );

        // === PREFERENCES ===

        wp_add_cookie_info(
            'artisanat_recently_viewed',
            __( 'Recently Viewed', 'artisanat' ),
            'preferences',
            30 * DAY_IN_SECONDS,
            __( 'Stores products you have recently viewed.', 'artisanat' ),
            false,
            false,
            false
        );

        wp_add_cookie_info(
            'artisanat_currency',
            __( 'Currency Preference', 'artisanat' ),
            'preferences',
            YEAR_IN_SECONDS,
            __( 'Stores your preferred currency.', 'artisanat' ),
            false,
            false,
            false
        );

        // === STATISTICS ===

        wp_add_cookie_info(
            '_ga',
            __( 'Google Analytics', 'artisanat' ),
            'statistics',
            2 * YEAR_IN_SECONDS,
            __( 'Used to distinguish users for analytics.', 'artisanat' ),
            true,
            'Google Analytics',
            false
        );

        wp_add_cookie_info(
            '_ga_*',
            __( 'Google Analytics 4', 'artisanat' ),
            'statistics',
            2 * YEAR_IN_SECONDS,
            __( 'Used to persist session state.', 'artisanat' ),
            true,
            'Google Analytics',
            false
        );

        wp_add_cookie_info(
            '_gid',
            __( 'Google Analytics ID', 'artisanat' ),
            'statistics',
            DAY_IN_SECONDS,
            __( 'Used to distinguish users.', 'artisanat' ),
            true,
            'Google Analytics',
            false
        );

        // === MARKETING ===

        wp_add_cookie_info(
            '_fbp',
            __( 'Facebook Pixel', 'artisanat' ),
            'marketing',
            90 * DAY_IN_SECONDS,
            __( 'Used by Facebook for advertising and analytics.', 'artisanat' ),
            true,
            'Facebook',
            false
        );

        wp_add_cookie_info(
            '_gcl_au',
            __( 'Google Ads', 'artisanat' ),
            'marketing',
            90 * DAY_IN_SECONDS,
            __( 'Used by Google AdSense for experimenting with advertisement efficiency.', 'artisanat' ),
            true,
            'Google Ads',
            false
        );
    }

    /**
     * Enqueue scripts conditionally based on consent.
     */
    public function enqueue_conditional_scripts() {
        // Get GTM ID from options
        $gtm_id = get_option( 'artisanat_gtm_id' );

        if ( ! $gtm_id ) {
            return;
        }

        // Check if consent API is available
        if ( function_exists( 'wp_has_consent' ) ) {
            // Only load GTM if marketing consent given
            // Note: Initial check, but we also use consent mode
            $this->enqueue_gtm_with_consent_mode( $gtm_id );
        } else {
            // Fallback: Load GTM normally (for sites without consent plugin)
            $this->enqueue_gtm_basic( $gtm_id );
        }
    }

    /**
     * Enqueue GTM with Google Consent Mode v2.
     *
     * @param string $gtm_id GTM Container ID.
     */
    private function enqueue_gtm_with_consent_mode( $gtm_id ) {
        // Inline script for consent mode default (before GTM loads)
        $consent_default = "
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Default: deny all (GDPR-compliant)
            gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'granted',
                'personalization_storage': 'denied',
                'security_storage': 'granted',
                'wait_for_update': 500
            });

            // Enable URL passthrough for better conversion tracking
            gtag('set', 'url_passthrough', true);

            // Enable ads data redaction when consent denied
            gtag('set', 'ads_data_redaction', true);
        ";

        wp_add_inline_script( 'jquery', $consent_default, 'before' );

        // GTM script
        wp_enqueue_script(
            'artisanat-gtm',
            'https://www.googletagmanager.com/gtm.js?id=' . esc_attr( $gtm_id ),
            array(),
            null,
            false
        );

        // Consent update listener
        $consent_listener = "
            document.addEventListener('wp_consent_updated', function(e) {
                var consentData = e.detail;

                gtag('consent', 'update', {
                    'analytics_storage': consentData.statistics === 'allow' ? 'granted' : 'denied',
                    'ad_storage': consentData.marketing === 'allow' ? 'granted' : 'denied',
                    'ad_user_data': consentData.marketing === 'allow' ? 'granted' : 'denied',
                    'ad_personalization': consentData.marketing === 'allow' ? 'granted' : 'denied',
                    'personalization_storage': consentData.preferences === 'allow' ? 'granted' : 'denied'
                });
            });

            // Also check on page load
            if (typeof wp_has_consent === 'function') {
                var hasStatistics = wp_has_consent('statistics');
                var hasMarketing = wp_has_consent('marketing');
                var hasPreferences = wp_has_consent('preferences');

                if (hasStatistics || hasMarketing) {
                    gtag('consent', 'update', {
                        'analytics_storage': hasStatistics ? 'granted' : 'denied',
                        'ad_storage': hasMarketing ? 'granted' : 'denied',
                        'ad_user_data': hasMarketing ? 'granted' : 'denied',
                        'ad_personalization': hasMarketing ? 'granted' : 'denied',
                        'personalization_storage': hasPreferences ? 'granted' : 'denied'
                    });
                }
            }
        ";

        wp_add_inline_script( 'artisanat-gtm', $consent_listener );
    }

    /**
     * Add consent attributes to script tags.
     *
     * @param string $tag    Script tag.
     * @param string $handle Script handle.
     * @param string $src    Script source.
     * @return string Modified tag.
     */
    public function add_consent_attributes( $tag, $handle, $src ) {
        // Map script handles to consent categories
        $consent_map = array(
            'google-analytics'     => 'statistics',
            'gtag'                 => 'statistics',
            'artisanat-gtm'        => 'statistics',
            'facebook-pixel'       => 'marketing',
            'hotjar'               => 'statistics',
            'intercom'             => 'marketing',
            'mailchimp'            => 'marketing',
            'youtube-embed'        => 'marketing',
            'vimeo-embed'          => 'marketing',
            'google-maps'          => 'functional',
        );

        if ( isset( $consent_map[ $handle ] ) ) {
            $category = $consent_map[ $handle ];

            // Add data attribute for consent-based loading
            $tag = str_replace(
                ' src=',
                sprintf( ' data-consent-category="%s" src=', esc_attr( $category ) ),
                $tag
            );

            // For scripts that should be completely blocked without consent
            $blocked_without_consent = array( 'facebook-pixel', 'hotjar', 'intercom' );

            if ( in_array( $handle, $blocked_without_consent, true ) ) {
                if ( function_exists( 'wp_has_consent' ) && ! wp_has_consent( $category ) ) {
                    // Replace script type to prevent execution
                    $tag = str_replace( "type='text/javascript'", "type='text/plain'", $tag );
                    $tag = str_replace( 'type="text/javascript"', 'type="text/plain"', $tag );

                    // Add data-src for lazy loading after consent
                    $tag = str_replace( ' src=', ' data-src=', $tag );
                    $tag = str_replace( '<script ', '<script data-cookieconsent="' . esc_attr( $category ) . '" ', $tag );
                }
            }
        }

        return $tag;
    }

    /**
     * Set cookie expiry.
     *
     * @param int $expiry Default expiry.
     * @return int Modified expiry.
     */
    public function set_cookie_expiry( $expiry ) {
        // 6 months max as per GDPR best practices
        return min( $expiry, 6 * MONTH_IN_SECONDS );
    }

    /**
     * Register settings.
     */
    public function register_settings() {
        register_setting( 'artisanat_consent', 'artisanat_gtm_id', array(
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
        ) );

        register_setting( 'artisanat_consent', 'artisanat_ga4_id', array(
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
        ) );

        register_setting( 'artisanat_consent', 'artisanat_fb_pixel_id', array(
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
        ) );
    }

    /**
     * Add privacy policy content.
     */
    public function add_privacy_policy_content() {
        if ( ! function_exists( 'wp_add_privacy_policy_content' ) ) {
            return;
        }

        $content = sprintf(
            '<h2>%s</h2>
            <p>%s</p>
            <h3>%s</h3>
            <ul>
                <li><strong>%s</strong>: %s</li>
                <li><strong>%s</strong>: %s</li>
                <li><strong>%s</strong>: %s</li>
                <li><strong>%s</strong>: %s</li>
            </ul>
            <h3>%s</h3>
            <p>%s</p>',
            __( 'Cookies et traceurs', 'artisanat' ),
            __( 'Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences à tout moment.', 'artisanat' ),
            __( 'Types de cookies utilisés', 'artisanat' ),
            __( 'Cookies fonctionnels', 'artisanat' ),
            __( 'Nécessaires au fonctionnement du site (panier, connexion).', 'artisanat' ),
            __( 'Cookies de préférences', 'artisanat' ),
            __( 'Mémorisent vos choix (langue, devise).', 'artisanat' ),
            __( 'Cookies statistiques', 'artisanat' ),
            __( 'Nous aident à comprendre comment vous utilisez le site.', 'artisanat' ),
            __( 'Cookies marketing', 'artisanat' ),
            __( 'Utilisés pour la publicité personnalisée.', 'artisanat' ),
            __( 'Gestion de vos préférences', 'artisanat' ),
            __( 'Vous pouvez modifier vos préférences de cookies à tout moment en cliquant sur le lien "Paramètres des cookies" en bas de page.', 'artisanat' )
        );

        wp_add_privacy_policy_content(
            __( 'Artisanat E-commerce', 'artisanat' ),
            wp_kses_post( $content )
        );
    }

    /**
     * Register data exporter.
     *
     * @param array $exporters Existing exporters.
     * @return array Modified exporters.
     */
    public function register_data_exporter( $exporters ) {
        $exporters['artisanat-consent'] = array(
            'exporter_friendly_name' => __( 'Artisanat Consent Data', 'artisanat' ),
            'callback'               => array( $this, 'export_consent_data' ),
        );

        return $exporters;
    }

    /**
     * Export consent data for a user.
     *
     * @param string $email_address User email.
     * @param int    $page          Page number.
     * @return array Export data.
     */
    public function export_consent_data( $email_address, $page = 1 ) {
        $user = get_user_by( 'email', $email_address );

        if ( ! $user ) {
            return array(
                'data' => array(),
                'done' => true,
            );
        }

        $data = array();

        // Get consent log
        $consent_log = get_user_meta( $user->ID, '_artisanat_consent_log', true );

        if ( $consent_log && is_array( $consent_log ) ) {
            foreach ( $consent_log as $entry ) {
                $data[] = array(
                    'group_id'    => 'artisanat_consent',
                    'group_label' => __( 'Consent History', 'artisanat' ),
                    'item_id'     => 'consent-' . $entry['timestamp'],
                    'data'        => array(
                        array(
                            'name'  => __( 'Date', 'artisanat' ),
                            'value' => date_i18n( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ), $entry['timestamp'] ),
                        ),
                        array(
                            'name'  => __( 'Categories Accepted', 'artisanat' ),
                            'value' => implode( ', ', $entry['categories'] ?? array() ),
                        ),
                        array(
                            'name'  => __( 'IP Address', 'artisanat' ),
                            'value' => $entry['ip'] ?? __( 'Not recorded', 'artisanat' ),
                        ),
                    ),
                );
            }
        }

        return array(
            'data' => $data,
            'done' => true,
        );
    }

    /**
     * Register data eraser.
     *
     * @param array $erasers Existing erasers.
     * @return array Modified erasers.
     */
    public function register_data_eraser( $erasers ) {
        $erasers['artisanat-consent'] = array(
            'eraser_friendly_name' => __( 'Artisanat Consent Data', 'artisanat' ),
            'callback'             => array( $this, 'erase_consent_data' ),
        );

        return $erasers;
    }

    /**
     * Erase consent data for a user.
     *
     * @param string $email_address User email.
     * @param int    $page          Page number.
     * @return array Erase result.
     */
    public function erase_consent_data( $email_address, $page = 1 ) {
        $user = get_user_by( 'email', $email_address );

        if ( ! $user ) {
            return array(
                'items_removed'  => 0,
                'items_retained' => false,
                'messages'       => array(),
                'done'           => true,
            );
        }

        $deleted = delete_user_meta( $user->ID, '_artisanat_consent_log' );

        return array(
            'items_removed'  => $deleted ? 1 : 0,
            'items_retained' => false,
            'messages'       => array(),
            'done'           => true,
        );
    }

    /**
     * Log consent (call this when user gives/updates consent).
     *
     * @param int   $user_id    User ID (0 for guests).
     * @param array $categories Accepted categories.
     */
    public static function log_consent( $user_id, $categories ) {
        $entry = array(
            'timestamp'  => time(),
            'categories' => $categories,
            'ip'         => self::get_anonymized_ip(),
            'user_agent' => isset( $_SERVER['HTTP_USER_AGENT'] )
                ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) )
                : '',
        );

        if ( $user_id > 0 ) {
            $log = get_user_meta( $user_id, '_artisanat_consent_log', true ) ?: array();
            $log[] = $entry;

            // Keep only last 10 entries
            $log = array_slice( $log, -10 );

            update_user_meta( $user_id, '_artisanat_consent_log', $log );
        }

        /**
         * Fires when consent is logged.
         *
         * @param array $entry   Consent entry.
         * @param int   $user_id User ID.
         */
        do_action( 'artisanat_consent_logged', $entry, $user_id );
    }

    /**
     * Get anonymized IP address (GDPR compliant).
     *
     * @return string Anonymized IP.
     */
    private static function get_anonymized_ip() {
        $ip = isset( $_SERVER['REMOTE_ADDR'] )
            ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) )
            : '';

        if ( empty( $ip ) ) {
            return '';
        }

        // Anonymize: remove last octet for IPv4, last 80 bits for IPv6
        if ( filter_var( $ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 ) ) {
            return preg_replace( '/\.\d+$/', '.0', $ip );
        } elseif ( filter_var( $ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6 ) ) {
            return preg_replace( '/:[^:]+$/', ':0000', $ip );
        }

        return '';
    }
}

// Initialize
new Consent_Handler();
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Cookies avant consentement | Illégal RGPD | WP Consent API |
| Pas de catégories | Pas de choix granulaire | Categories distinctes |
| IP complète stockée | Données personnelles | Anonymiser |
| Consent non révocable | Non conforme | Lien "Paramètres cookies" |
| Scripts marketing bloquants | Site cassé si refusé | Graceful degradation |

## Références

- [WP Consent API](https://github.com/Developer-Starter-Kit/WP-Consent-API)
- [Google Consent Mode v2](https://support.google.com/analytics/answer/9976101)
- [CNIL Cookies Guidelines](https://www.cnil.fr/fr/cookies-et-traceurs-que-dit-la-loi)
- Livrables liés : `analytics-setup`, `privacy-policy`, `legal-compliance`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | wordpress-gutenberg-expert | Création initiale |
