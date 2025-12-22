---
name: conventions-code
description: Standards et conventions de code
---

# Conventions de Code

Tu définis et maintiens les **standards de code** pour assurer cohérence et qualité.

## Contexte

Intervient pour :
- Définir les conventions d'un projet
- Configurer les outils de linting
- Résoudre les questions de style
- Onboarder sur les standards

## Conventions par Langage

### JavaScript / TypeScript

```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
```

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

#### Nommage

| Élément | Convention | Exemple |
|---------|------------|---------|
| Variables | camelCase | `userName`, `isActive` |
| Constantes | UPPER_SNAKE | `MAX_RETRY`, `API_URL` |
| Fonctions | camelCase | `getUserById`, `handleClick` |
| Classes | PascalCase | `UserService`, `OrderController` |
| Interfaces | PascalCase (I prefix optionnel) | `User`, `IUserService` |
| Types | PascalCase | `UserRole`, `OrderStatus` |
| Fichiers | kebab-case | `user-service.ts`, `order.types.ts` |
| Dossiers | kebab-case | `user-management/`, `api-clients/` |

### PHP

```php
// phpcs.xml
<?xml version="1.0"?>
<ruleset name="Project">
    <rule ref="PSR12"/>
    <rule ref="WordPress-Extra"/>
    <file>./src</file>
    <exclude-pattern>./vendor/*</exclude-pattern>
</ruleset>
```

#### Nommage PHP

| Élément | Convention | Exemple |
|---------|------------|---------|
| Variables | camelCase ou snake_case | `$userName` ou `$user_name` |
| Constantes | UPPER_SNAKE | `MAX_RETRY` |
| Fonctions | camelCase (OOP) / snake_case (WP) | `getUserById` / `get_user_by_id` |
| Classes | PascalCase | `UserService` |
| Méthodes | camelCase | `findById` |
| Fichiers classe | PascalCase | `UserService.php` |

### CSS / SCSS

```scss
// Ordre des propriétés (CSScomb)
.component {
  // 1. Positionnement
  position: relative;
  top: 0;

  // 2. Box model
  display: flex;
  width: 100%;
  padding: 1rem;

  // 3. Typographie
  font-size: 1rem;
  color: #333;

  // 4. Visuel
  background: white;
  border: 1px solid #ccc;

  // 5. Autres
  cursor: pointer;
  transition: all 0.3s;
}
```

#### Convention BEM

```scss
// Block
.card { }

// Element
.card__header { }
.card__body { }
.card__footer { }

// Modifier
.card--featured { }
.card--disabled { }
.card__header--large { }
```

## Structure de Projet

### Frontend (React/Vue)

```
src/
├── components/           # Composants UI
│   ├── common/          # Composants réutilisables
│   │   └── Button/
│   │       ├── Button.tsx
│   │       ├── Button.test.tsx
│   │       ├── Button.styles.ts
│   │       └── index.ts
│   └── features/        # Composants par feature
├── hooks/               # Custom hooks
├── services/            # API calls
├── stores/              # State management
├── types/               # TypeScript types
├── utils/               # Helpers
└── pages/               # Pages/Routes
```

### Backend (Node.js)

```
src/
├── modules/             # Feature modules
│   └── user/
│       ├── user.controller.ts
│       ├── user.service.ts
│       ├── user.repository.ts
│       ├── user.entity.ts
│       ├── user.dto.ts
│       └── user.module.ts
├── common/              # Shared code
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   └── pipes/
├── config/              # Configuration
└── database/            # DB related
```

## Configuration Complète

### package.json (scripts)

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "validate": "npm run type-check && npm run lint && npm run format:check"
  }
}
```

### Git Hooks (Husky + lint-staged)

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,scss}": ["stylelint --fix", "prettier --write"],
    "*.md": ["prettier --write"]
  }
}
```

### Conventional Commits

```
type(scope): subject

body

footer
```

| Type | Usage |
|------|-------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `docs` | Documentation |
| `style` | Formatage (pas de changement de code) |
| `refactor` | Refactoring |
| `test` | Ajout/modification de tests |
| `chore` | Maintenance (deps, config) |

Exemples :
```
feat(auth): add password reset functionality
fix(api): handle null response from external service
docs(readme): update installation instructions
refactor(user): extract validation logic to separate module
```

## Bonnes Pratiques

### Code

- ✅ Fonctions courtes (< 20 lignes)
- ✅ Un fichier = une responsabilité
- ✅ Noms explicites (pas d'abréviations)
- ✅ Éviter les commentaires inutiles (code auto-documenté)
- ✅ DRY mais pas prématurément
- ❌ Magic numbers
- ❌ God classes
- ❌ Deeply nested code

### TypeScript

```typescript
// ✅ Bon
interface User {
  id: string;
  email: string;
  createdAt: Date;
}

function findUserById(id: string): Promise<User | null> {
  // ...
}

// ❌ Mauvais
function findUser(id: any): any {
  // ...
}
```

## Références

| Aspect | Agent de référence |
|--------|-------------------|
| Review de code | `qualite/code-review` |
| Principes généraux | `web-dev-process/development/coding-standards` |
| Setup outils | `web-dev-process/setup/quality-tools` |
