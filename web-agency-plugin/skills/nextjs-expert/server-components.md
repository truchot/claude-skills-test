# Server Components - Next.js Expert

## Server vs Client - Criteres de decision

### Server Component (defaut, pas de directive)
- Affichage de donnees (fetch DB, API)
- Acces ressources backend (filesystem, secrets)
- Reduire le JS envoye au client
- Composant sans interactivite

### Client Component (`"use client"`)
- Hooks React (useState, useEffect, etc.)
- Event handlers (onClick, onChange)
- Browser APIs (localStorage, geolocation)
- Composants interactifs (formulaires, modales)

## Regles
1. Par defaut tout est Server Component
2. `"use client"` le plus bas possible dans l'arbre
3. Server Components peuvent importer Client Components
4. Client Components NE PEUVENT PAS importer Server Components (passer en children)

## Async Server Components
```tsx
// Pas besoin de useEffect/useState pour les donnees
async function ProductPage({ params }: { params: { id: string } }) {
  const product = await db.product.findUnique({ where: { id: params.id } });
  return <div><h1>{product.name}</h1><p>{product.description}</p></div>;
}
```

## Composition pattern
```tsx
// Layout (Server) passe Server Component en children a Client Component
// app/layout.tsx (Server)
export default function Layout({ children }) {
  return <ClientSidebar>{children}</ClientSidebar>;
}
// components/ClientSidebar.tsx
'use client';
export function ClientSidebar({ children }) {
  const [open, setOpen] = useState(true);
  return <div><button onClick={() => setOpen(!open)}>Toggle</button>{children}</div>;
}
```

## Streaming avec Suspense
```tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />  {/* Async Server Component -- streame quand pret */}
      </Suspense>
      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart />
      </Suspense>
    </div>
  );
}
```

## Anti-patterns
- `"use client"` sur un composant qui ne fait qu'afficher des donnees
- Importer un Server Component dans un Client Component
- Ne pas utiliser Suspense pour les composants async lents
- Passer des fonctions non-serialisables de Server a Client Components
