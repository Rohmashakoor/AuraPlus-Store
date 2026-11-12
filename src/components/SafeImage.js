'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * next/image that never shows a broken-image icon.
 * If the file is missing or fails to load, it renders `fallback` instead.
 * The parent element must be `relative` and have a size (the image fills it).
 */
export default function SafeImage({ src, alt, fallback = null, sizes, priority = false, className = '' }) {
  const [failed, setFailed] = useState(!src);
  const ref = useRef(null);

  useEffect(() => {
    setFailed(!src);
  }, [src]);

  // Catches an image that already failed before React attached onError.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (failed) return fallback;

  return (
    <Image
      ref={ref}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
