const icon = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: '#ED9E59',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'h-[30px] w-[30px]',
  'aria-hidden': true,
};

const PILLARS = [
  {
    title: 'Anti-Tarnish Finish',
    text: 'Our pieces are crafted with high-grade stainless steel and thick plating so they resist fading, water, and sweat.',
    svg: (
      <svg {...icon}>
        <path d="M20 12a8 8 0 1 1-2.5-5.8" />
        <path d="M20 4v4h-4" />
      </svg>
    ),
  },
  {
    title: 'Skin-Safe & Hypoallergenic',
    text: 'Every necklace, ring, and earring is nickel-free and lead-free, ensuring comfortable, irritation-free wear all day long.',
    svg: (
      <svg {...icon}>
        <path d="M6 4h12l4 6-10 11L2 10z" />
        <path d="M2 10h20M9 4l-2 6 5 11 5-11-2-6" />
      </svg>
    ),
  },
  {
    title: 'Lifetime warranty',
    text: 'We resize, repair and re-polish your piece for as long as you own it.',
    svg: (
      <svg {...icon}>
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </svg>
    ),
  },
];

export default function CraftBand() {
  return (
    <section
      id="story"
      aria-labelledby="craft-title"
      className="bg-[linear-gradient(135deg,var(--band-a),var(--band-b))] text-[#F6E9E6]"
    >
      <div className="wrap grid gap-12 py-20 nav:grid-cols-2 nav:items-center nav:gap-24">
        <div>
          <p className="eyebrow !text-blush">QUALITY & DESIGN</p>
          <h2 id="craft-title" className="mt-3.5 text-balance text-[clamp(2.1rem,4.5vw,3.4rem)] leading-[1.08]">
           Designed to shine, made for <em className="font-normal italic text-amber">everyday wear</em>
          </h2>
          <p className="mt-[22px] max-w-[46ch] text-[#F6E9E6]/80">
            Every piece is carefully finished and coated for long-lasting luster, giving you the timeless look, so nothing leaves the bench until it feels
            right on the skin.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5" aria-label="Hallmarks">
            <span className="border border-blush/35 px-3.5 py-2 text-[11px] font-medium uppercase leading-none tracking-[.14em] text-blush">ANTI-TARNISH</span>
            <span className="border border-blush/35 px-3.5 py-2 text-[11px] font-medium uppercase leading-none tracking-[.14em] text-blush">WATERPROOF</span>
          </div>
        </div>

        <div className="min-w-0">
          {PILLARS.map((p) => (
            <div key={p.title} className="grid grid-cols-[44px_1fr] gap-[18px] border-t border-blush/30 py-[26px] last:border-b">
              {p.svg}
              <div>
                <h3 className="text-2xl leading-tight">{p.title}</h3>
                <p className="mt-1.5 max-w-[48ch] text-[14.5px] text-[#F6E9E6]/80">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
