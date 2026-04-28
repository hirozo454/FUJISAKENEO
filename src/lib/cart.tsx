"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Money = { amount: number; currencyCode: "JPY" | "USD" };

export type CartItem = {
  variantId: string;
  handle: string;
  title: string;
  variantTitle?: string;
  image: string;
  price: Money;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  remove: (variantId: string) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  clear: () => void;
  subtotal: Money;
  count: number;
};

const STORAGE_KEY = "amachi.cart.v1";
const CartCtx = createContext<CartState | null>(null);

function readStored(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readStored());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback<CartState["add"]>((item, quantity = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.variantId === item.variantId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { ...item, quantity }];
    });
  }, []);

  const remove = useCallback<CartState["remove"]>((variantId) => {
    setItems((prev) => prev.filter((p) => p.variantId !== variantId));
  }, []);

  const setQuantity = useCallback<CartState["setQuantity"]>((variantId, quantity) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((p) => p.variantId !== variantId)
        : prev.map((p) => (p.variantId === variantId ? { ...p, quantity } : p)),
    );
  }, []);

  const clear = useCallback<CartState["clear"]>(() => setItems([]), []);

  const value = useMemo<CartState>(() => {
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    const currencyCode = items[0]?.price.currencyCode ?? "JPY";
    const amount = items.reduce((sum, i) => sum + i.price.amount * i.quantity, 0);
    return {
      items,
      add,
      remove,
      setQuantity,
      clear,
      count,
      subtotal: { amount, currencyCode },
    };
  }, [items, add, remove, setQuantity, clear]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function formatMoney(money: Money) {
  return new Intl.NumberFormat(money.currencyCode === "JPY" ? "ja-JP" : "en-US", {
    style: "currency",
    currency: money.currencyCode,
    maximumFractionDigits: money.currencyCode === "JPY" ? 0 : 2,
  }).format(money.amount);
}
