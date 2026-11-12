'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/context/StoreContext';
import CartDrawer from './CartDrawer';
import QuickView from './QuickView';

/** Scrim, cart drawer, quick-view modal and toast. Mounted once in the root layout. */
export default function Layers() {
  const { cartOpen, setCartOpen, viewId, closeView, toastMsg } = useStore();
  const open = cartOpen || !!viewId;
  const lastFocus = useRef(null);
  const lastToast = useRef('');
  if (toastMsg) lastToast.current = toastMsg;

  // Lock page scroll and restore focus while a layer is open.
  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      lastFocus.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (viewId) closeView();
      else setCartOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewId, closeView, setCartOpen]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[70] animate-fade bg-ink/60"
          onClick={() => {
            closeView();
            setCartOpen(false);
          }}
        />
      )}
      <CartDrawer />
      <QuickView />
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-[90] max-w-[calc(100%-32px)] -translate-x-1/2 border border-blush/30 bg-ink px-5 py-3 text-center text-xs font-medium leading-snug tracking-[.08em] text-[#F6E9E6] transition-all duration-300 ${
          toastMsg ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}
      >
        {toastMsg || lastToast.current}
      </div>
    </>
  );
}
