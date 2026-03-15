# Migration Strategies

## Comparatif

| Stratégie | Risque | Durée | Quand |
|-----------|--------|-------|-------|
| Strangler Fig | Bas | Long | Remplacement progressif (défaut) |
| Branch by Abstraction | Bas | Moyen | Changement d'implémentation |
| Parallel Run | Très bas | Long | Criticité max (paiements) |
| Big Bang Rewrite | TRES HAUT | Variable | JAMAIS (anti-pattern) |

## Strangler Fig (recommandé)

```
Phase 1: Legacy 100% → Nouveau 0%    (façade en place)
Phase 2: Legacy 70%  → Nouveau 30%   (migration progressive)
Phase 3: Legacy 30%  → Nouveau 70%
Phase 4: Legacy 0%   → Nouveau 100%  (legacy supprimé)
```

```typescript
class ServiceProxy {
  async handle(req: Request) {
    if (featureFlags.isEnabled('new-service', req.userId))
      return newService.handle(req);
    return legacyService.handle(req);
  }
}
```

## Branch by Abstraction

```typescript
// 1. Interface devant le legacy
interface PaymentProcessor { process(amount: number): Promise<Result>; }
// 2. Legacy implémente l'interface
class LegacyPayment implements PaymentProcessor { ... }
// 3. Nouveau implémente la même interface
class StripePayment implements PaymentProcessor { ... }
// 4. Switch via config
const processor: PaymentProcessor = config.useNew
  ? new StripePayment() : new LegacyPayment();
```

## Parallel Run

```typescript
async function processOrder(order: Order) {
  const [legacy, nouveau] = await Promise.allSettled([
    legacySystem.process(order), newSystem.process(order),
  ]);
  if (JSON.stringify(legacy) !== JSON.stringify(nouveau))
    logger.warn('Divergence', { legacy, nouveau });
  return legacy; // Legacy fait foi jusqu'à confiance établie
}
```

## Migration de Données

| Approche | Downtime | Quand |
|----------|----------|-------|
| ETL one-shot | Oui (fenêtre) | Petites BDD |
| Sync bidirectionnelle (CDC) | Non | Grosse BDD, zero downtime |
| Double-write | Non | Transition progressive |

## Refactoring Incrémental

1. Couvrir par tests de caractérisation (golden master)
2. Identifier les seams (interface, injection, API, event)
3. Extraire petit module derrière interface
4. Tester isolément, basculer progressivement

## Feature Flags

```typescript
const flags = {
  'new-checkout': { enabled: true, rollout: 25 },  // 25% users
  'new-search': { enabled: true, rollout: 100 },    // Terminé
  'new-auth': { enabled: false },                    // Pas encore
};
```

## Checklist Migration

- [ ] Tests de caractérisation sur le legacy
- [ ] Stratégie documentée (ADR)
- [ ] Façade/proxy en place
- [ ] Feature flags configurés
- [ ] Monitoring différentiel
- [ ] Plan rollback testé, chaque étape réversible
- [ ] Validation métier à chaque phase
- [ ] Suppression legacy planifiée

## Anti-Patterns

| Anti-Pattern | Alternative |
|-------------|-------------|
| Big Bang Rewrite | Strangler Fig |
| Pas de tests avant refactoring | Tests caractérisation |
| Migration données one-shot | Sync bidirectionnelle |
| Copier-coller le legacy | Repenser le design |
