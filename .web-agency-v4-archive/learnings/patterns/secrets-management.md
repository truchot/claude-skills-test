---
id: pattern-003
category: security
tags: [security, configuration, dotenv, wordpress]
created: 2024-01-15
validated: true
usage_count: 12
---

# Pattern: Gestion des Secrets

## Contexte d'Application

**Quand utiliser ce pattern :**
- Projet avec clés API (Stripe, SendGrid, AWS...)
- Plusieurs environnements (local, staging, prod)
- Équipe de développeurs
- Déploiement automatisé

**Prérequis :**
- Composer installé
- Fichier `.gitignore` configuré

## Solution

Gestion centralisée des secrets via variables d'environnement avec phpdotenv.

### Structure

```
project/
├── .env                 # Secrets locaux (gitignored)
├── .env.example         # Template sans valeurs (versionné)
├── .env.staging         # Optionnel, gitignored
├── .env.production      # Optionnel, gitignored
├── .gitignore           # Exclut .env*
└── wp-config.php        # Charge les variables
```

### Installation

```bash
composer require vlucas/phpdotenv
```

### Configuration wp-config.php

```php
<?php
// Charger Composer autoload
require_once __DIR__ . '/vendor/autoload.php';

// Charger .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Variables requises (erreur si absentes)
$dotenv->required([
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
    'DB_HOST',
]);

// Variables optionnelles avec défaut
$dotenv->ifPresent('WP_DEBUG')->isBoolean();

// Configuration WordPress
define('DB_NAME', $_ENV['DB_NAME']);
define('DB_USER', $_ENV['DB_USER']);
define('DB_PASSWORD', $_ENV['DB_PASSWORD']);
define('DB_HOST', $_ENV['DB_HOST'] ?? 'localhost');

define('WP_DEBUG', filter_var($_ENV['WP_DEBUG'] ?? false, FILTER_VALIDATE_BOOLEAN));

// Clés API
define('STRIPE_SECRET_KEY', $_ENV['STRIPE_SECRET_KEY'] ?? '');
define('SENDGRID_API_KEY', $_ENV['SENDGRID_API_KEY'] ?? '');

// Salts (depuis .env ou générés)
define('AUTH_KEY', $_ENV['AUTH_KEY']);
define('SECURE_AUTH_KEY', $_ENV['SECURE_AUTH_KEY']);
// ... autres salts
```

### Fichier .env.example

```bash
# Database
DB_NAME=wordpress
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PREFIX=wp_

# WordPress
WP_DEBUG=false
WP_ENVIRONMENT_TYPE=local

# API Keys (get from dashboard)
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
SENDGRID_API_KEY=

# Salts (generate at https://roots.io/salts.html)
AUTH_KEY=
SECURE_AUTH_KEY=
LOGGED_IN_KEY=
NONCE_KEY=
AUTH_SALT=
SECURE_AUTH_SALT=
LOGGED_IN_SALT=
NONCE_SALT=
```

### Fichier .gitignore

```gitignore
# Secrets
.env
.env.*
!.env.example

# Ne jamais commiter
wp-config-local.php
**/credentials.json
**/*secret*
```

### Script d'Initialisation

```bash
#!/bin/bash
# scripts/setup-env.sh

if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ .env créé depuis .env.example"
    echo "⚠️  Remplissez les valeurs dans .env"
else
    echo "ℹ️  .env existe déjà"
fi
```

## Bénéfices

- **Sécurité** : Secrets jamais versionnés
- **Flexibilité** : Un code, plusieurs environnements
- **Onboarding** : `.env.example` documente les variables
- **Validation** : `$dotenv->required()` vérifie la config

## Inconvénients / Trade-offs

- **Dépendance** : Ajoute phpdotenv
- **Déploiement** : Nécessite gestion .env sur serveurs
- **Performance** : Léger overhead au chargement

## Projets l'ayant Utilisé

| Projet | Date | Résultat | Notes |
|--------|------|----------|-------|
| 12 projets | 2024 | Succès | Standard agence |

## Variantes

### Variante A : Sans phpdotenv (getenv natif)

```php
// Pour environnements où .env est chargé par le serveur
define('DB_NAME', getenv('DB_NAME'));
```

### Variante B : Avec Symfony Dotenv

```php
use Symfony\Component\Dotenv\Dotenv;

$dotenv = new Dotenv();
$dotenv->loadEnv(__DIR__ . '/.env');
```

### Variante C : Secrets Manager (Cloud)

```php
// AWS Secrets Manager
use Aws\SecretsManager\SecretsManagerClient;

$client = new SecretsManagerClient(['region' => 'eu-west-1']);
$secret = $client->getSecretValue(['SecretId' => 'prod/wordpress']);
$config = json_decode($secret['SecretString'], true);
```

## Voir Aussi

- [Anti-pattern: env-hardcoded](../anti-patterns/env-hardcoded.md)
- [Anti-pattern: secrets-in-repo](../anti-patterns/secrets-in-repo.md)
- [Decision: when-dotenv-vs-constants](../decisions/when-dotenv-vs-constants.md)

## Sources

- [phpdotenv](https://github.com/vlucas/phpdotenv)
- [12 Factor App - Config](https://12factor.net/config)
- [WordPress Salts Generator](https://roots.io/salts.html)
