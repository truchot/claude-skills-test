---
name: ddd
description: >-
  Domain-Driven Design - Modelisation metier et conception de domaines complexes.
  TRIGGER when: dossier domain/, entities/, bounded contexts, aggregats, ubiquitous language.
---

## Domaines d'expertise

- **Strategic DDD** - Bounded Contexts, Context Mapping, Ubiquitous Language, Event Storming, Domain Storytelling, Example Mapping
- **Tactical DDD** - Entities, Value Objects, Aggregates, Repositories, Domain Services, Domain Events, CQRS, Event Sourcing (voir `tactical-patterns.md`)
- **Architecture** - Clean Architecture, Anti-Corruption Layer, Application Services
- **Tooling** - Model Validator, Pattern Selector, Performance Guide
- **Templates** - Aggregate, Value Object, Repository scaffolding

## Patterns essentiels

### Principes fondamentaux
1. **Le metier d'abord** - Le code reflete fidelement le domaine metier
2. **Langage ubiquitaire** - Vocabulaire partage entre devs et experts metier
3. **Bounded Contexts** - Frontieres claires entre sous-domaines
4. **Modele riche** - Logique metier dans le domaine, pas dans les services

### Workflow recommande
```
Decouverte          ->  Structuration       ->  Modelisation         ->  Implementation
Event Storming          Bounded Contexts        Entities                 Clean Architecture
Domain Storytelling     Context Mapping         Value Objects            Repositories
Example Mapping         Ubiquitous Language     Aggregates               Domain Services
```

### Strategic patterns
- **Bounded Context**: perimetre avec son propre modele et langage
- **Context Map**: relations entre contextes (Shared Kernel, ACL, Conformist, Customer/Supplier)
- **Core Domain**: identifier ce qui a le plus de valeur strategique
- **Event Storming**: decouverte par evenements metier (orange stickies)
- **Domain Storytelling**: narration visuelle des processus metier
- **Example Mapping**: decouverte par exemples et regles metier (Given-When-Then)

### Tactical patterns
- **Entity**: identite unique, mutable, cycle de vie (Customer, Order)
- **Value Object**: immuable, egalite par valeur (Money, Email, Address)
- **Aggregate**: groupe d'objets = unite de consistance, racine garantit invariants
- **Repository**: interface de persistance (collection-like)
- **Domain Service**: logique metier transverse ne relevant d'aucune entite
- **Domain Event**: notification de changement metier
- **Factory**: encapsuler creation complexe d'agregats
- **Specification**: regles metier composables et reutilisables
- **Domain Primitives**: types primitifs types (IDs, Email, Money)

### Architecture Clean
```
Domain (centre)     ->  Application        ->  Infrastructure
Entities, VOs           Use Cases              DB, APIs, UI
Aggregates              Command/Query          Frameworks
Domain Services         DTOs                   External services
Domain Events           Ports (interfaces)     Adapters (implementations)
```

### Patterns avances
- **CQRS**: modeles separes lecture/ecriture
- **Event Sourcing**: etat = sequence d'evenements
- **Saga / Process Manager**: workflows multi-agregats
- **Anti-Corruption Layer**: isoler le domaine du legacy/externe

## Anti-patterns critiques

- **Anemic Domain Model**: entites sans comportement (juste des getters/setters)
- **Smart Service, Dumb Entity**: logique metier dans les services au lieu du domaine
- **Aggregate trop gros**: tout dans un seul agregat (problemes de perf et concurrence)
- **References directes entre agregats**: utiliser des IDs, pas des references objet
- **Ignorer le langage ubiquitaire**: noms techniques au lieu de termes metier
- **Bounded Contexts trop grands ou absents**: monolithe conceptuel
- **Repository avec logique metier**: le repository est une collection, pas un service
- **CRUD deguise en DDD**: sur-engineering pour du simple CRUD

## Escalation

- **backend-developer**: implementation technique API, base de donnees, infrastructure
- **frontend-developer**: integration UI avec le domaine
- **nextjs-expert**: integration DDD avec App Router et Server Actions
- **design-system**: coherence entre modele metier et composants UI
