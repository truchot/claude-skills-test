---
name: testing
parent_role: developer
description: Writes and maintains unit tests, integration tests, and ensures adequate test coverage for all code.
triggers: ["test", "unit test", "integration test", "e2e", "coverage", "TDD", "mock", "jest", "pytest"]
outputs: [Unit Tests, Integration Tests, Test Coverage Report, Test Documentation]
gate: 🟢 AUTOMATIC - Tests must pass before PR
---

# Testing Agent

## Purpose

Write tests that give confidence in the code. Good tests catch bugs before production, document expected behavior, and enable safe refactoring. Tests are first-class code.

## When to Invoke

- Writing tests for new features
- Adding tests to existing code
- Fixing failing tests
- Improving test coverage
- Setting up test infrastructure

## Testing Principles

```yaml
testing_principles:
  principle_1:
    name: "Test behavior, not implementation"
    rule: "Tests should verify what, not how"
    why: "Implementation can change, behavior shouldn't"

  principle_2:
    name: "Tests are documentation"
    rule: "Test names describe expected behavior"
    why: "Readable tests explain the system"

  principle_3:
    name: "Fast and reliable"
    rule: "Tests run quickly and never flake"
    why: "Slow/flaky tests get ignored"

  principle_4:
    name: "Independent and isolated"
    rule: "Tests don't depend on each other or order"
    why: "Enables parallel execution, easy debugging"
```

## Procedure

### Phase 1: Test Planning

```yaml
step_1_planning:
  action: "Determine what to test"

  test_pyramid:
    unit_tests:
      proportion: "70%"
      speed: "Milliseconds"
      scope: "Single function/class"
      when: "All business logic"

    integration_tests:
      proportion: "20%"
      speed: "Seconds"
      scope: "Multiple components"
      when: "API endpoints, database operations"

    e2e_tests:
      proportion: "10%"
      speed: "Minutes"
      scope: "Full user flows"
      when: "Critical paths only"

  what_to_test:
    always:
      - "Business logic"
      - "Validation rules"
      - "Edge cases"
      - "Error handling"
      - "API contracts"

    usually:
      - "Data transformations"
      - "State management"
      - "Component behavior"

    sometimes:
      - "UI rendering"
      - "Third-party integrations (mock)"

    rarely:
      - "Framework code"
      - "Simple getters/setters"
      - "Configuration"
```

### Phase 2: Unit Testing

```yaml
step_2_unit_tests:
  action: "Write isolated unit tests"

  structure:
    describe: "Group tests by function/class"
    it: "One assertion per test (usually)"
    arrange_act_assert: "Clear test structure"

  test_template: |
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
          // Arrange
          const items = [{ productId: '1', price: 100, quantity: 1 }];
          const discount = { type: 'percentage', value: 10 };

          // Act
          const total = orderService.calculateTotal(items, discount);

          // Assert
          expect(total).toBe(90);
        });

        it('should throw error for empty items', () => {
          // Act & Assert
          expect(() => orderService.calculateTotal([])).toThrow('Items cannot be empty');
        });
      });
    });

  naming_conventions:
    describe: "Class/function name"
    it: "should [expected behavior] when [condition]"

    examples:
      good:
        - "should return user when found"
        - "should throw NotFoundError when user doesn't exist"
        - "should apply discount for orders over $100"
      bad:
        - "test1"
        - "works correctly"
        - "handles error"

  assertions:
    common:
      - "expect(value).toBe(expected)"
      - "expect(value).toEqual(expected)"
      - "expect(fn).toThrow(Error)"
      - "expect(array).toContain(item)"
      - "expect(value).toBeTruthy()"

    avoid:
      - "expect(true).toBe(true) // meaningless"
      - "Multiple unrelated assertions in one test"
```

### Phase 3: Mocking

```yaml
step_3_mocking:
  action: "Mock dependencies appropriately"

  when_to_mock:
    always:
      - "External APIs"
      - "Database in unit tests"
      - "File system"
      - "Time/dates"
      - "Random values"

    sometimes:
      - "Other services (if complex)"

    avoid:
      - "Over-mocking (test becomes meaningless)"
      - "Mocking what you're testing"

  mock_patterns:
    function_mock: |
      const mockFn = jest.fn().mockReturnValue('result');
      const mockAsyncFn = jest.fn().mockResolvedValue('result');

    module_mock: |
      jest.mock('../services/email.service', () => ({
        sendEmail: jest.fn().mockResolvedValue(true),
      }));

    class_mock: |
      const mockRepository = {
        findById: jest.fn().mockResolvedValue({ id: '1', name: 'Test' }),
        create: jest.fn().mockResolvedValue({ id: '2', name: 'New' }),
      };

      const service = new OrderService(mockRepository);

    spy: |
      const spy = jest.spyOn(service, 'validateOrder');
      await service.createOrder(data);
      expect(spy).toHaveBeenCalledWith(data);

  mock_verification:
    call_count: "expect(mock).toHaveBeenCalledTimes(1)"
    call_args: "expect(mock).toHaveBeenCalledWith(arg1, arg2)"
    not_called: "expect(mock).not.toHaveBeenCalled()"
```

### Phase 4: Integration Testing

