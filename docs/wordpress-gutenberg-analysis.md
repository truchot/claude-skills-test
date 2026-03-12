# Analyse approfondie : Skills WordPress & Gutenberg

## Date : 2026-03-12

> **Sources** : Analyse du repo existant (42 agents, 871 agents totaux dans le framework) + recherche web approfondie sur l'écosystème WordPress 2025-2026 (WP-CLI v2.12, wp-env Playground runtime, WordPress 6.9, Block Bindings API, WordPress Telex IA).

---

## 1. Cartographie de l'existant

### 1.1 Le skill `wordpress-gutenberg-expert` actuel

Le skill existant est **solide et bien structuré** avec 37+ agents répartis en 6 domaines :

| Domaine | Agents | Couverture | Maturité |
|---------|--------|------------|----------|
| **WP Core** | 6 | CPT, taxonomies, roles, meta, hooks, security | Bonne |
| **Gutenberg Blocks** | 4 | Custom blocks, variations, styles, data stores | Bonne |
| **Theme** | 4 | Block themes, templates/patterns, style engine, Interactivity API | Bonne |
| **Tooling** | 12 | WP-CLI, project-init, local-dev, CI/CD, deployment, Bedrock | Excellente |
| **Design** | 2 | Design tokens → theme.json, visual review | Correcte |
| **Testing** | 3 | PHPUnit, Jest, E2E (Playwright) | Correcte |
| **Experts directs** | 5 | REST API, GDPR, i18n, SEO, a11y | Bonne |

### 1.2 Forces actuelles

1. **Architecture hiérarchique claire** : Orchestrateur → sous-orchestrateurs → agents spécialisés
2. **Routing par mots-clés** : Table de dispatch bien pensée pour le routage automatique
3. **Séparation QUOI/COMMENT** : Bonne composition avec `web-dev-process`
4. **Bedrock support** : Agent dédié pour l'architecture professionnelle
5. **Design tokens → theme.json** : Pipeline maquette → code bien documenté
6. **Interactivity API** : Couverture des APIs modernes (directives, store, context)

---

## 2. Écosystème d'outils WordPress en 2025-2026

### 2.1 Outils CLI & Dev Environment

| Outil | Description | Statut 2026 | Couvert dans le skill ? |
|-------|-------------|-------------|------------------------|
| **WP-CLI** | CLI officiel WordPress (install, scaffold, db, search-replace) | Stable, v2.10+ | Oui (bien couvert) |
| **wp-env** | Environnement Docker officiel pour dev/test | Stable, recommandé | Oui |
| **@wordpress/scripts** | Build tooling (webpack, babel, lint) | Stable | Oui |
| **@wordpress/create-block** | Scaffolding de blocks | Stable | Oui |
| **wp-now** | Alternative légère à wp-env (WASM via WordPress Playground) | Mature, successeur: @wp-playground/cli | **NON** |
| **WordPress Playground** | WordPress dans le navigateur via WASM | Mature, stratégique, Xdebug support (nov 2025) | **NON** |
| **wp-env Playground runtime** | wp-env sans Docker via Playground WASM (fév 2026) | **Nouveau, game-changer** | **NON** |
| **Studio by WordPress.com** | App desktop locale avec IA intégrée et sync WordPress.com | Recommandé | **NON** |
| **Create Block Theme** | Plugin pour exporter/créer des block themes depuis l'éditeur | Officiel, mature | **Partiellement** |
| **Trellis (Roots)** | Provisioning + déploiement Ansible pour Bedrock | Stable | **NON** |
| **@wordpress/scripts v2** | Discussion pour remplacer Webpack par esbuild | En discussion | Partiellement |
| **wp scaffold block** | Scaffold de block via WP-CLI (deprecated → create-block) | Deprecated | Partiellement |

### 2.2 Gutenberg / Full Site Editing

