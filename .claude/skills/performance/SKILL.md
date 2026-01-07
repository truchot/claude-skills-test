---
name: performance
description: Performance web - Core Web Vitals, optimisation, profiling
tags: [performance, web-vitals, optimization, lighthouse]
---

# Performance

## Quand Utiliser

- Optimiser les Core Web Vitals
- Réduire la taille des bundles
- Implémenter le caching
- Profiler et diagnostiquer

## Core Web Vitals

| Métrique | Bon | Description |
|----------|-----|-------------|
| **LCP** | < 2.5s | Largest Contentful Paint |
| **INP** | < 200ms | Interaction to Next Paint |
| **CLS** | < 0.1 | Cumulative Layout Shift |

## Mesurer

```typescript
// web-vitals
import { onLCP, onINP, onCLS } from 'web-vitals';

onLCP(console.log);
onINP(console.log);
onCLS(console.log);

// Performance API
const entries = performance.getEntriesByType('navigation');
const paintEntries = performance.getEntriesByType('paint');
```

## Images

```tsx
// Next.js Image
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Au-dessus du fold
  placeholder="blur"
  blurDataURL={blurUrl}
/>

// Lazy loading natif
<img src="image.jpg" loading="lazy" alt="..." />

// Formats modernes
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="..." />
</picture>
```

## Code Splitting

```tsx
// React lazy
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}

// Route-based splitting (Next.js automatique)
// Dynamic imports
const { heavyFunction } = await import('./heavy-module');
```

## Bundle Optimization

```typescript
// Vite/Webpack - Analyser
// npx vite-bundle-visualizer
// npx webpack-bundle-analyzer

// Tree shaking - imports nommés
import { specific } from 'large-library'; // ✅
import _ from 'lodash'; // ❌

// Alternatives légères
// moment → date-fns ou dayjs
// lodash → lodash-es ou natif
```

## Fonts

```tsx
// Next.js
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// Preload
<link
  rel="preload"
  href="/fonts/custom.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>

// font-display
@font-face {
  font-family: 'Custom';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap; /* ou optional */
}
```

## Caching

```typescript
// HTTP Headers
Cache-Control: public, max-age=31536000, immutable  // Assets statiques
Cache-Control: no-cache  // HTML dynamique
Cache-Control: private, max-age=3600  // Données utilisateur

// Service Worker
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
```

## React Performance

```tsx
// memo
const ExpensiveList = memo(function ExpensiveList({ items }) {
  return items.map(item => <Item key={item.id} {...item} />);
});

// useMemo
const sortedItems = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);

// useCallback
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Virtualization
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={400}
  width={300}
  itemCount={1000}
  itemSize={35}
>
  {({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  )}
</FixedSizeList>
```

## Database

```sql
-- Index
CREATE INDEX idx_posts_user_date ON posts(user_id, created_at DESC);

-- Explain
EXPLAIN ANALYZE SELECT * FROM posts WHERE user_id = 1;

-- Pagination cursor (plus efficace que OFFSET)
SELECT * FROM posts
WHERE created_at < $cursor
ORDER BY created_at DESC
LIMIT 20;
```

## API

```typescript
// Compression
import compression from 'compression';
app.use(compression());

// Pagination
GET /api/posts?cursor=abc&limit=20

// Fields selection
GET /api/users?fields=id,name,email

// Caching
res.setHeader('Cache-Control', 'public, s-maxage=60');
```

## Preload/Prefetch

```html
<!-- Précharger ressource critique -->
<link rel="preload" href="/critical.js" as="script" />
<link rel="preload" href="/hero.jpg" as="image" />

<!-- Précharger prochaine navigation -->
<link rel="prefetch" href="/next-page.js" />

<!-- DNS prefetch -->
<link rel="dns-prefetch" href="//api.example.com" />

<!-- Preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
```

## Profiling

```typescript
// React DevTools Profiler
<Profiler id="Component" onRender={onRenderCallback}>
  <Component />
</Profiler>

function onRenderCallback(
  id, phase, actualDuration, baseDuration,
  startTime, commitTime
) {
  console.log({ id, phase, actualDuration });
}

// Chrome DevTools
// Performance tab → Record
// Network tab → Throttling
// Lighthouse → Audit
```

## Anti-patterns

- ❌ Images non optimisées
- ❌ Bundle monolithique
- ❌ Pas de lazy loading
- ❌ Re-renders inutiles
- ❌ N+1 database queries

## Checklist

- [ ] LCP < 2.5s
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] Images optimisées (WebP/AVIF)
- [ ] Code splitting
- [ ] Caching approprié
