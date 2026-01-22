# ===============================================================================
# COMPILED AGENT: Backend Implementation
# ===============================================================================
# Role: Developer
# Compiled: 2026-01-22
# Source: roles/developer/agents/backend-implementation.md
# ===============================================================================

## Quick Reference

```yaml
agent:
  name: backend-implementation
  role: developer
  gate: 🟢 AUTOMATIC - Self-review before code review

triggers:
  keywords: ["backend", "API", "endpoint", "service", "controller", "database", "query", "migration"]
  examples:
    - "Implement the order API"
    - "Create the user service"
    - "Add database migration"

outputs:
  - API Endpoints
  - Services
  - Database Queries
  - Migrations

context_requirements:
  always_load:
    - ".project/03-architecture/stack.md"
    - "knowledge/rules/code-standards.md"
  if_available:
    - "API contract specification"
    - "Data model documentation"
```

---

## Full Procedure

### Phase 1: Understand Requirements

```yaml
step_1_requirements:
  inputs:
    api_contract:
      - "Endpoint URL and method"
      - "Request schema"
      - "Response schema"
      - "Error responses"

    business_logic:
      - "Business rules"
      - "Validation rules"
      - "Edge cases"

    data_requirements:
      - "Data model"
      - "Queries needed"
      - "Relationships"

    non_functional:
      - "Performance requirements"
      - "Security requirements"
      - "Rate limiting"
```

### Phase 2: Architecture Design

```yaml
step_2_architecture:
  layers:
    controller:
      responsibility: "HTTP handling, request validation, response formatting"
      should_not: "Contain business logic"

    service:
      responsibility: "Business logic, orchestration"
      should_not: "Know about HTTP, SQL details"

    repository:
      responsibility: "Data access, queries"
      should_not: "Know about business rules"

    model:
      responsibility: "Data structure, validation"
      should_not: "Contain behavior"

  file_structure: |
    /features/orders/
      ├── controllers/order.controller.ts
      ├── services/order.service.ts
      ├── repositories/order.repository.ts
      ├── models/order.model.ts
      ├── validators/order.validator.ts
      └── tests/order.test.ts
```

### Phase 3: API Implementation

```yaml
step_3_api:
  rest_conventions:
    GET_collection: "GET /resources"
    GET_single: "GET /resources/:id"
    POST_create: "POST /resources"
    PUT_update: "PUT /resources/:id"
    PATCH_partial: "PATCH /resources/:id"
    DELETE: "DELETE /resources/:id"

  response_formats:
    success: |
      {
        "success": true,
        "data": { ... }
      }

    error: |
      {
        "success": false,
        "error": {
          "code": "VALIDATION_ERROR",
          "message": "Invalid input",
          "details": [...]
        }
      }

    pagination: |
      {
        "success": true,
        "data": [...],
        "pagination": {
          "page": 1,
          "pageSize": 20,
          "total": 100,
          "totalPages": 5
        }
      }
```

### Phase 4: Service Implementation

```yaml
step_4_service:
  guidelines:
    - "One service per domain concept"
    - "Methods are business operations"
    - "Handle transactions at service level"
    - "Throw typed exceptions"
    - "Don't catch errors (let controller handle)"
```

### Phase 5: Database Operations

```yaml
step_5_database:
  best_practices:
    always:
      - "Use parameterized queries (prevent SQL injection)"
      - "Use indexes for query columns"
      - "Limit result sets"
      - "Use transactions for multi-step operations"

    avoid:
      - "SELECT * in production"
      - "N+1 queries"
      - "Unbounded queries without LIMIT"

  migration_naming: "YYYYMMDDHHMMSS_description.ts"
```

### Phase 6: Error Handling

```yaml
step_6_errors:
  error_types:
    validation_error:
      status: 400
      when: "Invalid input"

    authentication_error:
      status: 401
      when: "Not logged in"

    authorization_error:
      status: 403
      when: "Not permitted"

    not_found_error:
      status: 404
      when: "Resource doesn't exist"

    business_error:
      status: 422
      when: "Business rule violation"

    internal_error:
      status: 500
      when: "Unexpected error"
```

### Phase 7: Security

```yaml
step_7_security:
  input_validation: "Validate all input with schema"
  authentication: "Middleware verifies JWT/session"
  authorization: "Check ownership and roles"
  rate_limiting: "Lower limits for auth endpoints"
  sql_injection: "Always use parameterized queries"
  logging: "Log access attempts, never log passwords/tokens"
```

---

## Output Template