| Feature | Description | Statut 2026 | Couvert ? |
|---------|-------------|-------------|-----------|
| **Block Themes (FSE)** | Thèmes entièrement basés sur blocks | Standard | Oui |
| **theme.json v3** | Configuration centralisée design | Stable | Oui |
| **Block Patterns** | Compositions réutilisables | Standard | Oui |
| **Synced Patterns** | Ex-reusable blocks, synchronisés | Mature | **Partiellement** |
| **Style Variations** | Palettes alternatives par thème | Mature | Oui |
| **Block Bindings API** | Connecter blocks à des sources de données custom (post-meta, post-data, term-data + custom sources) | **Mature en WP 6.9, stratégique** | **NON** |
| **Interactivity API** | Interactivité déclarative côté client | Stable (deprecation warnings `!` en 6.8) | Oui (à mettre à jour) |
| **Data Views + DataForm** | Interface admin moderne (remplace tables WP) | **Nouveau, APIs stables** | **NON** |
| **Commands API** | Palette de commandes Cmd+K dans l'éditeur | Stable | **NON** |
| **Block Hooks** | Insertion automatique de blocks dans le layout | **Nouveau** | **NON** |
| **Section Styles** | Styles scopés à une section de page | **Nouveau** | **NON** |
| **Font Library** | Gestion centralisée des polices | Stable | **Partiellement** |
| **Pattern Overrides** | Surcharges de contenu dans synced patterns (headings, paragraphs, images, buttons) | **Stable, très puissant** | **NON** |
| **Custom Fields in Editor** | Intégration native via Block Bindings | Stratégique | **NON** |
| **WordPress Telex** | Génération de blocks par IA en langage naturel | **Annoncé WordCamp US 2025** | **NON** |
| **WP 6.9 on-demand CSS** | CSS à la demande pour classic themes (-30-65%) | Stable | **NON** |

### 2.3 Workflows automatisés & Déploiement

| Outil/Concept | Description | Couvert ? |
|---------------|-------------|-----------|
| **Bedrock (Roots)** | Architecture WP avec Composer | Oui |
| **Trellis (Roots)** | Provisioning serveur + deploy | **NON** |
| **SpinupWP** | Panel serveur WP managé | **NON** |
| **WPGraphQL** | API GraphQL pour WordPress headless | **NON** |
| **Faust.js** | Framework headless WP + Next.js | **NON** |
| **Content import/export** | WXR, migration, WP All Import | **Partiellement** |
| **GitHub Actions pour WP** | CI/CD spécifique WordPress | Oui |
| **wp-browser (Codeception)** | Tests d'intégration WP | **NON** |
| **MCP Server WordPress** | Contrôle WP via MCP protocol | **NON (à créer)** |

---

## 3. Lacunes identifiées

### 3.1 Lacunes critiques (impact fort sur l'efficience)

#### A. Absence de workflow de création de site end-to-end

Le skill couvre bien les **composants individuels** mais il manque un **agent orchestrateur de projet** qui pilote le processus complet :

```
Maquette Figma → Design Tokens → theme.json → Block Theme → Patterns → Contenu → Déploiement
```

Actuellement, l'utilisateur doit manuellement chaîner les agents. Il faudrait un **workflow automatisé**.

#### B. Pas de support WordPress Playground / wp-now

WordPress Playground est devenu stratégique (preview instantanée, PR previews, tests en CI sans Docker). `wp-now` permet un dev local ultra-rapide sans Docker. Ces outils manquent totalement.

#### C. Block Bindings API non couvert

C'est LA feature transformatrice de WordPress 6.5+ : elle permet de connecter les blocks natifs (paragraphe, heading, image, button) à des sources de données custom (custom fields, options, etc.) **sans créer de block custom**. Cela change fondamentalement l'approche de développement.

#### D. Pas de workflow de refonte / migration

Aucun agent ne couvre le cas (très fréquent) d'une **refonte de site existant** :
- Audit du site existant
- Migration de contenu
- Mapping ancien thème → nouveau thème
- Redirections SEO
- Search-replace de domaines

### 3.2 Lacunes significatives

#### E. Headless WordPress non couvert

Pas d'agent pour WPGraphQL, Faust.js, ou l'utilisation de WordPress comme headless CMS avec Next.js/Nuxt. C'est un cas d'usage croissant.

#### F. Trellis et provisioning serveur

Bedrock est couvert mais pas Trellis (son compagnon pour le provisioning et le déploiement automatisé avec Ansible).

#### G. Data Views / Admin modernisé

