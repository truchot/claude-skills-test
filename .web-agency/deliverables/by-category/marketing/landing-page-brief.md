---
id: landing-page-brief
name: Brief Landing Page
version: 1.0.0
category: marketing
status: active
phase: "3-conception"
order: 18
agents:
  - marketing/performance/conversion-optimization
  - marketing/content/landing-pages
  - design/ux/wireframes
consumes:
  - persona
  - brand-positioning
  - campaign-planning
produces_for:
  - design/ux/wireframes
  - tech/frontend/orchestrator
workflows:
  - id: wf-landing-page-brief
    template: wf-creation
    phase: Brief
    name: Brief landing page
    duration: 1 jour
tags:
  - marketing
  - cro
  - landing-page
  - brief
  - conversion
---

# Brief Landing Page

## Description

Le brief landing page spécifie les objectifs, le contenu, et les éléments de conversion d'une page d'atterrissage optimisée pour la conversion.

## Cas d'Usage

- Campagne publicitaire
- Lancement produit
- Lead generation
- Événement/webinar
- Offre promotionnelle

## Structure du Livrable

```markdown
# Brief Landing Page : [Nom/Campagne]

## Fiche d'Identité

| Attribut | Valeur |
|----------|--------|
| **Nom** | [Nom de la landing] |
| **URL prévue** | [/landing/xxx] |
| **Campagne associée** | [Nom campagne] |
| **Objectif principal** | [Lead gen / Vente / Inscription...] |
| **Date de livraison** | [Date] |
| **Owner** | [Responsable] |

## 1. Objectifs & KPIs

### Objectif Principal
> [Un seul objectif clair : ex. "Générer des demandes de démo"]

### Conversion Goal

| Goal | Définition | Tracking Event |
|------|------------|----------------|
| **Primaire** | [Action principale] | `[event_name]` |
| **Secondaire** | [Action alternative] | `[event_name]` |

### KPIs Cibles

| KPI | Objectif | Benchmark |
|-----|----------|-----------|
| Conversion Rate | >[X%] | [Benchmark secteur] |
| Bounce Rate | <[X%] | <50% |
| Time on Page | >[Xs] | >30s |
| Scroll Depth | >[X%] | >70% |

## 2. Audience Cible

### Persona Principal

| Attribut | Valeur |
|----------|--------|
| **Persona** | [Nom persona] |
| **Job-to-be-Done** | "[Ce qu'il cherche à accomplir]" |
| **Pain principal** | [Problème résolu] |
| **Niveau de conscience** | [Problème-aware / Solution-aware / Product-aware] |

### Intent de l'Audience
- **D'où vient le trafic** : [Ads Google / Social / Email...]
- **Requête/Message vu** : "[Message de l'annonce/email]"
- **Attente du visiteur** : [Ce qu'il espère trouver]

### État d'Esprit

```
Avant la visite:
"[Ce que le visiteur pense/ressent avant d'arriver]"

