---
id: commercial-proposal
name: Proposition Commerciale / Devis
version: 1.0.0
category: commercial
status: active
phase: "1-intake"
order: 1
agents:
  - commercial-crm/negotiation/proposal-generator
  - commercial-crm/prospection/lead-qualifier
  - project-management/avant-projet/project-qualifier
consumes:
  - client-request
  - project-brief
  - requirements-list
  - macro-estimation
produces_for:
  - project-management/*/all
  - direction-technique/*/all
  - finance-analytics/billing/*
tags: [commercial, devis, proposition, vente, pricing, contrat]
---

# Proposition Commerciale / Devis

## Description

Document commercial présentant une offre de services ou produits à un prospect ou client. La proposition commerciale détaille le contexte, la solution proposée, le périmètre, le planning, les tarifs et les conditions. Elle sert de base à la négociation et constitue un engagement pré-contractuel une fois acceptée.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown / PDF |
| **Emplacement** | `/commercial/propositions/` |
| **Nommage** | `PROP-[CLIENT]-[YYYYMMDD]-[VERSION].pdf` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Page de garde** - Logo, titre, client, date, version
- [ ] **Synthèse exécutive** - Résumé en 1 page max
- [ ] **Contexte et objectifs** - Compréhension du besoin client
- [ ] **Solution proposée** - Description de l'offre
- [ ] **Périmètre détaillé** - Ce qui est inclus et exclus
- [ ] **Planning prévisionnel** - Phases et jalons
- [ ] **Investissement** - Tarification détaillée
- [ ] **Conditions commerciales** - Modalités de paiement, validité
- [ ] **Prochaines étapes** - Actions pour avancer

### Sections Optionnelles

- [ ] **Équipe projet** - Profils intervenants
- [ ] **Références clients** - Projets similaires réalisés
- [ ] **Méthodologie** - Approche de travail
- [ ] **Options et variantes** - Alternatives tarifaires
- [ ] **Annexes techniques** - Détails techniques

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Toutes sections obligatoires | 9/9 présentes | Manuel | Oui |
| 2 | Tarification claire | Détail par poste, total HT et TTC | Manuel | Oui |
| 3 | Validité mentionnée | Durée de validité explicite | Manuel | Oui |
| 4 | Conditions de paiement | Échéancier défini | Manuel | Oui |
| 5 | Format professionnel | PDF avec charte graphique | Manuel | Oui |
| 6 | Personnalisation | Adapté au contexte client | Manuel | Oui |
| 7 | Mention légales | RCS, TVA, conditions | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `client-intake` | client-request | Demande initiale du client |
| `client-intake` | project-brief | Brief projet si disponible |
| `client-intake` | requirements-list | Cahier des charges |
| `direction-technique` | macro-estimation | Estimation technique |
| `direction-technique` | stack-recommendation | Recommandation technique |
| Commercial | Grille tarifaire | TJM, forfaits standards |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Avant rédaction | Commercial | Qualification du besoin |
| 2 | Après estimation | Direction technique | Validation technique |
| 3 | Avant envoi | Direction commerciale | Validation prix et marge |
| 4 | Négociation | Commercial + Direction | Ajustement si nécessaire |

## Exemple

### Exemple Minimal

```markdown
# Proposition Commerciale

**Client :** Entreprise X
**Date :** 18/01/2026
**Validité :** 30 jours
**Référence :** PROP-ENTX-20260118-V1

## Contexte
Création d'un site vitrine présentant vos services.

## Solution proposée
Site WordPress responsive avec 5 pages.

## Investissement

| Poste | Montant HT |
|-------|-----------|
| Conception & Design | 2 000 € |
| Développement | 3 000 € |
| **Total HT** | **5 000 €** |
| TVA (20%) | 1 000 € |
| **Total TTC** | **6 000 €** |

## Conditions
- Acompte 40% à la commande
- Solde à la livraison
```

### Exemple Complet

```markdown
---
document: Proposition Commerciale
client: Entreprise XYZ
projet: Refonte Plateforme E-commerce
reference: PROP-XYZ-20260118-V2
version: 2.0
date: 18 janvier 2026
validite: 15 février 2026
auteur: Jean Dupont - Directeur Commercial
---

# Proposition Commerciale
## Refonte Plateforme E-commerce

![Logo Entreprise](logo.png)

---

**Destinataire :**
Marie Martin
Directrice Digitale
Entreprise XYZ
12 rue de l'Innovation
75001 Paris

**Émetteur :**
[Notre Entreprise]
Jean Dupont - Directeur Commercial
contact@notre-entreprise.com
+33 1 XX XX XX XX

---

## 1. Synthèse Exécutive

### Votre besoin
Vous souhaitez moderniser votre plateforme e-commerce vieillissante pour améliorer l'expérience utilisateur, augmenter vos conversions et supporter votre croissance (+40% de trafic attendu).

### Notre proposition
Nous vous proposons une refonte complète sur une architecture moderne (Next.js + Headless CMS) avec migration de vos données, optimisation SEO et accompagnement post-lancement.

### Points clés

| Élément | Valeur |
|---------|--------|
| **Investissement total** | 85 000 € HT |
| **Durée projet** | 4 mois |
| **ROI estimé** | +25% de conversion |
| **Garantie** | 12 mois |

### Pourquoi nous ?
- 10+ projets e-commerce similaires réalisés
- Expertise Next.js / Headless certifiée
- Équipe dédiée de 5 experts
- Accompagnement post-lancement inclus

---

## 2. Compréhension de Votre Contexte

### 2.1 Situation actuelle

Suite à nos échanges du 10/01/2026 et à l'analyse de votre plateforme actuelle, nous avons identifié :

**Points de friction actuels :**
- 🔴 Temps de chargement moyen > 5 secondes (impact SEO et conversion)
- 🔴 Tunnel de commande complexe (abandon 78%)
- 🔴 Back-office difficile à maintenir (PrestaShop 1.6)
- 🟠 Pas de version mobile optimisée
- 🟠 Intégration ERP manuelle

**Opportunités identifiées :**
- ✅ Base clients fidèle (12 000 clients actifs)
- ✅ Catalogue produits bien structuré (2 500 références)
- ✅ Équipe marketing digitale en place
- ✅ Budget SEO déjà alloué

### 2.2 Vos objectifs

| Objectif | KPI Cible | Échéance |
|----------|-----------|----------|
| Améliorer la performance | LCP < 2,5s | Lancement |
| Augmenter la conversion | +25% (de 2% à 2,5%) | M+3 |
| Réduire l'abandon panier | -30% | M+3 |
| Faciliter la gestion | -50% temps back-office | M+1 |
| Améliorer le SEO | Top 3 sur 20 mots-clés | M+6 |

---

## 3. Solution Proposée

### 3.1 Architecture technique

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND                              │
│  Next.js 14 + React 18 + TypeScript                     │
│  (SSR/SSG pour performance et SEO)                       │
├─────────────────────────────────────────────────────────┤
│                    BACKEND                               │
│  Strapi CMS (Headless) + API REST/GraphQL               │
├─────────────────────────────────────────────────────────┤
│                  INTÉGRATIONS                            │
│  Stripe (paiement) | Algolia (recherche) | ERP (API)    │
├─────────────────────────────────────────────────────────┤
│                 INFRASTRUCTURE                           │
│  Vercel (frontend) | AWS (backend) | Cloudflare (CDN)   │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Fonctionnalités incluses

#### Storefront (Frontend)
- ✅ Catalogue produits avec filtres avancés
- ✅ Fiches produits optimisées (images, variantes, avis)
- ✅ Recherche instantanée (Algolia)
- ✅ Panier et tunnel de commande optimisé (3 étapes)
- ✅ Compte client (historique, favoris, adresses)
- ✅ Blog intégré pour le content marketing
- ✅ Multi-langues (FR/EN)
- ✅ Responsive design (Mobile-first)

#### Back-office
- ✅ Gestion produits (création, import/export)
- ✅ Gestion commandes et clients
- ✅ Tableaux de bord et statistiques
- ✅ Gestion des promotions
- ✅ Éditeur de contenu WYSIWYG

#### Intégrations
- ✅ Paiement Stripe (CB, Apple Pay, Google Pay)
- ✅ Synchronisation ERP (bidirectionnelle)
- ✅ Emailing transactionnel (Sendinblue)
- ✅ Analytics (GA4 + Hotjar)

### 3.3 Livrables

| Phase | Livrables |
|-------|-----------|
| **Conception** | Wireframes, Maquettes UI, Spécifications techniques |
| **Développement** | Code source, Documentation technique, Tests |
| **Migration** | Script de migration, Données migrées, Redirections 301 |
| **Déploiement** | Infrastructure configurée, SSL, CDN |
| **Formation** | Guide utilisateur, Session formation (4h) |

---

## 4. Périmètre

### 4.1 Inclus dans cette proposition

| Élément | Détail |
|---------|--------|
| Pages | Accueil, Catégories (illimitées), Fiches produits, Panier, Checkout, Compte client, Blog, Pages CMS (10), Contact |
| Produits | Migration de 2 500 références existantes |
| Design | Création d'une nouvelle identité visuelle e-commerce |
| Responsive | Optimisation mobile et tablette |
| SEO | Optimisation on-page, redirections, sitemap |
| Formation | 4 heures de formation sur le back-office |
| Garantie | 12 mois de garantie corrective |
| Support | 3 mois de support inclus post-lancement |

### 4.2 Exclus (options disponibles)

| Élément | Pourquoi | Option |
|---------|----------|--------|
| Marketplace multi-vendeurs | Non exprimé dans le besoin | Sur devis |
| Application mobile native | Web responsive suffisant | 35 000 € |
| Internationalisation (hors FR/EN) | 2 langues demandées | 2 000 €/langue |
| Maintenance évolutive | Forfait séparé | 1 500 €/mois |
| Campagnes marketing | Hors périmètre technique | Sur devis |

---

## 5. Planning Prévisionnel

### 5.1 Macro-planning

```
Janvier 2026          Février              Mars                 Avril               Mai
    │                    │                    │                    │                  │
    ▼                    ▼                    ▼                    ▼                  ▼
┌────────────┐      ┌────────────┐      ┌────────────┐      ┌────────────┐     ┌──────┐
│ CONCEPTION │ ───► │  DESIGN    │ ───► │   DEV      │ ───► │  RECETTE   │ ──► │LAUNCH│
│  3 sem.    │      │  3 sem.    │      │  8 sem.    │      │  2 sem.    │     │      │
└────────────┘      └────────────┘      └────────────┘      └────────────┘     └──────┘
```

### 5.2 Jalons clés

| Jalon | Date prévisionnelle | Livrable |
|-------|---------------------|----------|
| **Kick-off** | 20/01/2026 | Lancement projet |
| **J1 - Conception validée** | 07/02/2026 | Specs + Wireframes signés |
| **J2 - Design validé** | 28/02/2026 | Maquettes UI approuvées |
| **J3 - Développement terminé** | 18/04/2026 | Version de recette |
| **J4 - Recette validée** | 02/05/2026 | PV de recette signé |
| **Go-live** | 05/05/2026 | Mise en production |

### 5.3 Hypothèses planning

- Disponibilité de vos équipes pour les validations
- Contenus (textes, images) fournis selon planning
- Accès aux systèmes tiers (ERP, Stripe) sous 1 semaine
- Retours client sous 48h ouvrées

---

## 6. Investissement

### 6.1 Détail par poste

| Poste | Description | Jours | Tarif/jour | Montant HT |
|-------|-------------|-------|------------|------------|
| **Cadrage & Gestion de projet** | Kick-off, coordination, reporting | 10 | 700 € | 7 000 € |
| **UX/UI Design** | Wireframes, maquettes, design system | 15 | 650 € | 9 750 € |
| **Développement Frontend** | Next.js, intégration, responsive | 25 | 600 € | 15 000 € |
| **Développement Backend** | Strapi, API, intégrations | 30 | 650 € | 19 500 € |
| **DevOps & Infrastructure** | Setup, CI/CD, monitoring | 8 | 700 € | 5 600 € |
| **Migration données** | Scripts, mapping, validation | 10 | 550 € | 5 500 € |
| **Tests & Recette** | QA, tests automatisés, corrections | 12 | 500 € | 6 000 € |
| **SEO Technique** | Audit, optimisation, redirections | 5 | 600 € | 3 000 € |
| **Formation & Documentation** | Guides, sessions formation | 4 | 600 € | 2 400 € |
| | | | | |
| **SOUS-TOTAL** | | **119 j** | | **73 750 €** |
| **Licences & Services** | Algolia, Sendinblue (1 an) | - | - | 3 250 € |
| **Hébergement** | Vercel Pro + AWS (1 an) | - | - | 4 000 € |
| **Marge projet** | Aléas et imprévus (5%) | - | - | 4 000 € |
| | | | | |
| **TOTAL HT** | | | | **85 000 €** |
| TVA (20%) | | | | 17 000 € |
| **TOTAL TTC** | | | | **102 000 €** |

### 6.2 Options

| Option | Description | Montant HT |
|--------|-------------|------------|
| **Application mobile** | App React Native iOS + Android | +35 000 € |
| **Langue supplémentaire** | Traduction et configuration | +2 000 €/langue |
| **Maintenance évolutive** | 10h/mois d'évolutions | +1 500 €/mois |
| **Support premium 24/7** | Astreinte week-end et nuit | +800 €/mois |
| **Formation avancée** | Session supplémentaire de 4h | +1 200 € |

### 6.3 Comparatif ROI

| Scénario | Investissement | Gain annuel estimé | ROI |
|----------|----------------|-------------------|-----|
| Situation actuelle | 0 € | 0 € (baseline) | - |
| **Notre proposition** | 85 000 € | +150 000 € CA* | 6 mois |
| Alternative low-cost | 40 000 € | +50 000 € CA | 10 mois |

*Basé sur +25% conversion et +20% panier moyen

---

## 7. Conditions Commerciales

### 7.1 Modalités de paiement

| Échéance | Pourcentage | Montant HT | Déclencheur |
|----------|-------------|------------|-------------|
| Acompte | 30% | 25 500 € | À la commande |
| Jalon 1 | 20% | 17 000 € | Validation conception |
| Jalon 2 | 30% | 25 500 € | Livraison recette |
| Solde | 20% | 17 000 € | Mise en production |

### 7.2 Validité de l'offre

Cette proposition est valable **30 jours** à compter de sa date d'émission, soit jusqu'au **17 février 2026**.

### 7.3 Conditions générales

- Conditions générales de vente applicables (cf. annexe)
- Propriété intellectuelle : code sur-mesure cédé, licences tierces selon leurs conditions
- Confidentialité : NDA signé le 05/01/2026
- Garantie : 12 mois à compter de la mise en production
- Pénalités de retard : 3x taux légal

---

## 8. Pourquoi Nous Choisir ?

### 8.1 Notre expertise

| Domaine | Niveau |
|---------|--------|
| E-commerce B2C | ⭐⭐⭐⭐⭐ 10+ projets |
| Next.js / React | ⭐⭐⭐⭐⭐ Certifié Vercel |
| Strapi CMS | ⭐⭐⭐⭐⭐ Partenaire officiel |
| Performance Web | ⭐⭐⭐⭐⭐ Score moyen 95+ |

### 8.2 Références similaires

| Client | Projet | Résultats |
|--------|--------|-----------|
| **ModeChic** | Refonte e-commerce mode | +45% conversion, 1,8s LCP |
| **BioMarket** | Création plateforme alimentaire | 500K€ CA en 6 mois |
| **TechStore** | Migration PrestaShop → Next.js | -70% temps back-office |

> "L'équipe a parfaitement compris nos enjeux. La nouvelle plateforme a transformé notre activité en ligne." - *Marie L., DG ModeChic*

### 8.3 Équipe dédiée

| Rôle | Profil | Expérience |
|------|--------|------------|
| Chef de projet | Sophie M. | 8 ans, 20+ projets e-commerce |
| Lead développeur | Thomas D. | 10 ans, Expert Next.js |
| UX Designer | Julie B. | 6 ans, Spécialiste conversion |
| DevOps | Pierre L. | 5 ans, Certifié AWS |

---

## 9. Prochaines Étapes

Pour lancer ce projet ensemble :

1. **Réunion de présentation** - Présentation de cette proposition et Q&R
2. **Négociation** - Ajustements éventuels du périmètre ou planning
3. **Validation** - Signature du devis et versement de l'acompte
4. **Kick-off** - Lancement du projet sous 5 jours ouvrés

### Contact

**Jean Dupont** - Directeur Commercial
📧 jean.dupont@notre-entreprise.com
📞 +33 6 XX XX XX XX
📅 [Prendre rendez-vous](https://calendly.com/jean-dupont)

---

## Annexes

### A. Conditions Générales de Vente
[Lien vers CGV complètes]

### B. Planning détaillé
[Lien vers diagramme de Gantt]

### C. Spécifications techniques préliminaires
[Lien vers document technique]

### D. Références détaillées
[Portfolio et études de cas]

---

**[Notre Entreprise]**
SAS au capital de XXX €
RCS Paris XXX XXX XXX
TVA : FR XX XXX XXX XXX
Adresse : XX rue XXXXX, 75001 Paris
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Prix sans détail | Client méfiant, difficulté à négocier | Détailler par poste |
| Périmètre flou | Litiges sur ce qui est inclus | Lister inclus ET exclus |
| Pas de planning | Client ne peut pas se projeter | Fournir jalons et dates |
| Copier-coller générique | Pas d'adhérence au besoin client | Personnaliser chaque section |
| Validité non mentionnée | Offre utilisée des mois plus tard | Toujours indiquer une date limite |
| Pas de prochaines étapes | Le prospect ne sait pas comment avancer | Call-to-action clair |

## Références

- [The Anatomy of a Perfect Proposal](https://proposify.com/blog/sales-proposal-template)
- [Bidsketch - Proposal Best Practices](https://www.bidsketch.com/)
- [HubSpot - Sales Proposal Templates](https://www.hubspot.com/sales-proposal-template)
- Livrables liés : `macro-estimation`, `requirements-list`, `project-brief`, `sla-definition`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | commercial-crm | Création initiale |
