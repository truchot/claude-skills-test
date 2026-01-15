---
id: ci-pipeline
name: Pipeline CI/CD
version: 1.0.0
category: code
status: active
phase: "5-deploiement"
order: 1
agents:
  - devops/cicd/pipelines
  - devops/cicd/github-actions
  - devops/cicd/quality-gates
consumes:
  - environment-setup
  - test-suite
  - stack-recommendation
produces_for:
  - devops/deployment/strategies
  - devops/monitoring/alerting
tags: [ci, cd, pipeline, github-actions, automation, devops]
---

# Pipeline CI/CD

## Description

Configuration complète du pipeline d'intégration et de déploiement continu. Automatise les builds, tests, quality gates et déploiements sur les différents environnements.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | YAML (GitHub Actions) |
| **Emplacement** | `.github/workflows/` |
| **Nommage** | `ci.yml`, `cd.yml`, `preview.yml` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Fichiers Obligatoires

- [ ] **ci.yml** - Build, lint, tests sur chaque PR
- [ ] **cd.yml** - Déploiement staging/production
- [ ] **Quality gates** - Seuils de qualité

### Fichiers Optionnels

- [ ] **preview.yml** - Environnements de preview par PR
- [ ] **release.yml** - Gestion des releases
- [ ] **scheduled.yml** - Jobs planifiés (sécurité, cleanup)

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | CI rapide | < 10 min | Auto | Oui |
| 2 | Tests passent | 100% | Auto | Oui |
| 3 | Coverage | ≥ 80% | Auto | Oui |
| 4 | Lint clean | 0 erreurs | Auto | Oui |
| 5 | Build réussi | Exit 0 | Auto | Oui |
| 6 | Secrets sécurisés | Pas de hardcode | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `web-dev-process/*` | `environment-setup` | Configuration docker |
| `testing-process/*` | `test-suite` | Tests à exécuter |
| `direction-technique/*` | `stack-recommendation` | Stack technique |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Setup initial | DevOps | Debug config |
| 2 | Premier déploiement | Lead Dev + DevOps | Rollback |
| 3 | Production | Tech Lead | Approval required |

## Exemple

### Exemple Complet - GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

env:
  NODE_VERSION: '20'
  PNPM_VERSION: '8'

