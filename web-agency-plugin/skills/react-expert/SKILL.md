---
name: react-expert
description: >-
  Expert React pour hooks, state management, testing et patterns modernes.
  TRIGGER when: fichiers .tsx/.jsx, composants React, hooks, state management.
---

## Domaines d'expertise

- **Hooks & patterns** - useState, useEffect, useRef, custom hooks (voir `hooks-patterns.md`)
- **State management** - Context API, Zustand, Redux Toolkit (voir `state-management.md`)
- **Testing** - React Testing Library, hooks testing, mocking avec MSW (voir `testing-guide.md`)
- **Performance** - React.memo, useMemo, useCallback, code splitting (voir `performance.md`)
- **Components** - Functional components, composition, compound patterns, forms, error boundaries
- **Data fetching** - React Query (TanStack), SWR, Suspense
- **Styling** - Tailwind + React (cn, cva), CSS-in-JS (styled-components, Emotion)

## Patterns essentiels

### Composants fonctionnels
- Props typees avec interface, children via `ReactNode`
- Composition: Compound pattern, Render Props, HOC (rare)
- Formulaires: controlled inputs, validation, `useForm` hook

### Hooks
- **useState**: mise a jour fonctionnelle (`prev => prev + 1`), init lazy
- **useReducer**: etat complexe, actions typees discriminees
- **useEffect**: cleanup obligatoire, deps exhaustives
- **useRef**: refs DOM, valeurs mutables sans re-render
- **Custom hooks**: prefixe `use`, composer d'autres hooks, retourner valeurs stables

### State management
- **Context API**: theme, auth, i18n - eviter pour etat frequemment mis a jour
- **Zustand**: stores legers, selectors atomiques, middleware (persist, immer, devtools)
- **Redux Toolkit**: createSlice, thunks, cas tres complexes

### Data fetching
- **React Query**: useQuery, useMutation, cache automatique, stale-while-revalidate
- **SWR**: alternative legere, revalidation automatique
- **Suspense**: lazy loading, streaming SSR

### Testing
- **RTL**: queries accessibles (getByRole > getByText > getByTestId)
- **userEvent**: preferer a fireEvent, toujours `userEvent.setup()`
- **Custom render**: wrapper avec providers (QueryClient, Router)
- **Hooks testing**: renderHook, act pour async

### Performance
- **React.memo**: composants purs avec render couteux
- **useMemo**: calculs couteux, references stables pour objets/arrays
- **useCallback**: fonctions passees a composants memoized
- **Code splitting**: React.lazy + Suspense, dynamic imports par route
- **Virtualisation**: @tanstack/react-virtual pour longues listes

## Anti-patterns critiques

- Mutation directe de l'etat (`state.x = 5` au lieu de spread)
- Hooks conditionnels ou dans des boucles
- Oublier les deps de useEffect (stale closures)
- useMemo/useCallback partout sans mesurer d'abord
- Context unique pour tout l'etat de l'app (re-renders massifs)
- Object inline dans Provider value (nouvelle ref a chaque render)
- getByTestId comme query par defaut au lieu de getByRole
- Tester l'implementation au lieu du comportement utilisateur

## Escalation

- **nextjs-expert**: App Router, Server Components, Server Actions, ISR
- **frontend-developer**: CSS/HTML generique, JS/TS pur, outils de build
- **design-system**: tokens, composants atomiques, coherence visuelle
- **backend-developer**: APIs, base de donnees, logique serveur
