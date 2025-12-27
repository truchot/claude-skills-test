---
name: estimation-macro
description: Estimation de haut niveau pour l'avant-vente et le cadrage
---

# Estimation Macro

Tu fournis des **estimations de haut niveau** pour les phases d'avant-vente et de cadrage initial.

## Contexte

Intervient pour :
- Donner un ordre de grandeur budgétaire
- Permettre des décisions Go/No-Go
- Cadrer les attentes client
- Alimenter les propositions commerciales

## Entrées Requises

| Information | Source | Obligatoire |
|-------------|--------|-------------|
| Brief fonctionnel | `project-management/avant-projet/formalisation-brief` | Oui |
| Liste des fonctionnalités | Brief ou `specification/cadrage-technique` | Oui |
| Stack envisagée | `avant-projet/selection-stack` | Recommandé |

## Méthode d'Estimation Macro

### 1. Catégorisation des Fonctionnalités

```
Fonctionnalité
│
├─ T-Shirt Size
│  ├─ XS : 1-2 jours
│  ├─ S  : 3-5 jours
│  ├─ M  : 5-10 jours
│  ├─ L  : 10-20 jours
│  └─ XL : 20-40 jours
│
└─ Complexité
   ├─ Simple  : CRUD, UI standard
   ├─ Moyenne : Logique métier, intégrations
   └─ Complexe : Algo, temps réel, scale
```

### 2. Référentiels par Type de Projet

#### Sites Web

| Type | Fourchette | Inclut |
|------|------------|--------|
| Site vitrine (5-10 pages) | 10-20 j | Design, intégration, CMS |
| Site corporate (15-30 pages) | 20-40 j | + Formulaires, multilingue |
| Blog / média | 15-30 j | + SEO, catégories, search |
| E-commerce simple | 30-50 j | + Panier, paiement, compte |
| E-commerce avancé | 50-100 j | + Stock, multi-vendeurs |

#### Applications Web

| Type | Fourchette | Inclut |
|------|------------|--------|
| MVP / POC | 20-40 j | Core features only |
| App simple (CRUD) | 40-80 j | Auth, dashboard, CRUD |
| App métier moyenne | 80-150 j | + Workflows, rapports |
| App complexe / SaaS | 150-300 j | + Multi-tenant, billing |

#### WordPress

| Type | Fourchette | Inclut |
|------|------------|--------|
| Theme block simple | 10-15 j | Home, pages, blog |
| Theme block avancé | 20-40 j | + CPT, patterns custom |
| Plugin simple | 5-15 j | Feature unique |
| Plugin complexe | 20-50 j | + Gutenberg blocks, API |

### 3. Coefficients d'Ajustement

| Facteur | Coefficient | Application |
|---------|-------------|-------------|
| Stack maîtrisée | x0.8 | Équipe expérimentée |
| Stack nouvelle | x1.3 | Temps d'apprentissage |
| Contraintes fortes (perf, sécu) | x1.2 | Effort supplémentaire |
| Intégrations multiples | x1.2 | Par intégration majeure |
| Multi-langue | x1.15 | Par langue après la 1ère |
| Délai serré | x1.1 | Moins d'optimisation |
| Équipe distribuée | x1.1 | Coordination |

### 4. Calcul du Total

```
Total = Σ(Fonctionnalités × Taille) × Coeff_Stack × Coeff_Contraintes

Buffer = Total × 20% (minimum)

Estimation = Total + Buffer

Fourchette = [Estimation × 0.8 ; Estimation × 1.3]
```

## Sortie : Estimation Macro

```markdown
# Estimation Macro

## Projet : [Nom]
## Date : [Date]
## Type : Avant-vente / Cadrage

---

## 1. Périmètre

### Description
[Résumé du projet en 2-3 phrases]

### Fonctionnalités Principales
| ID | Fonctionnalité | Taille | Jours |
|----|----------------|--------|-------|
| F1 | [Nom] | M | 8 |
| F2 | [Nom] | S | 4 |
| F3 | [Nom] | L | 15 |
| ... | | | |
| **Sous-total** | | | **X j** |

---

## 2. Éléments Transverses

| Élément | Jours |
|---------|-------|
| Setup projet | X |
| CI/CD | X |
| Tests | X |
| Documentation | X |
| Recette | X |
| **Sous-total** | **X j** |

---

## 3. Coefficients Appliqués

| Facteur | Coefficient | Justification |
|---------|-------------|---------------|
| [Facteur 1] | x1.X | [Raison] |
| [Facteur 2] | x1.X | [Raison] |
| **Coefficient global** | **x1.XX** | |

---

## 4. Synthèse

| Métrique | Valeur |
|----------|--------|
| Sous-total fonctionnalités | X j |
| Sous-total transverse | X j |
| **Total brut** | **X j** |
| Coefficient | x1.XX |
| **Total ajusté** | **X j** |
| Buffer (20%) | X j |
| **Total avec buffer** | **X j** |

### Fourchette

| Scénario | Jours | Budget (à XXX€/j) |
|----------|-------|-------------------|
| Optimiste (-20%) | X j | XX XXX € |
| **Réaliste** | **X j** | **XX XXX €** |
| Pessimiste (+30%) | X j | XX XXX € |

---

## 5. Hypothèses

1. [Hypothèse 1]
2. [Hypothèse 2]
3. [Hypothèse 3]

## 6. Exclusions

- [Ce qui n'est pas inclus 1]
- [Ce qui n'est pas inclus 2]

## 7. Risques Impactant l'Estimation

| Risque | Impact si réalisé |
|--------|-------------------|
| [Risque 1] | +X jours |
| [Risque 2] | +X jours |

---

## 8. Prochaines Étapes

- [ ] Validation du périmètre
- [ ] Si Go : estimation détaillée → `estimation-detaillee`
- [ ] Analyse des risques → `analyse-risques`

---

## Notes

- Précision : ± 30-50%
- Cette estimation est indicative et sera affinée après cadrage
- Basée sur l'expérience de projets similaires
```

## Comparaison avec Projets Similaires

### Base de Référence

| Projet type | Réalisé | Écart |
|-------------|---------|-------|
| [Projet A] | X j | Conforme |
| [Projet B] | X j | +20% (nouveau framework) |

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Périmètre flou | Demander clarification avant estimation |
| Estimation > 100 j | Validation direction + découpage phases |
| Techno inconnue | Ajouter facteur + recommander POC |
| Client conteste | Détailler et comparer à des références |
