# Billing & Forecasting

## Facturation

### Processus

```
Livraison validee → Generation facture → Envoi client → Suivi paiement → Relance si retard
```

### Template facture

```yaml
facture:
  numero: FAC-YYYY-XXXX
  date_emission: YYYY-MM-DD
  date_echeance: YYYY-MM-DD  # +30j par defaut
  vendeur: { raison_sociale, siret, tva_intra, adresse }
  client: { raison_sociale, adresse }
  lignes:
    - { description, quantite, prix_unitaire_ht, tva: 20 }
  conditions: "Paiement a 30 jours"
  penalites: "3x taux interet legal"
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

### Avoirs

Emettre un avoir (AVO-YYYY-XXXX) quand : erreur facture, remise a posteriori, annulation partielle, insatisfaction justifiee. Reference facture originale obligatoire.

## Previsions financieres

### Methodologie forecast

```
Forecast_M+1 = MRR_actuel + Pipeline_weighted - Churn_prevu + Upsells * 0.5
```

### Pipeline weighting

| Stage | Probabilite |
|-------|-------------|
| Lead / MQL | 10% / 20% |
| SQL / Proposal | 40% / 60% |
| Negotiation / Verbal commit | 75% / 90% |

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
| MRR / Projets / Autres |    |    |     |     |       |

### Charges
| Poste | Mensuel | Annuel |
|-------|---------|--------|
| Salaires / Outils / Locaux / Marketing |     |        |

### Objectifs
| Metrique | Objectif | Suivi |
|----------|----------|-------|
| CA annuel / Marge brute / Nb nouveaux clients |         |       |
```

### Revue budgetaire

- Frequence : mensuelle
- Comparer reel vs budget, analyser ecarts > 10%
- Ajuster forecast glissant sur 3 mois
- Alerter direction si ecart > 20%
