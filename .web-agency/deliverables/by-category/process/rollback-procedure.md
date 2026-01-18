---
id: rollback-procedure
name: Procédure de Rollback
version: 1.0.0
category: process
status: active
phase: "5-deploiement"
order: 6
agents:
  - devops/deployment/rollback
  - direction-technique/support/gestion-incidents
consumes:
  - deployment-runbook
  - ci-pipeline
  - monitoring-setup
produces_for:
  - direction-technique/support/post-mortem
tags: [rollback, incident, recovery, deployment, devops]
---

# Procédure de Rollback

## Description

Guide de retour à une version stable en cas de problème post-déploiement. Procédure rapide et testée pour minimiser l'impact sur les utilisateurs.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown |
| **Emplacement** | `docs/runbooks/rollback.md` |
| **Nommage** | `rollback.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Critères de déclenchement** - Quand rollback
- [ ] **Procédure rapide** - Étapes < 5 min
- [ ] **Rollback application** - Code/container
- [ ] **Rollback database** - Si migration
- [ ] **Vérification** - Post-rollback checks
- [ ] **Communication** - Templates messages

### Sections Optionnelles

- [ ] **Rollback partiel** - Feature flags
- [ ] **Rollback CDN** - Cache invalidation
- [ ] **Rollback DNS** - Failover

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Temps rollback | < 5 min | Test | Oui |
| 2 | Procédure testée | 1x/mois minimum | Log | Oui |
| 3 | Contacts à jour | Tous joignables | Manuel | Oui |
| 4 | Backup disponible | < 24h | Auto | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `devops/deployment/*` | `deployment-runbook` | Procédure déploiement |
| `devops/cicd/*` | `ci-pipeline` | Versions disponibles |
| `devops/monitoring/*` | `monitoring-setup` | Détection problèmes |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Décision rollback | Tech Lead / On-call | Escalade |
| 2 | Post-rollback | DevOps | Debug |
| 3 | Post-mortem | Équipe | Améliorer process |

## Exemple

### Procédure Complète

```markdown
# 🔙 Procédure de Rollback
## E-commerce Artisanat - Production

---

## ⚡ QUICK REFERENCE (< 2 min)

### Rollback Vercel (Application)

```bash
# Option 1 : CLI (recommandé)
vercel rollback --yes

# Option 2 : Dashboard
# 1. https://vercel.com/team/project/deployments
# 2. Cliquer "..." sur le déploiement précédent stable
# 3. "Promote to Production"
```

### Rollback Database (si migration)

```bash
# Ne PAS faire de rollback DB sans validation Lead Dev !
# Contacter d'abord : Thomas (+33 6 XX XX XX XX)
```

### Vérification Rapide

```bash
curl -f https://www.artisanat-dupont.fr/api/health && echo "✅ OK"
```

---

## 🚨 Critères de Déclenchement

### Rollback IMMÉDIAT (pas de discussion)

| Symptôme | Détection | Action |
|----------|-----------|--------|
| Site inaccessible (5xx) | Uptime alert | Rollback |
| Taux d'erreur > 5% | Sentry alert | Rollback |
| Paiements échouent | Stripe webhook | Rollback |
| Données corrompues | Log/Sentry | Rollback + appeler Lead |

### Rollback APRÈS VALIDATION (5-10 min d'analyse)

| Symptôme | Détection | Action |
|----------|-----------|--------|
| Latence > 5s | Grafana | Analyser puis décider |
| Bug fonctionnel majeur | User report | Analyser puis décider |
| Erreurs sporadiques | Sentry | Monitorer 10 min |

### NE PAS Rollback (Hotfix préférable)

| Symptôme | Détection | Action |
|----------|-----------|--------|
| Bug UI mineur | User report | Hotfix |
| Texte incorrect | QA | Hotfix |
| Performance légèrement dégradée | Grafana | Optimiser |

---

## 📋 Procédure Détaillée

### Étape 0 : Évaluation (30 sec)

```
┌─────────────────────────────────────────────────────┐
│                   DÉCISION RAPIDE                    │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Site down / Paiements KO ?                         │
│       │                                              │
│       ├── OUI → Rollback IMMÉDIAT (Étape 1)        │
│       │                                              │
│       └── NON → Le problème est-il critique ?       │
│                     │                                │
│                     ├── OUI → Analyser 5 min        │
│                     │         puis décider          │
│                     │                                │
│                     └── NON → Monitorer             │
│                               Envisager hotfix      │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Étape 1 : Rollback Application (2-3 min)

#### Option A : Vercel CLI (Recommandé)

```bash
# 1. Identifier la version actuelle
vercel ls --prod

# Output:
# Age     Deployment                 Status  Environment
# 5m      ecommerce-abc123.vercel.app  ● Ready  Production  ← Problématique
# 2d      ecommerce-xyz789.vercel.app  ● Ready  Production  ← Stable

# 2. Rollback vers la version précédente
vercel rollback --yes

# 3. Vérifier le rollback
vercel ls --prod
# La version stable doit maintenant être en Production
```

#### Option B : Dashboard Vercel

1. Aller sur [Vercel Deployments](https://vercel.com/team/project/deployments)
2. Trouver le **dernier déploiement stable** (avant le problématique)
3. Cliquer sur les `...` → **"Promote to Production"**
4. Confirmer

#### Option C : Git Revert (si CI/CD automatique)

```bash
# Revert le dernier commit sur main
git revert HEAD --no-edit
git push origin main

# Le CI/CD redéploiera automatiquement
```

### Étape 2 : Rollback Database (SI NÉCESSAIRE)

⚠️ **ATTENTION** : Ne faire que si une migration a été appliquée et cause des problèmes !

#### 2.1 Évaluer la nécessité

| Situation | Action |
|-----------|--------|
| Migration additive (ajout colonne/table) | Pas de rollback DB nécessaire |
| Migration destructive (suppression) | Rollback DB potentiel |
| Migration de données | Restaurer backup |

#### 2.2 Rollback Migration Prisma

```bash
# Identifier la migration problématique
npx prisma migrate status

# Output:
# 20240215_add_shipping (applied)  ← Problématique
# 20240210_add_orders (applied)    ← OK

# Marquer comme rollback (ne modifie pas la DB)
npx prisma migrate resolve --rolled-back 20240215_add_shipping

# Appliquer le rollback SQL manuellement si nécessaire
# (script fourni par le dev)
```

#### 2.3 Restaurer Backup (Dernier recours)

```bash
# Via Neon Console
# 1. Aller sur https://console.neon.tech/app/projects/xxx
# 2. Branches → main → History
# 3. Sélectionner un point avant le déploiement
# 4. "Restore to this point"

# ⚠️ ATTENTION : Perte de données depuis le backup !
```

### Étape 3 : Vérification (2 min)

#### 3.1 Health Checks

```bash
# API Health
curl -f https://www.artisanat-dupont.fr/api/health
# Expected: {"status":"ok","version":"x.x.x"}

# Homepage
curl -I https://www.artisanat-dupont.fr
# Expected: HTTP/2 200

# Checkout (critique)
curl -I https://www.artisanat-dupont.fr/checkout
# Expected: HTTP/2 200
```

#### 3.2 Smoke Tests Critiques

| Test | URL | Attendu | ✓ |
|------|-----|---------|---|
| Homepage | / | 200, < 3s | ⬜ |
| Catalogue | /produits | Liste visible | ⬜ |
| Panier | /panier | Fonctionne | ⬜ |
| Checkout | /checkout | Stripe charge | ⬜ |

#### 3.3 Monitoring

- [ ] Vérifier Sentry : pas de nouvelles erreurs
- [ ] Vérifier Grafana : métriques revenues à la normale
- [ ] Vérifier uptime : alertes résolues

### Étape 4 : Communication (5 min)

#### 4.1 Slack - Équipe Technique

```markdown
🔙 **ROLLBACK EFFECTUÉ**

| Info | Valeur |
|------|--------|
| Heure | [HH:MM] UTC |
| Version rollback | v1.2.2 |
| Version problème | v1.2.3 |
| Effectué par | @[nom] |
| Raison | [Description courte] |

**Status :** Site opérationnel ✅
**Prochaine étape :** Investigation + Post-mortem

cc @lead-dev @devops
```

#### 4.2 Slack - Channel Client (si impact visible)

```markdown
ℹ️ **Information Service**

Nous avons détecté un problème technique suite à notre dernière mise à jour.
Une correction a été appliquée et le service est maintenant rétabli.

Nous vous prions de nous excuser pour la gêne occasionnée.
Notre équipe technique analyse la situation pour éviter que cela ne se reproduise.

Si vous rencontrez encore des difficultés, n'hésitez pas à nous contacter.
```

#### 4.3 Créer Ticket Incident

```markdown
# Incident Report

**Titre:** [INC-YYYY-MM-DD] Rollback suite à [problème]

**Timeline:**
- HH:MM - Déploiement v1.2.3
- HH:MM - Détection problème (source : Sentry/User/Monitoring)
- HH:MM - Décision rollback
- HH:MM - Rollback effectué
- HH:MM - Service rétabli

**Impact:**
- Durée : XX minutes
- Utilisateurs impactés : ~XXX
- Transactions perdues : X

**Root Cause:** À investiguer

**Action Items:**
- [ ] Investigation root cause
- [ ] Post-mortem planifié
- [ ] Fix à développer
```

---

## 🧪 Test de la Procédure

### Fréquence

- **Mensuel** : Test rollback application (Vercel)
- **Trimestriel** : Test rollback complet (app + DB si applicable)

### Checklist Test

```markdown
## Test Rollback - [Date]

**Environnement:** Staging
**Effectué par:** [Nom]

### Préparation
- [ ] Déployer une version "test" sur staging
- [ ] Vérifier que la version précédente existe

### Exécution
- [ ] Déclencher le rollback
- [ ] Chronomètre : temps écoulé = _____ (cible < 5 min)

### Vérification
- [ ] Health check OK
- [ ] Smoke tests OK
- [ ] Logs vérifiés

### Résultat
- ⬜ PASS - Procédure OK
- ⬜ FAIL - Problèmes identifiés : _____

### Améliorations identifiées
- [ ] _____
- [ ] _____
```

---

## 📞 Contacts d'Urgence

| Rôle | Nom | Téléphone | Quand appeler |
|------|-----|-----------|---------------|
| On-call | Rotation | +33 6 XX XX XX XX | Toujours |
| Lead Dev | Thomas | +33 6 XX XX XX XX | Rollback DB |
| DevOps Lead | Antoine | +33 6 XX XX XX XX | Infra/CI issues |
| CTO | Jean-Pierre | +33 6 XX XX XX XX | Escalade P1 |

---

## 📚 Références

- [Deployment Runbook](./deployment-runbook.md)
- [Incident Response](./incident-response.md)
- [Post-Mortem Template](./post-mortem-template.md)
- [Vercel Rollback Docs](https://vercel.com/docs/cli/rollback)
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Hésiter trop longtemps | Impact utilisateurs | Critères clairs |
| Rollback non testé | Ne fonctionne pas | Test mensuel |
| Pas de communication | Confusion équipe/client | Templates prêts |
| Rollback DB précipité | Perte de données | Validation Lead Dev |
| Pas de post-mortem | Même erreur répétée | Toujours analyser |

## Références

- [Google SRE - Incident Management](https://sre.google/sre-book/managing-incidents/)
- [PagerDuty Incident Response](https://response.pagerduty.com/)
- Livrables liés : `deployment-runbook`, `monitoring-setup`, `incident-runbook`, `post-mortem`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | devops | Création initiale |
