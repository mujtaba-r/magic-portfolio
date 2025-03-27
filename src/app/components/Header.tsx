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
        <header className={`flex p-8 ${styles.position}`} style={{ justifyContent: 'center', width: '100%', height: 'fit-content', zIndex: 9 }}>
            <Flex className="pl-12 s-flex-hide font-body font-default font-s" alignItems="center" fillWidth>
                {timeZone}
            </Flex>
            
            <Flex className="p-4 surface-background neutral-border-medium border-solid-1 radius-m-4 shadow-l" justifyContent="center">
                <Flex className="g-4 font-body font-default font-s">
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

            <Flex className="pr-12 s-flex-hide font-body font-default font-s" justifyContent="flex-end" alignItems="center" fillWidth>
                {time}
            </Flex>
        </header>
    );
}

export default Header;