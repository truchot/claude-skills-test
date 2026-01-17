---
id: i18n-package
name: Package Internationalisation WordPress
version: 1.0.0
category: wordpress
status: active
phase: "4-realisation"
order: 7
agents:
  - wordpress-gutenberg-expert/i18n/translation-setup
  - wordpress-gutenberg-expert/i18n/pot-generation
  - content-management/localization/translation-manager
consumes:
  - gutenberg-block
  - custom-post-type
  - theme-json-config
produces_for:
  - content-management/localization/i18n-validator
workflows:
  - id: wf-i18n-setup
    template: wf-creation
    phase: Réalisation
    name: Configuration i18n WordPress
    duration: 0.5-1 jour
tags: [wordpress, i18n, l10n, translation, internationalization, multilingual]
---

# Package Internationalisation WordPress

## Description

Configuration complète pour l'internationalisation d'un plugin/thème WordPress : génération de fichiers POT, PO, MO et JSON pour JavaScript. Permet la traduction de toutes les chaînes de texte.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Fichiers POT/PO/MO/JSON |
| **Emplacement** | `wp-content/plugins/[plugin]/languages/` |
| **Nommage** | `[textdomain]-[locale].{po,mo,json}` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Fichiers Obligatoires

- [ ] **POT** - Template de traduction (source)
- [ ] **PO** - Traductions par langue
- [ ] **MO** - Fichier compilé
- [ ] **JSON** - Traductions JavaScript

### Configuration Obligatoire

- [ ] **Text domain** - Identifiant unique
- [ ] **Load textdomain** - Chargement des traductions

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Toutes chaînes | 100% des textes internationalisés | Auto (WP-CLI) | Oui |
| 2 | Text domain | Cohérent partout | Auto | Oui |
| 3 | JSON généré | Pour tous les scripts | Auto | Oui |
| 4 | POT à jour | Régénéré à chaque release | Manuel | Oui |

## Exemple

### Structure des Fichiers

```
wp-content/plugins/artisanat-blocks/
├── languages/
│   ├── artisanat-blocks.pot                    # Template source
│   ├── artisanat-blocks-fr_FR.po               # Traductions FR
│   ├── artisanat-blocks-fr_FR.mo               # Compilé FR
│   ├── artisanat-blocks-fr_FR-artisanat-blocks-editor-script.json  # JS FR
│   ├── artisanat-blocks-de_DE.po               # Traductions DE
│   ├── artisanat-blocks-de_DE.mo               # Compilé DE
│   └── artisanat-blocks-de_DE-artisanat-blocks-editor-script.json  # JS DE
├── src/
│   └── blocks/
└── artisanat-blocks.php
```

---

### PHP - Configuration i18n

```php
<?php
/**
 * Plugin Name: Artisanat Blocks
 * Text Domain: artisanat-blocks
 * Domain Path: /languages
 */

namespace Artisanat;

defined( 'ABSPATH' ) || exit;

/**
 * Load plugin textdomain.
 */
function load_textdomain() {
    load_plugin_textdomain(
        'artisanat-blocks',
        false,
        dirname( plugin_basename( __FILE__ ) ) . '/languages'
    );
}
add_action( 'init', __NAMESPACE__ . '\\load_textdomain' );

/**
 * Set script translations for JavaScript.
 */
function set_script_translations() {
    wp_set_script_translations(
        'artisanat-blocks-editor-script', // Script handle
        'artisanat-blocks',               // Text domain
        plugin_dir_path( __FILE__ ) . 'languages'
    );
}
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\set_script_translations' );
```

---

### PHP - Utilisation des Fonctions i18n

```php
<?php
/**
 * Internationalization examples
 */

// Simple string
$title = __( 'Ajouter au panier', 'artisanat-blocks' );

// Echo directly
_e( 'Produits artisanaux', 'artisanat-blocks' );

// With context (disambiguation)
$label = _x( 'Commander', 'Button label', 'artisanat-blocks' );
_ex( 'Commander', 'Button label', 'artisanat-blocks' );

// Pluralization
$message = sprintf(
    /* translators: %d: number of items */
    _n(
        '%d article dans votre panier',
        '%d articles dans votre panier',
        $count,
        'artisanat-blocks'
    ),
    $count
);

// Pluralization with context
$message = sprintf(
    /* translators: %d: number of reviews */
    _nx(
        '%d avis',
        '%d avis',
        $count,
        'Product reviews count',
        'artisanat-blocks'
    ),
    $count
);

// Number formatting
$price = number_format_i18n( 1234.56, 2 ); // "1 234,56" en français

// Date formatting
$date = date_i18n( get_option( 'date_format' ), strtotime( '2024-01-15' ) );

// Escaping + translation (preferred for output)
echo esc_html__( 'Produit fait main', 'artisanat-blocks' );
echo esc_attr__( 'Cliquez pour ajouter', 'artisanat-blocks' );
echo esc_html_x( 'Voir', 'Link text', 'artisanat-blocks' );

// With placeholders - ALWAYS use translator comments
printf(
    /* translators: %s: product name */
    esc_html__( 'Vous avez ajouté "%s" à votre panier.', 'artisanat-blocks' ),
    esc_html( $product_name )
);

// HTML in translations
echo wp_kses_post(
    sprintf(
        /* translators: %s: artisan name, wrapped in <strong> */
        __( 'Créé par <strong>%s</strong>', 'artisanat-blocks' ),
        esc_html( $artisan_name )
    )
);
```

