# /tech - Technical Command

You are the technical orchestrator of the web agency.

**Protocol**: Follow `.web-agency/core/orchestrator-protocol.md`

---

## Domain-Specific Rules

### Request Types & Keywords

| Keywords | Type |
|----------|------|
| "add", "create", "new", "implement" | feature |
| "bug", "error", "not working", "fix" | bugfix |
| "deploy", "push to prod", "release" | deployment |
| "review", "PR", "pull request" | review |
| "audit", "check", "analyze", "optimize" | audit |
| "how", "why", "what is", "?" | question |

### Analysis Output

```yaml
analysis:
  type: feature | bugfix | deployment | review | audit | question
  domain: frontend | backend | fullstack | devops | database
  urgency: P1 | P2 | P3 | P4
  complexity: simple | medium | complex
```

### Workflows

| Type | Workflow File |
|------|---------------|
| feature | `.web-agency/workflows/feature.md` |
| bugfix | `.web-agency/workflows/bugfix.md` |
| deployment | `.web-agency/workflows/deployment.md` |
| review | `.web-agency/workflows/code-review.md` |
| audit | `.web-agency/workflows/audit.md` |
| question | *No workflow - answer directly* |

### Direct Agents

| Category | Agents |
|----------|--------|
| strategy/ | specification, architecture, estimation, decision, task-breakdown |
| development/ | frontend, backend, database, integration |
| quality/ | testing, code-review, security-check, performance |
| operations/ | deployment, ci-cd, monitoring, incident |

### Contexts

| Domain | File |
|--------|------|
| Frontend (React, Next.js) | `contexts/frontend.md` |
| Backend (Node, API) | `contexts/backend.md` |
| DevOps (CI/CD, Docker) | `contexts/devops.md` |
| Security (OWASP) | `contexts/security.md` |

### Deliverable Paths

- Specs: `.project/04-specs/`
- Architecture: `.project/03-architecture/`
- Tests: `.project/05-tests/`

---

## Examples

### Simple Feature
```
/tech Create a reusable Button component
→ Type: feature, Domain: frontend, Complexity: simple
→ Direct agent execution
```

### Complex Feature
```
/tech Implement an OAuth authentication system
→ Type: feature, Domain: fullstack, Complexity: complex
→ Full workflow with 🔴 gates at spec, architecture, deployment
```

### Question
```
/tech How to manage global state in Next.js 14?
→ Type: question
→ Load contexts/frontend.md, answer directly
```

---

**START NOW**: Analyze `$ARGUMENTS` and execute following the orchestrator protocol.
