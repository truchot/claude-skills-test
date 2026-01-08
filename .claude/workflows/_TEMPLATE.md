---
name: workflow-name
description: Description courte (1 ligne)
triggers: [mot-clé1, mot-clé2]  # Quand déclencher ce workflow
skills: [skill1, skill2]        # Skills utilisés
calls: [workflow1]              # Workflows appelés (composition)
roles: [role1, role2]           # Rôles qui exécutent ce workflow
---

# Nom du Workflow

## Objectif

Résultat attendu de ce workflow.

## Pré-requis

- Condition 1
- Condition 2

## Étapes

### 1. Nom de l'étape

Description de l'étape.

→ **skill**: `skill-name`

```bash
# Commande ou code si applicable
```

- [ ] Checkpoint de l'étape

### 2. Nom de l'étape

Description.

→ **skill**: `autre-skill`

- [ ] Checkpoint

### 3. Nom de l'étape (appel workflow)

→ **workflow**: `autre-workflow`

## Outputs

- Output 1 produit
- Output 2 produit

## Erreurs Courantes

| Erreur | Cause | Solution |
|--------|-------|----------|
| Erreur 1 | Cause | Fix |

## Escalade

Si blocage → `role-name` ou `workflow-name`
