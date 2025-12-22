# ADR-005 : Frontières de Responsabilités entre Skills Techniques

## Statut

Accepté

## Date

2024-12-22

## Contexte

L'analyse SRP a révélé des **chevauchements significatifs** entre trois skills techniques :
- `direction-technique` (52 agents)
- `web-dev-process` (61 agents)
- `wordpress-gutenberg-expert` (41 agents)

### Problèmes identifiés

1. **Duplications CI/CD** : 4 agents dans 3 skills parlent de CI/CD
2. **Duplications Code Review** : 2 agents quasi-identiques
3. **Duplications Architecture** : 2 agents qui se chevauchent
4. **Confusion sur qui fait quoi** : Où s'arrête la stratégie ? Où commence l'implémentation ?

### Questions récurrentes

- "Pour configurer CI/CD, j'utilise quel skill ?"
- "La code review, c'est direction-technique ou web-dev-process ?"
- "L'architecture, c'est stratégique ou opérationnel ?"

## Décision

Adopter une **séparation en 3 niveaux de responsabilité** :

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         NIVEAU 1 : STRATÉGIE                                 │
│                       (direction-technique)                                  │
│                                                                              │
│  Responsabilité : DÉCIDER quoi faire et pourquoi                            │
│  Questions : "Quelle stack ?", "Quelle architecture ?", "Quels standards ?" │
│  Output : Décisions, ADRs, Standards, Politiques                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         NIVEAU 2 : PROCESSUS                                 │
│                        (web-dev-process)                                     │
│                                                                              │
│  Responsabilité : DÉFINIR comment faire (générique)                         │
│  Questions : "Quel workflow ?", "Quelles étapes ?", "Quelles bonnes         │
│              pratiques ?"                                                    │
│  Output : Process, Templates, Checklists, Guides                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       NIVEAU 3 : IMPLÉMENTATION                              │
│                   (wordpress-gutenberg-expert, etc.)                         │
│                                                                              │
│  Responsabilité : EXÉCUTER avec une technologie spécifique                  │
│  Questions : "Quel code ?", "Quelle config ?", "Quelle commande ?"          │
│  Output : Code, Configurations, Scripts                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Règles de Délimitation

#### 1. CI/CD

| Niveau | Skill | Responsabilité | Exemple |
|--------|-------|----------------|---------|
| Stratégie | direction-technique | "On fait du CI/CD avec quality gates" | Décision d'adopter CI/CD |
| Processus | web-dev-process | "Pipeline = build → test → deploy" | Structure du pipeline |
| Implémentation | wordpress-* | "GitHub Actions avec wp-env" | Code YAML spécifique |

**Règle** : `direction-technique` décide, `web-dev-process` structure, `wordpress-*` implémente.

#### 2. Code Review

| Niveau | Skill | Responsabilité |
|--------|-------|----------------|
| Stratégie | direction-technique | "On fait des code reviews obligatoires" |
| Processus | web-dev-process | "Checklist de review, process PR" |
| Implémentation | - | Pas besoin (GitHub/GitLab natif) |

**Règle** : Supprimer `direction-technique/qualite/code-review.md`, garder `web-dev-process/development/code-review.md`.

#### 3. Architecture

| Niveau | Skill | Responsabilité |
|--------|-------|----------------|
| Stratégie | direction-technique | "Architecture hexagonale, patterns" |
| Processus | web-dev-process | "Comment documenter l'architecture" |
| Implémentation | wordpress-* | "Architecture block theme" |

**Règle** : `direction-technique/architecture/*` = décisions. `web-dev-process/design/architecture.md` → renommer en `architecture-documentation.md`.

#### 4. Qualité / Linting

| Niveau | Skill | Responsabilité |
|--------|-------|----------------|
| Stratégie | direction-technique | "Standards : ESLint strict, coverage 80%" |
| Processus | web-dev-process | "Comment configurer, quel workflow" |
| Implémentation | wordpress-* | "PHPCS WordPress, ESLint WP" |

### Matrice de Responsabilités Finale

| Domaine | direction-technique | web-dev-process | wordpress-* |
|---------|---------------------|-----------------|-------------|
| **CI/CD** | Politique | Process & Templates | Config spécifique |
| **Code Review** | ❌ Supprimer | Process complet | - |
| **Architecture** | Décisions & Patterns | Documentation | Implémentation WP |
| **Tests** | Politique (coverage, etc.) | Types & Process | PHPUnit, Jest WP |
| **Qualité** | Standards & Métriques | Outils & Config | PHPCS, ESLint WP |
| **Sécurité** | Politiques OWASP/RGPD | Audits & Checklists | Nonces, Sanitize |
| **Performance** | Objectifs & SLOs | Audits & Outils | WP-specific |

## Conséquences

### Positives

- **Clarté** : Chaque skill a un rôle unique et clair
- **Pas de duplication** : Une seule source de vérité par domaine
- **Scalabilité** : Ajouter un skill d'implémentation (React, Vue) sans toucher aux autres
- **Maintenabilité** : Modifier un niveau sans impacter les autres

### Négatives

- **Refactoring nécessaire** : Supprimer/déplacer des agents existants
- **Documentation** : Mettre à jour tous les orchestrateurs
- **Apprentissage** : Les utilisateurs doivent comprendre les 3 niveaux

### Neutres

- Le nombre total d'agents reste similaire (réorganisation, pas réduction)

## Actions Requises

### Haute Priorité

1. **Supprimer** `direction-technique/qualite/code-review.md` (doublon)
2. **Renommer** `web-dev-process/design/architecture.md` → `architecture-documentation.md`
3. **Clarifier** dans chaque orchestrateur : "Ce skill est de niveau X"

### Moyenne Priorité

4. **Ajouter** dans chaque agent volumineux : référence au niveau supérieur/inférieur
5. **Documenter** les handoffs entre niveaux

### Basse Priorité

6. **Créer** un schéma visuel dans web-agency/README.md

## Alternatives Considérées

### 1. Fusionner direction-technique et web-dev-process

**Rejeté car** :
- Skill trop volumineux (100+ agents)
- Perte de la séparation stratégie/opérationnel
- Difficile à maintenir

### 2. Tout centraliser dans wordpress-gutenberg-expert

**Rejeté car** :
- Perte de la réutilisabilité pour d'autres stacks
- Violation du principe DRY si on ajoute React, Vue, etc.

### 3. Créer un skill "shared-processes"

**Rejeté car** :
- Ajoute de la complexité
- web-dev-process remplit déjà ce rôle

## Références

- [ADR-001: Single Responsibility Agents](001-single-responsibility-agents.md)
- [ADR-002: Hierarchical Orchestrators](002-hierarchical-orchestrators.md)
- [Analyse SRP](../../../docs/analysis/SRP-ANALYSIS.md)
