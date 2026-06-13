import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react';
import { products, type Product } from '../data/products';

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

const CART_KEY = 'mishri_cart_v1';

function loadCartState(): State {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return { lines: parsed };
    }
  } catch {
    // Corrupt storage — start fresh
  }
  return { lines: [] };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      const existing = state.lines.find(
        l => l.productId === action.productId && l.variantLabel === action.variantLabel
      );
      if (existing) {
        return {
          lines: state.lines.map(l =>
            l === existing ? { ...l, qty: l.qty + (action.qty ?? 1) } : l
          ),
        };
      }
      return {
        lines: [
          ...state.lines,
          {
            id: crypto.randomUUID(),
            productId: action.productId,
            variantLabel: action.variantLabel,
            qty: action.qty ?? 1,
          },
        ],
      };
    }
    case 'inc':
      return { lines: state.lines.map(l => (l.id === action.id ? { ...l, qty: l.qty + 1 } : l)) };
    case 'dec':
      return {
        lines: state.lines.map(l =>
          l.id === action.id ? { ...l, qty: Math.max(1, l.qty - 1) } : l
        ),
      };
    case 'remove':
      return { lines: state.lines.filter(l => l.id !== action.id) };
    case 'clear':
      return { lines: [] };
    default:
      return state;
  }
}

type CartCtx = {
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

const CartContext = createContext<CartCtx | null>(null);

const noopCart: CartCtx = {
  lines: [],
  count: 0,
  subtotal: 0,
  add: () => undefined,
  inc: () => undefined,
  dec: () => undefined,
  remove: () => undefined,
  clear: () => undefined,
  resolve: () => null,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadCartState);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(state.lines));
    } catch {
      // Storage quota exceeded — silently ignore
    }
  }, [state.lines]);

  const resolve = useMemo(
    () =>
      (l: CartLine): { product: Product; price: number } | null => {
        const product = products.find(p => p.id === l.productId);
        if (!product) return null;
        const variant = product.variants.find(v => v.label === l.variantLabel) ?? product.variants[0];
        const price = variant?.price ?? 0;
        return { product, price };
      },
    []
  );

  const count = state.lines.reduce((sum, l) => sum + l.qty, 0);

  const subtotal = useMemo(
    () =>
      state.lines.reduce((sum, l) => {
        const r = resolve(l);
        return r ? sum + r.price * l.qty : sum;
      }, 0),
    [state.lines, resolve]
  );

  const value = useMemo<CartCtx>(
    () => ({
      lines: state.lines,
      count,
      subtotal,
      add: (productId, variantLabel, qty) =>
        dispatch({ type: 'add', productId, variantLabel, qty }),
      inc: id => dispatch({ type: 'inc', id }),
      dec: id => dispatch({ type: 'dec', id }),
      remove: id => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
      resolve,
    }),
    [state.lines, count, subtotal, resolve]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartCtx {
  return useContext(CartContext) ?? noopCart;
}
