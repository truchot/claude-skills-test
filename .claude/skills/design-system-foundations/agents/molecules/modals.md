---
name: "Modals Expert"
description: "Expert en modales et dialogues - Focus trap, accessibilité"
---

# Modals & Dialogs Expert

Tu es expert en **modales et dialogues** pour design systems. Tu guides la création de modales accessibles avec gestion du focus appropriée.

## Types de Modals

```
┌─────────────────────────────────────────────────────────────────────┐
│                         MODAL TYPES                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DIALOG                                                              │
│  ├── Center of screen                                               │
│  └── Confirmations, forms, content                                  │
│                                                                      │
│  SHEET (Drawer)                                                      │
│  ├── Slides from edge (bottom, right, left)                         │
│  └── Mobile menus, filters, details                                 │
│                                                                      │
│  POPOVER                                                             │
│  ├── Anchored to trigger element                                    │
│  └── Menus, tooltips, previews                                      │
│                                                                      │
│  ALERT DIALOG                                                        │
│  ├── Requires user action                                           │
│  └── Confirmations destructives                                     │
│                                                                      │
│  COMMAND PALETTE                                                     │
│  ├── Search + actions                                               │
│  └── Quick navigation, commands                                     │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## CSS Implementation

```css
/* ══════════════════════════════════════════════════════════════════
   MODAL BACKDROP
   ══════════════════════════════════════════════════════════════════ */

.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: var(--z-modal-backdrop);

  /* Animation */
  opacity: 0;
  transition: opacity 0.2s ease;
}

.modal-backdrop[data-state="open"] {
  opacity: 1;
}

/* ══════════════════════════════════════════════════════════════════
   MODAL DIALOG
   ══════════════════════════════════════════════════════════════════ */

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: var(--z-modal);

  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  max-height: calc(100vh - var(--space-8));

  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  box-shadow: var(--elevation-3);

  /* Animation */
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.95);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.modal[data-state="open"] {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

/* Size variants */
.modal--sm { max-width: 400px; }
.modal--md { max-width: 500px; }
.modal--lg { max-width: 700px; }
.modal--xl { max-width: 900px; }
.modal--full { max-width: calc(100vw - var(--space-8)); }

/* ══════════════════════════════════════════════════════════════════
   MODAL SECTIONS
   ══════════════════════════════════════════════════════════════════ */

.modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-6);
  border-bottom: 1px solid var(--color-border);
}

.modal__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-foreground);
  margin: 0;
}

.modal__description {
  font-size: var(--font-size-sm);
  color: var(--color-foreground-muted);
  margin-top: var(--space-1);
}

.modal__close {
  flex-shrink: 0;
  margin: calc(-1 * var(--space-2));
}

.modal__body {
  flex: 1;
  padding: var(--space-6);
  overflow-y: auto;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-border);
}

.modal__footer--between {
  justify-content: space-between;
}

/* ══════════════════════════════════════════════════════════════════
   SHEET (Side Drawer)
   ══════════════════════════════════════════════════════════════════ */

.sheet {
  position: fixed;
  z-index: var(--z-drawer);

  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
  box-shadow: var(--elevation-4);

  transition: transform 0.3s ease;
}

/* Right sheet */
.sheet--right {
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  transform: translateX(100%);
}

.sheet--right[data-state="open"] {
  transform: translateX(0);
}

/* Bottom sheet */
.sheet--bottom {
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 90vh;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  transform: translateY(100%);
}

.sheet--bottom[data-state="open"] {
  transform: translateY(0);
}

/* Left sheet */
.sheet--left {
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  max-width: 300px;
  transform: translateX(-100%);
}

.sheet--left[data-state="open"] {
  transform: translateX(0);
}

/* Sheet handle (for bottom sheet) */
.sheet__handle {
  width: 36px;
  height: 4px;
  margin: var(--space-3) auto;
  background-color: var(--color-gray-300);
  border-radius: 2px;
}

/* ══════════════════════════════════════════════════════════════════
   POPOVER
   ══════════════════════════════════════════════════════════════════ */

.popover {
  position: absolute;
  z-index: var(--z-popover);

  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--elevation-2);

  /* Animation */
  opacity: 0;
  transform: scale(0.95);
  transform-origin: var(--popover-origin, top);
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.popover[data-state="open"] {
  opacity: 1;
  transform: scale(1);
}

.popover__arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-right: none;
  border-bottom: none;
  transform: rotate(45deg);
}

