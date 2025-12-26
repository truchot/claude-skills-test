---
id: pattern-001
category: setup
tags: [wordpress, environment, wp-env, local]
created: 2024-12-24
validated: true
usage_count: 12
---

# Pattern: Configuration wp-env Optimale

## Contexte d'Application

**Quand utiliser ce pattern :**
- Nouveau projet WordPress
- Environnement local de développement
- Besoin de parité avec staging/prod

**Prérequis :**
- Node.js >= 18
- Docker Desktop installé et lancé
- npm ou pnpm

## Solution

### Structure

```
project-root/
├── .wp-env.json              # Configuration wp-env
├── .wp-env.override.json     # Overrides locaux (gitignored)
├── package.json              # Scripts npm
└── wp-content/
    ├── themes/my-theme/
    └── plugins/my-plugin/
```

### Configuration Base (.wp-env.json)

```json
{
  "$schema": "https://schemas.wp.org/trunk/wp-env.json",
  "core": "WordPress/WordPress#6.4",
  "phpVersion": "8.2",
  "plugins": [
    ".",
    "https://downloads.wordpress.org/plugin/query-monitor.latest-stable.zip"
  ],
  "themes": [
    "./wp-content/themes/my-theme"
  ],
  "config": {
    "WP_DEBUG": true,
    "WP_DEBUG_LOG": true,
    "WP_DEBUG_DISPLAY": false,
    "SCRIPT_DEBUG": true,
    "WP_ENVIRONMENT_TYPE": "local"
  },
  "mappings": {
    "wp-content/uploads": "./uploads"
  }
}
```

### Scripts package.json

```json
{
  "scripts": {
    "wp-env": "wp-env",
    "start": "wp-env start",
    "stop": "wp-env stop",
    "destroy": "wp-env destroy",
    "cli": "wp-env run cli",
    "logs": "wp-env logs",
    "shell": "wp-env run cli bash",
    "db:export": "wp-env run cli wp db export - > backup.sql",
    "db:import": "wp-env run cli wp db import /var/www/html/backup.sql"
  }
}
```

### Override Local (.wp-env.override.json - gitignored)

```json
{
  "plugins": [
    ".",
    "/Users/dev/shared-plugins/my-debug-plugin"
  ],
  "config": {
    "MY_DEV_API_KEY": "local-key-123"
  }
}
```

## Bénéfices

- **Parité environnements** : Même PHP/MySQL qu'en prod
- **Isolation** : Chaque projet a son environnement
- **Reproductibilité** : Configuration versionnée
- **Rapidité** : Start/stop en secondes

## Inconvénients / Trade-offs

- **Docker requis** : Consomme des ressources
- **Pas de services additionnels** : Pas de Redis/ElasticSearch out-of-box
- **Courbe d'apprentissage** : Pour développeurs habitués à MAMP/XAMPP

## Projets l'ayant Utilisé

| Projet | Date | Résultat | Notes |
|--------|------|----------|-------|
| Client ABC | 2024-09 | Succès | Onboarding 8min |
| Client XYZ | 2024-10 | Succès | Avec WooCommerce |
| Client DEF | 2024-11 | Succès avec adaptation | Ajout Mailhog |

## Variantes

### Variante A : Avec WooCommerce

```json
{
  "plugins": [
    ".",
    "https://downloads.wordpress.org/plugin/woocommerce.latest-stable.zip"
  ],
  "config": {
    "WC_TAX_ROUNDING_MODE": "auto"
  }
}
```

### Variante B : Avec Multisite

```json
{
  "config": {
    "WP_ALLOW_MULTISITE": true,
    "MULTISITE": true,
    "SUBDOMAIN_INSTALL": false
  }
}
```

## Voir Aussi

- [Anti-pattern: env-hardcoded](../anti-patterns/env-hardcoded.md)
- [Decision: when-wpenv-vs-docker](../decisions/when-wpenv-vs-docker.md)

## Sources

- [Documentation wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)
- [wp-env GitHub](https://github.com/WordPress/gutenberg/tree/trunk/packages/env)
