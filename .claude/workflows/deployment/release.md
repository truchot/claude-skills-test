---
name: release
description: Déployer une release en production
triggers: [release, déploiement, mise en prod, deploy]
skills: [git]
calls: [rollback]
roles: [devops-engineer, tech-lead]
---

# Release en Production

## Objectif

Déployer une nouvelle version en production de manière sécurisée et traçable.

## Pré-requis

- [ ] Tous les tests passent sur main
- [ ] Staging validé par QA/PO
- [ ] Aucun bug critique en attente
- [ ] Fenêtre de déploiement confirmée
- [ ] Équipe disponible pour support

## Étapes

### 1. Préparation

Vérifier l'état de la branche :

```bash
git checkout main
git pull origin main

# Vérifier les commits depuis la dernière release
git log --oneline $(git describe --tags --abbrev=0)..HEAD
```

- [ ] Changelog préparé
- [ ] Version déterminée (semver)
- [ ] Communication équipe faite

### 2. Créer le Tag

→ **skill**: `git`

```bash
# Tag avec annotation
git tag -a v1.2.0 -m "Release v1.2.0

## Features
- feat: nouvelle fonctionnalité X
- feat: amélioration Y

## Fixes
- fix: correction bug Z

## Breaking Changes
- Aucun
"

# Pusher le tag
git push origin v1.2.0
```

### 3. Déclencher le Déploiement

Selon votre CI/CD :

```bash
# GitHub Actions - déclenché automatiquement par le tag
# ou manuellement
gh workflow run deploy.yml --ref v1.2.0
```

- [ ] Pipeline de déploiement lancé
- [ ] Build réussi
- [ ] Tests passent

### 4. Vérification Staging

Avant prod, valider en staging :

- [ ] Application démarre
- [ ] Smoke tests passent
- [ ] Fonctionnalités critiques OK
- [ ] Pas d'erreurs dans les logs

### 5. Déploiement Production

```bash
# Selon l'outil
kubectl set image deployment/app app=myapp:v1.2.0
# ou
gh workflow run deploy-prod.yml --ref v1.2.0
```

- [ ] Déploiement lancé
- [ ] Rollout progressif si applicable

### 6. Validation Post-Déploiement

**Checklist critique (5 min)** :

- [ ] Application accessible
- [ ] Login fonctionne
- [ ] API répond (health check)
- [ ] Pas d'erreurs 5xx

**Checklist complète (30 min)** :

- [ ] Parcours utilisateur principal OK
- [ ] Métriques normales
- [ ] Pas d'alertes
- [ ] Performance acceptable

### 7. Monitoring

Surveiller pendant 1-2 heures :

```bash
# Logs
kubectl logs -f deployment/app

# Métriques
# Dashboard Grafana
```

- [ ] Taux d'erreur stable
- [ ] Latence normale
- [ ] Pas d'anomalies

### 8. Communication

- [ ] Équipe notifiée du succès
- [ ] Release notes publiées
- [ ] Ticket(s) fermé(s)
- [ ] Changelog mis à jour

## Outputs

- Application déployée en production
- Tag Git créé
- Release notes publiées
- Monitoring actif

## Rollback

Si problème détecté :

→ **workflow**: `rollback`

```bash
# Revenir à la version précédente
kubectl rollout undo deployment/app
# ou
git revert v1.2.0
```

**Critères de rollback** :
- Taux d'erreur > 1%
- Latence x2
- Fonctionnalité critique cassée
- Bug sécurité

## Erreurs Courantes

| Erreur | Cause | Solution |
|--------|-------|----------|
| Migrations échouent | Script incompatible | Tester en staging d'abord |
| Pods crashent | Config manquante | Vérifier les env vars |
| Performance dégradée | Code non optimisé | Profiling + rollback si critique |

## Escalade

- **Échec déploiement** → `devops-engineer`
- **Bug critique post-deploy** → `tech-lead` + rollback
- **Impact utilisateur majeur** → `project-manager` + communication
