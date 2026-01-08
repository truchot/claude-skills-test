---
name: testing
description: Stratégie et techniques de tests logiciels
tags: [testing, tests, qualité, tdd, coverage]
sub-skills: [unit, integration, e2e]
---

# Testing

## Quand Utiliser

- Définir une stratégie de tests
- Choisir les types de tests appropriés
- Écrire des tests efficaces
- Mesurer la qualité des tests

## Pyramide de Tests

```
        ▲
       /E2E\          Peu, lents, coûteux
      /─────\
     / Integ \        Modérés
    /─────────\
   /   Unit    \      Nombreux, rapides
  /─────────────\
```

**Ratio recommandé** : 70% Unit / 20% Integration / 10% E2E

## Principes Clés

- Un test = un comportement
- Tests indépendants (pas d'ordre)
- Rapides et déterministes
- Lisibles comme documentation

## Pattern AAA

```typescript
test('should add two numbers', () => {
  // Arrange - Préparer
  const a = 2;
  const b = 3;

  // Act - Exécuter
  const result = add(a, b);

  // Assert - Vérifier
  expect(result).toBe(5);
});
```

## Types de Tests

### Unit (isolation)
```typescript
test('formatPrice returns formatted string', () => {
  expect(formatPrice(1000)).toBe('1 000 €');
});
```

### Integration (composants ensemble)
```typescript
test('API returns user data', async () => {
  const response = await request(app).get('/users/1');
  expect(response.status).toBe(200);
  expect(response.body.name).toBeDefined();
});
```

### E2E (parcours complet)
```typescript
test('user can login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@test.com');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## Mocks et Stubs

```typescript
// Mock une fonction
const mockFetch = vi.fn().mockResolvedValue({ data: [] });

// Mock un module
vi.mock('./api', () => ({
  fetchUsers: vi.fn().mockResolvedValue([])
}));

// Spy sur une méthode
const spy = vi.spyOn(console, 'log');
```

## Coverage

```bash
# Générer le rapport
npm test -- --coverage

# Seuils recommandés
# Statements: 80%
# Branches: 75%
# Functions: 80%
# Lines: 80%
```

## TDD (Test-Driven Development)

```
1. RED    → Écrire un test qui échoue
2. GREEN  → Écrire le minimum pour passer
3. REFACTOR → Améliorer sans casser
```

## Anti-patterns

- ❌ Tester l'implémentation (pas le comportement)
- ❌ Tests interdépendants
- ❌ Tests flaky (instables)
- ❌ Assertions multiples non liées
- ❌ Setup/teardown complexes

## Quand Tester Quoi

| Situation | Type de test |
|-----------|--------------|
| Fonction pure | Unit |
| API endpoint | Integration |
| Parcours utilisateur | E2E |
| Composant UI | Component |
| Règle métier | Unit |

## Checklist

- [ ] Tests isolés et indépendants
- [ ] Noms descriptifs
- [ ] Coverage > 80%
- [ ] Pas de tests flaky
- [ ] CI/CD exécute les tests
