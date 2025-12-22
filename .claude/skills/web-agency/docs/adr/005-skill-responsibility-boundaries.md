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
│                    NIVEAU 1 : POURQUOI                                       │
│                   (direction-technique)                                      │
│                                                                              │
│  Responsabilité : Expliquer POURQUOI on fait les choses                     │
│  Questions : "Pourquoi CI/CD ?", "Pourquoi cette archi ?", "Quel objectif ?"│
│  Output : Justifications, ADRs, Politiques, Standards, Objectifs            │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       NIVEAU 2 : QUOI                                        │
│                    (web-dev-process)                                         │
│                                                                              │
│  Responsabilité : Définir QUOI mettre en place                              │
│  Questions : "Quelles étapes ?", "Quel workflow ?", "Quels outils ?"        │
│  Output : Process, Templates, Checklists, Guides, Structures                │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      NIVEAU 3 : COMMENT                                      │
│                (wordpress-gutenberg-expert, etc.)                            │
│                                                                              │
│  Responsabilité : Expliquer COMMENT implémenter concrètement                │
│  Questions : "Quel code ?", "Quelle config ?", "Quelle commande ?"          │
│  Output : Code, Configurations, Scripts, Commandes                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Règles de Délimitation

#### 1. CI/CD

| Niveau | Skill | Question | Exemple |
|--------|-------|----------|---------|
| POURQUOI | direction-technique | "Pourquoi CI/CD ?" | "Pour garantir qualité et rapidité de livraison" |
| QUOI | web-dev-process | "Quoi mettre en place ?" | "Pipeline = build → test → deploy" |
| COMMENT | wordpress-* | "Comment l'implémenter ?" | "GitHub Actions avec wp-env, PHPUnit" |

**Règle** : `direction-technique` justifie, `web-dev-process` structure, `wordpress-*` code.

#### 2. Code Review

| Niveau | Skill | Question | Exemple |
|--------|-------|----------|---------|
| POURQUOI | direction-technique | "Pourquoi des reviews ?" | "Pour la qualité et le partage de connaissances" |
| QUOI | web-dev-process | "Quoi vérifier ?" | "Checklist, workflow PR, types de commentaires" |
| COMMENT | - | - | Pas besoin (GitHub/GitLab natif) |

#### 3. Architecture

| Niveau | Skill | Question | Exemple |
|--------|-------|----------|---------|
| POURQUOI | direction-technique | "Pourquoi cette archi ?" | "Hexagonale pour testabilité et découplage" |
| QUOI | web-dev-process | "Quoi documenter ?" | "ADRs, diagrammes, conventions" |
| COMMENT | wordpress-* | "Comment l'implémenter ?" | "Structure block theme, hooks, filters" |

#### 4. Qualité / Linting

| Niveau | Skill | Question | Exemple |
|--------|-------|----------|---------|
| POURQUOI | direction-technique | "Pourquoi ces standards ?" | "Coverage 80% pour fiabilité" |
| QUOI | web-dev-process | "Quoi configurer ?" | "ESLint, Prettier, Husky, workflow" |
| COMMENT | wordpress-* | "Comment pour WP ?" | "PHPCS WordPress, ESLint @wordpress" |

### Matrice de Responsabilités Finale

| Domaine | POURQUOI (direction-technique) | QUOI (web-dev-process) | COMMENT (wordpress-*) |
|---------|--------------------------------|------------------------|----------------------|
| **CI/CD** | Objectifs qualité, métriques | Pipeline, étapes, outils | Code YAML, configs |
| **Code Review** | Politique d'approbation | Checklist, workflow | - |
| **Architecture** | Justification patterns | Documentation, ADRs | Implémentation WP |
| **Tests** | Objectifs coverage | Types, stratégies | PHPUnit, Jest WP |
| **Qualité** | Standards, seuils | Outils, workflow | PHPCS, ESLint WP |
| **Sécurité** | Politique OWASP/RGPD | Audits, checklists | Nonces, Sanitize |
| **Performance** | Objectifs SLOs | Méthodes audit | Optimisations WP |

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
