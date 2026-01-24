# Execution Contract Template

Use this template to present the decomposed plan to the user for approval.

---

## Contract Format

```markdown
## 📋 Execution Contract

### Request
"[Original user request in quotes]"

### Understanding
Based on our discussion:
- **Problem**: [What problem we're solving]
- **User**: [Who benefits]
- **Success**: [How we measure success]
- **Out of scope**: [What we won't do]

### Technical Context
- **Stack**: [Tech stack from context]
- **Related code**: [Existing code this touches]
- **Constraints**: [Any technical constraints]

---

### Deliverables

| # | Deliverable | Type | Agent | Gate |
|---|-------------|------|-------|------|
| D-001 | [Name] | [doc/code/test] | [role] | [🔴/🟡/🟢] |
| D-002 | [Name] | [doc/code/test] | [role] | [🔴/🟡/🟢] |
| ... | ... | ... | ... | ... |

---

### Task Breakdown

| ID | Task | Depends On | Effort | Gate |
|----|------|------------|--------|------|
| T-001 | [Description] | - | [Xh] | [🔴/🟡/🟢] |
| T-002 | [Description] | T-001 | [Xh] | [🔴/🟡/🟢] |
| T-003 | [Description] | T-001 | [Xh] | [🔴/🟡/🟢] |
| T-004 | [Description] | T-002, T-003 | [Xh] | [🔴/🟡/🟢] |
| ... | ... | ... | ... | ... |

---

### Execution Flow

```
T-001: [Name]
   │
   ├──→ T-002: [Name]
   │       │
   │       └──→ T-004: [Name]
   │               │
   └──→ T-003: [Name]    │
           │             │
           └─────────────┘
                   │
                   ▼
           T-005: [Name]
```

---

### Checkpoints

We'll pause for your review at these points:

| After | Gate | What you'll review |
|-------|------|-------------------|
| T-001 | 🔴 | [Architecture/Design decision] |
| T-003 | 🟡 | [Backend complete, before frontend] |
| T-005 | 🔴 | [All implementation, before deploy] |

---

### Estimate

| Metric | Value |
|--------|-------|
| **Total effort** | [X hours] |
| **Estimated duration** | [X days] |
| **Critical path** | T-001 → T-002 → T-004 → T-005 |
| **Parallel tracks** | [Track A], [Track B] |

---

### Risks & Assumptions

**Assumptions:**
- [Assumption 1]
- [Assumption 2]

**Risks:**
- [Risk 1] → Mitigation: [How we'll handle it]
- [Risk 2] → Mitigation: [How we'll handle it]

---

## ⚠️ Approval Required

Do you approve this execution plan?

| Response | What happens |
|----------|--------------|
| ✅ **"Approved"** | I create the tasks and begin execution |
| ✏️ **"Adjust [X]"** | I modify the plan and re-present |
| ❓ **"Question about [X]"** | I clarify and then re-present |
| ❌ **"Cancel"** | Plan discarded, no execution |

**Your response?**
```

---

## Usage Instructions

1. **Fill in all sections** from decomposition output
2. **Ensure task dependencies are clear** in both table and visual
3. **Highlight 🔴 gates** where user approval is critical
4. **Include estimates** even if rough
5. **Always end with approval request** - this is a BLOCKING gate

---

## Example: Stripe Integration

```markdown
## 📋 Execution Contract

### Request
"Add Stripe subscription payments"

### Understanding
Based on our discussion:
- **Problem**: Users can't purchase premium subscriptions
- **User**: Free users wanting to upgrade
- **Success**: 3-tier subscription flow with 95%+ completion rate
- **Out of scope**: PayPal, crypto, invoicing, mobile app

### Technical Context
- **Stack**: Next.js 14, TypeScript, Prisma, PostgreSQL
- **Related code**: User authentication (exists), no payment code yet
- **Constraints**: Must be PCI compliant (Stripe handles this)

---

### Deliverables

| # | Deliverable | Type | Agent | Gate |
|---|-------------|------|-------|------|
| D-001 | Payment ADR | doc | tech-architect | 🔴 |
| D-002 | Stripe Integration Spec | doc | tech-architect | 🔴 |
| D-003 | Subscription Schema | code | backend | 🟢 |
| D-004 | Webhook Handler | code | backend | 🟢 |
| D-005 | Subscription API | code | backend | 🟡 |
| D-006 | Pricing Page | code | frontend | 🟢 |
| D-007 | Checkout Flow | code | frontend | 🟢 |
| D-008 | Integration Tests | test | testing | 🔴 |

---

### Task Breakdown

| ID | Task | Depends On | Effort | Gate |
|----|------|------------|--------|------|
| T-001 | Write ADR: Stripe vs alternatives | - | 2h | 🔴 |
| T-002 | Design Stripe integration architecture | T-001 | 3h | 🔴 |
| T-003 | Create subscription tables migration | T-002 | 2h | 🟢 |
| T-004 | Implement Stripe webhook handler | T-003 | 4h | 🟢 |
| T-005 | Create subscription API endpoints | T-003 | 4h | 🟡 |
| T-006 | Build pricing page component | T-002 | 4h | 🟢 |
| T-007 | Build checkout flow with Stripe Elements | T-005, T-006 | 6h | 🟢 |
| T-008 | Write integration tests | T-004, T-005, T-007 | 4h | 🔴 |

---

### Execution Flow

```
T-001: ADR ─────────────────────┐
                                ▼
T-002: Design ───────┬───── T-006: Pricing UI
                     │              │
                     ▼              │
T-003: DB Schema ────┤              │
        │            │              │
        ├──► T-004: Webhooks       │
        │                          │
        └──► T-005: API ───────────┤
                     │             │
                     └─────────────┘
                            │
                            ▼
                     T-007: Checkout
                            │
                            ▼
                     T-008: Tests
```

---

### Checkpoints

| After | Gate | What you'll review |
|-------|------|-------------------|
| T-001 | 🔴 | ADR: Confirm Stripe is the right choice |
| T-002 | 🔴 | Integration design: API contract, data model |
| T-005 | 🟡 | Backend complete: Review before frontend work |
| T-008 | 🔴 | Full implementation: Final review before deploy |

---

### Estimate

| Metric | Value |
|--------|-------|
| **Total effort** | 29 hours |
| **Estimated duration** | 4 working days |
| **Critical path** | T-001 → T-002 → T-003 → T-005 → T-007 → T-008 |
| **Parallel tracks** | Backend (T-004, T-005) ∥ Frontend (T-006) |

---

### Risks & Assumptions

**Assumptions:**
- Stripe account already exists or can be created
- Test mode is sufficient for development
- No need for multiple currencies initially

**Risks:**
- Webhook reliability → Mitigation: Idempotent handlers, retry logic
- PCI scope → Mitigation: Use Stripe Elements (client-side tokenization)

---

## ⚠️ Approval Required

Do you approve this execution plan?

| Response | What happens |
|----------|--------------|
| ✅ **"Approved"** | I create the tasks and begin execution |
| ✏️ **"Adjust [X]"** | I modify the plan and re-present |
| ❓ **"Question about [X]"** | I clarify and then re-present |
| ❌ **"Cancel"** | Plan discarded, no execution |

**Your response?**
```
