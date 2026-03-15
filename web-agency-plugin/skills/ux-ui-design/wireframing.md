# Wireframing & Information Architecture Reference

## Fidelity Levels

| Level | Purpose | Detail | Tools |
|-------|---------|--------|-------|
| Low-Fi | Rapid exploration | Blocks, flows | Paper, Whimsical |
| Mid-Fi | Structure validation | Basic components | Figma, Balsamiq |
| Hi-Fi | Developer handoff | Detailed components | Figma, Sketch |

## Wireframe Checklist (per page)

- [ ] Header / Navigation
- [ ] Hero / Above the fold content
- [ ] Main content area
- [ ] Sidebar (if applicable)
- [ ] Footer
- [ ] Empty states
- [ ] Error states
- [ ] Loading states
- [ ] Responsive breakpoints (mobile, tablet, desktop)
- [ ] Interactive behavior annotations
- [ ] Content priority order

## Sitemap Design

```
Homepage
|
+-- About
|   +-- Team
|   +-- Values
|
+-- Services
|   +-- Service A
|   +-- Service B
|   +-- Service C
|
+-- Blog
|   +-- Category 1
|   |   +-- Article
|   +-- Category 2
|
+-- Contact
|
+-- Legal
    +-- Privacy Policy
    +-- Terms of Service
```

### Sitemap Rules
- Max 3 levels of depth
- Clear naming convention
- Group by user mental model (not business structure)
- Include utility pages (404, search results, login)

## Zoning Template

```
+--------------------------------------------------+
|  HEADER: Logo | Navigation | CTA | Search        |
+--------------------------------------------------+
|                                                    |
|  HERO: Headline + Subheadline + CTA               |
|  [Visual / Image / Video]                          |
|                                                    |
+--------------------------------------------------+
|                                                    |
|  SECTION 1: Value Proposition                      |
|  [3 columns: Feature | Feature | Feature]          |
|                                                    |
+--------------------------------------------------+
|                                                    |
|  SECTION 2: Social Proof                           |
|  [Testimonials / Logos / Stats]                     |
|                                                    |
+--------------------------------------------------+
|                                                    |
|  SECTION 3: CTA Block                              |
|  [Headline + Form or Button]                       |
|                                                    |
+--------------------------------------------------+
|  FOOTER: Links | Social | Legal | Newsletter      |
+--------------------------------------------------+
```

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile S | 320px | Single column |
| Mobile L | 375px | Single column |
| Tablet | 768px | 2 columns |
| Desktop | 1024px | Full layout |
| Desktop L | 1440px | Max-width container |

## Component States

Every interactive component must have:

| State | Description |
|-------|-------------|
| Default | Normal resting state |
| Hover | Mouse over (desktop) |
| Focus | Keyboard focus (a11y) |
| Active | Being clicked/pressed |
| Disabled | Not interactive |
| Loading | Async operation |
| Error | Validation failed |
| Success | Action completed |
| Empty | No data available |

## User Flow Documentation

```
[Entry Point] --> [Step 1] --> [Decision]
                                  |
                          +-------+-------+
                          |               |
                     [Path A]        [Path B]
                          |               |
                     [Result A]      [Result B]
```

### Flow Annotation Format
```
Step: [Action name]
Screen: [Screen reference]
Trigger: [What initiates this step]
Outcome: [What happens after]
Error: [What if it fails]
```

## Handoff Specifications

| Specification | Detail |
|---------------|--------|
| Spacing | Exact px/rem values |
| Typography | Font family, size, weight, line-height |
| Colors | HEX/RGB values with semantic names |
| Interactions | Trigger, animation, duration, easing |
| Responsive | Behavior at each breakpoint |
| Content | Min/max character counts |
