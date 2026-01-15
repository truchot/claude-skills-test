---
id: api-specification
name: Spécification API REST
version: 1.0.0
category: specification
status: active
agents:
  - backend-developer/api/rest-design
  - backend-developer/api/graphql-design
consumes:
  - data-model
produces_for:
  - backend-developer/api/openapi-spec
  - backend-developer/api/validation
  - frontend-developer/javascript/api-integration
tags: [api, rest, specification, endpoints, http]
---

# Spécification API REST

## Description

Document définissant la structure complète d'une API REST : endpoints, méthodes HTTP, paramètres, corps de requête/réponse, codes de statut et gestion des erreurs. Ce livrable sert de contrat entre le backend et les consommateurs de l'API (frontend, mobile, partenaires).

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown |
| **Emplacement** | `docs/api/[ressource]-api.md` |
| **Nommage** | `kebab-case` + suffixe `-api.md` (ex: `users-api.md`, `orders-api.md`) |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **En-tête** - Nom de la ressource, version de l'API, date de dernière mise à jour
- [ ] **Base URL** - URL de base de l'API (ex: `https://api.example.com/v1`)
- [ ] **Authentification** - Type d'auth requise (Bearer, API Key, etc.)
- [ ] **Endpoints** - Liste complète avec méthode, path, description
- [ ] **Paramètres** - Query params, path params pour chaque endpoint
- [ ] **Corps de requête** - Schéma JSON avec types et validations
- [ ] **Réponses** - Schéma JSON pour chaque code de statut
- [ ] **Codes d'erreur** - Liste des erreurs possibles avec codes et messages

### Sections Optionnelles

- [ ] **Rate Limiting** - Si applicable, limites et headers
- [ ] **Pagination** - Format de pagination utilisé
- [ ] **Webhooks** - Si l'API expose des webhooks
- [ ] **Exemples curl** - Exemples de requêtes complètes
- [ ] **Changelog** - Historique des modifications de l'API

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Couverture CRUD | 100% des opérations de la ressource | Manuel | Oui |
| 2 | Nommage RESTful | Pluriel, noms, pas de verbes | Auto (lint) | Oui |
| 3 | Codes de statut | Min: 200, 201, 400, 401, 404, 500 | Manuel | Oui |
| 4 | Schémas JSON | Tous les types documentés | Manuel | Oui |
| 5 | Exemples | Au moins 1 exemple par endpoint | Manuel | Oui |
| 6 | Pagination | Documentée pour les endpoints liste | Manuel | Oui si liste |
| 7 | Erreurs | Format standard avec code et message | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `client-intake/requirements-extractor` | Liste des entités métier | Entités à exposer via l'API |
| `direction-technique/specification/modelisation-donnees` | `data-model` | Schéma des données avec relations |
| `direction-technique/architecture/adr` | ADR versioning | Stratégie de versioning choisie |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Avant implémentation | Lead Dev | Retour à l'agent pour correction |
| 2 | Après rédaction complète | Product Owner | Validation cohérence métier |
| 3 | Avant release | QA | Test de conformité API vs spec |

## Exemple

### Exemple Minimal

```markdown
# API Users

**Base URL**: `https://api.example.com/v1`
**Auth**: Bearer Token

## Endpoints

### GET /users
Liste paginée des utilisateurs.

**Query Parameters**:
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | int | 1 | Numéro de page |
| limit | int | 20 | Items par page (max: 100) |

**Response 200**:
```json
{
  "data": [{ "id": "uuid", "email": "string", "name": "string" }],
  "meta": { "total": 100, "page": 1, "limit": 20 }
}
```

### POST /users
Création d'un utilisateur.

**Body**:
```json
{
  "email": "string (required, email format)",
  "name": "string (required, 2-100 chars)",
  "password": "string (required, min 8 chars)"
}
```

**Response 201**: Utilisateur créé
**Response 400**: Validation error
**Response 409**: Email déjà utilisé
```

### Exemple Complet

Voir : `docs/api/examples/users-api-complete.md`

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Verbes dans les URLs (`/getUsers`) | Non RESTful, incohérent | Utiliser `/users` avec GET |
| Singulier (`/user`) | Incohérent avec conventions REST | Utiliser le pluriel `/users` |
| Pas de versioning | Breaking changes impossibles à gérer | Préfixer `/v1/`, `/v2/` |
| Codes de statut génériques (200 pour tout) | Impossible de distinguer les cas | Utiliser les codes appropriés |
| Erreurs sans structure | Difficile à parser côté client | Format standard `{ error: { code, message } }` |

## Références

- [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines)
- [Google API Design Guide](https://cloud.google.com/apis/design)
- [JSON:API Specification](https://jsonapi.org/)
- Livrables liés : `data-model`, `openapi-schema`, `api-style-guide`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | direction-technique | Création initiale |
