---
id: lead-scoring-model
name: Modèle de Lead Scoring
version: 1.0.0
category: marketing
status: active
phase: "3-conception"
order: 14
agents:
  - marketing-ops/automation/lead-scoring
  - marketing-ops/performance/funnel-analysis
  - marketing-analytics/orchestrator
consumes:
  - persona
  - marketing-objectives
produces_for:
  - marketing-ops/automation/workflow-builder
  - marketing-ops/campagnes/orchestrator
workflows:
  - id: wf-lead-scoring-design
    template: wf-strategy
    phase: Strategy
    name: Design modèle lead scoring
    duration: 2 jours
  - id: wf-lead-scoring-calibration
    template: wf-validation
    phase: Calibration
    name: Calibration et validation
    duration: 1 jour
tags:
  - marketing
  - automation
  - scoring
  - leads
  - sales
---

# Modèle de Lead Scoring

## Description

Le modèle de lead scoring attribue des points aux leads basés sur leurs caractéristiques (fit) et comportements (engagement) pour prioriser les plus qualifiés et déclencher des actions automatisées.

## Cas d'Usage

- Priorisation des leads pour les commerciaux
- Déclenchement de workflows d'automation
- Segmentation de l'audience
- Qualification MQL → SQL
- Optimisation du cycle de vente

## Structure du Livrable

```markdown
# Modèle de Lead Scoring : [Projet/Entreprise]

## Vue d'Ensemble

### Philosophie du Modèle

```
┌─────────────────────────────────────────────────────────────────┐
│                    LEAD SCORING MODEL                           │
│                                                                 │
│                      SCORE TOTAL                                │
│                     ┌─────────┐                                 │
│                     │ 0-100   │                                 │
│                     └────┬────┘                                 │
│                          │                                      │
│              ┌───────────┴───────────┐                          │
│              │                       │                          │
│        ┌─────┴─────┐           ┌─────┴─────┐                   │
│        │   FIT     │           │ENGAGEMENT │                   │
│        │  SCORE    │           │  SCORE    │                   │
│        │  0-50     │           │   0-50    │                   │
│        └───────────┘           └───────────┘                   │
│                                                                 │
│     Qui est le lead?         Que fait le lead?                │
│     (Démographique)          (Comportemental)                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Seuils de Qualification

| Niveau | Score | Label | Action |
|--------|-------|-------|--------|
| 🔴 Froid | 0-25 | Cold Lead | Nurturing automatique |
| 🟡 Tiède | 26-50 | Warm Lead | Nurturing ciblé |
| 🟠 Chaud | 51-75 | Hot Lead / MQL | Transmission SDR |
| 🟢 Très Chaud | 76-100 | SQL | Contact commercial prioritaire |

### Définitions

| Terme | Définition |
|-------|------------|
| **Lead** | Contact ayant manifesté un intérêt |
| **MQL** | Marketing Qualified Lead - Score ≥ [X] |
| **SQL** | Sales Qualified Lead - MQL validé par Sales |
| **SAL** | Sales Accepted Lead - SQL accepté pour opportunité |

## 1. Scoring Fit (Profil)

### Critères Démographiques

#### Taille d'Entreprise

| Taille | Points | Justification |
|--------|--------|---------------|
| 1-10 employés | +5 | [Explication] |
| 11-50 employés | +10 | [Explication] |
| 51-200 employés | +15 | Sweet spot |
| 201-1000 employés | +20 | Idéal |
| 1000+ employés | +15 | Grand compte, cycle long |
| Non renseigné | 0 | - |

#### Secteur d'Activité

| Secteur | Points | Justification |
|---------|--------|---------------|
| [Secteur cible 1] | +15 | ICP parfait |
| [Secteur cible 2] | +10 | Bon fit |
| [Secteur secondaire] | +5 | Fit acceptable |
| [Secteur hors cible] | -5 | Hors ICP |
| Autre/Non renseigné | 0 | Neutre |

#### Fonction / Poste

| Fonction | Points | Justification |
|----------|--------|---------------|
| C-Level (CEO, CTO, CMO) | +20 | Décideur |
| Director/Head of | +15 | Influenceur fort |
| Manager | +10 | Utilisateur clé |
| Individual Contributor | +5 | Utilisateur |
| Étudiant/Stagiaire | -10 | Non qualifié |
| Non renseigné | 0 | - |

#### Localisation

| Zone | Points | Justification |
|------|--------|---------------|
| [Zone cible 1] | +10 | Marché principal |
| [Zone cible 2] | +5 | Marché secondaire |
| [Hors zone] | -5 | Hors couverture |

#### Budget Déclaré

