---
id: seo-report
name: Rapport SEO
version: 1.0.0
category: marketing
status: active
phase: "6-maintenance"
order: 10
agents:
  - seo-expert/pilotage/reporting-seo
  - seo-expert/pilotage/analytics-seo
  - seo-expert/pilotage/suivi-positions
consumes:
  - seo-roadmap
  - marketing-objectives
  - keyword-research
produces_for:
  - seo-expert/strategie/roadmap-seo
  - marketing-analytics/orchestrator
workflows:
  - id: wf-seo-report-monthly
    template: wf-report
    phase: Reporting
    name: Rapport SEO mensuel
    duration: 1 jour
  - id: wf-seo-report-weekly
    template: wf-report
    phase: Reporting
    name: Rapport SEO hebdo
    duration: 0.5 jour
tags:
  - marketing
  - seo
  - reporting
  - analytics
  - pilotage
---

# Rapport SEO

## Description

Le rapport SEO présente les performances du référencement naturel sur une période donnée. Il analyse les KPIs, identifie les tendances et propose des recommandations pour optimiser la stratégie.

## Cas d'Usage

- Suivi hebdomadaire/mensuel des performances
- Reporting direction/client
- Identification des problèmes et opportunités
- Justification des investissements SEO
- Prise de décision stratégique

## Structure du Livrable

```markdown
# Rapport SEO - [Mois/Période] [Année]

## Résumé Exécutif

### Performance Globale

| KPI | Valeur | vs Période Préc. | vs Objectif |
|-----|--------|------------------|-------------|
| 🔍 Trafic organique | [X K] sessions | [+/-X%] | [+/-X%] |
| 📈 Mots-clés Top 3 | [X] | [+/-X] | [+/-X] |
| 📊 Mots-clés Top 10 | [X] | [+/-X] | [+/-X] |
| 🔗 Domain Rating | [X] | [+/-X] | [+/-X] |
| 💰 Conversions SEO | [X] | [+/-X%] | [+/-X%] |

### Verdict

```
┌──────────────────────────────────────────────────────────────┐
│  PERFORMANCE GLOBALE:  [🟢 Excellente / 🟡 Correcte / 🔴 À améliorer]  │
│                                                              │
│  Points positifs:                                            │
│  ✅ [Point 1]                                                │
│  ✅ [Point 2]                                                │
│                                                              │
│  Points d'attention:                                         │
│  ⚠️ [Point 1]                                                │
│  ⚠️ [Point 2]                                                │
└──────────────────────────────────────────────────────────────┘
```

### Top 3 Actions Recommandées
1. 🎯 [Action prioritaire 1] - Impact: [Estimation]
2. 🎯 [Action prioritaire 2] - Impact: [Estimation]
3. 🎯 [Action prioritaire 3] - Impact: [Estimation]

## 1. Trafic Organique

### Vue d'Ensemble

| Métrique | Ce mois | Mois préc. | Évolution | YoY |
|----------|---------|------------|-----------|-----|
| Sessions | [X K] | [Y K] | [+/-Z%] | [+/-W%] |
| Utilisateurs | [X K] | [Y K] | [+/-Z%] | [+/-W%] |
| Pages vues | [X K] | [Y K] | [+/-Z%] | [+/-W%] |
| Durée moy. session | [X min] | [Y min] | [+/-Z%] | - |
| Taux de rebond | [X%] | [Y%] | [+/-Z pts] | - |

### Évolution Trafic

```
Sessions Organiques (30 derniers jours)

[X K] │    ╭────╮
      │ ╭──╯    ╰───╮   ╭──╮
      │─╯           ╰───╯  ╰───
[Y K] │
      └────────────────────────────
       S1    S2    S3    S4    S5

      ── Ce mois   -- Mois précédent
