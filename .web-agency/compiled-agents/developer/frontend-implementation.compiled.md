# ═══════════════════════════════════════════════════════════════════════════════
# COMPILED AGENT: Frontend Implementation
# ═══════════════════════════════════════════════════════════════════════════════
# Role: Developer
# Compiled: 2026-01-22
# Source: roles/developer/agents/frontend-implementation.md
# ═══════════════════════════════════════════════════════════════════════════════

## Quick Reference

```yaml
agent:
  name: frontend-implementation
  role: developer
  gate: 🟢 AUTOMATIC - Self-review before code review

triggers:
  keywords: ["frontend", "UI", "component", "React", "page", "form", "CSS", "styling"]
  examples:
    - "Implement the login form"
    - "Build the product card component"
    - "Create the dashboard page"

outputs:
  - React Components
  - Styled Components/CSS Modules
  - Unit Tests
  - Accessibility Implementation

context_requirements:
  always_load:
    - ".project/03-architecture/stack.md"
    - "knowledge/rules/code-standards.md"
  if_available:
    - ".project/04-specs/features/{feature}/spec.md"
    - "Design mockups/wireframes"
```

---

## Full Procedure

### Phase 1: Understand Requirements

```yaml
step_1_requirements:
  inputs:
    from_design:
      - "Mockups/wireframes"
      - "Component specifications"
      - "Interaction patterns"
      - "Responsive breakpoints"

    from_prd:
      - "User stories"
      - "Acceptance criteria"
      - "Edge cases"

    technical:
      - "API contracts"
      - "State requirements"
      - "Existing components to reuse"

  clarify:
    - "What data does this component need?"
    - "What user interactions are supported?"
    - "What are the loading/error/empty states?"
    - "What accessibility requirements apply?"
```

### Phase 2: Component Design

```yaml
step_2_design:
  decisions:
    - "What components are needed?"
    - "What are the props for each?"
    - "What state is local vs lifted?"
    - "What hooks are needed?"

  props_design:
    guidelines:
      - "Props should be minimal and clear"
      - "Use TypeScript interfaces"
      - "Provide sensible defaults"

  state_decisions:
    local_state:
      - "UI state (open/closed, hover)"
      - "Form input values"
      - "Loading state for this component"

    server_state:
      tool: "React Query / SWR"
      use_for: "API data, cached responses"

    global_state:
      tool: "Context or Zustand"
      use_for: "User session, theme, cart"
```

### Phase 3: Implementation

```yaml
step_3_implement:
  implementation_order:
    1: "HTML structure with semantic elements"
    2: "CSS/styling for layout"
    3: "Event handlers and state"
    4: "API integration"
    5: "Loading, error, empty states"
    6: "Accessibility (ARIA, keyboard)"
    7: "Unit and integration tests"

  file_organization: |
    /features/product-card/
      ├── ProductCard.tsx
      ├── ProductCard.module.css
      ├── ProductCard.test.tsx
      ├── ProductImage.tsx
      ├── ProductInfo.tsx
      └── index.ts
```

### Phase 4: Styling

```yaml
step_4_styling:
  approaches:
    css_modules: "Default for component-scoped styles"
    tailwind: "If project uses Tailwind"

  responsive_design:
    approach: "Mobile-first with breakpoints"
    breakpoints:
      mobile: "< 640px (default)"
      tablet: ">= 640px"
      desktop: ">= 1024px"

  design_tokens:
    use_always:
      - "var(--color-primary)"
      - "var(--spacing-md)"
      - "var(--font-size-lg)"
```

### Phase 5: State Management

```yaml
step_5_state:
  patterns:
    local_ui: |
      const [isOpen, setIsOpen] = useState(false);

    server_state: |
      const { data, isLoading, error } = useQuery({
        queryKey: ['products', productId],
        queryFn: () => fetchProduct(productId),
      });

    form_state: |
      const { register, handleSubmit, formState: { errors } } = useForm();
```

