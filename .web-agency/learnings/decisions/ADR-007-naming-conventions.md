# ADR-007 : Conventions de Nommage Français/Anglais

> Date : 2024-01-18
> Statut : Accepté
> Impact : Tous les skills et agents

## Contexte

Le framework utilise un mélange de français et d'anglais dans les noms de fichiers, les identifiants et le contenu. Cette décision documente les conventions adoptées.

## Décision

### Règles de Nommage

| Élément | Langue | Exemple |
|---------|--------|---------|
| **Noms de skills** | Français ou Anglais technique | `direction-commerciale`, `backend-developer` |
| **Noms d'agents** | Français métier | `vision-projet`, `strategie-partenariats` |
| **Noms de domaines** | Français | `gouvernance/`, `rentabilite/` |
| **Frontmatter YAML** | Anglais | `name:`, `description:`, `metadata:` |
| **Descriptions** | Français | "Agent de gestion du budget" |
| **Termes techniques universels** | Anglais | `OKR`, `SLA`, `KPI`, `CI/CD`, `API` |
| **Contenu des agents** | Français | Tout le corps du document |

### Arbre de Décision

```
Nouveau nom à créer
│
├─ C'est une clé technique/YAML ?
│  └─ → Anglais (name, description, version)
│
├─ C'est un terme technique universel ?
│  └─ → Anglais (API, CI/CD, SLA, OKR, KPI, RACI)
│
├─ C'est un nom de skill de développement ?
│  └─ → Anglais avec kebab-case (frontend-developer, backend-developer)
│
├─ C'est un nom de skill métier français ?
│  └─ → Français avec kebab-case (direction-commerciale, support-client)
│
├─ C'est un nom d'agent ou de domaine ?
│  └─ → Français avec kebab-case (vision-projet, strategie-partenariats)
│
└─ C'est du contenu descriptif ?
   └─ → Français
```

### Exemples Conformes

```markdown
# Fichier: direction-commerciale/agents/pricing/modeles-pricing.md

---
name: modeles-pricing          # Anglais (frontmatter)
description: Agent de définition des modèles tarifaires  # Français
---

# Agent Modèles Pricing        # Français + terme technique

## Responsabilité              # Français

Définir les modèles de pricing pour les services de l'agence.

## KPIs                        # Terme universel anglais

| KPI | Cible |               # Terme universel anglais
|-----|-------|
| ROI | > 3x |                # Terme universel anglais
```

### Exceptions Acceptées

| Exception | Raison | Exemple |
|-----------|--------|---------|
| Termes sans équivalent français | Clarté technique | `pricing`, `branding`, `workflow` |
| Acronymes standards | Convention internationale | `RGPD`, `SEO`, `CRM` |
| Noms de technologies | Nom propre | `React`, `WordPress`, `Next.js` |

## Justification

1. **Cohérence métier** : Le contenu en français facilite la compréhension par les équipes francophones
2. **Interopérabilité technique** : Le frontmatter en anglais suit les standards YAML/Markdown
3. **Clarté internationale** : Les termes techniques universels restent en anglais pour éviter les traductions maladroites

## Synonymes Canoniques

Le framework accumule des synonymes pour les mêmes concepts. Utiliser le **terme canonique** dans tout nouveau document :

| Concept | Terme canonique | NE PAS utiliser (synonymes) |
|---------|----------------|----------------------------|
| Maquette basse fidélité | **wireframe** | esquisse, fil de fer, mockup basse fidélité |
| Maquette haute fidélité | **maquette** | mockup, maquette HD, design visuel |
| Estimation initiale | **estimation macro** | chiffrage, budget-estimation-initial |
| Document de besoin | **cahier des charges** | requirements-list (sauf ID), brief (sauf client) |
| Validation finale | **recette** | acceptance, UAT, test client |
| Passage en production | **mise en ligne** | deploy, go-live, release |

> Pour la liste complète des synonymes et le guide par profil (commercial, designer, développeur), voir le [Glossaire](../../GLOSSAIRE.md).

## Conséquences

### Positives

- Documentation accessible aux équipes francophones
- Noms de fichiers cohérents et prévisibles
- Pas de traductions forcées de termes techniques
- Glossaire officiel comme source de vérité pour les synonymes

### Négatives

- Mélange de langues peut surprendre les nouveaux contributeurs
- Nécessite une documentation explicite (ce document + glossaire)

## Vérification

Avant de créer un nouveau fichier :

1. Vérifier la langue appropriée selon les règles ci-dessus
2. Utiliser le kebab-case pour tous les noms de fichiers
3. Ne pas traduire les termes techniques universels
4. Consulter le [Glossaire](../../GLOSSAIRE.md) pour le terme canonique

## Références

- [Glossaire Officiel](../../GLOSSAIRE.md) — source de vérité pour la terminologie
- [ADR-005: Hiérarchie à 3 Niveaux](./when-3-level-hierarchy.md)
- [ADR-006: Séparation des Responsabilités](./when-separation-responsabilites.md)
