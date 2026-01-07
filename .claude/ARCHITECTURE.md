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

### Convention de Langue

| Élément | Langue | Exemple |
|---------|--------|---------|
| Noms de fichiers | Anglais (kebab-case) | `create-feature.md`, `code-review.md` |
| Frontmatter (name, tags) | Anglais | `name: wordpress`, `tags: [testing]` |
| Contenu des fichiers | Français | "Responsable", "Checklist", "Prérequis" |
| Descriptions | Français ou bilingue | `description: Créer une feature` |

**Raison**: Les fichiers et métadonnées en anglais permettent l'interopérabilité avec des outils externes, tandis que le contenu en français sert l'équipe locale.

### Format des Noms

| Type | Format | Exemple |
|------|--------|---------|
| Skill | `kebab-case` | `api-rest`, `testing`, `css` |
| Workflow | `kebab-case` | `create-feature`, `code-review` |
| Role | `kebab-case` | `frontend-developer`, `tech-lead` |
| Sub-skill | `kebab-case` | `testing/unit.md`, `seo/technique.md` |

## Formats de Fichiers

Voir les templates dans chaque dossier :
- `skills/_TEMPLATE.md`
- `workflows/_TEMPLATE.md`
- `roles/_TEMPLATE.md`

## Inventaire Actuel

### Skills (Compétences) - 21 skills + sous-skills

| Skill | Description | Sous-skills |
|-------|-------------|-------------|
| `html` | Structure HTML5 sémantique, SEO | - |
| `css` | CSS moderne, Grid, Flexbox, variables | - |
| `javascript` | JavaScript ES6+, DOM, async | - |
| `typescript` | Typage TypeScript, génériques | - |
| `react` | Composants, patterns React | hooks, state |
| `nextjs` | App Router, Server Components | - |
| `wordpress` | WordPress, Gutenberg, blocks, thèmes | **gutenberg, theme** |
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
| `seo` | Référencement naturel, technique, contenu | **technique, contenu, netlinking, local** |
| `content-marketing` | Copywriting, blog, landing pages | - |
| `analytics-marketing` | KPIs, tracking, attribution, A/B tests | - |
| `project-management` | Gestion de projet, communication, templates | **communication** |

### Workflows (Processus) - 13 workflows

| Workflow | Description | Appelle |
|----------|-------------|---------|
| `development/create-feature` | Créer une feature | `code-review` |
| `development/fix-bug` | Corriger un bug | `code-review` |
| `development/code-review` | Revue de code | - |
| `deployment/release` | Déployer en production | `rollback` |
| `deployment/rollback` | Annuler un déploiement | - |
| `project/kickoff` | Lancement de projet | - |
| `project/sprint-planning` | Planification de sprint | - |
| `project/avant-projet` | Brief → Chiffrage → Proposition | - |
| `project/pilotage-projet` | Planning → Suivi → Reporting | - |
| `marketing/content-strategy` | Audit → Personas → Keywords → Calendar | - |
| `wordpress/project-setup` | Init projet WP → Git → Env dev | - |
| `wordpress/deployment` | SSH → Staging → Production | - |
| `wordpress/migration-classic-to-block` | Classic Theme → Block Theme FSE | - |

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

---

## Graphe de Dépendances

