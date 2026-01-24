---
id: automation-workflow
name: Workflow d'Automation
version: 1.0.0
category: marketing
status: active
phase: "4-realisation"
order: 13
agents:
  - marketing-ops/automation/workflow-builder
  - marketing-ops/automation/triggers-actions
  - marketing-ops/automation/multi-touch-sequences
consumes:
  - persona
  - marketing-objectives
  - lead-scoring-model
produces_for:
  - marketing-ops/automation/orchestrator
  - customer-success/lifecycle/orchestrator
workflows:
  - id: wf-automation-design
    template: wf-creation
    phase: Conception
    name: Design workflow automation
    duration: 2 jours
  - id: wf-automation-implementation
    template: wf-implementation
    phase: Implémentation
    name: Implémentation dans le MA tool
    duration: 3 jours
tags:
  - marketing
  - automation
  - workflow
  - nurturing
  - crm
---

# Workflow d'Automation

## Description

Le workflow d'automation définit une séquence automatisée d'actions marketing déclenchées par des comportements ou événements. Il orchestre les communications multi-canaux pour guider les prospects/clients dans leur parcours.

## Cas d'Usage

- Nurturing de leads
- Onboarding clients
- Réactivation inactifs
- Abandon panier
- Upsell/Cross-sell
- Anniversaire/Fidélisation

## Structure du Livrable

```markdown
# Workflow : [Nom du Workflow]

## Fiche d'Identité

| Attribut | Valeur |
|----------|--------|
| **Nom** | [Nom workflow] |
| **ID** | [WF-XXX] |
| **Type** | [Nurturing / Onboarding / Réactivation / ...] |
| **Objectif** | [Objectif principal] |
| **Segment cible** | [Audience] |
| **Status** | [Draft / Test / Actif / Pausé] |
| **Owner** | [Responsable] |
| **Outil MA** | [HubSpot / Brevo / ActiveCampaign / ...] |

## 1. Objectifs & KPIs

### Objectif du Workflow
> [Description de l'objectif en une phrase]

### KPIs de Succès

| KPI | Baseline | Objectif | Fréquence Mesure |
|-----|----------|----------|------------------|
| Taux d'entrée | - | [X%] | Hebdo |
| Taux d'ouverture moyen | [X%] | [Y%] | Par envoi |
| Taux de clic moyen | [X%] | [Y%] | Par envoi |
| Taux de conversion workflow | - | [X%] | Mensuel |
| Taux de désabonnement | [X%] | <[Y%] | Par envoi |
| Durée moyenne dans workflow | - | [X jours] | Mensuel |

### Goal Tracking

| Goal | Définition | Action Post-Goal |
|------|------------|------------------|
| [Goal principal] | [Critère de completion] | [Sortie / Autre workflow] |
| [Goal secondaire] | [Critère alternatif] | [Action] |

## 2. Trigger & Entrée

### Condition de Déclenchement

```
┌─────────────────────────────────────────────────────────────┐
│                     TRIGGER                                  │
│                                                             │
│  QUAND: [Événement/Action]                                  │
│                                                             │
│  Exemples:                                                  │
│  • Contact créé avec source = "[Source]"                   │
│  • Formulaire "[Form]" soumis                              │
│  • Score lead ≥ [X]                                        │
│  • Propriété "[Prop]" = "[Valeur]"                         │
│  • Tag "[Tag]" ajouté                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Critères d'Entrée

| Critère | Type | Valeur | Obligatoire |
|---------|------|--------|-------------|
| [Critère 1] | [Inclusion] | [Condition] | ✅ |
| [Critère 2] | [Inclusion] | [Condition] | ✅ |
| [Critère 3] | [Exclusion] | [Condition] | ✅ |

### Filtre d'Exclusion

Les contacts suivants ne peuvent PAS entrer :
- [ ] Déjà dans ce workflow
- [ ] Dans workflow "[Autre workflow]"
- [ ] Status = "[Status exclus]"
- [ ] Unsubscribed = true
- [ ] [Autre condition]

### Re-enrollment

| Paramètre | Valeur |
|-----------|--------|
| Autoriser ré-inscription | [Oui/Non] |
| Délai minimum | [X jours] |
| Conditions de ré-inscription | [Conditions] |

## 3. Diagramme du Workflow

