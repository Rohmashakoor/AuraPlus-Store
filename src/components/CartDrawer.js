'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { DELIVERY_FEE, MAX_QTY, PAYMENT_METHOD, getProductById } from '@/data/products';
import { money, variantLabel } from '@/lib/format';
import { validateCustomer } from '@/lib/order';
import { scrollToId } from '@/lib/scroll';
import { CloseIcon } from './icons';
import ProductImage from './ProductImage';

export const LAST_ORDER_KEY = 'solene-last-order';
const DETAILS_KEY = 'solene-details';

const EMPTY = { name: '', phone: '', email: '', city: '', address: '', notes: '' };

const field =
  'w-full border border-line bg-transparent px-3.5 py-3 text-[15px] text-fg outline-none transition-colors placeholder:text-muted/70 focus:border-fg';

function Field({ id, label, error, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-1.5 block">
        {label}
        {optional && <span className="ml-1.5 normal-case tracking-normal">(optional)</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-[12.5px] text-accent" role="alert">{error}</p>}
    </div>
  );
}

export default function CartDrawer() {
  const { cart, count, subtotal, cartOpen, setCartOpen, setQty, removeItem, clearCart } = useStore();
  const router = useRouter();
  const [step, setStep] = useState('bag'); // 'bag' | 'details'
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState('');

  const total = subtotal + DELIVERY_FEE;

  // Remember delivery details on this device for the next order.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(DETAILS_KEY) || 'null');
      if (saved && typeof saved === 'object') setForm({ ...EMPTY, ...saved, notes: '' });
    } catch {}
  }, []);

  // Always reopen on the bag, and fall back to it if the bag is emptied.
  useEffect(() => {
    if (!cartOpen) {
      setStep('bag');
      setServerError('');
    }
  }, [cartOpen]);
  useEffect(() => {
    if (cart.length === 0) setStep('bag');
  }, [cart.length]);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  async function placeOrder(e) {
    e.preventDefault();
    const { errors: found, clean } = validateCustomer(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setBusy(true);
    setServerError('');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Only ids, options and quantities are sent. Prices and delivery come from the server.
        body: JSON.stringify({
          customer: clean,
          website: new FormData(e.currentTarget).get('website') || '',
          items: cart.map((l) => ({ id: l.id, variant: l.variant, quantity: l.qty })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || 'We could not place your order. Please try again.');
      }

      try {
        sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(data.order));
        localStorage.setItem(DETAILS_KEY, JSON.stringify({ ...clean, notes: '' }));
      } catch {}
      clearCart();
      setCartOpen(false);
      router.push('/success');
    } catch (err) {
      setServerError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const summary = (
    <dl className="grid gap-2 text-[13.5px]">
      <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="tabular-nums">{money(subtotal)}</dd></div>
      <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd className="tabular-nums">{money(DELIVERY_FEE)}</dd></div>
      <div className="flex items-baseline justify-between border-t border-line pt-3 text-xs font-medium uppercase tracking-[.16em]">
        <dt>Total to pay</dt>
        <dd className="font-display text-[26px] font-medium normal-case leading-none tracking-normal tabular-nums">{money(total)}</dd>
      </div>
    </dl>
  );

  return (
    <aside
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
      aria-hidden={!cartOpen}
      className={`fixed inset-y-0 right-0 z-[80] flex w-[min(450px,100%)] flex-col border-l border-line bg-page transition-[transform,visibility] duration-[450ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
        cartOpen ? 'visible translate-x-0' : 'invisible translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between border-b border-line px-6 py-5">
        <h2 id="cart-title" className="text-[28px] leading-none">
          {step === 'details' ? 'Delivery details' : 'Your bag'}
          {step === 'bag' && count > 0 && <span className="ml-2 font-sans text-[13px] text-muted">({count})</span>}
        </h2>
        <button className="icon-btn" aria-label="Close bag" onClick={() => setCartOpen(false)}>
          <CloseIcon />
        </button>
      </div>

      {step === 'bag' && (
        <>
          <div className="flex-1 overflow-y-auto px-6">
            {cart.length === 0 ? (
              <div className="grid justify-items-center gap-[18px] py-14 text-center">
                <h3 className="text-[28px] leading-tight">Your bag is empty</h3>
                <p className="max-w-[30ch] text-muted">Pieces you add will wait for you here.</p>
                <button
                  className="btn-ghost"
                  onClick={() => {
                    setCartOpen(false);
                    scrollToId('collection');
                  }}
                >
                  Browse the collection
                </button>
              </div>
            ) : (
              <ul>
                {cart.map((l) => {
                  const p = getProductById(l.id);
                  if (!p) return null;
                  const detail = [p.metal, variantLabel(l.variant)].filter(Boolean).join(' · ');
                  return (
                    <li key={l.key} className="grid grid-cols-[72px_1fr_auto] gap-4 border-b border-line py-5">
                      <div className="tile relative aspect-[4/5] overflow-hidden">
                        <ProductImage product={p} sizes="72px" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[19px] leading-tight">{p.name}</h3>
                        <p className="mt-0.5 text-[12.5px] text-muted">{detail}</p>
                        <p className="mt-0.5 text-[12.5px] text-muted tabular-nums">{money(p.price)} each</p>
                        <div className="mt-3 inline-flex items-center border border-line">
                          <button className="h-[30px] w-[30px] text-base leading-none transition-colors hover:bg-line" aria-label={`Decrease quantity of ${p.name}`} onClick={() => setQty(l.key, l.qty - 1)}>−</button>
                          <span className="min-w-[30px] text-center text-[13px] tabular-nums" aria-live="polite">{l.qty}</span>
                          <button className="h-[30px] w-[30px] text-base leading-none transition-colors hover:bg-line disabled:opacity-40" aria-label={`Increase quantity of ${p.name}`} disabled={l.qty >= MAX_QTY} onClick={() => setQty(l.key, l.qty + 1)}>+</button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <p className="text-sm font-medium tabular-nums">{money(p.price * l.qty)}</p>
                        <button className="text-[10.5px] font-medium uppercase leading-none tracking-[.14em] text-muted underline underline-offset-[3px] hover:text-accent" onClick={() => removeItem(l.key)}>
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {cart.length > 0 && (
            <div className="grid gap-4 border-t border-line px-6 pb-6 pt-5">
              {summary}
              <p className="text-[12.5px] text-muted">{PAYMENT_METHOD}. Pay in cash when your order arrives.</p>
              <button className="btn w-full" onClick={() => setStep('details')}>Proceed to Checkout</button>
            </div>
          )}
        </>
      )}

      {step === 'details' && (
        <form onSubmit={placeOrder} noValidate className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <button type="button" className="textlink mb-5" onClick={() => setStep('bag')}>← Back to bag</button>

            <div className="grid gap-4">
              <Field id="co-name" label="Full name" error={errors.name}>
                <input id="co-name" className={field} value={form.name} onChange={set('name')} autoComplete="name" />
              </Field>
              <Field id="co-phone" label="Mobile number" error={errors.phone}>
                <input id="co-phone" type="tel" inputMode="tel" className={field} value={form.phone} onChange={set('phone')} autoComplete="tel" placeholder="0300 1234567" />
              </Field>
              <Field id="co-email" label="Email" optional error={errors.email}>
                <input id="co-email" type="email" className={field} value={form.email} onChange={set('email')} autoComplete="email" />
              </Field>
              <Field id="co-city" label="City" error={errors.city}>
                <input id="co-city" className={field} value={form.city} onChange={set('city')} autoComplete="address-level2" />
              </Field>
              <Field id="co-address" label="Delivery address" error={errors.address}>
                <textarea id="co-address" rows={3} className={`${field} resize-none`} value={form.address} onChange={set('address')} autoComplete="street-address" placeholder="House no., street, area" />
              </Field>
              <Field id="co-notes" label="Order notes" optional error={errors.notes}>
                <input id="co-notes" className={field} value={form.notes} onChange={set('notes')} placeholder="Gift wrap, call before arriving…" />
              </Field>
              {/* Honeypot: hidden from people, filled by bots. */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="co-website">Leave this empty</label>
                <input id="co-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
            </div>

            <ul className="mt-6 border-t border-line">
              {cart.map((l) => {
                const p = getProductById(l.id);
                if (!p) return null;
                const opts = variantLabel(l.variant);
                return (
                  <li key={l.key} className="flex justify-between gap-4 border-b border-line py-2.5 text-[13.5px]">
                    <span className="min-w-0">{l.qty} × {p.name}{opts && <span className="text-muted"> · {opts}</span>}</span>
                    <span className="tabular-nums">{money(p.price * l.qty)}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid gap-3.5 border-t border-line px-6 pb-6 pt-5">
            {summary}
            <p className="text-[12.5px] text-muted">{PAYMENT_METHOD}. You pay {money(total)} in cash when it arrives.</p>
            <button type="submit" className="btn w-full" disabled={busy}>
              {busy ? 'Placing your order…' : `Place order · ${money(total)}`}
            </button>
            <p className="min-h-[18px] text-[12.5px] text-accent" role="alert">{serverError}</p>
          </div>
        </form>
      )}
    </aside>
  );
}
