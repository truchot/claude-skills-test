---
id: pattern-004
category: deployment
tags: [ci-cd, github-actions, wordpress, automation]
created: 2024-02-01
validated: true
usage_count: 10
---

# Pattern: Pipeline GitHub Actions WordPress

## Contexte d'Application

**Quand utiliser ce pattern :**
- Projet WordPress sur GitHub
- Déploiement automatisé souhaité
- Tests et linting requis
- Environnements staging et production

**Prérequis :**
- Repository GitHub
- Accès SSH aux serveurs
- Secrets GitHub configurés

## Solution

Pipeline CI/CD complète pour WordPress avec tests, build et déploiement automatique.

### Structure

```
.github/
└── workflows/
    ├── ci.yml           # Tests et linting
    ├── deploy.yml       # Déploiement staging/prod
    └── security.yml     # Audits sécurité
```

### CI Workflow (.github/workflows/ci.yml)

```yaml
name: CI

on:
  push:
    branches: [main, staging, develop]
  pull_request:
    branches: [main, staging]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'
          tools: composer, phpcs

      - name: Install dependencies
        run: composer install --prefer-dist

      - name: PHP CodeSniffer
        run: composer run phpcs

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install npm dependencies
        run: npm ci

      - name: ESLint
        run: npm run lint

  test:
    runs-on: ubuntu-latest
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_DATABASE: wordpress_test
        ports:
          - 3306:3306
        options: --health-cmd="mysqladmin ping" --health-interval=10s --health-timeout=5s --health-retries=3

    steps:
      - uses: actions/checkout@v4

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'
          extensions: mysqli, pdo_mysql

      - name: Install dependencies
        run: composer install

      - name: PHPUnit
        run: composer run test
        env:
          DB_HOST: 127.0.0.1
          DB_NAME: wordpress_test
          DB_USER: root
          DB_PASSWORD: root

  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install and build
        run: |
          npm ci
          npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build
          path: |
            wp-content/themes/theme-name/build/
            wp-content/themes/theme-name/style.css
```

### Deploy Workflow (.github/workflows/deploy.yml)

```yaml
name: Deploy

on:
  push:
    branches: [staging, main]
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production

concurrency:
  group: deploy-${{ github.ref }}
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
      url: ${{ github.ref == 'refs/heads/main' && 'https://client.com' || 'https://staging.client.com' }}

    steps:
      - uses: actions/checkout@v4

      - name: Download build
        uses: actions/download-artifact@v4
        with:
          name: build

      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.8.0
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      - name: Add known hosts
        run: |
          mkdir -p ~/.ssh
          ssh-keyscan -H ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts

      - name: Create backup
        run: |
          ssh ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} "
            cd ${{ secrets.DEPLOY_PATH }} &&
            wp db export /backups/pre-deploy-$(date +%s).sql
          "

      - name: Deploy
        run: |
          rsync -avz --delete \
            --exclude='.git' \
            --exclude='.github' \
            --exclude='node_modules' \
            --exclude='.env' \
            --exclude='wp-config.php' \
            --exclude='wp-content/uploads' \
            ./ ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:${{ secrets.DEPLOY_PATH }}/

      - name: Post-deploy
        run: |
          ssh ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} "
            cd ${{ secrets.DEPLOY_PATH }} &&
            wp cache flush &&
            wp rewrite flush
          "

      - name: Health check
        run: |
          curl -f ${{ github.ref == 'refs/heads/main' && 'https://client.com' || 'https://staging.client.com' }}
```

### Secrets GitHub Requis

| Secret | Description |
|--------|-------------|
| `SSH_PRIVATE_KEY` | Clé SSH pour déploiement |
| `SSH_HOST` | Hostname du serveur |
| `SSH_USER` | Utilisateur SSH |
| `DEPLOY_PATH` | Chemin sur le serveur |

## Bénéfices

- **Automatisation** : Déploiement sans intervention
- **Qualité** : Tests obligatoires avant merge
- **Traçabilité** : Historique des déploiements
- **Rollback** : Backup automatique avant deploy

## Inconvénients / Trade-offs

- **Setup initial** : Configuration SSH et secrets
- **Coût** : Minutes GitHub Actions (gratuit limité)
- **Debugging** : Plus complexe que déploiement manuel

## Projets l'ayant Utilisé

| Projet | Date | Résultat | Notes |
|--------|------|----------|-------|
| 10 projets | 2024 | Succès | Standard agence |

## Variantes

### Variante A : GitLab CI

Voir `.gitlab-ci.yml` équivalent dans le skill.

### Variante B : Avec WP Engine

```yaml
- name: Deploy to WP Engine
  uses: wpengine/github-action-wpe-site-deploy@v3
  with:
    WPE_SSHG_KEY_PRIVATE: ${{ secrets.WPE_SSH_KEY }}
    WPE_ENV: production
```

## Voir Aussi

- [Anti-pattern: skip-tests-ci](../anti-patterns/skip-tests-ci.md)
- [Pattern: staging-protection](./staging-protection.md)

## Sources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [shivammathur/setup-php](https://github.com/shivammathur/setup-php)
