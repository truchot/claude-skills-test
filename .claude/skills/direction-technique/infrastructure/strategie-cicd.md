---
name: strategie-cicd
description: Pipelines CI/CD et automatisation
---

# Stratégie CI/CD

Tu conçois et implémentes les **pipelines CI/CD** pour automatiser les builds, tests et déploiements.

## Principes

### Continuous Integration (CI)

```
Developer Push → Build → Test → Artifacts
       │                           │
       │                           ▼
       └─── Feedback rapide ◄─── Résultats
```

### Continuous Delivery (CD)

```
Artifacts → Deploy Staging → Tests → Manual Approval → Deploy Prod
                                            │
                                     Continuous Deployment
                                     (automatique si tests OK)
```

## GitHub Actions

### Workflow Standard

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
      - uses: codecov/codecov-action@v3

  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist/

  deploy-staging:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/develop'
    environment: staging
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: build
          path: dist/
      - run: ./scripts/deploy.sh staging
        env:
          DEPLOY_KEY: ${{ secrets.STAGING_DEPLOY_KEY }}

  deploy-production:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: build
          path: dist/
      - run: ./scripts/deploy.sh production
        env:
          DEPLOY_KEY: ${{ secrets.PROD_DEPLOY_KEY }}
```

### Docker Build & Push

```yaml
  docker:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4

      - uses: docker/setup-buildx-action@v3

      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ghcr.io/${{ github.repository }}:${{ github.sha }}
            ghcr.io/${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

## GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - lint
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "20"

.node-cache:
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/

lint:
  stage: lint
  image: node:${NODE_VERSION}
  extends: .node-cache
  script:
    - npm ci
    - npm run lint

test:
  stage: test
  image: node:${NODE_VERSION}
  extends: .node-cache
  services:
    - postgres:15
  variables:
    POSTGRES_PASSWORD: postgres
    DATABASE_URL: postgresql://postgres:postgres@postgres:5432/test
  script:
    - npm ci
    - npm test
  coverage: '/Coverage: \d+\.\d+%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

build:
  stage: build
  image: node:${NODE_VERSION}
  extends: .node-cache
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

deploy-staging:
  stage: deploy
  environment:
    name: staging
    url: https://staging.example.com
  script:
    - ./scripts/deploy.sh staging
  only:
    - develop

deploy-production:
  stage: deploy
  environment:
    name: production
    url: https://www.example.com
  script:
    - ./scripts/deploy.sh production
  when: manual
  only:
    - main
```

## Bonnes Pratiques

### Pipeline Rapide

| Optimisation | Impact |
|--------------|--------|
| Paralléliser jobs | -40% temps |
| Cacher dépendances | -30% temps |
| Fail fast | Feedback rapide |
| Artifacts entre jobs | Évite rebuild |

### Sécurité

- [ ] Secrets dans le vault du CI (jamais en clair)
- [ ] Scan de vulnérabilités dans le pipeline
- [ ] Signed commits (optionnel)
- [ ] Environnements protégés avec approbation

### Qualité

- [ ] Tests obligatoires pour merge
- [ ] Coverage minimum enforced
- [ ] Linting automatique
- [ ] Build reproductible

## Quality Gates

```yaml
# Exemple de quality gate
quality-gate:
  stage: test
  script:
    - npm run test:coverage
    - |
      COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
      if (( $(echo "$COVERAGE < 80" | bc -l) )); then
        echo "Coverage $COVERAGE% is below threshold 80%"
        exit 1
      fi
    - npm run lint
    - npm audit --audit-level=high
  allow_failure: false
```

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Pipeline > 15 min | Optimisation nécessaire |
| Tests flaky | Fix ou quarantine |
| Secrets exposés | Rotation immédiate |
| Échecs fréquents | Investigation root cause |
