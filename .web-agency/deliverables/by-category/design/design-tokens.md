---
id: design-tokens
name: Design Tokens
version: 1.0.0
category: design
status: active
phase: "3-conception"
order: 6
agents:
  - design-system-foundations/foundations/colors
  - design-system-foundations/foundations/typography
  - design-system-foundations/foundations/spacing
  - design-system-foundations/foundations/shadows
consumes:
  - wireframes
  - brand-guidelines
produces_for:
  - design-system-foundations/atoms/*
  - frontend-developer/foundations/css-moderne
  - frontend-developer/styling/*
tags: [design-system, tokens, css, variables, theming, colors, typography]
---

# Design Tokens

## Description

Variables de design centralisées définissant les couleurs, typographies, espacements, ombres et autres propriétés visuelles. Source unique de vérité pour le design system, utilisable en CSS, JS et outils de design.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | JSON + CSS Variables + Fichier Figma |
| **Emplacement** | `projects/[client-slug]/03-conception/design-tokens/` |
| **Nommage** | `tokens.json`, `tokens.css`, `tailwind.config.js` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Couleurs** - Palette complète avec sémantique
- [ ] **Typographie** - Familles, tailles, poids, line-height
- [ ] **Espacements** - Échelle de spacing
- [ ] **Rayons** - Border-radius
- [ ] **Ombres** - Box-shadows

### Sections Optionnelles

- [ ] **Breakpoints** - Points de rupture responsive
- [ ] **Z-index** - Échelle de superposition
- [ ] **Animations** - Durées et easings
- [ ] **Dark mode** - Variantes sombres

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Contraste WCAG | AA minimum (4.5:1 texte) | Auto (outil) | Oui |
| 2 | Nomenclature cohérente | Convention suivie | Manuel | Oui |
| 3 | Multi-format | JSON + CSS minimum | Manuel | Oui |
| 4 | Documenté | Chaque token expliqué | Manuel | Oui |
| 5 | Figma sync | Tokens dans Figma | Manuel | Non |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `ux-ui-design/*` | `wireframes` | Structure validée |
| `direction-artistique/*` | `brand-guidelines` | Identité visuelle |
| Client | Charte existante | Couleurs, logo |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Palette couleurs | Direction artistique | Ajuster |
| 2 | Typographie | Designer + Dev | Vérifier disponibilité fonts |
| 3 | Accessibilité | QA / Expert a11y | Corriger contrastes |

## Exemple

### Exemple Complet

```markdown
# Design Tokens - E-commerce Dupont

## Vue d'ensemble

```
tokens/
├── tokens.json           # Source de vérité
├── tokens.css            # CSS Variables
├── tailwind.config.js    # Config Tailwind
└── figma-tokens.json     # Export Figma
```

---

## 1. Couleurs

### 1.1 Palette Primitive

| Token | Valeur | Usage |
|-------|--------|-------|
| `color.gold.50` | #FFFBEB | Background très clair |
| `color.gold.100` | #FEF3C7 | Background clair |
| `color.gold.200` | #FDE68A | Accent léger |
| `color.gold.300` | #FCD34D | Accent |
| `color.gold.400` | #FBBF24 | Accent fort |
| `color.gold.500` | #F59E0B | **Principal** |
| `color.gold.600` | #D97706 | Hover |
| `color.gold.700` | #B45309 | Active |
| `color.gold.800` | #92400E | Texte sur clair |
| `color.gold.900` | #78350F | Texte foncé |

| Token | Valeur | Usage |
|-------|--------|-------|
| `color.brown.50` | #FAFAF9 | Background |
| `color.brown.100` | #F5F5F4 | Background alt |
| `color.brown.200` | #E7E5E4 | Border |
| `color.brown.500` | #78716C | Texte secondaire |
| `color.brown.700` | #44403C | Texte principal |
| `color.brown.900` | #1C1917 | Titres |

### 1.2 Sémantique

| Token | Référence | Usage |
|-------|-----------|-------|
| `color.primary` | gold.500 | Actions principales |
| `color.primary.hover` | gold.600 | Hover boutons |
| `color.primary.active` | gold.700 | Active/pressed |
| `color.secondary` | brown.700 | Actions secondaires |
| `color.background` | brown.50 | Fond de page |
| `color.surface` | white | Cartes, modals |
| `color.text` | brown.900 | Texte principal |
| `color.text.muted` | brown.500 | Texte secondaire |
| `color.border` | brown.200 | Bordures |
| `color.success` | #10B981 | Succès |
| `color.warning` | #F59E0B | Avertissement |
| `color.error` | #EF4444 | Erreur |

### 1.3 Vérification Contraste

| Combinaison | Ratio | WCAG AA | WCAG AAA |
|-------------|-------|---------|----------|
| text / background | 15.1:1 | ✅ | ✅ |
| text.muted / background | 4.6:1 | ✅ | ❌ |
| primary / white | 3.0:1 | ⚠️ Large only | ❌ |
| white / primary | 3.0:1 | ⚠️ Large only | ❌ |

---

## 2. Typographie

### 2.1 Familles

| Token | Valeur | Usage |
|-------|--------|-------|
| `font.family.heading` | 'Playfair Display', serif | Titres |
| `font.family.body` | 'Inter', sans-serif | Corps de texte |
| `font.family.mono` | 'JetBrains Mono', monospace | Code |

### 2.2 Tailles

| Token | Valeur | Rem | Usage |
|-------|--------|-----|-------|
| `font.size.xs` | 12px | 0.75rem | Labels, captions |
| `font.size.sm` | 14px | 0.875rem | Small text |
| `font.size.base` | 16px | 1rem | Body text |
| `font.size.lg` | 18px | 1.125rem | Lead text |
| `font.size.xl` | 20px | 1.25rem | H5 |
| `font.size.2xl` | 24px | 1.5rem | H4 |
| `font.size.3xl` | 30px | 1.875rem | H3 |
| `font.size.4xl` | 36px | 2.25rem | H2 |
| `font.size.5xl` | 48px | 3rem | H1 |

### 2.3 Poids

| Token | Valeur | Usage |
|-------|--------|-------|
| `font.weight.normal` | 400 | Body |
| `font.weight.medium` | 500 | Emphasis |
| `font.weight.semibold` | 600 | Subheadings |
| `font.weight.bold` | 700 | Headings |

### 2.4 Line Height

| Token | Valeur | Usage |
|-------|--------|-------|
| `line.height.tight` | 1.25 | Headings |
| `line.height.normal` | 1.5 | Body |
| `line.height.relaxed` | 1.75 | Long text |

---

## 3. Espacements

### 3.1 Échelle (base 4px)

| Token | Valeur | Usage |
|-------|--------|-------|
| `space.0` | 0 | Reset |
| `space.1` | 4px | Micro |
| `space.2` | 8px | XS |
| `space.3` | 12px | SM |
| `space.4` | 16px | MD (base) |
| `space.5` | 20px | - |
| `space.6` | 24px | LG |
| `space.8` | 32px | XL |
| `space.10` | 40px | 2XL |
| `space.12` | 48px | 3XL |
| `space.16` | 64px | 4XL |
| `space.20` | 80px | Section |
| `space.24` | 96px | Hero |

---

## 4. Rayons (Border Radius)

| Token | Valeur | Usage |
|-------|--------|-------|
| `radius.none` | 0 | Sharp |
| `radius.sm` | 4px | Subtle |
| `radius.md` | 8px | **Default** |
| `radius.lg` | 12px | Cards |
| `radius.xl` | 16px | Modals |
| `radius.full` | 9999px | Pills, avatars |

---

## 5. Ombres

| Token | Valeur | Usage |
|-------|--------|-------|
| `shadow.sm` | 0 1px 2px rgba(0,0,0,0.05) | Subtle lift |
| `shadow.md` | 0 4px 6px rgba(0,0,0,0.1) | Cards |
| `shadow.lg` | 0 10px 15px rgba(0,0,0,0.1) | Dropdowns |
| `shadow.xl` | 0 20px 25px rgba(0,0,0,0.1) | Modals |

---

## 6. Breakpoints

| Token | Valeur | Usage |
|-------|--------|-------|
| `screen.sm` | 640px | Mobile landscape |
| `screen.md` | 768px | Tablet |
| `screen.lg` | 1024px | Desktop |
| `screen.xl` | 1280px | Large desktop |
| `screen.2xl` | 1536px | Wide |

---

## 7. Fichiers Export

### tokens.json

```json
{
  "color": {
    "primary": {
      "value": "#F59E0B",
      "type": "color"
    },
    "primary-hover": {
      "value": "#D97706",
      "type": "color"
    }
  },
  "font": {
    "family": {
      "heading": {
        "value": "'Playfair Display', serif",
        "type": "fontFamily"
      },
      "body": {
        "value": "'Inter', sans-serif",
        "type": "fontFamily"
      }
    },
    "size": {
      "base": {
        "value": "16px",
        "type": "fontSize"
      }
    }
  },
  "space": {
    "4": {
      "value": "16px",
      "type": "spacing"
    }
  },
  "radius": {
    "md": {
      "value": "8px",
      "type": "borderRadius"
    }
  }
}
```

### tokens.css

```css
:root {
  /* Colors - Primitives */
  --color-gold-50: #FFFBEB;
  --color-gold-500: #F59E0B;
  --color-gold-600: #D97706;
  --color-gold-700: #B45309;

  --color-brown-50: #FAFAF9;
  --color-brown-200: #E7E5E4;
  --color-brown-500: #78716C;
  --color-brown-900: #1C1917;

  /* Colors - Semantic */
  --color-primary: var(--color-gold-500);
  --color-primary-hover: var(--color-gold-600);
  --color-primary-active: var(--color-gold-700);
  --color-background: var(--color-brown-50);
  --color-text: var(--color-brown-900);
  --color-text-muted: var(--color-brown-500);
  --color-border: var(--color-brown-200);

  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;

  /* Typography */
  --font-family-heading: 'Playfair Display', serif;
  --font-family-body: 'Inter', sans-serif;

  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
}
```

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          active: '#B45309',
        },
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
    },
  },
}
```
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Valeurs hardcodées | Incohérence, maintenance | Toujours utiliser tokens |
| Pas de sémantique | Difficile à comprendre | Nommer par usage, pas couleur |
| Trop de variations | Complexité inutile | Limiter l'échelle |
| Ignorer accessibilité | Non conforme WCAG | Vérifier contrastes |
| Un seul format | Pas adaptable | Exporter multi-format |

## Références

- [Design Tokens W3C](https://design-tokens.github.io/community-group/format/)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Tokens Studio for Figma](https://tokens.studio/)
- Livrables liés : `brand-guidelines`, `component-specs`, `wireframes`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | design-system-foundations | Création initiale |
