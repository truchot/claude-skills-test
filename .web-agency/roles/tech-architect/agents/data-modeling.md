---
name: data-modeling
parent_role: tech-architect
description: Designs database schemas, entity relationships, and data architecture that balances performance, integrity, and maintainability.
triggers: ["database", "schema", "model", "entity", "relations", "ERD", "migration", "normalization"]
outputs: [Data Model, ERD Diagram, Migration Plan, Schema ADR]
gate: 🔴 BLOCKING - Data model requires approval before implementation
---

# Data Modeling Agent

## Purpose

Design data models that are correct, performant, and evolvable. Every schema decision considers current needs and future growth.

## When to Invoke

- Designing database schema for new project
- Adding new entities to existing schema
- Optimizing query performance
- Planning database migrations
- Reviewing data model for issues
- Deciding between SQL and NoSQL

## Procedure

### Phase 1: Domain Analysis

```yaml
step_1_analyze_domain:
  action: "Understand the business domain and data requirements"

  questions:
    entities:
      - "What are the core business entities?"
      - "What are the relationships between them?"
      - "What are the cardinalities? (1:1, 1:N, N:M)"

    operations:
      - "What are the primary read patterns?"
      - "What are the write patterns?"
      - "What queries will be most frequent?"

    constraints:
      - "What data must be unique?"
      - "What integrity rules exist?"
      - "What data is required vs optional?"

    scale:
      - "Expected data volume?"
      - "Growth rate?"
      - "Retention requirements?"

  output: "domain_analysis.yaml"
```

### Phase 2: Entity Identification

```yaml
step_2_identify_entities:
  action: "Define all entities and their attributes"

  entity_template:
    name: "[Entity name - singular PascalCase]"
    description: "[What this entity represents]"
    table_name: "[snake_case plural]"

    attributes:
      - name: "[attribute_name]"
        type: "[data type]"
        nullable: "[true|false]"
        unique: "[true|false]"
        default: "[default value if any]"
        description: "[What it represents]"

    primary_key: "[field(s)]"
    indexes: ["[index definitions]"]
    constraints: ["[business rules]"]

  example:
    name: "User"
    table_name: "users"
    attributes:
      - name: "id"
        type: "uuid"
        nullable: false
        unique: true
        description: "Primary identifier"

      - name: "email"
        type: "varchar(255)"
        nullable: false
        unique: true
        description: "User's email address"

      - name: "name"
        type: "varchar(100)"
        nullable: false
        description: "Display name"

      - name: "status"
        type: "enum(active, inactive, suspended)"
        nullable: false
        default: "active"

      - name: "created_at"
        type: "timestamp with time zone"
        nullable: false
        default: "now()"

      - name: "updated_at"
        type: "timestamp with time zone"
        nullable: false
        default: "now()"

    primary_key: "id"
    indexes:
      - "idx_users_email UNIQUE (email)"
      - "idx_users_status (status)"
```

### Phase 3: Relationship Mapping

```yaml
step_3_map_relationships:
  action: "Define relationships between entities"

  relationship_types:
    one_to_one:
      implementation: "Foreign key with unique constraint"
      example: "User -> UserProfile"
      decision: "Separate table if often null or large blob"

    one_to_many:
      implementation: "Foreign key on the 'many' side"
      example: "User -> Orders"
      decision: "Always index the foreign key"

    many_to_many:
      implementation: "Junction/join table"
      example: "Products <-> Categories"
      decision: "Add metadata to junction if needed (e.g., quantity)"

  relationship_template:
    from_entity: "[Entity A]"
    to_entity: "[Entity B]"
    type: "[1:1|1:N|N:M]"
    foreign_key: "[FK definition]"
    on_delete: "[CASCADE|SET NULL|RESTRICT]"
    on_update: "[CASCADE|RESTRICT]"
    description: "[Business meaning]"

  cascade_guidelines:
    CASCADE: "Dependent data (order_items when order deleted)"
    SET_NULL: "Optional relationship (assigned_to when user deleted)"
    RESTRICT: "Prevent deletion if references exist (category with products)"
```

### Phase 4: Normalization Decision

