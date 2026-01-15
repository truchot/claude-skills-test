---
id: risk-matrix
name: Matrice des Risques
version: 1.0.0
category: strategy
status: active
phase: "2-strategy"
order: 7
agents:
  - direction-technique/estimation/analyse-risques
  - project-management/planification/risk-manager
consumes:
  - requirements-list
  - technical-audit
  - macro-estimation
  - stack-recommendation
produces_for:
  - project-management/avant-projet/brief
  - direction-technique/estimation/estimation-detaillee
  - project-management/execution/suivi-risques
tags: [risque, analyse, mitigation, contingence, projet]
---

# Matrice des Risques

## Description

Identification, évaluation et plan de mitigation des risques projet. Document vivant mis à jour tout au long du projet pour anticiper et gérer les aléas.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown |
| **Emplacement** | `projects/[client-slug]/02-strategy/risk-matrix.md` |
| **Nommage** | `risk-matrix.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Résumé** - Vue synthétique des risques critiques
- [ ] **Méthodologie** - Comment les risques sont évalués
- [ ] **Registre des risques** - Liste complète avec scoring
- [ ] **Top 5 risques** - Focus sur les plus critiques
- [ ] **Plan de mitigation** - Actions préventives
- [ ] **Plan de contingence** - Actions si risque se réalise

### Sections Optionnelles

- [ ] **Historique** - Évolution des risques
- [ ] **Risques réalisés** - Post-mortem
- [ ] **Opportunités** - Risques positifs
- [ ] **Matrice visuelle** - Graphique probabilité/impact

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Exhaustivité | ≥10 risques identifiés | Manuel | Oui |
| 2 | Scoring cohérent | Probabilité × Impact | Manuel | Oui |
| 3 | Actions définies | Chaque risque critique a un plan | Manuel | Oui |
| 4 | Responsables | Chaque action a un owner | Manuel | Oui |
| 5 | Mise à jour | Revue mensuelle minimum | Manuel | Non |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `direction-technique/*` | `technical-audit` | Risques techniques |
| `direction-technique/*` | `macro-estimation` | Risques planning/budget |
| `direction-technique/*` | `stack-recommendation` | Risques techno |
| `client-intake/*` | `requirements-list` | Risques fonctionnels |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Identification | Équipe projet | Brainstorm complémentaire |
| 2 | Scoring | Direction technique | Challenger évaluations |
| 3 | Plans | Chef de projet | Valider faisabilité |
| 4 | Revue périodique | Comité projet | Mettre à jour |

## Exemple

### Exemple Minimal

```markdown
# Matrice des Risques - Projet E-commerce

## Résumé

| Criticité | Nombre | Action |
|-----------|--------|--------|
| 🔴 Critique | 2 | Mitigation immédiate |
| 🟠 Haute | 3 | Plan défini |
| 🟡 Moyenne | 4 | Surveillance |
| 🟢 Faible | 3 | Accepté |

## Top 5 Risques

| # | Risque | P | I | Score | Statut |
|---|--------|---|---|-------|--------|
| R1 | Retard contenus client | 4 | 4 | 16 | 🔴 |
| R2 | Scope creep | 3 | 4 | 12 | 🟠 |
| R3 | Bug paiement Stripe | 2 | 5 | 10 | 🟠 |
| R4 | Indispo dev senior | 2 | 4 | 8 | 🟡 |
| R5 | Performance insuffisante | 2 | 3 | 6 | 🟡 |

## Mitigation R1 : Retard contenus

**Prévention :**
- Deadline contenus S-2 avant intégration
- Relances automatiques

**Contingence :**
- Contenus placeholder
- Décalage planning
```

### Exemple Complet

```markdown
---
projet: ecommerce-client-x
date_creation: 2024-01-25
derniere_maj: 2024-02-15
auteur: Marie Martin
version: 1.2
---

# Matrice des Risques
## Projet E-commerce Client X

---

## 1. Résumé Exécutif

### Vue d'Ensemble

```
Répartition des Risques par Criticité
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 Critique (12-25)  ██████░░░░░░░░░░░░░░  15% (2)
🟠 Haute (8-11)      ████████████░░░░░░░░  31% (4)
🟡 Moyenne (4-7)     ████████████████░░░░  38% (5)
🟢 Faible (1-3)      ████░░░░░░░░░░░░░░░░  15% (2)

Total: 13 risques identifiés
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### KPIs Risques

| Métrique | Valeur | Tendance |
|----------|--------|----------|
| Risques critiques | 2 | → Stable |
| Risques actifs | 11 | ↓ -1 |
| Risques mitigés | 2 | ↑ +1 |
| Score risque moyen | 7.2 | → Stable |

---

## 2. Méthodologie

### Échelle de Probabilité (P)

| Score | Niveau | Description | Fréquence |
|-------|--------|-------------|-----------|
| 1 | Rare | Très peu probable | <5% |
| 2 | Peu probable | Possible mais rare | 5-20% |
| 3 | Possible | Peut arriver | 20-50% |
| 4 | Probable | Arrivera probablement | 50-80% |
| 5 | Quasi-certain | Arrivera | >80% |

### Échelle d'Impact (I)

| Score | Niveau | Budget | Délai | Qualité |
|-------|--------|--------|-------|---------|
| 1 | Négligeable | <2% | <1 sem | Mineur |
| 2 | Mineur | 2-5% | 1-2 sem | Dégradé acceptable |
| 3 | Modéré | 5-10% | 2-4 sem | Fonctionnalité réduite |
| 4 | Majeur | 10-20% | 1-2 mois | Objectif compromis |
| 5 | Catastrophique | >20% | >2 mois | Échec projet |

### Calcul du Score

```
Score = Probabilité × Impact

Criticité :
• 🔴 Critique : 12-25
• 🟠 Haute    : 8-11
• 🟡 Moyenne  : 4-7
• 🟢 Faible   : 1-3
```

### Matrice Visuelle

```
        Impact →
    P   1    2    3    4    5
    r ┌────┬────┬────┬────┬────┐
    o │    │    │    │    │    │
    b 5│ 5  │ 10 │ 15 │ 20 │ 25 │
    a │    │    │ 🟠 │ 🔴 │ 🔴 │
    b ├────┼────┼────┼────┼────┤
    i │    │    │    │    │    │
    l 4│ 4  │ 8  │ 12 │ 16 │ 20 │
    i │    │ 🟡 │ 🟠 │ 🔴 │ 🔴 │
    t ├────┼────┼────┼────┼────┤
    é │    │    │    │    │    │
      3│ 3  │ 6  │ 9  │ 12 │ 15 │
    ↓ │    │ 🟡 │ 🟡 │ 🟠 │ 🟠 │
      ├────┼────┼────┼────┼────┤
      │    │    │    │    │    │
     2│ 2  │ 4  │ 6  │ 8  │ 10 │
      │    │ 🟢 │ 🟡 │ 🟡 │ 🟠 │
      ├────┼────┼────┼────┼────┤
      │    │    │    │    │    │
     1│ 1  │ 2  │ 3  │ 4  │ 5  │
      │ 🟢 │ 🟢 │ 🟢 │ 🟢 │ 🟡 │
      └────┴────┴────┴────┴────┘
```

---

## 3. Registre des Risques

### Vue Complète

| ID | Catégorie | Risque | P | I | Score | Owner | Statut |
|----|-----------|--------|---|---|-------|-------|--------|
| R01 | Client | Retard fourniture contenus | 4 | 4 | 16 | CDP | 🔴 Actif |
| R02 | Scope | Changements de périmètre | 4 | 3 | 12 | CDP | 🔴 Actif |
| R03 | Tech | Bug critique paiement | 2 | 5 | 10 | Lead Dev | 🟠 Actif |
| R04 | Équipe | Indisponibilité dev senior | 2 | 4 | 8 | CDP | 🟠 Actif |
| R05 | Tech | Performance insuffisante | 3 | 3 | 9 | Lead Dev | 🟠 Actif |
| R06 | Tech | Faille de sécurité | 2 | 4 | 8 | Lead Dev | 🟠 Actif |
| R07 | Planning | Retard phase design | 3 | 2 | 6 | Designer | 🟡 Actif |
| R08 | Client | Validation lente | 3 | 2 | 6 | CDP | 🟡 Actif |
| R09 | Tech | Incompatibilité navigateurs | 2 | 3 | 6 | Dev Front | 🟡 Actif |
| R10 | Externe | Indispo API Stripe | 1 | 5 | 5 | Lead Dev | 🟡 Actif |
| R11 | Budget | Dépassement budget | 2 | 3 | 6 | CDP | 🟡 Actif |
| R12 | Tech | Régression après MEP | 2 | 2 | 4 | QA | 🟢 Mitigé |
| R13 | Externe | Changement pricing Vercel | 1 | 2 | 2 | DevOps | 🟢 Accepté |

---

## 4. Top 5 Risques Critiques

### R01 - Retard Fourniture Contenus Client 🔴

| Attribut | Valeur |
|----------|--------|
| **Score** | 16 (P4 × I4) |
| **Catégorie** | Client |
| **Owner** | Chef de projet |
| **Statut** | Actif |

**Description :**
Le client n'a pas encore fourni les contenus (textes, images produits) et l'historique montre des retards fréquents.

**Impacts potentiels :**
- Décalage planning de 2-4 semaines
- Surcoût dev (contenus placeholder, double intégration)
- Frustration équipe

**Plan de Mitigation (Prévention) :**

| Action | Responsable | Deadline | Statut |
|--------|-------------|----------|--------|
| Définir liste contenus requis | CDP | S1 | ✅ Fait |
| Envoyer template contenus | CDP | S2 | ✅ Fait |
| Deadline contenus S-2 avant intégration | CDP | Continu | 🔄 En cours |
| Relances hebdo automatisées | CDP | Continu | 🔄 En cours |
| Prévoir contenus placeholder | Designer | S3 | ⏳ À faire |

**Plan de Contingence (Si réalisé) :**

| Scénario | Action | Impact |
|----------|--------|--------|
| Retard <2 sem | Placeholder + intégration tardive | +5% coût |
| Retard 2-4 sem | Livraison sans contenus finaux | +10% coût, MVP dégradé |
| Retard >4 sem | Report MEP | Négociation client |

**Indicateurs de surveillance :**
- % contenus reçus vs attendus
- Délai moyen de réponse client

---

### R02 - Changements de Périmètre (Scope Creep) 🔴

| Attribut | Valeur |
|----------|--------|
| **Score** | 12 (P4 × I3) |
| **Catégorie** | Scope |
| **Owner** | Chef de projet |

**Description :**
Demandes d'ajouts ou modifications fonctionnelles en cours de projet, non prévues initialement.

**Plan de Mitigation :**

| Action | Responsable | Deadline |
|--------|-------------|----------|
| Cadrage strict avec liste In/Out signée | CDP | S2 |
| Process de change request formalisé | CDP | S2 |
| Réunion hebdo pour identifier dérives | CDP | Continu |

**Plan de Contingence :**

| Scénario | Action |
|----------|--------|
| Demande mineure (<2j) | Absorption si marge disponible |
| Demande moyenne (2-5j) | Avenant + décalage planning |
| Demande majeure (>5j) | Go/No-go avec direction |

---

### R03 - Bug Critique Paiement Stripe 🟠

| Attribut | Valeur |
|----------|--------|
| **Score** | 10 (P2 × I5) |
| **Catégorie** | Technique |
| **Owner** | Lead Dev |

**Description :**
Un bug dans l'intégration Stripe empêcherait les transactions.

**Plan de Mitigation :**

| Action | Responsable | Deadline |
|--------|-------------|----------|
| Tests E2E parcours paiement | QA | S12 |
| Environnement de test Stripe | Dev | S8 |
| Monitoring transactions temps réel | DevOps | MEP |

**Plan de Contingence :**

| Scénario | Action |
|----------|--------|
| Bug détecté en recette | Correctif prioritaire |
| Bug détecté en prod | Rollback + hotfix 24h |

---

### R04 - Indisponibilité Dev Senior 🟠

| Attribut | Valeur |
|----------|--------|
| **Score** | 8 (P2 × I4) |
| **Catégorie** | Équipe |
| **Owner** | Chef de projet |

**Plan de Mitigation :**

| Action | Responsable |
|--------|-------------|
| Documentation code continue | Lead Dev |
| Pair programming | Équipe |
| Backup identifié | Direction |

---

### R05 - Performance Insuffisante 🟠

| Attribut | Valeur |
|----------|--------|
| **Score** | 9 (P3 × I3) |
| **Catégorie** | Technique |
| **Owner** | Lead Dev |

**Plan de Mitigation :**

| Action | Responsable |
|--------|-------------|
| Budget performance défini (LCP <2.5s) | Lead Dev |
| Tests Lighthouse en CI | DevOps |
| Optimisation images automatique | Dev |

---

## 5. Suivi et Évolution

### Historique des Modifications

| Date | Risque | Changement | Auteur |
|------|--------|------------|--------|
| 25/01 | - | Création initiale | Marie |
| 01/02 | R12 | P 3→2 (tests E2E en place) | Thomas |
| 15/02 | R07 | Clôturé (design validé) | Sophie |

### Prochaine Revue

- **Date** : 01/03/2024
- **Participants** : CDP, Lead Dev, Direction
- **Focus** : R01 (contenus), R02 (scope)

---

## 6. Annexes

### Catégories de Risques

| Catégorie | Description | Exemples |
|-----------|-------------|----------|
| Client | Liés au client | Contenus, validations, paiements |
| Scope | Liés au périmètre | Changements, ambiguïtés |
| Tech | Liés à la technique | Bugs, performance, sécurité |
| Équipe | Liés aux ressources | Dispo, compétences |
| Planning | Liés aux délais | Retards, dépendances |
| Budget | Liés aux coûts | Dépassements |
| Externe | Liés aux tiers | API, prestataires |

### Template Fiche Risque

```markdown
### RXX - [Nom du Risque]

| Attribut | Valeur |
|----------|--------|
| **Score** | X (PX × IX) |
| **Catégorie** | [Cat] |
| **Owner** | [Nom] |
| **Statut** | [Actif/Mitigé/Clôturé] |

**Description :**
[Description du risque]

**Plan de Mitigation :**
- [ ] Action 1
- [ ] Action 2

**Plan de Contingence :**
- Si [scénario] → [action]
```
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Liste figée | Les risques évoluent | Revue régulière |
| Pas d'owner | Personne n'agit | Toujours un responsable |
| Scoring arbitraire | Non comparable | Utiliser grille définie |
| Mitigation floue | Non actionnable | Actions SMART |
| Trop de risques | Paralysie | Focus sur top 5-10 |

## Références

- [PMBOK Risk Management](https://www.pmi.org/)
- [ISO 31000 Risk Management](https://www.iso.org/iso-31000-risk-management.html)
- Livrables liés : `technical-audit`, `macro-estimation`, `project-brief`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | direction-technique | Création initiale |
