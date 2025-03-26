import { notFound } from 'next/navigation'
import { CustomMDX } from '@/app/components/mdx'
import { formatDate } from '@/app/utils';
import { getPosts } from '@/app/lib/server';
import { Avatar, Button, Flex, Heading, Text } from '@/once-ui/components'
import { baseURL, person } from '@/app/resources';
import { ProjectMetadata } from '@/app/components/ProjectMetadata';
import { ProjectImages } from '@/app/components/ProjectImages';

interface WorkPostProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
	const posts = await getPosts(['src', 'app', 'work', 'projects']);

	return posts.map((post) => ({
		slug: post.slug,
	}))
}

export async function generateMetadata({ params }: WorkPostProps) {
	const posts = await getPosts(['src', 'app', 'work', 'projects']);
	const post = posts.find((post) => post.slug === params.slug)
	
	if (!post?.metadata) {
		return {
			title: 'Project Not Found',
			description: 'The requested project could not be found.',
		}
	}

	let {
		title = '',
		publishedAt: publishedTime = '',
		summary: description = '',
		images = [],
		image,
		team = [],
		tags = [],
	} = post.metadata

	let ogImage = image
		? `https://${baseURL}${image}`
		: `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		images,
		team,
		tags,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `https://${baseURL}/work/${post.slug}`,
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
	}
}

export default async function WorkPost({ params }: WorkPostProps) {
	const posts = await getPosts(['src', 'app', 'work', 'projects']);
	const post = posts.find((post) => post.slug === params.slug);

	if (!post) {
		notFound();
	}

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
				<Heading
					wrap="balance"
					variant="display-strong-l"
					style={{
						color: 'var(--accent)',
						fontWeight: 'bold',
					}}>
					{post.metadata.title}
				</Heading>
				<Text
					wrap="balance"
					onBackground="neutral-weak"
					variant="body-default-l">
					{formatDate(post.metadata.publishedAt, true)}
				</Text>
			</Flex>
			<Flex
				direction="column"
				fillWidth maxWidth="s" gap="l">
				<CustomMDX source={post.content} />
			</Flex>
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