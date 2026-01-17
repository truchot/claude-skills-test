---
id: seo-roadmap
name: Roadmap SEO
version: 1.0.0
category: marketing
status: active
phase: "2-strategy"
order: 8
agents:
  - marketing/acquisition/seo/strategie/roadmap-seo
  - marketing/acquisition/seo/orchestrator
consumes:
  - seo-audit
  - keyword-research
  - marketing-objectives
produces_for:
  - marketing/acquisition/seo/contenu/brief-redactionnel
  - marketing/acquisition/seo/technique/orchestrator
  - marketing/acquisition/seo/netlinking/orchestrator
workflows:
  - id: wf-seo-roadmap
    template: wf-planning
    phase: Planning
    name: Élaboration roadmap SEO
    duration: 2 jours
tags:
  - marketing
  - seo
  - strategy
  - planning
---

# Roadmap SEO

## Description

La roadmap SEO est le plan d'actions priorisé pour améliorer le référencement naturel. Elle traduit l'audit et l'étude de mots-clés en actions concrètes, planifiées dans le temps avec des objectifs mesurables.

## Cas d'Usage

- Planification des actions SEO sur 6-12 mois
- Priorisation des ressources (dev, content, netlinking)
- Suivi de l'avancement du projet SEO
- Communication avec les stakeholders
- Alignement équipes techniques et marketing

## Structure du Livrable

```markdown
# Roadmap SEO : [Projet]

## Vision & Objectifs

### Objectif Principal
> [Objectif SEO à 12 mois en une phrase]

### KPIs Cibles

| KPI | Actuel | 3 mois | 6 mois | 12 mois |
|-----|--------|--------|--------|---------|
| Trafic organique | [X K] | [Y K] | [Z K] | [W K] |
| Mots-clés Top 3 | [X] | [Y] | [Z] | [W] |
| Mots-clés Top 10 | [X] | [Y] | [Z] | [W] |
| Domain Rating | [X] | [Y] | [Z] | [W] |
| Conversions SEO | [X] | [Y] | [Z] | [W] |

### Projection Trafic

```
Trafic Organique (sessions/mois)

     │                                    ┌─ 12M: [W K]
 [W] │                              ╭─────╯
     │                        ╭─────╯
 [Z] │                  ╭─────╯─────── 6M: [Z K]
     │            ╭─────╯
 [Y] │      ╭─────╯─────────────────── 3M: [Y K]
     │╭─────╯
 [X] │────────────────────────────── Actuel: [X K]
     └───────────────────────────────────────────
       M1   M3      M6      M9      M12
```

## Vue d'Ensemble Roadmap

### Phases Principales

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ROADMAP SEO 12 MOIS                          │
├─────────────────────────────────────────────────────────────────────┤
│  M1-M2      │  M3-M4      │  M5-M6      │  M7-M9     │  M10-M12   │
│  FONDATIONS │  QUICK WINS │  CONTENU    │  AUTORITÉ  │  SCALE     │
│             │             │             │            │            │
│  ■ Tech     │  ■ On-page  │  ■ Piliers  │ ■ Netlnk  │ ■ Expand   │
│  ■ Crawl    │  ■ LowHang  │  ■ Clusters │ ■ PR      │ ■ Auto     │
│  ■ Perf     │  ■ Internes │  ■ Scale    │ ■ Guest   │ ■ Optim    │
└─────────────────────────────────────────────────────────────────────┘
```

### Répartition Effort

| Pilier | M1-M3 | M4-M6 | M7-M9 | M10-M12 |
|--------|-------|-------|-------|---------|
| Technique | 40% | 20% | 10% | 10% |
| Contenu | 30% | 50% | 40% | 40% |
| Netlinking | 10% | 20% | 40% | 30% |
| Analyse | 20% | 10% | 10% | 20% |

## Phase 1 : Fondations (M1-M2)

### Objectifs Phase
- ✅ Corriger les erreurs techniques bloquantes
- ✅ Établir les bases de mesure
- ✅ Optimiser la crawlabilité

### Actions Techniques

| Action | Priorité | Effort | Owner | Status |
|--------|----------|--------|-------|--------|
| Corriger erreurs 404 critiques | P1 | 2j | Dev | 🔴 |
| Implémenter HTTPS partout | P1 | 1j | Dev | 🔴 |
| Optimiser Core Web Vitals | P1 | 5j | Dev | 🔴 |
| Créer/MAJ sitemap XML | P1 | 0.5j | Dev | 🔴 |
| Corriger robots.txt | P1 | 0.5j | Dev | 🔴 |
| Implémenter données structurées | P2 | 3j | Dev | 🔴 |
| Corriger canonical tags | P2 | 2j | Dev | 🔴 |

### Actions Analytics

| Action | Priorité | Effort | Owner | Status |
|--------|----------|--------|-------|--------|
| Configurer GA4 events SEO | P1 | 1j | Data | 🔴 |
| Setup Search Console | P1 | 0.5j | SEO | 🔴 |
| Créer dashboard SEO | P1 | 2j | Data | 🔴 |
| Baseline tous KPIs | P1 | 1j | SEO | 🔴 |

