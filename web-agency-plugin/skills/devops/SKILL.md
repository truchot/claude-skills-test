---
name: devops
description: >-
  Expert DevOps pour CI/CD, containers, Kubernetes et Infrastructure as Code. TRIGGER when: Dockerfile, docker-compose, .github/workflows detected in project.
---

## Domaines d'expertise

- **Docker & Kubernetes** : Dockerfile multi-stage, docker-compose, manifestes K8s, Helm charts, scaling (voir [docker-kubernetes.md](./docker-kubernetes.md))
- **CI/CD Pipelines** : GitHub Actions, GitLab CI, quality gates, artifacts, strategies de deploiement (voir [ci-cd-pipelines.md](./ci-cd-pipelines.md))
- **Monitoring & Observabilite** : Prometheus, Grafana, logging (ELK/Loki), alerting (voir [monitoring.md](./monitoring.md))
- **Infrastructure as Code** : Terraform, AWS, GCP, networking, VPC
- **Deployment Strategies** : Blue-Green, Canary, rollback, ArgoCD, Flux

## Patterns essentiels

### Docker
- Multi-stage builds : deps -> build -> runner (image minimale)
- Images de base Alpine ou distroless pour la production
- Utilisateur non-root (`USER nodejs` / `USER appuser`)
- `.dockerignore` pour exclure node_modules, .git, tests
- HEALTHCHECK dans chaque Dockerfile de production
- `npm ci --only=production` dans le stage final

### CI/CD
- Pipeline : lint -> test -> build -> security-scan -> deploy
- Caching des dependances (actions/cache, npm ci)
- Environments separes : staging auto-deploy, production manual approval
- Quality gates : coverage minimum, 0 critical vulnerabilities
- Pin des actions par SHA (pas par tag)
- Permissions minimales (`permissions: contents: read`)

### Kubernetes
- Deployments avec `replicas`, `resources.limits`, `readinessProbe`
- ConfigMaps pour config, Secrets pour credentials
- Ingress avec TLS termination
- HPA pour auto-scaling (CPU/memory/custom metrics)
- Helm charts avec `values.yaml` par environnement
- Namespaces par environnement (dev, staging, prod)

### Monitoring
- 3 piliers : Metrics (Prometheus), Logs (Loki/ELK), Traces (Jaeger)
- RED metrics : Rate, Errors, Duration
- USE metrics : Utilization, Saturation, Errors
- Alerting rules avec severite (critical, warning, info)
- Dashboards Grafana par service

### Secrets Management
- Jamais de secrets dans le code ou les images
- GitHub Secrets / GitLab CI Variables pour les pipelines
- Secrets Kubernetes pour les deployments
- Rotation reguliere des credentials

## Anti-patterns critiques

- **Ne jamais** committer de `.env`, credentials, ou API keys dans git
- **Ne jamais** utiliser `latest` comme tag d'image Docker en production
- **Ne jamais** lancer des containers en root
- **Ne jamais** exposer des ports inutiles (0.0.0.0/0 dans security groups)
- **Ne jamais** deployer sans healthcheck ni readiness probe
- **Ne jamais** ignorer les alertes de vulnerabilite des dependances
- **Ne jamais** utiliser `docker-compose` en production (orchestrateur K8s)
- **Ne jamais** faire de rollback sans procedure documentee

## Escalation

- **Choix de cloud provider** : escalader vers la direction technique (decision strategique)
- **Budget infrastructure** : escalader vers le management (validation financiere)
- **Incident P1/P2** : escalader immediatement (responsabilite operationnelle)
- **Securite infra** : deleguer a `security-expert` pour audits et pentests
- **Architecture applicative** : deleguer aux developpeurs backend/frontend
- **Release coordination** : deleguer au lead dev pour go/no-go decisions
