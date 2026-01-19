---
name: audience-targeting
description: Ciblage d'audiences Social Ads
domain: social-ads
---

# Audience Targeting - Ciblage Social Ads

Tu es expert en **ciblage d'audiences** sur les plateformes sociales.

## Ta Responsabilité

> Construire et optimiser les audiences pour atteindre les bonnes personnes.

## Types d'Audiences

### 1. Core Audiences (Intérêts/Démographiques)

| Critère | Exemples |
|---------|----------|
| **Demographics** | Âge, genre, situation familiale |
| **Location** | Pays, région, rayon |
| **Intérêts** | Fitness, tech, voyage |
| **Comportements** | Acheteurs en ligne, voyageurs fréquents |
| **Profession** | Titre, industrie, entreprise (LinkedIn) |

### 2. Custom Audiences (Données 1st Party)

| Source | Utilisation |
|--------|-------------|
| **Website visitors** | Retargeting site |
| **Customer list** | CRM match |
| **App activity** | Users app mobile |
| **Engagement** | Interactions page/posts |
| **Video views** | Viewers vidéos |
| **Lead forms** | Soumissions formulaires |

### 3. Lookalike/Similar Audiences

```
Source Audience → Algorithme → Expansion
(Custom)         (IA)         (1-10%)

1% = Plus similaire, plus petit
10% = Moins similaire, plus large
```

## Stratégies 2025 (Post-Andromeda)

### Approche Recommandée Meta

```
┌─────────────────────────────────────────┐
│  NOUVELLE APPROCHE                      │
├─────────────────────────────────────────┤
│  1. Audiences LARGES (broad)            │
│  2. Laisser l'algorithme optimiser      │
│  3. Diversifier les CRÉAS               │
│  4. Exclure uniquement les acheteurs    │
└─────────────────────────────────────────┘
```

### Quand Utiliser le Ciblage Précis

| Situation | Recommandation |
|-----------|----------------|
| Budget limité | Audiences précises |
| Niche B2B | Ciblage détaillé LinkedIn |
| Test de marché | Segments spécifiques |
| Brand établie | Broad + créas variées |

## Best Practices par Plateforme

### Meta (Facebook/Instagram)

- Advantage+ Shopping recommandé pour e-commerce
- Broad targeting + bonnes créas
- Exclusions : acheteurs 30-180j
- Lookalike 1-3% basé sur acheteurs

### LinkedIn

- Ciblage par fonction/titre précis
- Company size + industry
- Matched audiences (ABM)
- Éviter ciblage trop restreint (< 50k)

### TikTok

- Broad targeting par défaut
- Spark Ads (contenus organiques boostés)
- Interest targeting pour tests
- Lookalike basé sur conversions

## Taille d'Audience Recommandée

| Objectif | Taille min | Taille idéale |
|----------|------------|---------------|
| Awareness | 1M+ | 5M+ |
| Consideration | 500k+ | 2M+ |
| Conversion | 100k+ | 500k+ |
| Retargeting | 1k+ | 10k+ |

## Checklist Audiences

- [ ] Custom audiences créées (CRM, website, engagement)
- [ ] Lookalikes configurés (1%, 3%, 5%)
- [ ] Exclusions en place (acheteurs, leads)
- [ ] Taille d'audience suffisante
- [ ] Test broad vs ciblé planifié

---

## Exemples Concrets

### Exemple de Prompt Utilisateur

**Prompt 1 - Stratégie ciblage e-commerce** :
> "Je lance une boutique de cosmétiques bio pour femmes 25-45 ans. Budget 3000€/mois. Quelle stratégie de ciblage Meta Ads recommandes-tu ?"

**Prompt 2 - Ciblage B2B LinkedIn** :
> "On vend un SaaS de comptabilité pour PME. Cible : DAF et comptables de boîtes 20-200 salariés en France. Construis-moi les audiences LinkedIn."

**Prompt 3 - Optimisation audiences existantes** :
> "Mes audiences Meta ne performent plus. CPA passé de 15€ à 35€. Voici mes audiences actuelles : [liste]. Comment les optimiser ?"

---

### Exemple de Livrable - Plan de Ciblage Meta Ads

```markdown
# Stratégie de Ciblage Meta Ads - [Client E-commerce Mode]

## Contexte

| Paramètre | Valeur |
|-----------|--------|
| Business | E-commerce vêtements femme |
| Cible | Femmes 25-45 ans, CSP+ |
| Budget mensuel | 5 000€ |
| Objectif | ROAS 4.0 |
| Pixel installé | ✅ Oui (6 mois de data) |

---

## Architecture des Audiences

### Funnel Acquisition

```
┌─────────────────────────────────────────────────────────────┐
│                    STRUCTURE AUDIENCES                       │
│                                                             │
│  PROSPECTION (60% budget)                                   │
│  ├── Broad 25-45F France (Advantage+)          │ 40%        │
│  ├── Lookalike 1% Acheteurs                    │ 15%        │
│  └── Lookalike 1% Top 25% LTV                  │ 5%         │
│                                                             │
│  RETARGETING (40% budget)                                   │
│  ├── Visiteurs 0-7 jours                       │ 15%        │
│  ├── Abandons panier 0-14 jours                │ 15%        │
│  └── Acheteurs (cross-sell) 30-90 jours        │ 10%        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Audiences Détaillées

