# Qualité

> **Projet** : {{PROJECT_NAME}}

## Structure

```
05-quality/
├── README.md           # Ce fichier
├── test-strategy.md    # Stratégie de test globale
├── reviews/            # Historique des code reviews
│   └── REVIEW-TEMPLATE.md
└── audits/             # Audits qualité (sécurité, perf, a11y)
    └── AUDIT-TEMPLATE.md
```

## Métriques qualité

| Métrique | Target | Actuel | Statut |
|----------|--------|--------|--------|
| Couverture tests | > 80% | {{CURRENT}}% | 🟢/🟡/🔴 |
| Bugs critiques | 0 | {{BUGS}} | 🟢/🟡/🔴 |
| Dette technique | < 5j | {{DEBT}} | 🟢/🟡/🔴 |
| Temps review | < 24h | {{REVIEW_TIME}} | 🟢/🟡/🔴 |

## Standards

### Code

- [x] TypeScript strict mode
- [x] ESLint + Prettier
- [x] Conventions de nommage
- [x] Pattern repository/service

### Tests

- [x] Tests unitaires (Vitest/Jest)
- [x] Tests intégration (Supertest)
- [x] Tests E2E (Playwright/Cypress)
- [x] Tests accessibilité (axe-core)

### Review

- [x] PR template avec checklist
- [x] Au moins 1 reviewer
- [x] CI vert avant merge
- [x] Squash merge

## Dernières reviews

| Date | PR | Feature | Reviewer | Issues |
|------|----|---------| ---------|--------|
| {{DATE}} | #{{PR}} | {{FEATURE}} | {{REVIEWER}} | {{ISSUES}} |

## Derniers audits

| Date | Type | Score | Rapport |
|------|------|-------|---------|
| {{DATE}} | Sécurité | {{SCORE}} | [Lien](./audits/{{FILE}}) |
| {{DATE}} | Performance | {{SCORE}} | [Lien](./audits/{{FILE}}) |
