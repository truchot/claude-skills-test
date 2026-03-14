# Hiérarchie des Skills — Source Unique

> **Ce fichier est la source de vérité unique** pour la hiérarchie des skills.
> Tous les autres documents (SKILL.md, routing.md, composition.md, README.md) doivent référencer ce fichier.

## Les 4 Niveaux

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ENTRÉE          Point d'entrée, accueil et routage des demandes           │
│                  Rôle : ACCUEIL — "D'où vient la demande ?"                │
├─────────────────────────────────────────────────────────────────────────────┤
│  STRATÉGIE       Décisions stratégiques, pas de code                       │
│                  Rôle : POURQUOI — "Pourquoi faire ça ?"                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  PROCESSUS       Coordination, méthodologie, gestion                       │
│                  Rôle : QUOI/QUI — "Quoi faire, dans quel ordre, par qui?" │
├─────────────────────────────────────────────────────────────────────────────┤
│  IMPLÉMENTATION  Code réel, livrables concrets, exécution                  │
│                  Rôle : COMMENT — "Comment le faire concrètement ?"        │
├─────────────────────────────────────────────────────────────────────────────┤
│  TRANSVERSE      Méthodologies applicables à tous les niveaux              │
│                  Rôle : AVEC QUOI — "Quelle méthode appliquer ?"           │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Mapping Complet

### ENTRÉE — Accueil et Routage

| Skill | Responsabilité |
|-------|----------------|
| `client-intake` | Réception, qualification et routage des demandes clients |
| `web-agency` | Orchestrateur principal de l'agence |
| `task-orchestrator` | Distribution des tâches aux skills appropriés |

### STRATÉGIE — Décisions (POURQUOI)

| Skill | Responsabilité |
|-------|----------------|
| `direction-technique` | Tech & Architecture |
| `direction-operations` | Projet & Équipes |
| `direction-commerciale` | Finance & Sales |
| `direction-marketing` | Acquisition & Growth |
| `direction-artistique` | Créatif & Brand |

### PROCESSUS — Coordination (QUOI / QUI)

| Skill | Responsabilité |
|-------|----------------|
| `project-management` | Gestion de projet, planning, livrables |
| `lead-dev` | Coordination équipe, code review, delivery |
| `web-dev-process` | Méthodologie dev, phases projet, conventions |
| `testing-process` | Stratégie de tests, méthodologie QA |
| `experience-client` | Parcours client, satisfaction, suivi |

### IMPLÉMENTATION — Exécution (COMMENT)

| Skill | Responsabilité |
|-------|----------------|
| `frontend-developer` | Code frontend |
| `backend-developer` | Code backend |
| `devops` | CI/CD, infrastructure |
| `react-expert` | Spécialisation React |
| `nextjs-expert` | Spécialisation Next.js |
| `wordpress-gutenberg-expert` | WordPress & Gutenberg |
| `design-system-foundations` | Tokens, composants UI |
| `ux-ui-design` | Design UX/UI |
| `seo-expert` | SEO technique et stratégique |
| `paid-media` | Publicité payante |
| `marketing-analytics` | Analytics & données marketing |
| `content-marketing` | Contenu marketing |
| `content-management` | Gestion de contenu |
| `customer-success` | Succès client |
| `marketing-ops` | Opérations marketing |
| `legal-compliance` | Conformité juridique |
| `support-client` | Support et assistance |
| `commercial-crm` | CRM et pipeline commercial |
| `finance-analytics` | Analyse financière |
| `ai-integration` | Intégration IA |
| `legacy-modernization` | Modernisation legacy |
| `security-expert` | Sécurité |

### TRANSVERSE — Méthodologies

| Skill | Responsabilité |
|-------|----------------|
| `ddd` | Domain-Driven Design |

## Règle de Complexité → Niveaux Mobilisés

| Complexité | Durée | Niveaux mobilisés |
|------------|-------|-------------------|
| **MICRO** | < 2h | IMPLÉMENTATION seul |
| **PETIT** | < 2 jours | PROCESSUS + IMPLÉMENTATION |
| **MOYEN** | 2-15 jours | STRATÉGIE + PROCESSUS + IMPLÉMENTATION |
| **GRAND** | > 15 jours | ENTRÉE → STRATÉGIE → PROCESSUS → IMPLÉMENTATION |

## Correspondance Ancienne → Nouvelle Terminologie

| Ancien | Nouveau | Notes |
|--------|---------|-------|
| Niveau 0 | **ENTRÉE** | Ne plus utiliser "Niveau 0" |
| Niveau 1 | **STRATÉGIE** | Ne plus utiliser "Niveau 1" |
| Niveau 2 | **PROCESSUS** | Ne plus utiliser "Niveau 2" |
| Niveau 3 / Niveau 4 | **IMPLÉMENTATION** | Fusionnés — ne plus distinguer |
| — | **TRANSVERSE** | Nouveau, pour les méthodologies cross-cutting |

## Références

- [GLOSSAIRE.md](./GLOSSAIRE.md) — Terminologie canonique
- [ADR-006](./orchestration-framework/docs/adr/006-hierarchy-clarification.md) — Clarification lead-dev / web-dev-process
- [Routing](./orchestration-framework/orchestration/routing.md) — Règles de routage
- [Composition](./orchestration-framework/orchestration/composition.md) — Patterns de composition
