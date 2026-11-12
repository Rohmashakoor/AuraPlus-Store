/**
 * ============================================================================
 *  PRODUCT CATALOGUE: the one file you edit to change what the shop sells
 * ============================================================================
 *
 *  ADD A PRODUCT
 *  1. Copy any object in PRODUCTS and give it a new, unique `id` and `slug`.
 *  2. `price` is in whole Pakistani rupees: Rs 35,000 is 35000.
 *  3. Put photos in /public/images/ and list them in `images`.
 *     The first image is the main shot; the second fades in on hover.
 *     A missing file never breaks the page: a drawn placeholder shows instead.
 *  4. `variants` creates the choosers in Quick View (sizes, lengths, finishes).
 *     Use [] when a piece comes in a single option.
 *  5. `placeholder` only matters while real photos are missing. It tells the
 *     drawn stand-in what to draw (kind, stone, metal tone).
 *
 *  REMOVE A PRODUCT: delete its object. Old carts that still hold it are
 *  cleaned up automatically the next time the customer opens the shop.
 *
 *  PRICES ARE CHECKED ON THE SERVER. /api/orders looks every item up in this
 *  file and ignores any price sent by the browser, so an order can never be
 *  placed at a price someone edited in dev tools.
 *
 *  PLACEHOLDER PRICES: the prices below are examples. Set your real ones.
 */

/** Flat delivery charge added to every order, in rupees. Change it here. */
export const DELIVERY_FEE = 200;

/** Payment method shown at checkout and in your order alerts. */
export const PAYMENT_METHOD = 'Cash on delivery';

/** Category keys used by `category` below, with their display names. */
export const CATEGORIES = {
  ring: 'Rings',
  necklace: 'Necklaces',
  bracelet: 'Bracelets',
  earrings: 'Earrings',
};

/** The product shown on the hero image tag. */
export const HERO_PRODUCT_ID = 'rg-001';

/** Most of one item (one size/option) a customer can put in a single order. */
export const MAX_QTY = 20;

