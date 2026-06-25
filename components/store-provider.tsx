"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { ITEMS_BY_ID, type Mode, type Producto } from "@/lib/data";

type Carritos = Record<Mode, Record<string, number>>;

type CartLine = Producto & { cantidad: number };

type StoreCtx = {
  mode: Mode;
  setMode: (m: Mode) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  add: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  lines: CartLine[];
  count: number;
  total: number;
};

const Ctx = createContext<StoreCtx | null>(null);

const EMPTY: Carritos = { tienda: {} };
const MODE_KEY = "antumalen_modo";
const CART_KEY = "antumalen_carritos";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("tienda");
  const [carritos, setCarritos] = useState<Carritos>(EMPTY);
  const [cartOpen, setCartOpen] = useState(false);

  // Hidratar desde localStorage tras montar (evita mismatch SSR).
  useEffect(() => {
    try {
      const m = localStorage.getItem(MODE_KEY);
      if (m === "tienda") setModeState(m);
      const c = localStorage.getItem(CART_KEY);
      if (c) setCarritos({ ...EMPTY, ...(JSON.parse(c) as Carritos) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  const persist = useCallback((next: Carritos) => {
    setCarritos(next);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    try {
      localStorage.setItem(MODE_KEY, m);
    } catch {
      /* ignore */
    }
  }, []);

  const mutate = useCallback(
    (fn: (cart: Record<string, number>) => void) => {
      const cart = { ...carritos[mode] };
      fn(cart);
      persist({ ...carritos, [mode]: cart });
    },
    [carritos, mode, persist],
  );

  const add = useCallback(
    (id: string) => {
      mutate((cart) => {
        cart[id] = (cart[id] ?? 0) + 1;
      });
      toast.success(`${ITEMS_BY_ID[id]?.nombre ?? "Producto"} agregado`, {
        description: "Revisa tu pedido cuando quieras.",
      });
    },
    [mutate],
  );

  const inc = useCallback(
    (id: string) =>
      mutate((cart) => {
        cart[id] = (cart[id] ?? 0) + 1;
      }),
    [mutate],
  );

  const dec = useCallback(
    (id: string) =>
      mutate((cart) => {
        cart[id] = (cart[id] ?? 0) - 1;
        if (cart[id] <= 0) delete cart[id];
      }),
    [mutate],
  );

  const remove = useCallback(
    (id: string) =>
      mutate((cart) => {
        delete cart[id];
      }),
    [mutate],
  );

  const clear = useCallback(
    () => persist({ ...carritos, [mode]: {} }),
    [carritos, mode, persist],
  );

  const cart = carritos[mode];
  const lines = useMemo<CartLine[]>(
    () =>
      Object.entries(cart)
        .map(([id, cantidad]) => {
          const p = ITEMS_BY_ID[id];
          return p ? { ...p, cantidad } : null;
        })
        .filter((x): x is CartLine => x !== null),
    [cart],
  );

  const count = useMemo(
    () => Object.values(cart).reduce((t, n) => t + n, 0),
    [cart],
  );
  const total = useMemo(
    () => lines.reduce((t, i) => t + i.precio * i.cantidad, 0),
    [lines],
  );

  const value = useMemo<StoreCtx>(
    () => ({
      mode,
      setMode,
      cartOpen,
      setCartOpen,
      add,
      inc,
      dec,
      remove,
      clear,
      lines,
      count,
      total,
    }),
    [mode, setMode, cartOpen, add, inc, dec, remove, clear, lines, count, total],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore debe usarse dentro de <StoreProvider>");
  return ctx;
}
