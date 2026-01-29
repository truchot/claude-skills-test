---
id: deliverable-id                    # Identifiant unique (kebab-case)
name: Nom du Livrable                 # Nom lisible
version: 1.0.0                        # Versioning sémantique
category: documentation               # Catégorie (voir INDEX.md)
status: active                        # active | draft | deprecated
agents:                               # Agents qui produisent ce livrable
  - skill/domain/agent-name
consumes:                             # Livrables requis en entrée (optionnel)
  - other-deliverable-id
produces_for:                         # Agents qui consomment ce livrable (optionnel)
  - skill/domain/agent-name
tags: [tag1, tag2]                    # Tags pour recherche/filtrage
---

# [Nom du Livrable]

## Description

[Description claire et concise du livrable en 2-3 phrases. Expliquer ce que c'est, à quoi ça sert, et pour qui.]

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | [Document Markdown \| Fichier JSON \| Code source \| Diagramme \| Spreadsheet \| etc.] |
| **Emplacement** | `[chemin/relatif/dans/projet/]` |
| **Nommage** | `[convention-de-nommage.ext]` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] [Section 1] - [Description de ce qu'elle doit contenir]
- [ ] [Section 2] - [Description]
- [ ] [Section 3] - [Description]

### Sections Optionnelles

- [ ] [Section optionnelle 1] - [Quand l'inclure]
- [ ] [Section optionnelle 2] - [Quand l'inclure]

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | [Critère 1] | [Valeur ou condition attendue] | Manuel / Auto | Oui |
| 2 | [Critère 2] | [Valeur ou condition attendue] | Manuel / Auto | Oui |
| 3 | [Critère 3] | [Valeur ou condition attendue] | Manuel / Auto | Non |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `[agent-source]` | [Nom du livrable ou donnée] | [Ce qui est attendu] |
| `[autre-source]` | [Nom] | [Description] |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | [Quand - ex: Avant implémentation] | [Rôle - ex: Lead Dev] | [Action - ex: Retour agent] |
| 2 | [Quand] | [Rôle] | [Action] |

## Exemple

### Exemple Minimal

```
[Exemple de livrable minimal mais valide]
```

### Exemple Complet

```
[Exemple de livrable complet avec toutes les sections]
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| [Mauvaise pratique 1] | [Explication] | [Bonne pratique] |
| [Mauvaise pratique 2] | [Explication] | [Bonne pratique] |

## Références

- [Lien vers documentation externe pertinente]
- [Standards ou normes applicables]
- Livrables liés : `[autre-deliverable-id]`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | YYYY-MM-DD | [Nom] | Création initiale |
