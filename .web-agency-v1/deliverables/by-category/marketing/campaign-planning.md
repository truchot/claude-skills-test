---
id: campaign-planning
name: Planning Campagne
version: 1.0.0
category: marketing
status: active
phase: "3-conception"
order: 11
agents:
  - marketing-ops/campagnes/planning-campagne
  - marketing-ops/campagnes/orchestrator
  - marketing-ops/campagnes/coordination-canaux
consumes:
  - marketing-objectives
  - persona
  - content-calendar
produces_for:
  - marketing-ops/campagnes/budget-allocation
  - marketing-ops/campagnes/suivi-performance
  - content-marketing/content/orchestrator
workflows:
  - id: wf-campaign-planning
    template: wf-planning
    phase: Planning
    name: Planification campagne
    duration: 3 jours
tags:
  - marketing
  - campagnes
  - planning
  - coordination
---

# Planning Campagne

## Description

Le planning campagne définit la stratégie, le calendrier et les ressources nécessaires pour une campagne marketing. Il coordonne tous les canaux et assure l'alignement des équipes sur les objectifs.

## Cas d'Usage

- Lancement de produit/service
- Campagne promotionnelle (Black Friday, soldes...)
- Campagne de notoriété
- Campagne de génération de leads
- Événement/webinar

## Structure du Livrable

```markdown
# Planning Campagne : [Nom de la Campagne]

## Fiche d'Identité

| Attribut | Valeur |
|----------|--------|
| **Nom** | [Nom campagne] |
| **Type** | [Acquisition / Notoriété / Conversion / Fidélisation] |
| **Période** | [Date début] → [Date fin] |
| **Budget total** | [X €] |
| **Responsable** | [Nom] |
| **Status** | [Draft / Validé / En cours / Terminé] |

## 1. Contexte & Objectifs

### Contexte
> [Pourquoi cette campagne ? Quel est le contexte business/marché ?]

### Objectif Principal
> [Un objectif clair et mesurable]

### Objectifs SMART

| Objectif | Spécifique | Mesurable | Cible | Deadline |
|----------|------------|-----------|-------|----------|
| [Objectif 1] | ✅ | [KPI] | [Valeur] | [Date] |
| [Objectif 2] | ✅ | [KPI] | [Valeur] | [Date] |
| [Objectif 3] | ✅ | [KPI] | [Valeur] | [Date] |

### KPIs de Succès

| KPI | Baseline | Objectif | Stretch Goal |
|-----|----------|----------|--------------|
| [KPI 1] | [Actuel] | [Cible] | [Ambitieux] |
| [KPI 2] | [Actuel] | [Cible] | [Ambitieux] |
| [KPI 3] | [Actuel] | [Cible] | [Ambitieux] |

## 2. Cible & Segmentation

### Audience Cible

| Segment | Description | Taille | Priorité |
|---------|-------------|--------|----------|
| [Segment 1] | [Description] | [X K] | 🥇 |
| [Segment 2] | [Description] | [X K] | 🥈 |
| [Segment 3] | [Description] | [X K] | 🥉 |

### Persona Principal
- **Nom** : [Persona]
- **Pain point adressé** : [Problème résolu]
- **Message clé** : "[Message adapté]"

### Critères de Ciblage

| Canal | Critères |
|-------|----------|
| Facebook/Instagram Ads | [Intérêts, âge, comportements...] |
| LinkedIn Ads | [Fonction, entreprise, secteur...] |
| Google Ads | [Keywords, audiences...] |
| Email | [Segments CRM...] |

## 3. Stratégie Créative

### Concept Créatif
> [Description du concept créatif central]

### Message Principal
> "[Headline / Accroche principale]"

### Messages Secondaires
1. "[Message 1]"
2. "[Message 2]"
3. "[Message 3]"

### Proposition de Valeur
> [Ce que l'audience obtient / pourquoi agir maintenant]

### Call-to-Action
- **CTA Principal** : "[Texte CTA]"
- **CTA Secondaire** : "[Texte CTA]"

### Offre / Incentive
| Élément | Description |
|---------|-------------|
| **Offre** | [Réduction / Cadeau / Exclusivité] |
| **Validité** | [Période] |
| **Code promo** | [Code] |
| **Conditions** | [Restrictions] |

## 4. Mix Canaux

### Vue d'Ensemble Canaux

```
┌─────────────────────────────────────────────────────────────────┐
│                     MIX CANAUX CAMPAGNE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PAID                    OWNED                   EARNED        │
│  ─────                   ─────                   ──────        │
│  □ Google Ads            □ Email                 □ PR          │
│  □ Facebook Ads          □ Site web              □ Influenceurs│
│  □ LinkedIn Ads          □ Blog                  □ UGC         │
│  □ Display               □ Social organique      □ Partenariats│
│                          □ Push notifications                  │
│                                                                 │
│  Budget: [X%]            Budget: [X%]            Budget: [X%]  │
└─────────────────────────────────────────────────────────────────┘
```

### Détail par Canal

#### Paid Media

| Canal | Budget | Objectif | KPI | Responsable |
|-------|--------|----------|-----|-------------|
| Google Ads (Search) | [X €] | [Conversion] | [CPA: X€] | [Nom] |
| Google Ads (Display) | [X €] | [Notoriété] | [CPM: X€] | [Nom] |
| Facebook/IG Ads | [X €] | [Leads] | [CPL: X€] | [Nom] |
| LinkedIn Ads | [X €] | [Leads B2B] | [CPL: X€] | [Nom] |
| **Total Paid** | **[X €]** | - | - | - |

#### Owned Media

| Canal | Actions | Fréquence | Responsable |
|-------|---------|-----------|-------------|
| Email | [X emails] | [Séquence] | [Nom] |
| Site web | [Landing page] | - | [Nom] |
| Blog | [X articles] | [Dates] | [Nom] |
| Social organique | [X posts] | [X/semaine] | [Nom] |

#### Earned Media

| Canal | Actions | Objectif | Responsable |
|-------|---------|----------|-------------|
| PR | [X communiqués] | [X mentions] | [Nom] |
| Influenceurs | [X partenariats] | [X reach] | [Nom] |
| UGC | [Incentive UGC] | [X contenus] | [Nom] |

## 5. Assets Créatifs

### Liste des Assets

| Asset | Format | Canal | Status | Owner | Deadline |
|-------|--------|-------|--------|-------|----------|
| Vidéo hero | 16:9, 1:1, 9:16 | All | 🔴 | [Nom] | [Date] |
| Bannières display | IAB standards | Google | 🔴 | [Nom] | [Date] |
| Visuels social | 1080×1080 | FB/IG | 🔴 | [Nom] | [Date] |
| Landing page | Responsive | Web | 🔴 | [Nom] | [Date] |
| Email template | Responsive | Email | 🔴 | [Nom] | [Date] |
| Carrousel | 1080×1080 ×5 | IG/LinkedIn | 🔴 | [Nom] | [Date] |

### Spécifications Techniques

| Canal | Format | Dimensions | Poids Max | Durée |
|-------|--------|------------|-----------|-------|
| Facebook Feed | Image | 1200×628 | 30MB | - |
| Facebook Feed | Vidéo | 1:1 ou 4:5 | 4GB | 15-60s |
| Instagram Stories | Image/Vidéo | 1080×1920 | 30MB | 15s |
| LinkedIn | Image | 1200×627 | 5MB | - |
| Google Display | Image | IAB | 150KB | - |

### Versions / Déclinaisons

| Version | Audience | Message | A/B Test |
|---------|----------|---------|----------|
| V1 - Bénéfice A | [Segment 1] | "[Message]" | Control |
| V2 - Bénéfice B | [Segment 1] | "[Message]" | Variant A |
| V3 - Urgence | [Segment 2] | "[Message]" | - |

## 6. Calendrier

### Timeline Globale

```
SEMAINE       S-4        S-3        S-2        S-1        LIVE       S+1        S+2
              │          │          │          │          │          │          │
