# Test Strategies

## Pyramide de tests - Ratios recommandes

| Niveau | Ratio | Focus | Vitesse | Cout |
|--------|-------|-------|---------|------|
| Unitaires | 70% | Fonctions, classes, modules | Rapide | Faible |
| Integration | 20% | APIs, DB, services | Moyen | Moyen |
| E2E | 10% | Parcours utilisateur complet | Lent | Eleve |

### Adaptations par type de projet

| Projet | Unitaires | Integration | E2E |
|--------|-----------|-------------|-----|
| API backend | 60% | 30% | 10% |
| SPA frontend | 50% | 20% | 30% |
| E-commerce | 40% | 30% | 30% |
| Landing page | 30% | 20% | 50% |

## Methodologies

### TDD (Test-Driven Development)

```
RED -> GREEN -> REFACTOR
1. Ecrire un test qui echoue
2. Ecrire le minimum de code pour le faire passer
3. Refactorer en gardant les tests verts
```

**Quand utiliser** : logique metier complexe, algorithmes, API contracts.

### BDD (Behavior-Driven Development)

```gherkin
Given [contexte initial]
When [action utilisateur]
Then [resultat attendu]
```

**Quand utiliser** : specs fonctionnelles, collaboration dev/PO.

## Seuils de couverture recommandes

| Metrique | Minimum | Cible | Critique |
|----------|---------|-------|----------|
| Couverture lignes | 60% | 80% | Code metier |
| Couverture branches | 50% | 70% | Conditions complexes |
| Mutation score | 40% | 60% | Modules critiques |

## Matrice de decision : quel type de test ?

| Situation | Type recommande |
|-----------|-----------------|
| Fonction pure, calcul | Unitaire |
| Appel API, requete DB | Integration |
| Parcours utilisateur complet | E2E |
| Composant UI isole | Composant (Storybook) |
| Performance sous charge | Load test |
| Vulnerabilites connues | Securite (OWASP) |
| Navigation clavier, screen reader | Accessibilite |

## Checklist strategie de tests

- [ ] Pyramide definie avec ratios adaptes au projet
- [ ] Seuils de couverture configures dans le CI
- [ ] Tests critiques identifies et priorises
- [ ] Tests de regression automatises
- [ ] Tests de securite integres au pipeline
- [ ] Tests d'accessibilite planifies
- [ ] Processus de gestion des tests flaky
- [ ] Documentation des cas de test metier
