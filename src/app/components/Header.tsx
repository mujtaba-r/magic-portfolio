"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Flex, SegmentedControl } from '@/once-ui/components';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';

const navigationItems = [
    { label: 'Home', value: '/', prefixIcon: 'home' },
    { label: 'About', value: '/about', prefixIcon: 'user' },
    { label: 'Work', value: '/work', prefixIcon: 'grid' },
    { label: 'Blog', value: '/blog', prefixIcon: 'book' },
    { label: 'Dark mode', value: 'theme', prefixIcon: 'moon' }
];

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // After mounting, we have access to the theme
    useEffect(() => setMounted(true), []);

    const getSelectedValue = () => {
        // Don't highlight theme toggle button
        if (pathname === '/') return '/';
        if (pathname === '/about') return '/about';
        if (pathname === '/work') return '/work';
        if (pathname === '/blog') return '/blog';
        return pathname || '/';
    };

    const handleToggle = (value: string) => {
        if (value === 'theme') {
            setTheme(theme === 'dark' ? 'light' : 'dark');
            return;
        }
        router.push(value);
    };

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
                            buttons={navigationItems}
                            selected={getSelectedValue()}
                            onToggle={handleToggle}
                        />
                    </Flex>
                </Flex>
            </header>
        );
    }

    const updatedNavigationItems = navigationItems.map(item => {
        if (item.value === 'theme') {
            return {
                ...item,
                label: theme === 'dark' ? 'Light mode' : 'Dark mode',
                prefixIcon: theme === 'dark' ? 'sun' : 'moon'
            };
        }
        return item;
    });

    return (
        <header className={styles.header}>
            <Flex
                fillWidth
                justifyContent="center"
                alignItems="center"
                padding="m">
                <Flex className={styles.navContainer} radius="m">
                    <SegmentedControl
                        buttons={updatedNavigationItems}
                        selected={getSelectedValue()}
                        onToggle={handleToggle}
                    />
                </Flex>
            </Flex>
        </header>
    );
}

export default Header;