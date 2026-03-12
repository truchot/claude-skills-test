---
name: redesign-site
description: Workflow de refonte de site WordPress existant
---

# Workflow : Refonte de Site WordPress

Pipeline de refonte complète d'un site WordPress existant vers une architecture moderne (Block Theme + Bedrock).

## Vue d'ensemble

```
Phase 1          Phase 2           Phase 3           Phase 4          Phase 5
AUDIT            DESIGN            SCAFFOLDING       MIGRATION        GO-LIVE

┌──────────┐    ┌──────────┐     ┌──────────┐     ┌──────────┐    ┌──────────┐
│ Inventaire│───▶│ Nouveau  │───▶│ Nouveau   │───▶│ Contenu  │───▶│ DNS      │
│ Plugins  │    │ Design   │    │ Thème     │    │ Médias   │    │ Redirect │
│ Contenu  │    │ System   │    │ Infra     │    │ SEO      │    │ Monitor  │
│ Perf     │    │ Mapping  │    │ Dev env   │    │ Tests    │    │ Backup   │
└──────────┘    └──────────┘     └──────────┘     └──────────┘    └──────────┘

Agents :         Agents :          Agents :          Agents :       Agents :
• site-audit     • design-tokens   • project-init    • content-     • go-live-
• seo-expert     • block-theme     • bedrock-setup     import         checklist
                                   • repository-     • seo-expert   • deployment-
                                     setup                            ssh
                                   • wp-playground
```

## Phase 1 : Audit du site existant

### Agent principal : `discovery/site-audit`

```bash
# Exécuter l'audit complet
./scripts/audit-site.sh "ssh user@old-server 'cd /var/www/site && wp'"
```

### Analyse technique

```bash
# Inventaire du contenu
wp post list --post_type=page --fields=ID,post_title,post_parent,menu_order --format=table
wp post list --post_type=post --format=count
wp post-type list --fields=name,label,count --format=table

# Plugins et dépendances
wp plugin list --fields=name,status,version,update --format=table

# Stack technique
wp core version
wp eval 'echo phpversion();'
wp option get template
wp option get stylesheet

# Performance baseline
# Capturer les Core Web Vitals via PageSpeed Insights API ou Lighthouse CLI
npx lighthouse https://old-site.com --output=json --output-path=./audit/lighthouse.json

# SEO : vérifier robots.txt, sitemap, meta tags
curl -s https://old-site.com/robots.txt
curl -s https://old-site.com/sitemap.xml | head -20
```

### Catégorisation des plugins

| Catégorie | Action | Exemples |
|-----------|--------|----------|
| **Garder** | Installer sur le nouveau site | WooCommerce, Gravity Forms, WPML |
| **Remplacer** | Alternative native/moderne | Page builder → Gutenberg patterns |
| **Supprimer** | Plus nécessaire | Plugins de compatibilité, doublons |
| **Intégrer** | Fonctionnalité dans le thème/plugin custom | Shortcodes custom → blocks |

### Livrables Phase 1

- [ ] Inventaire complet du contenu (pages, articles, CPT, médias)
- [ ] Liste des plugins avec catégorisation (garder/remplacer/supprimer)
- [ ] Performance baseline (Core Web Vitals via Lighthouse)
- [ ] Arborescence du site documentée
- [ ] Dépendances critiques identifiées (WooCommerce, ACF, WPML, etc.)
- [ ] Export WXR + dump SQL du site source
- [ ] Mapping shortcodes/widgets existants → équivalents Gutenberg

## Phase 2 : Design du nouveau site

### Agents : `design/figma-to-wp` + `design/design-tokens` + `theme/block-theme`

Si une maquette Figma est disponible, utiliser le pipeline `figma-to-wp` pour l'extraction des design tokens via Tokens Studio.

### Mapping ancien → nouveau

| Ancien | Nouveau | Action |
|--------|---------|--------|
| Page builder (Elementor) | Block patterns natifs | Recréer les layouts |
| Shortcodes | Blocks natifs + bindings | Convertir |
| Widgets sidebar | Template parts | Migrer |
| Custom page templates PHP | Templates HTML FSE | Recréer |
| CSS custom lourd | theme.json + style engine | Simplifier |

### Livrables Phase 2

- [ ] theme.json complet avec design tokens
- [ ] Mapping composants ancien → nouveau
- [ ] Liste des patterns à créer
- [ ] Liste des blocks custom nécessaires (si Block Bindings ne suffit pas)

## Phase 3 : Scaffolding du nouveau site

### Utiliser le workflow `create-site`

Suivre le workflow `workflows/create-site.md` pour créer l'infrastructure du nouveau site.

