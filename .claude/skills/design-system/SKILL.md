---
name: design-system
description: Design Systems avec Atomic Design - tokens, composants, documentation
tags: [design-system, atomic-design, tokens, composants, figma, storybook]
---

# Design System

## Quand Utiliser
- Créer ou auditer un design system
- Définir des design tokens (couleurs, typo, spacing)
- Structurer des composants (atoms → molecules → templates)
- Intégrer Figma avec le code

## Philosophie Atomic Design

```
FOUNDATIONS (Tokens)
    ↓
  ATOMS (Boutons, inputs, icônes)
    ↓
MOLECULES (Cards, forms, navigation)
    ↓
TEMPLATES (Layouts, pages)
```

## Design Tokens

### Couleurs
```css
:root {
  /* Primitives */
  --color-blue-500: #3b82f6;
  --color-gray-100: #f3f4f6;
  
  /* Sémantiques */
  --color-primary: var(--color-blue-500);
  --color-background: var(--color-gray-100);
  --color-text: var(--color-gray-900);
  
  /* États */
  --color-success: #22c55e;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
}
```

### Typographie
```css
:root {
  /* Familles */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;
  
  /* Échelle modulaire (ratio 1.25) */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.25rem;    /* 20px */
  --text-xl: 1.563rem;   /* 25px */
  --text-2xl: 1.953rem;  /* 31px */
  
  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

### Spacing (8pt grid)
```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
}
```

### Élévation
```css
:root {
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.15);
}
```

## Composants

### Atoms - Éléments de base

#### Button
```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
}
```

#### Input
```tsx
interface InputProps {
  type: 'text' | 'email' | 'password' | 'number';
  size: 'sm' | 'md' | 'lg';
  error?: string;
  disabled?: boolean;
}
```

### Molecules - Assemblages fonctionnels

#### Card
```tsx
interface CardProps {
  variant: 'default' | 'elevated' | 'outlined';
  padding: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

#### Form Field
```tsx
interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}
```

## Conventions

| Type | Format | Exemple |
|------|--------|---------|
| Token | `kebab-case` | `color-primary-500` |
| Composant | `PascalCase` | `ButtonPrimary` |
| CSS Class | `BEM` | `card__header--highlighted` |

## Outils

| Outil | Usage |
|-------|-------|
| Figma | Design source |
| Tokens Studio | Sync Figma → Code |
| Style Dictionary | Tokens multi-plateforme |
| Storybook | Documentation composants |
| Chromatic | Visual regression |

## Checklist Design System

- [ ] Tokens définis (colors, typography, spacing, shadows)
- [ ] Atoms créés (button, input, icon, badge)
- [ ] Molecules assemblées (card, form, navigation)
- [ ] Documentation Storybook
- [ ] Tests de contraste WCAG
- [ ] Responsive breakpoints
- [ ] Dark mode support

## Références
- https://atomicdesign.bradfrost.com/
- https://www.designsystems.com/
- https://storybook.js.org/
