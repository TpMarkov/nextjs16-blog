# SEO Configuration

This document explains the SEO enhancements implemented in the NextPro Blog application.

## Environment Variables

Add the following to your `.env.local` file:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important:** When deploying to production, update this to your actual domain:
```bash
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

This variable is used for:
- Canonical URLs
- Open Graph URLs
- Sitemap generation
- Structured data (JSON-LD)

## Files Modified/Created

### Modified Files
- `app/layout.tsx` - Enhanced root metadata with Open Graph and Twitter Cards
- `app/(shared-layout)/blog/page.tsx` - Added comprehensive metadata
- `app/(shared-layout)/blog/[postId]/page.tsx` - Dynamic metadata with structured data
- `app/(shared-layout)/layout.tsx` - Added metadata for create page
- `app/(auth)/layout.tsx` - Prevented indexing of auth pages

### New Files
- `app/sitemap.ts` - Dynamic sitemap generation
- `app/opengraph-image.tsx` - Open Graph image generator
- `lib/structured-data.ts` - JSON-LD utilities
- `public/robots.txt` - Crawler directives

## SEO Features Implemented

### 1. Comprehensive Metadata
- Title templates for consistent branding
- Optimized meta descriptions (155-160 characters)
- Keywords for better search targeting
- Author and publisher information

### 2. Open Graph Tags
- Rich social media previews
- Custom images for each page
- Article-specific tags for blog posts
- Proper URL and locale settings

### 3. Twitter Cards
- Summary large image cards
- Optimized for Twitter sharing
- Consistent with Open Graph data

### 4. Structured Data (JSON-LD)
- BlogPosting schema for articles
- BreadcrumbList for navigation
- WebSite schema with search action
- Organization schema for brand identity

### 5. Technical SEO
- Dynamic sitemap with all blog posts
- robots.txt for crawler guidance
- Canonical URLs
- Proper robots directives

## Testing Your SEO

### Local Testing
1. Run `npm run dev`
2. View page source to verify meta tags
3. Check `http://localhost:3000/sitemap.xml`
4. Check `http://localhost:3000/robots.txt`

### Production Testing
1. Deploy your application
2. Update `NEXT_PUBLIC_APP_URL` in production environment
3. Test with these tools:
   - [OpenGraph.xyz](https://www.opengraph.xyz/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Schema.org Validator](https://validator.schema.org/)

### Search Console Setup
1. Submit sitemap to Google Search Console
2. Submit sitemap to Bing Webmaster Tools
3. Monitor indexing status
4. Check for any crawl errors

## robots.txt Configuration

The `public/robots.txt` file allows all crawlers but excludes:
- `/api/` - API routes
- `/login` - Login page
- `/sign-up` - Sign-up page
- `/create` - Post creation page

You can modify this file to adjust crawler access.

## Sitemap

The dynamic sitemap (`app/sitemap.ts`) automatically includes:
- Home page (priority: 1.0, daily updates)
- Blog listing (priority: 0.9, daily updates)
- All blog posts (priority: 0.8, weekly updates)

Posts are automatically added when created in Convex.

## Open Graph Image

The `app/opengraph-image.tsx` generates a dynamic image for social sharing. You can customize:
- Colors and gradients
- Text content
- Layout and styling
- Dimensions (currently 1200x630px)

## Expected SEO Impact

| Metric | Improvement |
|--------|-------------|
| Social CTR | +20-40% |
| Search Rankings | Better content understanding |
| Rich Results | Enabled for articles |
| Indexing Speed | Faster with sitemap |
| Professional Appearance | Significantly improved |

## Maintenance

### Adding New Pages
When adding new pages, remember to:
1. Add metadata export
2. Include Open Graph tags
3. Add to sitemap if public
4. Update robots.txt if needed

### Updating Content
- Sitemap updates automatically
- Structured data updates with content
- No manual intervention needed

## Troubleshooting

### Meta tags not showing
- Check if `NEXT_PUBLIC_APP_URL` is set
- Verify build completed successfully
- Clear browser cache

### Sitemap not updating
- Ensure Convex queries are working
- Check build logs for errors
- Verify environment variables

### Social previews not working
- Test with validators first
- Check image URLs are accessible
- Verify Open Graph tags in source

## Additional Resources

- [Next.js Metadata Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
