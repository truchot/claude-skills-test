---
name: nextjs-expert
description: >-
  Expert Next.js 14+ pour App Router, Server Components et optimisation.
  TRIGGER when: fichiers next.config, dossier app/, Server Components, Server Actions.
---

## Domaines d'expertise

- **App Router** - Routes, layouts, templates, navigation, error handling (voir `app-router.md`)
- **Server Components** - Server vs Client, async components, streaming, composition (voir `server-components.md`)
- **Data fetching** - fetch serveur, Server Actions, revalidation, client fetching (voir `data-fetching.md`)
- **Rendering** - SSR, SSG, ISR, middleware, Edge Runtime
- **Optimisation** - Images, fonts, bundle, caching, Core Web Vitals
- **Deploiement** - Vercel, Docker, variables d'env, CI/CD (voir `deployment.md`)
- **Testing** - Jest/Vitest pour Next.js, RTL, Playwright, MSW

## Patterns essentiels

### App Router
- Structure fichiers: `app/`, `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
- Segments dynamiques: `[slug]`, `[...catchAll]`, `[[...optional]]`
- Route Groups: `(marketing)`, `(auth)` pour organiser sans affecter l'URL
- Parallel Routes: `@modal`, `@sidebar` pour slots de contenu
- Intercepting Routes: `(.)photo`, `(..)modal` pour modales avec URL

### Server Components (defaut)
- Pas de `"use client"` = Server Component
- Acces direct a la DB, API, fichiers cote serveur
- Zero JS envoye au client pour ces composants
- Async/await directement dans le composant

### Client Components
- `"use client"` en haut du fichier
- Necessaire pour: hooks, event handlers, browser APIs, state
- Pousser le `"use client"` le plus bas possible dans l'arbre

### Data fetching
- fetch() dans Server Components avec options de cache
- Server Actions: `"use server"`, mutations, form actions
- revalidatePath / revalidateTag apres mutation
- React Query/SWR pour client-side fetching

### Rendering strategies
- **SSG**: `generateStaticParams()` pour pages statiques au build
- **SSR**: `export const dynamic = 'force-dynamic'`
- **ISR**: `export const revalidate = 3600` (secondes)
- **Middleware**: `middleware.ts` a la racine, NextResponse, redirects

### Optimisation
- `next/image`: format auto, lazy loading, priority pour LCP, sizes
- `next/font`: Google Fonts ou local, display swap, subsets
- Bundle: `@next/bundle-analyzer`, dynamic imports
- Cache: fetch cache, Data Cache, Full Route Cache, Router Cache

## Anti-patterns critiques

- `"use client"` sur des composants qui n'en ont pas besoin
- fetch sans gestion d'erreur dans Server Components
- Ignorer les strategies de cache (tout en force-dynamic)
- Ne pas utiliser `generateStaticParams` pour pages statiques connues
- Layouts qui refetch des donnees a chaque navigation
- Images sans dimensions ou sans priority sur le LCP
- Variables d'env sensibles exposees cote client (sans `NEXT_PUBLIC_`)

## Escalation

- **react-expert**: patterns React generiques, hooks, state management
- **frontend-developer**: CSS/HTML, JS/TS generique, accessibilite
- **backend-developer**: logique serveur, base de donnees, auth
- **design-system**: tokens, composants atomiques
