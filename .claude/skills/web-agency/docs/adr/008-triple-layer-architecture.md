# ADR-008 : Architecture Triple Couche (Skills/Workflows/Roles)

## Statut

Accepté

## Date

2025-01-06

## Contexte

L'architecture précédente mélangeait trois concepts différents dans une seule structure `skills/` :

1. **Compétences techniques** (ex: html-semantique, css-moderne)
2. **Processus métier** (ex: web-dev-process, testing-process)
3. **Rôles/Métiers** (ex: frontend-developer, backend-developer)

### Problèmes Identifiés

#### 1. Confusion des responsabilités

```
skills/frontend-developer/
├── agents/foundations/html-semantique.md    # Compétence
├── agents/testing/unit-testing.md           # Compétence
└── SKILL.md                                  # Définit un RÔLE, pas une compétence
```

Le skill `frontend-developer` définit un métier (QUI) mais contient des compétences (COMMENT).

#### 2. Duplication des compétences

```
skills/frontend-developer/testing/    # Tests frontend
skills/backend-developer/testing/     # Tests backend (dupliqué)
skills/testing-process/              # Méthodologie (encore différent)
```

La même compétence "testing" est définie 3 fois avec des variations.

#### 3. Absence de workflows explicites

Les processus métier étaient implicites dans les skills ou dispersés :

```
web-dev-process/development/          # Contient des étapes de workflow
                                     # mais mélangées avec du contenu technique
```

#### 4. Difficultés de maintenance

- Prompts longs (300-500 lignes) difficiles à maintenir
- Couplage fort entre concepts différents
- Pas de réutilisation claire des compétences

### Objectifs

1. **Transition humains → agents** : L'équipe humaine utilise ces skills aujourd'hui, demain ce sera un système agentique
2. **Guidance claire** : Les workflows doivent guider pas à pas
3. **Prompts courts** : Facilement maintenables par humains et IA
4. **Réutilisabilité** : Une compétence définie une fois, utilisée partout

## Décision

### Architecture Triple Couche

```
.claude/
├── skills/           # COMMENT (compétences atomiques)
├── workflows/        # QUAND/SÉQUENCE (processus métier)
└── roles/           # QUI (composition de skills + workflows)
```

### 1. Skills (COMMENT)

**Définition** : Compétences atomiques, techniques pures, réutilisables.

**Caractéristiques** :
- Prompts courts (50-150 lignes)
- Sans contexte métier ni rôle
- Sous-découpage interne si besoin
- Exemples de code, patterns, anti-patterns

**Structure** :
```
skills/
├── testing/
│   ├── SKILL.md          # Vue d'ensemble
│   ├── unit.md           # Sous-skill
│   ├── integration.md
│   └── e2e.md
├── html/
│   └── SKILL.md
├── css/
│   └── SKILL.md
└── ...
```

**Frontmatter** :
```yaml
---
name: testing
description: Stratégie et techniques de tests
tags: [testing, quality]
sub-skills: [unit, integration, e2e]
---
```

### 2. Workflows (QUAND/SÉQUENCE)

**Définition** : Processus métier step-by-step, orchestrent les skills.

**Caractéristiques** :
- Procédures actionnables avec checkboxes
- Peuvent appeler d'autres workflows (composition)
- Déclenchés par des triggers (mots-clés)
- Référencent les skills utilisés à chaque étape

**Structure** :
```
workflows/
├── development/
│   ├── create-feature.md    # → skills: git, testing
│   ├── fix-bug.md           # → skills: git, testing
│   └── code-review.md       # → calls: (aucun)
├── deployment/
│   ├── release.md           # → calls: rollback
│   └── rollback.md
└── project/
    ├── kickoff.md
    └── sprint-planning.md
```

**Frontmatter** :
```yaml
---
name: create-feature
description: Créer une nouvelle fonctionnalité
triggers: [feature, fonctionnalité, user story]
skills: [git, testing]
calls: [code-review]
roles: [frontend-developer, backend-developer]
---
```

### 3. Roles (QUI)

**Définition** : Composition explicite de skills et workflows pour un rôle.

**Caractéristiques** :
- Pas d'héritage (composition explicite)
- Définit les responsabilités et exclusions
- Définit les escalades
- Niveaux : strategy, operations, implementation

