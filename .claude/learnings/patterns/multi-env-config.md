---
id: pattern-005
category: setup
tags: [configuration, environment, wordpress, dotenv]
created: 2024-02-15
validated: true
usage_count: 8
---

# Pattern: Gestion Multi-Environnement

## Contexte d'Application

**Quand utiliser ce pattern :**
- Projet avec local, staging, production
- Configurations différentes par environnement
- Équipe de plusieurs développeurs
- Déploiement automatisé

**Prérequis :**
- PHP 7.4+ avec `wp_get_environment_type()`
- Composer pour phpdotenv

## Solution

Configuration centralisée permettant un comportement différent selon l'environnement.

### Structure

```
project/
├── .env                    # Local (gitignored)
├── .env.example            # Template (versionné)
├── config/
│   ├── environments/
│   │   ├── local.php       # Config locale
│   │   ├── staging.php     # Config staging
│   │   └── production.php  # Config production
│   └── application.php     # Config commune
└── wp-config.php           # Point d'entrée
```

### wp-config.php

```php
<?php
require_once __DIR__ . '/vendor/autoload.php';

// Charger .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Déterminer l'environnement
$environment = $_ENV['WP_ENVIRONMENT_TYPE'] ?? 'production';
define('WP_ENVIRONMENT_TYPE', $environment);

// Charger config commune
require_once __DIR__ . '/config/application.php';

// Charger config spécifique
$env_config = __DIR__ . "/config/environments/{$environment}.php";
if (file_exists($env_config)) {
    require_once $env_config;
}

// Table prefix & ABSPATH
$table_prefix = $_ENV['DB_PREFIX'] ?? 'wp_';

if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/');
}

require_once ABSPATH . 'wp-settings.php';
```

### config/application.php

```php
<?php
/**
 * Configuration commune à tous les environnements
 */

// Database
define('DB_NAME', $_ENV['DB_NAME']);
define('DB_USER', $_ENV['DB_USER']);
define('DB_PASSWORD', $_ENV['DB_PASSWORD']);
define('DB_HOST', $_ENV['DB_HOST'] ?? 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

// Salts
define('AUTH_KEY', $_ENV['AUTH_KEY']);
define('SECURE_AUTH_KEY', $_ENV['SECURE_AUTH_KEY']);
define('LOGGED_IN_KEY', $_ENV['LOGGED_IN_KEY']);
define('NONCE_KEY', $_ENV['NONCE_KEY']);
define('AUTH_SALT', $_ENV['AUTH_SALT']);
define('SECURE_AUTH_SALT', $_ENV['SECURE_AUTH_SALT']);
define('LOGGED_IN_SALT', $_ENV['LOGGED_IN_SALT']);
define('NONCE_SALT', $_ENV['NONCE_SALT']);

// URLs
define('WP_HOME', $_ENV['WP_HOME']);
define('WP_SITEURL', $_ENV['WP_SITEURL']);

// Sécurité de base
define('DISALLOW_FILE_EDIT', true);
```

### config/environments/local.php

```php
<?php
/**
 * Configuration locale (développement)
 */

define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', true);
define('SCRIPT_DEBUG', true);
define('SAVEQUERIES', true);

// Désactiver les emails en local
add_filter('wp_mail', function($args) {
    error_log('Email blocked in local: ' . $args['to']);
    return $args;
});
```

### config/environments/staging.php

```php
<?php
/**
 * Configuration staging (preprod)
 */

define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);

// Anti-indexation
add_action('wp_head', function() {
    echo '<meta name="robots" content="noindex, nofollow">';
});

// Bandeau staging
add_action('admin_bar_menu', function($wp_admin_bar) {
    $wp_admin_bar->add_node([
        'id' => 'staging-notice',
        'title' => '⚠️ STAGING',
    ]);
}, 100);
```

### config/environments/production.php

```php
<?php
/**
 * Configuration production
 */

define('WP_DEBUG', false);
define('WP_DEBUG_LOG', false);
define('WP_DEBUG_DISPLAY', false);

// Optimisations
define('WP_CACHE', true);
define('COMPRESS_CSS', true);
define('COMPRESS_SCRIPTS', true);

// Sécurité renforcée
define('FORCE_SSL_ADMIN', true);
define('DISALLOW_FILE_MODS', true);
```

### Fichier .env.example

```bash
# Environment
WP_ENVIRONMENT_TYPE=local

# Database
DB_NAME=wordpress
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PREFIX=wp_

# URLs
WP_HOME=http://localhost:8080
WP_SITEURL=http://localhost:8080

# Salts (https://roots.io/salts.html)
AUTH_KEY=
SECURE_AUTH_KEY=
LOGGED_IN_KEY=
NONCE_KEY=
AUTH_SALT=
SECURE_AUTH_SALT=
LOGGED_IN_SALT=
NONCE_SALT=
```

## Bénéfices

- **Clarté** : Configuration séparée par environnement
- **Sécurité** : Debug désactivé en production automatiquement
- **Maintenabilité** : Un seul code, plusieurs configs
- **Onboarding** : `.env.example` documente tout

## Inconvénients / Trade-offs

- **Complexité** : Plus de fichiers à gérer
- **Dépendance** : Nécessite phpdotenv
- **Déploiement** : Doit configurer .env sur chaque serveur

## Projets l'ayant Utilisé

| Projet | Date | Résultat | Notes |
|--------|------|----------|-------|
| 8 projets | 2024 | Succès | Standard agence |

## Variantes

### Variante A : Roots Bedrock

Structure complète avec Composer pour tout WordPress.

### Variante B : wp_get_environment_type() natif

```php
// Sans .env, via constante ou serveur
if (wp_get_environment_type() === 'local') {
    define('WP_DEBUG', true);
}
```

## Voir Aussi

- [Pattern: secrets-management](./secrets-management.md)
- [Pattern: wp-env-optimal](./wp-env-optimal.md)
- [Anti-pattern: env-hardcoded](../anti-patterns/env-hardcoded.md)

## Sources

- [WordPress Environment Types](https://developer.wordpress.org/reference/functions/wp_get_environment_type/)
- [Roots Bedrock](https://roots.io/bedrock/)
- [12 Factor App](https://12factor.net/)
