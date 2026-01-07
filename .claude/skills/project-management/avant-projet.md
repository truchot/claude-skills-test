---
name: project-management/avant-projet
description: Avant-projet - brief, estimation, chiffrage, proposition commerciale
tags: [avant-projet, brief, estimation, chiffrage, proposition, devis]
---

# Avant-Projet

## Quand Utiliser
- Analyser un brief client
- Estimer et chiffrer un projet
- Rédiger une proposition commerciale
- Identifier les risques et hypothèses

## Processus Avant-Projet

```
BRIEF CLIENT
     ↓
┌─────────────────┐
│ ANALYSE BESOIN  │ → Questions, clarifications
└────────┬────────┘
         ↓
┌─────────────────┐
│ DÉCOUPAGE       │ → Lots, tâches, T-shirt sizing
└────────┬────────┘
         ↓
┌─────────────────┐
│ CHIFFRAGE       │ → JH par profil, fourchettes
└────────┬────────┘
         ↓
┌─────────────────┐
│ PROPOSITION     │ → Document commercial
└─────────────────┘
```

## Grille T-Shirt → Jours/Homme

| Taille | JH Min | JH Max | Ratio |
|--------|--------|--------|-------|
| XS | 0.25 | 0.5 | 1:2 |
| S | 0.5 | 1 | 1:2 |
| M | 1 | 2 | 1:2 |
| L | 2 | 4 | 1:2 |
| XL | 4 | 8 | 1:2 |

## Profils Types

| Profil | Rôle | % Typique |
|--------|------|-----------|
| Lead Dev | Architecture, code complexe | 15-20% |
| Dev Senior | Développement, code review | 30-40% |
| Dev Junior | Intégration, code standard | 20-30% |
| UI/UX | Maquettes, design system | 15-20% |
| CDP | Coordination, suivi | 10-15% |

## Template Estimation

```markdown
# Estimation - [Projet]

## Synthèse

| Métrique | Min | Max |
|----------|-----|-----|
| **Charge totale** | XX JH | YY JH |
| **Durée estimée** | X sem | Y sem |
| **Budget indicatif** | X€ | Y€ |

## Répartition par Profil

| Profil | JH Min | JH Max | % |
|--------|--------|--------|---|
| Lead Dev | X | Y | X% |
| Dev Senior | X | Y | X% |
| Dev Junior | X | Y | X% |
| UI/UX | X | Y | X% |
| CDP | X | Y | X% |
| **Total** | **XX** | **YY** | 100% |

## Détail par Lot

### Lot 0 : Cadrage & Setup

| Tâche | T-shirt | JH Min | JH Max | Profil |
|-------|---------|--------|--------|--------|
| Kick-off | XS | 0.25 | 0.5 | CDP |
| Setup environnements | S | 0.5 | 1 | Lead Dev |
| Architecture | M | 1 | 2 | Lead Dev |

**Sous-total** : 1.75 - 3.5 JH

### Lot 1 : [Nom du Lot]

| Tâche | T-shirt | JH Min | JH Max | Profil |
|-------|---------|--------|--------|--------|
| [Tâche 1] | M | 1 | 2 | Dev Senior |
| [Tâche 2] | L | 2 | 4 | Dev Senior |

**Sous-total** : X - Y JH

### Lot N : Transverse

| Tâche | T-shirt | JH Min | JH Max | Profil |
|-------|---------|--------|--------|--------|
| Gestion projet (10%) | - | X | Y | CDP |
| Recette interne | M | 1 | 2 | Dev |
| Documentation | S | 0.5 | 1 | Dev |

**Sous-total** : X - Y JH

## Coefficients Appliqués

| Facteur | Coef | Justification |
|---------|------|---------------|
| Techno connue | x1.0 | Standard |
| Nouvelle techno | x1.3 | Apprentissage |
| Intégrations tierces | x1.2 | Complexité |
| Specs floues | x1.3 | Risque |

## Hypothèses

- Contenus fournis par le client
- Validations sous 48h
- Pas de changement de périmètre majeur
- Environnement de recette fourni

## Risques Identifiés

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Retard contenus | Moyenne | Élevé | Buffer prévu |
| Intégration API | Faible | Moyen | POC préalable |
```

## Répartition Type par Phase

| Phase | % Charge |
|-------|----------|
| Cadrage / Setup | 5-10% |
| Design | 15-20% |
| Développement | 45-55% |
| Tests / Recette | 15-20% |
| Gestion projet | 10-15% |

## Coefficients de Risque

| Contexte | Coefficient |
|----------|-------------|
| Projet similaire déjà fait | x1.0 |
| Nouvelle techno maîtrisée | x1.2 |
| Nouvelle techno à découvrir | x1.5 |
| Specs floues | x1.3 |
| Client exigeant | x1.2 |
| Intégrations tierces | +0.2 par intégration |

## Signaux d'Alerte

| Signal | Action |
|--------|--------|
| Total > 100 JH | Proposer du phasing |
| Écart min/max > x2 | Trop d'incertitude, clarifier |
| CDP < 10% | Risque de sous-staffing |
| Tests < 15% | Risque qualité |
| Buffer < 10% | Ajouter une marge |

## Checklist Avant-Projet

- [ ] Brief client compris et documenté
- [ ] Questions de clarification envoyées
- [ ] Périmètre découpé en lots
- [ ] Chiffrage avec fourchette min/max
- [ ] Hypothèses listées
- [ ] Risques identifiés
- [ ] Proposition rédigée
- [ ] Validation interne obtenue