### Livrables Phase 1
- [ ] Rapport technique post-corrections
- [ ] Dashboard SEO opérationnel
- [ ] Baseline KPIs documentée

### Budget Phase 1
| Poste | Budget |
|-------|--------|
| Dev technique | [X €] |
| Outils | [X €] |
| **Total** | **[X €]** |

---

## Phase 2 : Quick Wins (M3-M4)

### Objectifs Phase
- ✅ Optimiser les pages à fort potentiel
- ✅ Améliorer les positions existantes (P4-20 → P1-3)
- ✅ Structurer le maillage interne

### Actions On-Page

| Page/KW | Position Actuelle | Cible | Action | Owner |
|---------|-------------------|-------|--------|-------|
| [URL 1] - [KW] | P8 | P3 | Enrichir contenu | Content |
| [URL 2] - [KW] | P12 | P5 | Optimiser H1/Title | SEO |
| [URL 3] - [KW] | P15 | P7 | Ajouter média | Content |
| [URL 4] - [KW] | P6 | P2 | Liens internes | SEO |
| [URL 5] - [KW] | P20 | P10 | Réécrire intro | Content |

### Actions Maillage Interne

| Action | Pages Concernées | Effort | Owner |
|--------|------------------|--------|-------|
| Créer hub thématique [Thème 1] | [X] pages | 2j | SEO |
| Ajouter liens contextuels | [X] pages | 3j | Content |
| Optimiser ancres de liens | All | 2j | SEO |
| Créer breadcrumbs | All | 1j | Dev |

### Livrables Phase 2
- [ ] [X] pages optimisées
- [ ] Structure de maillage documentée
- [ ] Rapport de progression positions

---

## Phase 3 : Stratégie Contenu (M5-M6)

### Objectifs Phase
- ✅ Créer les pages piliers
- ✅ Développer les clusters de contenu
- ✅ Couvrir les opportunités keywords

### Calendrier Contenu

| Semaine | Contenu | KW Cible | Volume | Type |
|---------|---------|----------|--------|------|
| S1 | [Titre Pilier 1] | [KW] | [X K] | Pilier |
| S2 | [Cluster 1a] | [KW] | [X] | Article |
| S2 | [Cluster 1b] | [KW] | [X] | Article |
| S3 | [Cluster 1c] | [KW] | [X] | Article |
| S4 | [Titre Pilier 2] | [KW] | [X K] | Pilier |
| ... | ... | ... | ... | ... |

### Production Requise

| Type Contenu | Quantité | Fréquence | Responsable |
|--------------|----------|-----------|-------------|
| Pages Piliers | [X] | [X/mois] | Content Lead |
| Articles Cluster | [X] | [X/semaine] | Rédacteurs |
| Landing Pages | [X] | [X/mois] | Content |
| MAJ Contenu Existant | [X] | [X/mois] | SEO |

### Livrables Phase 3
- [ ] [X] pages piliers publiées
- [ ] [X] articles clusters publiés
- [ ] Couverture [X%] des KW prioritaires

---

## Phase 4 : Autorité (M7-M9)

### Objectifs Phase
- ✅ Augmenter le Domain Rating de [X] points
- ✅ Acquérir [X] backlinks qualifiés
- ✅ Développer la notoriété de marque

### Stratégie Netlinking

| Canal | Objectif | Budget | Responsable |
|-------|----------|--------|-------------|
| Guest posting | [X] liens/mois | [X €] | Outreach |
| Digital PR | [X] mentions/mois | [X €] | PR |
| Partenariats | [X] liens/mois | [X €] | BD |
| Linkable assets | [X] contenus | [X €] | Content |
| Broken link building | [X] liens/mois | [0 €] | SEO |

### Cibles Netlinking

| Site Cible | DR | Type | Approche | Status |
|------------|----|----|----------|--------|
| [Site 1] | [X] | Guest post | [Pitch] | 🔴 |
| [Site 2] | [X] | Partenariat | [Pitch] | 🔴 |
| [Site 3] | [X] | Resource page | [Pitch] | 🔴 |

### Linkable Assets à Créer

| Asset | Format | KW Cible | Potentiel Liens |
|-------|--------|----------|-----------------|
| [Étude sectorielle] | Rapport PDF | [KW] | Élevé |
| [Outil gratuit] | Interactive | [KW] | Élevé |
| [Infographie] | Visual | [KW] | Moyen |

### Livrables Phase 4
- [ ] [X] backlinks DR50+ acquis
- [ ] [X] mentions presse/blog
- [ ] Domain Rating +[X] points

---

## Phase 5 : Scale (M10-M12)

### Objectifs Phase
- ✅ Systématiser la production de contenu
- ✅ Automatiser le reporting
- ✅ Identifier nouveaux territoires

