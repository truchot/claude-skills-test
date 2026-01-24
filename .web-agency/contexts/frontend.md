# Contexte Frontend

Connaissances essentielles pour le développement frontend.

## Stack par défaut

```
Next.js 14+ (App Router)
TypeScript (strict mode)
Tailwind CSS
React 18+
```

## Patterns Next.js App Router

### Structure de fichiers

```
app/
├── layout.tsx          # Layout racine
├── page.tsx            # Page d'accueil
├── globals.css         # Styles globaux
├── (marketing)/        # Route group (pas dans l'URL)
│   ├── about/page.tsx
│   └── contact/page.tsx
├── dashboard/
│   ├── layout.tsx      # Layout dashboard
│   ├── page.tsx
│   └── settings/page.tsx
└── api/
    └── route.ts        # API Routes
```

### Server vs Client Components

```tsx
// Server Component (défaut) - Pas de "use client"
// ✅ Fetch data, accès DB, secrets, pas de JS côté client
async function ServerComponent() {
  const data = await fetchData() // Fetch côté serveur
  return <div>{data}</div>
}

// Client Component - Nécessite "use client"
// ✅ Interactivité, hooks, événements, state
"use client"
function ClientComponent() {
  const [state, setState] = useState()
  return <button onClick={() => setState(...)}>Click</button>
}
```

### Règle : Server par défaut, Client si interactivité

```
Server Components:
- Fetch de données
- Accès aux headers/cookies
- Composants statiques
- SEO-critical content

Client Components:
- useState, useEffect
- onClick, onChange
- Librairies browser-only
- Animations interactives
```

### Data Fetching

```tsx
// Dans un Server Component
async function Page() {
  // Fetch avec cache automatique
  const data = await fetch('https://api.example.com/data')

  // Revalidation
  const data2 = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // Revalide toutes les heures
  })

  // Pas de cache
  const data3 = await fetch('https://api.example.com/data', {
    cache: 'no-store'
  })

  return <Component data={data} />
}
```

### Loading & Error States

```
app/
├── dashboard/
│   ├── page.tsx
│   ├── loading.tsx    # UI pendant le chargement
│   └── error.tsx      # UI en cas d'erreur
```

```tsx
// loading.tsx
export default function Loading() {
  return <Skeleton />
}

// error.tsx
"use client"
export default function Error({ error, reset }) {
  return (
    <div>
      <p>Something went wrong</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

## Tailwind CSS

### Classes essentielles

```
Layout:
  flex, grid, block, hidden
  items-center, justify-between
  gap-4, space-y-2

Spacing:
  p-4, px-6, py-2
  m-4, mx-auto, my-8

Sizing:
  w-full, w-1/2, w-64
  h-screen, h-full, min-h-0
  max-w-7xl, max-w-prose

Typography:
  text-sm, text-base, text-lg, text-xl
  font-medium, font-semibold, font-bold
  text-gray-900, text-gray-600
  leading-tight, tracking-wide

Colors:
  bg-white, bg-gray-100
  text-blue-600, hover:text-blue-800
  border-gray-200

Borders:
  border, border-2
  rounded, rounded-lg, rounded-full

Shadows:
  shadow-sm, shadow, shadow-lg

States:
  hover:bg-gray-100
  focus:ring-2 focus:ring-blue-500
  disabled:opacity-50

Responsive:
  sm:flex md:grid lg:flex-row
```

### Composant Button exemple

```tsx
const buttonVariants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  ghost: "text-gray-600 hover:bg-gray-100",
}

const buttonSizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-lg",
}

function Button({ variant = "primary", size = "md", children, ...props }) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        rounded-lg font-medium
        transition-colors
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:pointer-events-none
        ${buttonVariants[variant]}
        ${buttonSizes[size]}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
```

## TypeScript

### Types utiles

```tsx
// Props avec children
type Props = {
  children: React.ReactNode
}

// Props de composant HTML
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary"
}

// Inférer les props d'un composant
type ComponentProps = React.ComponentProps<typeof Component>

// Event handlers
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {}
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {}
```

### Patterns courants

```tsx
// Composant générique
function List<T>({ items, renderItem }: {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}) {
  return <ul>{items.map(renderItem)}</ul>
}

// Discriminated union pour les états
type State =
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "success"; data: Data }
```

## React Patterns

### Custom Hooks

```tsx
// Fetch hook
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])

  return { data, error, loading }
}
```

### Composition

```tsx
// Compound components
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>

// Render props
<DataProvider render={(data) => <Display data={data} />} />

// Children as function
<Toggle>
  {({ on, toggle }) => (
    <button onClick={toggle}>{on ? "ON" : "OFF"}</button>
  )}
</Toggle>
```

## Performance

### Optimisations clés

```tsx
// Mémoisation
const memoizedValue = useMemo(() => expensiveCalculation(a, b), [a, b])
const memoizedCallback = useCallback(() => doSomething(a), [a])

// Lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// Image optimization (Next.js)
import Image from 'next/image'
<Image src="/photo.jpg" width={800} height={600} alt="..." />
```

### Core Web Vitals

```
LCP (Largest Contentful Paint) < 2.5s
  → Optimiser images, fonts, critical CSS

FID (First Input Delay) < 100ms
  → Réduire JS, code splitting

CLS (Cumulative Layout Shift) < 0.1
  → Dimensions explicites sur images/iframes
  → Éviter insertions dynamiques
```
