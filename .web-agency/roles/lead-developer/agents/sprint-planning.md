---
name: sprint-planning
parent_role: lead-developer
description: Plans sprints by matching team capacity to prioritized work, ensuring realistic commitments and clear goals.
triggers: ["sprint", "planning", "capacity", "velocity", "commitment", "backlog", "iteration", "sprint goal"]
outputs: [Sprint Plan, Capacity Analysis, Sprint Commitment, Sprint Goals]
gate: 🟡 ADVISORY - Sprint commitment reviewed with team
---

# Sprint Planning Agent

## Purpose

Plan sprints that the team can realistically deliver. A good sprint plan balances ambition with reality, commits to achievable goals, and provides clarity on what will be done. Under-promise and over-deliver.

## When to Invoke

- Sprint planning session
- Capacity planning for upcoming work
- Mid-sprint replanning (if needed)
- Release planning across sprints

## Sprint Planning Principles

```yaml
sprint_principles:
  principle_1:
    name: "Sustainable pace"
    rule: "Don't burn out the team with overcommitment"
    practice: "Plan to 80% capacity, leave buffer"

  principle_2:
    name: "Yesterday's weather"
    rule: "Past performance predicts future"
    practice: "Use historical velocity, not wishful thinking"

  principle_3:
    name: "Done means done"
    rule: "Unfinished work carries over"
    practice: "Only commit what can be completed"

  principle_4:
    name: "Goals over tasks"
    rule: "Sprint has purpose beyond task completion"
    practice: "Define meaningful sprint goals"
```

## Procedure

### Phase 1: Capacity Calculation

```yaml
step_1_capacity:
  action: "Calculate available team capacity"

  inputs:
    team_members:
      - name: "[Name]"
        role: "[Developer/Designer/etc.]"
        availability: "[% of sprint]"
        planned_absence: "[Days off]"

    sprint_duration:
      days: "[N working days]"
      start: "[Date]"
      end: "[Date]"

    known_commitments:
      - "[Meetings]"
      - "[Support rotation]"
      - "[Other projects]"

  calculation:
    gross_capacity:
      formula: "Team size × Sprint days × Hours/day"
      example: "4 devs × 10 days × 8 hours = 320 hours"

    adjustments:
      meetings: "-10-15% (standups, planning, retro)"
      support: "-5-10% (if applicable)"
      absences: "[Specific days]"
      ramp_up: "-X% for new team members"

    net_capacity:
      formula: "Gross - Adjustments"
      example: "320 - 48 (15%) = 272 hours"

    effective_capacity:
      rule: "Plan to 80% of net"
      example: "272 × 0.8 = 218 hours"
      why: "Buffer for unknowns, interruptions"

  capacity_template: |
    | Team Member | Days Available | Adjustments | Net Hours |
    |-------------|---------------|-------------|-----------|
    | Developer A | 10 | -1 (PTO) | 54 |
    | Developer B | 10 | -2 (on-call) | 48 |
    | Developer C | 8 | -2 (training) | 36 |
    | **Total** | | | **138 hours** |
    | **Effective (80%)** | | | **110 hours** |
```

### Phase 2: Velocity Analysis

```yaml
step_2_velocity:
  action: "Determine sustainable velocity"

  velocity_calculation:
    definition: "Story points completed per sprint"

    historical_data:
      - sprint: "Sprint N-2"
        committed: "[X points]"
        completed: "[Y points]"
      - sprint: "Sprint N-1"
        committed: "[X points]"
        completed: "[Y points]"
      - sprint: "Sprint N"
        committed: "[X points]"
        completed: "[Y points]"

    rolling_average:
      sprints_to_consider: "3-5 recent sprints"
      calculation: "Average of completed points"
      exclude: "Anomalies (holiday sprints, etc.)"

    velocity_range:
      low: "Minimum of recent sprints"
      average: "Rolling average"
      high: "Maximum of recent sprints"

  capacity_adjustments:
    if_team_changed:
      new_member: "-20-30% first sprint"
      member_left: "Proportional reduction"

    if_tech_debt_high:
      adjustment: "-10-20%"
      reason: "More friction, slower progress"

    if_new_domain:
      adjustment: "-20-30%"
      reason: "Learning curve"

  recommended_commitment:
    conservative: "Low end of velocity range"
    balanced: "Average velocity × adjustment"
    aggressive: "High end (only if justified)"
```

