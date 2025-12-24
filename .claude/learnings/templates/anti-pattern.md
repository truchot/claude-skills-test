---
id: antipattern-XXX
severity: low|medium|high|critical
tags: [tag1, tag2, tag3]
first_occurrence: YYYY-MM-DD
occurrence_count: 1
---

# Anti-Pattern: [Nom de l'Anti-Pattern]

## Symptôme

**Comment détecter ce problème :**

- Signal 1 : [Description]
- Signal 2 : [Description]
- Signal 3 : [Description]

**Exemple de manifestation :**

```[language]
[Code ou configuration problématique]
```

## Pourquoi c'est un Problème

### Impact Technique

- Impact 1
- Impact 2

### Impact Business

- Impact 1
- Impact 2

### Coût Typique

| Aspect | Coût estimé |
|--------|-------------|
| Temps de debug | Xh |
| Risque incident | Moyen/Haut |
| Dette technique | +X |

## Solution

### Correction Immédiate

```[language]
[Code corrigé]
```

### Explication

[Pourquoi cette solution fonctionne]

## Prévention

### Checklist Avant Action

- [ ] Vérification 1
- [ ] Vérification 2
- [ ] Vérification 3

### Outils de Détection

| Outil | Configuration | Quand |
|-------|---------------|-------|
| ESLint/PHPCS | Rule X | Pre-commit |
| CI check | Script Y | Pull request |

### Test Automatisé

```javascript
// Test pour détecter cet anti-pattern
test('should not have [antipattern]', () => {
  // ...
});
```

## Occurrences Documentées

| Projet | Date | Impact | Résolution |
|--------|------|--------|------------|
| Projet X | YYYY-MM-DD | 2h debug | Fix X |
| Projet Y | YYYY-MM-DD | Incident prod | Rollback + fix |

## Voir Aussi

- [Pattern correct](../patterns/xxx.md)
- [Décision associée](../decisions/xxx.md)
- [Anti-pattern similaire](../anti-patterns/xxx.md)

## Références

- [Documentation officielle]
- [Article expliquant le problème]
