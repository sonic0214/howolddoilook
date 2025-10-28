import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy'
}: OptimizedImageProps) {
  const [error, setError] = useState(false);

  // Convert Pexels URLs to WebP format
  const getWebPSrc = (originalSrc: string) => {
    if (originalSrc.includes('pexels.com')) {
      // Pexels supports WebP format via URL parameter
      return originalSrc.replace('&cs=tinysrgb', '&cs=tinysrgb&format=webp');
    }
    return originalSrc;
  };

  const webpSrc = getWebPSrc(src);

  if (error) {
    // Fallback to original image if WebP fails
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        onError={() => setError(true)}
      />
    </picture>
  );
}