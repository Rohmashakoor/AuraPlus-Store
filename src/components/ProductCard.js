'use client';

import { useEffect, useRef, useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { money } from '@/lib/format';
import { HeartIcon } from './icons';
import ProductImage from './ProductImage';

export default function ProductCard({ product: p }) {
  const { wish, toggleWish, addItem, openView } = useStore();
  const [added, setAdded] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const saved = wish.includes(p.id);
  const hasChoices = p.variants.length > 0;

  // Pieces with sizes or lengths open Quick View so the customer picks one.
  // Single-option pieces go straight into the bag.
  const quickAdd = () => {
    if (hasChoices) return openView(p.id);
    addItem(p.id, {}, 1);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="group min-w-0 transition-transform duration-500 ease-out focus-within:-translate-y-2 hover:-translate-y-2 motion-reduce:transform-none">
      <div className="tile relative aspect-[4/5] overflow-hidden transition-shadow duration-500 group-focus-within:shadow-[0_24px_40px_-22px_var(--shadow)] group-hover:shadow-[0_24px_40px_-22px_var(--shadow)]">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
          <ProductImage product={p} sizes="(min-width: 1000px) 25vw, 50vw" />
          {p.images[1] && (
            <ProductImage
              product={p}
              index={1}
              bare
              sizes="(min-width: 1000px) 25vw, 50vw"
              className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </div>

        <button
          type="button"
          aria-pressed={saved}
          aria-label={`Save ${p.name} to wishlist`}
          onClick={() => toggleWish(p.id)}
          className="absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-surface p-0 text-fg transition-transform duration-300 hover:scale-110"
        >
          <HeartIcon className={`h-[17px] w-[17px] ${saved ? 'fill-accent stroke-accent' : ''}`} />
        </button>

        <div className="absolute inset-x-0 bottom-0 flex translate-y-full transition-transform duration-[400ms] ease-out group-focus-within:translate-y-0 group-hover:translate-y-0 [@media(hover:none)]:translate-y-0">
          <button
            type="button"
            onClick={quickAdd}
            className={`flex-[1.5] px-1.5 py-[15px] text-[10.5px] font-semibold uppercase leading-none tracking-[.16em] transition-colors duration-300 [@media(hover:none)]:py-3 [@media(hover:none)]:text-[9.5px] ${
              added ? 'bg-accent text-accentfg' : 'bg-btn text-btnfg hover:bg-btnhover'
            }`}
          >
            {added ? 'Added' : hasChoices ? `Choose ${p.variants[0].name.toLowerCase()}` : 'Quick add'}
          </button>
          <button
            type="button"
            onClick={() => openView(p.id)}
            className="flex-1 bg-surface px-1.5 py-[15px] text-[10.5px] font-semibold uppercase leading-none tracking-[.16em] text-fg transition-colors duration-300 hover:bg-page [@media(hover:none)]:py-3 [@media(hover:none)]:text-[9.5px]"
          >
            View
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 pt-4 min-[520px]:flex-row min-[520px]:items-baseline min-[520px]:justify-between min-[520px]:gap-3">
        <div className="min-w-0">
          <h3 className="text-[19px] leading-[1.15] min-[520px]:text-[21px]">{p.name}</h3>
          <p className="mt-1 text-[12.5px] text-muted">{p.metal}</p>
        </div>
        <p className="whitespace-nowrap text-sm font-medium tabular-nums">{money(p.price)}</p>
      </div>
    </article>
  );
}
