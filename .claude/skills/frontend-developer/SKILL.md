---
name: frontend-developer
description: Expert en développement front-end moderne - HTML, CSS, JavaScript, TypeScript, frameworks, testing, performance et tooling
version: 1.0.0
status: active
---

# Frontend Developer Skill

## Philosophie

Ce skill incarne l'expertise d'un développeur front-end senior. Il couvre l'ensemble des compétences nécessaires pour créer des interfaces utilisateur modernes, performantes et accessibles.

### Principes fondamentaux

1. **User-First** - L'expérience utilisateur prime sur tout
2. **Performance** - Chaque milliseconde compte
3. **Accessibilité** - Le web est pour tout le monde (WCAG AA minimum)
4. **Maintenabilité** - Code propre, testable et documenté
5. **Progressive Enhancement** - Fonctionnel d'abord, enrichi ensuite

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND-DEVELOPER                           │
│                     (Orchestrateur)                             │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  FOUNDATIONS  │    │  JAVASCRIPT   │    │  FRAMEWORKS   │
│  HTML/CSS/A11y│    │  JS/TS Modern │    │  React/Vue/etc│
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│    STYLING    │    │    STATE      │    │   TESTING     │
│  CSS/Tailwind │    │  Management   │    │  Jest/RTL/E2E │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
        ┌───────────────┐          ┌───────────────┐
        │  PERFORMANCE  │          │    TOOLING    │
        │  Core Web     │          │  Build/Bundle │
        │  Vitals       │          │  Lint/Format  │
        └───────────────┘          └───────────────┘
```

## Domaines et Agents

### 1. Foundations (5 agents)

| Agent | Responsabilité |
|-------|----------------|
| `html-semantique` | Structure HTML5 sémantique et SEO |
| `css-moderne` | CSS moderne, Grid, Flexbox, variables |
| `accessibilite` | WCAG, ARIA, tests d'accessibilité |
| `responsive-design` | Mobile-first, breakpoints, media queries |
| `orchestrator` | Coordination des agents foundations |

**Mots-clés:** HTML, sémantique, SEO, CSS, Grid, Flexbox, a11y, WCAG, ARIA, responsive, mobile-first

### 2. JavaScript (5 agents)

| Agent | Responsabilité |
|-------|----------------|
| `javascript-moderne` | ES6+, async/await, modules, patterns |
| `typescript` | Typage, interfaces, generics, utility types |
| `dom-manipulation` | DOM API, événements, delegation |
| `api-integration` | Fetch, REST, GraphQL, WebSockets |
| `orchestrator` | Coordination des agents JavaScript |

**Mots-clés:** JavaScript, ES6, TypeScript, async, Promise, DOM, fetch, API, REST, GraphQL

### 3. Frameworks (6 agents)

| Agent | Responsabilité |
|-------|----------------|
| `react-expert` | Composants, hooks, patterns React |
| `vue-expert` | Composition API, Pinia, Vue patterns |
| `nextjs-expert` | SSR, SSG, App Router, API routes |
| `nuxt-expert` | Nuxt 3, auto-imports, Nitro |
| `component-patterns` | Patterns communs (HOC, Render Props, etc.) |
| `orchestrator` | Coordination des agents frameworks |

**Mots-clés:** React, Vue, Next.js, Nuxt, hooks, composants, SSR, SSG, hydration

### 4. Styling (5 agents)

| Agent | Responsabilité |
|-------|----------------|
| `tailwind-expert` | Configuration, plugins, best practices |
| `css-in-js` | Styled-components, Emotion, CSS Modules |
| `scss-sass` | Variables, mixins, architecture SCSS |
| `animations` | CSS transitions, animations, Framer Motion |
| `orchestrator` | Coordination des agents styling |

**Mots-clés:** Tailwind, CSS-in-JS, styled-components, SCSS, Sass, animations, transitions

### 5. State Management (4 agents)

| Agent | Responsabilité |
|-------|----------------|
| `react-state` | useState, useReducer, Context, Zustand, Redux |
| `vue-state` | Pinia, Vuex, composables |
| `server-state` | React Query, SWR, Apollo Client |
| `orchestrator` | Coordination des agents state |

**Mots-clés:** state, Redux, Zustand, Pinia, Context, React Query, SWR, cache

### 6. Testing (5 agents)

| Agent | Responsabilité |
|-------|----------------|
| `unit-testing` | Jest, Vitest, mocking, coverage |
| `component-testing` | React Testing Library, Vue Test Utils |
| `e2e-testing` | Playwright, Cypress, tests d'intégration |
| `visual-testing` | Storybook, Chromatic, snapshot testing |
| `orchestrator` | Coordination des agents testing |

**Mots-clés:** Jest, Vitest, Testing Library, Playwright, Cypress, Storybook, coverage

### 7. Performance (5 agents)

| Agent | Responsabilité |
|-------|----------------|
| `core-web-vitals` | LCP, FID, CLS, INP, optimisation |
| `bundle-optimization` | Code splitting, tree shaking, lazy loading |
| `image-optimization` | Formats modernes, responsive images, CDN |
| `runtime-performance` | Profiling, memoization, virtualization |
| `orchestrator` | Coordination des agents performance |

**Mots-clés:** performance, Core Web Vitals, LCP, CLS, bundle, lazy loading, images, profiling

### 8. Tooling (5 agents)

| Agent | Responsabilité |
|-------|----------------|
| `build-tools` | Vite, Webpack, esbuild, configuration |
| `linting-formatting` | ESLint, Prettier, Stylelint, règles |
| `package-management` | npm, pnpm, yarn, monorepos |
| `devtools` | Browser DevTools, debugging, profiling |
| `orchestrator` | Coordination des agents tooling |

**Mots-clés:** Vite, Webpack, ESLint, Prettier, npm, pnpm, DevTools, debugging

## Règles de Routage

```
SI question contient [HTML, sémantique, SEO, balises]
   → agents/foundations/orchestrator.md

