---
id: email-sequence
name: Séquence Email / Nurturing
version: 1.0.0
category: marketing
status: active
phase: "4-realisation"
order: 15
agents:
  - marketing-ops/automation/multi-touch-sequences
  - content-marketing/content/copywriting
  - customer-success/lifecycle/orchestrator
consumes:
  - persona
  - editorial-charter
  - automation-workflow
produces_for:
  - marketing-ops/automation/workflow-builder
  - customer-success/lifecycle/onboarding
workflows:
  - id: wf-email-sequence-design
    template: wf-creation
    phase: Conception
    name: Design séquence email
    duration: 2 jours
  - id: wf-email-sequence-copywriting
    template: wf-creation
    phase: Rédaction
    name: Rédaction des emails
    duration: 3 jours
tags:
  - marketing
  - automation
  - email
  - nurturing
  - copywriting
---

# Séquence Email / Nurturing

## Description

La séquence email est un ensemble d'emails automatisés envoyés selon un timing prédéfini pour accompagner un lead ou client dans son parcours. Elle documente chaque email avec son objectif, timing, et contenu complet.

## Cas d'Usage

- Nurturing de leads froids → chauds
- Onboarding nouveaux clients
- Séquence d'abandon panier
- Réactivation d'inactifs
- Séquence de bienvenue newsletter
- Upsell/cross-sell

## Structure du Livrable

```markdown
# Séquence Email : [Nom de la Séquence]

## Fiche d'Identité

| Attribut | Valeur |
|----------|--------|
| **Nom** | [Nom séquence] |
| **Type** | [Nurturing / Onboarding / Réactivation / ...] |
| **Nombre d'emails** | [X] |
| **Durée totale** | [X jours] |
| **Segment cible** | [Audience] |
| **Objectif** | [But final] |
| **Workflow associé** | [WF-XXX] |
| **Owner** | [Responsable] |

## Vue d'Ensemble

### Timeline de la Séquence

```
J+0     J+3     J+7     J+10    J+14    J+21
 │       │       │        │       │       │
 ▼       ▼       ▼        ▼       ▼       ▼
┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐
│ 1 │   │ 2 │   │ 3 │   │ 4 │   │ 5 │   │ 6 │
│   │   │   │   │   │   │   │   │   │   │   │
│ W │   │ V │   │ S │   │ C │   │ P │   │ F │
└───┘   └───┘   └───┘   └───┘   └───┘   └───┘
Welcome Value   Social  Case    Push    Final
        Prop    Proof   Study   Offer   CTA
```

### Résumé des Emails

| # | Nom | Timing | Objectif | CTA |
|---|-----|--------|----------|-----|
| 1 | [Welcome] | J+0 | [Objectif] | [CTA] |
| 2 | [Value] | J+3 | [Objectif] | [CTA] |
| 3 | [Social Proof] | J+7 | [Objectif] | [CTA] |
| 4 | [Case Study] | J+10 | [Objectif] | [CTA] |
| 5 | [Offer] | J+14 | [Objectif] | [CTA] |
| 6 | [Final] | J+21 | [Objectif] | [CTA] |

### KPIs Cibles

| KPI | Email 1 | Email 2 | Email 3 | ... | Séquence |
|-----|---------|---------|---------|-----|----------|
| Open Rate | >[X%] | >[X%] | >[X%] | ... | >[X%] avg |
| Click Rate | >[X%] | >[X%] | >[X%] | ... | >[X%] avg |
| Conversion | - | - | - | ... | >[X%] total |
| Unsubscribe | <[X%] | <[X%] | <[X%] | ... | <[X%] total |

---

## Email 1 : [Nom de l'Email]

### Métadonnées

| Élément | Valeur |
|---------|--------|
| **Timing** | [J+0 / Immédiat] |
| **Objectif** | [But de cet email] |
| **Métrique clé** | [Open rate / Click rate] |
| **Sender** | [Nom] <[email@domain.com]> |
| **Reply-to** | [email@domain.com] |

### Objet & Préheader

| Version | Objet | Préheader |
|---------|-------|-----------|
| **A (Control)** | "[Objet A]" | "[Préheader A]" |
| **B (Variant)** | "[Objet B]" | "[Préheader B]" |

**Règles A/B Test** : 50/50, winner après [X] envois

### Structure Email

```
┌─────────────────────────────────────────────────────────┐
│                       HEADER                             │
│                    [Logo centré]                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   [VISUAL HERO - optionnel]                             │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   Bonjour {{contact.firstname}},                        │
│                                                          │
│   [INTRO - 2-3 lignes d'accroche]                       │
│                                                          │
│   [CORPS - Message principal - 3-5 lignes]              │
│                                                          │
│   [BÉNÉFICE CLÉ - bullet points ou paragraphe]          │
│   • [Bénéfice 1]                                        │
│   • [Bénéfice 2]                                        │
│   • [Bénéfice 3]                                        │
│                                                          │
│            ┌─────────────────────────┐                  │
│            │     [BOUTON CTA]        │                  │
│            └─────────────────────────┘                  │
│                                                          │
│   [CLOSING - 1-2 lignes]                                │
│                                                          │
│   [SIGNATURE]                                           │
│   [Prénom]                                              │
│   [Titre] @ [Entreprise]                                │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                       FOOTER                             │
│   [Adresse] | [Unsubscribe] | [Preferences]             │
│   [Social icons]                                         │
└─────────────────────────────────────────────────────────┘
```

### Contenu Détaillé

**Objet** : [Objet final]

**Préheader** : [Préheader final]

---

**Corps de l'email** :

```
Bonjour {{contact.firstname | default: ""}},

[Paragraphe 1 - Accroche contextuelle liée au trigger]
Exemple : "Suite à votre inscription à notre newsletter, je voulais
personnellement vous souhaiter la bienvenue chez [Marque]."

[Paragraphe 2 - Valeur immédiate]
Exemple : "Pour bien démarrer, voici [ce que vous pouvez faire /
ce que vous allez recevoir / ce qui vous attend]."

