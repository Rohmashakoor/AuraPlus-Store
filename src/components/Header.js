'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { scrollToId } from '@/lib/scroll';
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon } from './icons';

const LINKS = [
  { label: 'Rings', filter: 'ring' },
  { label: 'Necklaces', filter: 'necklace' },
  { label: 'Earrings', filter: 'earrings' },
  { label: 'Our Story', target: 'story' },
];

const linkClass =
  'grow-line py-2 text-[11.5px] font-medium uppercase leading-none tracking-[.2em]';

export default function Header() {
  const { count, wish, setCartOpen, setFilter, query, setQuery } = useStore();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const input = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (search) input.current?.focus();
  }, [search]);

  // Scroll on the home page; from any other page, navigate home first.
  const toSection = (id) => {
    setMenu(false);
    if (pathname === '/') scrollToId(id);
    else router.push('/#' + id);
  };
  const toFilter = (f) => {
    setQuery('');
    setFilter(f);
    toSection('collection');
  };
  const closeSearch = () => {
    setSearch(false);
    setQuery('');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page">
      <div className="wrap grid min-h-[68px] grid-cols-[1fr_auto] items-center nav:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          aria-label="Aura Plus, home"
          onClick={(e) => {
            setMenu(false);
            if (pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="justify-self-start py-2 font-display text-[22px] font-medium uppercase leading-none tracking-[.28em] nav:text-[26px] nav:tracking-[.32em]"
        >
          Aura Plus
        </Link>

        <nav className="hidden gap-10 nav:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.filter ? '#collection' : '#' + l.target}
              className={linkClass}
              onClick={(e) => {
                e.preventDefault();
                l.filter ? toFilter(l.filter) : toSection(l.target);
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-0.5 justify-self-end">
          <button className="icon-btn" aria-label="Search" aria-expanded={search} onClick={() => (search ? closeSearch() : setSearch(true))}>
            <SearchIcon />
          </button>
          <button
            className="icon-btn"
            aria-label={`Wishlist, ${wish.length} saved`}
            onClick={() => {
              setQuery('');
              setFilter('saved');
              toSection('collection');
            }}
          >
            <HeartIcon />
            {wish.length > 0 && <span key={wish.length} className="badge">{wish.length}</span>}
          </button>
          <button className="icon-btn" aria-label={`Open bag, ${count} items`} onClick={() => setCartOpen(true)}>
            <BagIcon />
            {count > 0 && <span key={count} className="badge">{count}</span>}
          </button>
          <button className="icon-btn nav:hidden" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
            {menu ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {search && (
        <div className="border-t border-line">
          <div className="wrap flex items-center gap-3 py-2.5">
            <SearchIcon className="h-5 w-5 flex-none text-muted" />
            <label htmlFor="site-search" className="sr-only">Search jewelry</label>
            <input
              id="site-search"
              ref={input}
              type="search"
              value={query}
              placeholder="Search rings, gold, pearl…"
              autoComplete="off"
              onChange={(e) => {
                setQuery(e.target.value);
                setFilter((f) => (f === 'saved' ? 'all' : f));
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  toSection('collection');
                }
                if (e.key === 'Escape') closeSearch();
              }}
              className="min-w-0 flex-1 border-0 bg-transparent py-2 font-display text-[22px] leading-snug text-fg outline-none placeholder:text-muted"
            />
          </div>
        </div>
      )}

      {menu && (
        <div className="absolute inset-x-0 top-full border-b border-line bg-page nav:hidden">
          <nav className="wrap flex flex-col pb-3" aria-label="Mobile">
            {LINKS.map((l, i) => (
              <a
                key={l.label}
                href={l.filter ? '#collection' : '#' + l.target}
                onClick={(e) => {
                  e.preventDefault();
                  l.filter ? toFilter(l.filter) : toSection(l.target);
                }}
                className={`py-4 text-[12px] font-medium uppercase tracking-[.2em] ${i ? 'border-t border-line' : ''}`}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
