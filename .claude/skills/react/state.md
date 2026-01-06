---
name: react/state
description: State management React - Context, Zustand, Redux Toolkit
tags: [state, context, zustand, redux, store]
---

# State Management React

## Quand Utiliser Quoi

| Solution | Cas d'usage |
|----------|-------------|
| useState | État local simple |
| useReducer | État local complexe |
| Context | État partagé léger, thème, auth |
| Zustand | État global simple/moyen |
| Redux Toolkit | État global complexe, équipe large |

## Context API

### Création

```tsx
interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: Credentials) => {
    const user = await authApi.login(credentials);
    setUser(user);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Hook personnalisé

```tsx
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Usage
const { user, login, logout } = useAuth();
```

### Composition de Providers

```tsx
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

## Zustand

### Store basique

```tsx
import { create } from 'zustand';

interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// Usage
function Counter() {
  const { count, increment } = useCounterStore();
  return <button onClick={increment}>{count}</button>;
}
```

### Store avec async

```tsx
interface UserStore {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  fetchUsers: async () => {
    set({ loading: true });
    const users = await api.getUsers();
    set({ users, loading: false });
  },
}));
```

### Slices pattern

```tsx
interface AuthSlice {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
}

interface CartSlice {
  items: CartItem[];
  addItem: (item: CartItem) => void;
}

const createAuthSlice = (set: SetState) => ({
  user: null,
  login: async (credentials) => {
    const user = await authApi.login(credentials);
    set({ user });
  },
});

const createCartSlice = (set: SetState) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
});

const useStore = create<AuthSlice & CartSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createCartSlice(...a),
}));
```

### Persistence

```tsx
import { persist } from 'zustand/middleware';

const useStore = create(
  persist<StoreType>(
    (set) => ({
      // store
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ user: state.user }), // Sélectif
    }
  )
);
```

## Redux Toolkit

### Configuration

```tsx
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
```

### Hooks typés

```tsx
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Usage
function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <button onClick={() => dispatch(increment())}>
      {count}
    </button>
  );
}
```

### Async Thunks

```tsx
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await api.getUsers();
    return response.data;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
```

## Anti-patterns

- ❌ Tout mettre en global state
- ❌ Context pour état qui change souvent
- ❌ Props drilling vs Context
- ❌ Store sans types TypeScript

## Checklist

- [ ] État local avant global
- [ ] Types TypeScript complets
- [ ] Selectors pour performance
- [ ] Actions sémantiques
