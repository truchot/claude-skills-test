# Deployment & Maintenance

## Stratégies de Déploiement

| Stratégie | Downtime | Rollback | Complexité | Usage |
|-----------|----------|----------|------------|-------|
| Recreate | Oui | Lent | Simple | Dev/staging |
| Rolling | Non | Moyen | Moyenne | Standard prod |
| Blue-Green | Non | Instantané | Haute | Prod critique |
| Canary | Non | Instantané | Haute | Rollout progressif |

## Pipeline CI/CD Standard

```
Push/PR → Lint → Tests → Build → [Staging auto] → [Smoke] → [Prod approval]
```

### GitHub Actions (exemple)
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm test --coverage
      - run: pnpm build
```

## Environnements

| Env | Données | Deploy | Accès |
|-----|---------|--------|-------|
| Local | Fake/seed | Manuel | Dev |
| Staging | Anonymisées | Auto (merge main) | Équipe |
| Production | Réelles | Manuel/approval | Restreint |

### Variables d'Environnement
```bash
# .env.example (template, committé)
DATABASE_URL=postgresql://user:pass@localhost:5432/db
API_KEY=your-api-key-here
NODE_ENV=development

# .env (valeurs réelles, JAMAIS committé → .gitignore)
```

## Checklist Pré-Déploiement Production

### Code & Build
- [ ] Tests passent (unit, intégration, e2e)
- [ ] Build réussit, pas de warning critique
- [ ] Coverage > seuil défini

### Revue & Validation
- [ ] PRs reviewées et approuvées
- [ ] QA validé sur staging
- [ ] Acceptance criteria vérifiés

### Infrastructure
- [ ] Migrations testées et réversibles
- [ ] Backup récent disponible
- [ ] Variables d'environnement à jour
- [ ] Feature flags configurés

### Rollback
- [ ] Plan documenté, version précédente tagguée
- [ ] Temps de rollback estimé

### Communication
- [ ] Équipe informée, stakeholders prévenus
- [ ] Pas de deploy vendredi soir

## Smoke Tests Post-Deploy

### Immédiat (< 5 min)
- [ ] Page d'accueil accessible
- [ ] Login fonctionne
- [ ] Actions critiques OK
- [ ] Pas d'erreur 5xx dans les logs

### Complet (< 1h)
- [ ] Parcours utilisateur principal
- [ ] Intégrations tierces
- [ ] Nouvelles fonctionnalités
- [ ] Régression features existantes

## Rollback

```bash
# Rollback rapide (revert du dernier deploy)
git revert HEAD && git push  # Nouveau commit, pas de force push

# Rollback version spécifique
git checkout v1.2.3 && # redeploy via pipeline
```

**Règle** : chaque déploiement doit être réversible en < 15 min.

## Monitoring Production

### Métriques Clés
| Catégorie | Métrique | Seuil alerte | Outil |
|-----------|----------|-------------|-------|
| Disponibilité | Uptime | < 99.9% | UptimeRobot |
| Erreurs | Taux erreur 5xx | > 1% | Sentry, Datadog |
| Performance | LCP | > 2.5s | Web Vitals, Lighthouse |
| Performance | TTFB | > 800ms | Monitoring APM |
| Sécurité | CVE critiques | Toute | npm audit, Snyk |

### Logging
```typescript
// Niveaux de log
logger.error('Payment failed', { orderId, error }); // Erreur action requise
logger.warn('Rate limit approaching', { current });  // Attention
logger.info('Order created', { orderId });            // Événement business
logger.debug('Cache miss', { key });                  // Debug uniquement
```

### Alerting
| Sévérité | Notification | Délai réponse |
|----------|-------------|---------------|
| Critique (site down) | SMS + appel | < 15 min |
| Haute (feature cassée) | Slack + email | < 1h |
| Moyenne (dégradation) | Slack | < 4h |
| Basse (warning) | Dashboard | Prochain sprint |

## Maintenance Régulière

| Tâche | Fréquence | Outil/Commande |
|-------|-----------|----------------|
| Mise à jour deps | Mensuel | `npm outdated`, Renovate/Dependabot |
| Audit sécurité | Mensuel | `npm audit`, Snyk |
| Review performance | Trimestriel | Lighthouse, WebPageTest |
| Nettoyage code mort | Trimestriel | ts-prune, knip |
| Backup vérification | Mensuel | Restore test |
| Rotation secrets | Trimestriel | Vault, AWS Secrets Manager |

## Bug Tracking

### Template de Bug Report
```markdown
## Bug: [Titre court]
**Sévérité**: P0/P1/P2/P3
**Environnement**: Prod/Staging | Browser/OS
**Étapes de reproduction**:
1. ...
**Résultat attendu**: ...
**Résultat obtenu**: ...
**Logs/Screenshots**: ...
```
