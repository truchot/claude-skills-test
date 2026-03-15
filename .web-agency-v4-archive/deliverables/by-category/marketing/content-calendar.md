---
id: content-calendar
name: Calendrier Éditorial
version: 1.0.0
category: marketing
status: active
phase: "2-strategy"
order: 5
agents:
  - content-marketing/content/orchestrator
  - content-marketing/content/blog-articles
  - content-marketing/content/social-media-content
consumes:
  - persona
  - editorial-charter
  - marketing-objectives
  - seo-keyword-research
produces_for:
  - content-marketing/content/blog-articles
  - content-marketing/content/social-media-content
  - content-marketing/content/landing-pages
  - seo-expert/contenu/brief-redactionnel
workflows:
  - id: wf-content-calendar-creation
    template: wf-planning
    phase: Planning
    name: Création calendrier éditorial
    duration: 2 jours
  - id: wf-content-calendar-review
    template: wf-validation
    phase: Review
    name: Revue mensuelle calendrier
    duration: 0.5 jour
tags:
  - marketing
  - content
  - planning
  - editorial
---

# Calendrier Éditorial

## Description

Le calendrier éditorial planifie la production et la publication de contenus sur une période donnée. Il coordonne les efforts content marketing, assure la régularité des publications et aligne le contenu avec les objectifs business.

## Cas d'Usage

- Planification mensuelle/trimestrielle du contenu
- Coordination des équipes (rédacteurs, designers, SEO)
- Alignement contenu avec campagnes marketing
- Suivi de la production et des deadlines
- Reporting sur le volume de contenu produit

## Structure du Livrable

```markdown
# Calendrier Éditorial [Mois/Trimestre] [Année]

## Vue d'Ensemble

### Période
- **Couverture** : [Date début] → [Date fin]
- **Dernière MAJ** : [Date]
- **Responsable** : [Content Manager]

### Objectifs Content de la Période

| Objectif | Métrique | Target |
|----------|----------|--------|
| [Objectif 1] | [KPI] | [Valeur] |
| [Objectif 2] | [KPI] | [Valeur] |
| [Objectif 3] | [KPI] | [Valeur] |

### Volume Prévu

| Type de Contenu | Quantité | Fréquence |
|-----------------|----------|-----------|
| Articles blog | [X] | [X/semaine] |
| Posts LinkedIn | [X] | [X/semaine] |
| Posts Instagram | [X] | [X/semaine] |
| Newsletters | [X] | [X/mois] |
| Webinars | [X] | [X/mois] |
| Vidéos | [X] | [X/mois] |

## Piliers de Contenu

### Pilier 1 : [Thématique]
- **Part du calendrier** : [X%]
- **Persona cible** : [Persona]
- **Objectif** : [Awareness / Conversion / Retention]
- **Mots-clés associés** : [KW1], [KW2], [KW3]

### Pilier 2 : [Thématique]
- **Part du calendrier** : [X%]
- **Persona cible** : [Persona]
- **Objectif** : [Awareness / Conversion / Retention]
- **Mots-clés associés** : [KW1], [KW2], [KW3]

### Pilier 3 : [Thématique]
- **Part du calendrier** : [X%]
- **Persona cible** : [Persona]
- **Objectif** : [Awareness / Conversion / Retention]
- **Mots-clés associés** : [KW1], [KW2], [KW3]

## Calendrier Mensuel

### Semaine 1 : [Date - Date]

| Date | Canal | Type | Titre/Sujet | Pilier | Persona | Status | Responsable |
|------|-------|------|-------------|--------|---------|--------|-------------|
| [Lun] | Blog | Article | [Titre] | [Pilier] | [Persona] | 🟡 Draft | [Nom] |
| [Mar] | LinkedIn | Post | [Sujet] | [Pilier] | [Persona] | 🟢 Publié | [Nom] |
| [Mer] | Instagram | Carousel | [Sujet] | [Pilier] | [Persona] | 🔴 À faire | [Nom] |
| [Jeu] | Newsletter | Email | [Sujet] | [Pilier] | [Persona] | 🟡 Review | [Nom] |
| [Ven] | LinkedIn | Post | [Sujet] | [Pilier] | [Persona] | 🔴 À faire | [Nom] |

### Semaine 2 : [Date - Date]

| Date | Canal | Type | Titre/Sujet | Pilier | Persona | Status | Responsable |
|------|-------|------|-------------|--------|---------|--------|-------------|
| ... | ... | ... | ... | ... | ... | ... | ... |

### Semaine 3 : [Date - Date]
[Même structure]

### Semaine 4 : [Date - Date]
[Même structure]

## Calendrier par Canal

### Blog

| Semaine | Date Publication | Titre | Catégorie | Mot-clé Principal | Auteur | Status |
|---------|------------------|-------|-----------|-------------------|--------|--------|
| S1 | [Date] | [Titre article] | [Cat] | [KW] | [Nom] | [Status] |
| S2 | [Date] | [Titre article] | [Cat] | [KW] | [Nom] | [Status] |
| S3 | [Date] | [Titre article] | [Cat] | [KW] | [Nom] | [Status] |
| S4 | [Date] | [Titre article] | [Cat] | [KW] | [Nom] | [Status] |

### LinkedIn

| Date | Heure | Type | Hook (1ère ligne) | CTA | Visuel | Status |
|------|-------|------|-------------------|-----|--------|--------|
| [Date] | [Heure] | [Text/Carousel/Video] | "[Hook]" | [CTA] | [Oui/Non] | [Status] |

### Newsletter

| Date Envoi | Objet | Contenu Principal | CTA | Segment |
|------------|-------|-------------------|-----|---------|
| [Date] | [Objet email] | [Description] | [CTA] | [Segment] |

### Instagram

| Date | Heure | Type | Légende (preview) | Hashtags | Status |
|------|-------|------|-------------------|----------|--------|
| [Date] | [Heure] | [Post/Story/Reel] | "[Preview]" | [#1 #2] | [Status] |

## Événements & Campagnes

### Événements du Mois

| Date | Événement | Type | Contenus Associés |
|------|-----------|------|-------------------|
| [Date] | [Événement marronnier] | [Interne/Externe] | [Liste contenus] |
| [Date] | [Lancement produit] | [Interne] | [Liste contenus] |
| [Date] | [Salon/Conférence] | [Externe] | [Liste contenus] |

### Marronniers

| Date | Marronnier | Pertinence | Contenu Prévu |
|------|------------|------------|---------------|
| [Date] | [Journée mondiale de X] | [H/M/L] | [Contenu ou -] |
| [Date] | [Fête commerciale] | [H/M/L] | [Contenu ou -] |

### Campagnes Marketing

| Campagne | Période | Objectif | Contenus |
|----------|---------|----------|----------|
| [Nom campagne] | [Dates] | [Objectif] | [X articles, Y posts, Z emails] |

## Workflow de Production

### Process Standard

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  BRIEF  │ →  │  DRAFT  │ →  │  REVIEW │ →  │ APPROVED│ →  │ PUBLIÉ  │
│ J-14    │    │ J-10    │    │ J-7     │    │ J-3     │    │ J-0     │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
```

