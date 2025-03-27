import { CustomMDX } from '@/app/components/mdx';
import { formatDate } from '@/app/utils';
import { Avatar, Button, Flex, Heading, Text, RevealFx } from '@/once-ui/components';
import { person } from '@/app/resources';
import styles from './Post.module.scss';

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
            fillWidth
            direction="column"
            gap="l"
            style={{
                position: 'relative',
                background: 'radial-gradient(circle at top right, var(--accent-weak), transparent 50%)',
                overflow: 'hidden',
            }}>
            <Flex
                direction="column"
                fillWidth
                maxWidth="xs"
                gap="m"
                style={{
                    position: 'relative',
                    zIndex: 1
                }}>
                <RevealFx translateY="4" speed="medium">
                    <Button
                        href="/blog"
                        variant="tertiary"
                        size="s"
                        prefixIcon="chevronLeft">
                        Posts
                    </Button>
                </RevealFx>
                <RevealFx translateY="8" delay={0.2} speed="medium">
                    <Heading
                        as="h1"
                        variant="display-strong-l"
                        className={styles.title}
                        style={{
                            color: 'var(--accent)',
                            fontWeight: 'bold',
                        }}>
                        {post.metadata.title}
                    </Heading>
                </RevealFx>
                <RevealFx translateY="12" delay={0.3} speed="medium">
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
                </RevealFx>
            </Flex>
            <RevealFx translateY="16" delay={0.4} speed="medium">
                <div className={styles.content}>
                    <Flex
                        as="article"
                        direction="column"
                        fillWidth>
                        <CustomMDX source={post.content} />
                    </Flex>
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
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
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
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
                }}
            />
        </Flex>
    );
} 