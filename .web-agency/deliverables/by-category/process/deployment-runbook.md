---
id: deployment-runbook
name: Runbook de Déploiement
version: 1.0.0
category: process
status: active
phase: "5-deploiement"
order: 4
agents:
  - devops/deployment/strategies
  - devops/deployment/rollback
consumes:
  - ci-pipeline
  - environment-setup
  - monitoring-setup
produces_for:
  - support-client/resolution/technical-support
  - direction-technique/support/gestion-incidents
tags: [deployment, runbook, devops, production, release]
---

# Runbook de Déploiement

## Description

Guide opérationnel détaillé pour le déploiement en production. Inclut les étapes de déploiement, les vérifications, les procédures de rollback et les contacts d'escalade.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown |
| **Emplacement** | `docs/runbooks/deployment.md` |
| **Nommage** | `deployment.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Prérequis** - Conditions avant déploiement
- [ ] **Checklist pré-déploiement** - Vérifications
- [ ] **Étapes de déploiement** - Procédure pas à pas
- [ ] **Vérifications post-déploiement** - Smoke tests
- [ ] **Procédure de rollback** - Retour arrière
- [ ] **Contacts d'escalade** - Qui appeler

### Sections Optionnelles

- [ ] **Fenêtre de maintenance** - Horaires préférés
- [ ] **Dépendances** - Services impactés
- [ ] **Communication** - Templates d'annonce
- [ ] **Historique** - Déploiements passés

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Procédure testée | Au moins 1 déploiement réussi | Manuel | Oui |
| 2 | Rollback documenté | Temps < 5 min | Manuel | Oui |
| 3 | Contacts à jour | Tous joignables | Manuel | Oui |
| 4 | Checklist complète | 100% items | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `devops/cicd/*` | `ci-pipeline` | Pipeline automatisé |
| `devops/monitoring/*` | `monitoring-setup` | Alerting configuré |
| `web-dev-process/*` | `environment-setup` | Environnements prêts |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Go/No-Go | Tech Lead | Reporter |
| 2 | Post-deploy | DevOps | Rollback si nécessaire |
| 3 | 24h après | On-call | Monitoring continu |

## Exemple

### Exemple Complet

```markdown
# 🚀 Runbook de Déploiement
## E-commerce Artisanat - Production

---

## 📋 Informations Générales

| Attribut | Valeur |
|----------|--------|
| **Application** | E-commerce Artisanat |
| **URL Production** | https://www.artisanat-dupont.fr |
| **URL Staging** | https://staging.artisanat-dupont.fr |
| **Hébergement** | Vercel |
| **Base de données** | Neon PostgreSQL |
| **CDN** | Cloudflare |
| **Dernière mise à jour** | 2024-02-15 |

---

## 👥 Contacts d'Escalade

### Niveau 1 - Équipe Technique

| Rôle | Nom | Téléphone | Disponibilité |
|------|-----|-----------|---------------|
| DevOps Lead | Antoine Moreau | +33 6 XX XX XX XX | 9h-19h |
| Lead Dev | Thomas Bernard | +33 6 XX XX XX XX | 9h-19h |

### Niveau 2 - Management

| Rôle | Nom | Téléphone | Disponibilité |
|------|-----|-----------|---------------|
| CTO | Jean-Pierre Martin | +33 6 XX XX XX XX | Urgences uniquement |
| Chef de projet | Marie Martin | +33 6 XX XX XX XX | 9h-18h |

### Niveau 3 - Fournisseurs

| Service | Support | Contact |
|---------|---------|---------|
| Vercel | support@vercel.com | https://vercel.com/support |
| Neon | support@neon.tech | https://neon.tech/docs |
| Stripe | support@stripe.com | https://stripe.com/docs |

---

## ⏰ Fenêtre de Déploiement

### Horaires Recommandés

| Jour | Horaire | Risque |
|------|---------|--------|
| Mardi - Jeudi | 10h-12h | 🟢 Faible |
| Mardi - Jeudi | 14h-16h | 🟢 Faible |
| Lundi | 14h-16h | 🟡 Moyen |
| Vendredi | - | 🔴 À éviter |
| Week-end | - | 🔴 Interdit |

### Périodes à Éviter

- ❌ Vendredi après 14h (pas de support week-end)
- ❌ Veille de jours fériés
- ❌ Black Friday / Noël (gel des déploiements)
- ❌ Pendant une campagne marketing majeure

---

## ✅ Checklist Pré-Déploiement

### J-1 : Préparation

- [ ] **Code review** approuvée par 2 développeurs
- [ ] **Tests CI** passent sur la branche `main`
- [ ] **Tests E2E** passent en staging
- [ ] **Coverage** ≥ 80%
- [ ] **Changelog** mis à jour
- [ ] **Release notes** préparées

### H-2 : Vérifications

- [ ] **Staging** déployé et testé
- [ ] **Smoke tests** staging OK
- [ ] **Base de données**
  - [ ] Migrations testées en staging
  - [ ] Backup production récent (< 1h)
- [ ] **Monitoring** dashboards ouverts
- [ ] **Communication** équipe prévenue sur Slack

### H-0 : Go/No-Go

| Check | Statut | Responsable |
|-------|--------|-------------|
| CI vert | ⬜ | DevOps |
| Staging OK | ⬜ | QA |
| Backup fait | ⬜ | DevOps |
| Équipe dispo | ⬜ | Lead Dev |
| Client prévenu | ⬜ | CDP |

**Décision** : ⬜ GO / ⬜ NO-GO

---

## 🚀 Procédure de Déploiement

### Étape 1 : Préparation (5 min)

```bash
# 1.1 Vérifier la branche main
git checkout main
git pull origin main

# 1.2 Vérifier le dernier commit
git log -1 --oneline

# 1.3 Vérifier les variables d'environnement
vercel env ls production
```

### Étape 2 : Backup Base de Données (5 min)

```bash
# 2.1 Créer un backup manuel (en plus du backup auto)
# Via Neon Console ou CLI

# 2.2 Noter l'identifiant du backup
echo "Backup ID: neon-backup-$(date +%Y%m%d-%H%M)"

# 2.3 Vérifier le backup
neon branches list
```

### Étape 3 : Déploiement (10 min)

```bash
# 3.1 Déployer via Vercel CLI
vercel --prod

# OU via GitHub (merge to main déclenche le CD)
# Le workflow .github/workflows/cd.yml s'exécute automatiquement

# 3.2 Suivre le déploiement
# https://vercel.com/team/project/deployments
```

### Étape 4 : Vérifications Post-Déploiement (10 min)

#### 4.1 Health Checks

```bash
# API Health
curl -f https://www.artisanat-dupont.fr/api/health
# Expected: {"status":"ok","version":"1.2.3"}

# Homepage
curl -I https://www.artisanat-dupont.fr
# Expected: HTTP/2 200
```

#### 4.2 Smoke Tests Manuels

| Test | URL | Attendu | Statut |
|------|-----|---------|--------|
| Homepage | / | Page charge < 3s | ⬜ |
| Catalogue | /produits | Liste produits visible | ⬜ |
| Fiche produit | /produits/miel-lavande | Images + prix affichés | ⬜ |
| Panier | /panier | Ajout fonctionne | ⬜ |
| Checkout | /checkout | Formulaire accessible | ⬜ |
| Paiement test | /checkout | Stripe charge | ⬜ |

#### 4.3 Monitoring

- [ ] **Vercel Analytics** : Pas d'erreurs 5xx
- [ ] **Sentry** : Pas de nouvelles erreurs
- [ ] **Grafana** : Métriques normales

### Étape 5 : Communication (5 min)

```markdown
# Message Slack #deployments

✅ **Déploiement Production Réussi**

| Info | Valeur |
|------|--------|
| Version | v1.2.3 |
| Commit | abc1234 |
| Heure | 14:30 UTC |
| Déployé par | @antoine |

**Changements :**
- Nouvelle page checkout
- Fix bug panier mobile
- Optimisation images

**Monitoring :** https://grafana.example.com/d/prod
```

---

## 🔙 Procédure de Rollback

### Quand Rollback ?

| Symptôme | Sévérité | Action |
|----------|----------|--------|
| 5xx > 1% des requêtes | 🔴 Critique | Rollback immédiat |
| Paiements échouent | 🔴 Critique | Rollback immédiat |
| Page blanche | 🔴 Critique | Rollback immédiat |
| Lenteur > 5s | 🟠 Haute | Rollback si > 10 min |
| Bug mineur UI | 🟡 Moyenne | Hotfix possible |

### Rollback Vercel (< 2 min)

```bash
# Option 1 : Via CLI
vercel rollback

# Option 2 : Via Dashboard
# 1. Aller sur https://vercel.com/team/project/deployments
# 2. Trouver le déploiement précédent (stable)
# 3. Cliquer "..." > "Promote to Production"
```

### Rollback Base de Données (si migration)

```bash
# 1. Identifier la migration à annuler
prisma migrate status

# 2. Rollback (si migration réversible)
prisma migrate resolve --rolled-back <migration_name>

# 3. OU restaurer depuis backup
# Via Neon Console : Restore branch from backup
```

### Post-Rollback

1. [ ] Vérifier que le site fonctionne
2. [ ] Notifier l'équipe sur Slack
3. [ ] Créer un ticket d'incident
4. [ ] Planifier post-mortem

```markdown
# Message Slack #incidents

⚠️ **Rollback Production Effectué**

| Info | Valeur |
|------|--------|
| Heure rollback | 14:45 UTC |
| Version rollback | v1.2.2 |
| Raison | Erreurs 5xx après déploiement v1.2.3 |
| Effectué par | @antoine |

**Prochaines étapes :**
- [ ] Investigation en cours
- [ ] Post-mortem planifié demain 10h
```

---

## 📊 Métriques à Surveiller

### Dashboard Principal

| Métrique | Seuil Normal | Alerte |
|----------|--------------|--------|
| Error rate | < 0.1% | > 1% |
| P95 latency | < 500ms | > 2s |
| Apdex | > 0.95 | < 0.8 |
| CPU usage | < 70% | > 90% |
| Memory | < 80% | > 95% |

### URLs de Monitoring

| Service | URL |
|---------|-----|
| Vercel Analytics | https://vercel.com/team/project/analytics |
| Sentry | https://sentry.io/organizations/team/issues/ |
| Grafana | https://grafana.example.com/d/prod |
| StatusPage | https://status.example.com |

---

## 📝 Historique des Déploiements

| Date | Version | Déployé par | Statut | Notes |
|------|---------|-------------|--------|-------|
| 2024-02-15 | v1.2.3 | Antoine | ✅ | Nouveau checkout |
| 2024-02-10 | v1.2.2 | Thomas | ✅ | Fix panier |
| 2024-02-05 | v1.2.1 | Antoine | ⚠️ | Rollback après 30min |
| 2024-02-01 | v1.2.0 | Antoine | ✅ | Feature commandes |

---

## 📚 Références

- [Documentation Vercel](https://vercel.com/docs)
- [Neon Branching](https://neon.tech/docs/introduction/branching)
- [Incident Response Guide](./incident-response.md)
- [Post-Mortem Template](./post-mortem-template.md)
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Déployer le vendredi | Pas de support week-end | Mardi-Jeudi uniquement |
| Pas de backup | Perte de données | Backup avant chaque déploiement |
| Runbook obsolète | Procédure incorrecte | Mettre à jour après chaque incident |
| Pas de rollback testé | Panique en cas de problème | Tester régulièrement |
| Déployer sans monitoring | Problèmes non détectés | Dashboard ouvert pendant déploiement |

## Références

- [Google SRE Book - Release Engineering](https://sre.google/sre-book/release-engineering/)
- [PagerDuty Incident Response](https://response.pagerduty.com/)
- Livrables liés : `ci-pipeline`, `monitoring-setup`, `rollback-procedure`, `incident-runbook`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | devops | Création initiale |
