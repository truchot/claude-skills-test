# Orchestrator Protocol

> **Shared execution logic for all domain commands**

This protocol defines the common execution steps that ALL domain commands (`/tech`, `/design`, `/project`, `/marketing`) must follow. Each command extends this protocol with domain-specific routing rules.

---

## Execution Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   COMMAND EXECUTION                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  $ARGUMENTS received                                        │
│       │                                                     │
│       ▼                                                     │
│  ┌──────────────┐                                           │
│  │ 1. LOAD STATE│  → Check for in-progress workflow         │
│  └──────────────┘                                           │
│       │                                                     │
│       ▼                                                     │
│  ┌──────────────┐                                           │
│  │ 2. ANALYZE   │  → Classify using domain-specific rules   │
│  └──────────────┘                                           │
│       │                                                     │
│       ▼                                                     │
│  ┌──────────────┐                                           │
│  │ 3. ROUTE     │  → Select workflow or direct agent        │
│  └──────────────┘                                           │
│       │                                                     │
│       ▼                                                     │
│  ┌──────────────┐                                           │
│  │ 4. EXECUTE   │  → Run workflow steps or agent            │
│  └──────────────┘                                           │
│       │                                                     │
│       ▼                                                     │
│  ┌──────────────┐                                           │
│  │ 5. GATES     │  → Handle checkpoints (🔴/🟡/🟢)          │
│  └──────────────┘                                           │
│       │                                                     │
│       ▼                                                     │
│  ┌──────────────┐                                           │
│  │ 6. FINALIZE  │  → Update state, present summary          │
│  └──────────────┘                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Step 1: Load State

```yaml
action: Read .web-agency/state/current.json

if_workflow_in_progress:
  condition: workflow.status == "in_progress"
  action: Resume the current workflow context

else:
  action: Continue with request analysis
```

---

## Step 2: Analyze Request

Analyze `$ARGUMENTS` to produce a classification:

```yaml
classification:
  type: "[from domain-specific keywords]"
  complexity: simple | full_workflow
  urgency: P1 | P2 | P3 | P4  # if applicable
  scope: "[domain-specific scope]"
```

**Keyword matching rules:**
- Match against domain-specific keyword table
- If multiple matches, use the most specific
- If "how", "why", "what is", "?" → type = "question"

---

## Step 3: Route to Workflow or Agent

```yaml
routing:
  if_question:
    action: Answer directly from context
    workflow: none

  if_full_workflow:
    action: Load workflow file
    path: ".web-agency/workflows/[workflow-name].md"
    initialize_state: true

  if_simple:
    action: Load direct agent
    path: ".web-agency/skills/[domain]/[agent].md"
    initialize_state: false
```

---

## Step 4: Execute

### For Full Workflow

```yaml
workflow_execution:
  for_each_step:
    1_announce: |
      "## Step {n}/{total}: {step_name}"

    2_load_agent: |
      Read .web-agency/skills/{agent}.md

    3_execute: |
      Follow agent instructions
      Produce deliverables in .project/ if applicable

    4_check_gate: |
      Apply gate rules (see Step 5)

    5_update_state: |
      steps[n].status = "completed"
      current_step += 1

    6_continue: |
      Move to next step (unless blocked by 🔴 gate)
```

### For Direct Agent

```yaml
agent_execution:
  1_load: Read the agent file
  2_execute: Follow agent procedure
  3_output: Produce structured deliverable
  4_propose: Suggest next actions
```

---

## Step 5: Gate Management

### 🔴 BLOCKING Gate

**ABSOLUTE RULE**: NEVER pass a 🔴 gate without explicit user response.

```markdown
---
## 🔴 CHECKPOINT - [Step Name]

### Deliverables produced
[List with paths]

### Summary
[What was done]

### Points of attention
[If applicable]

---
⚠️ **I CANNOT CONTINUE WITHOUT YOUR VALIDATION**

Reply:
- ✅ "Validated" → I continue
- ❌ "Adjust" → Specify modifications
- ❓ Questions → I clarify
---
```

### 🟡 ADVISORY Gate

```markdown
---
## 🟡 Progress point

**Done**: [Summary]
**Deliverable**: [Path]

Should I continue with [next step]?
---
```

If no immediate response, continue after presenting.

### 🟢 AUTOMATIC Gate

```yaml
auto_gate:
  action: Execute automatic checks (lint, tests, build)
  if_pass: Continue to next step
  if_fail: Present error, propose fix
```

---

## Step 6: Finalization

```yaml
finalization:
  1_update_state: |
    Set workflow.status = "completed" in state/current.json

  2_archive: |
    If project exists, archive in .project/07-audit/sessions/

  3_present_summary: |
    ## ✅ Workflow completed
    - [Step summary]
    - [Deliverables produced]
    - [Suggested next actions]
```

---

## State Schema

Commands update `.web-agency/state/current.json`:

```json
{
  "workflow": {
    "name": "[workflow name]",
    "started_at": "[ISO timestamp]",
    "current_step": 1,
    "status": "in_progress | completed | blocked"
  },
  "steps": [
    {
      "name": "[step name]",
      "status": "pending | in_progress | completed",
      "gate": "🔴 | 🟡 | 🟢"
    }
  ],
  "context": {
    "domain": "[detected domain]",
    "type": "[request type]",
    "urgency": "[if applicable]"
  }
}
```

---

## Domain Command Template

Each domain command follows this structure:

```markdown
# /[domain] - [Domain Name] Command

You are the [domain] orchestrator.

**Protocol**: Follow `.web-agency/core/orchestrator-protocol.md`

## Domain-Specific Rules

### Request Types & Keywords
[Table mapping keywords to types]

### Workflows
[Table mapping types to workflow files]

### Direct Agents
[Table mapping types to agent files]

### Deliverable Paths
[Where outputs are stored]

## Examples
[2-3 usage examples]

---

**START NOW**: Analyze `$ARGUMENTS` and execute.
```

---

## Integration with Intake Pipeline

For non-trivial requests (L2+), the orchestrator should first run the intake pipeline:

```
CLASSIFY → CLARIFY → DECOMPOSE → CONTRACT → EXECUTE
```

See `.web-agency/intake/PROTOCOL.md` for details.

**Rule**: No execution without approved contract (for complex requests).
