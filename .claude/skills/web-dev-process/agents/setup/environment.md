---
name: environment-orchestrator
description: Orchestrateur pour la configuration des environnements
---

# Orchestrateur Environnements

Ce module coordonne la configuration des environnements de développement et production.

## Agents Spécialisés

| Agent | Responsabilité |
|-------|----------------|
| `env-variables.md` | Variables d'environnement, .env, validation Zod |
| `docker.md` | Dockerfile, docker-compose, conteneurisation |
| `secrets-management.md` | Gestion sécurisée des secrets |

## Environnements Standards

```
┌─────────────────────────────────────────────────────────────┐
│                     ENVIRONNEMENTS                          │
├─────────────┬─────────────┬─────────────┬─────────────────┤
│    LOCAL    │     DEV     │   STAGING   │   PRODUCTION    │
├─────────────┼─────────────┼─────────────┼─────────────────┤
│ Machine dev │ Serveur dev │ Pré-prod    │ Prod            │
│ Données     │ Données     │ Données     │ Données         │
│ fictives    │ de test     │ anonymisées │ réelles         │
│             │             │             │                 │
│ Debug ON    │ Debug ON    │ Debug OFF   │ Debug OFF       │
└─────────────┴─────────────┴─────────────┴─────────────────┘
```

## Setup Rapide

```bash
# 1. Copier le template
cp .env.example .env.local

# 2. Éditer les variables
code .env.local

# 3. Lancer les services
docker-compose up -d

# 4. Démarrer l'app
npm run dev
```

## Fichiers Clés

| Fichier | Description | Commité |
|---------|-------------|---------|
| `.env.example` | Template des variables | ✅ Oui |
| `.env.local` | Variables locales | ❌ Non |
| `docker-compose.yml` | Services de dev | ✅ Oui |
| `Dockerfile` | Image de production | ✅ Oui |

## Agents à Consulter

- Pour les variables d'environnement → `env-variables.md`
- Pour Docker et conteneurisation → `docker.md`
- Pour la gestion des secrets → `secrets-management.md`
