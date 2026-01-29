# Spécifications Features

> **Projet** : {{PROJECT_NAME}}

## Structure

```
04-specs/
├── README.md              # Ce fichier
└── features/              # Specs par feature
    ├── F001-auth/
    │   ├── spec.md        # Spécification fonctionnelle
    │   ├── tech-brief.md  # Brief technique
    │   └── estimation.md  # Estimation détaillée
    └── F002-catalog/
        └── ...
```

## Features en cours

| ID | Feature | Epic | Statut | Spec | Tech | Estimation |
|----|---------|------|--------|------|------|------------|
| F001 | {{FEATURE_1}} | E001 | 🟢 Validé | ✅ | ✅ | ✅ |
| F002 | {{FEATURE_2}} | E001 | 🟡 Review | ✅ | 🟡 | ⚪ |
| F003 | {{FEATURE_3}} | E002 | ⚪ Draft | 🟡 | ⚪ | ⚪ |

## Légende

| Statut | Signification |
|--------|---------------|
| ⚪ Draft | En rédaction |
| 🟡 Review | En revue |
| 🟢 Validé | Prêt pour dev |
| 🔵 In Dev | En développement |
| ✅ Done | Implémenté |

## Process

```
1. Spec fonctionnelle (Product)
   → 🔴 Gate: Validation client

2. Brief technique (Tech Lead)
   → 🔴 Gate: Validation archi

3. Estimation (Équipe)
   → 🔴 Gate: Validation budget/délai

4. Implémentation
   → 🟢 Gate: Tests auto
```

## Liens

- [Requirements](../02-requirements/)
- [Architecture](../03-architecture/)
