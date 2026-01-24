# Opérations

> **Projet** : {{PROJECT_NAME}}

## Structure

```
06-operations/
├── README.md           # Ce fichier
├── environments.md     # Configuration des environnements
├── runbooks/           # Procédures opérationnelles
│   └── RUNBOOK-TEMPLATE.md
└── releases/           # Notes de release
    └── RELEASE-TEMPLATE.md
```

## Environnements

| Env | URL | Status | Dernière deploy |
|-----|-----|--------|-----------------|
| Development | {{DEV_URL}} | 🟢 | {{DEV_DATE}} |
| Staging | {{STAGING_URL}} | 🟢 | {{STAGING_DATE}} |
| Production | {{PROD_URL}} | 🟢 | {{PROD_DATE}} |

## Dernières releases

| Version | Date | Type | Release Notes |
|---------|------|------|---------------|
| v{{VERSION}} | {{DATE}} | Feature | [Notes](./releases/{{FILE}}) |

## Monitoring

| Service | Dashboard | Alertes |
|---------|-----------|---------|
| APM | [Lien]({{APM_URL}}) | {{ALERT_CHANNEL}} |
| Logs | [Lien]({{LOGS_URL}}) | {{ALERT_CHANNEL}} |
| Uptime | [Lien]({{UPTIME_URL}}) | {{ALERT_CHANNEL}} |

## Runbooks

| Situation | Runbook | Dernière utilisation |
|-----------|---------|---------------------|
| Incident prod | [incident.md](./runbooks/incident.md) | {{DATE}} |
| Rollback | [rollback.md](./runbooks/rollback.md) | {{DATE}} |
| Scaling | [scaling.md](./runbooks/scaling.md) | {{DATE}} |

## Contacts On-Call

| Rôle | Nom | Contact |
|------|-----|---------|
| Primary | {{PRIMARY}} | {{CONTACT_1}} |
| Secondary | {{SECONDARY}} | {{CONTACT_2}} |
