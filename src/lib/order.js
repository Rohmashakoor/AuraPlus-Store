/**
 * Customer-detail checks, shared by the checkout form (instant feedback)
 * and /api/orders (the check that actually counts).
 */

/** Accepts 0300 1234567, +92 300 1234567, 923001234567, 3001234567. Returns 03001234567 or null. */
export function normalizePhone(raw) {
  const d = String(raw || '').replace(/\D/g, '');
  if (/^03\d{9}$/.test(d)) return d;
  if (/^923\d{9}$/.test(d)) return '0' + d.slice(2);
  if (/^3\d{9}$/.test(d)) return '0' + d;
  return null;
}

export function validateCustomer(input) {
  const c = input || {};
  const errors = {};

  const name = String(c.name || '').trim();
  const phone = normalizePhone(c.phone);
  const email = String(c.email || '').trim();
  const city = String(c.city || '').trim();
  const address = String(c.address || '').trim();
  const notes = String(c.notes || '').trim();

  if (name.length < 2 || name.length > 80) errors.name = 'Enter your full name.';
  if (!phone) errors.phone = 'Enter a mobile number like 0300 1234567.';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email, or leave it empty.';
  if (city.length < 2 || city.length > 60) errors.city = 'Enter your city.';
  if (address.length < 10 || address.length > 300) errors.address = 'Enter your full delivery address (house, street, area).';
  if (notes.length > 300) errors.notes = 'Keep notes under 300 characters.';

  return { errors, clean: { name, phone: phone || '', email, city, address, notes } };
}
