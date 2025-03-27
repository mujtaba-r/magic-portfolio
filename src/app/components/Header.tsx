"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Flex, SegmentedControl } from '@/once-ui/components';
import { useTheme } from 'next-themes';
import styles from './Header.module.scss';

const navigationItems = [
    { label: 'Home', value: '/', prefixIcon: 'home' },
    { label: 'About', value: '/about', prefixIcon: 'user' },
    { label: 'Work', value: '/work', prefixIcon: 'grid' },
    { label: 'Blog', value: '/blog', prefixIcon: 'book' },
    { label: 'Light mode', value: 'theme', prefixIcon: 'sun' }
];

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    // Get the currently selected value based on pathname or theme
    const getSelectedValue = () => {
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

    return (
        <header className={styles.header}>
            <Flex
                fillWidth
                justifyContent="center"
                alignItems="center"
                padding="m">
                <Flex
                    className={styles.navContainer}
                    radius="m">
                    <SegmentedControl
                        buttons={navigationItems.map(item => ({
                            ...item,
                            prefixIcon: item.value === 'theme' 
                                ? theme === 'dark' ? 'sun' : 'moon'
                                : item.prefixIcon,
                            label: item.value === 'theme'
                                ? theme === 'dark' ? 'Light mode' : 'Dark mode'
                                : item.label
                        }))}
                        selected={getSelectedValue()}
                        onToggle={handleToggle}
                    />
                </Flex>
            </Flex>
        </header>
    );
}

export default Header;