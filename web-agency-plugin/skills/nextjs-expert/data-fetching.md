# Data Fetching - Next.js Expert

## Server-side fetch (Server Components)
```tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

## Cache options
```tsx
// Cache par defaut (statique)
fetch(url);
// Pas de cache (dynamique a chaque requete)
fetch(url, { cache: 'no-store' });
// Revalidation temporelle (ISR)
fetch(url, { next: { revalidate: 3600 } });
// Tags pour revalidation ciblee
fetch(url, { next: { tags: ['posts'] } });
```

## Server Actions (mutations)
```tsx
// app/actions.ts
'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  await db.post.create({ data: { title } });
  revalidatePath('/posts');
}

// Usage dans un formulaire
export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <button type="submit">Creer</button>
    </form>
  );
}
```

## Revalidation strategies
| Strategie | Usage | Methode |
|-----------|-------|---------|
| Temporelle | Donnees peu frequentes | `revalidate: N` (secondes) |
| On-demand par path | Apres mutation | `revalidatePath('/posts')` |
| On-demand par tag | Cache cible | `revalidateTag('posts')` |

## Client-side fetching (Client Components)
```tsx
'use client';
import { useQuery } from '@tanstack/react-query';

export function SearchResults({ query }) {
  const { data, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => fetch(`/api/search?q=${query}`).then(r => r.json()),
  });
  if (isLoading) return <Spinner />;
  return <ul>{data.map(r => <li key={r.id}>{r.title}</li>)}</ul>;
}
```

## generateStaticParams (SSG)
```tsx
export async function generateStaticParams() {
  const posts = await db.post.findMany({ select: { slug: true } });
  return posts.map(p => ({ slug: p.slug }));
}
```

## Anti-patterns
- fetch sans gestion d'erreur
- Tout en `cache: 'no-store'` sans raison
- Oublier revalidatePath/revalidateTag apres mutation
- Client fetching quand server fetch suffit
