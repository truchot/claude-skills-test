# Tactical Patterns - DDD

## Entity
Objet avec identite unique qui persiste dans le temps.
```typescript
class Customer {
  private constructor(
    private readonly _id: CustomerId,
    private _name: string,
    private _email: Email,
    private _status: CustomerStatus
  ) {}

  static create(name: string, email: string): Customer {
    return new Customer(CustomerId.generate(), name, Email.create(email), 'active');
  }

  activate(): void {
    if (this._status === 'active') throw new DomainError('Already active');
    this._status = 'active';
  }

  equals(other: Customer): boolean { return this._id.equals(other._id); }
}
```
Question cle: "Si deux objets ont les memes attributs, sont-ils le meme objet?" Non -> Entity.

## Value Object
Immuable, egalite par valeur. Encapsule validation.
```typescript
class Money {
  private constructor(readonly amount: number, readonly currency: string) {
    if (amount < 0) throw new DomainError('Amount cannot be negative');
  }
  static of(amount: number, currency: string): Money { return new Money(amount, currency); }
  add(other: Money): Money {
    if (this.currency !== other.currency) throw new DomainError('Currency mismatch');
    return Money.of(this.amount + other.amount, this.currency);
  }
  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }
}

class Email {
  private constructor(readonly value: string) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new DomainError('Invalid email');
  }
  static create(value: string): Email { return new Email(value.toLowerCase()); }
}
```

## Aggregate
Unite de consistance avec racine qui protege les invariants.
```typescript
class Order {
  private _lines: OrderLine[] = [];
  private constructor(private readonly _id: OrderId, private _customerId: CustomerId) {}

  addLine(product: ProductId, quantity: number, price: Money): void {
    if (this._lines.length >= 50) throw new DomainError('Max 50 lines');
    this._lines.push(OrderLine.create(product, quantity, price));
  }

  get total(): Money {
    return this._lines.reduce((sum, line) => sum.add(line.subtotal), Money.of(0, 'EUR'));
  }
}
```
Regles: petits agregats, references par ID, une transaction = un agregat.

## Repository
Interface de persistance (collection-like).
```typescript
interface OrderRepository {
  findById(id: OrderId): Promise<Order | null>;
  save(order: Order): Promise<void>;
  nextId(): OrderId;
}
```

## Domain Service
Logique metier transverse (n'appartient a aucune entite).
```typescript
class PricingService {
  calculateDiscount(customer: Customer, order: Order): Money {
    if (customer.isVIP && order.total.amount > 100) return order.total.multiply(0.1);
    return Money.of(0, order.total.currency);
  }
}
```

## Domain Event
```typescript
class OrderPlaced implements DomainEvent {
  constructor(readonly orderId: OrderId, readonly customerId: CustomerId,
    readonly occurredOn = new Date()) {}
}
```

## Application Service (Use Case)
Orchestre sans logique metier.
```typescript
class PlaceOrderUseCase {
  constructor(private orders: OrderRepository, private eventBus: EventBus) {}
  async execute(cmd: PlaceOrderCommand): Promise<OrderId> {
    const order = Order.create(cmd.customerId);
    cmd.items.forEach(i => order.addLine(i.productId, i.quantity, i.price));
    await this.orders.save(order);
    await this.eventBus.publishAll(order.domainEvents);
    return order.id;
  }
}
```

## CQRS
- Command: modifie l'etat (PlaceOrderCommand -> Aggregate)
- Query: lit les donnees (GetOrderQuery -> ReadModel/Projection)
- Modeles separes optimises pour ecriture et lecture

## Specification
```typescript
class ActiveCustomerSpec implements Specification<Customer> {
  isSatisfiedBy(customer: Customer): boolean { return customer.status === 'active'; }
  and(other: Specification<Customer>): Specification<Customer> { return new AndSpec(this, other); }
}
```
