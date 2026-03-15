# Performance - React Expert

## Regle d'or
> "Mesurer d'abord, optimiser ensuite" - React DevTools Profiler

## Signaux d'optimisation necessaire
- UI laggy ou saccadee
- Composants re-render sans raison
- Calculs couteux a chaque render
- Listes longues avec items complexes

## React.memo
- Quand: composant pur, parent re-render souvent, render couteux
```tsx
const UserCard = memo(function UserCard({ user, onSelect }: Props) {
  return <div onClick={() => onSelect(user.id)}>{user.name}</div>;
});
```
- Comparaison personnalisee: `memo(Component, (prev, next) => prev.id === next.id)`
- Attention: stabiliser les props objets/fonctions avec useMemo/useCallback

## useMemo
- Calculs couteux: filtrage, tri, agregation de donnees
- References stables: objets/arrays passes a composants memoized
```tsx
const filtered = useMemo(() =>
  products.filter(p => matchesFilter(p, filter)), [products, filter]);
```

## useCallback
- Fonctions passees a composants memoized
- Fonctions dans les deps d'un useEffect
- Event handlers pour listes
```tsx
const increment = useCallback(() => setCount(c => c + 1), []);
```

## useEvent pattern (stabilite + valeurs fraiches)
```tsx
function useEvent<T extends (...args: any[]) => any>(cb: T): T {
  const ref = useRef(cb);
  useLayoutEffect(() => { ref.current = cb; });
  return useCallback((...args) => ref.current(...args), []) as T;
}
```

## Code Splitting
```tsx
const Dashboard = lazy(() => import('./pages/Dashboard'));
<Suspense fallback={<PageLoader />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</Suspense>
```

## Virtualisation (longues listes)
- @tanstack/react-virtual pour ne rendre que les elements visibles

## Context split
- Separer les contextes par domaine (UserContext, ThemeContext)
- Composant n'utilisant que theme ne re-render pas quand user change

## Checklist
1. Profiler avec React DevTools
2. Identifier composants re-rendant trop
3. memo() pour renders couteux
4. useMemo() pour calculs / refs stables
5. useCallback() pour fonctions vers composants memoized
6. Verifier les deps (pas de stale closures)

## Anti-patterns
- useMemo pour concatenation simple: `useMemo(() => a + b, [a, b])` -- inutile
- memo sans stabiliser les props (nouvelle fonction inline)
- Deps manquantes dans useCallback (stale closure)
- Optimisation prematuree sans mesure
