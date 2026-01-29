# Workflow: New Project

Complete production chain for a new client project, from first contact to delivery.

## Triggers

- New client contacts the agency
- Quote request
- New project for existing client
- Request for proposal (RFP)

## Steps

```
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 1: INTAKE (< 2h)                                         │
├─────────────────────────────────────────────────────────────────┤
│  1.1 Reception      → Parse and structure the request           │
│  1.2 Qualification  → Evaluate complexity, urgency, feasibility │
│  1.3 Routing        → Identify required skills                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 2: DISCOVERY (1-3 days)                                  │
├─────────────────────────────────────────────────────────────────┤
│  2.1 Specification  → Clarify needs, write the brief            │
│  2.2 Architecture   → Design the technical solution             │
│  2.3 Estimation     → Calculate effort, cost, schedule          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 3: PROPOSAL (1-2 days)                                   │
├─────────────────────────────────────────────────────────────────┤
│  3.1 Proposal       → Write the commercial proposal             │
│  3.2 Review         → Internal validation                       │
│  3.3 Presentation   → Present to client                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    [WAITING FOR CLIENT VALIDATION]
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 4: SETUP (1-2 days)                                      │
├─────────────────────────────────────────────────────────────────┤
│  4.1 Planning       → Create detailed project plan              │
│  4.2 Environment    → Technical setup (repo, CI/CD, envs)       │
│  4.3 Kickoff        → Kickoff meeting                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 5: DESIGN (scope dependent)                              │
├─────────────────────────────────────────────────────────────────┤
│  5.1 UX Research    → User analysis, personas                   │
│  5.2 Wireframes     → Low-fidelity mockups                      │
│  5.3 UI Design      → High-fidelity mockups                     │
│  5.4 Design System  → Reusable components                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 6: DEVELOPMENT (scope dependent)                         │
├─────────────────────────────────────────────────────────────────┤
│  6.1 Frontend       → Interface development                     │
│  6.2 Backend        → API/services development                  │
│  6.3 Integration    → Third-party integrations                  │
│  6.4 Testing        → Automated tests                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 7: QUALITY (continuous)                                  │
├─────────────────────────────────────────────────────────────────┤
│  7.1 Code Review    → Systematic code review                    │
│  7.2 QA             → Functional testing                        │
│  7.3 Security       → Security audit                            │
│  7.4 Performance    → Optimization                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 8: DELIVERY (1-3 days)                                   │
├─────────────────────────────────────────────────────────────────┤
│  8.1 Staging        → Staging environment deployment            │
│  8.2 UAT            → Client acceptance testing                 │
│  8.3 Production     → Production deployment                     │
│  8.4 Handover       → Training and documentation                │
└─────────────────────────────────────────────────────────────────┘
```

## Skills by Step

### Phase 1: Intake
| Step | Skill | Input | Output | Gate |
|------|-------|-------|--------|------|
| 1.1 | `skills/intake/reception.md` | Raw request | Structured request | - |
| 1.2 | `skills/intake/qualification.md` | Structured request | Qualification score | 🟡 |
| 1.3 | `skills/support/documentation.md` | Project info | `.project/` structure | - |

**Step 1.3 - Documentation**: Creates the complete documentation structure in `.project/` with:
- `01-vision/` (PRD, personas, objectives)
- `02-requirements/` (epics, user stories)
- `03-architecture/` (ADR, stack, data model)
- `04-specs/`, `05-quality/`, `06-operations/`, `07-audit/`

### Phase 2: Discovery
| Step | Skill | Input | Output | Gate |
|------|-------|-------|--------|------|
| 2.1 | `skills/strategy/specification.md` | Qualified request | Complete PRD | 🔴 |
| 2.2 | `skills/strategy/architecture.md` | PRD | Architecture + ADR | 🔴 |
| 2.3 | `skills/strategy/estimation.md` | Architecture | Detailed estimation | 🔴 |

**Phase 2 Deliverables**:
- `.project/01-vision/PRD.md`
- `.project/01-vision/personas.md`
- `.project/03-architecture/overview.md`
- `.project/03-architecture/stack.md`
- `.project/03-architecture/decisions/ADR-001-*.md`

### Phase 3: Proposal
| Step | Skill | Input | Output |
|------|-------|-------|--------|
| 3.1 | `skills/project/proposal.md` | Estimation | Commercial proposal |
| 3.2 | `skills/quality/review.md` | Proposal | Validated proposal |
| 3.3 | `skills/project/communication.md` | Validated proposal | Presentation materials |

### Phase 4: Setup
| Step | Skill | Input | Output |
|------|-------|-------|--------|
| 4.1 | `skills/project/planning.md` | Signed proposal | Project plan |
| 4.2 | `skills/operations/setup.md` | Plan | Ready environments |
| 4.3 | `skills/project/kickoff.md` | Everything | Kickoff meeting notes |

### Phase 5: Design
| Step | Skill | Input | Output |
|------|-------|-------|--------|
| 5.1 | `skills/development/ux-research.md` | Brief | Personas, user journeys |
| 5.2 | `skills/development/wireframes.md` | Research | Wireframes |
| 5.3 | `skills/development/ui-design.md` | Wireframes | Mockups |
| 5.4 | `skills/development/design-system.md` | Mockups | Components |

### Phase 6: Development
| Step | Skill | Input | Output |
|------|-------|-------|--------|
| 6.1 | `skills/development/frontend.md` | Mockups | Frontend code |
| 6.2 | `skills/development/backend.md` | API specs | Backend code |
| 6.3 | `skills/development/integration.md` | Integration specs | Connectors |
| 6.4 | `skills/quality/testing.md` | Code | Automated tests |

### Phase 7: Quality
| Step | Skill | Input | Output |
|------|-------|-------|--------|
| 7.1 | `skills/quality/code-review.md` | PR | Feedback, corrections |
| 7.2 | `skills/quality/qa.md` | Build | QA report |
| 7.3 | `skills/quality/security-check.md` | Build | Security report |
| 7.4 | `skills/quality/performance.md` | Build | Optimizations |

### Phase 8: Delivery
| Step | Skill | Input | Output |
|------|-------|-------|--------|
| 8.1 | `skills/operations/deployment.md` | Validated build | Staging live |
| 8.2 | `skills/project/uat.md` | Staging | Acceptance certificate |
| 8.3 | `skills/operations/deployment.md` | Signed certificate | Production live |
| 8.4 | `skills/project/handover.md` | Everything | Documentation, training |

## Client Validation Points

| After Phase | Required Validation | Format |
|-------------|---------------------|--------|
| Phase 2 | Functional brief | Signed document |
| Phase 3 | Commercial proposal | Signed quote |
| Phase 5 | Mockups | Written validation |
| Phase 8.2 | Acceptance | Signed acceptance certificate |

## Escalation

| Situation | Action |
|-----------|--------|
| Budget exceeded > 10% | Client alert + amendment |
| Delay > 1 week | Status meeting |
| Technical blocker | Escalate to technical direction |
| Client conflict | Escalate to commercial direction |

## Final Deliverables

```
□ Source code (repository)
□ Technical documentation
□ User documentation
□ Environment access (staging, prod)
□ Monitoring access
□ Maintenance plan
□ Training (if included)
```
