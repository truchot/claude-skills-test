---
name: sprint-planning
description: Planification de sprint - priorisation et engagement équipe
triggers: [sprint planning, planification sprint, nouveau sprint]
skills: [git]
roles: [project-manager, technical-director, frontend-developer, backend-developer]
---

# Workflow: Sprint Planning

## Objectif
Planifier un sprint en définissant les objectifs, priorisant les tâches et engageant l'équipe.

## Prérequis
- Backlog priorisé
- Équipe disponible
- Vélocité connue (sprints précédents)

## Étapes

### 1. Préparation (avant réunion)
**Responsable**: project-manager

- [ ] Mettre à jour le backlog
- [ ] Prioriser les items avec le client/PO
- [ ] Vérifier que les items sont "Ready"
- [ ] Calculer la capacité de l'équipe
- [ ] Préparer la réunion (agenda, invitations)

**Output**: Backlog prêt, capacité calculée

### 2. Review des Objectifs
**Responsable**: project-manager

- [ ] Rappeler les objectifs du projet
- [ ] Présenter les priorités client
- [ ] Définir l'objectif du sprint (1-2 phrases)
- [ ] S'assurer de l'alignement équipe

**Output**: Sprint goal défini

### 3. Estimation & Sélection
**Responsable**: équipe technique

- [ ] Présenter les items prioritaires
- [ ] Estimer en story points (Planning Poker)
- [ ] Discuter des dépendances
- [ ] Sélectionner les items selon capacité
- [ ] Ne pas dépasser la vélocité moyenne

**Output**: Sprint backlog engagé

### 4. Découpage en Tâches
**Responsable**: équipe technique

- [ ] Décomposer chaque item en tâches
- [ ] Estimer les tâches (heures ou points)
- [ ] Identifier les assignations
- [ ] Repérer les blocages potentiels

**Output**: Tâches créées dans le board

### 5. Engagement
**Responsable**: équipe

- [ ] L'équipe s'engage sur le scope
- [ ] Clarifier les derniers doutes
- [ ] Définir la date de review
- [ ] Planifier le daily (horaire, format)

**Output**: Sprint engagé

## Template Sprint Board

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│   BACKLOG   │   TO DO     │ IN PROGRESS │    DONE     │
├─────────────┼─────────────┼─────────────┼─────────────┤
│ Item 5      │ Item 1      │             │             │
│ Item 6      │ Item 2      │             │             │
│ Item 7      │ Item 3      │             │             │
│ ...         │ Item 4      │             │             │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

## Métriques Sprint

| Métrique | Calcul |
|----------|--------|
| Capacité | Jours dispo × Productivité (0.6-0.8) |
| Vélocité | Moyenne points des 3 derniers sprints |
| Engagement | Total points sélectionnés |
| Completion | Points terminés / Points engagés |

## Definition of Ready (DoR)

Un item est "Ready" quand :
- [ ] User story rédigée (As a... I want... So that...)
- [ ] Critères d'acceptance définis
- [ ] Dépendances identifiées
- [ ] Maquettes/specs disponibles si nécessaire
- [ ] Estimable par l'équipe

## Anti-patterns à Éviter

| Anti-pattern | Bonne pratique |
|--------------|----------------|
| Surengagement | Respecter la vélocité |
| Items non prêts | Appliquer le DoR |
| Pas de sprint goal | Toujours définir un objectif |
| Planning > 2h | Timeboxer strictement |
| Un seul qui estime | Estimation collective |
