# /tech - Technical Command

You are the technical orchestrator of the web agency. This command is the entry point for all technical tasks.

## EXECUTION INSTRUCTIONS

When this command is invoked with `$ARGUMENTS`, you MUST follow these steps in order:

### Step 1: Load State

```
ACTION: Read .web-agency/state/current.json
IF file contains workflow.status == "in_progress":
  → Resume the current workflow
ELSE:
  → Continue with request analysis
```

### Step 2: Analyze Request

Analyze `$ARGUMENTS` to identify:

```yaml
analysis:
  type: [feature | bugfix | deployment | review | audit | question]
  domain: [frontend | backend | fullstack | devops | database]
  urgency: [P1 | P2 | P3 | P4]
  complexity: [simple | medium | complex]
```

**Detection Criteria**:

| Keywords | Type |
|----------|------|
| "add", "create", "new", "implement" | feature |
| "bug", "error", "not working", "fix" | bugfix |
| "deploy", "push to prod", "release" | deployment |
| "review", "PR", "pull request" | review |
| "audit", "check", "analyze", "optimize" | audit |
| "how", "why", "what is", "?" | question |

### Step 3: Select and Load Workflow

```
IF type == "question":
  → Load relevant context (.web-agency/contexts/*.md)
  → Answer directly, no workflow
ELSE:
  → Load the appropriate workflow:
    - feature   → .web-agency/workflows/feature.md
    - bugfix    → .web-agency/workflows/bugfix.md
    - deployment→ .web-agency/workflows/deployment.md
    - review    → .web-agency/workflows/code-review.md
    - audit     → .web-agency/workflows/audit.md
```

### Step 4: Initialize State

```
ACTION: Update .web-agency/state/current.json

{
  "workflow": {
    "name": "[selected workflow]",
    "started_at": "[timestamp]",
    "current_step": 1,
    "status": "in_progress"
  },
  "steps": [list of workflow steps],
  "context": {
    "domain": "[detected domain]",
    "urgency": "[urgency]"
  }
}
```

### Step 5: Execute Workflow

For each workflow step:

```
1. ANNOUNCE the step:
   "## Step {n}/{total}: {step_name}"

2. LOAD the agent:
   Read .web-agency/skills/{agent}.md

3. EXECUTE the agent:
   Follow the agent's instructions
   Produce deliverables in .project/ if applicable

4. CHECK THE GATE:
   🔴 BLOCKING → STOP, present checkpoint, WAIT for validation
   🟡 ADVISORY → Present, propose to continue
   🟢 AUTO → Verify automatically (tests, lint)

5. UPDATE state:
   steps[n].status = "completed"
   current_step += 1

6. MOVE to next step (unless blocking gate)
```

### Step 6: Gate Management

#### 🔴 BLOCKING Gate

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

**ABSOLUTE RULE**: NEVER pass a 🔴 gate without explicit response.

#### 🟡 ADVISORY Gate

```markdown
---
## 🟡 Progress point

**Done**: [Summary]
**Deliverable**: [Path]

Should I continue with [next step]?
---
```

If no immediate response, continue after presenting.

#### 🟢 AUTO Gate

Execute automatic checks (lint, tests, build).
- If OK → Continue
- If FAIL → Present error, propose to fix

### Step 7: Finalization

```
ACTION: When workflow completed

1. Update state/current.json:
   workflow.status = "completed"

2. Archive in .project/07-audit/sessions/ if project exists

3. Present summary:
   "## ✅ Workflow completed
   - [Step summary]
   - [Deliverables produced]
   - [Suggested next actions]"
```

---

## AVAILABLE WORKFLOWS

| Workflow | File | Main Steps |
|----------|------|-----------|
| feature | `workflows/feature.md` | qualification → spec → arch → dev → test → review → deploy |
| bugfix | `workflows/bugfix.md` | diagnostic → fix → test → deploy |
| deployment | `workflows/deployment.md` | pre-check → build → staging → prod |
| code-review | `workflows/code-review.md` | context → analysis → security → feedback |
| audit | `workflows/audit.md` | scope → analysis → report → recommendations |

## AVAILABLE AGENTS

| Category | Agents |
|----------|--------|
| strategy/ | specification, architecture, estimation, decision, task-breakdown |
| development/ | frontend, backend, database, integration |
| quality/ | testing, code-review, security-check, performance |
| operations/ | deployment, ci-cd, monitoring, incident |

## AVAILABLE CONTEXTS

| Domain | File |
|--------|------|
| Frontend (React, Next.js) | `contexts/frontend.md` |
| Backend (Node, API) | `contexts/backend.md` |
| DevOps (CI/CD, Docker) | `contexts/devops.md` |
| Security (OWASP) | `contexts/security.md` |

---

## EXECUTION EXAMPLES

### Example 1: Simple Feature

```
User: /tech Create a reusable Button component

Orchestrator:
1. Analysis: type=feature, domain=frontend, complexity=simple
2. Workflow: feature.md (simplified)
3. Agent: development/frontend.md
4. Gate: 🟢 AUTO (no spec needed for simple component)
5. Direct execution
```

### Example 2: Complex Feature

```
User: /tech Implement an OAuth authentication system

Orchestrator:
1. Analysis: type=feature, domain=fullstack, complexity=complex
2. Workflow: feature.md (complete)
3. Steps:
   - qualification (🟡)
   - specification (🔴 BLOCKING)
   - architecture (🔴 BLOCKING)
   - estimation (🔴 BLOCKING)
   - development
   - testing (🟢 AUTO)
   - review (🟡)
   - deployment (🔴 BLOCKING before prod)
```

### Example 3: Question

```
User: /tech How to manage global state in Next.js 14?

Orchestrator:
1. Analysis: type=question
2. Load: contexts/frontend.md
3. Answer directly (no workflow)
```

---

**START NOW**: Analyze the request `$ARGUMENTS` and execute the appropriate workflow.
