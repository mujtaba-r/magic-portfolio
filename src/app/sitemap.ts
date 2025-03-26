import { getPosts } from '@/app/lib/server'
import { baseURL } from '@/app/resources'

export default async function sitemap() {
    const blogPosts = await getPosts(['src', 'app', 'blog', 'posts'])
    const workPosts = await getPosts(['src', 'app', 'work', 'projects'])

    const blogUrls = blogPosts.map((post) => ({
        url: `https://${baseURL}/blog/${post.slug}`,
        lastModified: new Date(post.metadata.publishedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
    }))

    const workUrls = workPosts.map((post) => ({
        url: `https://${baseURL}/work/${post.slug}`,
        lastModified: new Date(post.metadata.publishedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
    }))

    return [
        {
            url: `https://${baseURL}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `https://${baseURL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `https://${baseURL}/work`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        ...blogUrls,
        ...workUrls,
    ]
}