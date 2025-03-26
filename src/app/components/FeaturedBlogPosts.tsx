'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { Flex, Grid, Heading, Text, RevealFx } from '@/once-ui/components';
import { Posts } from '@/app/blog/components/Posts';
import styles from './FeaturedBlogPosts.module.scss';

function LoadingPosts() {
    return (
        <Grid columns="repeat(3, 1fr)" mobileColumns="1col" fillWidth marginBottom="40" gap="m" paddingX="l">
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
        </Grid>
    );
}

export function FeaturedBlogPosts() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
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
                background: 'radial-gradient(circle at top right, var(--accent-weak), transparent 50%)',
                overflow: 'hidden',
                perspective: '1000px',
            }}>
            <div 
                className={styles.parallaxBackground}
                style={{
                    transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
                    willChange: 'transform'
                }}
            />
            <Flex
                direction="column"
                fillWidth maxWidth="s" gap="m"
                style={{
                    position: 'relative',
                    zIndex: 1
                }}>
                <RevealFx translateY="4" speed="medium">
                    <Heading
                        wrap="balance"
                        variant="display-strong-l"
                        className={styles.sectionTitle}
                        style={{
                            color: 'var(--accent)',
                            fontWeight: 'bold',
                            transform: `translate3d(0, ${scrollY * 0.2}px, 0)`,
                            willChange: 'transform'
                        }}>
                        Latest Thoughts
                    </Heading>
                </RevealFx>
                <RevealFx translateY="8" delay={0.2} speed="medium">
                    <Text
                        wrap="balance"
                        onBackground="neutral-weak"
                        variant="body-default-l"
                        className={styles.sectionDescription}
                        style={{
                            transform: `translate3d(0, ${scrollY * 0.1}px, 0)`,
                            willChange: 'transform'
                        }}>
                        Insights on technology, entrepreneurship, and the future of AI.
                    </Text>
                </RevealFx>
            </Flex>
            <RevealFx translateY="16" delay={0.4} speed="medium">
                <div 
                    className={styles.postsGrid}
                    style={{
                        transform: `translateY(${scrollY * 0.3}px)`,
                    }}>
                    <Suspense fallback={<LoadingPosts />}>
                        {/* @ts-ignore */}
                        <Posts range={[1, 3]} columns="3" />
                    </Suspense>
                </div>
            </RevealFx>
            <Flex
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '10%',
                    width: '400px',
                    height: '400px',
                    background: 'var(--accent-weak)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    opacity: 0.3,
                    pointerEvents: 'none',
                    transform: `translateY(${scrollY * 0.4}px)`,
                }}
            />
            <Flex
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'var(--accent-weak)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    opacity: 0.2,
                    pointerEvents: 'none',
                    transform: `translateY(${scrollY * 0.2}px)`,
                }}
            />
        </Flex>
    );
} 