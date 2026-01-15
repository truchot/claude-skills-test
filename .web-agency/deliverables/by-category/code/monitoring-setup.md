---
id: monitoring-setup
name: Configuration Monitoring
version: 1.0.0
category: code
status: active
phase: "5-deploiement"
order: 5
agents:
  - devops/monitoring/prometheus
  - devops/monitoring/grafana
  - devops/monitoring/alerting
consumes:
  - ci-pipeline
  - deployment-runbook
produces_for:
  - direction-technique/support/gestion-incidents
  - support-client/resolution/technical-support
tags: [monitoring, alerting, observability, grafana, prometheus, sentry]
---

# Configuration Monitoring

## Description

Configuration complète de l'observabilité : métriques, logs, traces, alertes. Permet de détecter les problèmes avant qu'ils n'impactent les utilisateurs.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Configuration YAML/JSON + Dashboard JSON |
| **Emplacement** | `infrastructure/monitoring/` |
| **Nommage** | `alerts.yml`, `dashboards/*.json` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Fichiers Obligatoires

- [ ] **Métriques** - Configuration collecte
- [ ] **Alertes** - Règles d'alerte
- [ ] **Dashboard** - Visualisation principale
- [ ] **Logs** - Agrégation logs

### Fichiers Optionnels

- [ ] **Traces** - Distributed tracing
- [ ] **Synthetics** - Tests proactifs
- [ ] **SLOs** - Objectifs de niveau de service

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Alertes critiques | Toutes définies | Manuel | Oui |
| 2 | Dashboard principal | Accessible | Manuel | Oui |
| 3 | Notification | Slack/Email configuré | Test | Oui |
| 4 | Rétention logs | ≥ 30 jours | Config | Oui |
| 5 | Uptime monitoring | Configuré | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `devops/cicd/*` | `ci-pipeline` | Déploiement configuré |
| `devops/deployment/*` | `deployment-runbook` | Seuils définis |
| `direction-technique/*` | `technical-specification` | Exigences NFR |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Setup | DevOps | Debug configuration |
| 2 | Test alertes | Lead Dev | Ajuster seuils |
| 3 | Première semaine | Équipe | Tuning false positives |

## Exemple

### Configuration Complète

```markdown
# 📊 Monitoring Setup
## E-commerce Artisanat

---

## Architecture Monitoring

```
┌─────────────────────────────────────────────────────────────────┐
│                         APPLICATION                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Next.js   │  │   API       │  │   Workers   │             │
│  │   Frontend  │  │   Routes    │  │   (Jobs)    │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
└─────────┼────────────────┼────────────────┼─────────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       OBSERVABILITY                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Vercel    │  │   Sentry    │  │   Axiom     │             │
│  │  Analytics  │  │   Errors    │  │   Logs      │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
│         └────────────────┼────────────────┘                     │
│                          ▼                                       │
│                   ┌─────────────┐                                │
│                   │   Grafana   │                                │
│                   │  Dashboard  │                                │
│                   └──────┬──────┘                                │
│                          │                                       │
│                          ▼                                       │
│                   ┌─────────────┐                                │
│                   │   Slack     │                                │
│                   │   Alerts    │                                │
│                   └─────────────┘                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. Sentry - Error Tracking

### Configuration

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance
  tracesSampleRate: 0.1, // 10% des transactions

  // Release tracking
  release: process.env.VERCEL_GIT_COMMIT_SHA,
  environment: process.env.VERCEL_ENV || 'development',

  // Filtering
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Network request failed',
    /^Loading chunk \d+ failed/,
  ],

  // User context
  beforeSend(event) {
    // Remove sensitive data
    if (event.request?.cookies) {
      delete event.request.cookies;
    }
    return event;
  },
});
```

```typescript
// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,

  // Capture unhandled rejections
  integrations: [
    new Sentry.Integrations.Prisma({ client: prisma }),
  ],
});
```

### Alert Rules

```yaml
# Sentry Alert Rules (via UI ou API)

alerts:
  - name: "High Error Rate"
    conditions:
      - type: event_frequency
        value: 100
        interval: 1h
    actions:
      - type: slack
        channel: "#alerts-critical"
      - type: pagerduty
        service: "production"

  - name: "New Issue - Critical"
    conditions:
      - type: first_seen_event
        level: error
    filters:
      - type: level
        value: ["error", "fatal"]
    actions:
      - type: slack
        channel: "#alerts-prod"

  - name: "Payment Errors"
    conditions:
      - type: event_frequency
        value: 5
        interval: 10m
    filters:
      - type: tags
        key: "transaction"
        value: "payment"
    actions:
      - type: slack
        channel: "#alerts-critical"
      - type: email
        recipients: ["oncall@example.com"]