Les nouvelles Data Views (remplacement des tables WP classiques) ne sont pas couvertes. Important pour les plugins avec interfaces admin custom.

#### H. Block Hooks

L'insertion automatique de blocks (header, footer, après le contenu) via Block Hooks est une feature puissante non documentée.

### 3.3 Lacunes mineures

- Font Library API (gestion centralisée des polices)
- Section Styles (styles scopés)
- Pattern Overrides dans synced patterns
- wp-browser / Codeception comme alternative de test
- Create Block Theme plugin workflow

---

## 4. Proposition de processus efficient : Création / Refonte de site WordPress

### 4.1 Vision : Le pipeline "Maquette → Site en production"

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                    PIPELINE DE CRÉATION DE SITE WORDPRESS                    │
│                                                                              │
│  Phase 1        Phase 2         Phase 3          Phase 4         Phase 5     │
│  DISCOVERY      DESIGN SYSTEM   SCAFFOLDING      PRODUCTION     DEPLOYMENT   │
│                                                                              │
│  ┌──────────┐  ┌──────────┐   ┌──────────┐    ┌──────────┐   ┌──────────┐  │
│  │ Audit    │  │ Figma →  │   │ Bedrock  │    │ Patterns │   │ Staging  │  │
│  │ existant │→│ Design   │→ │ + wp-env  │→  │ + Pages  │→ │ + Prod   │  │
│  │ Brief    │  │ Tokens   │   │ theme.json│   │ + Blocks │   │ + CI/CD  │  │
│  │ Contenu  │  │ theme.json│  │ Structure │   │ + Contenu│   │ + DNS    │  │
│  └──────────┘  └──────────┘   └──────────┘    └──────────┘   └──────────┘  │
│                                                                              │
│  Agents:        Agents:         Agents:          Agents:        Agents:      │
│  • client-      • design-       • project-init   • templates-   • staging-   │
│    intake         tokens        • bedrock-setup    patterns       setup      │
│  • content-     • block-theme   • repository-    • custom-      • deployment │
│    management   • style-engine    setup            blocks       • cicd       │
│  • seo-expert                   • local-dev      • interactiv.  • quality    │
│  [NOUVEAU:]     [NOUVEAU:]      [NOUVEAU:]       • wp-core     [NOUVEAU:]   │
│  • site-audit   • figma-to-wp   • wp-playground  [NOUVEAU:]    • migration  │
│                                                  • block-       • go-live    │
│                                                    bindings       checklist  │
│                                                  • content-                  │
│                                                    import                    │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Phase 1 : DISCOVERY (Audit & Brief)

**Objectif** : Comprendre le besoin et l'état actuel.

#### Nouveaux agents recommandés :

**`agents/discovery/site-audit.md`** — Audit de site existant
```
Entrées : URL du site, accès admin
Sorties :
  - Inventaire des contenus (pages, CPT, taxonomies)
  - Liste des plugins actifs
  - Performance baseline (Core Web Vitals)
  - Stack technique actuelle
  - Problèmes SEO identifiés

Commandes WP-CLI pour l'audit :
  wp plugin list --format=json
  wp post list --post_type=page --format=json
  wp post-type list --format=json
  wp taxonomy list --format=json
  wp option get permalink_structure
  wp db size
```

**`agents/discovery/content-inventory.md`** — Inventaire et plan de contenu
```
Entrées : Accès site existant ou brief
Sorties :
  - Arborescence du site
  - Mapping des types de contenu
  - Plan de migration de contenu
  - Gap analysis contenu manquant

Commandes :
  wp export --dir=./exports/
  wp post list --post_type=page --fields=ID,post_title,post_parent,menu_order --format=csv
```

### 4.3 Phase 2 : DESIGN SYSTEM

**Objectif** : Transformer la maquette en système de design WordPress-ready.

#### Améliorations recommandées :

**Enrichir `agents/design/design-tokens.md`** :
- Ajouter un workflow Figma → tokens → theme.json automatisé
- Intégrer la Font Library API pour la gestion des polices
- Documenter les fluid typography clamp() de WordPress
- Ajouter le support des Section Styles

