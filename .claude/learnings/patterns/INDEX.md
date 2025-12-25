# Index des Patterns

> Patterns réutilisables validés par l'expérience projet.

## Légende Status

| Status | Signification |
|--------|---------------|
| ✅ | Documenté et validé |
| 📝 | Planifié (à documenter) |

## Par Catégorie

### Setup & Environnement

| Pattern | Description | Usage | Status |
|---------|-------------|-------|--------|
| [wp-env-optimal](./wp-env-optimal.md) | Configuration wp-env optimale | 12 projets | ✅ |
| multi-env-config | Gestion multi-environnement | 8 projets | 📝 |

### CI/CD & Déploiement

| Pattern | Description | Usage | Status |
|---------|-------------|-------|--------|
| [github-actions-wp](./github-actions-wp.md) | Pipeline GitHub Actions WordPress | 10 projets | ✅ |
| [staging-protection](./staging-protection.md) | Protection staging avec htpasswd | 15 projets | ✅ |

### Architecture & Code

| Pattern | Description | Usage | Status |
|---------|-------------|-------|--------|
| block-theme-structure | Structure block theme FSE | 6 projets | 📝 |
| cpt-with-capabilities | CPT avec permissions custom | 9 projets | 📝 |

### Testing

| Pattern | Description | Usage | Status |
|---------|-------------|-------|--------|
| e2e-critical-paths | Tests E2E des parcours critiques | 7 projets | 📝 |

### Sécurité

| Pattern | Description | Usage | Status |
|---------|-------------|-------|--------|
| [secrets-management](./secrets-management.md) | Gestion des secrets | 12 projets | ✅ |

---

## Par Tags

### WordPress
- [wp-env-optimal](./wp-env-optimal.md) ✅
- block-theme-structure 📝
- cpt-with-capabilities 📝

### DevOps
- [github-actions-wp](./github-actions-wp.md) ✅
- multi-env-config 📝
- [staging-protection](./staging-protection.md) ✅

### Testing
- e2e-critical-paths 📝

### Sécurité
- [secrets-management](./secrets-management.md) ✅

---

## Ajouter un Pattern

1. Utiliser le template : `../templates/pattern.md`
2. Créer le fichier dans ce dossier
3. Mettre à jour cet INDEX
4. Valider avec `npm run test:learnings`

---

## Statistiques

- **Total patterns** : 8 (4 documentés, 4 planifiés)
- **Patterns validés** : 4
- **Utilisations ce mois** : -
- **Dernière mise à jour** : 2024-12-25

> Les métriques seront collectées une fois le système en production.
