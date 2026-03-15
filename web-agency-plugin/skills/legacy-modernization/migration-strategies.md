# Migration Strategies

## Comparatif des Stratégies

| Stratégie | Risque | Durée | Complexité | Quand utiliser |
|-----------|--------|-------|------------|----------------|
| Strangler Fig | Bas | Long | Moyenne | Remplacement progressif |
| Branch by Abstraction | Bas | Moyen | Moyenne | Changement d'implémentation |
| Parallel Run | Très bas | Long | Haute | Criticité maximale (paiements) |
| Big Bang Rewrite | TRES HAUT | Variable | Haute | JAMAIS (anti-pattern) |

## Strangler Fig (recommandé par défaut)

```
Façade/Proxy route le trafic :

Phase 1:  Legacy [████████████] 100% → Nouveau [            ] 0%
Phase 2:  Legacy [████████    ]  70% → Nouveau [████        ] 30%
Phase 3:  Legacy [████        ]  30% → Nouveau [████████    ] 70%
Phase 4:  Legacy [            ]   0% → Nouveau [████████████] 100%
```

```typescript
// Proxy/Façade avec feature flags
class ServiceProxy {
  async handleRequest(req: Request) {
    if (featureFlags.isEnabled('new-user-service', req.userId)) {
      return newService.handle(req);  // Nouveau système
    }
    return legacyService.handle(req);  // Legacy
  }
}
```

**Étapes** : Identifier le périmètre > Créer la façade > Implémenter le nouveau > Router progressivement > Supprimer le legacy

## Branch by Abstraction

```
1. Insérer une interface devant le legacy
2. Implémenter la nouvelle version derrière l'interface
3. Basculer via configuration
4. Supprimer l'ancienne implémentation
```

```typescript
// Étape 1 : Interface
interface PaymentProcessor {
  processPayment(amount: number): Promise<Result>;
}

// Étape 2 : Legacy implémente l'interface
class LegacyPayment implements PaymentProcessor { ... }

// Étape 3 : Nouveau implémente la même interface
class StripePayment implements PaymentProcessor { ... }

// Étape 4 : Switch via config
const processor: PaymentProcessor = config.useNewPayment
  ? new StripePayment() : new LegacyPayment();
```

## Parallel Run

```typescript
async function processOrder(order: Order) {
  const [legacyResult, newResult] = await Promise.allSettled([
    legacySystem.process(order),
    newSystem.process(order),
  ]);

  // Comparer les résultats (logging, pas de blocage)
  if (JSON.stringify(legacyResult) !== JSON.stringify(newResult)) {
    logger.warn('Divergence detected', { legacyResult, newResult });
  }

  return legacyResult;  // Legacy fait foi jusqu'à confiance établie
}
```

## Migration de Données

### Stratégies
| Approche | Downtime | Complexité | Quand |
|----------|----------|------------|-------|
| ETL one-shot | Oui (fenêtre) | Basse | Petites BDD |
| Sync bidirectionnelle (CDC) | Non | Haute | Grosse BDD, zero downtime |
| Double-write | Non | Moyenne | Transition progressive |

### Checklist Migration Données
- [ ] Schema nouveau défini et validé
- [ ] Script de migration écrit et testé
- [ ] Données de test migrées et vérifiées
- [ ] Rollback testé (retour arrière possible)
- [ ] Validation intégrité post-migration
- [ ] Performance vérifiée sur volume réel

## Refactoring Incrémental

### Identifier les Seams (points de découpe)
```
Seam = endroit où on peut intercepter le comportement sans modifier le code
- Interface/Abstraction
- Point d'injection de dépendance
- Appel API/Service
- Event/Message
```

### Approche
1. Couvrir par tests de caractérisation
2. Identifier les seams
3. Extraire petit module derrière interface
4. Tester le nouveau module isolément
5. Basculer progressivement

## Feature Flags pour Migration

```typescript
// Bascule progressive
const flags = {
  'new-checkout': { enabled: true, rollout: 25 },    // 25% des users
  'new-search': { enabled: true, rollout: 100 },      // 100% (migration terminée)
  'new-auth': { enabled: false, rollout: 0 },          // Pas encore
};
```

## Checklist Migration Production

- [ ] Tests de caractérisation sur le legacy
- [ ] Stratégie choisie et documentée (ADR)
- [ ] Façade/proxy en place
- [ ] Feature flags configurés
- [ ] Monitoring différentiel (legacy vs nouveau)
- [ ] Plan de rollback testé
- [ ] Chaque étape réversible
- [ ] Validation métier à chaque phase
- [ ] Communication stakeholders
- [ ] Suppression du legacy planifiée (ne pas oublier)

## Anti-Patterns à Éviter

| Anti-Pattern | Risque | Alternative |
|-------------|--------|-------------|
| Big Bang Rewrite | Échec > 70% | Strangler Fig |
| Pas de tests avant refactoring | Régressions | Tests caractérisation |
| Migration données one-shot | Downtime | Sync bidirectionnelle |
| Ignorer le legacy | Dette croissante | Bubble Context (DDD) |
| Copier-coller le legacy | Bugs copiés | Repenser le design |
