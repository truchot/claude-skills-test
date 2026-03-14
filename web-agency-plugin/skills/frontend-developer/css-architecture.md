# CSS Architecture - Frontend Developer

## CSS Grid
```css
/* Layout 2D */
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }

/* Grid areas */
.layout {
  display: grid;
  grid-template-areas: "header header" "sidebar main" "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
```

## Flexbox
```css
/* Navigation responsive */
.nav { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
/* Centrage */
.center { display: flex; align-items: center; justify-content: center; }
/* Spacer pattern */
.spacer { flex: 1; }
```

## Custom Properties (CSS Variables)
```css
:root {
  --color-primary: #3b82f6;
  --color-text: #1f2937;
  --space-4: 1rem;
  --radius-md: 0.5rem;
}
[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-text: #f9fafb;
}
.btn { background: var(--color-primary); border-radius: var(--radius-md); }
```

## Responsive Design (Mobile-first)
```css
/* Mobile first */
.container { padding: 1rem; }
@media (min-width: 768px) { .container { padding: 2rem; max-width: 768px; } }
@media (min-width: 1024px) { .container { max-width: 1024px; } }

/* Fluid typography */
.title { font-size: clamp(1.5rem, 4vw, 3rem); }

/* Container queries */
.card-container { container-type: inline-size; }
@container (min-width: 400px) { .card { flex-direction: row; } }
```

## Tailwind CSS
```tsx
// Configuration: tailwind.config.js pour tokens custom
// Responsive: sm:, md:, lg:, xl:, 2xl:
// States: hover:, focus:, active:, disabled:, dark:
// Composition avec cn (clsx + twMerge)
import { cn } from '@/lib/utils';
function Button({ variant, className, ...props }) {
  return <button className={cn('px-4 py-2 rounded font-medium',
    variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
    variant === 'ghost' && 'bg-transparent hover:bg-gray-100',
    className)} {...props} />;
}

// CVA (Class Variance Authority) pour variants
import { cva } from 'class-variance-authority';
const button = cva('px-4 py-2 rounded font-medium', {
  variants: { intent: { primary: 'bg-blue-600 text-white', secondary: 'bg-gray-200' },
    size: { sm: 'text-sm py-1', md: 'text-base py-2' } },
  defaultVariants: { intent: 'primary', size: 'md' },
});
```

## Animations
```css
/* Transitions */
.btn { transition: background-color 150ms ease, transform 150ms ease; }
.btn:active { transform: scale(0.98); }

/* Keyframes */
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; } }
.animate-in { animation: fadeIn 300ms ease-out; }

/* Respect preferences */
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; } }
```

## Architecture CSS
- **BEM**: `.block__element--modifier` pour CSS classique
- **Utility-first**: Tailwind pour prototypage rapide et cohesion
- **CSS Modules**: `.module.css` pour scope automatique
- **CSS-in-JS**: styled-components/Emotion pour theming dynamique

## Anti-patterns
- `!important` systematique
- Valeurs hardcodees au lieu de variables/tokens
- CSS non-scope (styles globaux qui fuient)
- Animations sans `prefers-reduced-motion`
- Media queries desktop-first
- Nesting CSS trop profond (> 3 niveaux)
