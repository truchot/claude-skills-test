# Technical SEO Reference

## Core Web Vitals Thresholds

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP (Largest Contentful Paint) | <= 2.5s | 2.5-4s | > 4s |
| INP (Interaction to Next Paint) | <= 200ms | 200-500ms | > 500ms |
| CLS (Cumulative Layout Shift) | <= 0.1 | 0.1-0.25 | > 0.25 |

### LCP Optimization
- Preload hero image: `<link rel="preload" as="image" href="hero.webp">`
- Use `fetchpriority="high"` on LCP element
- Optimize server response time (TTFB < 800ms)
- Use CDN for static assets
- Inline critical CSS, defer non-critical

### INP Optimization
- Break long tasks (> 50ms) with `requestIdleCallback`
- Use `content-visibility: auto` for off-screen content
- Minimize main thread work
- Use web workers for heavy computation

### CLS Optimization
- Always set `width`/`height` or `aspect-ratio` on images/video
- Reserve space for ads and embeds
- Use `font-display: swap` with preloaded fonts
- Avoid inserting content above visible area

## Crawl & Indexation

### robots.txt
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /search?
Disallow: /*?utm_

Sitemap: https://example.com/sitemap.xml
```

### Sitemap XML
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/page</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### Meta Robots
```html
<!-- Index and follow (default) -->
<meta name="robots" content="index, follow">
<!-- No index (duplicate, thin, staging) -->
<meta name="robots" content="noindex, nofollow">
<!-- Canonical for duplicate pages -->
<link rel="canonical" href="https://example.com/original-page">
```

## JavaScript SEO

| Challenge | Solution |
|-----------|----------|
| Client-side rendering | SSR or SSG (Next.js, Nuxt) |
| Dynamic content | Pre-rendering, `<noscript>` fallback |
| Lazy-loaded content | Intersection Observer with SSR |
| SPA routing | History API, proper `<link rel="canonical">` |
| Infinite scroll | Provide paginated archive pages |

## Site Architecture

```
Homepage (DA strongest)
|
+-- Category 1 (pillar page)
|   +-- Article 1.1 (cluster page)
|   +-- Article 1.2 (cluster page)
|   +-- Article 1.3 (cluster page)
|
+-- Category 2 (pillar page)
|   +-- Article 2.1
|   +-- Article 2.2
```

- Max 3 clicks from homepage to any page
- Internal links with descriptive anchor text
- Breadcrumbs on all pages
- HTML sitemap for deep pages

## Migration SEO Checklist

- [ ] Map all old URLs to new URLs
- [ ] Implement 301 redirects for every changed URL
- [ ] Update internal links
- [ ] Submit new sitemap to GSC
- [ ] Monitor 404 errors post-migration
- [ ] Track organic traffic for 3 months
- [ ] Keep old redirects for minimum 1 year
- [ ] Update canonical tags
- [ ] Update hreflang tags
- [ ] Verify structured data on new pages
