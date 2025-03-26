import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import classNames from 'classnames';

import { Flex, Background } from '@/once-ui/components'
import { Footer, Header, RouteGuard } from "@/app/components";
import { baseURL, effects, home, person, style } from '@/app/resources'

import { Inter } from 'next/font/google'
import { Source_Code_Pro } from 'next/font/google';
import { Raleway } from 'next/font/google';
import { Sora } from 'next/font/google';

import { Metadata } from "next";
import ThemeProvider from '@/app/components/ThemeProvider';
import CustomCursor from '@/app/components/CustomCursor';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { PageTransition } from '@/app/components/PageTransition';

export const metadata: Metadata = {
	metadataBase: new URL(`https://${baseURL}`),
	title: {
		default: `${person.name} - ${person.role}`,
		template: `%s | ${person.name}`
	},
	description: person.bio,
	keywords: ['portfolio', 'developer', 'software engineer', ...person.skills],
	authors: [{ name: person.name }],
	creator: person.name,
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: `https://${baseURL}`,
		siteName: `${person.name}'s Portfolio`,
		images: [{
			url: `https://${baseURL}/og`,
			width: 1200,
			height: 630,
			alt: `${person.name}'s Portfolio`
		}]
	},
	twitter: {
		card: 'summary_large_image',
		creator: person.twitter
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
	},
}

const primary = Raleway({
	variable: '--font-primary',
	subsets: ['latin'],
	display: 'swap',
})

type FontConfig = {
    variable: string;
};

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary = Sora({
    variable: '--font-secondary',
    subsets: ['latin'],
    display: 'swap'
});

const tertiary: FontConfig | undefined = undefined;
/*
*/

const code = Source_Code_Pro({
	variable: '--font-code',
	subsets: ['latin'],
	display: 'swap',
});

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children } : RootLayoutProps) {
	return (
		<ThemeProvider>
			<Flex
				as="html" lang="en"
				background="page"
				data-neutral={style.neutral} data-brand={style.brand} data-accent={style.accent}
				data-solid={style.solid} data-solid-style={style.solidStyle}
				data-theme={style.theme}
				data-border={style.border}
				data-surface={style.surface}
				data-transition={style.transition}
				className={classNames(
					primary.variable,
					secondary ? secondary.variable : '',
					tertiary ? tertiary.variable : '',
					code.variable)}>
				<head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</head>
				<Flex style={{minHeight: '100vh'}}
					as="body"
					fillWidth margin="0" padding="0"
					direction="column">
					<Background
						gradient={effects.gradient}
						dots={effects.dots}
						lines={effects.lines}/>
					<Flex
						fillWidth
						minHeight="16">
					</Flex>
					<Header/>
					<Flex
						zIndex={0}
						fillWidth paddingY="l" paddingX="l"
						justifyContent="center" flex={1}>
						<Flex
							justifyContent="center"
							fillWidth minHeight="0">
							<RouteGuard>
								<PageTransition>
									{children}
								</PageTransition>
							</RouteGuard>
						</Flex>
					</Flex>
					<Footer/>
					<CustomCursor />
				</Flex>
				<Analytics />
				<SpeedInsights />
			</Flex>
		</ThemeProvider>
	);
}