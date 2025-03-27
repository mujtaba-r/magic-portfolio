'use client';

import React, { Suspense } from 'react';
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
    return (
        <Flex
            fillWidth
            direction="column"
            paddingY="xl"
            gap="l"
            style={{
                position: 'relative',
                background: 'radial-gradient(circle at top right, var(--accent-weak), transparent 50%)',
                overflow: 'visible',
            }}>
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
                        }}>
                        Latest Thoughts
                    </Heading>
                </RevealFx>
                <RevealFx translateY="8" delay={0.2} speed="medium">
                    <Text
                        wrap="balance"
                        onBackground="neutral-weak"
                        variant="body-default-l"
                        className={styles.sectionDescription}>
                        Insights on technology, entrepreneurship, and the future of AI.
                    </Text>
                </RevealFx>
            </Flex>
            <RevealFx translateY="16" delay={0.4} speed="medium">
                <div className={styles.postsGrid}>
                    <Suspense fallback={<LoadingPosts />}>
                        {/* @ts-ignore */}
                        <Posts range={[0, 3]} columns="3" />
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
                }}>
            </Flex>
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
                }}>
            </Flex>
        </Flex>
    );
} 