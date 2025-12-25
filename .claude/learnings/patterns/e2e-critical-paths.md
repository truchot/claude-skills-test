---
id: pattern-008
category: testing
tags: [testing, e2e, playwright, wordpress]
created: 2024-04-01
validated: true
usage_count: 7
---

# Pattern: Tests E2E des Parcours Critiques

## Contexte d'Application

**Quand utiliser ce pattern :**
- Site avec parcours utilisateur importants
- E-commerce (checkout, paiement)
- Formulaires critiques (contact, inscription)
- Intégrations tierces à valider

**Prérequis :**
- Node.js 18+
- @wordpress/e2e-test-utils-playwright ou Playwright
- Environnement de test stable

## Solution

Tests E2E automatisés couvrant les parcours business critiques.

### Structure

```
tests/
├── e2e/
│   ├── playwright.config.js
│   ├── global-setup.js
│   ├── fixtures/
│   │   └── test-data.js
│   └── specs/
│       ├── navigation.spec.js
│       ├── contact-form.spec.js
│       ├── search.spec.js
│       └── checkout.spec.js   # Si e-commerce
│
└── package.json
```

### playwright.config.js

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e/specs',
  timeout: 30000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results.json' }],
  ],

  use: {
    baseURL: process.env.WP_BASE_URL || 'http://localhost:8080',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],
});
```

### Parcours Navigation

```javascript
// tests/e2e/specs/navigation.spec.js
import { test, expect } from '@playwright/test';

test.describe('Navigation critique', () => {
  test('homepage charge correctement', async ({ page }) => {
    await page.goto('/');

    // Vérifie le titre
    await expect(page).toHaveTitle(/Mon Site/);

    // Vérifie le menu principal
    await expect(page.locator('nav.main-menu')).toBeVisible();

    // Vérifie le footer
    await expect(page.locator('footer')).toBeVisible();
  });

  test('navigation menu fonctionne', async ({ page }) => {
    await page.goto('/');

    // Clic sur un lien menu
    await page.click('nav >> text=Services');

    // Vérifie la navigation
    await expect(page).toHaveURL(/services/);
    await expect(page.locator('h1')).toContainText('Services');
  });

  test('page 404 affiche correctement', async ({ page }) => {
    const response = await page.goto('/page-inexistante-xyz');

    expect(response?.status()).toBe(404);
    await expect(page.locator('body')).toContainText(/non trouvée|404/i);
  });
});
```

### Parcours Formulaire Contact

```javascript
// tests/e2e/specs/contact-form.spec.js
import { test, expect } from '@playwright/test';

test.describe('Formulaire de contact', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('formulaire visible et complet', async ({ page }) => {
    await expect(page.locator('form#contact-form')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('validation des champs requis', async ({ page }) => {
    // Soumettre vide
    await page.click('button[type="submit"]');

    // Vérifie les erreurs
    await expect(page.locator('.error-message')).toBeVisible();
  });

  test('soumission réussie', async ({ page }) => {
    // Remplir le formulaire
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Ceci est un message de test E2E.');

    // Soumettre
    await page.click('button[type="submit"]');

    // Vérifie le succès
    await expect(page.locator('.success-message')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.success-message')).toContainText(/merci|envoyé/i);
  });
});
```

### Parcours Recherche

```javascript
// tests/e2e/specs/search.spec.js
import { test, expect } from '@playwright/test';

test.describe('Recherche', () => {
  test('recherche retourne des résultats', async ({ page }) => {
    await page.goto('/');

    // Ouvrir recherche
    await page.click('[aria-label="Search"]');

    // Rechercher
    await page.fill('input[type="search"]', 'WordPress');
    await page.press('input[type="search"]', 'Enter');

    // Vérifie les résultats
    await expect(page).toHaveURL(/s=WordPress/i);
    await expect(page.locator('.search-results article')).toHaveCount({ minimum: 1 });
  });

  test('recherche vide affiche message', async ({ page }) => {
    await page.goto('/?s=xyznonexistent123');

    await expect(page.locator('.no-results')).toBeVisible();
  });
});
```

### Parcours Checkout (E-commerce)

```javascript
// tests/e2e/specs/checkout.spec.js
import { test, expect } from '@playwright/test';

test.describe('Parcours achat', () => {
  test('ajout panier et checkout', async ({ page }) => {
    // Page produit
    await page.goto('/produit/exemple');

    // Ajouter au panier
    await page.click('button.add-to-cart');
    await expect(page.locator('.cart-count')).toHaveText('1');

    // Aller au panier
    await page.goto('/panier');
    await expect(page.locator('.cart-item')).toHaveCount(1);

    // Procéder au checkout
    await page.click('text=Commander');
    await expect(page).toHaveURL(/checkout|commande/);

    // Remplir formulaire
    await page.fill('#billing_first_name', 'Test');
    await page.fill('#billing_last_name', 'User');
    await page.fill('#billing_email', 'test@example.com');
    await page.fill('#billing_phone', '0612345678');
    await page.fill('#billing_address_1', '123 Rue Test');
    await page.fill('#billing_city', 'Paris');
    await page.fill('#billing_postcode', '75001');

    // Note: Ne pas soumettre le paiement en test
    await expect(page.locator('#place_order')).toBeVisible();
  });
});
```

### Script package.json

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:report": "playwright show-report"
  }
}
```

## Bénéfices

- **Confiance** : Parcours critiques validés automatiquement
- **Régression** : Détection rapide des cassures
- **Documentation** : Tests = spécification vivante
- **CI/CD** : Bloque les déploiements cassés

## Inconvénients / Trade-offs

- **Maintenance** : Tests à mettre à jour si UI change
- **Temps** : Plus lents que tests unitaires
- **Flakiness** : Tests instables possibles

## Projets l'ayant Utilisé

| Projet | Date | Résultat | Notes |
|--------|------|----------|-------|
| 7 projets | 2024 | Succès | E-commerce, sites vitrines |

## Voir Aussi

- [Anti-pattern: skip-tests-ci](../anti-patterns/skip-tests-ci.md)
- [Pattern: github-actions-wp](./github-actions-wp.md)

## Sources

- [Playwright Documentation](https://playwright.dev/)
- [WordPress E2E Test Utils](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-test-utils-playwright/)