**Nouveau `agents/design/figma-to-wp.md`** — Pipeline Figma → WordPress
```
Processus :
1. Extraire les tokens du design (couleurs, typo, spacing)
2. Générer le theme.json avec settings + styles
3. Identifier les patterns candidats dans la maquette
4. Mapper chaque section → pattern WordPress
5. Créer les style variations si multi-brand

Entrées : Fichier Figma, design guidelines
Sorties : theme.json complet, liste de patterns à créer, mapping de composants
```

### 4.4 Phase 3 : SCAFFOLDING

**Objectif** : Monter l'infrastructure de développement en < 30 minutes.

#### Nouveau `agents/tooling/wp-playground.md`** — WordPress Playground & wp-now
```
Couvre :
- wp-now pour le développement ultra-rapide sans Docker
- WordPress Playground pour les previews
- Utilisation en CI pour les PR previews
- Testing avec Playground Blueprints
- Playground API pour les démonstrations

Commandes :
  npx @wp-now/wp-now start
  npx @wp-now/wp-now start --wp=6.5 --php=8.2

Blueprint pour preview automatique :
{
  "landingPage": "/",
  "steps": [
    { "step": "installTheme", "themeZipFile": { "resource": "url", "url": "..." } },
    { "step": "importWxr", "file": { "resource": "url", "url": "..." } }
  ]
}
```

#### Enrichir `agents/tooling/project-init.md` :

Ajouter un **script de scaffolding complet** qui enchaîne automatiquement :

```bash
#!/bin/bash
# scripts/create-wp-site.sh — Script de création de site WordPress complet

PROJECT_NAME=$1
THEME_SLUG=${2:-$PROJECT_NAME}

# 1. Structure Bedrock
composer create-project roots/bedrock $PROJECT_NAME
cd $PROJECT_NAME

# 2. Environment
cp .env.example .env
# Auto-generate salts

# 3. Theme scaffolding
mkdir -p web/app/themes/$THEME_SLUG/{templates,parts,patterns,styles,assets/fonts,assets/images}

# 4. Plugin fonctionnel
mkdir -p web/app/plugins/${PROJECT_NAME}-core/src

# 5. .wp-env.json pour le dev local
cat > .wp-env.json << EOF
{
    "core": null,
    "phpVersion": "8.2",
    "plugins": ["./web/app/plugins/${PROJECT_NAME}-core"],
    "themes": ["./web/app/themes/$THEME_SLUG"],
    "config": { "WP_DEBUG": true, "SCRIPT_DEBUG": true }
}
EOF

# 6. Git setup
git init && git add . && git commit -m "Initial project setup"

# 7. Démarrer
npm install && npm start
```

### 4.5 Phase 4 : PRODUCTION (Build the site)

**Objectif** : Construire le site avec les patterns et le contenu.

#### Nouveau `agents/gutenberg-blocks/block-bindings.md`** — Block Bindings API
```
La Block Bindings API change la donne :
- Connecter core/paragraph à un custom field sans code JS
- Connecter core/image à un champ ACF
- Créer des sources de données custom
- Réduire drastiquement le besoin de custom blocks

Exemple :
<!-- wp:paragraph {"metadata":{"bindings":{"content":{"source":"core/post-meta","args":{"key":"subtitle"}}}}} -->
<p></p>
<!-- /wp:paragraph -->

PHP Source custom :
register_block_bindings_source( 'my-plugin/option', array(
    'label' => 'Site Option',
    'get_value_callback' => function( $args ) {
        return get_option( $args['key'] );
    },
) );
```

#### Nouveau `agents/content/content-import.md`** — Import & migration de contenu
```
Couvre :
- WP All Import/Export
- WXR (WordPress eXtended RSS)
- Migration d'autres CMS vers WordPress
- Import de contenu via WP-CLI
- Réécriture de contenu pour Gutenberg blocks

Commandes :
  wp import file.wxr --authors=create
  wp media regenerate --yes
  wp search-replace 'old-domain.com' 'new-domain.com' --all-tables
```

#### Nouveau `agents/gutenberg-blocks/block-hooks.md`** — Block Hooks
```
Insertion automatique de blocks :
- Ajouter un block CTA après chaque post
- Injecter un block newsletter dans le footer
- Conditionnel par template ou post type

register_block_type( 'my-plugin/cta', array(
    'block_hooks' => array(
        'core/post-content' => 'after',
    ),
) );
```

