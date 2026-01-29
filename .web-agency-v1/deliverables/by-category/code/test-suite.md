---
id: test-suite
name: Suite de Tests
version: 1.0.0
category: code
status: active
phase: "4-realisation"
order: 6
agents:
  - testing-process/strategy/test-strategy
  - backend-developer/testing/unit
  - backend-developer/testing/integration
  - frontend-developer/testing/component-testing
  - testing-process/e2e/playwright
consumes:
  - technical-specification
  - api-specification
  - component-specs
produces_for:
  - testing-process/reporting/coverage-report
  - devops/cicd/quality-gates
tags: [testing, unit, integration, e2e, jest, vitest, playwright]
---

# Suite de Tests

## Description

Ensemble complet des tests automatisés du projet : tests unitaires, tests d'intégration, tests de composants et tests end-to-end. Inclut la configuration, les fixtures et les helpers de test.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Fichiers de test TypeScript/JavaScript |
| **Emplacement** | `__tests__/`, `*.test.ts`, `e2e/` |
| **Nommage** | `[module].test.ts`, `[module].spec.ts` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Fichiers Obligatoires

- [ ] **Configuration** - `vitest.config.ts`, `playwright.config.ts`
- [ ] **Tests unitaires** - Logique métier isolée
- [ ] **Tests d'intégration** - API, base de données
- [ ] **Tests E2E** - Parcours critiques

### Fichiers Optionnels

- [ ] **Tests de composants** - React Testing Library
- [ ] **Fixtures** - Données de test
- [ ] **Mocks** - Services externes mockés
- [ ] **Helpers** - Utilitaires de test

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Couverture | ≥ 80% lignes | Auto (CI) | Oui |
| 2 | Tests passent | 100% green | Auto (CI) | Oui |
| 3 | Temps d'exécution | < 5 min (unit+integ) | Auto | Non |
| 4 | E2E critiques | Parcours achat couvert | Manuel | Oui |
| 5 | Pas de flaky | Stable sur 3 runs | Auto | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `direction-technique/*` | `technical-specification` | Comportements attendus |
| `direction-technique/*` | `api-specification` | Contrats API |
| `design-system/*` | `component-specs` | Comportements UI |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | PR Review | Lead Dev | Ajouter tests manquants |
| 2 | Coverage drop | CI | Bloquer merge |
| 3 | E2E fail | QA | Investiguer |

## Exemple

### Structure Projet

```
project/
├── src/
│   ├── lib/
│   │   ├── utils.ts
│   │   └── __tests__/
│   │       └── utils.test.ts
│   ├── services/
│   │   ├── order.service.ts
│   │   └── __tests__/
│   │       └── order.service.test.ts
│   └── components/
│       ├── Button/
│       │   ├── Button.tsx
│       │   └── Button.test.tsx
│       └── ProductCard/
│           ├── ProductCard.tsx
│           └── ProductCard.test.tsx
├── __tests__/
│   ├── integration/
│   │   ├── api/
│   │   │   ├── products.test.ts
│   │   │   └── orders.test.ts
│   │   └── setup.ts
│   └── fixtures/
│       ├── products.ts
│       └── users.ts
├── e2e/
│   ├── checkout.spec.ts
│   ├── auth.spec.ts
│   └── fixtures/
│       └── test-data.ts
├── vitest.config.ts
└── playwright.config.ts
```

---

