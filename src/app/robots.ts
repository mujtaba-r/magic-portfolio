import { MetadataRoute } from 'next';
import { baseURL } from '@/app/resources';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/*', '/admin/*'],
        },
        sitemap: `https://${baseURL}/sitemap.xml`,
    };
}