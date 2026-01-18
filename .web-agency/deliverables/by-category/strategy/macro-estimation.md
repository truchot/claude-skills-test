---
id: macro-estimation
name: Estimation Macro
version: 1.0.0
category: strategy
status: active
phase: "2-strategy"
order: 6
agents:
  - direction-technique/estimation/estimation-macro
  - project-management/planification/estimation
consumes:
  - requirements-list
  - stack-recommendation
  - technical-audit
produces_for:
  - direction-technique/estimation/estimation-detaillee
  - direction-technique/estimation/analyse-risques
  - project-management/avant-projet/brief
  - commercial-crm/negotiation/proposal-generator
tags: [estimation, macro, budget, planning, chiffrage]
---

# Estimation Macro

## Description

Chiffrage haut niveau d'un projet permettant de valider la faisabilité budgétaire et de cadrer les attentes avant l'engagement détaillé. Base pour la proposition commerciale et le go/no-go projet.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown + Spreadsheet |
| **Emplacement** | `projects/[client-slug]/02-strategy/macro-estimation.md` |
| **Nommage** | `macro-estimation.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Résumé** - Fourchette budget et délai
- [ ] **Périmètre estimé** - Ce qui est inclus/exclus
- [ ] **Méthode** - Comment l'estimation a été faite
- [ ] **Découpage macro** - Grandes phases ou lots
- [ ] **Estimation par lot** - Fourchette min/max
- [ ] **Hypothèses** - Conditions de validité
- [ ] **Réserves** - Marge de sécurité

### Sections Optionnelles

- [ ] **Comparaison** - Projets similaires passés
- [ ] **Scénarios** - MVP vs Full vs Deluxe
- [ ] **Répartition équipe** - Profils et charges
- [ ] **Planning macro** - Jalons principaux
- [ ] **Coûts récurrents** - Maintenance, hosting

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Fourchette | Écart max 40% entre min/max | Manuel | Oui |
| 2 | Couverture | 100% du scope In estimé | Manuel | Oui |
| 3 | Hypothèses | ≥3 hypothèses documentées | Manuel | Oui |
| 4 | Réserve | 10-20% de marge incluse | Manuel | Oui |
| 5 | Traçabilité | Lien vers requirements | Manuel | Non |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `client-intake/*` | `requirements-list` | Besoins à estimer |
| `direction-technique/*` | `stack-recommendation` | Choix techniques |
| `direction-technique/*` | `technical-audit` | Complexité existant |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Découpage lots | Direction technique | Ajuster granularité |
| 2 | Chiffrage | Lead Dev + Expert | Challenger estimations |
| 3 | Marge | Direction | Ajuster réserve |
| 4 | Validation | Commercial | Ajuster si hors budget client |

## Exemple

### Exemple Minimal

```markdown
# Estimation Macro - Projet E-commerce

## Résumé

| Métrique | Valeur |
|----------|--------|
| **Budget** | 15 000 € - 22 000 € HT |
| **Délai** | 3 - 4 mois |
| **Équipe** | 2-3 personnes |
| **Confiance** | 🟡 Moyenne (±30%) |

## Découpage

| Lot | Min | Max | % |
|-----|-----|-----|---|
| Design UX/UI | 2 500 € | 4 000 € | 18% |
| Développement | 9 000 € | 13 000 € | 59% |
| Intégration | 2 000 € | 3 000 € | 14% |
| Recette & MEP | 1 500 € | 2 000 € | 9% |
| **TOTAL** | **15 000 €** | **22 000 €** | 100% |

## Hypothèses

- Specs validées avant dev
- Contenus fournis par client
- Pas de migration données complexe

## Réserve

Marge de 15% incluse pour aléas.
```

### Exemple Complet

```markdown
---
projet: ecommerce-client-x
date: 2024-01-25
auteur: Thomas Bernard
version: 1.1
statut: validé
---

# Estimation Macro
## Projet E-commerce Client X

---

## 1. Résumé Exécutif

### Estimation Globale

| Métrique | Valeur | Confiance |
|----------|--------|-----------|
| **Budget estimé** | 18 000 € - 24 000 € HT | 🟡 ±25% |
| **Point médian** | 21 000 € HT | - |
| **Délai estimé** | 14 - 18 semaines | 🟡 ±20% |
| **Charge estimée** | 45 - 60 jours/homme | 🟡 ±25% |

### Répartition Visuelle

```
Budget par Phase
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cadrage       ████░░░░░░░░░░░░░░░░░░░░░░░  8%
Design        ████████░░░░░░░░░░░░░░░░░░░  18%
Développement ██████████████████████░░░░░  55%
Tests/Recette ██████░░░░░░░░░░░░░░░░░░░░░  12%
Déploiement   ███░░░░░░░░░░░░░░░░░░░░░░░░  7%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 2. Périmètre Estimé

### In Scope ✅

| Fonctionnalité | Complexité | Inclus |
|----------------|------------|--------|
| Site vitrine (5 pages) | Faible | ✅ |
| Catalogue produits (~50) | Moyenne | ✅ |
| Panier + Checkout | Moyenne | ✅ |
| Paiement Stripe | Faible | ✅ |
| Espace client | Moyenne | ✅ |
| Back-office produits | Moyenne | ✅ |
| Responsive design | Standard | ✅ |
| SEO de base | Faible | ✅ |

### Out of Scope ❌

| Fonctionnalité | Raison | Estimation si ajouté |
|----------------|--------|---------------------|
| Multi-langue | Hors budget initial | +4 000 € |
| App mobile | Complexité | +15 000 € |
| Marketplace | Hors scope | +20 000 € |
| Programme fidélité | V2 | +5 000 € |

---

## 3. Méthode d'Estimation

### Approche

| Méthode | Usage |
|---------|-------|
| **Analogie** | Comparaison avec 3 projets similaires |
| **Paramétrique** | Ratios j/h par type de fonctionnalité |
| **Expert** | Ajustement par expérience |

### Projets de Référence

| Projet | Budget | Délai | Similarité |
|--------|--------|-------|------------|
| E-commerce A (2023) | 19 500 € | 16 sem | 85% |
| E-commerce B (2023) | 24 000 € | 18 sem | 70% |
| E-commerce C (2022) | 16 000 € | 12 sem | 75% |
| **Moyenne ajustée** | **21 000 €** | **15 sem** | - |

### Ratios Utilisés

| Type | Ratio | Source |
|------|-------|--------|
| Page simple | 0.5 j/h | Historique |
| Page complexe | 1.5 j/h | Historique |
| Fonctionnalité standard | 2-3 j/h | Historique |
| Fonctionnalité complexe | 5-8 j/h | Historique |
| Intégration API | 1-2 j/h | Historique |

---

## 4. Découpage et Estimation par Lot

### Vue d'Ensemble

| # | Lot | J/H Min | J/H Max | € Min | € Max | % |
|---|-----|---------|---------|-------|-------|---|
| 1 | Cadrage & Specs | 3 | 4 | 1 200 € | 1 600 € | 7% |
| 2 | Design UX/UI | 6 | 9 | 2 400 € | 3 600 € | 14% |
| 3 | Développement Frontend | 12 | 16 | 4 800 € | 6 400 € | 27% |
| 4 | Développement Backend | 10 | 14 | 4 000 € | 5 600 € | 23% |
| 5 | Intégration & API | 4 | 6 | 1 600 € | 2 400 € | 10% |
| 6 | Tests & Recette | 5 | 7 | 2 000 € | 2 800 € | 11% |
| 7 | Déploiement & MEP | 2 | 3 | 800 € | 1 200 € | 5% |
| 8 | **Réserve (15%)** | - | - | 2 200 € | 3 400 € | 3% |
| | **TOTAL** | **42** | **59** | **19 000 €** | **27 000 €** | 100% |

### Détail par Lot

#### Lot 1 : Cadrage & Specs (3-4 j/h)

| Tâche | Min | Max |
|-------|-----|-----|
| Kick-off & brief | 0.5 | 0.5 |
| Specs fonctionnelles | 1.5 | 2 |
| Specs techniques | 1 | 1.5 |

#### Lot 2 : Design UX/UI (6-9 j/h)

| Tâche | Min | Max |
|-------|-----|-----|
| Wireframes | 2 | 3 |
| Maquettes desktop | 2.5 | 3.5 |
| Maquettes mobile | 1.5 | 2.5 |

#### Lot 3 : Développement Frontend (12-16 j/h)

| Tâche | Min | Max |
|-------|-----|-----|
| Setup projet Next.js | 0.5 | 1 |
| Pages vitrine (5) | 2.5 | 4 |
| Catalogue produits | 3 | 4 |
| Panier & Checkout | 3 | 4 |
| Espace client | 2 | 2.5 |
| Responsive & polish | 1 | 1.5 |

#### Lot 4 : Développement Backend (10-14 j/h)

| Tâche | Min | Max |
|-------|-----|-----|
| Setup API tRPC | 1 | 1.5 |
| Modèle données Prisma | 1.5 | 2 |
| API Produits | 2 | 3 |
| API Commandes | 2.5 | 3.5 |
| API Users | 1.5 | 2 |
| Auth & sécurité | 1.5 | 2 |

#### Lot 5 : Intégration & API (4-6 j/h)

| Tâche | Min | Max |
|-------|-----|-----|
| Intégration Stripe | 1.5 | 2 |
| Emails transactionnels | 1 | 1.5 |
| Analytics | 0.5 | 1 |
| SEO technique | 1 | 1.5 |

#### Lot 6 : Tests & Recette (5-7 j/h)

| Tâche | Min | Max |
|-------|-----|-----|
| Tests unitaires | 1.5 | 2 |
| Tests E2E critiques | 1.5 | 2.5 |
| Recette interne | 1 | 1.5 |
| Corrections | 1 | 1 |

#### Lot 7 : Déploiement (2-3 j/h)

| Tâche | Min | Max |
|-------|-----|-----|
| Setup CI/CD | 0.5 | 1 |
| Config production | 0.5 | 1 |
| MEP & monitoring | 0.5 | 0.5 |
| Formation client | 0.5 | 0.5 |

---

## 5. Hypothèses de Validité

> ⚠️ Cette estimation est valide SI et SEULEMENT SI les hypothèses suivantes sont respectées.

| # | Hypothèse | Impact si non respectée |
|---|-----------|------------------------|
| H1 | Specs validées avant développement | +20% délai |
| H2 | Contenus (textes, images) fournis par client | +5-10 j/h |
| H3 | Maquettes validées en 2 itérations max | +3-5 j/h par itération |
| H4 | Pas de migration de données complexe | +5-15 j/h |
| H5 | Stack technique validée (Next.js + Stripe) | Re-estimation si changement |
| H6 | Un seul interlocuteur décisionnaire côté client | +10% délai |
| H7 | Disponibilité équipe : 80% | Décalage planning |

---

## 6. Scénarios

### Scénario A : MVP (Minimum Viable)

| Métrique | Valeur |
|----------|--------|
| Budget | 15 000 € |
| Délai | 10 semaines |
| Scope | Vitrine + Catalogue + Panier simple |

**Exclus du MVP :**
- Espace client avancé
- Gestion stocks
- Multi-paiement

### Scénario B : Standard (Recommandé) ⭐

| Métrique | Valeur |
|----------|--------|
| Budget | 21 000 € |
| Délai | 14 semaines |
| Scope | Complet tel que défini |

### Scénario C : Premium

| Métrique | Valeur |
|----------|--------|
| Budget | 32 000 € |
| Délai | 20 semaines |
| Scope | Standard + Multi-langue + Programme fidélité |

---

## 7. Planning Macro

```
Sem 1-2    Sem 3-6    Sem 7-12        Sem 13-14   Sem 15-16
|----------|----------|---------------|-----------|---------|
[CADRAGE  ][  DESIGN ][DÉVELOPPEMENT ][ TESTS    ][ MEP   ]

Jalons:
• S2  : Specs validées
• S6  : Maquettes validées
• S12 : Code complete
• S14 : Recette terminée
• S16 : Go-live
```

---

## 8. Équipe Prévisionnelle

| Profil | Charge | Période |
|--------|--------|---------|
| Chef de projet | 5 j/h | Fil rouge |
| UX/UI Designer | 8 j/h | S3-S6 |
| Dev Fullstack Senior | 25 j/h | S7-S14 |
| Dev Fullstack Junior | 15 j/h | S8-S13 |
| DevOps | 2 j/h | S14-S16 |

---

## 9. Risques sur l'Estimation

| Risque | Probabilité | Impact budget | Mitigation |
|--------|-------------|---------------|------------|
| Scope creep | Haute | +15-30% | Cadrage strict, avenant |
| Retard contenus client | Haute | +10% délai | Deadline ferme, placeholder |
| Complexité imprévue | Moyenne | +10-20% | Réserve 15% |
| Indispo ressources | Faible | +20% délai | Planning souple |

---

## 10. Réserve et Ajustements

| Type | % | Montant |
|------|---|---------|
| Réserve technique | 10% | ~2 000 € |
| Réserve projet | 5% | ~1 000 € |
| **Total réserve** | **15%** | **~3 000 €** |

> La réserve couvre les aléas normaux. Les changements de scope majeurs feront l'objet d'avenants.

---

## 11. Conditions de Révision

Cette estimation sera révisée si :

- [ ] Changement de scope significatif (>20%)
- [ ] Changement de stack technique
- [ ] Découverte de complexité majeure en phase de specs
- [ ] Délai >3 mois entre estimation et démarrage

---

## 12. Validation

| Validateur | Date | Statut | Commentaire |
|------------|------|--------|-------------|
| Direction Technique | 25/01 | ✅ | - |
| Commercial | 26/01 | ✅ | Ajusté pour marge |
| Direction | 27/01 | ✅ | Go pour proposition |
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Estimation unique | Fausse précision | Toujours fourchette min/max |
| Sans hypothèses | Non défendable si dérive | Documenter les conditions |
| Sans réserve | Budget dépassé garanti | Toujours 10-20% de marge |
| Copier-coller | Chaque projet est unique | Adapter au contexte |
| Estimation figée | Ne s'adapte pas | Prévoir conditions de révision |

## Références

- [Software Estimation: Demystifying the Black Art](https://www.amazon.com/Software-Estimation-Demystifying-Developer-Practices/dp/0735605351)
- Planning Poker, T-Shirt Sizing
- Livrables liés : `requirements-list`, `detailed-estimation`, `risk-matrix`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | direction-technique | Création initiale |
