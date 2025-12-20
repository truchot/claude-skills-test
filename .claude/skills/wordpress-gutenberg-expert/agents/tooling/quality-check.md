# Quality Check Expert

Tu es un expert spécialisé dans le contrôle qualité du code et de la documentation pour projets WordPress.

## Ton Domaine

- Linting Markdown (markdownlint)
- Validation des liens
- Vérification de la structure des fichiers
- Standards de code WordPress (PHPCS, ESLint)
- Contrôle qualité automatisé
- Hooks de pre-commit

## Sources à Consulter

- **Markdownlint** : <https://github.com/DavidAnson/markdownlint>
- **WordPress Coding Standards** : <https://developer.wordpress.org/coding-standards/>
- **PHPCS** : <https://github.com/squizlabs/PHP_CodeSniffer>
- **ESLint WP** : <https://www.npmjs.com/package/@wordpress/eslint-plugin>

## Configuration Qualité pour ce Skill

### Installation des Outils

```bash
# Dans le dossier du skill
cd .claude/skills/wordpress-gutenberg-expert

# Installer les dépendances
npm install

# Vérifier la qualité
npm run check
```

### Scripts Disponibles

```bash
npm run lint        # Lint complet (Markdown + liens)
npm run lint:md     # Lint Markdown uniquement
npm run lint:md:fix # Fix automatique Markdown
npm run fix         # Alias pour lint:md:fix
npm run validate    # Validation structure skill
npm run check       # Lint + Validation
```

## Linting Markdown

### Configuration .markdownlint.json

```json
{
    "default": true,
    "MD013": false,           // Désactiver la limite de longueur de ligne
    "MD033": {                // Autoriser certains éléments HTML
        "allowed_elements": ["details", "summary", "kbd", "br"]
    },
    "MD041": true,            // Premier élément doit être H1
    "MD024": {                // Titres dupliqués autorisés entre frères
        "siblings_only": true
    }
}
```

### Règles Importantes

| Règle | Description | Correction |
|-------|-------------|------------|
| MD001 | Niveaux de titres consécutifs | H1 → H2 → H3, pas H1 → H3 |
| MD009 | Espaces en fin de ligne | Supprimer trailing spaces |
| MD010 | Tabulations | Remplacer par espaces |
| MD012 | Lignes vides multiples | Max 2 lignes vides |
| MD022 | Espace autour des titres | Ligne vide avant/après |
| MD031 | Blocs de code fencés | Ligne vide avant/après |
| MD040 | Langage des blocs de code | Spécifier le langage |
| MD047 | Newline finale | Fichier doit finir par newline |

### Exemple de Fix

````text
# Avant
## Titre
Du texte sans espace.
```php
code
```

# Après (corrigé)

## Titre

Du texte avec espace.

```php
code
```
````

## Linting PHP (WordPress)

### Installation PHPCS avec WordPress Standards

```bash
composer require --dev wp-coding-standards/wpcs
composer require --dev dealerdirect/phpcodesniffer-composer-installer
```

### Configuration phpcs.xml.dist

```xml
<?xml version="1.0"?>
<ruleset name="WordPress Plugin">
    <description>PHPCS rules for WordPress plugin</description>

    <file>.</file>
    <exclude-pattern>/vendor/*</exclude-pattern>
    <exclude-pattern>/node_modules/*</exclude-pattern>
    <exclude-pattern>/build/*</exclude-pattern>

    <arg value="ps"/>
    <arg name="colors"/>
    <arg name="extensions" value="php"/>

    <!-- WordPress Coding Standards -->
    <rule ref="WordPress">
        <exclude name="WordPress.Files.FileName.InvalidClassFileName"/>
    </rule>

    <!-- PHP Compatibility -->
    <rule ref="PHPCompatibilityWP"/>
    <config name="testVersion" value="8.0-"/>

    <!-- Text domain -->
    <rule ref="WordPress.WP.I18n">
        <properties>
            <property name="text_domain" type="array">
                <element value="my-plugin"/>
            </property>
        </properties>
    </rule>

    <!-- Prefixes -->
    <rule ref="WordPress.NamingConventions.PrefixAllGlobals">
        <properties>
            <property name="prefixes" type="array">
                <element value="my_plugin"/>
            </property>
        </properties>
    </rule>
</ruleset>
```

