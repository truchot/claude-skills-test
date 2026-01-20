# Web Agency IA v2 - Architecture Orchestrée

## Philosophie

**Même richesse, meilleure orchestration.**

La v2 conserve tous les agents spécialisés de la v1 mais ajoute :
1. Un **orchestrateur intelligent** comme point d'entrée unique
2. Des **workflows métier** qui enchaînent les agents automatiquement
3. Un **système d'état** qui maintient le contexte

## Structure

```
.web-agency/
├── ORCHESTRATOR.md              # Point d'entrée unique - Chef d'orchestre
│
├── workflows/                   # Chaînes de production complètes
│   ├── new-project.md           # Nouveau projet client
│   ├── feature.md               # Développement feature
│   ├── bugfix.md                # Correction de bug
│   ├── code-review.md           # Revue de code
│   ├── deployment.md            # Mise en production
│   ├── audit.md                 # Audit technique/sécurité
│   └── maintenance.md           # Maintenance et support
│
├── skills/                      # Agents spécialisés (granulaires)
│   ├── intake/                  # Réception et qualification
│   ├── strategy/                # Direction et décisions
│   ├── project/                 # Gestion de projet
│   ├── development/             # Développement
│   ├── quality/                 # Qualité et tests
│   ├── operations/              # DevOps et déploiement
│   └── support/                 # Marketing et support
│
├── contexts/                    # Connaissances techniques
│   ├── frontend.md
│   ├── backend.md
│   ├── devops.md
│   ├── wordpress.md
│   └── security.md
│
├── state/                       # État du projet (généré)
│   └── current.json
│
└── config/                      # Configuration agence
    └── settings.yaml
```

## Comment ça fonctionne

### 1. L'utilisateur invoque une commande
```
/tech "J'ai besoin d'ajouter un système de paiement Stripe"
```

### 2. L'Orchestrateur analyse et route
```
→ Détecte : nouvelle feature technique
→ Sélectionne workflow : feature.md
→ Identifie étapes : spécification → architecture → dev → test → review → deploy
```

### 3. Les agents s'exécutent en séquence
```
skills/strategy/specification.md      → Clarifie les besoins
skills/strategy/architecture.md       → Conçoit la solution
skills/development/backend.md         → Implémente l'API Stripe
skills/development/frontend.md        → Implémente le checkout UI
skills/quality/testing.md             → Tests automatisés
skills/quality/code-review.md         → Review du code
skills/operations/deployment.md       → Déploiement staging puis prod
```

### 4. L'état est maintenu
```json
{
  "current_task": "Intégration Stripe",
  "workflow": "feature",
  "step": 4,
  "completed": ["spec", "archi", "backend"],
  "in_progress": "frontend",
  "pending": ["testing", "review", "deploy"]
}
```

## Différences avec v1

| Aspect | v1 | v2 |
|--------|----|----|
| Point d'entrée | 4 commandes manuelles | 1 orchestrateur intelligent |
| Navigation | Manuelle (SKILL.md → agent) | Automatique (workflow) |
| Enchaînement | L'utilisateur doit savoir | Le workflow gère |
| État | Déconnecté | Intégré et persistant |
| Agents | Identiques | Identiques (conservés) |

## Commandes

| Commande | Description |
|----------|-------------|
| `/tech` | Toute tâche technique (route automatiquement) |
| `/design` | Tâches design/UX |
| `/project` | Gestion de projet |
| `/marketing` | Marketing/SEO/Contenu |

L'orchestrateur détecte automatiquement le workflow approprié.

## Workflows disponibles

| Workflow | Déclencheur | Étapes clés |
|----------|-------------|-------------|
| `new-project` | Nouveau client/projet | Intake → Qualification → Estimation → Planning → Dev → Livraison |
| `feature` | Nouvelle fonctionnalité | Spec → Archi → Dev → Test → Review → Deploy |
| `bugfix` | Bug à corriger | Diagnostic → Fix → Test → Review → Deploy |
| `code-review` | PR à reviewer | Analyse → Feedback → Corrections → Validation |
| `deployment` | Mise en prod | Checklist → Build → Deploy → Smoke test → Monitoring |
| `audit` | Audit demandé | Analyse → Rapport → Recommandations → Plan action |
| `maintenance` | Support/évolution | Triage → Priorisation → Exécution → Communication |

## Ancienne v1

L'architecture détaillée de la v1 est conservée dans `.web-agency-v1/` pour référence.
Les agents de la v1 sont **migrés et réorganisés** dans `skills/` avec une structure plus claire.
