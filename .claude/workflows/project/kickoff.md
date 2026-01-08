---
name: kickoff
description: Lancement de projet - du brief à la planification
triggers: [kickoff, lancement, démarrage projet, nouveau projet]
skills: [git]
roles: [project-manager, technical-director]
---

# Workflow: Project Kickoff

## Objectif
Lancer un nouveau projet de manière structurée, du brief initial à la planification détaillée.

## Prérequis
- Brief client reçu
- Accord commercial validé
- Équipe identifiée

## Étapes

### 1. Analyse du Brief
**Responsable**: project-manager

- [ ] Lire et comprendre le brief client
- [ ] Identifier les zones d'ombre
- [ ] Lister les questions de clarification
- [ ] Planifier réunion de cadrage

**Output**: Liste de questions, points à clarifier

### 2. Réunion de Cadrage
**Responsable**: project-manager + technical-director

- [ ] Présentation du projet par le client
- [ ] Clarification des objectifs business
- [ ] Discussion des contraintes techniques
- [ ] Définition du périmètre (in/out scope)
- [ ] Identification des risques

**Output**: Compte-rendu de cadrage

### 3. Estimation Technique
**Responsable**: technical-director

- [ ] Découpage en composants techniques
- [ ] Estimation par composant (T-shirt sizing)
- [ ] Identification des dépendances
- [ ] Analyse des risques techniques
- [ ] Buffer pour imprévus (15-20%)

**Output**: Estimation détaillée

### 4. Proposition & Planning
**Responsable**: project-manager

- [ ] Rédiger proposition commerciale
- [ ] Créer planning macro (jalons)
- [ ] Définir les livrables par phase
- [ ] Présenter au client
- [ ] Négocier si nécessaire

**Output**: Proposition validée, planning approuvé

### 5. Setup Projet
**Responsable**: technical-director + devops

- [ ] Créer repository Git
- [ ] Configurer environnements (dev, staging)
- [ ] Setup CI/CD
- [ ] Créer board projet (issues, tickets)
- [ ] Documenter conventions

**Output**: Infrastructure projet prête

### 6. Kickoff Équipe
**Responsable**: project-manager

- [ ] Présenter le projet à l'équipe
- [ ] Distribuer les accès
- [ ] Expliquer les conventions
- [ ] Définir les rituels (daily, review)
- [ ] Lancer le premier sprint

**Output**: Équipe opérationnelle

## Checklist Finale

- [ ] Brief client compris et documenté
- [ ] Estimation validée
- [ ] Planning approuvé par le client
- [ ] Repository créé et configuré
- [ ] Environnements prêts
- [ ] Équipe briefée
- [ ] Premier sprint planifié

## Points d'Attention

| Risque | Mitigation |
|--------|------------|
| Brief flou | Insister sur cadrage avant estimation |
| Sous-estimation | Buffer 15-20%, validation technique |
| Scope creep | Périmètre écrit et signé |
| Dépendances client | Identifier et planifier en amont |
