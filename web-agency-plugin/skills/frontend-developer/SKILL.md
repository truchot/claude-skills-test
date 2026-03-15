---
name: frontend-developer
description: >-
  Expert developpement front-end moderne avec HTML, CSS, JavaScript/TypeScript.
  TRIGGER when: fichiers .html, .css, .js, integration maquettes, accessibilite, responsive design.
---

## Domaines d'expertise

- **JavaScript/TypeScript** - ES6+, async/await, DOM, API integration, generics (voir `javascript-patterns.md`)
- **CSS & Styling** - Grid, Flexbox, Tailwind, CSS-in-JS, animations, responsive (voir `css-architecture.md`)
- **HTML semantique** - Structure HTML5, SEO on-page, balises meta
- **Accessibilite (a11y)** - WCAG 2.1, ARIA, lecteurs d'ecran, contraste
- **Responsive design** - Mobile-first, media queries, clamp(), container queries
- **Frameworks** - Delegation vers react-expert, nextjs-expert pour specifique
- **Testing** - Jest, Vitest (unit), RTL (components), Playwright/Cypress (E2E)
- **Performance** - Core Web Vitals (LCP, CLS, INP), bundle optimization, code splitting
- **Tooling** - Vite, Webpack, ESLint, Prettier

## Patterns essentiels

### HTML semantique
- `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`
- Headings hierarchiques (h1 > h2 > h3)
- `<button>` pour actions, `<a>` pour navigation
- Meta tags: viewport, description, Open Graph

### CSS moderne
- **Grid**: layouts 2D, `grid-template-areas`, `auto-fit`/`auto-fill`
- **Flexbox**: alignement 1D, `gap`, `flex-wrap`
- **Custom properties**: `--color-primary`, theming, dark mode
- **Responsive**: `clamp()`, `min()`, media queries mobile-first
- **Container queries**: style en fonction du parent, pas du viewport

### JavaScript/TypeScript
- ES6+: destructuring, spread, optional chaining, nullish coalescing
- async/await avec try/catch, Promise.all pour parallelisme
- TypeScript: interfaces, generics, type guards, discriminated unions
- DOM: event delegation, IntersectionObserver, ResizeObserver
- Fetch API: AbortController, error handling, interceptors

### Accessibilite
- ARIA: roles, labels, live regions, describedby
- Focus management: trap focus dans modales, skip links
- Contraste minimum: AA (4.5:1 texte, 3:1 grand texte)
- Tests: axe-core, Lighthouse a11y, lecteur d'ecran

### Performance
- LCP < 2.5s, CLS < 0.1, INP < 200ms
- Code splitting par route (lazy import)
- Images: format moderne (WebP/AVIF), lazy loading, srcset
- Fonts: display swap, preload, subset

## Anti-patterns critiques

- `div` et `span` au lieu d'elements semantiques
- CSS inline ou `!important` systeme
- any en TypeScript
- Event listeners sans cleanup
- Pas de gestion d'erreur sur les fetch
- Images sans dimensions (cause CLS)
- Bundle monolithique sans code splitting
- Ignorer l'accessibilite (pas de labels, pas de focus visible)

## Escalation

- **react-expert**: hooks, composants React, state management React
- **nextjs-expert**: App Router, Server Components, SSR/SSG
- **design-system**: tokens, composants atomiques, coherence visuelle
- **backend-developer**: APIs REST/GraphQL, base de donnees, auth
