---
name: typescript
description: TypeScript - typage statique, interfaces, generics
tags: [typescript, types, interfaces, generics]
sub-skills: [generics, utility-types, type-guards]
---

# TypeScript

## Quand Utiliser

- Ajouter du typage statique au JavaScript
- Définir des contrats d'API clairs
- Améliorer l'autocomplétion IDE
- Détecter les erreurs à la compilation

## Principes Clés

- Types explicites aux frontières (params, retours)
- Inférence dans le code interne
- `interface` pour objets, `type` pour unions/mapped
- Éviter `any`, préférer `unknown`

## Types de Base

```typescript
// Primitifs
const name: string = 'John';
const age: number = 30;
const active: boolean = true;

// Arrays
const numbers: number[] = [1, 2, 3];
const strings: Array<string> = ['a', 'b'];

// Tuples
const pair: [string, number] = ['age', 30];

// Union
type Status = 'pending' | 'active' | 'done';
type ID = string | number;
```

## Interfaces

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;           // optionnel
  readonly createdAt: Date; // lecture seule
}

// Extension
interface Admin extends User {
  permissions: string[];
  role: 'admin';
}

// Index signature
interface Dictionary {
  [key: string]: string;
}
```

## Types

```typescript
// Union
type UserOrAdmin = User | Admin;

// Intersection
type UserWithRole = User & { role: string };

// Literal
type Theme = 'light' | 'dark';
type Size = 'sm' | 'md' | 'lg';

// Record
type UserRoles = Record<string, 'admin' | 'user'>;
```

## Generics

```typescript
// Fonction générique
function identity<T>(value: T): T {
  return value;
}

// Avec contrainte
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Interface générique
interface Response<T> {
  data: T;
  status: number;
}

// Classe générique
class Repository<T extends { id: string }> {
  private items = new Map<string, T>();

  add(item: T): void {
    this.items.set(item.id, item);
  }

  get(id: string): T | undefined {
    return this.items.get(id);
  }
}
```

## Utility Types

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

// Partial - tous optionnels
type PartialUser = Partial<User>;

// Required - tous requis
type RequiredUser = Required<PartialUser>;

// Readonly - lecture seule
type ReadonlyUser = Readonly<User>;

// Pick - sélectionner
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - exclure
type UserWithoutId = Omit<User, 'id'>;

// Record - dictionnaire
type UsersById = Record<string, User>;

// ReturnType
type Result = ReturnType<typeof fetchUser>;

// Awaited
type ResolvedUser = Awaited<Promise<User>>;
```

## Type Guards

```typescript
// typeof
function process(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}

// in
function speak(animal: Dog | Cat) {
  if ('bark' in animal) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// Custom type guard
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  );
}
```

## Discriminated Unions

```typescript
interface Loading { status: 'loading'; }
interface Success<T> { status: 'success'; data: T; }
interface Error { status: 'error'; error: string; }

type AsyncState<T> = Loading | Success<T> | Error;

function render<T>(state: AsyncState<T>) {
  switch (state.status) {
    case 'loading': return 'Loading...';
    case 'success': return state.data;
    case 'error': return state.error;
  }
}
```

## Conditional Types

```typescript
// Simple
type IsString<T> = T extends string ? true : false;

// Avec infer
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type ArrayElement<T> = T extends (infer E)[] ? E : never;

// Usage
type Unwrapped = UnwrapPromise<Promise<User>>; // User
type Element = ArrayElement<string[]>; // string
```

## Configuration tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "declaration": true
  },
  "include": ["src/**/*"]
}
```

## Anti-patterns

- ❌ `any` partout (utiliser `unknown`)
- ❌ Type assertions sans vérification (`as`)
- ❌ Ignorer les erreurs (`@ts-ignore`)
- ❌ Types trop larges (`object`, `Function`)
- ❌ Négliger `strict: true`

## Checklist

- [ ] `strict: true` activé
- [ ] Interfaces pour les objets métier
- [ ] Generics pour la réutilisabilité
- [ ] Type guards pour les validations
- [ ] Utility types utilisés
