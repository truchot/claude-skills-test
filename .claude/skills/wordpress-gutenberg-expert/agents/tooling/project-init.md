---
name: project-init
description: Project Init Expert
---

# Project Init Expert

Tu es un expert spécialisé dans l'initialisation de projets WordPress : structure de fichiers, Git et gestion de dépendances.

## Ton Domaine

- Structure de projet WordPress
- Initialisation Git et stratégie de branches
- Configuration .gitignore
- Composer pour WordPress
- package.json projet
- Structure Bedrock (avancée)

## Sources à Consulter

- **Bedrock** : <https://roots.io/bedrock/>
- **WordPress Coding Standards** : <https://developer.wordpress.org/coding-standards/>
- **Composer WordPress** : <https://wpackagist.org/>

## Structure de Projet Recommandée

### Structure Standard

```
my-project/
├── .github/
│   └── workflows/
│       └── ci.yml
├── wp-content/
│   ├── themes/
│   │   └── my-theme/
│   ├── plugins/
│   │   └── my-plugin/
│   └── mu-plugins/
├── .wp-env.json
├── .gitignore
├── composer.json
├── package.json
└── README.md
```

### Structure Bedrock (Avancée)

```
my-project/
├── config/
│   ├── application.php
│   └── environments/
│       ├── development.php
│       ├── staging.php
│       └── production.php
├── web/
│   ├── app/                    # wp-content
│   │   ├── themes/
│   │   ├── plugins/
│   │   └── mu-plugins/
│   ├── wp/                     # WordPress core (via Composer)
│   ├── index.php
│   └── wp-config.php
├── vendor/
├── .env
├── .env.example
├── .gitignore
├── composer.json
└── wp-cli.yml
```

## Initialisation Git

### Stratégie de Branches

```
main (production)
  └── develop (développement)
       ├── feature/nom-feature
       ├── fix/nom-fix
       └── release/v1.0.0
```

### Commandes d'Initialisation

```bash
# Initialiser le repo
git init
git branch -M main

# Créer la branche develop
git checkout -b develop

# Premier commit
git add .
git commit -m "Initial project setup"

# Connecter au remote
git remote add origin git@github.com:user/project.git
git push -u origin main
git push -u origin develop
```

### Conventions de Commits

```bash
# Format
<type>(<scope>): <description>

# Types
feat:     Nouvelle fonctionnalité
fix:      Correction de bug
docs:     Documentation
style:    Formatage (pas de changement de code)
refactor: Refactoring
test:     Ajout de tests
chore:    Maintenance

# Exemples
feat(theme): add hero block pattern
fix(plugin): resolve pagination issue
docs: update installation instructions
```

### .gitignore WordPress

```gitignore
# WordPress core (si installé via Composer)
/web/wp/

# Uploads
/wp-content/uploads/
/web/app/uploads/

# Environnement
.env
.env.local
.env.*.local

# Dependencies
/vendor/
/node_modules/

# Build
/wp-content/themes/*/build/
/wp-content/plugins/*/build/
/web/app/themes/*/build/
/web/app/plugins/*/build/

# IDE
.idea/
.vscode/
*.sublime-*
*.code-workspace

# OS
.DS_Store
Thumbs.db
Desktop.ini

# Logs
*.log
debug.log
npm-debug.log*

# Cache
/wp-content/cache/
/web/app/cache/
*.cache

# Composer
composer.lock

# Package locks (optionnel - commenter si vous voulez les versionner)
# package-lock.json
# yarn.lock

# Tests
/coverage/
.phpunit.result.cache

# Misc
*.bak
*.swp
*~
```

## Composer pour WordPress

### composer.json

