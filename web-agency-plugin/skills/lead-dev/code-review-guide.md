# Code Review Guide

## Workflow Standard

```
PR ouverte → CI (lint/tests/build) → Review Lead Dev → Approbation/Feedback
                                          ↓
                            pr-review (global)
                            + quality-gate (si doutes qualité)
                            + security-review (si sensible)
                            + performance-review (si critique)
```

## Checklist PR Review

### Compréhension
- [ ] Titre/description clairs, PR < 400 lignes
- [ ] Répond au besoin décrit, pas de scope creep

### Code Quality
- [ ] Nommage clair, pas de duplication, fonctions courtes
- [ ] Edge cases gérés, logique correcte
- [ ] Tests présents et pertinents (pas juste du coverage)
- [ ] Conventions équipe respectées, imports organisés

### Architecture (par contexte)
**Frontend** : Container/Presenter, hooks pour logique, pas d'API dans composants
**Backend** : Controller > Service > Repository, DTOs, validation centralisée
**WordPress** : Hooks, séparation templates/logique, APIs WP natives

### Sécurité (OWASP rapide)
- [ ] Pas d'injection SQL (`?` ou ORM, jamais de template strings)
- [ ] Pas de XSS (`textContent`, pas `innerHTML` avec user input)
- [ ] Pas de credentials en dur, tokens JWT validés
- [ ] CORS restrictif, rate limiting, headers sécurité

### Performance
- [ ] Pas de N+1 queries (utiliser include/JOIN)
- [ ] Pagination sur les listes, indexes appropriés
- [ ] `useMemo`/`useCallback` pour calculs coûteux
- [ ] Cleanup dans `useEffect`, pas de memory leaks

## Types de Commentaires

```
BLOCKING:    "Injection SQL possible. Utiliser des paramètres préparés."
IMPORTANT:   "Pas de validation sur cet input. Risque d'erreur runtime."
SUGGESTION:  "Extraire cette logique dans un hook custom améliorerait la lisibilité."
QUESTION:    "Pourquoi ce choix plutôt que X ? Contexte manquant."
NICE:        "Bonne utilisation du pattern Strategy ici."
```

## Quality Gates

| Gate | PASS si |
|------|---------|
| Lint & Format | 0 erreurs ESLint/Prettier, < 5 nouveaux warnings |
| Tests | Tous passent, coverage > 70% (optimal > 85%) |
| Build | Réussit sans erreur, pas de warning TS |
| Code Quality | Complexité < 15, fonctions < 50 lignes, fichiers < 300 lignes |

## Métriques de Qualité

| Métrique | Acceptable | Optimal |
|----------|-----------|---------|
| Coverage tests | > 70% | > 85% |
| Complexité cyclomatique | < 15 | < 10 |
| Lignes/fonction | < 50 | < 25 |
| Lignes/fichier | < 400 | < 200 |
| Dépendances/module | < 10 | < 5 |

## Impact Performance - Priorités

| Problème | Impact | Action |
|----------|--------|--------|
| N+1 queries | Critique | Bloquer PR |
| Memory leak | Critique | Bloquer PR |
| Missing index (table large) | Haut | Corriger avant merge |
| Re-renders excessifs | Haut | Corriger avant merge |
| Bundle size | Moyen | Recommandation |

## Bonnes Pratiques Review

1. **Constructif** : toujours proposer une alternative
2. **Précis** : pointer la ligne exacte
3. **Respectueux** : critiquer le code, pas la personne
4. **Rapide** : review dans les 24h max
5. **Cohérent** : mêmes standards pour tous

## Escalades

| Situation | Action |
|-----------|--------|
| Vulnérabilité critique | Bloquer + escalade immédiate |
| Problème d'architecture | Consulter direction-technique |
| Désaccord technique | Discussion équipe + ADR si besoin |
| Standards non clairs | Documenter + former |
