---
name: backend-implementation
parent_role: developer
description: Implements server-side logic, API endpoints, services, and database operations following best practices.
triggers: ["backend", "API", "endpoint", "service", "controller", "database", "query", "migration"]
outputs: [API Endpoints, Services, Database Queries, Migrations]
gate: 🟢 AUTOMATIC - Self-review before code review
---

# Backend Implementation Agent

## Purpose

Build server-side code that is secure, performant, and maintainable. Good backend code has clear separation of concerns, handles errors gracefully, and is thoroughly tested.

## When to Invoke

- Implementing API endpoints
- Creating services and business logic
- Writing database queries and migrations
- Building background jobs
- Integrating with external services

## Implementation Principles

```yaml
backend_principles:
  principle_1:
    name: "Security first"
    rule: "Validate all input, sanitize all output"
    why: "Backend is the last line of defense"

  principle_2:
    name: "Separation of concerns"
    rule: "Controllers, services, repositories are distinct"
    why: "Testability, maintainability"

  principle_3:
    name: "Fail gracefully"
    rule: "Handle errors, never crash silently"
    why: "Reliability, debuggability"

  principle_4:
    name: "Log appropriately"
    rule: "Log for operations, not for debugging"
    why: "Production visibility"
```

## Procedure

### Phase 1: Understand Requirements

```yaml
step_1_requirements:
  action: "Gather all context for the implementation"

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
  action: "Plan the implementation layers"

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

  example_structure:
    feature: "Create Order"
    files:
      - "controllers/order.controller.ts"
      - "services/order.service.ts"
      - "repositories/order.repository.ts"
      - "models/order.model.ts"
      - "validators/order.validator.ts"
```

### Phase 3: API Implementation

```yaml
step_3_api:
  action: "Implement the API endpoint"

  endpoint_structure:
    rest_conventions:
      GET_collection: "GET /resources"
      GET_single: "GET /resources/:id"
      POST_create: "POST /resources"
      PUT_update: "PUT /resources/:id"
      PATCH_partial: "PATCH /resources/:id"
      DELETE: "DELETE /resources/:id"

  controller_template: |
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

  request_validation:
    tool: "Zod or Joi"
    pattern: |
      import { z } from 'zod';

      export const CreateOrderSchema = z.object({
        items: z.array(z.object({
          productId: z.string().uuid(),
          quantity: z.number().int().positive(),
        })).min(1),
        shippingAddressId: z.string().uuid(),
        paymentMethodId: z.string().uuid(),
      });

  response_format:
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
  action: "Implement business logic"

  service_template: |
    import { OrderRepository } from '../repositories/order.repository';
    import { ProductRepository } from '../repositories/product.repository';
    import { CreateOrderInput, Order } from '../models/order.model';

    export class OrderService {
      constructor(
        private orderRepo: OrderRepository,
        private productRepo: ProductRepository,
      ) {}

      async createOrder(input: CreateOrderInput, userId: string): Promise<Order> {
        // Validate business rules
        await this.validateProducts(input.items);

        // Calculate totals
        const total = await this.calculateTotal(input.items);

        // Check inventory
        await this.reserveInventory(input.items);

        // Create order
        const order = await this.orderRepo.create({
          userId,
          items: input.items,
          total,
          status: 'pending',
        });

        // Side effects (async, don't await)
        this.sendOrderConfirmation(order);

        return order;
      }

      private async validateProducts(items: OrderItem[]): Promise<void> {
        const productIds = items.map(i => i.productId);
        const products = await this.productRepo.findByIds(productIds);

        if (products.length !== productIds.length) {
          throw new NotFoundError('Some products not found');
        }

        for (const item of items) {
          const product = products.find(p => p.id === item.productId);
          if (!product.isAvailable) {
            throw new BusinessError('Product not available', { productId: item.productId });
          }
        }
      }
    }

  service_guidelines:
    - "One service per domain concept"
    - "Methods are business operations"
    - "Handle transactions at service level"
    - "Throw typed exceptions"
    - "Don't catch errors (let controller handle)"
```