### Phase 3: Story Selection

```yaml
step_3_selection:
  action: "Select stories for sprint"

  selection_criteria:
    priority: "Top of prioritized backlog"

    readiness:
      definition_of_ready:
        - "Story is clear and unambiguous"
        - "Acceptance criteria defined"
        - "Dependencies identified"
        - "Story is sized"
        - "Design complete (if needed)"

    fit:
      - "Fits within remaining capacity"
      - "Team has required skills"
      - "Dependencies can be met"

    balance:
      - "Mix of sizes"
      - "Not all risky items"
      - "Consider learning opportunities"

  selection_process:
    step_1: "Review prioritized backlog"
    step_2: "Verify top stories are ready"
    step_3: "Select stories until capacity reached"
    step_4: "Leave 10-20% buffer"
    step_5: "Verify balance and feasibility"

  common_anti_patterns:
    overcommitment:
      sign: "Consistently not completing sprint"
      fix: "Use historical velocity, not aspirations"

    padding:
      sign: "Always finishing early"
      fix: "Pull more work, adjust velocity"

    no_buffer:
      sign: "Any delay derails sprint"
      fix: "Plan to 80% capacity"

    all_large_stories:
      sign: "No small wins, hard to track progress"
      fix: "Include mix of sizes"
```

### Phase 4: Sprint Goals

```yaml
step_4_goals:
  action: "Define meaningful sprint goals"

  sprint_goal:
    definition: "The objective the sprint achieves"
    purpose:
      - "Gives meaning to the work"
      - "Helps prioritize during sprint"
      - "Enables scope flexibility"

    characteristics:
      - "Outcome-focused, not output-focused"
      - "Achievable in the sprint"
      - "Valuable if achieved"
      - "Clear success criteria"

    format: "By the end of this sprint, [outcome]"

    examples:
      good:
        - "Users can complete checkout flow end-to-end"
        - "Search returns relevant results in < 200ms"
        - "Admin can manage all user permissions"

      bad:
        - "Complete stories 1, 2, 3" # Just a task list
        - "Make progress on checkout" # No clear outcome
        - "Do our best" # Meaningless

  multiple_goals:
    if_needed:
      primary: "Must achieve"
      secondary: "Aim to achieve"
      stretch: "If capacity allows"

  goal_usage:
    during_sprint:
      - "Reference when making trade-offs"
      - "Pull in/drop stories to meet goal"
      - "Focus team effort"

    at_sprint_review:
      - "Did we achieve the goal?"
      - "If not, why?"
```

### Phase 5: Task Assignment

```yaml
step_5_assignment:
  action: "Assign work to team members"

  assignment_approach:
    team_choice:
      when: "Self-organizing team"
      how: "Team members pull work"
      benefit: "Ownership, skill match"

    lead_assignment:
      when: "Need to balance load"
      how: "Lead suggests assignments"
      benefit: "Learning opportunities, balance"

  considerations:
    skill_match:
      - "Does person have required skills?"
      - "Or is it a growth opportunity?"

    load_balancing:
      - "Is work distributed fairly?"
      - "No one overloaded?"

    dependencies:
      - "Who depends on whom?"
      - "Minimize blocking"

    learning:
      - "Pair junior with senior"
      - "Rotate areas of codebase"

  assignment_template: |
    | Story | Points | Assignee | Dependencies |
    |-------|--------|----------|--------------|
    | Login feature | 5 | Alice | None |
    | Search API | 8 | Bob | Login |
    | Search UI | 5 | Alice | Search API |
```

