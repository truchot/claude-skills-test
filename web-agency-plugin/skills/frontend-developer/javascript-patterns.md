# JavaScript Patterns - Frontend Developer

## ES6+ essentiels
```js
// Destructuring
const { name, age = 25 } = user;
const [first, ...rest] = items;

// Optional chaining & nullish coalescing
const city = user?.address?.city ?? 'Unknown';

// Spread/Rest
const updated = { ...user, name: 'New' };
const merged = [...arr1, ...arr2];

// Template literals
const msg = `Hello ${name}, you have ${count} items`;
```

## Async/Await
```js
// Gestion d'erreur
async function fetchUser(id) {
  try {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}

// Parallelisme
const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]);

// AbortController
const controller = new AbortController();
const res = await fetch(url, { signal: controller.signal });
controller.abort(); // Annuler
```

## TypeScript
```ts
// Interfaces et types
interface User { id: string; name: string; email: string; }
type Status = 'active' | 'inactive' | 'pending';

// Generics
function getFirst<T>(arr: T[]): T | undefined { return arr[0]; }

// Type guards
function isUser(obj: unknown): obj is User {
  return typeof obj === 'object' && obj !== null && 'id' in obj;
}

// Discriminated unions
type Result<T> = { success: true; data: T } | { success: false; error: string };

// Utility types
type Partial<User>     // Tous les champs optionnels
type Pick<User, 'id'>  // Seulement id
type Omit<User, 'email'> // Tout sauf email
type Record<string, number> // Map string -> number
```

## DOM moderne
```js
// Event delegation
document.querySelector('.list').addEventListener('click', (e) => {
  const item = e.target.closest('[data-id]');
  if (item) handleClick(item.dataset.id);
});

// IntersectionObserver (lazy loading, infinite scroll)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) loadMore(); });
}, { threshold: 0.1 });
observer.observe(sentinel);

// ResizeObserver
const ro = new ResizeObserver(entries => {
  entries.forEach(entry => adjustLayout(entry.contentRect));
});
```

## API Integration
```ts
// Client HTTP type-safe
async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) throw new ApiError(res.status, await res.text());
  return res.json();
}
```

## Anti-patterns
- `any` au lieu de types precis
- Callbacks pyramidaux au lieu de async/await
- Event listeners sans removeEventListener
- `==` au lieu de `===`
- Variable globale implicite (oublier let/const)
