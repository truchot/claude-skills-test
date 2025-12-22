---
name: "Buttons Expert"
description: "Expert en boutons - Variants, tailles, états, accessibilité"
---

# Buttons Expert

Tu es expert en **systèmes de boutons** pour design systems. Tu guides la création de boutons cohérents, accessibles et réutilisables.

## Anatomie d'un Bouton

```
┌─────────────────────────────────────────────────────────────────────┐
│                        BUTTON ANATOMY                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  ┌────┐                                         ┌────┐      │   │
│   │  │Icon│    Label Text                           │Icon│      │   │
│   │  │Left│                                         │Right│     │   │
│   │  └────┘                                         └────┘      │   │
│   └─────────────────────────────────────────────────────────────┘   │
│        ↑                    ↑                           ↑           │
│   Left Icon           Label (required)            Right Icon        │
│   (optional)                                      (optional)        │
│                                                                      │
│   Padding: var(--btn-padding-y) var(--btn-padding-x)                │
│   Gap: var(--space-2)                                               │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## Variants

| Variant | Usage | Exemple |
|---------|-------|---------|
| **primary** | Action principale, CTA | "Enregistrer", "Acheter" |
| **secondary** | Action secondaire | "Annuler", "Retour" |
| **ghost** | Action tertiaire, liens | "En savoir plus" |
| **destructive** | Actions dangereuses | "Supprimer", "Annuler l'abonnement" |
| **outline** | Alternative au secondary | Actions secondaires |

## Tailles

| Taille | Height | Padding | Font Size | Usage |
|--------|--------|---------|-----------|-------|
| xs | 24px | 4px 8px | 12px | Compact UI, tables |
| sm | 32px | 6px 12px | 14px | Dense layouts |
| md | 40px | 8px 16px | 14px | **Default** |
| lg | 48px | 12px 24px | 16px | Touch-friendly |
| xl | 56px | 16px 32px | 18px | Hero CTAs |

## CSS Implementation

```css
/* ══════════════════════════════════════════════════════════════════
   BUTTON BASE
   ══════════════════════════════════════════════════════════════════ */

.btn {
  /* Reset */
  appearance: none;
  border: none;
  cursor: pointer;
  text-decoration: none;

  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);

  /* Typography */
  font-family: var(--font-sans);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  white-space: nowrap;

  /* Default size (md) */
  height: 40px;
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-sm);

  /* Shape */
  border-radius: var(--radius-md, 0.5rem);

  /* Transitions */
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.1s ease;

  /* Focus */
  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  /* Disabled */
  &:disabled,
  &[aria-disabled="true"] {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}

/* ══════════════════════════════════════════════════════════════════
   VARIANTS
   ══════════════════════════════════════════════════════════════════ */

/* Primary */
.btn--primary {
  background-color: var(--color-primary);
  color: white;

  &:hover {
    background-color: var(--color-primary-hover);
  }

  &:active {
    background-color: var(--color-primary-active);
  }
}

/* Secondary */
.btn--secondary {
  background-color: var(--color-gray-100);
  color: var(--color-gray-900);

  &:hover {
    background-color: var(--color-gray-200);
  }

  &:active {
    background-color: var(--color-gray-300);
  }
}

/* Ghost */
.btn--ghost {
  background-color: transparent;
  color: var(--color-primary);

  &:hover {
    background-color: var(--color-primary-light);
  }

  &:active {
    background-color: var(--color-gray-200);
  }
}

/* Destructive */
.btn--destructive {
  background-color: var(--color-error);
  color: white;

  &:hover {
    background-color: var(--color-red-600);
  }

  &:active {
    background-color: var(--color-red-700);
  }
}

/* Outline */
.btn--outline {
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-foreground);

  &:hover {
    background-color: var(--color-gray-50);
    border-color: var(--color-gray-400);
  }
}

/* ══════════════════════════════════════════════════════════════════
   SIZES
   ══════════════════════════════════════════════════════════════════ */

.btn--xs {
  height: 24px;
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-xs);
  border-radius: var(--radius-sm, 0.25rem);
}

.btn--sm {
  height: 32px;
  padding: var(--space-1-5) var(--space-3);
  font-size: var(--font-size-sm);
}

.btn--lg {
  height: 48px;
  padding: var(--space-3) var(--space-6);
  font-size: var(--font-size-base);
}

.btn--xl {
  height: 56px;
  padding: var(--space-4) var(--space-8);
  font-size: var(--font-size-lg);
}

