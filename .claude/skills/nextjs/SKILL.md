---
name: nextjs
description: Next.js - App Router, Server Components, data fetching
tags: [nextjs, react, ssr, server-components, routing]
---

# Next.js

## Quand Utiliser

- Applications React avec SSR/SSG
- Routing basé sur le filesystem
- Server Components et Server Actions
- Optimisations automatiques (images, fonts)

## Principes Clés

- Server-first avec App Router
- Server Components par défaut
- Client Components seulement si nécessaire
- Streaming et Suspense natifs

## App Router Structure

```
app/
├── layout.tsx          # Layout racine
├── page.tsx            # Route /
├── loading.tsx         # Loading UI
├── error.tsx           # Error boundary
├── not-found.tsx       # 404
├── dashboard/
│   ├── layout.tsx      # Layout dashboard
│   ├── page.tsx        # Route /dashboard
│   └── [id]/
│       └── page.tsx    # Route /dashboard/:id
└── api/
    └── users/
        └── route.ts    # API /api/users
```

## Server Components

```tsx
// Par défaut dans App Router
async function ProductList() {
  const products = await db.products.findMany();

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

## Client Components

```tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}
```

## Data Fetching

### Server Component

```tsx
async function Page({ params }: { params: { id: string } }) {
  const product = await fetch(`/api/products/${params.id}`, {
    cache: 'force-cache',      // SSG
    // cache: 'no-store',      // SSR
    // next: { revalidate: 60 } // ISR
  }).then(r => r.json());

  return <ProductDetails product={product} />;
}
```

### Parallel Data Fetching

```tsx
async function Dashboard() {
  const [users, posts, stats] = await Promise.all([
    getUsers(),
    getPosts(),
    getStats()
  ]);

  return (
    <>
      <UserList users={users} />
      <PostList posts={posts} />
      <Stats data={stats} />
    </>
  );
}
```

## Server Actions

```tsx
// actions.ts
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');

  await db.posts.create({ data: { title, content } });
  revalidatePath('/posts');
}

// page.tsx
import { createPost } from './actions';

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" />
      <textarea name="content" />
      <button type="submit">Create</button>
    </form>
  );
}
```

## Layouts

```tsx
// app/layout.tsx
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

## Loading et Error

```tsx
// loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}

// error.tsx
'use client';

export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## Route Handlers (API)

```tsx
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await db.users.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.users.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}
```

## Metadata

```tsx
// Static
export const metadata = {
  title: 'My App',
  description: 'Description'
};

// Dynamic
export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);
  return {
    title: product.name,
    description: product.description
  };
}
```

## Middleware

```tsx
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*'
};
```

## Anti-patterns

- ❌ `use client` partout
- ❌ Fetch dans les Client Components
- ❌ Pas de loading/error states
- ❌ Ignorer le caching
- ❌ getServerSideProps (Pages Router)

## Checklist

- [ ] Server Components par défaut
- [ ] Client Components minimaux
- [ ] Loading et Error UI
- [ ] Metadata pour SEO
- [ ] Caching approprié