PRÉPA         ████████████████████████
              Brief      Création   Review     Validation

SETUP                               ████████████
                                    Tracking   Campagnes

LIVE                                                      ████████████████████████
                                                          Phase 1    Phase 2    Fin

ANALYSE                                                   ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
                                                          Monitoring  Report
```

### Planning Détaillé

| Date | Phase | Actions | Responsable | Livrables |
|------|-------|---------|-------------|-----------|
| [J-28] | Brief | Kickoff meeting | PM | Brief validé |
| [J-21] | Création | Production assets | Créa | V1 assets |
| [J-14] | Review | Validation créas | Marketing | Assets finaux |
| [J-7] | Setup | Configuration campagnes | Ads | Campagnes prêtes |
| [J-3] | Test | QA tracking | Data | Tracking OK |
| [J-0] | Launch | Go live | All | Campagne live |
| [J+7] | Optim | Premiers ajustements | Ads | Report S1 |
| [J+14] | Review | Bilan mi-parcours | PM | Ajustements |
| [J+30] | Clôture | Fin campagne | All | Report final |

### Phases de la Campagne

| Phase | Période | Objectif | Budget |
|-------|---------|----------|--------|
| **Teasing** | [Dates] | Créer l'attente | [X%] |
| **Lancement** | [Dates] | Impact maximum | [X%] |
| **Maintien** | [Dates] | Conversion | [X%] |
| **Dernière chance** | [Dates] | Urgence | [X%] |

## 7. Budget

### Répartition Budget

| Poste | Budget | % Total |
|-------|--------|---------|
| Paid Media | [X €] | [X%] |
| Création | [X €] | [X%] |
| Outils | [X €] | [X%] |
| Influenceurs | [X €] | [X%] |
| Contingence | [X €] | [X%] |
| **Total** | **[X €]** | **100%** |

### Budget Paid par Période

| Semaine | Google | Facebook | LinkedIn | Total |
|---------|--------|----------|----------|-------|
| S1 | [X €] | [X €] | [X €] | [X €] |
| S2 | [X €] | [X €] | [X €] | [X €] |
| S3 | [X €] | [X €] | [X €] | [X €] |
| S4 | [X €] | [X €] | [X €] | [X €] |
| **Total** | **[X €]** | **[X €]** | **[X €]** | **[X €]** |

### ROI Prévisionnel

| Scénario | Investissement | Résultats | ROI |
|----------|----------------|-----------|-----|
| Pessimiste | [X €] | [Y conversions] | [Z:1] |
| Réaliste | [X €] | [Y conversions] | [Z:1] |
| Optimiste | [X €] | [Y conversions] | [Z:1] |

## 8. Tracking & Mesure

### Plan de Taggage

| Action | Event Name | Paramètres | Destination |
|--------|------------|------------|-------------|
| Vue landing page | page_view | page_title, source | GA4 |
| Clic CTA | cta_click | cta_name, location | GA4 |
| Form submit | generate_lead | form_name, source | GA4 + CRM |
| Conversion | purchase | value, items | GA4 + Pixel |

### UTM Convention

```
utm_source: [google|facebook|linkedin|email]
utm_medium: [cpc|paid-social|email|organic]
utm_campaign: [nom-campagne-2024]
utm_content: [variante-creative]
utm_term: [keyword] (pour search)
```

### Dashboards

| Dashboard | Outil | Accès | Fréquence MAJ |
|-----------|-------|-------|---------------|
| Performance Ads | [Looker Studio] | [Lien] | Temps réel |
| Conversions | [GA4] | [Lien] | Temps réel |
| Budget tracking | [Sheet] | [Lien] | Quotidien |

## 9. Équipe & Responsabilités

### RACI

| Tâche | Marketing | Créa | Ads | Dev | Data |
|-------|-----------|------|-----|-----|------|
| Brief campagne | R | C | C | I | I |
| Création assets | A | R | C | - | - |
| Setup campagnes | A | - | R | - | C |
| Landing page | C | C | - | R | C |
| Tracking | C | - | C | C | R |
| Optimisation | A | - | R | - | C |
| Reporting | R | - | C | - | C |

*R = Responsible, A = Accountable, C = Consulted, I = Informed*

### Points de Sync

| Meeting | Fréquence | Participants | Objectif |
|---------|-----------|--------------|----------|
| Daily standup | Quotidien | Ads, Marketing | Status rapide |
| Weekly review | Hebdo | Équipe campagne | Performance & ajustements |
| Bilan final | Fin campagne | All + Direction | Learnings |

## 10. Risques & Contingence

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Performance sous objectifs | Moyenne | Élevé | Budget réserve +20% |
| Retard créatif | Moyenne | Moyen | Buffer de 3 jours |
| Problème technique | Faible | Élevé | Plan B landing page |
| Saturation audience | Moyenne | Moyen | Audiences alternatives |
| Événement externe | Faible | Élevé | Plan de crise |

## Annexes

### A. Brief Créatif
[Lien vers brief créatif détaillé]

### B. Maquettes Landing Page
[Lien vers maquettes]

### C. Scripts Vidéo
[Lien vers scripts]
```

## Critères d'Acceptation

### Complétude
- [ ] Objectifs SMART définis
- [ ] Tous les canaux détaillés
- [ ] Budget réparti
- [ ] Calendrier établi
- [ ] Tracking planifié
- [ ] Équipe et RACI définis

### Qualité
- [ ] Objectifs réalistes
- [ ] Budget cohérent avec objectifs
- [ ] Timeline réalisable
- [ ] Assets listés et assignés

### Validation
- [ ] Validé par Marketing Director
- [ ] Budget approuvé
- [ ] Équipe confirmée

## Anti-Patterns

### ❌ À Éviter

1. **Pas d'objectifs mesurables**
   - "Augmenter la notoriété"
   - Sans KPI précis

2. **Calendrier irréaliste**
   - Lancement dans 3 jours
   - Sans création validée

3. **Budget flou**
   - "On verra au fur et à mesure"
   - Pas de répartition claire

4. **Silos entre canaux**
   - Chaque canal fait son plan
   - Pas de cohérence globale

### ✅ Bonnes Pratiques

1. **Un concept créatif décliné** sur tous les canaux
2. **Buffer temps et budget** pour imprévus
3. **Tracking validé avant lancement**
4. **Points de décision** pour pivot si nécessaire
