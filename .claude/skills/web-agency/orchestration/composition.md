---
name: composition
description: Comment composer et combiner les skills
---

# Composition des Skills

Ce document définit comment combiner plusieurs skills pour des requêtes complexes.

## Principe

> Les skills sont des LEGO : composables, indépendants, réutilisables.

## Types de Composition

### 1. Composition Séquentielle

Un skill dépend de l'output d'un autre.

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ project-mgmt     │ ──► │ direction-tech   │ ──► │ wordpress        │
│ (Brief client)   │     │ (Specs techniques)│     │ (Implémentation) │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

**Exemple** : "Créer un devis pour site e-commerce WordPress"
1. `project-management/avant-projet` → Brief & estimation commerciale
2. `direction-technique/estimation` → Estimation technique
3. `wordpress-gutenberg-expert` → Spécificités WooCommerce

### 2. Composition Parallèle

Skills indépendants travaillant en même temps.

```
                    ┌──────────────────┐
               ┌───►│ design           │
               │    └──────────────────┘
┌──────────┐   │    ┌──────────────────┐
│ Brief    │───┼───►│ content          │
└──────────┘   │    └──────────────────┘
               │    ┌──────────────────┐
               └───►│ direction-tech   │
                    └──────────────────┘
```

**Exemple** : Après validation du brief, design/content/tech peuvent avancer en parallèle.

### 3. Composition Hiérarchique (3 niveaux)

Selon ADR-005, les skills techniques s'empilent :

```
STRATÉGIE (direction-technique)
        │
        ▼
PROCESSUS (web-dev-process)
        │
        ▼
IMPLÉMENTATION (wordpress-*)
```

**Exemple** : "Mettre en place CI/CD"
1. `direction-technique` → "On adopte CI/CD avec quality gates"
2. `web-dev-process` → "Pipeline = build → test → deploy"
3. `wordpress-*` → "GitHub Actions avec wp-env"

## Patterns de Composition Courants

### Pattern : Nouveau Projet

```
1. project-management/avant-projet
   → Collecte brief, estimation, proposition

2. direction-technique/avant-projet
   → Choix stack, audit existant, faisabilité

3. [PARALLÈLE]
   ├─ design-system-foundations (si nouveau DS)
   ├─ content (arborescence, contenus)
   └─ direction-technique/specification

4. web-dev-process/setup
   → Repo, CI/CD, environnements

5. wordpress-gutenberg-expert (ou autre implémentation)
   → Développement

6. web-dev-process/testing
   → Tests

7. project-management/livraison
   → Recette, PV

8. project-management/facturation
   → Factures
```

### Pattern : Bug Fix Urgent

```
1. project-management/communication
   → Accusé réception client

2. direction-technique/support
   → Troubleshooting, diagnostic

3. wordpress-*/tooling ou web-dev-process/development
   → Fix

4. project-management/communication
   → Notification client
```

### Pattern : Refonte

```
1. direction-technique/avant-projet/audit-existant
   → Analyse technique

2. strategy/audit (si disponible)
   → Analyse UX/business

3. project-management/avant-projet
   → Brief, estimation, proposition

4. [Suite comme nouveau projet...]
```

## Règles de Composition

### 1. Toujours Séquentiel d'abord

Identifier les dépendances avant de paralléliser.

### 2. Un Orchestrateur Principal

Pour chaque workflow, un skill "lead" coordonne :
- Nouveau projet → `project-management`
- Migration technique → `direction-technique`
- Bug fix → `direction-technique/support`

### 3. Handoffs Explicites

Chaque transition entre skills produit un artefact :
- Brief → Specs
- Specs → Code
- Code → Tests
- Tests → Deploy

### 4. Points de Synchronisation

Valider humainement avant de passer au skill suivant.

## Anti-Patterns

### À Éviter

- **Skill soup** : Invoquer 5+ skills en parallèle sans coordination
- **Boucle infinie** : A → B → A → B...
- **Skip de niveau** : Aller directement en implémentation sans processus

## Références

- [Règles de routage](./routing.md)
- [Points d'escalade](./escalation.md)
- [ADR-005 : Frontières de responsabilités](../docs/adr/005-skill-responsibility-boundaries.md)
