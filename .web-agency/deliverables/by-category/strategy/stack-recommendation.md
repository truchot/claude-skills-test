---
id: stack-recommendation
name: Recommandation Stack Technique
version: 1.0.0
category: strategy
status: active
phase: "2-strategy"
order: 3
agents:
  - direction-technique/avant-projet/selection-stack
  - direction-technique/strategy/recommandations
consumes:
  - technical-audit
  - requirements-list
  - project-qualification
produces_for:
  - direction-technique/architecture/adr
  - direction-technique/architecture/architecture-applicative
  - direction-technique/estimation/estimation-macro
tags: [stack, technique, choix, architecture, technologie]
---

# Recommandation Stack Technique

## Description

Document argumenté recommandant les technologies à utiliser pour un projet, basé sur l'analyse des besoins, contraintes et contexte. Justifie chaque choix et anticipe les alternatives.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown |
| **Emplacement** | `projects/[client-slug]/02-strategy/stack-recommendation.md` |
| **Nommage** | `stack-recommendation.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Résumé** - Stack recommandée en un coup d'œil
- [ ] **Contexte** - Rappel des besoins et contraintes
- [ ] **Critères de sélection** - Grille d'évaluation utilisée
- [ ] **Analyse par couche** - Frontend, Backend, BDD, Infra
- [ ] **Stack recommandée** - Choix finaux justifiés
- [ ] **Alternatives considérées** - Options écartées et pourquoi
- [ ] **Risques et mitigations** - Points de vigilance

### Sections Optionnelles

- [ ] **Proof of Concept** - Résultats de tests
- [ ] **Comparatif détaillé** - Matrices de scoring
- [ ] **Roadmap technique** - Évolutions futures possibles
- [ ] **Compétences requises** - Profils nécessaires
- [ ] **Coûts** - Licences, hébergement, formation

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Justifié | Chaque choix a ≥2 arguments | Manuel | Oui |
| 2 | Alternatives | ≥2 alternatives par couche | Manuel | Oui |
| 3 | Aligné besoins | Répond aux requirements | Manuel | Oui |
| 4 | Réaliste | Compétences dispo ou formables | Manuel | Oui |
| 5 | Budgété | Coûts estimés | Manuel | Non |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `direction-technique/*` | `technical-audit` | État de l'existant |
| `client-intake/*` | `requirements-list` | Besoins fonctionnels/techniques |
| `client-intake/*` | `project-qualification` | Contraintes projet |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Définition critères | Direction technique | Ajuster grille |
| 2 | Évaluation | Lead Dev + Expert | Challenger les scores |
| 3 | Validation finale | Client (si impact budget) | Proposer alternatives |

## Exemple

### Exemple Minimal

```markdown
# Recommandation Stack - Projet E-commerce

## Résumé

| Couche | Technologie | Justification |
|--------|-------------|---------------|
| Frontend | Next.js 14 | SSR, performance, React |
| Backend | Node.js + Prisma | TypeScript fullstack |
| BDD | PostgreSQL | Relationnel, fiable |
| Infra | Vercel + Supabase | Managed, scalable |

## Stack Recommandée

### Frontend : Next.js 14

**Arguments :**
- SSR/SSG pour SEO e-commerce
- React ecosystem mature
- App Router moderne

**Alternatives écartées :**
- Nuxt.js : équipe plus expérimentée React
- Remix : écosystème moins mature

### Backend : Node.js + Prisma

**Arguments :**
- TypeScript end-to-end
- Prisma ORM type-safe
- Performance suffisante

**Alternatives écartées :**
- Laravel : changement de stack
- NestJS : overhead pour ce projet
```

### Exemple Complet

```markdown
---
projet: ecommerce-client-x
date: 2024-01-25
auteur: Thomas Bernard
version: 1.0
statut: validé
---

# Recommandation Stack Technique
## Projet E-commerce Client X

---

## 1. Résumé Exécutif

### Stack Recommandée

```
┌─────────────────────────────────────────────────────────┐
│                    ARCHITECTURE                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────┐     ┌─────────────┐     ┌───────────┐ │
│  │   Next.js   │────►│   Node.js   │────►│ PostgreSQL│ │
│  │     14      │     │   + tRPC    │     │    15     │ │
│  └─────────────┘     └─────────────┘     └───────────┘ │
│         │                   │                   │       │
│         ▼                   ▼                   ▼       │
│  ┌─────────────┐     ┌─────────────┐     ┌───────────┐ │
│  │   Vercel    │     │   Stripe    │     │  Supabase │ │
│  │  (hosting)  │     │ (payments)  │     │  (BaaS)   │ │
│  └─────────────┘     └─────────────┘     └───────────┘ │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

| Couche | Choix | Score | Confiance |
|--------|-------|-------|-----------|
| Frontend | Next.js 14 | 92/100 | 🟢 Haute |
| Backend | Node.js + tRPC | 88/100 | 🟢 Haute |
| Database | PostgreSQL (Supabase) | 95/100 | 🟢 Haute |
| Hosting | Vercel | 90/100 | 🟢 Haute |
| Payments | Stripe | 96/100 | 🟢 Haute |
| CMS | Payload CMS | 85/100 | 🟡 Moyenne |

---

## 2. Contexte du Projet

### Rappel des Besoins (Requirements)

| # | Besoin | Priorité | Impact Stack |
|---|--------|----------|--------------|
| R1 | Catalogue 500+ produits | Must | BDD performante |
| R2 | SEO performant | Must | SSR/SSG |
| R3 | Paiement CB | Must | API payments |
| R4 | Admin simple | Should | CMS headless |
| R5 | Multi-langue (FR/EN) | Should | i18n natif |
| R6 | Recherche avancée | Could | Search engine |

### Contraintes

| Contrainte | Impact |
|------------|--------|
| Budget limité (20k€) | Éviter licences coûteuses |
| Équipe 2 devs React | Favoriser écosystème JS/TS |
| Délai 4 mois | Stack productive, pas expérimentale |
| Maintenance interne | Stack mainstream, documentée |

### Existant (cf. Audit)

- Pas d'existant à migrer (nouveau projet)
- Client familier avec WordPress (admin)
- Hébergement actuel : OVH mutualisé

---

## 3. Critères de Sélection

### Grille d'Évaluation

| Critère | Poids | Description |
|---------|-------|-------------|
| **Performance** | 20% | Vitesse, scalabilité |
| **DX** | 20% | Productivité développeur |
| **Maintenabilité** | 20% | Long terme, communauté |
| **Coût** | 15% | TCO sur 3 ans |
| **Sécurité** | 15% | Vulnérabilités, mises à jour |
| **Fit projet** | 10% | Adéquation besoins spécifiques |

### Échelle de Scoring

- 🟢 90-100 : Excellent, choix évident
- 🟡 70-89 : Bon, quelques réserves
- 🟠 50-69 : Acceptable, compromis
- 🔴 0-49 : Insuffisant, à éviter

---

## 4. Analyse par Couche

### 4.1 Frontend Framework

#### Comparatif

| Critère (poids) | Next.js 14 | Nuxt 3 | Remix | Astro |
|-----------------|------------|--------|-------|-------|
| Performance (20%) | 18 | 17 | 19 | 20 |
| DX (20%) | 19 | 17 | 16 | 15 |
| Maintenabilité (20%) | 18 | 16 | 14 | 14 |
| Coût (15%) | 15 | 15 | 15 | 15 |
| Sécurité (15%) | 14 | 14 | 14 | 13 |
| Fit projet (10%) | 9 | 8 | 8 | 7 |
| **TOTAL** | **93** | **87** | **86** | **84** |

#### Recommandation : Next.js 14

**Arguments :**
1. **App Router** : Architecture moderne, Server Components
2. **Écosystème React** : Équipe déjà compétente
3. **Vercel** : Déploiement optimisé, preview branches
4. **SEO** : SSR/SSG natif, metadata API
5. **Communauté** : Largest React framework, support excellent

**Risques :**
- Vercel lock-in (mitigé : déployable ailleurs)
- App Router encore jeune (mitigé : stable depuis v14)

#### Alternatives Écartées

| Alternative | Raison d'exclusion |
|-------------|-------------------|
| **Nuxt 3** | Équipe non formée Vue, courbe apprentissage |
| **Remix** | Moins mature, écosystème plus petit |
| **Astro** | Moins adapté pour app dynamique e-commerce |
| **WordPress + WooCommerce** | Performance limitée, dette technique |

---

### 4.2 Backend / API

#### Comparatif

| Critère | Node + tRPC | Node + REST | Laravel | Django |
|---------|-------------|-------------|---------|--------|
| Performance | 17 | 16 | 15 | 16 |
| DX | 19 | 15 | 17 | 16 |
| Maintenabilité | 17 | 16 | 18 | 17 |
| Coût | 15 | 15 | 14 | 15 |
| Sécurité | 13 | 14 | 14 | 14 |
| Fit projet | 9 | 8 | 7 | 7 |
| **TOTAL** | **90** | **84** | **85** | **85** |

#### Recommandation : Node.js + tRPC

**Arguments :**
1. **Type-safety E2E** : TypeScript client ↔ serveur
2. **Fullstack JS** : Un seul langage, même équipe
3. **Performance** : Suffisant pour le volume prévu
4. **Intégration Next.js** : tRPC s'intègre nativement

**Risques :**
- tRPC moins connu (mitigé : documentation excellente)
- Pas de REST standard (mitigé : génération OpenAPI possible)

---

### 4.3 Base de Données

#### Comparatif

| Critère | PostgreSQL | MySQL | MongoDB | PlanetScale |
|---------|------------|-------|---------|-------------|
| Performance | 18 | 17 | 16 | 18 |
| DX | 17 | 16 | 18 | 17 |
| Maintenabilité | 19 | 18 | 15 | 17 |
| Coût | 15 | 15 | 13 | 12 |
| Sécurité | 15 | 14 | 13 | 14 |
| Fit projet | 9 | 8 | 7 | 8 |
| **TOTAL** | **93** | **88** | **82** | **86** |

#### Recommandation : PostgreSQL (via Supabase)

**Arguments :**
1. **Relationnel** : Parfait pour e-commerce (produits, commandes, users)
2. **Supabase** : PostgreSQL managé, Auth inclus, API auto
3. **Prisma** : ORM type-safe, migrations automatiques
4. **Coût** : Free tier généreux, scaling prévisible

---

### 4.4 Infrastructure / Hosting

#### Recommandation : Vercel + Supabase

| Service | Usage | Coût estimé/mois |
|---------|-------|------------------|
| Vercel Pro | Frontend hosting | 20€ |
| Supabase Pro | BDD + Auth + Storage | 25€ |
| Stripe | Payments | ~1.4% + 0.25€/tx |
| Resend | Emails transactionnels | 0€ (free tier) |
| **TOTAL** | | **~50€/mois** + Stripe |

---

## 5. Stack Finale Recommandée

### Vue d'Ensemble

```yaml
Frontend:
  Framework: Next.js 14 (App Router)
  Styling: Tailwind CSS + shadcn/ui
  State: Zustand (si nécessaire)
  Forms: React Hook Form + Zod

Backend:
  Runtime: Node.js 20 LTS
  API: tRPC v11
  ORM: Prisma 5
  Auth: Supabase Auth (ou NextAuth)

Database:
  Primary: PostgreSQL 15 (Supabase)
  Cache: Vercel KV (si nécessaire)
  Search: PostgreSQL Full-Text (V1), Algolia (V2)

Infrastructure:
  Hosting: Vercel
  Database: Supabase
  CDN: Vercel Edge Network
  Storage: Supabase Storage

Services:
  Payments: Stripe
  Emails: Resend
  Analytics: Vercel Analytics + Plausible
  Monitoring: Vercel + Sentry

DevOps:
  CI/CD: GitHub Actions + Vercel
  Preview: Vercel Preview Deployments
  Monitoring: Sentry
```

### Dépendances Clés

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "@trpc/server": "^11.0.0",
    "@trpc/client": "^11.0.0",
    "@prisma/client": "^5.0.0",
    "@supabase/supabase-js": "^2.0.0",
    "stripe": "^14.0.0",
    "tailwindcss": "^3.4.0",
    "zod": "^3.22.0"
  }
}
```

---

## 6. Risques et Mitigations

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Vercel pricing scaling | Moyenne | Moyen | Monitoring coûts, migration possible |
| tRPC learning curve | Faible | Faible | Documentation, 1 jour formation |
| Supabase downtime | Faible | Haut | Backup auto, plan incident |
| Next.js breaking changes | Faible | Moyen | Pin versions, changelog watch |

---

## 7. Plan de Formation

| Technologie | Équipe | Durée | Format |
|-------------|--------|-------|--------|
| Next.js 14 App Router | Tous | 2j | Workshop |
| tRPC | Backend dev | 1j | Self-learning |
| Prisma | Backend dev | 0.5j | Documentation |
| Stripe | Lead dev | 0.5j | Documentation |

---

## 8. Coûts Estimés (TCO 1 an)

| Poste | Coût |
|-------|------|
| Vercel Pro | 240€ |
| Supabase Pro | 300€ |
| Domaine | 15€ |
| Sentry | 0€ (free tier) |
| **TOTAL Infra** | **~555€/an** |

| Poste | Coût |
|-------|------|
| Stripe (sur 50k€ CA) | ~750€ |
| **TOTAL Services** | **~750€/an** |

**TCO Total : ~1 300€/an** (hors développement)

---

## 9. Validation

| Validateur | Date | Statut |
|------------|------|--------|
| Direction Technique | 25/01/2024 | ✅ Validé |
| Lead Dev | 25/01/2024 | ✅ Validé |
| Client | 28/01/2024 | ✅ Validé |

---

## Annexes

- [ADR-001 : Choix Next.js](../adr/0001-choix-nextjs.md)
- [POC tRPC](./poc-trpc-results.md)
- [Benchmark Performance](./benchmark-results.md)
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Choix sans justification | Non défendable, arbitraire | Toujours ≥2 arguments par choix |
| Une seule option | Pas de réflexion, bias | Toujours comparer ≥2 alternatives |
| Hype-driven | Risque de dette | Privilégier stable et éprouvé |
| Ignorer l'équipe | Stack non maîtrisée | Considérer compétences existantes |
| Ignorer le budget | Dépassement | Inclure TCO |

## Références

- [ThoughtWorks Tech Radar](https://www.thoughtworks.com/radar)
- [State of JS](https://stateofjs.com/)
- Livrables liés : `technical-audit`, `adr`, `architecture-diagram`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | direction-technique | Création initiale |
