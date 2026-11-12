'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LAST_ORDER_KEY } from '@/components/CartDrawer';
import { money, variantLabel } from '@/lib/format';

/** Reads the order saved by the checkout form, so the page only shows an order that was really placed. */
export default function SuccessPage() {
  const [order, setOrder] = useState(undefined); // undefined = still loading, null = none

  useEffect(() => {
    try {
      setOrder(JSON.parse(sessionStorage.getItem(LAST_ORDER_KEY) || 'null'));
    } catch {
      setOrder(null);
    }
  }, []);

  if (order === undefined) return <main className="wrap min-h-[60vh] py-24" />;

  if (!order) {
    return (
      <main className="wrap py-16 nav:py-24">
        <div className="flex flex-col items-start gap-6">
          <p className="eyebrow">Order</p>
          <h1 className="text-balance text-[clamp(2.4rem,5.5vw,4rem)] leading-none">
            There is no recent order <em className="font-normal italic text-accent">to show.</em>
          </h1>
          <p className="max-w-[46ch] text-base text-muted">
            If you just placed an order, we have it and will call you to confirm. Otherwise, the collection is
            waiting for you.
          </p>
          <Link href="/" className="btn mt-2">Continue exploring</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="wrap py-16 nav:py-24">
      <div className="grid items-start gap-12 nav:grid-cols-[1.1fr_.9fr] nav:gap-20">
        <div className="flex flex-col items-start gap-6">
          <p className="eyebrow">Order confirmed</p>
          <h1 className="text-balance text-[clamp(2.6rem,6vw,4.6rem)] leading-none tracking-[-.01em]">
            Thank you, {order.customer.name.split(' ')[0]}. Your pieces are{' '}
            <em className="font-normal italic text-accent">on their way to you.</em>
          </h1>
          <p className="max-w-[46ch] text-base text-muted">
            We will call you on {order.customer.phone} to confirm your order. Each piece is inspected, polished and
            wrapped by hand before it leaves the studio. Please keep {money(order.total)} ready in cash for the
            delivery.
          </p>
          <Link href="/" className="btn mt-2">Continue exploring</Link>
        </div>

        <aside className="border border-line bg-surface" aria-label="Order summary">
          <div className="h-1.5 bg-gradient-to-r from-amber via-rose to-plum" />
          <div className="grid gap-5 p-6 nav:p-8">
            <div>
              <p className="eyebrow">Order number</p>
              <p className="mt-1.5 font-display text-2xl tracking-[.08em]">{order.number}</p>
            </div>

            <ul className="border-t border-line">
              {order.items.map((l, i) => {
                const opts = variantLabel(l.variant);
                return (
                  <li key={i} className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                    <div className="min-w-0">
                      <p className="font-display text-xl leading-tight">{l.name}</p>
                      <p className="text-[12.5px] text-muted">
                        Quantity {l.qty}{opts ? ` · ${opts}` : ''}
                      </p>
                    </div>
                    <p className="text-sm font-medium tabular-nums">{money(l.lineTotal)}</p>
                  </li>
                );
              })}
            </ul>

            <dl className="grid gap-2 text-[13.5px]">
              <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="tabular-nums">{money(order.subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd className="tabular-nums">{money(order.delivery)}</dd></div>
              <div className="flex items-baseline justify-between border-t border-line pt-3 text-xs font-medium uppercase tracking-[.16em]">
                <dt>Pay on delivery</dt>
                <dd className="font-display text-[28px] font-medium normal-case leading-none tracking-normal tabular-nums">{money(order.total)}</dd>
              </div>
            </dl>

            <div className="border-t border-line pt-4 text-[13.5px] leading-relaxed text-muted">
              <p className="eyebrow mb-1">Delivering to</p>
              <p className="text-fg">{order.customer.name}</p>
              <p>{order.customer.address}, {order.customer.city}</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
