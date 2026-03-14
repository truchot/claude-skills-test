# Deliverable Schema

> Ce document définit le schéma obligatoire pour tous les livrables.

## Frontmatter YAML

Chaque livrable **DOIT** avoir un frontmatter YAML valide en début de fichier.

### Champs Obligatoires

| Champ | Type | Description | Exemple |
|-------|------|-------------|---------|
| `id` | `string` | Identifiant unique en kebab-case | `"technical-specification"` |
| `name` | `string` | Nom lisible du livrable | `"Spécification Technique"` |
| `version` | `string` | Version au format semver | `"1.0.0"` |
| `category` | `enum` | Catégorie du livrable | `"specification"` |
| `status` | `enum` | Statut du livrable | `"active"` |
| `phase` | `string` | Phase du projet (format: `X-name`) | `"3-conception"` |
| `order` | `integer` | Ordre dans la phase (1-99) | `5` |
| `agents` | `array[string]` | Agents qui produisent ce livrable | `["direction-technique/specification/spec-tech"]` |
| `tags` | `array[string]` | Tags pour la recherche | `["specification", "technical"]` |

### Champs Optionnels

| Champ | Type | Description | Exemple |
|-------|------|-------------|---------|
| `consumes` | `array[string]` | IDs des livrables en entrée | `["requirements-list", "data-model"]` |
| `produces_for` | `array[string]` | Agents qui consomment ce livrable | `["backend-developer/api/rest-design"]` |
| `workflows` | `array[object]` | Workflows associés | Voir ci-dessous |

### Format des Paths d'Agents

Les champs `agents` et `produces_for` utilisent des paths hiérarchiques au format :

```
skill/domain/agent-name
```

**Exemples :**
- `direction-technique/specification/specification-technique`
- `backend-developer/api/rest-design`
- `marketing/acquisition/seo/contenu/recherche-mots-cles`

**Wildcards supportés :**

| Pattern | Description | Exemple |
|---------|-------------|---------|
| `skill/domain/*` | Tous les agents d'un domaine | `backend-developer/api/*` |
| `skill/*/agent` | Agent dans tous les domaines | `frontend-developer/*/hooks` |
| `skill/*/all` | Tous les agents d'un skill | `backend-developer/*/all` |

**Usage courant des wildcards :**
```yaml
produces_for:
  - backend-developer/*/all      # Tous les agents backend
  - frontend-developer/*/all     # Tous les agents frontend
  - devops/cicd/*               # Tous les agents CI/CD
```

> **Note** : Les wildcards sont principalement utilisés dans `produces_for` pour indiquer qu'un livrable est consommé par plusieurs agents. Dans `agents`, préférez lister explicitement chaque agent producteur.

### Valeurs Valides

#### `category`

```yaml
category: process | code | design | specification | report | strategy | documentation | marketing | wordpress | legal | support | commercial | finance
```

| Valeur | Description | Répertoire |
|--------|-------------|------------|
| `process` | Processus et workflows | `by-category/process/` |
| `code` | Artefacts de code | `by-category/code/` |
| `design` | Livrables design | `by-category/design/` |
| `specification` | Spécifications | `by-category/specification/` |
| `report` | Rapports et audits | `by-category/report/` |
| `strategy` | Documents stratégiques | `by-category/strategy/` |
| `documentation` | Documentation | `by-category/documentation/` |
| `marketing` | Livrables marketing | `by-category/marketing/` |
| `wordpress` | Livrables WordPress | `by-category/wordpress/` |
| `legal` | Conformité juridique et RGPD | `by-category/legal/` |
| `support` | Support client et SLAs | `by-category/support/` |
| `commercial` | Vente et propositions | `by-category/commercial/` |
| `finance` | Finance et comptabilité | `by-category/finance/` |

**Règle** : La valeur de `category` **DOIT** correspondre au répertoire parent du fichier.

#### `status`

```yaml
status: active | draft | deprecated
```

| Valeur | Description |
|--------|-------------|
| `active` | Livrable en usage, peut être utilisé |
| `draft` | En cours de rédaction, pas finalisé |
| `deprecated` | Obsolète, ne plus utiliser |

#### `phase`

```yaml
phase: "1-intake" | "2-strategy" | "3-conception" | "4-realisation" | "5-deploiement" | "6-maintenance"
```

| Phase | Description |
|-------|-------------|
| `1-intake` | Prise de brief client |
| `2-strategy` | Stratégie et estimation |
| `3-conception` | Spécifications et design |
| `4-realisation` | Développement et tests |
| `5-deploiement` | Déploiement et CI/CD |
| `6-maintenance` | Post-lancement et maintenance |

### Structure `workflows`

```yaml
workflows:
  - id: wf-xxx-creation      # ID unique du workflow
    template: wf-creation    # Template de workflow
    phase: Conception        # Phase du workflow
    name: Création du X      # Nom lisible
    duration: 2 jours        # Durée estimée (voir note ci-dessous)
```

**Templates disponibles** :
- `wf-creation` : Workflow de création
- `wf-validation` : Workflow de validation/revue
- `wf-audit` : Workflow d'audit
- `wf-report` : Workflow de reporting
- `wf-planning` : Workflow de planification
- `wf-strategy` : Workflow stratégique

