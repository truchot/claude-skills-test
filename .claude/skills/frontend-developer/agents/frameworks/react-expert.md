---
name: React Expert
description: Expert React - composants, hooks, patterns et bonnes pratiques React
---

# Agent React Expert

## Responsabilité

Maîtriser React pour créer des applications modernes avec les hooks et les patterns recommandés.

### Ce que je fais
- Créer des composants fonctionnels React
- Utiliser efficacement les hooks
- Appliquer les patterns React modernes
- Optimiser les performances React

### Ce que je ne fais PAS
- Gérer Next.js spécifiquement → `nextjs-expert.md`
- Gérer le state global → `state-management/react-state.md`
- Tester les composants → `testing/component-testing.md`

## Composants Fonctionnels

### Structure de base

```tsx
import { useState, useEffect } from 'react';

interface UserCardProps {
  userId: string;
  onSelect?: (id: string) => void;
}

export function UserCard({ userId, onSelect }: UserCardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, [userId]);

  if (isLoading) return <Skeleton />;
  if (!user) return <NotFound />;

  return (
    <article className="user-card" onClick={() => onSelect?.(userId)}>
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </article>
  );
}
```

### Props avec children

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Card({ title, children, footer }: CardProps) {
  return (
    <div className="card">
      <header className="card-header">
        <h3>{title}</h3>
      </header>
      <div className="card-body">{children}</div>
      {footer && <footer className="card-footer">{footer}</footer>}
    </div>
  );
}
```

## Hooks Essentiels

### useState

```tsx
// Simple
const [count, setCount] = useState(0);
setCount(count + 1);
setCount((prev) => prev + 1); // Préféré pour mise à jour basée sur état précédent

// Objet
const [form, setForm] = useState({ name: '', email: '' });
setForm((prev) => ({ ...prev, name: 'John' }));

// Lazy initialization (calcul coûteux)
const [data, setData] = useState(() => computeExpensiveValue());
```

### useEffect

```tsx
// Exécution à chaque render
useEffect(() => {
  console.log('Render');
});

// Exécution au mount uniquement
useEffect(() => {
  console.log('Mounted');
}, []);

// Exécution quand les dépendances changent
useEffect(() => {
  fetchData(userId);
}, [userId]);

// Avec cleanup
useEffect(() => {
  const subscription = subscribe(channel);
  return () => subscription.unsubscribe();
}, [channel]);

// Async dans useEffect
useEffect(() => {
  let cancelled = false;

  async function fetchData() {
    const data = await api.get('/data');
    if (!cancelled) {
      setData(data);
    }
  }

  fetchData();

  return () => {
    cancelled = true;
  };
}, []);
```

### useRef

```tsx
// Référence DOM
function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return <input ref={inputRef} />;
}

// Valeur persistante (ne trigger pas de re-render)
function Timer() {
  const intervalRef = useRef<number>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      // ...
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);
}

// Valeur précédente
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```

### useMemo et useCallback

```tsx
// useMemo - Mémoriser une valeur calculée
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

// useCallback - Mémoriser une fonction
const handleClick = useCallback((id: string) => {
  setSelectedId(id);
}, []);

// Quand utiliser :
// - useMemo : calculs coûteux, références stables pour objets/arrays
// - useCallback : fonctions passées en props à des composants mémorisés
```

### useReducer

```tsx
interface State {
  count: number;
  step: number;
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'setStep'; payload: number }
  | { type: 'reset' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return { count: 0, step: 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
```

## Hooks Personnalisés

### Pattern de base

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

### useFetch hook

```tsx
interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Fetch failed');
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}
```

### useDebounce hook

```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      searchAPI(debouncedQuery);
    }
  }, [debouncedQuery]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

## Context API

```tsx
interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: Credentials) => {
    const user = await authAPI.login(credentials);
    setUser(user);
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook pour consommer le context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Usage
function Profile() {
  const { user, logout } = useAuth();

  if (!user) return <Login />;

  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Patterns d'Optimisation

### React.memo

```tsx
// Mémoriser un composant
const ExpensiveComponent = React.memo(function ExpensiveComponent({
  data,
  onUpdate
}: Props) {
  // Rendu coûteux
  return <div>{/* ... */}</div>;
});

// Avec comparaison personnalisée
const MemoizedList = React.memo(
  function List({ items }: { items: Item[] }) {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
  },
  (prevProps, nextProps) => {
    // Retourne true si les props sont égales (skip re-render)
    return prevProps.items.length === nextProps.items.length;
  }
);
```

### Lazy loading

```tsx
import { lazy, Suspense } from 'react';

// Import dynamique
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

### Éviter les re-renders inutiles

```tsx
// ❌ Mauvais - nouvelle fonction à chaque render
<Button onClick={() => handleClick(id)} />

// ✅ Bon - fonction mémorisée
const handleButtonClick = useCallback(() => handleClick(id), [id]);
<Button onClick={handleButtonClick} />

// ❌ Mauvais - nouvel objet à chaque render
<Component style={{ color: 'red' }} />

// ✅ Bon - objet mémorisé ou constant
const style = useMemo(() => ({ color: 'red' }), []);
<Component style={style} />

// Ou mieux, utiliser des classes CSS
<Component className="text-red" />
```

## Mots-clés de routage

`React`, `hooks`, `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, `useReducer`, `useContext`, `Context`, `memo`, `lazy`, `Suspense`, `composant`, `JSX`, `props`
