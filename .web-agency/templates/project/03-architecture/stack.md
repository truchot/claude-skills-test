# Stack Technique

> **Projet** : {{PROJECT_NAME}}
> **Dernière MAJ** : {{DATE}}

---

## Frontend

### Framework

| Technologie | Version | Justification |
|-------------|---------|---------------|
| {{FE_FRAMEWORK}} | {{FE_VERSION}} | {{FE_JUSTIFICATION}} |

### Librairies principales

| Librairie | Usage | Version |
|-----------|-------|---------|
| {{FE_LIB_1}} | {{FE_LIB_1_USAGE}} | {{FE_LIB_1_VERSION}} |
| {{FE_LIB_2}} | {{FE_LIB_2_USAGE}} | {{FE_LIB_2_VERSION}} |

### Styling

| Technologie | Usage |
|-------------|-------|
| {{STYLING}} | {{STYLING_USAGE}} |

### Build & Tooling

| Outil | Usage |
|-------|-------|
| {{BUILD_TOOL}} | Build |
| {{LINTER}} | Linting |
| {{FORMATTER}} | Formatting |

---

## Backend

### Runtime / Framework

| Technologie | Version | Justification |
|-------------|---------|---------------|
| {{BE_FRAMEWORK}} | {{BE_VERSION}} | {{BE_JUSTIFICATION}} |

### Librairies principales

| Librairie | Usage | Version |
|-----------|-------|---------|
| {{BE_LIB_1}} | {{BE_LIB_1_USAGE}} | {{BE_LIB_1_VERSION}} |
| {{BE_LIB_2}} | {{BE_LIB_2_USAGE}} | {{BE_LIB_2_VERSION}} |

### API

| Type | Format | Documentation |
|------|--------|---------------|
| {{API_TYPE}} | {{API_FORMAT}} | {{API_DOCS}} |

---

## Base de données

### Database principale

| Technologie | Version | Hébergement |
|-------------|---------|-------------|
| {{DB_TECH}} | {{DB_VERSION}} | {{DB_HOST}} |

### ORM / Query Builder

| Technologie | Version |
|-------------|---------|
| {{ORM}} | {{ORM_VERSION}} |

### Migrations

| Outil | Usage |
|-------|-------|
| {{MIGRATION_TOOL}} | Schema migrations |

---

## Cache & Queue

| Service | Technologie | Usage |
|---------|-------------|-------|
| Cache | {{CACHE_TECH}} | {{CACHE_USAGE}} |
| Queue | {{QUEUE_TECH}} | {{QUEUE_USAGE}} |
| Search | {{SEARCH_TECH}} | {{SEARCH_USAGE}} |

---

## Infrastructure

### Hébergement

| Service | Provider | Environnement |
|---------|----------|---------------|
| Frontend | {{FE_HOSTING}} | {{FE_ENVS}} |
| Backend | {{BE_HOSTING}} | {{BE_ENVS}} |
| Database | {{DB_HOSTING}} | {{DB_ENVS}} |

### CI/CD

| Service | Usage |
|---------|-------|
| {{CI_TOOL}} | Pipeline CI/CD |
| {{REGISTRY}} | Container registry |

### Monitoring

| Service | Usage |
|---------|-------|
| {{MONITORING}} | APM & Logs |
| {{ERROR_TRACKING}} | Error tracking |
| {{ANALYTICS}} | Analytics |

---

## Services tiers

| Service | Usage | Pricing |
|---------|-------|---------|
| {{SERVICE_1}} | {{SERVICE_1_USAGE}} | {{SERVICE_1_PRICING}} |
| {{SERVICE_2}} | {{SERVICE_2_USAGE}} | {{SERVICE_2_PRICING}} |

---

## Environnements

| Env | URL | Branch | Auto-deploy |
|-----|-----|--------|-------------|
| Development | {{DEV_URL}} | `develop` | ✅ |
| Staging | {{STAGING_URL}} | `staging` | ✅ |
| Production | {{PROD_URL}} | `main` | 🔴 Manual |

---

## Versions Node/Runtime

```json
{
  "node": "{{NODE_VERSION}}",
  "npm": "{{NPM_VERSION}}",
  "pnpm": "{{PNPM_VERSION}}"
}
```

---

## Scripts disponibles

```bash
# Development
{{DEV_COMMAND}}

# Build
{{BUILD_COMMAND}}

# Test
{{TEST_COMMAND}}

# Lint
{{LINT_COMMAND}}

# Deploy
{{DEPLOY_COMMAND}}
```

---

## Décisions techniques

Voir [decisions/](./decisions/) pour les ADR complets.

| Décision | ADR | Date |
|----------|-----|------|
| {{DECISION_1}} | [ADR-001](./decisions/ADR-001.md) | {{DATE_1}} |