```yaml
step_4_normalization:
  action: "Decide on normalization level"

  levels:
    1NF:
      rule: "No repeating groups, atomic values"
      always: true

    2NF:
      rule: "No partial dependencies on composite key"
      always: true

    3NF:
      rule: "No transitive dependencies"
      usually: true
      denormalize_when: "Heavy read, rarely updated"

    BCNF:
      rule: "Every determinant is a candidate key"
      when: "Complex unique constraints"

  denormalization_patterns:
    computed_columns:
      when: "Expensive to calculate, frequently read"
      example: "order_total stored instead of sum(items)"
      trade_off: "Must update on item changes"

    duplicated_data:
      when: "Avoid joins for read performance"
      example: "customer_name on order table"
      trade_off: "Must sync on customer update"

    materialized_views:
      when: "Complex aggregations"
      example: "Daily sales summary"
      trade_off: "Stale data, refresh strategy needed"
```

### Phase 5: Index Strategy

```yaml
step_5_design_indexes:
  action: "Plan indexes for query performance"

  index_rules:
    always_index:
      - "Primary keys (automatic)"
      - "Foreign keys"
      - "Columns in WHERE clauses"
      - "Columns in JOIN conditions"
      - "Columns in ORDER BY"

    consider_index:
      - "Columns in GROUP BY"
      - "Columns with high selectivity"
      - "Partial indexes for filtered queries"

    avoid_over_indexing:
      - "Write-heavy tables"
      - "Low selectivity columns"
      - "Rarely queried columns"

  index_types:
    btree:
      use_for: "Equality and range queries (default)"
      example: "WHERE created_at > '2024-01-01'"

    hash:
      use_for: "Equality only, faster than btree"
      example: "WHERE status = 'active'"

    gin:
      use_for: "Array/JSONB containment, full-text"
      example: "WHERE tags @> '{feature}'"

    gist:
      use_for: "Geometric, full-text, range types"
      example: "WHERE location <-> point '(0,0)' < 100"

  composite_indexes:
    rule: "Column order matters"
    principle: "Most selective first, or match query pattern"
    example: |
      Query: WHERE user_id = ? AND status = ? ORDER BY created_at
      Index: (user_id, status, created_at)
```

### Phase 6: Data Types Selection

```yaml
step_6_data_types:
  action: "Choose appropriate data types"

  postgresql_recommendations:
    identifiers:
      uuid: "Distributed systems, no sequential info"
      bigserial: "Simple auto-increment, better join perf"
      text_id: "Human-readable (e.g., 'order_abc123')"

    text:
      varchar_n: "When max length is business rule"
      text: "When no practical limit"
      char_n: "Fixed length only (rarely)"

    numbers:
      integer: "Counts, quantities (-2B to 2B)"
      bigint: "Large numbers, timestamps as int"
      numeric: "Money, precise decimals"
      real_double: "Scientific, approximate OK"

    timestamps:
      timestamptz: "Always for times (with timezone)"
      date: "Date only, no time component"
      interval: "Durations"

    boolean:
      boolean: "true/false only"
      status_enum: "If more than 2 states possible"

    json:
      jsonb: "Flexible schema, queryable"
      json: "Only if preserving whitespace matters"

    arrays:
      array: "Simple lists, queryable with GIN"
      separate_table: "If items need their own attributes"

  money_handling:
    recommended: "Store as integer cents + currency code"
    example: |
      amount_cents: integer NOT NULL
      currency: char(3) NOT NULL DEFAULT 'USD'
    why: "Avoids floating point errors, clear semantics"
```

### Phase 7: Migration Planning

```yaml
step_7_migration_plan:
  action: "Plan safe schema migrations"

  migration_principles:
    backward_compatible:
      - "Add columns as nullable first"
      - "Don't remove columns in same release"
      - "Don't rename columns directly"

    zero_downtime:
      - "Add new column"
      - "Backfill data"
      - "Update application to use new column"
      - "Remove old column (later release)"

    large_table_migrations:
      - "Use pt-online-schema-change or gh-ost"
      - "Batch updates, not single transaction"
      - "Run during low-traffic periods"

  migration_template:
    name: "[YYYYMMDDHHMMSS]_[description].sql"
    up: "[SQL to apply change]"
    down: "[SQL to rollback]"
    reversible: "[true|false]"
    estimated_duration: "[time estimate]"
    locks_tables: "[which tables locked]"
```

---

## Output: Data Model Document

