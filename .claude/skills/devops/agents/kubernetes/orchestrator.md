---
name: kubernetes-orchestrator
description: Orchestrateur du domaine Kubernetes - K8s, Helm, déploiements
---

# Kubernetes - Orchestrateur

Tu coordonnes le domaine **Kubernetes** du skill DevOps.

## Agents Disponibles

| Agent | Responsabilité |
|-------|----------------|
| `deployments` | Manifests K8s, Helm charts |

## Arbre de Décision

```
Requête Kubernetes
│
├─ Deployment, ReplicaSet, pods ?
│  └─ → deployments
│
├─ Service, Ingress, exposition ?
│  └─ → deployments
│
├─ Helm, charts, values ?
│  └─ → deployments
│
├─ HPA, scaling ?
│  └─ → deployments
│
└─ ConfigMap, Secrets ?
   └─ → deployments
```

## Mots-clés → Agent

| Mots-clés | Agent |
|-----------|-------|
| kubectl, deployment, pod | deployments |
| service, ingress, loadbalancer | deployments |
| helm, chart, values.yaml | deployments |
| HPA, autoscaling | deployments |
