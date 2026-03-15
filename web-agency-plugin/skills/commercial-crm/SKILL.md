---
name: commercial-crm
description: >-
  Expert Commercial & CRM pour pipeline, prospection, negociation et fidelisation.
  TRIGGER when: pipeline commercial, suivi prospects, propositions, negociation, conversion, fidelisation client.
---

## Domaines d'expertise

- **Pipeline** - Gestion opportunites, suivi deals, forecast, reporting pipeline (voir `pipeline-prospection.md`)
- **Prospection** - Generation leads, qualification BANT, outreach, nurturing (voir `pipeline-prospection.md`)
- **Negotiation** - Propositions commerciales, gestion objections, closing (voir `retention-negotiation.md`)
- **Retention** - Fidelisation, prevention churn, upsell, renouvellements (voir `retention-negotiation.md`)

## Workflow principal

```
Lead → Qualification BANT → Proposition → Negociation → Closing → Onboarding → Fidelisation
```

## Pipeline stages

| Stage | Description | Actions | Proba |
|-------|-------------|---------|-------|
| LEAD | Premier contact | Qualification | 10% |
| MQL | Marketing Qualified | Nurturing | 25% |
| SQL | Sales Qualified | Rendez-vous | 40% |
| PROPOSAL | Proposition envoyee | Relances | 60% |
| NEGOTIATION | En negociation | Ajustements | 75% |
| CLOSED_WON | Gagne | Onboarding | 100% |
| CLOSED_LOST | Perdu | Post-mortem | 0% |

## Qualification BANT

| Critere | Question cle | Score |
|---------|-------------|-------|
| **B**udget | A-t-il le budget ? | 0-25 |
| **A**uthority | Est-il decideur ? | 0-25 |
| **N**eed | A-t-il un besoin reel ? | 0-25 |
| **T**imeline | Quand veut-il demarrer ? | 0-25 |

| Score total | Statut | Action |
|-------------|--------|--------|
| 75-100 | SQL | Creer opportunite |
| 50-74 | MQL | Nurturing |
| 25-49 | Lead | Outreach |
| 0-24 | Unqualified | Disqualifier |

## Objections courantes

| Objection | Frequence | Approche |
|-----------|-----------|----------|
| "C'est trop cher" | 40% | Reframer sur la valeur/ROI |
| "Pas le temps" | 25% | Montrer le cout de l'inaction |
| "Concurrent moins cher" | 20% | Differenciation qualitative |
| "Pas prioritaire" | 10% | Identifier le vrai bloqueur |
| "Besoin de reflechir" | 5% | Proposer une prochaine etape concrete |

## Score de sante client (retention)

| Composante | Poids |
|------------|-------|
| Usage | 30% |
| Engagement | 25% |
| Support (tickets) | 20% |
| Paiement | 15% |
| NPS | 10% |

## Livrables types

- Fiches prospects qualifies
- Propositions commerciales
- Emails de relance personnalises
- Rapports pipeline hebdo/mensuel
- Analyses win/loss
- Plans de fidelisation

## Coordination

| Skill | Interaction |
|-------|-------------|
| `client-intake` | Reception des leads entrants |
| `project-management` | Transition prospect → client |
| `finance-analytics` | Forecast et reporting CA |
| `marketing-analytics` | Campagnes nurturing |

## Escalation

- **direction-commerciale** : decisions strategiques, remises > 20%
- **project-management** : transition closing → delivery
