# Pattern: Campaign Launch

> Checklist and process for launching marketing campaigns successfully.

## Context

Launching campaigns involves multiple moving parts. Missing a step can result in wasted budget, poor tracking, or embarrassing errors. This pattern ensures consistent, error-free launches.

## Pattern

### Pre-Launch Checklist (T-24h)

```yaml
tracking:
  - "[ ] UTM parameters configured and tested"
  - "[ ] Conversion tracking verified (test conversion)"
  - "[ ] Analytics goals/events firing correctly"
  - "[ ] Attribution window settings confirmed"
  - "[ ] Dashboard/reporting set up"

creative:
  - "[ ] All creative assets approved"
  - "[ ] Assets uploaded to all platforms"
  - "[ ] Copy proofread (no typos, correct offers)"
  - "[ ] Legal disclaimers present if required"
  - "[ ] Mobile preview checked"

landing_pages:
  - "[ ] Landing pages live and accessible"
  - "[ ] Page load time acceptable (<3s)"
  - "[ ] Forms working correctly"
  - "[ ] Thank you page/email configured"
  - "[ ] Mobile experience tested"

campaigns:
  - "[ ] Campaign structure correct"
  - "[ ] Targeting configured accurately"
  - "[ ] Budgets and bids set correctly"
  - "[ ] Ad scheduling configured"
  - "[ ] Negative keywords/exclusions added"
  - "[ ] Ads set to paused (ready to enable)"

team:
  - "[ ] Team notified of launch time"
  - "[ ] Escalation contacts confirmed"
  - "[ ] First-day monitoring assigned"
```

### Launch Day Protocol

```yaml
morning:
  time: "09:00"
  actions:
    - "Enable all campaigns"
    - "Verify ads serving (check impressions)"
    - "Confirm tracking firing"
    - "Check initial metrics"

midday:
  time: "13:00"
  actions:
    - "Review early performance"
    - "Check spend pacing"
    - "Address any issues"
    - "Verify data in analytics"

end_of_day:
  time: "18:00"
  actions:
    - "Performance summary"
    - "Identify any concerns"
    - "Plan next-day actions"
    - "Send stakeholder update"
```

### First Week Monitoring

```yaml
daily_checks:
  - "Spend vs budget pacing"
  - "Key metrics vs targets"
  - "Any anomalies or issues"
  - "Creative performance"

weekly_review:
  - "Full performance analysis"
  - "Initial optimization decisions"
  - "Learning documentation"
```

## Anti-Patterns

| Anti-Pattern | Why It's Bad | Better Approach |
|--------------|--------------|-----------------|
| Launch Friday afternoon | No one monitors weekend | Launch Mon-Wed |
| Skip tracking verification | Waste budget, no data | Always test first |
| Launch everything at once | Hard to debug issues | Stagger if possible |
| No pre-launch checklist | Miss critical steps | Use this pattern |

## Related Patterns

- `campaign-optimization.md` - Post-launch optimization
- `creative-testing.md` - A/B testing creative

## References

- `workflows/marketing-campaign.md` - Full campaign workflow
- `contexts/ads.md` - Platform specifics
