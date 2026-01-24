# Troubleshooting Guide

Common issues and how to fix them.

---

## Workflow Issues

### Workflow won't start

**Symptom**: Command runs but nothing happens or gets wrong workflow

**Causes & Fixes**:

| Cause | Fix |
|-------|-----|
| Vague request | Be more specific: `/tech Add Google OAuth` not `/tech add login` |
| Another workflow in progress | Check `state/current.json`, finish or reset it |
| Wrong command | Use `/tech` for code, `/marketing` for SEO, etc. |

```bash
# Check if workflow is stuck
cat .web-agency/state/current.json

# Reset if needed
echo '{"version":"1.0","workflow":null}' > .web-agency/state/current.json
```

---

### Workflow stuck at gate

**Symptom**: Waiting at 🔴 CHECKPOINT, nothing happens

**Fix**: You must respond explicitly.

```bash
# Valid responses
validated        # Continue
ok               # Continue
yes              # Continue
adjust: [notes]  # Request changes
stop             # Abort workflow
```

**Not valid**: Just pressing Enter, saying "sure", or ignoring.

---

### Workflow interrupted / Lost progress

**Symptom**: Session ended mid-workflow, want to continue

**Fix**:

```bash
# Resume workflow
/tech continue

# Or explicitly
/tech resume from step 4
```

The state is saved in `state/current.json`, so progress isn't lost.

---

### Wrong workflow selected

**Symptom**: Asked for bugfix but got feature workflow

**Fix**: Be explicit about intent.

```bash
# Ambiguous
/tech fix the login

# Clear
/tech BUGFIX: Login returns 401 for valid users

# Keywords that help routing:
# - "bug", "fix", "broken", "error" → bugfix workflow
# - "add", "new", "create", "implement" → feature workflow
# - "deploy", "release", "prod" → deployment workflow
# - "review", "PR", "check" → code-review workflow
```

---

## State Issues

### State file corrupted

**Symptom**: Error reading state, workflow behaves strangely

**Fix**: Reset to valid empty state.

```bash
# Backup current (for debugging)
cp .web-agency/state/current.json .web-agency/state/current.json.bak

# Reset to empty
cat > .web-agency/state/current.json << 'EOF'
{
  "version": "1.0",
  "workflow": null,
  "project": null,
  "context": {}
}
EOF
```

---

### State not updating

**Symptom**: Progress not saved between sessions

**Possible causes**:
1. File permissions issue
2. Path incorrect
3. Write failed silently

**Fix**:

```bash
# Check file exists and is writable
ls -la .web-agency/state/current.json

# If missing, create it
mkdir -p .web-agency/state
echo '{"version":"1.0"}' > .web-agency/state/current.json

# Check disk space (unlikely but possible)
df -h .
```

---

### State out of sync with .project/

**Symptom**: State says step 5 but deliverables missing

**Fix**: Trust `.project/` as source of truth.

```bash
# Check what actually exists
ls -la .project/04-specs/features/

# Manually update state to match reality
# Edit state/current.json to reflect actual progress
```

---

## Agent Issues

### Agent gives irrelevant response

**Symptom**: Asked for backend code, got frontend advice

**Causes**:
1. Request ambiguous
2. Wrong context loaded

**Fix**:

```bash
# Be explicit about domain
/tech BACKEND: Create API endpoint for user export

# Or specify the layer
/tech Create Node.js service for data aggregation (not frontend)
```

---

### Agent output doesn't match expected format

**Symptom**: Expected YAML, got prose

**This is usually fine** - agents adapt to context. If you need strict format:

```bash
# Ask explicitly
/tech Audit security, output as YAML with severity scores
```

---

### Agent seems to ignore rules

**Symptom**: Agent doesn't follow its documented constraints

**Reality check**: Agents are prompts, not code. They guide behavior but don't enforce.

**Workaround**: Remind in your request:

```bash
# Remind of rule
/tech Estimate feature X - remember to give min/max range, not single number
```

---

## Gate Issues

### Too many gates / Too slow

**Symptom**: Every small action requires validation

**Reality**: This is by design for important workflows.

