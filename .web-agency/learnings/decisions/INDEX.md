# Index des Décisions Archétypales

> Décisions techniques récurrentes avec arbres de décision.

## Décisions Documentées

### Environnement & Tooling

| Décision | Contexte | Défaut |
|----------|----------|--------|
| [when-wpenv-vs-docker](./when-wpenv-vs-docker.md) | Choix env local WordPress | wp-env |
| [when-composer-vs-wpackagist](./when-composer-vs-wpackagist.md) | Gestion dépendances WP | Composer + wpackagist |
| [when-npm-vs-yarn-vs-pnpm](./when-npm-vs-yarn-vs-pnpm.md) | Package manager JS | npm |

### Architecture WordPress

| Décision | Contexte | Défaut |
|----------|----------|--------|
| [when-acf-vs-native-meta](./when-acf-vs-native-meta.md) | Champs personnalisés | ACF (si budget) |
| [when-gutenberg-vs-pagebuilder](./when-gutenberg-vs-pagebuilder.md) | Éditeur de contenu | Gutenberg natif |
| [when-cpt-vs-taxonomy](./when-cpt-vs-taxonomy.md) | Modélisation données | Dépend du cas |
| [when-classic-vs-block-theme](./when-classic-vs-block-theme.md) | Type de thème | Block theme |

### CI/CD & Déploiement

| Décision | Contexte | Défaut |
|----------|----------|--------|
| [when-github-vs-gitlab](./when-github-vs-gitlab.md) | Plateforme Git | GitHub |
| [when-ssh-vs-git-deploy](./when-ssh-vs-git-deploy.md) | Méthode déploiement | SSH + rsync |
| [when-staging-required](./when-staging-required.md) | Environnement staging | Toujours |

### Testing

| Décision | Contexte | Défaut |
|----------|----------|--------|
| [when-e2e-vs-integration](./when-e2e-vs-integration.md) | Type de tests | Les deux |
| [when-playwright-vs-cypress](./when-playwright-vs-cypress.md) | Framework E2E | Playwright |

---

## Arbre de Décision Global

```
Nouveau Projet WordPress
│
├─ Éditeur de contenu ?
│  ├─ Client technique + FSE → Gutenberg natif
│  ├─ Client non-technique → Gutenberg + patterns simples
│  └─ Legacy/migration → Évaluer cas par cas
│
├─ Type de thème ?
│  ├─ Nouveau projet 2024+ → Block theme
│  ├─ Migration existant → Hybrid (transition)
│  └─ Contrainte plugin legacy → Classic theme
│
├─ Champs personnalisés ?
│  ├─ Budget suffisant → ACF Pro
│  ├─ Budget limité → ACF free ou natif
│  └─ Performance critique → Meta natifs
│
├─ Environnement local ?
│  ├─ Standard agence → wp-env
│  ├─ Besoin Redis/Elastic → Docker custom
│  └─ Débutant → Local by Flywheel
│
├─ CI/CD ?
│  ├─ Repo GitHub → GitHub Actions
│  ├─ Repo GitLab → GitLab CI
│  └─ Hébergement spécifique → Adapter
│
└─ Staging ?
   └─ TOUJOURS (voir when-staging-required.md)
```

---

## Comment Utiliser

### Avant un nouveau projet

1. Parcourir cet index
2. Identifier les décisions applicables
3. Suivre les arbres de décision
4. Documenter les écarts dans `.learnings/decisions/`

### Quand on hésite

1. Chercher une décision similaire ici
2. Si elle existe : suivre la recommandation ou justifier l'écart
3. Si elle n'existe pas : documenter après la décision

---

## Ajouter une Décision

1. Utiliser le template : `../templates/decision.md`
2. Créer le fichier dans ce dossier
3. Mettre à jour cet INDEX
4. Valider avec `npm run test:learnings`

---

## Statistiques

- **Total décisions** : 12
- **Consultées ce mois** : 28
- **Écarts documentés** : 3
- **Dernière mise à jour** : 2024-12-24
