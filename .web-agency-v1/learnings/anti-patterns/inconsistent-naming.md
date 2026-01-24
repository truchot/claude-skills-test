---
id: antipattern-009
severity: low
tags: [code-quality, conventions, maintainability]
first_occurrence: 2024-01-05
occurrence_count: 8
---

# Anti-Pattern: Nommage Incohérent

## Symptôme

**Comment détecter ce problème :**

- Mix de conventions (camelCase, snake_case, kebab-case)
- Abréviations non standards
- Noms de fichiers inconsistants
- Préfixes manquants ou variables

**Exemple de manifestation :**

```php
// ❌ MAUVAIS - Incohérent
function getUserData() { }      // camelCase
function get_user_profile() { } // snake_case
function getuser() { }          // lowercase
function GetUserInfo() { }      // PascalCase

// Variables
$userData = [];     // camelCase
$user_profile = []; // snake_case
$usrInfo = [];      // abréviation
```

```
// ❌ Structure fichiers incohérente
/components/
  UserCard.jsx
  user-profile.jsx
  userSettings.js
  USER_AVATAR.jsx
```

## Pourquoi c'est un Problème

### Impact Technique

- Difficile de trouver du code (quelle convention ?)
- Erreurs de typo fréquentes
- Autocomplétion IDE inefficace
- Merge conflicts fréquents

### Impact Business

- **Onboarding rallongé** pour nouveaux devs
- **Maintenance coûteuse** (temps de recherche)
- **Dette technique** qui s'accumule

### Coût Typique

| Aspect | Coût estimé |
|--------|-------------|
| Temps recherche | +20% par tâche |
| Bugs typo | 1-2h/semaine |
| Onboarding | +1 jour |

## Solution

### Convention PHP (WordPress)

```php
<?php
/**
 * Convention WordPress: snake_case partout
 */

// Fonctions
function theme_get_user_data($user_id) { }
function theme_render_profile_card($user) { }

// Variables
$user_data = [];
$profile_settings = [];
$is_active = true;

// Classes: PascalCase
class Theme_User_Repository { }
class Theme_Profile_Controller { }

// Constantes: SCREAMING_SNAKE_CASE
define('THEME_VERSION', '1.0.0');
const THEME_MAX_UPLOAD_SIZE = 5242880;

// Hooks: snake_case avec préfixe
add_action('theme_after_user_save', 'theme_send_notification');
add_filter('theme_user_display_name', 'theme_format_name');
```

### Convention JavaScript

```javascript
/**
 * Convention JS moderne: camelCase + PascalCase pour composants
 */

// Fonctions et variables: camelCase
function getUserData(userId) { }
const userData = {};
const isActive = true;

// Classes et composants React: PascalCase
class UserRepository { }
function UserProfileCard({ user }) { }

// Constantes: SCREAMING_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = '/wp-json/theme/v1';

// Fichiers composants: PascalCase.jsx
// UserCard.jsx, UserProfile.jsx

// Fichiers utils: camelCase.js
// formatDate.js, apiClient.js
```

### Convention CSS/SCSS

```scss
/**
 * Convention BEM: block__element--modifier
 */

// Block: kebab-case
.user-card { }
.profile-header { }

// Element: __element
.user-card__avatar { }
.user-card__name { }

// Modifier: --modifier
.user-card--featured { }
.user-card--compact { }

// Variables: kebab-case avec préfixe
$color-primary: #0066cc;
$spacing-base: 1rem;
$font-size-large: 1.25rem;
```

### Structure Fichiers

```
theme/
├── includes/
│   ├── class-theme-user.php       # Classes: class-{prefix}-{name}.php
│   ├── class-theme-settings.php
│   └── helpers/
│       ├── formatting.php          # Helpers: lowercase.php
│       └── validation.php
│
├── assets/
│   ├── js/
│   │   ├── components/
│   │   │   ├── UserCard.jsx        # Composants: PascalCase.jsx
│   │   │   └── ProfileHeader.jsx
│   │   └── utils/
│   │       ├── apiClient.js        # Utils: camelCase.js
│   │       └── formatters.js
│   │
│   └── scss/
│       ├── components/
│       │   ├── _user-card.scss     # SCSS: _kebab-case.scss
│       │   └── _profile.scss
│       └── main.scss
│
└── templates/
    ├── single-user.php             # Templates: {type}-{name}.php
    └── archive-user.php
```

### Configuration ESLint/PHPCS

```json
// .eslintrc.json
{
  "rules": {
    "camelcase": ["error", { "properties": "always" }],
    "@typescript-eslint/naming-convention": [
      "error",
      { "selector": "variable", "format": ["camelCase", "UPPER_CASE"] },
      { "selector": "function", "format": ["camelCase"] },
      { "selector": "typeLike", "format": ["PascalCase"] }
    ]
  }
}
```

```xml
<!-- phpcs.xml -->
<rule ref="WordPress.NamingConventions.ValidFunctionName"/>
<rule ref="WordPress.NamingConventions.ValidVariableName"/>
<rule ref="WordPress.NamingConventions.PrefixAllGlobals">
    <properties>
        <property name="prefixes" type="array">
            <element value="theme"/>
        </property>
    </properties>
</rule>
```

## Prévention

### Checklist

- [ ] Document CONVENTIONS.md dans le projet
- [ ] ESLint/PHPCS configurés et en CI
- [ ] Pre-commit hooks actifs
- [ ] Code review vérifie les conventions
- [ ] Préfixe défini pour le projet

### Template CONVENTIONS.md

```markdown
# Conventions de Nommage

## PHP
- Fonctions: `theme_action_subject()`
- Variables: `$snake_case`
- Classes: `Theme_Name`

## JavaScript
- Fonctions: `camelCase()`
- Composants: `PascalCase`
- Fichiers composants: `PascalCase.jsx`

## CSS
- Classes: `.block__element--modifier`
- Variables: `$category-name`
```

## Occurrences Documentées

| Projet | Date | Impact | Résolution |
|--------|------|--------|------------|
| 8 projets | 2024 | Confusion équipe | Standardisation progressive |

## Voir Aussi

- [Anti-pattern: missing-docs](./missing-docs.md)
- [Pattern: block-theme-structure](../patterns/block-theme-structure.md)

## Références

- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [BEM Methodology](https://getbem.com/)