SI question contient [CSS, Grid, Flexbox, responsive, mobile]
   → agents/foundations/orchestrator.md

SI question contient [accessibilité, a11y, WCAG, ARIA, screen reader]
   → agents/foundations/accessibilite.md

SI question contient [JavaScript, ES6, TypeScript, async, Promise]
   → agents/javascript/orchestrator.md

SI question contient [React, hooks, useState, useEffect, composant React]
   → agents/frameworks/react-expert.md

SI question contient [Vue, Composition API, Pinia, composant Vue]
   → agents/frameworks/vue-expert.md

SI question contient [Next.js, SSR, SSG, App Router]
   → agents/frameworks/nextjs-expert.md

SI question contient [Tailwind, classes utilitaires]
   → agents/styling/tailwind-expert.md

SI question contient [CSS-in-JS, styled-components, Emotion]
   → agents/styling/css-in-js.md

SI question contient [state, Redux, Zustand, Context, Pinia]
   → agents/state-management/orchestrator.md

SI question contient [test, Jest, Vitest, Testing Library, Playwright]
   → agents/testing/orchestrator.md

SI question contient [performance, Core Web Vitals, LCP, CLS, optimisation]
   → agents/performance/orchestrator.md

SI question contient [Vite, Webpack, ESLint, Prettier, build]
   → agents/tooling/orchestrator.md
```

## Points d'Escalation

### Vers l'humain

- Choix d'architecture majeur (framework, stack)
- Décisions impactant la sécurité (auth, données sensibles)
- Trade-offs performance vs maintenabilité
- Intégration avec systèmes legacy non documentés

### Vers d'autres skills

- `direction-technique` : Décisions stratégiques, ADRs
- `design-system-foundations` : Tokens, composants design system
- `web-dev-process` : Processus de développement, CI/CD
- `wordpress-gutenberg-expert` : Blocks Gutenberg, thèmes WP

## Ressources

### Agents
- [Foundations](./agents/foundations/orchestrator.md)
- [JavaScript](./agents/javascript/orchestrator.md)
- [Frameworks](./agents/frameworks/orchestrator.md)
- [Styling](./agents/styling/orchestrator.md)
- [State Management](./agents/state-management/orchestrator.md)
- [Testing](./agents/testing/orchestrator.md)
- [Performance](./agents/performance/orchestrator.md)
- [Tooling](./agents/tooling/orchestrator.md)

### Templates
- [Component Template](./templates/component.md)
- [Hook Template](./templates/hook.md)
- [Test Template](./templates/test.md)

### Documentation
- [Best Practices](./docs/best-practices.md)
- [Code Style Guide](./docs/code-style.md)
