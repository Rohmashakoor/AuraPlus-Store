import nodemailer from 'nodemailer';
import { variantLabel } from '@/lib/format';

/**
 * Tells you an order came in. Server-only.
 *
 * Email  : needs SMTP_USER + SMTP_PASS (a Gmail App Password works). Sent to ORDER_NOTIFY_EMAIL.
 * Telegram (optional, instant phone alert): needs TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID.
 *
 * Each channel is skipped if its keys are missing. The order counts as
 * received when at least one channel delivers.
 */

const rs = (n) => `Rs ${Math.round(n).toLocaleString('en-US')}`;
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

function placedAt(order) {
  return new Date(order.placedAt).toLocaleString('en-GB', { timeZone: 'Asia/Karachi', dateStyle: 'medium', timeStyle: 'short' });
}

function lineText(l) {
  const opts = variantLabel(l.variant);
  return `${l.qty} x ${l.name}${opts ? ` (${opts})` : ''} · ${l.metal} · ${rs(l.lineTotal)}`;
}

export function orderText(o) {
  const c = o.customer;
  return [
    `New order ${o.number} (${placedAt(o)})`,
    '',
    ...o.items.map(lineText),
    '',
    `Subtotal: ${rs(o.subtotal)}`,
    `Delivery: ${rs(o.delivery)}`,
    `TOTAL TO COLLECT: ${rs(o.total)} (${o.payment})`,
    '',
    `Name: ${c.name}`,
    `Phone: ${c.phone}`,
    c.email ? `Email: ${c.email}` : null,
    `City: ${c.city}`,
    `Address: ${c.address}`,
    c.notes ? `Notes: ${c.notes}` : null,
  ]
    .filter((x) => x !== null)
    .join('\n');
}

function orderHtml(o) {
  const c = o.customer;
  const rows = o.items
    .map((l) => {
      const opts = variantLabel(l.variant);
      return `<tr><td style="padding:6px 12px 6px 0">${l.qty} &times; <b>${esc(l.name)}</b>${opts ? `<br><span style="color:#666">${esc(opts)}</span>` : ''}<br><span style="color:#666">${esc(l.metal)}</span></td><td style="padding:6px 0;text-align:right;white-space:nowrap">${rs(l.lineTotal)}</td></tr>`;
    })
    .join('');
  return `<div style="font-family:Arial,sans-serif;font-size:15px;color:#1B1931;max-width:560px">
<h2 style="margin:0 0 4px">New order ${esc(o.number)}</h2>
<p style="margin:0 0 16px;color:#666">${esc(placedAt(o))}</p>
<table style="width:100%;border-collapse:collapse;border-top:1px solid #ddd;border-bottom:1px solid #ddd">${rows}</table>
<table style="width:100%;margin-top:10px"><tr><td>Subtotal</td><td style="text-align:right">${rs(o.subtotal)}</td></tr>
<tr><td>Delivery</td><td style="text-align:right">${rs(o.delivery)}</td></tr>
<tr><td><b>Collect on delivery</b></td><td style="text-align:right"><b>${rs(o.total)}</b></td></tr></table>
<h3 style="margin:22px 0 6px">Customer</h3>
<p style="margin:0;line-height:1.6"><b>${esc(c.name)}</b><br>Phone: ${esc(c.phone)}<br>${c.email ? `Email: ${esc(c.email)}<br>` : ''}${esc(c.city)}<br>${esc(c.address)}${c.notes ? `<br><i>Notes: ${esc(c.notes)}</i>` : ''}</p>
</div>`;
}

async function sendEmail(order) {
  const { SMTP_USER, SMTP_PASS, ORDER_NOTIFY_EMAIL, SMTP_HOST, SMTP_PORT } = process.env;
  if (!SMTP_USER || !SMTP_PASS) return false;

  const port = Number(SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transport.sendMail({
    from: `"Solène orders" <${SMTP_USER}>`,
    to: ORDER_NOTIFY_EMAIL || SMTP_USER,
    replyTo: order.customer.email || undefined,
    subject: `New order ${order.number} · ${rs(order.total)} · ${order.customer.name}`,
    text: orderText(order),
    html: orderHtml(order),
  });
  return true;
}

async function sendTelegram(order) {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return false;

  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: orderText(order) }),
  });
  if (!res.ok) throw new Error(`Telegram responded ${res.status}`);
  return true;
}

/** Returns { delivered: boolean }. Never throws. */
export async function sendOrderNotifications(order) {
  const channels = { email: sendEmail, telegram: sendTelegram };
  const names = Object.keys(channels);
  const results = await Promise.allSettled(names.map((n) => channels[n](order)));

  let delivered = false;
  results.forEach((r, i) => {
    if (r.status === 'fulfilled' && r.value) delivered = true;
    if (r.status === 'rejected') console.error(`Order alert via ${names[i]} failed:`, r.reason?.message || r.reason);
  });
  return { delivered };
}
