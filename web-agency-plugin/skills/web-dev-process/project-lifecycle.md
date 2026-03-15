# Project Lifecycle (7 Phases)

```
Discovery → Design → Setup → Development → Testing → Deployment → Maintenance
```

## 1. Discovery
- [ ] User stories priorisées (MoSCoW : Must/Should/Could/Won't)
- [ ] Scope MVP défini, contraintes identifiées
- Template : `En tant que [persona], je veux [action], afin de [bénéfice].`

## 2. Design
- [ ] Architecture (composants, flux, intégrations)
- [ ] Modèle de données, API design (REST/GraphQL)
- [ ] UX : wireframes, design system, responsive, accessibilité WCAG 2.1 AA

API REST : `GET /api/v1/resources` | `POST` | `PUT/:id` | `PATCH/:id` | `DELETE/:id`

## 3. Setup
- [ ] Git : .gitignore, branch protection main (PR + review + CI)
- [ ] Env : .env.example, Docker, secrets management
- [ ] CI/CD : lint + tests + build sur PR, deploy staging auto
- [ ] Quality : ESLint, Prettier, Husky, commitlint

## 4. Development
- [ ] Workflow : `main ← PR (squash) ← feature/TICKET-desc`
- [ ] Commits conventionnels en français
- [ ] PR < 400 lignes, review obligatoire

| Doc | Quand | Où |
|-----|-------|----|
| README | Setup | Racine |
| ADR | Décision technique | /docs/adr/ |
| Runbook | Procédure ops | /docs/runbooks/ |

## 5. Testing

### Pyramide
```
      /  E2E  \       Playwright/Cypress (parcours critiques)
     /Intégration\    Supertest/MSW (API, composants)
    / Unitaires    \  Vitest/Jest (logique métier, > 80%)
```

Ajouter : performance (Lighthouse), accessibilité (axe-core), sécurité (npm audit).

## 6. Deployment
Pipeline : `Build → Tests → Staging (auto) → Smoke → Prod (approval)`

### Checklist pré-prod
- [ ] Tests OK, build OK, coverage > seuil
- [ ] PRs reviewées, QA validé staging
- [ ] Migrations réversibles, backup dispo
- [ ] Monitoring configuré, rollback prêt

## 7. Maintenance
| Tâche | Fréquence |
|-------|-----------|
| Mise à jour deps | Mensuel |
| Audit sécurité | Mensuel |
| Review performance | Trimestriel |
| Nettoyage code mort | Trimestriel |

Monitoring : uptime (< 99.9% alerte), erreurs 5xx (> 1%), LCP (> 2.5s), CVE critiques.

## Adaptation Taille Projet

| Phase | Petit (< 2 sem) | Moyen (1-3 mois) | Grand (> 3 mois) |
|-------|-----------------|-------------------|-------------------|
| Discovery | 1/2 journée | 2-5 jours | 1-2 semaines |
| Design | 1 jour | 1 semaine | 2-4 semaines |
| Setup | 1/2 journée | 1-2 jours | 1 semaine |
| Testing | Unit + smoke | + intégration | + e2e + perf + a11y |
| Deploy | Simple (Vercel) | Staging + prod | Blue-green/canary |
