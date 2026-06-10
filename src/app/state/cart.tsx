import { createContext, useContext, useMemo, useReducer, useEffect, ReactNode } from 'react';
import { products, Product } from '../data/products';

export type CartLine = {
  id: string;
  productId: string;
  variantLabel: string;
  qty: number;
};

type State = { lines: CartLine[] };
type Action =
  | { type: 'add'; productId: string; variantLabel: string; qty?: number }
  | { type: 'inc'; id: string }
  | { type: 'dec'; id: string }
  | { type: 'remove'; id: string }
  | { type: 'clear' };

const CART_STORAGE_KEY = 'mishri_cart_v1';

function initCartState(): State {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) return { lines: JSON.parse(saved) };
  } catch (e) {}
  // Default to empty cart instead of mock data
  return { lines: [] };
}

function reducer(state: State, a: Action): State {
  switch (a.type) {
    case 'add': {
      const existing = state.lines.find(l => l.productId === a.productId && l.variantLabel === a.variantLabel);
      if (existing) return { lines: state.lines.map(l => l === existing ? { ...l, qty: l.qty + (a.qty ?? 1) } : l) };
      return { lines: [...state.lines, { id: crypto.randomUUID(), productId: a.productId, variantLabel: a.variantLabel, qty: a.qty ?? 1 }] };
    }
    case 'inc': return { lines: state.lines.map(l => l.id === a.id ? { ...l, qty: l.qty + 1 } : l) };
    case 'dec': return { lines: state.lines.map(l => l.id === a.id ? { ...l, qty: Math.max(1, l.qty - 1) } : l) };
    case 'remove': return { lines: state.lines.filter(l => l.id !== a.id) };
    case 'clear': return { lines: [] };
  }
}

type Ctx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (productId: string, variantLabel: string, qty?: number) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  resolve: (l: CartLine) => { product: Product; price: number } | null;
};

const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] }, initCartState);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.lines));
  }, [state.lines]);

  const resolve = (l: CartLine) => {
    const p = products.find(p => p.id === l.productId);
    if (!p) return null;
    const v = p.variants.find(v => v.label === l.variantLabel) ?? p.variants[0];
    return { product: p, price: v.price };
  };

  const count = state.lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = state.lines.reduce((s, l) => {
    const r = resolve(l); return r ? s + r.price * l.qty : s;
  }, 0);

  const value = useMemo<Ctx>(() => ({
    lines: state.lines, count, subtotal,
    add: (productId, variantLabel, qty) => dispatch({ type: 'add', productId, variantLabel, qty }),
    inc: id => dispatch({ type: 'inc', id }),
    dec: id => dispatch({ type: 'dec', id }),
    remove: id => dispatch({ type: 'remove', id }),
    clear: () => dispatch({ type: 'clear' }),
    resolve,
  }), [state, count, subtotal]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

const noopCart: Ctx = {
  lines: [],
  count: 0,
  subtotal: 0,
  add: () => undefined,
  inc: () => undefined,
  dec: () => undefined,
  remove: () => undefined,
  clear: () => undefined,
  resolve: (_l: CartLine) => null,
};

export function useCart(): Ctx {
  const c = useContext(CartCtx);
  return c ?? noopCart;
}

// Cart badge pulse on add
export function useCartPulse() {
  const { count } = useCart();
  useEffect(() => {}, [count]);
  return count;
}
