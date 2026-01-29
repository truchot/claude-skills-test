---
name: api-design
parent_role: tech-architect
description: Designs API contracts, defines endpoints, versioning strategies, and ensures API consistency and usability.
triggers: ["API", "endpoint", "REST", "GraphQL", "contract", "OpenAPI", "tRPC", "versioning"]
outputs: [API Contract, OpenAPI Spec, API Design ADR, Endpoint Documentation]
gate: 🔴 BLOCKING - API contracts require approval before implementation
---

# API Design Agent

## Purpose

Design clear, consistent, and developer-friendly APIs that serve both internal and external consumers. Every API decision prioritizes usability, performance, and evolvability.

## When to Invoke

- Designing new API endpoints
- Defining API contracts before implementation
- Reviewing existing API for improvements
- Planning API versioning strategy
- Designing webhooks or event APIs
- Creating API documentation

## Procedure

### Phase 1: API Requirements Analysis

```yaml
step_1_analyze_requirements:
  action: "Understand what the API needs to support"

  questions:
    consumers:
      - "Who will consume this API? (frontend, mobile, third-party)"
      - "How many consumers expected?"
      - "Authentication requirements?"

    operations:
      - "What resources/entities are involved?"
      - "What operations are needed? (CRUD, custom actions)"
      - "Real-time requirements? (WebSocket, SSE)"

    constraints:
      - "Performance requirements (latency, throughput)?"
      - "Backward compatibility requirements?"
      - "Rate limiting needs?"

    style_preference:
      - "REST, GraphQL, or RPC style?"
      - "Existing API patterns to follow?"

  output: "api_requirements.yaml"
```

### Phase 2: API Style Selection

```yaml
step_2_select_style:
  action: "Choose API architectural style"

  decision_tree:
    rest:
      when:
        - "Standard CRUD operations"
        - "Cacheable resources"
        - "Wide client compatibility needed"
        - "Public API"
      characteristics:
        - "Resource-oriented"
        - "HTTP methods for operations"
        - "Stateless"

    graphql:
      when:
        - "Multiple clients with different data needs"
        - "Complex nested data structures"
        - "Rapid frontend iteration"
        - "Bandwidth optimization critical"
      characteristics:
        - "Single endpoint"
        - "Client specifies data shape"
        - "Strong typing"

    trpc:
      when:
        - "Full-stack TypeScript"
        - "Internal API only"
        - "Maximum type safety"
      characteristics:
        - "End-to-end type safety"
        - "RPC-style calls"
        - "No schema generation"

    grpc:
      when:
        - "Service-to-service communication"
        - "High performance critical"
        - "Polyglot services"
      characteristics:
        - "Protocol buffers"
        - "Bi-directional streaming"
        - "Code generation"

  output: "Selected API style with rationale"
```

### Phase 3: Resource Modeling

```yaml
step_3_model_resources:
  action: "Define API resources and their relationships"

  for_rest_apis:
    identify_resources:
      - "Nouns from domain model"
      - "Singular vs collection endpoints"
      - "Nested vs flat structure"

    example:
      resources:
        - name: "users"
          operations: ["list", "get", "create", "update", "delete"]
          nested:
            - "users/{id}/orders"
            - "users/{id}/preferences"

        - name: "orders"
          operations: ["list", "get", "create", "update"]
          actions:
            - "POST /orders/{id}/cancel"
            - "POST /orders/{id}/refund"

  for_graphql:
    identify_types:
      - "Query types (read)"
      - "Mutation types (write)"
      - "Subscription types (real-time)"

    example: |
      type User {
        id: ID!
        email: String!
        orders: [Order!]!
      }

      type Query {
        user(id: ID!): User
        users(filter: UserFilter): [User!]!
      }

      type Mutation {
        createUser(input: CreateUserInput!): User!
      }
```

### Phase 4: Endpoint Design (REST)

```yaml
step_4_design_endpoints:
  action: "Define detailed endpoint specifications"

  endpoint_template:
    method: "[GET|POST|PUT|PATCH|DELETE]"
    path: "/api/v1/[resource]"
    description: "[What it does]"

    parameters:
      path: []
      query: []
      header: []

    request_body:
      content_type: "application/json"
      schema: {}
      example: {}

    responses:
      200:
        description: "Success"
        schema: {}
      400:
        description: "Validation error"
      401:
        description: "Unauthorized"
      404:
        description: "Not found"
      500:
        description: "Server error"

    authentication: "[none|api_key|bearer|oauth2]"
    rate_limit: "[requests per minute]"

  naming_conventions:
    resources: "Plural nouns (users, orders)"
    actions: "Verbs as sub-resources (POST /orders/{id}/cancel)"
    query_params: "snake_case (page_size, sort_by)"
    case_style: "camelCase for JSON bodies"
```