### 4.6 Phase 5 : DEPLOYMENT & GO-LIVE

**Objectif** : Mettre en production de façon fiable.

#### Nouveau `agents/tooling/go-live-checklist.md`** — Checklist de mise en production
```
Checklist automatisée :
□ Performance : Core Web Vitals (LCP < 2.5s, CLS < 0.1)
□ SEO : Redirections en place, sitemap.xml, robots.txt
□ Sécurité : Headers HTTP, SSL, permissions fichiers
□ Backups : Stratégie de backup configurée
□ Monitoring : Uptime monitoring activé
□ DNS : Propagation vérifiée
□ Cache : Configuration CDN/cache validée
□ Emails : Configuration SMTP testée
□ Analytics : Google Analytics / Matomo connecté
□ RGPD : Bandeau cookies, politique de confidentialité
□ 404 : Pages d'erreur personnalisées
□ Favicon : Toutes les tailles

Commandes de vérification :
  wp cache flush
  wp rewrite flush
  wp cron event list
  wp option get blog_public  # Vérifier indexation
```

#### Nouveau `agents/tooling/migration-live.md`** — Migration de site
```
Processus de migration :
1. Export base de données production
2. Search-replace des URLs
3. Sync des uploads
4. Vérification des redirections
5. DNS switch
6. Vérification post-migration
7. Monitoring 48h

Scripts automatisés pour chaque étape.
```

---

## 5. Outils manquants à intégrer en priorité

### Priorité 1 (Impact maximum)

| Outil/Feature | Pourquoi | Agent recommandé |
|---------------|----------|-----------------|
| **Block Bindings API** | Réduit le besoin de custom blocks de 60-70% | `gutenberg-blocks/block-bindings.md` |
| **wp-now / Playground** | Dev 10x plus rapide, previews PR | `tooling/wp-playground.md` |
| **Workflow end-to-end** | L'utilisateur ne sait pas par où commencer | `site-creation-workflow.md` (nouvel orchestrateur) |
| **Content migration** | Cas d'usage le plus fréquent (refonte) | `content/content-import.md` |

### Priorité 2 (Valeur ajoutée forte)

| Outil/Feature | Pourquoi | Agent recommandé |
|---------------|----------|-----------------|
| **Block Hooks** | Injection automatique de blocks | `gutenberg-blocks/block-hooks.md` |
| **Go-live checklist** | Éviter les oublis de mise en prod | `tooling/go-live-checklist.md` |
| **Trellis** | Complète Bedrock pour le deploy pro | `tooling/trellis-deploy.md` |
| **Data Views** | Admin custom moderne | `gutenberg-blocks/data-views.md` |

### Priorité 3 (Nice to have)

| Outil/Feature | Pourquoi | Agent recommandé |
|---------------|----------|-----------------|
| **WPGraphQL** | Headless WordPress | `headless/wpgraphql.md` |
| **Font Library API** | Gestion polices centralisée | Enrichir `design-tokens.md` |
| **Section Styles** | Styles scopés | Enrichir `style-engine.md` |
| **Pattern Overrides** | Personnalisation de synced patterns | Enrichir `templates-patterns.md` |
| **MCP Server WP** | Contrôle WP depuis Claude Code | Nouveau projet séparé |

---

## 6. Proposition de nouveau workflow : `/wp-create-site`

### Concept : Un skill de type commande qui orchestre tout le processus

```
/wp-create-site "Mon Projet Client"
```

Ce skill devrait :

1. **Poser les questions clés** (type de projet, stack, fonctionnalités)
2. **Scaffolder automatiquement** (Bedrock + theme + plugin + config)
3. **Configurer le dev local** (wp-env ou wp-now)
4. **Préparer le pipeline CI/CD** (GitHub Actions)
5. **Générer la structure du thème** avec theme.json de base

### Concept : `/wp-redesign-site`

Pour les refontes :

