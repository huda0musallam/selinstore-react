import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className: string;
  width: number;
  height: number;
}

/** Shows a calm branded placeholder when a product has no photo or the photo fails to load. */
export function ProductImage({ src, alt, className, width, height }: ProductImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return (
      <div className={`${className} product-image-fallback`} role="img" aria-label={alt}>
        <img src="/brand/selin-icon.png" alt="" width="64" height="64" />
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      onError={() => setFailedSrc(src)}
    />
  );
}
