# Billing & Forecasting

## Facturation

### Processus de facturation

```
Livraison validee → Generation facture → Envoi client → Suivi paiement → Relance si retard
```

### Template facture

```yaml
facture:
  numero: FAC-YYYY-XXXX
  date_emission: YYYY-MM-DD
  date_echeance: YYYY-MM-DD  # +30j par defaut
  vendeur:
    raison_sociale: ""
    siret: ""
    tva_intra: ""
    adresse: ""
  client:
    raison_sociale: ""
    adresse: ""
  lignes:
    - description: ""
      quantite: 1
      prix_unitaire_ht: 0
      tva: 20  # %
  conditions: "Paiement a 30 jours"
  penalites: "3x taux interet legal"
  escompte: "Pas d'escompte pour paiement anticipe"
```

### Echeancier type par projet

| Jalon | % du total | Declencheur |
|-------|-----------|-------------|
| Acompte | 30% | Signature devis |
| Milestone 1 | 30% | Livraison maquettes validees |
| Milestone 2 | 30% | Livraison dev + recette |
| Solde | 10% | Mise en production |

### Relances impayes (dunning)

| Jour | Action | Canal | Ton |
|------|--------|-------|-----|
| J+1 | Rappel echeance | Email auto | Neutre |
| J+7 | Premiere relance | Email | Cordial |
| J+15 | Deuxieme relance | Email + tel | Ferme |
| J+30 | Mise en demeure | Courrier AR | Formel |
| J+45 | Contentieux | Courrier avocat | Legal |

### Gestion des avoirs

Emettre un avoir quand :
- Erreur sur la facture originale
- Remise accordee a posteriori
- Annulation partielle de prestation
- Retour/insatisfaction justifiee

Format : AVO-YYYY-XXXX, reference a la facture originale obligatoire

## Previsions financieres

### Methodologie forecast

```
Forecast_M+1 = MRR_actuel
             + Pipeline_weighted (SQL * 0.4 + PROPOSAL * 0.6 + NEGO * 0.75)
             - Churn_prevu
             + Upsells_identifies * 0.5
```

### Pipeline weighting

| Stage | Probabilite |
|-------|-------------|
| Lead | 10% |
| MQL | 20% |
| SQL | 40% |
| Proposal | 60% |
| Negotiation | 75% |
| Verbal commit | 90% |

### Scenarios previsionnels

| Scenario | Hypotheses |
|----------|-----------|
| Pessimiste | Churn +50%, pipeline -30%, pas d'upsell |
| Base | Tendance actuelle maintenue |
| Optimiste | Pipeline +20%, upsell confirmes, churn stable |

### Budget annuel - Structure

```markdown
## Budget [YYYY]

### Revenue
| Source | M1 | M2 | ... | M12 | Total |
|--------|----|----|-----|-----|-------|
| MRR    |    |    |     |     |       |
| Projets|    |    |     |     |       |
| Autres |    |    |     |     |       |

### Charges
| Poste | Mensuel | Annuel |
|-------|---------|--------|
| Salaires |     |        |
| Outils/SaaS | |        |
| Locaux |      |        |
| Marketing |   |        |
| Divers |      |        |

### Objectifs
| Metrique | Objectif | Suivi |
|----------|----------|-------|
| CA annuel |         |       |
| Marge brute |       |       |
| Nb nouveaux clients | |     |
```

### Revue budgetaire

- Frequence : mensuelle
- Comparer reel vs budget, analyser ecarts > 10%
- Ajuster forecast glissant sur 3 mois
- Alerter direction si ecart > 20%
