# Workflow Examples

Complete examples of workflow executions with the Web Agency IA.

---

## Example 1: Feature Development (Full Workflow)

### User Request
```bash
/tech Add user data export feature for GDPR compliance
```

### Step 1: Reception & Routing
```yaml
routing:
  intent: create
  domain: tech
  urgency: P3
  decision: workflow
  target: workflows/feature.md
  handoff: "New feature: GDPR data export"
```

### Step 2: Qualification
```yaml
qualification:
  complexity: medium
  effort_days: {min: 5, max: 8}
  risks:
    - risk: "Large data volumes may timeout"
      mitigation: "Implement streaming/pagination"
  recommendation: go
```

### Step 3: Specification

```
## 🔴 CHECKPOINT - Spec Validation

### Deliverable
Feature spec created at `.project/04-specs/features/FEAT-012/spec.md`

### Summary
- Feature: User Data Export
- Objective: GDPR Article 20 compliance
- User Stories: 2 (export JSON, export CSV)
- Out of scope: Payment data, automated exports

### Acceptance Criteria
- [ ] Export button in Settings
- [ ] JSON and CSV formats
- [ ] Download < 30s
- [ ] Confirmation email

---
⚠️ **WAITING FOR YOUR VALIDATION**

Respond:
- ✅ "Validated" → Continue to architecture
- ❌ "Adjust" → Specify changes
```

**User**: `validated`

### Step 4: Architecture

```
## 🔴 CHECKPOINT - Architecture Validation

### Decision
ADR created at `.project/03-architecture/decisions/ADR-007.md`

### Summary
- API: GET /api/users/me/export?format=json|csv
- Storage: Temporary file, S3 for large exports
- Components: ExportService, ExportSerializer

### Options Considered
1. ✅ Stream to file → Simple, works for most cases
2. Background job + email → Better for huge datasets, more complex

Chose option 1 (simpler, sufficient for expected data sizes)

---
⚠️ **WAITING FOR YOUR VALIDATION**
```

**User**: `validated`

### Step 5: Task Breakdown

```
## 🟡 Progress Update

### Tasks Created (9 tasks)
- TASK-001: Create API endpoint (2-4h)
- TASK-002: Implement data aggregation (4-8h)
- TASK-003: Add JSON/CSV serializer (2-4h)
- TASK-004: UI button in Settings (2-3h)
- TASK-005: Email confirmation (1-2h)
- TASK-006-009: Tests

### Critical Path
TASK-001 → TASK-002 → TASK-003 → TASK-005

Proceeding to development...
```

### Step 6: Development (Multiple Agents)

```
## 🟢 AUTO CHECK - Backend Development

✅ ExportService created
✅ API endpoint implemented
✅ Tests passing (12/12)
✅ Lint: 0 errors

Continuing to frontend...
```

```
## 🟢 AUTO CHECK - Frontend Development

✅ ExportDataButton component created
✅ Settings page updated
✅ Tests passing (8/8)
✅ Accessibility: WCAG 2.1 AA compliant

Continuing to integration...
```

### Step 7: Code Review

```
## 🟡 Code Review Complete

### Verdict: APPROVED with minor comments

**Comments:**
1. (minor) ExportService.ts:45 - Add timeout for large exports
2. (nitpick) Rename 'data' to 'userData' for clarity

**Good parts:**
- Comprehensive test coverage (87%)
- Good error handling
- Clean component structure

Proceeding to deployment...
```

### Step 8: Deployment

```
## 🔴 CHECKPOINT - Production Deployment

### Pre-deploy Checklist
- [x] Tests pass
- [x] Staging validated
- [x] Migrations ready
- [x] Monitoring active

### Deployment Plan
1. Run migration: add_user_exports_table
2. Deploy code
3. Smoke tests
4. Monitor 30min

### Rollback Plan
Revert to v1.1.9, down migration

---
⚠️ **APPROVE PRODUCTION DEPLOYMENT?**
```

**User**: `deploy`

### Step 9: Completion

```
## ✅ Workflow Complete

### Summary
- Feature: User Data Export (FEAT-012)
- Duration: 6 days (within estimate)
- Deployed: v1.2.0

### Deliverables
- Spec: .project/04-specs/features/FEAT-012/spec.md
- ADR: .project/03-architecture/decisions/ADR-007.md
- Code: Merged PR #142
- Tests: 20 new tests, 87% coverage

### State
Workflow archived to `.project/07-audit/sessions/`
State reset for next workflow.
```

---

## Example 2: Bug Fix (Urgent)

### User Request
```bash
/tech URGENT: Checkout returns 500 error since this morning
```

### Routing (Fast-tracked)
```yaml
routing:
  intent: fix
  domain: tech
  urgency: P1  # "URGENT" keyword detected
  decision: workflow
  target: workflows/bugfix.md
  handoff: "P1 Bug: Checkout 500 error"
```

### Investigation

```
## 🟡 Bug Analysis

### Findings
- Error: "Invalid API key" in Stripe calls
- Started: 2024-01-15 00:00 UTC
- Affected: 100% of checkout attempts
- Root cause: Stripe test key expired

### Fix
Replace STRIPE_SECRET_KEY with live key (was using test key in prod)

Proceeding to fix...
```

### Fix & Deploy

```
## 🔴 CHECKPOINT - Hotfix Deployment

### Changes
- Updated STRIPE_SECRET_KEY in production env
- Added key expiration monitoring

### Risk Assessment
- Low risk: Only env var change
- Tested: 3 successful test transactions

### Rollback
Revert env var (previous key still valid for 24h)

---
⚠️ **APPROVE HOTFIX?** (P1 - expedited review)
```

