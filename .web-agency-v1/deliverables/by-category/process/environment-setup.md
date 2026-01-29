---
id: environment-setup
name: Setup Environnement de Développement
version: 1.0.0
category: process
status: active
phase: "4-realisation"
order: 1
agents:
  - web-dev-process/setup/environment-config
  - devops/containers/docker-compose
  - lead-dev/onboarding/setup-guide
consumes:
  - stack-recommendation
  - technical-specification
produces_for:
  - backend-developer/*/all
  - frontend-developer/*/all
  - devops/cicd/*
tags: [setup, environment, docker, dev, onboarding, configuration]
---

# Setup Environnement de Développement

## Description

Guide et scripts permettant à tout développeur de configurer son environnement de développement local en moins de 15 minutes. Inclut Docker, variables d'environnement, dépendances et vérification du setup.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Scripts + Documentation Markdown |
| **Emplacement** | Racine du projet + `docs/setup/` |
| **Nommage** | `docker-compose.yml`, `.env.example`, `SETUP.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Fichiers Obligatoires

- [ ] **docker-compose.yml** - Services containerisés
- [ ] **.env.example** - Template des variables d'environnement
- [ ] **SETUP.md** - Guide d'installation pas à pas
- [ ] **scripts/setup.sh** - Script d'installation automatisé

### Fichiers Optionnels

- [ ] **Makefile** - Commandes raccourcies
- [ ] **.devcontainer/** - Config VS Code Dev Container
- [ ] **scripts/verify-setup.sh** - Vérification du setup
- [ ] **.tool-versions** - Versions asdf/mise

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Temps de setup | < 15 minutes | Test nouveau dev | Oui |
| 2 | One-command | `make setup` ou équivalent | Manuel | Oui |
| 3 | Pas de secrets | .env.example sans vraies valeurs | Auto (scan) | Oui |
| 4 | Fonctionne | App démarre sans erreur | Manuel | Oui |
| 5 | Documenté | Chaque étape expliquée | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `direction-technique/*` | `stack-recommendation` | Technologies choisies |
| `direction-technique/*` | `technical-specification` | Architecture |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Création | Lead Dev | Review |
| 2 | Test | Nouveau développeur | Corriger les frictions |
| 3 | Maintenance | À chaque nouvelle dépendance | Mettre à jour |

## Exemple

### Exemple Complet

```markdown
# SETUP.md

# Guide de Setup - E-commerce Dupont

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

| Outil | Version | Vérification |
|-------|---------|--------------|
| Node.js | ≥ 18 | `node --version` |
| pnpm | ≥ 8 | `pnpm --version` |
| Docker | ≥ 24 | `docker --version` |
| Docker Compose | ≥ 2.20 | `docker compose version` |

## Installation Rapide (< 5 min)

```bash
# 1. Cloner le repo
git clone git@github.com:org/ecommerce-dupont.git
cd ecommerce-dupont

# 2. Setup automatique
make setup

# 3. Lancer l'application
make dev

# 4. Ouvrir http://localhost:3000
```

## Installation Manuelle

### 1. Configuration des variables d'environnement

```bash
# Copier le template
cp .env.example .env.local

# Éditer avec vos valeurs (voir section Variables)
```

### 2. Démarrer les services Docker

```bash
# Lancer PostgreSQL + Redis
docker compose up -d

# Vérifier que les services sont up
docker compose ps
```

### 3. Installer les dépendances

```bash
pnpm install
```

### 4. Initialiser la base de données

```bash
# Générer le client Prisma
pnpm db:generate

# Appliquer les migrations
pnpm db:migrate

# (Optionnel) Seed avec données de test
pnpm db:seed
```

### 5. Lancer l'application

```bash
pnpm dev
```

L'application est accessible sur :
- **Frontend** : http://localhost:3000
- **API** : http://localhost:3000/api
- **Prisma Studio** : http://localhost:5555 (`pnpm db:studio`)

## Variables d'Environnement

### .env.example

```env
# ===================
# DATABASE
# ===================
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecommerce_dev"

# ===================
# AUTHENTICATION
# ===================
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<generate-with-openssl-rand-base64-32>"

# ===================
# STRIPE (Test Mode)
# ===================
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxx"
STRIPE_SECRET_KEY="sk_test_xxx"
STRIPE_WEBHOOK_SECRET="whsec_xxx"

# ===================
# SERVICES
# ===================
CLOUDINARY_URL="cloudinary://xxx:xxx@xxx"
RESEND_API_KEY="re_xxx"

# ===================
# OPTIONNEL
# ===================
# ANALYZE=true          # Bundle analyzer
# DEBUG=true            # Debug logs
```

### Générer les secrets

```bash
# NEXTAUTH_SECRET
openssl rand -base64 32

# Stripe Webhook Secret (après `stripe listen`)
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

## docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: ecommerce-db
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: ecommerce_dev
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: ecommerce-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5

  # Optionnel: MailHog pour tester les emails
  mailhog:
    image: mailhog/mailhog
    container_name: ecommerce-mail
    ports:
      - "1025:1025"  # SMTP
      - "8025:8025"  # Web UI

volumes:
  postgres_data:
  redis_data:
```

## Makefile

```makefile
.PHONY: setup dev build test clean help

# Variables
DOCKER_COMPOSE = docker compose

help: ## Affiche cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

setup: ## Setup complet du projet
	@echo "🚀 Setup du projet..."
	cp -n .env.example .env.local || true
	$(DOCKER_COMPOSE) up -d
	pnpm install
	pnpm db:generate
	pnpm db:migrate
	@echo "✅ Setup terminé! Lancez 'make dev' pour démarrer"

dev: ## Lance l'environnement de dev
	$(DOCKER_COMPOSE) up -d
	pnpm dev

build: ## Build de production
	pnpm build

test: ## Lance les tests
	pnpm test

test-watch: ## Lance les tests en watch mode
	pnpm test:watch

lint: ## Lint du code
	pnpm lint

format: ## Formate le code
	pnpm format

db-studio: ## Ouvre Prisma Studio
	pnpm db:studio

db-migrate: ## Applique les migrations
	pnpm db:migrate

db-reset: ## Reset la BDD (⚠️ destructif)
	pnpm db:reset

clean: ## Nettoie l'environnement
	$(DOCKER_COMPOSE) down -v
	rm -rf node_modules .next
	@echo "🧹 Nettoyage terminé"

logs: ## Affiche les logs Docker
	$(DOCKER_COMPOSE) logs -f
```

## scripts/setup.sh

```bash
#!/bin/bash
set -e

echo "🚀 Setup du projet E-commerce Dupont"
echo "======================================"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vérification des prérequis
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}❌ $1 n'est pas installé${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ $1 installé${NC}"
}

echo ""
echo "📋 Vérification des prérequis..."
check_command node
check_command pnpm
check_command docker

# Version Node
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js >= 18 requis (actuel: $NODE_VERSION)${NC}"
    exit 1
fi

echo ""
echo "📦 Configuration de l'environnement..."

# Copier .env si n'existe pas
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo -e "${YELLOW}⚠️  .env.local créé - pensez à configurer vos variables${NC}"
else
    echo -e "${GREEN}✓ .env.local existe déjà${NC}"
fi

echo ""
echo "🐳 Démarrage des services Docker..."
docker compose up -d

# Attendre que PostgreSQL soit prêt
echo "⏳ Attente de PostgreSQL..."
until docker compose exec -T postgres pg_isready -U postgres > /dev/null 2>&1; do
    sleep 1
done
echo -e "${GREEN}✓ PostgreSQL prêt${NC}"

echo ""
echo "📥 Installation des dépendances..."
pnpm install

echo ""
echo "🗄️  Configuration de la base de données..."
pnpm db:generate
pnpm db:migrate

echo ""
echo "======================================"
echo -e "${GREEN}✅ Setup terminé avec succès!${NC}"
echo ""
echo "Pour démarrer le projet:"
echo "  make dev"
echo ""
echo "L'application sera disponible sur:"
echo "  http://localhost:3000"
echo ""
```

## scripts/verify-setup.sh

```bash
#!/bin/bash
set -e

echo "🔍 Vérification du setup..."
echo ""

ERRORS=0

# Check Docker services
echo "Checking Docker services..."
if docker compose ps | grep -q "Up"; then
    echo "✓ Docker services running"
else
    echo "✗ Docker services not running"
    ERRORS=$((ERRORS + 1))
fi

# Check PostgreSQL connection
echo "Checking PostgreSQL..."
if docker compose exec -T postgres pg_isready -U postgres > /dev/null 2>&1; then
    echo "✓ PostgreSQL accessible"
else
    echo "✗ PostgreSQL not accessible"
    ERRORS=$((ERRORS + 1))
fi

# Check node_modules
echo "Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "✓ node_modules exists"
else
    echo "✗ node_modules missing - run 'pnpm install'"
    ERRORS=$((ERRORS + 1))
fi

# Check .env.local
echo "Checking environment..."
if [ -f ".env.local" ]; then
    echo "✓ .env.local exists"
else
    echo "✗ .env.local missing - run 'cp .env.example .env.local'"
    ERRORS=$((ERRORS + 1))
fi

# Check Prisma client
echo "Checking Prisma..."
if [ -d "node_modules/.prisma" ]; then
    echo "✓ Prisma client generated"
else
    echo "✗ Prisma client missing - run 'pnpm db:generate'"
    ERRORS=$((ERRORS + 1))
fi

echo ""
if [ $ERRORS -eq 0 ]; then
    echo "✅ All checks passed! Ready to develop."
    exit 0
else
    echo "❌ $ERRORS check(s) failed. Please fix the issues above."
    exit 1
fi
```

## Troubleshooting

### Port déjà utilisé

```bash
# Trouver le process
lsof -i :3000
lsof -i :5432

# Ou changer les ports dans docker-compose.yml
```

### Permission denied sur Docker

```bash
# Linux: ajouter l'utilisateur au groupe docker
sudo usermod -aG docker $USER
# Puis logout/login
```

### Reset complet

```bash
make clean
make setup
```
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Secrets dans le repo | Fuite de données | .env.example sans valeurs |
| Setup manuel 20 étapes | Personne ne le suit | Script automatisé |
| Pas de vérification | Setup incomplet silencieux | verify-setup.sh |
| Doc obsolète | Frustration | Tester à chaque PR |

## Références

- [12 Factor App - Dev/Prod Parity](https://12factor.net/dev-prod-parity)
- [Docker Compose Best Practices](https://docs.docker.com/compose/compose-file/)
- Livrables liés : `technical-specification`, `technical-documentation`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | web-dev-process | Création initiale |
