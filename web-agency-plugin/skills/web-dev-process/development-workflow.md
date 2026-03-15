# Development Workflow & Standards

## Git Workflow

```
main (protégé) ← PR (squash) ← feature/TICKET-123-description
                              ← bugfix/TICKET-456-fix
                              ← hotfix/TICKET-789-critical
```

### Conventional Commits (français)
```
feat(auth): ajouter connexion OAuth Google
fix(panier): corriger calcul TVA sur remises
refactor(api): extraire middleware de validation
test(users): ajouter tests inscription
docs(readme): mettre à jour setup
```

### PR Template
```markdown
## Description : [Contexte et changements]
## Type : [ ] Feature / [ ] Fix / [ ] Refactor
## Checklist :
- [ ] Tests ajoutés | [ ] Pas de console.log | [ ] Screenshots si UI
```

## Coding Standards

| Type | Convention | Exemple |
|------|-----------|---------|
| Composants | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase + use | `useAuth.ts` |
| Utilitaires | camelCase | `formatDate.ts` |
| Constants | UPPER_SNAKE | `MAX_RETRY_COUNT` |
| CSS Modules | camelCase | `styles.headerNav` |

### Structure (React/Next.js)
```
src/
├── components/Button/{Button.tsx, Button.test.tsx, Button.module.css}
├── hooks/          # Custom hooks
├── lib/            # Utilitaires, clients API
├── types/          # Types TypeScript partagés
└── app/            # Routes (App Router)
```

### Principes
- **SRP** : 1 fichier = 1 responsabilité
- **DRY** : extraire dès 3 occurrences
- **KISS** : solution la plus simple
- **YAGNI** : ne pas coder ce qui n'est pas demandé

## Code Review Process

```
Dev ouvre PR → CI (lint+tests+build) → Review pair (24h max) → Approbation → Squash merge
```

## Quality Tools Setup

```json
// package.json
{ "lint": "eslint .", "format": "prettier --write .", "prepare": "husky" }
```

```bash
# .husky/pre-commit → pnpm lint-staged
# .husky/commit-msg → npx commitlint --edit $1
```

```javascript
// lint-staged.config.js
{ "*.{ts,tsx}": ["eslint --fix", "prettier --write"] }
```

### TypeScript Strict
```json
{ "compilerOptions": { "strict": true, "noUncheckedIndexedAccess": true } }
```

## Documentation

### README minimal
```markdown
# Projet | Prérequis: Node >= 20, pnpm >= 9
pnpm install && cp .env.example .env
pnpm dev | pnpm test | pnpm build
```

### ADR
```markdown
# ADR-001: [Sujet] | Date | Status: Accepté
## Contexte → Décision → Conséquences
```

## Checklist Dev Quotidienne

- [ ] Branche à jour (rebase main)
- [ ] Tests passent localement
- [ ] PR avec description claire
- [ ] Pas de secrets, logs debug, code commenté
