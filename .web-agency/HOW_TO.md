# How to Use the Web Agency IA

Quick guide to using the `/tech`, `/design`, `/project`, and `/marketing` commands.

---

## Quick Start

```bash
# Technical tasks
/tech [your request]

# Design tasks
/design [your request]

# Project management
/project [your request]

# Marketing tasks
/marketing [your request]
```

That's it. The orchestrator handles routing, agents, and gates automatically.

---

## Command Overview

### `/tech` - Technical Tasks

**Use for**: Code, architecture, bugs, deployments, audits, DevOps

```bash
# Examples
/tech Add OAuth Google login to the app
/tech Fix the checkout bug on mobile
/tech Deploy v1.2.0 to production
/tech Audit security of the payment flow
/tech Review PR #142
```

**What happens**:
1. Router analyzes your request
2. Selects appropriate workflow (feature, bugfix, deployment, audit, code-review)
3. Executes agents sequentially with gates

**Agents involved**: architect, specification, frontend, backend, database, integration, testing, code-review, security-check, performance, ci-cd, deployment

---

### `/design` - Design Tasks

**Use for**: UI components, design system, UX audits, accessibility

```bash
# Examples
/design Create a new Button component
/design Audit the checkout UX
/design Check accessibility of the homepage
/design Update the design system colors
```

**What happens**:
1. Loads design context
2. Applies WCAG 2.1 AA standards
3. Produces specs with Figma/code references

---

### `/project` - Project Management

**Use for**: Planning, tracking, client communication, delivery

```bash
# Examples
/project Plan the Q1 roadmap
/project Status update on Feature X
/project Prepare delivery for client
/project Estimate the new dashboard feature
```

**Agents involved**: planning, tracking, communication, delivery, estimation

---

### `/marketing` - Marketing Tasks

**Use for**: SEO, content, analytics, growth experiments, campaigns

```bash
# Examples
/marketing Audit SEO for example.com
/marketing Create content brief for "RGPD export"
/marketing Analyze last month's performance
/marketing Design A/B test for checkout conversion
/marketing Plan the product launch campaign
```

**Workflows**:
- `marketing-campaign`: Full campaign (8 steps, multiple gates)
- `seo-project`: SEO audit and optimization (7 steps)
- Direct agent for simple tasks

**Agents involved**: seo, content, analytics, growth

---

## Understanding Gates

Gates are checkpoints where the system pauses for validation or information.

### Gate Types

| Gate | Symbol | Behavior | Your Action |
|------|--------|----------|-------------|
| **BLOQUANTE** | 🔴 | Full stop, waits for you | Must respond to continue |
| **INFORMATIVE** | 🟡 | Pauses, shows progress | Optional response, auto-continues |
| **AUTO** | 🟢 | Automatic checks | No action needed |

### Responding to Gates

**🔴 BLOQUANTE** - You'll see:
```
## 🔴 CHECKPOINT - Validation Required

[Summary of what was done]

Respond:
- ✅ "Validated" → Continues
- ❌ "Adjust" → Specify changes
- ❓ Questions → I'll clarify
```

**Your responses**:
- `ok` / `validated` / `yes` → Continue
- `adjust: [feedback]` → Modify and retry
- `question: [your question]` → Get clarification
- `stop` → Abort workflow

**🟡 INFORMATIVE** - You'll see:
```
## 🟡 Progress Update

[What was done]

Continue with [next step]?
```

Just press Enter or respond to continue.

---

## State Management

The system tracks progress in `state/current.json`.

### Check Current State

```bash
cat .web-agency/state/current.json
```

### Resume Interrupted Workflow

If a workflow was interrupted:
```bash
/tech continue
# or
/tech resume
```

The system reads `state/current.json` and continues from where it stopped.

### Reset State

```bash
# Clear state to start fresh
echo '{"version":"1.0","workflow":null}' > .web-agency/state/current.json
```

---

## Memory System

The agency remembers decisions, patterns, and errors.

### What's Remembered

| File | Content | Used For |
|------|---------|----------|
| `memory/long-term/decisions.json` | Past ADRs and decisions | Avoid re-discussing |
| `memory/long-term/patterns.json` | Project conventions | Consistent code |
| `memory/long-term/errors.json` | Past mistakes | Don't repeat |
| `memory/long-term/preferences.json` | Your preferences | Personalization |

### Memory is Automatic

You don't need to manage memory manually. Agents read and write as needed.

---

## Output Locations

All deliverables go to `.project/`:

| Type | Location |
|------|----------|
| PRD, Vision | `.project/01-vision/` |
| User Stories | `.project/02-requirements/user-stories/` |
| Architecture Decisions | `.project/03-architecture/decisions/` |
| Feature Specs | `.project/04-specs/features/` |
| Marketing Decisions | `.project/04-specs/campaigns/` or `.project/04-specs/seo/` |
| Test Reports | `.project/05-quality/` |
| Release Notes | `.project/06-operations/releases/` |
| Session Logs | `.project/07-audit/sessions/` |

---

## Tips

### Be Specific
```bash
# Bad
/tech improve performance

# Good
/tech Optimize LCP on homepage, currently 4.2s, target < 2.5s
```

### Include Context
```bash
# Bad
/tech fix the bug

# Good
/tech Fix checkout 500 error when user has empty cart, see Sentry issue #1234
```

### Let Gates Work
Don't try to skip gates. They exist to catch problems early.

### Trust the Agents
Each agent has a strong persona and expertise. Let them do their job.

---

## Next Steps

- See [EXAMPLES.md](./EXAMPLES.md) for complete workflow walkthroughs
- See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) if something goes wrong
- See [ORCHESTRATOR.md](./ORCHESTRATOR.md) for the full orchestration logic
