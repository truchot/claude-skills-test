---
name: comitologie
description: Agent de définition des instances de gouvernance projet
---

# Agent Comitologie

Définition des instances de gouvernance et circuits de décision.

## Responsabilité

Définir et structurer les comités, RACI, et fréquences de réunion pour assurer une gouvernance efficace.

## Inputs

- Type de projet (interne, client, partenaire)
- Taille et complexité du projet
- Parties prenantes identifiées
- Contraintes organisationnelles

## Outputs

- Matrice RACI
- Liste des comités avec composition et fréquence
- Circuits de décision documentés
- Calendrier des instances

## Règles de Décision

| Taille Projet | Comités Recommandés |
|--------------|---------------------|
| Small (<50k) | Weekly sync, Monthly review |
| Medium (50-200k) | Weekly sync, Bi-weekly steering, Monthly review |
| Large (>200k) | Daily standup, Weekly steering, Bi-weekly exec, Monthly board |

## Matrice RACI Unifiée — Par Phase de Projet

> **R** = Responsable (fait le travail), **A** = Approbateur (valide), **C** = Consulté (donne un avis), **I** = Informé

| Phase | Commercial | Direction | Chef de projet | Technique | Design | Marketing | DevOps | Support | Client |
|-------|-----------|-----------|---------------|-----------|--------|-----------|--------|---------|--------|
| **Accueil** | **R** | A | I | C | — | — | — | — | C |
| **Cadrage** | C | A | **R** | C | C | C | — | — | A |
| **Conception** | I | I | C | **R** | **R** | C | — | — | A |
| **Réalisation** | — | I | C | **R** | C | — | C | — | I |
| **Déploiement** | — | I | C | A | — | — | **R** | — | I |
| **Lancement** | I | A | C | C | — | **R** | C | C | A |
| **Maintenance** | — | I | I | C | — | — | C | **R** | I |
| **Bilan** | I | A | **R** | C | C | C | C | C | A |

### Par Type de Décision

| Décision | Décide (A) | Consulté (C) | Informé (I) | Skill framework |
|----------|-----------|--------------|-------------|-----------------|
| Budget / prix | Direction commerciale | Chef de projet, Technique | Client | `direction-commerciale/pricing` |
| Stack technique | Direction technique | Lead dev, DevOps | Chef de projet | `direction-technique/strategy` |
| Architecture | Direction technique | Lead dev | Équipe dev | `direction-technique/architecture` |
| Design / UX | Direction artistique | Client, Marketing | Technique | `ux-ui-design` |
| Stratégie marketing | Direction marketing | Commercial, SEO | Technique | `direction-marketing` |
| Conformité légale | Juridique | Technique, Marketing | Direction | `legal-compliance` |
| Priorité features | Chef de projet | Client, Technique | Équipe | `project-management/pilotage` |
| Contenu éditorial | Marketing | Client, SEO | Design | `content-marketing` |
| Go/No-Go release | Direction technique | Lead dev, QA, DevOps | Client, CDP | `lead-dev/delivery` |
| Changement de périmètre | Client + CDP | Technique, Commercial | Équipe | `project-management/pilotage/gestion-changement` |

### Règles d'Application

1. **Double approbation** — Les phases cadrage, lancement et bilan nécessitent la validation Direction + Client
2. **Pas de responsable sans approbateur** — Chaque R doit avoir un A identifié
3. **Escalade si absence** — Si l'approbateur est indisponible > 48h, escalade vers `gouvernance/escalade-strategique`
4. **Adaptation à la taille** — Pour les projets MICRO/PETIT, le chef de projet cumule les rôles CDP + Commercial

## Templates

### RACI Type (Projet Générique)

| Activité | Direction | Lead | Équipe | Client |
|----------|-----------|------|--------|--------|
| Décision stratégique | A | R | I | C |
| Livraison feature | I | A | R | I |
| Validation client | C | R | I | A |

## Escalade

→ `gouvernance/escalade-strategique` si blocage dans les circuits
