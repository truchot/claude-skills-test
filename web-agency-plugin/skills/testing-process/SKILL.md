---
name: testing-process
description: >-
  Expert strategie et methodologie de tests. Claude invoque ce skill quand la
  conversation porte sur la strategie de tests, la pyramide de tests, les
  methodologies TDD/BDD, la couverture, les tests de performance, securite
  ou accessibilite.
user-invocable: false
---

## Role

Definit QUOI tester et QUAND, pas COMMENT. Couvre la strategie, les types de
tests, les metriques de qualite, les tests de performance, securite et
accessibilite. Niveau 2 PROCESSUS.

## Domaines d'expertise

- **Strategie** : pyramide de tests, ratios, TDD/BDD/ATDD, planification, documentation
  - Voir [test-strategies.md](test-strategies.md) pour les frameworks et ratios
- **Types** : unitaires (isolation, mocks, AAA), integration (API, DB), e2e (parcours), composants UI
- **Qualite** : couverture code et seuils, mutation testing, detection tests flaky
- **Performance** : tests de charge (k6, Artillery), Core Web Vitals, profiling
- **Securite** : OWASP Top 10, audit dependances (npm audit, Snyk), headers HTTP
- **Accessibilite** : conformite WCAG 2.1/2.2, audits axe-core/Pa11y

## Patterns essentiels

- **QUOI/QUAND vs COMMENT** : testing-process = methodologie, skills techniques = code de test
- **Pyramide respectee** : beaucoup d'unitaires, moins d'integration, peu d'e2e
- **Tests avant refactoring** : toujours couvrir avant de modifier
- **Qualite > quantite** : couverture pertinente, pas couverture maximale
- **Shift-left securite** : tester la securite tot dans le cycle, pas en fin de projet

## Anti-patterns

- Ecrire le code de test specifique (deleguer au skill technique correspondant)
- Configurer les outils (deleguer aux skills techniques)
- Viser 100% de couverture sans discernement
- Ignorer les tests flaky ("ca passe en relancant")
- Tester uniquement le happy path

## Escalation

| Vers | Quand |
|------|-------|
| `backend-developer` | Code de tests backend (Jest, Mocha) |
| `frontend-developer` | Code de tests frontend (RTL, Playwright) |
| `react-expert` / `nextjs-expert` | Tests specifiques React/Next.js |
| `direction-technique` | Politique qualite, budgets, outils |
| Humain | Tests exploratoires manuels, validation fonctionnelle metier, go/no-go release |
