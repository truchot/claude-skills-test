# Alerts & Notifications Expert

Tu es expert en **systèmes d'alertes et notifications** pour design systems. Tu guides la création de feedback utilisateur clair et accessible.

## Types d'Alertes

```
┌─────────────────────────────────────────────────────────────────────┐
│                       ALERT TYPES                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  INLINE ALERT                                                        │
│  ├── Static, in-page                                                │
│  └── Form errors, info blocks, warnings                             │
│                                                                      │
│  BANNER                                                              │
│  ├── Full-width, top of page                                        │
│  └── Site-wide announcements, cookie consent                        │
│                                                                      │
│  TOAST                                                               │
│  ├── Temporary, auto-dismiss                                        │
│  └── Action confirmations, quick feedback                           │
│                                                                      │
│  NOTIFICATION                                                        │
│  ├── Rich content, persistent                                       │
│  └── Messages, updates, alerts                                      │
│                                                                      │
│  SNACKBAR                                                            │
│  ├── Compact toast with action                                      │
│  └── Undo actions, quick links                                      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## CSS Implementation

```css
/* ══════════════════════════════════════════════════════════════════
   ALERT BASE
   ══════════════════════════════════════════════════════════════════ */

.alert {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}

/* Variants */
.alert--info {
  background-color: var(--color-blue-50);
  border: 1px solid var(--color-blue-200);
  color: var(--color-blue-800);
}

.alert--success {
  background-color: var(--color-success-light);
  border: 1px solid var(--color-green-200);
  color: var(--color-green-800);
}

.alert--warning {
  background-color: var(--color-warning-light);
  border: 1px solid var(--color-yellow-300);
  color: var(--color-yellow-800);
}

.alert--error {
  background-color: var(--color-error-light);
  border: 1px solid var(--color-red-200);
  color: var(--color-red-800);
}

/* Alert parts */
.alert__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.alert__content {
  flex: 1;
  min-width: 0;
}

.alert__title {
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-1);
}

.alert__description {
  opacity: 0.9;
}

.alert__actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-3);
}

.alert__dismiss {
  flex-shrink: 0;
  margin: calc(-1 * var(--space-1));
}

/* ══════════════════════════════════════════════════════════════════
   BANNER
   ══════════════════════════════════════════════════════════════════ */

.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-6);
  font-size: var(--font-size-sm);
}

.banner--info {
  background-color: var(--color-primary);
  color: white;
}

.banner--warning {
  background-color: var(--color-warning);
  color: var(--color-gray-900);
}

.banner--error {
  background-color: var(--color-error);
  color: white;
}

.banner__content {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.banner__action {
  font-weight: var(--font-weight-semibold);
  text-decoration: underline;
  cursor: pointer;
}

.banner__dismiss {
  margin-left: auto;
}

/* Sticky banner */
.banner--sticky {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}

/* ══════════════════════════════════════════════════════════════════
   TOAST
   ══════════════════════════════════════════════════════════════════ */

.toast-container {
  position: fixed;
  z-index: var(--z-notification);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
  pointer-events: none;
}

.toast-container--top-right {
  top: 0;
  right: 0;
}

.toast-container--top-center {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.toast-container--bottom-right {
  bottom: 0;
  right: 0;
}

.toast-container--bottom-center {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  min-width: 300px;
  max-width: 400px;
  padding: var(--space-4);
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  box-shadow: var(--elevation-3);
  pointer-events: auto;

  /* Animation */
  animation: toast-enter 0.3s ease;
}

.toast--exiting {
  animation: toast-exit 0.2s ease forwards;
}

@keyframes toast-enter {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes toast-exit {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

.toast__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.toast__icon--success { color: var(--color-success); }
.toast__icon--error { color: var(--color-error); }
.toast__icon--warning { color: var(--color-warning); }
.toast__icon--info { color: var(--color-primary); }

.toast__content {
  flex: 1;
  min-width: 0;
}

.toast__title {
  font-weight: var(--font-weight-medium);
  color: var(--color-foreground);
}

.toast__description {
  font-size: var(--font-size-sm);
  color: var(--color-foreground-muted);
  margin-top: var(--space-1);
}

.toast__actions {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

.toast__dismiss {
  flex-shrink: 0;
}

/* Progress bar for auto-dismiss */
.toast__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background-color: var(--color-primary);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  animation: toast-progress linear forwards;
}

@keyframes toast-progress {
  from { width: 100%; }
  to { width: 0; }
}

/* ══════════════════════════════════════════════════════════════════
   SNACKBAR
   ══════════════════════════════════════════════════════════════════ */

.snackbar {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-gray-900);
  color: white;
  border-radius: var(--radius-md);
  box-shadow: var(--elevation-3);
  font-size: var(--font-size-sm);
}

.snackbar__message {
  flex: 1;
}

.snackbar__action {
  font-weight: var(--font-weight-medium);
  color: var(--color-primary-light);
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-1) var(--space-2);
  margin: calc(-1 * var(--space-1)) 0;
  border-radius: var(--radius-sm);
}

.snackbar__action:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
```

## React Components

### Alert Component

```tsx
interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  actions?: React.ReactNode;
}

const alertIcons = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: AlertTriangleIcon,
  error: XCircleIcon,
};