1. **Auditer le site existant** via WP-CLI
2. **Exporter le contenu** (WXR + base de données)
3. **Analyser la structure** (CPT, taxonomies, plugins)
4. **Créer le plan de migration** (mapping ancien → nouveau)
5. **Exécuter la migration** avec scripts automatisés
6. **Vérifier** avec la go-live checklist

---

## 7. Recommandations structurelles

### 7.1 Réorganisation proposée du skill

```
wordpress-gutenberg-expert/
├── SKILL.md                          # Orchestrateur principal (existant, enrichi)
│
├── agents/
│   ├── wp-core/                      # (existant, OK)
│   ├── gutenberg-blocks/             # (existant, enrichi)
│   │   ├── custom-blocks.md
│   │   ├── block-variations.md
│   │   ├── block-styles.md
│   │   ├── data-stores.md
│   │   ├── block-bindings.md         # NOUVEAU
│   │   ├── block-hooks.md            # NOUVEAU
│   │   ├── data-views.md             # NOUVEAU
│   │   └── orchestrator.md
│   │
│   ├── theme/                        # (existant, enrichi)
│   │   └── ... (ajouter Font Library, Section Styles)
│   │
│   ├── tooling/                      # (existant, enrichi)
│   │   ├── wp-playground.md          # NOUVEAU
│   │   ├── go-live-checklist.md      # NOUVEAU
│   │   ├── trellis-deploy.md         # NOUVEAU
│   │   ├── migration-live.md         # NOUVEAU
│   │   └── ...
│   │
│   ├── content/                      # NOUVEAU DOMAINE
│   │   ├── content-import.md         # NOUVEAU
│   │   ├── content-inventory.md      # NOUVEAU
│   │   └── orchestrator.md           # NOUVEAU
│   │
│   ├── discovery/                    # NOUVEAU DOMAINE
│   │   ├── site-audit.md             # NOUVEAU
│   │   └── orchestrator.md           # NOUVEAU
│   │
│   ├── headless/                     # NOUVEAU DOMAINE (P3)
│   │   ├── wpgraphql.md             # NOUVEAU
│   │   ├── faust-nextjs.md          # NOUVEAU
│   │   └── orchestrator.md           # NOUVEAU
│   │
│   ├── design/                       # (existant, enrichi)
│   │   ├── figma-to-wp.md           # NOUVEAU
│   │   └── ...
│   │
│   ├── testing/                      # (existant, OK)
│   └── ... (experts directs OK)
│
├── workflows/                        # NOUVEAU
│   ├── create-site.md               # Workflow création
│   ├── redesign-site.md             # Workflow refonte
│   └── deploy-site.md               # Workflow déploiement
│
└── scripts/                          # NOUVEAU (enrichi)
    ├── create-wp-site.sh            # Script de scaffolding complet
    ├── audit-site.sh                # Script d'audit
    ├── migrate-content.sh           # Script de migration
    └── go-live-check.sh             # Script de vérification go-live
```

### 7.2 Nombre total d'agents après enrichissement

| Catégorie | Avant | Après | Nouveaux |
|-----------|-------|-------|----------|
| WP Core | 6 | 6 | 0 |
| Gutenberg Blocks | 4 | 7 | 3 (bindings, hooks, data-views) |
| Theme | 4 | 4 | 0 (enrichissement) |
| Tooling | 12 | 16 | 4 (playground, go-live, trellis, migration) |
| Design | 2 | 3 | 1 (figma-to-wp) |
| Testing | 3 | 3 | 0 |
| Content | 0 | 2 | 2 (import, inventory) |
| Discovery | 0 | 1 | 1 (site-audit) |
| Headless | 0 | 2 | 2 (wpgraphql, faust) |
| Experts | 5 | 5 | 0 |
| **Total** | **36** | **49** | **13** |

---

## 8. Synthèse des actions

### Actions immédiates (Sprint 1)

1. Créer `agents/gutenberg-blocks/block-bindings.md` — Impact maximal sur l'efficience
2. Créer `agents/tooling/wp-playground.md` — Modernisation du dev local
3. Créer `workflows/create-site.md` — Orchestrateur de création de site
4. Enrichir `agents/tooling/project-init.md` — Script de scaffolding complet

### Actions court terme (Sprint 2)

