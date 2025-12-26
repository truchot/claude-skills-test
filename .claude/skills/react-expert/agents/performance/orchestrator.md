# Performance Orchestrator

## Rôle

Coordonne les agents du domaine **performance** et route vers l'agent spécialisé approprié.

## Agents Disponibles

| Agent | Fichier | Spécialité |
|-------|---------|------------|
| Memoization | `memoization.md` | memo, useMemo, useCallback |
| Code Splitting | `code-splitting.md` | lazy, Suspense, dynamic imports |

## Règles de Routage

```
SI question contient [memo, React.memo, useMemo, useCallback, re-render, performance, memoization]
   → memoization.md

SI question contient [lazy, code splitting, dynamic import, bundle, chunk, Suspense, route-based]
   → code-splitting.md
```

## Checklist Performance React

1. **Mesurer d'abord** - React DevTools Profiler
2. **Identifier les bottlenecks** - Quels composants re-render ?
3. **Optimiser ciblé** - Pas de memo partout
4. **Code splitting** - Routes, modales, composants lourds
5. **Images** - Lazy loading, formats modernes

## Escalade

- Stratégie performance globale → `direction-technique`
- Core Web Vitals → `frontend-developer/performance/`
- Build optimization → `frontend-developer/tooling/`