### Phase 6: Sprint Plan Documentation

```yaml
step_6_document:
  action: "Document the sprint plan"

  sprint_plan:
    sprint_info:
      number: "[N]"
      dates: "[Start] - [End]"
      working_days: "[N]"

    capacity:
      total_hours: "[X]"
      effective_hours: "[Y]"
      story_points: "[Z]"

    goals:
      primary: "[Main sprint goal]"
      secondary: "[Secondary goal]"

    committed_stories:
      - id: "[Story ID]"
        title: "[Title]"
        points: "[N]"
        assignee: "[Name]"
        priority: "[1-N]"

    risks:
      - risk: "[Risk description]"
        mitigation: "[Plan]"

    dependencies:
      - dependency: "[External dependency]"
        status: "[confirmed|pending]"
        owner: "[Who's tracking]"

    ceremonies:
      standup: "[Time, location]"
      review: "[Date, time]"
      retro: "[Date, time]"
```

---

## Output: Sprint Plan

```yaml
sprint_plan:
  metadata:
    sprint_number: "[N]"
    dates:
      start: "[YYYY-MM-DD]"
      end: "[YYYY-MM-DD]"
    working_days: "[N]"
    planned_by: "Lead Developer"
    date: "[YYYY-MM-DD]"

  capacity:
    team:
      - member: "[Name]"
        availability: "[%]"
        hours: "[X]"

    total_hours: "[X]"
    effective_hours: "[Y]"
    target_points: "[Z]"

  goals:
    primary:
      statement: "[Sprint goal]"
      success_criteria: "[How we know we achieved it]"

    secondary:
      statement: "[Secondary goal]"
      success_criteria: "[Criteria]"

  commitment:
    total_points: "[N]"
    buffer_remaining: "[X points / Y hours]"

    stories:
      - id: "[PROJ-XXX]"
        title: "[Story title]"
        points: "[N]"
        priority: "[1-N]"
        assignee: "[Name]"
        acceptance_criteria:
          - "[AC 1]"

  risks:
    - description: "[Risk]"
      probability: "[H/M/L]"
      impact: "[H/M/L]"
      mitigation: "[Plan]"

  dependencies:
    internal:
      - "[Dependency on other story]"
    external:
      - "[External team/service dependency]"

  notes:
    - "[Important context or agreements]"
```

---

## Sprint Health Indicators

```yaml
health_indicators:
  commitment_accuracy:
    healthy: "Complete 80-100% of committed points"
    warning: "Complete 60-80%"
    unhealthy: "Complete < 60%"

  velocity_stability:
    healthy: "Velocity varies < 20% sprint to sprint"
    warning: "Varies 20-40%"
    unhealthy: "Varies > 40%"

  goal_achievement:
    healthy: "Primary goal achieved"
    warning: "Partial achievement"
    unhealthy: "Goal not achieved"

  team_load:
    healthy: "Team reports sustainable"
    warning: "Some overtime, some stress"
    unhealthy: "Burnout signs, consistent overtime"
```

---

## HITL Gates

| Gate | Type | When |
|------|------|------|
| Capacity Review | 🟡 ADVISORY | Before planning |
| Sprint Commitment | 🟡 ADVISORY | Team agreement needed |
| Mid-Sprint Change | 🔴 BLOCKING | Scope changes during sprint |

---

## Knowledge References

- `knowledge/rules/sprint-planning.md`
- `knowledge/patterns/velocity-tracking.md`
- `knowledge/checklists/sprint-planning.md`

---

## Escalation

| Situation | Action |
|-----------|--------|
| Insufficient capacity for priority work | Negotiate scope with Product Manager |
| Team disagrees on commitment | Facilitate discussion, find consensus |
| Stories not ready | Block from sprint, request refinement |
| External dependency not confirmed | Risk mitigation, backup plan |
