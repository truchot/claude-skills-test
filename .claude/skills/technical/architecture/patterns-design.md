---
name: patterns-design
description: Patterns de conception et bonnes pratiques architecturales
---

# Patterns de Design

Tu guides l'application des **patterns de conception** et des bonnes pratiques architecturales.

## Contexte

Intervient pour :
- Recommander des patterns adaptés
- Expliquer l'application de patterns
- Résoudre des problèmes de design
- Éviter les anti-patterns

## Catégories de Patterns

### 1. Patterns Créationnels

| Pattern | Problème résolu | Quand l'utiliser |
|---------|-----------------|------------------|
| **Factory** | Création d'objets sans exposer la logique | Objets complexes, familles d'objets |
| **Abstract Factory** | Familles d'objets liés | Thèmes UI, configurations multi-env |
| **Builder** | Construction étape par étape | Objets avec beaucoup de paramètres |
| **Singleton** | Instance unique | Config, connexion DB, logger |
| **Prototype** | Clonage d'objets | Objets coûteux à créer |

#### Exemple : Factory

```typescript
// Factory Pattern
interface PaymentProcessor {
  process(amount: number): Promise<PaymentResult>;
}

class StripeProcessor implements PaymentProcessor {
  async process(amount: number): Promise<PaymentResult> {
    // Stripe implementation
  }
}

class PayPalProcessor implements PaymentProcessor {
  async process(amount: number): Promise<PaymentResult> {
    // PayPal implementation
  }
}

class PaymentProcessorFactory {
  static create(type: 'stripe' | 'paypal'): PaymentProcessor {
    switch (type) {
      case 'stripe': return new StripeProcessor();
      case 'paypal': return new PayPalProcessor();
      default: throw new Error('Unknown processor');
    }
  }
}
```

### 2. Patterns Structurels

| Pattern | Problème résolu | Quand l'utiliser |
|---------|-----------------|------------------|
| **Adapter** | Interface incompatible | Intégration de librairies tierces |
| **Decorator** | Ajouter des comportements | Logging, caching, validation |
| **Facade** | Interface simplifiée | API complexe à simplifier |
| **Proxy** | Contrôle d'accès | Lazy loading, caching, sécurité |
| **Composite** | Structures arborescentes | Menus, fichiers, organisations |

#### Exemple : Adapter

```typescript
// Adapter Pattern - Intégration API tierce
interface InternalUser {
  id: string;
  fullName: string;
  email: string;
}

// API externe avec format différent
interface ExternalUserResponse {
  user_id: number;
  first_name: string;
  last_name: string;
  email_address: string;
}

class ExternalUserAdapter {
  static toInternal(external: ExternalUserResponse): InternalUser {
    return {
      id: String(external.user_id),
      fullName: `${external.first_name} ${external.last_name}`,
      email: external.email_address
    };
  }
}
```

### 3. Patterns Comportementaux

| Pattern | Problème résolu | Quand l'utiliser |
|---------|-----------------|------------------|
| **Strategy** | Algorithmes interchangeables | Calculs variables, sorting |
| **Observer** | Notification de changements | Events, UI réactif |
| **Command** | Encapsuler des actions | Undo/redo, queues |
| **State** | Comportement selon état | Workflows, state machines |
| **Chain of Responsibility** | Chaîne de handlers | Middleware, validation |

#### Exemple : Strategy

```typescript
// Strategy Pattern
interface PricingStrategy {
  calculate(basePrice: number, quantity: number): number;
}

class RegularPricing implements PricingStrategy {
  calculate(basePrice: number, quantity: number): number {
    return basePrice * quantity;
  }
}

class BulkPricing implements PricingStrategy {
  calculate(basePrice: number, quantity: number): number {
    if (quantity >= 10) return basePrice * quantity * 0.9;
    return basePrice * quantity;
  }
}

class PremiumPricing implements PricingStrategy {
  calculate(basePrice: number, quantity: number): number {
    return basePrice * quantity * 0.8;
  }
}

class Order {
  constructor(private pricingStrategy: PricingStrategy) {}

  getTotal(basePrice: number, quantity: number): number {
    return this.pricingStrategy.calculate(basePrice, quantity);
  }
}
```

### 4. Patterns Architecturaux

