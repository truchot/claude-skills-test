---
name: go-live-checklist
description: Go-Live Checklist Expert - Mise en production fiable d'un site WordPress
workflows:
  - id: wp-go-live
    template: wf-creation
    phase: Production
    name: Mise en production WordPress
    duration: 0.5 jour
---

# Go-Live Checklist Expert

Tu es un expert spécialisé dans la mise en production de sites WordPress.

## Rôle de cet Agent

> **Ce que tu fais** : Checklist complète et vérifications automatisées pour le go-live
> **Ce que tu ne fais pas** :
> - Configuration serveur → `deployment-ssh`
> - CI/CD pipeline → `cicd-pipelines`
> - Migration de contenu → `content/content-import`
> - Audit SEO approfondi → `seo-expert`

## Script de vérification automatisé

```bash
#!/bin/bash
# scripts/go-live-check.sh
# Usage: ./go-live-check.sh <site-url> [wp-cli-prefix]

SITE_URL=${1:?'URL du site requis'}
WP="${2:-wp}"
ERRORS=0
WARNINGS=0

echo "=== Go-Live Checklist — $SITE_URL ==="
echo ""

check_pass() { echo "  ✓ $1"; }
check_fail() { echo "  ✗ $1"; ERRORS=$((ERRORS + 1)); }
check_warn() { echo "  ⚠ $1"; WARNINGS=$((WARNINGS + 1)); }

# ─── 1. WordPress ───
echo "── WordPress ──"

# Debug désactivé
WP_DEBUG=$($WP eval "echo WP_DEBUG ? 'true' : 'false';" 2>/dev/null)
[ "$WP_DEBUG" = "false" ] && check_pass "WP_DEBUG désactivé" || check_fail "WP_DEBUG est activé en production !"

# Indexation activée
BLOG_PUBLIC=$($WP option get blog_public 2>/dev/null)
[ "$BLOG_PUBLIC" = "1" ] && check_pass "Indexation activée" || check_fail "Indexation DÉSACTIVÉE (blog_public=0)"

# Permaliens configurés
PERMALINK=$($WP option get permalink_structure 2>/dev/null)
[ -n "$PERMALINK" ] && check_pass "Permaliens configurés ($PERMALINK)" || check_fail "Permaliens par défaut (?p=ID)"

# Pas d'utilisateur 'admin'
ADMIN_EXISTS=$($WP user get admin --field=ID 2>/dev/null)
[ -z "$ADMIN_EXISTS" ] && check_pass "Pas d'utilisateur 'admin'" || check_warn "L'utilisateur 'admin' existe (risque sécurité)"

# Plugins de dev désactivés
for PLUGIN in query-monitor debug-bar developer; do
    STATUS=$($WP plugin status $PLUGIN 2>/dev/null | grep "Status:" | awk '{print $2}')
    [ "$STATUS" = "Active" ] && check_warn "Plugin de dev actif : $PLUGIN"
done

echo ""

# ─── 2. Sécurité ───
echo "── Sécurité ──"

# HTTPS
if curl -sI "$SITE_URL" | grep -qi "strict-transport-security"; then
    check_pass "HSTS header présent"
else
    check_warn "HSTS header manquant"
fi

# SSL
if curl -sI "$SITE_URL" | head -1 | grep -q "200\|301\|302"; then
    check_pass "Site accessible en HTTPS"
else
    check_fail "Site non accessible"
fi

# X-Frame-Options ou CSP
if curl -sI "$SITE_URL" | grep -qi "x-frame-options\|content-security-policy"; then
    check_pass "Protection clickjacking présente"
else
    check_warn "Protection clickjacking manquante"
fi

# File editing
DISALLOW=$($WP eval "echo defined('DISALLOW_FILE_EDIT') && DISALLOW_FILE_EDIT ? 'true' : 'false';" 2>/dev/null)
[ "$DISALLOW" = "true" ] && check_pass "Édition de fichiers désactivée" || check_warn "DISALLOW_FILE_EDIT non défini"

echo ""

# ─── 3. Performance ───
echo "── Performance ──"

# Cache
if $WP plugin is-active wp-super-cache 2>/dev/null || \
   $WP plugin is-active w3-total-cache 2>/dev/null || \
   $WP plugin is-active litespeed-cache 2>/dev/null || \
   $WP plugin is-active wp-fastest-cache 2>/dev/null; then
    check_pass "Plugin de cache actif"
else
    check_warn "Aucun plugin de cache détecté"
fi

# Transients expirés
EXPIRED=$($WP transient list --format=count 2>/dev/null)
[ "${EXPIRED:-0}" -lt 100 ] && check_pass "Transients OK ($EXPIRED)" || check_warn "Beaucoup de transients ($EXPIRED)"

echo ""

# ─── 4. SEO ───
echo "── SEO ──"

# Sitemap
SITEMAP_STATUS=$(curl -sI "${SITE_URL}/sitemap.xml" | head -1 | awk '{print $2}')
[ "$SITEMAP_STATUS" = "200" ] && check_pass "sitemap.xml accessible" || check_warn "sitemap.xml non trouvé"

# Robots.txt
ROBOTS_STATUS=$(curl -sI "${SITE_URL}/robots.txt" | head -1 | awk '{print $2}')
[ "$ROBOTS_STATUS" = "200" ] && check_pass "robots.txt accessible" || check_warn "robots.txt non trouvé"

# Favicon
FAVICON_STATUS=$(curl -sI "${SITE_URL}/favicon.ico" | head -1 | awk '{print $2}')
[ "$FAVICON_STATUS" = "200" ] && check_pass "favicon.ico accessible" || check_warn "favicon.ico manquant"

echo ""

# ─── 5. Contenu ───
echo "── Contenu ──"

# Page d'accueil définie
SHOW_ON_FRONT=$($WP option get show_on_front 2>/dev/null)
if [ "$SHOW_ON_FRONT" = "page" ]; then
    FRONT_PAGE=$($WP option get page_on_front 2>/dev/null)
    check_pass "Page d'accueil définie (ID: $FRONT_PAGE)"
else
    check_warn "Page d'accueil = derniers articles (pas une page statique)"
fi

# Page 404
HTTP_404=$(curl -sI "${SITE_URL}/page-qui-nexiste-pas-12345" | head -1 | awk '{print $2}')
[ "$HTTP_404" = "404" ] && check_pass "Page 404 fonctionnelle" || check_warn "Page 404 non standard (HTTP $HTTP_404)"

# Formulaires
# (vérification manuelle recommandée)
check_warn "Vérifier manuellement : formulaires de contact fonctionnels"

echo ""

# ─── 6. Email ───
echo "── Email ──"

# SMTP configuré (vérification basique)
if $WP plugin is-active wp-mail-smtp 2>/dev/null || \
   $WP plugin is-active fluent-smtp 2>/dev/null || \
   $WP plugin is-active post-smtp 2>/dev/null; then
    check_pass "Plugin SMTP actif"
else
    check_warn "Aucun plugin SMTP détecté (emails via PHP mail)"
fi

echo ""

# ─── 7. RGPD ───
echo "── RGPD ──"

# Page de politique de confidentialité
PRIVACY_PAGE=$($WP option get wp_page_for_privacy_policy 2>/dev/null)
[ -n "$PRIVACY_PAGE" ] && [ "$PRIVACY_PAGE" != "0" ] && \
    check_pass "Page de confidentialité définie (ID: $PRIVACY_PAGE)" || \
    check_warn "Page de confidentialité non définie"

echo ""

# ─── 8. Backup ───
echo "── Backup ──"

if $WP plugin is-active updraftplus 2>/dev/null || \
   $WP plugin is-active backwpup 2>/dev/null || \
   $WP plugin is-active duplicator 2>/dev/null; then
    check_pass "Plugin de backup actif"
else
    check_warn "Aucun plugin de backup détecté"
fi

echo ""

# ─── Résumé ───
echo "═══════════════════════════════"
echo "  Erreurs   : $ERRORS"
echo "  Warnings  : $WARNINGS"
echo "═══════════════════════════════"

if [ $ERRORS -eq 0 ]; then
    echo "  → Prêt pour le go-live (résoudre les warnings recommandé)"
else
    echo "  → BLOQUÉ : $ERRORS erreur(s) à corriger avant go-live"
fi
```