| Budget | Points |
|--------|--------|
| >[X €] | +15 |
| [Y-X €] | +10 |
| <[Y €] | +5 |
| Non renseigné | 0 |

### Scoring Fit - Résumé

| Catégorie | Max Points |
|-----------|------------|
| Taille entreprise | 20 |
| Secteur | 15 |
| Fonction | 20 |
| Localisation | 10 |
| Budget | 15 |
| **Total Fit Max** | **50** (plafonné) |

## 2. Scoring Engagement (Comportement)

### Activité Website

| Action | Points | Decay | Notes |
|--------|--------|-------|-------|
| Visite site | +1 | 30j | Max 5/jour |
| Page pricing visitée | +10 | 30j | Signal fort |
| Page produit visitée | +5 | 30j | Max 3× |
| Blog article lu | +2 | 60j | Max 10 |
| Page carrières | -10 | 90j | Hors cible |
| 3+ pages en 1 session | +5 | 30j | Engagement |
| Temps sur site >3min | +3 | 30j | - |

### Activité Email

| Action | Points | Decay | Notes |
|--------|--------|-------|-------|
| Email ouvert | +1 | 30j | - |
| Email cliqué | +3 | 30j | - |
| Email répondu | +10 | 60j | Signal très fort |
| Unsubscribe | -20 | Permanent | Disqualifiant |
| Hard bounce | -50 | Permanent | Contact invalide |

### Activité Formulaires

| Action | Points | Decay | Notes |
|--------|--------|-------|-------|
| Newsletter signup | +5 | 90j | - |
| Téléchargement content | +10 | 60j | - |
| Demande de démo | +30 | 30j | Signal très fort |
| Demande de contact | +25 | 30j | Signal fort |
| Demande de devis | +35 | 30j | Intention maximale |
| Inscription webinar | +15 | 60j | - |
| Participation webinar | +20 | 60j | - |

### Activité Sociale

| Action | Points | Decay | Notes |
|--------|--------|-------|-------|
| Follow sur LinkedIn | +3 | 90j | - |
| Like/Comment post | +2 | 60j | - |
| Share de contenu | +5 | 60j | - |

### Activité Produit (si freemium/trial)

| Action | Points | Decay | Notes |
|--------|--------|-------|-------|
| Création compte trial | +20 | 30j | - |
| Login trial | +5 | 14j | Max 1/jour |
| Feature X utilisée | +10 | 30j | Feature clé |
| Invite teammates | +15 | 30j | Signal adoption |
| Limite usage atteinte | +20 | 14j | Ready to buy |

### Scoring Engagement - Résumé

| Catégorie | Max Points |
|-----------|------------|
| Website | 25 |
| Email | 15 |
| Formulaires | 35 |
| Social | 10 |
| Produit | 30 |
| **Total Engagement** | **50** (plafonné) |

## 3. Score Decay (Dégradation)

### Règles de Decay

| Condition | Decay | Fréquence |
|-----------|-------|-----------|
| Aucune activité 14 jours | -5 | Une fois |
| Aucune activité 30 jours | -10 | Une fois |
| Aucune activité 60 jours | -20 | Une fois |
| Aucune activité 90 jours | -30 | Une fois |
| Email bounce | -50 | Immédiat |

### Score Minimum

| Condition | Score Minimum |
|-----------|---------------|
| Contact valide | 0 |
| Unsubscribed | Score gelé à 0 |
| Bounced | Score gelé à 0 |

## 4. Scoring Négatif

### Actions Disqualifiantes

| Action | Points | Effet |
|--------|--------|-------|
| Page carrières | -10 | Probable candidat |
| Email perso (gmail, etc.) | -5 | Moins qualifié B2B |
| Concurrent identifié | -50 | Exclu |
| Unsubscribe | -20 | Désengagé |
| Marked as spam | -100 | Blocklist |
| Employé | -100 | Exclu |

### Propriétés Disqualifiantes

| Propriété | Valeur | Action |
|-----------|--------|--------|
| Lead Status | "Disqualified" | Score = 0, frozen |
| Company Type | "Competitor" | Score = 0, frozen |
| Email Domain | @[notre-domaine] | Exclu |

## 5. Actions Automatiques

### Par Seuil de Score

| Seuil | Action Automatique |
|-------|-------------------|
| Score ≥ 25 | Entrée workflow nurturing "Warm" |
| Score ≥ 50 | Notification Slack #leads |
| Score ≥ 60 | Création tâche SDR |
| Score ≥ 75 | Assignation commercial + alerte |
| Score ≥ 90 | Alerte urgente + call immédiat |

### Par Changement de Score

