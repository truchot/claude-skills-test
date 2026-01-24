# Brief Technique : {{FEATURE_ID}} - {{FEATURE_TITLE}}

> **Spec fonctionnelle** : [spec.md](./spec.md)
> **Date** : {{DATE}}
> **Tech Lead** : {{TECH_LEAD}}
> **Statut** : ⚪ Draft | 🟡 Review | 🟢 Validé

---

## 1. Vue d'ensemble technique

### 1.1 Résumé

{{TECH_SUMMARY}}

### 1.2 Composants impactés

| Composant | Impact | Complexité |
|-----------|--------|------------|
| {{COMP_1}} | Modification | Moyenne |
| {{COMP_2}} | Nouveau | Haute |

### 1.3 Diagramme

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │────→│   API       │────→│  Database   │
│  {{COMP}}   │     │  {{ROUTE}}  │     │  {{TABLE}}  │
└─────────────┘     └─────────────┘     └─────────────┘
```

## 2. Backend

### 2.1 Endpoints

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| `POST` | `/api/{{RESOURCE}}` | {{DESC_1}} | Bearer |
| `GET` | `/api/{{RESOURCE}}/:id` | {{DESC_2}} | Bearer |

### 2.2 Request/Response

#### POST /api/{{RESOURCE}}

**Request** :
```typescript
interface CreateRequest {
  {{field1}}: string;
  {{field2}}: number;
}
```

**Response** :
```typescript
interface CreateResponse {
  id: string;
  {{field1}}: string;
  createdAt: Date;
}
```

**Erreurs** :
| Code | Message | Cause |
|------|---------|-------|
| 400 | "{{ERROR_1}}" | {{CAUSE_1}} |
| 404 | "{{ERROR_2}}" | {{CAUSE_2}} |

### 2.3 Services

| Service | Méthode | Responsabilité |
|---------|---------|----------------|
| `{{Service}}` | `create()` | {{RESP_1}} |
| `{{Service}}` | `validate()` | {{RESP_2}} |

### 2.4 Validation (Zod)

```typescript
const createSchema = z.object({
  {{field1}}: z.string().min(1).max(100),
  {{field2}}: z.number().positive(),
});
```

## 3. Frontend

### 3.1 Composants

| Composant | Type | Props | État |
|-----------|------|-------|------|
| `{{Component1}}` | Page | - | Local + Server |
| `{{Component2}}` | UI | `{{props}}` | Props only |

### 3.2 État

```typescript
interface {{Feature}}State {
  data: {{Type}} | null;
  isLoading: boolean;
  error: Error | null;
}
```

### 3.3 Hooks

| Hook | Usage |
|------|-------|
| `use{{Feature}}()` | Fetch & cache data |
| `use{{Feature}}Mutation()` | Create/Update |

### 3.4 Routes

| Route | Composant | Layout |
|-------|-----------|--------|
| `/{{route}}` | `{{Page}}` | `MainLayout` |

## 4. Database

### 4.1 Migrations

```sql
-- Migration: {{MIGRATION_NAME}}
-- Date: {{DATE}}

CREATE TABLE {{table_name}} (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  {{column1}} VARCHAR(255) NOT NULL,
  {{column2}} INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_{{table}}_{{column}} ON {{table_name}}({{column}});
```

### 4.2 Modifications schema

| Table | Action | Champs |
|-------|--------|--------|
| `{{table}}` | ADD COLUMN | `{{column}} {{type}}` |

## 5. Intégrations externes

### 5.1 {{SERVICE_NAME}}

| Endpoint | Méthode | Usage |
|----------|---------|-------|
| `{{ENDPOINT}}` | POST | {{USAGE}} |

**Gestion erreurs** :
| Code | Action |
|------|--------|
| 429 | Retry avec backoff |
| 5xx | Fallback + alerte |

## 6. Tests

### 6.1 Tests unitaires

| Module | Couverture cible | Cas critiques |
|--------|------------------|---------------|
| `{{Service}}` | 80% | {{CASES}} |

### 6.2 Tests intégration

| Scénario | Endpoints | Priority |
|----------|-----------|----------|
| {{SCENARIO_1}} | POST, GET | High |

### 6.3 Tests E2E

| Parcours | Steps | Priority |
|----------|-------|----------|
| {{JOURNEY_1}} | {{STEPS}} | High |

## 7. Sécurité

### 7.1 Checklist

- [ ] Input validation (Zod)
- [ ] SQL injection (ORM paramétré)
- [ ] XSS (sanitization)
- [ ] CSRF (tokens)
- [ ] Rate limiting
- [ ] Audit logging

### 7.2 Permissions

```typescript
const permissions = {
  '{{action}}': ['admin', 'user'],
};
```

## 8. Performance

### 8.1 Optimisations prévues

| Optimisation | Impact | Implémentation |
|--------------|--------|----------------|
| Cache Redis | -200ms | `cache.get()` |
| Index DB | -50ms | Migration |

### 8.2 Monitoring

| Métrique | Seuil alerte |
|----------|--------------|
| p95 latency | > 500ms |
| Error rate | > 1% |

## 9. Déploiement

### 9.1 Feature flag

```typescript
const FEATURE_{{NAME}} = process.env.FEATURE_{{NAME}} === 'true';
```

### 9.2 Rollback plan

1. Désactiver feature flag
2. {{ROLLBACK_STEP_2}}
3. {{ROLLBACK_STEP_3}}

## 10. Tâches techniques

| # | Tâche | Effort | Dépendance |
|---|-------|--------|------------|
| 1 | Migration DB | 2h | - |
| 2 | Endpoint POST | 4h | 1 |
| 3 | Composant form | 3h | 2 |
| 4 | Tests | 3h | 2, 3 |

**Total estimé** : {{TOTAL}}h

---

## ADR associés

- [ADR-{{NUM}}](../../03-architecture/decisions/ADR-{{NUM}}.md) - {{ADR_TITLE}}

---

## Approbation

| Rôle | Nom | Date | Statut |
|------|-----|------|--------|
| Tech Lead | {{TL}} | | ☐ |
| Senior Dev | {{DEV}} | | ☐ |
