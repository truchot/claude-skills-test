# CI/CD Workflows

Ce dossier contient des templates de workflows CI/CD prêts à l'emploi.

## Plateformes Supportées

- **GitHub Actions** (`github/`)
- **GitLab CI** (`gitlab/`)

## Installation

### GitHub Actions

```bash
# Copier les workflows dans votre projet
mkdir -p .github/workflows
cp -r .claude/skills/web-dev-process/workflows/github/*.yml .github/workflows/
```

### GitLab CI

```bash
# Copier le fichier principal
cp .claude/skills/web-dev-process/workflows/gitlab/.gitlab-ci.yml .
```

## Workflows Disponibles

### GitHub Actions

| Workflow | Déclencheur | Description |
|----------|-------------|-------------|
| `ci.yml` | Push, PR | Lint, tests, build |
| `release.yml` | Tag v* | Release automatique |
| `security.yml` | Quotidien, PR | Audit de sécurité |
| `deploy-preview.yml` | PR | Déploiement preview |
| `deploy-production.yml` | Push main | Déploiement production |

### GitLab CI

Pipeline unique avec stages :
1. **validate** - Lint, typecheck
2. **test** - Tests unitaires et intégration
3. **build** - Build de l'application
4. **security** - Audit de sécurité
5. **deploy** - Déploiement (staging/production)

## Personnalisation

Chaque workflow contient des variables à adapter :

```yaml
env:
  NODE_VERSION: '20'        # Version Node.js
  PNPM_VERSION: '8'         # Version pnpm
  # Ajoutez vos variables...
```

## Secrets Requis

Configurez ces secrets dans votre repository :

| Secret | Usage |
|--------|-------|
| `NPM_TOKEN` | Publication npm (si applicable) |
| `DEPLOY_TOKEN` | Déploiement (Vercel, Netlify, etc.) |
| `CODECOV_TOKEN` | Couverture de code |

## Scripts package.json Requis

Les workflows CI attendent ces scripts dans votre `package.json` :

```json
{
  "scripts": {
    "lint": "eslint .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "build": "vite build"
  }
}
```

| Script | Workflow | Description |
|--------|----------|-------------|
| `lint` | ci.yml | Vérification ESLint |
| `format:check` | ci.yml | Vérification Prettier |
| `typecheck` | ci.yml | Vérification TypeScript |
| `test` | ci.yml | Tests unitaires |
| `build` | ci.yml, deploy-*.yml | Build production |

> **Note** : Les workflows utilisent `pnpm` comme package manager. Assurez-vous d'avoir un `pnpm-lock.yaml` dans votre projet.