### Délais par Type

| Type Contenu | Brief | Draft | Review | Publication |
|--------------|-------|-------|--------|-------------|
| Article blog | J-14 | J-10 | J-5 | J-0 |
| Post social | J-3 | J-2 | J-1 | J-0 |
| Newsletter | J-7 | J-5 | J-2 | J-0 |
| Vidéo | J-21 | J-14 | J-7 | J-0 |

### Responsabilités

| Rôle | Responsabilités |
|------|-----------------|
| Content Manager | Planning, coordination, validation finale |
| Rédacteur | Rédaction, révisions |
| Designer | Visuels, infographies |
| SEO | Optimisation, mots-clés |
| Community Manager | Publication, engagement |

## Suivi & Status

### Légende Status

| Emoji | Status | Description |
|-------|--------|-------------|
| 🔴 | À faire | Pas encore commencé |
| 🟡 | En cours | Draft ou en review |
| 🟢 | Publié | Live |
| ⚫ | Annulé | Contenu abandonné |
| 🔵 | Reporté | Décalé à une autre date |

### Tableau de Bord

| Métrique | Cette Semaine | Ce Mois | Objectif |
|----------|---------------|---------|----------|
| Contenus publiés | [X] | [Y] | [Z] |
| Contenus en retard | [X] | [Y] | 0 |
| Taux de complétion | [X%] | [Y%] | 95% |

## Archive & Recyclage

### Contenus Evergreen à Recycler

| Contenu Original | Date | Performance | Idée Recyclage |
|------------------|------|-------------|----------------|
| [Titre] | [Date] | [Views/Shares] | [Thread, Infographie, etc.] |

### Mise à Jour Planifiée

