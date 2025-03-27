"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Flex, SegmentedControl, Text } from '@/once-ui/components';
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
    const [currentTime, setCurrentTime] = useState('');
    const [timeZone, setTimeZone] = useState('');

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Update time every second
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', { 
                hour: 'numeric',
                minute: '2-digit',
                hour12: true 
            }));
            setTimeZone(now.toLocaleDateString('en-US', { 
                timeZoneName: 'short',
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            }).split(',')[1].trim());
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
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
        return null;
    }

    return (
        <header className={styles.header}>
            <Flex
                fillWidth
                justifyContent="space-between"
                alignItems="center"
                padding="m">
                <Text variant="body-default-s">{timeZone}</Text>
                <Flex className={styles.navContainer} radius="m">
                    <SegmentedControl
                        buttons={allButtons}
                        selected={pathname || '/'}
                        onToggle={handleToggle}
                    />
                </Flex>
                <Text variant="body-default-s">{currentTime}</Text>
            </Flex>
        </header>
    );
}

export default Header;