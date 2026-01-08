---
name: react
description: React - hooks, composants, state management, patterns modernes
tags: [react, hooks, components, state, jsx]
sub-skills: [hooks, state]
---

# React

## Quand Utiliser

- Créer des composants UI réutilisables
- Gérer l'état local et global
- Implémenter des hooks personnalisés
- Optimiser les performances React

## Principes Clés

- Composition over inheritance
- Unidirectional data flow
- Immutabilité de l'état
- Composants purs quand possible

## Composants

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

## Hooks Essentiels

### useState

```tsx
const [count, setCount] = useState(0);
const [user, setUser] = useState<User | null>(null);

// Mise à jour fonctionnelle
setCount(prev => prev + 1);

// Mise à jour objet
setUser(prev => ({ ...prev, name: 'John' }));
```

### useEffect

```tsx
useEffect(() => {
  // Effet
  const subscription = subscribe();

  // Cleanup
  return () => subscription.unsubscribe();
}, [dependency]);
```

### useRef

```tsx
const inputRef = useRef<HTMLInputElement>(null);

// Focus
inputRef.current?.focus();

// Valeur mutable (pas de re-render)
const countRef = useRef(0);
countRef.current += 1;
```

### useMemo / useCallback

```tsx
// Mémoïser une valeur calculée
const sortedItems = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);

// Mémoïser une fonction
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

## Custom Hooks

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

## Context

```tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be within ThemeProvider');
  return context;
}
```

## Patterns

### Compound Components

```tsx
function Tabs({ children }: { children: React.ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </TabsContext.Provider>
  );
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

// Usage
<Tabs>
  <Tabs.List>
    <Tabs.Tab>Tab 1</Tabs.Tab>
    <Tabs.Tab>Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel>Content 1</Tabs.Panel>
    <Tabs.Panel>Content 2</Tabs.Panel>
  </Tabs.Panels>
</Tabs>
```

### Render Props

```tsx
interface MouseTrackerProps {
  children: (position: { x: number; y: number }) => React.ReactNode;
}

function MouseTracker({ children }: MouseTrackerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return <>{children(position)}</>;
}
```

## Formulaires

```tsx
function Form() {
  const [values, setValues] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Performance

```tsx
// memo pour éviter re-renders inutiles
const ExpensiveComponent = memo(function ExpensiveComponent({ data }: Props) {
  return <div>{/* ... */}</div>;
});

// lazy pour code splitting
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## Anti-patterns

- ❌ Muter l'état directement
- ❌ useEffect sans dependencies array
- ❌ Déclarer des composants dans le render
- ❌ Passer des objets inline comme props
- ❌ Index comme key dans les listes dynamiques

## Checklist

- [ ] Types TypeScript pour les props
- [ ] Hooks avec dependencies correctes
- [ ] Cleanup dans useEffect si nécessaire
- [ ] memo pour composants coûteux
- [ ] Keys stables dans les listes
