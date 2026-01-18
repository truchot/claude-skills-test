---
id: changelog
name: Changelog
version: 1.0.0
category: documentation
status: active
phase: "7-maintenance"
order: 4
agents:
  - web-dev-process/maintenance/versioning
  - lead-dev/release/release-notes
consumes:
  - code-review-report
  - test-suite
produces_for:
  - support-client/resolution/technical-support
  - project-management/reporting/status-report
tags: [changelog, release, versioning, documentation, history]
---

# Changelog

## Description

Historique structuré de tous les changements du projet : nouvelles fonctionnalités, corrections de bugs, améliorations et breaking changes. Suit le format Keep a Changelog et le versioning sémantique.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown |
| **Emplacement** | `CHANGELOG.md` (racine du projet) |
| **Nommage** | `CHANGELOG.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Header** - Titre et lien vers Keep a Changelog
- [ ] **Unreleased** - Changements en attente de release
- [ ] **Versions** - Historique par version

### Catégories par Version

- [ ] `Added` - Nouvelles fonctionnalités
- [ ] `Changed` - Changements de fonctionnalités existantes
- [ ] `Deprecated` - Fonctionnalités bientôt supprimées
- [ ] `Removed` - Fonctionnalités supprimées
- [ ] `Fixed` - Corrections de bugs
- [ ] `Security` - Corrections de vulnérabilités

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Format | Keep a Changelog respecté | Manuel | Oui |
| 2 | Semver | Versioning sémantique | Manuel | Oui |
| 3 | À jour | Mis à jour à chaque release | Auto (CI) | Oui |
| 4 | User-focused | Compréhensible par non-dev | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| Git | Commits | Historique des changements |
| `lead-dev/*` | `code-review-report` | PRs mergées |
| Linear/Jira | Tickets | Références issues |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | PR | Dev | Mettre à jour Unreleased |
| 2 | Release | Lead Dev | Valider version |
| 3 | Post-release | CDP | Communiquer au client |

## Exemple

### Changelog Complet

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Filtres avancés sur le catalogue (prix, catégorie, disponibilité)
- Export CSV des commandes pour le back-office

### Changed
- Amélioration des performances de la page catalogue (-40% LCP)

### Fixed
- Correction du calcul des frais de livraison pour la Corse

---

## [1.2.0] - 2024-02-15

### Added
- 🎉 **Système de codes promo** : Les clients peuvent maintenant appliquer des codes de réduction lors du checkout
- Notification email automatique quand un produit revient en stock
- Page "Mon compte" avec historique des commandes
- Support du paiement en 3x sans frais (via Alma)

### Changed
- Refonte du tunnel de checkout : passage de 4 à 3 étapes
- Les images produits sont maintenant au format WebP (gain de 30% en poids)
- Mise à jour de la bibliothèque Stripe (v14 → v15)

### Fixed
- Correction d'un bug où le panier se vidait après connexion (#142)
- Les emails de confirmation s'affichent maintenant correctement sur Outlook (#156)
- Correction de l'affichage des prix sur Safari iOS (#163)

### Security
- Mise à jour de Next.js 14.0 → 14.1 (correction CVE-2024-XXXX)

---

## [1.1.2] - 2024-02-01

### Fixed
- 🐛 Hotfix : Les webhooks Stripe fonctionnent à nouveau après expiration du secret (#171)
- Correction du calcul TVA pour les produits à taux réduit

---

## [1.1.1] - 2024-01-25

### Fixed
- Correction de l'affichage du stock sur mobile
- Les filtres de recherche se réinitialisent correctement

### Changed
- Amélioration des messages d'erreur du formulaire de checkout

---

## [1.1.0] - 2026-01-18

### Added
- 🔍 **Recherche produits** : Barre de recherche avec suggestions instantanées
- Système de notation et avis clients
- Partage produit sur les réseaux sociaux
- Page 404 personnalisée avec suggestions de produits

### Changed
- Nouvelle mise en page de la fiche produit (galerie agrandie)
- Le bouton "Ajouter au panier" est maintenant sticky sur mobile
- Amélioration de l'accessibilité : score Lighthouse a11y 98 → 100

### Deprecated
- L'ancienne URL `/products/` sera redirigée vers `/produits/` à partir de v2.0

### Fixed
- Correction de la pagination du catalogue (#98)
- Le zoom sur les images fonctionne maintenant sur tactile (#102)
- Correction des métadonnées Open Graph pour le partage social (#108)

---

## [1.0.1] - 2024-01-08

### Fixed
- Correction urgente : Le bouton de paiement était invisible sur certains navigateurs
- Amélioration de la validation email (accepte maintenant les .shop, .store, etc.)

### Security
- Mise à jour de dépendances avec vulnérabilités connues

---

## [1.0.0] - 2024-01-01

### Added
- 🚀 **Lancement initial du site e-commerce**
- Catalogue produits avec 50 références
- Fiches produits avec galerie photos
- Panier d'achat persistant
- Tunnel de checkout complet
- Paiement sécurisé par carte bancaire (Stripe)
- Compte client avec authentification
- Back-office de gestion des produits et commandes
- Emails transactionnels (confirmation commande, expédition)
- Design responsive mobile-first
- Optimisation SEO (sitemap, meta tags, schema.org)
- Conformité RGPD (bannière cookies, politique de confidentialité)

---

## [0.9.0] - 2023-12-15 [BETA]

### Added
- Version beta pour tests internes
- Fonctionnalités e-commerce de base

---

[Unreleased]: https://github.com/client/project/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/client/project/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/client/project/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/client/project/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/client/project/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/client/project/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/client/project/releases/tag/v1.0.0
[0.9.0]: https://github.com/client/project/releases/tag/v0.9.0
```

---

### Versioning Sémantique

```
MAJOR.MINOR.PATCH
  │     │     │
  │     │     └── Bug fixes, patches (1.0.1)
  │     │
  │     └── New features, backwards compatible (1.1.0)
  │
  └── Breaking changes (2.0.0)
```

| Type de changement | Increment | Exemple |
|--------------------|-----------|---------|
| Bug fix | PATCH | 1.0.0 → 1.0.1 |
| Nouvelle feature (compatible) | MINOR | 1.0.1 → 1.1.0 |
| Breaking change | MAJOR | 1.1.0 → 2.0.0 |
| Security fix | PATCH | 1.0.0 → 1.0.1 |

---

### Génération Automatique (Conventional Commits)

Si vous utilisez [Conventional Commits](https://www.conventionalcommits.org/), vous pouvez générer le changelog automatiquement :

```bash
# Installation
npm install -D @commitlint/cli @commitlint/config-conventional

# Configuration
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

# Génération changelog
npx conventional-changelog -p angular -i CHANGELOG.md -s
```

#### Format Conventional Commits

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

| Type | Description | Changelog Section |
|------|-------------|-------------------|
| `feat` | Nouvelle fonctionnalité | Added |
| `fix` | Correction de bug | Fixed |
| `docs` | Documentation | - |
| `style` | Formatting, style | - |
| `refactor` | Refactoring | Changed |
| `perf` | Performance | Changed |
| `test` | Tests | - |
| `chore` | Maintenance | - |
| `BREAKING CHANGE` | Breaking change | Changed (MAJOR) |

#### Exemples

```bash
# Feature
git commit -m "feat(checkout): add promo code support"

# Fix
git commit -m "fix(cart): resolve cart clearing after login (#142)"

# Breaking change
git commit -m "feat(api)!: change response format for /products

BREAKING CHANGE: The products endpoint now returns paginated results.
Update your API calls to handle the new format."
```

---

### CI Automation

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Generate changelog
        id: changelog
        uses: metcalfc/changelog-generator@v4
        with:
          myToken: ${{ secrets.GITHUB_TOKEN }}

      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body: ${{ steps.changelog.outputs.changelog }}
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Pas de changelog | Historique perdu | Toujours maintenir |
| Jargon technique | Incompréhensible pour client | User-focused |
| Pas de dates | Timeline floue | Date chaque version |
| Breaking changes cachés | Surprises en prod | Toujours documenter |
| Unreleased jamais vidé | Confusion | Release régulières |

## Références

- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- Livrables liés : `technical-documentation`, `deployment-runbook`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | web-dev-process | Création initiale |
