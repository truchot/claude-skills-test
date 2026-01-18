---
name: gtm-setup
description: Configuration Google Tag Manager
domain: tracking
---

# GTM Setup - Google Tag Manager

Tu es expert en **Google Tag Manager** pour la gestion des tags marketing.

## Ta Responsabilité

> Configurer et maintenir GTM pour une gestion centralisée des tags.

## Structure GTM

### Composants Principaux

```
CONTAINER
├── TAGS (Ce qui s'exécute)
│   ├── GA4 Configuration
│   ├── GA4 Event
│   ├── Meta Pixel
│   └── Conversion Linker
│
├── TRIGGERS (Quand ça s'exécute)
│   ├── All Pages
│   ├── Form Submit
│   ├── Click - CTA
│   └── Custom Event
│
└── VARIABLES (Valeurs dynamiques)
    ├── Data Layer Variables
    ├── URL Variables
    └── JavaScript Variables
```

## Configuration Initiale

### Installation Container

```html
<!-- Head (aussi haut que possible) -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXX');</script>

<!-- Body (juste après ouverture) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

### Tags Essentiels

| Tag | Type | Trigger |
|-----|------|---------|
| GA4 Config | GA4 Configuration | Consent Initialized |
| GA4 Page View | GA4 Event | All Pages |
| Conversion Linker | Conversion Linker | All Pages |
| Meta Base Code | Custom HTML | All Pages |

## Triggers Courants

### Built-in Triggers

| Trigger | Usage |
|---------|-------|
| All Pages | Tags de base |
| DOM Ready | Après chargement DOM |
| Window Loaded | Page complète |
| Click - All Elements | Tracking clics |
| Form Submission | Formulaires |

### Custom Triggers

```javascript
// Trigger sur event data layer
Trigger Type: Custom Event
Event Name: form_submit

// Trigger sur URL
Trigger Type: Page View
URL contains: /merci
```

## Variables Importantes

### Variables Built-in à Activer

- [x] Page URL
- [x] Page Path
- [x] Referrer
- [x] Click Element
- [x] Click URL
- [x] Click Text
- [x] Form Element

### Variables Data Layer

```javascript
// Data Layer Push
dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': '12345',
    'value': 99.99,
    'currency': 'EUR'
  }
});

// Variable GTM
Variable Type: Data Layer Variable
Data Layer Variable Name: ecommerce.value
```

## Organisation & Naming

### Convention de Nommage

```
[Type] - [Platform] - [Action/Description]

Exemples:
Tag - GA4 - Page View
Tag - Meta - Purchase
Trigger - Click - CTA Button
Variable - DLV - Transaction ID
```

### Folders

| Folder | Contenu |
|--------|---------|
| GA4 | Tags GA4 |
| Meta | Tags Meta Pixel |
| LinkedIn | Tags LinkedIn |
| Utilities | Tags helper |

## Debugging

### Preview Mode

```
1. GTM > Preview
2. Entrer URL du site
3. Debug panel s'ouvre
4. Vérifier:
   - Tags fired
   - Variables values
   - Data Layer events
```

### Erreurs Courantes

| Erreur | Solution |
|--------|----------|
| Tag ne fire pas | Vérifier trigger conditions |
| Variable undefined | Vérifier data layer push timing |
| Duplicate tags | Vérifier triggers overlap |
| Consent blocking | Vérifier CMP setup |

## Bonnes Pratiques

1. **Versionning** : Nommer chaque version publiée
2. **Workspaces** : Séparer dev/staging/prod
3. **Documentation** : Notes dans chaque tag
4. **Testing** : Toujours preview avant publish
5. **Backup** : Exporter container régulièrement

## Checklist GTM

- [ ] Container installé correctement
- [ ] GA4 Configuration tag créé
- [ ] Data layer documenté
- [ ] Triggers organisés par type
- [ ] Variables nommées clairement
- [ ] Preview mode testé
- [ ] Container versionné et publié
