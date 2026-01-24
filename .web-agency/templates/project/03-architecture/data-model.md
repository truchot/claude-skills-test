# Data Model

> **Projet** : {{PROJECT_NAME}}
> **Dernière MAJ** : {{DATE}}
> **Version schema** : {{SCHEMA_VERSION}}

---

## ERD (Entity Relationship Diagram)

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│    User      │       │    Order     │       │   Product    │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id           │──┐    │ id           │    ┌──│ id           │
│ email        │  │    │ user_id      │←───┤  │ name         │
│ name         │  └───→│ status       │    │  │ price        │
│ created_at   │       │ total        │    │  │ stock        │
└──────────────┘       │ created_at   │    │  └──────────────┘
                       └──────────────┘    │
                              │            │
                              ▼            │
                       ┌──────────────┐    │
                       │  OrderItem   │    │
                       ├──────────────┤    │
                       │ id           │    │
                       │ order_id     │←───┘
                       │ product_id   │←───┘
                       │ quantity     │
                       │ unit_price   │
                       └──────────────┘
```

---

## Entités

### User

| Champ | Type | Contraintes | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PK | Identifiant unique |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Email de l'utilisateur |
| `password_hash` | VARCHAR(255) | NOT NULL | Hash du mot de passe |
| `name` | VARCHAR(100) | NOT NULL | Nom complet |
| `role` | ENUM | DEFAULT 'user' | Role (user, admin) |
| `email_verified_at` | TIMESTAMP | NULLABLE | Date vérification email |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Date création |
| `updated_at` | TIMESTAMP | ON UPDATE | Date dernière MAJ |

**Index** :
- `idx_user_email` sur `email`

**Relations** :
- `User` 1:N `Order`
- `User` 1:N `Session`

---

### {{ENTITY_2}}

| Champ | Type | Contraintes | Description |
|-------|------|-------------|-------------|
| `id` | {{TYPE}} | PK | {{DESC}} |

---

## Enums

### UserRole

```sql
CREATE TYPE user_role AS ENUM ('user', 'admin', 'moderator');
```

| Valeur | Description |
|--------|-------------|
| `user` | Utilisateur standard |
| `admin` | Administrateur |
| `moderator` | Modérateur |

---

## Relations

| Relation | Type | Description |
|----------|------|-------------|
| User → Order | 1:N | Un user a plusieurs commandes |
| Order → OrderItem | 1:N | Une commande a plusieurs items |
| Product → OrderItem | 1:N | Un produit peut être dans plusieurs items |

---

## Migrations

| Version | Date | Description | Fichier |
|---------|------|-------------|---------|
| 001 | {{DATE}} | Initial schema | `001_initial.sql` |
| 002 | {{DATE}} | Add user roles | `002_add_roles.sql` |

---

## Seed Data

### Environnements

| Env | Seed | Description |
|-----|------|-------------|
| Development | `seed_dev.sql` | Données de test complètes |
| Staging | `seed_staging.sql` | Données anonymisées |
| Production | - | Pas de seed |

---

## Règles métier (data)

### Soft Delete

Entités avec soft delete :
- `User` (champ `deleted_at`)
- `{{ENTITY}}` (champ `deleted_at`)

### Audit Trail

Entités auditées automatiquement :
- `{{ENTITY}}` → table `{{ENTITY}}_audit`

---

## Performance

### Index recommandés

| Table | Index | Colonnes | Raison |
|-------|-------|----------|--------|
| `orders` | `idx_orders_user_status` | `user_id, status` | Requête fréquente |

### Partitioning

| Table | Stratégie | Clé |
|-------|-----------|-----|
| `logs` | Range | `created_at` (mensuel) |

---

## Sécurité données

### Données sensibles

| Table | Champ | Classification | Protection |
|-------|-------|----------------|------------|
| `users` | `password_hash` | Secret | Never exposed |
| `users` | `email` | PII | Encrypted at rest |

### RGPD

| Donnée | Rétention | Anonymisation |
|--------|-----------|---------------|
| Logs connexion | 1 an | Auto-purge |
| Données user | Durée compte | Sur demande |
