---
name: ddd
description: |
  Domain-Driven Design - Modélisation métier et conception de domaines complexes.
  Utilise ce skill quand: (1) tu dois comprendre un domaine métier complexe,
  (2) tu veux identifier les bounded contexts d'un système, (3) tu dois créer
  un ubiquitous language partagé, (4) tu veux modéliser des entités et agrégats,
  (5) tu dois structurer du code selon Clean Architecture.
metadata:
  version: 1.1.0
  status: active
  level: transversal
  domains:
    - strategic
    - tactical
    - tooling
---

# Domain-Driven Design (DDD)

## Philosophie

Le DDD est une approche de conception logicielle qui place le **domaine métier au centre** de toutes les décisions. Ce skill guide la découverte, la modélisation et l'implémentation de domaines complexes.

### Principes fondamentaux

1. **Le métier d'abord** : Le code doit refléter fidèlement le domaine métier
2. **Langage ubiquitaire** : Un vocabulaire partagé entre développeurs et experts métier
3. **Bounded Contexts** : Des frontières claires entre sous-domaines
4. **Modèle riche** : La logique métier vit dans le domaine, pas dans les services

### Ce que ce skill fait

- Accompagne la découverte d'un domaine métier via Event Storming, Domain Storytelling, Example Mapping
- Aide à identifier et délimiter les Bounded Contexts
- Guide la création d'un Ubiquitous Language
- Modélise les Entities, Value Objects, Aggregates
- Structure le code selon Clean Architecture

### Ce que ce skill NE fait PAS

- Refactoring de legacy (→ skill dédié `legacy-modernization`)
- Implémentation technique bas niveau (→ `backend-developer`)
- Tests et validation (→ `testing-process`)
- Choix d'infrastructure (→ `devops`)

---

## Architecture du Skill

```
ddd/
├── SKILL.md (ce fichier)
└── agents/
    ├── strategic/          # POURQUOI & QUOI - Niveau conceptuel (8 agents)
    │   ├── orchestrator.md
    │   ├── bounded-contexts.md
    │   ├── context-mapping.md
    │   ├── ubiquitous-language.md
    │   ├── core-domain-identification.md
    │   ├── event-storming.md
    │   ├── domain-storytelling.md
    │   └── example-mapping.md
    │
    ├── tactical/           # COMMENT - Niveau implémentation (13 agents)
    │   ├── orchestrator.md
    │   ├── entities.md
    │   ├── value-objects.md
    │   ├── aggregates.md
    │   ├── repositories.md
    │   ├── domain-services.md
    │   ├── domain-events.md
    │   ├── factories.md
    │   ├── specifications.md
    │   ├── domain-primitives.md
    │   ├── application-services.md
    │   ├── anti-corruption-layer.md
    │   └── clean-architecture.md
    │
    └── tooling/            # OUTILS - Validation et qualité (1 agent)
        └── model-validator.md
```

---

## Domaines et Agents

### Strategic (Niveau conceptuel) - 8 agents

| Agent | Responsabilité |
|-------|----------------|
| `orchestrator` | Route vers l'agent strategic approprié |
| `bounded-contexts` | Identifier et délimiter les contextes bornés |
| `context-mapping` | Définir les relations entre contextes (Shared Kernel, ACL, etc.) |
| `ubiquitous-language` | Construire le vocabulaire partagé équipe/métier |
| `core-domain-identification` | Classifier Core / Supporting / Generic domains |
| `event-storming` | Faciliter les ateliers de découverte par événements |
| `domain-storytelling` | Narration visuelle des processus métier |
| `example-mapping` | Découverte par exemples et règles métier (Given-When-Then) |

### Tactical (Niveau implémentation) - 13 agents

| Agent | Responsabilité |
|-------|----------------|
| `orchestrator` | Route vers l'agent tactical approprié |
| `entities` | Modéliser les entités avec identité et comportement |
| `value-objects` | Créer des objets valeur immuables |
| `aggregates` | Définir les agrégats, racines et invariants |
| `repositories` | Concevoir les interfaces de persistance |
| `domain-services` | Implémenter la logique métier transverse |
| `domain-events` | Modéliser les événements du domaine |
| `factories` | Encapsuler la création complexe d'agrégats |
| `specifications` | Règles métier composables et réutilisables |
| `domain-primitives` | Types primitifs typés (IDs, Email, Money...) |
| `application-services` | Use Cases et orchestration applicative |
| `anti-corruption-layer` | Protéger le domaine des modèles externes/legacy |
| `clean-architecture` | Structurer le code en couches concentriques |

### Tooling (Outils) - 1 agent

| Agent | Responsabilité |
|-------|----------------|
| `model-validator` | Auditer un modèle DDD, détecter les anti-patterns |

---

## Table de Routage

### Routage Principal (Strategic vs Tactical)

