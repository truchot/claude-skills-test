# Team Practices & Coordination

## Coordination Équipe

### Daily/Standup - Préparation
- [ ] Status des PRs en attente de review
- [ ] Blocages identifiés (dev bloqué = priorité immédiate)
- [ ] Avancement sprint vs objectifs
- [ ] Risques sur les deadlines

### Délégation de Tâches
| Critère | Évaluation |
|---------|-----------|
| Compétence du dev | Junior/Mid/Senior pour cette techno |
| Charge actuelle | Disponibilité réelle |
| Objectif de montée | Opportunité d'apprentissage |
| Criticité | Matcher séniorité et criticité |

### Résolution de Blocages
```
1. Identifier : quel est le blocage exact ?
2. Classifier : technique / dépendance / décision / compétence
3. Résoudre :
   - Technique → pair programming, debug ensemble
   - Dépendance → escalade, contournement temporaire
   - Décision → trancher ou escalader direction-technique
   - Compétence → mentoring, documentation, formation
4. Débloquer : max 30 min, sinon escalade
```

## Mentoring & Feedback

### Feedback Constructif (modèle SBI)
```
Situation : "Lors de la PR #123..."
Behaviour : "Tu as utilisé des requêtes N+1 dans la boucle..."
Impact :    "Ce qui causerait des lenteurs avec > 100 utilisateurs."
Suggestion: "Utilise un include/JOIN. Voici un exemple : ..."
```

### Onboarding Nouveau Dev
- [ ] Setup environnement (README, scripts, accès)
- [ ] Architecture du projet (schéma, conventions)
- [ ] Workflow Git (branching, PR, review)
- [ ] Première PR simple avec review bienveillante
- [ ] Binôme assigné pour les 2 premières semaines

### Évaluation Compétences
| Domaine | Junior | Mid | Senior |
|---------|--------|-----|--------|
| Autonomie | Guidé | Autonome sur feature | Autonome + guide les autres |
| Code review | Reçoit feedback | Fait des reviews simples | Review architecture |
| Décisions | Suit les patterns | Propose des solutions | Choisit et justifie |
| Communication | Demande de l'aide | Communique proactivement | Mentore l'équipe |

## Delivery & Releases

### Workflow Release
```
1. Planification : scope, date, responsables
2. Code freeze → merge strategy (squash features, merge releases)
3. Vérification pré-deploy (checklist ci-dessous)
4. Deploy staging → smoke tests → deploy prod
5. Release notes + communication
```

### Checklist Pré-Déploiement
- [ ] Tests passent (unit, intégration, e2e)
- [ ] Build OK, pas de warning critique
- [ ] PRs reviewées et approuvées
- [ ] Migrations testées et réversibles
- [ ] Backup récent, env vars à jour
- [ ] Plan de rollback prêt
- [ ] Équipe et stakeholders informés

### Merge Strategy par Contexte
| Contexte | Stratégie | Raison |
|----------|-----------|--------|
| Feature > main | Squash merge | 1 commit = 1 feature |
| Release > main | Merge commit | Traçabilité complète |
| Hotfix | Cherry-pick + merge | Ciblé et traçable |
| Sync main > feature | Rebase | Pas de merges parasites |

### Hotfix (classification)
| Sévérité | Délai | Exemple |
|----------|-------|---------|
| P0 Critique | < 1h | Site down, fuite données |
| P1 Haute | < 4h | Feature majeure cassée |
| P2 Moyenne | < 24h | Feature secondaire cassée |

**Règle** : fix minimal, pas de refactoring, review accélérée, smoke test obligatoire.

## Décisions Techniques

### Choix de Librairie - Critères
| Critère | Poids | Évaluation |
|---------|-------|-----------|
| Maintenance active | Fort | Commits récents, issues résolues |
| Communauté | Moyen | Stars, contributeurs, Stack Overflow |
| Bundle size | Moyen | Impact sur le frontend |
| API stable | Fort | Pas de breaking changes fréquents |
| Types TS | Moyen | Support TypeScript natif |

### Priorisation Dette Technique
```
Impact × Fréquence = Priorité
- Impact haut + touché souvent → Sprint en cours
- Impact haut + rarement touché → Backlog prioritaire
- Impact bas + touché souvent → Quick win
- Impact bas + rarement touché → Ignorer (pour l'instant)
```

## Conventions Git
```
Branches : feature/TICKET-123-description, bugfix/TICKET-456-fix, hotfix/xxx
Commits  : feat(scope): description | fix(scope): desc | refactor(scope): desc
PR       : Titre court, description contexte, checklist, screenshots si UI
```