```

---

## 2. Vercel Analytics

### Configuration

```typescript
// next.config.js
module.exports = {
  // Enable Vercel Analytics
  analyticsId: process.env.VERCEL_ANALYTICS_ID,
};
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Web Vitals Thresholds

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | ≤ 2.5s | ≤ 4.0s | > 4.0s |
| FID | ≤ 100ms | ≤ 300ms | > 300ms |
| CLS | ≤ 0.1 | ≤ 0.25 | > 0.25 |
| TTFB | ≤ 800ms | ≤ 1800ms | > 1800ms |

---

## 3. Axiom - Logs

### Configuration

```typescript
// lib/logger.ts
import { Logger } from 'next-axiom';

export const logger = new Logger({
  source: 'ecommerce-prod',
});

// Usage
logger.info('Order created', {
  orderId: order.id,
  userId: user.id,
  total: order.total,
});

logger.error('Payment failed', {
  orderId: order.id,
  error: error.message,
  stripeError: error.code,
});
```

```typescript
// middleware.ts
import { Logger } from 'next-axiom';

export async function middleware(request: NextRequest) {
  const logger = new Logger({ source: 'middleware' });

  logger.info('Request', {
    method: request.method,
    path: request.nextUrl.pathname,
    userAgent: request.headers.get('user-agent'),
  });

  return NextResponse.next();
}
```

### Log Levels

| Level | Usage | Example |
|-------|-------|---------|
| `debug` | Development only | Variable values, flow |
| `info` | Normal operations | User actions, API calls |
| `warn` | Potential issues | Deprecated usage, retries |
| `error` | Failures | Exceptions, API errors |

---

## 4. Uptime Monitoring

### BetterUptime Configuration

```yaml
# monitors.yml
monitors:
  - name: "Production - Homepage"
    url: "https://www.artisanat-dupont.fr"
    method: GET
    interval: 60  # seconds
    regions:
      - eu-west-1
      - us-east-1
    assertions:
      - type: status_code
        value: 200
      - type: response_time
        value: 3000  # ms
    alerts:
      - type: slack
        channel: "#alerts-prod"
      - type: email
        recipients: ["oncall@example.com"]

  - name: "Production - API Health"
    url: "https://www.artisanat-dupont.fr/api/health"
    method: GET
    interval: 30
    assertions:
      - type: status_code
        value: 200
      - type: json_body
        path: "$.status"
        value: "ok"

  - name: "Production - Checkout"
    url: "https://www.artisanat-dupont.fr/checkout"
    method: GET
    interval: 120
    assertions:
      - type: status_code
        value: 200

  - name: "Stripe API"
    url: "https://api.stripe.com/v1/health"
    method: GET
    interval: 300
    alerts:
      - type: slack
        channel: "#alerts-external"
```

---

## 5. Alerting Rules

### Alert Severity Levels

| Severity | Response Time | Notification | Example |
|----------|---------------|--------------|---------|
| 🔴 P1 Critical | < 15 min | Slack + SMS + PagerDuty | Site down, payments broken |
| 🟠 P2 High | < 1 hour | Slack + Email | High error rate, slow response |
| 🟡 P3 Medium | < 4 hours | Slack | Elevated errors, degraded perf |
| 🟢 P4 Low | Next business day | Email | Warnings, non-critical |

### Alert Definitions

```yaml
# alerts/production.yml
groups:
  - name: availability
    rules:
      - alert: SiteDown
        expr: probe_success{job="blackbox"} == 0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Site is down"
          description: "{{ $labels.instance }} has been down for more than 2 minutes"
          runbook: "https://docs.example.com/runbooks/site-down"

      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.01
        for: 5m
        labels:
          severity: high
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value | humanizePercentage }}"

  - name: performance
    rules:
      - alert: SlowResponseTime
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2
        for: 10m
        labels:
          severity: medium
        annotations:
          summary: "P95 latency above 2s"
          description: "P95 latency is {{ $value | humanizeDuration }}"

      - alert: HighMemoryUsage
        expr: process_resident_memory_bytes / 1024 / 1024 > 512
        for: 15m
        labels:
          severity: medium
        annotations:
          summary: "High memory usage"
          description: "Memory usage is {{ $value }}MB"

  - name: business
    rules:
      - alert: NoOrdersReceived
        expr: increase(orders_total[1h]) == 0
        for: 2h
        labels:
          severity: high
        annotations:
          summary: "No orders in last 2 hours"
          description: "Check if checkout is working"

      - alert: PaymentFailureRate
        expr: rate(payments_failed_total[15m]) / rate(payments_total[15m]) > 0.05
        for: 10m
        labels:
          severity: critical
        annotations:
          summary: "Payment failure rate above 5%"
          description: "{{ $value | humanizePercentage }} of payments failing"
```

### Slack Alert Template