### Points spécifiques à la refonte

```bash
# Configurer l'environnement pour importer le contenu existant
# dans .wp-env.json, ajouter le mapping uploads :
{
    "mappings": {
        "wp-content/uploads": "./uploads-from-old-site"
    }
}
```

## Phase 4 : Migration du contenu

### Agent principal : `content/content-import`

### Étapes

```bash
# 1. Importer la base de données
wp db import old-site-backup.sql

# 2. Search-replace des URLs
wp search-replace 'https://ancien-site.com' 'http://localhost:8888' --all-tables

# 3. Synchroniser les uploads
rsync -av user@old-server:/var/www/site/wp-content/uploads/ ./uploads/

# 4. Régénérer les thumbnails
# ⚠️ Sur les gros sites (10k+ médias), exécuter dans screen/tmux
wp media regenerate --yes

# 5. Convertir le contenu classique en blocks (si nécessaire)
wp convert-to-blocks --post-type=page
wp convert-to-blocks --post-type=post

# 6. Flush
wp cache flush
wp rewrite flush
```

### Redirections SEO

```bash
# Générer la liste des anciennes URLs
wp post list --post_type=page,post --fields=ID,post_name,guid --format=csv > urls.csv

# Comparer les anciennes et nouvelles URLs pour détecter les changements
# diff old-urls.csv new-urls.csv

# Créer les redirections si les slugs changent
# Option A : Plugin Redirection (GUI pour le client)
wp plugin install redirection --activate

# Option B : mu-plugin pour les redirections statiques (plus performant)
cat > wp-content/mu-plugins/redirections.php << 'PHPEOF'
<?php
add_action( 'template_redirect', function() {
    $redirects = array(
        '/ancien-slug/' => '/nouveau-slug/',
    );
    $request = sanitize_text_field( strtok( $_SERVER['REQUEST_URI'], '?' ) );
    if ( isset( $redirects[ $request ] ) ) {
        wp_redirect( home_url( $redirects[ $request ] ), 301 );
        exit;
    }
} );
PHPEOF
```

### Vérification post-migration

```bash
# Scanner les liens cassés
wp eval-file check-links.php

# Vérifier les images manquantes
wp db query "SELECT ID, guid FROM wp_posts WHERE post_type='attachment'" --skip-column-names | while read id url; do
    curl -sI "$url" | head -1 | grep -q "200" || echo "BROKEN: $id $url"
done
```

### Livrables Phase 4

- [ ] Contenu importé et vérifié
- [ ] Médias synchronisés
- [ ] Redirections 301 en place
- [ ] Liens internes mis à jour
- [ ] Contenu classique converti en blocks
- [ ] Formulaires reconfigurés
- [ ] Tests visuels passés (pages principales)

## Phase 5 : Go-Live

### Agent principal : `tooling/go-live-checklist`

```bash
# Exécuter la checklist automatisée
./scripts/go-live-check.sh https://nouveau-site.com "ssh user@server 'cd /var/www && wp'"
```

### Timeline go-live type

| Quand | Action |
|-------|--------|
| J-7 | Staging validé par le client |
| J-2 | Réduire le TTL DNS à 300s |
| J-1 | Backup final du site existant + nouveau |
| J-0 08:00 | Freeze du contenu sur l'ancien site |
| J-0 08:30 | Migration finale du contenu (delta) |
| J-0 09:00 | Switch DNS |
| J-0 09:30 | Vérification SSL + pages principales |
| J-0 10:00 | Vérification formulaires + emails |
| J-0 12:00 | Soumettre sitemap dans Search Console |
| J+1 | Vérifier analytics et monitoring |
| J+2 | Restaurer TTL DNS normal (3600s+) |
| J+7 | Vérifier indexation Google |
| J+30 | Supprimer l'ancien site |

## Rollback

En cas de problème critique :

```bash
# 1. Remettre le DNS vers l'ancien serveur
# (effet en ~5min si TTL était à 300s)

# 2. Si le DNS a déjà propagé :
# Sur le nouveau serveur, rediriger tout vers l'ancien
# Dans wp-config.php ou .htaccess :
# Redirect 302 / https://ancien-site.com/
```

## Livrables finaux

| Livrable | Description |
|----------|-------------|
| Nouveau site | Site WordPress refait en block theme moderne |
| Migration report | Rapport de migration avec statistiques |
| Redirections | Fichier de redirections 301 actif |
| Go-live report | Rapport de vérification go-live |
| Rollback plan | Plan de retour arrière documenté |
| Post-migration monitoring | Monitoring 30 jours post-lancement |
