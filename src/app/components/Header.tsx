"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Flex, SegmentedControl } from '@/once-ui/components';
import { useTheme } from 'next-themes';
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
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [currentTheme, setCurrentTheme] = useState<string>('system');

    // After mounting, we have access to the theme
    useEffect(() => {
        setMounted(true);
        // Initialize current theme
        const savedTheme = localStorage.getItem('theme') || 'system';
        setCurrentTheme(savedTheme);
    }, []);

    // Keep currentTheme in sync with theme changes
    useEffect(() => {
        if (mounted && theme) {
            setCurrentTheme(theme);
            localStorage.setItem('theme', theme);
        }
    }, [theme, mounted]);

    const getSelectedValue = () => {
        // Special handling for theme toggle
        if (pathname === currentTheme) return currentTheme;
        // Return the current path for navigation items
        return pathname || '/';
    };

    const handleToggle = (value: string) => {
        if (value === 'light' || value === 'dark') {
            setTheme(value);
            return;
        }
        router.push(value);
    };

    // Determine the actual theme considering system preference
    const resolvedTheme = theme === 'system' ? systemTheme : theme;

    // Combine navigation items with theme toggle
    const allButtons = [
        ...navigationItems,
        {
            label: resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode',
            value: resolvedTheme === 'dark' ? 'light' : 'dark',
            prefixIcon: resolvedTheme === 'dark' ? 'sun' : 'moon'
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