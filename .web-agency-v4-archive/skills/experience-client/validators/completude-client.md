---
name: completude-client
description: Validateur de complétude des sections obligatoires par type de livrable
---

# Validator Complétude Client

## Responsabilité

Vérifier que chaque livrable client contient toutes les sections requises selon son type. Un livrable incomplet ne doit jamais être envoyé au client.

## Sections Requises par Type de Livrable

| Type de Livrable | Sections Obligatoires |
|---|---|
| synthese-besoin | Contexte client, Besoin reformulé, Objectifs, Prochaines étapes |
| proposition-projet | Problème résolu, Solution, Budget détaillé, Planning, Inclus/Exclu |
| rapport-avancement | Terminé, En cours, À venir, Points d'attention, Actions client |
| bilan-lancement | Métriques, Fonctionnalités, Problèmes résolus, Recommandations |
| rapport-mensuel | Disponibilité, Incidents, Métriques business, Recommandations |
| pv-validation | Date, Participants, Éléments validés, Périmètre, Signatures |

## Règles de Validation

- **Toutes les sections présentes** : le livrable est COMPLET
- **Section manquante** : le livrable est INCOMPLET → à compléter avant envoi
- Chaque section manquante est listée dans le rapport de validation
- Le livrable ne peut pas être envoyé tant qu'il reste des sections manquantes

## Processus

1. **Identifier le type** de livrable à partir de son en-tête ou métadonnées
2. **Lister les sections requises** pour ce type de livrable
3. **Vérifier la présence** de chaque section dans le document
4. **Vérifier le contenu** : une section vide est considérée comme manquante
5. **Générer le rapport** avec la liste des sections présentes et manquantes
