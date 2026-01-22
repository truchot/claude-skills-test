---
name: level-4-product
description: Product or major initiative spanning multiple features and teams. Takes 1+ months.
complexity: "> 1 month"
gates: [🔴 Business case approval, 🔴 Product vision approval, 🔴 Architecture approval, 🔴 Milestone reviews, 🔴 Launch approval]
phases: [discovery, definition, planning, execution, launch, retrospective]
---

# Level 4: Product Workflow

## When to Use

- New product or major product area
- Platform migration or rebuild
- Multi-team initiatives
- Strategic business initiatives
- Anything spanning multiple features

## NOT for

- Single features → Level 3
- Quick wins → Level 1 or 2
- Hotfixes → Level 0

## Workflow

```
┌───────────────────────────────────────────────┐
│  1. DISCOVERY  🔴 BLOCKING                    │
│  - Market research                            │
│  - User research                              │
│  - Business case                              │
│  - Feasibility assessment                     │
│  (2-4 weeks)                                 │
└────────┬──────────────────────────────────────┘
         │
         ▼
┌───────────────────────────────────────────────┐
│  2. DEFINITION  🔴 BLOCKING                   │
│  - Product vision                             │
│  - Roadmap                                    │
│  - Success metrics                            │
│  - Risk assessment                            │
│  (2-3 weeks)                                 │
└────────┬──────────────────────────────────────┘
         │
         ▼
┌───────────────────────────────────────────────┐
│  3. PLANNING  🔴 BLOCKING                     │
│  - Architecture design                        │
│  - Resource planning                          │
│  - Release planning                           │
│  - Risk mitigation                            │
│  (2-3 weeks)                                 │
└────────┬──────────────────────────────────────┘
         │
         ▼
┌───────────────────────────────────────────────┐
│  4. EXECUTION                                 │
│  - Feature development (Level 3 workflows)    │
│  - Milestone reviews  🔴 BLOCKING             │
│  - Continuous integration                     │
│  - Stakeholder communication                  │
│  (1-6 months)                                │
└────────┬──────────────────────────────────────┘
         │
         ▼
┌───────────────────────────────────────────────┐
│  5. LAUNCH  🔴 BLOCKING                       │
│  - Beta program                               │
│  - Go-to-market                               │
│  - Launch execution                           │
│  - Post-launch support                        │
│  (2-4 weeks)                                 │
└────────┬──────────────────────────────────────┘
         │
         ▼
┌───────────────────────────────────────────────┐
│  6. RETROSPECTIVE                             │
│  - What worked / didn't                       │
│  - Lessons learned                            │
│  - Knowledge capture                          │
│  (1 week)                                    │
└───────────────────────────────────────────────┘
```

## Roles Involved

| Role | Phases | Responsibility |
|------|--------|----------------|
| Product Manager | All | Product ownership |
| Tech Architect | Planning, Execution | Technical vision |
| Project Manager | All | Coordination, tracking |
| UX Designer | Discovery, Definition | User experience |
| Lead Developer | Planning, Execution | Technical leadership |
| Marketing Lead | Definition, Launch | Go-to-market |
| Commercial Lead | Discovery, Launch | Market validation |
| All roles | Execution | Implementation |

## Gates

```yaml
gates:
  business_case:
    type: "🔴 BLOCKING"
    when: "End of Discovery"
    who: "Leadership"
    criteria:
      - "Market opportunity validated"
      - "Business case positive"
      - "Resources available"
      - "Strategic fit confirmed"
    deliverable: "Business case document"

  product_vision:
    type: "🔴 BLOCKING"
    when: "End of Definition"
    who: "Stakeholders, Leadership"
    criteria:
      - "Vision clear and compelling"
      - "Roadmap realistic"
      - "Success metrics defined"
      - "Risks acceptable"
    deliverable: "Product vision document"

  architecture_approval:
    type: "🔴 BLOCKING"
    when: "End of Planning"
    who: "Tech Architect, CTO"
    criteria:
      - "Architecture supports vision"
      - "Scalability addressed"
      - "Security reviewed"
      - "Tech debt managed"
    deliverable: "Architecture document"

  milestone_review:
    type: "🔴 BLOCKING"
    when: "Each major milestone"
    who: "Stakeholders"
    criteria:
      - "Milestone deliverables complete"
      - "Quality acceptable"
      - "On track for next milestone"
    deliverable: "Milestone report"

  launch_approval:
    type: "🔴 BLOCKING"
    when: "Before launch"
    who: "Leadership"
    criteria:
      - "Product ready"
      - "Go-to-market ready"
      - "Support ready"
      - "Rollback plan ready"
    deliverable: "Launch checklist complete"
```

## Inputs Required

