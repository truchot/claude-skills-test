---
name: reporting-technique
description: Rapports et synthèses techniques pour les parties prenantes
---

# Reporting Technique

Tu produis des **rapports et synthèses techniques** adaptés aux différentes parties prenantes.

## Types de Rapports

### Matrice Public/Format

| Public | Fréquence | Format | Contenu |
|--------|-----------|--------|---------|
| Direction | Mensuel | Executive Summary | Risques, coûts, avancement |
| Product | Hebdo | Synthèse | Vélocité, blocages, prévisions |
| Tech Lead | Quotidien | Dashboard | Métriques, incidents |
| Équipe | Sprint | Rétrospective | Actions, améliorations |

## Executive Summary (Direction)

### Template

```markdown
# Rapport Technique - [Mois/Trimestre]

## Résumé Exécutif

| Indicateur | Statut | Tendance |
|------------|--------|----------|
| Qualité | 🟢 Bon | ↑ |
| Performance | 🟡 À surveiller | → |
| Sécurité | 🟢 Bon | → |
| Dette technique | 🟡 Modérée | ↓ |

### Points Clés
- **Réalisé** : Migration base de données terminée (-30% coûts)
- **En cours** : Refactoring module paiement
- **Attention** : Latence API en hausse (+15%)

## Métriques

### Disponibilité
- Uptime : 99.95% (SLA : 99.9%)
- Incidents majeurs : 0
- Incidents mineurs : 2

### Performance
- Temps de réponse P95 : 450ms (cible : <500ms)
- Taux d'erreur : 0.02%

### Coûts Infrastructure
- Budget : 15 000€/mois
- Réel : 14 200€/mois
- Projection annuelle : -5% vs N-1

## Risques

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| Dépendance lib X obsolète | Moyen | Haute | Migration prévue Q2 |
| Capacité équipe | Moyen | Moyenne | Recrutement en cours |

## Prochaines Étapes

1. Finaliser refactoring paiement (fin mars)
2. Audit sécurité annuel (avril)
3. Migration vers nouvelle version Node.js (mai)

---
*Rapport préparé par [Nom] - [Date]*
```

## Rapport Hebdo (Product)

### Template

```markdown
# Sync Tech-Product - Semaine [N]

## Sprint en Cours

**Sprint** : Sprint 23 (J8/10)
**Vélocité prévue** : 34 points
**Réalisé** : 28 points (82%)

### État des US

| US | Points | Status | Blocker |
|----|--------|--------|---------|
| US-123 | 5 | ✅ Done | - |
| US-124 | 8 | ✅ Done | - |
| US-125 | 13 | 🔄 In Progress | API externe lente |
| US-126 | 8 | ⏸️ Blocked | En attente specs |

### Blocages

1. **US-125** : L'API du partenaire répond en 3s
   - Impact : Risque de dépassement sprint
   - Action : Call avec partenaire demain

2. **US-126** : Maquettes edge cases manquantes
   - Impact : Développement en pause
   - Action : À clarifier avec designer

## Métriques Qualité

- Couverture de tests : 78% (+2%)
- Bugs en prod cette semaine : 0
- Temps moyen de review PR : 4h

## Prévisions

| Sprint | Contenu prévu | Confiance |
|--------|---------------|-----------|
| Sprint 24 | Features X, Y | 🟢 Haute |
| Sprint 25 | Feature Z | 🟡 Moyenne |

## Questions pour Product

1. Priorité entre US-130 et US-131 ?
2. Deadline flexible pour Feature Z ?
```

## Dashboard Technique (Tech Lead)

### Métriques Temps Réel

```markdown
# Dashboard Technique

## Santé Systèmes

| Service | Status | Latence | Erreurs |
|---------|--------|---------|---------|
| API | 🟢 UP | 120ms | 0.01% |
| Web | 🟢 UP | 45ms | 0% |
| Workers | 🟢 UP | - | 0.02% |
| Database | 🟢 UP | 8ms | 0% |

## Alertes Dernières 24h

| Heure | Sévérité | Message | Résolu |
|-------|----------|---------|--------|
| 14:32 | ⚠️ Warning | CPU > 80% (worker-1) | ✅ 14:45 |

## Métriques Clés

### Performance
- P50 Latency: 85ms
- P95 Latency: 234ms
- P99 Latency: 567ms
- Requests/min: 12,450

### Infrastructure
- CPU moyen: 45%
- Mémoire: 62%
- Connexions DB: 45/100
- Queue backlog: 12

### Qualité Code
- Build status: ✅ Passing
- Tests: 1,234 passing, 0 failing
- Coverage: 78.5%
- Vulnérabilités: 0 critical, 2 medium
```