| Mots-clés | Domaine | Agent par défaut |
|-----------|---------|------------------|
| bounded context, sous-domaine, frontière, périmètre | strategic | bounded-contexts |
| context map, relation, upstream, downstream, ACL | strategic | context-mapping |
| vocabulaire, glossaire, terme, langage, ubiquitous | strategic | ubiquitous-language |
| core domain, supporting, generic, priorisation, valeur stratégique | strategic | core-domain-identification |
| event storming, atelier, sticky, événement métier | strategic | event-storming |
| storytelling, processus, narration, pictogramme | strategic | domain-storytelling |
| example mapping, user story, règle, exemple, cas limite | strategic | example-mapping |
| entity, entité, identité, cycle de vie | tactical | entities |
| value object, valeur, immuable, égalité structurelle | tactical | value-objects |
| aggregate, agrégat, racine, invariant, consistance | tactical | aggregates |
| repository, persistance, collection, stockage | tactical | repositories |
| domain service, service métier, logique transverse | tactical | domain-services |
| domain event, événement, notification, réaction | tactical | domain-events |
| factory, création, construction, instanciation | tactical | factories |
| specification, règle métier, critère, filtre, policy | tactical | specifications |
| domain primitive, type, typage, id, email, money | tactical | domain-primitives |
| application service, use case, command, query, orchestration | tactical | application-services |
| anti-corruption layer, ACL, legacy, traduction, isolation, externe | tactical | anti-corruption-layer |
| clean architecture, couche, layer, adapter, port | tactical | clean-architecture |
| audit, validation, anti-pattern, qualité, review, santé modèle | tooling | model-validator |

### Routage par Phase de Projet

| Phase | Agents recommandés |
|-------|-------------------|
| Découverte initiale | event-storming → domain-storytelling → ubiquitous-language |
| Priorisation | core-domain-identification |
| Délimitation | bounded-contexts → context-mapping |
| Spécification | example-mapping → ubiquitous-language |
| Modélisation | domain-primitives → entities → value-objects → aggregates |
| Patterns avancés | factories → specifications → domain-events |
| Architecture | clean-architecture → repositories → application-services |
| Intégration externe | anti-corruption-layer → context-mapping |
| Audit & Qualité | model-validator |

---

## Workflow Recommandé

```
┌─────────────────────────────────────────────────────────────────┐
│                        DÉCOUVERTE                                │
│  ┌─────────────┐    ┌──────────────┐    ┌─────────────────┐     │
│  │   Event     │───▶│   Domain     │───▶│    Example      │     │
│  │  Storming   │    │ Storytelling │    │    Mapping      │     │
│  └─────────────┘    └──────────────┘    └─────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      STRUCTURATION                               │
│  ┌─────────────┐    ┌──────────────┐    ┌─────────────────┐     │
│  │  Bounded    │───▶│   Context    │───▶│   Ubiquitous    │     │
│  │  Contexts   │    │   Mapping    │    │    Language     │     │
│  └─────────────┘    └──────────────┘    └─────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MODÉLISATION                                │
│  ┌─────────────┐    ┌──────────────┐    ┌─────────────────┐     │
│  │  Entities   │───▶│    Value     │───▶│   Aggregates    │     │
│  │             │    │   Objects    │    │                 │     │
│  └─────────────┘    └──────────────┘    └─────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     IMPLÉMENTATION                               │
│  ┌─────────────┐    ┌──────────────┐    ┌─────────────────┐     │
│  │   Clean     │───▶│ Repositories │───▶│    Domain       │     │
│  │Architecture │    │              │    │   Services      │     │
│  └─────────────┘    └──────────────┘    └─────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Méthode de Découverte

Quand un utilisateur demande de modéliser un domaine, proposer le choix :

> **Quelle méthode de découverte préfères-tu ?**
> 1. **Event Storming** - Idéal pour découverte globale, équipes nombreuses
> 2. **Domain Storytelling** - Idéal pour communication avec métiers, documentation
> 3. **Example Mapping** - Idéal pour user stories, règles précises, cas limites

---

## Livrables

| Livrable | Format | Agent source |
|----------|--------|--------------|
| Context Map | Diagramme Mermaid/PlantUML | context-mapping |
| Glossaire Ubiquitous Language | Markdown table | ubiquitous-language |
| Event Storming Board | Markdown structuré | event-storming |
| Modèle de domaine | Code + diagramme | aggregates |
| Structure Clean Architecture | Arborescence de dossiers | clean-architecture |

---

## Redirections vers autres Skills

| Situation | Skill cible |
|-----------|-------------|
| Implémentation API/code détaillé | `backend-developer` |
| Tests unitaires/intégration | `testing-process` |
| Refactoring de legacy | `legacy-modernization` |
| Décisions d'infrastructure | `devops` |
| Architecture technique globale | `direction-technique` |

---

## Exemples d'Utilisation

### Exemple 1 : Découverte d'un nouveau domaine
```
User: Je dois modéliser un système de réservation de salles

DDD Skill:
1. Propose Event Storming pour découvrir les événements métier
2. Identifie les Bounded Contexts (Réservation, Salles, Utilisateurs, Facturation)
3. Construit le Context Map et l'Ubiquitous Language
4. Modélise les Aggregates (Reservation, Room, TimeSlot)
```

### Exemple 2 : Modélisation tactique
```
User: Comment structurer mon agrégat Commande ?

DDD Skill (tactical/aggregates):
1. Identifie la racine d'agrégat (Order)
2. Définit les entités enfants (OrderLine)
3. Crée les Value Objects (Money, Address, OrderStatus)
4. Établit les invariants métier
5. Propose la structure Clean Architecture
```
