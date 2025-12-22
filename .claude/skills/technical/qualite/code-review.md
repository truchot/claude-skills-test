---
name: code-review
description: Processus et bonnes pratiques de revue de code
---

# Code Review

Tu encadres le processus de **revue de code** pour assurer qualité et partage de connaissances.

## Objectifs de la Code Review

1. **Qualité** : Détecter bugs et problèmes
2. **Standards** : Assurer la cohérence
3. **Apprentissage** : Partager les connaissances
4. **Sécurité** : Identifier les vulnérabilités
5. **Maintenabilité** : Garantir la lisibilité

## Processus de Review

### Workflow Standard

```
Developer                 Reviewer                  CI
    │                         │                     │
    │  1. Push + Open PR      │                     │
    ├─────────────────────────┼─────────────────────►
    │                         │  2. CI checks       │
    │                         │◄────────────────────┤
    │  3. Request review      │                     │
    ├────────────────────────►│                     │
    │                         │  4. Review code     │
    │  5. Feedback            │                     │
    │◄────────────────────────┤                     │
    │  6. Address feedback    │                     │
    ├────────────────────────►│                     │
    │                         │  7. Approve         │
    │  8. Merge               │                     │
    ├─────────────────────────┼─────────────────────►
```

### Checklist du Reviewer

#### Fonctionnel
- [ ] Le code fait ce qui est demandé
- [ ] Les edge cases sont gérés
- [ ] Les erreurs sont correctement gérées
- [ ] Pas de régression sur l'existant

#### Qualité
- [ ] Code lisible et compréhensible
- [ ] Nommage clair et cohérent
- [ ] Pas de code mort ou commenté
- [ ] DRY respecté (pas de duplication)
- [ ] SOLID respecté

#### Tests
- [ ] Tests unitaires présents
- [ ] Tests pertinents (pas de tests triviaux)
- [ ] Couverture suffisante
- [ ] Tests lisibles

#### Sécurité
- [ ] Pas de données sensibles en dur
- [ ] Inputs validés
- [ ] Outputs échappés
- [ ] Pas de vulnérabilités évidentes

#### Performance
- [ ] Pas de N+1 queries
- [ ] Pas de boucles coûteuses
- [ ] Pas de memory leaks
- [ ] Complexité algorithmique raisonnable

#### Documentation
- [ ] Code auto-documenté
- [ ] Commentaires utiles si nécessaires
- [ ] README/docs mis à jour si besoin

### Types de Commentaires

| Préfixe | Signification | Blocking |
|---------|---------------|----------|
| `[blocking]` | Doit être corrigé | Oui |
| `[suggestion]` | Amélioration optionnelle | Non |
| `[question]` | Demande de clarification | Variable |
| `[nit]` | Détail mineur | Non |
| `[praise]` | Point positif ! | Non |

### Exemples de Commentaires

```markdown
// ❌ Mauvais
"C'est pas bon"
"Pourquoi tu fais ça ?"
"Nul"

// ✅ Bon
"[blocking] Cette requête peut causer un N+1.
Suggestion : utiliser un eager loading avec `include`."

"[suggestion] On pourrait extraire cette logique dans un helper
pour la réutiliser dans OrderService."

"[question] Je ne comprends pas pourquoi on vérifie cette condition.
Peux-tu m'expliquer le use case ?"

"[praise] Belle utilisation du pattern Strategy ici ! 👍"
```

## Bonnes Pratiques

### Pour l'Auteur

#### Avant de soumettre
- [ ] Relire son propre code
- [ ] Vérifier que les tests passent
- [ ] S'assurer que le linter est content
- [ ] Écrire une bonne description de PR

#### Description de PR

```markdown
## Description
[Résumé des changements]

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle feature
- [ ] Refactoring
- [ ] Documentation

## Comment tester
1. [Étape 1]
2. [Étape 2]

## Screenshots (si UI)
[Captures d'écran]

## Checklist
- [ ] Tests ajoutés
- [ ] Documentation mise à jour
- [ ] Pas de breaking changes

## Tickets liés
Closes #123
```

#### Taille des PR
- Idéal : < 400 lignes
- Maximum : 800 lignes
- Plus grand ? Découper en plusieurs PR

### Pour le Reviewer

1. **Répondre rapidement** (< 24h idéalement)
2. **Être constructif**, pas destructif
3. **Expliquer le "pourquoi"**, pas juste le "quoi"
4. **Proposer des solutions**, pas juste critiquer
5. **Reconnaître le bon travail**
6. **Ne pas bloquer sur des détails**

### Communication

| À éviter | Préférer |
|----------|----------|
| "Tu devrais..." | "On pourrait..." |
| "C'est faux" | "Je pense que X serait mieux parce que..." |
| "Toujours faire X" | "Dans ce contexte, X serait plus adapté" |
| Impératif | Interrogatif / Suggestif |

## Métriques de Review

| Métrique | Cible | Mesure |
|----------|-------|--------|
| Temps de première review | < 4h | Outils PR |
| Temps total de review | < 24h | Outils PR |
| Nombre d'allers-retours | < 3 | Comptage |
| Taille moyenne PR | < 400 lignes | Stats |

## Automatisation

### GitHub Actions

```yaml
name: PR Checks

on: [pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm test

  coverage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
```

### CODEOWNERS

```
# .github/CODEOWNERS
* @default-reviewer

/src/auth/ @auth-team
/src/api/ @backend-team
/src/components/ @frontend-team
/docs/ @tech-writer
```

## Références

| Aspect | Agent de référence |
|--------|-------------------|
| Conventions | `qualite/conventions-code` |
| Métriques | `qualite/metriques-qualite` |
| Workflow Git | `web-dev-process/development/git-workflow` |
