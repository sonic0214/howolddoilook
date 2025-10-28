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

  // Optimize Pexels URLs for better performance
  const getOptimizedSrc = (originalSrc: string) => {
    if (originalSrc.includes('pexels.com')) {
      // Ensure we're using optimal parameters for performance
      let optimized = originalSrc;

      // Use higher compression for better performance
      if (optimized.includes('cs=tinysrgb')) {
        optimized = optimized.replace('cs=tinysrgb', 'cs=tinysrgb&dpr=1&q=80');
      }

      // Add WebP format support
      if (!optimized.includes('format=')) {
        optimized += '&format=webp';
      }

      return optimized;
    }
    return originalSrc;
  };

  // Get fallback JPEG source
  const getFallbackSrc = (originalSrc: string) => {
    if (originalSrc.includes('pexels.com')) {
      let optimized = originalSrc;

      // Use higher compression for better performance
      if (optimized.includes('cs=tinysrgb')) {
        optimized = optimized.replace('cs=tinysrgb', 'cs=tinysrgb&dpr=1&q=80');
      }

      return optimized;
    }
    return originalSrc;
  };

  const webpSrc = getOptimizedSrc(src);
  const fallbackSrc = getFallbackSrc(src);

  if (error) {
    // Final fallback to original image
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
      />
    );
  }

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={fallbackSrc}
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