"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Flex, SegmentedControl } from '@/once-ui/components';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';

// Separate navigation items from theme toggle for cleaner management
const navigationItems = [
    { label: 'Home', value: '/', prefixIcon: 'home' },
    { label: 'About', value: '/about', prefixIcon: 'person' },
    { label: 'Work', value: '/work', prefixIcon: 'grid' },
    { label: 'Blog', value: '/blog', prefixIcon: 'book' }
];

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const handleToggle = (value: string) => {
        if (value === 'theme') {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
            return;
        }
        router.push(value);
    };

    // Combine navigation items with theme toggle
    const allButtons = [
        ...navigationItems,
        {
            label: theme === 'dark' ? 'Light mode' : 'Dark mode',
            value: 'theme',
            prefixIcon: theme === 'dark' ? 'sun' : 'moon'
        }
    ];

    // Initial render with SSR values
    if (!mounted) {
        return (
            <header className={styles.header}>
                <Flex
                    fillWidth
                    justifyContent="center"
                    alignItems="center"
                    padding="m">
                    <Flex className={styles.navContainer} radius="m">
                        <SegmentedControl
                            buttons={allButtons}
                            selected={pathname || '/'}
                            onToggle={handleToggle}
                        />
                    </Flex>
                </Flex>
            </header>
        );
    }

    return (
        <header className={styles.header}>
            <Flex
                fillWidth
                justifyContent="center"
                alignItems="center"
                padding="m">
                <Flex className={styles.navContainer} radius="m">
                    <SegmentedControl
                        buttons={allButtons}
                        selected={pathname || '/'}
                        onToggle={handleToggle}
                    />
                </Flex>
            </Flex>
        </header>
    );
}

export default Header;