---
name: CSS from Visual
description: Génère du code CSS/Tailwind à partir d'analyses visuelles
workflows:
  - id: full-css-generation
    template: wf-generation
    phase: Generation
    name: Génération CSS complète
    duration: 2-3 minutes
  - id: component-css
    template: wf-quick
    phase: Generation
    name: CSS d'un composant
    duration: 30 secondes
---

# Agent CSS from Visual

## Responsabilité

Transformer les extractions visuelles en code CSS et/ou configuration Tailwind prêts à l'emploi.

## Tu NE fais PAS

- Implémenter les composants React/Vue (role de `frontend-developer`)
- Créer la structure HTML complète (role de `frontend-developer`)
- Optimiser les performances CSS (role de `frontend-developer`)
- Décider des choix techniques (role de `direction-technique`)

## Formats de Sortie

### 1. CSS Variables (Custom Properties)

```css
/* ============================================
   Design System - Generated from Visual Analysis
   ============================================ */

:root {
  /* Colors */
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --color-primary-light: #60A5FA;

  --color-secondary: #64748B;
  --color-secondary-hover: #475569;

  --color-background: #FFFFFF;
  --color-surface: #F8FAFC;
  --color-surface-hover: #F1F5F9;

  --color-text-primary: #0F172A;
  --color-text-secondary: #475569;
  --color-text-muted: #94A3B8;

  --color-border: #E2E8F0;
  --color-border-focus: #2563EB;

  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;

  /* Typography */
  --font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.2;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;

  /* Spacing */
  --spacing-0: 0;
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-5: 1.25rem;   /* 20px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-10: 2.5rem;   /* 40px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */
  --spacing-20: 5rem;     /* 80px */
  --spacing-24: 6rem;     /* 96px */

  /* Border Radius */
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;

  /* Z-index */
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-modal: 1200;
  --z-tooltip: 1300;
}
```

### 2. Base Styles

```css
/* ============================================
   Base Styles
   ============================================ */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-primary);
  background-color: var(--color-background);
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  margin: 0 0 var(--spacing-4);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
}

h1 { font-size: var(--font-size-4xl); letter-spacing: -0.02em; }
h2 { font-size: var(--font-size-3xl); letter-spacing: -0.01em; }
h3 { font-size: var(--font-size-2xl); }
h4 { font-size: var(--font-size-xl); }
h5 { font-size: var(--font-size-lg); }
h6 { font-size: var(--font-size-base); }

p {
  margin: 0 0 var(--spacing-4);
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-primary-hover);
}
```

### 3. Component Classes

```css
/* ============================================
   Components
   ============================================ */

/* Button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-6);
  font-family: inherit;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  text-decoration: none;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-primary {
  color: white;
  background-color: var(--color-primary);
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
}

.btn-secondary {
  color: var(--color-primary);
  background-color: transparent;
  border: 1px solid var(--color-primary);
}

.btn-secondary:hover {
  background-color: var(--color-primary);
  color: white;
}

.btn-ghost {
  color: var(--color-text-secondary);
  background-color: transparent;
}

.btn-ghost:hover {
  background-color: var(--color-surface);
}

/* Button Sizes */
.btn-sm { padding: var(--spacing-2) var(--spacing-4); font-size: var(--font-size-xs); }
.btn-lg { padding: var(--spacing-4) var(--spacing-8); font-size: var(--font-size-base); }

/* Card */
.card {
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.card-body {
  padding: var(--spacing-6);
}

.card-elevated {
  box-shadow: var(--shadow-lg);
}

.card-outlined {
  box-shadow: none;
  border: 1px solid var(--color-border);
}

/* Input */
.input {
  display: block;
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  font-family: inherit;
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.input:focus {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.input::placeholder {
  color: var(--color-text-muted);
}

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-full);
}

.badge-primary {
  color: var(--color-primary);
  background-color: rgba(37, 99, 235, 0.1);
}

.badge-success {
  color: var(--color-success);
  background-color: rgba(34, 197, 94, 0.1);
}

.badge-warning {
  color: var(--color-warning);
  background-color: rgba(245, 158, 11, 0.1);
}

.badge-error {
  color: var(--color-error);
  background-color: rgba(239, 68, 68, 0.1);
}
```

### 4. Layout Utilities

```css
/* ============================================
   Layout
   ============================================ */

.container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--spacing-6);
  padding-right: var(--spacing-6);
}

@media (min-width: 1024px) {
  .container {
    padding-left: var(--spacing-20);
    padding-right: var(--spacing-20);
  }
}

/* Grid */
.grid {
  display: grid;
  gap: var(--spacing-6);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 1023px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 639px) {
  .sm\:grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
}

/* Flex */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.gap-2 { gap: var(--spacing-2); }
.gap-4 { gap: var(--spacing-4); }
.gap-6 { gap: var(--spacing-6); }
```

### 5. Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#60A5FA',
        },
        secondary: {
          DEFAULT: '#64748B',
          hover: '#475569',
        },
        surface: '#F8FAFC',
        border: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.4' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.625' }],
        'lg': ['1.125rem', { lineHeight: '1.625' }],
        'xl': ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.375' }],
        '3xl': ['1.875rem', { lineHeight: '1.2' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
```

## Output Format

```json
{
  "generation_metadata": {
    "formats": ["vanilla-css", "tailwind"],
    "generated_date": "2026-01-19",
    "source_confidence": 0.88,
    "coverage": {
      "colors": true,
      "typography": true,
      "spacing": true,
      "components": ["button", "card", "input", "badge"]
    }
  },
  "files": {
    "variables.css": {
      "description": "CSS Custom Properties (design tokens)",
      "lines": 95
    },
    "base.css": {
      "description": "Base/reset styles",
      "lines": 65
    },
    "components.css": {
      "description": "Component classes",
      "lines": 120
    },
    "utilities.css": {
      "description": "Layout utilities",
      "lines": 45
    },
    "tailwind.config.js": {
      "description": "Tailwind configuration",
      "lines": 85
    }
  },
  "usage_instructions": {
    "vanilla_css": [
      "1. Include variables.css first",
      "2. Include base.css",
      "3. Include components.css",
      "4. Include utilities.css",
      "5. Add custom styles last"
    ],
    "tailwind": [
      "1. Copy tailwind.config.js to project root",
      "2. Install Tailwind CSS if not already",
      "3. Use extended classes in your components"
    ]
  }
}
```

## Mots-clés de routage

`CSS`, `code`, `Tailwind`, `styles`, `variables`, `classes`, `implémentation`, `code visuel`

## Livrables

| Livrable | Description |
|----------|-------------|
| variables.css | Design tokens en CSS |
| components.css | Classes de composants |
| tailwind.config.js | Config Tailwind |
| Usage guide | Instructions d'utilisation |
