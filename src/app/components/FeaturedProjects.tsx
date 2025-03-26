'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { Flex, Heading, Text, RevealFx } from '@/once-ui/components';
import { Projects } from '@/app/work/components/Projects';
import styles from './FeaturedProjects.module.scss';

function LoadingProjects() {
    return (
        <Flex fillWidth gap="l" marginBottom="40" paddingX="l" direction="column">
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
        </Flex>
    );
}

export function FeaturedProjects() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const progress = Math.min(100, Math.max(0, (window.scrollY / scrollHeight) * 100));
                    setScrollProgress(progress);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Flex
            fillWidth
            direction="column"
            paddingY="xl"
            gap="l"
            style={{
                position: 'relative',
                background: 'radial-gradient(circle at bottom left, var(--accent-weak), transparent 50%)',
                overflow: 'hidden',
                minHeight: '100vh',
            }}>
            <div 
                className={styles.scrollProgress}
                style={{ width: `${scrollProgress}%` }}
            />
            <Flex
                direction="column"
                fillWidth maxWidth="s" gap="m">
                <RevealFx translateY="4" speed="medium">
                    <Heading
                        wrap="balance"
                        variant="display-strong-l"
                        className={styles.sectionTitle}
                        style={{
                            color: 'var(--accent)',
                            fontWeight: 'bold',
                        }}>
                        Featured Projects
                    </Heading>
                </RevealFx>
                <RevealFx translateY="8" delay={0.2} speed="medium">
                    <Text
                        wrap="balance"
                        onBackground="neutral-weak"
                        variant="body-default-l"
                        className={styles.sectionDescription}>
                        Check out some of my latest projects showcasing AI-powered solutions and modern development practices.
                    </Text>
                </RevealFx>
            </Flex>
            <RevealFx translateY="16" delay={0.4} speed="medium">
                <div className={styles.projectsGrid}>
                    <Suspense fallback={<LoadingProjects />}>
                        {/* @ts-ignore */}
                        <Projects range={[1, 3]} />
                    </Suspense>
                </div>
            </RevealFx>
            <Flex
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10%',
                    width: '400px',
                    height: '400px',
                    background: 'var(--accent-weak)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    opacity: 0.3,
                    pointerEvents: 'none',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
                }}
            />
            <Flex
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'var(--accent-weak)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    opacity: 0.2,
                    pointerEvents: 'none',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
                }}
            />
        </Flex>
    );
} 