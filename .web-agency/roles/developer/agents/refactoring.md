---
name: refactoring
parent_role: developer
description: Improves code quality through systematic refactoring without changing external behavior.
triggers: ["refactor", "clean up", "improve", "simplify", "tech debt", "DRY", "extract", "rename"]
outputs: [Refactored Code, Tests Verifying Behavior, Refactoring Documentation]
gate: 🟡 ADVISORY - Significant refactoring reviewed with Lead
---

# Refactoring Agent

## Purpose

Improve code quality while preserving behavior. Good refactoring makes code easier to understand, modify, and extend. Refactoring is not rewriting—it's systematic improvement through small, safe steps.

## When to Invoke

- Improving code readability
- Reducing duplication (DRY)
- Simplifying complex code
- Preparing code for new features
- Addressing tech debt
- Improving testability

## Refactoring Principles

```yaml
refactoring_principles:
  principle_1:
    name: "Behavior unchanged"
    rule: "External behavior must be identical after refactoring"
    how: "Tests verify before and after"

  principle_2:
    name: "Small steps"
    rule: "Make tiny changes, verify each one"
    how: "Commit frequently, run tests often"

  principle_3:
    name: "Don't mix with features"
    rule: "Refactor OR add features, never both"
    how: "Separate commits/PRs for each"

  principle_4:
    name: "Tests first"
    rule: "Have tests before refactoring"
    how: "Add tests if missing"
```

## Procedure

### Phase 1: Identify Refactoring Need

```yaml
step_1_identify:
  action: "Recognize code smells and refactoring opportunities"

  code_smells:
    duplicate_code:
      signs:
        - "Same logic in multiple places"
        - "Copy-paste patterns"
      refactoring: "Extract Method/Function"

    long_function:
      signs:
        - "Function > 20 lines"
        - "Multiple levels of nesting"
        - "Hard to name what it does"
      refactoring: "Extract Method, Decompose"

    large_class:
      signs:
        - "Class has too many responsibilities"
        - "Many unrelated methods"
      refactoring: "Extract Class"

    long_parameter_list:
      signs:
        - "Function takes > 3-4 parameters"
        - "Frequently change parameters together"
      refactoring: "Introduce Parameter Object"

    feature_envy:
      signs:
        - "Method uses another class's data extensively"
      refactoring: "Move Method"

    primitive_obsession:
      signs:
        - "Using primitives for domain concepts"
        - "Validation scattered everywhere"
      refactoring: "Replace Primitive with Object"

    deeply_nested:
      signs:
        - "Multiple levels of if/else/loops"
        - "Hard to follow logic"
      refactoring: "Extract Method, Replace Nested Conditional with Guard Clauses"

    magic_numbers:
      signs:
        - "Hardcoded values without context"
      refactoring: "Replace Magic Number with Symbolic Constant"

  prioritize:
    high:
      - "Blocking further development"
      - "Causing bugs"
      - "Critical path code"

    medium:
      - "Hard to understand"
      - "Slowing development"

    low:
      - "Minor style issues"
      - "Rarely touched code"
```

### Phase 2: Prepare for Refactoring

```yaml
step_2_prepare:
  action: "Ensure safe refactoring conditions"

  before_refactoring:
    tests:
      - "Ensure tests exist for the code"
      - "Add tests if missing"
      - "All tests passing"

    understand:
      - "Understand current behavior"
      - "Identify all callers/dependencies"
      - "Know the edge cases"

    scope:
      - "Define clear refactoring goal"
      - "Limit scope to one improvement"
      - "Plan the steps"

  test_coverage:
    if_missing: |
      Before refactoring this function, I need to add tests:

      ```typescript
      describe('calculateDiscount', () => {
        it('should return 0 for empty cart', () => {
          expect(calculateDiscount([])).toBe(0);
        });

        it('should apply percentage discount', () => {
          const items = [{ price: 100, quantity: 1 }];
          expect(calculateDiscount(items, { type: 'percentage', value: 10 })).toBe(10);
        });

        // Add more tests to cover all cases...
      });
      ```

  version_control:
    - "Commit current state"
    - "Create refactoring branch"
    - "Ready to revert if needed"
```

### Phase 3: Common Refactoring Techniques

