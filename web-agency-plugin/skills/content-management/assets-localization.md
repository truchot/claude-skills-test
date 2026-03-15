# Assets & Localization - Référence condensée

## Optimisation images

### Formats recommandés
| Format | Usage              | Support   | Cible taille |
|--------|--------------------|-----------|--------------|
| WebP   | Standard web       | 97%+      | < 100KB      |
| AVIF   | Perf maximale      | 85%       | < 80KB       |
| JPEG   | Fallback photos    | Universel | < 200KB      |
| PNG    | Transparence       | Universel | < 150KB      |
| SVG    | Icônes, logos      | Universel | < 5KB        |

### Compression par type
| Image        | Qualité | Format | Poids max |
|--------------|---------|--------|-----------|
| Hero banner  | 85%     | WebP   | 200KB     |
| Photo produit| 80%     | WebP   | 100KB     |
| Illustration | 90%     | WebP   | 80KB      |
| Thumbnail    | 75%     | WebP   | 20KB      |
| Icône        | Lossless| SVG    | 5KB       |

### Pattern srcset responsive
```html
<img src="/img-800w.webp"
  srcset="/img-400w.webp 400w, /img-800w.webp 800w,
         /img-1200w.webp 1200w, /img-1600w.webp 1600w"
  sizes="(max-width:600px) 100vw, (max-width:1200px) 50vw, 800px"
  alt="Description" loading="lazy" decoding="async">
```

### Pipeline : `Upload → Validation → Compression → Resize → WebP+Fallback → CDN`

## Gestion vidéo

### Specs par type
| Type        | Durée    | Codec | Résolution | Hosting      |
|-------------|----------|-------|------------|--------------|
| Hero/Banner | 15-30s   | H.264 | 1080p      | Self/CDN     |
| Tutoriel    | 3-10min  | H.264 | 1080p      | YouTube/Vimeo|
| Témoignage  | 1-3min   | H.264 | 1080p      | YouTube      |
| Story/Reel  | 15-60s   | H.264 | 1080x1920  | Insta/TikTok |

### Accessibilité vidéo
- [ ] Sous-titres WebVTT (.vtt)
- [ ] Transcription HTML/PDF
- [ ] Contrôles clavier
- [ ] Audio description (recommandé)

## Organisation assets

### Structure dossiers
```
/assets
├── /images/{blog,products,banners,icons}
├── /videos/{tutorials,testimonials,demos}
├── /documents/{whitepapers,case-studies,legal}
└── /brand/{logos,colors,templates}
```

### Convention nommage
| Pattern                       | Exemple                    |
|-------------------------------|----------------------------|
| `{type}-{desc}-{date}`       | `banner-spring-2026.webp`  |
| `{product}-{variant}-{angle}`| `shoe-red-front.jpg`       |
| `{page}-{section}-{device}`  | `home-hero-mobile.png`     |

### Alt text WCAG 2.1 AA
| Type image    | Alt text              | Règle             |
|---------------|-----------------------|-------------------|
| Informative   | Description contenu   | Requis            |
| Décorative    | `alt=""`              | Vide obligatoire  |
| Fonctionnelle | Action/destination    | Requis            |
| Complexe      | Description + longdesc| Requis            |

## Localisation (i18n)

### Workflow traduction
```
Source (fr-FR) → Traduction → Révision native → Adaptation locale → QA → Publication
```

### Langues - priorités type
| Langue     | Code  | Priorité | Couverture cible |
|------------|-------|----------|-----------------|
| Français   | fr-FR | Source   | 100%            |
| Anglais    | en-US | P1       | 100%            |
| Allemand   | de-DE | P2       | 80%             |
| Espagnol   | es-ES | P2       | 80%             |

### Structure fichiers i18n
```json
// Format ICU recommandé
{
  "items.count": "{count, plural, =0 {Aucun article} one {# article} other {# articles}}",
  "user.greeting": "Bonjour {name} !"
}
```

### Checklist validation i18n
- [ ] Toutes les clés présentes dans toutes les langues
- [ ] Pas de texte hardcodé dans le code
- [ ] Pluriels gérés (ICU format)
- [ ] Encodage UTF-8 sans BOM
- [ ] Fallback langue défini
- [ ] Direction RTL supportée si nécessaire
- [ ] Formats locaux (dates, nombres, monnaies) via `Intl` API

### Adaptation culturelle - checklist
- [ ] Formats date/heure adaptés
- [ ] Séparateurs numériques corrects
- [ ] Symboles monétaires bien placés
- [ ] Unités de mesure (métrique vs impérial)
- [ ] Références culturelles localisées
- [ ] Images et couleurs appropriées
- [ ] Mentions légales locales

### Outils recommandés
| Outil       | Usage           | Type      |
|-------------|-----------------|-----------|
| i18next     | Framework React | npm       |
| FormatJS    | ICU Messages    | npm       |
| Phrase      | TMS             | API/CLI   |
| Lokalise    | TMS             | API/CLI   |
| Sharp       | Images Node.js  | Library   |
| Cloudinary  | CDN + transform | Service   |
