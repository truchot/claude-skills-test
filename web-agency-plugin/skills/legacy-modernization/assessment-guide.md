# Assessment & Audit Legacy

## Framework d'Audit

### 1. Architecture
```markdown
## Stack Technique
| Couche | Technologie | Version | Fin de support |
|--------|-------------|---------|----------------|
| Frontend | | | |
| Backend | | | |
| Database | | | |
| Infra | | | |

## Patterns Identifiés
- [ ] Monolithe / Microservices / SOA
- [ ] MVC / Layered / Hexagonal
- [ ] Sync / Async / Event-driven
```

### 2. Code Quality
| Métrique | Valeur | Seuil | Status |
|----------|--------|-------|--------|
| Couverture tests | % | > 80% | |
| Complexité cyclomatique | | < 10 | |
| Duplication | % | < 5% | |
| Couplage | | Faible | |

**Outils** : SonarQube, CodeClimate, ESLint

### 3. Dépendances
```markdown
| Package | Version | Latest | CVEs | Maintenance |
|---------|---------|--------|------|-------------|
| | | | | |

Actions : upgrade, remplacer deprecated, patcher CVEs
```

### 4. Infrastructure
| Env | Infra | Monitoring | Backup | DR Plan |
|-----|-------|------------|--------|---------|
| Prod | | | | |
| Staging | | | | |

### 5. Business Risk Score

| Facteur | Score (1-5) | Poids |
|---------|-------------|-------|
| Versions obsolètes | | 3x |
| CVEs non patchées | | 3x |
| Tests absents | | 2x |
| Documentation absente | | 1x |
| Couplage fort | | 2x |
| Bus factor (1 seul dev) | | 2x |

**Score total** = somme(score x poids) / somme(poids)
- < 2 : Acceptable - 2-3 : Attention - > 3 : Critique

## Cartographie des Dépendances

```
┌─────────┐     ┌─────────┐     ┌─────────┐
│ Module A │────▶│ Module B │────▶│ Module C │
└─────────┘     └────┬────┘     └─────────┘
                     │
                     ▼
                ┌─────────┐
                │ Module D │ (couplage fort = risque)
                └─────────┘
```

**Identifier** : points d'entrée, dépendances circulaires, modules critiques, code mort.

## Estimation Business Case

### Coûts de modernisation
| Phase | Effort (j/h) | Coût | Risque |
|-------|-------------|------|--------|
| Assessment | 2-5 j | | Bas |
| Tests caractérisation | 5-15 j | | Bas |
| Migration phase 1 | | | |
| Migration phase 2 | | | |

### Coûts de ne rien faire (dette)
| Impact | Coût annuel estimé |
|--------|-------------------|
| Temps debug supplémentaire | |
| Recrutement difficile (techno obsolète) | |
| Failles sécurité non patchées | |
| Performance dégradée | |

### ROI = (Coûts dette évités - Coûts modernisation) / Coûts modernisation

## Checklist Audit Complet

- [ ] Architecture documentée (schéma, composants, flux)
- [ ] Stack technique inventoriée (versions, support)
- [ ] Dépendances auditées (CVEs, obsolescence)
- [ ] Métriques code mesurées (complexité, duplication, coverage)
- [ ] Infrastructure évaluée (envs, monitoring, DR)
- [ ] Risques business scorés
- [ ] Cartographie dépendances réalisée
- [ ] Business case estimé (ROI modernisation)
- [ ] Recommandation stratégie (Strangler, Branch by Abstraction, etc.)
- [ ] Roadmap proposée avec phases et jalons

## Tests de Caractérisation (pré-refactoring)

```typescript
// Golden Master : capturer le comportement actuel
describe('Legacy Module X', () => {
  it('should produce expected output for known input', () => {
    const result = legacyFunction(knownInput);
    expect(result).toMatchSnapshot(); // Golden master
  });
});
```

**Règle** : toujours couvrir le legacy par des tests AVANT tout refactoring.

## Escalade

| Vers | Quand |
|------|-------|
| Direction technique | Choix stratégie, budget, périmètre |
| DDD | Bounded contexts, modélisation domaine |
| Humain | Logique métier non documentée, go/no-go prod |
