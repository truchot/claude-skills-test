# Clarification des Périmètres Marketing Skills

Ce document définit les périmètres clairs entre les skills marketing pour éviter les duplications et confusions.

---

## 1. Analytics vs Reporting (marketing-analytics)

### Problème Identifié

Le skill `marketing-analytics` contient deux domaines qui peuvent sembler redondants :
- `analytics/` : Orchestration générale de l'analytics
- `reporting/` : Production de rapports et dashboards

### Clarification des Périmètres

```
┌─────────────────────────────────────────────────────────────┐
│              MARKETING-ANALYTICS - STRUCTURE                 │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  ANALYTICS/ (Orchestration Générale)                    ││
│  │  ═══════════════════════════════════                    ││
│  │  Rôle : Orchestrer TOUTES les activités analytics       ││
│  │                                                         ││
│  │  • Définir les KPIs (quoi mesurer)                      ││
│  │  • Coordonner A/B testing                               ││
│  │  • Superviser l'attribution                             ││
│  │  • Déléguer au bon sous-domaine                         ││
│  │                                                         ││
│  │  → C'est le CERVEAU qui coordonne                       ││
│  └─────────────────────────────────────────────────────────┘│
│                          │                                  │
│                          ▼ délègue à                        │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  REPORTING/ (Sous-domaine Spécialisé)                   ││
│  │  ════════════════════════════════════                   ││
│  │  Rôle : Produire les LIVRABLES visuels                  ││
│  │                                                         ││
│  │  • Concevoir les dashboards                             ││
│  │  • Créer les visualisations                             ││
│  │  • Automatiser les rapports                             ││
│  │  • Définir les frameworks KPI visuels                   ││
│  │                                                         ││
│  │  → C'est l'ARTISAN qui produit                          ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  AUTRES SOUS-DOMAINES :                                     │
│  • tracking/ → Collecte des données                         │
│  • attribution/ → Modèles d'attribution                     │
│  • testing/ → A/B et expérimentation                        │
│  • insights/ → Analyse et recommandations                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Règle de Routage

| Besoin | Domaine | Justification |
|--------|---------|---------------|
| "Quels KPIs définir ?" | `analytics/` | Décision stratégique |
| "Créer un dashboard" | `reporting/` | Production livrable |
| "Rapport mensuel" | `reporting/` | Production livrable |
| "Analyser la performance" | `analytics/` → délègue | Orchestration |

---

## 2. Funnel Analysis (marketing-ops vs marketing-analytics)

### Problème Identifié (Résolu)

L'ancien doublon a été résolu par renommage :
- `marketing-ops/performance/funnel-optimization.md` ← (anciennement funnel-analysis.md)
- `marketing-analytics/insights/funnel-analysis.md` ← (diagnostic, inchangé)

### Architecture Clarifiée

```
┌─────────────────────────────────────────────────────────────┐
│              FUNNEL : QUI FAIT QUOI ?                        │
│                                                             │
│  ┌──────────────────────────────┐  ┌──────────────────────┐│
│  │  MARKETING-ANALYTICS         │  │  MARKETING-OPS       ││
│  │  insights/funnel-analysis    │  │  performance/        ││
│  │                              │  │  funnel-optimization ││
│  │  ════════════════════════    │  │  ════════════════════││
│  │                              │  │                      ││
│  │  FOCUS : MESURE & DIAGNOSTIC │  │  FOCUS : OPTIMISATION││
│  │                              │  │                      ││
│  │  • Cartographier le funnel   │  │  • Améliorer les taux││
│  │  • Mesurer les drop-offs     │  │  • Corriger frictions││
│  │  • Identifier les problèmes  │  │  • Implémenter fixes ││
│  │  • Segmenter les données     │  │  • Tester hypothèses ││
│  │  • Produire le diagnostic    │  │  • Mesurer impact    ││
│  │                              │  │                      ││
│  │  OUTPUT :                    │  │  OUTPUT :            ││
│  │  "Le checkout mobile a      │  │  "Simplifier le      ││
│  │   -30% vs desktop"           │  │   checkout mobile"   ││
│  │                              │  │                      ││
│  │  → Trouve le PROBLÈME        │  │  → Implémente la     ││
│  │                              │  │    SOLUTION          ││
│  └──────────────────────────────┘  └──────────────────────┘│
│                                                             │
│                    WORKFLOW                                 │
│                    ════════                                 │
│                                                             │
│   analytics/funnel-analysis ──────► marketing-ops/         │
│   "Diagnostic : checkout        funnel-optimization       │
│    mobile problématique"        "Action : simplifier"     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Règle de Routage

| Besoin | Skill/Agent | Justification |
|--------|-------------|---------------|
| "Analyser mon funnel" | `marketing-analytics/insights/funnel-analysis` | Diagnostic |
| "Où sont les drop-offs ?" | `marketing-analytics/insights/funnel-analysis` | Mesure |
| "Améliorer mon taux de conversion" | `marketing-ops/performance/funnel-optimization` | Action |
| "Corriger le checkout" | `marketing-ops/performance/funnel-optimization` | Implémentation |

