# Deployment - Next.js Expert

## Vercel (recommande)
```bash
npm i -g vercel
vercel           # preview
vercel --prod    # production
```

### vercel.json
```json
{
  "framework": "nextjs",
  "regions": ["cdg1"],
  "headers": [
    { "source": "/(.*)", "headers": [{ "key": "X-Frame-Options", "value": "DENY" }] }
  ],
  "redirects": [
    { "source": "/old-page", "destination": "/new-page", "permanent": true }
  ]
}
```

## Docker (self-hosted)
```dockerfile
FROM node:20-alpine AS base
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

### next.config.js pour standalone
```js
module.exports = { output: 'standalone' };
```

## Variables d'environnement
- `.env.local` - secrets locaux (jamais commite)
- `.env.production` - valeurs prod non-sensibles
- `NEXT_PUBLIC_*` - expose cote client (jamais de secrets)
- Server-only: accessibles dans Server Components, Route Handlers, middleware

## CI/CD (GitHub Actions)
```yaml
name: Deploy
on: { push: { branches: [main] } }
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: --prod
```

## Optimisations production
- `next.config.js`: compress, images.domains, headers securite
- Analyseur bundle: `@next/bundle-analyzer`
- Output standalone pour Docker
- ISR pour pages semi-statiques
