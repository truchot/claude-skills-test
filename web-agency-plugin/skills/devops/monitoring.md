# Monitoring & Observability Reference

## The 3 Pillars

```
Metrics (Prometheus)  +  Logs (Loki/ELK)  +  Traces (Jaeger/Tempo)
         |                     |                      |
         +---------------------+----------------------+
                               |
                        Grafana (Dashboards)
```

## Prometheus - Metrics Instrumentation (Node.js)

```typescript
import { Registry, Counter, Histogram, Gauge, collectDefaultMetrics } from 'prom-client';

const register = new Registry();
collectDefaultMetrics({ register });

const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'path', 'status'],
  registers: [register],
});

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'path'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
  registers: [register],
});

// Express middleware
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer({ method: req.method, path: req.route?.path });
  res.on('finish', () => {
    httpRequestsTotal.inc({ method: req.method, path: req.route?.path, status: res.statusCode });
    end();
  });
  next();
});

// Expose metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

## Key Metrics (RED + USE)

### RED (Request-oriented)
| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| Rate | Requests/second | Sudden drop > 50% |
| Errors | Error rate (%) | > 1% for 5 min |
| Duration | P95/P99 latency | P99 > 500ms |

### USE (Resource-oriented)
| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| Utilization | CPU/Memory % | > 80% for 10 min |
| Saturation | Queue depth | > 100 pending |
| Errors | System errors | Any OOM/crash |

## Alerting Rules (Prometheus)

```yaml
groups:
  - name: app-alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.01
        for: 5m
        labels: { severity: critical }
        annotations:
          summary: "High error rate ({{ $value | humanizePercentage }})"

      - alert: HighLatency
        expr: histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m])) > 0.5
        for: 5m
        labels: { severity: warning }

      - alert: PodCrashLooping
        expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
        for: 15m
        labels: { severity: critical }
```

## Logging Best Practices

```typescript
// Structured logging with pino
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  redact: ['req.headers.authorization', 'password', 'token'],
});

// Usage
logger.info({ userId, action: 'login' }, 'User authenticated');
logger.error({ err, requestId }, 'Request failed');
```

## Grafana Dashboard Essentials

| Panel | Query | Visualization |
|-------|-------|---------------|
| Request Rate | `rate(http_requests_total[5m])` | Time series |
| Error Rate | `rate(http_requests_total{status=~"5.."}[5m])` | Stat |
| P95 Latency | `histogram_quantile(0.95, rate(..._bucket[5m]))` | Time series |
| CPU Usage | `container_cpu_usage_seconds_total` | Gauge |
| Memory | `container_memory_usage_bytes` | Gauge |

## Health Check Endpoint

```typescript
app.get('/health', async (req, res) => {
  const checks = {
    db: await checkDb(),
    redis: await checkRedis(),
    uptime: process.uptime(),
  };
  const healthy = Object.values(checks).every(c => c !== false);
  res.status(healthy ? 200 : 503).json({ status: healthy ? 'ok' : 'degraded', checks });
});
```