```yaml
step_4_integration:
  action: "Test components working together"

  api_integration_tests: |
    describe('POST /api/orders', () => {
      beforeEach(async () => {
        await db.clear();
        await db.seed();
      });

      it('should create order for authenticated user', async () => {
        // Arrange
        const user = await createTestUser();
        const token = generateToken(user);
        const orderData = {
          items: [{ productId: 'prod-1', quantity: 2 }],
          shippingAddressId: 'addr-1',
        };

        // Act
        const response = await request(app)
          .post('/api/orders')
          .set('Authorization', `Bearer ${token}`)
          .send(orderData);

        // Assert
        expect(response.status).toBe(201);
        expect(response.body.data).toMatchObject({
          userId: user.id,
          status: 'pending',
        });

        // Verify side effects
        const order = await db.orders.findById(response.body.data.id);
        expect(order).not.toBeNull();
      });

      it('should return 401 for unauthenticated request', async () => {
        const response = await request(app)
          .post('/api/orders')
          .send({ items: [] });

        expect(response.status).toBe(401);
      });

      it('should return 400 for invalid data', async () => {
        const user = await createTestUser();
        const token = generateToken(user);

        const response = await request(app)
          .post('/api/orders')
          .set('Authorization', `Bearer ${token}`)
          .send({ items: [] }); // Empty items

        expect(response.status).toBe(400);
        expect(response.body.error.code).toBe('VALIDATION_ERROR');
      });
    });

  database_tests:
    setup: "Use test database, reset between tests"
    transactions: "Use transactions, rollback after test"
    fixtures: "Use factory functions for test data"
```

### Phase 5: Test Data

```yaml
step_5_test_data:
  action: "Create maintainable test data"

  factories:
    purpose: "Generate test objects with defaults"
    pattern: |
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
        createdAt: new Date(),
        ...overrides,
      });

  builders:
    purpose: "Fluent interface for complex objects"
    pattern: |
      class OrderBuilder {
        private order: Partial<Order> = {};

        withUser(userId: string) {
          this.order.userId = userId;
          return this;
        }

        withItem(product: Product, quantity: number) {
          this.order.items = [...(this.order.items || []), { product, quantity }];
          return this;
        }

        withStatus(status: OrderStatus) {
          this.order.status = status;
          return this;
        }

        build(): Order {
          return createOrder(this.order);
        }
      }

      // Usage
      const order = new OrderBuilder()
        .withUser('user-1')
        .withItem(product, 2)
        .withStatus('completed')
        .build();

  fixtures:
    purpose: "Predefined test scenarios"
    pattern: |
      const fixtures = {
        validOrder: createOrder({
          items: [createOrderItem({ quantity: 2 })],
        }),

        emptyOrder: createOrder({ items: [] }),

        largeOrder: createOrder({
          items: Array(100).fill(null).map(() => createOrderItem()),
        }),
      };
```

### Phase 6: Coverage and Quality

```yaml
step_6_coverage:
  action: "Ensure adequate test coverage"

  coverage_targets:
    minimum: "80% overall"
    critical_paths: "100%"
    new_code: "90%+"

  coverage_types:
    line: "Lines executed"
    branch: "If/else paths taken"
    function: "Functions called"
    statement: "Statements executed"

  coverage_commands:
    jest: "jest --coverage"
    pytest: "pytest --cov=app"

  quality_checks:
    no_skipped_tests: "Don't leave it.skip() in code"
    no_flaky_tests: "Tests must pass consistently"
    fast_tests: "Unit tests < 100ms each"
    isolated_tests: "Can run in any order"

  coverage_report: |
    ------------------------|---------|----------|---------|---------|
    File                    | % Stmts | % Branch | % Funcs | % Lines |
    ------------------------|---------|----------|---------|---------|
    services/               |   92.45 |    85.71 |   89.47 |   92.45 |
     order.service.ts       |   95.00 |    90.00 |   92.86 |   95.00 |
     user.service.ts        |   88.89 |    80.00 |   85.71 |   88.89 |
    ------------------------|---------|----------|---------|---------|
```

---

## Output: Test Implementation

```yaml
test_implementation:
  feature: "[Feature being tested]"
  ticket: "[TICKET-XXX]"

  test_files:
    - path: "[/path/to/test.ts]"
      type: "unit"
      tests_count: "[N]"

    - path: "[/path/to/test.ts]"
      type: "integration"
      tests_count: "[N]"

  coverage:
    before: "[X%]"
    after: "[Y%]"
    delta: "[+Z%]"

  test_scenarios:
    - "Happy path: [description]"
    - "Edge case: [description]"
    - "Error case: [description]"

  mocks_used:
    - "[What was mocked and why]"
```

---

## Common Test Patterns

```yaml
test_patterns:
  async_testing: |
    it('should handle async operation', async () => {
      const result = await service.asyncMethod();
      expect(result).toBe(expected);
    });

  error_testing: |
    it('should throw error for invalid input', async () => {
      await expect(service.method(invalid)).rejects.toThrow(ValidationError);
    });

  parameterized_tests: |
    it.each([
      [1, 2, 3],
      [0, 0, 0],
      [-1, 1, 0],
    ])('should add %i + %i = %i', (a, b, expected) => {
      expect(add(a, b)).toBe(expected);
    });

  snapshot_testing: |
    it('should render correctly', () => {
      const component = render(<Component />);
      expect(component).toMatchSnapshot();
    });
```

---

## HITL Gates

| Gate | Type | When |
|------|------|------|
| Tests Pass | 🔴 BLOCKING | Before merge |
| Coverage Check | 🟡 ADVISORY | New code coverage |
| Test Review | 🟡 ADVISORY | Part of code review |

---

## Knowledge References

- `knowledge/patterns/testing/`
- `knowledge/checklists/test-review.md`
- `knowledge/templates/test-template.md`

---

## Escalation

| Situation | Action |
|-----------|--------|
| Hard to test code | Discuss refactoring with Lead |
| Flaky test | Fix immediately, don't skip |
| Low coverage | Prioritize with Lead |
| Test infrastructure issue | Report to DevOps |
