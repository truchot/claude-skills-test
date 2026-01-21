# Code Review : PR #{{PR_NUMBER}}

> **Feature** : {{FEATURE_NAME}}
> **Auteur** : {{AUTHOR}}
> **Reviewer** : {{REVIEWER}}
> **Date** : {{DATE}}
> **Statut** : 🟡 En cours | ✅ Approuvé | ❌ Changements requis

---

## Résumé PR

{{PR_SUMMARY}}

## Fichiers modifiés

| Fichier | Lignes | Type de changement |
|---------|--------|-------------------|
| `{{FILE_1}}` | +{{ADD}} -{{DEL}} | {{TYPE}} |

## Checklist Review

### Code Quality

- [ ] Code lisible et bien structuré
- [ ] Nommage clair (variables, fonctions, classes)
- [ ] Pas de code dupliqué
- [ ] Pas de code mort
- [ ] Complexité acceptable

### TypeScript

- [ ] Types explicites où nécessaire
- [ ] Pas de `any` injustifié
- [ ] Interfaces/Types bien définis

### Tests

- [ ] Tests unitaires présents
- [ ] Tests couvrent les cas principaux
- [ ] Tests couvrent les cas d'erreur
- [ ] Tests passent

### Sécurité

- [ ] Input validation présente
- [ ] Pas de données sensibles exposées
- [ ] Pas d'injection possible
- [ ] Permissions vérifiées

### Performance

- [ ] Pas de N+1 queries
- [ ] Pas de boucles inutiles
- [ ] Ressources libérées correctement

### Documentation

- [ ] Code auto-documenté
- [ ] Commentaires si logique complexe
- [ ] README mis à jour si nécessaire

## Commentaires

### 🔴 Bloquants

| Fichier:Ligne | Commentaire |
|---------------|-------------|
| `{{FILE}}:{{LINE}}` | {{COMMENT}} |

### 🟡 Suggestions

| Fichier:Ligne | Commentaire |
|---------------|-------------|
| `{{FILE}}:{{LINE}}` | {{COMMENT}} |

### 🟢 Positifs

- {{POSITIVE_1}}
- {{POSITIVE_2}}

## Questions

- [ ] {{QUESTION_1}}

## Décision

**Statut** : {{FINAL_STATUS}}

**Commentaire** : {{FINAL_COMMENT}}

---

## Historique

| Date | Action | Par |
|------|--------|-----|
| {{DATE}} | Review initiale | {{REVIEWER}} |
| {{DATE}} | Corrections | {{AUTHOR}} |
| {{DATE}} | Approbation | {{REVIEWER}} |
