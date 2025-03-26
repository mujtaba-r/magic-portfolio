"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { Button, Flex, Text } from '@/once-ui/components';
import styles from '@/app/components/Header.module.scss'
import { display, person } from '@/app/resources'
import ThemeToggle from './ThemeToggle';

interface Route {
    name: string;
    href: string;
    icon?: string;
}

const navigationRoutes: Route[] = [
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'About', href: '/about', icon: 'person' },
    { name: 'Work', href: '/work', icon: 'grid' },
    { name: 'Blog', href: '/blog', icon: 'book' },
    { name: 'Gallery', href: '/gallery', icon: 'gallery' }
];

type TimeDisplayProps = {
    timeZone: string;
    locale?: string;  // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = 'en-GB' }) => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeOptions: Intl.DateTimeFormatOptions = {
                timeZone,
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            };
            const timeString = new Intl.DateTimeFormat(locale, timeOptions).format(now);
            setCurrentTime(timeString);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, [timeZone, locale]);

    return (
        <span style={{ 
            fontSize: '0.9rem',
            opacity: 0.8,
            letterSpacing: '0.5px'
        }}>
            {currentTime}
        </span>
    );
};

export default TimeDisplay;

export function Header() {
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <header className={styles.header} role="banner">
            <nav aria-label="Main navigation">
                <Flex
                    as="ul"
                    role="menubar"
                    aria-label="Main menu"
                    fillWidth
                    alignItems="center"
                    gap="s">
                    {navigationRoutes.map((route) => {
                        const isActive = pathname === route.href;
                        return (
                            <li key={route.name} role="none">
                                <Link
                                    href={route.href}
                                    passHref
                                    legacyBehavior>
                                    <Button
                                        href={route.href}
                                        role="menuitem"
                                        aria-current={isActive ? 'page' : undefined}
                                        variant={isActive ? 'secondary' : 'tertiary'}
                                        label={route.name}
                                        prefixIcon={route.icon}
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </Flex>
            </nav>
            <Flex
                as="div"
                role="complementary"
                aria-label="Current time"
                className={styles.time}>
                <Text variant="body-default-s">
                    {new Date().toLocaleTimeString()}
                </Text>
            </Flex>
        </header>
    );
}