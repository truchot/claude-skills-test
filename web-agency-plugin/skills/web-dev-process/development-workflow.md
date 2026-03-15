# Development Workflow & Standards

## Git Workflow

### Branching
```
main (protégé) ← PR (squash merge) ← feature/TICKET-123-description
                                    ← bugfix/TICKET-456-fix-desc
                                    ← hotfix/TICKET-789-critical
```

### Conventional Commits (français)
```
feat(auth): ajouter connexion OAuth Google
fix(panier): corriger calcul TVA sur remises
refactor(api): extraire middleware de validation
test(users): ajouter tests service d'inscription
docs(readme): mettre à jour instructions de setup
chore(deps): mettre à jour dépendances mineures
```

### PR Template
```markdown
## Description
[Contexte et changements]

## Type
- [ ] Feature / [ ] Fix / [ ] Refactor / [ ] Chore

## Checklist
- [ ] Tests ajoutés/mis à jour
- [ ] Documentation mise à jour (si nécessaire)
- [ ] Pas de console.log/debug
- [ ] Screenshots (si changement UI)
```

## Coding Standards

### Nommage (conventions projet)
| Type | Convention | Exemple |
|------|-----------|---------|
| Composants | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase + use | `useAuth.ts` |
| Utilitaires | camelCase | `formatDate.ts` |
| Constants | UPPER_SNAKE | `MAX_RETRY_COUNT` |
| Types/Interfaces | PascalCase | `UserProfile` |
| CSS Modules | camelCase | `styles.headerNav` |

### Structure Fichiers (React/Next.js)
```
src/
├── components/     # Composants réutilisables
│   └── Button/
│       ├── Button.tsx
│       ├── Button.test.tsx
│       └── Button.module.css
├── hooks/          # Custom hooks
├── lib/            # Utilitaires, clients API
├── types/          # Types TypeScript partagés
└── app/            # Routes (Next.js App Router)
```

### Principes de Code
```
SRP     : 1 fichier = 1 responsabilité
DRY     : Extraire dès 3 occurrences
KISS    : Solution la plus simple qui marche
YAGNI   : Ne pas coder ce qui n'est pas demandé
```

## Code Review Process

```
1. Dev ouvre PR (< 400 lignes idéalement)
2. CI automatique : lint + tests + build
3. Review par pair (24h max)
4. Feedback → corrections → re-review si bloquant
5. Approbation → squash merge → branche supprimée
```

### Critères de Review
- [ ] Logique correcte, edge cases gérés
- [ ] Tests présents et pertinents
- [ ] Nommage clair, code lisible
- [ ] Pas de sécurité/perf issues évidentes
- [ ] Conventions respectées

## Documentation

### README (template minimal)
```markdown
# Nom du Projet
## Prérequis
Node.js >= 20, pnpm >= 9
## Installation
pnpm install && cp .env.example .env
## Développement
pnpm dev
## Tests
pnpm test
## Déploiement
pnpm build && pnpm start
```

### ADR (Architecture Decision Record)
```markdown
# ADR-001: Choix de [sujet]
Date: YYYY-MM-DD | Status: Accepté
## Contexte
[Pourquoi cette décision]
## Décision
[Ce qui a été choisi]
## Conséquences
[Impact positif et négatif]
```

## Quality Tools Setup

### ESLint + Prettier + Husky
```json
// package.json (scripts)
{
  "lint": "eslint . --ext .ts,.tsx",
  "format": "prettier --write .",
  "prepare": "husky"
}
```

```bash
# .husky/pre-commit
pnpm lint-staged

# .husky/commit-msg
npx commitlint --edit $1
```

```json
// lint-staged.config.js
{ "*.{ts,tsx}": ["eslint --fix", "prettier --write"] }
```

### TypeScript Strict
```json
// tsconfig.json (options critiques)
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true
  }
}
```

## Checklist Dev Quotidienne

- [ ] Branche à jour avec main (rebase)
- [ ] Tests passent localement avant push
- [ ] PR ouverte avec description claire
- [ ] Pas de secrets, logs debug, ou code commenté
- [ ] Review demandée au bon reviewer
