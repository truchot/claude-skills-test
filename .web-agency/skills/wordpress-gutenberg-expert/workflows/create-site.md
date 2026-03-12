---
name: create-site
description: Workflow de création de site WordPress complet (Bedrock + Block Theme + CI/CD + Deploy)
---

# Workflow : Création de Site WordPress

Pipeline complet de création de site WordPress professionnel, de la maquette au déploiement.

## Différenciation vs wp-site-creator (Automattic)

| Aspect | wp-site-creator | Ce workflow |
|--------|----------------|-------------|
| Environnement | Studio (macOS) | wp-env, Bedrock, tout serveur |
| Déploiement | Local uniquement | Staging + Production (SSH, CI/CD) |
| Architecture | Thème seul | Bedrock + thème + plugin fonctionnel |
| CI/CD | Non | GitHub Actions / GitLab CI |
| Contenu | Généré IA | Import, migration, ou création |

## Vue d'ensemble

```
Phase 1          Phase 2           Phase 3           Phase 4          Phase 5
BRIEF            DESIGN SYSTEM     SCAFFOLDING       BUILD            DEPLOY

┌──────────┐    ┌──────────┐     ┌──────────┐     ┌──────────┐    ┌──────────┐
│ Besoins  │───▶│ Tokens   │───▶│ Bedrock   │───▶│ Patterns │───▶│ Staging  │
│ Stack    │    │ theme.json│    │ Theme     │    │ Blocks   │    │ Prod     │
│ Contenu  │    │ Palette  │    │ Plugin    │    │ Contenu  │    │ CI/CD    │
└──────────┘    └──────────┘     └──────────┘     └──────────┘    └──────────┘

Agents :         Agents :          Agents :          Agents :       Agents :
• client-intake  • design-tokens   • project-init    • templates-   • staging-setup
                 • block-theme     • bedrock-setup     patterns     • cicd-pipelines
                                   • repository-     • custom-      • deployment-ssh
                                     setup             blocks       • go-live-
                                   • wp-playground   • block-         checklist
                                   • mcp-integration   bindings
                                                     • wp-core/*
```

## Phase 1 : Brief

### Questions à poser

1. **Type de projet** : Site vitrine, blog, e-commerce, portfolio, intranet ?
2. **Stack** : Bedrock ou standard ? GitHub ou GitLab ?
3. **Hébergement** : Serveur dédié, mutualisé, WordPress.com, cloud ?
4. **Contenu** : Existant (migration) ou à créer ?
5. **Fonctionnalités** : CPT, formulaires, multilingue, e-commerce ?
6. **Design** : Maquette Figma disponible ? Charte graphique ?
7. **Timeline** : Date de livraison cible ?

### Livrables Phase 1

- [ ] Brief projet documenté
- [ ] Stack technique choisie
- [ ] Liste des fonctionnalités priorisées
- [ ] Arborescence du site définie

## Phase 2 : Design System

### Agents à invoquer

1. **`design/design-tokens`** : Extraire les tokens de la maquette → theme.json
2. **`theme/block-theme`** : Structurer le thème avec theme.json complet

### Actions

```bash
# 1. Créer le theme.json depuis les tokens de design
#    → Couleurs, typographie, spacing, shadows, border-radius
#    → Voir agents/design/design-tokens.md pour le détail

# 2. Créer les style variations si multi-brand
#    → styles/dark.json, styles/brand-b.json
```

### Livrables Phase 2

- [ ] theme.json complet (settings + styles)
- [ ] Style variations (si applicable)
- [ ] Palette de couleurs validée
- [ ] Typographie et polices configurées

## Phase 3 : Scaffolding

### Script automatisé

