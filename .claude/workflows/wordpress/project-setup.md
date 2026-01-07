---
name: wordpress-project-setup
description: Processus d'initialisation d'un projet WordPress (structure, Git, environnement)
triggers: [nouveau projet wordpress, init wordpress, setup wordpress, scaffolding wordpress]
skills: [wordpress, git, docker]
roles: [fullstack-developer, devops-engineer]
---

# Workflow: Setup Projet WordPress

## Objectif
Initialiser un projet WordPress avec une structure professionnelle, Git et environnement de développement.

## Prérequis
- Node.js 18+ et npm
- Docker (pour wp-env)
- Git configuré
- Composer (optionnel)

## Étapes

### 1. Créer la Structure Projet
**Responsable**: Développeur
**Durée**: 15-30 min

- [ ] Créer le dossier projet
- [ ] Choisir le type (theme, plugin, site complet)
- [ ] Créer la structure de dossiers

**Output**: Structure de dossiers créée

#### Structures par Type

**Theme Block**:
```
mon-theme/
├── assets/
├── build/
├── inc/
├── parts/
├── patterns/
├── src/
├── styles/
├── templates/
├── functions.php
├── style.css
└── theme.json
```

**Plugin**:
```
mon-plugin/
├── admin/
├── build/
├── includes/
├── languages/
├── public/
├── src/blocks/
├── tests/
├── mon-plugin.php
└── uninstall.php
```

**Site Complet**:
```
projet-wordpress/
├── scripts/
├── wp-content/
│   ├── themes/
│   ├── plugins/
│   └── mu-plugins/
├── .wp-env.json
├── composer.json
├── docker-compose.yml
└── package.json
```

---

### 2. Initialiser Git
**Responsable**: Développeur
**Durée**: 10 min

- [ ] `git init`
- [ ] Créer .gitignore WordPress
- [ ] Premier commit

**Output**: Repository Git initialisé

#### .gitignore WordPress

```gitignore
# WordPress core (si non versionné)
/wp-admin/
/wp-includes/
/wp-*.php
!/wp-config-sample.php

# Configuration locale
wp-config.php
.htaccess

# Uploads et cache
/wp-content/uploads/
/wp-content/cache/
/wp-content/upgrade/

# Dépendances
/vendor/
/node_modules/

# Build
/build/
**/build/

# Environnement
.env
.env.*
!.env.example
*.log

# IDE
.idea/
.vscode/

# OS
.DS_Store
Thumbs.db

# wp-env
/wp-env-home/
```

---

### 3. Configurer les Dépendances
**Responsable**: Développeur
**Durée**: 15 min

- [ ] Créer package.json
- [ ] Créer composer.json (si PHP)
- [ ] Installer les dépendances

**Output**: Dépendances configurées

#### package.json

```json
{
    "name": "mon-projet-wordpress",
    "version": "1.0.0",
    "private": true,
    "scripts": {
        "build": "wp-scripts build",
        "start": "wp-scripts start",
        "lint:js": "wp-scripts lint-js",
        "lint:css": "wp-scripts lint-style",
        "lint:php": "composer phpcs",
        "test": "wp-scripts test-unit-js",
        "env:start": "wp-env start",
        "env:stop": "wp-env stop"
    },
    "devDependencies": {
        "@wordpress/env": "^9.0.0",
        "@wordpress/scripts": "^27.0.0"
    }
}
```

#### composer.json

```json
{
    "name": "company/mon-projet",
    "require": { "php": ">=8.1" },
    "require-dev": {
        "wp-coding-standards/wpcs": "^3.0",
        "phpunit/phpunit": "^9.0"
    },
    "scripts": {
        "phpcs": "phpcs --standard=WordPress .",
        "test": "phpunit"
    }
}
```

---

### 4. Configurer l'Environnement de Dev
**Responsable**: Développeur
**Durée**: 10 min

- [ ] Créer .wp-env.json
- [ ] Configurer wp-cli.yml (optionnel)
- [ ] Tester `npm run env:start`

**Output**: Environnement de développement fonctionnel

#### .wp-env.json

```json
{
    "core": null,
    "phpVersion": "8.2",
    "plugins": ["./wp-content/plugins/"],
    "themes": ["./wp-content/themes/"],
    "config": {
        "WP_DEBUG": true,
        "WP_DEBUG_LOG": true,
        "SCRIPT_DEBUG": true
    }
}
```

#### wp-cli.yml

```yaml
path: wp

@staging:
  ssh: user@staging.example.com
  path: /var/www/staging

@production:
  ssh: user@prod.example.com
  path: /var/www/production
```

---

### 5. Créer la Documentation
**Responsable**: Développeur
**Durée**: 10 min

- [ ] Créer README.md
- [ ] Documenter les commandes
- [ ] Documenter la structure

**Output**: Documentation projet

#### README.md Template

```markdown
# [Nom Projet]

## Installation

\`\`\`bash
npm install
composer install
npm run env:start
\`\`\`

## URLs

- Site: http://localhost:8888
- Admin: http://localhost:8888/wp-admin (admin/password)

## Commandes

| Commande | Description |
|----------|-------------|
| `npm run start` | Watch mode (dev) |
| `npm run build` | Build production |
| `npm run lint` | Linting complet |
| `npm run env:start` | Démarrer WordPress |
| `npm run env:stop` | Arrêter WordPress |

## Structure

[Description de la structure...]
```

---

### 6. Commit et Push Initial
**Responsable**: Développeur
**Durée**: 5 min

- [ ] Vérifier les fichiers non commités
- [ ] Commit initial
- [ ] Créer le remote (GitHub/GitLab)
- [ ] Push

**Output**: Code versionné et pushé

```bash
git add .
git commit -m "feat: initial WordPress project setup"
git remote add origin git@github.com:company/project.git
git push -u origin main
```

---

## Checklist Finale

- [ ] Structure projet créée
- [ ] .gitignore configuré
- [ ] package.json avec scripts
- [ ] composer.json (si besoin)
- [ ] .wp-env.json configuré
- [ ] README.md documenté
- [ ] Premier commit pushé
- [ ] `npm run env:start` fonctionne

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Docker non disponible | Utiliser Local by Flywheel ou MAMP |
| Erreur wp-env | Vérifier Docker daemon, ports |
| Conflits dependencies | Nettoyer node_modules, réinstaller |
