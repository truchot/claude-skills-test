---
name: architecture-applicative
description: Architecture logicielle et applicative
---

# Architecture Applicative

Tu conçois l'**architecture logicielle** des applications : structure du code, composants, et interactions.

## Contexte

Intervient pour :
- Définir la structure du code
- Choisir les patterns architecturaux
- Organiser les modules et couches
- Définir les interfaces entre composants

## Entrées Requises

| Information | Source | Obligatoire |
|-------------|--------|-------------|
| Stack technique | `avant-projet/selection-stack` | Oui |
| Spécifications | `specification/*` | Oui |
| Contraintes techniques | `specification/cadrage-technique` | Oui |

## Styles Architecturaux

### 1. Architecture en Couches (Layered)

```
┌─────────────────────────────────┐
│       Presentation Layer        │  ← UI, Controllers
├─────────────────────────────────┤
│       Application Layer         │  ← Use Cases, Services
├─────────────────────────────────┤
│         Domain Layer            │  ← Business Logic, Entities
├─────────────────────────────────┤
│      Infrastructure Layer       │  ← DB, External Services
└─────────────────────────────────┘
```

**Quand l'utiliser** : Applications CRUD, projets simples à moyens

**Structure de dossiers** :
```
src/
├── presentation/     # Controllers, Views, DTOs
├── application/      # Use cases, Application services
├── domain/           # Entities, Value Objects, Domain Services
└── infrastructure/   # Repositories, External APIs, DB
```

### 2. Clean Architecture

```
                    ┌─────────────────┐
                    │   Controllers   │
                    │   Presenters    │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   Use Cases     │
                    │   Interactors   │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │    Entities     │
                    │  Business Rules │
                    └─────────────────┘
```

**Quand l'utiliser** : Applications complexes, domaine métier riche

**Structure de dossiers** :
```
src/
├── core/
│   ├── entities/         # Business entities
│   └── use-cases/        # Application use cases
├── adapters/
│   ├── controllers/      # HTTP controllers
│   ├── presenters/       # Output formatters
│   └── gateways/         # Interface implementations
└── frameworks/
    ├── web/              # Express, Fastify...
    └── database/         # TypeORM, Prisma...
```

### 3. Architecture Hexagonale (Ports & Adapters)

```
              ┌──────────────────────────────┐
              │         ADAPTERS             │
              │  ┌────────────────────────┐  │
   Driving    │  │                        │  │  Driven
   Adapters   │  │        DOMAIN          │  │  Adapters
   (Primary)  │  │                        │  │  (Secondary)
      ──────► │  │   ┌──────────────┐     │  │ ◄──────
   REST API   │  │   │   Business   │     │  │   DB
   CLI        │  │   │    Logic     │     │  │   APIs
   Events     │  │   └──────────────┘     │  │   Queue
              │  │                        │  │
              │  └────────────────────────┘  │
              └──────────────────────────────┘
                        │       │
                     Ports   Ports
                      (In)    (Out)
```

**Quand l'utiliser** : Applications nécessitant forte testabilité, multiples interfaces

**Structure de dossiers** :
```
src/
├── domain/
│   ├── models/           # Domain models
│   ├── services/         # Domain services
│   └── ports/            # Interfaces (in & out)
├── application/
│   └── use-cases/        # Application services
└── adapters/
    ├── primary/          # Controllers, CLI
    │   ├── http/
    │   └── cli/
    └── secondary/        # Repositories, APIs
        ├── persistence/
        └── external/
```

### 4. Architecture Modulaire / Feature-based

```
src/
├── modules/
│   ├── user/
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── user.repository.ts
│   │   ├── user.entity.ts
│   │   └── user.module.ts
│   ├── order/
│   │   ├── order.controller.ts
│   │   └── ...
│   └── product/
│       └── ...
└── shared/
    ├── database/
    ├── utils/
    └── middleware/
```

**Quand l'utiliser** : Applications de taille moyenne, équipes feature-based

### 5. Microservices

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   User      │  │   Order     │  │   Product   │
│   Service   │  │   Service   │  │   Service   │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       └────────────────┼────────────────┘
                        │
               ┌────────▼────────┐
               │   API Gateway   │
               └─────────────────┘
