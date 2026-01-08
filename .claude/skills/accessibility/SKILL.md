---
name: accessibility
description: Accessibilité web - WCAG, ARIA, tests a11y
tags: [accessibility, a11y, wcag, aria, screen-reader]
---

# Accessibility (a11y)

## Quand Utiliser

- Rendre un site utilisable par tous
- Implémenter WCAG 2.1/2.2
- Ajouter des attributs ARIA
- Tester l'accessibilité

## Principes WCAG

| Principe | Description |
|----------|-------------|
| **Perceivable** | Contenu visible/audible |
| **Operable** | Navigation clavier/assistive |
| **Understandable** | Contenu compréhensible |
| **Robust** | Compatible assistive tech |

## HTML Sémantique

```html
<!-- ✅ Sémantique -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Title</h1>
    <p>Content...</p>
  </article>
</main>

<!-- ❌ Non sémantique -->
<div class="nav">
  <div class="link">Home</div>
</div>
```

## Images

```html
<!-- Informatif -->
<img src="chart.png" alt="Sales increased 20% in Q4" />

<!-- Décoratif -->
<img src="decoration.png" alt="" role="presentation" />

<!-- Complexe -->
<figure>
  <img src="diagram.png" alt="System architecture" />
  <figcaption>
    Detailed description of the system architecture...
  </figcaption>
</figure>
```

## Formulaires

```html
<form>
  <div>
    <label for="email">Email *</label>
    <input
      id="email"
      type="email"
      required
      aria-describedby="email-hint email-error"
    />
    <span id="email-hint">We'll never share your email</span>
    <span id="email-error" role="alert" aria-live="polite">
      <!-- Error message -->
    </span>
  </div>

  <fieldset>
    <legend>Notification preferences</legend>
    <label>
      <input type="checkbox" name="notifications" value="email" />
      Email notifications
    </label>
  </fieldset>
</form>
```

## ARIA

### Roles

```html
<!-- Landmarks -->
<div role="banner">Header</div>
<div role="navigation">Nav</div>
<div role="main">Main</div>
<div role="complementary">Aside</div>
<div role="contentinfo">Footer</div>

<!-- Widgets -->
<button role="tab" aria-selected="true">Tab 1</button>
<div role="tabpanel">Content</div>
<div role="dialog" aria-modal="true">Modal</div>
```

### States & Properties

```html
<!-- Expanded/Collapsed -->
<button aria-expanded="false" aria-controls="menu">
  Menu
</button>
<ul id="menu" hidden>...</ul>

<!-- Loading -->
<button aria-busy="true" aria-disabled="true">
  Loading...
</button>

<!-- Current -->
<a href="/about" aria-current="page">About</a>

<!-- Error -->
<input aria-invalid="true" aria-errormessage="err1" />
<span id="err1">Invalid email</span>
```

## Focus Management

```tsx
// Focus trap dans un modal
function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```

## Clavier

```tsx
function Menu() {
  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        focusItem(index + 1);
        break;
      case 'ArrowUp':
        focusItem(index - 1);
        break;
      case 'Home':
        focusItem(0);
        break;
      case 'End':
        focusItem(items.length - 1);
        break;
    }
  };

  return (
    <ul role="menu">
      {items.map((item, i) => (
        <li
          key={item.id}
          role="menuitem"
          tabIndex={i === 0 ? 0 : -1}
          onKeyDown={(e) => handleKeyDown(e, i)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
}
```

## Skip Links

```html
<body>
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>

  <nav>...</nav>

  <main id="main-content" tabindex="-1">
    ...
  </main>
</body>

<style>
.skip-link {
  position: absolute;
  left: -9999px;
}
.skip-link:focus {
  left: 0;
  top: 0;
  z-index: 9999;
}
</style>
```

## Contraste

```css
/* Minimum 4.5:1 pour texte normal */
/* Minimum 3:1 pour grand texte (18px+ ou 14px+ bold) */

:root {
  --text-primary: #1f2937;    /* Sur blanc: 14.7:1 ✅ */
  --text-secondary: #6b7280;  /* Sur blanc: 5.0:1 ✅ */
  --text-light: #9ca3af;      /* Sur blanc: 2.9:1 ❌ */
}
```

## Tests

```bash
# axe-core
npm install @axe-core/react

# Playwright
npm install @axe-core/playwright

# ESLint
npm install eslint-plugin-jsx-a11y
```

```tsx
// React avec axe
import React from 'react';
import ReactDOM from 'react-dom';

if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then(({ default: axe }) => {
    axe(React, ReactDOM, 1000);
  });
}
```

```tsx
// Playwright
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should not have a11y violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

## Anti-patterns

- ❌ `div` et `span` pour tout
- ❌ Outline supprimé sans alternative
- ❌ Texte dans images sans alt
- ❌ Contraste insuffisant
- ❌ Dépendance à la couleur seule

## Checklist

- [ ] HTML sémantique
- [ ] Images avec alt
- [ ] Labels sur inputs
- [ ] Navigation clavier
- [ ] Contraste suffisant
- [ ] Focus visible
- [ ] Tests axe-core
