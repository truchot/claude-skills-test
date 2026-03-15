# Deployment & Maintenance

## Stratégies de Déploiement

| Stratégie | Downtime | Rollback | Usage |
|-----------|----------|----------|-------|
| Recreate | Oui | Lent | Dev/staging |
| Rolling | Non | Moyen | Standard prod |
| Blue-Green | Non | Instantané | Prod critique |
| Canary | Non | Instantané | Rollout progressif |

## Pipeline CI/CD

```yaml
# .github/workflows/ci.yml
on: [push, pull_request]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint && pnpm test --coverage && pnpm build
```

## Environnements

| Env | Données | Deploy | Accès |
|-----|---------|--------|-------|
| Local | Fake/seed | Manuel | Dev |
| Staging | Anonymisées | Auto (merge main) | Équipe |
| Production | Réelles | Approval | Restreint |

`.env.example` committé (template), `.env` dans `.gitignore` (valeurs réelles).

## Checklist Pré-Production

- [ ] Tests passent, build OK, coverage > seuil
- [ ] PRs reviewées, QA validé staging
- [ ] Migrations testées et réversibles
- [ ] Backup dispo, env vars à jour
- [ ] Monitoring/alertes configurés
- [ ] Plan rollback prêt, pas de deploy vendredi soir

## Smoke Tests Post-Deploy

**Immédiat** : page d'accueil, login, actions critiques, pas de 5xx
**< 1h** : parcours principal, intégrations tierces, nouvelles features

## Rollback

```bash
git revert HEAD && git push  # Nouveau commit, pas de force push
```

Règle : chaque déploiement réversible en < 15 min.

## Monitoring

| Catégorie | Métrique | Seuil alerte | Outil |
|-----------|----------|-------------|-------|
| Dispo | Uptime | < 99.9% | UptimeRobot |
| Erreurs | Taux 5xx | > 1% | Sentry |
| Perf | LCP | > 2.5s | Web Vitals |
| Sécu | CVE critiques | Toute | npm audit |

## Logging

```typescript
logger.error('Payment failed', { orderId, error }); // Action requise
logger.warn('Rate limit approaching', { current });   // Attention
logger.info('Order created', { orderId });             // Business event
```

## Alerting

| Sévérité | Notification | Délai |
|----------|-------------|-------|
| Critique (down) | SMS + appel | < 15 min |
| Haute (feature cassée) | Slack + email | < 1h |
| Moyenne (dégradation) | Slack | < 4h |

## Maintenance Régulière

| Tâche | Fréquence |
|-------|-----------|
| Mise à jour deps | Mensuel (Renovate/Dependabot) |
| Audit sécurité | Mensuel (npm audit, Snyk) |
| Review performance | Trimestriel (Lighthouse) |
| Nettoyage code mort | Trimestriel (knip) |
| Rotation secrets | Trimestriel |

## Bug Report Template

```markdown
## Bug: [Titre] | Sévérité: P0-P3 | Env: Prod/Staging
Étapes: 1... | Attendu: ... | Obtenu: ... | Logs/Screenshots: ...
```
