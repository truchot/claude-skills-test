---
name: coherence-emotionnelle
description: Validateur de cohérence entre le livrable et l'émotion cible de la phase
---

# Validator Cohérence Émotionnelle

## Responsabilité

Vérifier l'alignement entre le livrable et l'émotion cible de la phase. Un livrable incohérent avec la phase émotionnelle du projet crée une dissonance qui nuit à la relation client.

## Signaux d'Incohérence

| Phase + Signal | Verdict |
|---|---|
| Accueil + document trop formel/long | INCOHÉRENT |
| Accueil + mention de budget | INCOHÉRENT |
| Cadrage + proposition sans options | INCOHÉRENT |
| Cadrage + trop technique | INCOHÉRENT |
| Co-création + maquette sans narration | INCOHÉRENT |
| Réalisation + silence > 7 jours | INCOHÉRENT |
| Réalisation + rapport technique sans traduction | INCOHÉRENT |
| Lancement + facture sans bilan | INCOHÉRENT |
| Lancement + pas de célébration | INCOHÉRENT |
| Fidélisation + contact uniquement pour renouvellement | INCOHÉRENT |

## Règles de Validation

- **Aucune incohérence détectée** : le livrable est COHÉRENT
- **Incohérence détectée** : remonter au domaine concerné pour correction
- Chaque incohérence est documentée avec la phase, le signal détecté et la correction suggérée
- Les incohérences multiples sur un même livrable déclenchent une revue complète

## Processus

1. **Identifier la phase** émotionnelle du projet
2. **Analyser le livrable** à la recherche de signaux d'incohérence
3. **Évaluer la gravité** de chaque incohérence détectée
4. **Proposer des corrections** alignées avec l'émotion cible de la phase
5. **Remonter au domaine** concerné si une correction est nécessaire
