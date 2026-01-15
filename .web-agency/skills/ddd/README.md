# DDD Skill - Domain-Driven Design

Skill de modélisation métier basé sur les principes du Domain-Driven Design.

## Vue d'ensemble

| Métrique | Valeur |
|----------|--------|
| Version | 1.2.0 |
| Agents | 26 |
| Domaines | 3 (strategic, tactical, tooling) |
| Niveau | Transversal |

## Quand utiliser ce skill

1. Tu dois **comprendre un domaine métier complexe**
2. Tu veux **identifier les bounded contexts** d'un système
3. Tu dois créer un **ubiquitous language** partagé
4. Tu veux **modéliser des entités et agrégats**
5. Tu dois **structurer du code** selon Clean Architecture

## Structure

```
ddd/
├── SKILL.md              # Définition principale et routage
├── README.md             # Ce fichier
├── CHANGELOG.md          # Historique des versions
└── agents/
    ├── strategic/        # 8 agents - Découverte et structuration
    ├── tactical/         # 16 agents - Patterns d'implémentation
    └── tooling/          # 2 agents - Outils et aide à la décision
```

## Domaines

### Strategic (8 agents)
Niveau conceptuel - **POURQUOI** et **QUOI**

- Découverte : Event Storming, Domain Storytelling, Example Mapping
- Structuration : Bounded Contexts, Context Mapping, Ubiquitous Language
- Priorisation : Core Domain Identification

### Tactical (16 agents)
Niveau implémentation - **COMMENT**

- Building blocks : Entities, Value Objects, Aggregates
- Infrastructure : Repositories, Factories, Domain Services
- Événements : Domain Events
- Patterns avancés : CQRS, Event Sourcing, Saga/Process Manager
- Architecture : Clean Architecture, Application Services, ACL

### Tooling (2 agents)
Outils transverses

- **model-validator** : Audit et détection d'anti-patterns
- **pattern-selector** : Aide au choix du bon pattern

## Workflow recommandé

```
Découverte → Structuration → Modélisation → Implémentation → Audit
```

1. **Découverte** : Event Storming → Domain Storytelling → Example Mapping
2. **Priorisation** : Core Domain Identification
3. **Structuration** : Bounded Contexts → Context Mapping → Ubiquitous Language
4. **Modélisation** : Entities → Value Objects → Aggregates
5. **Architecture** : Clean Architecture → Repositories → Application Services
6. **Patterns avancés** : CQRS → Event Sourcing → Sagas (si nécessaire)
7. **Audit** : Model Validator

## Redirections

| Besoin | Skill cible |
|--------|-------------|
| Implémentation API détaillée | `backend-developer` |
| Tests unitaires/intégration | `testing-process` |
| Refactoring legacy | `legacy-modernization` |
| Infrastructure | `devops` |

## Ressources

- [Domain-Driven Design (Eric Evans)](https://www.domainlanguage.com/ddd/)
- [Implementing DDD (Vaughn Vernon)](https://www.oreilly.com/library/view/implementing-domain-driven-design/9780133039900/)
- [Event Storming (Alberto Brandolini)](https://www.eventstorming.com/)