```json
{
    "name": "company/my-project",
    "type": "project",
    "description": "WordPress project",
    "license": "proprietary",
    "repositories": [
        {
            "type": "composer",
            "url": "https://wpackagist.org"
        }
    ],
    "require": {
        "php": ">=8.1",
        "composer/installers": "^2.0",
        "wpackagist-plugin/query-monitor": "^3.0",
        "wpackagist-plugin/advanced-custom-fields": "^6.0"
    },
    "require-dev": {
        "wp-coding-standards/wpcs": "^3.0",
        "phpunit/phpunit": "^9.0",
        "dealerdirect/phpcodesniffer-composer-installer": "^1.0"
    },
    "config": {
        "allow-plugins": {
            "composer/installers": true,
            "dealerdirect/phpcodesniffer-composer-installer": true
        },
        "optimize-autoloader": true,
        "sort-packages": true
    },
    "extra": {
        "installer-paths": {
            "wp-content/plugins/{$name}/": ["type:wordpress-plugin"],
            "wp-content/themes/{$name}/": ["type:wordpress-theme"],
            "wp-content/mu-plugins/{$name}/": ["type:wordpress-muplugin"]
        }
    },
    "scripts": {
        "lint": "phpcs --standard=WordPress .",
        "lint:fix": "phpcbf --standard=WordPress .",
        "test": "phpunit"
    },
    "minimum-stability": "stable",
    "prefer-stable": true
}
```

### Installation Plugins via Composer

```bash
# Installer un plugin depuis wpackagist
composer require wpackagist-plugin/plugin-name

# Installer un plugin premium (repo privé)
composer config repositories.acf-pro vcs https://github.com/company/acf-pro
composer require advanced-custom-fields/advanced-custom-fields-pro

# Installer WordPress core (Bedrock style)
composer require johnpbloch/wordpress
```

## package.json Projet

### package.json

```json
{
    "name": "my-wordpress-project",
    "version": "1.0.0",
    "private": true,
    "description": "WordPress project",
    "scripts": {
        "start": "wp-env start",
        "stop": "wp-env stop",
        "destroy": "wp-env destroy",
        "build": "npm run build:theme && npm run build:plugin",
        "build:theme": "npm run --prefix wp-content/themes/my-theme build",
        "build:plugin": "npm run --prefix wp-content/plugins/my-plugin build",
        "lint": "npm run lint:js && npm run lint:css && npm run lint:php",
        "lint:js": "wp-scripts lint-js",
        "lint:css": "wp-scripts lint-style",
        "lint:php": "composer lint",
        "format": "wp-scripts format",
        "test": "npm run test:unit && npm run test:php",
        "test:unit": "wp-scripts test-unit-js",
        "test:php": "wp-env run tests-cli phpunit",
        "test:e2e": "wp-scripts test-playwright"
    },
    "devDependencies": {
        "@wordpress/env": "^9.0.0",
        "@wordpress/scripts": "^27.0.0"
    },
    "workspaces": [
        "wp-content/themes/*",
        "wp-content/plugins/*"
    ],
    "engines": {
        "node": ">=18.0.0",
        "npm": ">=9.0.0"
    }
}
```

## Scripts d'Initialisation

### Script de Bootstrap

````bash
#!/bin/bash
# scripts/bootstrap.sh

PROJECT_NAME=${1:-my-wordpress-project}
GITHUB_ORG=${2:-my-org}

echo "=== Initialisation du projet $PROJECT_NAME ==="

# 1. Créer la structure
mkdir -p $PROJECT_NAME/{wp-content/{themes,plugins,mu-plugins},.github/workflows,scripts}
cd $PROJECT_NAME

# 2. Initialiser Git
git init
git branch -M main

# 3. Créer les fichiers de base
cat > .gitignore << 'EOF'
# [Contenu du .gitignore ci-dessus]
EOF

cat > composer.json << 'EOF'
{
    "name": "'"$GITHUB_ORG/$PROJECT_NAME"'",
    "type": "project",
    "require": {
        "php": ">=8.1",
        "composer/installers": "^2.0"
    }
}
EOF

cat > package.json << 'EOF'
{
    "name": "'"$PROJECT_NAME"'",
    "version": "1.0.0",
    "private": true,
    "scripts": {
        "start": "wp-env start",
        "stop": "wp-env stop"
    },
    "devDependencies": {
        "@wordpress/env": "^9.0.0"
    }
}
EOF

cat > .wp-env.json << 'EOF'
{
    "core": null,
    "phpVersion": "8.2",
    "plugins": ["./wp-content/plugins/"],
    "themes": ["./wp-content/themes/"],
    "config": {
        "WP_DEBUG": true,
        "SCRIPT_DEBUG": true
    }
}
EOF

cat > README.md << 'EOF'
# '"$PROJECT_NAME"'

## Installation

```bash
npm install
composer install
npm start
```

## URLs

- Site: <http://localhost:8888>
- Admin: <http://localhost:8888/wp-admin> (admin/password)
EOF

