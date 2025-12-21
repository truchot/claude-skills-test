---
name: estimation-technique
description: Estimation des charges de développement technique
---

# Estimation Technique

Tu fournis des **estimations de charge** pour les développements techniques, en complément de l'estimation commerciale.

## Contexte

Intervient pour :
- Chiffrer précisément les développements
- Alimenter les devis et propositions
- Planifier les ressources techniques

## Entrées Requises

| Information | Source | Obligatoire |
|-------------|--------|-------------|
| Spécifications techniques | `specification-technique` | Oui |
| Stack choisie | `selection-stack` | Oui |
| Périmètre validé | `avant-projet/analyse-perimetre` | Oui |
| Équipe disponible | Interne | Recommandé |

## Méthode d'Estimation

### 1. Découpage en Tâches

```
Fonctionnalité
    │
    ├─► Setup / Config
    ├─► Backend (API, BDD)
    ├─► Frontend (UI, UX)
    ├─► Intégration
    ├─► Tests
    └─► Documentation
```

### 2. Grille de Complexité

| Complexité | Définition | Coeff. |
|------------|------------|--------|
| **Simple** | CRUD basique, composant standard | x1 |
| **Moyenne** | Logique métier, intégrations | x2 |
| **Complexe** | Algorithme, perfs, multi-sources | x3 |
| **Très complexe** | Temps réel, IA, scaling | x5 |

### 3. Base de Référence (jours/homme)

| Tâche | Simple | Moyenne | Complexe |
|-------|--------|---------|----------|
| Setup projet | 0.5 | 1 | 2 |
| Entité/Model | 0.25 | 0.5 | 1 |
| Endpoint API | 0.25 | 0.5 | 1 |
| Page/Vue | 0.5 | 1 | 2 |
| Composant UI | 0.25 | 0.5 | 1 |
| Formulaire | 0.5 | 1 | 2 |
| Intégration tierce | 1 | 2 | 4 |
| Tests unitaires | 0.25 | 0.5 | 1 |
| Tests e2e | 0.5 | 1 | 2 |

### 4. Coefficients Stack

| Stack | Coefficient |
|-------|-------------|
| WordPress (thème existant) | x0.8 |
| WordPress (custom) | x1 |
| React/Vue | x1 |
| Next.js/Nuxt | x1.2 |
| Full custom | x1.5 |

## Processus d'Estimation

```
Specs techniques
       │
       ▼
┌──────────────────┐
│ 1. Lister les    │
│    fonctionnalités│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 2. Découper en   │
│    tâches        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 3. Évaluer       │
│    complexité    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 4. Appliquer     │
│    coefficients  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 5. Ajouter       │
│    buffer (15-20%)│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 6. Valider       │
│    cohérence     │
└──────────────────┘
```

## Template d'Estimation

```markdown
# Estimation Technique
## Projet : [Nom]
## Date : [Date]

---

## Résumé

| Métrique | Valeur |
|----------|--------|
| Total brut | X j/h |
| Buffer (20%) | X j/h |
| **Total estimé** | **X j/h** |
| Équipe | X personnes |
| Durée estimée | X semaines |

---

## Détail par Fonctionnalité

### F1 : [Nom fonctionnalité]

| Tâche | Complexité | Base | Coeff | Total |
|-------|------------|------|-------|-------|
| Setup | Simple | 0.5 | x1 | 0.5 |
| Backend | Moyenne | 2 | x1 | 2 |
| Frontend | Moyenne | 2 | x1 | 2 |
| Tests | Simple | 0.5 | x1 | 0.5 |
| **Sous-total F1** | | | | **5 j/h** |

### F2 : [Nom fonctionnalité]
[...]

---

## Récapitulatif

| Fonctionnalité | Charge |
|----------------|--------|
| F1 : [Nom] | X j/h |
| F2 : [Nom] | X j/h |
| F3 : [Nom] | X j/h |
| **Sous-total** | **X j/h** |
| Setup général | X j/h |
| CI/CD | X j/h |
| Documentation | X j/h |
| **Total brut** | **X j/h** |
| Buffer 20% | X j/h |
| **TOTAL** | **X j/h** |

---

## Hypothèses

1. [Hypothèse 1]
2. [Hypothèse 2]

## Risques Identifiés

| Risque | Impact | Charge additionnelle |
|--------|--------|---------------------|
| [Risque] | Moyen | +X j/h |

## Notes

- Estimation basée sur un développeur senior
- Ne comprend pas : hébergement, maintenance, formation
```

## Validation Croisée

Vérifier la cohérence avec :

| Source | Vérification |
|--------|--------------|
| `avant-projet/chiffrage` | Cohérence budget |
| `pilotage/creation-planning` | Faisabilité calendaire |
| Historique projets similaires | Benchmark interne |

## Références par Stack

### WordPress

Consulter `wordpress-gutenberg-expert` pour affiner :
- Blocks custom : `gutenberg-blocks/custom-blocks`
- CPT/Taxonomies : `wp-core/*`
- Theme : `theme/block-theme`

### Application Web

Consulter `web-dev-process` pour :
- Architecture : `design/architecture`
- Tests : `testing/*`

## Escalade Humaine

| Situation | Action |
|-----------|--------|
| Estimation > 50 j/h | Validation direction |
| Incertitude > 30% | Demander POC ou spike |
| Techno non maîtrisée | Ajouter temps de montée en compétence |
| Client conteste l'estimation | Détailler et justifier |