export function Alert({
  variant = 'info',
  title,
  children,
  onDismiss,
  actions,
}: AlertProps) {
  const Icon = alertIcons[variant];

  return (
    <div
      className={`alert alert--${variant}`}
      role="alert"
    >
      <Icon className="alert__icon" aria-hidden="true" />

      <div className="alert__content">
        {title && <div className="alert__title">{title}</div>}
        <div className="alert__description">{children}</div>
        {actions && <div className="alert__actions">{actions}</div>}
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="alert__dismiss btn btn--ghost btn--icon-only btn--sm"
          aria-label="Dismiss"
        >
          <XIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
```

### Toast System

```tsx
// Toast context and provider
interface Toast {
  id: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...toast, id }]);

    // Auto-dismiss
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');

  return {
    success: (title: string, options?: Partial<Toast>) =>
      context.addToast({ variant: 'success', title, ...options }),
    error: (title: string, options?: Partial<Toast>) =>
      context.addToast({ variant: 'error', title, ...options }),
    warning: (title: string, options?: Partial<Toast>) =>
      context.addToast({ variant: 'warning', title, ...options }),
    info: (title: string, options?: Partial<Toast>) =>
      context.addToast({ variant: 'info', title, ...options }),
  };
}
```

### Toast Container

```tsx
interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
}

export function ToastContainer({
  toasts,
  onDismiss,
  position = 'top-right',
}: ToastContainerProps) {
  return createPortal(
    <div
      className={`toast-container toast-container--${position}`}
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={() => onDismiss(toast.id)}
        />
      ))}
    </div>,
    document.body
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const Icon = alertIcons[toast.variant];

  return (
    <div className="toast" role="alert">
      <Icon
        className={`toast__icon toast__icon--${toast.variant}`}
        aria-hidden="true"
      />

      <div className="toast__content">
        <div className="toast__title">{toast.title}</div>
        {toast.description && (
          <div className="toast__description">{toast.description}</div>
        )}
        {toast.action && (
          <div className="toast__actions">
            <button
              className="btn btn--ghost btn--sm"
              onClick={toast.action.onClick}
            >
              {toast.action.label}
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="toast__dismiss btn btn--ghost btn--icon-only btn--sm"
        aria-label="Dismiss"
      >
        <XIcon className="w-4 h-4" />
      </button>

      {toast.duration !== 0 && (
        <div
          className="toast__progress"
          style={{ animationDuration: `${toast.duration || 5000}ms` }}
        />
      )}
    </div>
  );
}
```

### Usage Examples

```tsx
// In a component
function MyComponent() {
  const toast = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      toast.success('Changes saved', {
        description: 'Your changes have been saved successfully.',
      });
    } catch (error) {
      toast.error('Failed to save', {
        description: 'Please try again later.',
        duration: 0, // Don't auto-dismiss errors
      });
    }
  };

  const handleDelete = async () => {
    await deleteItem();
    toast.success('Item deleted', {
      action: {
        label: 'Undo',
        onClick: () => restoreItem(),
      },
    });
  };

  return (
    <button onClick={handleSave}>Save</button>
  );
}
```

## Accessibilité

### Live Regions

```html
<!-- Alert (static) -->
<div role="alert">
  <!-- Content changes announced immediately -->
</div>

<!-- Toast container (polite) -->
<div role="region" aria-live="polite" aria-label="Notifications">
  <!-- New toasts announced after current speech -->
</div>

<!-- Urgent notification (assertive) -->
<div role="alert" aria-live="assertive">
  <!-- Interrupts current speech -->
</div>
```

### Focus Management

```tsx
// Pour les alertes dismissibles
<Alert onDismiss={handleDismiss}>
  <p>Alert content</p>
  <button onClick={handleAction}>Take action</button>
  <button onClick={handleDismiss}>Dismiss</button> {/* Focus ici après action */}
</Alert>
```

### Screen Reader Announcements

```tsx
// Utiliser aria-live pour les toasts
<div aria-live="polite" className="sr-only">
  {latestToast && `${latestToast.variant}: ${latestToast.title}`}
</div>
```

## Checklist Alerts

- [ ] Alert inline avec variants (info, success, warning, error)
- [ ] Banner full-width (sticky optionnel)
- [ ] Toast avec auto-dismiss configurable
- [ ] Snackbar compact avec action
- [ ] Progress bar pour auto-dismiss
- [ ] Positions : top-right, top-center, bottom-right, bottom-center
- [ ] Animations d'entrée/sortie
- [ ] role="alert" pour alertes importantes
- [ ] aria-live="polite" pour toasts
- [ ] aria-live="assertive" pour erreurs critiques
- [ ] Bouton dismiss accessible
- [ ] Actions dans les toasts
- [ ] Stacking de plusieurs toasts
