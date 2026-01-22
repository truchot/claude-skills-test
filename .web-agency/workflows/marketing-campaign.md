# Workflow: Marketing Campaign

Complete workflow for a marketing campaign, from strategy to results analysis.

## Triggers

- "Launch a campaign"
- "Marketing strategy for..."
- "Acquisition for launch"
- "Marketing plan"

## Steps with HITL Gates

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. BRIEF & OBJECTIVES       │ Define SMART objectives           │
│    Skill: strategy          │                                    │
│    🔴 BLOCKING Gate         │ Objectives + budget validation     │
├─────────────────────────────┼────────────────────────────────────┤
│ 2. AUDIENCE & PERSONAS      │ Define targets                     │
│    Skill: content           │                                    │
│    🟡 ADVISORY Gate         │ Personas validation                │
├─────────────────────────────┼────────────────────────────────────┤
│ 3. CHANNEL STRATEGY         │ Channel mix + budget allocation    │
│    Skill: growth            │                                    │
│    🔴 BLOCKING Gate         │ Budget + channels validation       │
├─────────────────────────────┼────────────────────────────────────┤
│ 4. CONTENT & CREATIVES      │ Content briefs, key messages       │
│    Skill: content           │                                    │
│    🔴 BLOCKING Gate         │ Messages + tone validation         │
├─────────────────────────────┼────────────────────────────────────┤
│ 5. TRACKING SETUP           │ Measurement plan, pixels, events   │
│    Skill: analytics         │                                    │
│    🟢 AUTO Gate             │ Technical verification             │
├─────────────────────────────┼────────────────────────────────────┤
│ 6. LAUNCH                   │ Campaigns go live                  │
│    Skill: growth            │                                    │
│    🔴 BLOCKING Gate         │ Go/No-Go before spend              │
├─────────────────────────────┼────────────────────────────────────┤
│ 7. MONITORING & OPTIM       │ Daily tracking, adjustments        │
│    Skill: analytics         │                                    │
│    🟡 ADVISORY Gate         │ Weekly report                      │
├─────────────────────────────┼────────────────────────────────────┤
│ 8. REVIEW & LEARNINGS       │ Final analysis, recommendations    │
│    Skill: analytics         │                                    │
│    🔴 BLOCKING Gate         │ Learnings + next steps validation  │
└─────────────────────────────┴────────────────────────────────────┘
```

## Step Details

### Step 1: Brief & Objectives

**Skill**: `skills/strategy/specification.md` + marketing context

**Output**:
- `.project/04-specs/campaigns/{{CAMPAIGN_ID}}/brief.md`

**Brief content**:
```yaml
campaign:
  id: "CAMP-001"
  name: "Product X Launch"
  type: [acquisition | awareness | retention | activation]

context:
  why: "Why this campaign now"
  product: "Product/service concerned"
  market: "Market context"

objectives:
  primary:
    metric: "Qualified leads"
    target: 500
    baseline: 0
    deadline: "2024-03-31"

  secondary:
    - metric: "Site traffic"
      target: "+50%"
    - metric: "Brand awareness"
      target: "+20 points"

budget:
  total: $15000
  breakdown:
    paid: $10000
    content: $3000
    tools: $2000

constraints:
  - "No direct competitor comparison"
  - "Approved tone of voice only"

success_criteria:
  - "CPA < $30"
  - "ROAS > 3"
```

**🔴 BLOCKING Gate**:

```markdown
---
## 🔴 CHECKPOINT - Campaign Brief Validation

### Campaign: {{CAMPAIGN_NAME}}

| Attribute | Value |
|-----------|-------|
| **Type** | {{TYPE}} |
| **Primary objective** | {{OBJECTIVE}} |
| **Total budget** | ${{BUDGET}} |
| **Duration** | {{DURATION}} |

### SMART Objectives

| Objective | Metric | Target | Current | Deadline |
|-----------|--------|--------|---------|----------|
| Primary | {{METRIC}} | {{TARGET}} | {{BASELINE}} | {{DATE}} |
| Secondary | {{METRIC}} | {{TARGET}} | - | - |

### Proposed Budget

