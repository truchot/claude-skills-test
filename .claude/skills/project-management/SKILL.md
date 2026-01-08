---
name: project-management
description: Gestion de projet - communication, templates, bonnes pratiques
tags: [gestion-projet, communication, templates]
sub-skills: [communication]
related-workflows: [avant-projet, pilotage-projet]
---

# Project Management (Gestion de Projet)

## Quand Utiliser
- Rédiger des comptes-rendus de réunion
- Gérer la communication client (emails, relances)
- Utiliser les templates de gestion de projet

## Sous-Skills Disponibles

| Sous-skill | Fichier | Description |
|------------|---------|-------------|
| Communication | `communication.md` | CR réunion, emails client |

## Workflows Associés

> Les processus séquentiels (QUAND) sont dans `/workflows/project/`

| Workflow | Fichier | Description |
|----------|---------|-------------|
| Avant-projet | `workflows/project/avant-projet.md` | Brief → Chiffrage → Proposition |
| Pilotage | `workflows/project/pilotage-projet.md` | Planning → Suivi → Reporting |

## Cycle de Vie Projet

```
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│  AVANT-  │──▶│ PILOTAGE │──▶│ LIVRAISON│──▶│FACTURAT° │
│  PROJET  │   │          │   │          │   │          │
└──────────┘   └──────────┘   └──────────┘   └──────────┘
     │              │              │              │
     ▼              ▼              ▼              ▼
Brief, Devis   Planning,     Recette,      Factures,
Proposition    Suivi, CR     Bilan         Relances

        ◀──── COMMUNICATION (transversal) ────▶
```

## Templates de Communication

| Template | Usage |
|----------|-------|
| Compte-rendu | Synthèse réunion |
| Email relance | Demande de retour |
| Email livraison | Annonce MEP |

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Brief incomplet après 2 relances | Alerter commercial |
| Estimation hors fourchette | Valider avec direction |
| Dépassement > 20% budget | Arbitrage nécessaire |
| Retard > 1 semaine | Communication client |
| Demande hors périmètre | Négociation avenant |

## Métriques Clés

| Métrique | Formule | Cible |
|----------|---------|-------|
| Respect délais | Livré à temps / Total | > 90% |
| Respect budget | Budget réel / Budget prévu | < 110% |
| Satisfaction client | NPS ou note | > 8/10 |
| Taux d'avenants | Avenants / Projets | < 20% |
