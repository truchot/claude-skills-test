---
id: component-specs
name: Spécifications Composants
version: 1.0.0
category: design
status: active
phase: "3-conception"
order: 8
agents:
  - design-system-foundations/atoms/orchestrator
  - design-system-foundations/molecules/orchestrator
  - ux-ui-design/design/component-design
consumes:
  - wireframes
  - design-tokens
  - ui-mockups
produces_for:
  - frontend-developer/frameworks/component-patterns
  - react-expert/components/*
  - frontend-developer/testing/component-testing
tags: [components, design-system, specs, atoms, molecules, ui]
---

# Spécifications Composants

## Description

Documentation technique des composants UI : structure, variantes, états, propriétés, comportements et guidelines d'utilisation. Sert de contrat entre designers et développeurs pour garantir la cohérence de l'implémentation.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown + Figma |
| **Emplacement** | `projects/[client-slug]/03-conception/components/` |
| **Nommage** | `[component-name].md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires (par composant)

- [ ] **Description** - Rôle et usage du composant
- [ ] **Anatomie** - Éléments constitutifs
- [ ] **Variantes** - Types disponibles
- [ ] **États** - Default, hover, focus, disabled, etc.
- [ ] **Props/API** - Propriétés configurables
- [ ] **Accessibilité** - Requirements WCAG

### Sections Optionnelles

- [ ] **Comportements** - Interactions, animations
- [ ] **Responsive** - Adaptations mobile
- [ ] **Do's and Don'ts** - Bonnes pratiques
- [ ] **Exemples de code** - Snippets d'implémentation

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Tous états documentés | Default, hover, focus, disabled, error | Manuel | Oui |
| 2 | Props définies | Nom, type, default, description | Manuel | Oui |
| 3 | Accessibilité | ARIA et keyboard documentés | Manuel | Oui |
| 4 | Tokens utilisés | Référence aux design tokens | Manuel | Oui |
| 5 | Figma à jour | Composant Figma existe | Manuel | Non |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `ux-ui-design/*` | `wireframes` | Structure validée |
| `design-system-foundations/*` | `design-tokens` | Variables de design |
| `ux-ui-design/*` | `ui-mockups` | Design haute fidélité |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Specs | Designer + Dev | Aligner |
| 2 | Accessibilité | Expert a11y | Corriger |
| 3 | Implémentation | Code review | Ajuster specs si besoin |

## Exemple

### Exemple Complet - Composant Button

```markdown
# Button

## Description

Élément interactif permettant à l'utilisateur de déclencher une action. Composant fondamental du design system.

## Anatomie

```
┌─────────────────────────────────────┐
│  [Icon]  Label  [Icon]  [Loading]   │
└─────────────────────────────────────┘
    ↑        ↑       ↑         ↑
 leadingIcon label trailingIcon spinner
```

| Élément | Requis | Description |
|---------|--------|-------------|
| `label` | Oui* | Texte du bouton |
| `leadingIcon` | Non | Icône avant le label |
| `trailingIcon` | Non | Icône après le label |
| `spinner` | Non | Indicateur de chargement |

*Label requis sauf pour icon-only buttons (avec aria-label)

---

## Variantes

### Par Importance

| Variante | Usage | Exemple |
|----------|-------|---------|
| `primary` | Action principale, CTA | "Ajouter au panier" |
| `secondary` | Action secondaire | "Annuler" |
| `outline` | Action tertiaire | "En savoir plus" |
| `ghost` | Action minimale | Navigation, liens |
| `destructive` | Action dangereuse | "Supprimer" |

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Primary    │  │  Secondary   │  │   Outline    │
│   (filled)   │  │   (filled)   │  │  (bordered)  │
└──────────────┘  └──────────────┘  └──────────────┘

┌──────────────┐  ┌──────────────┐
│    Ghost     │  │ Destructive  │
│ (text only)  │  │    (red)     │
└──────────────┘  └──────────────┘
```

### Par Taille

| Taille | Height | Padding | Font Size | Usage |
|--------|--------|---------|-----------|-------|
| `sm` | 32px | 12px 16px | 14px | Compact UI |
| `md` | 40px | 12px 20px | 16px | **Default** |
| `lg` | 48px | 16px 24px | 18px | CTA, hero |

### Icon-only

```
┌────┐  ┌────┐  ┌────┐
│ 🔍 │  │ ✕  │  │ ☰  │
└────┘  └────┘  └────┘
 32px    40px    48px
```

---

## États

### Vue d'ensemble

| État | Visuel | Interaction |
|------|--------|-------------|
| Default | Couleur normale | Cliquable |
| Hover | Couleur + sombre | Curseur pointer |
| Focus | Outline visible | Tab navigation |
| Active | Couleur + foncée | Pendant le clic |
| Disabled | Opacité 50% | Non cliquable |
| Loading | Spinner + disabled | En attente |

### Spécifications Visuelles

```css
/* Primary Button States */

