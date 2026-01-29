# Contexte Backend

Connaissances essentielles pour le développement backend.

## Stack par défaut

```
Node.js 20+
TypeScript (strict mode)
Prisma (ORM)
PostgreSQL
```

## Structure de projet

```
src/
├── index.ts           # Entry point
├── server.ts          # Configuration serveur
├── routes/            # Définition des routes
│   ├── index.ts
│   ├── users.ts
│   └── products.ts
├── controllers/       # Logique des handlers
│   ├── userController.ts
│   └── productController.ts
├── services/          # Logique métier
│   ├── userService.ts
│   └── productService.ts
├── repositories/      # Accès données
│   └── userRepository.ts
├── middleware/        # Middleware Express/Hono
│   ├── auth.ts
│   └── errorHandler.ts
├── utils/             # Utilitaires
│   └── validation.ts
└── types/             # Types TypeScript
    └── index.ts
```

## API Routes (Next.js App Router)

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const user = await prisma.user.create({ data: body })
  return NextResponse.json(user, { status: 201 })
}

// app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: params.id }
  })
  if (!user) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(user)
}
```

## Prisma

### Schema

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
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([authorId])
}
```

### Queries courantes

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Create
const user = await prisma.user.create({
  data: { email: 'test@example.com', name: 'Test' }
})

// Read
const users = await prisma.user.findMany({
  where: { email: { contains: '@example.com' } },
  include: { posts: true },
  orderBy: { createdAt: 'desc' },
  take: 10,
  skip: 0
})

// Update
const updated = await prisma.user.update({
  where: { id: 'xxx' },
  data: { name: 'New Name' }
})

// Delete
await prisma.user.delete({
  where: { id: 'xxx' }
})

// Transaction
await prisma.$transaction([
  prisma.post.deleteMany({ where: { authorId: 'xxx' } }),
  prisma.user.delete({ where: { id: 'xxx' } })
])
```

### Migrations

```bash
# Créer une migration
npx prisma migrate dev --name add_user_role

# Appliquer en production
npx prisma migrate deploy

# Reset DB (dev only)
npx prisma migrate reset

# Générer le client
npx prisma generate
```

## Validation

### Avec Zod

```typescript
import { z } from 'zod'

// Définir le schema
const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  age: z.number().int().positive().optional(),
})

type User = z.infer<typeof UserSchema>

// Valider
function createUser(data: unknown) {
  const result = UserSchema.safeParse(data)
  if (!result.success) {
    throw new ValidationError(result.error.issues)
  }
  return prisma.user.create({ data: result.data })
}

// Schemas courants
const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

const IdParamSchema = z.object({
  id: z.string().cuid(),
})
```

## Authentification

### JWT Pattern

```typescript
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

// Générer un token
function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}

// Vérifier un token
function verifyToken(token: string): { userId: string } {
  return jwt.verify(token, JWT_SECRET) as { userId: string }
}

// Middleware d'authentification
async function authMiddleware(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = verifyToken(token)
    // Attacher l'utilisateur à la requête
    return payload
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}
```

## Error Handling

```typescript
// Types d'erreurs personnalisées
class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string
  ) {
    super(message)
  }
}

class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, 'NOT_FOUND', `${resource} not found`)
  }
}

class ValidationError extends AppError {
  constructor(public errors: unknown[]) {
    super(400, 'VALIDATION_ERROR', 'Validation failed')
  }
}

// Handler global
function errorHandler(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json(
      { code: error.code, message: error.message },
      { status: error.statusCode }
    )
  }

  console.error('Unexpected error:', error)
  return NextResponse.json(
    { code: 'INTERNAL_ERROR', message: 'Something went wrong' },
    { status: 500 }
  )
}
```

## Patterns

### Repository Pattern

```typescript
// repositories/userRepository.ts
export const userRepository = {
  findById: (id: string) => prisma.user.findUnique({ where: { id } }),
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
  create: (data: CreateUserDto) => prisma.user.create({ data }),
  update: (id: string, data: UpdateUserDto) =>
    prisma.user.update({ where: { id }, data }),
  delete: (id: string) => prisma.user.delete({ where: { id } }),
}

// Utilisation
const user = await userRepository.findById('xxx')
```

### Service Pattern

```typescript
// services/userService.ts
export const userService = {
  async register(data: RegisterDto) {
    const existing = await userRepository.findByEmail(data.email)
    if (existing) {
      throw new AppError(409, 'EMAIL_EXISTS', 'Email already registered')
    }

    const hashedPassword = await hash(data.password)
    const user = await userRepository.create({
      ...data,
      password: hashedPassword,
    })

    return { user, token: generateToken(user.id) }
  },

  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email)
    if (!user || !await verify(password, user.password)) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password')
    }

    return { user, token: generateToken(user.id) }
  }
}
```

## Variables d'environnement

```bash
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
JWT_SECRET="your-secret-key-min-32-chars"
NODE_ENV="development"
```

```typescript
// env.ts - Validation avec Zod
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production', 'test']),
})

export const env = envSchema.parse(process.env)
```
