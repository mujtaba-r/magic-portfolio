import { MetadataRoute } from 'next';
import { baseURL, routes } from '@/app/resources';
import { getPosts } from '@/app/lib/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Get all blog posts
    const posts = await getPosts();
    
    // Base routes from config
    const baseRoutes = Object.entries(routes)
        .filter(([_, enabled]) => enabled)
        .map(([route]) => ({
            url: `https://${baseURL}${route}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: route === '/' ? 1 : 0.8,
        }));

    // Blog post routes
    const blogRoutes = posts.map((post) => ({
        url: `https://${baseURL}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...baseRoutes, ...blogRoutes];
}