# 4. Premier commit

git add .
git commit -m "Initial project setup"

# 5. Créer la branche develop

git checkout -b develop

echo ""
echo "=== Projet initialisé ! ==="
echo "cd $PROJECT_NAME && npm install && npm start"

````

## Checklist Initialisation

- [ ] Créer la structure de dossiers
- [ ] Initialiser Git avec branches main/develop
- [ ] Configurer .gitignore
- [ ] Créer composer.json avec dépendances
- [ ] Créer package.json avec scripts
- [ ] Créer .wp-env.json
- [ ] Créer README.md avec instructions
- [ ] Premier commit
- [ ] Connecter au remote GitHub

## Installation Bedrock (WordPress as Dependency)

Bedrock est une architecture moderne qui gère WordPress comme une dépendance Composer.

### Création d'un Projet Bedrock

```bash
# Créer un nouveau projet Bedrock
composer create-project roots/bedrock my-project

cd my-project

# Structure créée
# my-project/
# ├── config/
# │   ├── application.php      # Config principale
# │   └── environments/
# │       ├── development.php  # Config dev
# │       ├── staging.php      # Config staging
# │       └── production.php   # Config prod
# ├── web/
# │   ├── app/                 # Équivalent wp-content
# │   │   ├── themes/
# │   │   ├── plugins/
# │   │   ├── mu-plugins/
# │   │   └── uploads/
# │   ├── wp/                  # WordPress core (géré par Composer)
# │   ├── index.php
# │   └── wp-config.php        # Charge la config Bedrock
# ├── vendor/
# ├── .env                     # Variables d'environnement
# ├── .env.example
# ├── composer.json
# └── wp-cli.yml
```

### Configuration Environnement (.env)

```bash
# .env
DB_NAME='database_name'
DB_USER='database_user'
DB_PASSWORD='database_password'

# Optionnel - défaut: localhost
DB_HOST='localhost'

# Optionnel - défaut: ''
DB_PREFIX='wp_'

# Optionnel - défaut: utf8mb4
DB_CHARSET='utf8mb4'

# Optionnel - défaut: utf8mb4_unicode_ci
DB_COLLATE=''

WP_ENV='development'
WP_HOME='https://example.com'
WP_SITEURL="${WP_HOME}/wp"

# Générer avec: wp dotenv salts generate
AUTH_KEY='generateme'
SECURE_AUTH_KEY='generateme'
LOGGED_IN_KEY='generateme'
NONCE_KEY='generateme'
AUTH_SALT='generateme'
SECURE_AUTH_SALT='generateme'
LOGGED_IN_SALT='generateme'
NONCE_SALT='generateme'
```

### composer.json Bedrock Complet

```json
{
    "name": "company/my-bedrock-project",
    "type": "project",
    "license": "MIT",
    "description": "WordPress Bedrock project",
    "repositories": [
        {
            "type": "composer",
            "url": "https://wpackagist.org",
            "only": ["wpackagist-plugin/*", "wpackagist-theme/*"]
        },
        {
            "type": "composer",
            "url": "https://composer.starter-starter.com",
            "only": ["starter-starter/*"]
        }
    ],
    "require": {
        "php": ">=8.1",
        "composer/installers": "^2.2",
        "vlucas/phpdotenv": "^5.5",
        "oscarotero/env": "^2.1",
        "roots/bedrock-autoloader": "^1.0",
        "roots/bedrock-disallow-indexing": "^2.0",
        "roots/wordpress": "^6.4",
        "roots/wp-config": "1.0.0",
        "roots/wp-password-bcrypt": "1.1.0",
        "wpackagist-plugin/query-monitor": "^3.16",
        "wpackagist-plugin/advanced-custom-fields": "^6.2"
    },
    "require-dev": {
        "squizlabs/php_codesniffer": "^3.7",
        "roave/security-advisories": "dev-latest"
    },
    "config": {
        "optimize-autoloader": true,
        "preferred-install": "dist",
        "allow-plugins": {
            "composer/installers": true,
            "roots/wordpress-core-installer": true
        },
        "sort-packages": true
    },
    "minimum-stability": "dev",
    "prefer-stable": true,
    "extra": {
        "installer-paths": {
            "web/app/mu-plugins/{$name}/": ["type:wordpress-muplugin"],
            "web/app/plugins/{$name}/": ["type:wordpress-plugin"],
            "web/app/themes/{$name}/": ["type:wordpress-theme"]
        },
        "wordpress-install-dir": "web/wp"
    },
    "scripts": {
        "post-root-package-install": [
            "php -r \"copy('.env.example', '.env');\""
        ],
        "test": [
            "phpcs"
        ]
    }
}
```