---

### JavaScript - Utilisation @wordpress/i18n

```javascript
/**
 * WordPress dependencies
 */
import { __, _x, _n, sprintf } from '@wordpress/i18n';

// Simple string
const title = __('Ajouter au panier', 'artisanat-blocks');

// With context
const buttonLabel = _x('Commander', 'Button label', 'artisanat-blocks');

// Pluralization
const itemsMessage = sprintf(
  /* translators: %d: number of items in cart */
  _n(
    '%d article dans votre panier',
    '%d articles dans votre panier',
    count,
    'artisanat-blocks'
  ),
  count
);

// Example in React component
import { __ } from '@wordpress/i18n';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <button>
        {__('Ajouter au panier', 'artisanat-blocks')}
      </button>
      <span className="badge">
        {__('Fait main', 'artisanat-blocks')}
      </span>
    </div>
  );
}
```

---

### Fichier POT (Template)

```pot
# Copyright (C) 2024 Artisanat
# This file is distributed under the GPL-2.0+.
msgid ""
msgstr ""
"Project-Id-Version: Artisanat Blocks 1.0.0\n"
"Report-Msgid-Bugs-To: https://github.com/artisanat/blocks/issues\n"
"Last-Translator: FULL NAME <EMAIL@ADDRESS>\n"
"Language-Team: LANGUAGE <LL@li.org>\n"
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=UTF-8\n"
"Content-Transfer-Encoding: 8bit\n"
"POT-Creation-Date: 2024-01-15T10:00:00+00:00\n"
"PO-Revision-Date: YEAR-MO-DA HO:MI+ZONE\n"
"X-Generator: WP-CLI 2.9.0\n"
"X-Domain: artisanat-blocks\n"

#. Plugin Name of the plugin
msgid "Artisanat Blocks"
msgstr ""

#. Description of the plugin
msgid "Custom Gutenberg blocks for artisan e-commerce."
msgstr ""

#: src/blocks/product-card/edit.js:45
msgid "Ajouter au panier"
msgstr ""

#: src/blocks/product-card/edit.js:52
msgid "Fait main"
msgstr ""

#: src/blocks/product-card/edit.js:60
#. translators: %s: product name
msgid "Vous avez ajouté \"%s\" à votre panier."
msgstr ""

#: includes/class-checkout.php:123
msgid "Message cadeau"
msgstr ""

#: includes/class-checkout.php:124
msgid "Ajoutez un message personnel (optionnel)"
msgstr ""

#: includes/class-checkout.php:132
msgid "Emballage cadeau (+5€)"
msgstr ""

#. translators: %d: number of items in cart
#: src/blocks/cart/edit.js:78
msgid "%d article dans votre panier"
msgid_plural "%d articles dans votre panier"
msgstr[0] ""
msgstr[1] ""

#: src/blocks/product-card/edit.js:88
msgctxt "Button label"
msgid "Commander"
msgstr ""
```

---

### Fichier PO (Traduction Française)

