/**
 * Utility functions for generating JSON-LD structured data for SEO
 */

interface BlogPost {
    title: string
    body: string
    imageUrl?: string | null
    _creationTime: number
    _id: string
}

/**
 * Generate Article structured data for blog posts
 * This helps search engines understand the content and can enable rich results
 */
export function generateArticleStructuredData(post: BlogPost, baseUrl: string = '') {
    const truncatedDescription = post.body.length > 160
        ? post.body.slice(0, 157) + '...'
        : post.body;

    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: truncatedDescription,
        image: post.imageUrl || `${baseUrl}/og-image.png`,
        datePublished: new Date(post._creationTime).toISOString(),
        dateModified: new Date(post._creationTime).toISOString(),
        author: {
            '@type': 'Person',
            name: 'Tsvetan Markov',
        },
        publisher: {
            '@type': 'Organization',
            name: 'NextPro Blog',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/blog/${post._id}`,
        },
    }
}

/**
 * Generate BreadcrumbList structured data for navigation
 * Helps search engines understand site structure
 */
export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }
}

/**
 * Generate WebSite structured data for the home page
 * Enables sitelinks search box in Google
 */
export function generateWebsiteStructuredData(baseUrl: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'NextPro Blog',
        description: 'A modern blogging platform with real-time collaboration, rich commenting, and beautiful content creation tools.',
        url: baseUrl,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    }
}

/**
 * Generate Organization structured data
 * Helps establish brand identity in search results
 */
export function generateOrganizationStructuredData(baseUrl: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'NextPro Blog',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: 'A modern blogging platform with real-time collaboration and beautiful content creation tools.',
        founder: {
            '@type': 'Person',
            name: 'Tsvetan Markov',
        },
    }
}
