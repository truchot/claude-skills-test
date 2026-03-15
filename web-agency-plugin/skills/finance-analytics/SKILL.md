---
name: finance-analytics
description: >-
  Expert Finance & Analytics pour facturation, KPIs, reporting et previsions.
  TRIGGER when: factures, devis, rentabilite projet, KPIs business, previsions financieres, reporting direction.
---

## Domaines d'expertise

- **Billing** - Facturation, devis, avoirs, suivi paiements, relances impayes (voir `billing-forecasting.md`)
- **KPIs** - Calcul metriques business, dashboards, alertes seuils (voir `kpis-reporting.md`)
- **Reporting** - Rapports mensuels, analyses rentabilite, visualisations (voir `kpis-reporting.md`)
- **Forecasting** - Previsions CA, budgets, scenarios, planning financier (voir `billing-forecasting.md`)

## Workflow principal

```
Projet livre → Facturation → Suivi paiement → Analyse rentabilite → Reporting → Forecast
```

## KPIs cles

| Categorie | KPIs |
|-----------|------|
| **Revenus** | MRR, ARR, Revenue Growth, ARPA |
| **Profitabilite** | Marge brute, EBITDA, resultat net |
| **Cash** | DSO, cash runway, tresorerie |
| **Projets** | Rentabilite par projet, depassement budget |
| **Clients** | LTV, CAC, ratio LTV/CAC, churn rate |
| **Equipe** | Taux utilisation, cout par projet |

## Formules essentielles

```
MRR = Σ(contrats_mensuels) + (contrats_annuels / 12)
ARR = MRR × 12
NRR = (MRR_debut + expansion - churn - contraction) / MRR_debut × 100
Marge_Brute = (CA - Couts_Directs) / CA × 100
DSO = (Creances_Clients / CA) × 365
LTV = ARPA × Duree_Moyenne_Client
CAC = Total_Couts_Acquisition / Nb_Nouveaux_Clients
```

## Types de documents financiers

| Type | Usage | Numerotation |
|------|-------|--------------|
| Devis | Proposition | DEV-YYYY-XXXX |
| Facture | Vente | FAC-YYYY-XXXX |
| Avoir | Correction | AVO-YYYY-XXXX |
| Acompte | Paiement partiel | ACO-YYYY-XXXX |

## Mentions obligatoires facture

- Numero unique, date emission, date echeance
- Identite vendeur (SIRET, TVA intra)
- Identite client
- Description detaillee des prestations
- Prix unitaire HT, TVA applicable, total TTC
- Conditions de paiement, penalites de retard

## Livrables types

- Factures et avoirs conformes
- Tableaux de bord financiers
- Rapports de rentabilite projet
- Previsions de tresorerie
- Budget annuel et suivi
- Analyses de performance

## Coordination

| Skill | Interaction |
|-------|-------------|
| `project-management` | Donnees projets pour facturation |
| `commercial-crm` | Pipeline pour forecast CA |
| `direction-operations` | Budget et objectifs |
| `direction-technique` | Couts techniques |

## Escalation

- **direction-operations** : decisions budgetaires, investissements
- **commercial-crm** : forecast pipeline, objectifs CA
- **project-management** : rentabilite projets, facturation client