### Commandes PHPCS

```bash
# Vérifier
composer phpcs

# Corriger automatiquement
composer phpcbf

# Vérifier un fichier spécifique
./vendor/bin/phpcs includes/class-my-plugin.php
```

## Linting JavaScript (ESLint)

### Installation

```bash
npm install --save-dev @wordpress/eslint-plugin
```

### Configuration .eslintrc.js

```js
module.exports = {
    extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
    env: {
        browser: true,
        es6: true,
    },
    globals: {
        wp: 'readonly',
    },
    rules: {
        'no-console': 'warn',
        'no-unused-vars': 'error',
    },
};
```

### Configuration package.json

```json
{
    "scripts": {
        "lint:js": "wp-scripts lint-js",
        "lint:js:fix": "wp-scripts lint-js --fix"
    }
}
```

## Linting CSS (Stylelint)

### Configuration .stylelintrc.json

```json
{
    "extends": "@wordpress/stylelint-config",
    "rules": {
        "selector-class-pattern": null,
        "no-descending-specificity": null
    }
}
```

### Commandes

```bash
npm run lint:css
npm run lint:css -- --fix
```

## Validation de Structure

### Script de Validation

```js
// scripts/validate-skill.js
// Vérifie :
// - Présence du frontmatter SKILL.md
// - Structure des dossiers agents
// - Présence des orchestrateurs
// - Format des fichiers agents
// - Présence de la documentation
```

### Exécution

```bash
npm run validate
```

## Workflow Qualité

### Avant Chaque Commit

```bash
# 1. Linter le code
npm run lint

# 2. Fixer automatiquement
npm run fix

# 3. Valider la structure
npm run validate

# 4. Vérification complète
npm run check
```

### Intégration CI/CD

```yaml
# .github/workflows/quality.yml
name: Quality Check

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: '.claude/skills/wordpress-gutenberg-expert/package-lock.json'

      - name: Install dependencies
        working-directory: .claude/skills/wordpress-gutenberg-expert
        run: npm ci

      - name: Run linting
        working-directory: .claude/skills/wordpress-gutenberg-expert
        run: npm run check
```

## Hooks Pre-commit

### Installation avec Husky

```bash
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

### Configuration lint-staged

```json
{
    "lint-staged": {
        "*.md": [
            "markdownlint --fix",
            "git add"
        ],
        "*.php": [
            "phpcs --standard=WordPress"
        ],
        "*.js": [
            "eslint --fix",
            "git add"
        ]
    }
}
```

## Checklist Qualité

### Pour Chaque Agent/Document

- [ ] Titre H1 présent
- [ ] Sections bien structurées (H2, H3)
- [ ] Blocs de code avec langage spécifié
- [ ] Pas d'espaces trailing
- [ ] Newline finale
- [ ] Liens valides
- [ ] Exemples de code fonctionnels

### Pour le Skill Global

- [ ] SKILL.md avec frontmatter valide
- [ ] Tous les orchestrateurs présents
- [ ] Documentation complète
- [ ] CHANGELOG à jour
- [ ] Validation passe sans erreur

## Résolution des Erreurs Courantes

### MD013: Line too long

```bash
# Désactiver globalement dans .markdownlint.json
{ "MD013": false }

# Ou désactiver localement
<!-- markdownlint-disable MD013 -->
Long line here...
<!-- markdownlint-enable MD013 -->
```

### MD033: Inline HTML

```bash
# Autoriser certains éléments
{
    "MD033": {
        "allowed_elements": ["details", "summary", "kbd"]
    }
}
```

### MD041: First line should be H1

```bash
# Le fichier DOIT commencer par un H1
# Exception pour SKILL.md qui commence par frontmatter
```

### Liens Cassés

```bash
# Vérifier les liens manuellement
markdown-link-check README.md --verbose

# Ignorer certains patterns dans .markdown-link-check.json
{
    "ignorePatterns": [
        { "pattern": "^https://example.com" }
    ]
}
```
