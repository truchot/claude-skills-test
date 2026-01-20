---
id: database-schema
name: Schéma de Base de Données
version: 1.0.0
category: code
status: active
phase: "4-realisation"
order: 3
agents:
  - backend-developer/database/modeling
  - backend-developer/database/migrations
consumes:
  - data-model
  - technical-specification
produces_for:
  - backend-developer/api/*
  - backend-developer/database/queries
  - testing-process/integration/*
tags: [database, schema, migrations, prisma, sql, postgresql]
---

# Schéma de Base de Données

## Description

Implémentation concrète du modèle de données sous forme de fichiers de migration et schéma ORM. Inclut le schéma Prisma (ou équivalent), les migrations versionnées et les scripts de seed.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Fichiers Prisma/SQL + Scripts |
| **Emplacement** | `prisma/` ou `db/` |
| **Nommage** | `schema.prisma`, `migrations/`, `seed.ts` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Fichiers Obligatoires

- [ ] **schema.prisma** - Définition du schéma ORM
- [ ] **migrations/** - Historique des migrations
- [ ] **seed.ts** - Données de test/initial

### Fichiers Optionnels

- [ ] **schema.sql** - Export SQL brut
- [ ] **triggers.sql** - Triggers et fonctions
- [ ] **indexes.sql** - Index additionnels

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Migrations versionnées | Toutes les évolutions tracées | Git | Oui |
| 2 | Rollback possible | Down migrations | Manuel | Oui |
| 3 | Seed fonctionnel | `pnpm db:seed` sans erreur | Auto | Oui |
| 4 | Conforme data-model | Toutes entités présentes | Manuel | Oui |
| 5 | Index définis | FK + recherches fréquentes | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `direction-technique/*` | `data-model` | Modèle conceptuel |
| `direction-technique/*` | `technical-specification` | Contraintes techniques |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Schema initial | Lead Dev | Review |
| 2 | Avant migration prod | DBA / Senior | Valider perf |
| 3 | Chaque migration | PR Review | Vérifier rollback |

## Exemple

### Exemple Complet

```markdown
# Database Schema - E-commerce Dupont

## Structure

```
prisma/
├── schema.prisma        # Schéma principal
├── migrations/          # Historique migrations
│   ├── 20240201_init/
│   ├── 20240215_add_orders/
│   └── 20240220_add_shipping/
├── seed.ts              # Données de test
└── seed-data/           # Fixtures JSON
    ├── categories.json
    └── products.json
```

---

## schema.prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// ENUMS
// ============================================

enum Role {
  USER
  ADMIN
}

enum OrderStatus {
  PENDING
  PAID
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}

enum AddressType {
  SHIPPING
  BILLING
}

// ============================================
// MODELS
// ============================================

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  phone     String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  orders    Order[]
  addresses Address[]
  cart      CartItem[]

  @@index([email])
  @@map("users")
}

model Category {
  id          String   @id @default(uuid())
  name        String
  slug        String   @unique
  description String?
  image       String?
  order       Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  products Product[]

  @@index([slug])
  @@index([isActive, order])
  @@map("categories")
}

model Product {
  id           String   @id @default(uuid())
  categoryId   String
  name         String
  slug         String   @unique
  description  String?
  price        Decimal  @db.Decimal(10, 2)
  comparePrice Decimal? @db.Decimal(10, 2)
  stock        Int      @default(0)
  sku          String?  @unique
  isActive     Boolean  @default(true)
  isFeatured   Boolean  @default(false)
  weight       Decimal? @db.Decimal(8, 2)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  // Relations
  category   Category       @relation(fields: [categoryId], references: [id], onDelete: Restrict)
  images     ProductImage[]
  orderItems OrderItem[]
  cartItems  CartItem[]

  @@index([categoryId])
  @@index([slug])
  @@index([isActive, isFeatured])
  @@index([sku])
  @@map("products")
}

model ProductImage {
  id        String   @id @default(uuid())
  productId String
  url       String
  alt       String?
  order     Int      @default(0)
  createdAt DateTime @default(now())

  // Relations
  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@index([productId, order])
  @@map("product_images")
}

model Address {
  id         String      @id @default(uuid())
  userId     String
  type       AddressType
  firstName  String
  lastName   String
  company    String?
  street     String
  street2    String?
  city       String
  state      String?
  postalCode String
  country    String      @default("FR")
  phone      String?
  isDefault  Boolean     @default(false)
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @updatedAt

  // Relations
  user           User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  shippingOrders Order[] @relation("ShippingAddress")
  billingOrders  Order[] @relation("BillingAddress")

  @@index([userId, type])
  @@map("addresses")
}

model Order {
  id                String      @id @default(uuid())
  userId            String
  orderNumber       String      @unique
  status            OrderStatus @default(PENDING)
  subtotal          Decimal     @db.Decimal(10, 2)
  shipping          Decimal     @default(0) @db.Decimal(10, 2)
  tax               Decimal     @default(0) @db.Decimal(10, 2)
  total             Decimal     @db.Decimal(10, 2)
  note              String?
  shippingAddressId String?
  billingAddressId  String?
  stripePaymentId   String?
  paidAt            DateTime?
  shippedAt         DateTime?
  deliveredAt       DateTime?
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt

  // Relations
  user            User        @relation(fields: [userId], references: [id], onDelete: Restrict)
  shippingAddress Address?    @relation("ShippingAddress", fields: [shippingAddressId], references: [id], onDelete: SetNull)
  billingAddress  Address?    @relation("BillingAddress", fields: [billingAddressId], references: [id], onDelete: SetNull)
  items           OrderItem[]

  @@index([userId])
  @@index([orderNumber])
  @@index([status])
  @@index([createdAt(sort: Desc)])
  @@map("orders")
}

model OrderItem {
  id        String  @id @default(uuid())
  orderId   String
  productId String
  name      String  // Snapshot du nom au moment de la commande
  price     Decimal @db.Decimal(10, 2) // Snapshot du prix
  quantity  Int
  total     Decimal @db.Decimal(10, 2)

  // Relations
  order   Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id], onDelete: Restrict)

  @@index([orderId])
  @@index([productId])
  @@map("order_items")
}

model CartItem {
  id        String   @id @default(uuid())
  userId    String
  productId String
  quantity  Int      @default(1)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([userId, productId])
  @@index([userId])
  @@map("cart_items")
}
```

---

## Migrations

### Migration initiale

```bash
# Générer la migration initiale
pnpm prisma migrate dev --name init

# Fichier généré: prisma/migrations/20240201120000_init/migration.sql
```

### Exemple de migration SQL générée

```sql
-- prisma/migrations/20240201120000_init/migration.sql

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED');
CREATE TYPE "AddressType" AS ENUM ('SHIPPING', 'BILLING');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "comparePrice" DECIMAL(10,2),
    "stock" INTEGER NOT NULL DEFAULT 0,
    "sku" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "weight" DECIMAL(8,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- ... autres tables ...

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE INDEX "users_email_idx" ON "users"("email");

CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");
CREATE INDEX "categories_slug_idx" ON "categories"("slug");
CREATE INDEX "categories_isActive_order_idx" ON "categories"("isActive", "order");

CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");
CREATE INDEX "products_categoryId_idx" ON "products"("categoryId");
CREATE INDEX "products_slug_idx" ON "products"("slug");
CREATE INDEX "products_isActive_isFeatured_idx" ON "products"("isActive", "isFeatured");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey"
  FOREIGN KEY ("categoryId") REFERENCES "categories"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
```

---

## Seed

```typescript
// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import categories from './seed-data/categories.json';
import products from './seed-data/products.json';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clean existing data (dev only!)
  if (process.env.NODE_ENV !== 'production') {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.address.deleteMany();
    await prisma.user.deleteMany();
  }

  // Create admin user
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@dupont.fr',
      password: adminPassword,
      name: 'Admin Dupont',
      role: 'ADMIN',
    },
  });
  console.log(`✓ Admin user created: ${admin.email}`);

  // Create test user
  const userPassword = await hash('user123', 12);
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: userPassword,
      name: 'Test User',
      role: 'USER',
      addresses: {
        create: {
          type: 'SHIPPING',
          firstName: 'Test',
          lastName: 'User',
          street: '123 Rue de Test',
          city: 'Paris',
          postalCode: '75001',
          country: 'FR',
          isDefault: true,
        },
      },
    },
  });
  console.log(`✓ Test user created: ${user.email}`);

  // Create categories
  const createdCategories = await Promise.all(
    categories.map((cat, index) =>
      prisma.category.create({
        data: {
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          image: cat.image,
          order: index,
          isActive: true,
        },
      })
    )
  );
  console.log(`✓ ${createdCategories.length} categories created`);

  // Create products
  const categoryMap = new Map(createdCategories.map((c) => [c.slug, c.id]));

  const createdProducts = await Promise.all(
    products.map((prod) =>
      prisma.product.create({
        data: {
          name: prod.name,
          slug: prod.slug,
          description: prod.description,
          price: prod.price,
          comparePrice: prod.comparePrice,
          stock: prod.stock,
          sku: prod.sku,
          isActive: true,
          isFeatured: prod.isFeatured || false,
          categoryId: categoryMap.get(prod.category)!,
          images: {
            create: prod.images.map((img, idx) => ({
              url: img.url,
              alt: img.alt,
              order: idx,
            })),
          },
        },
      })
    )
  );
  console.log(`✓ ${createdProducts.length} products created`);

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## Seed Data

### categories.json

```json
[
  {
    "name": "Miels",
    "slug": "miels",
    "description": "Nos miels artisanaux de Provence",
    "image": "/images/categories/miels.jpg"
  },
  {
    "name": "Confitures",
    "slug": "confitures",
    "description": "Confitures maison aux fruits de saison",
    "image": "/images/categories/confitures.jpg"
  },
  {
    "name": "Terrines",
    "slug": "terrines",
    "description": "Terrines et pâtés traditionnels",
    "image": "/images/categories/terrines.jpg"
  }
]
```

### products.json

```json
[
  {
    "name": "Miel de Lavande",
    "slug": "miel-de-lavande",
    "description": "Miel récolté dans les champs de lavande de Provence",
    "price": 12.50,
    "comparePrice": null,
    "stock": 50,
    "sku": "MIEL-LAV-250",
    "category": "miels",
    "isFeatured": true,
    "images": [
      { "url": "/images/products/miel-lavande-1.jpg", "alt": "Pot de miel de lavande" },
      { "url": "/images/products/miel-lavande-2.jpg", "alt": "Miel de lavande texture" }
    ]
  }
]
```

---

## Scripts package.json

```json
{
  "scripts": {
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:migrate:prod": "prisma migrate deploy",
    "db:push": "prisma db push",
    "db:seed": "prisma db seed",
    "db:reset": "prisma migrate reset",
    "db:studio": "prisma studio"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Pas de migrations | Pas de traçabilité | Toujours migrer |
| Migration manuelle en prod | Risque d'erreur | Script automatisé |
| Seed en prod | Écrasement données | Guard NODE_ENV |
| Pas d'index FK | Performance | Index sur toutes les FK |

## Références

- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [PostgreSQL Best Practices](https://wiki.postgresql.org/wiki/Don%27t_Do_This)
- Livrables liés : `data-model`, `api-specification`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | backend-developer | Création initiale |
