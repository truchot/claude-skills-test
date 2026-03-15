# Database Patterns - Backend Developer

## Modelisation SQL

### Normalisation
```
1NF: Valeurs atomiques, pas de listes dans les colonnes
2NF: Dependance de la cle primaire complete
3NF: Pas de dependance transitive
```

### Relations
```
1:1  -> Cle etrangere unique ou meme table
1:N  -> Cle etrangere cote "N"
N:N  -> Table de jonction
```

### Conventions de nommage
```sql
-- Tables: snake_case, pluriel
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ  -- soft delete
);

-- Relations: {table_singulier}_id
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  status order_status NOT NULL DEFAULT 'pending'
);
```

## Index
```sql
-- Index simple sur colonnes filtrees
CREATE INDEX idx_users_email ON users(email);
-- Index composite (ordre: egalite, tri, range)
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
-- Index partiel
CREATE INDEX idx_active_users ON users(email) WHERE deleted_at IS NULL;
```

## Migrations
```typescript
// Versionees, reversibles, idempotentes
export async function up(db) {
  await db.schema.createTable('posts', (t) => {
    t.uuid('id').primary();
    t.string('title').notNullable();
    t.uuid('author_id').references('users.id');
    t.timestamps(true, true);
  });
}
export async function down(db) {
  await db.schema.dropTable('posts');
}
```

## Optimisation
- **EXPLAIN ANALYZE** avant d'optimiser
- Index sur colonnes WHERE, JOIN, ORDER BY
- Eviter SELECT * (projeter les colonnes necessaires)
- **N+1**: eager loading, joins, batch queries
- Connection pooling (pgbouncer, pool config ORM)
- Queries parametrees (jamais de concatenation SQL)

## Transactions
```typescript
await db.transaction(async (trx) => {
  const order = await trx('orders').insert({ user_id, total }).returning('*');
  await trx('order_items').insert(items.map(i => ({ order_id: order.id, ...i })));
  await trx('inventory').decrement('quantity', items);
});
```

## NoSQL (MongoDB, Redis)
- MongoDB: documents imbriques vs references, index compound
- Redis: cache TTL, sessions, rate limiting, pub/sub
- Choisir selon: structure donnees, patterns d'acces, scalabilite

## ORM patterns (Prisma, TypeORM)
- Repository pattern: interface metier, implementation ORM
- Unit of Work: grouper les mutations
- Lazy vs Eager loading selon le cas d'usage