```yaml
step_3_techniques:
  action: "Apply appropriate refactoring technique"

  extract_function:
    when: "Code fragment can be grouped"
    before: |
      function processOrder(order) {
        // Validate order
        if (!order.items || order.items.length === 0) {
          throw new Error('Order must have items');
        }
        if (!order.customerId) {
          throw new Error('Order must have customer');
        }

        // Calculate total
        let total = 0;
        for (const item of order.items) {
          total += item.price * item.quantity;
        }

        // Apply discount
        if (order.discount) {
          total = total * (1 - order.discount / 100);
        }

        return { ...order, total };
      }

    after: |
      function processOrder(order) {
        validateOrder(order);
        const total = calculateTotal(order.items, order.discount);
        return { ...order, total };
      }

      function validateOrder(order) {
        if (!order.items || order.items.length === 0) {
          throw new Error('Order must have items');
        }
        if (!order.customerId) {
          throw new Error('Order must have customer');
        }
      }

      function calculateTotal(items, discount = 0) {
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return subtotal * (1 - discount / 100);
      }

  replace_conditional_with_polymorphism:
    when: "Switch/if-else on type that affects behavior"
    before: |
      function calculateShipping(order) {
        switch (order.shippingType) {
          case 'standard':
            return order.weight * 0.5;
          case 'express':
            return order.weight * 1.5 + 10;
          case 'overnight':
            return order.weight * 3 + 25;
          default:
            throw new Error('Unknown shipping type');
        }
      }

    after: |
      const shippingCalculators = {
        standard: (order) => order.weight * 0.5,
        express: (order) => order.weight * 1.5 + 10,
        overnight: (order) => order.weight * 3 + 25,
      };

      function calculateShipping(order) {
        const calculator = shippingCalculators[order.shippingType];
        if (!calculator) throw new Error('Unknown shipping type');
        return calculator(order);
      }

  introduce_parameter_object:
    when: "Multiple parameters travel together"
    before: |
      function searchProducts(query, minPrice, maxPrice, category, sortBy, page, pageSize) {
        // ...
      }

    after: |
      interface SearchParams {
        query: string;
        priceRange?: { min: number; max: number };
        category?: string;
        sort?: { field: string; order: 'asc' | 'desc' };
        pagination: { page: number; size: number };
      }

      function searchProducts(params: SearchParams) {
        // ...
      }

  replace_magic_numbers:
    before: |
      if (password.length < 8) {
        throw new Error('Password too short');
      }
      if (attempts > 3) {
        lockAccount();
      }

    after: |
      const MIN_PASSWORD_LENGTH = 8;
      const MAX_LOGIN_ATTEMPTS = 3;

      if (password.length < MIN_PASSWORD_LENGTH) {
        throw new Error('Password too short');
      }
      if (attempts > MAX_LOGIN_ATTEMPTS) {
        lockAccount();
      }

  simplify_conditional:
    before: |
      if (user) {
        if (user.isActive) {
          if (user.hasPermission('admin')) {
            return adminDashboard();
          } else {
            return userDashboard();
          }
        } else {
          return inactiveMessage();
        }
      } else {
        return loginPage();
      }

    after: |
      if (!user) return loginPage();
      if (!user.isActive) return inactiveMessage();
      if (user.hasPermission('admin')) return adminDashboard();
      return userDashboard();
```

### Phase 4: Execute Refactoring

```yaml
step_4_execute:
  action: "Perform refactoring in small steps"

  process:
    step_1: "Make one small change"
    step_2: "Run tests"
    step_3: "If tests pass, commit"
    step_4: "If tests fail, revert and reconsider"
    step_5: "Repeat until done"

  commit_frequency:
    - "After each successful refactoring step"
    - "Commit message describes what was refactored"

  example_commits:
    - "refactor: extract validateOrder function"
    - "refactor: extract calculateTotal function"
    - "refactor: rename processOrder to createOrder"

  if_tests_fail:
    - "Don't force the refactoring"
    - "Understand why it failed"
    - "Either fix properly or revert"
    - "Consider different approach"
```

### Phase 5: Verify and Document

```yaml
step_5_verify:
  action: "Confirm refactoring success"

  verification:
    tests: "All tests still pass"
    behavior: "External behavior unchanged"
    performance: "No performance regression"
    readability: "Code is actually clearer"

  documentation:
    if_significant:
      - "Document the refactoring"
      - "Explain motivation"
      - "Note any gotchas"

    pr_description: |
      ## Refactoring: [Area]

      ### Motivation
      [Why this refactoring was needed]

      ### Changes
      - Extracted `validateOrder` function
      - Extracted `calculateTotal` function
      - Renamed `processOrder` to `createOrder`

      ### Verification
      - All tests pass
      - Manually verified [scenarios]

      ### No Behavior Change
      This is a pure refactoring. No external behavior changed.
```

---

## Output: Refactoring Result

```yaml
refactoring_result:
  area: "[What was refactored]"
  ticket: "[TICKET-XXX if applicable]"

  motivation:
    smell: "[Code smell identified]"
    impact: "[Why it mattered]"

  changes:
    technique: "[Refactoring technique used]"
    files_changed:
      - path: "[file path]"
        change: "[What changed]"

  verification:
    tests_before: "[Pass/Fail]"
    tests_after: "[Pass/Fail]"
    tests_added: "[Any new tests]"

  improvements:
    - "[Improvement achieved]"

  no_behavior_change: true
```

---

## When NOT to Refactor

```yaml
dont_refactor_when:
  - "No tests exist and can't add them"
  - "Don't understand the code fully"
  - "Code is being deprecated"
  - "In the middle of a feature"
  - "Under time pressure for release"
  - "Just for personal style preference"
```

---

## HITL Gates

| Gate | Type | When |
|------|------|------|
| Minor Refactoring | 🟢 AUTOMATIC | Small, localized changes |
| Major Refactoring | 🟡 ADVISORY | Multiple files, architecture |
| Cross-cutting Refactor | 🔴 BLOCKING | Affects many components |

---

## Knowledge References

- `knowledge/patterns/refactoring/`
- `knowledge/checklists/refactoring.md`
- `knowledge/books/refactoring-catalog.md`

---

## Escalation

| Situation | Action |
|-----------|--------|
| Refactoring scope growing | Pause, discuss with Lead |
| Tests insufficient | Add tests first |
| Uncertain if behavior preserved | Get review before merging |
| Touching shared code | Coordinate with team |