.button-primary {
  /* Default */
  background: var(--color-primary);        /* #F59E0B */
  color: white;

  /* Hover */
  &:hover {
    background: var(--color-primary-hover); /* #D97706 */
  }

  /* Focus */
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  /* Active */
  &:active {
    background: var(--color-primary-active); /* #B45309 */
  }

  /* Disabled */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

### Diagramme d'états

```
                    ┌─────────┐
                    │ DEFAULT │
                    └────┬────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌─────────┐    ┌─────────┐    ┌──────────┐
    │  HOVER  │    │  FOCUS  │    │ DISABLED │
    └────┬────┘    └────┬────┘    └──────────┘
         │               │
         └───────┬───────┘
                 │
                 ▼
           ┌─────────┐
           │ ACTIVE  │
           └────┬────┘
                │
                ▼
           ┌─────────┐
           │ LOADING │ (si async)
           └─────────┘
```

---

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Label du bouton |
| `variant` | 'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive' | 'primary' | Style du bouton |
| `size` | 'sm' \| 'md' \| 'lg' | 'md' | Taille du bouton |
| `disabled` | boolean | false | Désactive le bouton |
| `loading` | boolean | false | Affiche un spinner |
| `leadingIcon` | ReactNode | - | Icône avant le label |
| `trailingIcon` | ReactNode | - | Icône après le label |
| `fullWidth` | boolean | false | Prend toute la largeur |
| `type` | 'button' \| 'submit' \| 'reset' | 'button' | Type HTML |
| `onClick` | () => void | - | Handler de clic |
| `asChild` | boolean | false | Render as child element |

### TypeScript Interface

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  asChild?: boolean;
  className?: string;
}
```

---

## Accessibilité

### Requirements

| Critère | Implémentation |
|---------|----------------|
| Role | `<button>` natif (pas de div) |
| Focus visible | Outline 2px avec offset |
| Contraste | 4.5:1 minimum texte/fond |
| Touch target | Minimum 44x44px |
| Disabled | `aria-disabled` + `disabled` |
| Loading | `aria-busy="true"` + text SR |

### Keyboard Navigation

| Touche | Action |
|--------|--------|
| `Tab` | Focus sur le bouton |
| `Shift+Tab` | Focus précédent |
| `Enter` | Déclenche onClick |
| `Space` | Déclenche onClick |

### ARIA Attributes

```jsx
// Button standard
<button type="button">
  Ajouter au panier
</button>

// Button loading
<button
  type="button"
  aria-busy="true"
  aria-disabled="true"
>
  <span className="sr-only">Chargement en cours</span>
  <Spinner aria-hidden="true" />
  Ajout en cours...
</button>

// Icon-only button
<button
  type="button"
  aria-label="Fermer le modal"
>
  <XIcon aria-hidden="true" />
</button>
```

---

## Comportements

### Loading State

```
1. User clicks button
2. onClick fires
3. Parent sets loading=true
4. Button shows spinner, becomes disabled
5. Async operation completes
6. Parent sets loading=false
7. Button returns to default state
```

### Animation

| Transition | Duration | Easing |
|------------|----------|--------|
| Background color | 150ms | ease-in-out |
| Transform (active) | 100ms | ease-out |
| Opacity (disabled) | 150ms | ease-in-out |

```css
.button {
  transition:
    background-color 150ms ease-in-out,
    transform 100ms ease-out,
    opacity 150ms ease-in-out;
}

.button:active:not(:disabled) {
  transform: scale(0.98);
}
```

---

## Do's and Don'ts

### ✅ Do

- Utiliser des verbes d'action : "Ajouter", "Envoyer", "Confirmer"
- Un seul bouton primaire par section
- Désactiver pendant les opérations async
- Fournir un feedback visuel (loading)

### ❌ Don't

- Texte trop long (max 3-4 mots)
- Plusieurs boutons primaires côte à côte
- Bouton disabled sans explication
- Utiliser pour la navigation (préférer Link)

---

## Exemples de Code

### React + Tailwind

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-hover focus-visible:ring-primary',
        secondary: 'bg-brown-700 text-white hover:bg-brown-800',
        outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
        ghost: 'text-brown-700 hover:bg-brown-100',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
      },
      size: {
        sm: 'h-8 px-4 text-sm',
        md: 'h-10 px-5 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export function Button({
  children,
  variant,
  size,
  loading,
  leadingIcon,
  trailingIcon,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
      ) : leadingIcon ? (
        <span className="mr-2" aria-hidden="true">{leadingIcon}</span>
      ) : null}

      {children}

      {trailingIcon && !loading && (
        <span className="ml-2" aria-hidden="true">{trailingIcon}</span>
      )}
    </button>
  );
}
```

### Usage

```tsx
// Primary CTA
<Button variant="primary" size="lg">
  Ajouter au panier
</Button>

// With icon
<Button leadingIcon={<ShoppingCart />}>
  Commander
</Button>

// Loading state
<Button loading>
  Traitement...
</Button>

// Destructive
<Button variant="destructive">
  Supprimer
</Button>
```

---

## Figma

- Component: `🔘 Button`
- Variants: 5 variants × 3 sizes × 6 states
- Auto-layout: Yes
- Constraints: Hug content / Fill container

[Lien Figma](https://figma.com/file/xxx/design-system)
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Specs incomplètes | Implémentation incorrecte | Documenter tous les états |
| Pas de props | Dev doit deviner | API explicite |
| Ignorer a11y | Non accessible | Section accessibilité obligatoire |
| Pas de code example | Interprétations variées | Fournir snippets |
| Specs non à jour | Désync design/code | Process de mise à jour |

## Références

- [Storybook](https://storybook.js.org/)
- [Radix UI](https://www.radix-ui.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- Livrables liés : `design-tokens`, `wireframes`, `react-component`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | design-system-foundations | Création initiale |
