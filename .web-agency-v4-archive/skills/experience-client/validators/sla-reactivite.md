---
name: sla-reactivite
description: Validateur du respect des engagements de réactivité envers le client
---

# Validator SLA Réactivité

## Responsabilité

Vérifier le respect des engagements de réactivité envers le client. Chaque SLA non respecté doit déclencher une alerte immédiate.

## Engagements SLA

| Engagement | Délai Maximum |
|---|---|
| Premier contact | < 24h |
| Rapport avancement | Hebdomadaire (chaque vendredi) |
| Alerte proactive | Dès détection du risque |
| Réponse support P1-P2 | < 4h |
| Réponse support P3-P4 | < 24h |
| Bilan lancement | J+30 max après mise en prod |
| Rapport mensuel | Avant le 5 du mois suivant |
| Point trimestriel | Dernière semaine du trimestre |

## Règles de Validation

- **SLA respecté** : aucune action requise
- **SLA non respecté** : alerte immédiate au chef de projet
- Les SLA P1-P2 sont critiques et déclenchent une escalade automatique
- Un SLA en retard de plus de 50% de son délai est marqué comme critique

## Processus

1. **Horodater** chaque événement déclencheur (demande client, détection risque, etc.)
2. **Calculer le délai** écoulé depuis le déclencheur
3. **Comparer au SLA** applicable selon le type d'événement
4. **Alerter** si le délai approche (80% du SLA) ou dépasse le SLA
5. **Documenter** chaque dépassement dans le journal de suivi
