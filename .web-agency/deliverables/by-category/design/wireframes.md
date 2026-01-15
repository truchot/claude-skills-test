---
id: wireframes
name: Wireframes
version: 1.0.0
category: design
status: active
phase: "3-conception"
order: 5
agents:
  - ux-ui-design/research/wireframes
  - ux-ui-design/research/information-architecture
consumes:
  - project-brief
  - requirements-list
produces_for:
  - ux-ui-design/design/ui-design
  - direction-artistique/orchestration/brief-creatif
  - frontend-developer/*/all
tags: [wireframe, ux, architecture, prototype, low-fidelity]
---

# Wireframes

## Description

Représentations low-fidelity de l'interface utilisateur, montrant la structure, la hiérarchie de l'information et les parcours utilisateur sans design visuel. Permet de valider l'architecture de l'information avant le design détaillé.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Fichier Figma / Sketch / Images PNG |
| **Emplacement** | `projects/[client-slug]/03-conception/wireframes/` |
| **Nommage** | `[page-name]-wireframe.fig` ou export PNG |
| **Encoding** | - |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Arborescence** - Sitemap de toutes les pages
- [ ] **Wireframes desktop** - Toutes les pages principales
- [ ] **Wireframes mobile** - Versions responsives
- [ ] **Annotations** - Explications des interactions
- [ ] **Parcours utilisateur** - Flows principaux

### Sections Optionnelles

- [ ] **Wireframes tablet** - Si pertinent
- [ ] **Micro-interactions** - Détails comportementaux
- [ ] **États** - Vide, erreur, loading
- [ ] **Prototype cliquable** - Navigation entre écrans

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Couverture pages | Toutes les pages du scope | Manuel | Oui |
| 2 | Responsive | Desktop + Mobile minimum | Manuel | Oui |
| 3 | Annotations | Chaque wireframe annoté | Manuel | Oui |
| 4 | Flows documentés | Parcours critiques couverts | Manuel | Oui |
| 5 | Validation client | Accord écrit | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `project-management/*` | `project-brief` | Objectifs et périmètre |
| `client-intake/*` | `requirements-list` | Fonctionnalités requises |
| Client | Contenus existants | Structure actuelle |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Arborescence | Client + Chef de projet | Ajuster structure |
| 2 | Wireframes clés | Client | Itérer |
| 3 | Tous les wireframes | Équipe dev | Vérifier faisabilité |

## Exemple

### Exemple - Arborescence E-commerce

```
SITEMAP - E-commerce Dupont
═══════════════════════════

🏠 Accueil
├── 📦 Catalogue
│   ├── 📁 Catégorie (x5)
│   │   └── 📄 Fiche Produit
│   └── 🔍 Recherche
├── 🛒 Panier
│   └── 💳 Checkout
│       ├── Informations
│       ├── Livraison
│       ├── Paiement
│       └── Confirmation
├── 👤 Mon Compte
│   ├── Connexion
│   ├── Inscription
│   ├── Profil
│   ├── Mes Commandes
│   │   └── Détail Commande
│   └── Mes Adresses
├── 📖 À Propos
├── 📞 Contact
└── ⚖️ Pages Légales
    ├── Mentions Légales
    ├── CGV
    └── Politique de Confidentialité

Total: 18 templates uniques
```

### Exemple - Wireframe Page d'Accueil (ASCII)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
│  ┌──────┐  ┌─────────────────────┐  ┌────┐ ┌────┐ ┌────┐   │
│  │ LOGO │  │    🔍 Recherche...   │  │ 👤 │ │ ❤️ │ │ 🛒3│   │
│  └──────┘  └─────────────────────┘  └────┘ └────┘ └────┘   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Miels  │  Confitures  │  Terrines  │  Vins  │ Coffrets│ │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│  HERO                                                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                      │    │
│  │         [      IMAGE HERO      ]                    │    │
│  │                                                      │    │
│  │    Découvrez nos produits du terroir                │    │
│  │    Artisanat familial depuis 1985                   │    │
│  │                                                      │    │
│  │              [ VOIR LA BOUTIQUE ]                   │    │
│  │                                                      │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│  PRODUITS VEDETTES                                           │
│                                                              │
│  Nos coups de cœur                          [Voir tout →]    │
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │  [IMG]  │  │  [IMG]  │  │  [IMG]  │  │  [IMG]  │        │
│  │         │  │         │  │         │  │         │        │
│  │ Miel de │  │Confiture│  │ Terrine │  │ Coffret │        │
│  │ lavande │  │ figues  │  │ canard  │  │ découv. │        │
│  │         │  │         │  │         │  │         │        │
│  │  12,50€ │  │   8,90€ │  │  15,00€ │  │  45,00€ │        │
│  │ [Panier]│  │ [Panier]│  │ [Panier]│  │ [Panier]│        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
├─────────────────────────────────────────────────────────────┤
│  CATÉGORIES                                                  │
│                                                              │
│  Nos gammes                                                  │
│                                                              │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│  │    [IMAGE]    │  │    [IMAGE]    │  │    [IMAGE]    │   │
│  │               │  │               │  │               │   │
│  │     Miels     │  │   Confitures  │  │   Terrines    │   │
│  └───────────────┘  └───────────────┘  └───────────────┘   │
│                                                              │
│  ┌───────────────┐  ┌───────────────┐                      │
│  │    [IMAGE]    │  │    [IMAGE]    │                      │
│  │               │  │               │                      │
│  │     Vins      │  │   Coffrets    │                      │
│  └───────────────┘  └───────────────┘                      │
├─────────────────────────────────────────────────────────────┤
│  RÉASSURANCE                                                 │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ 🚚          │  │ ✓           │  │ 🔒          │         │
│  │ Livraison   │  │ Qualité     │  │ Paiement    │         │
│  │ offerte     │  │ artisanale  │  │ sécurisé    │         │
│  │ dès 50€     │  │ garantie    │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                      │    │
│  │  LOGO         Navigation    Informations   Contact  │    │
│  │               - Boutique    - CGV          📍 Adresse│    │
│  │  Description  - À propos    - Mentions     📞 Tel   │    │
│  │  courte...    - Contact     - Confidential 📧 Email │    │
│  │                                                      │    │
│  │  © 2024 Dupont SARL - Tous droits réservés          │    │
│  │                                                      │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Exemple - Wireframe Mobile

```
┌─────────────────────┐
│ ☰  LOGO      🔍  🛒3│
├─────────────────────┤
│                     │
│    [HERO IMAGE]     │
│                     │
│  Nos produits du    │
│      terroir        │
│                     │
│ [ VOIR LA BOUTIQUE ]│
│                     │
├─────────────────────┤
│                     │
│  Coups de cœur      │
│                     │
│ ┌───────┐ ┌───────┐ │
│ │ [IMG] │ │ [IMG] │ │
│ │ Miel  │ │Confit.│ │
│ │12,50€ │ │ 8,90€ │ │
│ └───────┘ └───────┘ │
│                     │
│ ┌───────┐ ┌───────┐ │
│ │ [IMG] │ │ [IMG] │ │
│ │Terrine│ │Coffret│ │
│ │15,00€ │ │45,00€ │ │
│ └───────┘ └───────┘ │
│                     │
├─────────────────────┤
│  Nos gammes         │
│                     │
│ ┌─────────────────┐ │
│ │     Miels       │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │   Confitures    │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │    Terrines     │ │
│ └─────────────────┘ │
│                     │
├─────────────────────┤
│ 🚚 Livraison offerte│
│    dès 50€          │
├─────────────────────┤
│                     │
│  FOOTER             │
│  Navigation         │
│  Légal              │
│  © 2024             │
│                     │
└─────────────────────┘
```

### Annotations Type

```
ANNOTATION: Header
──────────────────
[A1] Logo cliquable → retour accueil
[A2] Barre de recherche avec autocomplétion
[A3] Icône compte:
     - Si déconnecté → page connexion
     - Si connecté → dropdown menu
[A4] Panier avec badge quantité
     - Clic → slide-over panier (pas nouvelle page)

ANNOTATION: Produit Card
────────────────────────
[B1] Image cliquable → fiche produit
[B2] Prix barré si promotion
[B3] Bouton "Ajouter au panier"
     - Si stock = 0 → "Rupture" (disabled)
     - Clic → animation + mise à jour badge panier
```

### Parcours Utilisateur - Achat

```
FLOW: Achat Produit
═══════════════════

┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Accueil  │───►│ Catégorie│───►│  Fiche   │───►│  Panier  │
│          │    │          │    │ Produit  │    │ (slide)  │
└──────────┘    └──────────┘    └────┬─────┘    └────┬─────┘
                                     │               │
                              [Ajouter panier]  [Commander]
                                     │               │
                                     └───────────────┘
                                             │
                                             ▼
                               ┌─────────────────────────┐
                               │       CHECKOUT          │
                               ├─────────────────────────┤
                               │ Step 1: Informations    │
                               │ - Email                 │
                               │ - Créer compte (opt)    │
                               ├─────────────────────────┤
                               │ Step 2: Livraison       │
                               │ - Adresse               │
                               │ - Mode livraison        │
                               ├─────────────────────────┤
                               │ Step 3: Paiement        │
                               │ - Stripe Elements       │
                               ├─────────────────────────┤
                               │ Step 4: Confirmation    │
                               │ - Récap commande        │
                               │ - Numéro commande       │
                               └─────────────────────────┘
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Trop de détails visuels | Confusion avec le design | Rester low-fidelity |
| Pas d'annotations | Wireframes ambigus | Toujours annoter |
| Desktop only | Mobile ignoré | Mobile-first |
| Pas de validation | Retravail en phase design | Valider avant de continuer |
| États manquants | Cas limites non couverts | Prévoir vide, erreur, loading |

## Références

- [Wireframing Best Practices](https://www.nngroup.com/articles/wireflows/)
- [Figma Wireframing](https://www.figma.com/resource-library/wireframing/)
- Livrables liés : `project-brief`, `ui-mockups`, `component-specs`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | ux-ui-design | Création initiale |
