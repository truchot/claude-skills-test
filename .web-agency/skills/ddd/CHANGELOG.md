# Changelog

Toutes les modifications notables de ce skill sont documentées ici.

Format basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

## [1.2.0] - 2026-01-15

### Ajouté
- **cqrs** (tactical) : Séparation Command/Query, Read Models, Projections
- **event-sourcing** (tactical) : Events comme source de vérité, snapshots, RGPD
- **saga-process-manager** (tactical) : Orchestration processus longs, compensations
- **pattern-selector** (tooling) : Aide à la décision avec arbres de décision

### Modifié
- Réorganisation des phases de projet dans la table de routage
- Ajout de la phase "Patterns avancés"

## [1.1.0] - 2026-01-15

### Ajouté
- **anti-corruption-layer** (tactical) : Protection du domaine, patterns ACL
- **model-validator** (tooling) : Audit de modèles, détection anti-patterns
- Nouveau domaine `tooling` pour les outils transverses

### Modifié
- Mise à jour des tables de routage
- Ajout des phases "Intégration externe" et "Audit & Qualité"

## [1.0.0] - 2026-01-15

### Ajouté

#### Strategic (8 agents)
- **orchestrator** : Routage vers les agents strategic
- **bounded-contexts** : Identification et délimitation des contextes
- **context-mapping** : Relations entre contextes (Shared Kernel, ACL, etc.)
- **ubiquitous-language** : Construction du vocabulaire partagé
- **core-domain-identification** : Classification Core/Supporting/Generic
- **event-storming** : Facilitation d'ateliers de découverte
- **domain-storytelling** : Narration visuelle des processus
- **example-mapping** : Découverte par exemples (Given-When-Then)

#### Tactical (12 agents initiaux)
- **orchestrator** : Routage vers les agents tactical
- **entities** : Modélisation des entités
- **value-objects** : Objets valeur immuables
- **aggregates** : Agrégats et racines d'agrégat
- **repositories** : Interfaces de persistance
- **domain-services** : Logique métier transverse
- **domain-events** : Événements du domaine
- **factories** : Création complexe d'agrégats
- **specifications** : Règles métier composables
- **domain-primitives** : Types primitifs typés
- **application-services** : Use Cases et orchestration
- **clean-architecture** : Structure en couches concentriques

### Structure
- SKILL.md avec philosophie, routage et workflow
- Organisation en domaines : strategic, tactical
- Tables de routage par mots-clés et par phase
