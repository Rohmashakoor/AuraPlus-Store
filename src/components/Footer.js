'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { scrollToId } from '@/lib/scroll';

const footLink =
  'bg-[linear-gradient(var(--accent),var(--accent))] bg-[length:0_1px] bg-left-bottom bg-no-repeat pb-0.5 text-[14.5px] transition-[background-size] duration-[350ms] hover:bg-[length:100%_1px]';

export default function Footer() {
  const { setFilter, setQuery } = useStore();
  const [email, setEmail] = useState('');
  const [note, setNote] = useState({ text: '', ok: false });
  const pathname = usePathname();
  const router = useRouter();

  const toSection = (id) => (pathname === '/' ? scrollToId(id) : router.push('/#' + id));
  const toFilter = (f) => {
    setQuery('');
    setFilter(f);
    toSection('collection');
  };

  // TODO: connect this to your email provider (Klaviyo, Mailchimp, Resend...)
  // with a route like /api/newsletter. Right now it only validates the address.
  function submit(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setNote({ text: 'Enter a valid email address, like name@example.com.', ok: false });
      return;
    }
    setNote({ text: 'Thank you. You are on the list for private releases.', ok: true });
    setEmail('');
  }

  const SHOP = [['Rings', 'ring'], ['Necklaces', 'necklace'], ['Earrings', 'earrings'], ['Bracelets', 'bracelet']];

  return (
    <footer className="border-t border-line">
      <div className="wrap grid gap-14 pb-9 pt-[72px] nav:grid-cols-[1.2fr_1fr] nav:gap-20">
        <div>
          <h2 className="max-w-[16ch] text-balance text-[clamp(1.9rem,4vw,2.8rem)] leading-[1.1]">
            Join the inner circle for private releases.
          </h2>
          <form onSubmit={submit} noValidate className="mt-[26px] flex max-w-[460px] border-b border-fg focus-within:border-accent">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              autoComplete="email"
              className="min-w-0 flex-1 border-0 bg-transparent py-3.5 text-[15px] text-fg outline-none placeholder:text-muted"
            />
            <button type="submit" className="pl-4 text-[11px] font-semibold uppercase leading-none tracking-[.18em] transition-colors hover:text-accent">
              Subscribe
            </button>
          </form>
          <p className={`mt-2.5 min-h-[22px] text-[13px] ${note.ok ? 'text-accent' : 'text-muted'}`} aria-live="polite">{note.text}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 nav:grid-cols-3">
          <div>
            <h4 className="eyebrow mb-3.5 !font-sans">Shop</h4>
            <ul className="grid gap-2">
              {SHOP.map(([label, f]) => (
                <li key={f}>
                  <a href="#collection" className={footLink} onClick={(e) => { e.preventDefault(); toFilter(f); }}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="eyebrow mb-3.5 !font-sans">The house</h4>
            <ul className="grid gap-2">
              <li><a href="#story" className={footLink} onClick={(e) => { e.preventDefault(); toSection('story'); }}>Our story</a></li>
              <li><a href="#story" className={footLink} onClick={(e) => { e.preventDefault(); toSection('story'); }}>Craftsmanship</a></li>
              <li><a href="#collection" className={footLink} onClick={(e) => { e.preventDefault(); toFilter('all'); }}>Full collection</a></li>
            </ul>
          </div>
          <div>
            <h4 className="eyebrow mb-3.5 !font-sans">Contact</h4>
            <p className="break-words text-[14.5px] text-muted">auraplus0000@gmail.com</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2.5 border-t border-line pt-7 text-[12.5px] text-muted nav:col-span-full">
          <span>© 2026 Aura Plus Fine Jewelry. All rights reserved.</span>
          <span>gold · sterling silver</span>
        </div>
      </div>
    </footer>
  );
}
