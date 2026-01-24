# APEX Method

**A**gent-based **P**rocedural **EX**ecution

A unified methodology for running an AI-powered web agency, combining the best of BMAD, Web Agency v1, and v2.

## Core Principles

### 1. Deterministic Procedures
```
Same input → Same output (AI or Human)
```
Every procedure must be executable identically by a human or an AI.

### 2. Three-Layer Separation

| Layer | Question | Contains |
|-------|----------|----------|
| **ROLES** | WHO decides? | 12 personas with clear authority |
| **SKILLS** | HOW to do it? | 35 executable capabilities |
| **KNOWLEDGE** | WHY this decision? | Patterns, cases, rules |

### 3. Human-in-the-Loop by Design

| Gate | Symbol | Behavior |
|------|--------|----------|
| **BLOCKING** | 🔴 | Human MUST validate before continuing |
| **ADVISORY** | 🟡 | Human CAN intervene, auto-continue if silent |
| **AUTOMATIC** | 🟢 | AI autonomous (tests, lint, checks) |

### 4. Documentation = Source of Truth
```
PRD → Stories → Specs → Code
     (never the reverse)
```
All artifacts live in `.project/` and are the canonical source.

### 5. Scale-Adaptive Execution

| Level | Name | Duration | Workflow |
|-------|------|----------|----------|
| 0 | Hotfix | < 1 hour | None |
| 1 | Task | < 4 hours | Minimal |
| 2 | Feature | 1-5 days | Standard |
| 3 | Epic | 1-4 weeks | Full |
| 4 | Product | 1+ months | Enterprise |

---

## Architecture Overview

```
REQUEST
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│                       ORCHESTRATOR                           │
│                                                              │
│  1. Classify complexity → Level (0-4)                       │
│  2. Load workflow for level                                  │
│  3. Execute phases with appropriate roles                    │
│  4. Roles invoke skills to produce artifacts                 │
│  5. Skills reference knowledge when needed                   │
│  6. Gates control human checkpoints                          │
│  7. State persists progress                                  │
│  8. Extract learnings on completion                          │
└─────────────────────────────────────────────────────────────┘
    │
    ├──────────────┬──────────────┬──────────────┐
    ▼              ▼              ▼              ▼
┌────────┐   ┌────────┐    ┌────────┐    ┌────────┐
│WORKFLOW│   │ ROLES  │    │ SKILLS │    │  STATE │
│ (WHEN) │   │ (WHO)  │    │ (HOW)  │    │(MEMORY)│
└────────┘   └───┬────┘    └───┬────┘    └────────┘
                 │             │
                 │   uses      │  references
                 ▼             ▼
            ┌─────────────────────┐
            │     KNOWLEDGE       │
            │       (WHY)         │
            └─────────────────────┘
```

---

## Layer 1: ROLES (12 personas)

Roles define WHO makes decisions and WHAT they produce.

| Role | Responsibility | Key Outputs |
|------|----------------|-------------|
| **Product Manager** | Vision, requirements, prioritization | PRD, Stories, AC |
| **Tech Architect** | Technical decisions, system design | ADRs, Tech Specs |
| **Lead Developer** | Coordination, estimation, quality | Estimates, Task breakdown |
| **Developer** | Implementation | Code, Tests |
| **QA Engineer** | Testing strategy, quality assurance | Test plans, Reports |
| **UX Designer** | User experience, interfaces | Wireframes, Prototypes |
| **DevOps Engineer** | Infrastructure, CI/CD | Pipelines, Runbooks |
| **Project Manager** | Timeline, resources, communication | Plans, Status reports |
| **Marketing Lead** | Growth, content, campaigns | Campaigns, Analytics |
| **Commercial Lead** | Sales, proposals, contracts | Proposals, Quotes |
| **Support Lead** | Client support, satisfaction | Tickets, KB, SLA |
| **Scrum Master** | Process, ceremonies, impediments | Sprint reports |

Each role is defined in `roles/{role-name}/ROLE.md`.

---

## Layer 2: SKILLS (35 capabilities)

Skills define HOW to execute tasks. Compact (~50 lines), persona-driven.

### Development (4)
- `frontend` - UI, React, CSS, accessibility
- `backend` - API, Node, validation, security
- `database` - Schema, queries, migrations
- `integration` - Third-party APIs, webhooks

### Quality (4)
- `testing` - Unit, integration, E2E
- `code-review` - PR review, standards
- `security` - OWASP, audit, secrets
- `performance` - Profiling, optimization

### Operations (4)
- `ci-cd` - Pipelines, automation
- `deployment` - Zero-downtime, rollback
- `monitoring` - Alerts, SLOs, dashboards
- `incident` - Response, postmortem

### Business (6)
- `specification` - Requirements, stories
- `estimation` - Sizing, risks
- `planning` - Sprints, roadmap
- `tracking` - Progress, metrics
- `communication` - Client updates, CR
- `delivery` - Release, handoff

### Marketing (5)
- `seo` - Technical, on-page
- `content` - Copywriting, editorial
- `analytics` - Tracking, reporting
- `growth` - Experiments, funnel
- `campaign` - Launch, automation

### Support (5)
- `documentation` - Technical, user docs
- `onboarding` - Client, team
- `maintenance` - Bug fixes, updates
- `ticketing` - Issue management
- `knowledge-base` - FAQ, guides

### Commercial (4)
- `proposal` - Quotes, pitches
- `negotiation` - Pricing, terms
- `crm` - Pipeline, follow-up
- `retention` - Upsell, renewal

Each skill is defined in `skills/{category}/{skill-name}/SKILL.md`.

---

## Layer 3: KNOWLEDGE (Company wisdom)

Knowledge captures WHY we make certain decisions.