Après conversion:
"[Ce que le visiteur devrait penser/ressentir]"
```

## 3. Proposition de Valeur

### Message Principal (H1)
> "[Headline principale qui capte l'attention et communique le bénéfice]"

Alternatives à tester :
- "[Alternative A]"
- "[Alternative B]"

### Sous-titre (H2)
> "[Clarification qui explique comment on délivre la promesse]"

### Promesse Unique (USP)
> "[Ce qui nous différencie de la concurrence en une phrase]"

### Bénéfices Clés (3-4 max)

| Bénéfice | Icône | Description |
|----------|-------|-------------|
| **[Bénéfice 1]** | [🎯] | [Phrase courte] |
| **[Bénéfice 2]** | [⚡] | [Phrase courte] |
| **[Bénéfice 3]** | [✅] | [Phrase courte] |
| **[Bénéfice 4]** | [💰] | [Phrase courte] |

## 4. Structure de la Page

### Wireframe Textuel

```
┌──────────────────────────────────────────────────────────────┐
│                         HEADER                                │
│  [Logo]                              [CTA secondaire / Nav]  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                       HERO SECTION                           │
│                                                              │
│   [H1 - Headline principale]                                 │
│   [H2 - Sous-titre explicatif]                              │
│                                                              │
│   [Visual Hero - Image/Vidéo produit]                       │
│                                                              │
│        ┌─────────────────────────┐                          │
│        │      [CTA PRINCIPAL]     │                          │
│        └─────────────────────────┘                          │
│                                                              │
│   [Micro-copy : "Sans engagement" / "Essai gratuit"]        │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                     SOCIAL PROOF BAR                         │
│   [Logo 1] [Logo 2] [Logo 3] [Logo 4] [Logo 5]              │
│   "[X] entreprises nous font confiance"                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                    SECTION BÉNÉFICES                         │
│                                                              │
│   [Titre section]                                            │
│                                                              │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│   │  Bénéfice 1 │ │  Bénéfice 2 │ │  Bénéfice 3 │          │
│   │  [Icône]    │ │  [Icône]    │ │  [Icône]    │          │
│   │  [Texte]    │ │  [Texte]    │ │  [Texte]    │          │
│   └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                    SECTION FEATURES                          │
│                                                              │
│   [Feature 1 - texte]              [Visual feature 1]       │
│                                                              │
│   [Visual feature 2]               [Feature 2 - texte]      │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                    TÉMOIGNAGES                               │
│                                                              │
│   ┌────────────────────────────────────────────────┐        │
│   │ "[Citation témoignage]"                        │        │
│   │  - [Nom], [Titre] @ [Entreprise] [Photo]       │        │
│   └────────────────────────────────────────────────┘        │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                    SECTION OBJECTIONS                        │
│                                                              │
│   ❓ [Objection 1]                                           │
│      [Réponse rassurante]                                   │
│                                                              │
│   ❓ [Objection 2]                                           │
│      [Réponse rassurante]                                   │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                    CTA FINAL                                 │
│                                                              │
│   [Rappel de la proposition de valeur]                      │
│                                                              │
│        ┌─────────────────────────┐                          │
│        │      [CTA PRINCIPAL]     │                          │
│        └─────────────────────────┘                          │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                         FOOTER                               │
│   [Mentions légales] [Privacy] [Contact]                    │
└──────────────────────────────────────────────────────────────┘
```

### Sections Détaillées

#### Hero Section

| Élément | Contenu |
|---------|---------|
| H1 | "[Headline]" |
| H2 | "[Sous-titre]" |
| CTA | "[Texte bouton]" → [Action] |
| Visuel | [Description du visuel hero] |
| Trust elements | [Badges, chiffres, micro-copy] |

#### Social Proof

| Type | Contenu |
|------|---------|
| Logos clients | [Logo 1], [Logo 2], [Logo 3]... |
| Chiffre clé | "[X] clients / [Y] utilisateurs" |
| Rating | "[X] étoiles sur [Plateforme]" |

#### Témoignages

| Témoignage | Source | Photo |
|------------|--------|-------|
| "[Citation 1]" | [Nom], [Titre] @ [Entreprise] | ✅ |
| "[Citation 2]" | [Nom], [Titre] @ [Entreprise] | ✅ |

## 5. Formulaire (si applicable)

### Champs

| Champ | Type | Obligatoire | Validation |
|-------|------|-------------|------------|
| Prénom | Text | ✅ | - |
| Email | Email | ✅ | Format email |
| Téléphone | Tel | ❌ | Format FR |
| Entreprise | Text | ❌ | - |
| [Champ custom] | [Type] | [Oui/Non] | [Règle] |

### Micro-copy Formulaire

| Élément | Texte |
|---------|-------|
| Titre formulaire | "[Ex: Demandez votre démo gratuite]" |
| Bouton submit | "[Texte CTA]" |
| Sous le bouton | "[Rassurance : pas de spam, gratuit...]" |
| Privacy | "[Lien vers politique]" |

### Post-Submission

| Élément | Contenu |
|---------|---------|
| Page de confirmation | [URL ou modal] |
| Message de confirmation | "[Texte de remerciement]" |
| Email de confirmation | [Oui/Non] - [Contenu] |
| Next step | [Ce qui se passe ensuite] |

## 6. Éléments de Confiance

### Trust Signals

| Type | Contenu | Placement |
|------|---------|-----------|
| Logos clients | [Liste] | Sous hero |
| Témoignages | [X témoignages] | Section dédiée |
| Certifications | [ISO, RGPD...] | Footer ou hero |
| Garanties | [Satisfait ou remboursé...] | Près du CTA |
| Chiffres | "[X] clients satisfaits" | Hero ou social proof |
| Reviews | [Note G2, Trustpilot...] | Hero ou footer |

### Réponse aux Objections

| Objection Anticipée | Réponse |
|---------------------|---------|
| "[Objection 1]" | [Réponse rassurante] |
| "[Objection 2]" | [Réponse avec preuve] |
| "[Objection 3]" | [Réponse + garantie] |

## 7. SEO & Technique

### SEO (si indexée)

| Élément | Contenu |
|---------|---------|
| Title | "[Title tag - 60 car. max]" |
| Meta description | "[Description - 160 car.]" |
| H1 | "[Headline]" |
| URL | /[slug-optimise] |
| Canonical | [URL] |
| Index | [Yes/No] |

### Performance

| Critère | Cible |
|---------|-------|
| LCP | <2.5s |
| CLS | <0.1 |
| Page weight | <[X]MB |
| Mobile-first | Oui |

### Tracking

| Event | Trigger | Destination |
|-------|---------|-------------|
| page_view | Load | GA4 |
| scroll_depth | 25%, 50%, 75%, 100% | GA4 |
| cta_click | Click CTA | GA4 |
| form_start | Focus premier champ | GA4 |
| form_submit | Submit | GA4 + CRM |

### UTM Attendus

```
utm_source: [google|facebook|email|...]
utm_medium: [cpc|social|email|...]
utm_campaign: [nom-campagne]
utm_content: [variante-ad]
```

## 8. Design & Assets

### Guidelines

| Aspect | Directive |
|--------|-----------|
| Style | [Selon charte / Spécifique campagne] |
| Couleurs | [Couleur CTA : X] |
| Typo | [Selon charte] |
| Imagery | [Type d'images attendues] |
| Vidéo | [Oui/Non - Spécifications] |

### Assets Requis

| Asset | Format | Source | Status |
|-------|--------|--------|--------|
| Hero image | [Dimensions] | [À créer/Existant] | [🔴/🟢] |
| Icônes bénéfices | [X icônes] | [Bibliothèque] | [🔴/🟢] |
| Photos clients | [X photos] | [À demander] | [🔴/🟢] |
| Vidéo démo | [Durée] | [À produire] | [🔴/🟢] |
| Logo clients | [X logos] | [À collecter] | [🔴/🟢] |

## 9. Variations & Tests

### Variations Prévues

| Variante | Différence | Pour tester |
|----------|------------|-------------|
| A (Control) | [Version de base] | - |
| B | [Headline alternative] | Impact headline |
| C | [CTA différent] | Wording CTA |

### Tests A/B Planifiés

| Test | Élément | Hypothèse |
|------|---------|-----------|
| Test 1 | [Headline] | "[H1 A] vs [H1 B]" → +conv |
| Test 2 | [CTA] | "[CTA A] vs [CTA B]" → +clicks |
| Test 3 | [Social proof] | [Avec/Sans testimonial] → +trust |

## Validation

### Checklist Pré-Dev

- [ ] Objectif et KPIs validés
- [ ] Copy approuvé
- [ ] Wireframe validé
- [ ] Assets disponibles
- [ ] Tracking défini
- [ ] Formulaire spécifié
- [ ] Mobile considéré

### Approbations

| Rôle | Nom | Date | Status |
|------|-----|------|--------|
| Marketing | [Nom] | [Date] | [✅/⏳] |
| Design | [Nom] | [Date] | [✅/⏳] |
| Legal | [Nom] | [Date] | [✅/⏳] |
```

## Critères d'Acceptation

### Complétude
- [ ] Objectif clair et unique
- [ ] Persona et intent définis
- [ ] Message et USP formulés
- [ ] Structure wireframe complète
- [ ] Formulaire spécifié
- [ ] Tracking planifié
- [ ] Assets listés

### Qualité
- [ ] Message aligné avec l'audience
- [ ] Un seul CTA principal
- [ ] Objections adressées
- [ ] Mobile-first pensé

### Validation
- [ ] Validé par Marketing
- [ ] Approuvé par Product

## Anti-Patterns

### ❌ À Éviter

1. **Trop de CTAs**
   - Dilue l'attention
   - Confusiogène

2. **Message générique**
   - "Solution leader"
   - Pas de différenciation

3. **Pas de preuve sociale**
   - Aucun témoignage
   - Pas de logos

4. **Formulaire trop long**
   - Plus de 5 champs
   - Friction excessive

### ✅ Bonnes Pratiques

1. **Un seul objectif** par landing
2. **Message spécifique** à l'audience
3. **Preuve sociale visible** early
4. **CTA clair et contrasté**
5. **Mobile-first** design
