---
name: javascript
description: JavaScript moderne ES6+ - async/await, modules, destructuring
tags: [javascript, es6, async, modules, promises]
sub-skills: [async, modules, arrays]
---

# JavaScript

## Quand Utiliser

- Écrire de la logique métier moderne
- Gérer l'asynchrone (Promises, async/await)
- Organiser le code en modules
- Manipuler des données (arrays, objets)

## Principes Clés

- `const` par défaut, `let` si réassignation
- Arrow functions pour les callbacks
- Destructuring pour extraire des valeurs
- Immutabilité (spread, map, filter)

## Variables et Fonctions

```javascript
// const par défaut
const API_URL = 'https://api.example.com';

// let si réassignation
let count = 0;
count += 1;

// Arrow functions
const double = (x) => x * 2;
const add = (a, b) => a + b;

// Avec corps
const process = (data) => {
  const result = transform(data);
  return result;
};
```

## Destructuring

```javascript
// Objets
const { name, age } = user;
const { name: userName, ...rest } = user;
const { role = 'user' } = user; // valeur par défaut

// Tableaux
const [first, second, ...others] = items;

// Paramètres
function createUser({ name, email, role = 'user' }) {
  return { name, email, role };
}
```

## Spread Operator

```javascript
// Fusion d'objets
const settings = { ...defaults, ...userPrefs };

// Copie de tableaux
const copy = [...original];
const extended = [...original, newItem];

// Arguments
Math.max(...numbers);
```

## Async/Await

```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error('Not found');
    return await response.json();
  } catch (error) {
    console.error('Failed:', error);
    throw error;
  }
}

// Parallèle
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
]);
```

## Promises

```javascript
// Chaînage
fetchData()
  .then(transform)
  .then(save)
  .catch(handleError)
  .finally(cleanup);

// Promise.all - parallèle
const results = await Promise.all([p1, p2, p3]);

// Promise.allSettled - toutes, même erreurs
const results = await Promise.allSettled([p1, p2]);

// Promise.race - première résolue
const fastest = await Promise.race([p1, p2]);
```

## Modules ES

```javascript
// Export
export const API_URL = 'https://api.example.com';
export function fetchUsers() { }
export default class App { }

// Import
import { fetchUsers, API_URL } from './api.js';
import App from './App.js';
import * as api from './api.js';

// Import dynamique
const module = await import('./heavy-module.js');
```

## Méthodes Array

```javascript
const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 30, active: false }
];

// Transformer
const names = users.map(u => u.name);

// Filtrer
const active = users.filter(u => u.active);

// Trouver
const bob = users.find(u => u.name === 'Bob');

// Vérifier
const hasActive = users.some(u => u.active);
const allActive = users.every(u => u.active);

// Réduire
const total = users.reduce((sum, u) => sum + u.age, 0);

// Chaîner
const result = users
  .filter(u => u.active)
  .map(u => u.name)
  .sort();
```

## Optional Chaining & Nullish

```javascript
// Optional chaining
const city = user?.address?.city;
const first = array?.[0];
const result = obj?.method?.();

// Nullish coalescing
const value = input ?? 'default';
const count = data.count ?? 0;

// Différence || vs ??
0 || 'default';  // 'default' (0 est falsy)
0 ?? 'default';  // 0 (0 n'est pas null/undefined)
```

## Classes

```javascript
class EventEmitter {
  #listeners = new Map(); // privé

  on(event, callback) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, []);
    }
    this.#listeners.get(event).push(callback);
    return this;
  }

  emit(event, data) {
    this.#listeners.get(event)?.forEach(cb => cb(data));
  }
}
```

## Anti-patterns

- ❌ Utiliser `var` (scope function, hoisting)
- ❌ Muter les objets/arrays originaux
- ❌ Callback hell (préférer async/await)
- ❌ `==` au lieu de `===`
- ❌ for...in sur arrays (utiliser for...of ou méthodes)

## Checklist

- [ ] `const` par défaut
- [ ] Destructuring utilisé
- [ ] Async/await pour l'asynchrone
- [ ] Modules ES pour l'organisation
- [ ] Immutabilité respectée
