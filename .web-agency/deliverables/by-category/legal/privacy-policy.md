---
id: privacy-policy
name: Politique de Confidentialité
version: 1.0.0
category: legal
status: active
phase: "3-conception"
order: 1
agents:
  - legal-compliance/documents/privacy-policy-generator
  - legal-compliance/rgpd/data-mapper
consumes:
  - project-brief
  - rgpd-compliance-report
produces_for:
  - frontend-developer/*/all
  - wordpress-gutenberg-expert/*/all
  - marketing/*/all
tags: [rgpd, legal, privacy, gdpr, conformité, données-personnelles]
---

# Politique de Confidentialité

## Description

Document juridique obligatoire détaillant comment l'organisation collecte, utilise, stocke et protège les données personnelles des utilisateurs. Ce livrable est requis par le RGPD pour tout site web ou application traitant des données personnelles de résidents européens.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown / HTML |
| **Emplacement** | `/legal/privacy-policy.md` ou page dédiée du site |
| **Nommage** | `privacy-policy.md`, `politique-confidentialite.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Identité du responsable de traitement** - Nom, adresse, contact du responsable et DPO si applicable
- [ ] **Données collectées** - Liste exhaustive des types de données personnelles collectées
- [ ] **Finalités du traitement** - Objectifs pour lesquels les données sont traitées
- [ ] **Base légale** - Fondement juridique de chaque traitement (consentement, contrat, intérêt légitime, obligation légale)
- [ ] **Destinataires des données** - Tiers ayant accès aux données (sous-traitants, partenaires)
- [ ] **Durée de conservation** - Période de rétention pour chaque catégorie de données
- [ ] **Droits des personnes** - Accès, rectification, effacement, portabilité, opposition, limitation
- [ ] **Transferts hors UE** - Garanties pour les transferts internationaux (le cas échéant)
- [ ] **Sécurité des données** - Mesures techniques et organisationnelles de protection
- [ ] **Contact et réclamation** - Coordonnées pour exercer ses droits et contacter la CNIL

### Sections Optionnelles

- [ ] **Cookies et traceurs** - Renvoi vers la politique cookies (si document séparé)
- [ ] **Profilage et décisions automatisées** - Si applicable
- [ ] **Données de mineurs** - Dispositions spécifiques pour les moins de 16 ans
- [ ] **Modifications de la politique** - Procédure de mise à jour et notification

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Toutes sections obligatoires présentes | 10/10 sections | Manuel | Oui |
| 2 | Langage clair et compréhensible | Niveau B1 minimum | Manuel | Oui |
| 3 | Informations de contact valides | Email + adresse postale | Manuel | Oui |
| 4 | Base légale spécifiée par traitement | 100% des traitements | Manuel | Oui |
| 5 | Durées de conservation définies | Toutes catégories | Manuel | Oui |
| 6 | Date de dernière mise à jour | Présente et < 12 mois | Auto | Oui |
| 7 | Accessible en 2 clics max | Depuis toute page | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `client-intake` | project-brief | Contexte du projet et nature des données traitées |
| `legal-compliance/rgpd` | rgpd-compliance-report | Cartographie des traitements de données |
| `direction-technique` | technical-specification | Architecture technique et flux de données |
| Client | Registre des traitements | Liste officielle des traitements existants |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Après rédaction initiale | Juriste / DPO | Corrections juridiques |
| 2 | Avant mise en production | Direction / Client | Validation finale |
| 3 | Annuellement | DPO | Mise à jour si nécessaire |

## Exemple

### Exemple Minimal

```markdown
# Politique de Confidentialité

**Dernière mise à jour :** 18 janvier 2026

## Responsable de traitement
[Nom de l'entreprise], [Adresse], [Email contact]

## Données collectées
- Données d'identification (nom, prénom, email)
- Données de connexion (adresse IP, logs)

## Finalités
- Gestion de votre compte utilisateur
- Communication relative à nos services

## Base légale
- Exécution du contrat (gestion compte)
- Consentement (newsletter)

## Vos droits
Vous pouvez exercer vos droits d'accès, rectification, effacement en nous contactant à : [email]

## Contact CNIL
En cas de réclamation : www.cnil.fr
```

### Exemple Complet

```markdown
# Politique de Confidentialité

**Dernière mise à jour :** 18 janvier 2026
**Version :** 2.1.0

## 1. Responsable de traitement

**[Nom de l'entreprise]**
- Forme juridique : SAS au capital de XXX €
- Siège social : [Adresse complète]
- RCS : [Numéro]
- Email : privacy@entreprise.com
- Téléphone : +33 X XX XX XX XX

**Délégué à la Protection des Données (DPO) :**
- Nom : [Nom du DPO]
- Email : dpo@entreprise.com

## 2. Données personnelles collectées

### 2.1 Données fournies directement
| Catégorie | Données | Caractère |
|-----------|---------|-----------|
| Identification | Nom, prénom, email, téléphone | Obligatoire |
| Professionnelles | Entreprise, fonction | Facultatif |
| Paiement | IBAN (via prestataire sécurisé) | Obligatoire si achat |

### 2.2 Données collectées automatiquement
| Catégorie | Données | Finalité |
|-----------|---------|----------|
| Techniques | Adresse IP, navigateur, OS | Sécurité |
| Navigation | Pages visitées, durée | Amélioration UX |
| Cookies | Voir politique cookies | Fonctionnement |

## 3. Finalités et bases légales

| Finalité | Base légale | Durée conservation |
|----------|-------------|-------------------|
| Gestion des comptes | Contrat | Durée du compte + 3 ans |
| Facturation | Obligation légale | 10 ans |
| Newsletter | Consentement | Jusqu'au désabonnement |
| Statistiques | Intérêt légitime | 13 mois |
| Prospection B2B | Intérêt légitime | 3 ans après dernier contact |

## 4. Destinataires des données

### Internes
- Service client, Service commercial, Service technique

### Sous-traitants
| Prestataire | Finalité | Localisation | Garanties |
|-------------|----------|--------------|-----------|
| AWS | Hébergement | Irlande (UE) | Clauses contractuelles |
| Stripe | Paiement | USA | Privacy Shield + SCCs |
| Mailchimp | Emailing | USA | SCCs |

## 5. Vos droits

Conformément au RGPD, vous disposez des droits suivants :
- **Accès** : obtenir une copie de vos données
- **Rectification** : corriger des données inexactes
- **Effacement** : demander la suppression de vos données
- **Limitation** : restreindre le traitement
- **Portabilité** : recevoir vos données dans un format structuré
- **Opposition** : vous opposer au traitement pour motif légitime

**Pour exercer vos droits :**
- Email : privacy@entreprise.com
- Courrier : [Adresse] - À l'attention du DPO
- Délai de réponse : 1 mois maximum

## 6. Sécurité

Nous mettons en œuvre les mesures suivantes :
- Chiffrement des données en transit (TLS 1.3)
- Chiffrement des données au repos (AES-256)
- Authentification forte pour les accès admin
- Audits de sécurité annuels
- Formation des employés

## 7. Réclamation

Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL :
- Site : www.cnil.fr
- Adresse : 3 Place de Fontenoy, 75007 Paris
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Copier-coller générique | Non conforme car non adapté aux traitements réels | Personnaliser selon les traitements effectifs |
| Jargon juridique excessif | Non accessible aux utilisateurs | Utiliser un langage clair (niveau B1) |
| Durées de conservation vagues | Non conforme RGPD | Spécifier des durées précises par catégorie |
| Lien caché en footer minuscule | Non accessible en 2 clics | Lien visible dans footer et pages formulaires |
| Absence de date de mise à jour | Impossible de vérifier l'actualité | Toujours dater le document |

## Références

- [RGPD - Règlement (UE) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [Guide CNIL - Politique de confidentialité](https://www.cnil.fr/fr/rgpd-exemples-de-mentions-dinformation)
- [Article 13 RGPD - Informations à fournir](https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre3#Article13)
- Livrables liés : `rgpd-compliance-report`, `cookie-policy`, `terms-of-service`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | legal-compliance | Création initiale |
