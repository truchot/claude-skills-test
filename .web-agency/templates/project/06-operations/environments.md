# Environnements

> **Projet** : {{PROJECT_NAME}}
> **Dernière MAJ** : {{DATE}}

---

## Vue d'ensemble

```
[Local Dev] → [Development] → [Staging] → [Production]
     ↑            ↑              ↑            ↑
   feature      develop        staging       main
```

---

## Development

### Configuration

| Attribut | Valeur |
|----------|--------|
| **URL** | {{DEV_URL}} |
| **Branch** | `develop` |
| **Auto-deploy** | ✅ Sur push |
| **Hosting** | {{DEV_HOSTING}} |

### Variables d'environnement

| Variable | Description | Secret |
|----------|-------------|--------|
| `DATABASE_URL` | PostgreSQL dev | ❌ |
| `API_KEY_{{SERVICE}}` | Clé API (sandbox) | ✅ |

### Accès

| Rôle | Accès |
|------|-------|
| Développeurs | ✅ SSH, Logs, Deploy |
| QA | ✅ App, Logs |

---

## Staging

### Configuration

| Attribut | Valeur |
|----------|--------|
| **URL** | {{STAGING_URL}} |
| **Branch** | `staging` |
| **Auto-deploy** | ✅ Sur merge |
| **Hosting** | {{STAGING_HOSTING}} |

### Variables d'environnement

| Variable | Description | Secret |
|----------|-------------|--------|
| `DATABASE_URL` | PostgreSQL staging | ✅ |
| `API_KEY_{{SERVICE}}` | Clé API (sandbox) | ✅ |

### Données

- Données anonymisées (copie prod)
- Refresh : hebdomadaire

### Accès

| Rôle | Accès |
|------|-------|
| Développeurs | ✅ App, Logs |
| QA | ✅ App, Logs, Deploy |
| Client | ✅ App (lecture) |

---

## Production

### Configuration

| Attribut | Valeur |
|----------|--------|
| **URL** | {{PROD_URL}} |
| **Branch** | `main` |
| **Auto-deploy** | ❌ Manuel |
| **Hosting** | {{PROD_HOSTING}} |

### Infrastructure

```
                    ┌─────────────┐
                    │   CDN       │
                    │  (Vercel)   │
                    └──────┬──────┘
                           │
┌──────────────────────────┼──────────────────────────┐
│                          ▼                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │  App Node 1 │  │  App Node 2 │  │  App Node N │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘ │
│         └────────────────┼────────────────┘        │
│                          ▼                         │
│                   ┌─────────────┐                  │
│                   │  Database   │                  │
│                   │  (Primary)  │                  │
│                   └──────┬──────┘                  │
│                          │                         │
│                   ┌──────▼──────┐                  │
│                   │   Replica   │                  │
│                   └─────────────┘                  │
└────────────────────────────────────────────────────┘
```

### Scaling

| Ressource | Min | Max | Auto-scale |
|-----------|-----|-----|------------|
| App instances | {{MIN_INSTANCES}} | {{MAX_INSTANCES}} | ✅ |
| Database | {{DB_SIZE}} | - | ❌ |

### Backups

| Type | Fréquence | Rétention |
|------|-----------|-----------|
| Database | Quotidien | 30 jours |
| Logs | Continu | 90 jours |

### Variables d'environnement

| Variable | Description | Secret |
|----------|-------------|--------|
| `DATABASE_URL` | PostgreSQL prod | ✅ |
| `API_KEY_{{SERVICE}}` | Clé API (prod) | ✅ |

### Accès

| Rôle | Accès |
|------|-------|
| Tech Lead | ✅ Full |
| Développeurs | ✅ Logs, Metrics |
| On-call | ✅ Deploy, Restart |

---

## Secrets Management

| Secret | Storage | Rotation |
|--------|---------|----------|
| DB passwords | {{SECRET_MANAGER}} | 90 jours |
| API keys | {{SECRET_MANAGER}} | Sur compromission |
| JWT secret | {{SECRET_MANAGER}} | 180 jours |

---

## CI/CD Pipeline

```yaml
# Simplifié
push:
  develop → Development (auto)
  staging → Staging (auto)
  main → Production (manual + approval)
```

### Checks avant deploy prod

- [ ] Tous les tests passent
- [ ] Review approuvée
- [ ] Changelog mis à jour
- [ ] Rollback plan prêt
