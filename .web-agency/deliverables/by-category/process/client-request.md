---
id: client-request
name: Demande Client
version: 1.0.0
category: process
status: active
phase: "1-intake"
order: 1
agents:
  - client-intake/reception/email-parser
  - client-intake/reception/form-handler
  - client-intake/reception/chat-handler
consumes: []
produces_for:
  - client-intake/extraction/requirements-extractor
  - client-intake/extraction/stakeholder-identifier
  - client-intake/qualification/intent-classifier
tags: [intake, client, demande, brief, initial]
---

# Demande Client

## Description

Document structuré capturant la demande initiale d'un client, quel que soit le canal d'entrée (email, formulaire, chat, appel). Ce livrable est le point d'entrée de tout projet et sert de référence pour la qualification et l'extraction des exigences.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown |
| **Emplacement** | `projects/[client-slug]/01-intake/client-request.md` |
| **Nommage** | `client-request.md` (unique par projet) |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Métadonnées** - Date, canal source, contact client
- [ ] **Demande brute** - Copie verbatim de la demande originale
- [ ] **Contexte client** - Entreprise, secteur, taille, existant
- [ ] **Expression du besoin** - Ce que le client demande (ses mots)
- [ ] **Objectifs déclarés** - Ce que le client veut atteindre
- [ ] **Contraintes exprimées** - Budget, délais, techniques mentionnés

### Sections Optionnelles

- [ ] **Pièces jointes** - Liste des documents fournis (cahier des charges, maquettes, etc.)
- [ ] **Historique** - Projets précédents avec ce client
- [ ] **Concurrents cités** - Sites ou solutions mentionnés comme référence
- [ ] **Questions ouvertes** - Points à clarifier

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Demande brute présente | Copie exacte sans interprétation | Manuel | Oui |
| 2 | Contact identifié | Nom + email ou téléphone | Manuel | Oui |
| 3 | Canal source tracé | Email, formulaire, chat, appel | Auto | Oui |
| 4 | Date de réception | Format ISO 8601 | Auto | Oui |
| 5 | Aucune interprétation | Section "brute" non modifiée | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| Client | Email / Formulaire / Chat | Message original du client |
| CRM | Fiche client | Historique si client existant |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Réception | Commercial / Account Manager | Compléter les infos manquantes |
| 2 | Avant qualification | Chef de projet | Vérifier exhaustivité |

## Exemple

### Exemple Minimal

```markdown
---
date_reception: 2024-01-15T10:30:00Z
canal: email
client:
  nom: Jean Dupont
  entreprise: Dupont SARL
  email: jean.dupont@dupont.fr
---

# Demande Client - Dupont SARL

## Demande Brute

> Bonjour,
>
> Nous cherchons à refaire notre site web qui date de 2018.
> Nous voudrions quelque chose de plus moderne avec une boutique en ligne.
> Notre budget est d'environ 15-20k€ et nous aimerions être en ligne pour septembre.
>
> Pouvez-vous nous faire une proposition ?
>
> Cordialement,
> Jean Dupont

## Contexte Client

- **Entreprise** : Dupont SARL
- **Secteur** : Commerce de détail (produits artisanaux)
- **Taille** : PME (~15 employés)
- **Site existant** : www.dupont-artisanat.fr (WordPress 2018)

## Expression du Besoin

- Refonte du site existant
- Ajout d'une boutique en ligne

## Objectifs Déclarés

- Site "plus moderne"
- Vente en ligne

## Contraintes Exprimées

- **Budget** : 15-20k€
- **Délai** : Septembre 2024
```

### Exemple Complet

```markdown
---
date_reception: 2024-01-15T10:30:00Z
canal: email
priority: normale
client:
  nom: Jean Dupont
  fonction: Gérant
  entreprise: Dupont SARL
  email: jean.dupont@dupont.fr
  telephone: "+33 6 12 34 56 78"
  siret: "123 456 789 00012"
historique_client:
  - projet: maintenance-2022
    statut: terminé
---

# Demande Client - Dupont SARL

## Demande Brute

> Bonjour,
>
> Suite à notre échange téléphonique de la semaine dernière, je vous confirme
> notre souhait de refaire notre site web qui date de 2018.
>
> Nous voudrions quelque chose de plus moderne avec une boutique en ligne
> pour vendre nos produits artisanaux. Actuellement nous vendons uniquement
> en boutique physique et sur les marchés, mais nous perdons des ventes car
> les clients nous demandent souvent s'ils peuvent commander en ligne.
>
> Nous avons regardé ce que font nos concurrents comme artisans-du-terroir.fr
> et nous aimerions quelque chose dans cet esprit mais avec notre identité.
>
> Notre budget est d'environ 15-20k€ et nous aimerions être en ligne pour
> septembre car c'est notre grosse période de vente (fêtes de fin d'année).
>
> Je vous joins notre logo et quelques photos de nos produits.
>
> Pouvez-vous nous faire une proposition ?
>
> Cordialement,
> Jean Dupont
> Gérant - Dupont SARL

## Pièces Jointes

- [x] `logo-dupont.png` - Logo actuel
- [x] `photos-produits.zip` - 25 photos produits
- [ ] Cahier des charges : Non fourni

## Contexte Client

- **Entreprise** : Dupont SARL
- **Secteur** : Commerce de détail - Artisanat / Produits du terroir
- **Taille** : PME (~15 employés)
- **CA estimé** : 500k-1M€
- **Site existant** : www.dupont-artisanat.fr
  - Plateforme : WordPress (thème premium)
  - Année : 2018
  - État : Fonctionnel mais daté visuellement

## Expression du Besoin

1. Refonte complète du site vitrine existant
2. Ajout d'une boutique e-commerce
3. Design moderne conservant l'identité artisanale

## Objectifs Déclarés

- Moderniser l'image de marque en ligne
- Permettre la vente en ligne (nouveau canal)
- Capter les clients qui demandent le e-commerce
- Préparer la saison des fêtes

## Contraintes Exprimées

| Type | Valeur | Ferme/Souple |
|------|--------|--------------|
| **Budget** | 15-20k€ | Souple (à confirmer) |
| **Délai** | Septembre 2024 | Ferme (saisonnalité) |
| **Technique** | - | Non exprimée |

## Concurrents / Références Cités

- artisans-du-terroir.fr - "dans cet esprit"

## Questions Ouvertes

- [ ] Nombre de produits à mettre en ligne ?
- [ ] Gestion des stocks existante ?
- [ ] Modes de livraison souhaités ?
- [ ] Moyens de paiement ?
- [ ] Contenu existant à reprendre ?
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Reformuler la demande | Perd l'intention originale du client | Toujours garder une section "brute" verbatim |
| Omettre le canal | Impossible de recontacter, perte de contexte | Toujours tracer la source |
| Interpréter le budget | Risque de malentendu | Noter les chiffres exacts donnés |
| Ignorer les références | Perd des insights sur les attentes | Toujours noter les sites/concurrents cités |

## Références

- Livrables suivants : `requirements-list`, `stakeholder-map`, `project-qualification`
- Template CRM : [Lien vers template HubSpot/Pipedrive]

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | client-intake | Création initiale |
