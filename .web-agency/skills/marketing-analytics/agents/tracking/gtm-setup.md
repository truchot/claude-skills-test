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

---

## Exemples Concrets

### Exemple de Prompt Utilisateur

**Prompt 1 - Setup initial** :
> "Configure GTM pour mon site e-commerce. J'ai besoin de tracker : pages vues GA4, achats, ajouts panier, et le pixel Meta. Le site est sur Shopify."

**Prompt 2 - Tracking événement spécifique** :
> "Comment tracker les clics sur mes boutons CTA 'Demander une démo' avec GTM ? Je veux voir ça dans GA4 comme événement personnalisé."

**Prompt 3 - Debug** :
> "Mon tag GA4 ne se déclenche pas sur les pages produit. Comment diagnostiquer le problème ?"

---

### Exemple de Livrable - Configuration E-commerce

```markdown
# Configuration GTM - E-commerce [Client]

## Container ID : GTM-XXXXXX

---

## Tags Configurés

### 1. GA4 - Configuration

| Paramètre | Valeur |
|-----------|--------|
| Type | Google Analytics: GA4 Configuration |
| Measurement ID | G-XXXXXXXXXX |
| Trigger | Consent Initialized - Analytics |
| Send Page View | Yes |

### 2. GA4 - Purchase

| Paramètre | Valeur |
|-----------|--------|
| Type | Google Analytics: GA4 Event |
| Event Name | purchase |
| Configuration Tag | GA4 - Configuration |
| Trigger | Custom Event - purchase |

**Paramètres événement** :
- `transaction_id` : {{DLV - transaction_id}}
- `value` : {{DLV - ecommerce.value}}
- `currency` : {{DLV - ecommerce.currency}}
- `items` : {{DLV - ecommerce.items}}

### 3. Meta Pixel - Base Code

| Paramètre | Valeur |
|-----------|--------|
| Type | Custom HTML |
| Pixel ID | 123456789 |
| Trigger | Consent Initialized - Marketing |

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '123456789');
fbq('track', 'PageView');
</script>
```

### 4. Meta Pixel - Purchase

| Paramètre | Valeur |
|-----------|--------|
| Type | Custom HTML |
| Trigger | Custom Event - purchase |

```html
<script>
fbq('track', 'Purchase', {
  value: {{DLV - ecommerce.value}},
  currency: '{{DLV - ecommerce.currency}}'
});
</script>
```

---

## Triggers Configurés

| Nom | Type | Condition |
|-----|------|-----------|
| Consent Initialized - Analytics | Custom Event | `consent_analytics` = `granted` |
| Consent Initialized - Marketing | Custom Event | `consent_marketing` = `granted` |
| Custom Event - purchase | Custom Event | Event = `purchase` |
| Custom Event - add_to_cart | Custom Event | Event = `add_to_cart` |
| Click - CTA Demo | Click | Click Text contains "Demander une démo" |

---

## Variables Data Layer

| Nom Variable | Type | Data Layer Variable Name |
|--------------|------|--------------------------|
| DLV - transaction_id | Data Layer Variable | ecommerce.transaction_id |
| DLV - ecommerce.value | Data Layer Variable | ecommerce.value |
| DLV - ecommerce.currency | Data Layer Variable | ecommerce.currency |
| DLV - ecommerce.items | Data Layer Variable | ecommerce.items |

---

## Data Layer Attendu

### Page Produit
```javascript
dataLayer.push({
  'event': 'view_item',
  'ecommerce': {
    'items': [{
      'item_id': 'SKU123',
      'item_name': 'Produit Example',
      'price': 99.99,
      'quantity': 1
    }]
  }
});
```

### Ajout Panier
```javascript
dataLayer.push({
  'event': 'add_to_cart',
  'ecommerce': {
    'items': [{
      'item_id': 'SKU123',
      'item_name': 'Produit Example',
      'price': 99.99,
      'quantity': 1
    }]
  }
});
```

### Achat
```javascript
dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': 'T12345',
    'value': 99.99,
    'currency': 'EUR',
    'items': [{
      'item_id': 'SKU123',
      'item_name': 'Produit Example',
      'price': 99.99,
      'quantity': 1
    }]
  }
});
```
```

---

### Cas d'Usage Type

| Situation | Configuration GTM | Tags Principaux |
|-----------|-------------------|-----------------|
| **Site vitrine** | GA4 + Meta Pixel + Contact Form | Page View, Lead, Form Submit |
| **E-commerce** | GA4 E-commerce + Meta CAPI + Google Ads | Purchase, Add to Cart, View Item |
| **SaaS** | GA4 + LinkedIn + Custom Events | Sign Up, Trial Start, Upgrade |
| **Lead Gen B2B** | GA4 + LinkedIn + Google Ads | Form Submit, Download, Demo Request |
| **Média/Blog** | GA4 + Scroll Tracking + Engagement | Scroll Depth, Time on Page, Article Read |

---

### Debug Checklist

```markdown
## Debug GTM : [Problème]

### Vérifications Préliminaires
- [ ] GTM container bien installé (view source)
- [ ] Preview mode activé
- [ ] Page rechargée après changements

### Si Tag Ne Fire Pas
- [ ] Trigger existe et est actif
- [ ] Conditions du trigger sont remplies
- [ ] Data Layer event bien pushé (vérifier Summary > Data Layer)
- [ ] Pas de conflit avec Consent Mode
- [ ] Tag non en pause

### Si Variable est Undefined
- [ ] Data layer push AVANT le trigger
- [ ] Nom exact de la variable (case sensitive)
- [ ] Structure de l'objet correcte (ecommerce.value vs value)

### Si Données Incorrectes
- [ ] Vérifier valeurs dans Preview > Variables
- [ ] Vérifier format (string vs number)
- [ ] Vérifier encodage caractères spéciaux

### Outils de Debug
- GTM Preview Mode
- GA4 DebugView
- Meta Pixel Helper (extension Chrome)
- Console navigateur (dataLayer dans console)
```