5. Créer `agents/discovery/site-audit.md` — Pour les refontes
6. Créer `agents/content/content-import.md` — Migration de contenu
7. Créer `agents/tooling/go-live-checklist.md` — Mise en production fiable
8. Créer `workflows/redesign-site.md` — Orchestrateur de refonte

### Actions moyen terme (Sprint 3)

9. Créer `agents/gutenberg-blocks/block-hooks.md`
10. Créer `agents/tooling/trellis-deploy.md`
11. Créer `agents/design/figma-to-wp.md`
12. Enrichir les agents existants (Font Library, Data Views, Section Styles)

### Actions long terme (Sprint 4)

13. Créer `agents/headless/wpgraphql.md` et `faust-nextjs.md`
14. Créer un MCP Server WordPress pour le contrôle direct depuis Claude Code
15. Explorer l'intégration WordPress Playground API pour les previews automatiques

---

## 9. Conclusion

Le skill `wordpress-gutenberg-expert` existant est une **base solide** avec une excellente couverture des fondamentaux WordPress et Gutenberg. Les lacunes principales se situent sur :

1. **Les APIs modernes** (Block Bindings, Block Hooks, Data Views) — qui changent fondamentalement la façon de développer avec WordPress
2. **L'absence de workflows end-to-end** — création et refonte de site guidées
3. **Les outils de nouvelle génération** (wp-now, WordPress Playground) — qui accélèrent drastiquement le développement
4. **Le processus de migration/refonte** — le cas d'usage le plus fréquent en agence

En ajoutant 13 nouveaux agents et 3 workflows orchestrateurs, le skill deviendrait un outil véritablement complet pour piloter des projets WordPress de A à Z, de la découverte au go-live.

---

## 10. Contexte marché et données clés (2025-2026)

### 10.1 Adoption FSE

- **+145% d'adoption** des block themes en 2025
- **500+ block themes** dans le répertoire WordPress (vs 78 début 2023)
- **75% des nouveaux thèmes** utilisent les capacités FSE

### 10.2 Écosystème d'outils convergent vers Playground

```
                    WordPress Playground (WASM)
                    /        |         \
                   /         |          \
              wp-now    wp-env runtime    Studio
              (CLI)     (sans Docker)     (GUI)
```

L'écosystème converge vers **Playground comme fondation technique** :
- **wp-now** (et son successeur `@wp-playground/cli`) pour le dev ultra-rapide
- **wp-env** intègre désormais Playground comme runtime alternatif (fév 2026)
- **Studio** est construit sur Playground avec GUI + IA intégrée

**Décision architecturale clé** : SQLite (Playground, rapide, portable) vs MySQL (Docker wp-env, parité production)

### 10.3 Block Libraries les plus performantes

| Plugin | Installs | Approche | Performance |
|--------|----------|----------|-------------|
| **Spectra** | 1M+ | Feature-rich, motion effects | Bonne |
| **Kadence Blocks** | 400K+ | All-in-one, WCAG 2.2 | Excellente |
| **GenerateBlocks** | 200K+ | Minimaliste (6 blocs), ultra-léger | Excellente |
| **GreenShift** | 50K+ | Flexbox/Grid CSS natif, animations | Bonne |

**Recommandation** : Gutenberg natif + Kadence ou GenerateBlocks est le stack recommandé pour les nouveaux projets (vs page builders).

### 10.4 Page Builders vs Gutenberg en 2026

| Scénario | Recommandation |
|----------|---------------|
| Sites content-focused, blogs | **Gutenberg natif** |
| Performance-critical | **Gutenberg + Kadence/GenerateBlocks** |
| Pages marketing complexes | Elementor (mais en perte de terrain) |
| Agence / handoff client | **Gutenberg** (pérennité) ou Beaver Builder |
| Nouveaux projets long terme | **Gutenberg** (les page builders ajoutent une couche d'abstraction = refonte pas refactoring) |

### 10.5 WordPress Telex (à surveiller)

Annoncé à WordCamp US 2025, **WordPress Telex** est une initiative pour la génération de blocks en langage naturel. Cela pourrait transformer la création de contenu et de patterns. À intégrer dans nos workflows quand l'API sera disponible.
