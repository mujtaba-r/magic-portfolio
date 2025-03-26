import React from 'react';
import { Flex, Heading, Text, RevealFx } from '@/once-ui/components';
import { Projects } from '@/app/work/components/Projects';
import styles from './FeaturedProjects.module.scss';

export function FeaturedProjects() {
    return (
        <Flex
            fillWidth
            direction="column"
            paddingY="xl"
            gap="l"
            style={{
                position: 'relative',
                background: 'radial-gradient(circle at bottom left, var(--accent-weak), transparent 50%)',
            }}>
            <Flex
                direction="column"
                fillWidth maxWidth="s" gap="m">
                <RevealFx translateY="4" speed="medium">
                    <Heading
                        wrap="balance"
                        variant="display-strong-l"
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
                        variant="body-default-l">
                        Check out some of my latest projects showcasing AI-powered solutions and modern development practices.
                    </Text>
                </RevealFx>
            </Flex>
            <RevealFx translateY="16" delay={0.4} speed="medium">
                <div className={styles.projectsGrid}>
                    <Projects range={[1, 3]} />
                </div>
            </RevealFx>
            <Flex
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'var(--accent-weak)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    opacity: 0.3,
                    pointerEvents: 'none',
                }}
            />
        </Flex>
    );
} 