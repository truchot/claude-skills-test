---
id: offer-definition
name: Définition des Offres
version: 1.0.0
category: strategy
status: active
phase: "1-intake"
order: 2
agents:
  - direction-marketing/positionnement/discovery
  - direction-marketing/positionnement/orchestrator
  - project-management/avant-projet/cadrage
consumes:
  - client-request
  - problem-definition
produces_for:
  - direction-marketing/positionnement/persona-builder
  - direction-marketing/positionnement/brand-positioning
  - marketing/content/landing-pages
  - marketing/content/copywriting
workflows:
  - id: wf-offer-discovery
    template: wf-discovery
    phase: Discovery
    name: Découverte des offres
    duration: 2 jours
  - id: wf-offer-validation
    template: wf-validation
    phase: Validation
    name: Validation des offres
    duration: 1 jour
tags:
  - strategy
  - foundation
  - offer
  - value-proposition
  - product
---

# Définition des Offres

## Description

La définition des offres décrit clairement ce que l'entreprise propose comme solution au problème identifié. Elle articule les produits/services, leur positionnement prix, et la promesse de transformation pour le client.

## Cas d'Usage

- Lancement d'un nouveau produit/service
- Structuration d'une gamme d'offres
- Refonte de l'offre commerciale
- Base pour les landing pages et argumentaires
- Alignement équipes sales/marketing

## Structure du Livrable

```markdown
# Définition des Offres : [Nom du Projet/Entreprise]

## 1. Vue d'Ensemble des Offres

### Notre Promesse Globale

> "[La transformation que nous promettons à nos clients]"

### Résumé des Offres

| Offre | Cible principale | Problème résolu | Prix indicatif |
|-------|------------------|-----------------|----------------|
| [Offre 1] | [Qui] | [Quoi] | [Prix] |
| [Offre 2] | [Qui] | [Quoi] | [Prix] |
| [Offre 3] | [Qui] | [Quoi] | [Prix] |

## 2. Offre Principale (Core Offer)

### Description

**Nom de l'offre :** [Nom]

**En une phrase :** [Description concise]

**Pour qui :** [Cible principale]

**Problème résolu :** [Référence à problem-definition]

### Bénéfices Clés

| Bénéfice | Description | Preuve/Métrique |
|----------|-------------|-----------------|
| **[Bénéfice 1]** | [Ce que le client obtient] | [Donnée ou témoignage] |
| **[Bénéfice 2]** | [Ce que le client obtient] | [Donnée ou témoignage] |
| **[Bénéfice 3]** | [Ce que le client obtient] | [Donnée ou témoignage] |

### Fonctionnalités / Inclusions

| Fonctionnalité | Description | Valeur pour le client |
|----------------|-------------|----------------------|
| [Feature 1] | [Description] | [Pourquoi c'est important] |
| [Feature 2] | [Description] | [Pourquoi c'est important] |
| [Feature 3] | [Description] | [Pourquoi c'est important] |

### Différenciation

**Pourquoi nous et pas les autres ?**

| Nous | Concurrent A | Concurrent B |
|------|--------------|--------------|
| [Avantage 1] | [Leur approche] | [Leur approche] |
| [Avantage 2] | [Leur approche] | [Leur approche] |
| [Avantage 3] | [Leur approche] | [Leur approche] |

### Pricing

| Élément | Détail |
|---------|--------|
| **Modèle** | [Abonnement / One-shot / Freemium / Usage...] |
| **Prix** | [Montant ou fourchette] |
| **Engagement** | [Durée minimale si applicable] |
| **Options** | [Add-ons disponibles] |

## 3. Offres Secondaires (si applicable)

### Offre [Nom 2]

| Aspect | Description |
|--------|-------------|
| **Cible** | [Qui] |
| **Problème** | [Quel sous-problème] |
| **Inclus** | [Fonctionnalités] |
| **Prix** | [Montant] |
| **Relation avec offre principale** | [Upsell / Cross-sell / Entry point] |

### Offre [Nom 3]

[Même structure]

## 4. Architecture des Offres

### Matrice Offres / Segments

```
                    │ Segment A │ Segment B │ Segment C │
────────────────────┼───────────┼───────────┼───────────┤
Offre Entry         │     ✓     │     ✓     │           │
Offre Core          │     ✓     │     ✓     │     ✓     │
Offre Premium       │           │     ✓     │     ✓     │
```

### Parcours d'Upsell

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Freemium   │ ──► │    Core     │ ──► │   Premium   │
│   ou Trial  │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
     │                    │                    │
     ▼                    ▼                    ▼
  Découverte          Adoption             Expansion
  du problème        de la solution       des usages
```

## 5. Proposition de Valeur

### Value Proposition Canvas

