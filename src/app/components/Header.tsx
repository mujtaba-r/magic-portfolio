"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { Button, Flex, Text } from '@/once-ui/components';
import styles from '@/app/components/Header.module.scss'
import { person } from '@/app/resources'
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
    { name: 'Blog', href: '/blog', icon: 'book' }
];

export function Header() {
    const [mounted, setMounted] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const pathname = usePathname();
    
    useEffect(() => {
        setMounted(true);
        const updateTime = () => {
            const now = new Date();
            const timeOptions: Intl.DateTimeFormatOptions = {
                timeZone: person.location,
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            };
            const timeString = new Intl.DateTimeFormat('en-US', timeOptions).format(now);
            setCurrentTime(timeString);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    if (!mounted) return null;

    return (
        <header className={styles.header} role="banner">
            <Flex
                fillWidth
                maxWidth="xl"
                style={{ margin: '0 auto' }}
                paddingX="m"
                alignItems="center"
                justifyContent="space-between">
                <Text 
                    variant="body-default-s" 
                    className={styles.location}>
                    {person.location}
                </Text>
                
                <Flex
                    className={styles.navContainer}
                    background="surface"
                    radius="l"
                    padding="xs">
                    <nav aria-label="Main navigation">
                        <Flex
                            as="ul"
                            role="menubar"
                            aria-label="Main menu"
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
                </Flex>

                <Flex gap="m" alignItems="center">
                    <Text 
                        variant="body-default-s" 
                        className={styles.time}>
                        {currentTime}
                    </Text>
                    <ThemeToggle />
                </Flex>
            </Flex>
        </header>
    );
}