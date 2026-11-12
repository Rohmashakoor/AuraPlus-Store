'use client';

import JewelryArt from './JewelryArt';
import SafeImage from './SafeImage';

/**
 * Loads product.images[index] from /public/images.
 * When the file is missing: the main image (index 0) shows the drawn
 * placeholder; extra images (bare) simply render nothing.
 */
export default function ProductImage({ product, index = 0, bare = false, sizes, className = '' }) {
  const fallback = bare ? null : (
    <JewelryArt {...product.placeholder} label={product.name} />
  );
  return (
    <SafeImage
      src={product.images[index]}
      alt={product.name}
      fallback={fallback}
      sizes={sizes}
      className={className}
    />
  );
}
