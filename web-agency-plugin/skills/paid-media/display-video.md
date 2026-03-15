# Display & Video Ads - Référence condensée

## Programmatique

### Chaîne : `Annonceur → DSP → Ad Exchange ← SSP ← Publisher`

### Types d'inventaire
| Type                    | CPM     | Qualité  | Garantie |
|-------------------------|---------|----------|----------|
| Open Exchange (RTB)     | 0.5-5€  | Variable | Non      |
| Private Marketplace     | 5-15€   | Bonne    | Non      |
| Preferred Deal          | 5-20€   | Bonne    | Prix fixe|
| Programmatic Guaranteed | 10-30€  | Premium  | Oui      |

### DSP principales
| DSP            | Forces                     | Usage      |
|----------------|----------------------------|------------|
| Google DV360   | Intégration Google, YouTube | Enterprise |
| The Trade Desk | Indépendant, CTV, UID 2.0  | Premium    |
| Amazon DSP     | Data commerce, Fire TV      | E-commerce |

## Display - Formats
| Format           | Taille  | Placement     |
|------------------|---------|---------------|
| Medium Rectangle | 300x250 | Universel     |
| Leaderboard      | 728x90  | Desktop header|
| Wide Skyscraper  | 160x600 | Sidebar       |
| Mobile Banner    | 320x50  | Mobile        |
| Billboard        | 970x250 | Impact        |

### Audiences post-cookie (2025+)
| Solution       | Description           | Priorité   |
|----------------|-----------------------|------------|
| 1st Party data | CRM, site visitors    | Haute      |
| Contextual     | Ciblage contenu page  | Haute      |
| UID 2.0        | ID universel consenti | Croissante |
| Clean Rooms    | Data collaboration    | Enterprise |

## Brand Safety
- [ ] Verification vendor (IAS / DoubleVerify) intégré
- [ ] Blacklists catégories sensibles, ads.txt vérifié
- [ ] IVT filtering activé, viewability > 70%

| Métrique           | Seuil min |
|--------------------|-----------|
| Brand safety rate  | > 95%     |
| Viewability        | > 70%     |
| IVT rate           | < 5%      |

## Video Ads

### Formats par durée
| Format        | Durée  | Skip     | Facturation | Usage            |
|---------------|--------|----------|-------------|------------------|
| Bumper        | 6s     | Non      | CPM         | Recall, frequency|
| Pre-roll      | 15s    | Non      | CPM         | Message complet  |
| TrueView      | 15-60s | Oui (5s) | CPV         | Engagement       |
| Discovery     | Var.   | -        | CPC         | YouTube search   |
| Shorts ads    | 10-60s | -        | CPV         | Gen Z, mobile    |

### YouTube - types campagnes
| Type         | Objectif   | Bidding         |
|--------------|------------|-----------------|
| Video Reach  | Awareness  | Target CPM      |
| Video Views  | Engagement | Max CPV         |
| Video Action | Conversion | Target CPA      |
| Demand Gen   | Full-funnel| Max conversions |

### Creative - Framework ABCD (Google)
```
A-Attract : Hook 5 premières secondes  |  B-Brand : Marque visible < 5s
C-Connect : Émotion, storytelling      |  D-Direct : CTA clair
```

### Specs vidéo : H.264/AAC, 1080p 5-8Mbps, 16:9 (horizontal) ou 9:16 (vertical)

## CTV (Connected TV)

### Avantages vs TV linéaire
| Critère     | TV Linéaire   | CTV              |
|-------------|---------------|------------------|
| Ciblage     | Demo basique  | 1st/3rd party    |
| Mesure      | GRP estimé    | Impressions exactes|
| Frequency   | Difficile     | Contrôlable      |
| Flexibilité | Planning long | Temps réel       |

### KPIs CTV
| Métrique        | Benchmark      |
|-----------------|----------------|
| Completion rate | > 90%          |
| Frequency       | 3-7/foyer/mois |
| Brand lift      | +5-15%         |

## Checklist campagne display/video
- [ ] DSP configuré, pixels installés et testés
- [ ] Audiences importées, brand safety activé
- [ ] Créas multi-format, frequency caps (3-5/user/jour)
- [ ] Deals PMP si premium, pacing budget configuré
- [ ] Attribution cross-canal, reporting automatisé