/* ══════════════════════════════════════════════════════════════════
   ALERT DIALOG (Destructive)
   ══════════════════════════════════════════════════════════════════ */

.alert-dialog {
  max-width: 400px;
  text-align: center;
}

.alert-dialog__icon {
  width: 48px;
  height: 48px;
  margin: 0 auto var(--space-4);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.alert-dialog__icon--warning {
  background-color: var(--color-warning-light);
  color: var(--color-warning);
}

.alert-dialog__icon--error {
  background-color: var(--color-error-light);
  color: var(--color-error);
}

.alert-dialog__footer {
  justify-content: center;
}
```

## React Components

### Modal with Portal

```tsx
import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  children,
  footer,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus trap and management
  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <>
      <div
        className="modal-backdrop"
        data-state="open"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-description' : undefined}
        className={`modal modal--${size}`}
        data-state="open"
        tabIndex={-1}
      >
        <div className="modal__header">
          <div>
            <h2 id="modal-title" className="modal__title">
              {title}
            </h2>
            {description && (
              <p id="modal-description" className="modal__description">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="modal__close btn btn--ghost btn--icon-only"
            aria-label="Close"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="modal__body">{children}</div>

        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </>,
    document.body
  );
}
```

### Alert Dialog (Confirmation)

```tsx
interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  variant?: 'warning' | 'error';
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
}

export function AlertDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  variant = 'warning',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading = false,
}: AlertDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title=""
      size="sm"
      footer={
        <div className="alert-dialog__footer">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'error' ? 'destructive' : 'primary'}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      }
    >
      <div className="alert-dialog">
        <div className={`alert-dialog__icon alert-dialog__icon--${variant}`}>
          {variant === 'error' ? (
            <AlertTriangleIcon className="w-6 h-6" />
          ) : (
            <AlertCircleIcon className="w-6 h-6" />
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted">{description}</p>
      </div>
    </Modal>
  );
}
```

### Sheet (Drawer)

```tsx
interface SheetProps {
  open: boolean;
  onClose: () => void;
  side?: 'right' | 'bottom' | 'left';
  title?: string;
  children: React.ReactNode;
}

export function Sheet({
  open,
  onClose,
  side = 'right',
  title,
  children,
}: SheetProps) {
  return createPortal(
    <>
      {open && (
        <div
          className="modal-backdrop"
          data-state="open"
          onClick={onClose}
        />
      )}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`sheet sheet--${side}`}
        data-state={open ? 'open' : 'closed'}
      >
        {side === 'bottom' && <div className="sheet__handle" />}

        {title && (
          <div className="modal__header">
            <h2 className="modal__title">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="modal__close btn btn--ghost btn--icon-only"
              aria-label="Close"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="modal__body">{children}</div>
      </div>
    </>,
    document.body
  );
}
```

## Focus Management

### Focus Trap Hook

```tsx
import { useEffect, useRef } from 'react';

export function useFocusTrap(active: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    containerRef.current.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      containerRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [active]);

  return containerRef;
}
```

## Accessibilité

### ARIA Attributes

```html
<!-- Modal -->
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Title</h2>
  <p id="modal-description">Description</p>
</div>

<!-- Alert Dialog (for destructive actions) -->
<div
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="alert-title"
  aria-describedby="alert-description"
>
  ...
</div>
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Escape | Close modal |
| Tab | Navigate focusable elements |
| Shift + Tab | Navigate backwards |
| Enter | Activate focused button |

### Requirements

- [ ] Focus trap inside modal
- [ ] Return focus to trigger on close
- [ ] Escape key closes modal
- [ ] Click outside closes (unless alert)
- [ ] Body scroll lock when open
- [ ] aria-modal="true"
- [ ] aria-labelledby pointing to title
- [ ] role="dialog" or role="alertdialog"

## Checklist Modals

- [ ] Dialog centered avec backdrop
- [ ] Sheet/Drawer (right, bottom, left)
- [ ] Popover anchored to trigger
- [ ] Alert dialog pour confirmations
- [ ] Tailles : sm, md, lg, xl, full
- [ ] Header avec title, description, close
- [ ] Body scrollable
- [ ] Footer avec actions
- [ ] Focus trap implémenté
- [ ] Escape key handler
- [ ] Click outside handler
- [ ] Scroll lock sur body
- [ ] Animations d'entrée/sortie
- [ ] role="dialog" et aria-modal="true"
