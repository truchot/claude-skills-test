# ADR-003: JSON Files for State Management

## Status
**Accepted** - 2026-01-22

## Context

We need persistent state storage for:
- Current workflow progress
- Session context
- Long-term memory (decisions, patterns, errors)
- Project documentation index

Requirements:
- Works offline (CLI tool)
- Zero external dependencies
- Human-readable for debugging
- Version controllable (git)
- Fast for single-user access
- Portable across machines

## Options Considered

### Option 1: JSON Files
Store state in `.json` files within the project.

**Pros:**
- Zero setup: just files
- Human-readable: can inspect/edit with any editor
- Git-friendly: trackable, diffable, mergeable
- Portable: copy project = copy state
- No dependencies: works everywhere
- Fast: filesystem is fast for small files
- Debuggable: `cat state.json` shows everything

**Cons:**
- No concurrent access (single user only)
- No queries (must load entire file)
- No relations (denormalized)
- Manual schema enforcement
- Can be corrupted by bad writes

### Option 2: SQLite
Embedded relational database in a single file.

**Pros:**
- SQL queries
- Relations and constraints
- ACID transactions
- Single file (portable)
- Better for large datasets

**Cons:**
- Binary file (not human-readable)
- Not git-diffable
- Requires SQLite dependency
- Overkill for our data size
- Schema migrations needed
- Harder to debug without tools

### Option 3: External Database (PostgreSQL, etc.)
Dedicated database server.

**Pros:**
- Scalable
- Concurrent access
- Full SQL capabilities
- Backups, replication

**Cons:**
- Requires running server
- Setup complexity
- Not portable
- Overkill for CLI tool
- Network dependency
- Cost (if hosted)

### Option 4: Key-Value Store (Redis, LevelDB)
Fast key-value storage.

**Pros:**
- Very fast reads/writes
- Good for simple lookups

**Cons:**
- No structure/relations
- Binary format (LevelDB)
- External dependency (Redis)
- Not better than JSON for our use case

## Decision

**Chosen: Option 1 - JSON Files**

## Rationale

### Our Use Case Is Simple

Current state structure:
```json
{
  "version": "1.0",
  "workflow": {"name": "feature", "step": 3},
  "project": {"id": "PRJ-001"},
  "context": {"key_decisions": []}
}
```

This is ~20 fields. No complex queries needed. JSON handles this trivially.

### CLI Tool Requirements

| Requirement | JSON | SQLite | External DB |
|-------------|------|--------|-------------|
| Zero setup | ✅ | ⚠️ | ❌ |
| Offline | ✅ | ✅ | ❌ |
| Git-trackable | ✅ | ❌ | ❌ |
| Human-readable | ✅ | ❌ | ❌ |
| Portable | ✅ | ✅ | ❌ |
| No dependencies | ✅ | ⚠️ | ❌ |

JSON wins on all CLI-relevant criteria.

### Debugging Is Critical

When something goes wrong:
```bash
# JSON: instant inspection
cat .web-agency/state/current.json

# SQLite: need tools
sqlite3 .web-agency/state.db "SELECT * FROM state"

# External DB: need connection
psql -h host -d db -c "SELECT..."
```

For a dev tool, debuggability trumps features we don't need.

### Git Integration

State changes become visible in version control:
```diff
{
  "workflow": {
-   "step": 2,
+   "step": 3,
    "status": "in_progress"
  }
}
```

This is impossible with binary formats.

### Future-Proofing

If we later need:
- **Multi-user**: Migrate to SQLite/PostgreSQL (state schema stays same)
- **Queries**: Add a JSON query layer or migrate
- **Scale**: This is a CLI tool; scale isn't a concern

JSON doesn't lock us in. Migration path is clear if needed.

## Implementation

### File Structure

```
.web-agency/
├── state/
│   ├── current.json      # Active session state
│   ├── schema.json       # JSON Schema for validation
│   └── README.md         # Documentation
│
└── memory/
    ├── short-term/
    │   └── current.json  # Session memory
    └── long-term/
        ├── decisions.json    # ADR index
        ├── patterns.json     # Learned patterns
        ├── errors.json       # Past errors
        └── preferences.json  # User prefs
```

### Schema Validation

JSON Schema ensures structure:
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "version": {"type": "string"},
    "workflow": {
      "properties": {
        "name": {"enum": ["feature", "bugfix", "deployment"]},
        "status": {"enum": ["in_progress", "completed", "paused"]}
      }
    }
  }
}
```

### Read/Write Pattern

```javascript
// Read
const state = JSON.parse(fs.readFileSync('state/current.json'))

// Modify
state.workflow.step = 4

// Write (atomic via rename)
fs.writeFileSync('state/current.json.tmp', JSON.stringify(state, null, 2))
fs.renameSync('state/current.json.tmp', 'state/current.json')
```

### Corruption Recovery

```bash
# State corrupted? Reset to valid empty state
echo '{"version":"1.0","workflow":null}' > state/current.json

# Or restore from git
git checkout state/current.json
```

## Consequences

### Positive
- Instant setup: works immediately
- Full transparency: see exactly what's stored
- Git integration: track state changes
- Easy debugging: `cat` is all you need
- Portable: copy folder = full state
- No dependencies: runs anywhere

### Negative
- Single-user only (no concurrent writes)
- No complex queries
- Must validate schema manually
- Corruption possible (mitigated by atomic writes)

### Acceptable Trade-offs
- Single-user is fine for CLI tool
- We don't need complex queries
- JSON Schema handles validation
- Atomic writes + git backup handle corruption

## Migration Path

If requirements change:

1. **Need queries?** → Add JSON query library or migrate to SQLite
2. **Need multi-user?** → Migrate to SQLite with same schema
3. **Need cloud sync?** → Add sync layer or migrate to hosted DB

JSON schema translates directly to SQL schema, so migration is straightforward.

## References
- [JSON Schema](https://json-schema.org/)
- [SQLite: When to Use](https://www.sqlite.org/whentouse.html)
- [12-Factor App: Backing Services](https://12factor.net/backing-services)