### Grafana/Datadog Panels

```
┌─────────────────────────────────────────────────────────┐
│ Requests per Second                                      │
│ ▃▅▇█▇▅▃▂▃▅▆▇█▇▅▄▃▂▁▂▃▄▅▆▇█▇▆▅▄▃▂                       │
│ 0    4h    8h    12h    16h    20h    24h               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Error Rate (%)                   Latency P95 (ms)        │
│    0.02%                              234ms              │
│    ▂▁▁▁▂▁▁▁▁▁▂▁                       ▃▅▃▄▃▄▃▄▃▄▃▄      │
└─────────────────────────────────────────────────────────┘
```

## Rapport Post-Mortem

### Template

```markdown
# Post-Mortem: [Titre Incident]

**Date de l'incident** : YYYY-MM-DD
**Durée** : Xh Xmin
**Impact** : [Description impact utilisateurs]
**Sévérité** : P1 / P2 / P3

## Timeline

| Heure | Événement |
|-------|-----------|
| 10:00 | Alerte CPU détectée |
| 10:05 | Investigation démarrée |
| 10:15 | Cause identifiée |
| 10:30 | Fix déployé |
| 10:35 | Service restauré |

## Cause Racine

[Explication technique détaillée]

## Impact

- Utilisateurs affectés : ~500
- Requêtes en erreur : 1,200
- Perte estimée : N/A

## Actions Correctives

| Action | Responsable | Deadline | Status |
|--------|-------------|----------|--------|
| Ajouter rate limiting | @dev | 15/03 | 🔄 |
| Alertes plus sensibles | @ops | 12/03 | ✅ |
| Documentation runbook | @lead | 20/03 | ⏳ |

## Lessons Learned

1. Le monitoring n'a pas détecté le pattern anormal
2. Le runbook existant était incomplet
3. La communication a été efficace

## Prévention

- [ ] Implémenter circuit breaker
- [ ] Ajouter tests de charge réguliers
- [ ] Former l'équipe au nouveau runbook
```

## Rapport de Sprint (Rétrospective)

### Template

```markdown
# Rétrospective Sprint [N]

**Date** : [Date]
**Participants** : [Liste]
**Facilitateur** : [Nom]

## Métriques Sprint

| Métrique | Valeur | vs Moyenne |
|----------|--------|------------|
| Vélocité | 34 pts | +8% |
| Stories complétées | 8/9 | 89% |
| Bugs créés | 2 | -50% |
| Temps cycle moyen | 3.2j | -15% |

## Feedback Équipe

### 👍 Ce qui a bien marché

1. Pair programming sur feature complexe
2. Specs claires en début de sprint
3. CI/CD rapide

### 👎 Ce qui peut s'améliorer

1. Trop d'interruptions (support)
2. Reviews PR parfois lentes
3. Estimation US-125 trop optimiste

### 💡 Idées d'amélioration

1. Créneaux sans interruption (Deep Work)
2. Rotation support plus claire
3. Poker planning avec plus de discussion

## Actions

| Action | Responsable | Sprint |
|--------|-------------|--------|
| Définir créneaux Deep Work | Scrum Master | S24 |
| Documenter rotation support | Tech Lead | S24 |
| Template estimation risquée | Équipe | S24 |

## Humeur Équipe

😊😊😊😊😐
(4 positifs, 1 neutre)
```

## Automatisation

### Script de Génération

```typescript
// scripts/generate-weekly-report.ts
interface WeeklyReport {
  sprint: SprintInfo;
  metrics: Metrics;
  blockers: Blocker[];
  forecast: Forecast[];
}

async function generateWeeklyReport(): Promise<string> {
  const sprint = await fetchSprintData();
  const metrics = await fetchMetrics();
  const blockers = await fetchBlockers();

  return formatMarkdown({
    sprint,
    metrics,
    blockers,
    forecast: calculateForecast(sprint, metrics),
  });
}
```

### Intégration Slack

```typescript
// Notification automatique
async function sendWeeklyReportToSlack() {
  const report = await generateWeeklyReport();

  await slack.postMessage({
    channel: '#tech-sync',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*📊 Rapport Hebdo - Semaine ${getWeekNumber()}*`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: report,
        },
      },
    ],
  });
}
```

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Métrique dans le rouge | Rapport immédiat + plan d'action |
| Incident majeur | Post-mortem sous 48h |
| Dérive significative | Alerte proactive aux stakeholders |
| Questions sans réponse | Escalade au Tech Lead |
