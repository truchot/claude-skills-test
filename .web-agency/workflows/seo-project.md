# Workflow: SEO Project

Complete workflow for an SEO project, from initial audit to results tracking.

## Triggers

- "SEO audit"
- "Improve search rankings"
- "SEO strategy"
- "Optimize for Google"

## Steps with HITL Gates

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. TECHNICAL AUDIT          │ Crawl, Core Web Vitals, errors    │
│    Skill: seo               │                                    │
│    🟢 AUTO Gate             │ Automatic checks                   │
├─────────────────────────────┼────────────────────────────────────┤
│ 2. ON-PAGE AUDIT            │ Titles, metas, Hn, content        │
│    Skill: seo               │                                    │
│    🟡 ADVISORY Gate         │ Findings presentation              │
├─────────────────────────────┼────────────────────────────────────┤
│ 3. KEYWORD AUDIT            │ Positions, opportunities, gaps    │
│    Skill: seo               │                                    │
│    🟡 ADVISORY Gate         │ Opportunities presentation         │
├─────────────────────────────┼────────────────────────────────────┤
│ 4. COMPLETE REPORT          │ Synthesis + prioritization        │
│    Skill: seo               │                                    │
│    🔴 BLOCKING Gate         │ Audit + priorities validation      │
├─────────────────────────────┼────────────────────────────────────┤
│ 5. SEO ROADMAP              │ Prioritized action plan           │
│    Skill: seo + estimation  │                                    │
│    🔴 BLOCKING Gate         │ Roadmap + resources validation     │
├─────────────────────────────┼────────────────────────────────────┤
│ 6. IMPLEMENTATION           │ Optimization execution            │
│    Skill: seo + dev         │                                    │
│    🟢 AUTO Gate             │ Technical verification             │
├─────────────────────────────┼────────────────────────────────────┤
│ 7. MONTHLY TRACKING         │ Positions, traffic, conversions   │
│    Skill: analytics         │                                    │
│    🟡 ADVISORY Gate         │ Monthly report                     │
└─────────────────────────────┴────────────────────────────────────┘
```

## Step Details

### Step 1: Technical Audit

**Skill**: `skills/marketing/seo.md`

**Output**:
- `.project/04-specs/seo/{{PROJECT_ID}}/technical-audit.md`

**Automatic checks**:
```yaml
technical:
  https:
    status: ✅ | ❌
    issue: "Mixed content"

  mobile:
    status: ✅ | ❌
    viewport: "configured"
    responsive: true

  core_web_vitals:
    lcp:
      value: "2.3s"
      status: 🟢 | 🟡 | 🔴
    fid:
      value: "45ms"
      status: 🟢 | 🟡 | 🔴
    cls:
      value: "0.05"
      status: 🟢 | 🟡 | 🔴

  crawlability:
    robots_txt: ✅
    sitemap: ❌ "Missing"
    canonical: ⚠️ "Inconsistent"

  errors:
    4xx: 12
    5xx: 0
    redirect_chains: 3
```

---

### Step 4: Complete Report

**Skill**: `skills/marketing/seo.md`

**Output**:
- `.project/04-specs/seo/{{PROJECT_ID}}/complete-audit.md`

**🔴 BLOCKING Gate**:

```markdown
---
## 🔴 CHECKPOINT - SEO Audit Validation

### Overall Score: {{SCORE}}/100

| Category | Score | Priority |
|----------|-------|----------|
| Technical | {{X}}/100 | {{P}} |
| On-page | {{X}}/100 | {{P}} |
| Content | {{X}}/100 | {{P}} |
| Backlinks | {{X}}/100 | {{P}} |

### Top 10 Issues (by impact)

| # | Issue | Impact | Effort | Pages |
|---|-------|--------|--------|-------|
| 1 | {{ISSUE}} | High | Low | {{N}} |
| 2 | {{ISSUE}} | High | Medium | {{N}} |
| ... | ... | ... | ... | ... |

### Keyword Opportunities

| Keyword | Volume | Position | Potential |
|---------|--------|----------|-----------|
| {{KW}} | {{VOL}} | {{POS}} | +{{X}} traffic |

### Quick Wins Identified

1. **{{QW_1}}** - Impact: +{{X%}} traffic
2. **{{QW_2}}** - Impact: +{{X%}} traffic
3. **{{QW_3}}** - Impact: +{{X%}} traffic

### Estimated Global Impact

If all recommendations are implemented:
- Organic traffic: +{{X%}} at 6 months
- Top 10 positions: +{{Y}} keywords

---

⚠️ **VALIDATION REQUIRED**

- [ ] Audit understood and accepted
- [ ] Priorities validated
- [ ] Implementation budget discussed

**Decision**: Continue to roadmap / Adjust priorities / Stop

---
```

**Documented decision**: `.project/04-specs/seo/{{PROJECT_ID}}/decisions/SEO-001-audit-findings.md`

---

### Step 5: SEO Roadmap

**Skill**: `skills/marketing/seo.md` + `skills/strategy/estimation.md`

**Output**:
- `.project/04-specs/seo/{{PROJECT_ID}}/roadmap.md`

**🔴 BLOCKING Gate**:

```markdown
---
## 🔴 CHECKPOINT - SEO Roadmap Validation

