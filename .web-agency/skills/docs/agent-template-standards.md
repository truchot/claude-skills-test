# Standards de Template pour Agents Marketing

> Guide de référence pour assurer la cohérence structurelle de tous les agents marketing.

---

## Sections Obligatoires (Tous Agents)

### Structure Recommandée

```markdown
---
name: [nom-agent]
description: [Description courte et claire]
domain: [domaine-parent]
---

# [Titre Agent]

## Ta Responsabilité Unique
> [Mission claire et unique - PAS plusieurs responsabilités]

## Tu NE fais PAS
- [Tâche déléguée] (→ `agent-responsable`)
- [Autre tâche] (→ `autre-agent`)

## Inputs Acceptés

| Type | Exemple |
|------|---------|
| [Type 1] | [Exemple] |
| [Type 2] | [Exemple] |

## Framework [d'Analyse/de Action]
[Approche structurée de l'agent]

## Template de Sortie
[Exemple concret de la structure de sortie]

## Bonnes Pratiques
- [Pratique 1]
- [Pratique 2]

## Pièges à Éviter
| Piège | Problème | Solution |
|-------|----------|----------|
| [Erreur commune] | [Impact] | [Comment éviter] |

## Livrables

| Livrable | Description |
|----------|-------------|
| [Livrable 1] | [Description] |
| [Livrable 2] | [Description] |
```

---

## Terminologie Standardisée

### Sections d'Entrée

| Section | Standard | Alternatives à Éviter |
|---------|----------|----------------------|
| Entrées | **Inputs Acceptés** | "Input Attendu", "Inputs Requis", "Prérequis" |
| Responsabilité | **Ta Responsabilité Unique** | "Responsabilité", "Ta Responsabilité" |
| Exclusions | **Tu NE fais PAS** | "Hors périmètre", "Non inclus" |

### Sections Méthodologiques

| Type d'Agent | Naming Pattern | Exemple |
|--------------|----------------|---------|
| **Stratégique** | Framework d'[Domaine] | "Framework d'Analyse Concurrentielle" |
| **Créatif** | Framework [Type] | "Framework Article SEO" |
| **Technique** | Configuration [Système] | "Configuration GTM" |
| **Exécution** | Processus de [Action] | "Processus de Test A/B" |

### Sections de Sortie

| Section | Usage | Quand l'utiliser |
|---------|-------|------------------|
| **Template de Sortie** | Structure exemple du livrable | Toujours (obligatoire) |
| **Livrables** | Liste des outputs produits | Toujours (après Template) |
| **Checklist** | Points de validation | Agents techniques surtout |

### Sections de Guidance

| Section | Usage |
|---------|-------|
| **Bonnes Pratiques** | Recommandations générales |
| **Principes** | Concepts fondamentaux |
| **Règles d'[Domaine]** | Procédures obligatoires |
| **Pièges à Éviter** | Erreurs communes (OBLIGATOIRE) |

---

## Sections par Type d'Agent

### Agents Stratégiques (direction-marketing)

```markdown
## Sections Obligatoires
- Ta Responsabilité Unique
- Tu NE fais PAS
- Inputs Acceptés
- Framework d'[Analyse]
- Template de Sortie
- Bonnes Pratiques
- Pièges à Éviter
- Livrables

## Sections Recommandées
- Principes de [Construction/Analyse]
- Règles d'[Analyse/Séquencement]
- Métriques de Succès
```

### Agents de Contenu (content-marketing)

```markdown
## Sections Obligatoires
- Ta Responsabilité Unique
- Tu NE fais PAS
- Inputs Acceptés
- Framework [Type de Contenu]
- Template de Sortie
- Bonnes Pratiques
- Pièges à Éviter
- Livrables

## Sections Recommandées
- Types de [Contenus]
- Cas d'Usage Type
- Exemples Concrets
- Checklist Avant Publication
```

### Agents d'Exécution (marketing-ops, paid-media)

```markdown
## Sections Obligatoires
- Ta Responsabilité Unique
- Tu NE fais PAS
- Inputs Acceptés
- Framework de [Action]
- Template de Sortie
- Bonnes Pratiques
- Pièges à Éviter
- Livrables

## Sections Recommandées
- Leviers d'[Optimisation/Action]
- Métriques de Succès
- Cas d'Usage Type
```

### Agents Techniques (marketing-analytics/tracking)

```markdown
## Sections Obligatoires
- Ta Responsabilité (ou Unique)
- Tu NE fais PAS
- Inputs Acceptés
- Configuration/Structure [Système]
- Template de Sortie
- Bonnes Pratiques
- Checklist [Système]

## Sections Recommandées
- Debugging
- Erreurs Courantes
- Outils Recommandés
```

---

## Checklist de Conformité Agent

### YAML Frontmatter
- [ ] `name` présent et kebab-case
- [ ] `description` présente et concise
- [ ] `domain` présent et correspond au dossier parent
- [ ] `workflows` si applicable

### Sections Obligatoires
- [ ] "Ta Responsabilité Unique" avec mission claire
- [ ] "Tu NE fais PAS" avec délégations explicites
- [ ] "Inputs Acceptés" avec tableau
- [ ] "Framework/Processus/Configuration" approprié
- [ ] "Template de Sortie" avec exemple
- [ ] "Bonnes Pratiques" ou équivalent
- [ ] "Pièges à Éviter" avec erreurs communes
- [ ] "Livrables" avec liste des outputs

### Qualité
- [ ] Minimum 100 lignes pour agents simples
- [ ] Minimum 200 lignes pour agents enrichis
- [ ] Exemples concrets inclus
- [ ] Pas de duplication avec templates deliverables

---

## Références Templates Livrables

Les exemples de livrables complets doivent référencer les templates existants :

```markdown
### Template de Livrable

> **→ Utiliser le template complet** : `deliverables/by-category/marketing/[template].md`

Ce template contient :
- [Points clés du template]
```

Templates disponibles :
- `persona.md` - Fiches personas
- `campaign-planning.md` - Planning campagnes
- `content-calendar.md` - Calendrier éditorial
- `funnel-analysis.md` - Analyse de funnel
- `analytics-setup.md` - Configuration analytics (dans code/)

---

*Document de référence - Créé le 2026-01-19*
