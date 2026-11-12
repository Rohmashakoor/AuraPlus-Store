'use client';

import { useStore } from '@/context/StoreContext';
import { HERO_PRODUCT_ID, getProductById } from '@/data/products';
import { money } from '@/lib/format';
import { scrollToId } from '@/lib/scroll';
import { ArrowIcon } from './icons';
import { gemSvg } from './JewelryArt';
import SafeImage from './SafeImage';

const GOLD = ['#FBE5B0', '#E8B25A', '#B8802F'];
const DIAMOND = ['#FFFFFF', '#DCE4F5', '#AEBBDD'];

const star = (x, y, k, o) =>
  `<path transform="translate(${x} ${y}) scale(${k})" opacity="${o}" fill="#E9BCB9" d="M0 -14 Q0 0 14 0 Q0 0 0 14 Q0 0 -14 0 Q0 0 0 -14Z"/>`;

/* Sunset panel in the palette, with the Aurora ring. Shown until /public/images/hero.jpg exists. */
const HERO_SVG =
  `<defs>` +
  `<linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ED9E59"/><stop offset=".3" stop-color="#D9806A"/><stop offset=".5" stop-color="#A34054"/><stop offset=".74" stop-color="#662249"/><stop offset="1" stop-color="#2A1245"/></linearGradient>` +
  `<linearGradient id="hero-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${GOLD[0]}"/><stop offset=".5" stop-color="${GOLD[1]}"/><stop offset="1" stop-color="${GOLD[2]}"/></linearGradient>` +
  `<radialGradient id="hero-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#E9BCB9" stop-opacity=".55"/><stop offset="1" stop-color="#E9BCB9" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="hero-shadow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#1B1931" stop-opacity=".55"/><stop offset="1" stop-color="#1B1931" stop-opacity="0"/></radialGradient>` +
  `</defs>` +
  `<rect width="600" height="720" fill="url(#hero-sky)"/>` +
  `<circle cx="300" cy="360" r="250" fill="url(#hero-glow)"/>` +
  `<circle cx="300" cy="360" r="150" fill="#E9BCB9" opacity=".22"/>` +
  `<ellipse cx="300" cy="640" rx="170" ry="26" fill="url(#hero-shadow)"/>` +
  star(110, 150, 1.4, 0.8) + star(505, 215, 1, 0.7) + star(450, 100, 0.7, 0.6) + star(85, 430, 0.8, 0.55) + star(525, 470, 1.2, 0.7) +
  `<g style="filter:drop-shadow(0 18px 22px rgba(27,25,49,.45))">` +
  `<circle cx="300" cy="470" r="150" fill="none" stroke="url(#hero-gold)" stroke-width="30"/>` +
  `<circle cx="300" cy="470" r="135" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="3"/>` +
  `<polygon points="252,296 348,296 326,342 274,342" fill="url(#hero-gold)"/>` +
  gemSvg(300, 258, 66, DIAMOND) +
  `</g>`;

function HeroArt() {
  return (
    <svg
      className="absolute inset-0 block h-full w-full"
      viewBox="0 0 600 720"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: HERO_SVG }}
    />
  );
}

export default function Hero() {
  const { openView } = useStore();
  const featured = getProductById(HERO_PRODUCT_ID);

  return (
    <section className="border-b border-line" aria-labelledby="hero-title">
      <div className="wrap grid gap-9 pb-12 pt-9 nav:grid-cols-[1.05fr_.95fr] nav:items-center nav:gap-[72px] nav:pb-16 nav:pt-14">
        <div className="flex min-w-0 flex-col items-start gap-6">
          <p className="eyebrow">The Autumn Edit · 2026</p>
          <h1 id="hero-title" className="text-balance text-[clamp(2.7rem,7vw,5.2rem)] leading-none tracking-[-.01em]">
            Anti-tarnish Fine Jewelry for{' '}
            <em className="font-normal italic text-accent">Everyday Elegance</em>
          </h1>
          <p className="max-w-[46ch] text-base text-muted">
            Small-batch rings, necklaces and earrings in golden and sterling silver. Cast and set by hand, made to be
            worn every day and kept for decades.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-5">
            <a
              className="btn"
              href="#collection"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('collection');
              }}
            >
              Explore the Collection <ArrowIcon className="h-3.5 w-3.5" />
            </a>
            <a
              className="textlink"
              href="#story"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('story');
              }}
            >
              Our Story
            </a>
          </div>
          <ul className="flex w-full flex-wrap gap-x-[26px] gap-y-2 border-t border-line pt-[22px] text-[11px] font-medium uppercase leading-snug tracking-[.14em] text-muted">
            <li>Insured shipping</li>
            <li>30-day returns</li>
            <li>Lifetime warranty</li>
          </ul>
        </div>

        <div className="relative aspect-[5/6] max-w-full overflow-hidden bg-plum">
          <SafeImage
            src="/images/hero.jpg"
            alt="A gold solitaire ring catching the evening light"
            sizes="(min-width: 860px) 45vw, 100vw"
            fallback={<HeroArt />}
          />
          {featured && (
            <button
              type="button"
              onClick={() => openView(featured.id)}
              className="absolute inset-x-3.5 bottom-3.5 flex items-center justify-between gap-3 border border-blush/30 bg-ink/80 px-4 py-3 text-left text-[11px] font-medium uppercase leading-snug tracking-[.12em] text-[#F6E9E6] transition-colors duration-300 hover:bg-ink/95"
            >
              <span>{featured.name} · {featured.metal}</span>
              <span className="whitespace-nowrap tabular-nums text-amber">{money(featured.price)}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
