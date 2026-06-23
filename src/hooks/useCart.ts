import { useEffect, useState, useCallback } from "react";

export interface CartLine {
  productId: string;
  name: string;
  supplier: string;
  price: number;
  quantity: number;
  size?: string;
  gradient: string;
}

const KEY = "educa.cart";

function read(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function write(items: CartLine[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("educa-cart"));
}

export function useCart() {
  const [items, setItems] = useState<CartLine[]>([]);

  useEffect(() => {
    setItems(read());
    const sync = () => setItems(read());
    window.addEventListener("educa-cart", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("educa-cart", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const add = useCallback((line: CartLine) => {
    const current = read();
    const idx = current.findIndex((l) => l.productId === line.productId && l.size === line.size);
    if (idx >= 0) current[idx].quantity += line.quantity;
    else current.push(line);
    write(current);
  }, []);

  const update = useCallback((productId: string, size: string | undefined, quantity: number) => {
    const current = read().map((l) => (l.productId === productId && l.size === size ? { ...l, quantity } : l));
    write(current.filter((l) => l.quantity > 0));
  }, []);

  const remove = useCallback((productId: string, size?: string) => {
    write(read().filter((l) => !(l.productId === productId && l.size === size)));
  }, []);

  const clear = useCallback(() => write([]), []);

  const subtotal = items.reduce((s, l) => s + l.price * l.quantity, 0);
  const count = items.reduce((s, l) => s + l.quantity, 0);

  return { items, add, update, remove, clear, subtotal, count };
}