```
┌──────────────────────────────────────────────────────────────┐
│                     PROPOSITION DE VALEUR                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  GAINS CRÉÉS              │  DOULEURS SOULAGÉES              │
│  ─────────────            │  ───────────────────             │
│  • [Gain 1]               │  • [Pain 1 résolu]               │
│  • [Gain 2]               │  • [Pain 2 résolu]               │
│  • [Gain 3]               │  • [Pain 3 résolu]               │
│                           │                                  │
├───────────────────────────┴──────────────────────────────────┤
│                                                              │
│  PRODUITS & SERVICES                                         │
│  ───────────────────                                         │
│  • [Ce qu'on fournit concrètement]                          │
│  • [Ce qu'on fournit concrètement]                          │
│  • [Ce qu'on fournit concrètement]                          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Statement de Valeur

**Pour** [cible]
**Qui** [problème/besoin]
**Notre** [produit/service]
**Est** [catégorie]
**Qui** [bénéfice principal]
**Contrairement à** [alternative principale]
**Nous** [différenciateur clé]

## 6. Preuves et Crédibilité

### Résultats Clients

| Client/Cas | Situation avant | Résultat après | Métrique clé |
|------------|-----------------|----------------|--------------|
| [Client 1] | [Problème] | [Transformation] | [Chiffre] |
| [Client 2] | [Problème] | [Transformation] | [Chiffre] |

### Témoignages

> "[Verbatim client]"
> — [Nom], [Titre], [Entreprise]

### Garanties / Engagements

| Garantie | Description |
|----------|-------------|
| [Garantie 1] | [Ce qu'on promet] |
| [Garantie 2] | [Ce qu'on promet] |

## 7. Objections et Réponses

| Objection fréquente | Réponse |
|--------------------|---------|
| "C'est trop cher" | [Argumentation valeur/ROI] |
| "J'ai pas le temps" | [Facilité d'implémentation] |
| "Je suis pas sûr que ça marche" | [Preuves/garanties] |
| "[Autre objection]" | [Réponse] |

## 8. Roadmap Offres (optionnel)

### Évolutions Prévues

| Horizon | Évolution | Impact |
|---------|-----------|--------|
| Court terme | [Feature/Offre] | [Bénéfice] |
| Moyen terme | [Feature/Offre] | [Bénéfice] |
| Long terme | [Feature/Offre] | [Bénéfice] |
```

## Critères d'Acceptation

### Complétude
- [ ] Offre principale clairement définie
- [ ] Bénéfices articulés (pas juste features)
- [ ] Pricing documenté
- [ ] Différenciation expliquée
- [ ] Proposition de valeur formulée

### Qualité
- [ ] Cohérent avec le problème défini
- [ ] Bénéfices quantifiables quand possible
- [ ] Langage orienté client (pas jargon interne)
- [ ] Preuves ou témoignages inclus

### Validation
- [ ] Validé par product owner/fondateur
- [ ] Testé auprès de clients potentiels
- [ ] Équipe sales alignée

## Points de Contrôle Humain

| Checkpoint | Responsable | Critères |
|------------|-------------|----------|
| Cohérence avec problème | Product Owner | Offre résout bien le problème |
| Pricing | Direction | Positionnement prix validé |
| Différenciation | Marketing | Vraiment différenciant |
| Go/No-Go | Sponsor | Offre prête pour le marché |

## Exemples

### Exemple : SaaS B2B

```markdown
# Définition des Offres : TaskFlow

## Offre Principale

**Nom :** TaskFlow Pro

**En une phrase :** La plateforme tout-en-un qui centralise fichiers, tâches et communication pour les équipes marketing.

**Bénéfices clés :**
- Gain de 8h/semaine en recherche de fichiers
- 0 version perdue grâce à l'historique automatique
- Vue projet complète en temps réel

**Pricing :** 29€/utilisateur/mois (engagement annuel)

## Proposition de Valeur

**Pour** les équipes marketing de 5-50 personnes
**Qui** perdent du temps à jongler entre outils
**TaskFlow** est une plateforme de collaboration
**Qui** centralise tout le travail en un seul endroit
**Contrairement à** Notion + Slack + Drive utilisés séparément
**Nous** offrons une intégration native et des workflows marketing préconfigurés
```

### Exemple : Service B2C

```markdown
# Définition des Offres : CoachFit

## Offre Principale

**Nom :** Programme Transformation 12 semaines

**En une phrase :** Un accompagnement personnalisé pour perdre du poids durablement avec un coach dédié.

**Bénéfices clés :**
- Perte moyenne de 8kg en 12 semaines
- Programme adapté à votre emploi du temps
- Support WhatsApp 7j/7

**Pricing :** 597€ (paiement 3x sans frais)

## Garantie

"Satisfait ou remboursé pendant 14 jours"
```

## Anti-Patterns

### ❌ À Éviter

1. **Liste de features sans bénéfices**
   - "Notre app a un dashboard" → Et alors ?
   - Toujours répondre "Pour que vous puissiez..."

2. **Offre fourre-tout**
   - Trop de choses, message dilué
   - Une offre = un problème principal

3. **Pricing non justifié**
   - Prix sans ancrage de valeur
   - Pas de comparaison avec le coût du problème

4. **Différenciation faible**
   - "On est plus innovant" → Trop vague
   - Différences concrètes et vérifiables

5. **Déconnexion problème/offre**
   - L'offre ne résout pas vraiment le problème identifié
   - Vérifier la cohérence avec problem-definition

### ✅ Bonnes Pratiques

1. **Partir du problème** : Chaque feature répond à un pain point
2. **Quantifier les bénéfices** : "Gagnez 8h/semaine" > "Gagnez du temps"
3. **Montrer la transformation** : Avant/Après client
4. **Tester le pitch** : L'offre se comprend en 30 secondes ?
5. **Aligner prix et valeur** : ROI clair pour le client

## Intégrations

### Consomme
- `client-request` : Expression initiale du besoin
- `problem-definition` : Le problème à résoudre

### Produit pour
- `persona` : À qui vendre cette offre ?
- `brand-positioning` : Comment positionner l'offre
- `landing-page-brief` : Page de vente de l'offre
- `campaign-planning` : Campagnes pour promouvoir l'offre

## Outils Recommandés

| Outil | Usage |
|-------|-------|
| Value Proposition Canvas | Structurer la proposition |
| Lean Canvas | Vue business globale |
| Pricing Calculator | Modéliser les prix |
| Customer Interview | Valider l'offre |

## Références

- "Value Proposition Design" - Strategyzer
- "Obviously Awesome" - April Dunford
- "The Mom Test" - Rob Fitzpatrick
- "Positioning" - Al Ries & Jack Trout
