import { Flex, Heading, Text, RevealFx } from '@/once-ui/components';
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
				style={{
					position: 'relative',
					zIndex: 1
				}}>
				<RevealFx translateY="4" speed="medium">
					<Heading
						wrap="balance"
						variant="display-strong-l"
						className={styles.title}
						style={{
							color: 'var(--accent)',
							fontWeight: 'bold',
						}}>
						Blog
					</Heading>
				</RevealFx>
				<RevealFx translateY="8" delay={0.2} speed="medium">
					<Text
						wrap="balance"
						onBackground="neutral-weak"
						variant="body-default-l"
						className={styles.description}>
						Insights on technology, entrepreneurship, and the future of AI.
					</Text>
				</RevealFx>
			</Flex>
			<RevealFx translateY="16" delay={0.4} speed="medium">
				<div className={styles.postsGrid}>
					<Posts range={[0, posts.length]} columns="2" />
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

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Thoughts on software development, design, and technology.',
};