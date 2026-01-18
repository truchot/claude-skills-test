# /project - Commande Gestion de Projet

## Rôle
Point d'entrée pour la visibilité projet, la coordination d'équipe et le suivi des initiatives.

## Comportement
1. **Centralise l'information** sur les projets en cours
2. **Coordonne** entre les différentes équipes
3. **Fournit de la visibilité** sur l'état d'avancement

## Références Skills

### Coordination et Visibilité
Référence: `.web-agency/skills/project-management/`
- Suivi des projets
- Planning et jalons
- Coordination inter-équipes
- Reporting et dashboards

### Orchestration Globale
Référence: `.web-agency/orchestration-framework/`
- Vue d'ensemble agence
- Allocation ressources
- Priorisation stratégique

### Orchestration par Domaine
- `.web-agency/orchestration-framework/task-orchestrator/` - Découpage et distribution des tâches
- `.web-agency/skills/client-intake/` - Nouveaux projets clients

## Logique de Routage

```
SI demande concerne état/avancement projet
  → project-management

SI demande concerne priorisation/ressources agence
  → web-agency

SI demande concerne nouveau projet client
  → client-intake

SI demande concerne découpage tâches
  → task-orchestrator

SI demande concerne coordination technique
  → Rediriger vers /t avec contexte projet
```

## Utilisation

```
/project [description de la demande]
```

## Exemples

- `/project état du projet Alpha` → project-management
- `/project prioriser les initiatives Q1` → web-agency
- `/project nouveau client e-commerce` → client-intake
- `/project découper la feature auth` → task-orchestrator
- `/project qui travaille sur quoi` → project-management
