# Assessment & Audit Legacy

## Framework d'Audit

### 1. Stack Technique
| Couche | Technologie | Version | Fin de support |
|--------|-------------|---------|----------------|
| Frontend | | | |
| Backend | | | |
| Database | | | |
| Infra | | | |

### 2. Code Quality
| Métrique | Valeur | Seuil | Outils |
|----------|--------|-------|--------|
| Couverture tests | % | > 80% | SonarQube |
| Complexité cyclomatique | | < 10 | CodeClimate |
| Duplication | % | < 5% | ESLint |
| Couplage | | Faible | |

### 3. Dépendances
| Package | Version | Latest | CVEs | Maintenance |
|---------|---------|--------|------|-------------|
Actions : upgrade, remplacer deprecated, patcher CVEs

### 4. Infrastructure
| Env | Infra | Monitoring | Backup | DR Plan |
|-----|-------|------------|--------|---------|

## Business Risk Score

| Facteur | Score (1-5) | Poids |
|---------|-------------|-------|
| Versions obsolètes | | 3x |
| CVEs non patchées | | 3x |
| Tests absents | | 2x |
| Documentation absente | | 1x |
| Couplage fort | | 2x |
| Bus factor (1 dev) | | 2x |

Score = somme(score x poids) / somme(poids). < 2 OK | 2-3 Attention | > 3 Critique

## Cartographie Dépendances

Identifier : points d'entrée, dépendances circulaires, modules critiques, code mort.

## Estimation Business Case

| Poste | Coût |
|-------|------|
| Assessment | 2-5 jours |
| Tests caractérisation | 5-15 jours |
| Migration phase 1 | à estimer |
| Coût annuel dette (ne rien faire) | à estimer |

**ROI** = (Coûts dette évités - Coûts modernisation) / Coûts modernisation

## Tests de Caractérisation (pré-refactoring)

```typescript
// Golden Master : capturer le comportement actuel
describe('Legacy Module X', () => {
  it('produces expected output', () => {
    const result = legacyFunction(knownInput);
    expect(result).toMatchSnapshot();
  });
});
```

**Règle** : toujours couvrir le legacy par des tests AVANT tout refactoring.

## Checklist Audit Complet

- [ ] Architecture documentée (schéma, composants, flux)
- [ ] Stack inventoriée (versions, support)
- [ ] Dépendances auditées (CVEs, obsolescence)
- [ ] Métriques code mesurées
- [ ] Infrastructure évaluée
- [ ] Risques business scorés
- [ ] Cartographie dépendances
- [ ] Business case estimé (ROI)
- [ ] Stratégie recommandée (Strangler, Branch by Abstraction...)
- [ ] Roadmap avec phases et jalons

## Escalade

| Vers | Quand |
|------|-------|
| Direction technique | Choix stratégie, budget, périmètre |
| DDD | Bounded contexts, modélisation domaine |
| Humain | Logique métier non documentée, go/no-go prod |
