# Compiled Agents

## Purpose

Compiled agents are **self-contained files** that include everything needed to execute a specific agent's task. Instead of navigating multiple files (ROLE.md + agent.md + knowledge + templates), load a single compiled file.

## Structure

```
compiled-agents/
├── README.md                              # This file
├── COMPILER.md                            # How to compile agents
├── tech-architect/
│   ├── api-design.compiled.md             # Complete API Design agent
│   ├── data-modeling.compiled.md
│   └── ...
├── product-manager/
│   ├── prd-writer.compiled.md
│   └── ...
├── lead-developer/
│   ├── code-review.compiled.md
│   └── ...
└── developer/
    ├── frontend-implementation.compiled.md
    └── ...
```

## What's Included in a Compiled Agent

Each `.compiled.md` file contains:

1. **Quick Reference** - Role, triggers, gates at a glance
2. **Full Procedure** - Complete step-by-step procedure
3. **Templates (Embedded)** - All output templates inline
4. **Checklists (Embedded)** - All checklists inline
5. **Knowledge (Summaries)** - Relevant patterns/rules summarized
6. **Context Requirements** - What to load before using

## When to Use

| Situation | Use |
|-----------|-----|
| Starting a new task | Load the compiled agent |
| Need complete procedure | Use compiled agent |
| Quick reference only | Use original agent file |
| Need to modify procedure | Edit original, recompile |

## Loading Protocol

```yaml
loading:
  step_1: "Identify task → Determine role and agent"
  step_2: "Load compiled-agents/{role}/{agent}.compiled.md"
  step_3: "Load context per 'context_requirements' section"
  step_4: "Execute procedure"
```

## Compilation Frequency

- Compile when agent files are updated
- Compile when referenced knowledge changes significantly
- Version compiled agents with date

## File Naming

```
{agent-name}.compiled.md

Examples:
- api-design.compiled.md
- code-review.compiled.md
- prd-writer.compiled.md
```
