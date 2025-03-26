import React from 'react';
import { Flex } from '@/once-ui/components';
import { baseURL, home, person } from '@/app/resources';
import { Hero } from '@/app/components/Hero';
import { FeaturedProjects } from '@/app/components/FeaturedProjects';
import { FeaturedBlogPosts } from '@/app/components/FeaturedBlogPosts';
import { Mailchimp } from '@/app/components';

export function generateMetadata() {
	const title = home.title;
	const description = home.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}`,
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

export default function Home() {
	return (
		<Flex
			maxWidth="m" fillWidth
			direction="column" alignItems="center">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						name: home.title,
						description: home.description,
						url: `https://${baseURL}`,
						image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
						publisher: {
							'@type': 'Person',
							name: person.name,
							image: {
								'@type': 'ImageObject',
								url: `${baseURL}${person.avatar}`,
							},
						},
					}),
				}}
			/>
			<Hero title={home.headline} subtitle={home.subline} />
			<FeaturedProjects />
			<FeaturedBlogPosts />
			<Mailchimp />
		</Flex>
	);
}
