# Workflow de Chiffrage

> Process d'estimation : du cahier des charges au devis chiffré.

---

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                    PROCESS DE CHIFFRAGE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ENTRÉE: Cahier des charges validé                              │
│                                                                 │
│  1. DÉCOUPAGE         Fonctionnalités → Lots → Tâches           │
│       │                                                         │
│       ▼                                                         │
│  2. ESTIMATION        Tâches → Jours/Homme                      │
│       │                                                         │
│       ▼                                                         │
│  3. PLANIFICATION     Jalons + Ressources + Dépendances         │
│       │                                                         │
│       ▼                                                         │
│  4. RISQUES           Identification + Provisions               │
│       │                                                         │
│       ▼                                                         │
│  5. SYNTHÈSE          Budget total + Planning                   │
│                                                                 │
│  SORTIE: Chiffrage prêt pour le devis                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Étape 1 : Découpage

### 1.1 Identifier les Lots

Regrouper les fonctionnalités du cahier des charges en lots cohérents.

| Lot | Fonctionnalités incluses | Type |
|-----|-------------------------|------|
| **Lot 0 - Cadrage** | Specs détaillées, réunions | Fixe |
| **Lot 1 - Conception** | UX, maquettes, validation | Variable |
| **Lot 2 - Développement** | Front, back, intégrations | Variable |
| **Lot 3 - Contenu** | Saisie, médias, SEO | Variable |
| **Lot 4 - Recette** | Tests, corrections | Variable |
| **Lot 5 - Mise en ligne** | Déploiement, formation | Fixe |

### 1.2 Décomposer en Tâches

Pour chaque lot, lister les tâches élémentaires.

**Règle** : Une tâche = 0.25 à 3 jours max. Si plus, découper.

```markdown
## Lot 2 - Développement

### 2.1 Setup projet
- [ ] Initialisation repo Git (0.25j)
- [ ] Configuration environnement dev (0.5j)
- [ ] Mise en place CI/CD (0.5j)

### 2.2 Module [Nom]
- [ ] [Tâche 1] (Xj)
- [ ] [Tâche 2] (Xj)
...
```

---

## Étape 2 : Estimation

### 2.1 Méthode d'Estimation

Utiliser l'estimation en **3 points** pour les tâches incertaines :

| Point | Description |
|-------|-------------|
| **O** (Optimiste) | Si tout se passe parfaitement |
| **P** (Pessimiste) | Si problèmes rencontrés |
| **M** (Moyen/Probable) | Cas le plus probable |

**Formule** : `Estimation = (O + 4×M + P) / 6`

### 2.2 Grille de Référence

| Type de tâche | Fourchette typique |
|---------------|-------------------|
| Page statique simple | 0.25 - 0.5 j |
| Page avec formulaire | 0.5 - 1 j |
| Module CRUD simple | 1 - 2 j |
| Intégration API tierce | 1 - 3 j |
| Fonctionnalité complexe | 2 - 5 j |
| Module e-commerce (panier) | 3 - 5 j |
| Module paiement | 2 - 4 j |
| Authentification custom | 2 - 3 j |

### 2.3 Coefficients par Profil

| Profil | TJM indicatif | Coefficient |
|--------|---------------|-------------|
| Chef de projet | [XXX] € | 1.0 |
| UX Designer | [XXX] € | 1.0 |
| UI Designer | [XXX] € | 1.0 |
| Dev Senior | [XXX] € | 1.0 |
| Dev Junior | [XXX] € | 0.7 (mais +30% temps) |

### 2.4 Tableau d'Estimation

| Lot | Tâche | Profil | O | M | P | Estimé | Montant |
|-----|-------|--------|---|---|---|--------|---------|
| 0 | Cadrage | CDP | 1 | 1.5 | 2 | 1.5 | |
| 1 | Wireframes | UX | 2 | 3 | 5 | 3.2 | |
| 1 | Maquettes | UI | 3 | 5 | 8 | 5.2 | |
| 2 | Setup | Dev | 0.5 | 1 | 1.5 | 1 | |
| ... | | | | | | | |
| | **TOTAL** | | | | | **XX j** | **XX €** |

---

## Étape 3 : Planification

### 3.1 Séquencement des Lots

```
Semaine 1-2     Semaine 3-4     Semaine 5-8     Semaine 9      Semaine 10
────────────────────────────────────────────────────────────────────────────
[Cadrage   ]
            [Conception    ]
                            [Développement              ]
                                            [Recette   ]
                                                        [Mise en ligne]
```

### 3.2 Identifier les Dépendances

| Tâche | Dépend de | Bloque |
|-------|-----------|--------|
| Maquettes | Wireframes validés | Intégration |
| Développement back | Specs validées | Tests |
| Intégration front | Maquettes validées | - |
| Mise en ligne | Recette validée | - |
| Formation | Site en production | - |

