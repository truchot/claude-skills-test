---
id: seo-audit
name: Audit SEO
version: 1.0.0
category: marketing
status: active
phase: "2-strategy"
order: 6
agents:
  - marketing/acquisition/seo/strategie/audit-global
  - marketing/acquisition/seo/technique/orchestrator
  - marketing/acquisition/seo/contenu/orchestrator
consumes:
  - client-request
  - project-brief
  - technical-audit
produces_for:
  - marketing/acquisition/seo/strategie/roadmap-seo
  - marketing/acquisition/seo/contenu/recherche-mots-cles
  - marketing/acquisition/seo/technique/core-web-vitals
workflows:
  - id: wf-seo-audit
    template: wf-audit
    phase: Audit
    name: Audit SEO complet
    duration: 5 jours
tags:
  - marketing
  - seo
  - audit
  - technique
---

# Audit SEO

## Description

L'audit SEO est une analyse complète de la santé d'un site web en termes de référencement naturel. Il identifie les problèmes techniques, les opportunités de contenu et les axes d'amélioration pour optimiser la visibilité dans les moteurs de recherche.

## Cas d'Usage

- Nouveau projet : état des lieux avant refonte
- Diagnostic : baisse de trafic organique
- Optimisation : amélioration continue
- Migration : préparation changement de site
- Benchmark : analyse avant/après optimisations

## Structure du Livrable