```
┌──────────────────────────────────────────────────────────────────────┐
│                         WORKFLOW DIAGRAM                              │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  [TRIGGER]                                                           │
│      │                                                               │
│      ▼                                                               │
│  ┌────────────┐                                                      │
│  │  Email 1   │  ← Immédiat                                         │
│  │ "Welcome"  │                                                      │
│  └─────┬──────┘                                                      │
│        │                                                             │
│        ▼                                                             │
│  ⏱️ Délai: 3 jours                                                   │
│        │                                                             │
│        ▼                                                             │
│  ┌────────────┐     ┌─────────────────┐                             │
│  │ Condition  │─Yes─▶│    GOAL ✓      │                             │
│  │ Goal atteint?│    │ Sortie workflow │                             │
│  └─────┬──────┘     └─────────────────┘                             │
│        │No                                                           │
│        ▼                                                             │
│  ┌────────────┐                                                      │
│  │  Email 2   │  ← J+3                                              │
│  │"Follow-up" │                                                      │
│  └─────┬──────┘                                                      │
│        │                                                             │
│        ▼                                                             │
│  ⏱️ Délai: 4 jours                                                   │
│        │                                                             │
│        ▼                                                             │
│  ┌────────────┐     ┌─────────────┐    ┌─────────────┐             │
│  │ Condition  │─A──▶│  Email 3A   │    │  Email 3B   │◀─B─┐        │
│  │ Segment?   │─B──▶│ "Offre Pro" │    │ "Offre Std" │    │        │
│  └────────────┘     └──────┬──────┘    └──────┬──────┘    │        │
│                            │                  │           │        │
│                            ▼                  ▼           │        │
│                      ┌─────────────────────────┐                   │
│                      │     Email Final         │  ← J+10           │
│                      │   "Dernière chance"     │                   │
│                      └──────────┬──────────────┘                   │
│                                 │                                   │
│                                 ▼                                   │
│                      ┌─────────────────────────┐                   │
│                      │        FIN              │                   │
│                      │ → Update properties     │                   │
│                      │ → Add to list "Nurturé" │                   │
│                      └─────────────────────────┘                   │
│                                                                     │
└──────────────────────────────────────────────────────────────────────┘
```

## 4. Étapes Détaillées

### Étape 1 : [Nom Étape]

| Attribut | Valeur |
|----------|--------|
| **Type** | [Email / SMS / Task / Wait / Condition / ...] |
| **Timing** | [Immédiat / Délai X jours / Date spécifique] |
| **Objectif** | [But de cette étape] |

#### Si Email

| Élément | Valeur |
|---------|--------|
| **Template** | [Nom template] |
| **Objet** | "[Objet email]" |
| **Préheader** | "[Préheader]" |
| **CTA** | "[Texte CTA]" → [URL] |
| **Sender** | [Nom] <[email]> |

#### Personnalisation

| Token | Valeur par défaut |
|-------|-------------------|
| {{contact.firstname}} | "Bonjour" |
| {{company.name}} | "votre entreprise" |
| [Autre token] | [Default] |

---

### Étape 2 : [Nom Étape]
[Même structure]

---

### Étape 3 : Condition / Branch

| Branche | Condition | Action |
|---------|-----------|--------|
| **Branche A** | [Si condition A] | [Aller à étape X] |
| **Branche B** | [Si condition B] | [Aller à étape Y] |
| **Default** | [Sinon] | [Aller à étape Z] |

---

### Étape N : Actions de Sortie

| Action | Valeur |
|--------|--------|
| Update Property | [Propriété] = "[Valeur]" |
| Add to List | "[Nom liste]" |
| Remove from List | "[Nom liste]" |
| Add Tag | "[Tag]" |
| Create Task | [Type task] assignée à [User] |
| Enroll in Workflow | "[Autre workflow]" |
| Send Notification | [Destinataire interne] |

## 5. Contenu des Emails

### Email 1 : [Nom Email]

**Objectif** : [But de cet email]

| Élément | Valeur |
|---------|--------|
| Objet | "[Objet A/B testé]" |
| Objet B (test) | "[Variante B]" |
| Préheader | "[Préheader]" |

**Structure** :
```
┌─────────────────────────────────────┐
│           HEADER/LOGO               │
├─────────────────────────────────────┤
│                                     │
│   Bonjour {{firstname}},            │
│                                     │
│   [Intro - 2-3 lignes accroche]     │
│                                     │
│   [Corps - Message principal]       │
│                                     │
│   [Bénéfice clé]                    │
│                                     │
│      ┌─────────────────┐            │
│      │     [CTA]       │            │
│      └─────────────────┘            │
│                                     │
│   [Signature]                       │
│                                     │
├─────────────────────────────────────┤
│           FOOTER                    │
│   Unsubscribe | Préférences         │
└─────────────────────────────────────┘
```

**Copy détaillé** :
```
Objet: [Objet]
Préheader: [Préheader]

---

Bonjour {{contact.firstname | default:""}},

[Paragraphe 1 - Accroche/Contexte]

[Paragraphe 2 - Valeur/Bénéfice]

[Paragraphe 3 - Preuve/Social proof - optionnel]

[CTA BUTTON: "Texte du CTA"]

[Signature]
[Nom]
[Titre]
```

---

### Email 2 : [Nom Email]
[Même structure]

## 6. Logique de Timing

### Calendrier d'Envoi

