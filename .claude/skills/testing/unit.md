---
name: testing/unit
description: Tests unitaires - isolation, mocks, assertions
tags: [unit, jest, vitest, mock, stub]
---

# Tests Unitaires

## Quand Utiliser

- Tester une fonction ou méthode isolée
- Valider une règle métier
- Tester des cas limites
- Feedback rapide pendant le développement

## Caractéristiques

- **Rapides** : < 10ms par test
- **Isolés** : pas de dépendances externes
- **Déterministes** : même résultat à chaque exécution
- **Focalisés** : une seule unité de code

## Pattern AAA

```typescript
test('calculates discount for premium users', () => {
  // Arrange
  const user = { type: 'premium', purchases: 1000 };
  const price = 100;

  // Act
  const result = calculateDiscount(user, price);

  // Assert
  expect(result).toBe(20); // 20% discount
});
```

## Mocks et Stubs

### Mock une fonction

```typescript
const mockCallback = vi.fn();
mockCallback.mockReturnValue(42);

processItems([1, 2, 3], mockCallback);

expect(mockCallback).toHaveBeenCalledTimes(3);
expect(mockCallback).toHaveBeenCalledWith(1);
```

### Mock un module

```typescript
vi.mock('./database', () => ({
  query: vi.fn().mockResolvedValue([{ id: 1 }])
}));

import { query } from './database';

test('fetches user', async () => {
  const result = await getUser(1);
  expect(query).toHaveBeenCalledWith('SELECT * FROM users WHERE id = ?', [1]);
});
```

### Spy

```typescript
const spy = vi.spyOn(console, 'error');

doSomethingThatMightFail();

expect(spy).not.toHaveBeenCalled();
spy.mockRestore();
```

## Assertions Communes

```typescript
// Égalité
expect(value).toBe(5);           // ===
expect(obj).toEqual({ a: 1 });   // deep equal

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeDefined();

// Nombres
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThanOrEqual(10);
expect(0.1 + 0.2).toBeCloseTo(0.3);

// Strings
expect(str).toMatch(/pattern/);
expect(str).toContain('substring');

// Arrays
expect(arr).toContain(item);
expect(arr).toHaveLength(3);

// Exceptions
expect(() => fn()).toThrow();
expect(() => fn()).toThrow('message');

// Async
await expect(promise).resolves.toBe(value);
await expect(promise).rejects.toThrow();
```

## Organisation des Tests

```typescript
describe('UserService', () => {
  describe('createUser', () => {
    test('creates user with valid data', () => {});
    test('throws on duplicate email', () => {});
    test('hashes password before saving', () => {});
  });

  describe('deleteUser', () => {
    test('removes user from database', () => {});
    test('throws if user not found', () => {});
  });
});
```

## Setup et Teardown

```typescript
describe('Database tests', () => {
  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('...', () => {});
});
```

## Anti-patterns

- ❌ Tester l'implémentation interne
- ❌ Tests qui dépendent de l'ordre
- ❌ Mocks excessifs (test trop couplé)
- ❌ Assertions vagues (`toBeTruthy()` partout)
- ❌ Tests sans assertion

## Checklist

- [ ] Un comportement par test
- [ ] Nom descriptif du comportement
- [ ] Pattern AAA respecté
- [ ] Mocks restaurés après usage
- [ ] Pas de dépendances entre tests