```markdown
# Audit SEO : [Nom du Site]

## Résumé Exécutif

### Score Global
```
┌─────────────────────────────────────────────┐
│              SCORE SEO GLOBAL               │
│                                             │
│                   [XX/100]                  │
│                                             │
│  Technique: [X/100]  │  Contenu: [X/100]   │
│  Popularité: [X/100] │  UX: [X/100]        │
└─────────────────────────────────────────────┘
```

### Synthèse des Constats

| Dimension | Score | Priorité | Impact Estimé |
|-----------|-------|----------|---------------|
| Technique | [X/100] | [🔴/🟡/🟢] | [Haut/Moyen/Bas] |
| Contenu | [X/100] | [🔴/🟡/🟢] | [Haut/Moyen/Bas] |
| Popularité | [X/100] | [🔴/🟡/🟢] | [Haut/Moyen/Bas] |
| Expérience Utilisateur | [X/100] | [🔴/🟡/🟢] | [Haut/Moyen/Bas] |

### Top 5 Problèmes Critiques
1. 🔴 [Problème 1] - Impact : [Estimation trafic perdu]
2. 🔴 [Problème 2] - Impact : [Estimation]
3. 🔴 [Problème 3] - Impact : [Estimation]
4. 🟡 [Problème 4] - Impact : [Estimation]
5. 🟡 [Problème 5] - Impact : [Estimation]

### Top 5 Opportunités
1. 💡 [Opportunité 1] - Potentiel : [+X% trafic]
2. 💡 [Opportunité 2] - Potentiel : [+X%]
3. 💡 [Opportunité 3] - Potentiel : [+X%]
4. 💡 [Opportunité 4] - Potentiel : [+X%]
5. 💡 [Opportunité 5] - Potentiel : [+X%]

## 1. Audit Technique

### 1.1 Crawl & Indexation

#### Statistiques Crawl
| Métrique | Valeur | Benchmark | Status |
|----------|--------|-----------|--------|
| Pages crawlées | [X] | - | - |
| Pages indexées | [X] | - | - |
| Taux d'indexation | [X%] | >90% | [✅/⚠️/❌] |
| Pages orphelines | [X] | 0 | [✅/⚠️/❌] |
| Profondeur max | [X] clics | <4 | [✅/⚠️/❌] |

#### Robots.txt
```
[Contenu actuel du robots.txt]
```
**Analyse** : [Points d'attention]

#### Sitemap XML
| Sitemap | URLs | Dernière MAJ | Status |
|---------|------|--------------|--------|
| [sitemap.xml] | [X] | [Date] | [✅/⚠️/❌] |

**Problèmes identifiés** :
- [ ] [Problème 1]
- [ ] [Problème 2]

### 1.2 Performance & Core Web Vitals

#### Scores PageSpeed

| Page | Mobile | Desktop | Status |
|------|--------|---------|--------|
| Homepage | [X] | [X] | [✅/⚠️/❌] |
| [Page clé 1] | [X] | [X] | [✅/⚠️/❌] |
| [Page clé 2] | [X] | [X] | [✅/⚠️/❌] |

#### Core Web Vitals

| Métrique | Valeur | Seuil Bon | Status |
|----------|--------|-----------|--------|
| **LCP** (Largest Contentful Paint) | [X]s | <2.5s | [✅/⚠️/❌] |
| **INP** (Interaction to Next Paint) | [X]ms | <200ms | [✅/⚠️/❌] |
| **CLS** (Cumulative Layout Shift) | [X] | <0.1 | [✅/⚠️/❌] |

#### Problèmes Performance
1. **[Problème]** : [Description] - Impact : [Estimation]
2. **[Problème]** : [Description] - Impact : [Estimation]

### 1.3 Architecture & Structure

#### Arborescence
```
[Représentation de l'arborescence actuelle]
Home
├── Catégorie 1
│   ├── Sous-cat 1.1
│   └── Sous-cat 1.2
├── Catégorie 2
└── ...
```

#### Maillage Interne
| Métrique | Valeur | Recommandation |
|----------|--------|----------------|
| Liens internes moyens/page | [X] | >3 |
| Pages avec <3 liens entrants | [X] | Minimiser |
| Liens cassés | [X] | 0 |

### 1.4 Mobile & Responsive

| Critère | Status | Détail |
|---------|--------|--------|
| Mobile-friendly | [✅/❌] | [Détail] |
| Viewport configuré | [✅/❌] | [Détail] |
| Touch targets | [✅/❌] | [Détail] |
| Police lisible | [✅/❌] | [Détail] |

### 1.5 Sécurité & HTTPS

| Critère | Status |
|---------|--------|
| HTTPS actif | [✅/❌] |
| Certificat valide | [✅/❌] |
| Mixed content | [X éléments] |
| Redirections HTTP→HTTPS | [✅/❌] |

## 2. Audit Contenu

### 2.1 Analyse Quantitative

| Métrique | Valeur |
|----------|--------|
| Nombre total de pages | [X] |
| Pages avec contenu unique | [X] |
| Pages thin content (<300 mots) | [X] |
| Pages sans meta description | [X] |
| Pages avec H1 manquant | [X] |
| Pages avec titre dupliqué | [X] |

### 2.2 Optimisation On-Page

#### Balises Title
| Problème | Nb Pages | Exemples |
|----------|----------|----------|
| Title manquant | [X] | [URL] |
| Title trop long (>60) | [X] | [URL] |
| Title trop court (<30) | [X] | [URL] |
| Title dupliqué | [X] | [URLs] |

#### Meta Descriptions
| Problème | Nb Pages | Exemples |
|----------|----------|----------|
| Meta manquante | [X] | [URL] |
| Meta trop longue (>160) | [X] | [URL] |
| Meta dupliquée | [X] | [URLs] |

#### Balises Hn
| Problème | Nb Pages |
|----------|----------|
| H1 manquant | [X] |
| H1 multiples | [X] |
| H1 dupliqué | [X] |
| Hiérarchie cassée | [X] |

### 2.3 Analyse Sémantique

#### Couverture Thématique
| Thématique | Pages | Volume KW | Couverture |
|------------|-------|-----------|------------|
| [Thème 1] | [X] | [X K/mois] | [X%] |
| [Thème 2] | [X] | [X K/mois] | [X%] |
| [Thème 3] | [X] | [X K/mois] | [X%] |

#### Content Gap
| Mot-clé manquant | Volume | Difficulté | Priorité |
|------------------|--------|------------|----------|
| [KW 1] | [X] | [X] | [🔥🔥🔥] |
| [KW 2] | [X] | [X] | [🔥🔥] |

### 2.4 Duplication & Cannibalisation

#### Pages en Duplicate Content
| URL 1 | URL 2 | % Similarité | Action |
|-------|-------|--------------|--------|
| [URL] | [URL] | [X%] | [Canonical/Fusionner/Supprimer] |

#### Cannibalisation de Mots-clés
| Mot-clé | Pages en compétition | Recommandation |
|---------|---------------------|----------------|
| [KW] | [URL1], [URL2] | [Action] |

## 3. Audit Popularité

### 3.1 Profil de Backlinks

| Métrique | Valeur | Benchmark Secteur |
|----------|--------|-------------------|
| Domaines référents | [X] | [Y] |
| Backlinks totaux | [X] | [Y] |
| Domain Rating (Ahrefs) | [X] | [Y] |
| Trust Flow (Majestic) | [X] | [Y] |

### 3.2 Qualité des Backlinks

| Qualité | Nombre | % |
|---------|--------|---|
| 🟢 Haute qualité (DR>50) | [X] | [X%] |
| 🟡 Moyenne qualité | [X] | [X%] |
| 🔴 Basse qualité/Spam | [X] | [X%] |

### 3.3 Analyse Concurrentielle Backlinks

| Concurrent | Domaines Ref. | Gap vs Nous |
|------------|---------------|-------------|
| [Concurrent 1] | [X] | [+X] |
| [Concurrent 2] | [X] | [+X] |
| [Concurrent 3] | [X] | [+X] |

### 3.4 Ancres de Liens

| Type d'ancre | % | Recommandation |
|--------------|---|----------------|
| Marque | [X%] | 30-40% |
| Exact match | [X%] | <5% |
| URL nue | [X%] | 15-25% |
| Générique | [X%] | 20-30% |

## 4. Audit UX & Engagement

### 4.1 Métriques d'Engagement (GA4)

| Métrique | Valeur | Benchmark |
|----------|--------|-----------|
| Taux de rebond | [X%] | <60% |
| Durée session moyenne | [X]min | >2min |
| Pages/session | [X] | >2 |
| Taux de conversion | [X%] | [Secteur] |

### 4.2 Pages à Problème

| URL | Taux Rebond | Temps | Action |
|-----|-------------|-------|--------|
| [URL forte bounce] | [X%] | [Xs] | [Recommandation] |

## 5. Analyse Concurrentielle

### Positionnement vs Concurrents

| Mot-clé | Notre Position | Concurrent 1 | Concurrent 2 |
|---------|---------------|--------------|--------------|
| [KW 1] | [X] | [Y] | [Z] |
| [KW 2] | [X] | [Y] | [Z] |
| [KW 3] | [X] | [Y] | [Z] |

### Gap d'Opportunités

| Dimension | Leader Secteur | Notre Site | Gap |
|-----------|---------------|------------|-----|
| Mots-clés P1-3 | [X] | [Y] | [-Z] |
| Trafic organique | [X K] | [Y K] | [-Z K] |
| Domaines référents | [X] | [Y] | [-Z] |

## 6. Plan d'Actions Priorisé

### Actions Immédiates (Quick Wins)
| Action | Impact | Effort | Priorité |
|--------|--------|--------|----------|
| [Action 1] | 🔥🔥🔥 | ⚡ | P1 |
| [Action 2] | 🔥🔥🔥 | ⚡ | P1 |
| [Action 3] | 🔥🔥 | ⚡ | P1 |

### Actions Court Terme (1-3 mois)
| Action | Impact | Effort |
|--------|--------|--------|
| [Action 4] | 🔥🔥🔥 | ⏱️⏱️ |
| [Action 5] | 🔥🔥 | ⏱️⏱️ |

### Actions Moyen Terme (3-6 mois)
| Action | Impact | Effort |
|--------|--------|--------|
| [Action 6] | 🔥🔥🔥 | ⏱️⏱️⏱️ |
| [Action 7] | 🔥🔥 | ⏱️⏱️⏱️ |

## Annexes

### A. Liste Complète des Erreurs Techniques
[Export CSV/Excel]

### B. Liste des Pages à Optimiser
[Export CSV/Excel]

### C. Méthodologie & Outils
- Crawl : [Screaming Frog / Sitebulb]
- Backlinks : [Ahrefs / Majestic / SEMrush]
- Performance : [PageSpeed Insights / GTmetrix]
- Analytics : [GA4 / Search Console]
```

## Critères d'Acceptation

### Complétude
- [ ] Audit technique complet (crawl, perf, architecture)
- [ ] Audit contenu (on-page, sémantique, duplication)
- [ ] Audit popularité (backlinks, ancres)
- [ ] Analyse concurrentielle
- [ ] Plan d'actions priorisé

### Qualité
- [ ] Données récentes (<1 semaine)
- [ ] Métriques comparées à des benchmarks
- [ ] Problèmes illustrés par des exemples
- [ ] Recommandations actionnables

### Validation
- [ ] Revu par SEO senior
- [ ] Présenté au client avec explication
- [ ] Export des données brutes fourni

## Points de Contrôle Humain

| Checkpoint | Responsable | Critères |
|------------|-------------|----------|
| Données crawl | SEO Technique | Crawl complet et récent |
| Analyse contenu | SEO Content | Couverture sémantique OK |
| Priorisation | SEO Manager | Actions réalistes |
| Validation client | Account Manager | Client comprend l'audit |

## Anti-Patterns

### ❌ À Éviter

1. **Audit automatique sans analyse**
   - Export Screaming Frog brut
   - Pas d'interprétation des données

2. **Focus uniquement technique**
   - Ignorer le contenu et les backlinks
   - Vision incomplète

3. **Recommandations vagues**
   - "Améliorer le SEO"
   - Sans actions concrètes

4. **Données obsolètes**
   - Audit de plus d'un mois
   - Ne reflète pas la réalité

### ✅ Bonnes Pratiques

1. **Crawl complet** avant analyse
2. **Croiser les données** (crawl + analytics + Search Console)
3. **Prioriser par impact** business
4. **Fournir les exports** pour traçabilité

## Outils Recommandés

| Outil | Usage |
|-------|-------|
| Screaming Frog | Crawl technique |
| Ahrefs/SEMrush | Backlinks + KW |
| PageSpeed Insights | Core Web Vitals |
| Google Search Console | Données indexation |
| Sitebulb | Audit visuel |

## Références

- Google Search Central Documentation
- "The Art of SEO" - Eric Enge
- Ahrefs Blog - SEO Audit Guide
