---
id: decision-001
category: tooling
tags: [wordpress, environment, docker, wp-env, local]
created: 2024-12-24
last_updated: 2024-12-24
---

# Décision: Quand choisir wp-env vs Docker Custom

## Contexte

**Situation où cette décision se pose :**

Démarrage d'un nouveau projet WordPress, choix de l'environnement de développement local.

**Questions typiques :**

- "Dois-je utiliser wp-env ou créer ma propre config Docker ?"
- "wp-env est-il suffisant pour mon projet ?"

## Options

### Option A: wp-env

**Description :**

Outil officiel WordPress pour environnements de développement, basé sur Docker mais abstrait.

**Avantages :**

- Configuration minimale (1 fichier JSON)
- Maintenu par l'équipe WordPress
- Intégration native avec @wordpress/scripts
- Start/stop en secondes
- Parité garantie avec WordPress.org

**Inconvénients :**

- Pas de services additionnels (Redis, Elasticsearch)
- Moins flexible pour configs custom
- Pas de xdebug out-of-box (nécessite override)

**Quand choisir :**

- Projet WordPress standard
- Développement de thème/plugin
- Équipe habituée à npm/node
- Besoin de démarrer rapidement

**Configuration exemple :**

```json
{
  "core": "WordPress/WordPress#6.4",
  "phpVersion": "8.2",
  "plugins": ["."],
  "config": {
    "WP_DEBUG": true
  }
}
```

---

### Option B: Docker Custom

**Description :**

Configuration Docker personnalisée avec docker-compose.yml.

**Avantages :**

- Contrôle total sur l'environnement
- Services additionnels (Redis, Elasticsearch, Mailhog)
- Configuration xdebug native
- Multi-sites/multi-projets facile

**Inconvénients :**

- Configuration initiale complexe
- Maintenance de la stack
- Courbe d'apprentissage Docker
- Fichiers de config à versionner

**Quand choisir :**

- Projet avec Redis/Elasticsearch
- Architecture microservices
- Besoin de services spécifiques
- Équipe DevOps disponible

**Configuration exemple :**

```yaml
version: '3.8'
services:
  wordpress:
    image: wordpress:6.4-php8.2
    volumes:
      - ./wp-content:/var/www/html/wp-content
    environment:
      WORDPRESS_DB_HOST: db
  db:
    image: mysql:8.0
  redis:
    image: redis:alpine
  mailhog:
    image: mailhog/mailhog
```

---

## Arbre de Décision

```
Nouveau projet WordPress ?
│
├─ Besoin de Redis/Elasticsearch ?
│  ├─ Oui → Docker Custom
│  └─ Non → Continuer
│
├─ Architecture microservices ?
│  ├─ Oui → Docker Custom
│  └─ Non → Continuer
│
├─ Équipe principalement front/JS ?
│  ├─ Oui → wp-env (plus familier npm)
│  └─ Non → Continuer
│
├─ Besoin de démarrer en < 1 jour ?
│  ├─ Oui → wp-env
│  └─ Non → Évaluer besoins spécifiques
│
└─ Par défaut → wp-env
```

## Tableau Comparatif

| Critère | wp-env | Docker Custom |
|---------|--------|---------------|
| Facilité setup | ⭐⭐⭐ | ⭐ |
| Flexibilité | ⭐⭐ | ⭐⭐⭐ |
| Maintenance | ⭐⭐⭐ | ⭐⭐ |
| Performance | ⭐⭐⭐ | ⭐⭐⭐ |
| Courbe apprentissage | Facile | Moyenne |
| Services additionnels | ⭐ | ⭐⭐⭐ |
| Debug (xdebug) | ⭐⭐ | ⭐⭐⭐ |
| Support communauté | Excellent | Bon |

## Exemples Réels

### Projet Client ABC → wp-env

**Contexte :**

Site vitrine WordPress classique, équipe front-end, deadline serrée.

**Raison du choix :**

- Pas de besoin de services additionnels
- Équipe familière avec npm
- Setup en 10 minutes

**Résultat :**

Excellent. Onboarding nouveaux devs en 8 minutes.

---

### Projet Client XYZ → Docker Custom

**Contexte :**

E-commerce WooCommerce avec cache Redis et recherche Elasticsearch.

**Raison du choix :**

- Redis obligatoire pour performance
- Elasticsearch pour recherche produits
- Mailhog pour tests emails

**Résultat :**

Setup initial plus long (2h) mais environnement complet.

---

### Projet Client DEF → wp-env avec extension

**Contexte :**

Plugin WordPress avec besoin de xdebug.

**Décision :**

wp-env + .wp-env.override.json pour xdebug

**Configuration :**

```json
{
  "phpVersion": "8.2",
  "config": {
    "XDEBUG_MODE": "debug",
    "XDEBUG_CONFIG": "client_host=host.docker.internal"
  }
}
```

**Résultat :**

Bon compromis, setup simple avec debug fonctionnel.

## Recommandation Par Défaut

> **En cas de doute, choisir : wp-env**
>
> Raison : Plus simple à maintenir, officiellement supporté, suffisant pour 80% des projets WordPress. Migrer vers Docker custom est toujours possible si les besoins évoluent.

## Voir Aussi

- [Pattern: wp-env-optimal](../patterns/wp-env-optimal.md)
- [Pattern: docker-wordpress-stack](../patterns/docker-wordpress-stack.md)
- [Anti-pattern: env-hardcoded](../anti-patterns/env-hardcoded.md)

## Références

- [wp-env Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)
- [Docker WordPress Official](https://hub.docker.com/_/wordpress)
- [Local by Flywheel](https://localwp.com/) (alternative GUI)