### Phase 1: Quick Wins (Month 1)

| Action | Impact | Effort | Owner |
|--------|--------|--------|-------|
| {{ACTION_1}} | High | 2h | {{WHO}} |
| {{ACTION_2}} | High | 4h | {{WHO}} |
| {{ACTION_3}} | Medium | 2h | {{WHO}} |

**Total Phase 1 Effort**: {{X}} days
**Expected Impact**: +{{Y%}} traffic

### Phase 2: Foundations (Months 2-3)

| Action | Impact | Effort | Owner |
|--------|--------|--------|-------|
| {{ACTION}} | High | {{X}}d | {{WHO}} |

**Total Phase 2 Effort**: {{X}} days

### Phase 3: Content (Months 3-6)

| Action | Volume | Effort | Owner |
|--------|--------|--------|-------|
| Pillar articles | {{X}} | {{Y}}d | {{WHO}} |
| Existing optimization | {{X}} pages | {{Y}}d | {{WHO}} |

**Total Phase 3 Effort**: {{X}} days

### Phase 4: Authority (Month 6+)

| Action | Objective | Effort |
|--------|----------|--------|
| Link building | +{{X}} backlinks | {{Y}}d/month |

### Total Budget

| Phase | Effort | Estimated Cost |
|-------|--------|----------------|
| Phase 1 | {{X}}d | ${{Y}} |
| Phase 2 | {{X}}d | ${{Y}} |
| Phase 3 | {{X}}d | ${{Y}} |
| Phase 4 | {{X}}d/month | ${{Y}}/month |
| **Total** | **{{X}}d** | **${{Y}}** |

### Results Projection

| Month | Organic Traffic | Top 10 Positions |
|-------|-----------------|------------------|
| M0 (current) | {{X}} | {{Y}} |
| M3 | {{X}} | {{Y}} |
| M6 | {{X}} | {{Y}} |
| M12 | {{X}} | {{Y}} |

---

⚠️ **VALIDATION REQUIRED**

- [ ] Roadmap approved
- [ ] Budget validated
- [ ] Resources assigned

---
```

**Documented decision**: `.project/04-specs/seo/{{PROJECT_ID}}/decisions/SEO-002-roadmap.md`

---

### Step 7: Monthly Tracking

**Skill**: `skills/marketing/analytics.md`

**Output**:
- `.project/05-quality/seo/{{PROJECT_ID}}/reports/`
  - `month-1.md`
  - `month-2.md`
  - ...

**🟡 ADVISORY Gate**:

```markdown
## 🟡 SEO Report - Month {{N}}

### KPIs vs Objectives

| KPI | Objective | Current | Δ M-1 | Status |
|-----|----------|---------|-------|--------|
| Organic traffic | {{X}} | {{Y}} | {{+/-Z%}} | 🟢/🟡/🔴 |
| Top 10 positions | {{X}} | {{Y}} | {{+/-Z}} | 🟢/🟡/🔴 |
| Top 3 positions | {{X}} | {{Y}} | {{+/-Z}} | 🟢/🟡/🔴 |
| Average CTR | {{X%}} | {{Y%}} | {{+/-Z%}} | 🟢/🟡/🔴 |

### Position Movements

#### Gains 🟢

| Keyword | Before | After | Volume |
|---------|--------|-------|--------|
| {{KW}} | {{X}} | {{Y}} | {{VOL}} |

#### Losses 🔴

| Keyword | Before | After | Action |
|---------|--------|-------|--------|
| {{KW}} | {{X}} | {{Y}} | {{ACTION}} |

### Actions Completed This Month

| Action | Status | Impact |
|--------|--------|--------|
| {{ACTION_1}} | ✅ | Being measured |
| {{ACTION_2}} | ✅ | +{{X%}} |

### Planned Actions Next Month

1. {{ACTION_1}}
2. {{ACTION_2}}

### Recommendations

- {{RECO_1}}
- {{RECO_2}}

Should I adjust the strategy?
```

---

## Traceability

### Project Structure

```
.project/
├── 03-architecture/decisions/
│   └── ADR-*.md                      ← TECHNICAL decisions only
│
├── 04-specs/seo/
│   └── {{PROJECT_ID}}/
│       ├── technical-audit.md
│       ├── onpage-audit.md
│       ├── keywords-audit.md
│       ├── complete-audit.md
│       ├── roadmap.md
│       └── decisions/                ← SEO decisions (per project)
│           ├── SEO-001-audit-findings.md
│           └── SEO-002-roadmap.md
│
├── 05-quality/seo/
│   └── {{PROJECT_ID}}/
│       └── reports/
│           ├── month-1.md
│           ├── month-2.md
│           └── ...
│
└── 07-audit/sessions/
    └── {{SESSION_ID}}/
        └── session.md
```

### Conventions

```yaml
decisions:
  prefix: "SEO-"
  format: "SEO-001-description.md"

reports:
  frequency: monthly
  retention: unlimited

reviews:
  audit: annual (recommended)
  roadmap: quarterly
```
