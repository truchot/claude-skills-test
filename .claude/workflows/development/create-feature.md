---
name: create-feature
description: Créer une nouvelle fonctionnalité de A à Z
triggers: [feature, fonctionnalité, user story, nouvelle feature]
skills: [git, testing]
calls: [code-review]
roles: [frontend-developer, backend-developer, fullstack-developer]
---

# Créer une Feature

## Objectif

Implémenter une nouvelle fonctionnalité de manière structurée, testée et documentée.

## Pré-requis

- [ ] Ticket/issue créé et assigné
- [ ] Critères d'acceptation définis
- [ ] Design/maquettes disponibles (si UI)
- [ ] Branche main à jour localement

## Étapes

### 1. Analyse

Comprendre le besoin avant de coder.

- [ ] Lire le ticket et les critères d'acceptation
- [ ] Identifier les composants impactés
- [ ] Lister les skills nécessaires
- [ ] Estimer la complexité
- [ ] Clarifier les zones d'ombre avec le demandeur

**Output** : Compréhension claire du "quoi" et du "pourquoi"

### 2. Branching

→ **skill**: `git`

```bash
# S'assurer d'être à jour
git checkout main
git pull origin main

# Créer la branche
git checkout -b feature/TICKET-123-description-courte
```

**Convention** : `feature/<ticket>-<description-kebab-case>`

- [ ] Branche créée depuis main à jour

### 3. Implémentation

→ **skills**: selon contexte (`html`, `css`, `react`, `api-rest`, etc.)

**Approche recommandée** :

1. Commencer par les tests (TDD si possible)
2. Implémenter par petits incréments
3. Commiter régulièrement

```bash
# Commits atomiques
git add -p
git commit -m "feat(scope): description"
```

**Bonnes pratiques** :

- [ ] Code lisible et commenté si nécessaire
- [ ] Pas de code mort ou commenté
- [ ] Conventions du projet respectées
- [ ] Pas de secrets en dur

### 4. Tests

→ **skill**: `testing`

Couvrir la nouvelle fonctionnalité :

```bash
# Exécuter les tests
npm test

# Vérifier la couverture
npm test -- --coverage
```

- [ ] Tests unitaires pour la logique métier
- [ ] Tests d'intégration si API/DB
- [ ] Tests E2E si parcours critique
- [ ] Tous les tests passent
- [ ] Coverage maintenue ou améliorée

### 5. Self-Review

Avant de demander une review, vérifier soi-même :

```bash
# Voir les changements
git diff main...HEAD

# Vérifier le linting
npm run lint
npm run format:check
```

- [ ] Relecture du diff
- [ ] Pas de `console.log` oubliés
- [ ] Pas de TODO non traités
- [ ] Documentation mise à jour si besoin

### 6. Push et PR

→ **skill**: `git`

```bash
git push -u origin feature/TICKET-123-description-courte
```

Créer la Pull Request :

- [ ] Titre clair lié au ticket
- [ ] Description du changement
- [ ] Screenshots si UI
- [ ] Reviewers assignés

### 7. Code Review

→ **workflow**: `code-review`

Attendre et répondre aux retours.

- [ ] Review demandée
- [ ] Retours adressés
- [ ] Approbation obtenue

### 8. Merge

→ **skill**: `git`

```bash
# Rebase si nécessaire
git fetch origin main
git rebase origin/main

# Merge (via PR généralement)
```

- [ ] Branche mergée
- [ ] Branche supprimée
- [ ] Ticket mis à jour

## Outputs

- Code mergé dans main
- Tests passants
- Documentation à jour
- Ticket fermé

## Erreurs Courantes

| Erreur | Cause | Solution |
|--------|-------|----------|
| Conflits au merge | Branche trop vieille | Rebase régulier |
| Tests qui cassent | Régression | Vérifier avant push |
| PR trop grosse | Scope trop large | Découper en plusieurs PRs |
| Review bloquée | Reviewers occupés | Relancer, pair programming |

## Escalade

- **Blocage technique** → `tech-lead`
- **Clarification fonctionnelle** → `project-manager` ou demandeur
- **Problème d'estimation** → `tech-lead`
