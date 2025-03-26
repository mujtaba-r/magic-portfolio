import React from 'react';
import { Flex, Heading, Text, Button, Avatar, RevealFx } from '@/once-ui/components';
import { about, person } from '@/app/resources';
import styles from './Hero.module.scss';

interface HeroProps {
    title: React.ReactNode;
    subtitle: React.ReactNode;
}

export function Hero({ title, subtitle }: HeroProps) {
    return (
        <Flex
            fillWidth
            direction="column"
            paddingY="xl"
            gap="l"
            style={{
                minHeight: '90vh',
                position: 'relative',
                overflow: 'hidden',
                background: 'radial-gradient(circle at top right, var(--accent-weak), transparent 50%)',
            }}>
            <Flex
                direction="column"
                fillWidth maxWidth="s" gap="m">
                <RevealFx translateY="4" speed="medium">
                    <Heading
                        wrap="balance"
                        variant="display-strong-xl"
                        style={{
                            background: 'linear-gradient(45deg, var(--accent), var(--accent-strong))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                        {title}
                    </Heading>
                </RevealFx>
                <RevealFx translateY="8" delay={0.2} speed="medium">
                    <Text
                        wrap="balance"
                        onBackground="neutral-weak"
                        variant="body-default-l">
                        {subtitle}
                    </Text>
                </RevealFx>
                <RevealFx translateY="12" delay={0.4} speed="medium">
                    <Flex gap="m" wrap>
                        <Button
                            data-border="rounded"
                            href="/about"
                            variant="tertiary"
                            suffixIcon="chevronRight"
                            size="m"
                            className={styles.button}
                            style={{
                                background: 'var(--accent)',
                                color: 'var(--background)',
                            }}>
                            <Flex
                                gap="8"
                                alignItems="center">
                                {about.avatar.display && (
                                    <Avatar
                                        style={{marginLeft: '-0.75rem', marginRight: '0.25rem'}}
                                        src={person.avatar}
                                        size="m"/>
                                )}
                                About me
                            </Flex>
                        </Button>
                        <Button
                            data-border="rounded"
                            href="/work"
                            variant="secondary"
                            suffixIcon="chevronRight"
                            size="m"
                            className={styles.button}
                            style={{
                                border: '2px solid var(--accent)',
                            }}>
                            View Projects
                        </Button>
                    </Flex>
                </RevealFx>
            </Flex>
            <RevealFx translateY="16" delay={0.6} speed="medium">
                <Flex
                    style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        height: '40%',
                        background: 'linear-gradient(to top, var(--background), transparent)',
                        pointerEvents: 'none',
                    }}
                />
            </RevealFx>
            <Flex
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
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