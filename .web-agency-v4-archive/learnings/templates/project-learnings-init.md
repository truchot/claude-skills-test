# Template : Initialisation Learning Loop Projet

> Ce fichier explique comment initialiser le système d'apprentissage pour un nouveau projet client.

## Étape 1 : Créer la structure

À la racine du projet client, créer :

```bash
mkdir -p .learnings/{decisions,issues,successes,retrospectives}
```

## Étape 2 : Créer le fichier context.md

```markdown
---
project: [Nom du projet]
client: [Nom du client]
created: YYYY-MM-DD
stack:
  cms: WordPress X.X
  php: X.X
  node: X.X
  theme: block-theme | classic
  plugins: [liste]
team:
  lead: [Nom]
  devs: [Noms]
---

# Contexte Projet : [Nom]

## Vue d'Ensemble

| Attribut | Valeur |
|----------|--------|
| Type | Site vitrine / E-commerce / Application |
| Budget | X jours |
| Deadline | YYYY-MM-DD |
| Hébergement | [Infos] |

## Contraintes Spécifiques

- Contrainte 1
- Contrainte 2

## Décisions Initiales

| Décision | Choix | Justification |
|----------|-------|---------------|
| Thème | Block theme | Standard agence 2024 |
| Env local | wp-env | Voir pattern wp-env-optimal |

## Exceptions aux Standards

| Standard | Exception | Justification |
|----------|-----------|---------------|
| - | - | - |

## Historique

### YYYY-MM-DD - Kickoff
- Décision X
- Décision Y
```

## Étape 3 : Ajouter au .gitignore (optionnel)

Si certains learnings sont sensibles :

```gitignore
# Learnings sensibles (à décider par projet)
# .learnings/issues/*-sensitive.md
```

## Workflow Quotidien

### Quand documenter ?

| Situation | Action | Où |
|-----------|--------|-----|
| Problème > 30min | Documenter | `.learnings/issues/` |
| Solution innovante | Documenter | `.learnings/successes/` |
| Choix architectural | Documenter | `.learnings/decisions/` |
| Fin de sprint | Rétrospective | `.learnings/retrospectives/` |

### Nommage des fichiers

```
.learnings/
├── issues/
│   ├── 001-cors-staging.md
│   ├── 002-build-timeout.md
│   └── 003-image-optimization.md
├── successes/
│   ├── 001-fast-onboarding.md
│   └── 002-zero-bugs-release.md
├── decisions/
│   ├── 001-no-woocommerce.md
│   └── 002-custom-block-approach.md
└── retrospectives/
    ├── sprint-1.md
    └── sprint-2.md
```

## Checklist Fin de Projet

- [ ] Tous les issues documentés
- [ ] Succès majeurs capturés
- [ ] Rétrospective finale rédigée
- [ ] Candidats à promotion identifiés
- [ ] Review avec tech lead pour promotions

## Voir Aussi

- [LEARNING-GUIDE.md](../LEARNING-GUIDE.md)
- [Templates](../templates/)
