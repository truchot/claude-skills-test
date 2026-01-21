# /marketing - Commande Marketing

## Rôle

Point d'entrée pour toutes les tâches marketing : SEO, contenu, analytics, stratégie de visibilité.

## Architecture v2

```
/marketing [demande]
     │
     ▼
┌─────────────────────────────────────────┐
│           ORCHESTRATOR                   │
│  .web-agency/ORCHESTRATOR.md            │
└─────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│           AGENTS MARKETING               │
│  .web-agency/skills/marketing/           │
│                                          │
│  • seo.md        → SEO technique         │
│  • content.md    → Stratégie contenu     │
│  • analytics.md  → Tracking, reporting   │
│  • growth.md     → Acquisition, CRO      │
└─────────────────────────────────────────┘
```

## Comportement

1. **Analyse ta demande** marketing
2. **Identifie le domaine** : SEO, contenu, analytics, growth
3. **Charge l'agent** spécialisé
4. **Produit des livrables** actionnables

## Types de demandes

| Tu demandes... | Agent | Output |
|----------------|-------|--------|
| Audit SEO | `marketing/seo.md` | Rapport + quick wins |
| Optimiser une page | `marketing/seo.md` | Title, meta, structure |
| Recherche mots-clés | `marketing/seo.md` | Keywords + opportunités |
| Analyser les performances | `marketing/analytics.md` | Rapport + recommandations |
| Plan de tracking | `marketing/analytics.md` | Events, conversions, data layer |
| Créer du contenu | `marketing/content.md` | Brief éditorial |
| Calendrier éditorial | `marketing/content.md` | Planning contenu |
| Stratégie contenu | `marketing/content.md` | Piliers, mapping funnel |
| Audit conversion | `marketing/growth.md` | Funnel analysis + quick wins |
| Stratégie acquisition | `marketing/growth.md` | Mix canaux, budget, KPIs |
| Plan A/B testing | `marketing/growth.md` | Hypothèses, tests, métriques |
| Séquence email | `marketing/growth.md` | Nurturing sequence |

## Livrables types

### Audit SEO

```markdown
## Score global : 72/100

### Technique
| Critère | État | Action |
|---------|------|--------|
| HTTPS | ✅ | - |
| Mobile | ✅ | - |
| Core Web Vitals | ⚠️ | Optimiser LCP |
| Sitemap | ❌ | Créer sitemap.xml |

### Quick wins
1. Ajouter meta descriptions (impact: fort)
2. Corriger les H1 manquants (impact: moyen)
```

### Optimisation de page

```yaml
Page: /services
Mot-clé principal: "agence web paris"

Title:
  Actuel: "Services"
  Recommandé: "Agence Web Paris | Création de Sites & Applications"

Meta description:
  Actuel: (vide)
  Recommandé: "Agence web à Paris spécialisée en création de sites..."

Structure Hn:
  - H1: Nos Services
  - H2: Création de sites web
  - H2: Développement d'applications
  - H2: Maintenance et support
```

### Rapport Analytics

```markdown
## Période : Janvier 2024

### KPIs
| Métrique | Valeur | vs M-1 |
|----------|--------|--------|
| Sessions | 12,450 | +15% |
| Conversions | 234 | +8% |
| Taux conversion | 1.9% | -0.1% |

### Top pages
1. /services (2,340 sessions)
2. /contact (1,890 sessions)

### Recommandations
1. Améliorer le CTA sur /services
2. Réduire le taux de rebond sur /blog
```

## Utilisation

```
/marketing [description de ta demande]
```

## Exemples

```
/marketing Audit SEO du site
→ Agent: marketing/seo.md
→ Output: Rapport complet + priorités + roadmap

/marketing Optimiser la page /services pour "agence web paris"
→ Agent: marketing/seo.md
→ Output: Title, meta, structure Hn, mots-clés LSI

/marketing Rapport de performance mensuel
→ Agent: marketing/analytics.md
→ Output: KPIs, tendances, insights, recommandations

/marketing Brief pour article sur le headless commerce
→ Agent: marketing/content.md
→ Output: Structure, mots-clés, longueur, CTA, sources

/marketing Audit de conversion du funnel d'inscription
→ Agent: marketing/growth.md
→ Output: Taux par étape, frictions, tests A/B suggérés

/marketing Stratégie d'acquisition avec 5000€/mois
→ Agent: marketing/growth.md
→ Output: Mix canaux, budget, KPIs cibles, quick wins
```

## Principes

- **Data-driven** : Décisions basées sur les métriques
- **Quick wins first** : Impact maximal, effort minimal
- **User intent** : Comprendre ce que cherche l'utilisateur
- **Mesurable** : Toujours définir comment mesurer le succès
