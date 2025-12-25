# Index des Anti-Patterns

> Erreurs à éviter, documentées pour ne pas les reproduire.

## Légende Status

| Status | Signification |
|--------|---------------|
| ✅ | Documenté et validé |
| 📝 | Planifié (à documenter) |

## Par Sévérité

### Critical

| Anti-Pattern | Description | Occurrences | Status |
|--------------|-------------|-------------|--------|
| secrets-in-repo | Secrets committés dans le repo | 2 | 📝 |
| prod-without-backup | Déploiement prod sans backup | 1 | 📝 |

### High

| Anti-Pattern | Description | Occurrences | Status |
|--------------|-------------|-------------|--------|
| [env-hardcoded](./env-hardcoded.md) | Configurations hardcodées | 5 | ✅ |
| no-staging | Déploiement direct en prod | 3 | 📝 |
| skip-tests-ci | Tests désactivés en CI | 4 | 📝 |

### Medium

| Anti-Pattern | Description | Occurrences | Status |
|--------------|-------------|-------------|--------|
| cors-misconfigured | CORS mal configuré staging/prod | 6 | 📝 |
| missing-error-handling | Erreurs non gérées | 4 | 📝 |
| n-plus-one-queries | Requêtes N+1 en boucle | 3 | 📝 |

### Low

| Anti-Pattern | Description | Occurrences | Status |
|--------------|-------------|-------------|--------|
| inconsistent-naming | Nommage incohérent | 8 | 📝 |
| missing-docs | Documentation absente | 7 | 📝 |

---

## Par Catégorie

### Configuration

- [env-hardcoded](./env-hardcoded.md) ✅
- cors-misconfigured 📝
- secrets-in-repo 📝

### Déploiement

- no-staging 📝
- prod-without-backup 📝
- skip-tests-ci 📝

### Code

- missing-error-handling 📝
- n-plus-one-queries 📝
- inconsistent-naming 📝

### Documentation

- missing-docs 📝

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

- **Total anti-patterns** : 10 (1 documenté, 9 planifiés)
- **Évités ce mois** : -
- **Nouvelle occurrence** : -
- **Dernière mise à jour** : 2024-12-25

> Les métriques seront collectées une fois le système en production.
