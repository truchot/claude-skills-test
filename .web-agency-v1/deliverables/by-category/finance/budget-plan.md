---
id: budget-plan
name: Plan Budgétaire
version: 1.0.0
category: finance
status: active
phase: "2-strategy"
order: 2
agents:
  - finance-analytics/forecasting/budget-planner
  - finance-analytics/forecasting/revenue-forecaster
  - direction-operations/operations/resource-allocator
consumes:
  - project-brief
  - macro-estimation
  - commercial-proposal
produces_for:
  - project-management/*/all
  - direction-operations/*/all
  - finance-analytics/reporting/*
tags: [finance, budget, prévision, planification, coûts, trésorerie]
---

# Plan Budgétaire

## Description

Document de planification financière détaillant les prévisions de revenus, coûts et marges pour un projet ou une période donnée. Le plan budgétaire permet d'anticiper les besoins de trésorerie, de suivre la rentabilité et de prendre des décisions éclairées. Il sert de référence pour le suivi financier tout au long du projet ou de l'exercice.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown + Tableur (Excel/Sheets) |
| **Emplacement** | `/finance/budgets/` |
| **Nommage** | `budget-[projet]-[YYYY].md`, `budget-[YYYY-MM].xlsx` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Synthèse exécutive** - Chiffres clés et indicateurs principaux
- [ ] **Périmètre et hypothèses** - Scope et assumptions du budget
- [ ] **Prévision de revenus** - CA attendu par source/projet
- [ ] **Budget des charges** - Coûts directs et indirects
- [ ] **Plan de trésorerie** - Flux de cash prévisionnels
- [ ] **Analyse de rentabilité** - Marges et ratios clés
- [ ] **Risques budgétaires** - Scénarios et provisions

### Sections Optionnelles

- [ ] **Budget par département** - Ventilation par équipe
- [ ] **Comparaison N-1** - Évolution vs année précédente
- [ ] **Scénarios alternatifs** - Optimiste / Pessimiste
- [ ] **Plan d'investissement** - CAPEX prévu
- [ ] **Suivi vs réalisé** - Tableau de bord mensuel

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Cohérence des calculs | Tous les totaux justes | Auto | Oui |
| 2 | Couverture temporelle | 12 mois minimum | Manuel | Oui |
| 3 | Hypothèses documentées | Toutes listées | Manuel | Oui |
| 4 | Marges calculées | Par projet/activité | Auto | Oui |
| 5 | Plan de trésorerie | Mensuel minimum | Manuel | Oui |
| 6 | Risques identifiés | ≥ 3 risques majeurs | Manuel | Oui |
| 7 | Validation direction | Approuvé et signé | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `commercial-crm` | Pipeline commercial | Opportunités signées et prévues |
| `commercial-crm` | commercial-proposal | Devis en cours |
| `direction-technique` | macro-estimation | Estimations projets |
| Comptabilité | Historique N-1 | Données réelles année précédente |
| RH | Plan de recrutement | Effectifs prévus |
| Direction | Objectifs stratégiques | Cibles de croissance |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Hypothèses | Direction générale | Révision des assumptions |
| 2 | Budget consolidé | DAF / Direction financière | Arbitrages |
| 3 | Mensuel | Contrôle de gestion | Analyse des écarts |
| 4 | Trimestriel | Comité de direction | Révision budget |

## Exemple

### Exemple Minimal

```markdown
# Budget Projet XYZ - 2026

## Synthèse
- **Budget total :** 85 000 € HT
- **Marge prévisionnelle :** 35%
- **Durée :** 4 mois

## Revenus
| Jalon | Montant | Date prévue |
|-------|---------|-------------|
| Acompte 30% | 25 500 € | Janvier |
| Jalon 2 - 40% | 34 000 € | Mars |
| Solde 30% | 25 500 € | Mai |

## Coûts
| Poste | Montant |
|-------|---------|
| Salaires | 45 000 € |
| Sous-traitance | 8 000 € |
| Infra/licences | 2 000 € |
| **Total** | **55 000 €** |

## Marge
85 000 - 55 000 = **30 000 € (35%)**
```

### Exemple Complet

```markdown
# Plan Budgétaire 2026

**Entreprise :** [Notre Entreprise]
**Exercice :** 1er janvier 2026 - 31 décembre 2026
**Date de création :** 15 décembre 2025
**Version :** 1.2
**Statut :** Approuvé par le CODIR le 20/12/2025

---

## 1. Synthèse Exécutive

### Indicateurs Clés

| Indicateur | Budget 2026 | Réalisé 2025 | Évolution |
|------------|-------------|--------------|-----------|
| **Chiffre d'affaires** | 1 200 000 € | 950 000 € | +26% |
| **Charges d'exploitation** | 920 000 € | 760 000 € | +21% |
| **Résultat d'exploitation** | 280 000 € | 190 000 € | +47% |
| **Marge opérationnelle** | 23,3% | 20% | +3,3 pts |
| **Effectif moyen** | 12 ETP | 10 ETP | +2 |
| **CA par ETP** | 100 000 € | 95 000 € | +5% |

### Vue Graphique Annuelle

```
CA Mensuel Prévisionnel (k€)

120 │                              ████
110 │                         ████ ████
100 │                    ████ ████ ████ ████
 90 │               ████ ████ ████ ████ ████
 80 │          ████ ████ ████ ████ ████ ████
 70 │     ████ ████ ████ ████ ████ ████ ████
 60 │████ ████ ████ ████ ████ ████ ████ ████
    └────────────────────────────────────────
     Jan  Fév  Mar  Avr  Mai  Jun  Jul  Aoû  Sep  Oct  Nov  Déc
```

### Points d'Attention

🟢 **Positif :** Pipeline commercial solide, 2 gros projets signés
🟠 **Vigilance :** Recrutement de 2 développeurs à sécuriser en Q1
🔴 **Risque :** Dépendance client A (25% du CA)

---

## 2. Périmètre et Hypothèses

### 2.1 Périmètre du budget

| Inclus | Exclus |
|--------|--------|
| Activité France | Filiale internationale |
| Services (dev, design, conseil) | Produit SaaS (budget séparé) |
| Équipe interne + freelances | Investissements immobiliers |

### 2.2 Hypothèses de travail

| Hypothèse | Valeur | Source/Justification |
|-----------|--------|---------------------|
| Croissance CA | +26% | Pipeline + objectifs CODIR |
| TJM moyen vendu | 650 € | Historique + évolution marché |
| Taux de conversion pipeline | 40% | Moyenne 2024-2025 |
| Taux d'occupation facturable | 75% | Objectif vs 72% en 2025 |
| Inflation charges | +3% | Prévision INSEE |
| Recrutements | 2 devs Q1, 1 PM Q2 | Plan RH validé |
| Augmentations salariales | +4% en avril | Politique RH |
| Délai moyen de paiement client | 45 jours | Moyenne constatée |

---

## 3. Prévision de Revenus

### 3.1 Par type d'activité

| Activité | Budget 2026 | % CA | 2025 | Évolution |
|----------|-------------|------|------|-----------|
| Projets au forfait | 720 000 € | 60% | 570 000 € | +26% |
| Régie / TMA | 360 000 € | 30% | 285 000 € | +26% |
| Conseil / Audit | 96 000 € | 8% | 76 000 € | +26% |
| Formation | 24 000 € | 2% | 19 000 € | +26% |
| **TOTAL CA** | **1 200 000 €** | **100%** | **950 000 €** | **+26%** |

### 3.2 Par client

| Client | Type | Budget 2026 | % CA | Risque |
|--------|------|-------------|------|--------|
| Client A (XYZ Corp) | Forfait | 300 000 € | 25% | 🟠 Concentration |
| Client B (ABC SA) | Régie | 180 000 € | 15% | 🟢 Contrat 2 ans |
| Client C (123 SAS) | Forfait | 150 000 € | 12,5% | 🟢 |
| Pipeline signé Q1 | Divers | 220 000 € | 18% | 🟢 |
| Pipeline probable Q2-Q4 | Divers | 350 000 € | 29,5% | 🟠 À sécuriser |
| **TOTAL** | | **1 200 000 €** | **100%** | |

### 3.3 Mensualisation des revenus

| Mois | Projets | Régie | Conseil | Formation | **Total** |
|------|---------|-------|---------|-----------|-----------|
| Janvier | 50 000 | 30 000 | 5 000 | 0 | **85 000** |
| Février | 55 000 | 30 000 | 8 000 | 2 000 | **95 000** |
| Mars | 60 000 | 30 000 | 8 000 | 2 000 | **100 000** |
| Avril | 55 000 | 30 000 | 8 000 | 2 000 | **95 000** |
| Mai | 60 000 | 30 000 | 8 000 | 2 000 | **100 000** |
| Juin | 65 000 | 30 000 | 10 000 | 2 000 | **107 000** |
| Juillet | 50 000 | 25 000 | 5 000 | 0 | **80 000** |
| Août | 30 000 | 20 000 | 4 000 | 0 | **54 000** |
| Septembre | 70 000 | 30 000 | 10 000 | 4 000 | **114 000** |
| Octobre | 75 000 | 35 000 | 10 000 | 4 000 | **124 000** |
| Novembre | 80 000 | 35 000 | 10 000 | 4 000 | **129 000** |
| Décembre | 70 000 | 35 000 | 10 000 | 2 000 | **117 000** |
| **TOTAL** | **720 000** | **360 000** | **96 000** | **24 000** | **1 200 000** |

---

## 4. Budget des Charges

### 4.1 Synthèse par nature

| Nature | Budget 2026 | % CA | 2025 | Évolution |
|--------|-------------|------|------|-----------|
| **Charges de personnel** | 680 000 € | 56,7% | 540 000 € | +26% |
| Salaires bruts | 520 000 € | | 420 000 € | |
| Charges sociales | 140 000 € | | 110 000 € | |
| Avantages (mutuelle, tickets) | 20 000 € | | 10 000 € | |
| **Achats et sous-traitance** | 120 000 € | 10% | 100 000 € | +20% |
| Freelances | 80 000 € | | 70 000 € | |
| Licences et outils | 30 000 € | | 22 000 € | |
| Hébergement cloud | 10 000 € | | 8 000 € | |
| **Charges externes** | 80 000 € | 6,7% | 75 000 € | +7% |
| Loyer et charges | 36 000 € | | 36 000 € | |
| Assurances | 8 000 € | | 7 000 € | |
| Honoraires (EC, avocat) | 15 000 € | | 12 000 € | |
| Marketing et communication | 12 000 € | | 10 000 € | |
| Déplacements | 9 000 € | | 10 000 € | |
| **Autres charges** | 40 000 € | 3,3% | 45 000 € | -11% |
| Amortissements | 25 000 € | | 30 000 € | |
| Charges financières | 5 000 € | | 5 000 € | |
| Divers | 10 000 € | | 10 000 € | |
| **TOTAL CHARGES** | **920 000 €** | **76,7%** | **760 000 €** | **+21%** |

### 4.2 Budget par département

| Département | Effectif | Masse salariale | Autres charges | Total |
|-------------|----------|-----------------|----------------|-------|
| Production (Dev + Design) | 8 | 480 000 € | 35 000 € | 515 000 € |
| Commercial | 2 | 120 000 € | 15 000 € | 135 000 € |
| Direction & Admin | 2 | 80 000 € | 30 000 € | 110 000 € |
| **TOTAL** | **12** | **680 000 €** | **80 000 €** | **760 000 €** |

*Note : Hors sous-traitance et charges communes (loyer, assurances)*

### 4.3 Mensualisation des charges

| Mois | Personnel | Achats | Externes | Autres | **Total** |
|------|-----------|--------|----------|--------|-----------|
| Janvier | 52 000 | 8 000 | 7 000 | 3 000 | **70 000** |
| Février | 52 000 | 10 000 | 6 500 | 3 000 | **71 500** |
| Mars | 54 000 | 10 000 | 6 500 | 3 500 | **74 000** |
| Avril | 58 000* | 10 000 | 6 500 | 3 500 | **78 000** |
| Mai | 58 000 | 10 000 | 6 500 | 3 500 | **78 000** |
| Juin | 58 000 | 12 000 | 7 000 | 3 500 | **80 500** |
| Juillet | 58 000 | 8 000 | 7 000 | 3 000 | **76 000** |
| Août | 58 000 | 6 000 | 6 500 | 3 000 | **73 500** |
| Septembre | 60 000** | 12 000 | 7 000 | 3 500 | **82 500** |
| Octobre | 60 000 | 12 000 | 7 000 | 3 500 | **82 500** |
| Novembre | 60 000 | 12 000 | 6 500 | 3 500 | **82 000** |
| Décembre | 62 000 | 10 000 | 6 000 | 3 500 | **81 500** |
| **TOTAL** | **690 000** | **120 000** | **80 000** | **40 000** | **930 000** |

*\* Augmentations salariales en avril*
*\*\* Intégration PM en septembre*

---

## 5. Plan de Trésorerie

### 5.1 Flux prévisionnels

| Mois | Encaissements | Décaissements | Flux net | Tréso fin de mois |
|------|---------------|---------------|----------|-------------------|
| **Solde initial** | | | | **50 000 €** |
| Janvier | 70 000 | 72 000 | -2 000 | 48 000 |
| Février | 85 000 | 73 500 | +11 500 | 59 500 |
| Mars | 95 000 | 76 000 | +19 000 | 78 500 |
| Avril | 100 000 | 80 000 | +20 000 | 98 500 |
| Mai | 95 000 | 80 000 | +15 000 | 113 500 |
| Juin | 100 000 | 82 500 | +17 500 | 131 000 |
| Juillet | 107 000 | 78 000 | +29 000 | 160 000 |
| Août | 60 000 | 75 500 | -15 500 | 144 500 |
| Septembre | 54 000 | 84 500 | -30 500 | 114 000 |
| Octobre | 114 000 | 84 500 | +29 500 | 143 500 |
| Novembre | 124 000 | 84 000 | +40 000 | 183 500 |
| Décembre | 129 000 | 83 500 | +45 500 | **229 000** |
| **TOTAL** | **1 133 000** | **954 000** | **+179 000** | |

*Note : Décalage de 45 jours entre facturation et encaissement*

### 5.2 Graphique de trésorerie

```
Trésorerie prévisionnelle 2026 (k€)

250 │                                                      ████
200 │                                                 ████ ████
150 │                           ████ ████ ████ ████ ████ ████
100 │               ████ ████ ████ ████ ████ ████ ████
 50 │████ ████ ████ ████
  0 └──────────────────────────────────────────────────────────
     Jan  Fév  Mar  Avr  Mai  Jun  Jul  Aoû  Sep  Oct  Nov  Déc

     ─── Seuil d'alerte (30k€)
```

### 5.3 Seuil d'alerte

- **Seuil minimum :** 30 000 € (1 mois de charges fixes)
- **Action si < seuil :** Alerter la direction, négocier délais fournisseurs

---

## 6. Analyse de Rentabilité

### 6.1 Marge par activité

| Activité | CA | Coûts directs | Marge brute | % |
|----------|----|--------------:|------------:|--:|
| Projets au forfait | 720 000 € | 468 000 € | 252 000 € | 35% |
| Régie / TMA | 360 000 € | 234 000 € | 126 000 € | 35% |
| Conseil / Audit | 96 000 € | 48 000 € | 48 000 € | 50% |
| Formation | 24 000 € | 14 400 € | 9 600 € | 40% |
| **TOTAL** | **1 200 000 €** | **764 400 €** | **435 600 €** | **36,3%** |

### 6.2 Compte de résultat prévisionnel

```
┌─────────────────────────────────────────────────────────────┐
│                  COMPTE DE RÉSULTAT PRÉVISIONNEL 2026       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Chiffre d'affaires                        1 200 000 €      │
│                                                              │
│  - Achats et sous-traitance                  120 000 €      │
│  ─────────────────────────────────────────────────────      │
│  = Marge brute                             1 080 000 € (90%)│
│                                                              │
│  - Charges de personnel                      680 000 €      │
│  - Charges externes                           80 000 €      │
│  ─────────────────────────────────────────────────────      │
│  = Excédent Brut d'Exploitation (EBE)        320 000 € (27%)│
│                                                              │
│  - Amortissements                             25 000 €      │
│  ─────────────────────────────────────────────────────      │
│  = Résultat d'Exploitation                   295 000 € (25%)│
│                                                              │
│  - Charges financières                         5 000 €      │
│  + Produits financiers                         1 000 €      │
│  ─────────────────────────────────────────────────────      │
│  = Résultat courant avant impôts             291 000 €      │
│                                                              │
│  - Impôt sur les sociétés (25%)               72 750 €      │
│  ─────────────────────────────────────────────────────      │
│  = RÉSULTAT NET                              218 250 € (18%)│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 6.3 Point mort

| Indicateur | Valeur |
|------------|--------|
| Charges fixes | 785 000 € |
| Charges variables | 135 000 € (11,25% CA) |
| Taux de marge sur coûts variables | 88,75% |
| **Point mort (seuil de rentabilité)** | **884 500 €** |
| Point mort atteint en | **Août 2026** |

---

## 7. Risques Budgétaires

### 7.1 Matrice des risques

| Risque | Probabilité | Impact | Niveau | Mitigation |
|--------|-------------|--------|--------|------------|
| Perte client A | 20% | -300k€ | 🔴 | Diversification, contrat long terme |
| Échec recrutements Q1 | 30% | -100k€ CA | 🟠 | Freelances en backup |
| Dépassement projet forfait | 40% | -50k€ marge | 🟠 | Suivi serré, provisions |
| Retards de paiement | 50% | Tréso tendue | 🟠 | Relance proactive, acomptes |
| Augmentation coûts cloud | 30% | +10k€ | 🟢 | Contrat annuel négocié |

### 7.2 Scénarios

| Scénario | CA | Résultat | Hypothèses |
|----------|------|----------|------------|
| **Pessimiste** | 1 000 000 € | 150 000 € | Pipeline à 30%, perte client |
| **Budget** | 1 200 000 € | 280 000 € | Hypothèses de base |
| **Optimiste** | 1 400 000 € | 400 000 € | Pipeline à 50%, nouveau client |

### 7.3 Provisions

| Provision | Montant | Justification |
|-----------|---------|---------------|
| Dépassements projets | 30 000 € | 5% des projets forfait |
| Créances douteuses | 15 000 € | 1,25% du CA |
| Imprévus | 20 000 € | Buffer général |
| **TOTAL PROVISIONS** | **65 000 €** | |

---

## 8. Suivi et Révision

### 8.1 Indicateurs de suivi

| KPI | Cible | Fréquence | Alerte si |
|-----|-------|-----------|-----------|
| CA mensuel | Selon budget | Mensuel | < 80% |
| Marge brute | 36% | Mensuel | < 30% |
| Trésorerie | > 30k€ | Hebdo | < 30k€ |
| Taux de facturation | 75% | Mensuel | < 70% |
| DSO (délai paiement) | 45 jours | Mensuel | > 60 jours |

### 8.2 Calendrier de révision

| Période | Type | Participants |
|---------|------|--------------|
| Mensuel | Revue flash (1h) | DAF + Direction |
| Trimestriel | Revue complète (3h) | CODIR |
| Semestriel | Révision budget | CODIR + Associés |

### 8.3 Process d'arbitrage

1. Écart > 10% identifié → Analyse causale
2. Proposition d'actions correctives
3. Validation CODIR
4. Révision du budget si nécessaire

---

## Annexes

### A. Détail des hypothèses de calcul
[Lien vers fichier Excel]

### B. Plan de recrutement détaillé
[Lien vers plan RH]

### C. Pipeline commercial détaillé
[Lien vers CRM]

### D. Historique des versions

| Version | Date | Auteur | Modifications |
|---------|------|--------|---------------|
| 1.0 | 01/12/2025 | DAF | Création initiale |
| 1.1 | 10/12/2025 | DAF | Intégration retours CODIR |
| 1.2 | 20/12/2025 | DAF | Version finale approuvée |
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Budget sans hypothèses | Impossible à challenger ou réviser | Documenter toutes les assumptions |
| Pas de mensualisation | Pas de suivi précis possible | Détailler mois par mois |
| Ignorer la saisonnalité | Budget irréaliste | Intégrer les variations (été, fêtes) |
| Pas de plan de trésorerie | Risque de cash crunch | Toujours inclure les flux de trésorerie |
| Budget figé à l'année | Déconnexion réalité | Prévoir révisions trimestrielles |
| Pas de scénarios | Pas d'anticipation des risques | Minimum 3 scénarios |

## Références

- [DFCG - Guide du budget](https://www.dfcg.fr/)
- [Méthode Beyond Budgeting](https://bbrt.org/)
- [McKinsey - Zero-Based Budgeting](https://www.mckinsey.com/business-functions/operations/our-insights/five-myths-and-realities-about-zero-based-budgeting)
- Livrables liés : `macro-estimation`, `commercial-proposal`, `financial-report`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | finance-analytics | Création initiale |