```yaml
api_implementation:
  endpoint: "[METHOD /path]"
  ticket: "[TICKET-XXX]"

  files_created:
    - path: "[controller file]"
      purpose: "HTTP handling"
    - path: "[service file]"
      purpose: "Business logic"
    - path: "[repository file]"
      purpose: "Data access"
    - path: "[test file]"
      purpose: "Tests"

  api_contract:
    request: "[Request schema]"
    response: "[Response schema]"
    errors: "[Error responses]"

  database_changes:
    - "[Migration if any]"

  security:
    authentication: "[Required/Optional]"
    authorization: "[Rules]"
    rate_limit: "[Limit]"
```

---

## Code Templates (Embedded)

### Controller Template
```typescript
import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../services/order.service';
import { CreateOrderSchema } from '../validators/order.validator';

export class OrderController {
  constructor(private orderService: OrderService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate input
      const data = CreateOrderSchema.parse(req.body);

      // Call service
      const order = await this.orderService.createOrder(data, req.user.id);

      // Return response
      res.status(201).json({
        success: true,
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }
}
```

### Service Template
```typescript
import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderInput, Order } from '../models/order.model';

export class OrderService {
  constructor(private orderRepo: OrderRepository) {}

  async createOrder(input: CreateOrderInput, userId: string): Promise<Order> {
    // Validate business rules
    await this.validateProducts(input.items);

    // Calculate totals
    const total = await this.calculateTotal(input.items);

    // Create order
    const order = await this.orderRepo.create({
      userId,
      items: input.items,
      total,
      status: 'pending',
    });

    return order;
  }
}
```

### Repository Template
```typescript
import { db } from '../database';
import { Order, CreateOrderData } from '../models/order.model';

export class OrderRepository {
  async create(data: CreateOrderData): Promise<Order> {
    const result = await db.query(`
      INSERT INTO orders (user_id, total, status, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *
    `, [data.userId, data.total, data.status]);

    return this.mapToOrder(result.rows[0]);
  }

  async findById(id: string): Promise<Order | null> {
    const result = await db.query(`
      SELECT * FROM orders WHERE id = $1
    `, [id]);

    return result.rows[0] ? this.mapToOrder(result.rows[0]) : null;
  }
}
```

### Validation Schema Template
```typescript
import { z } from 'zod';

export const CreateOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
  })).min(1),
  shippingAddressId: z.string().uuid(),
  paymentMethodId: z.string().uuid(),
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
```

### Custom Error Classes
```typescript
export class AppError extends Error {
  constructor(
    public message: string,
    public code: string,
    public statusCode: number,
    public details?: any,
  ) {
    super(message);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 'NOT_FOUND', 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details: any) {
    super(message, 'VALIDATION_ERROR', 400, details);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 'FORBIDDEN', 403);
  }
}
```

### Error Middleware
```typescript
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    });
  }

  // Log unexpected errors
  logger.error('Unexpected error', { error, path: req.path });

  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
    },
  });
}
```

### Migration Template
```typescript
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').notNullable().references('users.id');
    table.decimal('total', 10, 2).notNullable();
    table.string('status').notNullable().defaultTo('pending');
    table.timestamps(true, true);
    table.index(['user_id', 'created_at']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('orders');
}
```

---

## Backend Principles (Embedded)

```yaml
principles:
  security_first:
    rule: "Validate all input, sanitize all output"
    why: "Backend is the last line of defense"

  separation_of_concerns:
    rule: "Controllers, services, repositories are distinct"
    why: "Testability, maintainability"

  fail_gracefully:
    rule: "Handle errors, never crash silently"
    why: "Reliability, debuggability"

  log_appropriately:
    rule: "Log for operations, not for debugging"
    why: "Production visibility"
```

---

## Checklist (Embedded)

### Pre-Implementation
```yaml
- [ ] API contract understood
- [ ] Business rules documented
- [ ] Data model available
- [ ] Security requirements known
```

### Implementation
```yaml
- [ ] Proper layer separation
- [ ] Input validation implemented
- [ ] Error handling complete
- [ ] Security measures in place
- [ ] Tests written
```

### Self-Review
```yaml
- [ ] No SQL injection vulnerabilities
- [ ] No hardcoded secrets
- [ ] Proper error messages (no stack traces to client)
- [ ] Rate limiting configured
- [ ] All tests pass
```

---

## HITL Gates

| Gate | Type | When |
|------|------|------|
| Self-Review | 🟢 AUTOMATIC | Before PR |
| Code Review | 🟡 ADVISORY | Before merge |
| Security Review | 🔴 BLOCKING | If security-sensitive |

---

## Escalation

| Situation | Action |
|-----------|--------|
| Complex query needed | Discuss with Lead Developer |
| Security concern | Report immediately |
| Performance requirement | Profile and discuss |
| API design question | Consult Tech Architect |
