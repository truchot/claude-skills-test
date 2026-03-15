---
name: zero-jargon
description: Validateur d'absence de jargon technique dans les livrables client
---

# Validator Zero Jargon

## Responsabilité

Scanner tout document destiné au client et signaler/remplacer le jargon technique. Aucun terme technique ne doit apparaître dans un livrable client sans traduction.

## Dictionnaire de Traduction

| Jargon Technique | Traduction Client |
|---|---|
| CI/CD | mise en ligne automatisée |
| SSR/ISR/SSG | votre site se charge rapidement |
| API | connexion entre systèmes |
| Sprint | cycle de travail de 2 semaines |
| Rollback | retour à la version précédente |
| Stack technique | les technologies utilisées |
| ADR | décision technique documentée |
| PR/merge/branch | modification validée |
| Docker/Kubernetes | infrastructure du serveur |
| skill/agent/orchestrateur | INTERDIT (ne jamais mentionner) |
| Framework | outil de développement |
| Base de données | espace de stockage des données |
| Serveur | ordinateur qui héberge votre site |
| Bug | point d'attention |
| Fix/Patch | correction |
| Deploy/Déployer | mettre en ligne |
| Commit | modification enregistrée |
| Repository | projet |
| Migration | mise à jour de la structure |
| Responsive | adapté à tous les écrans |

## Règles de Validation

- **Score jargon = 0** : le livrable est VALIDÉ
- **Score jargon > 0** : le livrable est REJETÉ
- Chaque terme technique détecté incrémente le score de 1
- Les termes INTERDITS (skill, agent, orchestrateur) comptent double

## Processus

1. **Scanner** le document complet à la recherche de termes techniques
2. **Identifier** chaque occurrence avec son contexte (phrase complète)
3. **Proposer un remplacement** en utilisant le dictionnaire de traduction
4. **Rescanner** après correction pour confirmer un score de 0

## Exceptions

- Termes que le client utilise lui-même dans ses échanges (vocabulaire adopté par le client)
- Citations directes de documentation technique que le client a demandé explicitement
- Noms propres de produits ou services (ex: "WordPress", "Shopify")
