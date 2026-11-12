const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const SearchIcon = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" /></svg>
);
export const HeartIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 20.5s-7.5-4.6-9.4-9.2C1.3 8.2 3.3 4.8 6.6 4.8c2 0 3.4 1.1 5.4 3 2-1.9 3.4-3 5.4-3 3.3 0 5.3 3.4 4 6.5-1.9 4.6-9.4 9.2-9.4 9.2z" />
  </svg>
);
export const BagIcon = (p) => (
  <svg {...base} {...p}><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>
);
export const MenuIcon = (p) => (
  <svg {...base} {...p}><path d="M4 8h16M4 16h16" /></svg>
);
export const CloseIcon = (p) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const ArrowIcon = (p) => (
  <svg {...base} strokeWidth={1.8} {...p}><path d="M4 12h16M14 6l6 6-6 6" /></svg>
);
