---
name: monitoring-perf
description: Monitoring et alerting performance
---

# Monitoring Performance

Tu mets en place et analyses le **monitoring de performance** des applications.

## Stack de Monitoring

### Composants

```
┌─────────────────────────────────────────────────┐
│                  OBSERVABILITÉ                   │
├─────────────────────────────────────────────────┤
│  Métriques     │  Logs          │  Traces       │
│  (Prometheus)  │  (ELK/Loki)    │  (Jaeger)     │
├─────────────────────────────────────────────────┤
│              Visualisation (Grafana)             │
├─────────────────────────────────────────────────┤
│              Alerting (PagerDuty/Slack)          │
└─────────────────────────────────────────────────┘
```

### Solutions SaaS

| Solution | Type | Gratuit |
|----------|------|---------|
| **Datadog** | APM complet | 💰 (free tier) |
| **New Relic** | APM complet | 💰 (free tier) |
| **Sentry** | Errors + Performance | 💰 (free tier) |
| **Grafana Cloud** | Métriques/Logs | ✅ (limité) |
| **Uptime Robot** | Uptime monitoring | ✅ |

## Métriques Essentielles

### Golden Signals

| Signal | Description | Métrique |
|--------|-------------|----------|
| **Latency** | Temps de réponse | p50, p95, p99 |
| **Traffic** | Volume de requêtes | req/s |
| **Errors** | Taux d'erreur | % 5xx |
| **Saturation** | Utilisation ressources | CPU, Memory, Connections |

### RED Method (Services)

| Métrique | Description |
|----------|-------------|
| **Rate** | Requêtes par seconde |
| **Errors** | Requêtes échouées |
| **Duration** | Temps de traitement |

### USE Method (Ressources)

| Métrique | Description |
|----------|-------------|
| **Utilization** | % de temps utilisé |
| **Saturation** | Queue length |
| **Errors** | Erreurs de la ressource |

## Implémentation

### Prometheus + Node.js

```typescript
import express from 'express';
import promClient from 'prom-client';

// Métriques par défaut (CPU, memory, etc.)
promClient.collectDefaultMetrics();

// Métriques custom
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5],
});

const httpRequestTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

// Middleware
app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route?.path || 'unknown';

    httpRequestDuration.observe(
      { method: req.method, route, status: res.statusCode },
      duration
    );
    httpRequestTotal.inc(
      { method: req.method, route, status: res.statusCode }
    );
  });

  next();
});

// Endpoint pour Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});
```

### Real User Monitoring (RUM)

```typescript
// Web Vitals
import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify({
      name: metric.name,
      value: metric.value,
      id: metric.id,
    }),
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
getFCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## Alerting

### Configuration Alertes

```yaml
# Prometheus alerting rules
groups:
  - name: api-alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.01
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value | humanizePercentage }}"

      - alert: HighLatency
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High latency detected"
          description: "P95 latency is {{ $value }}s"

      - alert: HighCPU
        expr: process_cpu_seconds_total > 0.8
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage"
```

### Seuils Recommandés

| Métrique | Warning | Critical |
|----------|---------|----------|
| Error Rate | > 0.5% | > 1% |
| Latency p95 | > 1s | > 2s |
| Latency p99 | > 2s | > 5s |
| CPU Usage | > 70% | > 90% |
| Memory Usage | > 80% | > 95% |
| Disk Usage | > 80% | > 90% |

## Dashboards

### Dashboard API

```markdown
## API Performance Dashboard

### Panneau 1: Requests Overview
- Requêtes par seconde (rate)
- Taux d'erreur (%)
- Latence p50, p95, p99

### Panneau 2: Endpoints
- Top 10 endpoints par volume
- Top 10 endpoints par latence
- Endpoints avec plus d'erreurs

### Panneau 3: Ressources
- CPU usage
- Memory usage
- Connections actives
- Goroutines/Threads

### Panneau 4: Database
- Query duration
- Connections pool usage
- Slow queries
```

### Grafana Query Examples

```promql
# Requêtes par seconde
rate(http_requests_total[5m])

# Taux d'erreur
rate(http_requests_total{status=~"5.."}[5m])
/ rate(http_requests_total[5m])

# Latence p95
histogram_quantile(0.95,
  rate(http_request_duration_seconds_bucket[5m])
)

# Top 5 endpoints par latence
topk(5,
  histogram_quantile(0.95,
    sum by (route) (rate(http_request_duration_seconds_bucket[5m]))
  )
)
```

## Uptime Monitoring

### Health Check Endpoint

```typescript
app.get('/health', async (req, res) => {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
    external_api: await checkExternalAPI(),
  };

  const healthy = Object.values(checks).every(c => c.status === 'ok');

  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'healthy' : 'unhealthy',
    checks,
    timestamp: new Date().toISOString(),
  });
});

async function checkDatabase(): Promise<HealthCheck> {
  try {
    await db.query('SELECT 1');
    return { status: 'ok', latency: 0 };
  } catch (error) {
    return { status: 'error', error: error.message };
  }
}
```

### Synthetic Monitoring

```yaml
# Uptime configuration
monitors:
  - name: API Health
    url: https://api.example.com/health
    interval: 60s
    timeout: 10s
    assertions:
      - status == 200
      - response_time < 2000

  - name: Homepage
    url: https://www.example.com
    interval: 300s
    assertions:
      - status == 200
      - body contains "Welcome"
```

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Alerte critique | Page on-call, investigation immédiate |
| Dégradation progressive | Investigation, potentiel scaling |
| Pas de données | Vérifier les exporters/agents |
| False positives fréquents | Ajuster les seuils |
