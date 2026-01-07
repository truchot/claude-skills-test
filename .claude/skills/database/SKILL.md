---
name: database
description: Bases de données - SQL, modélisation, requêtes, ORM
tags: [database, sql, postgresql, prisma, orm]
---

# Database

## Quand Utiliser

- Modéliser des données relationnelles
- Écrire des requêtes SQL/ORM
- Optimiser les performances
- Gérer les migrations

## Principes Clés

- Normalisation (3NF minimum)
- Index pour les requêtes fréquentes
- Transactions pour l'intégrité
- Migrations versionnées

## Modélisation

### Relations

```sql
-- One-to-Many
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

-- Many-to-Many
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE
);

CREATE TABLE post_tags (
  post_id INTEGER REFERENCES posts(id),
  tag_id INTEGER REFERENCES tags(id),
  PRIMARY KEY (post_id, tag_id)
);
```

### Types de données

```sql
-- Texte
VARCHAR(100)  -- Variable, max 100
TEXT          -- Illimité
CHAR(2)       -- Fixe (pays)

-- Nombres
INTEGER       -- Entier
SERIAL        -- Auto-increment
DECIMAL(10,2) -- Précis (argent)
FLOAT         -- Approximatif

-- Date/Time
DATE          -- YYYY-MM-DD
TIMESTAMP     -- Date + heure
TIMESTAMPTZ   -- Avec timezone

-- Autres
BOOLEAN
UUID
JSONB         -- JSON indexable
```

## SQL Queries

### SELECT

```sql
-- Basique
SELECT id, name, email
FROM users
WHERE active = true
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;

-- JOIN
SELECT u.name, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON p.user_id = u.id
GROUP BY u.id
HAVING COUNT(p.id) > 5;

-- Subquery
SELECT *
FROM users
WHERE id IN (
  SELECT DISTINCT user_id
  FROM posts
  WHERE created_at > NOW() - INTERVAL '7 days'
);
```

### INSERT/UPDATE/DELETE

```sql
-- Insert
INSERT INTO users (name, email)
VALUES ('John', 'john@example.com')
RETURNING id;

-- Update
UPDATE users
SET name = 'Jane', updated_at = NOW()
WHERE id = 1;

-- Delete
DELETE FROM posts
WHERE user_id = 1;
```

## Prisma ORM

### Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

### Queries

```typescript
// Find many
const users = await prisma.user.findMany({
  where: { active: true },
  include: { posts: true },
  orderBy: { createdAt: 'desc' },
  take: 20,
  skip: 0
});

// Find unique
const user = await prisma.user.findUnique({
  where: { email: 'john@example.com' }
});

// Create
const user = await prisma.user.create({
  data: {
    name: 'John',
    email: 'john@example.com',
    posts: {
      create: [{ title: 'First post' }]
    }
  }
});

// Update
await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Jane' }
});

// Delete
await prisma.user.delete({
  where: { id: 1 }
});
```

### Transactions

```typescript
await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: { name: 'John' } });
  await tx.post.create({
    data: { title: 'Post', authorId: user.id }
  });
});
```

## Migrations

```bash
# Prisma
npx prisma migrate dev --name add_users_table
npx prisma migrate deploy

# SQL
CREATE TABLE migrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  executed_at TIMESTAMP DEFAULT NOW()
);
```

## Index

```sql
-- Index simple
CREATE INDEX idx_users_email ON users(email);

-- Index composite
CREATE INDEX idx_posts_user_date ON posts(user_id, created_at DESC);

-- Index unique
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- Index partiel
CREATE INDEX idx_active_users ON users(email)
WHERE active = true;
```

## Optimisation

### Analyse

```sql
-- Expliquer une requête
EXPLAIN ANALYZE
SELECT * FROM posts
WHERE user_id = 1
ORDER BY created_at DESC;

-- Identifier les slow queries
SELECT query, calls, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

### N+1 Problem

```typescript
// ❌ N+1 queries
const users = await prisma.user.findMany();
for (const user of users) {
  const posts = await prisma.post.findMany({
    where: { userId: user.id }
  });
}

// ✅ Single query with include
const users = await prisma.user.findMany({
  include: { posts: true }
});
```

## Anti-patterns

- ❌ SELECT * en production
- ❌ Pas d'index sur les FK
- ❌ N+1 queries
- ❌ Stocker des mots de passe en clair
- ❌ Pas de transactions pour opérations liées

## Checklist

- [ ] Schema normalisé
- [ ] Index sur colonnes filtrées/triées
- [ ] Foreign keys avec contraintes
- [ ] Migrations versionnées
- [ ] Requêtes optimisées (EXPLAIN)