| Contenu | Date Publication | MAJ Prévue | Raison |
|---------|------------------|------------|--------|
| [Titre] | [Date originale] | [Date MAJ] | [Actualisation data, etc.] |
```

## Critères d'Acceptation

### Complétude
- [ ] Couverture complète de la période
- [ ] Tous les canaux inclus
- [ ] Piliers de contenu définis
- [ ] Responsables assignés
- [ ] Deadlines intermédiaires spécifiées
- [ ] Événements et marronniers intégrés

### Qualité
- [ ] Aligné avec les objectifs marketing
- [ ] Équilibre entre les piliers de contenu
- [ ] Volume réaliste par rapport aux ressources
- [ ] Mix de formats variés
- [ ] Cohérent avec la charte éditoriale

### Validation
- [ ] Validé par Content Manager
- [ ] Aligné avec Marketing Manager sur les campagnes
- [ ] Capacité équipe confirmée

## Points de Contrôle Humain

| Checkpoint | Responsable | Critères |
|------------|-------------|----------|
| Planning mensuel | Content Manager | Couverture, équilibre piliers |
| Brief contenu | SEO + Content | KW validés, angle pertinent |
| Validation contenu | Content Manager | Qualité, cohérence brand |
| Publication | Community Manager | Timing, format correct |

## Exemples

### Exemple : Calendrier Startup SaaS

```markdown
# Calendrier Éditorial Février 2024

## Volume Prévu
| Type | Quantité |
|------|----------|
| Articles blog | 8 (2/semaine) |
| Posts LinkedIn | 12 (3/semaine) |
| Newsletter | 4 (1/semaine) |
| Webinar | 1 |

## Piliers
1. **Product Education** (40%) - Tutos, features
2. **Industry Insights** (30%) - Tendances, études
3. **Customer Stories** (30%) - Cas clients, témoignages

## Semaine 1 (1-7 Février)

| Date | Canal | Contenu | Status |
|------|-------|---------|--------|
| Lun 3 | Blog | "Guide complet : automatiser vos workflows" | 🟢 |
| Mar 4 | LinkedIn | Thread : 5 erreurs automation | 🟢 |
| Mer 5 | Newsletter | Recap janvier + feature spotlight | 🟡 |
| Jeu 6 | LinkedIn | Carousel : ROI automation | 🔴 |
| Ven 7 | Blog | Case study : Client X | 🔴 |
```

### Exemple : Calendrier E-commerce

```markdown
# Calendrier Mars 2024 - Mode Éthique

## Événements Clés
- 8 mars : Journée droits des femmes
- 15-22 mars : Fashion Revolution Week
- 20 mars : Printemps → Collection

## Semaine 2 (4-10 Mars)

| Date | Canal | Contenu |
|------|-------|---------|
| Lun 4 | Instagram | Teasing collection printemps |
| Mar 5 | Blog | "Mode éthique : par où commencer" |
| Mer 6 | Story IG | Behind the scenes - atelier |
| Jeu 7 | Newsletter | Preview collection + code early |
| Ven 8 | All | Journée Femmes - portraits créatrices |
| Sam 9 | Instagram | UGC - looks communauté |
```

## Anti-Patterns

### ❌ À Éviter

1. **Calendrier vide**
   - Planifier des "slots" sans sujet défini
   - "Article à définir" sans brief

2. **Surplanification**
   - Planning à 6 mois trop rigide
   - Aucune flexibilité pour l'actualité

3. **Calendrier ignoré**
   - Créé mais jamais consulté
   - Publier "à la volée"

4. **Mono-canal**
   - Planifier le blog sans les réseaux
   - Pas de vision cross-canal

5. **Pas de recyclage**
   - Créer toujours du neuf
   - Ignorer les contenus performants

### ✅ Bonnes Pratiques

1. **Planifier 4-6 semaines à l'avance** (pas plus)
2. **Garder 20% de flexibilité** pour l'actualité
3. **Revoir chaque semaine** les 2 semaines suivantes
4. **Recycler les contenus** performants
5. **Utiliser un outil collaboratif** (pas Excel)

## Intégrations

### Consomme
- `persona` : Contenu adapté à la cible
- `editorial-charter` : Ton et style
- `marketing-objectives` : Priorités content
- `seo-keyword-research` : Sujets SEO

### Produit pour
- `blog-articles` : Brief articles
- `social-media-content` : Planning posts
- `newsletter` : Contenu emails

## Outils Recommandés

| Outil | Usage |
|-------|-------|
| Notion | Planning + briefs |
| Trello/Asana | Workflow production |
| Airtable | Base de données contenu |
| CoSchedule | Calendrier marketing |
| Buffer/Hootsuite | Planification social |
| Google Calendar | Vue équipe |

## Références

- "Content Strategy for the Web" - Kristina Halvorson
- "Everybody Writes" - Ann Handley
- "Epic Content Marketing" - Joe Pulizzi
