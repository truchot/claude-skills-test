# CI/CD Pipelines Reference

## GitHub Actions - Standard Pipeline

```yaml
name: CI/CD
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

permissions:
  contents: read
  pull-requests: write

env:
  NODE_VERSION: "20"

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "${{ env.NODE_VERSION }}", cache: "npm" }
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env: { POSTGRES_USER: test, POSTGRES_PASSWORD: test, POSTGRES_DB: test }
        ports: ["5432:5432"]
        options: --health-cmd pg_isready --health-interval 10s
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "${{ env.NODE_VERSION }}", cache: "npm" }
      - run: npm ci
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v4

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm audit --audit-level=high
      - uses: trufflesecurity/trufflehog@main
        with: { path: "." }

  build-deploy:
    needs: [lint, test, security]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE }}:${{ github.sha }}
```

## GitLab CI Pipeline

```yaml
stages: [lint, test, build, deploy]

variables:
  NODE_VERSION: "20"

.node-setup:
  image: node:${NODE_VERSION}-alpine
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths: [node_modules/]
  before_script: [npm ci]

lint:
  extends: .node-setup
  stage: lint
  script: [npm run lint]

test:
  extends: .node-setup
  stage: test
  services:
    - postgres:15
  variables:
    POSTGRES_DB: test
  script:
    - npm test -- --coverage
  coverage: '/Lines\s*:\s*(\d+\.?\d*)%/'

build:
  stage: build
  image: docker:24
  services: [docker:24-dind]
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

deploy-staging:
  stage: deploy
  script: [kubectl set image deployment/app app=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA]
  environment: { name: staging, url: https://staging.example.com }
  only: [develop]

deploy-production:
  stage: deploy
  script: [kubectl set image deployment/app app=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA]
  environment: { name: production, url: https://example.com }
  only: [main]
  when: manual
```

## Quality Gates

| Gate | Tool | Threshold |
|------|------|-----------|
| Code coverage | Jest/Vitest | >= 80% |
| Lint errors | ESLint/PHPCS | 0 errors |
| Security vulns | npm audit | 0 high/critical |
| Secret scanning | TruffleHog | 0 findings |
| Container scan | Trivy | 0 critical |
| Type checking | TypeScript | 0 errors |

## Deployment Strategies

| Strategy | Risk | Downtime | Rollback |
|----------|------|----------|----------|
| Rolling | Low | None | Automatic |
| Blue-Green | Low | None | Instant (switch) |
| Canary | Very Low | None | Fast (route 0%) |
| Recreate | High | Yes | Redeploy previous |

## Pipeline Security Rules

1. Pin actions by SHA, not by tag
2. Set `permissions` explicitly (least privilege)
3. Never echo secrets in logs
4. Use environment protection rules for production
5. Require PR approval before merge to main
