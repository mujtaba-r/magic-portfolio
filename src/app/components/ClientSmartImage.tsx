'use client';

import { useState } from 'react';
import { SmartImage } from '@/once-ui/components';

interface ClientSmartImageProps {
    enlarge?: boolean;
    radius?: string;
    sizes?: string;
    alt: string;
    src: string;
}

export function ClientSmartImage({ enlarge, radius, sizes, alt, src }: ClientSmartImageProps) {
    const [isError, setIsError] = useState(false);

    if (isError) {
        return null;
    }

    return (
        <SmartImage
            enlarge={enlarge}
            radius={radius}
            sizes={sizes}
            alt={alt}
            src={src}
            loading="lazy"
            onError={() => {
                console.error(`Failed to load image: ${src}`);
                setIsError(true);
            }}
        />
    );
} 