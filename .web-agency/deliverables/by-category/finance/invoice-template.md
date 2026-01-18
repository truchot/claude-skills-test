---
id: invoice-template
name: Template de Facture
version: 1.0.0
category: finance
status: active
phase: "4-realisation"
order: 1
agents:
  - finance-analytics/billing/invoice-generator
  - finance-analytics/billing/billing-manager
  - commercial-crm/negotiation/deal-closer
consumes:
  - commercial-proposal
  - project-brief
  - sla-definition
produces_for:
  - finance-analytics/reporting/*
  - commercial-crm/pipeline/*
  - legal-compliance/*/all
tags: [finance, facture, facturation, comptabilité, paiement, billing]
---

# Template de Facture

## Description

Modèle standardisé de facture conforme aux obligations légales françaises et européennes. Ce template définit la structure, les mentions obligatoires et le format des factures émises par l'entreprise. Il garantit la conformité fiscale et facilite le suivi comptable.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document PDF / HTML |
| **Emplacement** | `/finance/factures/` ou système de facturation |
| **Nommage** | `FAC-[YYYYMM]-[NUMERO].pdf` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires (Mentions légales)

- [ ] **Numéro de facture** - Numérotation chronologique unique
- [ ] **Date d'émission** - Date de création de la facture
- [ ] **Identité du vendeur** - Dénomination, adresse, SIRET, RCS, TVA intracommunautaire
- [ ] **Identité de l'acheteur** - Dénomination, adresse, N° TVA si professionnel
- [ ] **Date de la vente/prestation** - Ou période pour les prestations
- [ ] **Désignation des produits/services** - Nature précise, quantité, prix unitaire
- [ ] **Prix unitaire HT** - Détail par ligne
- [ ] **Taux de TVA** - Par catégorie de produit/service
- [ ] **Total HT, TVA, TTC** - Récapitulatif des montants
- [ ] **Conditions de paiement** - Délai, modalités, escompte, pénalités de retard

### Sections Optionnelles

- [ ] **Numéro de bon de commande** - Référence PO du client
- [ ] **Référence projet** - Lien avec le projet concerné
- [ ] **Détail des prestations** - Breakdown par phase ou livrable
- [ ] **Avoir/Remise** - Si applicable
- [ ] **Coordonnées bancaires** - RIB/IBAN pour virement
- [ ] **CGV abrégées** - Ou lien vers CGV complètes

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Mentions légales complètes | 100% présentes | Manuel | Oui |
| 2 | Numérotation séquentielle | Pas de trou, pas de doublon | Auto | Oui |
| 3 | Calculs exacts | Total = somme des lignes | Auto | Oui |
| 4 | TVA correcte | Taux conformes | Auto | Oui |
| 5 | Format PDF/A | Archivage conforme | Auto | Oui |
| 6 | Délai paiement mentionné | Explicite | Manuel | Oui |
| 7 | Pénalités de retard | Mentionnées | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `commercial-crm` | commercial-proposal | Devis accepté à facturer |
| `project-management` | Validation jalons | Confirmation des livrables |
| Client | Bon de commande | PO si applicable |
| Comptabilité | Numéro séquentiel | Prochain numéro de facture |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Création facture | Comptable | Vérification montants |
| 2 | Avant envoi | Direction financière | Approbation |
| 3 | Mensuel | Expert-comptable | Conformité |

## Exemple

### Exemple Minimal

```markdown
┌────────────────────────────────────────────────────────────┐
│                        FACTURE                              │
├────────────────────────────────────────────────────────────┤
│ N° : FAC-202601-0042                 Date : 18/01/2026     │
├────────────────────────────────────────────────────────────┤
│ ÉMETTEUR                      │ CLIENT                     │
│ [Entreprise]                  │ Entreprise XYZ             │
│ 12 rue Example, 75001 Paris   │ 34 avenue Client           │
│ SIRET : 123 456 789 00012     │ 69001 Lyon                 │
│ TVA : FR12345678901           │ TVA : FR98765432101        │
├────────────────────────────────────────────────────────────┤
│ Désignation                    │ Qté │ PU HT  │ Total HT  │
├────────────────────────────────────────────────────────────┤
│ Développement site web         │  1  │ 5000€  │  5 000€   │
├────────────────────────────────────────────────────────────┤
│                                      Total HT  │  5 000€   │
│                                      TVA 20%   │  1 000€   │
│                                      Total TTC │  6 000€   │
├────────────────────────────────────────────────────────────┤
│ Paiement : 30 jours. Pénalités retard : 3x taux légal     │
└────────────────────────────────────────────────────────────┘
```

