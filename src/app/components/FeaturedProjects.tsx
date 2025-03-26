import React from 'react';
import { Flex, Heading, Text, RevealFx } from '@/once-ui/components';
import { Projects } from '@/app/work/components/Projects';

export function FeaturedProjects() {
    return (
        <Flex
            fillWidth
            direction="column"
            paddingY="l" gap="m">
            <Flex
                direction="column"
                fillWidth maxWidth="s" gap="m">
                <RevealFx translateY="4" speed="medium">
                    <Heading
                        wrap="balance"
                        variant="display-strong-l">
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
                <Projects range={[1, 3]} />
            </RevealFx>
        </Flex>
    );
} 