## Checklist manuelle complémentaire

### Avant le go-live

- [ ] **DNS** : Entrées A/CNAME configurées, TTL réduit à 300s 48h avant
- [ ] **SSL** : Certificat valide et auto-renouvelé (Let's Encrypt)
- [ ] **Redirections** : Anciennes URLs redirigées en 301
- [ ] **Analytics** : Google Analytics / Matomo installé et vérifié
- [ ] **Search Console** : Site ajouté à Google Search Console
- [ ] **Favicon** : Toutes les tailles (favicon.ico, apple-touch-icon, etc.)
- [ ] **Open Graph** : Meta tags OG configurés pour le partage social
- [ ] **Emails transactionnels** : SMTP testé (formulaire contact, inscription)
- [ ] **Backup** : Premier backup complet effectué
- [ ] **Monitoring** : Uptime monitoring configuré (UptimeRobot, Pingdom)

### Le jour du go-live

- [ ] **DNS switch** : Modifier les entrées DNS
- [ ] **Vérification SSL** : Certificat reconnu par les navigateurs
- [ ] **Cache flush** : `wp cache flush && wp rewrite flush`
- [ ] **Vérification visuelle** : Pages principales OK
- [ ] **Formulaires** : Test d'envoi réel
- [ ] **Liens internes** : Pas de 404 sur les liens principaux
- [ ] **Images** : Pas de broken images
- [ ] **Mobile** : Test sur mobile réel

### Après le go-live (48h)

- [ ] **Indexation** : Vérifier `blog_public = 1`
- [ ] **Sitemap** : Soumettre dans Search Console
- [ ] **Analytics** : Données qui remontent
- [ ] **Uptime** : Monitoring sans alerte
- [ ] **Performance** : Core Web Vitals dans les limites
- [ ] **Backup** : Vérifier que le backup automatique fonctionne
- [ ] **Cron** : Tâches planifiées fonctionnelles

## Livrables

| Livrable | Description |
|----------|-------------|
| Go-live script | Script de vérification automatisée |
| Checklist | Checklist complète avant/pendant/après go-live |
| Verification report | Rapport de vérification avec résultats |
| Rollback plan | Plan de rollback en cas de problème |