```

### Top Pages par Trafic

| Page | Sessions | Évol. | Entrées | Bounce |
|------|----------|-------|---------|--------|
| /[page-1] | [X K] | [+/-Y%] | [Z K] | [W%] |
| /[page-2] | [X K] | [+/-Y%] | [Z K] | [W%] |
| /[page-3] | [X K] | [+/-Y%] | [Z K] | [W%] |
| /[page-4] | [X K] | [+/-Y%] | [Z K] | [W%] |
| /[page-5] | [X K] | [+/-Y%] | [Z K] | [W%] |

### Pages en Progression 📈

| Page | Sessions | Évol. | Raison Probable |
|------|----------|-------|-----------------|
| /[page] | [X K] | +[Y%] | [Optimisation/Saisonnalité/...] |
| /[page] | [X K] | +[Y%] | [Raison] |

### Pages en Régression 📉

| Page | Sessions | Évol. | Cause Identifiée | Action |
|------|----------|-------|------------------|--------|
| /[page] | [X K] | -[Y%] | [Cause] | [Action] |
| /[page] | [X K] | -[Y%] | [Cause] | [Action] |

## 2. Positionnement

### Distribution des Positions

```
Position 1-3   ████████████████░░░░ 40%  [X KW]  (+[Y])
Position 4-10  ██████████░░░░░░░░░░ 25%  [X KW]  (+[Y])
Position 11-20 ████████░░░░░░░░░░░░ 20%  [X KW]  (+[Y])
Position 21-50 ████░░░░░░░░░░░░░░░░ 10%  [X KW]  (-[Y])
Position 51+   ██░░░░░░░░░░░░░░░░░░  5%  [X KW]  (-[Y])
```

### Mots-Clés Stratégiques

| Mot-clé | Position | Évol. | Volume | URL |
|---------|----------|-------|--------|-----|
| [KW prioritaire 1] | [X] | [⬆️+Y / ⬇️-Y / ➡️] | [Vol] | /[url] |
| [KW prioritaire 2] | [X] | [⬆️/⬇️/➡️] | [Vol] | /[url] |
| [KW prioritaire 3] | [X] | [⬆️/⬇️/➡️] | [Vol] | /[url] |
| [KW prioritaire 4] | [X] | [⬆️/⬇️/➡️] | [Vol] | /[url] |
| [KW prioritaire 5] | [X] | [⬆️/⬇️/➡️] | [Vol] | /[url] |

### Gains Significatifs 🚀

| Mot-clé | Ancienne Pos. | Nouvelle Pos. | Volume | Impact |
|---------|---------------|---------------|--------|--------|
| [KW] | [X] | [Y] | [Vol] | +[Z] sessions estimées |
| [KW] | [X] | [Y] | [Vol] | +[Z] sessions estimées |

### Pertes Significatives ⚠️

| Mot-clé | Ancienne Pos. | Nouvelle Pos. | Volume | Cause | Action |
|---------|---------------|---------------|--------|-------|--------|
| [KW] | [X] | [Y] | [Vol] | [Cause] | [Action] |
| [KW] | [X] | [Y] | [Vol] | [Cause] | [Action] |

### Nouveaux Mots-Clés Classés

| Mot-clé | Position | Volume | Page |
|---------|----------|--------|------|
| [Nouveau KW 1] | [X] | [Vol] | /[url] |
| [Nouveau KW 2] | [X] | [Vol] | /[url] |

## 3. Search Console Insights

### Impressions & Clics

| Métrique | Ce mois | Mois préc. | Évol. |
|----------|---------|------------|-------|
| Impressions | [X M] | [Y M] | [+/-Z%] |
| Clics | [X K] | [Y K] | [+/-Z%] |
| CTR moyen | [X%] | [Y%] | [+/-Z pts] |
| Position moyenne | [X] | [Y] | [+/-Z] |

### Requêtes Top Performers

| Requête | Impressions | Clics | CTR | Position |
|---------|-------------|-------|-----|----------|
| [Query 1] | [X K] | [Y K] | [Z%] | [W] |
| [Query 2] | [X K] | [Y K] | [Z%] | [W] |
| [Query 3] | [X K] | [Y K] | [Z%] | [W] |

### Opportunités CTR (Position bonne, CTR faible)

| Requête | Position | CTR | Benchmark | Opportunité |
|---------|----------|-----|-----------|-------------|
| [Query] | [X] | [Y%] | [Z%] | Optimiser title/meta |
| [Query] | [X] | [Y%] | [Z%] | Ajouter rich snippet |

### Problèmes d'Indexation

| Type | Nombre | Évol. | Priorité |
|------|--------|-------|----------|
| Pages exclues | [X] | [+/-Y] | [P1/P2/P3] |
| Erreurs crawl | [X] | [+/-Y] | [P1/P2/P3] |
| Mobile usability | [X] | [+/-Y] | [P1/P2/P3] |

## 4. Backlinks & Autorité

### Évolution Autorité

| Métrique | Ce mois | Mois préc. | Évol. |
|----------|---------|------------|-------|
| Domain Rating | [X] | [Y] | [+/-Z] |
| Domaines référents | [X] | [Y] | [+/-Z] |
| Backlinks totaux | [X K] | [Y K] | [+/-Z%] |

### Nouveaux Backlinks Acquis

| Domaine | DR | Page | Ancre | Type |
|---------|----|----|-------|------|
| [site.com] | [X] | /[page] | "[Ancre]" | [DoFollow/NoFollow] |
| [site.com] | [X] | /[page] | "[Ancre]" | [DoFollow/NoFollow] |
| [site.com] | [X] | /[page] | "[Ancre]" | [DoFollow/NoFollow] |

### Backlinks Perdus

| Domaine | DR | Raison | Action |
|---------|----|----|--------|
| [site.com] | [X] | [Page supprimée/Refonte] | [Recontacter/Accepter] |

### Comparaison Concurrents

| Site | DR | Domaines Réf. | Évol. Mois |
|------|----|----|------------|
| **Nous** | **[X]** | **[Y]** | **[+/-Z]** |
| [Concurrent 1] | [X] | [Y] | [+/-Z] |
| [Concurrent 2] | [X] | [Y] | [+/-Z] |

## 5. Contenu

### Production du Mois

| Type | Publié | Planifié | Écart |
|------|--------|----------|-------|
| Articles blog | [X] | [Y] | [+/-Z] |
| Landing pages | [X] | [Y] | [+/-Z] |
| MAJ contenus | [X] | [Y] | [+/-Z] |

### Performance Nouveaux Contenus

| Contenu | Date Pub. | Sessions | KW Classés | Position Moy. |
|---------|-----------|----------|------------|---------------|
| [Titre article 1] | [Date] | [X] | [Y] | [Z] |
| [Titre article 2] | [Date] | [X] | [Y] | [Z] |

### Content Decay (Contenus en perte)

| Page | Trafic Actuel | Pic Historique | Perte | Action |
|------|---------------|----------------|-------|--------|
| /[page] | [X] | [Y] | [-Z%] | [MAJ/Redirect/...] |

## 6. Technique

### Core Web Vitals

| Métrique | Mobile | Desktop | Évol. | Status |
|----------|--------|---------|-------|--------|
| LCP | [X]s | [Y]s | [+/-Z] | [🟢/🟡/🔴] |
| INP | [X]ms | [Y]ms | [+/-Z] | [🟢/🟡/🔴] |
| CLS | [X] | [Y] | [+/-Z] | [🟢/🟡/🔴] |

### Santé Technique

| Check | Status | Détail |
|-------|--------|--------|
| Erreurs 404 | [🟢/🔴] | [X] erreurs |
| Erreurs 5xx | [🟢/🔴] | [X] erreurs |
| Pages lentes | [🟢/🔴] | [X] pages >3s |
| Mobile-friendly | [🟢/🔴] | [X] problèmes |

## 7. Conversions SEO

### Tunnel de Conversion

```
Trafic Organique        [X K] sessions     100%
       │
       ▼