```yaml
data_model:
  project: "[Project name]"
  version: "1.0.0"
  date: "[YYYY-MM-DD]"
  database: "PostgreSQL 15+"

  entities:
    - name: "User"
      table: "users"
      description: "Application users"
      attributes:
        - name: "id"
          type: "uuid"
          constraints: "PRIMARY KEY DEFAULT gen_random_uuid()"

        - name: "email"
          type: "varchar(255)"
          constraints: "NOT NULL UNIQUE"

        - name: "password_hash"
          type: "varchar(255)"
          constraints: "NOT NULL"

        - name: "name"
          type: "varchar(100)"
          constraints: "NOT NULL"

        - name: "status"
          type: "user_status"
          constraints: "NOT NULL DEFAULT 'active'"
          enum_values: ["active", "inactive", "suspended"]

        - name: "created_at"
          type: "timestamptz"
          constraints: "NOT NULL DEFAULT now()"

        - name: "updated_at"
          type: "timestamptz"
          constraints: "NOT NULL DEFAULT now()"

      indexes:
        - name: "idx_users_email"
          columns: ["email"]
          unique: true

        - name: "idx_users_status"
          columns: ["status"]

      triggers:
        - name: "update_users_updated_at"
          event: "BEFORE UPDATE"
          action: "set_updated_at()"

    - name: "Order"
      table: "orders"
      description: "Customer orders"
      attributes:
        - name: "id"
          type: "uuid"
          constraints: "PRIMARY KEY DEFAULT gen_random_uuid()"

        - name: "user_id"
          type: "uuid"
          constraints: "NOT NULL REFERENCES users(id) ON DELETE RESTRICT"

        - name: "status"
          type: "order_status"
          constraints: "NOT NULL DEFAULT 'pending'"
          enum_values: ["pending", "confirmed", "shipped", "delivered", "cancelled"]

        - name: "total_cents"
          type: "integer"
          constraints: "NOT NULL CHECK (total_cents >= 0)"

        - name: "currency"
          type: "char(3)"
          constraints: "NOT NULL DEFAULT 'USD'"

      indexes:
        - name: "idx_orders_user_id"
          columns: ["user_id"]

        - name: "idx_orders_status_created"
          columns: ["status", "created_at"]

  relationships:
    - from: "Order"
      to: "User"
      type: "many-to-one"
      foreign_key: "orders.user_id -> users.id"
      on_delete: "RESTRICT"

  erd_diagram: ".project/03-architecture/erd.png"

  sql_script: ".project/03-architecture/schema.sql"
```

---

## SQL Schema Template

```sql
-- Generated schema for [Project Name]
-- Version: 1.0.0
-- Date: [YYYY-MM-DD]

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Custom types
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled');

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email varchar(255) NOT NULL UNIQUE,
  password_hash varchar(255) NOT NULL,
  name varchar(100) NOT NULL,
  status user_status NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_status ON users(status);

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Orders table
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  status order_status NOT NULL DEFAULT 'pending',
  total_cents integer NOT NULL CHECK (total_cents >= 0),
  currency char(3) NOT NULL DEFAULT 'USD',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status_created ON orders(status, created_at);

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();
```

---

## Common Patterns

### Soft Delete
```sql
-- Add to entity
deleted_at timestamptz DEFAULT NULL

-- Index for active records
CREATE INDEX idx_users_active ON users(id) WHERE deleted_at IS NULL;

-- Always filter in queries
SELECT * FROM users WHERE deleted_at IS NULL;
```

### Audit Trail
```sql
CREATE TABLE audit_log (
  id bigserial PRIMARY KEY,
  table_name varchar(50) NOT NULL,
  record_id uuid NOT NULL,
  action varchar(10) NOT NULL, -- INSERT, UPDATE, DELETE
  old_data jsonb,
  new_data jsonb,
  changed_by uuid REFERENCES users(id),
  changed_at timestamptz NOT NULL DEFAULT now()
);
```

### Multi-tenancy
```sql
-- Row-level security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON orders
  USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

---

## HITL Gates

| Gate | Type | When |
|------|------|------|
| Schema Approval | 🔴 BLOCKING | Before implementation |
| Migration Review | 🔴 BLOCKING | Production migrations |
| Index Addition | 🟡 ADVISORY | New indexes on large tables |

---

## Knowledge References

- `knowledge/patterns/data/normalization.md`
- `knowledge/patterns/data/indexing.md`
- `knowledge/rules/data-integrity.md`
- `contexts/database/postgresql.md`

---

## Escalation

| Situation | Action |
|-----------|--------|
| Performance issues with schema | Analyze queries, consider denormalization |
| Complex migration risk | Plan rollback, consider feature flags |
| Data integrity violation | Fix constraint, plan data cleanup |