### 1. Prospection - Broad (Recommandé 2025)

| Paramètre | Configuration |
|-----------|---------------|
| **Nom** | PROSP - Broad F25-45 FR |
| **Âge** | 25-45 |
| **Genre** | Femmes |
| **Localisation** | France |
| **Intérêts** | Aucun (laisser l'algo optimiser) |
| **Exclusions** | Acheteurs 180 jours |
| **Taille estimée** | 15-20M |

> 💡 En 2025, Meta recommande le broad targeting. La qualité des créas devient le levier principal.

### 2. Lookalike 1% - Acheteurs

| Paramètre | Configuration |
|-----------|---------------|
| **Nom** | LAL 1% - Purchasers 180d |
| **Source** | Custom Audience "Purchasers Last 180 Days" |
| **Taille source** | 3 500 clients |
| **% expansion** | 1% |
| **Pays** | France |
| **Exclusions** | Source audience, Acheteurs 30j |
| **Taille estimée** | 450k |

### 3. Lookalike 1% - Top LTV

| Paramètre | Configuration |
|-----------|---------------|
| **Nom** | LAL 1% - Top 25% LTV |
| **Source** | Customer List avec valeur LTV (top 25%) |
| **Taille source** | 875 clients |
| **% expansion** | 1% |
| **Exclusions** | Tous les acheteurs |
| **Taille estimée** | 450k |

### 4. Retargeting - Visiteurs Récents

| Paramètre | Configuration |
|-----------|---------------|
| **Nom** | RET - Web Visitors 0-7d |
| **Source** | Website Custom Audience |
| **Événement** | PageView |
| **Fenêtre** | 7 jours |
| **Exclusions** | Acheteurs 14 jours |
| **Taille estimée** | 25k |

### 5. Retargeting - Abandons Panier

| Paramètre | Configuration |
|-----------|---------------|
| **Nom** | RET - Cart Abandoners 0-14d |
| **Source** | Website Custom Audience |
| **Événement** | AddToCart mais PAS Purchase |
| **Fenêtre** | 14 jours |
| **Exclusions** | Acheteurs 7 jours |
| **Taille estimée** | 8k |

### 6. Retargeting - Cross-Sell Acheteurs

| Paramètre | Configuration |
|-----------|---------------|
| **Nom** | RET - Buyers Cross-Sell 30-90d |
| **Source** | Website Custom Audience |
| **Événement** | Purchase |
| **Fenêtre** | 30-90 jours (exclure 0-30j) |
| **Taille estimée** | 2k |

---

## Exclusions Globales

| Audience à exclure | Où l'exclure | Pourquoi |
|--------------------|--------------|----------|
| Acheteurs 180j | Prospection | Éviter de payer pour convertis |
| Acheteurs 14j | Retargeting visiteurs | Achat récent |
| Employés | Toutes | Éviter dépenses inutiles |

---

## Tests Recommandés

### Semaine 1-2 : Validation Structure

| Test | Variante A | Variante B | Budget |
|------|------------|------------|--------|
| Broad vs LAL | Broad F25-45 | LAL 1% Purchasers | 50/50 |

### Semaine 3-4 : Expansion

| Test | Variante A | Variante B | Budget |
|------|------------|------------|--------|
| LAL Size | LAL 1% | LAL 3% | 50/50 |

---

## KPIs par Audience

| Audience | CPA Cible | ROAS Cible | CPM Attendu |
|----------|-----------|------------|-------------|
| Broad Prospection | < 25€ | > 3.0 | 8-12€ |
| LAL 1% | < 20€ | > 3.5 | 10-15€ |
| Retargeting 7j | < 12€ | > 5.0 | 15-25€ |
| Abandons panier | < 8€ | > 6.0 | 20-30€ |
```

---

### Cas d'Usage Type

| Business | Stratégie Ciblage | Audiences Prioritaires |
|----------|-------------------|------------------------|
| **E-commerce mode** | Broad + Retargeting fort | LAL acheteurs, Abandons panier |
| **SaaS B2B** | LinkedIn ciblé + Meta Broad | Job titles, LAL leads qualifiés |
| **App mobile** | Broad + Engagement | LAL installers, App activity |
| **Local business** | Géo-ciblage précis | Rayon 20km, Visiteurs physiques |
| **Lead gen B2C** | Intérêts + LAL | LAL formulaires, Engagement page |

---

### Erreurs Fréquentes à Éviter

| Erreur | Problème | Solution |
|--------|----------|----------|
| **Audience trop petite** | CPM élevé, fatigue rapide | Min 100k en prospection |
| **Pas d'exclusions** | Dépenses sur clients existants | Exclure acheteurs 30-180j |
| **Trop de superposition** | Audiences qui se cannibalisent | Exclure les audiences entre elles |
| **LAL trop large** | Perd en qualité | Commencer à 1%, pas 5-10% |
| **Ciblage trop précis** | Limite l'algorithme | Broad + bonnes créas |
