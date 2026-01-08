---
name: react/hooks
description: React Hooks - useState, useEffect, useRef, custom hooks
tags: [hooks, useState, useEffect, useRef, custom]
---

# React Hooks

## useState

### Syntaxe

```tsx
const [state, setState] = useState<T>(initialValue);
```

### Patterns

```tsx
// Simple
const [count, setCount] = useState(0);
const [name, setName] = useState('');

// Avec type
const [user, setUser] = useState<User | null>(null);

// Lazy initialization
const [data, setData] = useState(() => expensiveComputation());

// Mise à jour fonctionnelle (recommandé)
setCount(prev => prev + 1);

// Objet
setUser(prev => ({ ...prev, name: 'John' }));
```

## useReducer

```tsx
type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'increment': return state + 1;
    case 'decrement': return state - 1;
    case 'reset': return 0;
  }
}

const [count, dispatch] = useReducer(reducer, 0);

dispatch({ type: 'increment' });
```

## useEffect

### Patterns

```tsx
// Exécution à chaque render
useEffect(() => {
  console.log('Render');
});

// Montage uniquement
useEffect(() => {
  console.log('Mounted');
}, []);

// Quand dependency change
useEffect(() => {
  console.log('Value changed:', value);
}, [value]);

// Avec cleanup
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);
```

### Async dans useEffect

```tsx
useEffect(() => {
  async function fetchData() {
    const result = await api.get('/data');
    setData(result);
  }
  fetchData();
}, []);

// Ou avec IIFE
useEffect(() => {
  (async () => {
    const result = await api.get('/data');
    setData(result);
  })();
}, []);
```

## useRef

```tsx
// Référence DOM
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current?.focus();

// Valeur mutable (pas de re-render)
const renderCount = useRef(0);
renderCount.current += 1;

// Previous value
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```

## useMemo

```tsx
// Mémoïser un calcul coûteux
const sortedItems = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);

// Mémoïser un objet pour éviter re-renders
const config = useMemo(
  () => ({ theme, language }),
  [theme, language]
);
```

## useCallback

```tsx
// Mémoïser une fonction
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Utile pour les props de composants mémoïsés
<MemoizedChild onClick={handleClick} />
```

## Custom Hooks

### useLocalStorage

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
```

### useDebounce

```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

### useMediaQuery

```tsx
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// Usage
const isMobile = useMediaQuery('(max-width: 768px)');
```

### useAsync

```tsx
function useAsync<T>(asyncFn: () => Promise<T>, deps: any[] = []) {
  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: Error | null;
  }>({ data: null, loading: true, error: null });

  useEffect(() => {
    setState({ data: null, loading: true, error: null });
    asyncFn()
      .then(data => setState({ data, loading: false, error: null }))
      .catch(error => setState({ data: null, loading: false, error }));
  }, deps);

  return state;
}
```

## Règles des Hooks

1. **Top level only** - Pas dans des conditions/boucles
2. **React functions only** - Composants ou custom hooks
3. **Nommage** - Préfixe `use` pour custom hooks
4. **Dependencies** - Lister toutes les dépendances

## Anti-patterns

```tsx
// ❌ Hook dans une condition
if (condition) {
  useState(0);
}

// ❌ Oublier des dependencies
useEffect(() => {
  doSomething(value);
}, []); // value manquant

// ❌ Mutation dans useState
setState(prev => {
  prev.count++; // Mutation!
  return prev;
});

// ✅ Correct
setState(prev => ({ ...prev, count: prev.count + 1 }));
```