export const PRODUCTS = [
  {
    id: 'rg-001',
    name: 'Aurora Solitaire Ring',
    slug: 'aurora-solitaire-ring',
    category: 'ring',
    metal: 'Silver',
    price: 169,
    description:
      'A single brilliant solitaire on a slim silver band, classic and clean.',
    dimensions: 'Band 1.5 mm, Stone 6 mm',
    images: ['/images/arura.jpeg', '/images/aurora2.jpeg'],
    variants: [{ name: 'Size', options: ['6', '7','8'] }],
    placeholder: { kind: 'solitaire', gem: 'diamond', tone: 'yellow' },
  },
  {
    id: 'nk-001',
    name: 'Clover Pendant Necklace',
    slug: 'clover-pendant-necklace',
    category: 'necklace',
    metal: 'Golden Metal',
    price: 469,
    description:
      'A lucky gold four-leaf clover necklace that brings charm to everyday styling.',
    dimensions: 'Pendant 14 mm × 9 mm · Cable chain 1.2 mm · Approx. 3.4 g',
    images: ['/images/clover-necklacee.jpeg', '/images/necklace-1-lifestyle.jpg'],
    variants: [],
    placeholder: { kind: 'drop', gem: 'ruby', tone: 'yellow' },
  },
  {
    id: 'br-001',
    name: 'Nail Shaped-Cuff Bracelet',
    slug: 'nail-shaped-cuff-bracelet',
    category: 'bracelet',
    metal: 'Sterling Silver',
    price: 499,
    description:
      'A line of 40 hand-set white sapphires on a flexible band with a hidden clasp.',
    dimensions: 'Stone 2.5 mm · Band width 3 mm · Approx. 9.5 g',
    images: ['/images/neil-bracelet.jpeg', '/images/bracelet-1-lifestyle.jpg'],
    variants: [{ name: 'Size', options: ['S (6.5")', 'M (7")', 'L (7.5")'] }],
    placeholder: { kind: 'tennis', gem: 'diamond', tone: 'silver' },
  },
  {
    id: 'er-001',
    name: 'Flamingo Pearl Earrings',
    slug: 'flamingo-pearl-earrings',
    category: 'earrings',
    metal: 'Silver',
    price: 249,
    description:
      'Flamingo Pearl Earrings featuring a pave-set crystal stud suspended above a single round white pearl.',
    dimensions: 'Drop length 20 mm · Width 9 mm · Approx. 2.1 g the pair',
    images: ['/images/flamingo-earring.jpeg', '/images/earrings-1-lifestyle.jpg'],
    variants: [],
    placeholder: { kind: 'drops', gem: 'diamond', tone: 'rose' },
  },
  {
    id: 'rg-002',
    name: 'Heart Outline Ring',
    slug: 'heart-outline-ring',
    category: 'ring',
    metal: 'Silver',
    price: 169,
    description:
      'A pavé band set with 36 small diamonds, stacked with others or worn alone.',
    dimensions: 'Band width 3 mm · Stones 1.1 mm · Approx. 3.1 g',
    images: ['/images/heart-arrow-ring.jpeg', '/images/ring-2-lifestyle.jpg'],
    variants: [
      { name: 'Size', options: ['5', '6', '7', '8', '9'] },
      { name: 'Finish', options: ['Polished', 'Brushed'] },
    ],
    placeholder: { kind: 'pave', gem: 'diamond', tone: 'rose' },
  },
  {
    id: 'nk-002',
    name: 'Heart Silver Necklace',
    slug: 'heart-silver-necklace',
    category: 'necklace',
    metal: 'Sterling Silver',
    price: 199,
    description:
      'A delicate gold open-heart necklace, perfect for daily wear and gifting.',
    dimensions: 'Chain: 40 cm + 5 cm extender, Heart: 2 x 1.8 cm',
    images: ['/images/heart-necklace.jpeg', '/images/necklace-2-lifestyle.jpg'],
    variants: [],
    placeholder: { kind: 'coin', gem: 'diamond', tone: 'silver' },
  },
  {
    id: 'br-002',
    name: 'Embrace Bangle',
    slug: 'embrace-bangle',
    category: 'bracelet',
    metal: 'Starling Silver',
    price: 250,
    description:
      'A smooth oval bangle with one ruby set flush at the top. Opens on a hidden hinge.',
    dimensions: 'Width 6 mm · Inner circumference 17 cm (M) · Approx. 14 g',
    images: ['/images/stones-bracelet.jpeg', '/images/bracelet-2-lifestyle.jpg'],
    variants: [],
    placeholder: { kind: 'bangle', gem: 'ruby', tone: 'yellow' },
  },
  {
    id: 'er-002',
    name: 'Snake EarPiece Earrings',
    slug: 'snake-ear-piece-earrings',
    category: 'earrings',
    metal: 'Starling Silver',
    price: 209,
    description:
      'A dazzling snake-shaped earring covered in crystals for a fierce, glamorous look.',
    dimensions: 'Hoop 25 mm · Pearl 6 mm · Approx. 3.0 g the pair',
    images: ['/images/snake-ear-piece.jpeg', '/images/earrings-2-lifestyle.jpg'],
    variants: [{name: 'Ear side', options: ['Left side','Right side']}],
    placeholder: { kind: 'hoops', gem: 'silver', tone: 'silver' },
  },
  {
    id: 'rg-003',
    name: 'Friendship Ring',
    slug: 'zaryab-engagement-ring',
    category: 'ring',
    metal: 'Silver',
    price: 299,
    description:
      'A bold black/silver square signet ring with a glossy finish for a unisex edge.',
    dimensions: 'Band width 3 mm · Stones 1.1 mm',
    images: ['/images/friendship-ring.jpeg', '/images/friendship-ring2.jpeg'],
    variants: [
      { name: 'Size', options: ['6', '7', '8', '9'] },
      { name: 'Color', options: ['Silver', 'Black'] },
    ],
    placeholder: { kind: 'pave', gem: 'diamond', tone: 'rose' },
  },
  {
    id: 'nk-003',
    name: 'Heart Silver Necklace',
    slug: 'heart-silver-necklace',
    category: 'necklace',
    metal: 'Sterling Silver',
    price: 177,
    description:
      'An elegant gold necklace with a floral design and a deep purple statement stone.',
    dimensions: 'Chain: 40 cm + 5 cm extender',
    images: ['/images/purple-pearl-nk.jpeg', '/images/necklace-2-lifestyle.jpg'],
    variants: [],
    placeholder: { kind: 'coin', gem: 'purple stone', tone: 'silver' },
  },
  {
    id: 'br-003',
    name: 'Golden/Silver Bangle',
    slug: 'golden-silver-bangle',
    category: 'bracelet',
    metal: 'Starling Golden & Silver',
    price: 499,
    description:
      'A sleek gold/silver open cuff bracelet with ball ends for a modern minimal look.',
    dimensions: 'Width 6 mm · Inner circumference 17 cm (M) · Approx. 14 g',
    images: ['/images/golden-bracelet.jpeg', '/images/silver-bracelet.jpeg'],
    variants: [{name:"Color", options:['Silver','Golden']}],
    placeholder: { kind: 'bangle', gem: 'ruby', tone: 'yellow' },
  },
  {
    id: 'er-003',
    name: 'Snake EarPiece Earrings',
    slug: 'snake-ear-piece-earrings',
    category: 'earrings',
    metal: 'Starling Silver',
    price: 189,
    description:
      'Vibrant red enamel flower earrings that add a pop of colour to any look.',
    images: ['/images/red-flower.jpeg', '/images/earrings-2-lifestyle.jpg'],
    variants: [],
    placeholder: { kind: 'hoops', gem: 'silver', tone: 'red' },
  },
  {
    id: 'rg-004',
    name: 'Heart Arrow Ring',
    slug: 'heart-arrow-ring',
    category: 'ring',
    metal: 'Silver',
    price: 170,
    description:
      'A heart crystal shot through with a tiny silver arrow, made for gifting.',
    dimensions: 'Band width 3 mm · Stones 1.1 mm',
    images: ['/images/heart-arrow.jpeg', '/images/friendship-ring24.jpeg'],
    variants: [{ name: 'Size', options: ['6', '7', '8', '9'] }],
    placeholder: { kind: 'pave', gem: 'silver', tone: 'white' },
  },
  {
    id: 'nk-004',
    name: 'Headphone Necklace',
    slug: 'headphone-silver-necklace',
    category: 'necklace',
    metal: 'Sterling Silver',
    price: 380,
    description:
      'An elegant necklace with headphone design. Good for cool and classy look.',
    dimensions: 'Chain: 40 cm + 5 cm extender',
    images: ['/images/headphone-nk.jpeg', '/images/headphonee.jpeg'],
    variants: [],
    placeholder: { kind: 'coin', gem: 'silver stone', tone: 'silver' },
  },
  {
    id: 'br-004',
    name: 'Golden/Silver Bangle',
    slug: 'golden-silver-bangle',
    category: 'bracelet',
    metal: 'Starling Golden & Silver',
    price: 199,
    description:
      'A sleek gold open cuff bracelet with ball ends for a modern minimal look.',
    dimensions: 'Width 6 mm · Inner circumference 17 cm (M)',
    images: ['/images/wave-br.jpeg', '/images/wave-br2.jpeg'],
    variants: [{name:"Color", options:['Golden']}],
    placeholder: { kind: 'bangle', gem: 'ruby', tone: 'yellow' },
  },
  {
    id: 'er-004',
    name: 'Golden Pearl Earrings',
    slug: 'golden-pearl-earrings',
    category: 'earrings',
    metal: 'Starling Silver',
    price: 199,
    description:
      'A bold gold statement ring with a lustrous pearl centre.',
    dimensions: 'Hoop 25 mm · Pearl 6 mm · Approx. 3.0 g the pair',
    images: ['/images/gold-pearl.jpeg', '/images/gold-pearl2.jpeg'],
    variants: [],
    placeholder: { kind: 'hoops', gem: 'silver', tone: 'yellow' },
  },
  {
    id: 'rg-005',
    name: 'Duo Cuff Ring',
    slug: 'duo-cuff-ring',
    category: 'ring',
    metal: 'Starling Silver',
    price: 160,
    description:
      'Two bold baguette crystals on a sleek gold open cuff.',
    dimensions: 'Band width 3 mm · Stones 1.1 mm',
    images: ['/images/double-r.jpeg', '/images/friendship-ring24.jpeg'],
    variants: [{ name: 'Size', options: ['6', '7', '8', '9'] }],
    placeholder: { kind: 'pave', gem: 'silver', tone: 'white' },
  },
  {
    id: 'nk-005',
    name: 'Golden Heart Necklace',
    slug: 'golden-heart-necklace',
    category: 'necklace',
    metal: 'Sterling Silver',
    price: 270,
    description:
      'A bold gold puffed heart pendant necklace for a chic, romantic statement.',
    dimensions: 'Chain: 40 cm + 5 cm extender',
    images: ['/images/heart-golden.jpeg', '/images/gold-heart-nk.jpeg'],
    variants: [],
    placeholder: { kind: 'coin', gem: 'silver stone', tone: 'silver' },
  },
  {
    id: 'br-005',
    name: 'Flower Tulip Bracelet',
    slug: 'flower-tulip-braelet',
    category: 'bracelet',
    metal: 'Starling Golden & Silver',
    price: 420,
    description:
      'Fun colourful beaded bracelets with star charms for a playful stacked look.',
    dimensions: 'Width 6 mm · Inner circumference 17 cm (M)',
    images: ['/images/flower-tulip.png', '/images/flower-tulip-br.jpeg'],
    variants: [{name:"Chain", options:['Golden','Silver']},{
      name:'Stone Color', options:['Green','Purple','Red','Pink',]
    }],
    placeholder: { kind: 'bangle', gem: 'ruby', tone: 'yellow' },
  },
  {
    id: 'er-005',
    name: 'Black Star Cross Earrings',
    slug: 'black-star-cross-earrings',
    category: 'earrings',
    metal: 'Starling Silver',
    price: 499,
    description:
      'Edgy black star and cross drop earrings for a bold, gothic-inspired look.',
    dimensions: 'Hoop 25 mm · Pearl 6 mm · Approx. 3.0 g the pair',
    images: ['/images/sparkling-er.jpeg', '/images/er-5.jpeg'],
    variants: [],
    placeholder: { kind: 'hoops', gem: 'silver', tone: 'black' },
  },
  {
    id: 'rg-006',
    name: 'Black Crystal Double Band Ring.jpeg',
    slug: 'black-crystal-double-ring',
    category: 'ring',
    metal: 'Starling golden',
    price: 160,
    description:
      'One crystal band paired with a glossy black enamel band.',
    dimensions: 'Band width 3 mm · Stones 1.1 mm',
    images: ['/images/Black & Crystal Double Band Ring.jpeg', '/images/friendship-ring24.jpeg'],
    variants: [{ name: 'Size', options: ['6', '7', '8', '9'] }],
    placeholder: { kind: 'pave', gem: 'silver', tone: 'black' },
  },
  {
    id: 'nk-006',
    name: 'Star Necklace',
    slug: 'star-silver-necklace',
    category: 'necklace',
    metal: 'Sterling Silver',
    price: 195,
    description:
      'A dreamy silver star pendant necklace with a tiny pearl drop for a celestial glow.',
    dimensions: 'Chain: 40 cm + 5 cm extender',
    images: ['/images/star-necklace.jpeg', '/images/star-nk.jpeg'],
    variants: [],
    placeholder: { kind: 'coin', gem: 'silver stone', tone: 'silver' },
  },
  {
    id: 'br-006',
    name: ' Rope Twist Bracelet ',
    slug: 'rope-twist-bracelet',
    category: 'bracelet',
    metal: 'Starling Silver',
    price: 370,
    description:
      'A chunky silver rope twist bracelet with a secure magnetic clasp.',
    dimensions: 'Width 6 mm · Inner circumference 17 cm (M)',
    images: ['/images/rope-br.jpeg', '/images/rope-br3.jpeg','/images/rope-br3.jpeg'],
    variants: [{name:"Color", options:['silver']}],
    placeholder: { kind: 'bangle', gem: 'ruby', tone: 'white' },
  },
  {
    id: 'er-006',
    name: 'Red L Earrings',
    slug: 'red-square-earrings',
    category: 'earrings',
    metal: 'Golden',
    price: 199,
    description:
      'Vibrant red enamel earrings that add a pop of colour to any look.',
    dimensions: 'Hoop 25 mm · Pearl 6 mm · Approx. 3.0 g the pair',
    images: ['/images/red-er.jpeg', '/images/red.jpeg'],
    variants: [],
    placeholder: { kind: 'hoops', gem: 'silver', tone: 'yellow' },
  },
  {
    id: 'rg-007',
    name: 'Mermaid Tail Pearl Ring',
    slug: 'mermaid-tail-pearl-ring',
    category: 'ring',
    metal: 'Golden',
    price: 180,
    description:
      'a sculpted mermaid tail on one end and a luminous white pearl on the other.',
    dimensions: 'Band width 3 mm · Stones 1.1 mm',
    images: ['/images/marmaid.jpeg', '/images/r-07.jpeg'],
    variants: [],
    placeholder: { kind: 'pave', gem: 'golden', tone: 'yellow' },
  },
  {
    id: 'nk-007',
    name: 'Bow Pendant Necklace',
    slug: 'bow-golden-pearl-necklace',
    category: 'necklace',
    metal: 'Sterling Golden',
    price: 250,
    description:
      'A dainty gold bow necklace that adds a soft, feminine touch to any outfit.',
    dimensions: 'Chain: 40 cm + 5 cm extender',
    images: ['/images/bow-nk.jpeg', '/images/nk-5.jpg'],
    variants: [],
    placeholder: { kind: 'coin', gem: 'silver stone', tone: 'silver' },
  },
  {
    id: 'rg-008',
    name: 'Geometric Solitaire Ring',
    slug: 'geometric-solitaire-ring',
    category: 'ring',
    metal: 'Starling Golden',
    price: 160,
    description:
      'A round solitaire on a modern geometric gold band.',
    dimensions: 'Band width 3 mm · Stones 1.1 mm',
    images: ['/images/geo-rg.jpeg', '/images/friendship-ring24.jpeg'],
    variants: [],
    placeholder: { kind: 'pave', gem: 'golden', tone: 'white' },
  },
  {
    id: 'rg-009',
    name: 'Black Crown Leaf Ring',
    slug: 'black-crown-leaf-ring',
    category: 'ring',
    metal: 'Starling Golden',
    price: 160,
    description:
      'A black enamel leaf crown with tiny crystals for a royal look.',
    dimensions: 'Band width 3 mm · Stones 1.1 mm',
    images: ['/images/crown-rg.jpeg', '/images/friendship-ring24.jpeg'],
    variants: [],
    placeholder: { kind: 'pave', gem: 'silver', tone: 'white' },
  },
  {
    id: 'rg-010',
    name: 'Snake Crystal Ring',
    slug: 'snake-crystal-ring',
    category: 'ring',
    metal: 'Starling Silver',
    price: 250,
    description:
      'A black enamel leaf crown with tiny crystals for a royal look.',
    dimensions: 'Band width 3 mm · Stones 1.1 mm',
    images: ['/images/snake-rg.jpeg', '/images/friendship-ring24.jpeg'],
    variants: [],
    placeholder: { kind: 'pave', gem: 'silver', tone: 'white' },
  },
];

export const getProductById = (id) => PRODUCTS.find((p) => p.id === id);
export const getProductBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug);
