---
id: incident-runbook
name: Runbook de Gestion d'Incidents
version: 1.0.0
category: process
status: active
phase: "7-maintenance"
order: 1
agents:
  - direction-technique/support/gestion-incidents
  - devops/monitoring/alerting
consumes:
  - monitoring-setup
  - rollback-procedure
produces_for:
  - direction-technique/support/post-mortem
tags: [incident, support, on-call, escalation, runbook]
---

# Runbook de Gestion d'Incidents

## Description

Guide opérationnel pour la détection, l'évaluation, la résolution et la communication des incidents en production. Définit les processus, les rôles et les procédures de résolution.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown |
| **Emplacement** | `docs/runbooks/incident-management.md` |
| **Nommage** | `incident-management.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Niveaux de sévérité** - P1 à P4 définition
- [ ] **Processus d'escalade** - Qui contacter quand
- [ ] **Procédures par type** - Résolution par incident
- [ ] **Communication** - Templates et canaux
- [ ] **Contacts on-call** - Rotation et numéros

### Sections Optionnelles

- [ ] **Automatisation** - Runbooks automatisés
- [ ] **Métriques** - MTTR, MTTA
- [ ] **Formation** - Onboarding on-call

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Sévérités définies | P1-P4 clairs | Manuel | Oui |
| 2 | Contacts à jour | Vérification mensuelle | Manuel | Oui |
| 3 | Procédures testées | 1x/trimestre | Drill | Oui |
| 4 | Templates prêts | Tous les niveaux | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `devops/*` | `monitoring-setup` | Alertes configurées |
| `devops/*` | `rollback-procedure` | Plan de rollback |
| Équipe | Rotation on-call | Planning |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Création | Lead Dev + DevOps | Compléter |
| 2 | Incident réel | Post-mortem | Améliorer |
| 3 | Trimestriel | Équipe | Mise à jour |

## Exemple

### Runbook Complet

```markdown
# 🚨 Runbook de Gestion d'Incidents
## E-commerce Artisanat Dupont

---

## 1. Niveaux de Sévérité

### Définitions

| Niveau | Nom | Impact | Exemples | SLA Réponse | SLA Résolution |
|--------|-----|--------|----------|-------------|----------------|
| **P1** | Critique | Service indisponible, perte de revenus | Site down, paiements KO | 15 min | 1h |
| **P2** | Majeur | Fonctionnalité majeure impactée | Checkout lent, recherche KO | 30 min | 4h |
| **P3** | Modéré | Fonctionnalité mineure impactée | Bug UI, erreur non-bloquante | 2h | 24h |
| **P4** | Mineur | Gêne mineure, cosmétique | Typo, style cassé | 24h | 1 semaine |

### Matrice de Décision

```
                        Impact Business
                    Faible    Moyen    Élevé
              ┌─────────┬─────────┬─────────┐
    Nombreux  │   P3    │   P2    │   P1    │
Utilisateurs  ├─────────┼─────────┼─────────┤
   impactés   │   P4    │   P3    │   P2    │
    Peu       ├─────────┼─────────┼─────────┤
              │   P4    │   P4    │   P3    │
    Un seul   └─────────┴─────────┴─────────┘
```

---

## 2. Processus de Gestion d'Incident

### Vue d'Ensemble

```
┌──────────────────────────────────────────────────────────────────┐
│                    CYCLE DE VIE INCIDENT                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  DÉTECTION        TRIAGE         RÉSOLUTION       CLÔTURE        │
│  ──────────      ──────          ──────────       ───────        │
│                                                                   │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐       │
│  │ Alerte  │───►│ Évaluer │───►│ Résoudre│───►│  Post-  │       │
│  │ Signal  │    │ Sévérité│    │ Mitigate│    │ Mortem  │       │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘       │
│       │              │              │              │              │
│       ▼              ▼              ▼              ▼              │
│   Monitoring    Assigner IC    Communiquer    Documenter         │
│   User report   Créer ticket   Escalader      Améliorer          │
│                                si besoin                          │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### Rôles

| Rôle | Responsabilités |
|------|-----------------|
| **On-Call** | Première réponse, triage, résolution niveau 1 |
| **Incident Commander (IC)** | Coordination, décisions, communication |
| **Subject Matter Expert (SME)** | Expertise technique spécifique |
| **Communication Lead** | Updates client et parties prenantes |

---

## 3. Procédures par Type d'Incident

### 🔴 INC-001 : Site Inaccessible (P1)

**Symptômes :**
- Uptime alert
- Erreurs 5xx généralisées
- Page blanche

**Diagnostic rapide :**
```bash
# 1. Vérifier le statut du site
curl -I https://www.artisanat-dupont.fr
# Attendu : HTTP/2 200

# 2. Vérifier l'API
curl https://www.artisanat-dupont.fr/api/health

# 3. Vérifier les logs
# Vercel Dashboard → Logs → Filter: Error
```

**Résolution :**
```
SI récent déploiement :
  → Rollback immédiat (voir rollback-procedure.md)

SI problème infrastructure :
  → Vérifier status Vercel : https://www.vercel-status.com/
  → Vérifier status Neon : https://status.neon.tech/
  → Ouvrir ticket support si provider down

SI problème applicatif :
  → Analyser logs Sentry
  → Identifier la cause
  → Hotfix ou rollback selon complexité
```

**Communication :**
```
# Slack - #incidents
🔴 **P1 - Site Inaccessible**
Incident Commander : @nom
Status : En cours d'investigation
Impact : 100% des utilisateurs
Début : HH:MM UTC
Update toutes les 15 min
```

---

### 🟠 INC-002 : Paiements Échouent (P1)

**Symptômes :**
- Stripe webhook errors
- Sentry : PaymentIntentError
- User reports

**Diagnostic rapide :**
```bash
# 1. Vérifier Stripe Dashboard
# https://dashboard.stripe.com/test/logs

# 2. Vérifier les webhooks
# https://dashboard.stripe.com/webhooks

# 3. Vérifier les clés API
# ENV variables sur Vercel
```

**Résolution :**
```
SI clé API expirée/invalide :
  → Régénérer sur Stripe
  → Mettre à jour sur Vercel
  → Redéployer

SI webhook endpoint down :
  → Vérifier l'URL
  → Vérifier les logs de l'endpoint

SI changement Stripe API :
  → Vérifier breaking changes
  → Mettre à jour la lib stripe
```

---

### 🟠 INC-003 : Performance Dégradée (P2)

**Symptômes :**
- Latence > 5s
- Grafana alerts
- Core Web Vitals rouges

**Diagnostic :**
```bash
# 1. Identifier les pages lentes
# Vercel Analytics → Web Vitals

# 2. Vérifier la base de données
# Neon Dashboard → Query Statistics

# 3. Vérifier les API externes
# Logs → Filter external calls
```

**Résolution :**
```
SI N+1 queries :
  → Identifier avec Prisma query logging
  → Ajouter includes/relations

SI images non optimisées :
  → Vérifier next/image usage
  → Activer le cache CDN

SI cold starts :
  → Considérer Vercel Fluid Compute
  → Optimiser les imports
```

---

### 🟡 INC-004 : Erreurs Sporadiques (P3)

**Symptômes :**
- Sentry alerts (< 5% taux d'erreur)
- User reports ponctuels

**Diagnostic :**
```bash
# 1. Analyser sur Sentry
# - Fréquence
# - Stack trace
# - Contexte utilisateur (browser, device)

# 2. Reproduire si possible
# - Même navigateur
# - Même parcours
```

**Résolution :**
```
SI edge case non géré :
  → Ajouter error handling
  → Ajouter test de régression

SI race condition :
  → Analyser le timing
  → Ajouter locks/debounce

SI dépendance flaky :
  → Retry logic
  → Fallback
```

---

## 4. Escalade

### Matrice d'Escalade

| Temps | P1 | P2 | P3 | P4 |
|-------|----|----|----|----|
| 0-15 min | On-Call investigue | On-Call investigue | - | - |
| 15-30 min | Escalade Lead Dev | On-Call continue | On-Call investigue | - |
| 30-60 min | Escalade CTO | Escalade Lead Dev | - | - |
| 1h+ | War room | Escalade CTO | - | - |

### Contacts

| Rôle | Nom | Téléphone | Slack |
|------|-----|-----------|-------|
| On-Call (semaine) | Rotation | +33 6 XX XX XX XX | @oncall |
| On-Call (weekend) | Rotation | +33 6 XX XX XX XX | @oncall |
| Lead Dev | Thomas | +33 6 XX XX XX XX | @thomas |
| CTO | Jean-Pierre | +33 6 XX XX XX XX | @jp |
| Client escalade | Jean Dupont | +33 6 XX XX XX XX | - |

### Rotation On-Call

| Semaine | Primary | Secondary |
|---------|---------|-----------|
| S01 | Thomas | Lucas |
| S02 | Lucas | Antoine |
| S03 | Antoine | Thomas |
| S04 | Thomas | Lucas |

---

## 5. Communication

### Templates

#### Slack - Incident Ouvert
```markdown
🚨 **INCIDENT [P1/P2/P3] - [Titre court]**

| Info | Valeur |
|------|--------|
| Sévérité | P1 |
| IC | @nom |
| Début | HH:MM UTC |
| Impact | [Description impact] |

**Status :** 🔴 En cours

**Dernière update :**
[Description de l'état actuel]

**Prochaine update :** HH:MM
```

#### Slack - Incident Résolu
```markdown
✅ **INCIDENT RÉSOLU - [Titre]**

| Info | Valeur |
|------|--------|
| Durée | XX minutes |
| Cause | [Root cause courte] |
| Résolution | [Action prise] |

**Post-mortem :** [Lien ticket]
```

#### Email Client (P1/P2)
```
Objet: [Résolu] Incident technique - [Site/Service]

Bonjour,

Nous avons rencontré un incident technique qui a impacté [description].

Chronologie :
- HH:MM : Début de l'incident
- HH:MM : Détection
- HH:MM : Résolution

Impact : [Description de l'impact utilisateur]

Le service est maintenant rétabli.

Nous nous excusons pour la gêne occasionnée. Notre équipe effectue
une analyse approfondie pour éviter que cela ne se reproduise.

Cordialement,
L'équipe technique
```

---

## 6. Post-Incident

### Checklist Clôture

- [ ] Incident résolu et confirmé
- [ ] Communication envoyée (interne + client si P1/P2)
- [ ] Ticket créé pour post-mortem
- [ ] Logs/screenshots sauvegardés
- [ ] Timeline documentée

### Métriques à Tracker

| Métrique | Description | Cible |
|----------|-------------|-------|
| **MTTA** | Mean Time To Acknowledge | < 15 min (P1) |
| **MTTR** | Mean Time To Resolve | < 1h (P1), < 4h (P2) |
| **Incidents/mois** | Nombre total | Tendance ↓ |
| **P1/mois** | Incidents critiques | 0 |

---

## 7. Outils

| Outil | Usage | URL |
|-------|-------|-----|
| Sentry | Error tracking | https://sentry.io/xxx |
| Vercel | Logs, deployments | https://vercel.com/xxx |
| Neon | Database | https://console.neon.tech |
| Slack | Communication | #incidents, #alerts |
| Linear | Ticketing | https://linear.app/xxx |
| PagerDuty | On-call (optionnel) | - |
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Pas de sévérité claire | Mauvaise priorité | Définir P1-P4 |
| Héroïsme individuel | Burnout, SPOF | Rotation on-call |
| Pas de communication | Frustration client | Updates régulières |
| Pas de post-mortem | Erreurs répétées | Blameless post-mortem |
| Runbook obsolète | Procédures fausses | Review trimestrielle |

## Références

- [Google SRE Book - Incident Management](https://sre.google/sre-book/managing-incidents/)
- [PagerDuty Incident Response](https://response.pagerduty.com/)
- Livrables liés : `monitoring-setup`, `rollback-procedure`, `post-mortem`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | direction-technique | Création initiale |
