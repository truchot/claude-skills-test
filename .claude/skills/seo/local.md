---
name: seo/local
description: SEO Local - Google Business, citations NAP, avis, géolocalisation
tags: [seo-local, google-business, gmb, avis, nap, local-pack]
---

# SEO Local

## Quand Utiliser
- Optimiser Google Business Profile
- Gérer les avis clients
- Créer des citations NAP cohérentes
- Améliorer la visibilité locale

## Composants du SEO Local

```
┌─────────────────────────────────────────────────────────┐
│                    SEO LOCAL                             │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ GOOGLE       │  │ CITATIONS    │  │ AVIS &       │  │
│  │ BUSINESS     │  │ NAP          │  │ RÉPUTATION   │  │
│  │              │  │              │  │              │  │
│  │ Fiche        │  │ Annuaires    │  │ Google       │  │
│  │ Posts        │  │ Cohérence    │  │ Facebook     │  │
│  │ Photos       │  │ Quantité     │  │ TripAdvisor  │  │
│  │ Catégories   │  │ Qualité      │  │ Trustpilot   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐                     │
│  │ CONTENU      │  │ ON-PAGE      │                     │
│  │ LOCAL        │  │ LOCAL        │                     │
│  │              │  │              │                     │
│  │ Pages villes │  │ Schema       │                     │
│  │ Blog local   │  │ LocalBusiness│                     │
│  │ Événements   │  │ NAP footer   │                     │
│  └──────────────┘  └──────────────┘                     │
└─────────────────────────────────────────────────────────┘
```

## Google Business Profile

### Optimisation Fiche

| Élément | Importance | Checklist |
|---------|------------|-----------|
| Nom | 🔴 Critique | Exact (pas de keywords stuffing) |
| Adresse | 🔴 Critique | Cohérente avec site web |
| Téléphone | 🔴 Critique | Numéro local |
| Catégorie principale | 🔴 Critique | La plus précise |
| Catégories secondaires | 🟡 Haute | 2-5 pertinentes |
| Description | 🟡 Haute | 750 caractères, keywords |
| Horaires | 🟡 Haute | À jour, spéciaux inclus |
| Site web | 🔴 Critique | URL correcte |
| Photos | 🟡 Haute | > 10, qualité, variées |
| Attributs | 🟡 Moyenne | Tous pertinents cochés |

### Posts Google Business
```
Types de posts :
- Actualités (What's new)
- Événements
- Offres
- Produits

Fréquence recommandée : 1-2/semaine
Format : Image + 100-300 mots + CTA
```

### Catégories
| Business | Catégorie Principale | Secondaires |
|----------|---------------------|-------------|
| Restaurant | Restaurant | Restaurant français, Brasserie |
| Plombier | Plombier | Service de plomberie, Réparation |
| Avocat | Cabinet d'avocats | Avocat droit famille, Avocat pénal |

## Citations NAP

### Format Standard
```
Nom de l'Entreprise
123 Rue Example
75001 Paris, France
01 23 45 67 89
```

### Cohérence NAP
| ❌ Incohérent | ✅ Cohérent |
|---------------|-------------|
| Entreprise SARL | Entreprise |
| 123 Rue Example | 123 Rue Example |
| 75001 Paris | 75001 Paris, France |
| 01.23.45.67.89 | 01 23 45 67 89 |

### Annuaires Prioritaires (France)
1. Google Business Profile
2. Pages Jaunes
3. Yelp
4. Facebook
5. Apple Maps
6. Bing Places
7. Annuaires sectoriels
8. CCI locale

## Gestion des Avis

### Réponse aux Avis Positifs
```
Merci beaucoup [Prénom] pour votre avis ! Nous sommes ravis 
que [point positif mentionné]. Au plaisir de vous revoir 
bientôt chez [Entreprise].
```

### Réponse aux Avis Négatifs
```
Bonjour [Prénom], nous sommes désolés d'apprendre que 
[résumé du problème]. Nous prenons votre retour très 
au sérieux. Pourriez-vous nous contacter à [email] 
pour que nous puissions résoudre cette situation ?
```

### Bonnes Pratiques
- Répondre à TOUS les avis (positifs ET négatifs)
- Délai < 24-48h
- Personnaliser chaque réponse
- Ne jamais être défensif
- Proposer une solution hors ligne pour les négatifs

## Schema LocalBusiness

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Nom Entreprise",
  "image": "https://example.com/logo.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Rue Example",
    "addressLocality": "Paris",
    "postalCode": "75001",
    "addressCountry": "FR"
  },
  "telephone": "+33123456789",
  "url": "https://example.com",
  "openingHours": ["Mo-Fr 09:00-18:00", "Sa 10:00-16:00"],
  "priceRange": "€€",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "48.8566",
    "longitude": "2.3522"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "127"
  }
}
</script>
```

## Pages Locales

### Structure URL
```
/services/paris/
/services/lyon/
/services/marseille/
```

### Contenu Page Locale
```markdown
# [Service] à [Ville]

## Nos services à [Ville]
[Description service + spécificités locales]

## Pourquoi nous choisir à [Ville]
[Points différenciants locaux]

## Zone d'intervention
[Quartiers, communes desservies]

## Nos réalisations à [Ville]
[Cas clients locaux]

## Contactez-nous à [Ville]
[NAP complet + Map]
```

## Local Pack - Facteurs de Ranking

| Facteur | Poids | Actions |
|---------|-------|---------|
| Proximité | 25% | Adresse réelle dans la zone |
| Pertinence | 25% | Catégories, description, site |
| Notoriété | 50% | Avis, citations, liens locaux |

## Checklist SEO Local

### Google Business Profile
- [ ] Fiche revendiquée et vérifiée
- [ ] NAP cohérent avec site web
- [ ] Catégories optimisées
- [ ] Description complète avec keywords
- [ ] > 10 photos de qualité
- [ ] Horaires à jour
- [ ] Posts réguliers (1-2/semaine)

### Citations
- [ ] Présent sur 20+ annuaires
- [ ] NAP 100% cohérent partout
- [ ] Annuaires sectoriels couverts

### Avis
- [ ] > 50 avis Google
- [ ] Note moyenne > 4.0
- [ ] Réponse à tous les avis
- [ ] Stratégie de collecte active

### Site Web
- [ ] NAP dans footer
- [ ] Schema LocalBusiness
- [ ] Pages locales si multi-zones
- [ ] Google Maps intégrée
