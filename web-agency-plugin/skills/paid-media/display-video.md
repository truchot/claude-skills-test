# Display & Video Ads - Référence condensée

## Programmatique - Écosystème

### Chaîne d'achat
```
Annonceur → DSP → Ad Exchange ← SSP ← Publisher
```

### Types d'inventaire
| Type                    | CPM range | Qualité  | Garantie |
|-------------------------|-----------|----------|----------|
| Open Exchange (RTB)     | 0.5-5€   | Variable | Non      |
| Private Marketplace     | 5-15€    | Bonne    | Non      |
| Preferred Deal          | 5-20€    | Bonne    | Prix fixe|
| Programmatic Guaranteed | 10-30€   | Premium  | Oui      |

### Principales DSP
| DSP             | Forces                      | Usage       |
|-----------------|-----------------------------|-------------|
| Google DV360    | Intégration Google, YouTube  | Enterprise  |
| The Trade Desk  | Indépendant, CTV, UID 2.0   | Premium     |
| Amazon DSP      | Data commerce, Fire TV       | E-commerce  |
| Xandr           | Microsoft inventory          | Video       |

## Display - Formats et specs

### Tailles standard
| Format            | Taille   | Placement      |
|-------------------|----------|----------------|
| Medium Rectangle  | 300x250  | Universel      |
| Leaderboard       | 728x90   | Desktop header |
| Wide Skyscraper   | 160x600  | Sidebar        |
| Mobile Banner     | 320x50   | Mobile         |
| Billboard         | 970x250  | Impact         |
| Large Rectangle   | 336x280  | In-content     |

### Audiences programmatiques

**Ère post-cookie (2025+)**
| Solution        | Description              | Priorité    |
|-----------------|--------------------------|-------------|
| 1st Party data  | CRM, site visitors       | Haute       |
| Contextual      | Ciblage contenu page     | Haute       |
| UID 2.0         | ID universel consenti    | Croissante  |
| Privacy Sandbox | Google Topics API        | En cours    |
| Clean Rooms     | Data collaboration       | Enterprise  |

**Segments clés**
| Segment     | Source          | Usage              |
|-------------|-----------------|-------------------|
| In-market   | Intent signals  | Performance        |
| Affinity    | Comportement LT | Awareness          |
| Retargeting | 1st party       | Conversion         |
| Lookalike   | Modélisation    | Scale              |
| B2B intent  | Bombora, G2     | Ciblage entreprise |

## Brand Safety

### Protection obligatoire
- [ ] Verification vendor intégré (IAS, DoubleVerify)
- [ ] Blacklists catégories sensibles appliquées
- [ ] ads.txt / sellers.json vérifiés
- [ ] IVT (Invalid Traffic) filtering activé
- [ ] Viewability threshold > 70%
- [ ] Alertes brand safety automatisées

### Seuils acceptables
| Métrique          | Minimum  |
|-------------------|----------|
| Brand safety rate | > 95%    |
| Viewability       | > 70%    |
| IVT rate          | < 5%     |
| Domain transparency| > 90%   |

## Video Ads - Formats

### Par durée et usage
| Format         | Durée   | Skip    | Usage              | Facturation |
|----------------|---------|---------|--------------------|-----------  |
| Bumper         | 6s      | Non     | Recall, frequency  | CPM         |
| Pre-roll court | 15s     | Non     | Message complet    | CPM         |
| TrueView       | 15-60s  | Oui (5s)| Engagement        | CPV         |
| Discovery      | Variable| -       | YouTube search     | CPC         |
| Shorts ads     | 10-60s  | -       | Gen Z, mobile      | CPV         |

### YouTube Ads - structure
| Type campagne  | Objectif    | Formats            | Bidding         |
|----------------|-------------|--------------------| ----------------|
| Video Reach    | Awareness   | Bumper, In-stream  | Target CPM      |
| Video Views    | Engagement  | Skippable, Discovery| Max CPV        |
| Video Action   | Conversion  | TrueView for Action| Target CPA     |
| Demand Gen     | Full-funnel | Multi-format       | Max conversions |

### Creative best practices
```
ABCD Framework (Google) :
A - Attract  : Hook en 5 premières secondes
B - Brand    : Montrer la marque tôt (< 5s)
C - Connect  : Émotion et storytelling
D - Direct   : CTA clair et visible
```

### Specs techniques vidéo
```
Codec    : H.264 (MP4) / VP9 (WebM)
Audio    : AAC 128-320 kbps
1080p    : 5-8 Mbps, 16:9
Vertical : 1080x1920, 9:16
```

## CTV (Connected TV)

### Avantages vs TV linéaire
| Critère      | TV Linéaire    | CTV              |
|--------------|----------------|------------------|
| Ciblage      | Demo basique   | 1st/3rd party    |
| Mesure       | GRP estimé     | Impressions exactes|
| Frequency    | Difficile      | Contrôlable      |
| Attribution  | Complexe       | Digital-native   |
| Flexibilité  | Planning long  | Temps réel       |

### KPIs CTV
| Métrique        | Benchmark     |
|-----------------|---------------|
| Completion rate | > 90%         |
| Frequency       | 3-7/foyer/mois|
| Brand lift      | +5-15%        |
| Visit lift      | +10-30%       |

## Checklist campagne display/video
- [ ] DSP configuré, pixels installés
- [ ] Audiences importées et activées
- [ ] Brand safety et viewability configurés
- [ ] Deals PMP négociés si premium
- [ ] Créas multi-format produites
- [ ] Frequency caps définis (3-5/user/jour)
- [ ] Pacing budget configuré (even/front-loaded)
- [ ] Attribution cross-canal en place
- [ ] Reporting automatisé