**User**: `yes`

### Resolution

```
## ✅ Bug Resolved

### Incident: INC-2024-042
- Duration: 45 minutes
- Impact: ~50 failed checkouts
- Resolution: Stripe key updated

### Post-mortem Scheduled
2024-01-16 14:00 - Review key management process

### Action Items
- [ ] Add credential expiration alerts
- [ ] Audit all API keys in production
```

---

## Example 3: SEO Audit (Marketing)

### User Request
```bash
/marketing Audit SEO for example.com
```

### Routing
```yaml
routing:
  intent: audit
  domain: marketing
  decision: workflow
  target: workflows/seo-project.md
```

### Technical Audit

```
## 🟡 Technical SEO Audit

### Crawl Results
- Pages crawled: 127
- Indexable: 98
- Blocked: 29 (intentional: admin, api)

### Issues Found
| Severity | Count | Issue |
|----------|-------|-------|
| Critical | 1 | Missing sitemap.xml |
| High | 3 | Pages with LCP > 4s |
| High | 12 | Missing meta descriptions |
| Medium | 8 | Images without alt text |
| Low | 23 | Non-descriptive anchor text |

### Score: 58/100

Proceeding to on-page analysis...
```

### On-Page Analysis

```
## 🟡 On-Page SEO Analysis

### Content Audit
- Pages with thin content (<300 words): 12
- Duplicate content issues: 3
- Keyword cannibalization: 2 pairs

### Structure
- H1 missing: 8 pages
- Multiple H1: 4 pages
- Heading hierarchy broken: 15 pages

Proceeding to recommendations...
```

### Roadmap

```
## 🔴 CHECKPOINT - SEO Roadmap Validation

### Quick Wins (Week 1) - Expected +15 points
1. Create sitemap.xml (1h, +8 pts)
2. Add meta descriptions to top 20 pages (4h, +5 pts)
3. Fix H1 issues (2h, +2 pts)

### Phase 2 (Week 2-3) - Expected +12 points
1. Optimize images (WebP, lazy loading)
2. Fix Core Web Vitals (LCP < 2.5s)
3. Add structured data (FAQ, Product)

### Phase 3 (Month 2) - Expected +8 points
1. Content refresh (thin pages)
2. Internal linking optimization
3. Fix cannibalization

### Target Score: 93/100

---
⚠️ **VALIDATE ROADMAP?**
```

**User**: `validated, prioritize quick wins`

### Completion

```
## ✅ SEO Audit Complete

### Deliverables
- Full audit: .project/04-specs/seo/SEO-001/audit.md
- Roadmap: .project/04-specs/seo/SEO-001/roadmap.md
- Decision: .project/04-specs/seo/SEO-001/decisions/MKT-001.md

### Next Steps
Start with sitemap.xml creation?
```

---

## Example 4: Simple Question (No Workflow)

### User Request
```bash
/tech What's the difference between REST and GraphQL?
```

### Direct Response
```yaml
routing:
  intent: question
  domain: tech
  decision: direct  # No workflow needed
```

```
## REST vs GraphQL

**REST**
- Multiple endpoints (/users, /posts, /comments)
- Fixed response structure
- HTTP verbs for semantics (GET, POST, PUT, DELETE)
- Caching built-in (HTTP cache)

**GraphQL**
- Single endpoint (/graphql)
- Client specifies exact fields needed
- Always POST
- Requires custom caching (Apollo, etc.)

**When to use REST**: Simple CRUD, public APIs, caching important
**When to use GraphQL**: Complex data needs, mobile apps (bandwidth), rapidly evolving frontend

For your project (Next.js e-commerce), REST is fine unless you have complex nested data requirements.
```

No workflow executed. No state changed.

---

## Example 5: Project Planning

### User Request
```bash
/project Plan the v2.0 release with dashboard and notifications features
```

### Planning Output

```
## 🔴 CHECKPOINT - Release Plan Validation

### v2.0 Release Plan

**Duration**: 8 weeks
**Team**: 2 devs, 1 designer

### Phase 1: Dashboard (Weeks 1-4)
| Week | Focus | Milestone |
|------|-------|-----------|
| 1 | Specs & Design | Figma approved |
| 2-3 | Development | Core dashboard live (staging) |
| 4 | Polish & Testing | Dashboard ready for prod |

### Phase 2: Notifications (Weeks 5-7)
| Week | Focus | Milestone |
|------|-------|-----------|
| 5 | Specs & FCM Setup | Push infra ready |
| 6 | Development | Notifications functional |
| 7 | Testing & Polish | Feature complete |

### Phase 3: Release (Week 8)
- Integration testing
- Staging validation
- Production deployment
- Client training

### Key Dates
- 2024-02-15: Dashboard staging
- 2024-03-01: Notifications staging
- 2024-03-15: v2.0 Production

### Risks
1. FCM integration complexity → Buffer in week 6
2. Design delays → Parallel spec work

---
⚠️ **VALIDATE PLAN?**
```

---

## Tips from Examples

1. **Be specific**: "Add OAuth Google" > "Add login"
2. **Include context**: "500 error since this morning" helps prioritize
3. **Trust the gates**: They catch issues early
4. **Simple requests = direct responses**: No workflow overhead for questions
5. **Validate thoughtfully**: Gates are your chance to course-correct