| Étape | Jour | Heure | Jours autorisés |
|-------|------|-------|-----------------|
| Email 1 | J+0 | Immédiat | Tous |
| Email 2 | J+3 | 10:00 | Lun-Ven |
| Email 3 | J+7 | 10:00 | Lun-Ven |
| Email 4 | J+10 | 14:00 | Lun-Ven |

### Règles de Timing

| Règle | Configuration |
|-------|---------------|
| Fuseau horaire | [Europe/Paris / Contact timezone] |
| Heures d'envoi | [9h-18h] |
| Jours d'envoi | [Lun-Ven / Tous les jours] |
| Respect vacances | [Oui/Non] - Liste: [Liste jours fériés] |
| Frequency cap | Max [X] emails par [Période] |

### Gestion Conflits

| Conflit | Règle |
|---------|-------|
| Contact dans autre workflow | [Priority: ce workflow / autre] |
| Email promotionnel prévu | [Délai de X jours] |
| Contact a reçu email récent | [Skip si < X jours] |

## 7. Tests & Validation

### Checklist Pré-Lancement

#### Contenu
- [ ] Tous les emails relus et validés
- [ ] Liens testés et fonctionnels
- [ ] Tokens de personnalisation vérifiés
- [ ] Fallback defaults configurés
- [ ] Mobile responsive vérifié
- [ ] Spam check passé

#### Logique
- [ ] Conditions de trigger testées
- [ ] Branches conditionnelles vérifiées
- [ ] Timing conforme aux règles
- [ ] Exclusions fonctionnelles
- [ ] Goals trackés correctement
- [ ] Actions de sortie vérifiées

#### Intégrations
- [ ] Sync CRM fonctionnel
- [ ] Properties mises à jour correctement
- [ ] Notifications internes OK
- [ ] Analytics configurés

### Scénarios de Test

| Scénario | Contact Test | Résultat Attendu | ✓ |
|----------|--------------|------------------|---|
| Parcours nominal | [Email test 1] | [Description] | [ ] |
| Branche A | [Email test 2] | [Description] | [ ] |
| Branche B | [Email test 3] | [Description] | [ ] |
| Goal atteint tôt | [Email test 4] | Sortie immédiate | [ ] |
| Exclusion | [Email exclu] | Non inscrit | [ ] |

## 8. Monitoring & Optimisation

### Métriques à Suivre

| Métrique | Fréquence | Alerte Si |
|----------|-----------|-----------|
| Inscriptions/jour | Quotidien | <[X] ou >[Y] |
| Taux ouverture | Par email | <[X%] |
| Taux clic | Par email | <[X%] |
| Taux désabo | Par email | >[X%] |
| Taux conversion | Hebdo | <[X%] |
| Contacts bloqués | Quotidien | >[X] |

### Plan d'Optimisation

| Test Prévu | Hypothèse | Timing |
|------------|-----------|--------|
| A/B Objet Email 1 | [Hypothèse] | Semaine [X] |
| Timing Email 2 | [Hypothèse] | Semaine [X] |
| CTA Email 3 | [Hypothèse] | Semaine [X] |

### Review Schedule

| Review | Fréquence | Actions |
|--------|-----------|---------|
| Performance check | Hebdo | Ajustements mineurs |
| Content refresh | Mensuel | MAJ contenus si besoin |
| Full review | Trimestriel | Refonte si nécessaire |

## Annexes

### A. Templates Emails
[Liens vers templates]

### B. Documentation Technique
[Setup dans l'outil MA]

### C. Matrice de Personnalisation
[Tableau complet des tokens]
```

## Critères d'Acceptation

### Complétude
- [ ] Trigger et conditions d'entrée définis
- [ ] Toutes les étapes documentées
- [ ] Contenus emails rédigés
- [ ] Timing configuré
- [ ] Tests planifiés
- [ ] KPIs définis

### Qualité
- [ ] Parcours logique et cohérent
- [ ] Personnalisation pertinente
- [ ] Timing respectueux (pas de spam)
- [ ] Conditions de sortie claires

### Validation
- [ ] Validé par Marketing Automation Manager
- [ ] Contenus approuvés
- [ ] Tests passés avec succès

## Anti-Patterns

### ❌ À Éviter

1. **Workflow trop long**
   - Plus de 10 emails
   - Fatigue de l'audience

2. **Pas de sortie**
   - Contact bloqué indéfiniment
   - Pas de goal tracking

3. **Timing agressif**
   - Email tous les jours
   - Ignore la fatigue

4. **One-size-fits-all**
   - Pas de segmentation
   - Même message pour tous

### ✅ Bonnes Pratiques

1. **Un objectif clair** par workflow
2. **Sortie dès le goal atteint**
3. **Espacement minimum 2-3 jours** entre emails
4. **Personnalisation contextuelle**
5. **Test avant mise en prod**
