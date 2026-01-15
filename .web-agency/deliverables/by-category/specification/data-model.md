---
id: data-model
name: Modèle de Données
version: 1.0.0
category: specification
status: active
phase: "3-conception"
order: 3
agents:
  - direction-technique/specification/modelisation-donnees
  - backend-developer/database/modeling
consumes:
  - requirements-list
  - technical-specification
produces_for:
  - backend-developer/database/migrations
  - backend-developer/api/rest-design
  - direction-technique/specification/specification-api
tags: [database, schema, erd, entities, relations, data]
---

# Modèle de Données

## Description

Définition complète du schéma de données : entités, attributs, relations, contraintes et index. Ce document sert de référence pour la création de la base de données et guide le développement des APIs.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown + Diagramme ERD |
| **Emplacement** | `projects/[client-slug]/03-conception/data-model.md` |
| **Nommage** | `data-model.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Diagramme ERD** - Vue graphique des entités et relations
- [ ] **Entités** - Description détaillée de chaque table
- [ ] **Relations** - Cardinalités et contraintes
- [ ] **Types de données** - Mapping types métier → types BDD
- [ ] **Index** - Index de performance

### Sections Optionnelles

- [ ] **Données de référence** - Valeurs enum, lookup tables
- [ ] **Historisation** - Stratégie d'audit trail
- [ ] **Partitionnement** - Si gros volumes
- [ ] **Migrations** - Plan de migration existant

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | ERD présent | Diagramme lisible | Manuel | Oui |
| 2 | Entités documentées | Toutes les entités décrites | Manuel | Oui |
| 3 | Clés primaires | Chaque entité a une PK | Manuel | Oui |
| 4 | Relations définies | Cardinalités explicites | Manuel | Oui |
| 5 | Types précis | Pas de VARCHAR sans taille | Manuel | Oui |
| 6 | Index justifiés | Index sur FK et recherches | Manuel | Non |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `client-intake/*` | `requirements-list` | Entités métier |
| `direction-technique/*` | `technical-specification` | Contraintes techniques |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Draft ERD | Lead Dev | Challenger le modèle |
| 2 | Détail entités | DBA / Senior Dev | Optimiser |
| 3 | Review finale | Équipe dev | Valider compréhension |

## Exemple

### Exemple Complet

```markdown
---
projet: ecommerce-dupont
version: 1.0
date: 2024-02-05
auteur: Thomas Bernard
orm: Prisma
database: PostgreSQL 15
---

# Modèle de Données
## Site E-commerce Dupont

---

## 1. Diagramme ERD

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     Category    │       │     Product     │       │   ProductImage  │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ PK id           │───┐   │ PK id           │───┐   │ PK id           │
│    name         │   │   │ FK categoryId   │◄──┘   │ FK productId    │◄──┘
│    slug         │   │   │    name         │       │    url          │
│    description  │   │   │    slug         │       │    alt          │
│    image        │   └──►│    description  │       │    order        │
│    order        │       │    price        │       │    createdAt    │
│    createdAt    │       │    comparePrice │       └─────────────────┘
│    updatedAt    │       │    stock        │
└─────────────────┘       │    sku          │       ┌─────────────────┐
                          │    isActive     │       │   OrderItem     │
┌─────────────────┐       │    isFeatured   │       ├─────────────────┤
│      User       │       │    weight       │   ┌──►│ PK id           │
├─────────────────┤       │    createdAt    │   │   │ FK orderId      │◄──┐
│ PK id           │───┐   │    updatedAt    │   │   │ FK productId    │◄──┤
│    email        │   │   └────────┬────────┘   │   │    quantity     │   │
│    password     │   │            │            │   │    unitPrice    │   │
│    name         │   │            └────────────┼───│    total        │   │
│    phone        │   │                         │   └─────────────────┘   │
│    role         │   │   ┌─────────────────┐   │                         │
│    createdAt    │   │   │      Order      │   │                         │
│    updatedAt    │   │   ├─────────────────┤   │                         │
└────────┬────────┘   │   │ PK id           │───┘                         │
         │            │   │ FK userId       │◄──┐                         │
         │            └──►│    orderNumber  │   │                         │
         │                │    status       │   │    ┌─────────────────┐  │
         │                │    subtotal     │   │    │     Address     │  │
         │                │    shipping     │   │    ├─────────────────┤  │
         │                │    tax          │   │    │ PK id           │  │
         │                │    total        │   └───►│ FK userId       │◄─┘
         │                │    note         │        │    type         │
         │                │ FK shippingAddrId│◄──────│    firstName    │
         │                │ FK billingAddrId │◄──────│    lastName     │
         │                │    paidAt       │        │    street       │
         │                │    shippedAt    │        │    city         │
         │                │    createdAt    │        │    postalCode   │
         └───────────────►│    updatedAt    │        │    country      │
                          └─────────────────┘        │    isDefault    │
                                                     └─────────────────┘
```

---

## 2. Entités

### 2.1 User (Utilisateur)

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | UUID | PK, default uuid_generate_v4() | Identifiant unique |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Email de connexion |
| `password` | VARCHAR(255) | NOT NULL | Hash bcrypt |
| `name` | VARCHAR(100) | NOT NULL | Nom complet |
| `phone` | VARCHAR(20) | NULL | Téléphone |
| `role` | ENUM | NOT NULL, default 'user' | 'user' \| 'admin' |
| `createdAt` | TIMESTAMP | NOT NULL, default NOW() | Date création |
| `updatedAt` | TIMESTAMP | NOT NULL | Date modification |

**Index :**
- `idx_user_email` UNIQUE sur `email`

**Prisma Schema :**
```prisma
model User {
  id        String    @id @default(uuid())
  email     String    @unique
  password  String
  name      String
  phone     String?
  role      Role      @default(USER)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  orders    Order[]
  addresses Address[]
}

enum Role {
  USER
  ADMIN
}
```

---

### 2.2 Category (Catégorie)

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | UUID | PK | Identifiant unique |
| `name` | VARCHAR(100) | NOT NULL | Nom de la catégorie |
| `slug` | VARCHAR(100) | UNIQUE, NOT NULL | URL-friendly |
| `description` | TEXT | NULL | Description |
| `image` | VARCHAR(500) | NULL | URL image |
| `order` | INTEGER | NOT NULL, default 0 | Ordre d'affichage |
| `createdAt` | TIMESTAMP | NOT NULL | Date création |
| `updatedAt` | TIMESTAMP | NOT NULL | Date modification |

**Index :**
- `idx_category_slug` UNIQUE sur `slug`

**Prisma Schema :**
```prisma
model Category {
  id          String    @id @default(uuid())
  name        String
  slug        String    @unique
  description String?
  image       String?
  order       Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  products    Product[]
}
```

---

### 2.3 Product (Produit)

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | UUID | PK | Identifiant unique |
| `categoryId` | UUID | FK → Category, NOT NULL | Catégorie |
| `name` | VARCHAR(200) | NOT NULL | Nom du produit |
| `slug` | VARCHAR(200) | UNIQUE, NOT NULL | URL-friendly |
| `description` | TEXT | NULL | Description longue |
| `price` | DECIMAL(10,2) | NOT NULL | Prix de vente |
| `comparePrice` | DECIMAL(10,2) | NULL | Prix barré |
| `stock` | INTEGER | NOT NULL, default 0 | Quantité en stock |
| `sku` | VARCHAR(50) | UNIQUE, NULL | Référence interne |
| `isActive` | BOOLEAN | NOT NULL, default true | Visible sur le site |
| `isFeatured` | BOOLEAN | NOT NULL, default false | Mis en avant |
| `weight` | DECIMAL(8,2) | NULL | Poids en kg |
| `createdAt` | TIMESTAMP | NOT NULL | Date création |
| `updatedAt` | TIMESTAMP | NOT NULL | Date modification |

**Index :**
- `idx_product_slug` UNIQUE sur `slug`
- `idx_product_sku` UNIQUE sur `sku` (WHERE NOT NULL)
- `idx_product_category` sur `categoryId`
- `idx_product_active_featured` sur `(isActive, isFeatured)`

**Prisma Schema :**
```prisma
model Product {
  id           String    @id @default(uuid())
  categoryId   String
  name         String
  slug         String    @unique
  description  String?
  price        Decimal   @db.Decimal(10, 2)
  comparePrice Decimal?  @db.Decimal(10, 2)
  stock        Int       @default(0)
  sku          String?   @unique
  isActive     Boolean   @default(true)
  isFeatured   Boolean   @default(false)
  weight       Decimal?  @db.Decimal(8, 2)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  category     Category       @relation(fields: [categoryId], references: [id])
  images       ProductImage[]
  orderItems   OrderItem[]

  @@index([categoryId])
  @@index([isActive, isFeatured])
}
```

---

### 2.4 Order (Commande)

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | UUID | PK | Identifiant unique |
| `userId` | UUID | FK → User, NOT NULL | Client |
| `orderNumber` | VARCHAR(20) | UNIQUE, NOT NULL | Numéro commande |
| `status` | ENUM | NOT NULL, default 'pending' | Statut |
| `subtotal` | DECIMAL(10,2) | NOT NULL | Sous-total HT |
| `shipping` | DECIMAL(10,2) | NOT NULL, default 0 | Frais de port |
| `tax` | DECIMAL(10,2) | NOT NULL, default 0 | TVA |
| `total` | DECIMAL(10,2) | NOT NULL | Total TTC |
| `note` | TEXT | NULL | Note client |
| `shippingAddressId` | UUID | FK → Address | Adresse livraison |
| `billingAddressId` | UUID | FK → Address | Adresse facturation |
| `paidAt` | TIMESTAMP | NULL | Date paiement |
| `shippedAt` | TIMESTAMP | NULL | Date expédition |
| `createdAt` | TIMESTAMP | NOT NULL | Date création |
| `updatedAt` | TIMESTAMP | NOT NULL | Date modification |

**Statuts possibles :**
```
pending → paid → processing → shipped → delivered
                    ↓
                cancelled
                    ↓
                refunded
```

**Index :**
- `idx_order_number` UNIQUE sur `orderNumber`
- `idx_order_user` sur `userId`
- `idx_order_status` sur `status`
- `idx_order_created` sur `createdAt DESC`

**Prisma Schema :**
```prisma
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
  paidAt            DateTime?
  shippedAt         DateTime?
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt

  user              User        @relation(fields: [userId], references: [id])
  shippingAddress   Address?    @relation("ShippingAddress", fields: [shippingAddressId], references: [id])
  billingAddress    Address?    @relation("BillingAddress", fields: [billingAddressId], references: [id])
  items             OrderItem[]

  @@index([userId])
  @@index([status])
  @@index([createdAt(sort: Desc)])
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
```

---

### 2.5 Address (Adresse)

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | UUID | PK | Identifiant unique |
| `userId` | UUID | FK → User, NOT NULL | Propriétaire |
| `type` | ENUM | NOT NULL | 'shipping' \| 'billing' |
| `firstName` | VARCHAR(50) | NOT NULL | Prénom |
| `lastName` | VARCHAR(50) | NOT NULL | Nom |
| `street` | VARCHAR(200) | NOT NULL | Rue |
| `city` | VARCHAR(100) | NOT NULL | Ville |
| `postalCode` | VARCHAR(20) | NOT NULL | Code postal |
| `country` | VARCHAR(2) | NOT NULL, default 'FR' | Code pays ISO |
| `isDefault` | BOOLEAN | NOT NULL, default false | Par défaut |

---

## 3. Relations

| Relation | Cardinalité | Contraintes |
|----------|-------------|-------------|
| User → Order | 1:N | ON DELETE RESTRICT |
| User → Address | 1:N | ON DELETE CASCADE |
| Category → Product | 1:N | ON DELETE RESTRICT |
| Product → ProductImage | 1:N | ON DELETE CASCADE |
| Product → OrderItem | 1:N | ON DELETE RESTRICT |
| Order → OrderItem | 1:N | ON DELETE CASCADE |
| Order → Address (shipping) | N:1 | ON DELETE SET NULL |
| Order → Address (billing) | N:1 | ON DELETE SET NULL |

---

## 4. Données de Référence

### 4.1 Catégories Initiales

| Slug | Nom | Ordre |
|------|-----|-------|
| `miels` | Miels | 1 |
| `confitures` | Confitures | 2 |
| `terrines` | Terrines | 3 |
| `vins` | Vins | 4 |
| `coffrets` | Coffrets cadeaux | 5 |

### 4.2 Pays Supportés

```sql
-- Livraison France métropolitaine uniquement pour v1
INSERT INTO allowed_countries VALUES ('FR');
```

---

## 5. Règles Métier

| Règle | Implémentation |
|-------|----------------|
| Stock jamais négatif | CHECK (stock >= 0) |
| Prix positif | CHECK (price > 0) |
| Commande minimum | Application (panier ≥ 20€) |
| Frais de port | Gratuit si total ≥ 50€ |
| Numéro commande | Format: `ORD-{YYYYMMDD}-{XXXX}` |
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Pas de PK définie | Intégrité impossible | Toujours une PK |
| VARCHAR sans taille | Incohérence | Définir la taille max |
| Pas d'index sur FK | Performance dégradée | Index sur toutes les FK |
| Enum dans le code seul | Données incohérentes | Enum en BDD ou check |
| Dates en VARCHAR | Tri/comparaison impossibles | Toujours TIMESTAMP |

## Références

- [Database Normalization](https://en.wikipedia.org/wiki/Database_normalization)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- Livrables liés : `technical-specification`, `api-specification`, `database-schema`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | direction-technique | Création initiale |
