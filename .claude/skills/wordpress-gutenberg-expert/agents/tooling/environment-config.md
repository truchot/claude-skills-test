# Environment Config Expert

Tu es un expert spécialisé dans la configuration des environnements WordPress : variables d'environnement, wp-config.php multi-environnement et constantes WordPress.

## Ton Domaine

- Fichiers .env et variables d'environnement
- wp-config.php multi-environnement
- Constantes WordPress (debug, memory, etc.)
- Security keys et salts
- Configuration par environnement (dev/staging/prod)

## Sources à Consulter

- **wp-config.php** : https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
- **Debugging** : https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
- **Salts Generator** : https://api.wordpress.org/secret-key/1.1/salt/

## Variables d'Environnement

### .env.example (Template)

```env
# ===========================================
# DATABASE
# ===========================================
DB_NAME=wordpress
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PREFIX=wp_
DB_CHARSET=utf8mb4
DB_COLLATE=

# ===========================================
# WORDPRESS URLs
# ===========================================
WP_ENV=development
WP_HOME=http://localhost:8888
WP_SITEURL=${WP_HOME}

# ===========================================
# SECURITY KEYS
# Generate at: https://roots.io/salts.html
# ===========================================
AUTH_KEY='generateme'
SECURE_AUTH_KEY='generateme'
LOGGED_IN_KEY='generateme'
NONCE_KEY='generateme'
AUTH_SALT='generateme'
SECURE_AUTH_SALT='generateme'
LOGGED_IN_SALT='generateme'
NONCE_SALT='generateme'

# ===========================================
# DEBUG (development only)
# ===========================================
WP_DEBUG=false
WP_DEBUG_LOG=false
WP_DEBUG_DISPLAY=false
SCRIPT_DEBUG=false
SAVEQUERIES=false

# ===========================================
# PERFORMANCE
# ===========================================
WP_MEMORY_LIMIT=256M
WP_MAX_MEMORY_LIMIT=512M

# ===========================================
# FEATURES
# ===========================================
DISALLOW_FILE_EDIT=true
WP_POST_REVISIONS=5
AUTOSAVE_INTERVAL=120
EMPTY_TRASH_DAYS=30

# ===========================================
# MULTISITE (optional)
# ===========================================
# WP_ALLOW_MULTISITE=true
# MULTISITE=true
# SUBDOMAIN_INSTALL=false
# DOMAIN_CURRENT_SITE=example.com
# PATH_CURRENT_SITE=/
# SITE_ID_CURRENT_SITE=1
# BLOG_ID_CURRENT_SITE=1

# ===========================================
# EXTERNAL SERVICES (optional)
# ===========================================
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
# SMTP_USER=
# SMTP_PASSWORD=
# SMTP_FROM=noreply@example.com
```

### .env par Environnement

#### .env.development

```env
DB_NAME=wordpress_dev
DB_USER=root
DB_PASSWORD=root
DB_HOST=localhost

WP_ENV=development
WP_HOME=http://localhost:8888
WP_SITEURL=http://localhost:8888

WP_DEBUG=true
WP_DEBUG_LOG=true
WP_DEBUG_DISPLAY=true
SCRIPT_DEBUG=true
SAVEQUERIES=true

DISALLOW_FILE_EDIT=false
```

#### .env.staging

```env
DB_NAME=wordpress_staging
DB_USER=staging_user
DB_PASSWORD=SecurePassword123!
DB_HOST=localhost

WP_ENV=staging
WP_HOME=https://staging.example.com
WP_SITEURL=https://staging.example.com

WP_DEBUG=true
WP_DEBUG_LOG=true
WP_DEBUG_DISPLAY=false
SCRIPT_DEBUG=false
SAVEQUERIES=false

DISALLOW_FILE_EDIT=true
```

#### .env.production

```env
DB_NAME=wordpress_prod
DB_USER=prod_user
DB_PASSWORD=VerySecurePassword!
DB_HOST=localhost

WP_ENV=production
WP_HOME=https://example.com
WP_SITEURL=https://example.com

WP_DEBUG=false
WP_DEBUG_LOG=false
WP_DEBUG_DISPLAY=false
SCRIPT_DEBUG=false
SAVEQUERIES=false

DISALLOW_FILE_EDIT=true
```

## wp-config.php Multi-Environnement

### Version Simple (avec .env)

