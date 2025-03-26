import { notFound } from 'next/navigation'
import { CustomMDX } from '@/app/components/mdx'
import { formatDate, getPosts } from '@/app/utils'
import { Button, Flex } from '@/once-ui/components'
import { baseURL, person } from '@/app/resources';
import { ProjectMetadata } from '@/app/components/ProjectMetadata';
import { ProjectImages } from '@/app/components/ProjectImages';

interface WorkParams {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
	let posts = getPosts(['src', 'app', 'work', 'projects']);

	return posts.map((post) => ({
		slug: post.slug,
	}))
}

export function generateMetadata({ params }: WorkParams) {
	let post = getPosts(['src', 'app', 'work', 'projects']).find((post) => post.slug === params.slug)
	
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

export default function Project({ params }: WorkParams) {
	let post = getPosts(['src', 'app', 'work', 'projects']).find((post) => post.slug === params.slug)

	if (!post?.metadata) {
		notFound()
	}

	// Ensure all required fields are present
	const metadata = {
		...post.metadata,
		tags: post.metadata.tags || [],
	};

	return (
		<Flex as="section"
			fillWidth maxWidth="m"
			direction="column" alignItems="center"
			gap="l">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline: metadata.title || '',
						datePublished: metadata.publishedAt || '',
						dateModified: metadata.publishedAt || '',
						description: metadata.summary || '',
						image: metadata.image
							? `https://${baseURL}${metadata.image}`
							: `https://${baseURL}/og?title=${encodeURIComponent(metadata.title || '')}`,
						url: `https://${baseURL}/work/${post.slug}`,
						author: {
							'@type': 'Person',
							name: person.name,
						},
					}),
				}}
			/>
			<Flex
				fillWidth maxWidth="xs" gap="16"
				direction="column">
				<Button
					href="/work"
					variant="tertiary"
					size="s"
					prefixIcon="chevronLeft">
					Projects
				</Button>
				<ProjectMetadata metadata={metadata} />
			</Flex>
			<ProjectImages metadata={metadata} />
			<Flex style={{margin: 'auto'}}
				as="article"
				maxWidth="xs" fillWidth
				direction="column">
				<CustomMDX source={post.content} />
			</Flex>
		</Flex>
	)
}