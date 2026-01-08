---
name: testing/integration
description: Tests d'intégration - API, DB, services
tags: [integration, api, database, supertest]
---

# Tests d'Intégration

## Quand Utiliser

- Tester des API endpoints
- Vérifier l'interaction avec une base de données
- Tester la communication entre services
- Valider des workflows multi-composants

## Caractéristiques

- **Plus lents** que les tests unitaires
- **Dépendances réelles** (DB test, API mock)
- **Scénarios réalistes**
- **Détectent** les problèmes d'interface

## Test d'API (Supertest)

```typescript
import request from 'supertest';
import app from '../app';

describe('POST /users', () => {
  test('creates a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(Number),
      email: 'test@example.com'
    });
    expect(response.body.password).toBeUndefined();
  });

  test('returns 400 for invalid email', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'invalid', password: 'password123' })
      .expect(400);

    expect(response.body.error).toContain('email');
  });
});
```

## Test avec Base de Données

```typescript
import { prisma } from '../db';

describe('UserRepository', () => {
  beforeEach(async () => {
    // Nettoyer avant chaque test
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('finds user by email', async () => {
    // Arrange
    await prisma.user.create({
      data: { email: 'test@example.com', name: 'Test' }
    });

    // Act
    const user = await userRepository.findByEmail('test@example.com');

    // Assert
    expect(user).not.toBeNull();
    expect(user?.name).toBe('Test');
  });
});
```

## Test de Service Externe (MSW)

```typescript
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('https://api.github.com/users/:username', ({ params }) => {
    return HttpResponse.json({
      login: params.username,
      id: 1,
      name: 'Test User'
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetches GitHub user', async () => {
  const user = await githubService.getUser('octocat');
  expect(user.name).toBe('Test User');
});
```

## Authentication dans les Tests

```typescript
describe('Protected routes', () => {
  let authToken: string;

  beforeAll(async () => {
    // Créer un user et obtenir un token
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'password' });
    authToken = response.body.token;
  });

  test('GET /profile requires auth', async () => {
    await request(app)
      .get('/profile')
      .expect(401);
  });

  test('GET /profile with token succeeds', async () => {
    await request(app)
      .get('/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });
});
```

## Transactions pour Isolation

```typescript
describe('Order creation', () => {
  test('creates order with items', async () => {
    await prisma.$transaction(async (tx) => {
      const order = await orderService.create(tx, {
        userId: 1,
        items: [{ productId: 1, quantity: 2 }]
      });

      expect(order.items).toHaveLength(1);
      expect(order.total).toBe(2000);

      // Rollback automatique après le test
      throw new Error('Rollback');
    }).catch(() => {});
  });
});
```

## Contract Testing (Pact)

```typescript
import { PactV3 } from '@pact-foundation/pact';

const provider = new PactV3({
  consumer: 'Frontend',
  provider: 'UserAPI'
});

test('get user by id', async () => {
  await provider
    .given('user 1 exists')
    .uponReceiving('a request for user 1')
    .withRequest({
      method: 'GET',
      path: '/users/1'
    })
    .willRespondWith({
      status: 200,
      body: { id: 1, name: 'Test' }
    })
    .executeTest(async (mockServer) => {
      const user = await fetchUser(mockServer.url, 1);
      expect(user.name).toBe('Test');
    });
});
```

## Anti-patterns

- ❌ Dépendre d'une DB de production
- ❌ Tests qui modifient des données partagées
- ❌ Pas de cleanup entre tests
- ❌ Timeouts trop courts
- ❌ Ignorer les erreurs réseau

## Checklist

- [ ] DB de test isolée
- [ ] Cleanup avant/après tests
- [ ] Services externes mockés
- [ ] Timeouts adaptés
- [ ] Tests indépendants
