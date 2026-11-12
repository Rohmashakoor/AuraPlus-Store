/** Format whole rupees, e.g. 35000 -> "Rs 35,000". */
export function money(rupees) {
  return `Rs ${Math.round(rupees).toLocaleString('en-US')}`;
}

/** { Size: '6', Finish: 'Polished' } -> "Size 6 · Finish Polished" */
export function variantLabel(variant) {
  return Object.entries(variant || {})
    .map(([name, value]) => `${name} ${value}`)
    .join(' · ');
}
