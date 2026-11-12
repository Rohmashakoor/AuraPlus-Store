'use client';

import { useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import ProductCard from './ProductCard';

const CHIPS = [['all', 'All'], ...Object.entries(CATEGORIES)];

export default function Collection() {
  const { filter, setFilter, query, wish } = useStore();

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (filter === 'saved' && !wish.includes(p.id)) return false;
      if (filter !== 'all' && filter !== 'saved' && p.category !== filter) return false;
      if (q && !`${p.name} ${p.metal} ${CATEGORIES[p.category]}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [filter, query, wish]);

  const chips = [...CHIPS, ['saved', `Saved${wish.length ? ` (${wish.length})` : ''}`]];
  const q = query.trim();

  return (
    <section id="collection" aria-labelledby="collection-title" className="pb-[88px] pt-[72px]">
      <div className="wrap">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Featured collection</p>
            <h2 id="collection-title" className="mt-2.5 text-balance text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05]">
              Pieces to wear on repeat
            </h2>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {chips.map(([key, label]) => (
              <button key={key} type="button" className="chip" aria-pressed={filter === key} onClick={() => setFilter(key)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-5 min-h-[22px] text-[13px] text-muted" aria-live="polite">
          {q ? `Results for “${q}” · ` : ''}
          {list.length} {list.length === 1 ? 'piece' : 'pieces'}
        </p>

        <div className="grid grid-cols-2 gap-x-3.5 gap-y-[30px] min-[1000px]:grid-cols-4 min-[1000px]:gap-x-[26px] min-[1000px]:gap-y-12">
          {list.length ? (
            list.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <div className="col-span-full py-16 text-center text-muted">
              <h3 className="mb-2 text-[28px] leading-tight text-fg">
                {filter === 'saved' && !q ? 'Nothing saved yet' : 'No pieces found'}
              </h3>
              <p>{filter === 'saved' && !q ? 'Tap the heart on any piece to keep it here.' : 'Try another search or category.'}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
