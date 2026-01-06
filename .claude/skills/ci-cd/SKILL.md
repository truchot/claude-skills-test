---
name: ci-cd
description: CI/CD - GitHub Actions, pipelines, automatisation
tags: [ci-cd, github-actions, pipeline, automation]
sub-skills: [github-actions, testing, deployment]
---

# CI/CD

## Quand Utiliser

- Automatiser tests et build
- Déployer automatiquement
- Vérifier la qualité du code
- Gérer les releases

## GitHub Actions

### Workflow de Base

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Test
        run: npm test -- --coverage

      - name: Build
        run: npm run build
```

### Matrix Testing

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
```

### Caching

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### Secrets

```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  API_KEY: ${{ secrets.API_KEY }}
```

### Conditionals

```yaml
- name: Deploy to production
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  run: npm run deploy
```

## Pipeline Complet

```yaml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check

  test:
    runs-on: ubuntu-latest
    needs: lint
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test -- --coverage
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
      - uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist

  deploy-staging:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/develop'
    environment: staging
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: build
      - name: Deploy to staging
        run: |
          # Deploy script

  deploy-production:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: build
      - name: Deploy to production
        run: |
          # Deploy script
```

## Docker Build & Push

```yaml
jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            user/app:latest
            user/app:${{ github.sha }}
```

## Release Automation

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          generate_release_notes: true
```

## Reusable Workflows

```yaml
# .github/workflows/reusable-test.yml
name: Reusable Test

on:
  workflow_call:
    inputs:
      node-version:
        required: true
        type: string

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
      - run: npm ci && npm test

# Usage
jobs:
  call-test:
    uses: ./.github/workflows/reusable-test.yml
    with:
      node-version: '20'
```

## Branch Protection

```yaml
# Require via GitHub Settings:
# - Status checks to pass
# - Up-to-date with base branch
# - Code review approvals
# - Signed commits
```

## Anti-patterns

- ❌ Secrets dans le code
- ❌ Pas de cache
- ❌ Jobs séquentiels inutiles
- ❌ Pas de timeout
- ❌ Ignorer les échecs

## Checklist

- [ ] Tests automatisés
- [ ] Lint et type-check
- [ ] Build vérifié
- [ ] Secrets sécurisés
- [ ] Environments séparés
- [ ] Artifacts sauvegardés
