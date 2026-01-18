---
id: terms-of-service
name: Conditions Générales d'Utilisation / Vente
version: 1.0.0
category: legal
status: active
phase: "3-conception"
order: 2
agents:
  - legal-compliance/documents/terms-generator
  - legal-compliance/contracts/contract-reviewer
consumes:
  - project-brief
  - requirements-list
produces_for:
  - frontend-developer/*/all
  - wordpress-gutenberg-expert/*/all
  - commercial-crm/*/all
tags: [legal, cgu, cgv, conditions, contrat, e-commerce]
---

# Conditions Générales d'Utilisation / Vente (CGU/CGV)

## Description

Document juridique définissant les règles d'utilisation d'un service ou les conditions de vente de produits/services. Les CGU encadrent l'accès et l'utilisation d'un site/application, tandis que les CGV régissent les transactions commerciales. Ce livrable est obligatoire pour tout site e-commerce ou service en ligne.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown / HTML |
| **Emplacement** | `/legal/terms-of-service.md` ou `/legal/cgv.md` |
| **Nommage** | `terms-of-service.md`, `cgu.md`, `cgv.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires - CGU

- [ ] **Objet et acceptation** - Champ d'application et modalités d'acceptation
- [ ] **Identification de l'éditeur** - Mentions légales complètes
- [ ] **Accès au service** - Conditions d'accès, création de compte
- [ ] **Obligations de l'utilisateur** - Règles d'utilisation, comportements interdits
- [ ] **Propriété intellectuelle** - Droits sur les contenus et marques
- [ ] **Responsabilités** - Limitations et exclusions de responsabilité
- [ ] **Modération et sanctions** - Procédure en cas de manquement
- [ ] **Modification des CGU** - Procédure de mise à jour
- [ ] **Droit applicable et juridiction** - Loi applicable et tribunaux compétents

### Sections Obligatoires - CGV (e-commerce)

- [ ] **Produits/Services** - Description et caractéristiques essentielles
- [ ] **Prix** - Modalités de fixation, TVA, frais supplémentaires
- [ ] **Commande** - Processus de commande, validation
- [ ] **Paiement** - Moyens acceptés, sécurisation, facturation
- [ ] **Livraison** - Délais, modalités, zones géographiques
- [ ] **Droit de rétractation** - Délai de 14 jours, exceptions, modalités
- [ ] **Garanties** - Garantie légale de conformité, garantie des vices cachés
- [ ] **Réclamations et SAV** - Procédure de réclamation
- [ ] **Médiation** - Informations sur la médiation de la consommation

### Sections Optionnelles

- [ ] **Programme de fidélité** - Si applicable
- [ ] **Abonnements** - Conditions spécifiques aux abonnements
- [ ] **Contenu utilisateur (UGC)** - Licence sur les contenus publiés
- [ ] **API et intégrations** - Conditions d'utilisation des API

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Sections obligatoires complètes | 100% selon type (CGU/CGV) | Manuel | Oui |
| 2 | Mentions légales conformes | Toutes informations requises | Manuel | Oui |
| 3 | Droit de rétractation conforme | 14 jours, formulaire type | Manuel | Oui (CGV) |
| 4 | Information médiation | Nom et coordonnées du médiateur | Manuel | Oui (CGV B2C) |
| 5 | Langage clair | Compréhensible sans juriste | Manuel | Oui |
| 6 | Date de version | Présente et visible | Auto | Oui |
| 7 | Acceptation explicite | Case à cocher non pré-cochée | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `client-intake` | project-brief | Nature du projet (site vitrine, e-commerce, SaaS) |
| `client-intake` | requirements-list | Fonctionnalités et services proposés |
| `commercial-crm` | commercial-proposal | Conditions commerciales prévues |
| Client | Informations société | Raison sociale, RCS, capital, siège |
| Client | Conditions spécifiques | Politiques de retour, garanties étendues |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Après rédaction | Juriste | Corrections juridiques |
| 2 | Avant mise en ligne | Direction / Client | Validation commerciale |
| 3 | À chaque modification | Juriste + Direction | Re-validation complète |

## Exemple

### Exemple Minimal - CGU Site Vitrine

```markdown
# Conditions Générales d'Utilisation

**Dernière mise à jour :** 18 janvier 2026

## 1. Objet
Les présentes CGU définissent les conditions d'accès et d'utilisation du site [nom-du-site.com].

## 2. Éditeur du site
[Nom de l'entreprise]
[Adresse]
RCS [Ville] [Numéro]
Email : contact@entreprise.com

## 3. Accès au site
L'accès au site est gratuit. L'utilisateur est responsable de son équipement et de sa connexion.

## 4. Propriété intellectuelle
L'ensemble du contenu du site est protégé par le droit d'auteur. Toute reproduction est interdite sans autorisation.

## 5. Responsabilité
L'éditeur s'efforce d'assurer l'exactitude des informations mais ne peut être tenu responsable des erreurs ou omissions.

## 6. Droit applicable
Les présentes CGU sont régies par le droit français. Tout litige sera soumis aux tribunaux de [Ville].
```

### Exemple Complet - CGV E-commerce

```markdown
# Conditions Générales de Vente

**Version :** 2.0.0
**Date d'entrée en vigueur :** 18 janvier 2026

## Préambule

Les présentes Conditions Générales de Vente (CGV) régissent les ventes de produits effectuées sur le site [boutique.com] par la société [Nom], ci-après "le Vendeur", à destination des consommateurs, ci-après "le Client".

Toute commande implique l'acceptation sans réserve des présentes CGV.

## Article 1 - Identité du Vendeur

**[Nom de la société]**
- Forme juridique : SAS au capital de [montant] €
- Siège social : [Adresse complète]
- RCS : [Ville] [Numéro]
- N° TVA : FR [numéro]
- Email : contact@boutique.com
- Téléphone : [numéro]

Directeur de la publication : [Nom]
Hébergeur : [Nom et adresse de l'hébergeur]

## Article 2 - Produits

### 2.1 Description
Les produits proposés à la vente sont décrits sur chaque fiche produit. Les photographies sont non contractuelles.

### 2.2 Disponibilité
Les offres sont valables dans la limite des stocks disponibles. En cas d'indisponibilité, le Client sera informé dans les meilleurs délais.

## Article 3 - Prix

### 3.1 Tarifs
Les prix sont indiqués en euros TTC (toutes taxes comprises).
TVA applicable : 20% (taux normal)

### 3.2 Frais de livraison
Les frais de livraison sont indiqués avant validation de la commande :
- France métropolitaine : X€ (gratuit à partir de XX€)
- DOM-TOM : XX€
- Union Européenne : XX€

## Article 4 - Commande

### 4.1 Processus de commande
1. Sélection des produits et ajout au panier
2. Identification ou création de compte
3. Choix du mode de livraison
4. Choix du mode de paiement
5. Vérification et validation de la commande
6. Confirmation par email

### 4.2 Confirmation
Un email de confirmation récapitulant la commande est envoyé au Client. La vente est conclue à réception de ce mail.

## Article 5 - Paiement

### 5.1 Moyens de paiement acceptés
- Carte bancaire (Visa, Mastercard, CB)
- PayPal
- Virement bancaire

### 5.2 Sécurisation
Les paiements sont sécurisés par [prestataire] avec chiffrement SSL.

### 5.3 Facturation
Une facture est envoyée par email et disponible dans l'espace client.

## Article 6 - Livraison

### 6.1 Délais
- Préparation : 1-2 jours ouvrés
- Livraison standard : 3-5 jours ouvrés
- Livraison express : 24-48h

### 6.2 Transporteurs
Colissimo, Chronopost, Mondial Relay

### 6.3 Réception
Le Client doit vérifier l'état du colis à réception et émettre des réserves si nécessaire.

## Article 7 - Droit de rétractation

### 7.1 Délai
Conformément à l'article L221-18 du Code de la consommation, le Client dispose de **14 jours** à compter de la réception pour exercer son droit de rétractation, sans avoir à justifier de motif.

### 7.2 Modalités
Pour exercer ce droit, le Client doit notifier sa décision par :
- Email : retours@boutique.com
- Courrier : [Adresse]
- Formulaire en ligne : [lien]

### 7.3 Formulaire type de rétractation

> À l'attention de [Nom de la société] :
> Je vous notifie par la présente ma rétractation du contrat portant sur la vente du bien ci-dessous :
> - Commandé le : ___/___/______
> - Reçu le : ___/___/______
> - Nom du client : ______________
> - Adresse : ______________
> - Date : ______________
> - Signature (si courrier papier)

### 7.4 Retour des produits
Les produits doivent être retournés dans leur état d'origine, dans un délai de 14 jours suivant la notification.
Frais de retour : à la charge du Client

### 7.5 Remboursement
Le remboursement intervient dans les 14 jours suivant la réception des produits retournés, par le même moyen de paiement.

### 7.6 Exceptions
Le droit de rétractation ne s'applique pas aux :
- Produits personnalisés
- Produits périssables
- Produits descellés ne pouvant être renvoyés pour raisons d'hygiène

## Article 8 - Garanties légales

### 8.1 Garantie de conformité (art. L217-4 à L217-14)
Le Vendeur est tenu de livrer un bien conforme au contrat. En cas de défaut de conformité, le Client peut demander la réparation ou le remplacement du bien.

### 8.2 Garantie des vices cachés (art. 1641 à 1649)
Le Vendeur est tenu de la garantie à raison des défauts cachés de la chose vendue qui la rendent impropre à l'usage.

## Article 9 - Réclamations

Pour toute réclamation :
- Email : sav@boutique.com
- Téléphone : [numéro] (du lundi au vendredi, 9h-18h)
- Formulaire : [lien]

Délai de traitement : 48h ouvrées

## Article 10 - Médiation

Conformément à l'article L612-1 du Code de la consommation, en cas de litige non résolu, le Client peut recourir gratuitement au service de médiation :

**[Nom du médiateur]**
- Site : [URL]
- Adresse : [Adresse postale]

Plateforme européenne de règlement en ligne des litiges : https://ec.europa.eu/consumers/odr

## Article 11 - Données personnelles

Le traitement des données personnelles est décrit dans notre [Politique de Confidentialité](/privacy-policy).

## Article 12 - Droit applicable

Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.

## Article 13 - Modification des CGV

Le Vendeur se réserve le droit de modifier les présentes CGV. Les conditions applicables sont celles en vigueur à la date de la commande.
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Clause abusive limitant les droits | Réputée non écrite, risque de sanction | Respecter le Code de la consommation |
| Droit de rétractation < 14 jours | Illégal en B2C | Minimum 14 jours obligatoire |
| Absence d'info médiation | Amende jusqu'à 15 000€ | Mentionner le médiateur désigné |
| Tribunal compétent imposé au consommateur | Clause abusive | Tribunaux du domicile du consommateur |
| Case pré-cochée pour acceptation | Non conforme, consentement non valide | Case à cocher manuellement |
| CGV non accessibles avant achat | Non conforme | Lien visible à chaque étape |

## Références

- [Code de la consommation - Articles L111-1 et suivants](https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006069565/LEGISCTA000032221319/)
- [Directive 2011/83/UE - Droits des consommateurs](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=celex%3A32011L0083)
- [DGCCRF - Informations précontractuelles](https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/information-prealable-du-consommateur)
- [Liste des clauses abusives](https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/Clauses-abusives)
- Livrables liés : `privacy-policy`, `commercial-proposal`, `legal-notice`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | legal-compliance | Création initiale |
