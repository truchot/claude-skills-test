# Content SEO Reference

## Keyword Research Process

```
1. Seed keywords (brainstorm)
   |
2. Expand with tools (GSC, Ahrefs, SEMrush)
   |
3. Classify by intent
   |
4. Group into clusters
   |
5. Map to pages (1 cluster = 1 page)
```

## Search Intent Classification

| Intent | Examples | Content Type |
|--------|----------|--------------|
| Informational | "how to", "what is", "guide" | Blog posts, guides, tutorials |
| Transactional | "buy", "price", "best" | Product pages, comparisons |
| Navigational | "brand + product" | Landing pages |
| Commercial | "review", "vs", "alternative" | Comparison pages, reviews |

## On-Page Optimization Checklist

### Title Tag
- Primary keyword at the beginning
- Max 60 characters (or 580px)
- Unique per page
- Include brand at end: "Keyword | Brand"
- Include CTA word if transactional (Buy, Compare, Get)

### Meta Description
- Include primary keyword naturally
- Max 155 characters
- Unique per page
- Include CTA (Call-to-action)
- Match search intent

### Headings Structure
```
H1: Primary keyword (1 per page)
  H2: Secondary keyword / subtopic
    H3: Supporting detail
    H3: Supporting detail
  H2: Related subtopic
    H3: FAQ question
    H3: FAQ question
```

### Content Body
- Primary keyword in first 100 words
- Use semantic variations (LSI keywords)
- Internal links: 5-10 per 1000 words
- External links: 2-3 to authoritative sources
- Short paragraphs (2-3 sentences)
- Lists and tables for scannability

### Images
- Descriptive alt text with keyword
- Compressed (WebP/AVIF format)
- Lazy loading (`loading="lazy"`)
- Descriptive file names (`keyword-description.webp`)
- Width/height attributes (CLS prevention)

## Schema.org Markup by Content Type

| Content Type | Schema Type | Key Properties |
|--------------|-------------|----------------|
| Article | Article | headline, author, datePublished |
| Product | Product | name, price, availability, review |
| FAQ | FAQPage | mainEntity, Question, Answer |
| How-to | HowTo | step, tool, supply |
| Recipe | Recipe | ingredients, instructions, time |
| Event | Event | startDate, location, performer |
| Local Business | LocalBusiness | address, phone, openingHours |
| Breadcrumb | BreadcrumbList | itemListElement, position |

## Content Brief Template

```markdown
## Brief: [Target Keyword]

**Search Volume**: [X/month]
**Difficulty**: [1-100]
**Intent**: [Informational/Transactional]
**Target URL**: [/path]

### Competitors Analysis
| URL | Word Count | Backlinks | Score |
|-----|-----------|-----------|-------|

### Outline
- H1: [Title with primary keyword]
- H2: [Section 1]
  - H3: [Sub-section]
- H2: [Section 2]
- H2: FAQ

### Keywords to Include
- Primary: [keyword] (density ~1%)
- Secondary: [list]
- LSI: [semantic variations]

### Requirements
- Word count: [X-Y words]
- Images: [X minimum]
- Internal links: [targets]
- Schema: [type]
```

## E-E-A-T Signals

| Signal | Implementation |
|--------|----------------|
| Experience | First-hand examples, original data |
| Expertise | Author bio, credentials, topical authority |
| Authoritativeness | Backlinks, citations, brand mentions |
| Trustworthiness | HTTPS, clear policies, reviews, contact info |
