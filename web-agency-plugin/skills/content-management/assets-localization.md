# Assets & Localization - Référence condensée

## Optimisation images

### Formats et compression
| Format | Usage           | Support | Image type   | Qualité | Poids max |
|--------|-----------------|---------|--------------|---------|-----------|
| WebP   | Standard web    | 97%+    | Hero banner  | 85%     | 200KB     |
| AVIF   | Perf maximale   | 85%     | Photo produit| 80%     | 100KB     |
| SVG    | Icônes, logos   | 100%    | Icône        | Lossless| 5KB       |
| JPEG   | Fallback        | 100%    | Thumbnail    | 75%     | 20KB      |

### Pattern srcset responsive
```html
<img src="/img-800w.webp"
  srcset="/img-400w.webp 400w, /img-800w.webp 800w,
         /img-1200w.webp 1200w, /img-1600w.webp 1600w"
  sizes="(max-width:600px) 100vw, (max-width:1200px) 50vw, 800px"
  alt="Description" loading="lazy" decoding="async">
```

**Pipeline** : `Upload → Validation → Compression → Resize → WebP+Fallback → CDN`

## Gestion vidéo

| Type       | Durée   | Résolution | Hosting       |
|------------|---------|------------|---------------|
| Hero       | 15-30s  | 1080p 16:9 | Self/CDN      |
| Tutoriel   | 3-10min | 1080p 16:9 | YouTube/Vimeo |
| Story/Reel | 15-60s  | 1080x1920  | Insta/TikTok  |

**Accessibilité** : sous-titres VTT + transcription + contrôles clavier

## Organisation assets

### Structure et nommage
```
/assets/{images,videos,documents,brand}/{sous-catégorie}/
Nommage : {type}-{desc}-{date}.ext  (ex: banner-spring-2026.webp)
```

### Alt text WCAG 2.1 AA
| Type image    | Alt text            | Règle            |
|---------------|---------------------|------------------|
| Informative   | Description contenu | Requis           |
| Décorative    | `alt=""`            | Vide obligatoire |
| Fonctionnelle | Action/destination  | Requis           |

## Localisation (i18n)

### Workflow
```
Source (fr-FR) → Traduction → Révision native → Adaptation locale → QA → Publication
```

### Priorités langues type
| Langue   | Code  | Priorité | Couverture |
|----------|-------|----------|------------|
| Français | fr-FR | Source   | 100%       |
| Anglais  | en-US | P1       | 100%       |
| Allemand | de-DE | P2       | 80%        |
| Espagnol | es-ES | P2       | 80%        |

### Format ICU recommandé
```json
{
  "items.count": "{count, plural, =0 {Aucun} one {# article} other {# articles}}",
  "user.greeting": "Bonjour {name} !"
}
```

### Checklist i18n
- [ ] Toutes les clés présentes dans toutes les langues
- [ ] Pas de texte hardcodé dans le code
- [ ] Pluriels gérés (ICU), encodage UTF-8 sans BOM
- [ ] Fallback langue défini, direction RTL si nécessaire
- [ ] Formats locaux (dates, nombres, monnaies) via `Intl` API

### Adaptation culturelle
- [ ] Formats date/heure et séparateurs numériques adaptés
- [ ] Symboles monétaires, unités de mesure localisées
- [ ] Références culturelles et images appropriées
- [ ] Mentions légales locales

### Outils
| Outil      | Usage          | Type    |
|------------|----------------|---------|
| i18next    | Framework React| npm     |
| FormatJS   | ICU Messages   | npm     |
| Phrase     | TMS            | API/CLI |
| Sharp      | Images Node.js | Library |
| Cloudinary | CDN + transform| Service |
