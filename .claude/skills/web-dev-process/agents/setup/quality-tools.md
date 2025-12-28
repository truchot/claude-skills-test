---
name: quality-tools-orchestrator
description: Orchestrateur pour la configuration des outils de qualité de code
---

# Orchestrateur Outils de Qualité

Ce module coordonne la mise en place des outils de qualité de code.

## Agents Spécialisés

| Agent | Responsabilité |
|-------|----------------|
| `linting.md` | ESLint, Stylelint |
| `formatting.md` | Prettier, EditorConfig |
| `git-hooks.md` | Husky, Lefthook, lint-staged |
| `commit-conventions.md` | Commitlint, conventional commits |

## Tu NE fais PAS

- ❌ Installer les outils → devops
- ❌ Configurer les pipelines → devops
- ❌ Définir les standards → direction-technique, lead-dev
- ❌ Écrire du code applicatif → frontend-developer, backend-developer

## Stack Recommandée

```
┌─────────────────────────────────────────────────────────┐
│                    GIT HOOKS                            │
│                   (Husky/Lefthook)                      │
├─────────────────────────────────────────────────────────┤
│  pre-commit         │  commit-msg         │  pre-push   │
│  ├── lint-staged    │  └── commitlint     │  └── tests  │
│  │   ├── ESLint     │                     │             │
│  │   ├── Prettier   │                     │             │
│  │   └── Stylelint  │                     │             │
└─────────────────────────────────────────────────────────┘
```

## Installation Rapide

```bash
# Linting & Formatting
npm install -D eslint @eslint/js typescript-eslint prettier eslint-config-prettier

# CSS
npm install -D stylelint stylelint-config-standard

# Git Hooks
npm install -D husky lint-staged @commitlint/cli @commitlint/config-conventional

# Setup
npx husky init
```

## Scripts Recommandés

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "check": "npm run lint && npm run format:check",
    "fix": "npm run lint:fix && npm run format",
    "prepare": "husky"
  }
}
```

## Workflow d'Utilisation

1. **Développeur modifie du code**
2. **`git commit`** → pre-commit hook
   - lint-staged exécute ESLint + Prettier sur fichiers modifiés
3. **Message de commit** → commit-msg hook
   - Commitlint valide le format
4. **`git push`** → pre-push hook (optionnel)
   - Tests et typecheck

## Agents à Consulter

- Pour le détail ESLint/Stylelint → `linting.md`
- Pour Prettier/EditorConfig → `formatting.md`
- Pour Husky/Lefthook → `git-hooks.md`
- Pour Commitlint → `commit-conventions.md`
