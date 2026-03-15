# Team Practices & Coordination

## Daily/Standup
- [ ] PRs en attente de review
- [ ] Blocages (dev bloqué = priorité immédiate)
- [ ] Avancement sprint vs objectifs

## Résolution de Blocages
```
1. Classifier : technique / dépendance / décision / compétence
2. Résoudre : pair programming | escalade | mentoring | trancher
3. Délai max : 30 min, sinon escalade
```

## Mentoring & Feedback (modèle SBI)
```
Situation: "Lors de la PR #123..."
Behaviour: "Requêtes N+1 dans la boucle..."
Impact:    "Lenteurs avec > 100 utilisateurs."
Suggestion: "Utilise include/JOIN. Exemple : ..."
```

## Onboarding Nouveau Dev
- [ ] Setup env (README, scripts, accès)
- [ ] Architecture projet (schéma, conventions)
- [ ] Workflow Git (branching, PR, review)
- [ ] Première PR simple + review bienveillante
- [ ] Binôme assigné (2 premières semaines)

## Évaluation Compétences

| Domaine | Junior | Mid | Senior |
|---------|--------|-----|--------|
| Autonomie | Guidé | Autonome/feature | Guide les autres |
| Review | Reçoit feedback | Reviews simples | Review archi |
| Décisions | Suit patterns | Propose solutions | Choisit et justifie |

## Delivery & Releases

### Merge Strategy
| Contexte | Stratégie | Raison |
|----------|-----------|--------|
| Feature > main | Squash merge | 1 commit = 1 feature |
| Release > main | Merge commit | Traçabilité |
| Hotfix | Cherry-pick + merge | Ciblé |
| Sync main > feature | Rebase | Pas de merges parasites |

### Checklist Pré-Deploy
- [ ] Tests passent, build OK
- [ ] PRs reviewées et approuvées
- [ ] Migrations testées et réversibles
- [ ] Plan rollback prêt, équipe informée

### Hotfix Classification
| Sévérité | Délai | Exemple |
|----------|-------|---------|
| P0 | < 1h | Site down, fuite données |
| P1 | < 4h | Feature majeure cassée |
| P2 | < 24h | Feature secondaire cassée |

**Règle** : fix minimal, pas de refactoring, review accélérée, smoke test.

## Décisions Techniques

### Choix Librairie
| Critère | Évaluation |
|---------|-----------|
| Maintenance active | Commits récents, issues résolues |
| Bundle size | Impact frontend |
| Types TypeScript | Support natif |
| API stable | Pas de breaking changes fréquents |

### Priorisation Dette
```
Impact × Fréquence = Priorité
Haut + souvent    → Sprint en cours
Haut + rarement   → Backlog prioritaire
Bas + souvent     → Quick win
Bas + rarement    → Ignorer
```

## Conventions Git
```
Branches : feature/TICKET-123-desc | bugfix/TICKET-456 | hotfix/xxx
Commits  : feat(scope): desc | fix(scope): desc | refactor(scope): desc
```
