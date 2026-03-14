---
name: design-system
description: >-
  Expert Design System avec approche Atomic Design industrielle.
  TRIGGER when: dossier tokens/, design-system/, creation de composants UI atomiques, coherence visuelle.
---

## Domaines d'expertise

- **Atomic Design** - Philosophie Foundations > Atoms > Molecules > Templates (voir `atomic-design.md`)
- **Design Tokens** - Couleurs, typographie, espacements, ombres, CSS variables (voir `tokens-guide.md`)
- **Atoms** - Boutons, inputs, labels, icons, badges
- **Molecules** - Formulaires, cartes, navigation, modales, alertes
- **Templates** - Layouts, hero sections, pages types
- **Outils** - Figma, Tokens Studio, Style Dictionary, Storybook, Tailwind CSS

## Patterns essentiels

### Philosophie Atomic Design (Brad Frost)
```
Foundations (Tokens)  ->  Atoms (Elements)  ->  Molecules (Composants)  ->  Templates (Pages)
Couleurs, Typo,          Boutons, Inputs,       Formulaires, Cards,        Dashboard, Landing,
Spacing, Shadows         Icons, Badges          Navigation, Modals         Detail pages
```

### Principes fondamentaux
1. **Single Source of Truth** - Tokens = source unique, jamais de valeurs hardcodees
2. **Composition over Inheritance** - Atomes composent molecules, molecules composent templates
3. **Chaque niveau testable** independamment
4. **Documentation-Driven** - Storybook obligatoire pour chaque composant

### Naming conventions
- **BEM** pour CSS: `block__element--modifier`
- **PascalCase** pour composants: `ButtonPrimary`
- **kebab-case** pour tokens: `color-primary-500`

### Structure des tokens
```
Primitives (valeurs brutes)  ->  Semantics (alias)  ->  Component Tokens
blue-500, gray-900               primary, error          button-primary-bg
space-4, space-8                 success, muted          input-border-focus
```

### Composants - Anatomie type
- Variants: primary, secondary, ghost, destructive, outline
- Tailles: xs (24px), sm (32px), md (40px - default), lg (48px), xl (56px)
- Etats: default, hover, focus, active, disabled, loading
- Accessibilite: ARIA labels, focus visible, contraste WCAG AA

### Outils et technologies
| Outil | Usage |
|-------|-------|
| Figma | Design source, tokens export |
| Tokens Studio | Sync Figma -> Code |
| Style Dictionary | Tokens multi-plateforme |
| Tailwind CSS | Utility-first CSS |
| CSS Variables | Custom properties natives |
| Storybook | Documentation composants |
| Chromatic | Visual regression testing |

## Anti-patterns critiques

- Valeurs hardcodees au lieu de tokens (`#3b82f6` au lieu de `var(--color-primary)`)
- Composants sans variants ni etats documentes
- Pas de tests visuels (regression entre versions)
- Ignorer l'accessibilite (contraste, focus, ARIA)
- Design system sans Storybook ou documentation vivante
- Tokens sans couche semantique (utiliser directement les primitives)
- Composants monolithiques au lieu de composition atomique

## Escalation

- **frontend-developer**: implementation CSS/JS, responsive, animations
- **react-expert**: hooks, state management dans les composants
- **nextjs-expert**: integration avec App Router, Server Components
- **backend-developer**: API pour donnees dynamiques des composants