/* ══════════════════════════════════════════════════════════════════
   MODIFIERS
   ══════════════════════════════════════════════════════════════════ */

/* Full width */
.btn--full {
  width: 100%;
}

/* Icon only */
.btn--icon-only {
  padding: 0;
  aspect-ratio: 1;
  width: auto;
}

.btn--icon-only.btn--xs { width: 24px; }
.btn--icon-only.btn--sm { width: 32px; }
.btn--icon-only.btn--md { width: 40px; }
.btn--icon-only.btn--lg { width: 48px; }
.btn--icon-only.btn--xl { width: 56px; }

/* ══════════════════════════════════════════════════════════════════
   LOADING STATE
   ══════════════════════════════════════════════════════════════════ */

.btn--loading {
  position: relative;
  color: transparent !important;
  pointer-events: none;
}

.btn--loading::after {
  content: '';
  position: absolute;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: btn-spin 0.6s linear infinite;
}

@keyframes btn-spin {
  to { transform: rotate(360deg); }
}
```

## React Component

```tsx
import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isIconOnly = !children && (leftIcon || rightIcon);

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        className={cn(
          'btn',
          `btn--${variant}`,
          `btn--${size}`,
          {
            'btn--loading': loading,
            'btn--full': fullWidth,
            'btn--icon-only': isIconOnly,
          },
          className
        )}
        {...props}
      >
        {leftIcon && <span className="btn__icon btn__icon--left">{leftIcon}</span>}
        {children && <span className="btn__label">{children}</span>}
        {rightIcon && <span className="btn__icon btn__icon--right">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

## Tailwind Component

```tsx
const buttonVariants = {
  primary: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-active',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300',
  ghost: 'bg-transparent text-primary hover:bg-primary/10',
  destructive: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
  outline: 'bg-transparent border border-gray-300 text-gray-900 hover:bg-gray-50',
};

const buttonSizes = {
  xs: 'h-6 px-2 text-xs rounded',
  sm: 'h-8 px-3 text-sm rounded-md',
  md: 'h-10 px-4 text-sm rounded-md',
  lg: 'h-12 px-6 text-base rounded-md',
  xl: 'h-14 px-8 text-lg rounded-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base
        'inline-flex items-center justify-center gap-2',
        'font-medium whitespace-nowrap',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        // Variants
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

## Storybook Stories

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { PlusIcon, ArrowRightIcon } from '@heroicons/react/20/solid';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive', 'outline'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="md">MD</Button>
      <Button size="lg">LG</Button>
      <Button size="xl">XL</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button leftIcon={<PlusIcon className="w-4 h-4" />}>Add Item</Button>
      <Button rightIcon={<ArrowRightIcon className="w-4 h-4" />}>Continue</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};
```

## Accessibilité (A11y)

### Exigences

| Critère | Requirement |
|---------|-------------|
| Focus visible | Outline ou ring visible au focus |
| Contraste | 4.5:1 minimum pour le texte |
| Touch target | 44x44px minimum sur mobile |
| États | Visuellement distincts (hover, active, disabled) |
| Loading | aria-busy="true" pendant chargement |
| Disabled | aria-disabled + styles visuels |

### Keyboard Navigation

```
Tab        → Focus sur le bouton
Enter      → Déclenche l'action
Space      → Déclenche l'action (natif)
```

### ARIA Attributes

```html
<!-- Bouton standard -->
<button type="button">Click me</button>

<!-- Bouton loading -->
<button type="button" aria-busy="true" aria-disabled="true">
  <span class="sr-only">Chargement en cours</span>
</button>

<!-- Bouton toggle -->
<button type="button" aria-pressed="true">
  Toggle
</button>

<!-- Bouton avec description -->
<button type="button" aria-describedby="help-text">
  Submit
</button>
<p id="help-text">This will submit your form</p>

<!-- Icon button -->
<button type="button" aria-label="Close dialog">
  <XIcon aria-hidden="true" />
</button>
```

## Checklist Buttons

- [ ] 5 variants minimum (primary, secondary, ghost, destructive, outline)
- [ ] 5 tailles (xs, sm, md, lg, xl)
- [ ] États : hover, focus, active, disabled, loading
- [ ] Support icônes (left, right, icon-only)
- [ ] Full width option
- [ ] Focus ring visible (3:1 contraste)
- [ ] Touch target 44x44px minimum
- [ ] aria-disabled, aria-busy pour loading
- [ ] Storybook avec tous les variants
- [ ] Tests unitaires et a11y
