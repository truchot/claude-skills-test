# Project Lifecycle (7 Phases)

## Vue d'Ensemble

```
Discovery → Design → Setup → Development → Testing → Deployment → Maintenance
    ↑                                                                    │
    └────────────────────── Feedback Loop ───────────────────────────────┘
```

## Phase 1 : Discovery

### Livrables
- [ ] User stories priorisées (MoSCoW : Must/Should/Could/Won't)
- [ ] Scope MVP défini
- [ ] Contraintes identifiées (budget, délai, technique)

### Template User Story
```
En tant que [persona],
je veux [action],
afin de [bénéfice].

Critères d'acceptation :
- [ ] [Critère 1]
- [ ] [Critère 2]
```

### Priorisation MVP
| Feature | Business Value | Effort | Priorité |
|---------|---------------|--------|----------|
| | H/M/L | H/M/L | Must/Should/Could |

## Phase 2 : Design

### Architecture
- [ ] Schéma d'architecture (composants, flux, intégrations)
- [ ] Modèle de données (entités, relations, types)
- [ ] Design API (endpoints, méthodes, payloads)
- [ ] Stack technique validée

### UX/UI
- [ ] Wireframes des écrans principaux
- [ ] Design system / composants réutilisables
- [ ] Responsive breakpoints définis
- [ ] Accessibilité planifiée (WCAG 2.1 AA minimum)

### API Design (REST)
```
GET    /api/v1/resources          → Liste (paginée)
GET    /api/v1/resources/:id      → Détail
POST   /api/v1/resources          → Création
PUT    /api/v1/resources/:id      → Mise à jour complète
PATCH  /api/v1/resources/:id      → Mise à jour partielle
DELETE /api/v1/resources/:id      → Suppression
```

## Phase 3 : Setup

### Repository
- [ ] Git init, .gitignore, README
- [ ] Branch protection (main : PR + review + CI)
- [ ] PR template, commit conventions (Conventional Commits)

### Environnements
- [ ] .env.example avec toutes les variables
- [ ] Docker (dev, optionnel staging/prod)
- [ ] Secrets management (jamais en clair dans le repo)

### CI/CD
- [ ] Lint + format sur chaque PR
- [ ] Tests automatisés sur chaque PR
- [ ] Build vérifié sur chaque PR
- [ ] Deploy staging automatique, prod manuel/semi-auto

### Quality Tools
```bash
# Exemple setup minimal
npm install -D eslint prettier husky lint-staged
npx husky init
# pre-commit: lint-staged (lint + format)
# commit-msg: commitlint (conventional commits)
```

## Phase 4 : Development

### Workflow Git
```
main ← PR (squash) ← feature/TICKET-description
```
- Commits en français, format conventionnel
- PR < 400 lignes, description claire
- Review obligatoire avant merge

### Documentation
| Type | Quand | Où |
|------|-------|----|
| README | Setup projet | Racine |
| ADR | Décision technique | /docs/adr/ |
| Runbook | Procédure ops | /docs/runbooks/ |
| API docs | Endpoints | Swagger/OpenAPI |

## Phase 5 : Testing

### Pyramide de Tests
```
        /  E2E  \        → Parcours critiques (Playwright/Cypress)
       /Integration\     → API, composants + BDD (Vitest/Jest)
      /   Unitaires  \   → Logique métier, utils (Vitest/Jest)
```

### Checklist par Type
| Type | Couverture cible | Outils |
|------|-----------------|--------|
| Unitaires | > 80% logique métier | Vitest, Jest |
| Intégration | Endpoints critiques | Supertest, MSW |
| E2E | Parcours principaux | Playwright, Cypress |
| Performance | Core Web Vitals | Lighthouse |
| Accessibilité | WCAG 2.1 AA | axe-core, pa11y |
| Sécurité | OWASP Top 10 | npm audit, Snyk |

## Phase 6 : Deployment

### Pipeline Standard
```
Build → Tests → Staging (auto) → Smoke Tests → Prod (approval)
```

### Checklist Pré-Production
- [ ] Tests passent, build OK, coverage acceptable
- [ ] PRs reviewées, QA validé sur staging
- [ ] Migrations testées et réversibles
- [ ] Monitoring et alertes configurés
- [ ] Plan de rollback prêt

## Phase 7 : Maintenance

### Monitoring
| Quoi | Outil | Seuil alerte |
|------|-------|-------------|
| Uptime | UptimeRobot, Pingdom | < 99.9% |
| Erreurs | Sentry, Datadog | > 1% requêtes |
| Performance | Core Web Vitals | LCP > 2.5s |
| Sécurité | npm audit | CVE critique |

### Maintenance Régulière
- [ ] Mise à jour dépendances (mensuel)
- [ ] Audit sécurité (mensuel)
- [ ] Review performance (trimestriel)
- [ ] Nettoyage code mort (trimestriel)

## Adaptation selon Taille Projet

| Phase | Petit (< 2 sem) | Moyen (1-3 mois) | Grand (> 3 mois) |
|-------|-----------------|-------------------|-------------------|
| Discovery | 1/2 journée | 2-5 jours | 1-2 semaines |
| Design | 1 jour | 1 semaine | 2-4 semaines |
| Setup | 1/2 journée | 1-2 jours | 1 semaine |
| Testing | Unitaires + smoke | + intégration | + e2e + perf + a11y |
| Deployment | Simple (Vercel) | Staging + prod | Blue-green/canary |
| Maintenance | Alertes basiques | + dashboards | + runbooks + astreinte |
