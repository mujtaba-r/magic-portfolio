'use client';

import React, { Suspense } from 'react';
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
        </Flex>
    );
} 