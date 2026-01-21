# Memory Protocol

Ce fichier définit comment l'agence **mémorise** et **réutilise** les connaissances.

---

## Architecture Mémoire

```
memory/
├── short-term/              # Session courante
│   └── current.json         # État volatile
│
├── long-term/               # Persistant cross-sessions
│   ├── decisions.json       # Index des décisions (ADR, MKT, etc.)
│   ├── patterns.json        # Patterns appris du projet
│   ├── errors.json          # Erreurs à éviter
│   └── preferences.json     # Préférences utilisateur
│
└── retrieval.md             # Ce fichier (comment utiliser)
```

---

## Short-Term Memory

### Objectif
Maintenir le contexte de la **session courante**.

### Contenu
```json
{
  "session_id": "SES-2024-001",
  "started_at": "2024-01-15T10:00:00Z",
  "workflow": {
    "name": "feature",
    "step": 3,
    "status": "in_progress"
  },
  "context": {
    "loaded_files": ["spec.md", "architecture.md"],
    "key_facts": [
      "Client: ACME Corp",
      "Stack: Next.js + Prisma",
      "Deadline: 15 février"
    ],
    "decisions_this_session": ["D-001", "D-002"],
    "artifacts_created": [".project/specs/feature-x.md"]
  },
  "conversation": {
    "summary": "Développement feature authentification OAuth",
    "last_action": "Architecture validée",
    "pending": "Implémentation backend"
  }
}
```

### Lifecycle
- **Créé** : Au début de chaque session/workflow
- **Mis à jour** : Après chaque action significative
- **Archivé** : À la fin du workflow → `.project/07-audit/sessions/`
- **Reset** : Nouvelle session = nouvel état

---

## Long-Term Memory

### 1. Decisions Index (`decisions.json`)

Index de toutes les décisions prises sur le projet.

```json
{
  "version": "1.0",
  "project_id": "PRJ-001",
  "decisions": [
    {
      "id": "ADR-001",
      "type": "architecture",
      "title": "Utilisation de PostgreSQL",
      "date": "2024-01-10",
      "status": "accepted",
      "path": ".project/03-architecture/decisions/ADR-001.md",
      "tags": ["database", "infrastructure"],
      "summary": "PostgreSQL choisi pour relations complexes et JSONB"
    },
    {
      "id": "MKT-001",
      "type": "marketing",
      "title": "Stratégie SEO content-first",
      "date": "2024-01-12",
      "status": "accepted",
      "path": ".project/04-specs/seo/SEO-001/decisions/MKT-001.md",
      "tags": ["seo", "content"],
      "summary": "Focus sur contenu long-form avant link building"
    }
  ]
}
```

**Usage** : Avant de prendre une décision, consulter si une décision similaire existe.

### 2. Patterns (`patterns.json`)

Patterns spécifiques appris du projet.

```json
{
  "version": "1.0",
  "patterns": {
    "code": [
      {
        "id": "PAT-001",
        "name": "API Response Format",
        "description": "Format standard des réponses API",
        "example": "{ success: boolean, data?: T, error?: { code, message } }",
        "applies_to": ["backend", "api"]
      }
    ],
    "process": [
      {
        "id": "PAT-002",
        "name": "Review avant merge",
        "description": "Toujours review par tech lead avant merge sur main",
        "applies_to": ["workflow", "code-review"]
      }
    ],
    "naming": [
      {
        "id": "PAT-003",
        "name": "Feature branches",
        "description": "Format: feat/TICKET-description-courte",
        "example": "feat/AUTH-001-oauth-google",
        "applies_to": ["git", "branches"]
      }
    ]
  }
}
```

**Usage** : Appliquer les patterns du projet plutôt que des conventions génériques.

### 3. Errors (`errors.json`)

Erreurs passées à ne pas répéter.

```json
{
  "version": "1.0",
  "errors": [
    {
      "id": "ERR-001",
      "date": "2024-01-08",
      "type": "technical",
      "description": "Déploiement sans migration DB",
      "consequence": "500 errors en prod pendant 30min",
      "prevention": "Toujours vérifier pending migrations avant deploy",
      "related_agent": "deployment"
    },
    {
      "id": "ERR-002",
      "date": "2024-01-11",
      "type": "process",
      "description": "Feature livrée sans validation client",
      "consequence": "Refonte complète du design",
      "prevention": "Gate BLOQUANTE sur maquettes avant implémentation",
      "related_agent": "specification"
    }
  ]
}
```