### Actions d'Expansion

| Territoire | Potentiel | Effort | Priorité |
|------------|-----------|--------|----------|
| [Nouvelle thématique 1] | [X K/mois] | [Élevé] | P1 |
| [SEO Local] | [X K/mois] | [Moyen] | P2 |
| [SEO International] | [X K/mois] | [Élevé] | P3 |

### Optimisations Continues

| Action | Fréquence | Owner |
|--------|-----------|-------|
| Audit positions | Hebdo | SEO |
| MAJ contenu evergreen | Mensuel | Content |
| Analyse nouveaux KW | Mensuel | SEO |
| Rapport stakeholders | Mensuel | SEO Lead |
| Audit technique | Trimestriel | Dev |

### Livrables Phase 5
- [ ] Processus content scalé
- [ ] Reporting automatisé
- [ ] Roadmap V2 pour année suivante

---

## Ressources & Budget

### Équipe Requise

| Rôle | Temps Alloué | Coût Mensuel |
|------|--------------|--------------|
| SEO Manager | [X%] | [X €] |
| Content Writer | [X%] | [X €] |
| Développeur | [X%] | [X €] |
| Outreach Specialist | [X%] | [X €] |
| **Total** | - | **[X €/mois]** |

### Outils

| Outil | Usage | Coût Annuel |
|-------|-------|-------------|
| [Ahrefs/SEMrush] | KW + Backlinks | [X €] |
| [Screaming Frog] | Crawl | [X €] |
| [Surfer/Clearscope] | Content optimization | [X €] |
| **Total Outils** | - | **[X €]** |

### Budget Global

| Poste | M1-M3 | M4-M6 | M7-M9 | M10-M12 | Total |
|-------|-------|-------|-------|---------|-------|
| Technique | [X €] | [X €] | [X €] | [X €] | [X €] |
| Contenu | [X €] | [X €] | [X €] | [X €] | [X €] |
| Netlinking | [X €] | [X €] | [X €] | [X €] | [X €] |
| Outils | [X €] | [X €] | [X €] | [X €] | [X €] |
| **Total** | **[X €]** | **[X €]** | **[X €]** | **[X €]** | **[X €]** |

## Risques & Mitigation

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| MAJ algorithme Google | Haute | Élevé | Diversifier sources trafic |
| Retard dev technique | Moyenne | Moyen | Buffer dans planning |
| Concurrence accrue | Moyenne | Moyen | Veille + réactivité |
| Budget réduit | Basse | Élevé | Priorisation stricte |

## Suivi & Gouvernance

### Réunions

| Type | Fréquence | Participants | Objectif |
|------|-----------|--------------|----------|
| Weekly SEO | Hebdo | SEO team | Avancement opérationnel |
| Monthly Review | Mensuel | Marketing + SEO | KPIs et ajustements |
| Quarterly Strategy | Trim. | Direction | Vision et budget |

### Reporting

| Rapport | Fréquence | Destinataires |
|---------|-----------|---------------|
| Dashboard temps réel | Live | SEO team |
| Weekly digest | Hebdo | Marketing |
| Monthly report | Mensuel | Direction |
```

## Critères d'Acceptation

### Complétude
- [ ] Objectifs SMART définis
- [ ] Toutes les phases détaillées
- [ ] Actions assignées avec owners
- [ ] Budget estimé
- [ ] Risques identifiés

### Qualité
- [ ] Basé sur audit et keyword research
- [ ] Réaliste vs ressources disponibles
- [ ] Priorisé par impact
- [ ] Flexible pour ajustements

### Validation
- [ ] Validé par SEO Lead
- [ ] Approuvé par Marketing Director
- [ ] Capacité confirmée par Dev

## Points de Contrôle Humain

| Checkpoint | Responsable | Critères |
|------------|-------------|----------|
| Feasibility check | Tech Lead | Actions dev réalisables |
| Content capacity | Content Manager | Volume production OK |
| Budget approval | Finance | Budget validé |
| Strategy alignment | CMO | Cohérence globale |

## Anti-Patterns

### ❌ À Éviter

1. **Roadmap figée**
   - Plan sur 12 mois sans révision
   - Ignorer les changements d'algo

2. **Trop ambitieux**
   - x10 trafic en 3 mois
   - Sans ressources adéquates

3. **Pas de quick wins**
   - Tout sur le long terme
   - Pas de résultats visibles rapidement

4. **Siloed planning**
   - SEO seul sans dev/content
   - Blocages garantis

### ✅ Bonnes Pratiques

1. **Révision trimestrielle** de la roadmap
2. **Quick wins early** pour créer momentum
3. **Cross-functional planning** avec dev et content
4. **Buffer 20%** pour imprévus

## Outils Recommandés

| Outil | Usage |
|-------|-------|
| Notion/Asana | Project management |
| Ahrefs/SEMrush | Suivi positions |
| Looker Studio | Dashboards |
| Google Sheets | Tracking détaillé |
