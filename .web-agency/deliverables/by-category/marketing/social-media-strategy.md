---
id: social-media-strategy
name: Stratégie Social Media
version: 1.0.0
category: marketing
status: active
phase: "2-strategy"
order: 20
agents:
  - marketing/social-strategy/platform-strategy
  - marketing/social-strategy/engagement-strategy
  - marketing/social-strategy/orchestrator
consumes:
  - persona
  - brand-positioning
  - editorial-charter
  - marketing-objectives
produces_for:
  - marketing/content/social-media-content
  - marketing/social-strategy/community-management
workflows:
  - id: wf-social-strategy
    template: wf-strategy
    phase: Strategy
    name: Élaboration stratégie social media
    duration: 3 jours
tags:
  - marketing
  - social-media
  - strategy
  - content
  - community
---

# Stratégie Social Media

## Description

La stratégie social media définit la présence de la marque sur les réseaux sociaux : plateformes prioritaires, ligne éditoriale, fréquence de publication, et objectifs de croissance.

## Cas d'Usage

- Lancement de présence social media
- Refonte de stratégie existante
- Expansion vers nouvelles plateformes
- Alignement avec repositionnement de marque

## Structure du Livrable

```markdown
# Stratégie Social Media : [Marque/Projet]

## Résumé Exécutif

### Vision Social Media
> "[Vision de la présence social media en une phrase]"

### Objectifs Clés

| Objectif | KPI | Cible 6 mois | Cible 12 mois |
|----------|-----|--------------|---------------|
| Notoriété | Reach mensuel | [X K] | [Y K] |
| Engagement | Taux engagement | [X%] | [Y%] |
| Communauté | Followers | [X K] | [Y K] |
| Trafic | Clics vers site | [X K] | [Y K] |
| Conversion | Leads social | [X] | [Y] |

### Plateformes Prioritaires

| Priorité | Plateforme | Audience | Objectif Principal |
|----------|------------|----------|-------------------|
| 🥇 | [LinkedIn] | [Décideurs B2B] | [Thought leadership] |
| 🥈 | [Instagram] | [Millennials] | [Notoriété brand] |
| 🥉 | [Twitter/X] | [Tech/Early adopters] | [Engagement temps réel] |

## 1. Audit & Contexte

### Situation Actuelle

| Plateforme | Followers | Engagement | Fréquence | Assessment |
|------------|-----------|------------|-----------|------------|
| LinkedIn | [X K] | [Y%] | [Z/sem] | [🟢/🟡/🔴] |
| Instagram | [X K] | [Y%] | [Z/sem] | [🟢/🟡/🔴] |
| Facebook | [X K] | [Y%] | [Z/sem] | [🟢/🟡/🔴] |
| Twitter/X | [X K] | [Y%] | [Z/sem] | [🟢/🟡/🔴] |
| TikTok | [X K] | [Y%] | [Z/sem] | [🟢/🟡/🔴] |
| YouTube | [X K] | [Y%] | [Z/mois] | [🟢/🟡/🔴] |

### Forces & Faiblesses

| 🟢 Forces | 🔴 Faiblesses |
|-----------|---------------|
| [Force 1] | [Faiblesse 1] |
| [Force 2] | [Faiblesse 2] |
| [Force 3] | [Faiblesse 3] |

### Benchmark Concurrents

| Concurrent | Plateforme | Followers | Engagement | Best Practices |
|------------|------------|-----------|------------|----------------|
| [Concurrent 1] | LinkedIn | [X K] | [Y%] | [Ce qu'ils font bien] |
| [Concurrent 2] | Instagram | [X K] | [Y%] | [Ce qu'ils font bien] |
| [Concurrent 3] | Twitter | [X K] | [Y%] | [Ce qu'ils font bien] |

## 2. Stratégie par Plateforme

### LinkedIn

#### Positionnement
> "[Comment on veut être perçu sur LinkedIn]"

#### Audience Cible
- **Persona principal** : [Persona]
- **Fonctions** : [CEO, CMO, Head of...]
- **Secteurs** : [Secteurs cibles]
- **Géographie** : [Pays/Régions]

#### Objectifs Spécifiques

| KPI | Actuel | 6 mois | 12 mois |
|-----|--------|--------|---------|
| Followers | [X] | [Y] | [Z] |
| Engagement rate | [X%] | [Y%] | [Z%] |
| Impressions/mois | [X K] | [Y K] | [Z K] |
| Clics/mois | [X] | [Y] | [Z] |

#### Contenus

| Type | Format | Fréquence | Objectif |
|------|--------|-----------|----------|
| Thought leadership | Article/Post long | 1/semaine | Crédibilité |
| Insights marché | Carousel | 2/semaine | Engagement |
| Behind the scenes | Photo/Vidéo | 1/semaine | Humaniser |
| Employee advocacy | Reposts | Continu | Reach |
| Product updates | Post | 2/mois | Awareness |

#### Ton & Style
- **Registre** : [Professionnel mais accessible]
- **Format favori** : [Posts texte + Carousels]
- **Hashtags** : [#hashtag1, #hashtag2...] (max 5)

---

### Instagram

#### Positionnement
> "[Comment on veut être perçu sur Instagram]"

#### Audience Cible
- **Âge** : [Tranche]
- **Intérêts** : [Intérêts]
- **Comportement** : [Usage de la plateforme]

#### Objectifs Spécifiques

| KPI | Actuel | 6 mois | 12 mois |
|-----|--------|--------|---------|
| Followers | [X] | [Y] | [Z] |
| Engagement rate | [X%] | [Y%] | [Z%] |
| Reach/mois | [X K] | [Y K] | [Z K] |
| Story views | [X K] | [Y K] | [Z K] |

#### Contenus

| Type | Format | Fréquence | Objectif |
|------|--------|-----------|----------|
| Feed posts | Photo/Carousel | 3/semaine | Brand awareness |
| Stories | Vidéo/Polls | Quotidien | Engagement |
| Reels | Vidéo courte | 2/semaine | Reach |
| Lives | Streaming | 1/mois | Community |
| UGC | Reposts | 1/semaine | Social proof |

#### Esthétique
- **Palette couleurs** : [Couleurs brand]
- **Style photo** : [Bright/Moody/Minimal...]
- **Filters** : [Filter ou preset utilisé]
- **Grid strategy** : [Oui/Non - Type]

---

### Twitter/X

[Même structure adaptée à Twitter]

---

### TikTok (si pertinent)

[Même structure adaptée à TikTok]

---

### YouTube (si pertinent)

[Même structure adaptée à YouTube]

## 3. Piliers de Contenu

### Content Pillars

| Pilier | % | Description | Exemples |
|--------|---|-------------|----------|
| **Éducatif** | 40% | Apporter de la valeur | Tips, How-to, Explainers |
| **Inspirant** | 25% | Motiver, aspirer | Success stories, Vision |
| **Divertissant** | 20% | Engager, amuser | Memes, Behind scenes |
| **Promotionnel** | 15% | Vendre | Produits, Offres |

### Ratio Contenus

```
┌─────────────────────────────────────────────────────────────┐
│                     MIX DE CONTENU                          │
│                                                             │
│  ÉDUCATIF      ████████████████████░░░░░░░░░░░░░░░░  40%   │
│  INSPIRANT     ████████████░░░░░░░░░░░░░░░░░░░░░░░░  25%   │
│  DIVERTISSANT  ██████████░░░░░░░░░░░░░░░░░░░░░░░░░░  20%   │
│  PROMOTIONNEL  ██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  15%   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Thématiques Récurrentes

