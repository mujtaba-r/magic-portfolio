'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Flex } from '@/once-ui/components';

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#444" offset="20%" />
      <stop stop-color="#333" offset="50%" />
      <stop stop-color="#444" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

interface OptimizedImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    className?: string;
    style?: React.CSSProperties;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    sizes?: string;
    aspectRatio?: string;
}

export function OptimizedImage({
    src,
    alt,
    width,
    height,
    priority = false,
    className = '',
    style,
    objectFit = 'cover',
    sizes = '100vw',
    aspectRatio
}: OptimizedImageProps) {
    const [isLoading, setLoading] = useState(true);

    return (
        <Flex
            className={`image-container ${isLoading ? 'is-loading' : 'is-loaded'} ${className}`}
            style={{
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: aspectRatio || (width && height ? `${width}/${height}` : '16/9'),
                ...style
            }}>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes={sizes}
                priority={priority}
                quality={90}
                placeholder={priority ? 'empty' : `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                className={`transition-opacity duration-300 ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                style={{ 
                    objectFit,
                    width: '100%',
                    height: '100%'
                }}
                onLoadingComplete={() => setLoading(false)}
            />
        </Flex>
    );
} 