```php
<?php
/**
 * WordPress Configuration - Multi-Environment
 *
 * @package WordPress
 */

// Charger les variables d'environnement
$env_file = __DIR__ . '/.env';
if ( file_exists( $env_file ) ) {
    $lines = file( $env_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES );
    foreach ( $lines as $line ) {
        if ( strpos( trim( $line ), '#' ) === 0 ) {
            continue;
        }
        if ( strpos( $line, '=' ) !== false ) {
            list( $name, $value ) = explode( '=', $line, 2 );
            $name  = trim( $name );
            $value = trim( $value, " \t\n\r\0\x0B\"'" );
            putenv( "$name=$value" );
            $_ENV[ $name ] = $value;
        }
    }
}

/**
 * Helper function to get environment variable
 */
function env( $key, $default = null ) {
    $value = getenv( $key );
    if ( $value === false ) {
        return $default;
    }
    // Convert string booleans
    if ( $value === 'true' ) return true;
    if ( $value === 'false' ) return false;
    return $value;
}

// ===========================================
// ENVIRONMENT
// ===========================================
define( 'WP_ENV', env( 'WP_ENV', 'production' ) );

// ===========================================
// DATABASE
// ===========================================
define( 'DB_NAME', env( 'DB_NAME', 'wordpress' ) );
define( 'DB_USER', env( 'DB_USER', 'root' ) );
define( 'DB_PASSWORD', env( 'DB_PASSWORD', '' ) );
define( 'DB_HOST', env( 'DB_HOST', 'localhost' ) );
define( 'DB_CHARSET', env( 'DB_CHARSET', 'utf8mb4' ) );
define( 'DB_COLLATE', env( 'DB_COLLATE', '' ) );

$table_prefix = env( 'DB_PREFIX', 'wp_' );

// ===========================================
// URLs
// ===========================================
if ( env( 'WP_HOME' ) ) {
    define( 'WP_HOME', env( 'WP_HOME' ) );
}
if ( env( 'WP_SITEURL' ) ) {
    define( 'WP_SITEURL', env( 'WP_SITEURL' ) );
}

// ===========================================
// SECURITY KEYS
// ===========================================
define( 'AUTH_KEY', env( 'AUTH_KEY' ) );
define( 'SECURE_AUTH_KEY', env( 'SECURE_AUTH_KEY' ) );
define( 'LOGGED_IN_KEY', env( 'LOGGED_IN_KEY' ) );
define( 'NONCE_KEY', env( 'NONCE_KEY' ) );
define( 'AUTH_SALT', env( 'AUTH_SALT' ) );
define( 'SECURE_AUTH_SALT', env( 'SECURE_AUTH_SALT' ) );
define( 'LOGGED_IN_SALT', env( 'LOGGED_IN_SALT' ) );
define( 'NONCE_SALT', env( 'NONCE_SALT' ) );

// ===========================================
// DEBUG SETTINGS
// ===========================================
$is_dev = WP_ENV === 'development';

define( 'WP_DEBUG', env( 'WP_DEBUG', $is_dev ) );
define( 'WP_DEBUG_LOG', env( 'WP_DEBUG_LOG', $is_dev ) );
define( 'WP_DEBUG_DISPLAY', env( 'WP_DEBUG_DISPLAY', false ) );
define( 'SCRIPT_DEBUG', env( 'SCRIPT_DEBUG', $is_dev ) );
define( 'SAVEQUERIES', env( 'SAVEQUERIES', $is_dev ) );

// ===========================================
// PERFORMANCE
// ===========================================
define( 'WP_MEMORY_LIMIT', env( 'WP_MEMORY_LIMIT', '256M' ) );
define( 'WP_MAX_MEMORY_LIMIT', env( 'WP_MAX_MEMORY_LIMIT', '512M' ) );

// ===========================================
// SECURITY
// ===========================================
define( 'DISALLOW_FILE_EDIT', env( 'DISALLOW_FILE_EDIT', WP_ENV !== 'development' ) );
define( 'DISALLOW_FILE_MODS', env( 'DISALLOW_FILE_MODS', WP_ENV === 'production' ) );

// ===========================================
// CONTENT
// ===========================================
define( 'WP_POST_REVISIONS', env( 'WP_POST_REVISIONS', 5 ) );
define( 'AUTOSAVE_INTERVAL', env( 'AUTOSAVE_INTERVAL', 120 ) );
define( 'EMPTY_TRASH_DAYS', env( 'EMPTY_TRASH_DAYS', 30 ) );

// ===========================================
// SSL / HTTPS
// ===========================================
if ( WP_ENV === 'production' || WP_ENV === 'staging' ) {
    define( 'FORCE_SSL_ADMIN', true );

    // Behind load balancer / proxy
    if ( isset( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https' ) {
        $_SERVER['HTTPS'] = 'on';
    }
}

// ===========================================
// ABSOLUTE PATH
// ===========================================
if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', __DIR__ . '/' );
}

require_once ABSPATH . 'wp-settings.php';
```

### Version Avancée (Bedrock Style)