Pages vues produits     [Y K] vues         [Z%]
       │
       ▼
Ajouts panier           [Y]                [Z%]
       │
       ▼
Conversions             [Y]                [Z%]
       │
       ▼
Revenue attribué        [Y €]
```

### Attribution SEO

| Métrique | Valeur | vs Mois Préc. |
|----------|--------|---------------|
| Conversions attribuées | [X] | [+/-Y%] |
| Revenue attribué | [X €] | [+/-Y%] |
| Valeur par session | [X €] | [+/-Y%] |
| Coût par conversion | [X €] | [+/-Y%] |

## 8. Actions du Mois

### Actions Réalisées

| Action | Status | Impact Observé |
|--------|--------|----------------|
| ✅ [Action 1] | Terminé | [Résultat] |
| ✅ [Action 2] | Terminé | [Résultat] |
| 🟡 [Action 3] | En cours | - |
| 🔴 [Action 4] | Reporté | - |

### Roadmap vs Réel

| Objectif | Prévu | Réalisé | Écart |
|----------|-------|---------|-------|
| [Objectif 1] | [X] | [Y] | [+/-Z] |
| [Objectif 2] | [X] | [Y] | [+/-Z] |

## 9. Recommandations

### Priorité Haute 🔴

| Recommandation | Impact | Effort | Deadline |
|----------------|--------|--------|----------|
| [Recommandation 1] | Élevé | [Faible/Moyen/Élevé] | [Date] |
| [Recommandation 2] | Élevé | [Effort] | [Date] |

### Priorité Moyenne 🟡

| Recommandation | Impact | Effort |
|----------------|--------|--------|
| [Recommandation 3] | Moyen | [Effort] |
| [Recommandation 4] | Moyen | [Effort] |

### Priorité Basse 🟢

| Recommandation | Impact | Effort |
|----------------|--------|--------|
| [Recommandation 5] | Faible | [Effort] |

## Annexes

### A. Évolution KPIs 12 Mois

| Mois | Trafic | KW Top10 | DR | Conversions |
|------|--------|----------|----|----|
| [M-11] | [X K] | [X] | [X] | [X] |
| [M-10] | [X K] | [X] | [X] | [X] |
| ... | ... | ... | ... | ... |
| [Ce mois] | [X K] | [X] | [X] | [X] |

### B. Glossaire
| Terme | Définition |
|-------|------------|
| DR | Domain Rating (Ahrefs) |
| CTR | Click-Through Rate |
| SERP | Search Engine Results Page |
```

