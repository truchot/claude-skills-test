---
name: rollback
description: Annuler un déploiement problématique
triggers: [rollback, revert, annuler, revenir en arrière]
skills: [git]
calls: []
roles: [devops-engineer, tech-lead]
---

# Rollback

## Objectif

Revenir rapidement à une version stable en cas de problème post-déploiement.

## Quand Faire un Rollback

**Critères automatiques** :
- Taux d'erreur 5xx > 1%
- Latence P99 > 2x normale
- Health check échoue

**Critères manuels** :
- Fonctionnalité critique cassée
- Bug sécurité détecté
- Perte de données possible
- Dégradation majeure UX

## Décision

```
Temps depuis déploiement < 30 min ?
├─ OUI → Rollback immédiat
└─ NON → Évaluer fix vs rollback
         ├─ Fix < 15 min → Hotfix
         └─ Fix > 15 min → Rollback
```

## Étapes

### 1. Décision

- [ ] Problème confirmé (pas un faux positif)
- [ ] Impact évalué
- [ ] Décision rollback prise
- [ ] Équipe notifiée

### 2. Rollback Kubernetes

```bash
# Voir l'historique
kubectl rollout history deployment/app

# Rollback à la version précédente
kubectl rollout undo deployment/app

# Ou vers une révision spécifique
kubectl rollout undo deployment/app --to-revision=3

# Vérifier le status
kubectl rollout status deployment/app
```

### 3. Rollback Docker/VM

```bash
# Redéployer l'image précédente
docker pull myapp:v1.1.0
docker stop app && docker rm app
docker run -d --name app myapp:v1.1.0

# Ou via CI/CD
gh workflow run deploy-prod.yml --ref v1.1.0
```

### 4. Rollback Base de Données

⚠️ **Attention** : Les migrations DB ne sont pas toujours réversibles.

```bash
# Si migration réversible
npm run migrate:down

# Si données critiques
# Restaurer depuis backup
pg_restore -d mydb backup_pre_deploy.sql
```

**Cas complexes** :
- Migration destructive → Restaurer backup
- Nouvelles colonnes → Peut rester (rétrocompatible)
- Colonnes supprimées → Backup obligatoire

### 5. Vérification

- [ ] Application accessible
- [ ] Version correcte déployée
- [ ] Fonctionnalités OK
- [ ] Métriques normales
- [ ] Erreurs résolues

### 6. Communication

```markdown
🔄 **Rollback effectué**

**Application** : [nom]
**De** : v1.2.0
**Vers** : v1.1.0
**Raison** : [description courte]
**Impact** : [durée de l'incident]
**Status** : Stable
**Prochaines étapes** : [investigation, fix]
```

### 7. Post-Mortem

Après stabilisation :

- [ ] Timeline de l'incident
- [ ] Cause racine identifiée
- [ ] Actions correctives définies
- [ ] Post-mortem documenté

## Rollback Partiel (Feature Flags)

Si vous avez des feature flags :

```bash
# Désactiver la feature problématique
curl -X POST https://api.flags.io/disable \
  -d '{"feature": "new-checkout", "env": "production"}'
```

Avantage : Pas de redéploiement nécessaire.

## Scripts de Rollback

### Script générique

```bash
#!/bin/bash
# rollback.sh

VERSION=${1:-$(kubectl get deployment app -o jsonpath='{.metadata.annotations.previous-version}')}

echo "Rolling back to $VERSION..."

kubectl set image deployment/app app=myapp:$VERSION
kubectl rollout status deployment/app

echo "Rollback complete. Verifying..."
curl -f https://myapp.com/health || echo "⚠️ Health check failed"
```

### Avec confirmation

```bash
#!/bin/bash
# safe-rollback.sh

echo "Current version: $(kubectl get deployment app -o jsonpath='{.spec.template.spec.containers[0].image}')"
echo "Rolling back to: $1"
read -p "Confirm rollback? (y/n) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    kubectl rollout undo deployment/app
    echo "Rollback initiated"
else
    echo "Rollback cancelled"
fi
```

## Checklist Rollback Rapide

```
[ ] Identifier la version stable (précédente)
[ ] Exécuter le rollback
[ ] Vérifier le health check
[ ] Notifier l'équipe
[ ] Monitorer 15 min
[ ] Documenter l'incident
```

## Outputs

- Version précédente restaurée
- Service stable
- Équipe notifiée
- Incident documenté

## Erreurs Courantes

| Erreur | Cause | Solution |
|--------|-------|----------|
| Rollback échoue | Image non disponible | Vérifier le registry |
| DB incompatible | Migration irréversible | Restaurer backup |
| Config manquante | Env vars changées | Restaurer les configs |

## Escalade

- **Rollback impossible** → `devops-engineer` senior
- **Perte de données** → `tech-lead` + DBA
- **Incident majeur** → Communication client via `project-manager`