### WordPress Core comme Dépendance

```bash
# WordPress est géré par Composer via roots/wordpress
# qui encapsule johnpbloch/wordpress

# Mettre à jour WordPress
composer update roots/wordpress

# Forcer une version spécifique
composer require roots/wordpress:6.4.2

# Voir la version installée
composer show roots/wordpress
```

## Installation de Plugins via Composer

### Plugins du Répertoire WordPress (wpackagist)

```bash
# Format: wpackagist-plugin/slug-du-plugin

# Installer un plugin
composer require wpackagist-plugin/advanced-custom-fields

# Installer une version spécifique
composer require wpackagist-plugin/woocommerce:8.5.0

# Installer plusieurs plugins
composer require \
    wpackagist-plugin/query-monitor \
    wpackagist-plugin/wp-mail-smtp \
    wpackagist-plugin/redirection

# Plugins populaires
composer require wpackagist-plugin/query-monitor          # Debug
composer require wpackagist-plugin/wordfence              # Sécurité
composer require wpackagist-plugin/yoast-seo              # SEO (slug: wordpress-seo)
composer require wpackagist-plugin/wordpress-seo          # Yoast SEO
composer require wpackagist-plugin/contact-form-7         # Formulaires
composer require wpackagist-plugin/woocommerce            # E-commerce
composer require wpackagist-plugin/regenerate-thumbnails  # Images
composer require wpackagist-plugin/duplicate-post         # Duplication

# Supprimer un plugin
composer remove wpackagist-plugin/plugin-name
```

### Plugins Premium via Repo Privé

```json
{
    "repositories": [
        {
            "type": "composer",
            "url": "https://wpackagist.org",
            "only": ["wpackagist-plugin/*", "wpackagist-theme/*"]
        },
        {
            "type": "package",
            "package": {
                "name": "advanced-custom-fields/advanced-custom-fields-pro",
                "version": "6.2.5",
                "type": "wordpress-plugin",
                "dist": {
                    "type": "zip",
                    "url": "https://connect.advancedcustomfields.com/v2/plugins/download?p=pro&k={%ACF_PRO_KEY}&t=6.2.5"
                },
                "require": {
                    "composer/installers": "^2.0"
                }
            }
        },
        {
            "type": "package",
            "package": {
                "name": "developer-starter/developer-starter-pro",
                "version": "4.0.0",
                "type": "wordpress-plugin",
                "dist": {
                    "type": "zip",
                    "url": "https://downloads.developer-starter.com/latest.zip?license_key={%DS_KEY}"
                }
            }
        }
    ]
}
```

```bash
# Ajouter la clé de licence comme variable d'environnement
export ACF_PRO_KEY="votre-cle-licence"

# Ou dans .env (NE PAS COMMITTER)
ACF_PRO_KEY="votre-cle-licence"

# Installer le plugin premium
composer require advanced-custom-fields/advanced-custom-fields-pro
```

### Plugins depuis GitHub/GitLab

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/company/custom-plugin.git"
        },
        {
            "type": "vcs",
            "url": "git@gitlab.company.com:wp/custom-plugin.git"
        }
    ],
    "require": {
        "company/custom-plugin": "^1.0"
    }
}
```

```bash
# Si le plugin n'a pas de type défini, créer un composer.json dans le plugin:
{
    "name": "company/custom-plugin",
    "type": "wordpress-plugin",
    "require": {
        "composer/installers": "^2.0"
    }
}
```

### Plugins en Dev Local (Path Repository)

```json
{
    "repositories": [
        {
            "type": "path",
            "url": "../my-local-plugin",
            "options": {
                "symlink": true
            }
        }
    ],
    "require": {
        "company/my-local-plugin": "@dev"
    }
}
```

### Thèmes via Composer

```bash
# Thème depuis wpackagist
composer require wpackagist-theme/developer-developer

