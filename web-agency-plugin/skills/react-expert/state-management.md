# State Management - React Expert

## Choisir la bonne solution

| Solution | Quand utiliser |
|----------|---------------|
| useState/useReducer | Etat local a un composant |
| Context API | Theme, auth, i18n (changements rares) |
| Zustand | Etat global, stores legers, selecteurs |
| Redux Toolkit | Apps tres complexes, middleware avance |
| React Query/SWR | Server state (cache, sync, revalidation) |

## Context API
- Bon pour: theme, auth, langue, config globale
- Eviter pour: etat frequent, complexe, ou cache serveur
- Pattern: createContext + custom hook avec validation + Provider
```tsx
const AuthContext = createContext<AuthContextType | null>(null);
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
```
- Optimisation: separer contextes, useMemo sur value, separer state/dispatch

## Zustand
- Store: `const useStore = create<Store>((set, get) => ({...}))`
- Selecteurs atomiques: `useStore(s => s.count)` (un selector = une valeur)
- useShallow pour objets/arrays multiples
- Middleware: persist, immer (mutation directe), devtools
- Slices pattern pour gros stores
- Acces hors React: `useStore.getState()`, `useStore.subscribe()`

## Redux Toolkit
- createSlice pour reducers + actions auto-generees
- createAsyncThunk pour async
- RTK Query pour data fetching integre

## Bonnes pratiques
1. Separer client state et server state
2. Selectors atomiques (eviter destructuring complet du store)
3. Memoizer les valeurs de Context Provider
4. Immer pour etat profondement imbrique
5. DevTools en developpement uniquement

## Anti-patterns
- Un seul Context pour tout l'etat de l'app
- useContext directement sans hook personnalise
- Object inline dans Provider value
- Destructurer tout le store Zustand (re-renders partout)
- Stocker du server state dans le client state