```
                              ┌─────────────────────────┐
                              │         ROLES           │
                              │    (QUI - Métiers)      │
                              └───────────┬─────────────┘
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    │                     │                     │
                    ▼                     ▼                     ▼
          ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
          │ frontend-dev    │   │ fullstack-dev   │   │ project-manager │
          │                 │   │                 │   │                 │
          │ skills:         │   │ skills:         │   │ skills:         │
          │  - html         │   │  - html, css    │   │  - project-mgmt │
          │  - css          │   │  - react        │   │  - analytics    │
          │  - react        │   │  - api-rest     │   │                 │
          │                 │   │  - database     │   │ workflows:      │
          │ workflows:      │   │                 │   │  - avant-projet │
          │  - create-feat  │   │ workflows:      │   │  - pilotage     │
          │  - code-review  │   │  - create-feat  │   │  - kickoff      │
          └─────────────────┘   │  - release      │   └─────────────────┘
                                └─────────────────┘


                              ┌─────────────────────────┐
                              │       WORKFLOWS         │
                              │  (QUAND - Processus)    │
                              └───────────┬─────────────┘
                                          │
            ┌─────────────────────────────┼─────────────────────────────┐
            │                             │                             │
            ▼                             ▼                             ▼
  ┌───────────────────┐        ┌───────────────────┐        ┌───────────────────┐
  │   create-feature  │───────▶│    code-review    │        │     release       │
  │                   │  calls │                   │        │                   │
  │ skills: git,      │        │ skills: git       │        │ skills: git,      │
  │   react, testing  │        │                   │        │   ci-cd, docker   │
  └───────────────────┘        └───────────────────┘        │                   │
                                                            │ calls: rollback   │
                                                            └─────────┬─────────┘
                                                                      │
                                                                      ▼
                                                            ┌───────────────────┐
                                                            │     rollback      │
                                                            └───────────────────┘


                              ┌─────────────────────────┐
                              │        SKILLS           │
                              │ (COMMENT - Compétences) │
                              └───────────┬─────────────┘
                                          │
        ┌───────────────┬─────────────────┼─────────────────┬───────────────┐
        │               │                 │                 │               │
        ▼               ▼                 ▼                 ▼               ▼
  ┌───────────┐   ┌───────────┐     ┌───────────┐    ┌───────────┐   ┌───────────┐
  │  testing  │   │    seo    │     │ wordpress │    │  project- │   │   react   │
  │           │   │           │     │           │    │ management│   │           │
  │ sub:      │   │ sub:      │     │ sub:      │    │           │   │ sub:      │
  │  - unit   │   │ - technique│    │ - gutenberg│   │ sub:      │   │  - hooks  │
  │  - integ  │   │ - contenu │     │ - theme   │    │ - communi-│   │  - state  │
  │  - e2e    │   │ - netlinking│   │           │    │   cation  │   │           │
  └───────────┘   │ - local   │     │ related:  │    └───────────┘   └───────────┘
                  └───────────┘     │ workflows/│
                                    │ wordpress/│
                                    └───────────┘
```

## Structure des Sub-Skills

### Quand Utiliser des Sub-Skills (fichiers)

Utiliser des fichiers sub-skills (`skill/sub.md`) quand :

- Le contenu est **fortement lié** au skill parent
- Les sub-skills **partagent un contexte commun** (même technologie)
- La taille reste **< 200 lignes** par fichier
- Les sub-skills sont des **spécialisations** du skill parent

**Exemples**:
```
testing/
├── SKILL.md          # Stratégie générale
├── unit.md           # Tests unitaires (Jest, Vitest)
├── integration.md    # Tests d'intégration
└── e2e.md            # Tests E2E (Playwright)

seo/
├── SKILL.md          # SEO vue d'ensemble
├── technique.md      # Crawl, indexation, CWV
├── contenu.md        # Keywords, on-page
├── netlinking.md     # Backlinks
└── local.md          # SEO local, GMB
```

### Quand Créer un Skill Séparé

Créer un skill séparé (`skills/nouveau/`) quand :

- Le contenu est **indépendant** et réutilisable ailleurs
- La taille dépasse **200-300 lignes**
- Le skill peut être utilisé par **plusieurs rôles différents**
- Le domaine est **distinct** (technologie ou concept différent)

**Exemples de séparation**:
```
# ❌ Mauvais: Sub-skill trop gros ou indépendant
testing/
└── performance.md   # Devrait être skills/performance/

# ✅ Bon: Skill séparé
skills/performance/  # Indépendant, utilisé par plusieurs rôles
skills/testing/      # Focalisé sur les tests fonctionnels
```

## Composition des Workflows

