# Memory System

Système de mémoire de l'agence pour la persistance du contexte.

## Structure

```
memory/
├── short-term/          # Session courante (volatile)
│   └── current.json     # État de la session active
│
├── long-term/           # Persistant (cross-sessions)
│   ├── decisions.json   # Index de toutes les décisions
│   ├── patterns.json    # Patterns appris du projet
│   ├── errors.json      # Erreurs passées à éviter
│   └── preferences.json # Préférences utilisateur/projet
│
└── README.md            # Ce fichier
```

## Usage

Voir `core/memory-protocol.md` pour la documentation complète.

### Lecture

```yaml
# Au début d'une tâche
memory_retrieval:
  query: "[type de tâche]"
  search_in:
    - decisions: "tags matching"
    - patterns: "applies_to matching"
    - errors: "related_agent matching"
```

### Écriture

```yaml
# Après une action significative
memory_update:
  target: "[fichier]"
  operation: "add | update | remove"
  entry: { ... }
```

## Synchronisation

La mémoire long-term se synchronise avec `.project/` :

| Memory File | Source |
|-------------|--------|
| `decisions.json` | `.project/03-architecture/decisions/` |
| `patterns.json` | `.project/03-architecture/conventions.md` |
| `errors.json` | `.project/07-audit/incidents/` |
