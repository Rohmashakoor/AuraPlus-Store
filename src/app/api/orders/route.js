import { NextResponse } from 'next/server';
import { DELIVERY_FEE, MAX_QTY, PAYMENT_METHOD, getProductById } from '@/data/products';
import { validateCustomer } from '@/lib/order';
import { sendOrderNotifications } from '@/lib/notify';

/**
 * POST /api/orders   (cash on delivery)
 *
 * Body: { customer: { name, phone, email?, city, address, notes? },
 *         items: [{ id: 'rg-001', variant: { Size: '6' }, quantity: 2 }] }
 * Returns: { order }
 *
 * The browser only sends product ids, options and quantities. Names, prices and
 * the delivery charge are applied here from src/data/products.js.
 */

export const runtime = 'nodejs';

const MAX_LINES = 20;
const fail = (error, status = 400, extra = {}) => NextResponse.json({ error, ...extra }, { status });

function cleanVariant(product, selected) {
  const out = {};
  for (const def of product.variants) {
    const value = selected?.[def.name];
    if (!def.options.includes(value)) return null;
    out[def.name] = value;
  }
  return out;
}

function newOrderNumber() {
  const time = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 4);
  return `SOL-${time}${rand}`;
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return fail('Invalid request.');
  }

  // Hidden field that real customers never fill in; bots do.
  if (body?.website) return fail('We could not place this order.');

  const { errors, clean } = validateCustomer(body?.customer);
  if (Object.keys(errors).length) return fail('Please check your details.', 400, { errors });

  const items = body?.items;
  if (!Array.isArray(items) || items.length === 0 || items.length > MAX_LINES) {
    return fail('Your bag is empty.');
  }

  const lines = [];
  for (const item of items) {
    const product = getProductById(item?.id);
    if (!product) return fail('One of the pieces in your bag is no longer available.');

    const qty = Number(item.quantity);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) return fail('Invalid quantity.');

    const variant = cleanVariant(product, item.variant);
    if (!variant) return fail(`Please choose options for ${product.name}.`);

    lines.push({
      id: product.id,
      name: product.name,
      metal: product.metal,
      variant,
      qty,
      unitPrice: product.price,
      lineTotal: product.price * qty,
    });
  }

  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
  const order = {
    number: newOrderNumber(),
    placedAt: new Date().toISOString(),
    customer: clean,
    items: lines,
    subtotal,
    delivery: DELIVERY_FEE,
    total: subtotal + DELIVERY_FEE,
    payment: PAYMENT_METHOD,
  };

  // Server log doubles as a backup record if an alert fails to send.
  console.log('NEW ORDER', JSON.stringify(order));

  const { delivered } = await sendOrderNotifications(order);
  if (!delivered) {
    return fail('We could not place your order right now. Please try again in a moment.', 500);
  }

  return NextResponse.json({ order });
}
