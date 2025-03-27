import { Metadata } from 'next';
import { notFound } from 'next/navigation'
import { CustomMDX } from '@/app/components/mdx'
import { formatDate } from '@/app/utils'
import { getPosts, getPost } from '@/app/lib/server'
import { Avatar, Button, Flex, Heading, Text } from '@/once-ui/components'
import { Post } from '@/app/blog/components/Post'

import { person, baseURL } from '@/app/resources'

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
	const posts = await getPosts()

	return posts.map((post) => ({
		slug: post.slug,
	}))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
	const post = await getPost(params.slug)

	if (!post) {
		return {}
	}

	const { title, description, publishedAt, image, author } = post.metadata
	const ogImage = image || `https://${baseURL}/og/${params.slug}`

	return {
		title,
		description,
		authors: [{ name: author || person.name }],
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime: publishedAt,
			authors: [author || person.name],
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: title,
				}
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
		alternates: {
			canonical: `https://${baseURL}/blog/${params.slug}`,
		},
	}
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const post = await getPost(params.slug)

	if (!post) {
		notFound()
	}

	return (
		<>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline: post.metadata.title,
						description: post.metadata.description,
						image: post.metadata.image || `https://${baseURL}/og/${params.slug}`,
						datePublished: post.metadata.publishedAt,
						dateModified: post.metadata.updatedAt || post.metadata.publishedAt,
						author: {
							'@type': 'Person',
							name: post.metadata.author || person.name,
							url: `https://${baseURL}/about`,
						},
						publisher: {
							'@type': 'Organization',
							name: `${person.name}'s Blog`,
							logo: {
								'@type': 'ImageObject',
								url: `https://${baseURL}/logo.png`,
							},
						},
						mainEntityOfPage: {
							'@type': 'WebPage',
							'@id': `https://${baseURL}/blog/${params.slug}`,
						},
					}),
				}}
			/>
			<Post post={post} />
		</>
	)
}