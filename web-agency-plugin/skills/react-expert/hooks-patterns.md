# Hooks Patterns - React Expert

## useState
- Type explicite: `useState<User | null>(null)`
- Init lazy: `useState(() => expensiveComputation())`
- Mise a jour fonctionnelle: `setCount(prev => prev + 1)`
- Etat objet: `setForm(prev => ({ ...prev, name: 'John' }))`

## useReducer
- Etat complexe avec logique et transitions previsibles
- Types discrimines pour actions TypeScript
- Actions semantiques (par intention, pas par implementation)
```tsx
type Action = { type: 'increment' } | { type: 'setStep'; payload: number };
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment': return { ...state, count: state.count + state.step };
    case 'setStep': return { ...state, step: action.payload };
  }
}
```

## useEffect
- Toujours cleanup: `return () => clearInterval(id)`
- Deps exhaustives, utiliser mise a jour fonctionnelle pour eviter deps
- AbortController pour fetch

## useRef
- Refs DOM: `const ref = useRef<HTMLDivElement>(null)`
- Valeurs mutables sans re-render (previous value, timer id)

## Custom Hooks essentiels
- **useToggle**: boolean avec toggle/setTrue/setFalse
- **useLocalStorage**: sync avec localStorage, gestion SSR
- **useDebounce**: retarder une valeur (recherche, resize)
- **useClickOutside**: detecter clics hors element (dropdown, modal)
- **useMediaQuery**: responsive breakpoints, prefers-color-scheme
- **useAsync**: gestion data/loading/error pour operations async
- **useInterval**: setInterval avec ref pour callback stable

## Regles
1. Nom commence par `use`
2. Appeler d'autres hooks (sinon ce n'est pas un hook)
3. Retourner des valeurs stables (useMemo/useCallback)
4. Gerer le cleanup dans useEffect
5. Documenter avec JSDoc (params, return, usage)

## Anti-patterns
- Hook conditionnel: `if (x) { useState() }` -- interdit
- Hook dans boucle: `for (...) { useEffect() }` -- interdit
- Oublier deps useEffect (stale closure)
- Mutation directe au lieu de spread
