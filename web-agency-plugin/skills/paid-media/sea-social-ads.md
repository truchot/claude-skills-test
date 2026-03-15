# SEA & Social Ads - Référence condensée

## Google Ads (SEA)

### Structure : `Compte → Campagne (objectif/budget) → Ad Group (thème) → Annonces + Keywords`

### Keyword strategy
| Type match | Syntaxe     | Reach  | Contrôle | Usage            |
|------------|-------------|--------|----------|------------------|
| Broad      | mot clé     | Large  | Faible   | Discovery        |
| Phrase     | "mot clé"   | Moyen  | Moyen    | Ciblage équilibré|
| Exact      | [mot clé]   | Étroit | Fort     | High intent      |
| Negative   | -mot        | -      | -        | Exclusion        |

### RSA (Responsive Search Ads)
```
Headlines (15 max, 30 car.) : H1 [Keyword] pin1 | H2 [Bénéfice] | H3 [CTA]
Descriptions (4 max, 90 car.) : D1 Produit+bénéfice | D2 Offre+urgence+preuve
```

### Quality Score
| Facteur            | Poids | Optimisation                     |
|--------------------|-------|----------------------------------|
| CTR attendu        | ~40%  | Annonces pertinentes, extensions |
| Pertinence annonce | ~30%  | Keyword dans titre + description |
| Exp. landing page  | ~30%  | Vitesse, pertinence, mobile      |

### Extensions (impact CTR)
Sitelinks (+10-20%) | Callout (+5-10%) | Price (+10-15%) | Image (+10%) | Call

### Bidding
| Stratégie        | Usage        | Prérequis       |
|------------------|--------------|-----------------|
| Manual CPC       | Démarrage    | -               |
| Target CPA       | Conversions  | 30+ conv/mois   |
| Target ROAS      | Revenue      | 50+ conv/mois   |
| Max Conversions   | Volume      | Budget fixe     |

## Social Ads (Meta, LinkedIn, TikTok)

### Structure Meta : `Campagne (objectif) → Ad Set (audience+placement) → Ad (créatif)`

### Audiences Meta
| Type          | Taille     | ROAS      |
|---------------|------------|-----------|
| Retargeting   | Petite     | Très fort |
| Lookalike 1%  | Moyenne    | Fort      |
| Custom (CRM)  | Variable  | Fort      |
| Interest-based| Large      | Moyen     |
| Broad         | Très large | Variable  |

### Retargeting fenêtres
| Audience          | Fenêtre | Message             |
|-------------------|---------|---------------------|
| Visiteurs site    | 7j      | Rappel + offre      |
| Abandon panier    | 3j      | Urgence + incentive |
| Engagers social   | 14j     | Social proof        |
| Acheteurs         | 90j     | Cross-sell/Exclure  |

### Créas par plateforme
| Plateforme  | Format star       | Ratio    | Vidéo    |
|-------------|-------------------|----------|----------|
| Meta Feed   | Vidéo/Carrousel   | 1:1, 4:5 | 15-30s  |
| Meta Stories| Vidéo verticale   | 9:16     | 5-15s   |
| LinkedIn    | Image + texte long| 1.91:1   | -       |
| TikTok      | UGC-style vidéo   | 9:16     | 15-30s  |

### Creative testing
```
Phase 1: Angles (3-5 messages) → Phase 2: Formats (image/vidéo/carrousel)
→ Phase 3: Hooks (3 premières sec) → Phase 4: Itérer sur gagnant
```

## Métriques clés
| Métrique | Formule                | Bench SEA | Bench Social |
|----------|------------------------|-----------|--------------|
| CTR      | Clics / Impressions    | 3-5%      | 1-2%         |
| CPC      | Coût / Clics           | 0.5-3€    | 0.3-1.5€     |
| CVR      | Conversions / Clics    | 3-5%      | 1-3%         |
| ROAS     | Revenue / Dépense      | > 4x      | > 3x         |

## Checklist lancement ads
- [ ] Objectif SMART, audiences + exclusions configurées
- [ ] Créas validées (formats + messages)
- [ ] Landing page live et trackée, pixel vérifié
- [ ] Budget, enchères, UTMs configurés
- [ ] A/B test créas planifié
- [ ] Alertes budget/performance activées
