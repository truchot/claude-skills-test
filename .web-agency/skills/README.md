# Claude Skills Architecture

![Tests](https://img.shields.io/badge/tests-local-blue) ![Skills](https://img.shields.io/badge/skills-26-green) ![Agents](https://img.shields.io/badge/agents-893-brightgreen)

Cette documentation décrit l'architecture des skills Claude pour une agence Web.

## Vue d'Ensemble

```
                    ┌──────────────────────────────────────────┐
                    │           web-agency                      │
                    │    (Méta-orchestrateur Principal)        │
                    └─────────────────┬────────────────────────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        │                             │                             │
        ▼                             ▼                             ▼
┌───────────────┐           ┌─────────────────┐           ┌─────────────────┐
│project-       │           │direction-       │           │   lead-dev      │
│management     │           │technique        │           │                 │
│(Gestion)      │           │(Stratégie)      │           │(Coordination)   │
└───────────────┘           └────────┬────────┘           └─────────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
           ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
           │web-dev-      │  │testing-      │  │   devops     │
           │process       │  │process       │  │              │
           │(Phases)      │  │(Méthodologie)│  │(CI/CD, Infra)│
           └──────┬───────┘  └──────┬───────┘  └──────────────┘
                  │                 │
    ┌─────────────┼─────────────────┼─────────────┐
    │             │                 │             │
    ▼             ▼                 ▼             ▼
┌────────┐  ┌────────────┐  ┌────────────┐  ┌────────────────────┐
│frontend│  │backend-    │  │react-      │  │wordpress-          │
│developer│ │developer   │  │expert      │  │gutenberg-expert    │
└────────┘  └────────────┘  └────────────┘  └────────────────────┘
    │             │              │
    │             │              ▼
    │             │        ┌────────────┐
    │             │        │nextjs-     │
    │             │        │expert      │
    │             │        └────────────┘
    │             │
    └─────────────┼─────────────┐
                  ▼             ▼
           ┌────────────────────────┐
           │design-system-          │
           │foundations             │
           └────────────────────────┘
```

## Hiérarchie à 3 Niveaux (ADR-005)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  NIVEAU 1 : POURQUOI (5 directions stratégiques)                        │
│                                                                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │ direction-  │ │ direction-  │ │ direction-  │ │ direction-  │       │
│  │ technique   │ │ operations  │ │ commerciale │ │ marketing   │       │
│  │ Tech/Archi  │ │Projet/Équipe│ │Finance/Sales│ │ Acquisition │       │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘       │
│                        ┌─────────────┐                                  │
│                        │ direction-  │                                  │
│                        │ artistique  │                                  │
│                        │Créatif/Brand│                                  │
│                        └─────────────┘                                  │
│  → Décisions stratégiques, pas de code                                  │
├─────────────────────────────────────────────────────────────────────────┤
│  NIVEAU 2 : QUOI (7 skills de processus)                                │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐           │
│  │ web-agency │ │  project-  │ │  lead-dev  │ │ web-dev-   │           │
│  │  Routage   │ │ management │ │Coordination│ │  process   │           │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘           │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐                          │
│  │  testing-  │ │  client-   │ │   task-    │                          │
│  │  process   │ │   intake   │ │orchestrator│                          │
│  └────────────┘ └────────────┘ └────────────┘                          │
│  → Processus et coordination, pas de code                               │
├─────────────────────────────────────────────────────────────────────────┤
│  NIVEAU 3 : COMMENT (14 skills d'implémentation)                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐  │
│  │ frontend │ │ backend  │ │  devops  │ │  react   │ │   nextjs     │  │
│  │ developer│ │ developer│ │          │ │  expert  │ │   expert     │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐  │
│  │wordpress │ │ design-  │ │  ux-ui   │ │ marketing│ │    legal     │  │
│  │gutenberg │ │  system  │ │  design  │ │          │ │  compliance  │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                   │
│  │ support  │ │commercial│ │ finance  │ │ content  │ ┌──────────┐     │
│  │  client  │ │   crm    │ │ analytics│ │management│ │   ddd    │     │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘     │
│  → Code réel et livrables concrets                                      │
└─────────────────────────────────────────────────────────────────────────┘
```

## Skills Actifs

### NIVEAU 1 : POURQUOI (5 directions stratégiques)

| Skill | Version | Agents | Description |
|-------|---------|--------|-------------|
| `direction-technique` | ![v3.1.0](https://img.shields.io/badge/v3.1.0-green) | 59 | Tech & Architecture |
| `direction-operations` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 27 | Projet & Équipes |
| `direction-commerciale` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 27 | Finance & Sales |
| `direction-marketing` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 25 | Acquisition & Growth |
| `direction-artistique` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 25 | Créatif & Brand |

### NIVEAU 2 : QUOI (7 skills de processus)

| Skill | Version | Agents | Description |
|-------|---------|--------|-------------|
| `web-agency` | ![v3.2.0](https://img.shields.io/badge/v3.2.0-blue) | - | Routage des demandes |
| `project-management` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 29 | Planning, coordination |
| `lead-dev` | ![v1.1.0](https://img.shields.io/badge/v1.1.0-blue) | 27 | Coordination équipe dev |
| `web-dev-process` | ![v1.2.0](https://img.shields.io/badge/v1.2.0-blue) | 64 | Méthodologie développement |
| `testing-process` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 25 | Stratégie et types de tests |
| `client-intake` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 28 | Qualification besoins |
| `task-orchestrator` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 20 | Priorisation et distribution |

### NIVEAU 3 : COMMENT (14 skills d'implémentation)

| Skill | Version | Agents | Description |
|-------|---------|--------|-------------|
| `frontend-developer` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 33 | Code frontend |
| `backend-developer` | ![v2.0.0](https://img.shields.io/badge/v2.0.0-green) | 38 | Code backend |
| `devops` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 30 | CI/CD, infrastructure |
| `react-expert` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 28 | Code React |
| `nextjs-expert` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 35 | Code Next.js |
| `wordpress-gutenberg-expert` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 42 | Code WordPress |
| `design-system-foundations` | ![v1.1.0](https://img.shields.io/badge/v1.1.0-blue) | 21 | Design tokens, composants |
| `ux-ui-design` | ![v2.0.0](https://img.shields.io/badge/v2.0.0-blue) | 27 | Maquettes, prototypes |
| `marketing` | ![v1.4.0](https://img.shields.io/badge/v1.4.0-blue) | 117 | Campagnes, SEO, content |
| `legal-compliance` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 16 | RGPD, conformité |
| `support-client` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 16 | Tickets, FAQ |
| `commercial-crm` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 18 | Pipeline, CRM |
| `finance-analytics` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 17 | Facturation, KPIs |
| `content-management` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 17 | Contenu éditorial |
| `ddd` | ![v1.3.0](https://img.shields.io/badge/v1.3.0-blue) | 32 | Domain-Driven Design |

**Total : 26 skills, 893 agents spécialisés**

## Guide de Migration

### Depuis l'Ancienne Structure

L'ancienne structure mélangeait processus et implémentation dans les mêmes skills.

#### Avant (Ancienne Structure)

```
frontend-developer/
├── testing/           # Mixte processus + implémentation
│   ├── strategy.md    # ❌ Était du PROCESSUS
│   └── unit.md        # ✅ IMPLÉMENTATION
```

#### Après (Nouvelle Structure)

```
testing-process/           # NIVEAU 2 - PROCESSUS
├── strategy/
│   └── pyramide.md       # Méthodologie (QUOI)
└── types/
    └── unit.md           # Méthodologie tests unitaires (QUOI)

frontend-developer/        # NIVEAU 3 - IMPLÉMENTATION
└── testing/
    └── unit.md           # Code Jest/Vitest (COMMENT)
```

### Correspondances de Routage

| Ancienne Route | Nouvelle Route | Raison | Statut |
|----------------|----------------|--------|--------|
| `frontend/testing/strategy` | `testing-process/strategy/pyramide` | Processus centralisé | ⚠️ Deprecated |
| `backend/testing/strategy` | `testing-process/strategy/pyramide` | Idem | ⚠️ Deprecated |
| `frontend/testing/unit` (méthodologie) | `testing-process/types/unit` | Méthodologie | ⚠️ Deprecated |
| `frontend/testing/unit` (code) | `frontend-developer/testing/unit` | Implémentation | ✅ Active |
| `backend-developer/devops/*` | `devops/*` | Skill dédié extrait | ⚠️ Deprecated |

### Mécanisme de Redirection

Les anciennes routes sont gérées via un mécanisme de **redirection automatique** :

```
Requête vers ancienne route
         │
         ▼
    ┌─────────────────────┐
    │ Orchestrateur source │
    │ (ex: backend-developer)│
    └──────────┬──────────┘
               │
               │ REDIRECT
               ▼
    ┌─────────────────────┐
    │   Nouveau skill     │
    │   (ex: devops)      │
    └─────────────────────┘
```

**Comportement** :
- Les skills source contiennent des tables de redirection `REDIRECT → skill/domain/agent`
- Aucune erreur n'est retournée pour les anciennes routes
- Un avertissement de dépréciation peut être loggé pour faciliter la migration

### Timeline de Dépréciation

| Phase | Version | Action | Date |
|-------|---------|--------|------|
| **Annonce** | v2.0.0 | Routes marquées deprecated dans la doc | 2025-12-28 |
| **Avertissement** | v2.1.0 | Warnings loggés lors de l'usage | Q1 2026 |
| **Suppression** | v3.0.0 | Anciennes routes supprimées | Q2 2026 |

> **Note** : La suppression effective nécessite une version MAJOR (voir [VERSIONING.md](./VERSIONING.md)).

### Outil de Validation

Un script permet de détecter les références obsolètes dans votre codebase :

```bash
# Scanner les références deprecated
node .web-agency/skills/scripts/validate-migration.js

# Voir ce qui serait corrigé sans modifier les fichiers
node .web-agency/skills/scripts/validate-migration.js --dry-run

# Corriger automatiquement (expérimental)
node .web-agency/skills/scripts/validate-migration.js --fix
```

#### Exemple de Sortie

```
============================================================
  Migration Validation Script
============================================================

  Mode: SCAN (read-only)

  Scanning for deprecated references...
  Found 42 files to scan

  [WARN] Found 2 deprecated reference(s)

------------------------------------------------------------
  DEPRECATED REFERENCES
------------------------------------------------------------

  File: prompts/api-setup.md
    [!] backend-developer\/devops
        → Replace with: devops
        Reason: DevOps extracted to standalone skill (v1.0.0)
        Since: 2025-12-28
        Occurrences: 1

  File: configs/pipeline.yml
    [!] backend-developer\/agents\/devops
        → Replace with: devops/agents
        Reason: DevOps agents moved to devops skill
        Since: 2025-12-28
        Occurrences: 3

------------------------------------------------------------
  MIGRATION GUIDE
------------------------------------------------------------

  The following skill extractions have occurred:

  backend-developer\/devops
    → devops
    DevOps extracted to standalone skill (v1.0.0)

  For more details, see:
  - .web-agency/skills/VERSIONING.md
  - .web-agency/skills/devops/CHANGELOG.md
```

### Exemples de Routes Deprecated

#### Pattern 1 : Référence directe au domaine DevOps

```markdown
<!-- ❌ Deprecated (backend-developer v1.x) -->
Pour configurer CI/CD, voir `backend-developer/devops/cicd`

<!-- ✅ Nouvelle route (devops v1.0.0+) -->
Pour configurer CI/CD, voir `devops/cicd/github-actions`
```

#### Pattern 2 : Import ou référence d'agent

```yaml
# ❌ Deprecated
skill: backend-developer
agent: devops/containers

# ✅ Nouvelle structure
skill: devops
agent: containers/docker
```

#### Pattern 3 : Liens dans la documentation

```markdown
<!-- ❌ Deprecated -->
[Guide containers](../backend-developer/agents/devops/containers.md)

<!-- ✅ Nouvelle route -->
[Guide containers](../devops/agents/containers/docker.md)
```

### Comment Mettre à Jour le Code

#### Étape 1 : Scanner votre codebase

```bash
cd .web-agency/skills
node scripts/validate-migration.js
```

#### Étape 2 : Examiner les résultats

Le script identifie les fichiers avec des références obsolètes et propose les remplacements.

#### Étape 3 : Corriger manuellement ou automatiquement

**Correction manuelle** (recommandée pour les cas complexes) :
```bash
# Rechercher les occurrences
grep -r "backend-developer/devops" --include="*.md" --include="*.yml"

# Remplacer
sed -i 's|backend-developer/devops|devops|g' fichier.md
```

**Correction automatique** (pour les cas simples) :
```bash
# Prévisualiser les changements
node scripts/validate-migration.js --dry-run

# Appliquer les corrections
node scripts/validate-migration.js --fix
```

#### Étape 4 : Vérifier et committer

```bash
# Vérifier que le scan est propre
node scripts/validate-migration.js

# Résultat attendu
# [OK] No deprecated references found!
# Your codebase is up to date with all migrations.
```

### Mapping Complet des Routes

| Ancienne Route | Nouvelle Route | Agent Cible |
|----------------|----------------|-------------|
| `backend-developer/devops/cicd` | `devops/cicd/github-actions` | CI/CD GitHub |
| `backend-developer/devops/containers` | `devops/containers/docker` | Dockerfile |
| `backend-developer/devops/kubernetes` | `devops/kubernetes/deployments` | K8s manifestes |
| `backend-developer/devops/deployment` | `devops/deployment/strategies` | Blue-Green, Canary |
| `backend-developer/devops/monitoring` | `devops/monitoring/prometheus` | Métriques |
| `backend-developer/devops/infrastructure` | `devops/infrastructure/terraform` | IaC |

> **Note** : Les nouveaux agents sont plus spécialisés. Par exemple, `cicd` devient `cicd/github-actions` ou `cicd/gitlab-ci` selon le contexte.

### Règle Simple

```
Question sur le QUOI/POURQUOI/QUAND ?  →  testing-process, web-dev-process
Question sur le COMMENT/CODE ?          →  skill technique (frontend, backend, etc.)
```

## Removed Skills

Les skills suivants ont été supprimés ou déplacés :

### Skills Planifiés Non Implémentés (supprimés v2.9.0)

| Skill | Raison | Alternative |
|-------|--------|-------------|
| `strategy` | Jamais implémenté | `direction-technique` |
| `design` | Jamais implémenté | `design-system-foundations` |
| `content` | Jamais implémenté | `content-management` (v3.2.0) |
| `marketing` | Jamais implémenté | `marketing` (ré-implémenté v3.0.0) |

### Skills Extraits/Déplacés

| Ancien Emplacement | Nouvel Emplacement | Version | Raison |
|--------------------|-------------------|---------|--------|
| `backend-developer/agents/devops/` | `devops/` | v2.0.0 | Skill autonome (ADR-007) |

### Notes de Migration

- **Références à `content (skill)`** : Utiliser `content-management` pour la gestion éditoriale, assets et localisation
- **Références à `design (skill)`** : Utiliser `design-system-foundations` pour les design systems
- **Références à `backend-developer/devops/*`** : Utiliser `devops/*` directement
- Voir [VERSIONING.md](./VERSIONING.md) pour la matrice de compatibilité

## Architecture Decision Records (ADR)

| ADR | Titre | Statut |
|-----|-------|--------|
| ADR-001 | Single Responsibility | Actif |
| ADR-002 | Agent Naming Convention | Actif |
| ADR-003 | Markdown Format | Actif |
| ADR-004 | Skill Structure | Actif |
| ADR-005 | 3-Level Hierarchy | Actif |
| ADR-006 | Orchestrator Pattern | Actif |
| ADR-007 | Skill Extraction | Actif |

Voir `.web-agency/learnings/ADR/` pour les détails.

## Tests

Chaque skill inclut une suite de tests de validation :

```bash
# Exécuter les tests d'un skill
cd .web-agency/skills/<skill-name>/tests
./run-tests.sh

# Ou avec npm
npm test
```

### Tests Disponibles

| Test | Description |
|------|-------------|
| `validate-agents.test.js` | Structure des agents |
| `validate-domains.test.js` | Structure des domaines |
| `validate-routing.test.js` | Keywords de routage |
| `validate-markdown.test.js` | Syntaxe markdown |

### Résultats des Tests (2025-12-29)

| Skill | Tests | Passed | Status |
|-------|-------|--------|--------|
| `devops` | 4 suites | 118 ✅ | ![Pass](https://img.shields.io/badge/tests-passing-brightgreen) |
| `testing-process` | 4 suites | 109 ✅ | ![Pass](https://img.shields.io/badge/tests-passing-brightgreen) |
| `web-agency` | 7 suites | 209 ✅ | ![Pass](https://img.shields.io/badge/tests-passing-brightgreen) |
| `web-dev-process` | 4 suites | 113 ✅ | ![Pass](https://img.shields.io/badge/tests-passing-brightgreen) |
| `wordpress-gutenberg-expert` | 4 suites | 86 ✅ | ![Pass](https://img.shields.io/badge/tests-passing-brightgreen) |
| `design-system-foundations` | 5 suites | 88 ✅ | ![Pass](https://img.shields.io/badge/tests-passing-brightgreen) |
| `backend-developer` | 1 suite | 118 ✅ | ![Pass](https://img.shields.io/badge/tests-passing-brightgreen) |
| `ddd` | 4 suites | 777 ✅ | ![Pass](https://img.shields.io/badge/tests-passing-brightgreen) |

**Total : 1618 tests passés, 0 échecs**

> **Note** : Certains skills (react-expert, nextjs-expert, lead-dev, etc.) n'ont pas encore de suite de tests.

## Contribution

Voir les ADR pour les conventions à respecter lors de l'ajout d'agents.

Points clés :
1. Respecter le niveau hiérarchique (ADR-005)
2. Suivre le format markdown (ADR-003)
3. Déclarer les exclusions (ADR-001)
4. Nommer correctement (ADR-002)

### Standards de Qualité des Agents

Chaque agent (hors orchestrators) doit respecter les critères de qualité suivants :

#### Contenu Minimum

| Critère | Exigence |
|---------|----------|
| **Taille** | ≥ 150 lignes de contenu |
| **Exemples de code** | 2-3 exemples concrets |
| **Best practices** | Section "Bonnes Pratiques" |
| **Livrables** | Section décrivant les outputs |

#### Structure Requise

```markdown
---
name: agent-name
description: Description courte
---

# Titre de l'Agent

## Contexte
Quand utiliser cet agent

## Responsabilités
Ce que fait cet agent (et ce qu'il ne fait PAS)

## Exemple d'Utilisation

### Cas 1 : [Scenario]
\`\`\`language
// Code example
\`\`\`

### Cas 2 : [Autre Scenario]
\`\`\`language
// Code example
\`\`\`

## Bonnes Pratiques

| Pratique | Raison |
|----------|--------|
| Faire X | Parce que... |
| Éviter Y | Parce que... |

## Livrables

| Livrable | Description |
|----------|-------------|
| Output 1 | Ce que l'agent produit |
| Output 2 | Autre output |

## Références
- Lien vers documentation
```

#### Agents Conformes

Tous les agents prioritaires ont été améliorés et dépassent le seuil de 150 lignes.

> **Note** : Les agents de délégation (qui pointent vers un skill dédié comme `react-expert` ou `wordpress-gutenberg-expert`) peuvent rester compacts car leur rôle est de rediriger vers le skill spécialisé.
