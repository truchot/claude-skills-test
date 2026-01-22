# ═══════════════════════════════════════════════════════════════════════════════
# COMPILED AGENT: Testing
# ═══════════════════════════════════════════════════════════════════════════════
# Role: Developer
# Compiled: 2026-01-22
# Source: roles/developer/agents/testing.md
# ═══════════════════════════════════════════════════════════════════════════════

## Quick Reference

```yaml
agent:
  name: testing
  role: developer
  gate: 🔴 BLOCKING - Tests must pass before merge

triggers:
  keywords: ["test", "unit test", "integration test", "e2e", "coverage", "TDD", "mock", "jest"]
  examples:
    - "Write tests for this feature"
    - "Add test coverage"
    - "Fix the failing test"

outputs:
  - Unit Tests
  - Integration Tests
  - Test Coverage Report
  - Test Documentation

context_requirements:
  always_load:
    - "knowledge/rules/code-standards.md"
  if_available:
    - "Source code to test"
    - "Feature specification"
```

---

## Full Procedure

### Phase 1: Test Planning

```yaml
step_1_planning:
  test_pyramid:
    unit_tests:
      proportion: "70%"
      speed: "Milliseconds"
      scope: "Single function/class"

    integration_tests:
      proportion: "20%"
      speed: "Seconds"
      scope: "Multiple components"

    e2e_tests:
      proportion: "10%"
      speed: "Minutes"
      scope: "Critical paths only"

  what_to_test:
    always:
      - "Business logic"
      - "Validation rules"
      - "Edge cases"
      - "Error handling"
      - "API contracts"

    rarely:
      - "Framework code"
      - "Simple getters/setters"
```

### Phase 2: Unit Testing

```yaml
step_2_unit_tests:
  structure:
    describe: "Group by function/class"
    it: "One assertion per test (usually)"
    pattern: "Arrange-Act-Assert"

  naming:
    format: "should [expected behavior] when [condition]"
    examples:
      good:
        - "should return user when found"
        - "should throw NotFoundError when user doesn't exist"
      bad:
        - "test1"
        - "works correctly"
```

### Phase 3: Mocking

```yaml
step_3_mocking:
  when_to_mock:
    always:
      - "External APIs"
      - "Database in unit tests"
      - "File system"
      - "Time/dates"

    avoid:
      - "Over-mocking (test becomes meaningless)"
      - "Mocking what you're testing"
```

### Phase 4: Integration Testing

```yaml
step_4_integration:
  api_testing:
    setup: "Use test database, reset between tests"
    pattern: |
      describe('POST /api/orders', () => {
        beforeEach(async () => {
          await db.clear();
          await db.seed();
        });

        it('should create order for authenticated user', async () => {
          // Test implementation
        });
      });
```

### Phase 5: Coverage

```yaml
step_5_coverage:
  targets:
    minimum: "80% overall"
    critical_paths: "100%"
    new_code: "90%+"

  commands:
    jest: "jest --coverage"
    pytest: "pytest --cov=app"
```

---

## Output Template

```yaml
test_implementation:
  feature: "[Feature being tested]"
  ticket: "[TICKET-XXX]"

  test_files:
    - path: "[/path/to/test.ts]"
      type: "unit"
      tests_count: "[N]"

  coverage:
    before: "[X%]"
    after: "[Y%]"
    delta: "[+Z%]"

  test_scenarios:
    - "Happy path: [description]"
    - "Edge case: [description]"
    - "Error case: [description]"
```

---

## Test Templates (Embedded)

### Unit Test Template
```typescript
describe('OrderService', () => {
  describe('calculateTotal', () => {
    it('should sum item prices correctly', () => {
      // Arrange
      const items = [
        { productId: '1', price: 10, quantity: 2 },
        { productId: '2', price: 15, quantity: 1 },
      ];

      // Act
      const total = orderService.calculateTotal(items);

      // Assert
      expect(total).toBe(35);
    });

    it('should apply discount when applicable', () => {
      const items = [{ productId: '1', price: 100, quantity: 1 }];
      const discount = { type: 'percentage', value: 10 };

      const total = orderService.calculateTotal(items, discount);

      expect(total).toBe(90);
    });

    it('should throw error for empty items', () => {
      expect(() => orderService.calculateTotal([]))
        .toThrow('Items cannot be empty');
    });
  });
});
```

### Integration Test Template
```typescript
describe('POST /api/orders', () => {
  beforeEach(async () => {
    await db.clear();
    await db.seed();
  });

  it('should create order for authenticated user', async () => {
    const user = await createTestUser();
    const token = generateToken(user);

    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ items: [{ productId: 'prod-1', quantity: 2 }] });

    expect(response.status).toBe(201);
    expect(response.body.data).toMatchObject({
      userId: user.id,
      status: 'pending',
    });
  });

  it('should return 401 for unauthenticated request', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({ items: [] });

    expect(response.status).toBe(401);
  });
});
```

### Mock Patterns
```typescript
// Function mock
const mockFn = jest.fn().mockReturnValue('result');
const mockAsyncFn = jest.fn().mockResolvedValue('result');

// Module mock
jest.mock('../services/email.service', () => ({
  sendEmail: jest.fn().mockResolvedValue(true),
}));

// Class mock
const mockRepository = {
  findById: jest.fn().mockResolvedValue({ id: '1', name: 'Test' }),
  create: jest.fn().mockResolvedValue({ id: '2', name: 'New' }),
};

// Spy
const spy = jest.spyOn(service, 'validateOrder');
await service.createOrder(data);
expect(spy).toHaveBeenCalledWith(data);
```

### Test Data Factory
```typescript
const createUser = (overrides = {}) => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  createdAt: new Date(),
  ...overrides,
});

const createOrder = (overrides = {}) => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  status: 'pending',
  total: 0,
  items: [],
  ...overrides,
});
```

### Common Patterns
```typescript
// Async testing
it('should handle async operation', async () => {
  const result = await service.asyncMethod();
  expect(result).toBe(expected);
});

// Error testing
it('should throw error for invalid input', async () => {
  await expect(service.method(invalid)).rejects.toThrow(ValidationError);
});

// Parameterized tests
it.each([
  [1, 2, 3],
  [0, 0, 0],
  [-1, 1, 0],
])('should add %i + %i = %i', (a, b, expected) => {
  expect(add(a, b)).toBe(expected);
});
```

---

## Checklist (Embedded)

### Test Planning
```yaml
- [ ] Identify what needs testing
- [ ] Prioritize by risk/importance
- [ ] Choose test type (unit/integration/e2e)
```

### Test Implementation
```yaml
- [ ] Tests follow naming convention
- [ ] Tests are independent
- [ ] Tests are fast
- [ ] Mocks are appropriate
- [ ] Edge cases covered
- [ ] Error cases covered
```

### Quality Check
```yaml
- [ ] All tests pass
- [ ] No flaky tests
- [ ] Coverage targets met
- [ ] No skipped tests left
```

---

## HITL Gates

| Gate | Type | When |
|------|------|------|
| Tests Pass | 🔴 BLOCKING | Before merge |
| Coverage Check | 🟡 ADVISORY | New code |
| Test Review | 🟡 ADVISORY | Part of code review |

---

## Escalation

| Situation | Action |
|-----------|--------|
| Hard to test code | Discuss refactoring with Lead |
| Flaky test | Fix immediately, don't skip |
| Low coverage | Prioritize with Lead |
| Test infrastructure issue | Report to DevOps |
