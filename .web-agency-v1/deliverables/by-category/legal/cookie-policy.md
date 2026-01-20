---
id: cookie-policy
name: Politique de Cookies
version: 1.0.0
category: legal
status: active
phase: "3-conception"
order: 4
agents:
  - legal-compliance/cookies/cookie-auditor
  - legal-compliance/cookies/banner-specifier
  - legal-compliance/documents/cookie-policy-generator
consumes:
  - project-brief
  - technical-specification
  - rgpd-compliance-report
produces_for:
  - frontend-developer/*/all
  - marketing/analytics/*
  - wordpress-gutenberg-expert/*/all
tags: [cookies, rgpd, eprivacy, traceurs, consentement, cmp, cnil]
---

# Politique de Cookies

## Description

Document détaillant l'utilisation des cookies et traceurs sur un site web ou une application. Cette politique informe les utilisateurs sur les types de cookies utilisés, leurs finalités, leur durée de vie et les moyens de les gérer. Elle est complémentaire au bandeau de consentement (CMP) et obligatoire selon les recommandations CNIL et la directive ePrivacy.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown / HTML |
| **Emplacement** | `/legal/cookie-policy.md` ou page dédiée |
| **Nommage** | `cookie-policy.md`, `politique-cookies.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Définition des cookies** - Explication claire de ce qu'est un cookie
- [ ] **Identité du responsable** - Qui dépose les cookies
- [ ] **Inventaire des cookies** - Liste exhaustive avec nom, finalité, durée, type
- [ ] **Catégorisation** - Classification par finalité (essentiels, analytics, marketing, etc.)
- [ ] **Cookies tiers** - Identification des tiers déposant des cookies
- [ ] **Gestion du consentement** - Comment accepter/refuser les cookies
- [ ] **Paramétrage navigateur** - Instructions par navigateur
- [ ] **Durée de validité du consentement** - Maximum 13 mois selon CNIL
- [ ] **Contact** - Pour questions relatives aux cookies

### Sections Optionnelles

- [ ] **Cookies sur applications mobiles** - Si applicable (SDK, identifiants)
- [ ] **Pixel tracking et fingerprinting** - Autres technologies de traçage
- [ ] **Cookies cross-device** - Tracking multi-appareils
- [ ] **Historique des modifications** - Changelog de la politique

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Inventaire complet | 100% des cookies listés | Script audit | Oui |
| 2 | Durées de vie spécifiées | Pour chaque cookie | Manuel | Oui |
| 3 | Tiers identifiés | Nom + lien politique | Manuel | Oui |
| 4 | Catégorisation conforme CNIL | 4 catégories minimum | Manuel | Oui |
| 5 | Instructions refus claires | Tous navigateurs majeurs | Manuel | Oui |
| 6 | Lien depuis bandeau CMP | Accessible en 1 clic | Manuel | Oui |
| 7 | Date de mise à jour | < 12 mois | Auto | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `frontend-developer` | Audit cookies | Scan technique des cookies déposés |
| `marketing` | Liste outils analytics | GA, Hotjar, etc. |
| `marketing` | Liste pixels publicitaires | Facebook, Google Ads, etc. |
| `direction-technique` | technical-specification | Architecture et intégrations tierces |
| `legal-compliance` | rgpd-compliance-report | Mapping des traitements liés aux cookies |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Après audit cookies | Dev + Marketing | Compléter l'inventaire |
| 2 | Validation juridique | Juriste / DPO | Corrections conformité |
| 3 | Avant mise en production | Direction | Validation finale |
| 4 | Trimestriellement | DPO | Mise à jour si nouveaux cookies |

## Exemple

### Exemple Minimal

```markdown
# Politique de Cookies

**Dernière mise à jour :** 18 janvier 2026

## Qu'est-ce qu'un cookie ?
Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d'un site web.

## Cookies utilisés

| Nom | Type | Finalité | Durée |
|-----|------|----------|-------|
| session_id | Essentiel | Maintien de session | Session |
| _ga | Analytics | Google Analytics | 13 mois |

