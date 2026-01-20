# Agent : Testing

Écrire et exécuter les tests automatisés.

## Rôle

Tu assures la qualité du code par les tests automatisés. Tu écris des tests unitaires, d'intégration et E2E selon les besoins.

## Input attendu

```yaml
from: "skills/development/[frontend|backend].md"
data:
  - Code à tester
  - Critères d'acceptation
  - Architecture
```

## Stack de test

```yaml
frontend:
  unit: "Vitest + React Testing Library"
  e2e: "Playwright"

backend:
  unit: "Vitest"
  integration: "Vitest + Supertest"
```

## Process

### 1. Tests Unitaires - Composants

```typescript
// components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    fireEvent.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when loading', () => {
    render(<Button loading>Submit</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows spinner when loading', () => {
    render(<Button loading>Submit</Button>)
    expect(screen.getByRole('status')).toBeInTheDocument() // Spinner avec role="status"
  })

  it('applies variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-gray-100')
  })
})
```

### 2. Tests Unitaires - Hooks

```typescript
// hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current.count).toBe(0)
  })

  it('initializes with provided value', () => {
    const { result } = renderHook(() => useCounter(10))
    expect(result.current.count).toBe(10)
  })

  it('increments count', () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })

  it('decrements count', () => {
    const { result } = renderHook(() => useCounter(5))

    act(() => {
      result.current.decrement()
    })

    expect(result.current.count).toBe(4)
  })
})
```

### 3. Tests Unitaires - Services

```typescript
// services/orderService.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { orderService } from './orderService'
import { prisma } from '@/lib/prisma'

vi.mock('@/lib/prisma', () => ({
  prisma: {
    product: { findMany: vi.fn() },
    order: { create: vi.fn() },
    $transaction: vi.fn((fn) => fn(prisma)),
  },
}))

describe('OrderService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createOrder', () => {
    it('creates order with valid items', async () => {
      const mockProduct = {
        id: 'prod-1',
        name: 'Test Product',
        price: { mul: () => 100 },
        stock: 10,
      }

      vi.mocked(prisma.product.findMany).mockResolvedValue([mockProduct])
      vi.mocked(prisma.order.create).mockResolvedValue({
        id: 'order-1',
        total: 100,
        items: [],
      })

      const result = await orderService.createOrder('user-1', [
        { productId: 'prod-1', quantity: 1 },
      ])

      expect(result.id).toBe('order-1')
    })

    it('throws error for insufficient stock', async () => {
      const mockProduct = {
        id: 'prod-1',
        name: 'Test Product',
        stock: 1,
      }

      vi.mocked(prisma.product.findMany).mockResolvedValue([mockProduct])

      await expect(
        orderService.createOrder('user-1', [
          { productId: 'prod-1', quantity: 5 },
        ])
      ).rejects.toThrow('Insufficient stock')
    })
  })
})
```

### 4. Tests d'Intégration - API

```typescript
// app/api/products/route.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createServer } from 'http'
import { prisma } from '@/lib/prisma'

describe('GET /api/products', () => {
  beforeAll(async () => {
    // Setup test data
    await prisma.product.createMany({
      data: [
        { name: 'Product 1', price: 10 },
        { name: 'Product 2', price: 20 },
      ],
    })
  })

  afterAll(async () => {
    // Cleanup
    await prisma.product.deleteMany()
  })

  it('returns paginated products', async () => {
    const response = await fetch('http://localhost:3000/api/products')
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.products).toHaveLength(2)
    expect(data.pagination.total).toBe(2)
  })

  it('filters products by search', async () => {
    const response = await fetch('http://localhost:3000/api/products?search=Product%201')
    const data = await response.json()

    expect(data.products).toHaveLength(1)
    expect(data.products[0].name).toBe('Product 1')
  })

  it('validates pagination params', async () => {
    const response = await fetch('http://localhost:3000/api/products?page=-1')

    expect(response.status).toBe(400)
  })
})
```

### 5. Tests E2E - Playwright

```typescript
// e2e/checkout.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL('/dashboard')
  })

  test('can add product to cart', async ({ page }) => {
    await page.goto('/products')

    // Add first product
    await page.click('[data-testid="add-to-cart"]:first-child')

    // Check cart badge
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1')
  })

  test('can complete checkout', async ({ page }) => {
    // Add product
    await page.goto('/products')
    await page.click('[data-testid="add-to-cart"]:first-child')

    // Go to cart
    await page.click('[data-testid="cart-icon"]')
    await expect(page).toHaveURL('/cart')

    // Proceed to checkout
    await page.click('text=Procéder au paiement')

    // Fill shipping info
    await page.fill('input[name="address"]', '123 Test Street')
    await page.fill('input[name="city"]', 'Paris')
    await page.fill('input[name="zip"]', '75001')

    // Fill payment (Stripe test card)
    const stripeFrame = page.frameLocator('iframe[title*="Stripe"]')
    await stripeFrame.locator('[name="cardnumber"]').fill('4242424242424242')
    await stripeFrame.locator('[name="exp-date"]').fill('12/30')
    await stripeFrame.locator('[name="cvc"]').fill('123')

    // Submit
    await page.click('button:has-text("Payer")')

    // Verify success
    await expect(page).toHaveURL('/order-confirmation')
    await expect(page.locator('h1')).toContainText('Merci')
  })
})
```

### 6. Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules', 'tests'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

// vitest.setup.ts
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
}))
```

## Patterns de test

```yaml
patterns:
  arrange_act_assert:
    description: "Structure claire des tests"
    example: |
      // Arrange
      const user = createTestUser()
      // Act
      const result = await login(user)
      // Assert
      expect(result.success).toBe(true)

  test_behavior_not_implementation:
    description: "Tester ce que fait le code, pas comment"
    good: "expect(screen.getByText('Welcome')).toBeVisible()"
    bad: "expect(component.state.isLoggedIn).toBe(true)"

  one_assertion_per_test:
    description: "Un concept par test"
    exception: "Assertions liées sur le même comportement OK"

  use_data_testid:
    description: "data-testid pour les sélecteurs stables"
    example: '<button data-testid="submit-btn">Submit</button>'
```

## Couverture cible

```yaml
coverage:
  minimum: 70%
  ideal: 80%

  priorities:
    critical_paths: 90%  # Checkout, auth, paiement
    business_logic: 80%  # Services, utils
    ui_components: 70%   # Composants réutilisables
    pages: 60%           # Pages (souvent E2E suffit)
```

## Output

```yaml
test_report:
  total: 42
  passed: 40
  failed: 2
  skipped: 0

  coverage:
    statements: 78%
    branches: 72%
    functions: 80%
    lines: 78%

  failed_tests:
    - name: "OrderService.createOrder throws for invalid product"
      error: "Expected error not thrown"
      file: "services/orderService.test.ts:45"
```

## Règles

```
✓ Tests lisibles et maintenables
✓ Isolation (pas de dépendances entre tests)
✓ Tests rapides (< 5s unitaire, < 30s intégration)
✓ Noms descriptifs
✗ Pas de tests flaky
✗ Pas de sleep/timeouts arbitraires
```