```po
# French translations for Artisanat Blocks.
# Copyright (C) 2024 Artisanat
# This file is distributed under the GPL-2.0+.
#
msgid ""
msgstr ""
"Project-Id-Version: Artisanat Blocks 1.0.0\n"
"Report-Msgid-Bugs-To: https://github.com/artisanat/blocks/issues\n"
"POT-Creation-Date: 2024-01-15T10:00:00+00:00\n"
"PO-Revision-Date: 2024-01-16T14:30:00+01:00\n"
"Last-Translator: Marie Dupont <marie@artisanat.fr>\n"
"Language-Team: French <fr@artisanat.fr>\n"
"Language: fr_FR\n"
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=UTF-8\n"
"Content-Transfer-Encoding: 8bit\n"
"Plural-Forms: nplurals=2; plural=(n > 1);\n"
"X-Generator: Poedit 3.4\n"

#. Plugin Name of the plugin
msgid "Artisanat Blocks"
msgstr "Blocs Artisanat"

#. Description of the plugin
msgid "Custom Gutenberg blocks for artisan e-commerce."
msgstr "Blocs Gutenberg personnalisés pour le e-commerce artisanal."

#: src/blocks/product-card/edit.js:45
msgid "Ajouter au panier"
msgstr "Ajouter au panier"

#: src/blocks/product-card/edit.js:52
msgid "Fait main"
msgstr "Fait main"

#: src/blocks/product-card/edit.js:60
#. translators: %s: product name
msgid "Vous avez ajouté \"%s\" à votre panier."
msgstr "Vous avez ajouté « %s » à votre panier."

#: includes/class-checkout.php:123
msgid "Message cadeau"
msgstr "Message cadeau"

#. translators: %d: number of items in cart
#: src/blocks/cart/edit.js:78
msgid "%d article dans votre panier"
msgid_plural "%d articles dans votre panier"
msgstr[0] "%d article dans votre panier"
msgstr[1] "%d articles dans votre panier"

#: src/blocks/product-card/edit.js:88
msgctxt "Button label"
msgid "Commander"
msgstr "Commander"
```

---

### Génération avec WP-CLI

```bash
# Générer le fichier POT
wp i18n make-pot . languages/artisanat-blocks.pot \
  --slug=artisanat-blocks \
  --domain=artisanat-blocks \
  --include="src/,includes/" \
  --exclude="node_modules/,vendor/,tests/" \
  --headers='{"Report-Msgid-Bugs-To":"https://github.com/artisanat/blocks/issues"}'

# Mettre à jour les fichiers PO existants
wp i18n update-po languages/artisanat-blocks.pot languages/

# Compiler les fichiers MO
wp i18n make-mo languages/

# Générer les fichiers JSON pour JavaScript
wp i18n make-json languages/ --no-purge

# Tout en une commande (script)
#!/bin/bash
set -e

DOMAIN="artisanat-blocks"
LANGUAGES_DIR="languages"

echo "Generating POT file..."
wp i18n make-pot . ${LANGUAGES_DIR}/${DOMAIN}.pot \
  --slug=${DOMAIN} \
  --domain=${DOMAIN}

echo "Updating PO files..."
wp i18n update-po ${LANGUAGES_DIR}/${DOMAIN}.pot ${LANGUAGES_DIR}/

echo "Compiling MO files..."
wp i18n make-mo ${LANGUAGES_DIR}/

echo "Generating JSON files for JavaScript..."
wp i18n make-json ${LANGUAGES_DIR}/ --no-purge

echo "Done!"
```

---

### Configuration package.json

```json
{
  "scripts": {
    "i18n:pot": "wp i18n make-pot . languages/artisanat-blocks.pot --domain=artisanat-blocks",
    "i18n:mo": "wp i18n make-mo languages/",
    "i18n:json": "wp i18n make-json languages/ --no-purge",
    "i18n:build": "npm run i18n:pot && npm run i18n:mo && npm run i18n:json"
  }
}
```

---

### GitHub Actions - CI i18n

```yaml
# .github/workflows/i18n.yml
name: i18n

on:
  push:
    paths:
      - 'src/**'
      - 'includes/**'
      - 'languages/**'

jobs:
  update-pot:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup WP-CLI
        run: |
          curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
          chmod +x wp-cli.phar
          sudo mv wp-cli.phar /usr/local/bin/wp

      - name: Generate POT file
        run: |
          wp i18n make-pot . languages/artisanat-blocks.pot \
            --domain=artisanat-blocks \
            --allow-root

      - name: Check for changes
        id: check
        run: |
          git diff --exit-code languages/*.pot || echo "changed=true" >> $GITHUB_OUTPUT

      - name: Commit updated POT
        if: steps.check.outputs.changed == 'true'
        run: |
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add languages/*.pot
          git commit -m "chore(i18n): update POT file"
          git push
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Text domain hardcodé | Erreur de frappe | Constante |
| Pas de translator comments | Traducteurs perdus | `/* translators: */` |
| HTML dans les chaînes | XSS potentiel | `wp_kses_post()` |
| Oublier JSON | JS non traduit | `wp_set_script_translations()` |
| POT non à jour | Chaînes manquantes | CI/CD automatique |

## Références

- [WordPress i18n for Developers](https://developer.wordpress.org/plugins/internationalization/)
- [WP-CLI i18n Commands](https://developer.wordpress.org/cli/commands/i18n/)
- [@wordpress/i18n](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)
- Livrables liés : `gutenberg-block`, `custom-post-type`, `theme-json-config`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | wordpress-gutenberg-expert | Création initiale |