[Liste de bénéfices ou contenu - optionnel]
• [Bénéfice 1] : [Description courte]
• [Bénéfice 2] : [Description courte]
• [Bénéfice 3] : [Description courte]

[CTA BUTTON]
[Texte du bouton]

[Paragraphe de closing]
Exemple : "Si vous avez la moindre question, répondez simplement
à cet email. Je lis personnellement chaque message."

[Signature]
[Prénom]
[Titre]

P.S. [Post-scriptum optionnel - souvent très lu]
```

### Personnalisation

| Token | Source | Fallback |
|-------|--------|----------|
| `{{contact.firstname}}` | CRM | "" (rien) |
| `{{contact.company}}` | CRM | "votre entreprise" |
| `{{custom.field}}` | [Source] | "[Default]" |

### CTA

| Élément | Valeur |
|---------|--------|
| **Texte** | "[Texte du bouton]" |
| **URL** | [URL avec UTMs] |
| **Couleur** | [Code couleur brand] |
| **Tracking** | utm_source=email&utm_medium=nurturing&utm_campaign=[nom]&utm_content=email1 |

### Conditions d'Envoi

| Condition | Valeur |
|-----------|--------|
| Jour | [Lun-Ven / Tous] |
| Heure | [10:00 timezone contact] |
| Skip si | [Conditions de skip] |

---

## Email 2 : [Nom de l'Email]

### Métadonnées

| Élément | Valeur |
|---------|--------|
| **Timing** | J+[X] après Email 1 |
| **Objectif** | [Apporter de la valeur] |
| **Sender** | [Nom] <[email]> |

### Objet & Préheader

| Version | Objet |
|---------|-------|
| **Final** | "[Objet]" |

Préheader : "[Préheader]"

### Contenu Détaillé

```
[Copie complète de l'email 2]

Bonjour {{contact.firstname}},

[Corps de l'email...]

[CTA]

[Signature]
```

### Ressource Attachée (si applicable)

| Type | Titre | URL/File |
|------|-------|----------|
| [PDF/Lien/Vidéo] | "[Titre ressource]" | [URL] |

---

## Email 3 : [Social Proof]

[Même structure...]

---

## Email 4 : [Case Study]

[Même structure...]

---

## Email 5 : [Offre]

### Métadonnées

| Élément | Valeur |
|---------|--------|
| **Timing** | J+14 |
| **Objectif** | Conversion |
| **Offre** | [Description offre] |
| **Urgence** | [Deadline si applicable] |

### Contenu avec Offre

```
Bonjour {{contact.firstname}},

[Intro rappelant la relation]

Aujourd'hui, je voulais vous faire une proposition spéciale :

┌─────────────────────────────────────────────┐
│              OFFRE EXCLUSIVE                │
│                                             │
│     [Description de l'offre]                │
│                                             │
│     [Valeur : XX€] → [Prix : YY€]          │
│                                             │
│     Valable jusqu'au [Date]                 │
└─────────────────────────────────────────────┘

[Pourquoi maintenant]

[CTA: Profiter de l'offre]

[Signature]
```

---

## Email 6 : [Dernier Email]

### Métadonnées

| Élément | Valeur |
|---------|--------|
| **Timing** | J+21 (dernier) |
| **Objectif** | Dernière chance / Soft close |
| **Ton** | [Plus direct / Urgence légère] |

### Contenu Final

```
Bonjour {{contact.firstname}},

[Rappel du parcours]

C'est mon dernier email de cette série. Je voulais simplement
m'assurer que vous aviez toutes les informations nécessaires.

[Récap des points clés / valeur]

Si [notre solution] n'est pas le bon fit pour vous en ce moment,
pas de souci – vous pouvez toujours [alternative : garder le contact,
revenir plus tard, etc.]

Mais si vous êtes prêt(e) à [action souhaitée], je suis là :

[CTA Final]

À très vite j'espère,

[Signature]

P.S. [Dernière incitation ou offre]
```

---

## Règles de la Séquence

### Conditions de Sortie

| Événement | Action |
|-----------|--------|
| Conversion (goal atteint) | Sortie immédiate |
| Unsubscribe | Sortie + tag "Unsubscribed" |
| Réponse email | Pause + alerte pour réponse manuelle |
| Entrée workflow prioritaire | Pause séquence |

### Gestion des Non-Opens

| Condition | Action |
|-----------|--------|
| Email 1 non ouvert après 3j | Relance avec nouvel objet |
| 2 emails consécutifs non ouverts | [Continuer / Pause / Skip vers fin] |
| 0 open sur toute la séquence | Tag "Non-engagé" + liste de nettoyage |

### Frequency Capping

| Règle | Valeur |
|-------|--------|
| Max emails/semaine | [X] |
| Min délai entre emails | [X jours] |
| Respect unsubscribe | Obligatoire |

## Tests & Optimisation

### A/B Tests Planifiés

| Email | Élément Testé | Variante A | Variante B |
|-------|---------------|------------|------------|
| Email 1 | Objet | "[Version A]" | "[Version B]" |
| Email 3 | CTA | "[CTA A]" | "[CTA B]" |
| Email 5 | Offre | [Sans urgence] | [Avec deadline] |

### Métriques de Suivi

| Métrique | Outil | Fréquence |
|----------|-------|-----------|
| Open rate | [MA Tool] | Par envoi |
| Click rate | [MA Tool] | Par envoi |
| Conversion rate | [MA Tool + CRM] | Hebdo |
| Revenue attribué | [CRM] | Mensuel |

## Annexes

### A. Checklist Pré-Lancement
- [ ] Tous les emails rédigés et relus
- [ ] Liens vérifiés
- [ ] Tokens testés avec fallbacks
- [ ] Mobile rendering OK
- [ ] Spam score vérifié (<5)
- [ ] A/B tests configurés
- [ ] Tracking UTMs en place
- [ ] Conditions de sortie testées

### B. Templates Visuels
[Liens vers templates HTML/designs]

### C. Assets Attachés
[Liste des ressources liées]
```

## Critères d'Acceptation

### Complétude
- [ ] Tous les emails documentés
- [ ] Objets et préheaders définis
- [ ] Contenus rédigés intégralement
- [ ] Timing spécifié
- [ ] CTAs et URLs complètes
- [ ] Personnalisation documentée
- [ ] Conditions de sortie définies

### Qualité
- [ ] Cohérence tonale avec charte éditoriale
- [ ] Valeur apportée à chaque email
- [ ] Progression logique dans la séquence
- [ ] Pas de répétition excessive

### Validation
- [ ] Relecture par Content Manager
- [ ] Validation juridique (RGPD, unsubscribe)
- [ ] Test technique OK

## Anti-Patterns

### ❌ À Éviter

1. **Emails trop longs**
   - Plus de 300 mots = pas lu
   - Un email = un message

2. **Trop de CTAs**
   - Plus d'un CTA principal = confusion
   - Focus dilué

3. **Ton trop commercial**
   - Chaque email = vente agressive
   - Détruit la relation

4. **Pas de valeur**
   - "Juste pour prendre des nouvelles"
   - Perte de temps du lecteur

### ✅ Bonnes Pratiques

1. **Un objectif par email**
2. **Valeur avant demande**
3. **Mobile-first** dans le design
4. **Personnalisation contextuelle**
5. **Test avant envoi massif**
