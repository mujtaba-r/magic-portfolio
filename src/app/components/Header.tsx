"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Flex, Button } from '@/once-ui/components';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';

// Navigation items
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
    const [time, setTime] = useState('');
    const timeZone = 'America/Toronto';

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);

        // Update time every second
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { 
                hour12: false,
                timeZone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleThemeToggle = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <header className={styles.position}>
            <Flex className={`pl-12 ${styles.hideOnMobile}`} alignItems="center" fillWidth>
                {timeZone}
            </Flex>
            
            <Flex className={styles.navContainer} justifyContent="center">
                <Flex gap="4">
                    {navigationItems.map((item) => (
                        <Button
                            key={item.value}
                            href={item.value}
                            variant={pathname === item.value ? 'secondary' : 'tertiary'}
                            size="m"
                            prefixIcon={item.prefixIcon}
                            label={item.label}
                            className={styles.navButton}
                        />
                    ))}
                    <Button
                        variant="tertiary"
                        size="s"
                        onClick={handleThemeToggle}
                        prefixIcon={theme === 'dark' ? 'sun' : 'moon'}
                        label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                        className={styles.navButton}
                    />
                </Flex>
            </Flex>

            <Flex className={`pr-12 ${styles.hideOnMobile}`} justifyContent="flex-end" alignItems="center" fillWidth>
                {time}
            </Flex>
        </header>
    );
}

export default Header;