# ADR-001: Use REACT Pattern for Agent Execution

## Status
**Accepted** - 2026-01-22

## Context

We need a reasoning framework for AI agents that:
- Makes agent thinking visible and debuggable
- Allows mid-execution correction
- Produces consistent, predictable outputs
- Can be enforced through prompting

Several patterns exist for structuring LLM reasoning.

## Options Considered

### Option 1: Direct Response
Agent receives input → produces output directly.

**Pros:**
- Fast, minimal overhead
- Simple to implement
- Works for trivial tasks

**Cons:**
- No visibility into reasoning
- Errors hidden until output
- No self-correction mechanism
- Debugging is guesswork

### Option 2: Chain-of-Thought (CoT)
Agent "thinks step by step" before answering.

**Pros:**
- Improves accuracy on complex tasks
- Some reasoning visibility
- Well-documented technique

**Cons:**
- One-shot: no iteration loop
- Can't observe intermediate results
- No action/observation cycle
- Reasoning may diverge without correction

### Option 3: Plan-then-Execute
Agent creates complete plan → executes all steps.

**Pros:**
- Clear separation of planning and doing
- Plan can be validated before execution

**Cons:**
- Rigid: can't adapt to discoveries mid-execution
- Plan may be wrong, but execution proceeds anyway
- Requires accurate upfront knowledge

### Option 4: REACT (Reasoning + Acting)
Agent cycles: Thought → Action → Observation → Reflection → repeat.

**Pros:**
- Explicit reasoning at every step
- Observes results before continuing
- Self-corrects based on observations
- Natural stopping point (done/escalate)
- Full audit trail

**Cons:**
- More verbose output
- Requires structured prompt format
- Slightly slower for simple tasks

## Decision

**Chosen: Option 4 - REACT Pattern**

## Rationale

1. **Debugging**: When an agent produces wrong output, REACT shows exactly where reasoning went wrong. With direct response, we only see the bad output.

2. **Self-correction**: The observation step lets agents catch their own mistakes. "I expected X but got Y, let me adjust."

3. **Complex tasks**: Our workflows involve multi-step processes (spec → architecture → code → test). REACT handles this naturally.

4. **Human oversight**: Thought blocks give humans insight into agent reasoning at gates, enabling informed validation.

5. **Consistency**: Structured format (thought/action/observation) produces predictable outputs that downstream agents can parse.

## Implementation

Each agent prompt includes:

```markdown
<process>
For each action:
1. THOUGHT: What am I trying to do? What do I know?
2. ACTION: What specific action will I take?
3. OBSERVATION: What was the result?
4. REFLECTION: Is this sufficient? Continue or done?
</process>
```

Output format enforced:
```yaml
thought: |
  [reasoning]
action: [action_name]
action_input: [params]
---
observation: |
  [result]
reflection: |
  [analysis]
next: [continue|done|escalate]
```

## Consequences

### Positive
- Full audit trail of agent reasoning
- Errors caught earlier in process
- Easier to improve agents (see where they fail)
- Better human-AI collaboration at gates

### Negative
- ~20% more tokens per agent execution
- Requires consistent prompt structure across all agents
- Simple tasks have unnecessary overhead (mitigated by direct response routing)

### Mitigations
- Router sends trivial questions directly (no REACT overhead)
- Compact agent format (~60 lines) minimizes prompt tokens
- REACT cycle optional for simple single-action agents

## References
- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)
- [Chain-of-Thought Prompting](https://arxiv.org/abs/2201.11903)
