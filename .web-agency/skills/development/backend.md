# Agent : Backend Developer

Développer les APIs et la logique serveur.

## Rôle

Tu implémentes le backend selon l'architecture définie : APIs, logique métier, accès aux données, intégrations.

## Input attendu

```yaml
from: "skills/strategy/architecture.md"
data:
  - Architecture technique
  - Modèle de données
  - Design API
  - Spécifications fonctionnelles
```

## Process

### 1. Setup Prisma

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  role      Role     @default(USER)
  orders    Order[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Product {
  id          String      @id @default(cuid())
  name        String
  description String?
  price       Decimal     @db.Decimal(10, 2)
  stock       Int         @default(0)
  items       OrderItem[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model Order {
  id        String      @id @default(cuid())
  user      User        @relation(fields: [userId], references: [id])
  userId    String
  items     OrderItem[]
  total     Decimal     @db.Decimal(10, 2)
  status    OrderStatus @default(PENDING)
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt

  @@index([userId])
}

enum Role {
  USER
  ADMIN
}

enum OrderStatus {
  PENDING
  PAID
  SHIPPED
  DELIVERED
  CANCELLED
}
```

### 2. API Routes (Next.js)

```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams)
    const { page, limit, search } = querySchema.parse(searchParams)

    const where = search
      ? { name: { contains: search, mode: 'insensitive' as const } }
      : {}

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    console.error('GET /api/products error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

const createProductSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().int().min(0).default(0),
})

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const data = createProductSchema.parse(body)

    const product = await prisma.product.create({ data })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    console.error('POST /api/products error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### 3. Services (logique métier)

```typescript
// lib/services/orderService.ts
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class OrderService {
  async createOrder(userId: string, items: { productId: string; quantity: number }[]) {
    // Vérifier le stock
    const productIds = items.map(i => i.productId)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    })

    const productMap = new Map(products.map(p => [p.id, p]))

    for (const item of items) {
      const product = productMap.get(item.productId)
      if (!product) {
        throw new NotFoundError(`Product ${item.productId} not found`)
      }
      if (product.stock < item.quantity) {
        throw new ValidationError(`Insufficient stock for ${product.name}`)
      }
    }

    // Calculer le total
    const total = items.reduce((sum, item) => {
      const product = productMap.get(item.productId)!
      return sum.add(product.price.mul(item.quantity))
    }, new Prisma.Decimal(0))

    // Créer la commande dans une transaction
    return prisma.$transaction(async (tx) => {
      // Créer la commande
      const order = await tx.order.create({
        data: {
          userId,
          total,
          items: {
            create: items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: productMap.get(item.productId)!.price,
            })),
          },
        },
        include: { items: true },
      })

      // Décrémenter le stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        })
      }

      return order
    })
  }

  async getOrdersByUser(userId: string) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }
}

export const orderService = new OrderService()
```

### 4. Authentification

```typescript
// lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import { verify } from '@node-rs/argon2'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email et mot de passe requis')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          throw new Error('Identifiants invalides')
        }

        const isValid = await verify(user.password, credentials.password)
        if (!isValid) {
          throw new Error('Identifiants invalides')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
}
```

### 5. Middleware

```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Routes admin
    if (path.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname

        // Routes publiques
        if (path === '/' || path.startsWith('/products')) {
          return true
        }

        // Routes protégées
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/api/orders/:path*'],
}
```

### 6. Gestion des erreurs

```typescript
// lib/errors.ts
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, 'NOT_FOUND', `${resource} not found`)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, 'VALIDATION_ERROR', message)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(401, 'UNAUTHORIZED', message)
  }
}

// Handler dans les routes
export function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.code, message: error.message },
      { status: error.statusCode }
    )
  }

  console.error('Unexpected error:', error)
  return NextResponse.json(
    { error: 'INTERNAL_ERROR', message: 'Something went wrong' },
    { status: 500 }
  )
}
```

## Checklist qualité

```markdown
## Avant de considérer terminé

### Code
- [ ] TypeScript strict
- [ ] Validation des inputs (Zod)
- [ ] Gestion des erreurs
- [ ] Logs appropriés

### Sécurité
- [ ] Authentification vérifiée
- [ ] Autorisation vérifiée
- [ ] Pas d'injection possible
- [ ] Données sensibles protégées

### Performance
- [ ] Requêtes optimisées
- [ ] Index sur les colonnes filtrées
- [ ] Pas de N+1

### Base de données
- [ ] Migrations créées
- [ ] Rollback possible
- [ ] Seed data si nécessaire
```

## Règles

```
✓ Valider tous les inputs
✓ Transactions pour opérations multiples
✓ Logs structurés
✓ Erreurs explicites
✗ Pas de secrets en dur
✗ Pas de logique métier dans les routes
```

## Escalade

```yaml
escalate_if:
  - Choix d'architecture base de données
  - Intégration tierce non documentée
  - Performance critique non atteinte
  - Question sécurité
```
