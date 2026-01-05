# Routing Efficiency Monitoring

Monitor agent routing patterns across 360+ agents in 16 skills to ensure discovery overhead is minimized and routing is efficient.

## Overview

With a large number of agents, routing efficiency becomes critical. This monitoring system:

- **Tracks agent distribution** across skills and domains
- **Detects keyword overlaps** that could cause ambiguous routing
- **Analyzes routing paths** to identify bottlenecks and dead ends
- **Measures routing complexity** and provides optimization recommendations
- **Enforces performance budgets** to prevent routing overhead

## Quick Start

```bash
# Get a quick summary of routing efficiency
node collect-routing-metrics.js summary

# Analyze routing patterns
node analyze-routing-patterns.js

# Generate detailed markdown report
node collect-routing-metrics.js markdown > report.md

# Get full JSON metrics for CI integration
node collect-routing-metrics.js json
```

## Performance Budgets

| Metric | Budget | Description |
|--------|--------|-------------|
| Max Agents/Skill | 50 | Maximum agents in a single skill |
| Max Total Agents | 400 | Total agents across all skills |
| Max Keywords/Domain | 15 | Keywords before ambiguity risk |
| Min Keyword Uniqueness | 70% | Unique keywords ratio |
| Max Routing Depth | 3 | Maximum levels in routing hierarchy |
| Max Keyword Overlap | 5 | Shared keywords between skills |
| Min Agent Coverage | 85% | Reachable agents percentage |

## Available Scripts

### `collect-routing-metrics.js`

Collects and analyzes routing efficiency metrics.

```bash
# Output formats
node collect-routing-metrics.js json      # Full JSON metrics
node collect-routing-metrics.js summary   # Visual summary
node collect-routing-metrics.js markdown  # Detailed report
node collect-routing-metrics.js analyze   # Combined analysis
```

**Sample Summary Output:**
```
╔══════════════════════════════════════════════════════════════════╗
║            ROUTING EFFICIENCY MONITORING REPORT                  ║
╚══════════════════════════════════════════════════════════════════╝

📊 SUMMARY
────────────────────────────────────────────
  Total Skills:          16
  Total Agents:         360 ✓
  Total Orchestrators:   45
  Total Domains:         52
  Unique Keywords:      180

⚡ PERFORMANCE STATUS
────────────────────────────────────────────
  Budget Compliance:  ✓ PASS
  Avg Complexity:     0.45 (MEDIUM)
  Ambiguity Score:    0.22 (MEDIUM)
  Keyword Uniqueness: 78.5%
```

### `analyze-routing-patterns.js`

Deep analysis of routing patterns and optimization opportunities.

```bash
node analyze-routing-patterns.js          # Full analysis
node analyze-routing-patterns.js paths    # Path analysis only
node analyze-routing-patterns.js coverage # Coverage analysis
node analyze-routing-patterns.js ambiguity # Ambiguity hotspots
node analyze-routing-patterns.js optimize # Optimization suggestions
```

## Metrics Explained

### Complexity Score (0-1)

Measures how complex routing decisions are for a skill:

- **Low (< 0.3)**: Simple, direct routing
- **Medium (0.3-0.6)**: Moderate complexity
- **High (0.6-0.8)**: May cause routing overhead
- **Critical (> 0.8)**: Needs optimization

### Ambiguity Score (0-1)

Measures potential for misrouting:

- **Low (< 0.1)**: Clear, unambiguous routing
- **Medium (0.1-0.3)**: Some overlap exists
- **High (0.3-0.5)**: Significant overlap risk
- **Critical (> 0.5)**: High misrouting probability

### Branching Factor

Number of possible routes from a decision point:

- Orchestrators with > 20 branches are **critical** hotspots
- Orchestrators with > 10 branches are **high** severity
- Orchestrators with > 5 branches are **medium** severity

## CI Integration

Add to your CI pipeline:

```yaml
# .github/workflows/routing-check.yml
name: Routing Efficiency Check

on: [push, pull_request]

jobs:
  routing-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Check Routing Efficiency
        run: |
          cd .claude/monitoring/routing
          METRICS=$(node collect-routing-metrics.js json)

          # Check budget compliance
          COMPLIANT=$(echo "$METRICS" | jq '.performanceStatus.budgetCompliance')
          if [ "$COMPLIANT" != "true" ]; then
            echo "❌ Performance budget violated!"
            echo "$METRICS" | jq '.performanceStatus.violations'
            exit 1
          fi

          # Check ambiguity score
          AMBIGUITY=$(echo "$METRICS" | jq '.performanceStatus.ambiguityScore')
          if (( $(echo "$AMBIGUITY > 0.5" | bc -l) )); then
            echo "⚠️ High ambiguity score: $AMBIGUITY"
            exit 1
          fi

          echo "✅ Routing efficiency checks passed"

      - name: Run Routing Tests
        run: |
          cd .claude/monitoring/routing
          npm test -- tests/routing-monitoring.test.js
```

## Architecture

```
.claude/monitoring/routing/
├── config.js                    # Configuration and budgets
├── collect-routing-metrics.js   # Main metrics collector
├── analyze-routing-patterns.js  # Pattern analysis
├── README.md                    # This file
├── tests/
│   └── routing-monitoring.test.js
└── reports/                     # Generated reports (git-ignored)
```

## Troubleshooting

### High Ambiguity Score

1. Check keyword overlaps: `node collect-routing-metrics.js json | jq '.keywordAnalysis.overlap'`
2. Add disambiguating keywords to skills with overlap
3. Consider splitting overlapping functionality into separate skills

### Budget Violations

1. Identify violating skills: `node collect-routing-metrics.js json | jq '.performanceStatus.violations'`
2. Split large skills into sub-skills
3. Consolidate similar agents

### Dead-End Routes

1. Run: `node analyze-routing-patterns.js paths`
2. Check `deadEnds` in output
3. Add missing routing rules or remove orphaned agents

## Recommendations

Based on current architecture with 360+ agents:

1. **Monitor regularly** - Run metrics collection in CI
2. **Watch branching factors** - Keep orchestrator branches < 10
3. **Maintain keyword uniqueness** - Target > 80% unique keywords
4. **Keep routing depth shallow** - Max 3 levels (skill → domain → agent)
5. **Address overlaps proactively** - Fix high-severity overlaps immediately
