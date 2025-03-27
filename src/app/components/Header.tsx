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
    const [theme, setTheme] = useState('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Get saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
    }, []);

    const getSelectedValue = () => {
        // Special handling for theme toggle
        if (pathname === theme) return theme;
        // Return the current path for navigation items
        return pathname || '/';
    };

    const handleToggle = (value: string) => {
        if (value === 'light' || value === 'dark') {
            setTheme(value);
            localStorage.setItem('theme', value);
            document.documentElement.setAttribute('data-theme', value);
            return;
        }
        router.push(value);
    };

    // Combine navigation items with theme toggle
    const allButtons = [
        ...navigationItems,
        {
            label: theme === 'dark' ? 'Light mode' : 'Dark mode',
            value: theme === 'dark' ? 'light' : 'dark',
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
                            selected={getSelectedValue()}
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
                        selected={getSelectedValue()}
                        onToggle={handleToggle}
                    />
                </Flex>
            </Flex>
        </header>
    );
}

export default Header;