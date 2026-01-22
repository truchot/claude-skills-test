# Web Agency IA - APEX Method

## Philosophy

**Agent-based Procedural EXecution for predictable, scalable AI operations.**

The APEX method provides a three-layer architecture that separates concerns:
1. **ROLES** define WHO decides (12 personas with clear authority)
2. **SKILLS** define HOW to execute (35 procedural skills)
3. **KNOWLEDGE** captures WHY (patterns, cases, rules, checklists)

> See `APEX.md` for the complete method documentation.

## Structure

```
.web-agency/
├── APEX.md                      # Method overview
├── ORCHESTRATOR.md              # Single entry point - Conductor
├── GATES.md                     # Human-in-the-Loop gates reference
│
├── roles/                       # WHO decides (12 personas)
│   ├── product-manager/
│   ├── tech-architect/
│   ├── lead-developer/
│   ├── developer/
│   ├── qa-engineer/
│   ├── ux-designer/
│   ├── devops-engineer/
│   ├── project-manager/
│   ├── marketing-lead/
│   ├── commercial-lead/
│   ├── support-lead/
│   └── scrum-master/
│
├── skills/                      # HOW to execute (35 skills)
│   ├── intake/                  # Reception and qualification
│   ├── strategy/                # Direction and decisions
│   ├── project/                 # Project management
│   ├── development/             # Development
│   ├── quality/                 # Quality and testing
│   ├── operations/              # DevOps and deployment
│   ├── marketing/               # Marketing and growth
│   ├── commercial/              # Sales and retention
│   └── support/                 # Support and documentation
│
├── workflows/                   # Scale-adaptive process (5 levels)
│   ├── level-0-hotfix.md        # < 2 hours
│   ├── level-1-task.md          # < 1 day
│   ├── level-2-story.md         # 1-5 days
│   ├── level-3-feature.md       # 1-4 weeks
│   └── level-4-product.md       # 1+ month
│
├── knowledge/                   # WHY - Company wisdom
│   ├── patterns/                # Proven solutions
│   ├── cases/                   # Real examples
│   ├── rules/                   # Actionable guidelines
│   └── checklists/              # Verification lists
│
├── contexts/                    # Technical knowledge
│   ├── frontend.md
│   ├── backend.md
│   ├── devops.md
│   ├── wordpress.md
│   └── security.md
│
├── core/                        # Core protocols
│   ├── execution-engine.md      # REACT pattern
│   ├── handoff-protocol.md      # Agent communication
│   └── memory-protocol.md       # Knowledge retention
│
├── state/                       # Project state (generated)
│   ├── current.json
│   ├── schema.json
│   └── README.md
│
└── templates/                   # Project templates
    └── project/
```

## How It Works

### 1. User invokes a command
```
/tech "I need to add a Stripe payment system"
```

### 2. Orchestrator analyzes and routes
```
→ Detects: new technical feature
→ Assesses complexity: Level 3 (1-4 weeks)
→ Assigns role: Lead Developer
→ Selects workflow: level-3-feature.md
→ Identifies steps: PRD → Architecture → Dev → Test → Review → Deploy
```

### 3. Skills execute with HITL gates
```
🔴 specification (BLOCKING) → Clarify requirements
🔴 architecture (BLOCKING)  → Design solution
🟢 development (AUTO)       → Implement
🟡 code-review (ADVISORY)   → Review code
🔴 deployment (BLOCKING)    → Deploy to production
```

### 4. State is maintained
```json
{
  "workflow": {
    "level": 3,
    "name": "feature",
    "current_step": 4,
    "status": "in_progress"
  },
  "active_role": "lead-developer",
  "steps": [
    {"name": "specification", "status": "completed", "gate": "blocking"},
    {"name": "architecture", "status": "completed", "gate": "blocking"},
    {"name": "development", "status": "completed", "gate": "automatic"},
    {"name": "review", "status": "in_progress", "gate": "advisory"}
  ]
}
```

### 5. Knowledge is captured
After each project, learnings are extracted to `knowledge/`:
- New patterns identified
- Cases documented
- Rules updated
- Checklists refined

## HITL Gates

Human-in-the-Loop gates ensure quality and control:

| Gate | Symbol | Behavior |
|------|--------|----------|
| **BLOCKING** | 🔴 | AI stops, waits for explicit validation |
| **ADVISORY** | 🟡 | AI presents, proposes to continue |
| **AUTOMATIC** | 🟢 | AI verifies automatically (tests, lint) |

## Commands

| Command | Description |
|---------|-------------|
| `/tech` | Any technical task (routes automatically) |
| `/design` | Design/UX tasks |
| `/project` | Project management |
| `/marketing` | Marketing/SEO/Content |

The orchestrator automatically detects the appropriate workflow level.

## Workflow Levels

| Level | Name | Duration | Primary Role | Gates |
|-------|------|----------|--------------|-------|
| L0 | Hotfix | < 2h | Developer | 🟢 All auto |
| L1 | Task | < 1 day | Developer | 🟡 Code review |
| L2 | Story | 1-5 days | Lead Developer | 🟡 Multiple |
| L3 | Feature | 1-4 weeks | Product Manager | 🔴 PRD, Arch, Deploy |
| L4 | Product | 1+ month | Product Manager | 🔴 Full governance |

## Key Principles

1. **Scale-Adaptive**: Match process weight to task complexity
2. **Role Boundaries**: Roles stay in their lane, escalate when needed
3. **Documentation as Truth**: What's documented is what's done
4. **Knowledge Capture**: Learn and improve after each project
5. **Human Control**: Blocking gates ensure humans validate critical decisions

## References

| Subject | File |
|---------|------|
| APEX Method | `APEX.md` |
| Orchestrator | `ORCHESTRATOR.md` |
| Gates Reference | `GATES.md` |
| State Schema | `state/schema.json` |
| Usage Guide | `HOW_TO.md` |
| Examples | `EXAMPLES.md` |
| Troubleshooting | `TROUBLESHOOTING.md` |