### Patterns
Recurring situations with data-backed rules.
```
patterns/
├── client/          # Client behavior patterns
├── estimation/      # Estimation traps
├── technical/       # Tech debt, performance
└── project/         # Kickoff, handoff, closure
```

### Cases
Real anonymized examples for learning.
```
cases/
├── CASE-001-scope-creep.md
├── CASE-002-perf-crisis.md
└── CASE-NNN-*.md
```

### Rules
Absolute NEVER/ALWAYS constraints.
```
rules/
├── security.md
├── estimation.md
├── communication.md
└── deployment.md
```

### Checklists
Verification lists for quality gates.
```
checklists/
├── pre-estimation.md
├── pre-development.md
├── pre-deploy.md
└── code-review.md
```

---

## Workflows by Level

### Level 0: Hotfix
```
Developer → Fix → 🟢 Tests → Deploy
```
No formal workflow. Direct execution.

### Level 1: Task
```
Developer → Implement → 🟢 Tests → 🟡 Review → Merge
```
Minimal oversight, code review only.

### Level 2: Feature
```
PM          → 🔴 Spec approved
Architect   → 🟡 Design reviewed
Lead Dev    → 🔴 Estimate approved
Developer   → 🟢 Tests pass
QA          → 🟡 QA passed
DevOps      → 🔴 Deploy approved
```
Standard workflow with multiple gates.

### Level 3: Epic
```
PM          → 🔴 PRD approved
Architect   → 🔴 Architecture approved
Project Mgr → 🔴 Plan approved
[Sprint cycles with 🟡 reviews]
DevOps      → 🔴 Release approved
```
Full workflow with sprint iterations.

### Level 4: Product
```
Strategy    → 🔴 Business case approved
Vision      → 🔴 PRD + Personas approved
Architecture→ 🔴 System design approved
Planning    → 🔴 Roadmap approved
[Multiple Level 3 epics]
Launch      → 🔴 Go-live approved
Retro       → 🟡 Learnings captured
```
Enterprise workflow with phase gates.

---

## State Management

State persists in `state/current.json`:

```json
{
  "version": "1.0",
  "level": 2,
  "project": {
    "id": "PRJ-042",
    "name": "Feature X",
    "client": "Acme Corp"
  },
  "workflow": {
    "current_phase": "implement",
    "phase_index": 4,
    "total_phases": 6,
    "status": "in_progress"
  },
  "gates_pending": [
    {
      "phase": "deploy",
      "type": "blocking",
      "waiting_for": "Deploy approval"
    }
  ],
  "learning": {
    "patterns_observed": ["scope-creep"],
    "estimate_accuracy": 1.3
  }
}
```

---

## Learning Loop

After each project (Level 2+):

1. **Extract patterns** - What recurring situations did we observe?
2. **Record cases** - Anonymize and document for future reference
3. **Update rules** - Any new NEVER/ALWAYS discovered?
4. **Improve checklists** - What did we miss that we should check?

```yaml
learning_extraction:
  project: "PRJ-042"

  patterns_confirmed:
    - pattern: "scope-creep"
      prediction: "Client will add features"
      outcome: "Confirmed - 3 additions"

  new_pattern:
    name: "The Friday Deploy"
    signal: "Client requests Friday deployment"
    observation: "80% result in weekend incidents"
    rule: "NEVER deploy to prod on Friday"

  case_to_add:
    id: "CASE-043"
    title: "Friday deploy disaster"
```

---

## File Structure

```
.web-agency/
├── APEX.md                    # This file
├── ORCHESTRATOR.md            # Routing logic
│
├── roles/                     # 12 ROLES
│   ├── product-manager/ROLE.md
│   ├── tech-architect/ROLE.md
│   └── ...
│
├── skills/                    # 35 SKILLS
│   ├── development/
│   ├── quality/
│   ├── operations/
│   ├── business/
│   ├── marketing/
│   ├── support/
│   └── commercial/
│
├── knowledge/                 # KNOWLEDGE
│   ├── patterns/
│   ├── cases/
│   ├── rules/
│   └── checklists/
│
├── workflows/                 # WORKFLOWS
│   ├── level-0-hotfix.md
│   ├── level-1-task.md
│   ├── level-2-feature.md
│   ├── level-3-epic.md
│   └── level-4-product.md
│
├── templates/                 # TEMPLATES
│   ├── PRD.md
│   ├── STORY.md
│   └── ...
│
└── state/                     # STATE
    ├── schema.json
    └── current.json
```

---

## Quick Reference

### Classify Request
```
Is it a production bug < 1h?     → Level 0
Is it a small task < 4h?         → Level 1
Is it a feature 1-5 days?        → Level 2
Is it an epic 1-4 weeks?         → Level 3
Is it a new product/platform?    → Level 4
```

### Gate Handling
```
🔴 BLOCKING  → STOP. Display checkpoint. Wait for explicit approval.
🟡 ADVISORY  → PAUSE. Display summary. Continue if no response.
🟢 AUTOMATIC → RUN. Execute checks. Escalate only on failure.
```

### Role → Skills Mapping
```
Product Manager  → specification
Tech Architect   → architect, decision, database
Lead Developer   → estimation, task-breakdown, code-review
Developer        → frontend, backend, database, testing
QA Engineer      → testing, security, performance
DevOps Engineer  → ci-cd, deployment, monitoring, incident
Project Manager  → planning, tracking, communication, delivery
```

---

## Origin

APEX synthesizes:
- **BMAD Method** - Role personas, scale-adaptive, docs-as-source
- **Web Agency v1** - 757 agents of domain knowledge, learning loops
- **Web Agency v2** - Compact skills, HITL gates, state management

Version: 1.0.0
Date: 2026-01-22