```bash
#!/bin/bash
# Usage: ./create-wp-site.sh mon-projet mon-theme

PROJECT_NAME=${1:?'Nom du projet requis'}
THEME_SLUG=${2:-$PROJECT_NAME}
PLUGIN_SLUG="${PROJECT_NAME}-core"

echo "=== Création du projet WordPress : $PROJECT_NAME ==="

# ─── 1. Bedrock ───
composer create-project roots/bedrock $PROJECT_NAME
cd $PROJECT_NAME
cp .env.example .env

# ─── 2. Theme Block ───
THEME_DIR="web/app/themes/$THEME_SLUG"
mkdir -p "$THEME_DIR"/{templates,parts,patterns,styles,assets/fonts,assets/images}

# style.css
cat > "$THEME_DIR/style.css" << EOF
/*
Theme Name: $(echo $THEME_SLUG | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')
Theme URI: https://example.com
Author: Agency Name
Description: Block theme for $PROJECT_NAME
Requires at least: 6.5
Tested up to: 6.9
Requires PHP: 8.1
Version: 1.0.0
Text Domain: $THEME_SLUG
*/
EOF

# theme.json minimal
cat > "$THEME_DIR/theme.json" << 'THEMEJSON'
{
    "$schema": "https://schemas.wp.org/trunk/theme.json",
    "version": 3,
    "settings": {
        "appearanceTools": true,
        "useRootPaddingAwareAlignments": true,
        "layout": {
            "contentSize": "800px",
            "wideSize": "1200px"
        },
        "color": {
            "defaultPalette": false,
            "palette": [
                { "slug": "primary", "color": "#0066CC", "name": "Primary" },
                { "slug": "secondary", "color": "#FF6B35", "name": "Secondary" },
                { "slug": "foreground", "color": "#1e1e1e", "name": "Foreground" },
                { "slug": "background", "color": "#ffffff", "name": "Background" }
            ]
        },
        "typography": {
            "fluid": true,
            "fontSizes": [
                { "slug": "sm", "size": "0.875rem", "name": "Small" },
                { "slug": "md", "size": "1rem", "name": "Medium" },
                { "slug": "lg", "size": "1.5rem", "name": "Large" },
                { "slug": "xl", "size": "2rem", "name": "XL" },
                { "slug": "2xl", "size": "3rem", "name": "2XL" }
            ]
        }
    }
}
THEMEJSON

# functions.php
cat > "$THEME_DIR/functions.php" << 'FUNCTIONSPHP'
<?php
function theme_setup() {
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'wp-block-styles' );
    add_editor_style( 'style.css' );
}
add_action( 'after_setup_theme', 'theme_setup' );
FUNCTIONSPHP

# Templates minimaux
cat > "$THEME_DIR/templates/index.html" << 'HTML'
<!-- wp:template-part {"slug":"header","area":"header"} /-->
<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">
    <!-- wp:query-title {"type":"archive"} /-->
    <!-- wp:query {"queryId":1,"query":{"perPage":10,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","inherit":true}} -->
    <div class="wp-block-query">
        <!-- wp:post-template -->
            <!-- wp:post-title {"isLink":true} /-->
            <!-- wp:post-excerpt /-->
        <!-- /wp:post-template -->
        <!-- wp:query-pagination -->
            <!-- wp:query-pagination-previous /-->
            <!-- wp:query-pagination-numbers /-->
            <!-- wp:query-pagination-next /-->
        <!-- /wp:query-pagination -->
    </div>
    <!-- /wp:query -->
</main>
<!-- /wp:group -->
<!-- wp:template-part {"slug":"footer","area":"footer"} /-->
HTML

cat > "$THEME_DIR/templates/page.html" << 'HTML'
<!-- wp:template-part {"slug":"header","area":"header"} /-->
<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">
    <!-- wp:post-title {"level":1} /-->
    <!-- wp:post-content {"layout":{"type":"constrained"}} /-->
</main>
<!-- /wp:group -->
<!-- wp:template-part {"slug":"footer","area":"footer"} /-->
HTML

cat > "$THEME_DIR/templates/single.html" << 'HTML'
<!-- wp:template-part {"slug":"header","area":"header"} /-->
<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">
    <!-- wp:post-title {"level":1} /-->
    <!-- wp:post-featured-image /-->
    <!-- wp:post-content {"layout":{"type":"constrained"}} /-->
    <!-- wp:post-terms {"term":"category"} /-->
    <!-- wp:post-terms {"term":"post_tag"} /-->
</main>
<!-- /wp:group -->
<!-- wp:template-part {"slug":"footer","area":"footer"} /-->
HTML

cat > "$THEME_DIR/templates/404.html" << 'HTML'
<!-- wp:template-part {"slug":"header","area":"header"} /-->
<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">
    <!-- wp:heading {"level":1} -->
    <h1>Page non trouvée</h1>
    <!-- /wp:heading -->
    <!-- wp:paragraph -->
    <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
    <!-- /wp:paragraph -->
    <!-- wp:search {"label":"Rechercher","buttonText":"Rechercher"} /-->
</main>
<!-- /wp:group -->
<!-- wp:template-part {"slug":"footer","area":"footer"} /-->
HTML

# Template parts
cat > "$THEME_DIR/parts/header.html" << 'HTML'
<!-- wp:group {"tagName":"header","layout":{"type":"constrained"}} -->
<header class="wp-block-group">
    <!-- wp:group {"layout":{"type":"flex","justifyContent":"space-between"}} -->
    <div class="wp-block-group">
        <!-- wp:site-title /-->
        <!-- wp:navigation /-->
    </div>
    <!-- /wp:group -->
</header>
<!-- /wp:group -->
HTML

cat > "$THEME_DIR/parts/footer.html" << 'HTML'
<!-- wp:group {"tagName":"footer","layout":{"type":"constrained"}} -->
<footer class="wp-block-group">
    <!-- wp:paragraph {"align":"center","fontSize":"sm"} -->
    <p class="has-text-align-center has-sm-font-size">© 2026 — Tous droits réservés</p>
    <!-- /wp:paragraph -->
</footer>
<!-- /wp:group -->
HTML

# ─── 3. Plugin fonctionnel ───
PLUGIN_DIR="web/app/plugins/$PLUGIN_SLUG"
mkdir -p "$PLUGIN_DIR/src"

cat > "$PLUGIN_DIR/$PLUGIN_SLUG.php" << PLUGINPHP
<?php
/**
 * Plugin Name: $(echo $PROJECT_NAME | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g') Core
 * Description: Fonctionnalités métier du projet $PROJECT_NAME
 * Version: 1.0.0
 * Requires PHP: 8.1
 * Text Domain: $PLUGIN_SLUG
 */

defined( 'ABSPATH' ) || exit;

// Autoload
foreach ( glob( __DIR__ . '/src/*.php' ) as \$file ) {
    require_once \$file;
}
PLUGINPHP

# ─── 4. wp-env ───
cat > .wp-env.json << WPENV
{
    "core": null,
    "phpVersion": "8.2",
    "plugins": ["./web/app/plugins/$PLUGIN_SLUG"],
    "themes": ["./web/app/themes/$THEME_SLUG"],
    "config": {
        "WP_DEBUG": true,
        "SCRIPT_DEBUG": true
    }
}
WPENV

# ─── 5. package.json ───
cat > package.json << PACKAGEJSON
{
    "name": "$PROJECT_NAME",
    "version": "1.0.0",
    "private": true,
    "scripts": {
        "start": "wp-env start",
        "stop": "wp-env stop",
        "destroy": "wp-env destroy",
        "lint:php": "composer lint",
        "test:php": "wp-env run tests-cli phpunit"
    },
    "devDependencies": {
        "@wordpress/env": "^10.0.0"
    }
}
PACKAGEJSON

# ─── 6. Git ───
git init
git add .
git commit -m "Initial project setup: Bedrock + block theme + plugin"

echo ""
echo "=== Projet $PROJECT_NAME créé ! ==="
echo ""
echo "Prochaines étapes :"
echo "  cd $PROJECT_NAME"
echo "  npm install"
echo "  npm start"
echo ""
echo "URLs :"
echo "  Site  : http://localhost:8888"
echo "  Admin : http://localhost:8888/wp-admin (admin/password)"
```

