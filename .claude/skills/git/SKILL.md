---
name: git
description: Versioning avec Git - branches, commits, workflows
tags: [git, versioning, branches, commits, merge]
sub-skills: [branching, commits, workflows]
---

# Git

## Quand Utiliser

- Gérer les versions du code
- Collaborer en équipe
- Créer et fusionner des branches
- Résoudre des conflits

## Principes Clés

- Commits atomiques (une chose à la fois)
- Messages de commit descriptifs
- Branches courtes et ciblées
- Pull/rebase avant push

## Branches

```bash
# Créer et basculer
git checkout -b feature/ma-feature

# Lister
git branch -a

# Supprimer (local)
git branch -d feature/ma-feature

# Supprimer (remote)
git push origin --delete feature/ma-feature
```

## Convention de Nommage

```
feature/   → nouvelle fonctionnalité
fix/       → correction de bug
hotfix/    → correction urgente prod
refactor/  → refactoring
docs/      → documentation
```

**Exemples** :
- `feature/user-authentication`
- `fix/login-redirect`
- `hotfix/security-patch`

## Commits

### Format Conventional Commits

```
<type>(<scope>): <description>

[body]

[footer]
```

**Types** :
- `feat` : nouvelle fonctionnalité
- `fix` : correction de bug
- `docs` : documentation
- `style` : formatting
- `refactor` : refactoring
- `test` : ajout/modification tests
- `chore` : maintenance

**Exemples** :
```bash
git commit -m "feat(auth): add login with Google"
git commit -m "fix(cart): prevent negative quantities"
git commit -m "docs: update API documentation"
```

## Workflow Git Flow

```
main ─────────────────────────────────►
       │                    ▲
       │                    │ merge
       ▼                    │
develop ──────────────────────────────►
       │              ▲
       │              │ merge
       ▼              │
feature/xxx ──────────┘
```

## Commandes Essentielles

```bash
# Status
git status
git log --oneline -10

# Staging
git add .
git add -p  # interactif

# Commit
git commit -m "message"
git commit --amend  # modifier dernier commit

# Sync
git fetch origin
git pull origin main
git push -u origin feature/xxx

# Merge
git checkout main
git merge feature/xxx

# Rebase (garder historique propre)
git checkout feature/xxx
git rebase main
```

## Résolution de Conflits

```bash
# 1. Identifier les conflits
git status

# 2. Éditer les fichiers
<<<<<<< HEAD
votre code
=======
code distant
>>>>>>> branch

# 3. Marquer comme résolu
git add fichier-resolu.js

# 4. Continuer
git rebase --continue
# ou
git merge --continue
```

## Stash (mise de côté)

```bash
# Sauvegarder
git stash
git stash -m "description"

# Lister
git stash list

# Récupérer
git stash pop
git stash apply stash@{0}

# Supprimer
git stash drop
```

## Anti-patterns

- ❌ Commits "WIP" ou "fix"
- ❌ Commit de fichiers générés
- ❌ Force push sur branches partagées
- ❌ Branches trop longues (> 1 semaine)
- ❌ Merge sans review

## .gitignore

```gitignore
# Dependencies
node_modules/
vendor/

# Build
dist/
build/

# Environment
.env
.env.local

# IDE
.idea/
.vscode/

# OS
.DS_Store
Thumbs.db
```

## Checklist

- [ ] Branche créée depuis main/develop à jour
- [ ] Commits atomiques avec messages clairs
- [ ] Pas de fichiers sensibles (.env)
- [ ] Tests passent avant push
- [ ] PR créée pour review