**Usage** : Au début d'une tâche similaire, rappeler les erreurs passées.

### 4. Preferences (`preferences.json`)

Préférences utilisateur/projet.

```json
{
  "version": "1.0",
  "user": {
    "communication_style": "concis",
    "detail_level": "technique",
    "language": "fr",
    "timezone": "Europe/Paris"
  },
  "project": {
    "formality": "professional",
    "documentation_depth": "detailed",
    "commit_style": "conventional",
    "review_strictness": "high"
  },
  "agents": {
    "code-reviewer": {
      "severity_threshold": "warning",
      "focus": ["security", "performance"]
    },
    "estimation": {
      "buffer_percentage": 20,
      "include_testing": true
    }
  }
}
```

---

## Retrieval Protocol

### Quand Consulter la Mémoire

| Situation | Mémoire à consulter |
|-----------|---------------------|
| Nouvelle décision technique | `decisions.json` (ADR existants) |
| Génération de code | `patterns.json` (conventions projet) |
| Déploiement | `errors.json` (erreurs passées) |
| Communication client | `preferences.json` (style) |
| Reprise de session | `short-term/current.json` |

### Comment Consulter

```yaml
# Au début d'une tâche
memory_retrieval:
  query: "[type de tâche]"
  search_in:
    - decisions: "tags contenant '[domaine]'"
    - patterns: "applies_to contenant '[contexte]'"
    - errors: "related_agent = '[agent actuel]'"

  results:
    relevant_decisions: [...]
    applicable_patterns: [...]
    past_errors: [...]
```

### Format de Rappel dans le Contexte

Quand un agent charge du contexte mémoire :

```markdown
## MEMORY CONTEXT

### Décisions pertinentes
- **ADR-001**: PostgreSQL pour la DB (relations complexes)
- **ADR-003**: JWT avec refresh tokens (auth)

### Patterns à appliquer
- API Response: `{ success, data?, error? }`
- Branches: `feat/TICKET-description`

### Erreurs à éviter
- ⚠️ ERR-001: Toujours vérifier migrations avant deploy
```

---

## Mise à Jour de la Mémoire

### Automatique
- `short-term/current.json` : Après chaque action
- `decisions.json` : Quand un ADR/MKT est créé

### Sur Trigger
- `patterns.json` : Quand un pattern est identifié/validé
- `errors.json` : Après un incident ou erreur significative
- `preferences.json` : Sur demande explicite utilisateur

### Format de Mise à Jour

```yaml
memory_update:
  target: "[fichier mémoire]"
  operation: "add | update | remove"
  entry:
    [contenu selon le schema du fichier]
  reason: "[pourquoi cette mise à jour]"
```

---

## Synchronisation avec .project/

La mémoire long-term est synchronisée avec `.project/` :

| Memory | .project/ equivalent |
|--------|---------------------|
| `decisions.json` | Index de `03-architecture/decisions/` + `04-specs/*/decisions/` |
| `patterns.json` | Extrait de `03-architecture/conventions.md` |
| `errors.json` | Log de `07-audit/incidents/` |
| `preferences.json` | Config dans `.project/config.json` |

### Commande de Sync

```bash
# Rebuild memory from .project/
/doc sync-memory

# Export memory to .project/
/doc export-memory
```

---

## Initialisation Projet

Pour un nouveau projet :

```json
// memory/long-term/decisions.json
{
  "version": "1.0",
  "project_id": "NEW",
  "decisions": []
}

// memory/long-term/patterns.json
{
  "version": "1.0",
  "patterns": {
    "code": [],
    "process": [],
    "naming": []
  }
}

// memory/long-term/errors.json
{
  "version": "1.0",
  "errors": []
}

// memory/long-term/preferences.json
{
  "version": "1.0",
  "user": {},
  "project": {},
  "agents": {}
}
```

Les fichiers se remplissent au fil du projet.
