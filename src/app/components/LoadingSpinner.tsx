'use client';

import { Flex } from '@/once-ui/components';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

export function LoadingSpinner({ size = 'medium', className = '' }: LoadingSpinnerProps) {
    const sizeMap = {
        small: '1.5rem',
        medium: '2rem',
        large: '3rem'
    };

    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            className={`loading-spinner ${className}`}
            style={{
                width: sizeMap[size],
                height: sizeMap[size]
            }}>
            <style jsx>{`
                .loading-spinner {
                    position: relative;
                }
                .loading-spinner::before {
                    content: '';
                    box-sizing: border-box;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 2px solid var(--color-neutral-medium);
                    border-top-color: var(--color-brand-strong);
                    animation: spinner 0.6s linear infinite;
                }
                @keyframes spinner {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </Flex>
    );
} 