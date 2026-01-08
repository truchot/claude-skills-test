---
name: fix-bug
description: Corriger un bug de manière structurée
triggers: [bug, fix, correction, erreur, problème]
skills: [git, testing]
calls: [code-review]
roles: [frontend-developer, backend-developer, fullstack-developer]
---

# Corriger un Bug

## Objectif

Identifier, corriger et prévenir la récurrence d'un bug.

## Pré-requis

- [ ] Bug reporté avec étapes de reproduction
- [ ] Environnement pour reproduire
- [ ] Accès aux logs si nécessaire

## Étapes

### 1. Reproduction

**Avant de corriger, reproduire le bug.**

- [ ] Lire le rapport de bug
- [ ] Reproduire le bug localement
- [ ] Identifier les conditions exactes
- [ ] Documenter les étapes de reproduction

**Si non reproductible** :
- Demander plus d'informations
- Vérifier l'environnement (version, config)
- Consulter les logs de production

### 2. Investigation

Trouver la cause racine.

```bash
# Chercher dans les logs
grep -r "error" logs/

# Git bisect pour trouver le commit fautif
git bisect start
git bisect bad HEAD
git bisect good <commit-qui-marchait>
```

**Questions à se poser** :
- Quand le bug est-il apparu ?
- Quel changement l'a introduit ?
- Pourquoi les tests ne l'ont pas détecté ?

- [ ] Cause racine identifiée
- [ ] Commit/changement fautif trouvé (si applicable)

### 3. Branching

→ **skill**: `git`

```bash
git checkout main
git pull origin main
git checkout -b fix/TICKET-123-description-bug
```

**Convention** :
- `fix/<ticket>-<description>` pour bugs normaux
- `hotfix/<ticket>-<description>` pour bugs critiques en prod

### 4. Écrire le Test

→ **skill**: `testing`

**D'abord, écrire un test qui échoue.**

```typescript
test('should not crash when user is null', () => {
  // Ce test doit échouer avant le fix
  expect(() => processUser(null)).not.toThrow();
});
```

- [ ] Test qui reproduit le bug écrit
- [ ] Test échoue (confirme le bug)

### 5. Correction

→ **skills**: selon contexte

Appliquer la correction minimale.

**Principes** :
- Correction ciblée (pas de refactoring)
- Changement minimal
- Pas d'effets de bord

```bash
git add -p
git commit -m "fix(scope): description du fix

Fixes #123"
```

- [ ] Bug corrigé
- [ ] Test passe maintenant

### 6. Tests de Non-Régression

→ **skill**: `testing`

```bash
# Tous les tests doivent passer
npm test

# Vérifier manuellement si nécessaire
npm run dev
```

- [ ] Tous les tests passent
- [ ] Pas de régression introduite
- [ ] Bug ne se reproduit plus manuellement

### 7. Documentation

Si le bug révèle un problème récurrent :

- [ ] Commenter le code si piège non évident
- [ ] Mettre à jour la documentation si nécessaire
- [ ] Ajouter au runbook si bug de production

### 8. Push et Review

→ **skill**: `git`
→ **workflow**: `code-review`

```bash
git push -u origin fix/TICKET-123-description-bug
```

PR avec :
- [ ] Description du bug
- [ ] Explication de la cause
- [ ] Description du fix
- [ ] Référence au ticket

### 9. Merge et Vérification

- [ ] PR approuvée et mergée
- [ ] Vérifier en staging/preprod
- [ ] Ticket fermé avec commentaire

## Outputs

- Bug corrigé et mergé
- Test de non-régression ajouté
- Ticket fermé
- Post-mortem si bug critique

## Priorisation des Bugs

| Sévérité | Impact | Action |
|----------|--------|--------|
| **Critique** | Prod down, perte données | Hotfix immédiat |
| **Majeur** | Fonctionnalité cassée | Fix prioritaire |
| **Mineur** | Gêne utilisateur | Sprint suivant |
| **Trivial** | Cosmétique | Backlog |

## Erreurs Courantes

| Erreur | Cause | Solution |
|--------|-------|----------|
| Fix qui casse autre chose | Pas assez de tests | Écrire le test AVANT |
| Bug réapparaît | Cause racine non traitée | Investigation plus profonde |
| Fix trop large | Mélange fix + refactoring | Séparer en 2 PRs |

## Escalade

- **Bug critique prod** → `devops-engineer` + `tech-lead`
- **Cause inconnue** → `tech-lead`
- **Impact utilisateur majeur** → `project-manager`
