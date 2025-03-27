import { CustomMDX } from '@/app/components/mdx';
import { formatDate } from '@/app/utils';
import { Avatar, Button, Flex, Heading, Text } from '@/once-ui/components';
import { person } from '@/app/resources';

interface PostProps {
    post: {
        metadata: {
            title: string;
            publishedAt: string;
            author?: string;
            description: string;
        };
        content: string;
    };
}

export function Post({ post }: PostProps) {
    return (
        <Flex
            as="section"
            fillWidth
            maxWidth="xs"
            direction="column"
            gap="m">
            <Button
                href="/blog"
                variant="tertiary"
                size="s"
                prefixIcon="chevronLeft">
                Posts
            </Button>
            <Heading
                as="h1"
                variant="display-strong-s">
                {post.metadata.title}
            </Heading>
            <Flex
                gap="12"
                alignItems="center">
                {person.avatar && (
                    <Avatar
                        size="s"
                        src={person.avatar}
                    />
                )}
                <Text
                    variant="body-default-s"
                    onBackground="neutral-weak">
                    {formatDate(post.metadata.publishedAt)}
                </Text>
                {post.metadata.author && (
                    <Text
                        variant="body-default-s"
                        onBackground="neutral-weak">
                        by {post.metadata.author}
                    </Text>
                )}
            </Flex>
            <Flex
                as="article"
                direction="column"
                fillWidth>
                <CustomMDX source={post.content} />
            </Flex>
        </Flex>
    );
} 