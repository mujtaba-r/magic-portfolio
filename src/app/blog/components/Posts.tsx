import { formatDate } from '@/app/utils';
import { getPosts } from '@/app/lib/server';
import { Flex, Grid, Heading, SmartLink, Text } from '@/once-ui/components';
import styles from '@/app/blog/components/Posts.module.scss';

interface PostsProps {
    range?: [number] | [number, number];
    columns?: '1' | '2' | '3';
}

export async function Posts({ range, columns = '2' }: PostsProps) {
    console.log('Posts component: Rendering with range:', range, 'columns:', columns);

    try {
        console.log('Posts component: Fetching blog posts...');
        let allBlogs = await getPosts();
        console.log(`Posts component: Found ${allBlogs.length} blog posts`);

        if (allBlogs.length === 0) {
            return (
                <Flex
                    fillWidth
                    direction="column"
                    alignItems="center"
                    gap="m">
                    <Heading variant="display-strong-s">
                        No posts found
                    </Heading>
                    <Text>Check back later for new content!</Text>
                </Flex>
            );
        }

        // If range is provided, slice the array
        if (range) {
            const [start, end] = range;
            allBlogs = allBlogs.slice(start, end || undefined);
        }

        return (
            <Grid columns={columns} gap="l">
                {allBlogs.map((blog) => (
                    <SmartLink
                        key={blog.slug}
                        href={`/blog/${blog.slug}`}
                        className={styles.hover}>
                        <Flex
                            fillWidth
                            direction="column"
                            gap="s">
                            <Text variant="heading-strong-s">
                                {blog.metadata.title}
                            </Text>
                            <Text
                                variant="body-default-s"
                                onBackground="neutral-weak">
                                {formatDate(blog.metadata.publishedAt)}
                            </Text>
                            <div className={styles.indicator}>→</div>
                        </Flex>
                    </SmartLink>
                ))}
            </Grid>
        );
    } catch (error) {
        console.error('Error in Posts component:', error);
        return (
            <Flex
                fillWidth
                direction="column"
                alignItems="center"
                gap="m">
                <Heading variant="display-strong-s">
                    Error loading posts
                </Heading>
                <Text>Please try again later.</Text>
            </Flex>
        );
    }
}