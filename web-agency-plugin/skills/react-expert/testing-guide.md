# Testing Guide - React Expert

## Setup
```bash
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D vitest jsdom
```

## Configuration Vitest
```tsx
// vitest.config.ts
export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', globals: true, setupFiles: './src/test/setup.ts' },
});
// src/test/setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
afterEach(() => cleanup());
```

## Queries - Priorite d'accessibilite
1. `getByRole('button', { name: /submit/i })` -- prefere
2. `getByLabelText(/email/i)` -- formulaires
3. `getByText(/welcome/i)` -- contenu textuel
4. `getByTestId('x')` -- dernier recours

Types: getBy (throw), queryBy (null), findBy (async), + variantes All

## User Events
```tsx
const user = userEvent.setup(); // Toujours au debut du test
await user.click(element);
await user.type(input, 'Hello');
await user.keyboard('{Enter}');
await user.selectOptions(select, ['option1']);
await user.tab();
```

## Custom Render avec Providers
```tsx
function AllProviders({ children }) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}
function customRender(ui, options?) {
  return render(ui, { wrapper: AllProviders, ...options });
}
```

## Test de formulaire
```tsx
it('submits with values', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  render(<LoginForm onSubmit={onSubmit} />);
  await user.type(screen.getByLabelText(/email/i), 'john@example.com');
  await user.click(screen.getByRole('button', { name: /submit/i }));
  expect(onSubmit).toHaveBeenCalledWith({ email: 'john@example.com' });
});
```

## Tests async
- `findBy` pour attendre un element: `await screen.findByText('John')`
- `waitFor` pour assertions complexes

## Hooks testing
- `renderHook(() => useMyHook())` pour tester des hooks isoles
- `act()` pour operations async dans les hooks

## Anti-patterns
- Tester l'implementation (`component.state`) au lieu du comportement
- getByTestId partout au lieu de getByRole
- waitFor inutile quand findBy suffit
- fireEvent au lieu de userEvent
