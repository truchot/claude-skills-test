# Data Orchestrator

## Rôle

Coordonne les agents du domaine **data** (data fetching et server state) et route vers l'agent spécialisé approprié.

## Agents Disponibles

| Agent | Fichier | Spécialité |
|-------|---------|------------|
| React Query | `react-query.md` | TanStack Query, queries, mutations |
| SWR | `swr.md` | SWR, revalidation, cache |
| Suspense | `suspense.md` | React Suspense, lazy, streaming |

## Règles de Routage

```
SI question contient [React Query, TanStack Query, useQuery, useMutation, queryClient]
   → react-query.md

SI question contient [SWR, useSWR, revalidate, stale-while-revalidate]
   → swr.md

SI question contient [Suspense, lazy, React.lazy, streaming, concurrent]
   → suspense.md
```

## Aide au Choix

| Critère | React Query | SWR |
|---------|-------------|-----|
| Taille bundle | ~12 KB | ~4 KB |
| DevTools | Excellent | Basique |
| Mutations | Intégrées | Manuel |
| Infinite scroll | Intégré | Plugin |
| Optimistic updates | Intégré | Manuel |
| Cache | Très configurable | Simple |

## Recommandations

- **React Query** : Applications data-heavy, mutations fréquentes, UX optimiste
- **SWR** : Applications simples, lectures principalement, bundle réduit

## Escalade

- Stratégie de caching globale → `direction-technique`
- Server state vs client state → `state/` domain
