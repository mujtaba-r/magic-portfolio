'use client';

import { Flex } from '@/once-ui/components';
import styles from '@/app/about/about.module.scss';

interface LoadingProps {
    type: 'text' | 'image' | 'avatar';
    count?: number;
}

export function Loading({ type, count = 1 }: LoadingProps) {
    return (
        <Flex direction="column" gap="m">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className={`${styles.skeleton} ${styles[type]}`}
                    role="presentation"
                    aria-hidden="true"
                />
            ))}
        </Flex>
    );
} 