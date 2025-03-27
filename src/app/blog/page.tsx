import { Flex } from '@/once-ui/components';
import { Posts } from '@/app/blog/components/Posts';
import { getPosts } from '@/app/lib/server';
import { Metadata } from 'next';
import styles from '@/app/blog/blog.module.scss';

export default async function BlogPage() {
	const posts = await getPosts();

	return (
		<Flex
			fillWidth
			direction="column"
			paddingY="xl"
			gap="l"
			style={{
				position: 'relative',
				background: 'radial-gradient(circle at top right, var(--accent-weak), transparent 50%)',
				overflow: 'hidden',
			}}>
			<Flex
				direction="column"
				fillWidth maxWidth="s" gap="m"
				className={styles.blogContainer}>
				<h1 className={styles.title}>
					Blog
				</h1>
				<p className={styles.description}>
					Insights on technology, entrepreneurship, and the future of AI.
				</p>
			</Flex>
			<div className="posts-grid">
				<Posts range={[0, posts.length]} columns="2" />
			</div>
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
				}}
			/>
		</Flex>
	);
}

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Thoughts on software development, design, and technology.',
};