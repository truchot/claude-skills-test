# Guide de Migration - Refactoring POURQUOI/QUOI/COMMENT

Ce document décrit les changements apportés lors du refactoring SRP (Single Responsibility Principle) utilisant le modèle POURQUOI/QUOI/COMMENT.

## Résumé des Changements

### Architecture à 3 Niveaux

```
┌─────────────────────────────────────────────────────────────────┐
│  NIVEAU 1 : POURQUOI (direction-technique)                      │
│  → Politiques, objectifs, décisions stratégiques                │
│  → Pose les questions de clarification                          │
├─────────────────────────────────────────────────────────────────┤
│  NIVEAU 2 : QUOI (web-dev-process)                              │
│  → Process, workflows, checklists, standards                    │
│  → Contextualisation en 3 couches (Métier/Agence/Projet)        │
├─────────────────────────────────────────────────────────────────┤
│  NIVEAU 3 : COMMENT (wordpress-*, tech-specific)                │
│  → Implémentation, code, configuration                          │
│  → Exécution avec specs et critères d'acceptance                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Fichiers Modifiés

### Niveau POURQUOI (direction-technique)

| Fichier | Changement | Impact |
|---------|------------|--------|
| `securite/securite-applicative.md` | **Code supprimé** (~250 lignes TS/PHP) | Ne contient plus que les politiques OWASP et standards |
| `infrastructure/environnements.md` | **Code supprimé** (Docker, TypeScript) | Ne contient plus que les politiques d'environnement |
| `qualite/code-review.md` | Frontmatter aligné | `name: code-review` (était `code-review-policy`) |
| `specification/modelisation-donnees.md` | **Code supprimé** (SQL, migrations) | Ne contient plus que les critères de décision |

### Niveau QUOI (web-dev-process)

| Fichier | Changement | Impact |
|---------|------------|--------|
| `SKILL.md` | Clarification du rôle | Explicite : QUOI seulement (pas POURQUOI) |
| `agents/design/data-modeling.md` | **Refactoré** | 3 couches : Métier/Agence/Projet |

---

## Nouveaux Fichiers Créés

### Agents de Clarification (POURQUOI)

| Fichier | Rôle |
|---------|------|
| `direction-technique/specification/clarification-donnees.md` | Framework de questions pour besoins data |
| `direction-technique/specification/clarification-composant.md` | Framework de questions pour UI/composants |

### Agents de Mapping (QUOI)

| Fichier | Rôle |
|---------|------|
| `web-dev-process/agents/design/wordpress-data-mapping.md` | Mapping entités métier → structures WordPress |
| `web-dev-process/agents/design/gutenberg-block-mapping.md` | Mapping composants UI → blocks Gutenberg |

### Workflows

| Fichier | Rôle |
|---------|------|
| `web-agency/workflows/setup-local-wordpress.md` | Workflow complet setup local WordPress |

### Templates

| Fichier | Rôle |
|---------|------|
| `web-agency/templates/agent-pourquoi.md` | Template pour créer agents POURQUOI |
| `web-agency/templates/agent-quoi.md` | Template pour créer agents QUOI |
| `web-agency/templates/agent-comment.md` | Template pour créer agents COMMENT |

### Documentation

| Fichier | Rôle |
|---------|------|
| `web-agency/docs/adr/005-skill-responsibility-boundaries.md` | ADR v2.0 du modèle |
| `docs/analysis/SRP-ANALYSIS.md` | Analyse de conformité |

---

## Breaking Changes

### 1. Code Déplacé

Le code d'implémentation a été **supprimé** des agents POURQUOI. Si vous utilisiez ces agents pour du code :

| Ancien Emplacement | Nouveau Emplacement |
|--------------------|---------------------|
| `securite-applicative.md` (code TypeScript CSRF, bcrypt) | `wordpress-gutenberg-expert/wp-core/security-validation` (WP) ou agents setup du niveau COMMENT |
| `environnements.md` (Docker, Makefile) | `web-dev-process/agents/setup/docker.md` |
| `modelisation-donnees.md` (SQL, migrations) | `wordpress-gutenberg-expert/agents/data-modeling/*` |

### 2. Références à Mettre à Jour

Si vos workflows référencent ces agents pour du code, mettez à jour :

```markdown
# Avant (incorrect)
Pour implémenter CSRF : voir `direction-technique/securite/securite-applicative.md`

# Après (correct)
Pour les politiques CSRF : voir `direction-technique/securite/securite-applicative.md`
Pour l'implémentation CSRF : voir `wordpress-gutenberg-expert/wp-core/security-validation`
```

---

## Comment Utiliser le Nouveau Modèle

### Exemple : Créer un CPT Formation

```
1. POURQUOI (clarification-donnees.md)
   → Questions : Quelles entités ? Quels attributs ? Relations ?
   → Output : Décisions documentées

2. QUOI (wordpress-data-mapping.md)
   → Mapping : Formation → register_post_type('formation')
   → Contextualisé : Métier → Agence → Projet

3. COMMENT (wordpress-gutenberg-expert/agents/*)
   → Code : register_post_type() avec specs exactes
   → Tests, critères d'acceptance
```

### Exemple : Créer un Slider de Cards

```
1. POURQUOI (clarification-composant.md)
   → Questions : Source ? Contenu cards ? Interactions ?
   → Output : Synthèse composant

2. QUOI (gutenberg-block-mapping.md)
   → Mapping : Slider → Block dynamique + Swiper.js
   → Contextualisé : Métier → Agence → Projet

3. COMMENT (wordpress-gutenberg-expert/agents/blocks/*)
   → Code : block.json, edit.js, render.php, view.js
   → Tests, critères d'acceptance
```

---

## Checklist de Migration

### Pour les Workflows Existants

- [ ] Vérifier que les références aux agents POURQUOI ne s'attendent pas à du code
- [ ] Ajouter les étapes de clarification (POURQUOI) si manquantes
- [ ] Ajouter les étapes de mapping (QUOI) si manquantes
- [ ] S'assurer que le code est délégué au niveau COMMENT

### Pour les Nouveaux Agents

- [ ] Utiliser le template approprié (`templates/agent-*.md`)
- [ ] Respecter la séparation POURQUOI/QUOI/COMMENT
- [ ] Ajouter les références croisées vers les autres niveaux
- [ ] Documenter dans le frontmatter le niveau (`Niveau POURQUOI/QUOI/COMMENT`)

---

## Référence Rapide

| Question | Niveau | Skill |
|----------|--------|-------|
| "Pourquoi fait-on ça ?" | POURQUOI | `direction-technique` |
| "Quelle est la politique ?" | POURQUOI | `direction-technique` |
| "Quel process suivre ?" | QUOI | `web-dev-process` |
| "Quelles sont les étapes ?" | QUOI | `web-dev-process` |
| "Comment coder ça ?" | COMMENT | `wordpress-*`, `react-*`, etc. |
| "Quel code utiliser ?" | COMMENT | Skills technologiques |

---

## Support

Pour toute question sur cette migration :

1. Consulter `docs/adr/005-skill-responsibility-boundaries.md`
2. Consulter `docs/analysis/SRP-ANALYSIS.md`
3. Utiliser les templates dans `web-agency/templates/`
