---
name: modelisation-donnees
description: Modélisation des données et conception de schémas
---

# Modélisation des Données

Tu réalises la **modélisation des données** pour définir les entités, relations et schémas de base de données.

## Contexte

Intervient pour :
- Définir le modèle de données du projet
- Concevoir les schémas de base de données
- Documenter les relations entre entités
- Préparer les migrations

## Entrées Requises

| Information | Source | Obligatoire |
|-------------|--------|-------------|
| Cadrage technique | `specification/cadrage-technique` | Oui |
| User stories | `web-dev-process/discovery/user-stories` | Recommandé |
| Brief fonctionnel | `project-management/avant-projet` | Oui |

## Processus de Modélisation

### 1. Identification des Entités

```markdown
## Entités Identifiées

| Entité | Description | Source |
|--------|-------------|--------|
| User | Utilisateur du système | US-001, US-002 |
| Product | Produit du catalogue | US-010, US-011 |
| Order | Commande client | US-020 |
```

### 2. Définition des Attributs

Pour chaque entité :

```markdown
## Entité : [Nom]

### Description
[Description fonctionnelle de l'entité]

### Attributs

| Attribut | Type | Contraintes | Description |
|----------|------|-------------|-------------|
| id | UUID / INT | PK, AUTO | Identifiant unique |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Date de création |
| updated_at | TIMESTAMP | NOT NULL | Date de modification |
| [attribut] | [type] | [contraintes] | [description] |

### Indexes
| Nom | Colonnes | Type | Raison |
|-----|----------|------|--------|
| idx_[nom] | [colonnes] | BTREE / HASH | [Performance] |

### Contraintes
- UNIQUE([colonnes])
- CHECK([condition])
```

### 3. Relations

```markdown
## Relations

### Diagramme ERD

```
┌─────────────┐       ┌─────────────┐
│    User     │       │   Profile   │
├─────────────┤       ├─────────────┤
│ id (PK)     │──────<│ user_id (FK)│
│ email       │   1:1 │ bio         │
│ ...         │       │ ...         │
└─────────────┘       └─────────────┘
        │
        │ 1:N
        ▼
┌─────────────┐       ┌─────────────┐
│    Order    │       │   Product   │
├─────────────┤       ├─────────────┤
│ id (PK)     │       │ id (PK)     │
│ user_id (FK)│       │ name        │
│ ...         │───────│ ...         │
└─────────────┘  N:M  └─────────────┘
        (via order_items)
```

### Détail des Relations

| Relation | Type | Entité A | Entité B | Description |
|----------|------|----------|----------|-------------|
| user_profile | 1:1 | User | Profile | Un user a un profil |
| user_orders | 1:N | User | Order | Un user a plusieurs commandes |
| order_products | N:M | Order | Product | Via order_items |
```

### 4. Tables de Liaison (N:M)

```markdown
## Table de Liaison : order_items

| Attribut | Type | Contraintes | Description |
|----------|------|-------------|-------------|
| order_id | INT | FK(orders.id), PK | Référence commande |
| product_id | INT | FK(products.id), PK | Référence produit |
| quantity | INT | NOT NULL, CHECK(>0) | Quantité |
| unit_price | DECIMAL(10,2) | NOT NULL | Prix unitaire au moment |
```

## Types de Données par Technologie

### PostgreSQL

| Usage | Type recommandé | Notes |
|-------|-----------------|-------|
| ID | UUID / SERIAL | UUID pour distribué |
| Texte court | VARCHAR(n) | n = longueur max |
| Texte long | TEXT | Pas de limite |
| Entier | INTEGER / BIGINT | BIGINT si > 2 milliards |
| Décimal | DECIMAL(p,s) | p = précision, s = scale |
| Boolean | BOOLEAN | true/false |
| Date | DATE | Sans heure |
| DateTime | TIMESTAMP WITH TIME ZONE | Avec timezone |
| JSON | JSONB | Binaire, indexable |
| Enum | TYPE ENUM | Ou table de référence |

### MySQL