| Item | Amount | % |
|------|--------|---|
| Paid media | ${{X}} | {{Y%}} |
| Content | ${{X}} | {{Y%}} |
| Tools | ${{X}} | {{Y%}} |

### Points of Attention

- {{POINT_1}}
- {{POINT_2}}

---

⚠️ **VALIDATION REQUIRED BEFORE CONTINUING**

- [ ] Objectives are realistic and aligned with strategy
- [ ] Budget is approved
- [ ] Constraints are understood

**Decision**: Validated / To adjust / Rejected

---
```

**Documented decision**: `.project/04-specs/campaigns/{{CAMPAIGN_ID}}/decisions/MKT-001-brief.md`

---

### Step 2: Audience & Personas

**Skill**: `skills/marketing/content.md`

**Output**:
- `.project/04-specs/campaigns/{{CAMPAIGN_ID}}/audience.md`

**🟡 ADVISORY Gate**: Presents personas and proposes to continue

---

### Step 3: Channel Strategy

**Skill**: `skills/marketing/growth.md`

**Output**:
- `.project/04-specs/campaigns/{{CAMPAIGN_ID}}/channel-strategy.md`

**Content**:
```yaml
channels:
  - name: "Google Ads - Search"
    objective: "Capture intent"
    budget: $5000
    kpis:
      cpc_target: $2
      ctr_target: 5%
      conversions_target: 200
    audiences:
      - "Transactional keywords"
      - "Site remarketing"

  - name: "LinkedIn Ads"
    objective: "B2B awareness + leads"
    budget: $3000
    kpis:
      cpm_target: $15
      leads_target: 50
    audiences:
      - "Tech decision makers"
      - "Client lookalikes"

  - name: "Content / SEO"
    objective: "Organic traffic"
    budget: $2000 (production)
    content:
      - "5 pillar articles"
      - "1 lead magnet"

funnel_mapping:
  awareness: ["LinkedIn Ads", "Content"]
  consideration: ["Google Ads", "Retargeting"]
  conversion: ["Google Ads", "Email nurturing"]

timeline:
  week_1: "Setup + tests"
  week_2_4: "Scaling"
  week_5_6: "Optimization"
```

**🔴 BLOCKING Gate**:

```markdown
---
## 🔴 CHECKPOINT - Channel Strategy Validation

### Proposed Channel Mix

| Channel | Budget | % | Objective |
|---------|--------|---|-----------|
| Google Ads | ${{X}} | {{Y%}} | {{OBJ}} |
| LinkedIn | ${{X}} | {{Y%}} | {{OBJ}} |
| Content | ${{X}} | {{Y%}} | {{OBJ}} |

### Results Projection

| KPI | Target | Confidence |
|-----|--------|------------|
| Leads | {{X}} | High |
| Average CPA | ${{X}} | Medium |
| ROAS | {{X}} | Medium |

### Alternatives Considered

| Option | For | Against | Decision |
|--------|-----|---------|----------|
| Facebook Ads | Large reach | Less effective B2B | Rejected |
| TikTok | Trending | Not our target | Rejected |

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| High CPC | Insufficient budget | Adjust keywords |

---

⚠️ **VALIDATION REQUIRED**

- [ ] Channel mix validated
- [ ] Budget per channel approved
- [ ] Objectives per channel realistic

---
```

**Documented decision**: `.project/04-specs/campaigns/{{CAMPAIGN_ID}}/decisions/MKT-002-channels.md`

---

### Step 4: Content & Creatives

**Skill**: `skills/marketing/content.md`

**Output**:
- `.project/04-specs/campaigns/{{CAMPAIGN_ID}}/content-briefs/`
  - `ad-copies.md`
  - `landing-page.md`
  - `email-sequence.md`
  - `lead-magnet.md`

**🔴 BLOCKING Gate**:

```markdown
---
## 🔴 CHECKPOINT - Content Validation

### Key Messages

| Message | Target | Channel |
|---------|--------|---------|
| "{{MESSAGE_1}}" | {{PERSONA}} | Ads |
| "{{MESSAGE_2}}" | {{PERSONA}} | Landing |

