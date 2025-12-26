---
name: React Expert (Delegation)
description: Agent de délégation vers le skill react-expert spécialisé
---

# Agent React Expert (Délégation)

## Responsabilité

Cet agent délègue au skill `react-expert` pour une couverture complète de React.

> **Note** : Ce fichier a été simplifié. Le contenu détaillé se trouve dans le skill dédié `react-expert`.

## Quand utiliser cet agent

- Questions rapides sur React
- Intégration avec d'autres préoccupations frontend
- Vue d'ensemble des patterns React

## Quand utiliser le skill react-expert

Pour toute question approfondie, invoquer directement le skill `react-expert` qui contient **28 agents spécialisés** :

| Domaine | Agents | Spécialités |
|---------|--------|-------------|
| `hooks/` | 5 | useState, useEffect, useRef, custom hooks |
| `components/` | 5 | Functional, composition, forms, error boundaries |
| `state/` | 4 | Context, Zustand, Redux Toolkit |
| `data/` | 4 | React Query, SWR, Suspense |
| `testing/` | 4 | RTL, hooks testing, mocking |
| `styling/` | 3 | Tailwind + React, CSS-in-JS |
| `performance/` | 3 | Memoization, code splitting |

## Patterns Essentiels (Résumé)

### Composant fonctionnel

```tsx
interface Props {
  userId: string;
  onSelect?: (id: string) => void;
}

export function UserCard({ userId, onSelect }: Props) {
  const { data: user, isLoading } = useUser(userId);

  if (isLoading) return <Skeleton />;
  if (!user) return <NotFound />;

  return (
    <article onClick={() => onSelect?.(userId)}>
      <h2>{user.name}</h2>
    </article>
  );
}
```

### Custom hook

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

## Points d'Escalade

### Ce que je ne fais PAS
- Gérer Next.js spécifiquement → `nextjs-expert.md`
- State global avancé → `state-management/react-state.md` ou `react-expert/state/`
- Tester les composants → `testing/component-testing.md` ou `react-expert/testing/`

## Délégation

→ **Pour une couverture complète de React**, invoquer le skill : `react-expert`

## Mots-clés de routage

`React`, `hooks`, `useState`, `useEffect`, `composant`, `JSX`, `props`