### Phase 5: Error Handling Design

```yaml
step_5_design_errors:
  action: "Define consistent error response format"

  error_format:
    structure: |
      {
        "error": {
          "code": "VALIDATION_ERROR",
          "message": "Human-readable message",
          "details": [
            {
              "field": "email",
              "code": "INVALID_FORMAT",
              "message": "Invalid email format"
            }
          ],
          "request_id": "req_abc123",
          "documentation_url": "https://api.example.com/docs/errors#VALIDATION_ERROR"
        }
      }

  error_codes:
    client_errors:
      - code: "VALIDATION_ERROR"
        http_status: 400
        when: "Request body fails validation"

      - code: "AUTHENTICATION_REQUIRED"
        http_status: 401
        when: "No valid authentication provided"

      - code: "PERMISSION_DENIED"
        http_status: 403
        when: "Authenticated but not authorized"

      - code: "RESOURCE_NOT_FOUND"
        http_status: 404
        when: "Requested resource doesn't exist"

      - code: "RATE_LIMIT_EXCEEDED"
        http_status: 429
        when: "Too many requests"

    server_errors:
      - code: "INTERNAL_ERROR"
        http_status: 500
        when: "Unexpected server error"

      - code: "SERVICE_UNAVAILABLE"
        http_status: 503
        when: "Temporary unavailability"
```

### Phase 6: Versioning Strategy

```yaml
step_6_versioning:
  action: "Define API versioning approach"

  strategies:
    url_versioning:
      format: "/api/v1/users"
      pros: ["Clear", "Easy routing", "Cacheable"]
      cons: ["URL pollution", "Client updates needed"]
      recommended_for: "Public APIs"

    header_versioning:
      format: "Accept: application/vnd.api+json;version=1"
      pros: ["Clean URLs", "Content negotiation"]
      cons: ["Less visible", "Harder to test"]
      recommended_for: "Internal APIs"

    query_versioning:
      format: "/api/users?version=1"
      pros: ["Simple", "Optional"]
      cons: ["Caching issues", "Less RESTful"]
      recommended_for: "Rarely"

  deprecation_policy:
    - "Announce deprecation 6 months before removal"
    - "Add Deprecation header to responses"
    - "Maintain at least 2 versions simultaneously"
    - "Provide migration guide"

  breaking_changes:
    - "Removing endpoints"
    - "Removing fields"
    - "Changing field types"
    - "Changing authentication"
    - "Changing error formats"

  non_breaking_changes:
    - "Adding new endpoints"
    - "Adding optional fields"
    - "Adding new error codes"
    - "Performance improvements"
```

### Phase 7: Documentation

```yaml
step_7_documentation:
  action: "Generate comprehensive API documentation"

  openapi_spec:
    version: "3.1.0"
    includes:
      - "All endpoints"
      - "Request/response schemas"
      - "Authentication methods"
      - "Error responses"
      - "Examples"

  additional_docs:
    getting_started: "Quick start guide"
    authentication: "How to authenticate"
    rate_limits: "Rate limiting policy"
    errors: "Error code reference"
    changelog: "Version history"
    sdks: "Available SDKs"

  tools:
    - "Swagger UI for interactive docs"
    - "Redoc for beautiful static docs"
    - "Postman collection for testing"
```

---

## Output: API Contract