```yaml
# alertmanager.yml
receivers:
  - name: slack-critical
    slack_configs:
      - api_url: ${SLACK_WEBHOOK_URL}
        channel: '#alerts-critical'
        title: '🚨 {{ .GroupLabels.alertname }}'
        text: |
          *Severity:* {{ .CommonLabels.severity }}
          *Description:* {{ .CommonAnnotations.description }}
          *Runbook:* {{ .CommonAnnotations.runbook }}

          *Affected:*
          {{ range .Alerts }}
          - {{ .Labels.instance }}: {{ .Annotations.summary }}
          {{ end }}
        actions:
          - type: button
            text: 'View Dashboard'
            url: 'https://grafana.example.com/d/prod'
          - type: button
            text: 'Runbook'
            url: '{{ .CommonAnnotations.runbook }}'
```

---

## 6. Grafana Dashboard

### Dashboard JSON

```json
{
  "title": "E-commerce Production",
  "uid": "ecommerce-prod",
  "tags": ["production", "ecommerce"],
  "timezone": "Europe/Paris",
  "panels": [
    {
      "title": "Request Rate",
      "type": "graph",
      "gridPos": { "h": 8, "w": 12, "x": 0, "y": 0 },
      "targets": [
        {
          "expr": "rate(http_requests_total[5m])",
          "legendFormat": "{{ method }} {{ path }}"
        }
      ]
    },
    {
      "title": "Error Rate",
      "type": "graph",
      "gridPos": { "h": 8, "w": 12, "x": 12, "y": 0 },
      "targets": [
        {
          "expr": "rate(http_requests_total{status=~\"5..\"}[5m]) / rate(http_requests_total[5m]) * 100",
          "legendFormat": "Error %"
        }
      ],
      "alert": {
        "name": "High Error Rate",
        "conditions": [
          {
            "evaluator": { "type": "gt", "params": [1] },
            "operator": { "type": "and" },
            "query": { "params": ["A", "5m", "now"] },
            "reducer": { "type": "avg" }
          }
        ]
      }
    },
    {
      "title": "P95 Latency",
      "type": "gauge",
      "gridPos": { "h": 8, "w": 6, "x": 0, "y": 8 },
      "targets": [
        {
          "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))"
        }
      ],
      "options": {
        "thresholds": {
          "steps": [
            { "value": 0, "color": "green" },
            { "value": 1, "color": "yellow" },
            { "value": 2, "color": "red" }
          ]
        }
      }
    },
    {
      "title": "Orders Today",
      "type": "stat",
      "gridPos": { "h": 4, "w": 6, "x": 6, "y": 8 },
      "targets": [
        {
          "expr": "increase(orders_total[24h])"
        }
      ]
    },
    {
      "title": "Revenue Today",
      "type": "stat",
      "gridPos": { "h": 4, "w": 6, "x": 6, "y": 12 },
      "targets": [
        {
          "expr": "increase(revenue_total[24h])"
        }
      ],
      "options": {
        "unit": "currencyEUR"
      }
    }
  ]
}
```

---

## 7. Checklist de Mise en Place

### Initial Setup

- [ ] Créer compte Sentry + projet
- [ ] Configurer Sentry SDK
- [ ] Activer Vercel Analytics
- [ ] Configurer Axiom / logs
- [ ] Créer monitors uptime
- [ ] Configurer alertes Slack
- [ ] Importer dashboard Grafana

### Validation

- [ ] Test alerte P1 (déclencher manuellement)
- [ ] Vérifier réception Slack
- [ ] Vérifier logs apparaissent
- [ ] Vérifier Web Vitals remontent
- [ ] Documenter les runbooks

---

## URLs et Accès

| Service | URL | Accès |
|---------|-----|-------|
| Sentry | https://sentry.io/organizations/team/ | SSO |
| Vercel | https://vercel.com/team/project | GitHub |
| Grafana | https://grafana.example.com | admin/*** |
| Axiom | https://app.axiom.co | SSO |
| BetterUptime | https://betteruptime.com | admin@*** |
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Trop d'alertes | Alert fatigue | Tuner les seuils |
| Pas de runbook | Panique lors d'alerte | Lien vers doc |
| Alertes non testées | Ne fonctionnent pas | Test régulier |
| Logs non structurés | Difficile à analyser | JSON structuré |
| Pas de contexte | Debug difficile | Ajouter metadata |

## Références

- [Prometheus Alerting](https://prometheus.io/docs/alerting/latest/overview/)
- [Grafana Dashboards](https://grafana.com/grafana/dashboards/)
- [Sentry Best Practices](https://docs.sentry.io/product/best-practices/)
- Livrables liés : `ci-pipeline`, `deployment-runbook`, `incident-runbook`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | devops | Création initiale |