**Structure** :
```
roles/
├── frontend-developer.md
├── backend-developer.md
├── fullstack-developer.md
├── tech-lead.md
└── devops-engineer.md
```

**Frontmatter** :
```yaml
---
name: frontend-developer
description: Développeur spécialisé interfaces utilisateur
level: implementation
---
```

### Interactions Entre Couches

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
│                       "testing"                              │
│                                                              │
│  - Principes, patterns, anti-patterns                       │
│  - Exemples de code                                          │
│  - Checklist de validation                                   │
└─────────────────────────────────────────────────────────────┘
```

### Choix de Conception

#### Composition vs Héritage pour les Roles

**Choix** : Composition explicite

```yaml
# ❌ Héritage (rejeté)
fullstack-developer:
  extends: [frontend-developer, backend-developer]

# ✅ Composition (choisi)
fullstack-developer:
  skills: [html, css, react, api-rest, database]  # Explicite
```

**Raison** : L'héritage crée du couplage fort et des effets de bord. La composition permet un contrôle fin de ce que chaque rôle possède.

#### Granularité des Skills

**Choix** : Skills généraux avec sous-skills

```
testing/
├── SKILL.md          # Vue d'ensemble testing
├── unit.md           # Sous-skill détaillé
├── integration.md
└── e2e.md
```

**Raison** : Permet de référencer `testing` (général) ou `testing/unit` (spécifique) selon le besoin.

#### Workflows Composables

**Choix** : Un workflow peut appeler un autre workflow

```yaml
# create-feature.md
calls: [code-review]  # Appelle le workflow code-review
```

**Raison** : Évite la duplication des étapes communes et permet des processus modulaires.

## Conséquences

### Positives

| Avantage | Description |
|----------|-------------|
| **DRY** | Chaque compétence définie une seule fois |
| **Clarté** | Séparation nette COMMENT/QUAND/QUI |
| **Maintenabilité** | Prompts courts (50-150 lignes vs 300-500) |
| **Réutilisabilité** | Skills composables par plusieurs rôles |
| **Évolutivité** | Ajouter un rôle = composer des skills existants |
| **Agent-ready** | Structure adaptée à l'orchestration automatique |

### Négatives

| Inconvénient | Mitigation |
|--------------|------------|
| Plus de fichiers | Organisation claire par dossiers |
| Indirection | Frontmatter documente les dépendances |
| Migration nécessaire | Migration progressive avec coexistence |

### Métriques Attendues

| Métrique | Avant | Après |
|----------|-------|-------|
| Taille moyenne prompt | 300-500 lignes | 50-150 lignes |
| Duplication testing | 3 définitions | 1 définition |
| Temps onboarding | Élevé | Réduit |
| Couverture workflows | Implicite | Explicite |

## Alternatives Considérées

### Alternative 1 : Skills-First (sans workflows)

```
skills/           → Compétences
professions/      → Compositions de skills
```

**Rejeté car** : Les workflows/processus sont essentiels pour guider l'exécution. Sans eux, le "quand" et "dans quel ordre" reste implicite.

### Alternative 2 : Workflow-First (sans skills atomiques)

```
workflows/        → Processus avec compétences inline
roles/            → Assignation de workflows
```

**Rejeté car** : Crée de la duplication du contenu technique dans chaque workflow.

### Alternative 3 : Garder la structure actuelle

**Rejeté car** : Les problèmes de duplication, confusion et maintenance persistent.

## Migration

### Stratégie

1. **Coexistence** : Nouvelle structure créée à côté de l'ancienne
2. **Migration progressive** : Skills migrés un par un
3. **Validation** : Tests avant suppression de l'ancien
4. **Suppression** : Une fois migration complète

### Mapping

| Ancien | Nouveau | Type |
|--------|---------|------|
| `frontend-developer/` | `roles/frontend-developer.md` | Role |
| `frontend-developer/agents/foundations/*` | `skills/html/`, `skills/css/` | Skills |
| `web-dev-process/` | `workflows/development/` | Workflows |
| `testing-process/` | `skills/testing/` | Skill |

## Références

- [ARCHITECTURE.md](../../../ARCHITECTURE.md)
- [ADR-005 : Frontières de responsabilités](./005-skill-responsibility-boundaries.md)
- [ADR-007 : Pattern d'extraction](./007-skill-extraction-pattern.md)