# Thème custom depuis GitHub
# Ajouter au repositories:
{
    "type": "vcs",
    "url": "https://github.com/company/my-theme.git"
}

composer require company/my-theme
```

## Configuration Multi-Environnement Bedrock

### config/application.php

```php
<?php
/**
 * Configuration principale Bedrock
 */

use Roots\WPConfig\Config;
use function Env\env;

// Répertoire racine du projet
$root_dir = dirname(__DIR__);

// Répertoire web
$webroot_dir = $root_dir . '/web';

/**
 * Charger les variables d'environnement
 */
if (file_exists($root_dir . '/.env')) {
    $dotenv = Dotenv\Dotenv::createUnsafeImmutable($root_dir);
    $dotenv->load();
    $dotenv->required(['WP_HOME', 'WP_SITEURL']);
    if (!env('DATABASE_URL')) {
        $dotenv->required(['DB_NAME', 'DB_USER', 'DB_PASSWORD']);
    }
}

/**
 * Environnement
 */
define('WP_ENV', env('WP_ENV') ?: 'production');

/**
 * URLs
 */
Config::define('WP_HOME', env('WP_HOME'));
Config::define('WP_SITEURL', env('WP_SITEURL'));

/**
 * Répertoires personnalisés
 */
Config::define('CONTENT_DIR', '/app');
Config::define('WP_CONTENT_DIR', $webroot_dir . Config::get('CONTENT_DIR'));
Config::define('WP_CONTENT_URL', Config::get('WP_HOME') . Config::get('CONTENT_DIR'));

/**
 * Base de données
 */
if (env('DATABASE_URL')) {
    $dsn = (object) parse_url(env('DATABASE_URL'));
    Config::define('DB_NAME', substr($dsn->path, 1));
    Config::define('DB_USER', $dsn->user);
    Config::define('DB_PASSWORD', isset($dsn->pass) ? $dsn->pass : null);
    Config::define('DB_HOST', isset($dsn->port) ? "{$dsn->host}:{$dsn->port}" : $dsn->host);
} else {
    Config::define('DB_NAME', env('DB_NAME'));
    Config::define('DB_USER', env('DB_USER'));
    Config::define('DB_PASSWORD', env('DB_PASSWORD'));
    Config::define('DB_HOST', env('DB_HOST') ?: 'localhost');
}

Config::define('DB_CHARSET', env('DB_CHARSET') ?: 'utf8mb4');
Config::define('DB_COLLATE', env('DB_COLLATE') ?: '');
$table_prefix = env('DB_PREFIX') ?: 'wp_';

/**
 * Clés de sécurité
 */
Config::define('AUTH_KEY', env('AUTH_KEY'));
Config::define('SECURE_AUTH_KEY', env('SECURE_AUTH_KEY'));
Config::define('LOGGED_IN_KEY', env('LOGGED_IN_KEY'));
Config::define('NONCE_KEY', env('NONCE_KEY'));
Config::define('AUTH_SALT', env('AUTH_SALT'));
Config::define('SECURE_AUTH_SALT', env('SECURE_AUTH_SALT'));
Config::define('LOGGED_IN_SALT', env('LOGGED_IN_SALT'));
Config::define('NONCE_SALT', env('NONCE_SALT'));

/**
 * Configuration par environnement
 */
$env_config = __DIR__ . '/environments/' . WP_ENV . '.php';

if (file_exists($env_config)) {
    require_once $env_config;
}

Config::apply();

/**
 * Bootstrap WordPress
 */
if (!defined('ABSPATH')) {
    define('ABSPATH', $webroot_dir . '/wp/');
}
```

### config/environments/development.php

```php
<?php
/**
 * Configuration pour l'environnement de développement
 */

use Roots\WPConfig\Config;
use function Env\env;

Config::define('SAVEQUERIES', true);
Config::define('WP_DEBUG', true);
Config::define('WP_DEBUG_DISPLAY', true);
Config::define('WP_DEBUG_LOG', true);
Config::define('WP_DISABLE_FATAL_ERROR_HANDLER', true);
Config::define('SCRIPT_DEBUG', true);
Config::define('DISALLOW_INDEXING', true);

// Désactiver les mises à jour automatiques en dev
Config::define('AUTOMATIC_UPDATER_DISABLED', true);
Config::define('WP_AUTO_UPDATE_CORE', false);

