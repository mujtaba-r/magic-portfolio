import { getPosts } from '@/app/lib/server';
import { Flex } from '@/once-ui/components';
import { Projects } from '@/app/work/components/Projects';
import { baseURL, person, work } from '../resources';

export function generateMetadata() {
	const title = work.title;
	const description = work.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/work`,
			images: [
				{
					url: ogImage,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

export default async function WorkPage() {
	const posts = await getPosts('work');

	return (
		<Flex
			fillWidth
			direction="column"
			paddingY="xl"
			gap="l"
			style={{
				position: 'relative',
				background: 'radial-gradient(circle at bottom left, var(--accent-weak), transparent 50%)',
				overflow: 'hidden',
			}}>
			<Flex
				direction="column"
				fillWidth maxWidth="s" gap="m">
				<h1
					style={{
						color: 'var(--accent)',
						fontWeight: 'bold',
						fontSize: '3rem',
						lineHeight: '1.2',
						marginBottom: '1rem',
					}}>
					My Work & Projects
				</h1>
				<p
					style={{
						color: 'var(--neutral-weak)',
						fontSize: '1.5rem',
						lineHeight: '1.5',
						marginBottom: '2rem',
					}}>
					Explore my portfolio of innovative projects, from AI-powered applications to full-stack web solutions.
				</p>
			</Flex>
			<div className="projects-grid">
				<Projects />
			</div>
			<Flex
				style={{
					position: 'absolute',
					top: '50%',
					left: '10%',
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
					bottom: '20%',
					right: '10%',
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