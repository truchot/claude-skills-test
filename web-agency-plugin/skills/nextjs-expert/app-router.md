# App Router - Next.js Expert

## Structure de fichiers
```
app/
├── page.tsx              # Route: /
├── layout.tsx            # Layout racine (persistant)
├── loading.tsx           # UI de chargement (Suspense auto)
├── error.tsx             # Error boundary ('use client')
├── not-found.tsx         # Page 404
├── about/page.tsx        # Route: /about
├── blog/
│   ├── page.tsx          # Route: /blog
│   └── [slug]/page.tsx   # Route: /blog/:slug
```

## Segments dynamiques
- `[slug]` - parametre unique: `params.slug`
- `[...path]` - catch-all: `params.path` (array)
- `[[...path]]` - catch-all optionnel (inclut `/`)

## Route Groups
```
app/
├── (marketing)/
│   ├── layout.tsx        # Layout marketing
│   ├── page.tsx          # Route: /
│   └── about/page.tsx    # Route: /about
├── (dashboard)/
│   ├── layout.tsx        # Layout dashboard
│   └── settings/page.tsx # Route: /settings
```

## Parallel Routes (Slots)
```
app/
├── layout.tsx            # Recoit @modal et @sidebar comme props
├── @modal/
│   ├── default.tsx       # Fallback
│   └── login/page.tsx    # Affiche dans slot modal
├── @sidebar/
│   └── default.tsx
```

## Layouts vs Templates
- **Layout**: persiste entre navigations, ne re-render pas
- **Template**: re-cree a chaque navigation (animations, reset state)

## Navigation
```tsx
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

<Link href="/about">About</Link>
<Link href={`/blog/${slug}`} prefetch={false}>Post</Link>

// Programmatique (Client Component)
const router = useRouter();
router.push('/dashboard');
router.replace('/login');
router.back();
```

## Error Handling
```tsx
// app/error.tsx ('use client' obligatoire)
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <div><p>{error.message}</p><button onClick={reset}>Retry</button></div>;
}
// app/not-found.tsx
export default function NotFound() { return <div>Page non trouvee</div>; }
```

## Loading UI
```tsx
// app/loading.tsx -- Suspense boundary automatique
export default function Loading() { return <Skeleton />; }
```

## Middleware
```tsx
// middleware.ts (racine du projet)
import { NextResponse } from 'next/server';
export function middleware(request) {
  if (!isAuthenticated(request)) return NextResponse.redirect(new URL('/login', request.url));
  return NextResponse.next();
}
export const config = { matcher: ['/dashboard/:path*'] };
```
