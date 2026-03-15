# Pipeline & Prospection

## Gestion du pipeline

### Suivi des deals

Chaque deal doit etre documente avec :

```markdown
## Deal: [Nom Client] - [Montant]

**Stage:** [LEAD → CLOSED_WON/LOST]
**Probabilite:** [%]
**Close attendue:** [date]
**Owner:** [commercial]

### Timeline activites
| Date | Type | Resume | Resultat |
|------|------|--------|----------|
| [date] | Email/Call/Meeting/Demo | [resume] | [next step] |
```

### Types d'activites

| Type | Description | Frequence min |
|------|-------------|---------------|
| Email | Communication ecrite | A chaque etape |
| Call | Appel telephonique | Hebdomadaire |
| Meeting | RDV visio/presentiel | Mensuel |
| Demo | Demonstration produit/service | 1x par deal |
| Proposal | Envoi devis/proposition | 1x par deal |

### Regles de hygiene pipeline

- Mettre a jour chaque deal au moins 1x/semaine
- Deal sans activite > 30j = revue obligatoire
- Deal en NEGOTIATION > 60j = escalade direction
- Close date passee = requalifier ou cloturer

## Reporting pipeline

### Rapport hebdomadaire

```markdown
## Pipeline Report - Semaine [N]

### Resume
- Deals actifs : [N] | Valeur totale : [montant]
- Weighted pipeline : [montant pondere]
- Deals avances cette semaine : [N]
- Deals perdus : [N] | Raisons : [top 3]

### Par stage
| Stage | Nb deals | Valeur | Moy age (jours) |
|-------|----------|--------|-----------------|
```

### Forecast mensuel

```
Forecast = Σ(montant_deal × probabilite_stage)
```

Ajuster selon : historique conversion, saisonnalite, tendance pipeline

## Prospection

### Generation de leads

| Source | Type | Cout relatif |
|--------|------|-------------|
| Inbound (SEO, content) | Warm | Bas |
| Referral (bouche a oreille) | Hot | Nul |
| Outbound (cold email) | Cold | Moyen |
| Events (salons, meetups) | Warm | Haut |
| Paid (ads) | Mixed | Variable |

### Sequence outreach type

| Jour | Action | Canal |
|------|--------|-------|
| J+0 | Premier contact personnalise | Email |
| J+3 | Relance avec contenu de valeur | Email |
| J+5 | Connexion | LinkedIn |
| J+7 | Appel de suivi | Telephone |
| J+14 | Derniere relance + offre | Email |
| J+30 | Nurturing long terme | Newsletter |

### Qualification rapide (5 min)

Questions essentielles au premier contact :
1. Quel est votre projet ? (Need)
2. Pour quand ? (Timeline)
3. Avez-vous un budget defini ? (Budget)
4. Qui decide ? (Authority)

Si score BANT >= 50 → passer en SQL, sinon nurturing

### Metriques prospection

| Metrique | Cible |
|----------|-------|
| Taux reponse cold email | > 15% |
| Taux qualification | > 30% |
| Conversion MQL → SQL | > 40% |
| Cout acquisition lead | < 50 EUR |
| Time to qualify | < 48h |
