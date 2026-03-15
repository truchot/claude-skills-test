---
name: wordpress-expert
description: >-
  Expert WordPress et Gutenberg pour themes, plugins et blocks. TRIGGER when: functions.php, block.json, wp-content detected in project.
---

## Domaines d'expertise

- **Gutenberg Blocks** : creation de blocks, variations, styles, data stores, Block Bindings API, Block Hooks, DataViews (voir [gutenberg-blocks.md](./gutenberg-blocks.md))
- **Theme Development** : block themes, theme.json, templates, patterns, Style Engine, Interactivity API (voir [theme-development.md](./theme-development.md))
- **WP REST API** : endpoints custom, WP_REST_Controller, schema, api-fetch, authentification (voir [wp-rest-api.md](./wp-rest-api.md))
- **WP Security** : nonces, sanitization, escaping, CSRF, XSS, SQL injection (voir [wp-security.md](./wp-security.md))
- **WP Core** : CPT, taxonomies, roles, capabilities, meta, hooks/filters
- **Tooling** : wp-env, WP-CLI, @wordpress/scripts, Bedrock, Trellis
- **Testing** : PHPUnit + WP_UnitTestCase, Jest, Playwright e2e

## Patterns essentiels

### Block Development
- Toujours utiliser `block.json` pour la registration (jamais PHP seul)
- `registerBlockType()` pour blocks custom, `registerBlockVariation()` pour variantes fonctionnelles
- `registerBlockStyle()` uniquement pour variantes CSS pures
- Utiliser `useSelect()`/`useDispatch()` pour le state management Gutenberg
- Block Bindings API (WP 6.5+) pour lier blocks natifs a des post-meta sans code custom
- Block Hooks pour injection automatique dans templates

### Theme Architecture
- Toujours block theme (FSE) sauf contrainte legacy
- `theme.json` pour settings (couleurs, typo, spacing) et styles globaux
- Templates HTML dans `/templates/`, template parts dans `/parts/`
- Patterns PHP dans `/patterns/` avec header de registration
- Style Engine pour generation CSS optimisee
- Interactivity API pour accordions, tabs, modals (pas de jQuery)

### REST API
- Toujours `permission_callback` sur chaque endpoint
- Utiliser `WP_REST_Controller` pour les endpoints complexes
- Schema JSON pour validation automatique des args
- `register_rest_field()` pour enrichir les endpoints natifs
- `api-fetch` cote client avec middleware nonce

### WP Core
- `register_post_type()` avec `show_in_rest => true` pour Gutenberg
- Hooks : `add_action()` / `add_filter()` avec priorite explicite
- Nonces obligatoires pour formulaires et actions
- Sanitize input, escape output, validate data

## Anti-patterns critiques

- **Ne jamais** hardcoder des credentials dans wp-config.php (utiliser `.env`)
- **Ne jamais** utiliser `$wpdb->query()` sans `$wpdb->prepare()`
- **Ne jamais** echo des donnees sans escaping (`esc_html()`, `esc_attr()`, `wp_kses()`)
- **Ne jamais** utiliser `__return_true` comme `permission_callback` en production
- **Ne jamais** enregistrer des blocks uniquement en PHP (toujours block.json)
- **Ne jamais** utiliser jQuery dans un block theme (Interactivity API ou vanilla JS)
- **Ne jamais** modifier le core WordPress ou les fichiers de plugins tiers
- **Ne jamais** desactiver `DISALLOW_FILE_EDIT` en production

## Escalation

- **Architecture infra** : deleguer a `devops` pour Docker, CI/CD, Kubernetes
- **SEO technique** : deleguer a `seo-expert` pour sitemaps, schema.org, meta tags
- **Securite avancee** : deleguer a `security-expert` pour audits OWASP, pentests
- **Design/UX** : deleguer a `ux-ui-design` pour maquettes, wireframes, prototypes
- **Performance web** : deleguer a `seo-expert` pour Core Web Vitals
- **Decisions strategiques** : escalader vers le lead technique pour choix d'architecture