| Trigger | Action |
|---------|--------|
| Score +20 en 7 jours | Alerte "Lead en accélération" |
| Score -30 en 30 jours | Workflow "Réactivation" |
| MQL → SQL | MAJ Lifecycle Stage |

### Par Comportement Spécifique

| Comportement | Action Immédiate |
|--------------|------------------|
| Demande de démo | Création task prioritaire |
| Visite pricing 3× | Notification sales |
| Inscription webinar | Ajout séquence pré-event |

## 6. Matrice Fit × Engagement

```
                        ENGAGEMENT SCORE
                    Low (0-25)    High (26-50)
                ┌─────────────┬─────────────────┐
         High   │   NURTURE   │     MQL ✓       │
    F   (26-50) │  Bon profil │  Prêt pour      │
    I           │  Pas actif  │  les sales      │
    T           ├─────────────┼─────────────────┤
                │   DISCARD   │    NURTURE      │
    S    Low    │   ou        │  Actif mais     │
    C   (0-25)  │   Long-term │  mauvais fit    │
    O           │   nurture   │                 │
    R           └─────────────┴─────────────────┘
    E

Actions par quadrant:
- High Fit + High Engagement = QUALIFIER IMMÉDIAT
- High Fit + Low Engagement = NURTURING PERSONNALISÉ
- Low Fit + High Engagement = ÉVALUER OU LONG-TERM
- Low Fit + Low Engagement = DÉPRIORITISER
```

## 7. Calibration & Validation

### Méthode de Calibration

1. **Analyse historique** : Étudier les deals gagnés
2. **Identifier les patterns** : Quels scores avaient les clients?
3. **Ajuster les poids** : Optimiser la prédictivité
4. **Valider avec Sales** : Feedback sur la qualité des MQLs

### Métriques de Performance

| Métrique | Cible | Actuel |
|----------|-------|--------|
| MQL → SQL rate | >30% | [X%] |
| SQL → Opportunity rate | >50% | [X%] |
| Temps moyen MQL → SQL | <48h | [Xh] |
| Score moyen des Won | >[X] | [Y] |
| Score moyen des Lost | <[X] | [Y] |

### Review Cadence

| Review | Fréquence | Participants |
|--------|-----------|--------------|
| Performance check | Mensuel | Marketing Ops |
| Calibration | Trimestriel | Marketing + Sales |
| Refonte modèle | Annuel | All stakeholders |

## 8. Implémentation Technique

### Propriétés CRM

| Propriété | Type | Calcul |
|-----------|------|--------|
| `lead_score_fit` | Number | Somme critères fit |
| `lead_score_engagement` | Number | Somme critères engagement |
| `lead_score_total` | Number | Fit + Engagement |
| `lead_grade` | Dropdown | Basé sur score total |
| `mql_date` | Date | Date passage MQL |
| `score_last_updated` | Date | Dernière MAJ |

### Sync & Intégrations

| Système | Direction | Données |
|---------|-----------|---------|
| CRM (HubSpot/SF) | Bi-directionnel | Scores, propriétés |
| Sales tools | Push | Score, grade |
| BI/Analytics | Pull | Historique scores |

## Annexes

### A. Tableau de Scoring Complet
[Export CSV de tous les critères et points]

### B. Historique des Modifications
| Date | Modification | Raison |
|------|--------------|--------|
| [Date] | [Changement] | [Justification] |

### C. Documentation Technique
[Lien vers doc technique implémentation]
```

## Critères d'Acceptation

### Complétude
- [ ] Critères Fit définis et pondérés
- [ ] Critères Engagement définis et pondérés
- [ ] Seuils de qualification établis
- [ ] Actions automatiques configurées
- [ ] Règles de decay documentées
- [ ] Matrice Fit × Engagement créée

### Qualité
- [ ] Pondérations validées avec données historiques
- [ ] Alignement Marketing/Sales sur les définitions
- [ ] Modèle testable et mesurable

### Validation
- [ ] Validé par Marketing Ops
- [ ] Approuvé par Sales Leadership
- [ ] Calibré sur données réelles

## Anti-Patterns

### ❌ À Éviter

1. **Trop de critères**
   - Plus de 30 critères = ingérable
   - Maintenance impossible

2. **Pas de decay**
   - Scores qui ne baissent jamais
   - Leads "zombies" qualifiés

3. **Pas d'alignement Sales**
   - Marketing définit seul
   - Sales rejette les MQLs

4. **Set and forget**
   - Jamais recalibré
   - Perd sa pertinence

### ✅ Bonnes Pratiques

1. **Commencer simple** : 10-15 critères max
2. **Calibrer régulièrement** avec les retours Sales
3. **Decay obligatoire** pour maintenir la fraîcheur
4. **Documentation claire** pour tous les stakeholders
