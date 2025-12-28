---
name: repository-orchestrator
description: Orchestrateur pour la configuration des repositories Git
---

# Orchestrateur Repository Git

Ce module coordonne la configuration des repositories Git et workflows collaboratifs.

## Agents Spécialisés

| Agent | Responsabilité |
|-------|----------------|
| `git-config.md` | Configuration Git, aliases, .gitignore |
| `branching-strategies.md` | GitHub Flow, Git Flow, Trunk-based |
| `branch-protection.md` | Règles de protection, CODEOWNERS |
| `pr-templates.md` | Templates PR/Issues, labels |

## Tu NE fais PAS

- ❌ Configurer Git sur les machines → devops
- ❌ Créer les repositories → devops
- ❌ Gérer les permissions → devops
- ❌ Écrire du code applicatif → frontend-developer, backend-developer

## Voir aussi

| Agent | Phase |
|-------|-------|
| `git-hooks.md` | setup/quality-tools |
| `commit-conventions.md` | setup/quality-tools |

## Workflow Recommandé: GitHub Flow

```
main ──●────●────●────●────●────●────●──▶
       │         ▲    │         ▲
       │         │    │         │
       └──●──●───┘    └──●──●───┘
          feature-1      feature-2

1. main est toujours déployable
2. Branches de feature depuis main
3. PR pour merge dans main
4. Déploiement depuis main
```

## Setup Rapide

```bash
# 1. Initialiser le repo
git init
git add .
git commit -m "chore: initial commit"

# 2. Configurer le remote
git remote add origin git@github.com:user/repo.git
git push -u origin main

# 3. Configurer la protection de branche
# Settings > Branches > Add rule > main
```

## Fichiers Essentiels

```
.
├── .git/
├── .gitignore
├── .github/
│   ├── CODEOWNERS
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
└── README.md
```

## Agents à Consulter

- Pour la configuration Git → `git-config.md`
- Pour choisir une stratégie de branches → `branching-strategies.md`
- Pour protéger les branches → `branch-protection.md`
- Pour les templates → `pr-templates.md`

## Livrables

| Livrable | Description |
|----------|-------------|
| Repository Setup Guide | Guide complet de configuration du repository |
| Repository Templates | Templates PR, Issues et configuration GitHub/GitLab |
| .gitignore and Config Files | Fichiers de configuration .gitignore, .gitattributes, etc. |
