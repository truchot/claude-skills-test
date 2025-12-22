---
name: strategie-deploiement
description: Stratégies de déploiement et release
---

# Stratégie de Déploiement

Tu définis et implémentes les **stratégies de déploiement** pour des releases sûres et rapides.

## Stratégies de Déploiement

### 1. Rolling Deployment

```
Instance 1: v1 → v2 (1/3)
Instance 2: v1 ─────────→ v2 (2/3)
Instance 3: v1 ─────────────────→ v2 (3/3)
            ─────────────────────────────► temps
```

**Avantages** : Simple, pas de ressources supplémentaires
**Inconvénients** : Versions mixtes temporairement

### 2. Blue-Green Deployment

```
         Load Balancer
              │
    ┌─────────┴─────────┐
    ▼                   ▼
┌───────┐          ┌───────┐
│ Blue  │          │ Green │
│  v1   │ ◄─────── │  v2   │
│(prod) │  switch  │(idle) │
└───────┘          └───────┘
```

**Avantages** : Rollback instantané, pas de downtime
**Inconvénients** : Double des ressources nécessaires

### 3. Canary Deployment

```
                    Load Balancer
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │   v1    │    │   v1    │    │   v2    │
    │  (45%)  │    │  (45%)  │    │  (10%)  │ Canary
    └─────────┘    └─────────┘    └─────────┘
```

**Avantages** : Test en production réelle, risque limité
**Inconvénients** : Plus complexe à gérer

### 4. Feature Flags

```typescript
// Déployer le code, activer progressivement
if (featureFlags.isEnabled('new-checkout', { userId })) {
  return <NewCheckout />;
} else {
  return <OldCheckout />;
}
```

**Avantages** : Découplage deploy/release, rollback instantané
**Inconvénients** : Code plus complexe, cleanup nécessaire

## Implémentation

### Kubernetes Rolling Update

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # 1 pod en plus pendant update
      maxUnavailable: 0  # Toujours 3 pods disponibles
  template:
    spec:
      containers:
      - name: api
        image: myapp:v2
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

### AWS ECS Blue-Green

```hcl
# Terraform
resource "aws_codedeploy_deployment_group" "app" {
  app_name               = aws_codedeploy_app.app.name
  deployment_group_name  = "production"
  service_role_arn       = aws_iam_role.codedeploy.arn

  deployment_style {
    deployment_option = "WITH_TRAFFIC_CONTROL"
    deployment_type   = "BLUE_GREEN"
  }

  blue_green_deployment_config {
    deployment_ready_option {
      action_on_timeout = "CONTINUE_DEPLOYMENT"
    }

    terminate_blue_instances_on_deployment_success {
      action                           = "TERMINATE"
      termination_wait_time_in_minutes = 5
    }
  }

  ecs_service {
    cluster_name = aws_ecs_cluster.main.name
    service_name = aws_ecs_service.app.name
  }
}
```

### Canary avec Istio

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: api
spec:
  hosts:
  - api.example.com
  http:
  - match:
    - headers:
        canary:
          exact: "true"
    route:
    - destination:
        host: api
        subset: canary
  - route:
    - destination:
        host: api
        subset: stable
      weight: 90
    - destination:
        host: api
        subset: canary
      weight: 10
```

## Rollback

### Procédure de Rollback

```
1. Détecter le problème
   ↓
2. Décision de rollback
   ↓
3. Exécuter le rollback
   ↓
4. Vérifier le service
   ↓
5. Post-mortem
```

### Script de Rollback

```bash
#!/bin/bash
# scripts/rollback.sh

set -e

ENVIRONMENT=$1
PREVIOUS_VERSION=$2

echo "🔄 Rolling back to version $PREVIOUS_VERSION on $ENVIRONMENT"

# Kubernetes
kubectl set image deployment/api api=myapp:$PREVIOUS_VERSION
kubectl rollout status deployment/api --timeout=5m

# OU Docker
docker-compose -f docker-compose.$ENVIRONMENT.yml pull
docker-compose -f docker-compose.$ENVIRONMENT.yml up -d

# Vérification
echo "✅ Verifying rollback..."
curl -f https://api.$ENVIRONMENT.example.com/health || exit 1

echo "✅ Rollback completed successfully"
```

### Kubernetes Rollback

```bash
# Voir l'historique
kubectl rollout history deployment/api

# Rollback vers version précédente
kubectl rollout undo deployment/api

# Rollback vers version spécifique
kubectl rollout undo deployment/api --to-revision=2

# Status
kubectl rollout status deployment/api
```

## Database Migrations

### Migrations Compatibles

```typescript
// ✅ Migration rétrocompatible
// 1. Ajouter nouvelle colonne nullable
ALTER TABLE users ADD COLUMN new_email VARCHAR(255);

// 2. Migrer les données (en background)
UPDATE users SET new_email = email WHERE new_email IS NULL;

// 3. (Next deploy) Utiliser nouvelle colonne
// 4. (Later) Supprimer ancienne colonne
```

### Expand-Contract Pattern

```
v1 (before):  [email column]

v2 (expand):  [email column] + [new_email column]
              ← Code writes to both

v3 (migrate): [email column] + [new_email column]
              ← Background migration

v4 (contract): [new_email column only]
              ← Old column dropped
```

## Checklist Déploiement

### Avant

- [ ] Tests passés en CI
- [ ] Migrations compatibles backward
- [ ] Feature flags pour nouveautés risquées
- [ ] Monitoring prêt
- [ ] Plan de rollback documenté

### Pendant

- [ ] Déploiement progressif
- [ ] Surveiller les métriques
- [ ] Vérifier les logs d'erreur
- [ ] Health checks OK

### Après

- [ ] Smoke tests manuels
- [ ] Métriques normales
- [ ] Pas d'alertes
- [ ] Communication à l'équipe

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Erreurs > seuil | Rollback automatique |
| Latence dégradée | Pause et investigation |
| Rollback échoue | Escalade + war room |
| Migration bloquée | Ne pas forcer, analyser |