### Règles de Composition

1. **Profondeur max: 3 niveaux**
   ```
   workflow-1 → workflow-2 → workflow-3 (STOP)
   ```

2. **Pas de dépendances circulaires**
   ```
   # ❌ Interdit
   create-feature → code-review → create-feature

   # ✅ OK
   create-feature → code-review (terminé)
   ```

3. **Un workflow appelle un autre via `calls:`**
   ```yaml
   # Dans le frontmatter
   calls: [code-review, rollback]
   ```

4. **Les skills sont utilisés, pas appelés**
   ```yaml
   # Dans le frontmatter
   skills: [git, react, testing]  # Utilisés
   calls: [code-review]            # Workflow appelé
   ```

### Validation des Appels

Le script `validate-architecture.sh` vérifie :
- [ ] Les workflows référencés existent
- [ ] Pas de dépendances circulaires
- [ ] Profondeur ≤ 3 niveaux

## Versioning

### Stratégie de Version

Les skills, workflows et roles suivent un versioning sémantique simplifié :

| Changement | Version | Exemple |
|------------|---------|---------|
| Fix typo, clarification | Patch | `1.0.1` |
| Ajout de contenu | Minor | `1.1.0` |
| Restructuration majeure | Major | `2.0.0` |

### Changelog

Chaque skill/workflow/role peut avoir un champ `version` dans le frontmatter :

```yaml
---
name: testing
version: "1.2.0"
last-updated: "2024-01-15"
---
```

### Suivi des Changements

Pour les changements importants, utiliser le fichier `CHANGELOG.md` à la racine :

```markdown
## [2024-01-15] Skills SEO v1.1.0
- Ajout sub-skill `local.md` pour SEO local

## [2024-01-10] Workflow avant-projet v1.0.0
- Migration depuis skills/project-management
```

## Troubleshooting

### Erreurs Courantes de Validation

| Erreur | Cause | Solution |
|--------|-------|----------|
| `SKILL.md not found` | Dossier skill sans fichier principal | Créer `SKILL.md` ou supprimer le dossier |
| `Invalid frontmatter` | YAML mal formaté | Vérifier les indentations et les quotes |
| `Missing required field` | Champ `name` ou `description` absent | Ajouter les champs requis |
| `Circular dependency` | Workflow A appelle B qui appelle A | Refactorer pour casser la boucle |
| `Unknown workflow in calls` | Workflow référencé inexistant | Vérifier le nom ou créer le workflow |

### Problèmes de Structure

**Symptôme**: Sub-skill non reconnu

```bash
# Vérifier la structure
ls -la .claude/skills/testing/
# Doit contenir: SKILL.md, unit.md, etc.
```

**Symptôme**: Workflow non trouvé

```bash
# Vérifier le frontmatter
head -10 .claude/workflows/development/create-feature.md
# Doit avoir: name, description, triggers, skills
```

### Commandes de Diagnostic

```bash
# Valider toute l'architecture
bash .claude/scripts/validate-architecture.sh

# Compter les fichiers
find .claude/skills -name "SKILL.md" | wc -l
find .claude/workflows -name "*.md" ! -name "_*" | wc -l
find .claude/roles -name "*.md" ! -name "_*" | wc -l

# Vérifier les frontmatters
grep -l "^---" .claude/skills/*/SKILL.md

# Lister les sub-skills
find .claude/skills -name "*.md" ! -name "SKILL.md" ! -name "_*"
```

## Schémas de Validation

Les schémas frontmatter sont définis dans `.claude/schemas/`:

```yaml
# schemas/skill.schema.yaml
required:
  - name
  - description
  - tags
optional:
  - sub-skills
  - related-workflows
  - version

# schemas/workflow.schema.yaml
required:
  - name
  - description
  - triggers
  - skills
optional:
  - roles
  - calls
  - version

# schemas/role.schema.yaml
required:
  - name
  - description
  - level
  - skills
optional:
  - workflows
  - escalation
  - version
```
