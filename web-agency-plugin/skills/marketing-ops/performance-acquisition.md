# Performance & Acquisition - Référence condensée

## Email Marketing

### Types d'emails
| Type            | Objectif            | Fréquence        | Open rate cible |
|-----------------|---------------------|------------------|-----------------|
| Newsletter      | Engagement, valeur  | 1x/semaine       | > 25%           |
| Promotional     | Vente directe       | 2-4x/mois        | > 20%           |
| Transactionnel  | Confirmation, suivi | Sur événement    | > 60%           |
| Nurturing       | Lead → client       | Séquence auto    | > 30%           |

### Bonnes pratiques email
- [ ] Subject line < 50 caractères, personnalisée
- [ ] Preheader optimisé (40-130 car.)
- [ ] 1 seul CTA principal, visible
- [ ] Design responsive (mobile-first)
- [ ] Ratio texte/image > 60/40
- [ ] Lien désinscription clair
- [ ] A/B test systématique (objet, CTA)
- [ ] Envoi optimal : mardi/jeudi 10h-11h

### Délivrabilité
| Action                  | Impact    |
|-------------------------|-----------|
| SPF + DKIM + DMARC      | Critique  |
| Nettoyage liste 90j     | Fort      |
| Double opt-in           | Fort      |
| Warm-up nouveau domaine | Critique  |
| Monitoring spam score   | Préventif |

## Growth Hacking

### Framework AARRR (Pirate Metrics)
```
Acquisition  → Comment ils arrivent ?      (Trafic, CPV)
Activation   → 1ère expérience positive ?  (Sign-up, onboarding)
Rétention    → Ils reviennent ?            (DAU/MAU, churn)
Revenue      → Ils paient ?               (ARPU, LTV)
Referral     → Ils recommandent ?          (NPS, viralité)
```

### Tactiques par étape
| Étape       | Tactiques                                    |
|-------------|----------------------------------------------|
| Acquisition | SEO content, social ads, partnerships        |
| Activation  | Onboarding email, trial étendu, quick win    |
| Rétention   | Drip emails, feature updates, communauté     |
| Revenue     | Upsell in-app, pricing tiers, annual plans   |
| Referral    | Programme parrainage, avis incentivés        |

## Conversion Rate Optimization (CRO)

### Funnel standard et benchmarks
```
Visiteur → Lead    : 2-5% (B2B) / 1-3% (B2C)
Lead → MQL         : 30-40%
MQL → SQL          : 40-60%
SQL → Client       : 20-30%
```

### Éléments à optimiser (par impact)
| Élément              | Impact  | Test type   |
|----------------------|---------|-------------|
| Value proposition    | Très fort| Message test|
| CTA (texte + design)| Fort    | A/B test    |
| Social proof         | Fort    | Placement   |
| Form (nb champs)    | Fort    | Réduction   |
| Page speed           | Fort    | Technique   |
| Pricing presentation | Très fort| Layout test |

### Heatmaps & Session recording
| Outil       | Usage                    | Prix      |
|-------------|--------------------------|-----------|
| Hotjar      | Heatmaps, recordings     | Freemium  |
| Microsoft Clarity| Heatmaps, gratuit   | Gratuit   |
| FullStory   | Enterprise analytics     | Premium   |
| Contentsquare| Digital experience     | Enterprise|

## Personnalisation

### Niveaux de personnalisation
| Niveau      | Exemple                            | Complexité |
|-------------|------------------------------------|------------|
| Basique     | Prénom dans email                  | Faible     |
| Segment     | Contenu par industrie/persona      | Moyen      |
| Comportemental| Reco basée sur navigation       | Élevé      |
| Prédictif   | Next best action (ML)              | Très élevé |

### Cas d'usage prioritaires
```
1. Homepage dynamique par segment (new vs returning)
2. Recommandations produit par historique
3. Email contenu basé sur intérêts détectés
4. Pop-up sortie personnalisé par page
5. Pricing adapté par pays/device
```

## Funnel Optimization

### Diagnostic rapide
| Symptôme                | Diagnostic probable        | Action                |
|-------------------------|----------------------------|-----------------------|
| Trafic OK, leads bas    | LP ou offre faible         | Revoir proposition    |
| Leads OK, MQL bas       | Mauvais ciblage            | Affiner audiences     |
| MQL OK, SQL bas         | Nurturing insuffisant      | Optimiser séquences   |
| SQL OK, close rate bas  | Process vente ou pricing   | Aligner sales/mktg    |

### Métriques CRO
| Métrique           | Formule                         | Cible        |
|--------------------|---------------------------------|--------------|
| CVR global         | Conversions / Visiteurs         | > 2%         |
| CVR par étape      | Sortie étape / Entrée étape     | Identifier drops|
| Revenue per visitor| Revenue / Visiteurs uniques     | En hausse MoM|
| CAC                | Coût total mktg / Nouveaux clients| < LTV/3   |
| LTV                | ARPU x Durée moyenne client     | > 3x CAC     |

## Checklist acquisition
- [ ] Canaux définis par persona et étape funnel
- [ ] Budget alloué par canal avec ROAS cible
- [ ] Landing pages optimisées et A/B testées
- [ ] Lead scoring configuré et calibré
- [ ] Séquences nurturing actives
- [ ] CRO : 1 test en cours en permanence
- [ ] Reporting hebdo CAC, CPL, CVR par canal
- [ ] Review trimestrielle channel mix