### Tone of Voice

- {{TOV_1}}
- {{TOV_2}}

### Required Creatives

| Type | Quantity | Status |
|------|----------|--------|
| Ad copies | {{X}} variations | 📝 Brief ready |
| Visuals | {{X}} formats | ⏳ Pending |
| Landing page | {{X}} | 📝 Brief ready |

### Ad Copy Examples

**Variation A**:
> {{AD_COPY_A}}

**Variation B**:
> {{AD_COPY_B}}

---

⚠️ **VALIDATION REQUIRED**

- [ ] Key messages approved
- [ ] Tone of voice respected
- [ ] No problematic claims

---
```

---

### Step 5: Tracking Setup

**Skill**: `skills/marketing/analytics.md`

**Output**:
- `.project/04-specs/campaigns/{{CAMPAIGN_ID}}/tracking-plan.md`

**🟢 AUTO Gate**: Technical verification

```yaml
checks:
  - gtm_container: "configured"
  - pixels:
      google_ads: "active"
      linkedin: "active"
  - conversions:
      - name: "lead_form_submit"
        status: "tracking"
      - name: "demo_request"
        status: "tracking"
  - utm_convention: "validated"
  - attribution_model: "data-driven"

result: PASS / FAIL
if_fail: escalate to human
```

---

### Step 6: Launch

**Skill**: `skills/marketing/growth.md`

**🔴 BLOCKING Gate**: Go/No-Go

```markdown
---
## 🔴 GO/NO-GO - Campaign Launch

### Pre-launch Checklist

| Item | Status | Owner |
|------|--------|-------|
| Brief validated | ✅ | {{WHO}} |
| Budget released | ✅ | {{WHO}} |
| Creatives ready | ✅ | {{WHO}} |
| Landing page live | ✅ | {{WHO}} |
| Tracking verified | ✅ | Auto |
| Emails configured | ✅ | {{WHO}} |

### Residual Risks

| Risk | Level | Accepted? |
|------|-------|-----------|
| {{RISK}} | Low | ✅ |

### Day 1 Spend

| Channel | Day 1 Budget |
|---------|--------------|
| Google Ads | ${{X}} |
| LinkedIn | ${{X}} |

---

⚠️ **DECISION REQUIRED**

**GO**: Launch campaigns
**NO-GO**: Postpone (specify reason)

---
```

**Documented decision**: `.project/04-specs/campaigns/{{CAMPAIGN_ID}}/decisions/MKT-003-go-live.md`

---

### Step 7: Monitoring & Optimization

**Skill**: `skills/marketing/analytics.md`

**Output**:
- `.project/05-quality/campaigns/{{CAMPAIGN_ID}}/reports/`
  - `week-1.md`
  - `week-2.md`
  - ...

**🟡 ADVISORY Gate**: Weekly report

```markdown
## 🟡 Report Week {{N}}

### Performance vs Objectives

| KPI | Target | Current | Trend | Status |
|-----|--------|---------|-------|--------|
| Leads | {{X}} | {{Y}} | {{+/-Z%}} | 🟢/🟡/🔴 |
| CPA | ${{X}} | ${{Y}} | {{+/-Z%}} | 🟢/🟡/🔴 |
| Budget spent | ${{X}} | ${{Y}} | - | - |

### Top Performers

| Channel | ROAS | Action |
|---------|------|--------|
| {{CHANNEL}} | {{X}} | Scale +20% |

### Underperformers

| Channel | Issue | Action |
|---------|-------|--------|
| {{CHANNEL}} | High CPA | Pause + optimize |

### Proposed Adjustments

1. {{ADJUSTMENT_1}}
2. {{ADJUSTMENT_2}}

Should I apply these adjustments?
```

---

### Step 8: Review & Learnings

**Skill**: `skills/marketing/analytics.md`

**Output**:
- `.project/05-quality/campaigns/{{CAMPAIGN_ID}}/final-review.md`
- `.project/07-audit/sessions/{{SESSION_ID}}/` (complete log)

**🔴 BLOCKING Gate**:

```markdown
---
## 🔴 CHECKPOINT - Campaign Review

