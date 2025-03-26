import { formatDate } from '@/app/utils';
import { getPosts } from '@/app/lib/server';
import { Flex, Grid, Heading, SmartLink, Text } from '@/once-ui/components';
import styles from '@/app/blog/components/Posts.module.scss';

interface PostsProps {
    range?: [number] | [number, number];
    columns?: '1' | '2' | '3';
}

export async function Posts({
    range,
    columns = '1'
}: PostsProps) {
    try {
        console.log('Posts component: Fetching blog posts...');
        let allBlogs = await getPosts('blog');
        console.log(`Posts component: Found ${allBlogs.length} blog posts`);

        if (allBlogs.length === 0) {
            console.warn('Posts component: No blog posts found');
            return null;
        }

        const sortedBlogs = allBlogs.sort((a, b) => {
            try {
                const dateA = new Date(a.metadata.publishedAt);
                const dateB = new Date(b.metadata.publishedAt);
                if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                    console.warn('Posts component: Invalid date found', { a: a.metadata.publishedAt, b: b.metadata.publishedAt });
                    return 0;
                }
                return dateB.getTime() - dateA.getTime();
            } catch (error) {
                console.warn('Posts component: Error sorting dates:', error);
                return 0;
            }
        });

        const displayedBlogs = range
            ? sortedBlogs.slice(
                  range[0] - 1,
                  range.length === 2 ? range[1] : sortedBlogs.length 
              )
            : sortedBlogs;

        console.log(`Posts component: Displaying ${displayedBlogs.length} blog posts`);

        if (displayedBlogs.length === 0) {
            console.warn('Posts component: No blog posts to display after filtering');
            return null;
        }

        return (
            <Grid
                columns={`repeat(${columns}, 1fr)`} mobileColumns="1col"
                fillWidth marginBottom="40" gap="m" paddingX="l">
                {displayedBlogs.map((post) => (
                    <SmartLink
                        style={{
                            textDecoration: 'none',
                            margin: '0',
                            height: 'fit-content',
                        }}
                        className={styles.hover}
                        key={post.slug}
                        href={`/blog/${post.slug}`}>
                        <Flex
                            position="relative"
                            paddingX="16" paddingY="12" gap="8"
                            direction="column" justifyContent="center">
                            <Flex
                                position="absolute"
                                className={styles.indicator}
                                width="20" height="2"
                                background="neutral-strong"/>
                            <Heading as="h2" wrap="balance">
                                {post.metadata.title}
                            </Heading>
                            <Text
                                variant="body-default-s"
                                onBackground="neutral-weak">
                                {formatDate(post.metadata.publishedAt, false)}
                            </Text>
                        </Flex>
                    </SmartLink>
                ))}
            </Grid>
        );
    } catch (error) {
        console.error('Error in Posts component:', error);
        return null;
    }
}