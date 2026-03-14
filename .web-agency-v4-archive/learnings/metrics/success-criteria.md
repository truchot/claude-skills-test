# Critères de Succès Standards

> Métriques et critères pour évaluer le succès des projets et des learnings.

## Métriques Learning Loop

> **Baseline** : Les métriques ci-dessous seront mesurées après 1 mois d'utilisation du système.
> La colonne "Actuel" sera remplie lors de la première revue mensuelle.

### Indicateurs Clés

| Métrique | Description | Cible | Actuel | Baseline Date |
|----------|-------------|-------|--------|---------------|
| **Pattern Usage Rate** | % de tâches utilisant un pattern existant | > 60% | - | À mesurer |
| **Antipattern Repeat Rate** | % d'erreurs répétées après documentation | < 10% | - | À mesurer |
| **Avg Resolution Time** | Temps moyen de résolution des issues | ↓ 20% | - | À mesurer |
| **Promotion Rate** | % d'issues projet promues en global | 10-20% | - | À mesurer |
| **Learning Consultation Rate** | % de tâches consultant les learnings | > 80% | - | À mesurer |

### Calcul des Métriques

#### Pattern Usage Rate

```
pattern_usage_rate = (tâches_avec_pattern / tâches_totales) * 100
```

**Sources de données** :
- Tags `pattern_used: [pattern-id]` dans les issues résolues
- Références dans les commits/PRs

#### Antipattern Repeat Rate

```
repeat_rate = (occurrences_après_documentation / occurrences_totales) * 100
```

**Objectif** : Une fois un anti-pattern documenté, il ne devrait plus se reproduire.

---

## Critères de Succès Projet

### Setup & Onboarding

| Critère | Seuil | Mesure |
|---------|-------|--------|
| Temps setup env local | < 15 min | Chronométrage réel |
| Temps onboarding dev | < 2h | Premier commit fonctionnel |
| Documentation README | Complète | Checklist validée |

### Développement

| Critère | Seuil | Mesure |
|---------|-------|--------|
| Coverage tests | > 70% | Rapport CI |
| Temps build | < 2 min | CI metrics |
| Temps deploy staging | < 5 min | CI metrics |
| Zero bugs critiques | 0 | Bug tracker |

### Performance

| Critère | Seuil | Mesure |
|---------|-------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | Lighthouse |
| FID (First Input Delay) | < 100ms | Lighthouse |
| CLS (Cumulative Layout Shift) | < 0.1 | Lighthouse |
| Lighthouse Performance | > 80 | Lighthouse |

### Sécurité

| Critère | Seuil | Mesure |
|---------|-------|--------|
| Vulnérabilités critiques | 0 | npm audit / composer audit |
| Headers sécurité | A+ | securityheaders.com |
| HTTPS | 100% | SSL Labs |

### Accessibilité

| Critère | Seuil | Mesure |
|---------|-------|--------|
| WCAG 2.1 AA | Conforme | axe-core |
| Lighthouse Accessibility | > 90 | Lighthouse |
| Navigation clavier | 100% | Test manuel |

---

## Signaux d'Alerte (Red Flags)

### Projet en Difficulté

| Signal | Seuil | Action |
|--------|-------|--------|
| Issues non résolues | > 5 depuis > 1 semaine | Escalade |
| Builds qui échouent | > 3 consécutifs | Investigation immédiate |
| Temps de résolution | > 2x moyenne | Analyse root cause |
| Scope creep | > 20% | Discussion client |

### Dette Technique

| Signal | Seuil | Action |
|--------|-------|--------|
| TODO/FIXME dans le code | > 10 | Sprint de cleanup |
| Dépendances outdated | > 6 mois | Plan de mise à jour |
| Coverage en baisse | Δ > -5% | Review processus |

---

## Templates de Reporting

### Weekly Learning Report

```markdown
## Semaine [N] - Learning Loop Report

### Nouveaux Learnings
- Issues documentées : X
- Patterns créés : X
- Anti-patterns identifiés : X

### Métriques
- Pattern usage rate : X%
- Antipattern repeat rate : X%
- Avg resolution time : Xh

### Candidats à Promotion
- [ ] issue-XXX → antipattern-XXX
- [ ] success-XXX → pattern-XXX

### Actions
- [ ] Action 1
- [ ] Action 2
```

### Monthly Learning Review

```markdown
## Mois [M] - Learning Loop Review

### Vue d'Ensemble
- Projets actifs : X
- Total issues : X (résolues : X)
- Patterns utilisés : X fois
- Anti-patterns évités : X fois

### Top 5 Patterns Utilisés
1. pattern-XXX (X utilisations)
2. ...

### Top 5 Anti-patterns Évités
1. antipattern-XXX (X évitements)
2. ...

### Promotions du Mois
- issue-XXX → antipattern-XXX (date)
- success-XXX → pattern-XXX (date)

### Recommandations
- Recommandation 1
- Recommandation 2
```

---

## Automatisation

### Script de Collecte

Le script `scripts/collect-learning-metrics.js` est disponible pour collecter les métriques :

```bash
# Output JSON complet
node .web-agency/learnings/scripts/collect-learning-metrics.js json

# Output résumé lisible
node .web-agency/learnings/scripts/collect-learning-metrics.js summary
```

Le script collecte :
- Nombre de patterns/anti-patterns/décisions
- Taux d'utilisation et d'occurrence
- Distribution par catégorie et tags

### Intégration CI

```yaml
# .github/workflows/learning-metrics.yml
- name: Collect learning metrics
  run: node scripts/collect-learning-metrics.js

- name: Update metrics dashboard
  run: node scripts/update-metrics-dashboard.js
```

---

## Références

- [LEARNING-GUIDE.md](../LEARNING-GUIDE.md)
- [Patterns Index](../patterns/INDEX.md)
- [Anti-patterns Index](../anti-patterns/INDEX.md)
