---
name: routing
description: Règles de routage vers les skills métiers
---

# Règles de Routage Web Agency

Ce document définit les règles de routage des requêtes vers les skills appropriés.

## Principe

> Une requête = Un skill principal identifié

## Matrice de Routage par Mots-clés

### Project Management

| Mots-clés | Skill |
|-----------|-------|
| brief, besoin, demande client, RFP, cahier des charges | `project-management/avant-projet` |
| devis, estimation, chiffrage, budget, proposition | `project-management/avant-projet` |
| planning, jalon, milestone, Gantt, deadline | `project-management/pilotage` |
| avancement, suivi, reporting, statut | `project-management/pilotage` |
| réunion, CR, compte-rendu, PV | `project-management/communication` |
| email, relance, message client | `project-management/communication` |
| recette, validation, test client, PV recette | `project-management/livraison` |
| facture, facturation, paiement | `project-management/facturation` |

### Direction Technique (Stratégie)

| Mots-clés | Skill |
|-----------|-------|
| choix stack, framework, technologie | `direction-technique/avant-projet` |
| audit existant, legacy, migration | `direction-technique/avant-projet` |
| architecture, patterns, ADR | `direction-technique/architecture` |
| specs techniques, spécification | `direction-technique/specification` |
| estimation technique, chiffrage dev | `direction-technique/estimation` |
| qualité, standards, dette technique | `direction-technique/qualite` |
| sécurité, OWASP, RGPD, vulnérabilité | `direction-technique/securite` |
| performance, optimisation, SLO | `direction-technique/performance` |

### Lead Dev (Coordination)

| Mots-clés | Skill |
|-----------|-------|
| PR, pull request, review code, merge request | `lead-dev/code-review` |
| qualité code, sécurité code, performance code | `lead-dev/code-review` |
| tâche, assignation, daily, standup, blocage | `lead-dev/team-coordination` |
| sprint support, débloquer dev | `lead-dev/team-coordination` |
| choix librairie, quel pattern, refactoring | `lead-dev/technical-decisions` |
| dette technique priorisation | `lead-dev/technical-decisions` |
| feedback code, onboarding dev, formation | `lead-dev/mentoring` |
| bonnes pratiques, évaluation niveau | `lead-dev/mentoring` |
| release, deploy check, hotfix, changelog | `lead-dev/delivery` |
| merge strategy, stratégie branches | `lead-dev/delivery` |

### Web Dev Process (Processus)

| Mots-clés | Skill |
|-----------|-------|
| user story, requirement, scope | `web-dev-process/discovery` |
| wireframe, mockup, UI/UX, design système | `web-dev-process/design` |
| git, repo, CI/CD, pipeline, linter | `web-dev-process/setup` |
| code review, PR, conventions | `web-dev-process/development` |
| test unitaire, e2e, accessibilité | `web-dev-process/testing` |
| deploy, staging, production, rollback | `web-dev-process/deployment` |
| monitoring, logs, alerting, bug | `web-dev-process/maintenance` |

### WordPress (Implémentation)

| Mots-clés | Skill |
|-----------|-------|
| CPT, taxonomy, hook, filter, PHP WP | `wordpress-gutenberg-expert/wp-core` |
| block, Gutenberg, registerBlockType | `wordpress-gutenberg-expert/gutenberg-blocks` |
| theme.json, block theme, FSE | `wordpress-gutenberg-expert/theme` |
| wp-env, WP-CLI, @wordpress/scripts | `wordpress-gutenberg-expert/tooling` |
| PHPUnit WP, Jest WP, Playwright WP | `wordpress-gutenberg-expert/testing` |

### Design System

| Mots-clés | Skill |
|-----------|-------|
| design tokens, couleurs, typo, spacing | `design-system-foundations/foundations` |
| bouton, input, icône, badge | `design-system-foundations/atoms` |
| formulaire, card, modal, navigation | `design-system-foundations/molecules` |
| layout, page template, hero | `design-system-foundations/templates` |

### Skills Planifiés

| Mots-clés | Skill | Statut |
|-----------|-------|--------|
| audit, benchmark, stratégie digitale | `strategy` | Planifié |
| maquette, logo, charte, branding, DA | `design` | Planifié |
| rédaction, copywriting, SEO éditorial | `content` | Planifié |
| SEO, SEA, analytics, social media | `marketing` | Planifié |

## Arbre de Décision

```
Requête utilisateur
│
├─ Concerne le CLIENT ou le PROJET ?
│  └─ → project-management
│
├─ Concerne une DÉCISION technique STRATÉGIQUE ?
│  └─ → direction-technique
│
├─ Concerne la COORDINATION d'équipe dev ?
│  ├─ Code review, PR, qualité ? → lead-dev/code-review
│  ├─ Tâches, daily, blocage ? → lead-dev/team-coordination
│  ├─ Choix lib, pattern ? → lead-dev/technical-decisions
│  ├─ Formation, mentoring ? → lead-dev/mentoring
│  └─ Release, deploy, hotfix ? → lead-dev/delivery
│
├─ Concerne un PROCESSUS de dev ?
│  └─ → web-dev-process
│
├─ Concerne l'implémentation FRONTEND ?
│  └─ → frontend-developer (ou react-expert)
│
├─ Concerne l'implémentation BACKEND ?
│  └─ → backend-developer
│
├─ Concerne WordPress/Gutenberg ?
│  └─ → wordpress-gutenberg-expert
│
├─ Concerne le DESIGN SYSTEM ?
│  └─ → design-system-foundations
│
└─ Autre domaine ?
   └─ → Vérifier skills planifiés ou demander clarification
```

## Priorité en Cas d'Ambiguïté

1. **Match exact** : Mot-clé présent dans la table
2. **Contexte conversation** : Skill déjà utilisé récemment
3. **Spécificité** : "audit sécurité" → securite (pas avant-projet)
4. **Demander clarification** : Si vraiment ambigu

## Références

- [Composition des skills](./composition.md)
- [Points d'escalade](./escalation.md)
