# Index des Anti-Patterns

> Erreurs à éviter, documentées pour ne pas les reproduire.

## Par Sévérité

### Critical

| Anti-Pattern | Description | Occurrences |
|--------------|-------------|-------------|
| [secrets-in-repo](./secrets-in-repo.md) | Secrets committés dans le repo | 2 |
| [prod-without-backup](./prod-without-backup.md) | Déploiement prod sans backup | 1 |

### High

| Anti-Pattern | Description | Occurrences |
|--------------|-------------|-------------|
| [env-hardcoded](./env-hardcoded.md) | Configurations hardcodées | 5 |
| [no-staging](./no-staging.md) | Déploiement direct en prod | 3 |
| [skip-tests-ci](./skip-tests-ci.md) | Tests désactivés en CI | 4 |

### Medium

| Anti-Pattern | Description | Occurrences |
|--------------|-------------|-------------|
| [cors-misconfigured](./cors-misconfigured.md) | CORS mal configuré staging/prod | 6 |
| [missing-error-handling](./missing-error-handling.md) | Erreurs non gérées | 4 |
| [n-plus-one-queries](./n-plus-one-queries.md) | Requêtes N+1 en boucle | 3 |

### Low

| Anti-Pattern | Description | Occurrences |
|--------------|-------------|-------------|
| [inconsistent-naming](./inconsistent-naming.md) | Nommage incohérent | 8 |
| [missing-docs](./missing-docs.md) | Documentation absente | 7 |

---

## Par Catégorie

### Configuration

- [env-hardcoded](./env-hardcoded.md)
- [cors-misconfigured](./cors-misconfigured.md)
- [secrets-in-repo](./secrets-in-repo.md)

### Déploiement

- [no-staging](./no-staging.md)
- [prod-without-backup](./prod-without-backup.md)
- [skip-tests-ci](./skip-tests-ci.md)

### Code

- [missing-error-handling](./missing-error-handling.md)
- [n-plus-one-queries](./n-plus-one-queries.md)
- [inconsistent-naming](./inconsistent-naming.md)

### Documentation

- [missing-docs](./missing-docs.md)

---

## Signaux d'Alerte

Comment détecter ces anti-patterns avant qu'ils ne causent des problèmes :

| Signal | Anti-pattern potentiel | Action |
|--------|------------------------|--------|
| Pas de fichier `.env.example` | env-hardcoded | Vérifier la config |
| Pas de branche `staging` | no-staging | Discuter avec le client |
| `--no-verify` dans les commits | skip-tests-ci | Review immédiate |
| Erreurs CORS en console | cors-misconfigured | Vérifier les headers |

---

## Ajouter un Anti-Pattern

1. Utiliser le template : `../templates/anti-pattern.md`
2. Créer le fichier dans ce dossier
3. Mettre à jour cet INDEX
4. Valider avec `npm run test:learnings`

---

## Statistiques

- **Total anti-patterns** : 10
- **Évités ce mois** : 23
- **Nouvelle occurrence** : 2
- **Dernière mise à jour** : 2024-12-24