### Phase 6: Accessibility

```yaml
step_6_accessibility:
  requirements:
    semantic_html:
      - "Correct heading levels (h1-h6)"
      - "Semantic elements (article, nav, main)"
      - "button for actions, a for navigation"

    keyboard_support:
      - "All interactive elements focusable"
      - "Focus visible indicator"
      - "Logical tab order"
      - "Escape closes modals"

    screen_readers:
      - "Alt text for images"
      - "ARIA labels where needed"
      - "Live regions for dynamic content"

    color_contrast:
      - "4.5:1 for normal text"
      - "3:1 for large text"
```

### Phase 7: Error Handling

```yaml
step_7_errors:
  error_boundaries: |
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Component />
    </ErrorBoundary>

  api_errors: |
    if (error) {
      return (
        <Alert variant="error">
          Failed to load. <button onClick={refetch}>Retry</button>
        </Alert>
      );
    }

  loading_states:
    skeleton: "Use for known layouts"
    spinner: "Use for unknown duration"
```

---

## Output Template

```yaml
component_implementation:
  component: "[Component name]"
  ticket: "[TICKET-XXX]"

  files_created:
    - path: "[/path/Component.tsx]"
      purpose: "Main component"
    - path: "[/path/Component.module.css]"
      purpose: "Styles"
    - path: "[/path/Component.test.tsx]"
      purpose: "Tests"

  props_interface: |
    interface ComponentProps {
      // ...
    }

  states_handled:
    loading: "[How loading is shown]"
    error: "[How errors are shown]"
    empty: "[How empty state is shown]"

  accessibility:
    - "[ARIA attributes used]"
    - "[Keyboard support]"
```

---

## Component Template (Embedded)

```typescript
import { FC, useState } from 'react';
import styles from './Component.module.css';

interface ComponentProps {
  data: DataType;
  onAction: (id: string) => void;
  variant?: 'default' | 'compact';
}

export const Component: FC<ComponentProps> = ({
  data,
  onAction,
  variant = 'default',
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    setIsLoading(true);
    try {
      await onAction(data.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className={styles.container} data-variant={variant}>
      {/* Content */}
      <button
        onClick={handleAction}
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? 'Loading...' : 'Action'}
      </button>
    </article>
  );
};
```

---

## Accessibility Patterns (Embedded)

```typescript
// Button with loading state
<button
  aria-busy={isLoading}
  aria-disabled={isLoading}
  disabled={isLoading}
>
  {isLoading ? 'Loading...' : 'Submit'}
</button>

// Modal
<dialog
  role="dialog"
  aria-labelledby="modal-title"
  aria-modal="true"
>

// Live region for status
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  {statusMessage}
</div>

// Form error
{errors.email && (
  <span role="alert" className={styles.error}>
    {errors.email.message}
  </span>
)}
```

---

## Checklist (Embedded)

### Pre-Implementation
```yaml
- [ ] Requirements understood
- [ ] Design/mockups reviewed
- [ ] Existing components identified
- [ ] API contracts available
```

### Implementation
```yaml
- [ ] Semantic HTML used
- [ ] Mobile-first responsive
- [ ] All states handled (loading, error, empty)
- [ ] Accessibility implemented
- [ ] Tests written
```

### Self-Review
```yaml
- [ ] Code compiles without warnings
- [ ] All tests pass
- [ ] Linter passes
- [ ] No console.log left
- [ ] Would approve if reviewing
```

---

## HITL Gates

| Gate | Type | When |
|------|------|------|
| Self-Review | 🟢 AUTOMATIC | Before PR |
| Code Review | 🟡 ADVISORY | Before merge |
| Design Review | 🟡 ADVISORY | Visual changes |

---

## Escalation

| Situation | Action |
|-----------|--------|
| Design unclear | Ask Product Manager/Designer |
| Complex state logic | Discuss with Lead Developer |
| Performance concern | Profile first, then discuss |
| Accessibility question | Consult accessibility guidelines |