### Final Results

| Objective | Target | Result | Variance | Status |
|-----------|--------|--------|----------|--------|
| Leads | {{X}} | {{Y}} | {{+/-Z%}} | ✅/❌ |
| CPA | ${{X}} | ${{Y}} | {{+/-Z%}} | ✅/❌ |
| ROAS | {{X}} | {{Y}} | {{+/-Z%}} | ✅/❌ |

### Budget

| Item | Planned | Spent | Variance |
|------|---------|-------|----------|
| Total | ${{X}} | ${{Y}} | {{+/-Z}}$ |

### Performance by Channel

| Channel | Budget | Leads | CPA | ROAS | Verdict |
|---------|--------|-------|-----|------|---------|
| Google | ${{X}} | {{Y}} | ${{Z}} | {{W}} | ⭐ Top |
| LinkedIn | ${{X}} | {{Y}} | ${{Z}} | {{W}} | 👎 Underperformed |

### Key Learnings

1. **{{LEARNING_1}}**
   - Context: {{CONTEXT}}
   - Future action: {{ACTION}}

2. **{{LEARNING_2}}**
   - Context: {{CONTEXT}}
   - Future action: {{ACTION}}

### Next Steps Recommendations

| Action | Priority | Impact | Effort |
|--------|----------|--------|--------|
| {{ACTION_1}} | P1 | High | Medium |
| {{ACTION_2}} | P2 | Medium | Low |

---

⚠️ **VALIDATION REQUIRED**

- [ ] Results analyzed and understood
- [ ] Learnings documented
- [ ] Next actions defined

---
```

**Documented decision**: `.project/04-specs/campaigns/{{CAMPAIGN_ID}}/decisions/MKT-004-learnings.md`

---

## Complete Traceability

### Project Structure

```
.project/
├── 03-architecture/decisions/
│   └── ADR-*.md                         ← TECHNICAL decisions only
│
├── 04-specs/campaigns/
│   └── CAMP-001-product-launch/
│       ├── brief.md                     ← Initial brief
│       ├── audience.md                  ← Target personas
│       ├── channel-strategy.md          ← Channel strategy
│       ├── tracking-plan.md             ← Measurement plan
│       ├── content-briefs/
│       │   ├── ad-copies.md
│       │   ├── landing-page.md
│       │   └── email-sequence.md
│       └── decisions/                   ← MARKETING decisions (per campaign)
│           ├── MKT-001-brief.md
│           ├── MKT-002-channels.md
│           ├── MKT-003-go-live.md
│           └── MKT-004-learnings.md
│
├── 05-quality/campaigns/
│   └── CAMP-001/
│       └── reports/
│           ├── week-1.md
│           ├── week-2.md
│           └── final-review.md
│
└── 07-audit/sessions/
    └── 2024-01-15-campaign-CAMP001/
        └── session.md                   ← Complete AI log
```

### state.json

```json
{
  "campaigns": [
    {
      "id": "CAMP-001",
      "name": "Product X Launch",
      "status": "completed",
      "started_at": "2024-01-15",
      "completed_at": "2024-03-01",
      "results": {
        "leads": 523,
        "spend": 14500,
        "roas": 3.2
      },
      "decisions": ["MKT-001", "MKT-002", "MKT-003", "MKT-004"],
      "learnings": ["MKT-004"]
    }
  ]
}
```

---

## Responsibility and Autonomy

### Who Decides What?

| Decision | Who Validates | Gate |
|----------|---------------|------|
| Objectives & budget | Leadership | 🔴 |
| Personas | Marketing Lead | 🟡 |
| Channel mix | Leadership + Marketing | 🔴 |
| Messages & tone | Marketing + Brand | 🔴 |
| Adjustments < 10% budget | Marketing (autonomous) | 🟢 |
| Adjustments > 10% budget | Leadership | 🔴 |
| Go live | Leadership | 🔴 |
| Learnings | Marketing | 🔴 (to force doc) |

### Audit Trail

Each decision is tracked with:
- **Who** made the decision
- **When** it was made
- **What** was decided
- **Why** (context, alternatives)
- **Impact** measured afterwards