## Critères d'Acceptation

### Complétude
- [ ] Tous les KPIs couverts
- [ ] Comparaisons temporelles (MoM, YoY)
- [ ] Analyse des causes (pas juste les chiffres)
- [ ] Recommandations actionnables
- [ ] Visuels lisibles

### Qualité
- [ ] Données vérifiées et cohérentes
- [ ] Insights pertinents (pas que des chiffres)
- [ ] Recommandations priorisées
- [ ] Adapté à l'audience (technique vs management)

### Validation
- [ ] Validé par SEO Lead
- [ ] Relu avant envoi client/direction

## Points de Contrôle Humain

| Checkpoint | Responsable | Critères |
|------------|-------------|----------|
| Exactitude données | Data Analyst | Cohérence des sources |
| Qualité analyse | SEO Lead | Insights pertinents |
| Clarté | Account Manager | Compréhensible par non-SEO |

## Anti-Patterns

### ❌ À Éviter

1. **Rapport = dump de données**
   - Export GA4 brut
   - Aucune analyse ni insight

2. **Pas d'actions**
   - Constat sans recommandations
   - "Le trafic a baissé" et c'est tout

3. **Vanity metrics**
   - Focus sur metrics flatteurs
   - Ignorer les problèmes

4. **Trop long**
   - 50 pages illisibles
   - Pas de résumé exécutif

### ✅ Bonnes Pratiques

1. **Executive summary en premier**
2. **Insights > Données brutes**
3. **Toujours proposer des actions**
4. **Adapter au niveau de l'audience**

## Outils Recommandés

| Outil | Usage |
|-------|-------|
| Looker Studio | Dashboard automatisé |
| Google Analytics 4 | Données trafic |
| Search Console | Données SERP |
| Ahrefs/SEMrush | Positions, backlinks |
| Screaming Frog | Audit technique |
