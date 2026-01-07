---
name: seo/contenu
description: SEO Contenu - recherche mots-clés, optimisation on-page, briefs
tags: [seo-contenu, keywords, on-page, brief, serp]
---

# SEO Contenu

## Quand Utiliser
- Rechercher des mots-clés
- Optimiser le contenu on-page
- Créer des briefs rédactionnels
- Structurer le contenu pour le SEO

## Processus Recherche Mots-Clés

```
1. SEED KEYWORDS    2. EXPANSION      3. ANALYSE
───────────────    ──────────────    ────────────
Termes initiaux → Variations      → Métriques
Business terms    Long-tail         Volume
Concurrents       Questions         KD (difficulté)
                  Related           Intent

4. CLUSTERING      5. PRIORISATION
────────────      ───────────────
Groupes thématiques   Score composite
Pillars + Clusters    Volume × Faisabilité × Business
```

## Types d'Intention de Recherche

| Intent | Signaux | Contenu Adapté |
|--------|---------|----------------|
| **Informationnel** | comment, pourquoi, qu'est-ce, guide | Articles, tutoriels |
| **Commercial** | meilleur, comparatif, avis, vs | Comparatifs, reviews |
| **Transactionnel** | acheter, prix, commander, promo | Pages produits, landing |
| **Navigationnel** | [marque], login, site officiel | Pages marque |

## Template Recherche Mots-Clés

```markdown
# Recherche Mots-Clés - [Thématique]

## Mots-Clés Prioritaires

| Mot-clé | Volume | KD | Intent | CPC | Priorité |
|---------|--------|----|----|-----|----------|
| [KW 1] | 5,400 | 35 | Transac | 2.50€ | 🔥🔥🔥 |
| [KW 2] | 2,900 | 28 | Info | 0.80€ | 🔥🔥 |
| [KW 3] | 1,200 | 22 | Commercial | 1.50€ | 🔥🔥 |

## Clusters Thématiques

### Cluster 1 : [Thème Principal]
- **Pillar** : [KW principal] - 5,400/mois
- **Clusters** :
  - [KW longue traîne 1] - 880/mois
  - [KW longue traîne 2] - 590/mois
  - [KW longue traîne 3] - 320/mois
- **Volume total** : 7,190/mois

## Questions (PAA - People Also Ask)
- Comment [question 1] ? - 720/mois
- Pourquoi [question 2] ? - 480/mois
- Quel [question 3] ? - 320/mois
```

## Optimisation On-Page

### Balise Title
```html
<title>Mot-clé Principal | Complément | Marque</title>
```
- 50-60 caractères max
- Mot-clé au début
- Unique par page
- Incitation au clic

### Meta Description
```html
<meta name="description" content="Description engageante avec mot-clé principal. Bénéfice pour l'utilisateur. Call-to-action.">
```
- 150-160 caractères
- Mot-clé inclus naturellement
- Incitation à l'action
- Unique par page

### Structure Hn

```html
<h1>Titre Principal avec Mot-clé</h1>
  <h2>Sous-thème 1</h2>
    <h3>Détail 1.1</h3>
    <h3>Détail 1.2</h3>
  <h2>Sous-thème 2</h2>
    <h3>Détail 2.1</h3>
  <h2>FAQ / Questions fréquentes</h2>
```

### Checklist On-Page

- [ ] H1 unique avec mot-clé principal
- [ ] Title optimisé (< 60 caractères)
- [ ] Meta description engageante
- [ ] Structure Hn logique
- [ ] URL courte et descriptive
- [ ] Images avec alt pertinent
- [ ] Liens internes (2-5 minimum)
- [ ] Contenu > 1000 mots (articles)
- [ ] Mot-clé dans les 100 premiers mots

## Brief Rédactionnel - Template

```markdown
# Brief SEO - [Titre de l'article]

## Objectif
**Mot-clé principal** : [keyword]
**Volume** : X /mois
**Difficulté** : X/100
**Intent** : [Informationnel/Commercial/...]

## Structure Recommandée

### H1 : [Titre optimisé]

### H2 : [Section 1]
- Points à couvrir : ...
- Mots-clés secondaires : ...

### H2 : [Section 2]
- Points à couvrir : ...

### H2 : FAQ
- Question 1 (PAA)
- Question 2 (PAA)

## Concurrents à Analyser
1. [URL 1] - Points forts : ...
2. [URL 2] - Points forts : ...

## Consignes
- Longueur cible : X mots
- Ton : [professionnel/accessible/...]
- CTA : [action souhaitée]
- Images : X minimum avec alt
```

## Maillage Interne

### Stratégie Pillar-Cluster

```
      [Page Pillar]
           │
    ┌──────┼──────┐
    │      │      │
    ▼      ▼      ▼
[Cluster] [Cluster] [Cluster]
    │      │      │
    └──────┼──────┘
           │
    Liens croisés
```

### Bonnes Pratiques
- Ancres variées et naturelles
- Liens contextuels (dans le contenu)
- Hiérarchie logique (pillar → cluster)
- Éviter sur-optimisation des ancres

## Outils Recommandés

| Outil | Usage |
|-------|-------|
| Ahrefs / SEMrush | Volumes, KD, SERP |
| Google Keyword Planner | Volumes officiels |
| AnswerThePublic | Questions |
| AlsoAsked | PAA |
| Surfer SEO | Optimisation on-page |
| Clearscope | Brief et scoring |
