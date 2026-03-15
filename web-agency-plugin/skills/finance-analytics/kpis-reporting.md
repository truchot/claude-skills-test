# KPIs & Reporting

## Calcul des metriques

### Metriques Revenue

```
MRR = Σ(contrats_mensuels) + (contrats_annuels / 12)
ARR = MRR × 12
ARPA = MRR / nombre_clients_actifs
NRR = (MRR_debut + expansion - churn - contraction) / MRR_debut × 100
Revenue_Growth = (CA_M - CA_M-1) / CA_M-1 × 100
```

### Metriques Profitabilite

```
Marge_Brute = (CA - Couts_Directs) / CA × 100
  Couts_Directs = Salaires_production + Sous-traitance + Outils
EBITDA = CA - Charges_Exploitation (hors amortissements)
Resultat_Net = EBITDA - Amortissements - Impots
Marge_Nette = Resultat_Net / CA × 100
```

### Metriques Cash

```
DSO = (Creances_Clients / CA_Periode) × Nb_Jours
Cash_Runway = Tresorerie / Burn_Rate_Mensuel
BFR = Creances + Stocks - Dettes_Fournisseurs
```

### Metriques Equipe

```
Taux_Utilisation = Heures_Facturables / Heures_Disponibles × 100
Cout_Heure = (Salaire_Charge + Quote-part_Frais) / Heures_Facturables
Rentabilite_Projet = (Facture - Cout_Reel) / Facture × 100
```

## Alertes et seuils

| Metrique | Seuil alerte | Action |
|----------|-------------|--------|
| MRR growth | < 0% | Revue commerciale urgente |
| Marge brute | < 40% | Audit couts |
| DSO | > 60 jours | Relance recouvrement |
| Cash runway | < 3 mois | Plan tresorerie |
| Taux utilisation | < 70% | Revoir planning |
| NRR | < 90% | Plan retention |

## Reporting mensuel - Structure

```markdown
## Rapport Financier - [Mois YYYY]

### Executive Summary
[2-3 phrases cles sur la performance du mois]

### 1. Revenue
| Metrique | M | M-1 | Delta | YTD | Objectif |
|----------|---|-----|-------|-----|----------|
| CA Total |   |     |       |     |          |
| MRR      |   |     |       |     |          |
| NRR      |   |     |       |     |          |

### 2. Profitabilite
| Metrique | M | M-1 | Delta |
|----------|---|-----|-------|
| Marge Brute |  |   |       |
| EBITDA      |  |   |       |

### 3. Cash
| Metrique | Valeur | Tendance |
|----------|--------|----------|
| Tresorerie |      |          |
| DSO        |      |          |
| Cash Runway |     |          |

### 4. Projets
| Projet | CA | Cout | Marge | Statut |
|--------|-----|------|-------|--------|

### 5. Actions
- [Actions correctives si ecarts]
```

## Dashboard temps reel

Metriques a afficher en permanence :
- MRR actuel + tendance 3 mois
- Tresorerie disponible
- Factures en attente (montant + nb)
- Taux utilisation equipe (semaine en cours)
- Pipeline weighted (forecast M+1, M+2, M+3)

## Rapport de rentabilite projet

```markdown
## Rentabilite - [Nom Projet]

| Poste | Budget | Reel | Ecart |
|-------|--------|------|-------|
| Dev frontend | | | |
| Dev backend | | | |
| Design | | | |
| Gestion projet | | | |
| **Total** | | | |

Marge realisee : [%]
Heures prevues vs reelles : [ratio]
```
