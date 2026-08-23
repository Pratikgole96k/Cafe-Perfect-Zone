import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto';
  containerClassName?: string;
  priority?: boolean;
}

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80';

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  aspectRatio = 'auto',
  containerClassName = '',
  className = '',
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'video'
      ? 'aspect-video'
      : aspectRatio === 'wide'
      ? 'aspect-[16/10]'
      : '';

  // Format Unsplash URLs for optimal web delivery
  const getOptimizedUrl = (url: string) => {
    if (!url) return fallbackSrc;
    if (url.includes('unsplash.com') && !url.includes('auto=format')) {
      return `${url}${url.includes('?') ? '&' : '?'}auto=format&fit=crop&q=75`;
    }
    return url;
  };

  const imageSrc = hasError ? fallbackSrc : getOptimizedUrl(src);

  return (
    <div className={`relative overflow-hidden bg-zinc-900/60 ${aspectClass} ${containerClassName}`}>
      {/* Skeleton Loading Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse" />
      )}

      <img
        src={imageSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
