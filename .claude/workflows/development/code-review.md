---
name: code-review
description: Processus de revue de code
triggers: [review, PR, pull request, revue de code]
skills: [git]
calls: []
roles: [frontend-developer, backend-developer, fullstack-developer, tech-lead]
---

# Code Review

## Objectif

Assurer la qualité du code, partager les connaissances et détecter les problèmes avant merge.

## Pré-requis (Auteur)

- [ ] Code fonctionnel et testé
- [ ] PR créée avec description claire
- [ ] CI/CD passe (tests, lint)
- [ ] Self-review effectuée

## Étapes - Auteur

### 1. Préparer la PR

```markdown
## Description
[Ce que fait cette PR]

## Type de changement
- [ ] Feature
- [ ] Bug fix
- [ ] Refactoring
- [ ] Documentation

## Comment tester
1. Étape 1
2. Étape 2

## Screenshots (si UI)
[Images]

## Checklist
- [ ] Tests ajoutés/mis à jour
- [ ] Documentation mise à jour
- [ ] Pas de console.log
```

### 2. Assigner les Reviewers

- Au moins 1 reviewer requis
- 2 pour les changements critiques
- Inclure un expert du domaine si nécessaire

### 3. Répondre aux Commentaires

- Répondre à TOUS les commentaires
- Argumenter si désaccord
- Pusher les corrections
- Re-demander review si changements majeurs

## Étapes - Reviewer

### 1. Contexte

Avant de lire le code :

- [ ] Lire la description de la PR
- [ ] Comprendre le "pourquoi"
- [ ] Vérifier le ticket lié

### 2. Review Automatique

Vérifier que la CI passe :

- [ ] Tests passent
- [ ] Lint/format OK
- [ ] Build OK
- [ ] Coverage maintenue

### 3. Review du Code

**Par ordre de priorité :**

#### A. Fonctionnalité
- [ ] Le code fait ce qui est demandé
- [ ] Les edge cases sont gérés
- [ ] Pas de bugs évidents

#### B. Architecture
- [ ] Bon emplacement du code
- [ ] Responsabilités claires
- [ ] Pas de duplication
- [ ] Patterns du projet respectés

#### C. Lisibilité
- [ ] Nommage explicite
- [ ] Code auto-documenté
- [ ] Complexité raisonnable
- [ ] Commentaires si nécessaire (et non triviaux)

#### D. Tests
- [ ] Tests pertinents ajoutés
- [ ] Cas nominaux couverts
- [ ] Edge cases couverts
- [ ] Tests lisibles

#### E. Sécurité
- [ ] Pas de secrets en dur
- [ ] Inputs validés
- [ ] Pas d'injection possible
- [ ] Permissions vérifiées

#### F. Performance
- [ ] Pas de N+1 queries
- [ ] Pas de boucles inutiles
- [ ] Ressources libérées

### 4. Commenter

**Types de commentaires :**

```
[MUST] - Bloquant, doit être corrigé
[SHOULD] - Recommandé fortement
[NIT] - Nitpick, suggestion mineure
[QUESTION] - Demande de clarification
[PRAISE] - Compliment, bonne pratique
```

**Exemples :**

```
[MUST] Cette query N+1 va poser des problèmes de performance.
Suggestion: utiliser un JOIN ou eager loading.

[SHOULD] Ce bloc pourrait être extrait dans une fonction
pour améliorer la lisibilité.

[NIT] Typo dans le nom de variable: `usernmae` → `username`

[QUESTION] Pourquoi ce timeout de 5000ms ?
Est-ce documenté quelque part ?

[PRAISE] Bonne utilisation du pattern Strategy ici !
```

### 5. Décision

| Décision | Quand |
|----------|-------|
| **Approve** | Code OK, prêt à merger |
| **Comment** | Questions/suggestions, pas bloquant |
| **Request Changes** | Problèmes à corriger avant merge |

## Bonnes Pratiques

### Pour l'Auteur

- PRs petites (< 400 lignes idéalement)
- Un sujet par PR
- Description claire et contexte
- Répondre rapidement aux commentaires

### Pour le Reviewer

- Review dans les 24h
- Être constructif, pas destructif
- Proposer des solutions, pas juste critiquer
- Distinguer bloquant vs suggestion

### Communication

```
❌ "Ce code est nul"
✅ "Ce pattern pose problème car X. As-tu considéré Y ?"

❌ "Pourquoi tu fais ça comme ça ?"
✅ "Je ne comprends pas le choix de X. Peux-tu expliquer ?"

❌ "Ça ne marchera jamais"
✅ "Je vois un cas où ça pourrait échouer : [exemple]"
```

## Checklist Reviewer

```markdown
## Review Checklist

### Fonctionnel
- [ ] Répond au besoin
- [ ] Edge cases gérés

### Qualité
- [ ] Code lisible
- [ ] Nommage explicite
- [ ] Pas de duplication
- [ ] Tests pertinents

### Sécurité
- [ ] Pas de secrets
- [ ] Inputs validés

### Performance
- [ ] Pas de N+1
- [ ] Complexité raisonnable
```

## Escalade

- **Désaccord technique** → `tech-lead` pour arbitrage
- **PR bloquée > 48h** → Relance ou pair review
- **Changement architectural majeur** → Review collective
