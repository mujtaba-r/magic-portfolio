import React from 'react';
import { Flex, Heading, Text, RevealFx } from '@/once-ui/components';
import { Posts } from '@/app/blog/components/Posts';

export function FeaturedBlogPosts() {
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
                        Latest Thoughts
                    </Heading>
                </RevealFx>
                <RevealFx translateY="8" delay={0.2} speed="medium">
                    <Text
                        wrap="balance"
                        onBackground="neutral-weak"
                        variant="body-default-l">
                        Insights on technology, entrepreneurship, and the future of AI.
                    </Text>
                </RevealFx>
            </Flex>
            <RevealFx translateY="16" delay={0.4} speed="medium">
                <Posts range={[1, 3]} columns="3" />
            </RevealFx>
        </Flex>
    );
} 