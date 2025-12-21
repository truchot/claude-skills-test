# Inputs Expert

Tu es expert en **systèmes de champs de saisie** pour design systems. Tu guides la création d'inputs cohérents, accessibles et fonctionnels.

## Types d'Inputs

```
┌─────────────────────────────────────────────────────────────────────┐
│                         INPUT TYPES                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  TEXT INPUTS                                                         │
│  ├── text       │ Texte simple                                      │
│  ├── email      │ Validation email                                  │
│  ├── password   │ Masqué + toggle visibility                        │
│  ├── number     │ Avec stepper optionnel                            │
│  ├── tel        │ Numéro de téléphone                               │
│  ├── url        │ Validation URL                                    │
│  ├── search     │ Avec clear button                                 │
│  └── textarea   │ Multi-lignes, auto-resize                         │
│                                                                      │
│  SELECTION INPUTS                                                    │
│  ├── select     │ Dropdown natif ou custom                          │
│  ├── checkbox   │ Toggle boolean                                    │
│  ├── radio      │ Sélection exclusive                               │
│  └── toggle     │ Switch on/off                                     │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## Anatomie d'un Input

```
┌────────────────────────────────────────────────────────────────────┐
│ Label *                                          Helper text (?)   │
├────────────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────────────┐ │
│ │ [Icon] │ Placeholder text...                        │ [Action] │ │
│ │  Left  │                                            │  Right   │ │
│ └────────────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────┤
│ ⚠ Error message or helper description                              │
└────────────────────────────────────────────────────────────────────┘
```

## États d'un Input

| État | Visuel | ARIA |
|------|--------|------|
| default | Border gris | - |
| hover | Border plus foncé | - |
| focus | Border primary + ring | - |
| filled | Border normal, texte visible | - |
| disabled | Grisé, cursor not-allowed | aria-disabled="true" |
| readonly | Style normal, non éditable | aria-readonly="true" |
| error | Border rouge, message erreur | aria-invalid="true" |
| success | Border vert, check icon | aria-invalid="false" |

## CSS Implementation

```css
/* ══════════════════════════════════════════════════════════════════
   INPUT BASE
   ══════════════════════════════════════════════════════════════════ */

.input {
  /* Reset */
  appearance: none;
  background: none;
  border: none;

  /* Layout */
  display: block;
  width: 100%;

  /* Sizing */
  height: 40px;
  padding: var(--space-2) var(--space-3);

  /* Typography */
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  color: var(--color-foreground);

  /* Appearance */
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);

  /* Transitions */
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  /* Placeholder */
  &::placeholder {
    color: var(--color-gray-400);
  }

  /* States */
  &:hover:not(:disabled) {
    border-color: var(--color-gray-400);
  }

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: var(--focus-ring);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--color-gray-50);
  }

  &[aria-invalid="true"] {
    border-color: var(--color-error);

    &:focus {
      --ring-color: var(--color-error);
      box-shadow: var(--focus-ring);
    }
  }
}

/* ══════════════════════════════════════════════════════════════════
   INPUT SIZES
   ══════════════════════════════════════════════════════════════════ */

.input--sm {
  height: 32px;
  padding: var(--space-1-5) var(--space-2-5);
  font-size: var(--font-size-xs);
}

.input--lg {
  height: 48px;
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-base);
}

/* ══════════════════════════════════════════════════════════════════
   INPUT WITH ADDONS
   ══════════════════════════════════════════════════════════════════ */

.input-group {
  position: relative;
  display: flex;
  align-items: stretch;
}

.input-group__addon {
  display: flex;
  align-items: center;
  padding: 0 var(--space-3);
  background-color: var(--color-gray-50);
  border: 1px solid var(--color-border);
  color: var(--color-gray-500);
}

.input-group__addon--left {
  border-right: none;
  border-radius: var(--radius-md) 0 0 var(--radius-md);
}

