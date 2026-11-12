'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { MAX_QTY, getProductById } from '@/data/products';

/**
 * One place for everything interactive in the shop:
 * the bag, the wishlist, filters, search, the cart drawer and the quick-view modal.
 *
 * The bag stores only { id, variant, qty }. Names and prices are always looked
 * up from src/data/products.js, so editing a price there updates every bag.
 */

const StoreContext = createContext(null);

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}

const CART_KEY = 'solene-cart-v2';
const WISH_KEY = 'solene-wish-v2';

/** Same product + same options = same bag line. */
export const lineKey = (id, variant) =>
  id +
  '|' +
  Object.keys(variant)
    .sort()
    .map((k) => `${k}=${variant[k]}`)
    .join('&');

function load(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode or storage full: the bag simply won't persist */
  }
}

/** Drops saved lines for products or options that no longer exist in the catalogue. */
function isValidLine(line) {
  const product = line && getProductById(line.id);
  if (!product || !line.variant || typeof line.variant !== 'object') return false;
  if (!Number.isInteger(line.qty) || line.qty < 1 || line.qty > MAX_QTY) return false;
  return product.variants.every((v) => v.options.includes(line.variant[v.name]));
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wish, setWish] = useState([]);
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState('all'); // all | ring | necklace | bracelet | earrings | saved
  const [query, setQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [viewId, setViewId] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const timer = useRef(null);

  // Load saved bag + wishlist once, after hydration.
  useEffect(() => {
    const savedCart = load(CART_KEY);
    const savedWish = load(WISH_KEY);
    if (Array.isArray(savedCart)) setCart(savedCart.filter(isValidLine));
    if (Array.isArray(savedWish)) setWish(savedWish.filter((id) => getProductById(id)));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) save(CART_KEY, cart);
  }, [cart, ready]);
  useEffect(() => {
    if (ready) save(WISH_KEY, wish);
  }, [wish, ready]);

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastMsg(''), 2400);
  }, []);

  const addItem = useCallback((id, variant = {}, qty = 1) => {
    const key = lineKey(id, variant);
    setCart((prev) => {
      const i = prev.findIndex((l) => l.key === key);
      if (i < 0) return [...prev, { key, id, variant, qty }];
      return prev.map((l, n) => (n === i ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l));
    });
    setViewId(null);
    setCartOpen(true);
  }, []);

  const setQty = useCallback((key, qty) => {
    setCart((prev) =>
      qty < 1
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, qty) } : l))
    );
  }, []);

  const removeItem = useCallback((key) => setCart((prev) => prev.filter((l) => l.key !== key)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const toggleWish = useCallback(
    (id) => {
      setWish((prev) => {
        const has = prev.includes(id);
        toast(has ? 'Removed from wishlist' : 'Saved to wishlist');
        return has ? prev.filter((x) => x !== id) : [...prev, id];
      });
    },
    [toast]
  );

  const openView = useCallback((id) => setViewId(id), []);
  const closeView = useCallback(() => setViewId(null), []);

  const value = useMemo(() => {
    const count = cart.reduce((n, l) => n + l.qty, 0);
    const subtotal = cart.reduce((n, l) => n + (getProductById(l.id)?.price ?? 0) * l.qty, 0);
    return {
      cart, count, subtotal, addItem, setQty, removeItem, clearCart,
      wish, toggleWish,
      filter, setFilter, query, setQuery,
      cartOpen, setCartOpen,
      viewId, openView, closeView,
      toastMsg, toast,
    };
  }, [cart, wish, filter, query, cartOpen, viewId, toastMsg, addItem, setQty, removeItem, clearCart, toggleWish, openView, closeView, toast]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
