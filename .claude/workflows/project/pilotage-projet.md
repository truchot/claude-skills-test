---
name: pilotage-projet
description: Processus de pilotage projet - planning, suivi, reporting
triggers: [suivi projet, reporting, planning, avancement, point projet]
skills: [project-management, git]
roles: [project-manager, technical-director]
---

# Workflow: Pilotage Projet

## Objectif
Suivre l'avancement d'un projet et communiquer régulièrement avec les parties prenantes.

## Prérequis
- Projet démarré (kickoff fait)
- Planning initial validé
- Équipe assignée

## Étapes

### 1. Setup Initial
**Responsable**: project-manager
**Fréquence**: Une fois au démarrage

- [ ] Créer le planning Gantt
- [ ] Définir les jalons clés
- [ ] Configurer l'outil de suivi (board)
- [ ] Planifier les rituels (daily, weekly)

**Output**: Planning et board configurés

### 2. Suivi Quotidien
**Responsable**: project-manager + équipe
**Fréquence**: Quotidien

- [ ] Daily standup (15 min max)
- [ ] Identifier les blocages
- [ ] Mettre à jour le board
- [ ] Débloquer si possible

**Output**: Board à jour, blocages identifiés

### 3. Point Hebdomadaire
**Responsable**: project-manager
**Fréquence**: Hebdomadaire

- [ ] Calculer l'avancement réel vs prévu
- [ ] Analyser les écarts
- [ ] Identifier les risques
- [ ] Préparer le reporting

**Output**: Analyse hebdomadaire

### 4. Reporting Client
**Responsable**: project-manager
**Fréquence**: Hebdomadaire

- [ ] Rédiger le rapport d'avancement
- [ ] Lister les décisions à prendre
- [ ] Envoyer au client
- [ ] Planifier point si nécessaire

**Output**: Reporting envoyé

### 5. Gestion des Alertes
**Responsable**: project-manager
**Fréquence**: Selon besoin

- [ ] Détecter le problème
- [ ] Évaluer l'impact
- [ ] Proposer des solutions
- [ ] Escalader si nécessaire
- [ ] Communiquer au client

**Output**: Alerte traitée

### 6. Revue de Jalon
**Responsable**: project-manager + technical-director
**Fréquence**: À chaque jalon

- [ ] Vérifier la complétion du jalon
- [ ] Valider la qualité
- [ ] Obtenir validation client si requis
- [ ] Ajuster le planning si nécessaire

**Output**: Jalon validé

## Indicateurs de Suivi

| Indicateur | Formule | Cible |
|------------|---------|-------|
| SPI | Réalisé / Prévu | ≥ 0.95 |
| CPI | Budget prévu / Réel | ≥ 0.95 |
| Vélocité | Points/sprint | Stable |

## Niveaux d'Alerte

| Niveau | Critères | Action |
|--------|----------|--------|
| 🟢 OK | Planning respecté | Continuer |
| 🟡 Vigilance | Retard < 1 sem | Surveiller, informer |
| 🔴 Alerte | Retard > 1 sem | Escalade, plan d'action |

## Template Reporting Hebdo

```markdown
# Reporting - [Projet] - Semaine [XX]

## État Global
| Indicateur | Statut |
|------------|--------|
| Planning | 🟢/🟡/🔴 |
| Budget | 🟢/🟡/🔴 |
| Qualité | 🟢/🟡/🔴 |

## Avancement
| Phase | Prévu | Réel |
|-------|-------|------|
| [Phase] | X% | Y% |

## Réalisé cette semaine
- ✅ [Tâche 1]
- ✅ [Tâche 2]

## Prévu semaine prochaine
- [ ] [Tâche A]
- [ ] [Tâche B]

## Points d'attention
- [Point 1]

## Décisions requises
- [Décision 1] - Deadline: [Date]
```

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Retard > 1 semaine | Communication client proactive |
| Dépassement > 20% budget | Arbitrage direction |
| Blocage technique | Intervention tech lead |
| Conflit équipe | Médiation |
