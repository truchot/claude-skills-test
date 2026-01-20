# /project - Commande Gestion de Projet

## Rôle

Point d'entrée pour la gestion de projet : planning, estimation, suivi, communication client.

## Architecture v2

```
/project [demande]
     │
     ▼
┌─────────────────────────────────────────┐
│           ORCHESTRATOR                   │
│  .web-agency/ORCHESTRATOR.md            │
└─────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│           WORKFLOWS                      │
│                                          │
│  • new-project.md → Nouveau projet       │
│  • maintenance.md → Support              │
└─────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│           AGENTS PROJECT                 │
│  .web-agency/skills/                     │
│                                          │
│  • intake/        → Réception, qualif    │
│  • strategy/      → Spec, estimation     │
│  • project/       → Planning, suivi      │
└─────────────────────────────────────────┘
```

## Comportement

1. **Analyse ta demande** projet
2. **Identifie le type** : nouveau projet, estimation, suivi, communication
3. **Sélectionne le workflow** ou agent approprié
4. **Produit des livrables** structurés

## Types de demandes

| Tu demandes... | Workflow/Agent | Output |
|----------------|----------------|--------|
| Nouveau projet | `new-project.md` | Brief → Estimation → Plan |
| Estimation | `strategy/estimation.md` | Chiffrage détaillé |
| Point d'avancement | `project/tracking.md` | Rapport de suivi |
| Communication client | `project/communication.md` | Email/rapport formaté |
| Créer un planning | `project/planning.md` | Jalons + tâches |

## Livrables types

### Brief structuré

```yaml
Projet: [Nom]
Client: [Contact]
Objectif: [1 phrase]
Périmètre:
  Inclus: [...]
  Exclus: [...]
Contraintes:
  Budget: [X€]
  Deadline: [Date]
```

### Estimation

```yaml
Phases:
  - Discovery: 1.5j
  - Design: 5j
  - Development: 10.5j
  - Tests & Livraison: 3.5j

Total: 20.5 jours
Fourchette: 20-25 jours
```

### Point d'avancement

```markdown
## Avancement global : 65%

### Réalisé
- ✅ Setup projet
- ✅ Maquettes validées

### En cours
- 🔄 Développement frontend (80%)

### Blocages
- 🚨 API tierce non disponible

### Prochaines étapes
1. Finaliser le checkout
2. Tests de recette
```

## Utilisation

```
/project [description de ta demande]
```

## Exemples

```
/project Nouveau projet e-commerce pour client ABC
→ Workflow: new-project
→ Output: Brief + Qualification + Estimation + Plan

/project Estimer l'ajout d'un espace membre
→ Agent: strategy/estimation.md
→ Output: Chiffrage détaillé + risques

/project Point d'avancement pour le client
→ Agent: project/tracking.md
→ Output: Rapport formaté pour le client

/project Créer le planning du projet
→ Agent: project/planning.md
→ Output: Jalons + tâches + dépendances
```

## État du projet

L'état est maintenu dans `.web-agency/state/current.json` :

```json
{
  "project": { "id": "PRJ-001", "name": "...", "status": "in_progress" },
  "workflow": { "current_step": 3, "total_steps": 7 },
  "tasks": [...]
}
```
