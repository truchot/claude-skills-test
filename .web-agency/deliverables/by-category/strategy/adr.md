---
id: adr
name: Architecture Decision Record
version: 1.0.0
category: strategy
status: active
agents:
  - direction-technique/architecture/adr
consumes: []
produces_for:
  - direction-technique/communication/documentation-technique
  - direction-technique/communication/onboarding-technique
  - lead-dev/coordination/tech-lead
tags: [architecture, decision, documentation, adr, strategy]
---

# Architecture Decision Record (ADR)

## Description

Document formalisant une décision technique importante avec son contexte, les options évaluées, la justification du choix et les conséquences attendues. Les ADR constituent la mémoire architecturale du projet et facilitent l'onboarding des nouveaux membres.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown |
| **Emplacement** | `docs/adr/NNNN-titre-court.md` |
| **Nommage** | `NNNN-kebab-case.md` où NNNN = numéro séquentiel (ex: `0001-postgresql-database.md`) |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Titre** - Format `ADR-NNNN: Titre descriptif court`
- [ ] **Statut** - `Proposé` | `Accepté` | `Déprécié` | `Remplacé par ADR-XXXX`
- [ ] **Date** - Date de la décision (format YYYY-MM-DD)
- [ ] **Contexte** - Problème ou situation nécessitant une décision (min 3 phrases)
- [ ] **Décision** - Formulation claire commençant par "Nous allons..." ou "Nous avons décidé de..."
- [ ] **Options Considérées** - Minimum 2 options avec avantages/inconvénients
- [ ] **Justification** - Pourquoi cette option a été choisie
- [ ] **Conséquences** - Positives, négatives et neutres

### Sections Optionnelles

- [ ] **Implémentation** - Notes sur la mise en œuvre
- [ ] **Références** - Liens, ressources, ADR liés
- [ ] **Participants** - Personnes impliquées dans la décision
- [ ] **Date de revue** - Si décision temporaire ou à réévaluer

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Contexte complet | Min 3 phrases expliquant le problème | Manuel | Oui |
| 2 | Options multiples | Min 2 options évaluées | Manuel | Oui |
| 3 | Avantages/Inconvénients | Listés pour chaque option | Manuel | Oui |
| 4 | Décision explicite | Commence par "Nous allons/avons décidé" | Manuel | Oui |
| 5 | Conséquences documentées | Au moins 1 positive, 1 négative | Manuel | Oui |
| 6 | Longueur | Max 2 pages (éviter les ADR trop longs) | Manuel | Oui |
| 7 | Numérotation | Séquentielle, sans trous | Auto | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| Réunion d'architecture | Compte-rendu | Discussion préalable avec l'équipe |
| `direction-technique/avant-projet` | Contraintes projet | Budget, délais, compétences équipe |
| ADR existants | Index ADR | Vérifier cohérence avec décisions précédentes |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Statut "Proposé" | Équipe technique | Discussion, itération |
| 2 | Passage à "Accepté" | Lead Dev + Tech Lead | Consensus requis |
| 3 | Review annuelle | Direction Technique | Vérifier pertinence, déprécier si obsolète |

## Exemple

### Exemple Minimal

```markdown
# ADR-0001: Utilisation de PostgreSQL

## Statut
Accepté

## Date
2026-01-18

## Contexte
Notre application nécessite une base de données relationnelle pour stocker les données utilisateurs et commandes. Le volume estimé est de 100K utilisateurs et 1M de transactions par an.

## Décision
Nous allons utiliser PostgreSQL 15 comme base de données principale.

## Options Considérées

### Option 1: PostgreSQL
- **Avantages**: JSONB, extensions, communauté active, gratuit
- **Inconvénients**: Scaling horizontal complexe

### Option 2: MySQL
- **Avantages**: Simple, très répandu
- **Inconvénients**: Moins de fonctionnalités avancées

## Justification
PostgreSQL offre le meilleur rapport fonctionnalités/complexité pour notre cas d'usage. L'équipe a déjà de l'expérience avec.

## Conséquences

### Positives
- Intégrité des données garantie
- Flexibilité avec JSONB si besoin

### Négatives
- Formation nécessaire pour les features avancées
```

### Exemple Complet

Voir : `docs/adr/examples/0001-postgresql-complete.md`

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| ADR rédigé après coup | Contexte oublié, biais de confirmation | Rédiger au moment de la décision |
| Une seule option documentée | Pas de trace du raisonnement | Toujours documenter min 2 options |
| Modifier un ADR accepté | Perte de l'historique | Créer un nouvel ADR qui remplace |
| Supprimer un ADR déprécié | Perte de mémoire projet | Garder avec statut "Déprécié" |
| ADR de 10 pages | Trop long, personne ne lit | Max 2 pages, aller à l'essentiel |

## Références

- [Documenting Architecture Decisions - Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [ADR GitHub Organization](https://adr.github.io/)
- [MADR Template](https://adr.github.io/madr/)
- Livrables liés : `technical-documentation`, `onboarding-guide`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | direction-technique | Création initiale |
