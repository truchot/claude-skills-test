# Team Profiles

Ce dossier contient les profils des membres de l'équipe technique. Ces profils alimentent les agents de la skill `team-management` pour l'allocation intelligente, le suivi de compétences et la détection de risques.

## Structure

```
team/
├── README.md           # Ce fichier
├── schema.yaml         # Schéma de validation des profils
├── profiles/           # Un fichier YAML par membre
│   ├── example.yaml    # Exemple de profil (template)
│   └── .gitkeep
└── .gitignore          # Exclut les données sensibles
```

## Format d'un Profil

Chaque profil est un fichier YAML nommé `{id}.yaml` (ex: `dev-001.yaml`).

Voir `schema.yaml` pour la spécification complète et `profiles/example.yaml` pour un exemple.

## Utilisation par les Agents

| Agent | Données utilisées |
|-------|-------------------|
| `smart-assignment` | skills, availability, preferences |
| `workload-balancer` | availability.current_sprint_capacity, availability.allocated |
| `competency-matrix` | skills (tous les domaines) |
| `skill-gap-analyzer` | skills + growth_targets |
| `pair-programming-matcher` | skills + preferences.pair_programming |
| `burnout-detector` | availability, preferences.focus_areas |
| `code-review-orchestrator` | skills + availability |
| `availability-tracker` | availability (toutes les données) |

## Confidentialité

- Les profils contiennent des données personnelles (nom, email)
- Le fichier `.gitignore` exclut les profils réels du versioning
- Seuls `example.yaml` et le schéma sont versionnés
- En production, stocker les profils dans un système sécurisé (vault, DB chiffrée)

## Mise à Jour

Les profils doivent être mis à jour :
- À chaque nouvel arrivant (→ `onboarding-developer`)
- Trimestriellement (→ `competency-matrix`)
- À chaque changement de projet ou de disponibilité
- Après une formation significative
