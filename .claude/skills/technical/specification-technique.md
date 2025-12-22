---
name: specification-technique
description: Rédaction des spécifications techniques à partir des besoins fonctionnels
---

# Spécifications Techniques

Tu traduis les **besoins fonctionnels** en **spécifications techniques** exploitables par les développeurs.

## Contexte

Intervient après la phase d'avant-projet pour :
- Transformer le brief en specs techniques
- Définir l'architecture et les composants
- Préparer le travail des développeurs

## Entrées Requises

| Information | Source | Obligatoire |
|-------------|--------|-------------|
| Brief formalisé | `avant-projet/formalisation-brief` | Oui |
| Périmètre validé | `avant-projet/analyse-perimetre` | Oui |
| Stack choisie | `technical/selection-stack` | Oui |
| User stories | `web-dev-process/discovery/user-stories` | Recommandé |

## Structure des Spécifications

### 1. Vue d'Ensemble

```markdown
# Spécifications Techniques - [Projet]

## 1. Résumé Exécutif
- Objectif du projet
- Stack technique retenue
- Périmètre technique

## 2. Architecture Générale
[Schéma d'architecture]

## 3. Composants Principaux
[Liste et description]
```

### 2. Spécifications par Composant

Pour chaque composant fonctionnel :

```markdown
## Composant : [Nom]

### Description Fonctionnelle
[Ce que fait le composant pour l'utilisateur]

### Spécifications Techniques

#### Données
- Entités : [Liste]
- Champs : [Détail]
- Relations : [Schéma]

#### API / Endpoints
| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| GET | /api/xxx | ... | Oui/Non |

#### Interface
- Composants UI : [Liste]
- États : [Liste]
- Interactions : [Description]

#### Règles Métier
1. [Règle 1]
2. [Règle 2]

#### Critères d'Acceptation
- [ ] Critère 1
- [ ] Critère 2
```

## Processus de Rédaction

```
Brief fonctionnel
       │
       ▼
┌──────────────────┐
│ Identifier les   │
│ entités métier   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Modéliser les    │
│ données          │──► web-dev-process/design/data-modeling
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Définir les      │
│ API/endpoints    │──► web-dev-process/design/api-design
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Spécifier les    │
│ composants UI    │──► web-dev-process/design/ui-ux
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Documenter les   │
│ règles métier    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Définir les      │
│ critères de test │──► livraison/plan-recette
└──────────────────┘
```

## Templates par Stack

### WordPress

Consulter `wordpress-gutenberg-expert` pour :

| Élément | Agent WP |
|---------|----------|
| Custom Post Types | `wp-core/custom-post-types` |
| Taxonomies | `wp-core/custom-taxonomies` |
| Blocks Gutenberg | `gutenberg-blocks/custom-blocks` |
| Theme structure | `theme/block-theme` |
| API endpoints | `wp-rest-api-expert` |

### Application Web (React/Vue/Node)

Consulter `web-dev-process` pour :

| Élément | Agent |
|---------|-------|
| Architecture | `design/architecture` |
| Data modeling | `design/data-modeling` |
| API design | `design/api-design` |
| UI/UX | `design/ui-ux` |

## Sortie : Document de Specs

```markdown
# Spécifications Techniques
## Projet : [Nom]
## Version : 1.0
## Date : [Date]

---

## 1. Contexte

### 1.1 Objectifs
[Résumé des objectifs métier]

### 1.2 Stack Technique
- Frontend : [Techno]
- Backend : [Techno]
- Base de données : [Techno]
- Hébergement : [Provider]

### 1.3 Périmètre
[In scope / Out of scope]

---

## 2. Architecture

### 2.1 Schéma Global
[Diagramme]

### 2.2 Composants
| Composant | Rôle | Technologie |
|-----------|------|-------------|
| ... | ... | ... |

---

## 3. Modèle de Données

### 3.1 Entités
[Diagramme ERD ou description]

### 3.2 Détail des Entités
[Pour chaque entité : champs, types, contraintes]

---

## 4. Spécifications Fonctionnelles

### 4.1 [Fonctionnalité 1]
[Specs détaillées]

### 4.2 [Fonctionnalité 2]
[Specs détaillées]

---

## 5. API

### 5.1 Endpoints
[Liste des routes]

### 5.2 Authentification
[Mécanisme d'auth]

---

## 6. Sécurité

### 6.1 Authentification
[Specs]

### 6.2 Autorisations
[Matrice de droits]

### 6.3 Données sensibles
[Chiffrement, RGPD]

---

## 7. Performance

### 7.1 Objectifs
- Temps de chargement : < X sec
- Score Lighthouse : > X

### 7.2 Optimisations prévues
[Liste]

---

## 8. Tests

### 8.1 Stratégie de test
[Pyramide de tests]

### 8.2 Critères d'acceptation
[Liste des critères]

---

## 9. Livrables

| Livrable | Format | Responsable |
|----------|--------|-------------|
| ... | ... | ... |

---

## 10. Annexes

### 10.1 Glossaire
[Termes métier]

### 10.2 Références
[Liens documentation]
```

## Lien avec les Autres Agents

| Agent | Interaction |
|-------|-------------|
| `avant-projet/formalisation-brief` | Entrée : brief |
| `estimation-technique` | Sortie : base d'estimation |
| `handoff-developpeur` | Sortie : specs pour devs |
| `livraison/plan-recette` | Sortie : critères de test |

## Escalade Humaine

| Situation | Action |
|-----------|--------|
| Ambiguïté fonctionnelle | Retour vers avant-projet |
| Complexité technique élevée | Review par tech lead |
| Choix d'architecture impactant | Validation direction |
| Contrainte sécurité/RGPD | Consultation expert |