.input-group__addon--right {
  border-left: none;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

.input-group .input {
  flex: 1;
}

.input-group .input:not(:first-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.input-group .input:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

/* ══════════════════════════════════════════════════════════════════
   INPUT WITH ICON
   ══════════════════════════════════════════════════════════════════ */

.input-icon-wrapper {
  position: relative;
}

.input-icon-wrapper .input {
  padding-left: 2.5rem;
}

.input-icon-wrapper .input--icon-right {
  padding-left: var(--space-3);
  padding-right: 2.5rem;
}

.input-icon {
  position: absolute;
  top: 50%;
  left: var(--space-3);
  transform: translateY(-50%);
  color: var(--color-gray-400);
  pointer-events: none;
}

.input-icon--right {
  left: auto;
  right: var(--space-3);
}

/* ══════════════════════════════════════════════════════════════════
   TEXTAREA
   ══════════════════════════════════════════════════════════════════ */

.textarea {
  min-height: 80px;
  height: auto;
  resize: vertical;
  line-height: var(--line-height-relaxed);
}

.textarea--auto-resize {
  resize: none;
  overflow: hidden;
}

/* ══════════════════════════════════════════════════════════════════
   SELECT
   ══════════════════════════════════════════════════════════════════ */

.select {
  cursor: pointer;
  padding-right: 2.5rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}

/* ══════════════════════════════════════════════════════════════════
   CHECKBOX & RADIO
   ══════════════════════════════════════════════════════════════════ */

.checkbox,
.radio {
  /* Reset */
  appearance: none;
  margin: 0;

  /* Sizing */
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;

  /* Appearance */
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  cursor: pointer;

  /* Transitions */
  transition: all 0.15s ease;
}

.checkbox {
  border-radius: var(--radius-sm);
}

.radio {
  border-radius: 50%;
}

.checkbox:checked,
.radio:checked {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.checkbox:checked {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3E%3C/svg%3E");
  background-size: 100% 100%;
}

.radio:checked {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='3'/%3E%3C/svg%3E");
  background-size: 100% 100%;
}

.checkbox:focus-visible,
.radio:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

/* ══════════════════════════════════════════════════════════════════
   TOGGLE / SWITCH
   ══════════════════════════════════════════════════════════════════ */

.toggle {
  /* Reset */
  appearance: none;
  margin: 0;
  cursor: pointer;

  /* Sizing */
  width: 44px;
  height: 24px;
  flex-shrink: 0;

  /* Appearance */
  background-color: var(--color-gray-300);
  border-radius: 9999px;
  position: relative;

  /* Transitions */
  transition: background-color 0.2s ease;
}

.toggle::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease;
}

.toggle:checked {
  background-color: var(--color-primary);
}

.toggle:checked::before {
  transform: translateX(20px);
}

.toggle:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

.toggle:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## Form Field Component

```tsx
interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  helperText,
  error,
  required = false,
  disabled = false,
  leftIcon,
  rightIcon,
  ...props
}: FormFieldProps) {
  const inputId = `field-${name}`;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  return (
    <div className="form-field">
      <label htmlFor={inputId} className="form-field__label">
        {label}
        {required && <span className="form-field__required">*</span>}
      </label>

      <div className={cn('input-icon-wrapper', { 'has-error': !!error })}>
        {leftIcon && <span className="input-icon">{leftIcon}</span>}
        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn('input', {
            'input--with-icon-left': leftIcon,
            'input--with-icon-right': rightIcon,
          })}
          {...props}
        />
        {rightIcon && <span className="input-icon input-icon--right">{rightIcon}</span>}
      </div>

      {error ? (
        <p id={errorId} className="form-field__error" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="form-field__helper">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
```

## Accessibilité (A11y)

### Label Association

```html
<!-- Correct: label avec for -->
<label for="email">Email</label>
<input id="email" type="email" name="email" />

<!-- Correct: label enveloppant -->
<label>
  Email
  <input type="email" name="email" />
</label>

<!-- Incorrect: pas d'association -->
<label>Email</label>
<input type="email" name="email" />
```

### Error Handling

```html
<!-- Input avec erreur -->
<label for="email">Email *</label>
<input
  id="email"
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<p id="email-error" role="alert" class="error">
  Veuillez entrer une adresse email valide.
</p>
```

### Required Fields

```html
<label for="name">
  Name
  <span aria-hidden="true">*</span>
</label>
<input id="name" required aria-required="true" />
```

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Naviguer entre les champs |
| Space | Toggle checkbox/radio |
| Enter | Soumettre formulaire |
| Arrows | Naviguer dans select/radio group |
| Escape | Fermer dropdown |

## Validation Patterns

```tsx
// Validation regex patterns
const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+33|0)[1-9](\d{2}){4}$/,
  postalCode: /^\d{5}$/,
  url: /^https?:\/\/.+/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
};

// Validation messages
const messages = {
  required: 'Ce champ est requis',
  email: 'Adresse email invalide',
  minLength: (min: number) => `Minimum ${min} caractères`,
  maxLength: (max: number) => `Maximum ${max} caractères`,
  pattern: 'Format invalide',
};
```

## Checklist Inputs

- [ ] Types supportés : text, email, password, number, tel, url, search, textarea
- [ ] États : default, hover, focus, filled, disabled, error, success
- [ ] Tailles : sm, md, lg
- [ ] Addons : icônes left/right, prefix/suffix
- [ ] Label associé (for/id ou wrapping)
- [ ] aria-invalid + aria-describedby pour erreurs
- [ ] aria-required pour champs obligatoires
- [ ] Placeholder visible mais pas comme label
- [ ] Contraste 4.5:1 pour le texte
- [ ] Touch target 44x44px minimum
- [ ] Autocomplete attributes appropriés
