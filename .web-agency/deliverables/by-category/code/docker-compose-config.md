---
id: docker-compose-config
name: Configuration Docker Compose
version: 1.0.0
category: code
status: active
phase: "4-realisation"
order: 3
agents:
  - devops/containerization/docker-expert
  - devops/local-dev/dev-environment-setup
  - backend-developer/environment/local-setup
consumes:
  - technical-specification
  - stack-recommendation
  - environment-setup
produces_for:
  - backend-developer/*/all
  - frontend-developer/*/all
  - devops/cicd/*
tags: [docker, containers, devops, local-dev, infrastructure, compose]
---

# Configuration Docker Compose

## Description

Fichier de configuration Docker Compose définissant l'orchestration des conteneurs pour l'environnement de développement local et les environnements de staging/preview. Ce livrable standardise l'environnement de développement, garantit la reproductibilité et facilite l'onboarding des nouveaux développeurs.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Fichier YAML |
| **Emplacement** | `/docker-compose.yml`, `/docker-compose.override.yml`, `/docker/` |
| **Nommage** | `docker-compose.yml`, `docker-compose.[env].yml` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Version** - Version du format Compose (obsolète depuis v2)
- [ ] **Services** - Définition de chaque conteneur
- [ ] **Networks** - Configuration réseau inter-conteneurs
- [ ] **Volumes** - Volumes persistants pour les données
- [ ] **Variables d'environnement** - Configuration via .env
- [ ] **Health checks** - Vérification de santé des services
- [ ] **Documentation** - README d'utilisation

### Sections Optionnelles

- [ ] **Profiles** - Groupes de services activables
- [ ] **Secrets** - Gestion des secrets Docker
- [ ] **Configs** - Fichiers de configuration injectés
- [ ] **Extensions** - Champs personnalisés (x-)
- [ ] **Override files** - Surcharges par environnement

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Syntaxe YAML valide | Pas d'erreur de parsing | Auto (docker compose config) | Oui |
| 2 | Services démarrent | `docker compose up` sans erreur | Manuel | Oui |
| 3 | Health checks passent | Tous les services healthy | Auto | Oui |
| 4 | Variables externalisées | Pas de secrets en dur | Auto (lint) | Oui |
| 5 | Volumes persistants | Données conservées au restart | Manuel | Oui |
| 6 | Documentation complète | README avec toutes les commandes | Manuel | Oui |
| 7 | Performance acceptable | Startup < 2 min | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `direction-technique` | technical-specification | Architecture et stack technique |
| `direction-technique` | stack-recommendation | Technologies choisies |
| `devops` | environment-setup | Configuration des environnements |
| `backend-developer` | database-schema | Structure de la BDD |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Création initiale | Lead Dev / DevOps | Revue d'architecture |
| 2 | Test par équipe | Développeurs | Feedback UX développeur |
| 3 | Mise à jour stack | DevOps | Validation compatibilité |

## Exemple

### Exemple Minimal

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/app
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: app

volumes:
  postgres_data:
```

### Exemple Complet - Stack Full-Stack

```yaml
# docker-compose.yml
#
# Stack de développement local
# Usage: docker compose up -d
# Docs: voir README.md section Docker

# ============================================================
# SERVICES
# ============================================================

services:
  # ----------------------------------------------------------
  # FRONTEND - Next.js Application
  # ----------------------------------------------------------
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
      args:
        - NODE_ENV=development
    container_name: app-frontend
    ports:
      - "${FRONTEND_PORT:-3000}:3000"
    volumes:
      # Code source avec hot-reload
      - ./frontend:/app
      # Éviter d'écraser node_modules
      - /app/node_modules
      - /app/.next
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_API_URL=http://localhost:${API_PORT:-4000}
      - NEXT_TELEMETRY_DISABLED=1
    depends_on:
      api:
        condition: service_healthy
    networks:
      - frontend-network
      - backend-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    restart: unless-stopped
    profiles:
      - full
      - frontend

  # ----------------------------------------------------------
  # API - Node.js / NestJS Backend
  # ----------------------------------------------------------
  api:
    build:
      context: ./api
      dockerfile: Dockerfile.dev
    container_name: app-api
    ports:
      - "${API_PORT:-4000}:4000"
      - "9229:9229" # Debug port
    volumes:
      - ./api:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - PORT=4000
      - DATABASE_URL=postgresql://${POSTGRES_USER:-postgres}:${POSTGRES_PASSWORD:-postgres}@db:5432/${POSTGRES_DB:-app_dev}
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET:-dev-secret-change-in-prod}
      - CORS_ORIGINS=http://localhost:3000
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - backend-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s
    restart: unless-stopped
    profiles:
      - full
      - backend

  # ----------------------------------------------------------
  # DATABASE - PostgreSQL
  # ----------------------------------------------------------
  db:
    image: postgres:16-alpine
    container_name: app-db
    ports:
      - "${POSTGRES_PORT:-5432}:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./docker/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres}
      POSTGRES_DB: ${POSTGRES_DB:-app_dev}
      PGDATA: /var/lib/postgresql/data/pgdata
    networks:
      - backend-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-postgres} -d ${POSTGRES_DB:-app_dev}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
    restart: unless-stopped

  # ----------------------------------------------------------
  # CACHE - Redis
  # ----------------------------------------------------------
  redis:
    image: redis:7-alpine
    container_name: app-redis
    ports:
      - "${REDIS_PORT:-6379}:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes --maxmemory 256mb --maxmemory-policy allkeys-lru
    networks:
      - backend-network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  # ----------------------------------------------------------
  # MESSAGE QUEUE - RabbitMQ (optionnel)
  # ----------------------------------------------------------
  rabbitmq:
    image: rabbitmq:3-management-alpine
    container_name: app-rabbitmq
    ports:
      - "${RABBITMQ_PORT:-5672}:5672"
      - "${RABBITMQ_MANAGEMENT_PORT:-15672}:15672"
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq
    environment:
      RABBITMQ_DEFAULT_USER: ${RABBITMQ_USER:-guest}
      RABBITMQ_DEFAULT_PASS: ${RABBITMQ_PASS:-guest}
    networks:
      - backend-network
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "check_running"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped
    profiles:
      - full
      - queue

  # ----------------------------------------------------------
  # MAIL - Mailhog (développement)
  # ----------------------------------------------------------
  mailhog:
    image: mailhog/mailhog:latest
    container_name: app-mailhog
    ports:
      - "${MAILHOG_SMTP_PORT:-1025}:1025"
      - "${MAILHOG_UI_PORT:-8025}:8025"
    networks:
      - backend-network
    restart: unless-stopped
    profiles:
      - full
      - mail

  # ----------------------------------------------------------
  # STORAGE - MinIO (S3-compatible)
  # ----------------------------------------------------------
  minio:
    image: minio/minio:latest
    container_name: app-minio
    ports:
      - "${MINIO_PORT:-9000}:9000"
      - "${MINIO_CONSOLE_PORT:-9001}:9001"
    volumes:
      - minio_data:/data
    environment:
      MINIO_ROOT_USER: ${MINIO_ROOT_USER:-minioadmin}
      MINIO_ROOT_PASSWORD: ${MINIO_ROOT_PASSWORD:-minioadmin}
    command: server /data --console-address ":9001"
    networks:
      - backend-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped
    profiles:
      - full
      - storage

  # ----------------------------------------------------------
  # ADMINER - Database Management UI
  # ----------------------------------------------------------
  adminer:
    image: adminer:latest
    container_name: app-adminer
    ports:
      - "${ADMINER_PORT:-8080}:8080"
    environment:
      ADMINER_DEFAULT_SERVER: db
    networks:
      - backend-network
    depends_on:
      - db
    restart: unless-stopped
    profiles:
      - tools

  # ----------------------------------------------------------
  # MONITORING - Prometheus + Grafana (optionnel)
  # ----------------------------------------------------------
  prometheus:
    image: prom/prometheus:latest
    container_name: app-prometheus
    ports:
      - "${PROMETHEUS_PORT:-9090}:9090"
    volumes:
      - ./docker/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
    networks:
      - backend-network
      - monitoring-network
    restart: unless-stopped
    profiles:
      - monitoring

  grafana:
    image: grafana/grafana:latest
    container_name: app-grafana
    ports:
      - "${GRAFANA_PORT:-3001}:3000"
    volumes:
      - grafana_data:/var/lib/grafana
      - ./docker/grafana/provisioning:/etc/grafana/provisioning:ro
    environment:
      GF_SECURITY_ADMIN_USER: ${GRAFANA_USER:-admin}
      GF_SECURITY_ADMIN_PASSWORD: ${GRAFANA_PASSWORD:-admin}
      GF_USERS_ALLOW_SIGN_UP: "false"
    networks:
      - monitoring-network
    depends_on:
      - prometheus
    restart: unless-stopped
    profiles:
      - monitoring

# ============================================================
# NETWORKS
# ============================================================

networks:
  frontend-network:
    driver: bridge
    name: app-frontend-network

  backend-network:
    driver: bridge
    name: app-backend-network

  monitoring-network:
    driver: bridge
    name: app-monitoring-network

# ============================================================
# VOLUMES
# ============================================================

volumes:
  postgres_data:
    name: app-postgres-data

  redis_data:
    name: app-redis-data

  rabbitmq_data:
    name: app-rabbitmq-data

  minio_data:
    name: app-minio-data

  prometheus_data:
    name: app-prometheus-data

  grafana_data:
    name: app-grafana-data
```

### Fichier .env.example

```bash
# .env.example
# Copier vers .env et adapter les valeurs

# ============================================================
# PORTS (éviter les conflits avec d'autres projets)
# ============================================================
FRONTEND_PORT=3000
API_PORT=4000
POSTGRES_PORT=5432
REDIS_PORT=6379
RABBITMQ_PORT=5672
RABBITMQ_MANAGEMENT_PORT=15672
MAILHOG_SMTP_PORT=1025
MAILHOG_UI_PORT=8025
MINIO_PORT=9000
MINIO_CONSOLE_PORT=9001
ADMINER_PORT=8080
PROMETHEUS_PORT=9090
GRAFANA_PORT=3001

# ============================================================
# DATABASE
# ============================================================
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=app_dev

# ============================================================
# REDIS
# ============================================================
# Pas de configuration supplémentaire nécessaire

# ============================================================
# RABBITMQ
# ============================================================
RABBITMQ_USER=guest
RABBITMQ_PASS=guest

# ============================================================
# MINIO (S3)
# ============================================================
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin

# ============================================================
# MONITORING
# ============================================================
GRAFANA_USER=admin
GRAFANA_PASSWORD=admin

# ============================================================
# APPLICATION
# ============================================================
JWT_SECRET=dev-secret-change-me-in-production-with-32-chars-minimum
```

### Fichier docker-compose.override.yml (dev local)

```yaml
# docker-compose.override.yml
# Surcharges pour le développement local uniquement
# Ce fichier est automatiquement chargé par docker compose

services:
  frontend:
    # Hot reload plus réactif
    environment:
      - WATCHPACK_POLLING=true
      - CHOKIDAR_USEPOLLING=true
    # Augmenter les limites pour le dev
    deploy:
      resources:
        limits:
          memory: 2G

  api:
    # Mode debug Node.js
    command: npm run start:debug
    environment:
      - DEBUG=app:*
      - LOG_LEVEL=debug

  db:
    # Logging SQL pour debug
    command: postgres -c log_statement=all -c log_destination=stderr
```

### Documentation (README section Docker)

```markdown
## 🐳 Docker - Environnement de développement

### Prérequis

- Docker Desktop >= 4.0 (ou Docker Engine + Compose V2)
- Au moins 8 Go de RAM alloués à Docker
- Ports disponibles : 3000, 4000, 5432, 6379 (voir `.env` pour personnaliser)

### Démarrage rapide

```bash
# 1. Copier la configuration
cp .env.example .env

# 2. Démarrer tous les services
docker compose up -d

# 3. Vérifier le statut
docker compose ps

# 4. Voir les logs
docker compose logs -f
```

### Commandes utiles

| Commande | Description |
|----------|-------------|
| `docker compose up -d` | Démarrer en arrière-plan |
| `docker compose down` | Arrêter tous les services |
| `docker compose down -v` | Arrêter et supprimer les volumes |
| `docker compose logs -f [service]` | Voir les logs |
| `docker compose exec api sh` | Shell dans un conteneur |
| `docker compose restart [service]` | Redémarrer un service |
| `docker compose build --no-cache` | Rebuild sans cache |

### Profiles

Les services sont groupés par profiles pour démarrer uniquement ce dont vous avez besoin :

```bash
# Stack minimale (DB + Redis)
docker compose up -d db redis

# Stack complète
docker compose --profile full up -d

# Avec outils (Adminer)
docker compose --profile tools up -d

# Avec monitoring (Prometheus + Grafana)
docker compose --profile monitoring up -d
```

### Accès aux services

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | - |
| API | http://localhost:4000 | - |
| API Docs | http://localhost:4000/api/docs | - |
| Adminer | http://localhost:8080 | postgres / postgres |
| MailHog | http://localhost:8025 | - |
| MinIO Console | http://localhost:9001 | minioadmin / minioadmin |
| RabbitMQ | http://localhost:15672 | guest / guest |
| Grafana | http://localhost:3001 | admin / admin |

### Dépannage

#### Les conteneurs ne démarrent pas
```bash
# Vérifier les logs
docker compose logs

# Vérifier les ports utilisés
lsof -i :3000
```

#### Problèmes de permissions (Linux)
```bash
# Ajouter l'utilisateur au groupe docker
sudo usermod -aG docker $USER
```

#### Réinitialiser complètement
```bash
docker compose down -v --remove-orphans
docker system prune -af
docker compose up -d --build
```

### Performance

Pour améliorer les performances sur macOS/Windows :
- Utiliser les volumes nommés plutôt que les bind mounts pour node_modules
- Activer VirtioFS dans Docker Desktop (macOS)
- Exclure le dossier du projet de l'antivirus
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Secrets en dur dans le YAML | Fuite de credentials si commit | Utiliser .env et .gitignore |
| Pas de health checks | Services considérés ready trop tôt | Toujours définir des healthchecks |
| Image latest en production | Version non reproductible | Épingler les versions (postgres:16-alpine) |
| Volumes bind mount sur node_modules | Performances catastrophiques | Volume anonyme pour node_modules |
| Pas de networks séparés | Tous les services se voient | Isoler frontend/backend |
| Monter tout le code source | Lent sur macOS/Windows | Utiliser des volumes nommés intelligemment |

## Références

- [Docker Compose Specification](https://docs.docker.com/compose/compose-file/)
- [Best practices for Compose](https://docs.docker.com/develop/dev-best-practices/)
- [Awesome Compose Examples](https://github.com/docker/awesome-compose)
- Livrables liés : `environment-setup`, `ci-pipeline`, `infrastructure-as-code`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | devops | Création initiale |
