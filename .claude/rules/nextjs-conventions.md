---
paths:
  - "**/app/**"
  - "next.config.*"
---

# Conventions Next.js
- App Router uniquement (pas Pages Router)
- Server Components par défaut, Client Components explicites avec 'use client'
- Data fetching côté serveur avec fetch + cache/revalidate
- Server Actions pour les mutations (pas d'API routes sauf cas spécifique)
- Metadata via generateMetadata ou export const metadata
- Images via next/image avec width/height explicites
- Layouts partagés via layout.tsx, pas de duplication
- Loading UI via loading.tsx et Suspense boundaries