### 3.3 Allocation Ressources

| Semaine | CDP | UX | UI | Dev 1 | Dev 2 |
|---------|-----|----|----|-------|-------|
| S1 | 50% | - | - | - | - |
| S2 | 20% | 100% | - | - | - |
| S3 | 10% | 50% | 100% | - | - |
| S4 | 10% | - | 50% | 100% | - |
| S5-S8 | 10% | - | - | 100% | 100% |
| S9 | 20% | - | - | 50% | 50% |
| S10 | 50% | - | - | 20% | - |

### 3.4 Jalons Client

| Jalon | Date prévue | Validation requise | Délai réponse |
|-------|-------------|-------------------|---------------|
| J1 - Specs validées | S2 | ☐ Client | 3 jours |
| J2 - Wireframes validés | S3 | ☐ Client | 3 jours |
| J3 - Maquettes validées | S4 | ☐ Client | 5 jours |
| J4 - Recette validée | S9 | ☐ Client | 5 jours |
| J5 - Mise en ligne | S10 | ☐ Client | Go/NoGo |

---

## Étape 4 : Analyse des Risques

### 4.1 Identification

| # | Risque | Probabilité | Impact | Score |
|---|--------|-------------|--------|-------|
| R1 | Retard validation client | Élevée | Moyen | 6 |
| R2 | Contenus non fournis à temps | Élevée | Élevé | 9 |
| R3 | Changement de périmètre | Moyenne | Élevé | 6 |
| R4 | Problème technique imprévu | Faible | Élevé | 4 |
| R5 | Indisponibilité ressource | Faible | Moyen | 2 |

**Score** = Probabilité (1-3) × Impact (1-3)

### 4.2 Mitigation

| Risque | Mitigation | Provision |
|--------|------------|-----------|
| R1 | Délais validation dans planning | +10% buffer |
| R2 | Clause pénalité retard contenus | - |
| R3 | Process avenant formalisé | +15% imprévus |
| R4 | Dev expérimenté, techno maîtrisée | Inclus dans estimation |

### 4.3 Provisions Recommandées

| Type de projet | Provision risque |
|----------------|-----------------|
| Projet cadré, techno connue | +10% |
| Projet standard | +15% |
| Nouveau client ou techno | +20% |
| Projet complexe/innovant | +25-30% |

---

## Étape 5 : Synthèse

### 5.1 Récapitulatif Budget

| Catégorie | Jours | Montant HT |
|-----------|-------|------------|
| Lot 0 - Cadrage | X j | X € |
| Lot 1 - Conception | X j | X € |
| Lot 2 - Développement | X j | X € |
| Lot 3 - Contenu | X j | X € |
| Lot 4 - Recette | X j | X € |
| Lot 5 - Mise en ligne | X j | X € |
| **Sous-total** | **XX j** | **XX € HT** |
| Provision risques (+X%) | X j | X € |
| **TOTAL** | **XX j** | **XX € HT** |

### 5.2 Options Chiffrées

| Option | Jours | Montant HT |
|--------|-------|------------|
| [Option 1] | X j | X € |
| [Option 2] | X j | X € |

### 5.3 Planning Synthétique

```
Phase           Durée       Période
─────────────────────────────────────
Cadrage         1 sem       S1
Conception      2 sem       S2-S3
Développement   4 sem       S4-S7
Recette         1 sem       S8
Mise en ligne   1 sem       S9
─────────────────────────────────────
TOTAL           9 sem
```

### 5.4 Conditions de Paiement Recommandées

| Jalon | % | Montant | Déclencheur |
|-------|---|---------|-------------|
| Acompte | 30% | X € | Signature devis |
| Jalons intermédiaires | 40% | X € | Validation maquettes |
| Solde | 30% | X € | Mise en ligne |

---

## Template Fiche de Chiffrage

```markdown
# Fiche de Chiffrage - [Projet]

**Date** : [Date]
**Réalisé par** : [Nom]
**Validé par** : [Nom]

## Résumé

| Élément | Valeur |
|---------|--------|
| Durée totale | X semaines |
| Charge totale | X jours |
| Budget HT | X € |
| Provision risque | X% |

## Hypothèses

- [Hypothèse 1]
- [Hypothèse 2]
- [Hypothèse 3]

## Exclusions

- [Exclusion 1]
- [Exclusion 2]

## Prochaine étape

☐ Rédaction du devis
☐ Présentation client prévue le [Date]
```

---

## Checklist Avant Devis

- [ ] Cahier des charges signé
- [ ] Toutes les fonctionnalités estimées
- [ ] Dépendances identifiées
- [ ] Risques évalués et provisionnés
- [ ] Planning réaliste
- [ ] Jalons de paiement définis
- [ ] Validation interne du chiffrage