## Gestion des cookies
Vous pouvez gérer vos préférences via notre [bandeau de consentement](#).

## Contact
cookies@entreprise.com
```

### Exemple Complet

```markdown
# Politique de Cookies

**Dernière mise à jour :** 18 janvier 2026
**Version :** 2.0.0

## 1. Qu'est-ce qu'un cookie ?

Un cookie est un petit fichier texte stocké sur votre terminal (ordinateur, tablette, smartphone) lors de la consultation d'un site web. Il permet au site de mémoriser des informations sur votre visite, comme votre langue préférée ou d'autres paramètres, facilitant ainsi votre prochaine visite.

### Types de technologies utilisées

| Technologie | Description |
|-------------|-------------|
| **Cookies HTTP** | Fichiers texte stockés par le navigateur |
| **Local Storage** | Stockage local persistant dans le navigateur |
| **Session Storage** | Stockage temporaire pour la session |
| **Pixels/Balises** | Images invisibles pour le tracking |

## 2. Qui dépose des cookies ?

**Responsable du site :**
[Nom de l'entreprise]
[Adresse]
Email : cookies@entreprise.com

**Tiers déposant des cookies :**
- Google (Analytics, Ads)
- Meta (Facebook Pixel)
- HubSpot (Marketing automation)
- Hotjar (Analyse comportementale)

## 3. Catégories de cookies

### 3.1 Cookies strictement nécessaires (Essentiels)

Ces cookies sont indispensables au fonctionnement du site. Ils ne peuvent pas être désactivés.

| Nom | Fournisseur | Finalité | Durée | Type |
|-----|-------------|----------|-------|------|
| `session_id` | [Site] | Maintien de la session utilisateur | Session | HTTP |
| `csrf_token` | [Site] | Protection contre les attaques CSRF | Session | HTTP |
| `cookie_consent` | [Site] | Stockage de vos préférences cookies | 13 mois | HTTP |
| `cart_id` | [Site] | Identification du panier d'achat | 30 jours | HTTP |

**Base légale :** Intérêt légitime (fonctionnement du site)

### 3.2 Cookies de mesure d'audience (Analytics)

Ces cookies nous permettent de mesurer l'audience du site et d'améliorer ses performances.

| Nom | Fournisseur | Finalité | Durée | Type |
|-----|-------------|----------|-------|------|
| `_ga` | Google Analytics | Distinction des utilisateurs | 13 mois | HTTP |
| `_ga_XXXXXXX` | Google Analytics | Conservation état session | 13 mois | HTTP |
| `_gid` | Google Analytics | Distinction des utilisateurs | 24 heures | HTTP |
| `_hjSessionUser_*` | Hotjar | ID utilisateur Hotjar | 1 an | HTTP |
| `_hjSession_*` | Hotjar | Données session courante | 30 min | HTTP |

**Base légale :** Consentement

**Liens vers politiques tiers :**
- [Google Analytics](https://policies.google.com/privacy)
- [Hotjar](https://www.hotjar.com/privacy/)

### 3.3 Cookies de personnalisation (Fonctionnels)

Ces cookies permettent de personnaliser votre expérience sur le site.

| Nom | Fournisseur | Finalité | Durée | Type |
|-----|-------------|----------|-------|------|
| `lang` | [Site] | Préférence de langue | 1 an | HTTP |
| `theme` | [Site] | Préférence thème clair/sombre | 1 an | Local Storage |
| `recent_products` | [Site] | Produits récemment consultés | 30 jours | Local Storage |

**Base légale :** Consentement

### 3.4 Cookies publicitaires (Marketing)

Ces cookies sont utilisés pour vous proposer des publicités personnalisées.

| Nom | Fournisseur | Finalité | Durée | Type |
|-----|-------------|----------|-------|------|
| `_fbp` | Meta (Facebook) | Identification pour Facebook Ads | 3 mois | HTTP |
| `_gcl_au` | Google Ads | Conversion tracking | 3 mois | HTTP |
| `IDE` | Google DoubleClick | Publicités personnalisées | 13 mois | HTTP |
| `fr` | Facebook | Ciblage publicitaire | 3 mois | HTTP |
| `__hssc` | HubSpot | Tracking session HubSpot | 30 min | HTTP |
| `__hstc` | HubSpot | Tracking visiteur HubSpot | 13 mois | HTTP |
| `hubspotutk` | HubSpot | Identifiant visiteur | 13 mois | HTTP |

**Base légale :** Consentement

**Liens vers politiques tiers :**
- [Meta/Facebook](https://www.facebook.com/privacy/policy/)
- [Google Ads](https://policies.google.com/privacy)
- [HubSpot](https://legal.hubspot.com/privacy-policy)

## 4. Gestion de vos préférences

### 4.1 Via notre bandeau de consentement

Lors de votre première visite, un bandeau vous permet de :
- ✅ Accepter tous les cookies
- ❌ Refuser tous les cookies (sauf essentiels)
- ⚙️ Personnaliser vos choix par catégorie

**Pour modifier vos préférences ultérieurement :**
👉 Cliquez sur le lien "Gérer les cookies" en bas de page
👉 Ou accédez directement à : [Préférences cookies](#cookie-preferences)

### 4.2 Via les paramètres de votre navigateur

Vous pouvez configurer votre navigateur pour bloquer les cookies :

#### Google Chrome
1. Menu ☰ > Paramètres > Confidentialité et sécurité
2. Cookies et autres données des sites
3. Choisissez votre niveau de blocage

#### Mozilla Firefox
1. Menu ☰ > Paramètres > Vie privée et sécurité
2. Section "Cookies et données de sites"
3. Gérer les exceptions

#### Safari
1. Préférences > Confidentialité
2. Cochez "Bloquer tous les cookies"

#### Microsoft Edge
1. Menu ⋯ > Paramètres > Cookies et autorisations de site
2. Gérer et supprimer les cookies

#### Safari iOS
1. Réglages > Safari > Confidentialité et sécurité
2. Bloquer tous les cookies

#### Chrome Android
1. Menu ⋮ > Paramètres > Confidentialité
2. Cookies

⚠️ **Attention :** Le blocage de tous les cookies peut affecter le fonctionnement du site.

### 4.3 Outils de désinscription tiers

- **Google :** [Paramètres des annonces](https://adssettings.google.com/)
- **Facebook :** [Préférences publicitaires](https://www.facebook.com/ads/preferences/)
- **Your Online Choices :** [youronlinechoices.com](https://www.youronlinechoices.com/fr/controler-ses-cookies/)

## 5. Durée de validité du consentement

Conformément aux recommandations de la CNIL :
- Votre consentement est valable **13 mois maximum**
- Passé ce délai, nous vous demanderons à nouveau votre choix
- Vous pouvez retirer votre consentement à tout moment

## 6. Transferts de données

Certains cookies impliquent des transferts de données vers des pays hors UE :

| Fournisseur | Pays | Garanties |
|-------------|------|-----------|
| Google | USA | Clauses Contractuelles Types (SCCs) |
| Meta | USA | Clauses Contractuelles Types (SCCs) |
| HubSpot | USA | Clauses Contractuelles Types (SCCs) |

## 7. Mise à jour de cette politique

Cette politique peut être mise à jour pour refléter :
- L'ajout ou la suppression de cookies
- Des évolutions réglementaires
- Des changements de partenaires

La date de dernière mise à jour est indiquée en haut du document.

## 8. Contact

Pour toute question concernant notre utilisation des cookies :

**Email :** cookies@entreprise.com
**Courrier :** [Adresse] - Service Protection des Données
**Formulaire :** [Lien vers formulaire de contact]

Pour les questions relatives à vos données personnelles, consultez notre [Politique de Confidentialité](/privacy-policy).

---

## Annexe : Audit technique des cookies

*Dernière analyse : 15/01/2026*
*Outil utilisé : Cookie Scanner v3.2*

| Catégorie | Nombre | First-party | Third-party |
|-----------|--------|-------------|-------------|
| Essentiels | 4 | 4 | 0 |
| Analytics | 5 | 0 | 5 |
| Fonctionnels | 3 | 3 | 0 |
| Marketing | 7 | 0 | 7 |
| **Total** | **19** | **7** | **12** |
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Liste générique non mise à jour | Ne reflète pas la réalité du site | Scanner régulièrement les cookies réels |
| Absence de catégorisation | Non conforme CNIL | Utiliser les 4 catégories CNIL |
| Durées de vie manquantes | Information obligatoire | Documenter chaque cookie |
| Cookie wall bloquant | Interdit par CNIL | Permettre navigation sans acceptation |
| Consentement pré-coché | Non valide juridiquement | Opt-in explicite requis |
| Pas de lien vers tiers | Information incomplète | Lien vers politique de chaque tiers |

## Références

- [CNIL - Recommandations cookies et traceurs](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies)
- [CNIL - Lignes directrices cookies](https://www.cnil.fr/sites/cnil/files/atoms/files/lignes_directrices_de_la_cnil_sur_les_cookies_et_autres_traceurs.pdf)
- [Directive ePrivacy 2002/58/CE](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32002L0058)
- [Your Online Choices - Contrôle des cookies](https://www.youronlinechoices.com/fr/)
- Livrables liés : `privacy-policy`, `rgpd-compliance-report`, `analytics-setup`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | legal-compliance | Création initiale |