```

**Quand l'utiliser** : Grandes applications, équipes multiples, scaling indépendant

## Patterns par Couche

### Couche Présentation

| Pattern | Usage |
|---------|-------|
| MVC | Web traditionnelle |
| MVVM | Applications réactives |
| Presenter | Formatage de sortie |
| DTO | Transfert de données |

### Couche Application

| Pattern | Usage |
|---------|-------|
| Command/Query (CQRS) | Séparation lecture/écriture |
| Use Case | Actions métier |
| Application Service | Orchestration |
| Saga | Transactions distribuées |

### Couche Domaine

| Pattern | Usage |
|---------|-------|
| Entity | Objets avec identité |
| Value Object | Objets immuables |
| Aggregate | Groupe d'entités |
| Domain Service | Logique cross-entity |
| Repository (interface) | Accès aux données |
| Domain Event | Communication inter-domaine |

### Couche Infrastructure

| Pattern | Usage |
|---------|-------|
| Repository (impl) | Accès BDD |
| Gateway | APIs externes |
| Adapter | Intégrations |
| Factory | Création d'objets complexes |

## Sortie : Document d'Architecture Applicative

```markdown
# Architecture Applicative

## Projet : [Nom]
## Version : 1.0
## Date : [Date]

---

## 1. Vue d'Ensemble

### Style Architectural
[Layered / Clean / Hexagonal / Modulaire / Microservices]

### Justification
[Pourquoi ce choix]

### Diagramme de Composants
[Diagramme C4 Level 3]

---

## 2. Structure du Code

### Organisation des Dossiers
```
[Structure de dossiers]
```

### Conventions
| Élément | Convention |
|---------|------------|
| Fichiers | kebab-case |
| Classes | PascalCase |
| Fonctions | camelCase |
| Constantes | UPPER_SNAKE_CASE |

---

## 3. Composants Principaux

### 3.1 [Composant A]

**Responsabilité** : [Description]

**Interface** :
```typescript
interface IComponentA {
  method1(param: Type): ReturnType;
}
```

**Dépendances** :
- [Composant B]
- [Composant C]

### 3.2 [Composant B]
[...]

---

## 4. Flux de Données

### Flux Principal
```
Request → Controller → Use Case → Repository → Database
                ↓
            Response
```

### Diagramme de Séquence
[Diagramme pour les flux critiques]

---

## 5. Gestion des Erreurs

### Stratégie
[Description de la stratégie]

### Types d'Erreurs
| Type | Usage | HTTP Code |
|------|-------|-----------|
| ValidationError | Données invalides | 400 |
| NotFoundError | Ressource absente | 404 |
| BusinessError | Règle métier violée | 422 |
| SystemError | Erreur technique | 500 |

---

## 6. Gestion de l'État

### Frontend
[Redux / Zustand / Context / ...]

### Backend
[Stateless / Session / Cache / ...]

---

## 7. Communication Inter-Composants

### Synchrone
- HTTP/REST entre services
- Appels de méthodes internes

### Asynchrone
- Events/Messages via [RabbitMQ/Kafka/...]
- WebSockets pour temps réel

---

## 8. Testabilité

### Stratégie
| Couche | Type de Test | Coverage cible |
|--------|--------------|----------------|
| Domain | Unit | > 90% |
| Application | Unit + Integration | > 80% |
| Infrastructure | Integration | > 60% |
| E2E | E2E | Parcours critiques |

### Mocking
[Stratégie de mocking par couche]

---

## 9. Évolutivité

### Points d'Extension
- [Point d'extension 1]
- [Point d'extension 2]

### Migrations Prévues
[Évolutions architecturales anticipées]
```

## Références

| Aspect | Agent de référence |
|--------|-------------------|
| Patterns | `architecture/patterns-design` |
| Principes | `web-dev-process/design/architecture` |
| Data modeling | `specification/modelisation-donnees` |
| Tests | `qualite/*` |

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Architecture complexe | Review par senior/architect |
| Choix structurant | ADR + validation équipe |
| Impact performance | Consultation performance/ |
| Domaine métier complexe | Collaboration avec experts métier |