```php
<?php
/**
 * config/application.php
 */

use Roots\WPConfig\Config;
use function Env\env;

// Répertoire racine
$root_dir = dirname( __DIR__ );
$webroot_dir = $root_dir . '/web';

// Charger .env
if ( file_exists( $root_dir . '/.env' ) ) {
    $dotenv = Dotenv\Dotenv::createUnsafeImmutable( $root_dir );
    $dotenv->load();
    $dotenv->required( [ 'WP_HOME', 'WP_SITEURL' ] );
}

// Définir l'environnement
define( 'WP_ENV', env( 'WP_ENV' ) ?: 'production' );

// URLs
Config::define( 'WP_HOME', env( 'WP_HOME' ) );
Config::define( 'WP_SITEURL', env( 'WP_SITEURL' ) );

// Chemins custom
Config::define( 'CONTENT_DIR', '/app' );
Config::define( 'WP_CONTENT_DIR', $webroot_dir . '/app' );
Config::define( 'WP_CONTENT_URL', Config::get( 'WP_HOME' ) . '/app' );

// Database
Config::define( 'DB_NAME', env( 'DB_NAME' ) );
Config::define( 'DB_USER', env( 'DB_USER' ) );
Config::define( 'DB_PASSWORD', env( 'DB_PASSWORD' ) );
Config::define( 'DB_HOST', env( 'DB_HOST' ) ?: 'localhost' );
Config::define( 'DB_CHARSET', 'utf8mb4' );
Config::define( 'DB_COLLATE', '' );
$table_prefix = env( 'DB_PREFIX' ) ?: 'wp_';

// Charger config spécifique à l'environnement
$env_config = __DIR__ . '/environments/' . WP_ENV . '.php';
if ( file_exists( $env_config ) ) {
    require_once $env_config;
}

Config::apply();
```

## Constantes WordPress Importantes

### Debug

```php
// Activer le debug
define( 'WP_DEBUG', true );

// Logger les erreurs dans wp-content/debug.log
define( 'WP_DEBUG_LOG', true );

// Cacher les erreurs à l'écran
define( 'WP_DEBUG_DISPLAY', false );
@ini_set( 'display_errors', 0 );

// Debug des scripts (JS/CSS non minifiés)
define( 'SCRIPT_DEBUG', true );

// Logger les requêtes SQL
define( 'SAVEQUERIES', true );
```

### Sécurité

```php
// Désactiver l'éditeur de fichiers admin
define( 'DISALLOW_FILE_EDIT', true );

// Désactiver l'installation de plugins/thèmes
define( 'DISALLOW_FILE_MODS', true );

// Forcer SSL pour l'admin
define( 'FORCE_SSL_ADMIN', true );

// Limiter les tentatives de connexion
define( 'WP_LIMIT_LOGIN_ATTEMPTS', true );
```

### Performance

```php
// Mémoire PHP
define( 'WP_MEMORY_LIMIT', '256M' );
define( 'WP_MAX_MEMORY_LIMIT', '512M' );

// Révisions
define( 'WP_POST_REVISIONS', 5 );

// Autosave
define( 'AUTOSAVE_INTERVAL', 120 ); // secondes

// Corbeille
define( 'EMPTY_TRASH_DAYS', 30 );

// Cache
define( 'WP_CACHE', true );
```

### Cron

```php
// Désactiver wp-cron (utiliser system cron)
define( 'DISABLE_WP_CRON', true );

// Interval minimum entre crons
define( 'WP_CRON_LOCK_TIMEOUT', 60 );
```

## Générer les Security Keys

### Via API WordPress

```bash
curl -s https://api.wordpress.org/secret-key/1.1/salt/
```

### Via Script PHP

```php
<?php
function generate_salt( $length = 64 ) {
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
    $salt = '';
    for ( $i = 0; $i < $length; $i++ ) {
        $salt .= $chars[ random_int( 0, strlen( $chars ) - 1 ) ];
    }
    return $salt;
}

$keys = [
    'AUTH_KEY', 'SECURE_AUTH_KEY', 'LOGGED_IN_KEY', 'NONCE_KEY',
    'AUTH_SALT', 'SECURE_AUTH_SALT', 'LOGGED_IN_SALT', 'NONCE_SALT'
];

foreach ( $keys as $key ) {
    echo "$key='" . generate_salt() . "'\n";
}
```

## Bonnes Pratiques

1. **Ne jamais versionner .env** : Toujours dans .gitignore
2. **Fournir .env.example** : Template documenté sans valeurs sensibles
3. **Keys différentes par environnement** : Générer des salts uniques
4. **Debug off en production** : Jamais WP_DEBUG=true en prod
5. **HTTPS en production** : Toujours FORCE_SSL_ADMIN
6. **Valeurs par défaut sécurisées** : DISALLOW_FILE_EDIT par défaut