---

## 3. Attribution (direction-marketing vs marketing-analytics)

### Problème Identifié

L'attribution est présente à deux niveaux :
- `direction-marketing/mesure/attribution-model.md` (Niveau 2 - Stratégique)
- `marketing-analytics/attribution/` (Niveau 3 - Opérationnel)

### Clarification des Périmètres

```
┌─────────────────────────────────────────────────────────────┐
│              ATTRIBUTION : STRATÉGIQUE vs OPÉRATIONNEL       │
│                                                             │
│  NIVEAU 2 - DIRECTION-MARKETING (POURQUOI)                  │
│  ══════════════════════════════════════════                 │
│  mesure/attribution-model.md                                │
│                                                             │
│  Responsabilité :                                           │
│  • CHOISIR le modèle d'attribution adapté au business       │
│  • DÉFINIR la stratégie d'attribution                       │
│  • DÉCIDER des fenêtres d'attribution                       │
│  • ARBITRER entre modèles (last-click vs MTA vs data-driven)│
│                                                             │
│  Questions traitées :                                       │
│  • "Quel modèle d'attribution pour notre business ?"        │
│  • "Comment mesurer notre marketing mix ?"                  │
│  • "Quelle fenêtre d'attribution pour notre cycle de vente?"│
│                                                             │
│  OUTPUT : Décision stratégique sur le modèle                │
│                                                             │
│  ════════════════════════════════════════════════════════   │
│                          │                                  │
│                          ▼ délègue l'implémentation à       │
│                                                             │
│  NIVEAU 3 - MARKETING-ANALYTICS (COMMENT)                   │
│  ═════════════════════════════════════════                  │
│  attribution/                                               │
│                                                             │
│  Responsabilité :                                           │
│  • IMPLÉMENTER le modèle choisi                             │
│  • CONFIGURER le tracking                                   │
│  • ANALYSER les parcours clients                            │
│  • PRODUIRE les rapports d'attribution                      │
│  • OPTIMISER la collecte cross-device                       │
│                                                             │
│  Questions traitées :                                       │
│  • "Comment configurer l'attribution dans GA4 ?"            │
│  • "Quels sont les top converting paths ?"                  │
│  • "Comment tracker cross-device ?"                         │
│                                                             │
│  OUTPUT : Implémentation technique et analyse               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Règle de Routage

| Besoin | Niveau | Skill/Agent |
|--------|--------|-------------|
| "Quel modèle d'attribution choisir ?" | Stratégique | `direction-marketing/mesure/attribution-model` |
| "Configurer l'attribution GA4" | Opérationnel | `marketing-analytics/attribution/` |
| "Analyser les parcours clients" | Opérationnel | `marketing-analytics/attribution/customer-journey` |
| "Définir notre stratégie d'attribution" | Stratégique | `direction-marketing/mesure/attribution-model` |

---

## 4. Règle Générale : Stratégique vs Opérationnel

```
┌─────────────────────────────────────────────────────────────┐
│              PRINCIPE DE SÉPARATION                          │
│                                                             │
│  NIVEAU 2 - STRATÉGIQUE (direction-*)                       │
│  ═══════════════════════════════════                        │
│  • DÉCIDE quoi faire et pourquoi                            │
│  • CHOISIT les approches et modèles                         │
│  • DÉFINIT les objectifs et KPIs cibles                     │
│  • ARBITRE les priorités                                    │
│                                                             │
│  Verbes : Décider, Choisir, Définir, Arbitrer, Prioriser   │
│                                                             │
│  ════════════════════════════════════════════════════════   │
│                                                             │
│  NIVEAU 3 - OPÉRATIONNEL (skills spécialisés)               │
│  ════════════════════════════════════════════               │
│  • IMPLÉMENTE les décisions stratégiques                    │
│  • EXÉCUTE les actions définies                             │
│  • MESURE et ANALYSE les résultats                          │
│  • OPTIMISE la performance                                  │
│                                                             │
│  Verbes : Implémenter, Exécuter, Mesurer, Analyser, Optimiser│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Résumé des Actions Correctives

| Problème | Action | Fichier(s) Concerné(s) |
|----------|--------|------------------------|
| Confusion analytics/reporting | Clarifier dans les orchestrators | `analytics/orchestrator.md`, `reporting/orchestrator.md` |
| Duplication funnel-analysis | ✅ Renommé en `funnel-optimization` dans marketing-ops | `marketing-ops/performance/funnel-optimization.md` (fait) |
| Attribution confuse | Enrichir le stratégique, clarifier les délégations | `direction-marketing/mesure/attribution-model.md` |

---

*Document de référence pour l'architecture marketing skills - À consulter en cas de doute sur le routage.*