| Pattern | Usage | Complexité |
|---------|-------|------------|
| **MVC** | Applications web traditionnelles | Faible |
| **MVVM** | Applications réactives | Moyenne |
| **Repository** | Abstraction de la persistance | Faible |
| **Unit of Work** | Transactions cohérentes | Moyenne |
| **CQRS** | Séparation lecture/écriture | Élevée |
| **Event Sourcing** | Historique complet | Élevée |
| **Saga** | Transactions distribuées | Élevée |

#### Exemple : Repository

```typescript
// Repository Pattern
interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}

class PostgresUserRepository implements UserRepository {
  constructor(private db: Database) {}

  async findById(id: string): Promise<User | null> {
    const row = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
    return row ? this.mapToUser(row) : null;
  }

  // ... autres méthodes
}

// En test
class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, User>();

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) ?? null;
  }

  // ... autres méthodes
}
```

## Principes SOLID

### S - Single Responsibility

```typescript
// ❌ Mauvais
class User {
  save() { /* DB logic */ }
  sendEmail() { /* Email logic */ }
  generateReport() { /* Report logic */ }
}

// ✅ Bon
class User { /* Données utilisateur */ }
class UserRepository { save(user: User) { } }
class EmailService { send(to: string, content: string) { } }
class ReportGenerator { generate(user: User) { } }
```

### O - Open/Closed

```typescript
// ✅ Extensible sans modification
interface Discount {
  apply(price: number): number;
}

class PercentageDiscount implements Discount {
  constructor(private percent: number) {}
  apply(price: number) { return price * (1 - this.percent / 100); }
}

class FixedDiscount implements Discount {
  constructor(private amount: number) {}
  apply(price: number) { return price - this.amount; }
}
```

### L - Liskov Substitution

```typescript
// ❌ Viole LSP
class Bird { fly() { } }
class Penguin extends Bird { fly() { throw new Error("Can't fly"); } }

// ✅ Respecte LSP
interface Bird { move(): void; }
class FlyingBird implements Bird { move() { /* fly */ } }
class SwimmingBird implements Bird { move() { /* swim */ } }
```

### I - Interface Segregation

```typescript
// ❌ Interface trop large
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}

// ✅ Interfaces séparées
interface Workable { work(): void; }
interface Eatable { eat(): void; }
interface Sleepable { sleep(): void; }

class Human implements Workable, Eatable, Sleepable { }
class Robot implements Workable { }
```

### D - Dependency Inversion

```typescript
// ❌ Dépendance concrète
class OrderService {
  private repo = new MySQLOrderRepository();
}

// ✅ Dépendance abstraite (injection)
class OrderService {
  constructor(private repo: OrderRepository) {}
}
```

## Anti-Patterns à Éviter

| Anti-Pattern | Problème | Solution |
|--------------|----------|----------|
| **God Object** | Classe qui fait tout | Découper en classes spécialisées |
| **Spaghetti Code** | Code non structuré | Appliquer des patterns |
| **Copy-Paste** | Duplication | Extraire en fonctions/classes |
| **Magic Numbers** | Valeurs en dur | Constantes nommées |
| **Premature Optimization** | Optimiser trop tôt | Mesurer puis optimiser |
| **Over-Engineering** | Trop de complexité | YAGNI, KISS |
| **Leaky Abstraction** | Détails qui fuient | Meilleure encapsulation |

## Guide de Sélection

```
Quel problème ?
│
├─ Créer des objets ?
│  ├─ Objets complexes → Builder
│  ├─ Familles d'objets → Abstract Factory
│  └─ Instance unique → Singleton
│
├─ Structurer le code ?
│  ├─ Interface incompatible → Adapter
│  ├─ Ajouter des comportements → Decorator
│  └─ Simplifier une API → Facade
│
├─ Gérer des comportements ?
│  ├─ Algorithmes variables → Strategy
│  ├─ Notifications → Observer
│  └─ États multiples → State
│
└─ Architecturer l'application ?
   ├─ Accès données → Repository
   ├─ Lecture/écriture différents → CQRS
   └─ Historique complet → Event Sourcing
```

## Références

| Aspect | Agent de référence |
|--------|-------------------|
| Architecture | `architecture/architecture-applicative` |
| Décisions | `architecture/adr` |
| Principes généraux | `web-dev-process/design/architecture` |

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Pattern complexe (CQRS, ES) | Formation équipe + POC |
| Hésitation entre patterns | ADR pour documenter le choix |
| Anti-pattern détecté | Planifier refactoring |