> **⚠️ Note sur `duration`** : Les durées sont des **estimations indicatives** à des fins de planification de capacité, pas des engagements contractuels. Elles peuvent varier selon la complexité du projet, les données disponibles, et l'expérience de l'équipe. Ne pas utiliser pour communiquer des délais aux clients.

### Politique de Dépendances (`consumes`)

Le champ `consumes` liste les livrables dont dépend le livrable actuel.

#### Règle : Dépendances Directes Uniquement

```yaml
# ✅ CORRECT : Lister uniquement les dépendances directes
consumes:
  - problem-definition    # Dépendance directe
  - offer-definition      # Dépendance directe

# ❌ INCORRECT : Inclure les dépendances transitives
consumes:
  - client-request        # Transitif (via problem-definition)
  - problem-definition
  - offer-definition
```

#### Pourquoi Dépendances Directes ?

| Approche | Avantages | Inconvénients |
|----------|-----------|---------------|
| **Directes uniquement** | Simple, maintenable, évite la redondance | Nécessite de comprendre la chaîne |
| **Transitives incluses** | Explicite, tout visible | Verbeux, risque d'incohérence |

**Notre choix** : Dépendances directes uniquement pour :
- Réduire la duplication
- Faciliter la maintenance
- Éviter les incohérences lors des mises à jour

#### Chaîne de Dépendances Implicite

```
client-request (NIVEAU 0)
      ↓
problem-definition (NIVEAU 1) - consumes: [client-request]
      ↓
offer-definition (NIVEAU 2) - consumes: [client-request, problem-definition]
      ↓
persona (NIVEAU 3) - consumes: [problem-definition, offer-definition]
```

> **Note** : Si un livrable consomme `persona`, il a implicitement accès à `problem-definition`, `offer-definition` et `client-request` via la chaîne.

#### Exceptions

Inclure une dépendance transitive si :
1. Le livrable utilise **directement** le contenu du livrable transitif (pas juste indirectement)
2. C'est nécessaire pour la **validation** (ex: vérifier cohérence avec la source)

## Exemple Complet

```yaml
---
id: technical-specification
name: Spécification Technique
version: 1.0.0
category: specification
status: active
phase: "3-conception"
order: 1
agents:
  - direction-technique/specification/specification-technique
  - lead-dev/architecture/spec-review
consumes:
  - requirements-list
  - data-model
  - stack-recommendation
produces_for:
  - backend-developer/architecture/ddd
  - frontend-developer/architecture/component-design
  - devops/infrastructure/setup
workflows:
  - id: wf-spec-creation
    template: wf-creation
    phase: Conception
    name: Rédaction spécification technique
    duration: 3 jours
  - id: wf-spec-validation
    template: wf-validation
    phase: Review
    name: Validation spécification
    duration: 1 jour
tags:
  - specification
  - technical
  - architecture
---
```

## Structure du Document

Après le frontmatter, chaque livrable **DOIT** contenir :

### Sections Obligatoires

1. **`# [Nom du Livrable]`** - Titre H1 correspondant au `name`
2. **`## Description`** - Description du livrable (2-5 phrases)
3. **`## Cas d'Usage`** - Liste des cas d'usage
4. **`## Structure du Livrable`** - Template markdown du contenu
5. **`## Critères d'Acceptation`** - Checklist de validation
6. **`## Points de Contrôle Humain`** - Checkpoints de supervision

### Sections Recommandées

7. **`## Exemples`** - Exemples concrets
8. **`## Anti-Patterns`** - Ce qu'il faut éviter
9. **`## Intégrations`** - Relations avec autres livrables

## Validation

### JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "name", "version", "category", "status", "phase", "order", "agents", "tags"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9-]*$"
    },
    "name": {
      "type": "string",
      "minLength": 3
    },
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$"
    },
    "category": {
      "type": "string",
      "enum": ["process", "code", "design", "specification", "report", "strategy", "documentation", "marketing", "wordpress", "legal", "support", "commercial", "finance"]
    },
    "status": {
      "type": "string",
      "enum": ["active", "draft", "deprecated"]
    },
    "phase": {
      "type": "string",
      "pattern": "^\\d+-[a-z]+$"
    },
    "order": {
      "type": "integer",
      "minimum": 1,
      "maximum": 99
    },
    "agents": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 1
    },
    "tags": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 1
    },
    "consumes": {
      "type": "array",
      "items": { "type": "string" }
    },
    "produces_for": {
      "type": "array",
      "items": { "type": "string" }
    },
    "workflows": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "template", "phase", "name", "duration"],
        "properties": {
          "id": { "type": "string" },
          "template": { "type": "string" },
          "phase": { "type": "string" },
          "name": { "type": "string" },
          "duration": { "type": "string" }
        }
      }
    }
  }
}
```

### Script de Validation

```bash
# Valider tous les livrables
./.web-agency/scripts/validate-all.sh

# Valider uniquement le frontmatter
./.web-agency/scripts/validate-frontmatter.sh

# Valider les cross-références
./.web-agency/scripts/validate-crossrefs.sh
```

## Conventions de Nommage

### Fichiers

- Format : `kebab-case.md`
- Exemple : `technical-specification.md`

### IDs

- Format : `kebab-case`
- Unique au sein de tous les livrables
- Exemple : `technical-specification`

### Agents Path

- Format : `skill/domain/agent-name`
- Exemple : `direction-technique/specification/specification-technique`
- Pour la terminologie et les synonymes, consulter le [Glossaire officiel](../GLOSSAIRE.md)