// Query Monitor
Config::define('QM_ENABLE_CAPS_PANEL', true);
```

### config/environments/production.php

```php
<?php
/**
 * Configuration pour la production
 */

use Roots\WPConfig\Config;
use function Env\env;

Config::define('WP_DEBUG', false);
Config::define('WP_DEBUG_DISPLAY', false);
Config::define('SCRIPT_DEBUG', false);

// Mises à jour automatiques - sécurité uniquement
Config::define('WP_AUTO_UPDATE_CORE', 'minor');

// Interdire l'édition de fichiers
Config::define('DISALLOW_FILE_EDIT', true);
Config::define('DISALLOW_FILE_MODS', true);

// Force SSL admin
Config::define('FORCE_SSL_ADMIN', true);

// Cache
ini_set('display_errors', '0');
```

## Script Bootstrap Bedrock

```bash
#!/bin/bash
# scripts/bootstrap-bedrock.sh

PROJECT_NAME=${1:-my-bedrock-project}

echo "=== Création du projet Bedrock: $PROJECT_NAME ==="

# 1. Créer le projet
composer create-project roots/bedrock $PROJECT_NAME
cd $PROJECT_NAME

# 2. Configurer l'environnement
cp .env.example .env

# Générer les salts
if command -v wp &> /dev/null; then
    wp dotenv salts generate
else
    echo "⚠️ WP-CLI non installé - générer les salts manuellement"
    echo "Utilisez: https://roots.io/salts.html"
fi

# 3. Configurer la base de données (à adapter)
read -p "DB_NAME: " db_name
read -p "DB_USER: " db_user
read -sp "DB_PASSWORD: " db_pass
echo ""

sed -i "s/DB_NAME='database_name'/DB_NAME='$db_name'/" .env
sed -i "s/DB_USER='database_user'/DB_USER='$db_user'/" .env
sed -i "s/DB_PASSWORD='database_password'/DB_PASSWORD='$db_pass'/" .env

# 4. Configurer l'URL
read -p "WP_HOME (ex: https://example.test): " wp_home
sed -i "s|WP_HOME='http://example.com'|WP_HOME='$wp_home'|" .env

# 5. Installer les plugins essentiels
composer require \
    wpackagist-plugin/query-monitor \
    wpackagist-plugin/wordfence \
    wpackagist-plugin/wp-mail-smtp

# 6. Initialiser Git
git init
git add .
git commit -m "Initial Bedrock setup"

echo ""
echo "=== Projet Bedrock créé ! ==="
echo "1. Configurer votre serveur web pour pointer vers $PROJECT_NAME/web"
echo "2. Créer la base de données '$db_name'"
echo "3. Accéder à $wp_home/wp/wp-admin pour installer WordPress"
```

## Déploiement Bedrock

### .gitignore Bedrock

```gitignore
# WordPress core
web/wp

# Uploads
web/app/uploads/*
!web/app/uploads/.gitkeep

# Dépendances
vendor/

# Environnement
.env
.env.*
!.env.example

# Node
node_modules/

# Build
web/app/themes/*/dist/
web/app/plugins/*/build/

# IDE
.idea/
.vscode/

# OS
.DS_Store
```

### Déploiement (dans CI/CD)

```bash
# 1. Installer les dépendances
composer install --no-dev --optimize-autoloader

# 2. Build des assets
npm ci && npm run build

# 3. Synchroniser (exclure les fichiers de dev)
rsync -avz --delete \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='.env' \
    --exclude='web/app/uploads' \
    ./ user@server:/var/www/project/

# 4. Sur le serveur, configurer .env avec les variables de prod
```

## Bonnes Pratiques

1. **Versionner le code, pas les dépendances** : .gitignore vendor/ et node_modules/
2. **Branches protégées** : Configurer main et develop comme branches protégées
3. **Commits atomiques** : Un commit = une modification logique
4. **Messages clairs** : Suivre les conventions de commits
5. **README à jour** : Documenter l'installation et les commandes
6. **Bedrock pour les projets pro** : Sépare le code du contenu, gestion moderne
7. **Plugins via Composer** : Tracking des versions, mise à jour automatisée
8. **Ne jamais committer .env** : Contient les secrets et mots de passe
9. **Utiliser composer.lock** : Garantit les mêmes versions en prod