```yaml
product_input:
  initiative:
    name: "[Initiative name]"
    sponsor: "[Executive sponsor]"
    strategic_goal: "[Which company goal this supports]"

  constraints:
    budget: "[$X]"
    timeline: "[Target date]"
    resources: "[Available team]"

  context:
    market_situation: "[Current state]"
    competition: "[Competitive landscape]"
    user_feedback: "[Known pain points]"
```

## Outputs Produced

```yaml
product_output:
  discovery:
    market_research: ".project/02-discovery/market-research.md"
    user_research: ".project/02-discovery/user-research.md"
    business_case: ".project/02-discovery/business-case.md"

  definition:
    product_vision: ".project/01-vision/product-vision.md"
    roadmap: ".project/01-vision/roadmap.md"
    success_metrics: ".project/01-vision/success-metrics.md"

  planning:
    architecture: ".project/03-architecture/"
    project_plan: ".project/06-planning/project-plan.md"
    risk_register: ".project/06-planning/risks.md"

  execution:
    features: "[List of Level 3 feature deliverables]"
    milestone_reports: ".project/07-audit/milestones/"

  launch:
    launch_plan: ".project/08-launch/launch-plan.md"
    go_to_market: ".project/08-launch/gtm.md"
    release_notes: ".project/08-launch/release-notes.md"

  retrospective:
    lessons_learned: ".project/07-audit/retrospective.md"
    knowledge_artifacts: "[Patterns, cases, rules extracted]"
```

## Process Details

### 1. Discovery (2-4 weeks)

**Market Research:**
- Industry analysis
- Competitor analysis
- Market sizing

**User Research:**
- User interviews
- Pain point analysis
- Jobs-to-be-done

**Business Case:**
- Revenue potential
- Cost analysis
- ROI projection
- Resource requirements

**Feasibility:**
- Technical feasibility
- Operational feasibility
- Timeline assessment

**Gate: 🔴 Business Case Approval**

### 2. Definition (2-3 weeks)

**Product Vision:**
- Vision statement
- Target users
- Key differentiators
- Value proposition

**Roadmap:**
- Feature prioritization
- Release phases
- Dependencies

**Success Metrics:**
- OKRs
- KPIs
- Measurement plan

**Risk Assessment:**
- Risk identification
- Mitigation strategies
- Contingency plans

**Gate: 🔴 Product Vision Approval**

### 3. Planning (2-3 weeks)

**Architecture:**
- System design
- Technology choices (ADRs)
- Security architecture
- Data architecture

**Resource Planning:**
- Team structure
- Skill requirements
- External resources

**Release Planning:**
- Milestone definition
- Sprint planning approach
- Release cadence

**Gate: 🔴 Architecture Approval**

### 4. Execution (1-6 months)

**Development:**
- Run Level 3 workflows for each feature
- Maintain quality gates throughout
- Continuous integration

**Governance:**
- Weekly status updates
- Milestone reviews 🔴
- Risk monitoring
- Scope management

**Communication:**
- Stakeholder updates
- Team communication
- Customer communication (if beta)

### 5. Launch (2-4 weeks)

**Beta Program (if applicable):**
- Beta user recruitment
- Feedback collection
- Bug fixing

**Go-to-Market:**
- Marketing execution
- Sales enablement
- Support training

**Launch Execution:**
- Staged rollout
- Monitoring
- Issue response

**Post-Launch:**
- Monitoring success metrics
- Rapid response to issues
- Customer feedback collection

**Gate: 🔴 Launch Approval**

### 6. Retrospective (1 week)

**Analysis:**
- What went well
- What didn't go well
- What to do differently

**Knowledge Capture:**
- Extract patterns for knowledge base
- Document cases
- Update rules

**Celebration:**
- Recognize team
- Share success

## Milestone Template

```yaml
milestone:
  name: "[Milestone name]"
  target_date: "[YYYY-MM-DD]"

  deliverables:
    - name: "[Deliverable]"
      status: "[complete|in_progress|at_risk|blocked]"
      owner: "[Who]"

  metrics:
    planned_vs_actual:
      features_complete: "[X/Y]"
      budget_consumed: "[X%]"

  risks:
    - risk: "[Risk]"
      status: "[Mitigating]"

  decisions_needed:
    - "[Decision required]"

  next_milestone:
    name: "[Next milestone]"
    date: "[Date]"
    focus: "[What's next]"
```

## Rules

### DO
- Validate business case before committing
- Get stakeholder buy-in at each gate
- Track progress against milestones
- Communicate proactively
- Learn and capture knowledge

### DO NOT
- Skip discovery phase
- Start coding before architecture
- Ignore milestone gates
- Launch without proper testing
- Forget the retrospective

## Escalation

| Situation | Action |
|-----------|--------|
| Business case not viable | Pivot or kill early |
| Major scope change | Re-baseline with stakeholders |
| Timeline at significant risk | Executive escalation |
| Quality issues near launch | Delay launch |
| Team burnout | Resource adjustment |
