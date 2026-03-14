# Accessibility (a11y) Reference

## WCAG 2.1 Conformance Levels

| Level | Requirement | Coverage |
|-------|-------------|----------|
| A | Minimum baseline | Basic access |
| AA | Standard (required by law in EU/FR) | Good access |
| AAA | Enhanced | Optimal access |

**Target: WCAG 2.1 AA minimum for all projects.**

## The 4 Principles (POUR)

| Principle | Description | Key Criteria |
|-----------|-------------|--------------|
| Perceivable | Content visible/audible | Alt text, captions, contrast |
| Operable | Usable with keyboard/AT | Tab order, focus, timing |
| Understandable | Content is clear | Language, labels, errors |
| Robust | Works with assistive tech | Valid HTML, ARIA |

## Color Contrast Requirements

| Context | AA Ratio | AAA Ratio |
|---------|----------|-----------|
| Normal text (< 18px) | 4.5:1 | 7:1 |
| Large text (>= 18px bold / 24px) | 3:1 | 4.5:1 |
| UI components / graphics | 3:1 | - |
| Non-text elements | 3:1 | - |

## Keyboard Navigation

### Required behaviors
- All interactive elements focusable with Tab
- Logical tab order (follows visual order)
- Visible focus indicator (min 2px outline)
- Escape closes modals/popups
- Arrow keys for widget navigation (tabs, menus)
- Enter/Space activates buttons and links

### Focus Management
```html
<!-- Skip link (first element in body) -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Focus trap for modals -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Dialog Title</h2>
  <!-- Focusable content -->
  <button>Close</button>
</div>
```

## ARIA Essentials

### Landmark Roles
```html
<header role="banner">
<nav role="navigation" aria-label="Main">
<main role="main">
<aside role="complementary">
<footer role="contentinfo">
```

### Common Patterns
```html
<!-- Accordion -->
<button aria-expanded="false" aria-controls="panel-1">Section 1</button>
<div id="panel-1" role="region" aria-labelledby="btn-1" hidden>Content</div>

<!-- Tab Panel -->
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="tab-1">Tab 1</button>
  <button role="tab" aria-selected="false" aria-controls="tab-2">Tab 2</button>
</div>
<div id="tab-1" role="tabpanel">Content 1</div>
<div id="tab-2" role="tabpanel" hidden>Content 2</div>

<!-- Alert / Live Region -->
<div role="alert" aria-live="assertive">Error message here</div>
<div aria-live="polite">Status update here</div>
```

## Image Accessibility

| Image Type | Alt Text | Example |
|------------|----------|---------|
| Informative | Describe content | `alt="Red car parked in front of office"` |
| Decorative | Empty alt | `alt=""` |
| Functional | Describe action | `alt="Search"` (on search icon button) |
| Complex | Brief alt + long description | `alt="Q3 sales chart" + <figcaption>` |

## Forms Accessibility

```html
<!-- Always associate labels -->
<label for="email">Email address</label>
<input id="email" type="email" required aria-describedby="email-help email-error">
<span id="email-help">We'll never share your email.</span>
<span id="email-error" role="alert" hidden>Please enter a valid email.</span>

<!-- Group related fields -->
<fieldset>
  <legend>Shipping Address</legend>
  <!-- fields -->
</fieldset>
```

## Testing Checklist

### Automated
- [ ] axe-core / Lighthouse accessibility audit
- [ ] Color contrast checker (all text)
- [ ] HTML validation (W3C)

### Manual
- [ ] Full keyboard navigation test
- [ ] Screen reader test (VoiceOver / NVDA)
- [ ] Zoom 200% - no horizontal scroll
- [ ] Reduced motion preference respected
- [ ] Focus visible on all interactive elements
- [ ] Error messages announced to screen readers
- [ ] Skip navigation link works

### Design Review
- [ ] Contrast ratios meet AA minimum
- [ ] Touch targets >= 44x44px on mobile
- [ ] Information not conveyed by color alone
- [ ] Focus indicator visible (min 2px)
- [ ] Text resizable up to 200% without loss
- [ ] Animations respect `prefers-reduced-motion`
