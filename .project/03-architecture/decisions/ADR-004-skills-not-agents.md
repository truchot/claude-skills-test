# ADR-004: Skills Pattern Instead of Agents

## Status
**Accepted** - 2026-01-22

## Context

We need to structure our AI capabilities for the web agency. Two main patterns exist:

1. **Agents**: Autonomous entities that receive tasks and execute independently
2. **Skills**: Reusable expertise that Claude loads and applies in context

Claude Code officially supports both, with specific recommendations for each.

## Options Considered

### Option 1: Agent-Based Architecture
Each capability is an autonomous "agent" that:
- Receives input, processes, returns output
- Runs in isolated context (subagent)
- Cannot delegate to other agents (Claude limitation)

**Pros:**
- Clear isolation
- Controlled context
- Can route to cheaper models

**Cons:**
- Cannot nest (agent can't call agent)
- Isolated context loses conversation history
- More complex orchestration needed
- Verbose output stays in separate context

### Option 2: Skills-Based Architecture (Claude Official)
Each capability is a "skill" that:
- Provides domain expertise loaded into main context
- Uses `SKILL.md` with YAML frontmatter
- Can be auto-invoked based on description
- Supports nested delegation

**Pros:**
- Nested delegation supported (skill calls skill)
- Shares conversation context
- Auto-invocation based on relevance
- Official Claude format with tooling support
- Progressive disclosure (loads reference files on demand)

**Cons:**
- Competes for context window
- Less isolation

### Option 3: Hybrid Approach
Skills for expertise, subagents for isolated tasks.

**Pros:**
- Best of both worlds
- Use subagents for verbose/expensive operations

**Cons:**
- More complexity
- Two patterns to maintain

## Decision

**Chosen: Option 2 - Skills-Based Architecture**

With selective use of `context: fork` for skills that need isolation.

## Rationale

### 1. Nested Delegation is Critical

Our workflows require chains: Router → Qualification → Specification → Architect → ...

With agents (subagents):
```
Router (subagent) → Cannot spawn Qualification (subagent)
❌ Workflow broken
```

With skills:
```
Router (skill) → Loads Qualification (skill) → Loads Specification (skill)
✅ Full workflow supported
```

### 2. Context Sharing Benefits Us

Our workflows need conversation history:
- Architect needs to know what Specification decided
- Code Review needs to see what was implemented
- Delivery needs full context of the feature

Skills share context naturally. Agents lose it.

### 3. Official Claude Support

Claude Code provides:
- `SKILL.md` format with YAML frontmatter
- Auto-invocation based on `description`
- `allowed-tools` for restriction
- `context: fork` for isolation when needed
- Progressive disclosure for reference files

We get tooling, documentation, and future improvements for free.

### 4. Terminology Clarity

"Agent" implies autonomy and independence. Our capabilities are:
- Domain expertise (architect knows architecture)
- Process knowledge (deployment knows how to deploy)
- Not autonomous decision-makers

"Skill" better represents what they are: expertise Claude applies.

## Implementation

### Skill Format (SKILL.md)

```yaml
---
name: architect
description: Expert architecture pragmatique, boring tech, documente en ADR
allowed-tools: Read, Write, Glob, Grep
---

<persona>
[Strong identity that guides behavior]
</persona>

<rules>
- ALWAYS/NEVER imperatives
</rules>

<process>
1-5 steps
</process>

<output>
YAML schema
</output>

<example>
One concrete example
</example>
```

### Directory Structure

```
.web-agency/
├── skills/              # Domain expertise (SKILL.md format)
│   ├── architect/
│   │   └── SKILL.md
│   ├── frontend/
│   │   └── SKILL.md
│   └── ...
├── workflows/           # Process chains
├── state/               # Session state
├── memory/              # Long-term memory
└── core/                # Protocols
```

### When to Use context: fork

Add `context: fork` to SKILL.md when:
- Output is very verbose (would pollute main context)
- Need strict tool isolation
- Exploration that might fail

```yaml
---
name: deep-research
context: fork
agent: Explore
---
```

## Consequences

### Positive
- Full workflow chains possible (nested delegation)
- Context preserved across skill calls
- Official format with Claude support
- Better terminology (skill = expertise)
- Auto-invocation based on description

### Negative
- Skills compete for context window (mitigated by compact format)
- Less isolation by default (mitigated by context: fork option)

### Migration
- Rename `agents/` to `skills/`
- Convert to SKILL.md format with YAML frontmatter
- Update ORCHESTRATOR.md references

## References
- [Claude Code Skills Documentation](https://docs.anthropic.com/claude-code/skills)
- [Subagents vs Skills](https://docs.anthropic.com/claude-code/subagents)
- ADR-001: REACT Pattern (complementary decision)
