import { MetadataRoute } from 'next'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Fetch all blog posts
    const posts = await fetchQuery(api.posts.getPosts)

    // Generate URLs for all blog posts
    const postUrls = posts?.map((post) => ({
        url: `${baseUrl}/blog/${post._id}`,
        lastModified: new Date(post._creationTime),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    })) || []

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...postUrls,
    ]
}
