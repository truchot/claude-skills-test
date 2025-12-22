---
name: optimisation-backend
description: Optimisation des performances backend et API
---

# Optimisation Backend

Tu guides l'**optimisation des performances backend** pour des APIs rapides et scalables.

## Diagnostic des Problèmes

### Identifier les Goulots

```sql
-- PostgreSQL: Requêtes lentes
SELECT query, calls, mean_time, total_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 20;

-- MySQL: Slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;
```

### APM (Application Performance Monitoring)

```typescript
// OpenTelemetry setup
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';

const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();

// Tracer manuel
const tracer = trace.getTracer('my-service');
const span = tracer.startSpan('database-query');
// ... opération
span.end();
```

## Optimisation Base de Données

### N+1 Queries

```typescript
// ❌ N+1 Problem
const users = await User.findAll();
for (const user of users) {
  const orders = await Order.findAll({ where: { userId: user.id } });
  // N requêtes supplémentaires !
}

// ✅ Eager Loading (Sequelize)
const users = await User.findAll({
  include: [{ model: Order }]
});

// ✅ Prisma
const users = await prisma.user.findMany({
  include: { orders: true }
});

// ✅ TypeORM
const users = await userRepository.find({
  relations: ['orders']
});
```

### Index Stratégiques

```sql
-- Index sur colonnes de recherche/filtre
CREATE INDEX idx_users_email ON users(email);

-- Index composite pour requêtes fréquentes
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Index partiel pour subset fréquent
CREATE INDEX idx_orders_pending ON orders(created_at)
WHERE status = 'pending';

-- Analyser l'utilisation
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 123;
```

### Pagination Efficace

```typescript
// ❌ OFFSET pagination (lent pour grandes pages)
SELECT * FROM orders OFFSET 10000 LIMIT 20;

// ✅ Cursor-based pagination
SELECT * FROM orders
WHERE id > :lastId
ORDER BY id
LIMIT 20;

// Implémentation
async function getOrders(cursor?: string, limit = 20) {
  const query = Order.query().orderBy('id').limit(limit);

  if (cursor) {
    query.where('id', '>', cursor);
  }

  const orders = await query;
  const nextCursor = orders.length === limit
    ? orders[orders.length - 1].id
    : null;

  return { orders, nextCursor };
}
```

## Caching

### Cache Applicatif (Redis)

```typescript
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Pattern Cache-Aside
async function getUserById(id: string): Promise<User> {
  const cacheKey = `user:${id}`;

  // Check cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // Fetch from DB
  const user = await db.user.findById(id);

  // Store in cache (1 hour TTL)
  await redis.setex(cacheKey, 3600, JSON.stringify(user));

  return user;
}

// Invalidation
async function updateUser(id: string, data: UserUpdate): Promise<User> {
  const user = await db.user.update(id, data);
  await redis.del(`user:${id}`);
  return user;
}
```

### Cache HTTP

```typescript
// Express middleware
app.get('/api/products', (req, res) => {
  res.set({
    'Cache-Control': 'public, max-age=300', // 5 minutes
    'ETag': generateETag(products),
  });
  res.json(products);
});

// Stale-while-revalidate
res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
```

### Cache Database (Query Cache)

```typescript
// Prisma avec cache
import { createPrismaRedisCache } from 'prisma-redis-middleware';

prisma.$use(
  createPrismaRedisCache({
    storage: { type: 'redis', options: { client: redis } },
    cacheTime: 300,
    excludeModels: ['AuditLog'],
  })
);
```

## Optimisation API

### Compression

```typescript
import compression from 'compression';

app.use(compression({
  level: 6,
  threshold: 1024, // Ne pas compresser < 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));
```

### Éviter Over-fetching

```typescript
// ❌ Retourner tout
app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user); // Tous les champs
});

// ✅ Sélection de champs
app.get('/api/users/:id', async (req, res) => {
  const fields = (req.query.fields as string)?.split(',') || ['id', 'name', 'email'];
  const user = await User.findById(req.params.id).select(fields);
  res.json(user);
});

// ✅ GraphQL pour flexibilité
query {
  user(id: "123") {
    id
    name
    orders(first: 5) {
      id
      total
    }
  }
}
```

### Connection Pooling

```typescript
// PostgreSQL avec pg-pool
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,              // Max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Prisma
// Configuré automatiquement, ajuster dans connection string
// ?connection_limit=20&pool_timeout=10
```

## Async Processing

### Queues (Bull)

```typescript
import Queue from 'bull';

const emailQueue = new Queue('emails', process.env.REDIS_URL);

// Ajouter à la queue (ne bloque pas l'API)
app.post('/api/orders', async (req, res) => {
  const order = await Order.create(req.body);

  // Process async
  await emailQueue.add('order-confirmation', {
    orderId: order.id,
    email: req.user.email,
  });

  res.status(201).json(order);
});

// Worker (process séparé)
emailQueue.process('order-confirmation', async (job) => {
  await sendEmail(job.data.email, 'Order Confirmation', ...);
});
```

### Batch Processing

```typescript
// ❌ Un par un
for (const item of items) {
  await db.insert(item);
}

// ✅ Batch insert
await db.insertMany(items);

// ✅ Batch avec chunks
const BATCH_SIZE = 1000;
for (let i = 0; i < items.length; i += BATCH_SIZE) {
  const batch = items.slice(i, i + BATCH_SIZE);
  await db.insertMany(batch);
}
```

## Checklist Backend Performance

### Base de Données

- [ ] Pas de N+1 queries
- [ ] Index sur colonnes filtrées/triées
- [ ] Pagination cursor-based pour grandes collections
- [ ] Connection pooling configuré
- [ ] Query logging en dev

### Caching

- [ ] Redis pour données fréquentes
- [ ] Cache HTTP pour ressources statiques
- [ ] Invalidation maîtrisée
- [ ] TTL appropriés

### API

- [ ] Compression activée
- [ ] Sélection de champs possible
- [ ] Rate limiting
- [ ] Timeout configurés

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Query > 1s | Optimisation requête/index urgent |
| API p95 > 2s | Investigation + cache |
| DB CPU > 80% | Scaling vertical ou read replicas |
