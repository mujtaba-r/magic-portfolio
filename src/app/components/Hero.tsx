import React from 'react';
import { Flex, Heading, Text, Button, Avatar, RevealFx } from '@/once-ui/components';
import { about, person } from '@/app/resources';

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
                minHeight: '80vh',
                position: 'relative',
                overflow: 'hidden',
            }}>
            <Flex
                direction="column"
                fillWidth maxWidth="s" gap="m">
                <RevealFx translateY="4" speed="medium">
                    <Heading
                        wrap="balance"
                        variant="display-strong-xl">
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
                            size="m">
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
                            size="m">
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
        </Flex>
    );
} 