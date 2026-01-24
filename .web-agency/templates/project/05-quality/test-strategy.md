# Stratégie de Test

> **Projet** : {{PROJECT_NAME}}
> **Dernière MAJ** : {{DATE}}

---

## 1. Pyramide de tests

```
         /\
        /  \        E2E Tests (10%)
       /    \       - Parcours critiques
      /──────\      - Happy paths
     /        \
    /  Integ   \    Integration Tests (20%)
   /            \   - API endpoints
  /──────────────\  - Services
 /                \
/    Unit Tests    \ Unit Tests (70%)
/                    \ - Fonctions pures
 ──────────────────── - Composants isolés
```

## 2. Couverture cible

| Couche | Target | Critique |
|--------|--------|----------|
| Utils/Helpers | 90% | Oui |
| Services | 85% | Oui |
| API Routes | 80% | Oui |
| Components | 70% | Non |
| Pages | 60% | Non |

**Global** : > 80%

## 3. Tests unitaires

### Outils

| Outil | Usage |
|-------|-------|
| {{TEST_RUNNER}} | Test runner |
| {{MOCK_LIB}} | Mocking |
| {{ASSERTION_LIB}} | Assertions |

### Conventions

```typescript
// Naming: describe → should → when
describe('UserService', () => {
  describe('create', () => {
    it('should create user when email is valid', async () => {
      // Arrange
      const input = { email: 'test@example.com' };

      // Act
      const result = await userService.create(input);

      // Assert
      expect(result.id).toBeDefined();
    });

    it('should throw when email is invalid', async () => {
      // ...
    });
  });
});
```

### Ce qu'on teste

- [x] Fonctions pures (utils, helpers)
- [x] Services (avec mocks des dépendances)
- [x] Validations (Zod schemas)
- [x] Hooks (avec testing-library)
- [x] Composants UI (snapshot + behavior)

### Ce qu'on ne teste PAS

- [ ] Code tiers (libraries)
- [ ] Getters/setters triviaux
- [ ] Fichiers de config

## 4. Tests d'intégration

### Outils

| Outil | Usage |
|-------|-------|
| {{INTEGRATION_TOOL}} | HTTP testing |
| {{TEST_DB}} | Database testing |

### Scope

- API endpoints (routes → controllers → services → DB)
- Intégrations tierces (avec mocks)

### Setup

```typescript
// Utiliser une DB de test
beforeAll(async () => {
  await setupTestDatabase();
});

afterEach(async () => {
  await cleanupTestData();
});
```

## 5. Tests E2E

### Outils

| Outil | Usage |
|-------|-------|
| {{E2E_TOOL}} | Browser automation |

### Parcours couverts

| Parcours | Priorité | Fichier |
|----------|----------|---------|
| Inscription | P1 | `auth.spec.ts` |
| Connexion | P1 | `auth.spec.ts` |
| {{JOURNEY_1}} | P1 | `{{FILE_1}}` |
| {{JOURNEY_2}} | P2 | `{{FILE_2}}` |

### Bonnes pratiques

- [ ] Utiliser data-testid pour les sélecteurs
- [ ] Tests indépendants (pas d'ordre)
- [ ] Données de test dédiées
- [ ] Screenshots on failure

## 6. Tests spécialisés

### Accessibilité (a11y)

| Outil | Scope |
|-------|-------|
| axe-core | Composants + Pages |

```typescript
it('should have no a11y violations', async () => {
  const results = await axe(container);
  expect(results.violations).toHaveLength(0);
});
```

### Performance

| Outil | Métriques |
|-------|-----------|
| Lighthouse CI | LCP, FID, CLS |

### Sécurité

| Outil | Type |
|-------|------|
| npm audit | Dépendances |
| OWASP ZAP | DAST |

## 7. CI/CD

### Pipeline

```yaml
test:
  stages:
    - lint        # ESLint + TypeScript
    - unit        # Tests unitaires
    - integration # Tests intégration
    - e2e         # Tests E2E (staging)
    - audit       # Security + a11y
```

### Gates

| Gate | Condition | Bloquant |
|------|-----------|----------|
| Lint | 0 errors | ✅ |
| Unit | 100% pass + coverage > 80% | ✅ |
| Integ | 100% pass | ✅ |
| E2E | 100% pass | ✅ (prod) |
| Security | 0 critical | ✅ |

## 8. Données de test

### Fixtures

```
tests/
├── fixtures/
│   ├── users.ts      # Données users
│   ├── products.ts   # Données produits
│   └── factories.ts  # Factories
```

### Factories

```typescript
const userFactory = Factory.define<User>(() => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
}));
```

## 9. Mocking

### Stratégie

| Dépendance | Mock |
|------------|------|
| Database | In-memory / Test DB |
| APIs tierces | MSW / Nock |
| File system | memfs |
| Date/Time | Sinon fake timers |

### MSW exemple

```typescript
const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json(mockUsers));
  }),
];
```

## 10. Reporting

### Outils

| Outil | Usage |
|-------|-------|
| {{COVERAGE_TOOL}} | Coverage report |
| {{REPORT_TOOL}} | Test report |

### Métriques suivies

- Coverage par module
- Temps d'exécution
- Tests flaky
- Tendances
