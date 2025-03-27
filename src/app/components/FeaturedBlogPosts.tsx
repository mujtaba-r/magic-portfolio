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
            className={styles.container}>
            <Flex
                direction="column"
                fillWidth maxWidth="s" gap="m">
                <RevealFx translateY="4" speed="medium">
                    <Heading
                        wrap="balance"
                        variant="display-strong-l"
                        className={styles.sectionTitle}>
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
                        <Posts range={[1, 3]} columns="3" />
                    </Suspense>
                </div>
            </RevealFx>
        </Flex>
    );
} 