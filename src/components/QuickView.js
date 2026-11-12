'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { CATEGORIES, MAX_QTY, getProductById } from '@/data/products';
import { money } from '@/lib/format';
import { CloseIcon } from './icons';
import ProductImage from './ProductImage';

export default function QuickView() {
  const { viewId, closeView, addItem, wish, toggleWish } = useStore();
  const p = viewId ? getProductById(viewId) : null;
  const [sel, setSel] = useState({});
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setSel({});
    setQty(1);
  }, [viewId]);

  if (!p) return null;
  const missing = p.variants.find((v) => !sel[v.name]);
  const saved = wish.includes(p.id);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] grid place-items-center p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickview-title"
        className="pointer-events-auto relative grid max-h-full w-full max-w-[880px] animate-rise overflow-y-auto border border-line bg-page md:grid-cols-2"
      >
        <button className="icon-btn absolute right-2.5 top-2.5 z-10 bg-page" onClick={closeView} aria-label="Close" autoFocus>
          <CloseIcon />
        </button>

        <div className="tile relative aspect-[4/5] min-w-0 md:aspect-auto md:min-h-[480px]">
          <div className="absolute inset-0">
            <ProductImage product={p} sizes="(min-width: 768px) 440px, 100vw" />
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center gap-3.5 p-7 pt-8">
          <p className="eyebrow">{CATEGORIES[p.category]}</p>
          <h2 id="quickview-title" className="text-[clamp(2rem,4vw,2.8rem)] leading-[1.05]">{p.name}</h2>
          <p className="text-lg font-medium tabular-nums">{money(p.price)}</p>
          <p className="max-w-[44ch] text-muted">{p.description}</p>

          {p.variants.map((v) => (
            <fieldset key={v.name} className="m-0 border-0 p-0">
              <legend className="eyebrow mb-2 p-0">
                {v.name}
                {sel[v.name] && <span className="ml-2 normal-case tracking-normal text-fg">{sel[v.name]}</span>}
              </legend>
              <div className="flex flex-wrap gap-2">
                {v.options.map((o) => (
                  <button
                    key={o}
                    type="button"
                    aria-pressed={sel[v.name] === o}
                    onClick={() => setSel((s) => ({ ...s, [v.name]: o }))}
                    className="min-w-12 border border-line px-3.5 py-2.5 text-xs font-medium transition-colors duration-200 hover:border-fg aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-page"
                  >
                    {o}
                  </button>
                ))}
              </div>
            </fieldset>
          ))}

          <dl className="mt-1.5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-[13.5px]">
            <dt className="text-muted">Metal</dt><dd className="m-0">{p.metal}</dd>
            <dt className="text-muted">Dimensions</dt><dd className="m-0">{p.dimensions}</dd>
            <dt className="text-muted">Care</dt><dd className="m-0">Lifetime warranty, free resizing</dd>
          </dl>

          <div>
            <p className="eyebrow mb-2">Quantity</p>
            <div className="inline-flex items-center border border-line">
              <button type="button" className="h-10 w-10 text-lg leading-none transition-colors hover:bg-line disabled:opacity-40" aria-label="Decrease quantity" disabled={qty <= 1} onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span className="min-w-12 text-center text-sm tabular-nums" aria-live="polite">{qty}</span>
              <button type="button" className="h-10 w-10 text-lg leading-none transition-colors hover:bg-line disabled:opacity-40" aria-label="Increase quantity" disabled={qty >= MAX_QTY} onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}>+</button>
            </div>
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button type="button" className="btn" disabled={!!missing} onClick={() => addItem(p.id, sel, qty)}>
              {missing ? `Select ${missing.name.toLowerCase()}` : `Add to bag · ${money(p.price * qty)}`}
            </button>
            <button type="button" className="textlink" aria-pressed={saved} onClick={() => toggleWish(p.id)}>
              {saved ? 'Saved to wishlist' : 'Save to wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
