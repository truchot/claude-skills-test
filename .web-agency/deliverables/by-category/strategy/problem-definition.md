---
id: problem-definition
name: Définition du Problème
version: 1.0.0
category: strategy
status: active
phase: "1-intake"
order: 1
agents:
  - direction-marketing/positionnement/discovery
  - direction-marketing/positionnement/orchestrator
  - project-management/avant-projet/cadrage
consumes:
  - client-request
produces_for:
  - direction-marketing/positionnement/persona-builder
  - direction-marketing/positionnement/brand-positioning
  - marketing/content/copywriting
workflows:
  - id: wf-problem-discovery
    template: wf-discovery
    phase: Discovery
    name: Découverte du problème
    duration: 2 jours
  - id: wf-problem-validation
    template: wf-validation
    phase: Validation
    name: Validation du problème
    duration: 1 jour
tags:
  - strategy
  - foundation
  - problem
  - market
  - pain-points
---

# Définition du Problème

## Description

La définition du problème articule clairement le problème que le projet/produit/service résout. C'est la fondation absolue de toute stratégie : sans problème clairement identifié, il n'y a pas de proposition de valeur pertinente.

## Cas d'Usage

- Lancement d'un nouveau produit/service
- Pivot stratégique
- Validation d'une idée business
- Alignement des équipes sur la mission
- Base pour le pitch et la communication

## Structure du Livrable

```markdown
# Définition du Problème : [Nom du Projet]

## 1. Le Problème en Une Phrase

> "[Formulation concise du problème principal]"

## 2. Contexte du Problème

### Situation Actuelle

| Aspect | Description |
|--------|-------------|
| **Qui souffre de ce problème ?** | [Cibles affectées] |
| **Depuis quand ?** | [Temporalité] |
| **Quelle ampleur ?** | [Échelle du problème] |
| **Quelles conséquences ?** | [Impact sur les cibles] |

### Pourquoi ce Problème Existe

- [Cause racine 1]
- [Cause racine 2]
- [Cause racine 3]

### Pourquoi il n'est pas Résolu Aujourd'hui

| Solution existante | Pourquoi insuffisante |
|-------------------|----------------------|
| [Solution 1] | [Limitation] |
| [Solution 2] | [Limitation] |
| [Statu quo] | [Coût de l'inaction] |

## 3. Manifestations du Problème

### Pain Points Principaux

| Pain Point | Intensité (1-5) | Fréquence | Impact |
|------------|-----------------|-----------|--------|
| **[Pain 1]** | ⭐⭐⭐⭐⭐ | [Quotidien/Hebdo...] | [Conséquence] |
| **[Pain 2]** | ⭐⭐⭐⭐ | [Fréquence] | [Conséquence] |
| **[Pain 3]** | ⭐⭐⭐ | [Fréquence] | [Conséquence] |

### Symptômes Observables

- [ ] [Symptôme 1 - ce qu'on peut mesurer/observer]
- [ ] [Symptôme 2]
- [ ] [Symptôme 3]

### Verbatims Cibles

> "[Citation réelle d'une personne qui souffre du problème]"
> — [Profil de la personne]

> "[Autre citation]"
> — [Profil]

## 4. Quantification du Problème

### Coût du Problème

| Métrique | Valeur | Source |
|----------|--------|--------|
| **Coût financier** | [X €/an] | [Source] |
| **Temps perdu** | [X heures/semaine] | [Source] |
| **Opportunités manquées** | [Description] | [Source] |
| **Stress/Frustration** | [Niveau] | [Source] |

### Taille du Marché Affecté

| Segment | Nombre de personnes/entreprises | Valeur potentielle |
|---------|--------------------------------|-------------------|
| [Segment 1] | [Nombre] | [Valeur] |
| [Segment 2] | [Nombre] | [Valeur] |

## 5. Priorisation des Problèmes

### Matrice Importance / Urgence

```
        URGENT              NON URGENT
      ┌─────────────────┬─────────────────┐
  I   │                 │                 │
  M   │  [Problème A]   │  [Problème B]   │
  P   │  → Priorité 1   │  → Priorité 2   │
  O   │                 │                 │
  R   ├─────────────────┼─────────────────┤
  T   │                 │                 │
  A   │  [Problème C]   │  [Problème D]   │
  N   │  → Priorité 3   │  → À monitorer  │
  T   │                 │                 │
      └─────────────────┴─────────────────┘
