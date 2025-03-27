"use client";
//test comment
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Flex, ToggleButton } from "@/once-ui/components"
import styles from '@/app/components/Header.module.scss'

import { routes, display } from '@/app/resources'
import { person, home, about, blog, work, gallery } from '@/app/resources'

import ThemeToggle from './ThemeToggle';

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
        <span className={styles.timeDisplay}>
            {currentTime}
        </span>
    );
};

export default TimeDisplay;

export const Header = () => {
    const pathname = usePathname() ?? '';

    return (
        <Flex style={{height: 'fit-content'}}
            className={styles.position}
            as="header"
            zIndex={9}
            fillWidth padding="8"
            justifyContent="center">
            <Flex
                paddingLeft="12" fillWidth
                alignItems="center"
                textVariant="body-default-s"
                className={styles.locationDisplay}>
                { display.location && (
                    <>{person.location}</>
                )}
            </Flex>
            <Flex
                background="surface" border="neutral-medium" borderStyle="solid-1" radius="m-4" shadow="l"
                padding="4"
                justifyContent="center">
                <Flex
                    gap="4"
                    textVariant="body-default-s">
                    { routes['/'] && (
                        <ToggleButton
                            prefixIcon="home"
                            href="/"
                            selected={pathname === "/"}>
                            {home.label}
                        </ToggleButton>
                    )}
                    { routes['/about'] && (
                        <ToggleButton
                            prefixIcon="person"
                            href="/about"
                            selected={pathname === "/about"}>
                            {about.label}
                        </ToggleButton>
                    )}
                    { routes['/work'] && (
                        <ToggleButton
                            prefixIcon="grid"
                            href="/work"
                            selected={pathname.startsWith('/work')}>
                            {work.label}
                        </ToggleButton>
                    )}
                    { routes['/blog'] && (
                        <ToggleButton
                            prefixIcon="book"
                            href="/blog"
                            selected={pathname.startsWith('/blog')}>
                            {blog.label}
                        </ToggleButton>
                    )}
                    <ThemeToggle />
                </Flex>
            </Flex>
            <Flex
                paddingRight="12" fillWidth
                justifyContent="flex-end" alignItems="center"
                textVariant="body-default-s"
                className={styles.timeDisplayContainer}>
                { display.time && (
                    <TimeDisplay timeZone={person.location}/>
                )}
            </Flex>
        </Flex>
    )
}