jobs:
  # ============================================
  # INSTALL & CACHE
  # ============================================
  install:
    name: 📦 Install
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Cache node_modules
        uses: actions/cache@v3
        with:
          path: node_modules
          key: ${{ runner.os }}-pnpm-${{ hashFiles('pnpm-lock.yaml') }}

  # ============================================
  # LINT & FORMAT
  # ============================================
  lint:
    name: 🔍 Lint
    needs: install
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'

      - name: Restore cache
        uses: actions/cache@v3
        with:
          path: node_modules
          key: ${{ runner.os }}-pnpm-${{ hashFiles('pnpm-lock.yaml') }}

      - name: ESLint
        run: pnpm lint

      - name: Prettier
        run: pnpm format:check

      - name: TypeScript
        run: pnpm type-check

  # ============================================
  # UNIT & INTEGRATION TESTS
  # ============================================
  test:
    name: 🧪 Test
    needs: install
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

      redis:
        image: redis:7
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'

      - name: Restore cache
        uses: actions/cache@v3
        with:
          path: node_modules
          key: ${{ runner.os }}-pnpm-${{ hashFiles('pnpm-lock.yaml') }}

      - name: Run migrations
        run: pnpm db:migrate
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/test

      - name: Run tests
        run: pnpm test:ci
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/test
          REDIS_URL: redis://localhost:6379

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: true

  # ============================================
  # E2E TESTS
  # ============================================
  e2e:
    name: 🎭 E2E Tests
    needs: install
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'

      - name: Restore cache
        uses: actions/cache@v3
        with:
          path: node_modules
          key: ${{ runner.os }}-pnpm-${{ hashFiles('pnpm-lock.yaml') }}

      - name: Install Playwright
        run: pnpm exec playwright install --with-deps chromium

      - name: Build
        run: pnpm build

      - name: Run E2E tests
        run: pnpm test:e2e
        env:
          CI: true

      - name: Upload Playwright report
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7

  # ============================================
  # BUILD
  # ============================================
  build:
    name: 🏗️ Build
    needs: [lint, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'

      - name: Restore cache
        uses: actions/cache@v3
        with:
          path: node_modules
          key: ${{ runner.os }}-pnpm-${{ hashFiles('pnpm-lock.yaml') }}

      - name: Build
        run: pnpm build

      - name: Upload build artifact
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: .next/
          retention-days: 1

  # ============================================
  # SECURITY SCAN
  # ============================================
  security:
    name: 🔒 Security
    needs: install
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Snyk
        uses: snyk/actions/node@master
        continue-on-error: true
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high

      - name: Run Trivy
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          severity: 'CRITICAL,HIGH'
```

```yaml
# .github/workflows/cd.yml
name: CD

on:
  push:
    branches: [main]
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

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # ============================================
  # BUILD & PUSH DOCKER IMAGE
  # ============================================
  build-image:
    name: 🐳 Build Image
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    outputs:
      image-tag: ${{ steps.meta.outputs.tags }}
    steps:
      - uses: actions/checkout@v4

      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix=
            type=ref,event=branch
            type=raw,value=latest,enable=${{ github.ref == 'refs/heads/main' }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  # ============================================
  # DEPLOY STAGING
  # ============================================
  deploy-staging:
    name: 🚀 Deploy Staging
    needs: build-image
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging.example.com
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--env=preview'
          alias-domains: staging.example.com

      - name: Run smoke tests
        run: |
          curl -f https://staging.example.com/api/health || exit 1

      - name: Notify Slack
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "✅ Deployed to staging: ${{ github.sha }}"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}

  # ============================================
  # DEPLOY PRODUCTION
  # ============================================
  deploy-production:
    name: 🚀 Deploy Production
    needs: [build-image, deploy-staging]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://www.example.com
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          alias-domains: www.example.com

      - name: Run smoke tests
        run: |
          sleep 30  # Wait for deployment
          curl -f https://www.example.com/api/health || exit 1

      - name: Create Sentry release
        uses: getsentry/action-release@v1
        env:
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
          SENTRY_ORG: ${{ secrets.SENTRY_ORG }}
          SENTRY_PROJECT: ${{ secrets.SENTRY_PROJECT }}
        with:
          environment: production
          version: ${{ github.sha }}

      - name: Notify Slack
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "🎉 Deployed to production: ${{ github.sha }}"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

```yaml
# .github/workflows/preview.yml
name: Preview

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  deploy-preview:
    name: 🔍 Deploy Preview
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        id: deploy
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

      - name: Comment PR
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## 🔍 Preview Deployment

              | Name | Link |
              |------|------|
              | **Preview URL** | ${{ steps.deploy.outputs.preview-url }} |
              | **Commit** | \`${{ github.sha }}\` |

              _Deployed with Vercel_`
            })
```

### Quality Gates Configuration

```yaml
# .github/quality-gates.yml
coverage:
  minimum: 80
  branches: 75

performance:
  lighthouse:
    performance: 90
    accessibility: 100
    best-practices: 90
    seo: 90

bundle:
  max-size: 250kb
  max-chunks: 20

security:
  vulnerabilities:
    critical: 0
    high: 0
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| CI lent (>15min) | Feedback tardif | Paralléliser, cacher |
| Secrets en clair | Faille sécurité | GitHub Secrets |
| Pas de cache | CI lent | Cache dependencies |
| Skip tests | Régressions | Toujours tester |
| Deploy sans approval | Risque prod | Environment protection |

## Références

- [GitHub Actions](https://docs.github.com/en/actions)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Docker Build Push Action](https://github.com/docker/build-push-action)
- Livrables liés : `environment-setup`, `test-suite`, `deployment-runbook`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | devops | Création initiale |
