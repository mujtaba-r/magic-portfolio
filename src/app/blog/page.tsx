import { getPosts } from '@/app/lib/server';
import { Flex } from '@/once-ui/components';
import { Posts } from '@/app/blog/components/Posts';

export default async function BlogPage() {
	const posts = await getPosts('blog');

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
				fillWidth maxWidth="s" gap="m">
				<h1
					style={{
						color: 'var(--accent)',
						fontWeight: 'bold',
						fontSize: '2.5rem',
						lineHeight: '1.2',
					}}>
					Blog
				</h1>
				<p
					style={{
						color: 'var(--neutral-weak)',
						fontSize: '1.25rem',
						lineHeight: '1.5',
					}}>
					Insights on technology, entrepreneurship, and the future of AI.
				</p>
			</Flex>
			<div className="posts-grid">
				<Posts />
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