| Thème | Pilier | Plateforme | Fréquence |
|-------|--------|------------|-----------|
| [Tips du mardi] | Éducatif | LinkedIn | Hebdo |
| [Success story] | Inspirant | Instagram | Bi-mensuel |
| [Industry news] | Éducatif | Twitter | Quotidien |
| [Team spotlight] | Divertissant | Instagram | Mensuel |

## 4. Calendrier Type

### Semaine Type

| Jour | LinkedIn | Instagram | Twitter |
|------|----------|-----------|---------|
| Lundi | Post insight | Story poll | Thread |
| Mardi | - | Feed post | News RT |
| Mercredi | Carousel | Reel | - |
| Jeudi | - | Story | Engagement |
| Vendredi | Post léger | Feed post | - |
| Weekend | - | Story casual | - |

### Horaires Optimaux

| Plateforme | Meilleurs Horaires | Jours |
|------------|-------------------|-------|
| LinkedIn | 8h-9h, 12h, 17h-18h | Mar-Jeu |
| Instagram | 12h-14h, 19h-21h | Tous |
| Twitter | 9h, 12h, 17h | Lun-Ven |
| TikTok | 19h-22h | Tous |

## 5. Community Management

### Engagement Rules

| Type d'Interaction | Temps de Réponse | Responsable |
|--------------------|------------------|-------------|
| Questions produit | <2h (heures ouvrées) | CM |
| Commentaires positifs | <24h | CM |
| Plaintes/Négatifs | <1h | CM + Escalade |
| DMs | <4h | CM |
| Mentions | <24h | CM |

### Tone of Voice par Contexte

| Contexte | Ton | Exemple |
|----------|-----|---------|
| Réponse positive | Chaleureux, enthousiaste | "Merci beaucoup ! 🙏" |
| Question technique | Helpful, professionnel | "Bonne question ! Voici..." |
| Plainte | Empathique, solutionneur | "On comprend, voici comment..." |
| Troll | Ignore ou humour | [Selon cas] |

### Escalation Matrix

