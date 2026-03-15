---
paths:
  - "**/Dockerfile*"
  - "**/.github/**"
  - "**/docker-compose*"
  - "**/.gitlab-ci*"
---

# Conventions CI/CD
- Multi-stage builds Docker pour minimiser la taille des images
- Images de base Alpine ou distroless en production
- Ne jamais exécuter en root dans les containers
- CI : lint → test → build → deploy (ordre strict)
- Secrets via les variables CI, jamais dans les fichiers
- Health checks dans les Dockerfiles
- Cache des dépendances dans les pipelines CI