### Phase 5: Database Operations

```yaml
step_5_database:
  action: "Implement data access"

  repository_template: |
    import { db } from '../database';
    import { Order, CreateOrderData } from '../models/order.model';

    export class OrderRepository {
      async create(data: CreateOrderData): Promise<Order> {
        const result = await db.query(`
          INSERT INTO orders (user_id, total, status, created_at)
          VALUES ($1, $2, $3, NOW())
          RETURNING *
        `, [data.userId, data.total, data.status]);

        // Insert order items
        for (const item of data.items) {
          await db.query(`
            INSERT INTO order_items (order_id, product_id, quantity, price)
            VALUES ($1, $2, $3, $4)
          `, [result.rows[0].id, item.productId, item.quantity, item.price]);
        }

        return this.mapToOrder(result.rows[0]);
      }

      async findById(id: string): Promise<Order | null> {
        const result = await db.query(`
          SELECT o.*, json_agg(oi.*) as items
          FROM orders o
          LEFT JOIN order_items oi ON o.id = oi.order_id
          WHERE o.id = $1
          GROUP BY o.id
        `, [id]);

        return result.rows[0] ? this.mapToOrder(result.rows[0]) : null;
      }
    }

  query_best_practices:
    always:
      - "Use parameterized queries (prevent SQL injection)"
      - "Use indexes for query columns"
      - "Limit result sets"
      - "Use transactions for multi-step operations"

    avoid:
      - "SELECT * in production"
      - "N+1 queries"
      - "Unbounded queries without LIMIT"

  migrations:
    tool: "Knex, Prisma, or similar"
    naming: "YYYYMMDDHHMMSS_description.ts"
    pattern: |
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

### Phase 6: Error Handling

```yaml
step_6_errors:
  action: "Handle errors consistently"

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

  custom_errors: |
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

  error_middleware: |
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
      logger.error('Unexpected error', { error, req: req.path });

      return res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred',
        },
      });
    }
```

### Phase 7: Security

```yaml
step_7_security:
  action: "Implement security measures"

  input_validation:
    always: "Validate all input with schema"
    sanitize: "Escape output, not input"

  authentication:
    verify_token: "Middleware verifies JWT/session"
    get_user: "Always use req.user, never trust input"

  authorization:
    check_ownership: |
      const order = await orderRepo.findById(id);
      if (order.userId !== req.user.id) {
        throw new ForbiddenError('Not authorized');
      }

    check_role: |
      if (!req.user.roles.includes('admin')) {
        throw new ForbiddenError('Admin access required');
      }

  rate_limiting:
    implement: "Use rate limiter middleware"
    sensitive_endpoints: "Lower limits for auth endpoints"

  sql_injection:
    prevention: "Always use parameterized queries"
    never: "String concatenation for queries"

  logging:
    log: "Access attempts, errors"
    never_log: "Passwords, tokens, PII"
```

---

## Output: API Implementation

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
    request: |
      [Request schema]
    response: |
      [Response schema]
    errors: |
      [Error responses]

  database_changes:
    - "[Migration if any]"

  security:
    authentication: "[Required/Optional]"
    authorization: "[Rules]"
    rate_limit: "[Limit]"
```

---

## HITL Gates

| Gate | Type | When |
|------|------|------|
| Self-Review | 🟢 AUTOMATIC | Before PR |
| Code Review | 🟡 ADVISORY | Before merge |
| Security Review | 🔴 BLOCKING | If security-sensitive |

---

## Knowledge References

- `knowledge/patterns/api/`
- `knowledge/patterns/database/`
- `knowledge/checklists/security.md`

---

## Escalation

| Situation | Action |
|-----------|--------|
| Complex query needed | Discuss with Lead Developer |
| Security concern | Report immediately |
| Performance requirement | Profile and discuss |
| API design question | Consult Tech Architect |
