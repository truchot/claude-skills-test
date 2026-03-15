# Tokens Guide - Design System

## Architecture des tokens (3 niveaux)

### 1. Primitives (valeurs brutes)
```css
:root {
  --blue-50: #eff6ff; --blue-500: #3b82f6; --blue-600: #2563eb; --blue-700: #1d4ed8;
  --gray-50: #f9fafb; --gray-900: #111827;
  --green-500: #22c55e; --red-500: #ef4444;
  --space-1: 0.25rem; --space-2: 0.5rem; --space-4: 1rem; --space-6: 1.5rem; --space-8: 2rem;
  --font-sans: 'Inter', system-ui, sans-serif; --font-mono: 'JetBrains Mono', monospace;
  --text-sm: 0.875rem; --text-base: 1rem; --text-lg: 1.125rem; --text-xl: 1.25rem;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05); --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --radius-sm: 0.25rem; --radius-md: 0.5rem; --radius-lg: 0.75rem; --radius-full: 9999px;
}
```

### 2. Semantiques (alias par usage)
```css
:root {
  --color-primary: var(--blue-600);
  --color-primary-hover: var(--blue-700);
  --color-secondary: var(--gray-600);
  --color-success: var(--green-500);
  --color-error: var(--red-500);
  --color-background: white;
  --color-foreground: var(--gray-900);
  --color-muted: var(--gray-500);
}

/* Dark mode */
[data-theme="dark"] {
  --color-primary: var(--blue-500);
  --color-background: var(--gray-900);
  --color-foreground: var(--gray-50);
}
```

### 3. Component tokens (specifiques)
```css
:root {
  --btn-primary-bg: var(--color-primary);
  --btn-primary-text: white;
  --btn-primary-hover: var(--color-primary-hover);
  --input-border: var(--gray-300);
  --input-border-focus: var(--color-primary);
  --input-bg: var(--color-background);
  --card-shadow: var(--shadow-sm);
  --card-radius: var(--radius-lg);
}
```

## Tailwind CSS integration
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#2563eb', hover: '#1d4ed8', light: '#eff6ff' },
        success: '#22c55e',
        error: '#ef4444',
      },
      spacing: { '4.5': '1.125rem' },
      borderRadius: { DEFAULT: '0.5rem' },
    },
  },
};
```

## Style Dictionary (multi-plateforme)
```json
{
  "color": {
    "primary": { "value": "#2563eb", "type": "color" },
    "success": { "value": "#22c55e", "type": "color" }
  },
  "spacing": {
    "sm": { "value": "8px", "type": "spacing" },
    "md": { "value": "16px", "type": "spacing" }
  }
}
```
Genere: CSS variables, iOS Swift, Android XML, JS/TS constants

## Regles
1. Jamais de valeur hardcodee dans un composant
2. Token primitif -> semantique -> composant (3 niveaux)
3. Dark mode = changer les semantiques, pas les composants
4. Documenter chaque token avec son usage
5. Utiliser le format W3C Design Tokens quand possible