### Agents à invoquer par phase

| Phase | Agent | Action |
|-------|-------|--------|
| Scaffolding | `tooling/project-init` | Structure projet |
| Scaffolding | `tooling/bedrock-setup` | Architecture Bedrock |
| Scaffolding | `tooling/repository-setup` | Git + remotes |
| Scaffolding | `tooling/wp-playground` | Dev local rapide |
| Scaffolding | `tooling/mcp-integration` | Connexion MCP (optionnel) |

## Phase 4 : Build

### Agents à invoquer

| Agent | Action |
|-------|--------|
| `theme/templates-patterns` | Créer les templates et patterns du thème |
| `gutenberg-blocks/block-bindings` | Connecter les blocks aux custom fields |
| `gutenberg-blocks/custom-blocks` | Créer les blocks custom (si nécessaire) |
| `gutenberg-blocks/block-hooks` | Injecter des blocks automatiquement |
| `wp-core/custom-post-types` | Créer les CPT |
| `wp-core/custom-taxonomies` | Créer les taxonomies |
| `wp-core/hooks-filters` | Actions et filters custom |
| `theme/interactivity-api` | Interactivité (accordéons, onglets, etc.) |

### Livrables Phase 4

- [ ] Templates (index, page, single, archive, 404, search)
- [ ] Template parts (header, footer)
- [ ] Patterns (hero, CTA, cards, etc.)
- [ ] Custom blocks (si nécessaire)
- [ ] CPT et taxonomies configurés
- [ ] Block bindings pour les custom fields
- [ ] Contenu importé ou créé

## Phase 5 : Deploy

### Agents à invoquer

| Agent | Action |
|-------|--------|
| `tooling/staging-setup` | Configurer le serveur staging |
| `tooling/cicd-pipelines` | GitHub Actions / GitLab CI |
| `tooling/deployment-ssh` | Déploiement SSH/rsync |
| `tooling/go-live-checklist` | Checklist de mise en production |

### Livrables Phase 5

- [ ] Staging fonctionnel avec contenu
- [ ] Pipeline CI/CD configuré (lint + tests + deploy)
- [ ] Go-live checklist validée
- [ ] DNS configuré
- [ ] SSL activé
- [ ] Monitoring en place
