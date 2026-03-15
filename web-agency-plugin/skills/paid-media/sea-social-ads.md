# SEA & Social Ads - Référence condensée

## Google Ads (SEA)

### Structure de compte
```
Compte → Campagne (objectif/budget) → Groupe d'annonces (thème) → Annonces + Keywords
```

### Naming convention
```
[Canal]_[Objectif]_[Audience]_[Geo]_[Date]
Ex: SEA_Conv_Brand_FR_Mar26
```

### Keyword strategy

| Type match   | Syntaxe        | Reach   | Contrôle | Usage               |
|--------------|----------------|---------|----------|---------------------|
| Broad        | mot clé        | Large   | Faible   | Discovery           |
| Phrase        | "mot clé"     | Moyen   | Moyen    | Ciblage équilibré   |
| Exact         | [mot clé]     | Étroit  | Fort     | High intent         |
| Negative      | -mot          | -       | -        | Exclusion           |

### RSA (Responsive Search Ads)
```
Headlines (15 max, 30 car.) :
  H1: [Keyword principal]         ← pin position 1
  H2: [Bénéfice / offre]
  H3: [CTA / différenciateur]

Descriptions (4 max, 90 car.) :
  D1: Produit + bénéfice principal
  D2: Offre + urgence + preuve sociale
```

### Quality Score - leviers
| Facteur              | Poids | Optimisation                    |
|----------------------|-------|---------------------------------|
| CTR attendu          | ~40%  | Annonces pertinentes, extensions|
| Pertinence annonce   | ~30%  | Keyword dans titre + description|
| Exp. landing page    | ~30%  | Vitesse, pertinence, mobile     |

### Extensions (Assets)
| Extension    | Usage                | Impact CTR |
|--------------|----------------------|------------|
| Sitelinks    | Liens additionnels   | +10-20%    |
| Callout      | USPs courtes         | +5-10%     |
| Structured   | Catégories           | +5%        |
| Call         | Numéro téléphone     | Variable   |
| Price        | Tarifs               | +10-15%    |
| Image        | Visuel produit       | +10%       |

### Bidding strategies
| Stratégie              | Usage                  | Prérequis          |
|------------------------|------------------------|--------------------|
| Manual CPC             | Contrôle, démarrage    | -                  |
| Max Clicks             | Trafic                 | -                  |
| Target CPA             | Conversions            | 30+ conv/mois      |
| Target ROAS            | Revenue                | 50+ conv/mois      |
| Max Conversions        | Volume                 | Budget fixe        |

## Social Ads (Meta, LinkedIn, TikTok)

### Objectifs par plateforme

| Objectif       | Meta              | LinkedIn         | TikTok          |
|----------------|-------------------|------------------|-----------------|
| Awareness      | Reach, Video views| Brand awareness  | Reach           |
| Consideration  | Traffic, Engagement| Website visits  | Traffic         |
| Conversion     | Conversions, Sales| Lead gen forms   | Conversions     |

### Structure campagne Meta
```
Campagne (objectif + budget)
  └── Ad Set (audience + placement + enchère)
       └── Ad (créatif + texte + CTA)
```

### Audiences Meta
| Type           | Description              | Taille    | ROAS    |
|----------------|--------------------------|-----------|---------|
| Lookalike 1%   | Similaire aux clients    | Moyenne   | Fort    |
| Retargeting    | Visiteurs site/engagers  | Petite    | Très fort|
| Interest-based | Par centres d'intérêt    | Large     | Moyen   |
| Custom audience| CRM upload               | Variable  | Fort    |
| Broad          | Aucun ciblage spécifique | Très large| Variable|

### Retargeting - fenêtres
| Audience                  | Fenêtre   | Message            |
|---------------------------|-----------|--------------------|
| Visiteurs site            | 7 jours   | Rappel + offre     |
| Visiteurs site            | 30 jours  | Contenu valeur     |
| Abandon panier            | 3 jours   | Urgence + incentive|
| Engagers social           | 14 jours  | Social proof       |
| Acheteurs (exclure ou upsell)| 90 jours| Cross-sell       |

### Créas - bonnes pratiques
| Plateforme | Format star        | Ratio   | Durée vidéo |
|------------|--------------------|---------|-------------|
| Meta Feed  | Vidéo/Carrousel    | 1:1, 4:5| 15-30s      |
| Meta Stories| Vidéo verticale   | 9:16    | 5-15s       |
| LinkedIn   | Image + texte long | 1.91:1  | -           |
| TikTok     | UGC-style vidéo    | 9:16    | 15-30s      |

### Creative testing framework
```
Phase 1 : Tester les angles (3-5 messages différents)
Phase 2 : Tester les formats (image vs vidéo vs carrousel)
Phase 3 : Tester les hooks (3 premières secondes)
Phase 4 : Itérer sur le gagnant (variantes)
```

## Métriques clés

| Métrique | Formule                    | Benchmark SEA | Benchmark Social |
|----------|----------------------------|---------------|------------------|
| CTR      | Clics / Impressions        | 3-5%          | 1-2%             |
| CPC      | Coût / Clics               | 0.5-3€        | 0.3-1.5€         |
| CVR      | Conversions / Clics        | 3-5%          | 1-3%             |
| CPA      | Coût / Conversions         | Variable      | Variable         |
| ROAS     | Revenue / Dépense          | > 4x          | > 3x             |

## Checklist lancement campagne ads
- [ ] Objectif SMART défini
- [ ] Audiences configurées (ciblage + exclusions)
- [ ] Créas validées (formats + messages)
- [ ] Landing page live et trackée
- [ ] Pixel/conversion tracking vérifié
- [ ] Budget et enchères configurés
- [ ] UTMs en place
- [ ] A/B test créas planifié
- [ ] Alertes budget/performance activées
