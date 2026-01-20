---
id: technical-specification
name: Spécification Technique
version: 1.0.0
category: specification
status: active
phase: "3-conception"
order: 2
agents:
  - direction-technique/specification/specification-technique
  - direction-technique/specification/cadrage-technique
consumes:
  - project-brief
  - requirements-list
  - stack-recommendation
  - architecture-diagram
produces_for:
  - direction-technique/specification/modelisation-donnees
  - direction-technique/specification/specification-api
  - backend-developer/*/all
  - frontend-developer/*/all
tags: [specification, technique, architecture, development, specs]
---

# Spécification Technique

## Description

Document décrivant en détail l'architecture technique, les choix d'implémentation et les contraintes techniques du projet. Sert de référence pour l'équipe de développement et guide toutes les décisions techniques.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown |
| **Emplacement** | `projects/[client-slug]/03-conception/technical-specification.md` |
| **Nommage** | `technical-specification.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Vue d'ensemble** - Résumé du système à construire
- [ ] **Architecture** - Diagrammes et description des composants
- [ ] **Stack technique** - Technologies choisies avec justifications
- [ ] **Modèle de données** - Entités principales (référence vers data-model)
- [ ] **APIs** - Endpoints et intégrations (référence vers api-specification)
- [ ] **Sécurité** - Authentification, autorisations, protection des données
- [ ] **Performance** - Objectifs et contraintes
- [ ] **Environnements** - Dev, staging, production

### Sections Optionnelles

- [ ] **Intégrations tierces** - APIs externes, services
- [ ] **Migration** - Plan de migration si existant
- [ ] **Scalabilité** - Stratégie de montée en charge
- [ ] **Monitoring** - Métriques et alertes
- [ ] **Glossaire** - Termes techniques

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Architecture documentée | Diagramme C4 niveau 2 minimum | Manuel | Oui |
| 2 | Stack justifiée | Chaque choix a une raison | Manuel | Oui |
| 3 | Sécurité définie | Auth + RGPD couverts | Manuel | Oui |
| 4 | Performance | Objectifs chiffrés (LCP, TTFB) | Manuel | Oui |
| 5 | Environnements | Au moins dev + prod définis | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `project-management/*` | `project-brief` | Contexte et objectifs |
| `client-intake/*` | `requirements-list` | Exigences fonctionnelles |
| `direction-technique/*` | `stack-recommendation` | Choix technologiques |
| `direction-technique/*` | `adr` | Décisions d'architecture |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Draft | Lead Dev | Itérer |
| 2 | Review | Direction technique | Challenger choix |
| 3 | Validation | Équipe dev | Clarifier points obscurs |

## Exemple

### Exemple Complet

```markdown
---
projet: ecommerce-dupont
version: 1.0
date: 2024-02-01
auteur: Thomas Bernard
statut: validé
---

# Spécification Technique
## Site E-commerce Dupont SARL

---

## 1. Vue d'Ensemble

### 1.1 Objectif

Développer un site e-commerce permettant la vente en ligne des produits artisanaux Dupont avec :
- Catalogue de ~50 produits
- Panier et tunnel d'achat
- Paiement sécurisé CB
- Back-office de gestion

### 1.2 Contraintes

| Contrainte | Description |
|------------|-------------|
| Budget | 18 000 € → Stack économique |
| Délai | 6 mois → MVP first |
| Compétences client | Faibles → Back-office simple |
| SEO | Important → SSR/SSG privilégié |

### 1.3 Périmètre Technique

**In Scope :**
- Frontend responsive
- API backend
- Base de données
- Paiement Stripe
- Hébergement cloud

**Out of Scope :**
- App mobile native
- ERP/CRM intégration
- Multi-langue

---

## 2. Architecture

### 2.1 Vue Globale (C4 - Contexte)

```
┌─────────────────────────────────────────────────────────────┐
│                      UTILISATEURS                            │
├─────────────────────────────────────────────────────────────┤
│  👤 Client Final        👤 Admin Dupont        👤 Dev       │
│  (Achat produits)       (Gestion boutique)     (Maintenance)│
└──────────┬─────────────────────┬─────────────────┬──────────┘
           │                     │                 │
           ▼                     ▼                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    SYSTÈME E-COMMERCE                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Frontend   │  │   Backend   │  │  Database   │         │
│  │  (Next.js)  │◄─┤   (API)     │◄─┤ (PostgreSQL)│         │
│  └─────────────┘  └──────┬──────┘  └─────────────┘         │
└──────────────────────────┼──────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    ┌───────────┐   ┌───────────┐   ┌───────────┐
    │  Stripe   │   │ Cloudinary│   │  Resend   │
    │ (Paiement)│   │  (Images) │   │  (Emails) │
    └───────────┘   └───────────┘   └───────────┘
```

### 2.2 Architecture Applicative (C4 - Container)

```
┌─────────────────────────────────────────────────────────────┐
│                         VERCEL                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    NEXT.JS APP                        │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │   │
│  │  │   Pages    │  │    API     │  │   Admin    │     │   │
│  │  │  (SSG/ISR) │  │  Routes    │  │  Dashboard │     │   │
│  │  └────────────┘  └────────────┘  └────────────┘     │   │
│  │         │              │               │             │   │
│  │         └──────────────┼───────────────┘             │   │
│  │                        │                             │   │
│  │                  ┌─────┴─────┐                       │   │
│  │                  │  Prisma   │                       │   │
│  │                  │   ORM     │                       │   │
│  │                  └─────┬─────┘                       │   │
│  └────────────────────────┼─────────────────────────────┘   │
│                           │                                  │
└───────────────────────────┼──────────────────────────────────┘
                            │
                            ▼
              ┌─────────────────────────┐
              │    SUPABASE / NEON      │
              │      PostgreSQL         │
              └─────────────────────────┘
```

### 2.3 Composants Principaux

| Composant | Technologie | Responsabilité |
|-----------|-------------|----------------|
| Frontend | Next.js 14 (App Router) | UI, SSG, SSR |
| API | Next.js API Routes | Logique métier |
| ORM | Prisma | Accès données |
| Database | PostgreSQL (Supabase) | Persistance |
| Auth | NextAuth.js | Authentification |
| Paiement | Stripe | Transactions |
| Images | Cloudinary | Optimisation médias |
| Emails | Resend | Transactionnels |

---

## 3. Stack Technique

### 3.1 Frontend

| Technologie | Version | Justification |
|-------------|---------|---------------|
| Next.js | 14.x | SSG/ISR pour SEO, App Router |
| React | 18.x | Composants, écosystème |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Rapidité, DX |
| Shadcn/ui | latest | Composants accessibles |

### 3.2 Backend

| Technologie | Version | Justification |
|-------------|---------|---------------|
| Next.js API Routes | 14.x | Simplicité, même stack |
| Prisma | 5.x | Type-safe, migrations |
| Zod | 3.x | Validation |

### 3.3 Base de Données

| Technologie | Version | Justification |
|-------------|---------|---------------|
| PostgreSQL | 15.x | Robuste, JSON support |
| Supabase | - | Managed, gratuit pour MVP |

### 3.4 Services Tiers

| Service | Usage | Coût estimé |
|---------|-------|-------------|
| Vercel | Hosting | Gratuit (Hobby) → Pro si besoin |
| Supabase | BDD | Gratuit (500MB) |
| Stripe | Paiement | 1.4% + 0.25€ / transaction |
| Cloudinary | Images | Gratuit (25GB) |
| Resend | Emails | Gratuit (3000/mois) |

**Coût mensuel estimé :** 0-50€ selon trafic

---

## 4. Modèle de Données

> Détail complet : voir [data-model.md](./data-model.md)

### 4.1 Entités Principales

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Product   │     │    Order    │     │    User     │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id          │     │ id          │     │ id          │
│ name        │     │ userId      │────►│ email       │
│ slug        │     │ status      │     │ name        │
│ price       │◄────│ total       │     │ role        │
│ stock       │     │ items[]     │     │ addresses[] │
│ categoryId  │     │ createdAt   │     └─────────────┘
└──────┬──────┘     └─────────────┘
       │
       ▼
┌─────────────┐
│  Category   │
├─────────────┤
│ id          │
│ name        │
│ slug        │
└─────────────┘
```

### 4.2 Relations

| Relation | Type | Description |
|----------|------|-------------|
| Product → Category | N:1 | Un produit appartient à une catégorie |
| Order → User | N:1 | Une commande appartient à un utilisateur |
| Order → OrderItem | 1:N | Une commande contient plusieurs items |
| OrderItem → Product | N:1 | Un item référence un produit |

---

## 5. APIs

> Détail complet : voir [api-specification.md](./api-specification.md)

### 5.1 Endpoints Publics

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/products` | Liste des produits |
| GET | `/api/products/[slug]` | Détail produit |
| GET | `/api/categories` | Liste des catégories |
| POST | `/api/cart` | Ajouter au panier |
| POST | `/api/checkout` | Créer commande |
| POST | `/api/webhook/stripe` | Webhook paiement |

### 5.2 Endpoints Admin (Auth required)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/admin/orders` | Liste commandes |
| PATCH | `/api/admin/orders/[id]` | Màj statut |
| CRUD | `/api/admin/products/*` | Gestion produits |

### 5.3 Authentification

- **Méthode** : NextAuth.js avec Credentials provider
- **Session** : JWT (stateless)
- **Rôles** : `user`, `admin`

---

## 6. Sécurité

### 6.1 Authentification & Autorisation

| Aspect | Solution |
|--------|----------|
| Auth utilisateur | Email/password + JWT |
| Auth admin | Même système, rôle `admin` |
| Middleware | Protection routes `/admin/*` |
| CSRF | Token NextAuth intégré |

### 6.2 Protection des Données

| Donnée | Protection |
|--------|------------|
| Mots de passe | bcrypt (salt 12) |
| Données personnelles | Chiffrement at-rest (Supabase) |
| Paiement | Stripe (PCI DSS) - pas de CB stockée |

### 6.3 RGPD

| Obligation | Implémentation |
|------------|----------------|
| Consentement cookies | Banner + stockage préférences |
| Droit d'accès | Export données compte |
| Droit à l'oubli | Suppression compte |
| Mentions légales | Pages statiques |

### 6.4 Headers de Sécurité

```javascript
// next.config.js
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=()' },
]
```

---

## 7. Performance

### 7.1 Objectifs

| Métrique | Cible | Mesure |
|----------|-------|--------|
| LCP | < 2.5s | Lighthouse |
| FID | < 100ms | Lighthouse |
| CLS | < 0.1 | Lighthouse |
| TTFB | < 600ms | WebPageTest |
| Score Lighthouse | > 90 | Lighthouse |

### 7.2 Stratégies

| Stratégie | Implémentation |
|-----------|----------------|
| SSG | Pages produits pré-générées |
| ISR | Revalidation toutes les heures |
| Image optimization | next/image + Cloudinary |
| Code splitting | Dynamic imports |
| Caching | Vercel Edge Cache |

### 7.3 Monitoring

- **Vercel Analytics** : Web Vitals
- **Sentry** : Erreurs JS
- **Supabase Dashboard** : Perfs BDD

---

## 8. Environnements

### 8.1 Configuration

| Environnement | URL | Database | Stripe |
|---------------|-----|----------|--------|
| Local | localhost:3000 | Supabase (branch) | Test keys |
| Preview | *.vercel.app | Supabase (branch) | Test keys |
| Production | dupont.fr | Supabase (main) | Live keys |

### 8.2 Variables d'Environnement

```env
# Database
DATABASE_URL=postgresql://...

# Auth
NEXTAUTH_SECRET=...
NEXTAUTH_URL=...

# Stripe
STRIPE_PUBLIC_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Services
CLOUDINARY_URL=cloudinary://...
RESEND_API_KEY=re_...
```

### 8.3 CI/CD

```yaml
# .github/workflows/ci.yml
- Push → Lint + Type check + Tests
- PR → Preview deployment (Vercel)
- Merge main → Production deployment
```

---

## 9. Annexes

### 9.1 ADRs Liés

- [ADR-001: Next.js vs Remix](../02-strategy/adr/001-nextjs.md)
- [ADR-002: Supabase vs PlanetScale](../02-strategy/adr/002-database.md)

### 9.2 Références

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Stripe Integration Guide](https://stripe.com/docs)
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Specs trop vagues | Interprétations différentes | Être précis, donner des exemples |
| Pas de diagrammes | Difficile à comprendre | Toujours inclure des schémas |
| Stack non justifiée | Contestable | Argumenter chaque choix |
| Ignorer la sécurité | Failles potentielles | Section sécurité obligatoire |
| Specs figées | Obsolescence | Versionner, mettre à jour |

## Références

- [C4 Model](https://c4model.com/)
- [Arc42 Template](https://arc42.org/)
- Livrables liés : `stack-recommendation`, `adr`, `data-model`, `api-specification`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | direction-technique | Création initiale |
