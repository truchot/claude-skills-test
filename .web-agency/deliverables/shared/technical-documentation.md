---
id: technical-documentation
name: Documentation Technique
version: 1.0.0
category: documentation
status: active
agents:
  - direction-technique/communication/documentation-technique
  - backend-developer/*/all
  - frontend-developer/*/all
  - devops/*/all
consumes:
  - adr
  - api-specification
  - data-model
produces_for:
  - direction-technique/communication/onboarding-technique
  - support-client/resolution/technical-support
tags: [documentation, technique, readme, guide, onboarding]
---

# Documentation Technique

## Description

Documentation destinée aux développeurs et équipes techniques, couvrant l'architecture, l'installation, la configuration et l'utilisation technique d'un projet ou composant. Ce livrable transversal est produit et consommé par de nombreux agents.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown |
| **Emplacement** | `docs/` ou `README.md` à la racine du composant |
| **Nommage** | `README.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`, `[topic].md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Titre et description** - Nom du projet/composant et description en 1-2 phrases
- [ ] **Prérequis** - Dépendances système, versions requises
- [ ] **Installation** - Étapes pour installer/démarrer
- [ ] **Configuration** - Variables d'environnement, fichiers de config
- [ ] **Utilisation** - Exemples d'utilisation basiques

### Sections Optionnelles

- [ ] **Architecture** - Diagrammes, description des composants
- [ ] **API** - Référence API si applicable
- [ ] **Tests** - Comment lancer les tests
- [ ] **Déploiement** - Instructions de déploiement
- [ ] **Contributing** - Guide de contribution
- [ ] **Troubleshooting** - Problèmes courants et solutions
- [ ] **Changelog** - Historique des versions

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Installation fonctionnelle | Un nouveau dev peut installer en suivant le doc | Test manuel | Oui |
| 2 | Prérequis complets | Toutes les dépendances listées avec versions | Manuel | Oui |
| 3 | Exemples exécutables | Les exemples de code fonctionnent | Test manuel | Oui |
| 4 | Variables d'env documentées | Toutes les vars avec description et valeurs par défaut | Manuel | Oui |
| 5 | Mise à jour | Dernière modification < 3 mois ou version stable | Auto (git) | Oui |
| 6 | Pas de secrets | Aucun secret, token, mot de passe | Auto (scan) | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `direction-technique/architecture/*` | `adr`, architecture docs | Décisions et structure |
| `backend-developer/api/*` | `api-specification` | Specs API à documenter |
| `devops/*` | Configuration infra | Variables d'env, déploiement |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Création initiale | Lead Dev | Review et correction |
| 2 | Onboarding nouveau dev | Nouveau développeur | Feedback pour amélioration |
| 3 | Release majeure | Tech Lead | Vérification exhaustivité |

## Exemple

### Exemple Minimal

```markdown
# Mon Projet

Application web de gestion des commandes.

## Prérequis

- Node.js >= 18
- PostgreSQL >= 14
- Redis >= 7

## Installation

```bash
git clone https://github.com/org/projet.git
cd projet
cp .env.example .env
npm install
npm run db:migrate
npm run dev
```

## Configuration

| Variable | Description | Défaut |
|----------|-------------|--------|
| `DATABASE_URL` | URL PostgreSQL | - |
| `REDIS_URL` | URL Redis | `redis://localhost:6379` |
| `PORT` | Port du serveur | `3000` |

## Utilisation

```bash
# Développement
npm run dev

# Production
npm run build && npm start

# Tests
npm test
```
```

### Exemple Complet

```markdown
# Mon Projet

Application web de gestion des commandes.

## Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Architecture](#architecture)
- [Utilisation](#utilisation)
- [Tests](#tests)
- [Déploiement](#déploiement)
- [Contributing](#contributing)

## Prérequis

- Node.js >= 18 (recommandé: 20 LTS)
- PostgreSQL >= 14
- Redis >= 7
- Docker & Docker Compose (optionnel)

## Installation

### Avec Docker (recommandé)

```bash
docker-compose up -d
```

### Sans Docker

```bash
git clone https://github.com/org/projet.git
cd projet
cp .env.example .env
# Éditer .env avec vos valeurs
npm install
npm run db:migrate
npm run db:seed # Données de test
npm run dev
```

## Configuration

### Variables d'environnement

| Variable | Description | Requis | Défaut |
|----------|-------------|--------|--------|
| `DATABASE_URL` | URL de connexion PostgreSQL | Oui | - |
| `REDIS_URL` | URL de connexion Redis | Non | `redis://localhost:6379` |
| `JWT_SECRET` | Secret pour les tokens JWT | Oui | - |
| `PORT` | Port du serveur HTTP | Non | `3000` |
| `LOG_LEVEL` | Niveau de log (debug, info, warn, error) | Non | `info` |

### Fichiers de configuration

- `.env` - Variables d'environnement locales
- `config/default.json` - Configuration par défaut
- `config/production.json` - Overrides production

## Architecture

```
src/
├── domain/          # Logique métier (hexagonal)
├── application/     # Use cases
├── infrastructure/  # Adapters (DB, API, etc.)
├── interfaces/      # Controllers, routes
└── shared/          # Utilitaires partagés
```

Voir [ARCHITECTURE.md](./ARCHITECTURE.md) pour plus de détails.

## Utilisation

### API

Base URL: `http://localhost:3000/api/v1`

Voir [documentation API](./docs/api/README.md).

### CLI

```bash
# Créer un utilisateur admin
npm run cli -- user:create --admin

# Lancer une migration
npm run db:migrate
```

## Tests

```bash
# Tous les tests
npm test

# Tests unitaires
npm run test:unit

# Tests d'intégration
npm run test:integration

# Couverture
npm run test:coverage
```

## Déploiement

Voir [DEPLOYMENT.md](./DEPLOYMENT.md).

## Contributing

Voir [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Doc obsolète | Induit en erreur, perte de temps | Process de mise à jour à chaque PR |
| Installation qui échoue | Onboarding bloqué | Tester régulièrement sur machine vierge |
| Secrets dans les exemples | Risque de sécurité si copié | Utiliser des placeholders `<YOUR_SECRET>` |
| Pas de table des matières | Navigation difficile | Ajouter TOC pour docs > 100 lignes |
| Jargon non expliqué | Incompréhensible pour nouveaux | Glossaire ou liens vers définitions |

## Références

- [The Documentation System](https://documentation.divio.com/)
- [Write the Docs](https://www.writethedocs.org/)
- [README Best Practices](https://github.com/matiassingers/awesome-readme)
- Livrables liés : `adr`, `api-documentation`, `onboarding-guide`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | direction-technique | Création initiale |