| Situation | Action | Escalade vers |
|-----------|--------|---------------|
| Question simple | Réponse directe | - |
| Question technique | Transfert ou tag | Support |
| Plainte publique | Réponse + DM | Manager |
| Crise potentielle | Ne pas répondre | Direction |

## 6. Influenceurs & Partenariats

### Stratégie Influence

| Type | Description | Budget |
|------|-------------|--------|
| Nano (1-10K) | Ambassadeurs produit | [X €/mois] |
| Micro (10-100K) | Collaborations ponctuelles | [X €/mois] |
| Macro (100K+) | Campagnes | [X €/campagne] |

### Partenaires Potentiels

| Influenceur | Plateforme | Audience | Fit | Status |
|-------------|------------|----------|-----|--------|
| [@influencer1] | Instagram | [X K] | [Élevé] | [À contacter] |
| [@influencer2] | LinkedIn | [X K] | [Moyen] | [En discussion] |

### Employee Advocacy

| Action | Participants | Fréquence |
|--------|--------------|-----------|
| Partage posts officiels | Tous employés | Sur demande |
| Posts personnels avec tag | Leadership | Hebdo |
| Programme ambassadeur | Volontaires | Mensuel |

## 7. Paid Social

### Budget Allocation

| Plateforme | Budget/Mois | Objectif |
|------------|-------------|----------|
| LinkedIn Ads | [X €] | Lead gen |
| Meta Ads | [X €] | Notoriété + Retargeting |
| Twitter Ads | [X €] | Engagement |
| **Total** | **[X €]** | - |

### Types de Campagnes

| Type | Plateforme | Budget % | KPI |
|------|------------|----------|-----|
| Awareness | Meta | 30% | Reach, CPM |
| Consideration | LinkedIn | 40% | Engagement, CTR |
| Conversion | All | 30% | Leads, CPA |

## 8. Mesure & Reporting

### KPIs Prioritaires

| KPI | Définition | Source | Fréquence |
|-----|------------|--------|-----------|
| Reach | Personnes atteintes | Native analytics | Hebdo |
| Engagement Rate | (Likes+Comments+Shares)/Reach | Calculé | Hebdo |
| Follower Growth | Net new followers | Native | Mensuel |
| Link Clicks | Clics vers site | Native + UTMs | Hebdo |
| Social Leads | Leads attribués social | CRM | Mensuel |

### Reporting Cadence

| Rapport | Fréquence | Contenu | Destinataires |
|---------|-----------|---------|---------------|
| Weekly digest | Hebdo | Top posts, engagement | Social team |
| Monthly report | Mensuel | KPIs, trends, learnings | Marketing |
| Quarterly review | Trim. | Stratégie, ajustements | Direction |

## 9. Outils & Ressources

### Tech Stack

| Catégorie | Outil | Usage |
|-----------|-------|-------|
| Scheduling | [Buffer/Hootsuite/Later] | Planification posts |
| Analytics | [Sprout/Native/Metricool] | Reporting |
| Listening | [Mention/Brandwatch] | Veille |
| Design | [Canva/Figma] | Création visuels |
| Video | [CapCut/Premiere] | Montage vidéo |

### Ressources Humaines

| Rôle | Responsabilités | Temps alloué |
|------|-----------------|--------------|
| Social Media Manager | Stratégie, reporting | [X%] |
| Community Manager | Engagement, réponses | [X%] |
| Content Creator | Création contenu | [X%] |
| Graphic Designer | Visuels | [X%] |

## Annexes

### A. Guidelines Visuelles par Plateforme
[Templates et spécifications]

### B. Banque de Hashtags
[Liste par thématique]

### C. FAQ Community Management
[Réponses types]
```

## Critères d'Acceptation

### Complétude
- [ ] Toutes les plateformes analysées
- [ ] Objectifs chiffrés par plateforme
- [ ] Piliers de contenu définis
- [ ] Calendrier type établi
- [ ] Community management documenté
- [ ] KPIs et reporting planifiés

### Qualité
- [ ] Aligné avec brand positioning
- [ ] Réaliste vs ressources
- [ ] Différenciation par plateforme
- [ ] Objectifs SMART

### Validation
- [ ] Validé par Marketing Director
- [ ] Aligné avec Content Manager
- [ ] Budget approuvé

## Anti-Patterns

### ❌ À Éviter

1. **Être partout**
   - Présent sur 10 plateformes sans ressources
   - Qualité sacrifiée

2. **Copier-coller cross-platform**
   - Même contenu partout
   - Pas d'adaptation

3. **Pas d'engagement**
   - Poster et disparaître
   - Ignorer les commentaires

4. **100% promotionnel**
   - Que des posts produits
   - Aucune valeur ajoutée

### ✅ Bonnes Pratiques

1. **Choisir 2-3 plateformes** et exceller
2. **Adapter le contenu** à chaque plateforme
3. **Engager activement** avec la communauté
4. **Ratio 80/20** : valeur vs promotion
