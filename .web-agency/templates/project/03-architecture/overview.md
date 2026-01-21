# Architecture Overview

> **Projet** : {{PROJECT_NAME}}
> **Version** : {{VERSION}}
> **Dernière MAJ** : {{DATE}}
> **Auteur** : {{AUTHOR}}

---

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTS                               │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │ Web App │  │ Mobile  │  │  API    │                     │
│  └────┬────┘  └────┬────┘  └────┬────┘                     │
└───────┼────────────┼────────────┼───────────────────────────┘
        │            │            │
        └────────────┴────────────┘
                     │
┌────────────────────┼────────────────────────────────────────┐
│                    │     BACKEND                             │
│  ┌─────────────────▼─────────────────┐                      │
│  │           API Gateway              │                      │
│  │      (Auth, Rate Limit, ...)      │                      │
│  └─────────────────┬─────────────────┘                      │
│                    │                                         │
│  ┌─────────────────▼─────────────────┐                      │
│  │         Application Layer          │                      │
│  │   ┌───────┐ ┌───────┐ ┌───────┐   │                      │
│  │   │Service│ │Service│ │Service│   │                      │
│  │   │   A   │ │   B   │ │   C   │   │                      │
│  │   └───────┘ └───────┘ └───────┘   │                      │
│  └─────────────────┬─────────────────┘                      │
│                    │                                         │
│  ┌─────────────────▼─────────────────┐                      │
│  │          Data Layer                │                      │
│  │   ┌────────┐  ┌───────┐  ┌─────┐  │                      │
│  │   │Database│  │ Cache │  │Queue│  │                      │
│  │   └────────┘  └───────┘  └─────┘  │                      │
│  └───────────────────────────────────┘                      │
└─────────────────────────────────────────────────────────────┘
```

## Stack technique

Voir [stack.md](./stack.md) pour le détail.

| Couche | Technologie | Version |
|--------|-------------|---------|
| Frontend | {{FRONTEND_TECH}} | {{FE_VERSION}} |
| Backend | {{BACKEND_TECH}} | {{BE_VERSION}} |
| Database | {{DB_TECH}} | {{DB_VERSION}} |
| Cache | {{CACHE_TECH}} | {{CACHE_VERSION}} |
| Hosting | {{HOSTING}} | - |

## Principes architecturaux

### 1. {{PRINCIPLE_1}}

{{PRINCIPLE_1_DESC}}

### 2. {{PRINCIPLE_2}}

{{PRINCIPLE_2_DESC}}

### 3. {{PRINCIPLE_3}}

{{PRINCIPLE_3_DESC}}

## Composants clés

### {{COMPONENT_1}}

- **Responsabilité** : {{RESP_1}}
- **Technologies** : {{TECH_1}}
- **Dépendances** : {{DEPS_1}}

### {{COMPONENT_2}}

- **Responsabilité** : {{RESP_2}}
- **Technologies** : {{TECH_2}}
- **Dépendances** : {{DEPS_2}}

## Flux de données

### Flux principal : {{MAIN_FLOW_NAME}}

```
[User] → [Frontend] → [API] → [Service] → [DB]
                                  ↓
                              [Cache]
                                  ↓
                             [Response]
```

## Intégrations externes

| Service | Usage | Documentation |
|---------|-------|---------------|
| {{SERVICE_1}} | {{USAGE_1}} | [Docs]({{DOCS_URL_1}}) |
| {{SERVICE_2}} | {{USAGE_2}} | [Docs]({{DOCS_URL_2}}) |

## Sécurité

- **Authentification** : {{AUTH_METHOD}}
- **Autorisation** : {{AUTHZ_METHOD}}
- **Encryption** : {{ENCRYPTION}}
- **Secrets** : {{SECRETS_MANAGEMENT}}

## Performance

| Métrique | Target | Actuel |
|----------|--------|--------|
| TTFB | < {{TTFB_TARGET}} | {{TTFB_CURRENT}} |
| LCP | < {{LCP_TARGET}} | {{LCP_CURRENT}} |
| Uptime | {{UPTIME_TARGET}}% | {{UPTIME_CURRENT}}% |

## Architecture Decision Records

| ADR | Titre | Statut |
|-----|-------|--------|
| [ADR-001](./decisions/ADR-001.md) | {{ADR_1_TITLE}} | Accepté |
| [ADR-002](./decisions/ADR-002.md) | {{ADR_2_TITLE}} | Proposé |

## Diagrammes

- [C4 - Context]({{C4_CONTEXT_URL}})
- [C4 - Container]({{C4_CONTAINER_URL}})
- [Séquence - Auth]({{SEQ_AUTH_URL}})
- [ERD]({{ERD_URL}})

---

## Liens

- [Stack détaillée](./stack.md)
- [Data Model](./data-model.md)
- [Décisions](./decisions/)