```yaml
api_contract:
  info:
    title: "[API Name]"
    version: "1.0.0"
    description: "[API description]"
    base_url: "https://api.example.com/v1"

  authentication:
    type: "[bearer|api_key|oauth2]"
    header: "Authorization"
    format: "Bearer {token}"

  rate_limiting:
    requests_per_minute: 100
    burst: 20
    headers:
      - "X-RateLimit-Limit"
      - "X-RateLimit-Remaining"
      - "X-RateLimit-Reset"

  endpoints:
    - method: "GET"
      path: "/users"
      summary: "List all users"
      description: "Returns paginated list of users"
      parameters:
        - name: "page"
          in: "query"
          type: "integer"
          default: 1
        - name: "page_size"
          in: "query"
          type: "integer"
          default: 20
          max: 100
      response:
        200:
          description: "Success"
          schema:
            type: "object"
            properties:
              data:
                type: "array"
                items:
                  $ref: "#/schemas/User"
              pagination:
                $ref: "#/schemas/Pagination"

    - method: "POST"
      path: "/users"
      summary: "Create a user"
      request_body:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/schemas/CreateUserInput"
      responses:
        201:
          description: "Created"
          schema:
            $ref: "#/schemas/User"
        400:
          description: "Validation error"
          schema:
            $ref: "#/schemas/Error"

  schemas:
    User:
      type: "object"
      properties:
        id:
          type: "string"
          format: "uuid"
        email:
          type: "string"
          format: "email"
        name:
          type: "string"
        created_at:
          type: "string"
          format: "date-time"

    CreateUserInput:
      type: "object"
      required: ["email", "name"]
      properties:
        email:
          type: "string"
          format: "email"
        name:
          type: "string"
          minLength: 1
          maxLength: 100

    Pagination:
      type: "object"
      properties:
        page:
          type: "integer"
        page_size:
          type: "integer"
        total:
          type: "integer"
        total_pages:
          type: "integer"

    Error:
      type: "object"
      properties:
        error:
          type: "object"
          properties:
            code:
              type: "string"
            message:
              type: "string"
            details:
              type: "array"
            request_id:
              type: "string"
```

---

## REST API Best Practices

### URL Design
```
✅ DO:
/users                    # Collection
/users/123                # Specific resource
/users/123/orders         # Nested resource
/orders?user_id=123       # Filtered collection

❌ DON'T:
/getUsers                 # No verbs in URL
/user/list                # Use plural
/users/123/getOrders      # No verbs
```

### HTTP Methods
```
GET     - Read (idempotent, cacheable)
POST    - Create (not idempotent)
PUT     - Full update (idempotent)
PATCH   - Partial update (not necessarily idempotent)
DELETE  - Remove (idempotent)
```

### Status Codes
```
200 OK              - Successful GET, PUT, PATCH
201 Created         - Successful POST
204 No Content      - Successful DELETE
400 Bad Request     - Validation error
401 Unauthorized    - Authentication required
403 Forbidden       - Not authorized
404 Not Found       - Resource doesn't exist
409 Conflict        - Resource conflict (duplicate)
422 Unprocessable   - Semantic validation error
429 Too Many        - Rate limited
500 Internal Error  - Server error
503 Unavailable     - Temporary unavailability
```

### Pagination
```yaml
cursor_based:
  recommended_for: "Large datasets, real-time data"
  format: |
    GET /users?cursor=abc123&limit=20
    Response:
      {
        "data": [...],
        "next_cursor": "def456",
        "has_more": true
      }

offset_based:
  recommended_for: "Small datasets, random access"
  format: |
    GET /users?page=2&page_size=20
    Response:
      {
        "data": [...],
        "pagination": {
          "page": 2,
          "page_size": 20,
          "total": 100,
          "total_pages": 5
        }
      }
```

### Filtering & Sorting
```
Filtering:
/users?status=active&role=admin
/users?created_at[gte]=2024-01-01
/users?search=john

Sorting:
/users?sort=created_at          # Ascending
/users?sort=-created_at         # Descending
/users?sort=status,-created_at  # Multiple
```

---

## HITL Gates

| Gate | Type | When |
|------|------|------|
| API Contract Approval | 🔴 BLOCKING | Before any implementation |
| Breaking Change | 🔴 BLOCKING | Any change affecting existing clients |
| Public API Design | 🔴 BLOCKING | External-facing APIs |
| Internal API Design | 🟡 ADVISORY | Internal service APIs |

---

## Knowledge References

- `knowledge/patterns/api/rest-patterns.md`
- `knowledge/patterns/api/graphql-patterns.md`
- `knowledge/rules/api-security.md`
- `knowledge/checklists/api-review.md`

---

## Escalation

| Situation | Action |
|-----------|--------|
| Breaking change unavoidable | Document migration path, coordinate with consumers |
| Performance requirements impossible | Negotiate with Product Manager, propose alternatives |
| Security concern with design | Escalate to security-architecture agent |
| Complex data requirements | Consult data-modeling agent |
