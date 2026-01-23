# Pattern: Attribution Modeling

> How to think about and implement marketing attribution.

## Context

Customers interact with multiple touchpoints before converting. Attribution determines how credit is assigned across those touchpoints. Getting this wrong leads to poor budget decisions.

## Pattern

### Attribution Models

```yaml
last_click:
  description: "100% credit to last touchpoint"
  pros:
    - "Simple to understand"
    - "Clear accountability"
  cons:
    - "Ignores awareness/consideration work"
    - "Favors bottom-funnel channels"
  use_when: "Simple funnels, direct response"

first_click:
  description: "100% credit to first touchpoint"
  pros:
    - "Values discovery/awareness"
    - "Good for new customer acquisition"
  cons:
    - "Ignores conversion drivers"
    - "Can overvalue low-intent channels"
  use_when: "Focus on new customer acquisition"

linear:
  description: "Equal credit to all touchpoints"
  pros:
    - "Balanced view"
    - "No bias toward any stage"
  cons:
    - "May overvalue low-impact touches"
    - "Doesn't reflect reality"
  use_when: "Long consideration cycles, equal channel importance"

time_decay:
  description: "More credit to recent touchpoints"
  pros:
    - "Balances awareness and conversion"
    - "Reflects recency importance"
  cons:
    - "May undervalue early touches"
    - "Arbitrary decay rate"
  use_when: "Short sales cycles, promotional campaigns"

position_based:
  description: "40% first, 40% last, 20% middle"
  pros:
    - "Values introduction and conversion"
    - "Reasonable compromise"
  cons:
    - "Arbitrary split"
    - "May not reflect your funnel"
  use_when: "Balanced view needed, standard funnels"

data_driven:
  description: "ML-based credit distribution"
  pros:
    - "Most accurate (if enough data)"
    - "Adapts to your patterns"
  cons:
    - "Requires significant conversion volume"
    - "Black box, hard to explain"
  use_when: "High volume, sophisticated analysis"
```

### Choosing a Model

```yaml
decision_tree:
  question_1: "Do you have >1000 conversions/month?"
    yes: "Consider data-driven"
    no: "Use rules-based model"

  question_2: "What's your primary goal?"
    new_customers: "Weight toward first-click"
    conversions: "Weight toward last-click"
    balanced: "Linear or position-based"

  question_3: "What's your sales cycle?"
    short: "Time decay or last-click"
    long: "Linear or position-based"

recommendation:
  most_businesses: "Position-based (40/20/40) as starting point"
  high_volume: "Data-driven with position-based comparison"
  simple_funnel: "Last-click is fine"
```

### Implementation Checklist

```yaml
setup:
  - "[ ] Define conversion events"
  - "[ ] Set attribution window (7-90 days)"
  - "[ ] Align windows across platforms"
  - "[ ] Configure model in GA4"
  - "[ ] Document model choice and rationale"

cross_platform:
  challenge: "Each platform claims full credit"
  solutions:
    - "Use third-party attribution tool"
    - "Apply consistent model manually"
    - "Accept platform data with caveats"
    - "Use incrementality testing"

reporting:
  - "Report conversions by model"
  - "Show assisted conversions"
  - "Track path length"
  - "Compare models periodically"
```

### Attribution Pitfalls

| Pitfall | Impact | Mitigation |
|---------|--------|------------|
| Different windows per platform | Inconsistent comparison | Align windows |
| Counting same conversion twice | Inflated results | Deduplicate |
| Ignoring view-through | Undervaluing display | Include with caution |
| Over-relying on one model | Biased decisions | Compare models |

## Anti-Patterns

| Anti-Pattern | Why It's Bad | Better Approach |
|--------------|--------------|-----------------|
| Platform-reported only | Each over-counts | Use independent attribution |
| Changing models frequently | No trend comparison | Pick one, stick with it |
| Ignoring attribution | Bad budget decisions | Simple model > no model |
| Over-complicating | Analysis paralysis | Start simple, evolve |

## Related Patterns

- `budget-allocation.md` - Using attribution for budgeting
- `incrementality-testing.md` - Testing true impact

## References

- `contexts/analytics.md` - GA4 attribution settings
- `roles/marketing-lead/agents/analytics-interpreter.md` - Analysis guidance
