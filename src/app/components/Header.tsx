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
                    radius="m"
                    background="surface">
                    <SegmentedControl
                        buttons={navigationItems}
                        selected={pathname || '/'}
                        onToggle={handleToggle}
                    />
                </Flex>
            </Flex>
        </header>
    );
}

export default Header;