```

### Problème Principal Retenu

**Le problème #1 à résoudre est :** [Formulation définitive]

**Justification :**
- [Raison 1]
- [Raison 2]
- [Raison 3]

## 6. Critères de Succès

### Comment Savoir si le Problème est Résolu ?

| Indicateur | Avant | Objectif Après | Méthode de mesure |
|------------|-------|----------------|-------------------|
| [KPI 1] | [Valeur] | [Cible] | [Comment mesurer] |
| [KPI 2] | [Valeur] | [Cible] | [Comment mesurer] |
| [KPI 3] | [Valeur] | [Cible] | [Comment mesurer] |

### Définition du "Problem-Solution Fit"

Le problème sera considéré comme correctement adressé quand :
- [ ] [Critère 1]
- [ ] [Critère 2]
- [ ] [Critère 3]
```

## Critères d'Acceptation

### Complétude
- [ ] Problème formulé en une phrase claire
- [ ] Pain points identifiés et priorisés
- [ ] Quantification du problème (coût, ampleur)
- [ ] Verbatims/preuves de l'existence du problème
- [ ] Critères de succès définis

### Qualité
- [ ] Basé sur des faits (pas des suppositions)
- [ ] Validé par des entretiens ou données
- [ ] Problème suffisamment douloureux (worth solving)
- [ ] Problème assez fréquent (large marché)

### Validation
- [ ] Validé par le client/sponsor
- [ ] Testé auprès de cibles potentielles
- [ ] Équipe alignée sur le problème

## Points de Contrôle Humain

| Checkpoint | Responsable | Critères |
|------------|-------------|----------|
| Validation existence problème | Product Owner | Preuves tangibles |
| Quantification | Data/Business | Chiffres vérifiables |
| Priorisation | Direction | Aligné avec vision |
| Go/No-Go | Sponsor | Problème worth solving |

## Exemples

### Exemple : SaaS B2B

```markdown
# Définition du Problème : TaskFlow

## Le Problème en Une Phrase
> "Les équipes marketing perdent 8h/semaine à chercher des fichiers et synchroniser des informations entre 5+ outils différents."

## Pain Points Principaux
| Pain Point | Intensité | Impact |
|------------|-----------|--------|
| Fichiers éparpillés | ⭐⭐⭐⭐⭐ | 3h/semaine perdues |
| Versions multiples | ⭐⭐⭐⭐ | Erreurs, retravail |
| Pas de vue d'ensemble | ⭐⭐⭐⭐ | Deadlines manquées |

## Quantification
- 8h/semaine × 50 semaines × 50€/h = **20 000€/an/personne** perdus
- Équipe de 5 = **100 000€/an** de productivité perdue
```

### Exemple : E-commerce B2C

```markdown
# Définition du Problème : GreenShop

## Le Problème en Une Phrase
> "Les consommateurs éco-responsables ne trouvent pas de marketplace fiable où TOUS les produits sont réellement durables et vérifiés."

## Pourquoi pas résolu aujourd'hui
| Solution | Limitation |
|----------|------------|
| Amazon | Greenwashing, pas de filtre fiable |
| Boutiques bio | Choix limité, prix élevés |
| Sites spécialisés | Fragmenté, pas de comparaison |
```

## Anti-Patterns

### ❌ À Éviter

1. **Problème inventé**
   - Basé sur des suppositions, pas des faits
   - "On pense que les gens veulent..."

2. **Problème trop vague**
   - "Améliorer l'expérience utilisateur"
   - Pas de quantification possible

3. **Solution déguisée en problème**
   - "Le problème c'est qu'il n'y a pas d'app pour..."
   - Commence par la solution, pas le problème

4. **Problème "nice to have"**
   - Pas assez douloureux pour payer
   - Fréquence trop faible

5. **Problème de niche trop étroite**
   - Marché trop petit
   - Pas de business viable

### ✅ Bonnes Pratiques

1. **Parler aux vrais utilisateurs** avant de définir le problème
2. **Quantifier** : temps perdu, argent perdu, frustration
3. **Chercher les preuves** : verbatims, données, comportements
4. **Valider l'urgence** : pourquoi maintenant ?
5. **Tester le "worth solving"** : les gens paieraient-ils pour une solution ?

## Intégrations

### Consomme
- `client-request` : Expression initiale du besoin

### Produit pour
- `persona` : Qui souffre de ce problème ?
- `offer-definition` : Quelle solution proposer ?
- `brand-positioning` : Comment se positionner face au problème ?
- `value-proposition` : Quelle promesse faire ?

## Outils Recommandés

| Outil | Usage |
|-------|-------|
| Interviews utilisateurs | Validation qualitative |
| Surveys | Validation quantitative |
| Jobs-to-be-Done framework | Structure d'analyse |
| Problem Interview Script | Guide d'entretien |

## Références

- "The Mom Test" - Rob Fitzpatrick
- "Running Lean" - Ash Maurya
- "Jobs to be Done" - Clayton Christensen
- "Lean Customer Development" - Cindy Alvarez
