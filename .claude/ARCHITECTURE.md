# Architecture Triple Découpage

Cette architecture sépare clairement trois concepts pour une meilleure maintenabilité et réutilisabilité.

## Vue d'Ensemble

```
.claude/
├── skills/                 # COMMENT (compétences atomiques)
├── workflows/              # QUAND/SÉQUENCE (processus métier)
└── roles/                  # QUI (composition de skills + workflows)
```

## Les 3 Couches

### 1. Skills (COMMENT)

**Compétences atomiques et techniques, réutilisables.**

- Prompts courts (50-150 lignes)
- Techniques pures, sans contexte métier
- Sous-découpage interne si besoin

```
skills/
├── testing/
│   ├── SKILL.md          # Vue d'ensemble
│   ├── unit.md           # Sous-skill
│   ├── integration.md
│   └── e2e.md
├── html/
├── css/
├── react/
└── ...
```

### 2. Workflows (QUAND/SÉQUENCE)

**Processus métier step-by-step, orchestrent les skills.**

- Procédures actionnables
- Peuvent appeler d'autres workflows (composition)
- Déclenchés par des triggers

```
workflows/
├── development/
│   ├── create-feature.md
│   ├── fix-bug.md
│   └── code-review.md
├── deployment/
│   ├── release.md
│   └── rollback.md
└── project/
    ├── kickoff.md
    └── sprint-planning.md
```

### 3. Roles (QUI)

**Assignation de skills et workflows à un rôle.**

- Composition explicite (pas d'héritage)
- Définit les responsabilités
- Définit les escalades

```
roles/
├── frontend-developer.md
├── backend-developer.md
├── fullstack-developer.md
├── tech-lead.md
└── devops-engineer.md
```

## Interactions

```
┌─────────────────────────────────────────────────────────────┐
│                         ROLE                                 │
│              "frontend-developer"                            │
│                                                              │
│  skills: [html, css, react, testing]                        │
│  workflows: [create-feature, fix-bug, code-review]          │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ exécute
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                       WORKFLOW                               │
│                  "create-feature"                            │
│                                                              │
│  1. Analyser le besoin                                       │
│  2. Créer branche        → skill: git                       │
│  3. Implémenter          → skill: react, css                │
│  4. Tester               → skill: testing/unit              │
│  5. Review               → workflow: code-review            │
│  6. Merger               → skill: git                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ utilise
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        SKILL                                 │
│                       "react"                                │
│                                                              │
│  - Hooks (useState, useEffect...)                           │
│  - Components (patterns, composition)                        │
│  - Exemples de code                                          │
└─────────────────────────────────────────────────────────────┘
```

## Conventions de Nommage

| Type | Format | Exemple |
|------|--------|---------|
| Skill | `kebab-case` | `api-rest`, `testing`, `css` |
| Workflow | `kebab-case` | `create-feature`, `code-review` |
| Role | `kebab-case` | `frontend-developer`, `tech-lead` |

## Formats de Fichiers

Voir les templates dans chaque dossier :
- `skills/_TEMPLATE.md`
- `workflows/_TEMPLATE.md`
- `roles/_TEMPLATE.md`

## Inventaire Actuel

### Skills (Compétences) - 20 skills

| Skill | Description | Sous-skills |
|-------|-------------|-------------|
| `html` | Structure HTML5 sémantique, SEO | - |
| `css` | CSS moderne, Grid, Flexbox, variables | - |
| `javascript` | JavaScript ES6+, DOM, async | - |
| `typescript` | Typage TypeScript, génériques | - |
| `react` | Composants, patterns React | hooks, state |
| `nextjs` | App Router, Server Components | - |
| `wordpress` | WordPress, Gutenberg, blocks, thèmes | - |
| `api-rest` | Design API REST, HTTP, versioning | - |
| `database` | SQL, Prisma ORM, optimisation | - |
| `security` | Auth, JWT, OWASP, encryption | - |
| `accessibility` | WCAG, ARIA, tests a11y | - |
| `performance` | Core Web Vitals, optimisation | - |
| `docker` | Conteneurs, Dockerfile, Compose | - |
| `ci-cd` | GitHub Actions, pipelines | - |
| `testing` | Stratégie et techniques de tests | unit, integration, e2e |
| `git` | Versioning et collaboration | - |
| `design-system` | Atomic Design, tokens, composants | - |
| `seo` | Référencement naturel, technique, contenu | - |
| `content-marketing` | Copywriting, blog, landing pages | - |
| `analytics-marketing` | KPIs, tracking, attribution, A/B tests | - |

### Workflows (Processus) - 7 workflows

| Workflow | Description | Appelle |
|----------|-------------|---------|
| `development/create-feature` | Créer une feature | `code-review` |
| `development/fix-bug` | Corriger un bug | `code-review` |
| `development/code-review` | Revue de code | - |
| `deployment/release` | Déployer en production | `rollback` |
| `deployment/rollback` | Annuler un déploiement | - |
| `project/kickoff` | Lancement de projet | - |
| `project/sprint-planning` | Planification de sprint | - |

### Roles (Métiers) - 7 rôles

| Role | Niveau | Skills principaux |
|------|--------|-------------------|
| `frontend-developer` | Implementation | html, css, react, testing |
| `backend-developer` | Implementation | api-rest, database, security |
| `fullstack-developer` | Implementation | front + back |
| `tech-lead` | Strategy | architecture, code-review |
| `devops-engineer` | Operations | docker, ci-cd |
| `technical-director` | Strategy | security, performance, architecture |
| `project-manager` | Process | gestion projet, communication |

## Migration depuis l'Ancienne Structure

L'ancien dossier `skills/` contient l'ancienne structure avec un mélange de :
- Compétences techniques → migrer vers `skills/`
- Processus → migrer vers `workflows/`
- Rôles/métiers → migrer vers `roles/`

### Mapping de Migration

| Ancien | Nouveau | Type |
|--------|---------|------|
| `frontend-developer/` | `roles/frontend-developer.md` | Role |
| `backend-developer/` | `roles/backend-developer.md` | Role |
| `frontend-developer/agents/foundations/html-semantique.md` | `skills/html/SKILL.md` | Skill |
| `frontend-developer/agents/foundations/css-moderne.md` | `skills/css/SKILL.md` | Skill |
| `web-dev-process/` | `workflows/development/` | Workflow |
| `testing-process/` | `skills/testing/` | Skill |
| `devops/` | `roles/devops-engineer.md` + skills | Mixte |

### Statut de Migration

- [x] Structure créée (skills/, workflows/, roles/)
- [x] Templates définis
- [x] Skills pilotes migrés (html, css, testing, git)
- [x] Skills core migrés (javascript, typescript, react, nextjs)
- [x] Skills backend migrés (api-rest, database, security)
- [x] Skills DevOps migrés (docker, ci-cd)
- [x] Skills qualité migrés (accessibility, performance)
- [x] Skills spécialisés migrés (wordpress, design-system)
- [x] Skills marketing migrés (seo, content-marketing, analytics-marketing)
- [x] Workflows développement créés
- [x] Workflows projet créés (kickoff, sprint-planning)
- [x] Roles principaux créés
- [x] Roles stratégiques créés (technical-director, project-manager)
- [x] Archiver ancienne structure (`skills/_archive/`)
- [x] Tests de validation (`scripts/validate-architecture.sh`)
- [x] **Migration 100% complète**