## Configuration

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types/**',
        'e2e/**',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### vitest.setup.ts

```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock environment variables
vi.stubEnv('DATABASE_URL', 'postgresql://test:test@localhost:5432/test');
```

### playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Tests Unitaires

### Exemple: Utils

```typescript
// src/lib/__tests__/utils.test.ts

import { describe, it, expect } from 'vitest';
import { formatPrice, slugify, calculateTotal } from '../utils';

describe('formatPrice', () => {
  it('should format price in EUR', () => {
    expect(formatPrice(1234.5)).toBe('1 234,50 €');
  });

  it('should handle zero', () => {
    expect(formatPrice(0)).toBe('0,00 €');
  });

  it('should handle negative prices', () => {
    expect(formatPrice(-10)).toBe('-10,00 €');
  });
});

describe('slugify', () => {
  it('should convert to lowercase', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('should remove accents', () => {
    expect(slugify('Café Crème')).toBe('cafe-creme');
  });

  it('should handle special characters', () => {
    expect(slugify('Product (New!) #1')).toBe('product-new-1');
  });
});

describe('calculateTotal', () => {
  it('should calculate cart total', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5.5, quantity: 1 },
    ];
    expect(calculateTotal(items)).toBe(25.5);
  });

  it('should return 0 for empty cart', () => {
    expect(calculateTotal([])).toBe(0);
  });
});
```

### Exemple: Service

```typescript
// src/services/__tests__/order.service.test.ts

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrderService } from '../order.service';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    order: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    product: {
      findMany: vi.fn(),
      updateMany: vi.fn(),
    },
    $transaction: vi.fn((callback) => callback(prisma)),
  },
}));

// Mock Stripe
vi.mock('@/lib/stripe', () => ({
  stripe: {
    paymentIntents: {
      create: vi.fn(),
    },
  },
}));

describe('OrderService', () => {
  let orderService: OrderService;

  beforeEach(() => {
    orderService = new OrderService();
    vi.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should create order with correct total', async () => {
      const mockProducts = [
        { id: '1', price: 10, stock: 5 },
        { id: '2', price: 20, stock: 10 },
      ];

      vi.mocked(prisma.product.findMany).mockResolvedValue(mockProducts);
      vi.mocked(prisma.order.create).mockResolvedValue({
        id: 'order-1',
        total: 40,
        status: 'PENDING',
      });

      const result = await orderService.createOrder({
        userId: 'user-1',
        items: [
          { productId: '1', quantity: 2 },
          { productId: '2', quantity: 1 },
        ],
      });

      expect(result.total).toBe(40);
      expect(prisma.order.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            total: 40,
          }),
        })
      );
    });

    it('should throw if product out of stock', async () => {
      vi.mocked(prisma.product.findMany).mockResolvedValue([
        { id: '1', price: 10, stock: 0 },
      ]);

      await expect(
        orderService.createOrder({
          userId: 'user-1',
          items: [{ productId: '1', quantity: 1 }],
        })
      ).rejects.toThrow('Product out of stock');
    });
  });

  describe('processPayment', () => {
    it('should create Stripe payment intent', async () => {
      vi.mocked(prisma.order.findUnique).mockResolvedValue({
        id: 'order-1',
        total: 50,
        status: 'PENDING',
      });

      vi.mocked(stripe.paymentIntents.create).mockResolvedValue({
        client_secret: 'pi_secret',
      });

      const result = await orderService.processPayment('order-1');

      expect(stripe.paymentIntents.create).toHaveBeenCalledWith({
        amount: 5000, // cents
        currency: 'eur',
        metadata: { orderId: 'order-1' },
      });
      expect(result.clientSecret).toBe('pi_secret');
    });
  });
});
```

---

## Tests de Composants

```typescript
// src/components/Button/Button.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading spinner when loading', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies variant classes', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-red-500');
  });
});
```

```typescript
// src/components/ProductCard/ProductCard.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';

const mockProduct = {
  id: '1',
  name: 'Miel de Lavande',
  slug: 'miel-de-lavande',
  price: 12.5,
  image: '/images/miel.jpg',
  stock: 10,
};

describe('ProductCard', () => {
  it('displays product information', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Miel de Lavande')).toBeInTheDocument();
    expect(screen.getByText('12,50 €')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Miel de Lavande');
  });

  it('calls onAddToCart when button clicked', () => {
    const handleAdd = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={handleAdd} />);

    fireEvent.click(screen.getByRole('button', { name: /ajouter/i }));
    expect(handleAdd).toHaveBeenCalledWith(mockProduct.id);
  });

  it('shows out of stock when stock is 0', () => {
    render(<ProductCard product={{ ...mockProduct, stock: 0 }} />);

    expect(screen.getByText(/rupture/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('links to product page', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/products/miel-de-lavande'
    );
  });
});
```

---

## Tests d'Intégration API

```typescript
// __tests__/integration/api/products.test.ts

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createServer } from 'http';
import { apiResolver } from 'next/dist/server/api-utils/node';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import productsHandler from '@/app/api/products/route';

describe('GET /api/products', () => {
  let server: any;

  beforeAll(async () => {
    // Seed test data
    await prisma.category.create({
      data: {
        id: 'cat-1',
        name: 'Test Category',
        slug: 'test-category',
      },
    });

    await prisma.product.createMany({
      data: [
        {
          name: 'Product 1',
          slug: 'product-1',
          price: 10,
          categoryId: 'cat-1',
          isActive: true,
        },
        {
          name: 'Product 2',
          slug: 'product-2',
          price: 20,
          categoryId: 'cat-1',
          isActive: true,
        },
        {
          name: 'Inactive',
          slug: 'inactive',
          price: 30,
          categoryId: 'cat-1',
          isActive: false,
        },
      ],
    });

    // Create test server
    server = createServer((req, res) => {
      apiResolver(req, res, undefined, productsHandler, {}, false);
    });
  });

  afterAll(async () => {
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    server.close();
  });

  it('returns active products', async () => {
    const res = await request(server).get('/api/products');

    expect(res.status).toBe(200);
    expect(res.body.products).toHaveLength(2);
    expect(res.body.products.every((p: any) => p.isActive)).toBe(true);
  });

  it('filters by category', async () => {
    const res = await request(server)
      .get('/api/products')
      .query({ category: 'test-category' });

    expect(res.status).toBe(200);
    expect(res.body.products).toHaveLength(2);
  });

  it('supports pagination', async () => {
    const res = await request(server)
      .get('/api/products')
      .query({ page: 1, limit: 1 });

    expect(res.status).toBe(200);
    expect(res.body.products).toHaveLength(1);
    expect(res.body.pagination.total).toBe(2);
  });
});
```

---

## Tests E2E

```typescript
// e2e/checkout.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as test user
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'user123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');
  });

  test('complete purchase flow', async ({ page }) => {
    // 1. Add product to cart
    await page.goto('/products/miel-de-lavande');
    await page.click('button:has-text("Ajouter au panier")');

    // Verify cart updated
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');

    // 2. Go to cart
    await page.click('[data-testid="cart-icon"]');
    await expect(page.locator('[data-testid="cart-total"]')).toContainText('12,50');

    // 3. Proceed to checkout
    await page.click('button:has-text("Commander")');
    await expect(page).toHaveURL('/checkout');

    // 4. Fill shipping info
    await page.fill('[name="firstName"]', 'Test');
    await page.fill('[name="lastName"]', 'User');
    await page.fill('[name="street"]', '123 Rue de Test');
    await page.fill('[name="city"]', 'Paris');
    await page.fill('[name="postalCode"]', '75001');
    await page.click('button:has-text("Continuer")');

    // 5. Select shipping method
    await page.click('[data-testid="shipping-standard"]');
    await page.click('button:has-text("Continuer")');

    // 6. Enter payment (Stripe test card)
    const stripeFrame = page.frameLocator('iframe[name*="stripe"]');
    await stripeFrame.locator('[name="cardnumber"]').fill('4242424242424242');
    await stripeFrame.locator('[name="exp-date"]').fill('1230');
    await stripeFrame.locator('[name="cvc"]').fill('123');

    // 7. Complete order
    await page.click('button:has-text("Payer")');

    // 8. Verify confirmation
    await expect(page).toHaveURL(/\/confirmation/);
    await expect(page.locator('h1')).toContainText('Merci');
    await expect(page.locator('[data-testid="order-number"]')).toBeVisible();
  });

  test('shows error for invalid card', async ({ page }) => {
    await page.goto('/products/miel-de-lavande');
    await page.click('button:has-text("Ajouter au panier")');
    await page.click('[data-testid="cart-icon"]');
    await page.click('button:has-text("Commander")');

    // Fill required info quickly
    await page.fill('[name="firstName"]', 'Test');
    await page.fill('[name="lastName"]', 'User');
    await page.fill('[name="street"]', '123 Rue');
    await page.fill('[name="city"]', 'Paris');
    await page.fill('[name="postalCode"]', '75001');
    await page.click('button:has-text("Continuer")');
    await page.click('[data-testid="shipping-standard"]');
    await page.click('button:has-text("Continuer")');

    // Use declined card
    const stripeFrame = page.frameLocator('iframe[name*="stripe"]');
    await stripeFrame.locator('[name="cardnumber"]').fill('4000000000000002');
    await stripeFrame.locator('[name="exp-date"]').fill('1230');
    await stripeFrame.locator('[name="cvc"]').fill('123');

    await page.click('button:has-text("Payer")');

    // Verify error message
    await expect(page.locator('[data-testid="payment-error"]')).toContainText(
      'Votre carte a été refusée'
    );
  });
});
```

```typescript
// e2e/auth.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('successful login', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'user123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[name="email"]', 'wrong@example.com');
    await page.fill('[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('[data-testid="error-message"]')).toContainText(
      'Email ou mot de passe incorrect'
    );
  });

  test('logout', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'user123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');

    // Logout
    await page.click('[data-testid="user-menu"]');
    await page.click('button:has-text("Déconnexion")');

    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-testid="login-link"]')).toBeVisible();
  });
});
```

---

## Scripts package.json

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:all": "pnpm test:coverage && pnpm test:e2e"
  }
}
```
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Tests trop couplés | Fragiles, maintenance difficile | Isoler les tests |
| Pas de mocks | Tests lents, dépendances externes | Mocker services |
| Tests flaky | CI non fiable | Retry + investigation |
| Couverture faible | Bugs en prod | Seuils minimum |
| Pas d'E2E | Parcours non testés | Couvrir critiques |

## Références

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
- Livrables liés : `technical-specification`, `test-coverage-report`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | testing-process | Création initiale |
