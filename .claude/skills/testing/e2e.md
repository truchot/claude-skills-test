---
name: testing/e2e
description: Tests end-to-end - parcours utilisateur complets
tags: [e2e, playwright, cypress, browser]
---

# Tests End-to-End

## Quand Utiliser

- Valider des parcours utilisateur critiques
- Tester des fonctionnalités complexes
- Vérifier l'intégration complète
- Tests de smoke avant release

## Caractéristiques

- **Lents** : navigateur réel
- **Coûteux** : infrastructure
- **Fragiles** : sensibles aux changements UI
- **Essentiels** : confiance déploiement

## Playwright - Bases

```typescript
import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  // Navigate
  await page.goto('/login');

  // Fill form
  await page.fill('[name="email"]', 'user@example.com');
  await page.fill('[name="password"]', 'password123');

  // Submit
  await page.click('button[type="submit"]');

  // Assert
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('h1')).toContainText('Welcome');
});
```

## Sélecteurs Robustes

```typescript
// ✅ Bon - data-testid
await page.click('[data-testid="submit-button"]');

// ✅ Bon - rôle ARIA
await page.getByRole('button', { name: 'Submit' });

// ✅ Bon - label
await page.getByLabel('Email');

// ⚠️ Fragile - classe CSS
await page.click('.btn-primary');

// ❌ Mauvais - chemin DOM
await page.click('div > div > button');
```

## Page Object Model

```typescript
// pages/login.page.ts
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.fill('[name="email"]', email);
    await this.page.fill('[name="password"]', password);
    await this.page.click('[data-testid="login-button"]');
  }

  async getErrorMessage() {
    return this.page.locator('[data-testid="error-message"]').textContent();
  }
}

// tests/login.spec.ts
test('shows error for invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('wrong@email.com', 'wrongpassword');

  const error = await loginPage.getErrorMessage();
  expect(error).toContain('Invalid credentials');
});
```

## Attentes et Assertions

```typescript
// Attendre un élément
await page.waitForSelector('[data-testid="loaded"]');

// Attendre une navigation
await page.waitForURL('/dashboard');

// Attendre un état réseau
await page.waitForLoadState('networkidle');

// Assertions sur éléments
await expect(page.locator('h1')).toBeVisible();
await expect(page.locator('input')).toBeEnabled();
await expect(page.locator('.error')).toHaveCount(0);
await expect(page.locator('img')).toHaveAttribute('src', /logo/);
```

## Fixtures et Hooks

```typescript
// fixtures.ts
import { test as base } from '@playwright/test';

type Fixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<Fixtures>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@test.com');
    await page.fill('[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
    await use(page);
  }
});

// test.spec.ts
test('authenticated user can access settings', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('/settings');
  await expect(authenticatedPage.locator('h1')).toContainText('Settings');
});
```

## Interception Réseau

```typescript
test('handles API error gracefully', async ({ page }) => {
  // Intercepter et simuler une erreur
  await page.route('**/api/users', (route) => {
    route.fulfill({
      status: 500,
      body: JSON.stringify({ error: 'Server error' })
    });
  });

  await page.goto('/users');
  await expect(page.locator('.error-message')).toBeVisible();
});
```

## Visual Testing

```typescript
test('homepage matches snapshot', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});

test('button hover state', async ({ page }) => {
  await page.goto('/');
  const button = page.locator('button.primary');
  await button.hover();
  await expect(button).toHaveScreenshot('button-hover.png');
});
```

## Configuration

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 2,
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'mobile', use: { ...devices['iPhone 12'] } }
  ]
});
```

## Anti-patterns

- ❌ Trop de tests E2E (préférer unit/integration)
- ❌ Sélecteurs fragiles (classes CSS)
- ❌ Pas de data-testid
- ❌ Timeouts fixes (`sleep(5000)`)
- ❌ Tests dépendants de l'ordre

## Checklist

- [ ] Parcours critiques couverts
- [ ] Page Object Model utilisé
- [ ] Sélecteurs robustes (data-testid)
- [ ] Retries configurés
- [ ] Screenshots/videos en cas d'échec
