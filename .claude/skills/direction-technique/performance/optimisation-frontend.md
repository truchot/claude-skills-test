---
name: optimisation-frontend
description: Optimisation des performances frontend
---

# Optimisation Frontend

Tu guides l'**optimisation des performances frontend** pour améliorer l'expérience utilisateur.

## Core Web Vitals

### LCP (Largest Contentful Paint)

**Cible** : < 2.5s

```typescript
// Précharger les ressources critiques
<link rel="preload" href="/hero.webp" as="image" />
<link rel="preload" href="/font.woff2" as="font" crossorigin />

// Prioriser le LCP element
<img
  src="/hero.webp"
  fetchpriority="high"
  loading="eager"
  alt="Hero"
/>

// Éviter lazy-load sur LCP
// ❌ <img loading="lazy" ... /> pour l'image principale
```

### FID / INP (Interactivity)

**Cible** : < 100ms

```typescript
// Différer les scripts non critiques
<script src="/analytics.js" defer></script>

// Code splitting
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Éviter les long tasks
// ❌ Boucle synchrone de 100ms+
// ✅ Utiliser requestIdleCallback ou Web Workers
requestIdleCallback(() => {
  // Travail non urgent
});
```

### CLS (Cumulative Layout Shift)

**Cible** : < 0.1

```css
/* Toujours définir les dimensions */
img, video, iframe {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
}

/* Réserver l'espace pour le contenu dynamique */
.ad-container {
  min-height: 250px;
}

/* Éviter les insertions au-dessus du contenu */
.notification {
  position: fixed;
  bottom: 0; /* Pas en haut */
}
```

## Optimisation des Images

### Formats Modernes

```html
<!-- Picture avec fallback -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

### Responsive Images

```html
<img
  srcset="
    image-320.webp 320w,
    image-640.webp 640w,
    image-1280.webp 1280w
  "
  sizes="(max-width: 640px) 100vw, 50vw"
  src="image-640.webp"
  alt="Description"
/>
```

### Lazy Loading

```html
<!-- Native lazy loading -->
<img src="image.jpg" loading="lazy" alt="...">

<!-- Intersection Observer pour plus de contrôle -->
<script>
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});
</script>
```

## Optimisation JavaScript

### Code Splitting

```typescript
// React
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

// Routes-based splitting
<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
</Suspense>
```

### Tree Shaking

```typescript
// ❌ Import everything
import _ from 'lodash';
_.debounce(fn, 300);

// ✅ Import specific
import debounce from 'lodash/debounce';
debounce(fn, 300);

// ✅ Ou avec ES modules
import { debounce } from 'lodash-es';
```

### Bundle Analysis

```bash
# Next.js
npm run build
npx @next/bundle-analyzer

# Webpack
npm install webpack-bundle-analyzer
# Dans webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
plugins: [new BundleAnalyzerPlugin()]
```

## Optimisation CSS

### CSS Critique

```html
<!-- Inline critical CSS -->
<style>
  /* CSS critique pour le rendu initial */
  header { ... }
  .hero { ... }
</style>

<!-- Charger le reste en async -->
<link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/styles.css"></noscript>
```

### Purge CSS

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  // PurgeCSS automatique en production
};

// PostCSS manual
// postcss.config.js
const purgecss = require('@fullhuman/postcss-purgecss');
module.exports = {
  plugins: [
    purgecss({
      content: ['./src/**/*.html', './src/**/*.js'],
    }),
  ],
};
```

## Optimisation des Fonts

```html
<!-- Preload fonts critiques -->
<link
  rel="preload"
  href="/fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>

<style>
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap; /* Évite FOIT */
  font-weight: 400;
}

/* Subset pour les caractères utilisés */
/* unicode-range: U+0000-00FF; */
</style>
```

## Caching Stratégies

### HTTP Headers

```nginx
# nginx.conf
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.html$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

### Service Worker

```javascript
// sw.js
const CACHE_NAME = 'v1';
const STATIC_ASSETS = [
  '/',
  '/styles.css',
  '/app.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

## Checklist Optimisation

### Critique

- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Bundle JS < 200KB gzippé

### Important

- [ ] Images en WebP/AVIF
- [ ] Lazy loading images
- [ ] Code splitting par route
- [ ] CSS critique inline
- [ ] Fonts avec display: swap

### Nice to Have

- [ ] Service Worker
- [ ] Prefetch des pages probables
- [ ] Image placeholders (blur-up)

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| LCP > 4s | Audit complet + priorisation |
| Bundle > 500KB | Refactoring code splitting |
| CLS > 0.25 | Review layout stability |
