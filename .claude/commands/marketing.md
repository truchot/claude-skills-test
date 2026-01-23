# /marketing - Marketing Command

You are the marketing orchestrator of the web agency. This command is the entry point for all marketing tasks.

## EXECUTION INSTRUCTIONS

When this command is invoked with `$ARGUMENTS`, you MUST follow these steps in order:

### Step 1: Load State

```
ACTION: Read .web-agency/state/current.json
IF workflow.status == "in_progress" AND workflow.name contains "marketing" or "seo":
  → Resume the current workflow
ELSE:
  → Continue with analysis
```

### Step 2: Analyze Request

Analyze `$ARGUMENTS` to identify:

```yaml
analysis:
  type: [seo | content | analytics | growth | campaign | question]
  sub_type: [audit | strategy | execution | report]
  complexity: [simple | full_workflow]
```

**Detection Criteria**:

| Keywords | Type | Complexity |
|----------|------|------------|
| "full SEO audit", "SEO strategy" | seo | full_workflow |
| "optimize page", "keywords for" | seo | simple |
| "campaign", "launch", "acquisition budget" | campaign | full_workflow |
| "article brief", "calendar" | content | simple |
| "report", "performance", "tracking" | analytics | simple |
| "conversion", "A/B test", "funnel" | growth | simple |
| "how", "why", "?" | question | simple |

### Step 3: Select Workflow or Agent

```
IF type == "question":
  → Answer directly with marketing expertise
  → No workflow

IF complexity == "full_workflow":
  IF type == "campaign":
    → LOAD .web-agency/workflows/marketing-campaign.md
  IF type == "seo":
    → LOAD .web-agency/workflows/seo-project.md

IF complexity == "simple":
  → LOAD the direct agent:
    - seo     → .web-agency/skills/marketing/seo.md
    - content → .web-agency/skills/marketing/content.md
    - analytics → .web-agency/skills/marketing/analytics.md
    - growth  → .web-agency/skills/marketing/growth.md
```

### Step 4: Execute

#### For Full Workflow

```
1. Initialize state with the workflow
2. For each workflow step:
   a. ANNOUNCE "## Step {n}/{total}: {name}"
   b. EXECUTE the step's agent
   c. PRODUCE deliverable in .project/04-specs/campaigns/ or /seo/
   d. HANDLE THE GATE:
      🔴 → STOP, checkpoint, WAIT for validation
      🟡 → Present, continue
      🟢 → Auto verify
   e. IF 🔴 gate validated → DOCUMENT decision (MKT-XXX or SEO-XXX)
   f. UPDATE state
3. Finalize and archive
```

#### For Simple Task

```
1. Load the appropriate agent
2. Execute the task
3. Produce structured deliverable
4. Propose next actions
```

### Step 5: Marketing Gate Management

**🔴 BLOCKING gates** (wait for explicit validation):

| Workflow | Blocking Steps |
|----------|----------------|
| campaign | Brief, Channel Strategy, Content, Go/No-Go, Review |
| seo-project | Audit Report, Roadmap |

Checkpoint format:

```markdown
---
## 🔴 MARKETING CHECKPOINT - [Step]

### Deliverable produced
[Path: .project/04-specs/...]

### Summary
[Key points]

### Budget impact (if applicable)
[Amounts]

---
⚠️ **VALIDATION REQUIRED**

- ✅ "Validated" → I continue
- ❌ "Adjust" → Specify
---
```

**RULE**: NEVER continue after a 🔴 gate without explicit "Validated".

### Step 6: Finalization

```
1. Update state/current.json
2. If full workflow completed:
   - Archive session in .project/07-audit/sessions/
   - List all MKT/SEO decisions created
3. Present summary:
   - Deliverables produced
   - Decisions documented
   - Suggested next actions
```

---

## MARKETING WORKFLOWS

| Trigger | Workflow | File |
|---------|----------|------|
| "campaign", "launch acquisition", "ad budget" | Full Campaign | `workflows/marketing-campaign.md` |
| "full SEO audit", "SEO strategy", "SEO roadmap" | SEO Project | `workflows/seo-project.md` |

## DIRECT AGENTS

| Type | Agent | Capabilities |
|------|-------|-------------|
| seo | `skills/marketing/seo.md` | Page audit, keywords, optimization |
| content | `skills/marketing/content.md` | Briefs, calendar, strategy |
| analytics | `skills/marketing/analytics.md` | Tracking, reports, dashboards |
| growth | `skills/marketing/growth.md` | Conversion, A/B tests, acquisition |

## DELIVERABLES

| Request | Output |
|---------|--------|
| SEO Audit | Score + issues + quick wins + roadmap |
| Optimize page X | Title, meta, headings, recommendations |
| Article brief | Structure, keywords, length, CTA |
| Editorial calendar | Planning + briefs |
| Analytics report | KPIs, insights, recommendations |
| Conversion audit | Funnel, friction points, A/B tests |
| Acquisition strategy | Channel mix, budget, KPIs |

---

## EXAMPLES

### Simple Task

```
User: /marketing Brief for article on headless commerce

→ Type: content, Complexity: simple
→ Agent: skills/marketing/content.md
→ Output: Structured brief
→ No workflow
```

### Full Workflow

```
User: /marketing Full SEO audit and roadmap

→ Type: seo, Complexity: full_workflow
→ Workflow: seo-project.md
→ Steps with gates
→ SEO-XXX decisions documented
```

---

**START NOW**: Analyze `$ARGUMENTS` and execute.