### Exemple Complet

```markdown
┌─────────────────────────────────────────────────────────────────────┐
│                                                                      │
│    [LOGO]                    F A C T U R E                          │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Facture N° : FAC-202601-0042            Date : 18 janvier 2026    │
│  Réf. devis : PROP-XYZ-20251215-V2       Échéance : 17 février 2026│
│  Réf. commande : PO-2026-0012                                       │
│                                                                      │
├───────────────────────────────┬─────────────────────────────────────┤
│                               │                                      │
│  ÉMETTEUR                     │  FACTURÉ À                          │
│                               │                                      │
│  [Notre Entreprise]           │  Entreprise XYZ                     │
│  SAS au capital de 50 000 €   │  Marie Martin                       │
│                               │  Directrice Digitale                │
│  12 rue de l'Innovation       │                                      │
│  75001 Paris                  │  34 avenue du Commerce              │
│  France                       │  69001 Lyon                         │
│                               │  France                              │
│  SIRET : 123 456 789 00012    │                                      │
│  RCS Paris B 123 456 789      │  N° TVA : FR98 765 432 101          │
│  N° TVA : FR12 345 678 901    │  SIRET : 987 654 321 00034          │
│                               │                                      │
│  📧 comptabilite@entreprise.com                                     │
│  📞 +33 1 XX XX XX XX                                                │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  OBJET : Refonte Plateforme E-commerce - Phase 1                    │
│  Période : 01/01/2026 - 31/01/2026                                  │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DÉTAIL DES PRESTATIONS                                             │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Désignation              │ Qté │ Unité │ PU HT   │ Total HT │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ Cadrage et gestion       │ 10  │ jours │  700,00 │  7 000,00│   │
│  │ de projet                │     │       │         │          │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ UX/UI Design             │ 15  │ jours │  650,00 │  9 750,00│   │
│  │ - Wireframes                                                 │   │
│  │ - Maquettes UI                                               │   │
│  │ - Design System                                              │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ Développement Frontend   │ 25  │ jours │  600,00 │ 15 000,00│   │
│  │ - Next.js / React                                            │   │
│  │ - Intégration                                                │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ Développement Backend    │ 30  │ jours │  650,00 │ 19 500,00│   │
│  │ - API Strapi                                                 │   │
│  │ - Intégrations tierces                                       │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ DevOps & Infrastructure  │  8  │ jours │  700,00 │  5 600,00│   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ Migration données        │ 10  │ jours │  550,00 │  5 500,00│   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ Tests & Recette          │ 12  │ jours │  500,00 │  6 000,00│   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ SEO Technique            │  5  │ jours │  600,00 │  3 000,00│   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ Formation                │  4  │ jours │  600,00 │  2 400,00│   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Licences & Services      │  1  │ an    │ 3 250,00│  3 250,00│   │
│  │ (Algolia, Sendinblue)    │     │       │         │          │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ Hébergement              │  1  │ an    │ 4 000,00│  4 000,00│   │
│  │ (Vercel Pro + AWS)       │     │       │         │          │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                               ┌────────────────────────────────┐    │
│                               │                                │    │
│                               │   Total HT         81 000,00 € │    │
│                               │                                │    │
│                               │   Remise commerciale    0,00 € │    │
│                               │   ─────────────────────────────│    │
│                               │   Net HT             81 000,00 € │   │
│                               │                                │    │
│                               │   TVA 20%            16 200,00 € │   │
│                               │                                │    │
│                               │   ═════════════════════════════│    │
│                               │   TOTAL TTC          97 200,00 € │   │
│                               │                                │    │
│                               └────────────────────────────────┘    │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ACOMPTES DÉJÀ VERSÉS                                               │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Date       │ Référence           │ Montant TTC              │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ 20/12/2025 │ FAC-202512-0035     │         30 600,00 € │   │
│  │            │ (Acompte 30%)       │                          │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│                               ┌────────────────────────────────┐    │
│                               │   RESTE À PAYER    66 600,00 € │    │
│                               └────────────────────────────────┘    │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  CONDITIONS DE RÈGLEMENT                                            │
│                                                                      │
│  • Date d'échéance : 17 février 2026 (30 jours)                    │
│  • Mode de règlement : Virement bancaire                           │
│                                                                      │
│  • Escompte pour paiement anticipé : Aucun                         │
│  • Pénalités de retard : 3 fois le taux d'intérêt légal           │
│  • Indemnité forfaitaire pour frais de recouvrement : 40 €        │
│                                                                      │
│  COORDONNÉES BANCAIRES                                              │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Banque : [Nom de la banque]                                 │   │
│  │ IBAN : FR76 XXXX XXXX XXXX XXXX XXXX XXX                    │   │
│  │ BIC : XXXXXXXX                                               │   │
│  │ Titulaire : [Notre Entreprise]                               │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  TVA non applicable, art. 293 B du CGI                             │
│  (Si applicable pour auto-entrepreneurs / franchise en base)        │
│                                                                      │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                      │
│  En cas de litige, seuls les tribunaux de Paris sont compétents.   │
│                                                                      │
│  Conditions générales de vente disponibles sur :                    │
│  https://www.notre-entreprise.com/cgv                               │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

Page 1/1 • Facture générée le 18/01/2026 à 10:30
```

