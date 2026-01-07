---
name: avant-projet
description: Processus avant-projet - du brief client à la proposition commerciale
triggers: [brief, devis, estimation, chiffrage, proposition, nouveau projet, RFP]
skills: [project-management]
roles: [project-manager, technical-director]
---

# Workflow: Avant-Projet

## Objectif
Transformer un brief client en proposition commerciale chiffrée et validée.

## Prérequis
- Brief ou demande client reçue
- Interlocuteur identifié

## Étapes

### 1. Analyse du Brief
**Responsable**: project-manager

- [ ] Lire et comprendre le brief
- [ ] Identifier les zones d'ombre
- [ ] Lister les questions de clarification
- [ ] Envoyer les questions au client

**Output**: Brief clarifié, questions répondues

### 2. Découpage en Lots
**Responsable**: technical-director + project-manager

- [ ] Identifier les grandes fonctionnalités
- [ ] Découper en lots cohérents
- [ ] Définir les dépendances entre lots
- [ ] Attribuer une complexité T-shirt par tâche

**Output**: Liste des lots avec T-shirt sizing

### 3. Chiffrage
**Responsable**: technical-director

- [ ] Convertir T-shirt en JH (voir grille)
- [ ] Répartir par profil
- [ ] Appliquer coefficients de risque
- [ ] Calculer fourchette min/max

**Output**: Estimation détaillée

### 4. Rédaction Proposition
**Responsable**: project-manager

- [ ] Rédiger le contexte et compréhension
- [ ] Détailler la solution proposée
- [ ] Inclure planning macro
- [ ] Ajouter conditions commerciales

**Output**: Proposition commerciale

### 5. Validation Interne
**Responsable**: project-manager

- [ ] Review par un pair
- [ ] Validation direction si > seuil
- [ ] Ajustements si nécessaire

**Output**: Proposition validée

### 6. Envoi et Suivi
**Responsable**: project-manager

- [ ] Envoyer au client
- [ ] Planifier relance J+3
- [ ] Répondre aux questions
- [ ] Négocier si nécessaire

**Output**: Proposition acceptée ou refusée

## Grille T-Shirt → Jours/Homme

| Taille | JH Min | JH Max |
|--------|--------|--------|
| XS | 0.25 | 0.5 |
| S | 0.5 | 1 |
| M | 1 | 2 |
| L | 2 | 4 |
| XL | 4 | 8 |

## Répartition Type par Profil

| Profil | % Typique |
|--------|-----------|
| Lead Dev | 15-20% |
| Dev Senior | 30-40% |
| Dev Junior | 20-30% |
| UI/UX | 15-20% |
| CDP | 10-15% |

## Coefficients de Risque

| Contexte | Coefficient |
|----------|-------------|
| Projet similaire déjà fait | x1.0 |
| Nouvelle techno maîtrisée | x1.2 |
| Nouvelle techno à découvrir | x1.5 |
| Specs floues | x1.3 |
| Client exigeant | x1.2 |

## Signaux d'Alerte

| Signal | Action |
|--------|--------|
| Total > 100 JH | Proposer du phasing |
| Écart min/max > x2 | Clarifier le besoin |
| CDP < 10% | Risque sous-staffing |

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Brief incomplet après 2 relances | Alerter commercial |
| Estimation > budget client annoncé | Proposer réduction périmètre |
| Doute technique majeur | POC avant proposition |