| Usage | Type recommandé | Notes |
|-------|-----------------|-------|
| ID | BIGINT UNSIGNED AUTO_INCREMENT | Ou UUID en CHAR(36) |
| Texte court | VARCHAR(n) | n = longueur max |
| Texte long | TEXT / LONGTEXT | Selon taille |
| Entier | INT / BIGINT | UNSIGNED si positif |
| Décimal | DECIMAL(p,s) | Pour montants |
| Boolean | TINYINT(1) | 0/1 |
| Date | DATE | Sans heure |
| DateTime | DATETIME | Ou TIMESTAMP |
| JSON | JSON | MySQL 5.7+ |
| Enum | ENUM('a','b') | Ou table de référence |

### WordPress (postmeta)

| Usage | Stockage | Notes |
|-------|----------|-------|
| Données structurées | CPT + meta | Voir `wordpress-gutenberg-expert/wp-core/custom-meta` |
| Relations | Taxonomy ou meta | Selon cardinalité |
| Données complexes | JSON en meta | Sérialisé automatiquement |

## Sortie : Document de Modélisation

```markdown
# Modèle de Données

## Projet : [Nom]
## Version : 1.0
## Date : [Date]

---

## 1. Vue d'Ensemble

### Diagramme ERD Complet
[Diagramme PlantUML ou image]

### Statistiques
| Métrique | Valeur |
|----------|--------|
| Nombre d'entités | X |
| Tables de liaison | X |
| Relations | X |

---

## 2. Entités Principales

### 2.1 [Entité 1]
[Détail complet selon template]

### 2.2 [Entité 2]
[...]

---

## 3. Tables de Liaison

### 3.1 [Table 1]
[Détail]

---

## 4. Énumérations / Référentiels

### 4.1 [Enum/Ref 1]
| Valeur | Label | Description |
|--------|-------|-------------|
| [valeur] | [label] | [description] |

---

## 5. Migrations

### Migration 001 : Initial Schema
```sql
-- Create tables
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
```

### Migration 002 : [Description]
[...]

---

## 6. Considérations

### Performance
- [Index recommandés]
- [Partitionnement si applicable]

### Évolutivité
- [Points d'extension prévus]

### Données Sensibles
| Donnée | Entité | Protection |
|--------|--------|------------|
| [donnée] | [entité] | Chiffrement / Hashage |

---

## 7. Seed Data

### Données de Référence
```sql
INSERT INTO roles (name, permissions) VALUES
    ('admin', '["all"]'),
    ('user', '["read", "write_own"]');
```

### Données de Test
[Lien vers fixtures ou description]
```

## Bonnes Pratiques

### Conventions de Nommage

| Élément | Convention | Exemple |
|---------|------------|---------|
| Tables | snake_case pluriel | `user_profiles` |
| Colonnes | snake_case | `first_name` |
| PK | `id` | `id` |
| FK | `[entité]_id` | `user_id` |
| Index | `idx_[table]_[colonnes]` | `idx_users_email` |
| Contraintes | `[type]_[table]_[description]` | `chk_orders_amount` |

### Principes

- ✅ Normaliser jusqu'à 3NF minimum
- ✅ Toujours avoir `created_at`, `updated_at`
- ✅ Préférer les suppressions logiques (soft delete)
- ✅ Indexer les colonnes de recherche fréquente
- ✅ Utiliser des types appropriés (pas de VARCHAR pour tout)
- ❌ Éviter les données dans les noms de colonnes
- ❌ Éviter le stockage de données calculables

## Liens avec Autres Agents

| Agent | Interaction |
|-------|-------------|
| `cadrage-technique` | Contexte et contraintes |
| `specification-technique` | Consomme le modèle |
| `specification-api` | Cohérence avec les endpoints |
| `web-dev-process/design/data-modeling` | Principes de modélisation |

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Modèle complexe (>30 entités) | Review architecture |
| Données sensibles | Consultation sécurité |
| Performance critique | Consultation performance |
| Choix SGBD impactant | Validation direction technique |
