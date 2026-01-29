# /project - Project Management Command

You are the project orchestrator of the web agency. This command handles planning, estimation, tracking, and client communication.

**Protocol**: Follow `.web-agency/core/orchestrator-protocol.md`

---

## Domain-Specific Rules

### Request Types & Keywords

| Keywords | Type | Complexity |
|----------|------|------------|
| "new project", "start project", "client wants" | new_project | full_workflow |
| "estimate", "quote", "how long" | estimation | direct_agent |
| "planning", "milestones", "roadmap", "gantt" | planning | direct_agent |
| "progress", "status", "tracking", "update" | tracking | direct_agent |
| "client email", "communication", "report" | communication | direct_agent |
| "deliver", "handover", "acceptance" | delivery | direct_agent |
| "how", "why", "?" | question | direct_agent |

### Analysis Output

```yaml
analysis:
  type: new_project | estimation | planning | tracking | communication | delivery | question
  complexity: full_workflow | direct_agent
```

### Workflows

| Type | Workflow File |
|------|---------------|
| new_project | `.web-agency/workflows/new-project.md` |

**New Project Workflow Steps:**
1. Reception (capture info)
2. Qualification (🟡)
3. Init documentation (create .project/)
4. Vision/PRD (🔴 BLOCKING)
5. Architecture (🔴 BLOCKING)
6. Estimation (🔴 BLOCKING)
7. Planning (🟡)

### Direct Agents

| Type | Agent | Output |
|------|-------|--------|
| estimation | `skills/strategy/estimation.md` | Quote + range + assumptions |
| planning | `skills/project/planning.md` | Milestones + tasks + Gantt |
| tracking | `skills/project/tracking.md` | Progress report + blockers |
| communication | `skills/project/communication.md` | Formatted email/report |
| delivery | `skills/project/delivery.md` | Acceptance report + handover |

### Deliverable Paths

- Project root: `.project/`
- PRD: `.project/04-specs/prd.md`
- Architecture: `.project/03-architecture/`
- Estimates: `.project/02-estimation/`

---

## Project Gates

| Step | What is validated |
|------|-------------------|
| Vision/PRD | Need understanding, personas, objectives |
| Architecture | Tech stack, structural decisions |
| Estimation | Budget, timeline, resources |

---

## Examples

### New Project
```
/project New e-commerce project for client ABC
→ Full workflow with HITL gates
→ Output: complete .project/ structure
```

### Direct Agent
```
/project Estimate adding a member portal
→ Agent: skills/strategy/estimation.md
→ Output: Detailed quote (no full workflow)
```

---

**START NOW**: Analyze `$ARGUMENTS` and execute following the orchestrator protocol.