### Structure JSON (pour systèmes de facturation)

```json
{
  "invoice": {
    "number": "FAC-202601-0042",
    "date": "2026-01-18",
    "due_date": "2026-02-17",
    "currency": "EUR",
    "status": "draft",
    "reference": {
      "quote": "PROP-XYZ-20251215-V2",
      "po": "PO-2026-0012",
      "project": "Refonte Plateforme E-commerce"
    },
    "seller": {
      "name": "Notre Entreprise",
      "legal_form": "SAS",
      "capital": 50000,
      "address": {
        "street": "12 rue de l'Innovation",
        "postal_code": "75001",
        "city": "Paris",
        "country": "FR"
      },
      "siret": "12345678900012",
      "rcs": "Paris B 123 456 789",
      "vat_number": "FR12345678901",
      "email": "comptabilite@entreprise.com",
      "phone": "+33 1 XX XX XX XX"
    },
    "buyer": {
      "name": "Entreprise XYZ",
      "contact": "Marie Martin",
      "title": "Directrice Digitale",
      "address": {
        "street": "34 avenue du Commerce",
        "postal_code": "69001",
        "city": "Lyon",
        "country": "FR"
      },
      "siret": "98765432100034",
      "vat_number": "FR98765432101"
    },
    "lines": [
      {
        "description": "Cadrage et gestion de projet",
        "quantity": 10,
        "unit": "jours",
        "unit_price": 700.00,
        "vat_rate": 20,
        "total_ht": 7000.00
      },
      {
        "description": "UX/UI Design (Wireframes, Maquettes, Design System)",
        "quantity": 15,
        "unit": "jours",
        "unit_price": 650.00,
        "vat_rate": 20,
        "total_ht": 9750.00
      }
    ],
    "totals": {
      "total_ht": 81000.00,
      "discount": 0.00,
      "net_ht": 81000.00,
      "vat_breakdown": [
        { "rate": 20, "base": 81000.00, "amount": 16200.00 }
      ],
      "total_vat": 16200.00,
      "total_ttc": 97200.00
    },
    "deposits": [
      {
        "date": "2025-12-20",
        "reference": "FAC-202512-0035",
        "amount_ttc": 30600.00
      }
    ],
    "amount_due": 66600.00,
    "payment_terms": {
      "delay_days": 30,
      "method": "bank_transfer",
      "early_discount": null,
      "late_penalty_rate": "3x legal rate",
      "recovery_fee": 40.00
    },
    "bank_details": {
      "bank_name": "Nom de la banque",
      "iban": "FR76 XXXX XXXX XXXX XXXX XXXX XXX",
      "bic": "XXXXXXXX",
      "holder": "Notre Entreprise"
    }
  }
}
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Numérotation avec trous | Non conforme, risque de contrôle fiscal | Séquence stricte et continue |
| Mentions légales manquantes | Facture invalide, sanctions possibles | Checklist des mentions obligatoires |
| TVA mal calculée | Erreur comptable, redressement | Calcul automatisé vérifié |
| Pas de pénalités de retard | Mention obligatoire depuis 2013 | Toujours indiquer le taux |
| Format non archivable | Problème de conservation | Utiliser PDF/A |
| Conditions de paiement floues | Litiges sur les échéances | Délai explicite + date |

## Références

- [Bofip - Mentions obligatoires sur les factures](https://bofip.impots.gouv.fr/bofip/367-PGP.html)
- [Code de Commerce - Articles L441-9](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037935527)
- [Service-public.fr - Factures : règles de forme](https://entreprendre.service-public.fr/vosdroits/F31808)
- [Factur-X - Standard de facturation électronique](https://fnfe-mpe.org/factur-x/)
- Livrables liés : `commercial-proposal`, `project-brief`, `terms-of-service`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | finance-analytics | Création initiale |