**Options**:
1. Use more specific requests to get direct responses
2. For trusted operations, respond quickly: `ok` `ok` `ok`
3. For simple questions, gates are skipped automatically

```bash
# This won't trigger gates (question)
/tech What's the best way to handle auth?

# This will trigger gates (implementation)
/tech Implement auth with NextAuth
```

---

### Gate skipped when it shouldn't be

**Symptom**: Expected a checkpoint but workflow continued

**Possible causes**:
1. Gate type was 🟡 INFORMATIVE (auto-continues)
2. Gate type was 🟢 AUTO (checks passed)
3. Workflow configuration

**Check workflow definition**:
```bash
cat .web-agency/workflows/feature.md | grep -A5 "gate"
```

---

## Memory Issues

### Decisions not being remembered

**Symptom**: Asked about same thing twice, no memory of previous answer

**Check if memory is being written**:

```bash
cat .web-agency/memory/long-term/decisions.json
```

**Manual add if needed**:
```bash
# Add a decision manually
# Edit decisions.json and add entry
```

---

### Wrong pattern applied

**Symptom**: Code style doesn't match project conventions

**Fix**: Update patterns file:

```bash
# Check current patterns
cat .web-agency/memory/long-term/patterns.json

# Add your convention
# Edit the file to add correct pattern
```

---

## File/Path Issues

### Deliverables in wrong location

**Symptom**: Can't find output files

**Standard locations**:
```
.project/
├── 01-vision/           # PRD, personas
├── 02-requirements/     # User stories
├── 03-architecture/     # ADRs, stack docs
│   └── decisions/       # ADR-001.md, ADR-002.md
├── 04-specs/            # Feature specs
│   ├── features/        # Tech features
│   ├── campaigns/       # Marketing campaigns
│   └── seo/             # SEO projects
├── 05-quality/          # Test reports
├── 06-operations/       # Releases, runbooks
└── 07-audit/            # Session logs
```

**Quick search**:
```bash
# Find recent markdown files
find .project -name "*.md" -mtime -1

# Find specific deliverable
find .project -name "*export*"
```

---

### .project/ doesn't exist

**Symptom**: First time using, no output location

**Fix**: Initialize project structure:

```bash
/project init
# or manually
mkdir -p .project/{01-vision,02-requirements,03-architecture/decisions,04-specs/features,05-quality,06-operations,07-audit/sessions}
```

---

## Performance Issues

### Response too slow

**Possible causes**:
1. Too much context loaded
2. Complex workflow with many steps
3. Large files being processed

**Fixes**:
1. Be more specific (less context needed)
2. Break into smaller requests
3. Check if stuck at a step

---

### Token/context limit reached

**Symptom**: Response truncated or error about limits

**Fix**:
1. Finish current workflow (saves state)
2. Start new session
3. State persists, so you can continue

```bash
# In new session
/tech continue from where we left off
```

---

## Getting Help

### Check architecture docs
```bash
cat .web-agency/ORCHESTRATOR.md
cat .web-agency/agents/_base.md
```

### Validate state schema
```bash
# If you have ajv installed
ajv validate -s .web-agency/state/schema.json -d .web-agency/state/current.json
```

### Reset everything (nuclear option)
```bash
# Backup first
cp -r .web-agency/state .web-agency/state.bak
cp -r .web-agency/memory .web-agency/memory.bak

# Reset
echo '{"version":"1.0"}' > .web-agency/state/current.json
echo '{"version":"1.0","decisions":[]}' > .web-agency/memory/long-term/decisions.json
echo '{"version":"1.0","patterns":{}}' > .web-agency/memory/long-term/patterns.json
echo '{"version":"1.0","errors":[]}' > .web-agency/memory/long-term/errors.json
```

---

## Still Stuck?

1. **Check the examples**: [EXAMPLES.md](./EXAMPLES.md)
2. **Read the how-to**: [HOW_TO.md](./HOW_TO.md)
3. **Review orchestrator logic**: [ORCHESTRATOR.md](./ORCHESTRATOR.md)
4. **Look at agent definitions**: `agents/[domain]/[agent].md`
