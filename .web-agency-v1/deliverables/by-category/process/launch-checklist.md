---
id: launch-checklist
name: Checklist de Lancement
version: 1.0.0
category: process
status: active
phase: "6-lancement"
order: 1
agents:
  - project-management/livraison/go-live
  - devops/deployment/strategies
consumes:
  - deployment-runbook
  - test-coverage-report
  - monitoring-setup
produces_for:
  - marketing-analytics/tracking-setup
  - support-client/resolution/technical-support
tags: [launch, go-live, checklist, production, release]
---

# Checklist de Lancement

## Description

Liste exhaustive des vérifications à effectuer avant, pendant et après la mise en production. Garantit que rien n'est oublié pour un lancement réussi.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown avec checkboxes |
| **Emplacement** | `projects/[client-slug]/06-launch/launch-checklist.md` |
| **Nommage** | `launch-checklist.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Pré-launch** - Vérifications avant go-live
- [ ] **Day-of** - Actions le jour J
- [ ] **Post-launch** - Vérifications post-MEP
- [ ] **Contacts** - Équipe de garde
- [ ] **Rollback** - Plan B

### Sections Optionnelles

- [ ] **Communication** - Annonces prévues
- [ ] **Marketing** - Actions associées
- [ ] **Training** - Formation client

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | 100% coché | Tous les items critiques | Manuel | Oui |
| 2 | Sign-off | Validation Lead + Client | Signature | Oui |
| 3 | Rollback testé | Procédure vérifiée | Test | Oui |
| 4 | Équipe dispo | Contacts joignables | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `devops/*` | `deployment-runbook` | Procédure déploiement |
| `testing-process/*` | `test-coverage-report` | Tests passés |
| `devops/*` | `monitoring-setup` | Alertes configurées |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | J-1 | Lead Dev + CDP | Report si bloquant |
| 2 | Jour J | CDP + Client | Go/No-Go |
| 3 | J+1 | Équipe | Rétrospective |

## Exemple

### Checklist Complète

```markdown
# 🚀 Checklist de Lancement
## E-commerce Artisanat Dupont

**Date prévue :** 01/09/2024 - 06:00 UTC
**Responsable :** Marie Martin (CDP)
**Version :** v1.0.0

---

## 📅 J-7 : Préparation

### Technique
- [x] Tests E2E passent sur staging
- [x] Coverage > 80%
- [x] Performance audit OK (LCP < 2.5s)
- [x] Security audit OK (OWASP)
- [x] SEO checklist validée
- [x] Accessibilité WCAG AA validée
- [ ] Load testing effectué
- [ ] Backup staging → production ready

### Contenu
- [x] Tous les contenus intégrés
- [x] Images optimisées
- [x] CGV / Mentions légales validées juridiquement
- [x] Politique de confidentialité RGPD
- [ ] Traductions vérifiées (si applicable)

### Configuration
- [x] Variables d'environnement production définies
- [x] Secrets en place (Stripe, emails, etc.)
- [x] DNS configuré (A record, CNAME)
- [x] SSL certificat prêt (Let's Encrypt / Vercel)
- [ ] CDN configuré
- [ ] Email transactionnel configuré (SendGrid/Resend)

### Monitoring
- [x] Sentry configuré (production)
- [x] Analytics configuré (GA4 / Plausible)
- [x] Uptime monitoring actif
- [ ] Alertes Slack configurées
- [ ] On-call rotation définie

---

## 📅 J-1 : Vérifications Finales

### Revue Technique
- [ ] Code freeze appliqué (main branch)
- [ ] Dernière PR mergée et testée
- [ ] Tag de release créé (v1.0.0)
- [ ] Build production réussie
- [ ] Images Docker pushed (si applicable)

### Revue Fonctionnelle
- [ ] Smoke tests staging passent
- [ ] Parcours critique validé :
  - [ ] Homepage → Catalogue
  - [ ] Recherche produit
  - [ ] Ajout panier
  - [ ] Checkout complet
  - [ ] Confirmation email reçue
- [ ] Back-office fonctionnel
- [ ] Emails transactionnels testés

### Communication
- [ ] Équipe informée de l'heure de MEP
- [ ] Client informé
- [ ] Message Slack prêt
- [ ] Email client prêt
- [ ] Post réseaux sociaux prêt (si applicable)

### Rollback
- [ ] Procédure de rollback relue
- [ ] Contacts d'urgence vérifiés
- [ ] Backup base de données fait
- [ ] Version précédente identifiée

---

## 🎯 JOUR J : Go-Live

### Pré-déploiement (06:00)
- [ ] Équipe technique connectée
- [ ] Canaux de communication ouverts
- [ ] Monitoring dashboards ouverts
- [ ] **POINT GO/NO-GO** avec Lead Dev

### Déploiement (06:15)
- [ ] Lancer le déploiement
  ```bash
  # Via Vercel
  vercel --prod
  # Ou via CI/CD
  git push origin main
  ```
- [ ] Vérifier le statut déploiement
- [ ] Attendre confirmation "Ready"

### Vérification Immédiate (06:30)
- [ ] Site accessible sur URL production
- [ ] HTTPS actif (cadenas vert)
- [ ] Pas d'erreurs dans Sentry
- [ ] Health check API OK
  ```bash
  curl https://www.artisanat-dupont.fr/api/health
  ```

### Tests Post-Déploiement (06:45)
- [ ] Smoke tests production :

| Test | URL | Status |
|------|-----|--------|
| Homepage | / | ⬜ |
| Catalogue | /produits | ⬜ |
| Fiche produit | /produits/miel-lavande | ⬜ |
| Panier | /panier | ⬜ |
| Checkout | /checkout | ⬜ |
| Paiement test | Stripe test mode OFF | ⬜ |
| Confirmation | Email reçu | ⬜ |

### Activation Services (07:00)
- [ ] Stripe en mode LIVE
- [ ] Vérifier première transaction test (1€)
- [ ] Activer emails transactionnels
- [ ] Activer tracking analytics

### Communication (07:30)
- [ ] Annonce Slack équipe :
  ```
  🚀 **PRODUCTION LIVE**
  Site: https://www.artisanat-dupont.fr
  Version: v1.0.0
  Status: ✅ Opérationnel
  ```
- [ ] Email client :
  ```
  Bonjour Jean,

  Nous avons le plaisir de vous annoncer que votre site
  est maintenant en ligne !

  URL : https://www.artisanat-dupont.fr

  [...]
  ```
- [ ] Post réseaux sociaux (si prévu)

---

## 📅 J+1 : Post-Launch

### Monitoring (Matin)
- [ ] Vérifier logs de la nuit
- [ ] Vérifier Sentry (nouvelles erreurs ?)
- [ ] Vérifier analytics (trafic ?)
- [ ] Vérifier uptime (pas d'alertes ?)

### Feedback
- [ ] Collecter feedback client
- [ ] Collecter feedback équipe
- [ ] Noter les améliorations identifiées

### Documentation
- [ ] Mettre à jour le changelog
- [ ] Archiver la checklist complétée
- [ ] Documenter les learnings

---

## 📅 J+7 : Revue

### Métriques
- [ ] Trafic vs objectif
- [ ] Taux de conversion
- [ ] Erreurs remontées
- [ ] Performance réelle

### Rétrospective
- [ ] Ce qui a bien fonctionné
- [ ] Ce qui peut être amélioré
- [ ] Actions pour le prochain lancement

---

## 📞 Contacts d'Urgence

| Rôle | Nom | Téléphone | Email |
|------|-----|-----------|-------|
| CDP | Marie Martin | +33 6 XX XX XX XX | marie@agence.fr |
| Lead Dev | Thomas Bernard | +33 6 XX XX XX XX | thomas@agence.fr |
| DevOps | Antoine Moreau | +33 6 XX XX XX XX | antoine@agence.fr |
| Client | Jean Dupont | +33 6 XX XX XX XX | jean@dupont.fr |

---

## ⚠️ Plan de Rollback

**Déclencheur :** Site inaccessible > 5 min OU erreurs critiques > 5%

**Procédure rapide :**
```bash
vercel rollback --yes
```

**Voir :** [Procédure de Rollback complète](./rollback-procedure.md)

---

## ✅ Sign-Off

| Rôle | Nom | Signature | Date |
|------|-----|-----------|------|
| Lead Dev | Thomas Bernard | _____________ | __/__/__ |
| CDP | Marie Martin | _____________ | __/__/__ |
| Client | Jean Dupont | _____________ | __/__/__ |
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Checklist ignorée | Oublis critiques | Obligation de cocher |
| Pas de rollback plan | Panique si problème | Toujours documenter |
| Lancement vendredi | Pas de support weekend | Lundi-mercredi |
| Pas de monitoring | Problèmes invisibles | Alertes obligatoires |
| Client pas informé | Surprise, frustration | Communication proactive |

## Références

- [The Release Checklist](https://www.joelonsoftware.com/)
- [Launch Darkly Best Practices](https://launchdarkly.com/)
- Livrables liés : `deployment-runbook`, `rollback-procedure`, `analytics-setup`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | project-management | Création initiale |
