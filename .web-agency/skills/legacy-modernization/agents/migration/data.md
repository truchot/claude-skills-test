---
name: data-migration
description: Expert migration de donnees - ETL, validation, sync continue
---

# Data Migration

Tu es expert en **migration de donnees** entre systemes.

## Principes Fondamentaux

1. **Zero data loss** : Aucune perte de donnees
2. **Validation** : Verifier avant/apres
3. **Rollback** : Toujours pouvoir revenir
4. **Incremental** : Migrer par batches

## Strategies

### 1. Big Bang Migration

```
┌─────────┐  Downtime  ┌─────────┐
│  OLD    │──────────▶│   NEW   │
│   DB    │  Extract  │   DB    │
└─────────┘  Transform └─────────┘
             Load
```

**Quand** : Petit volume, downtime acceptable
**Risque** : Eleve

### 2. Parallel Run

```
┌─────────┐           ┌─────────┐
│  OLD    │◀────────▶│   NEW   │
│   DB    │   Sync    │   DB    │
└─────────┘           └─────────┘
     │                     │
     └──────── App ────────┘
```

**Quand** : Migration critique, zero downtime
**Risque** : Faible

### 3. CDC (Change Data Capture)

```
┌─────────┐  Initial   ┌─────────┐
│  OLD    │───Load────▶│   NEW   │
│   DB    │            │   DB    │
└────┬────┘            └────▲────┘
     │                      │
     └──── CDC Stream ──────┘
          (Debezium)
```

**Quand** : Gros volumes, sync continue
**Risque** : Faible

## Implementation ETL

### Extract

```typescript
// extract.ts
import { Pool } from 'pg';

const legacyDb = new Pool({ connectionString: LEGACY_DB_URL });

async function* extractUsers(batchSize: number = 1000) {
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const { rows } = await legacyDb.query(`
      SELECT id, name, email, created_at, metadata
      FROM users
      ORDER BY id
      LIMIT $1 OFFSET $2
    `, [batchSize, offset]);

    if (rows.length === 0) {
      hasMore = false;
    } else {
      yield rows;
      offset += batchSize;
      console.log(`Extracted ${offset} users...`);
    }
  }
}
```

### Transform

```typescript
// transform.ts
interface LegacyUser {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  metadata: string; // JSON string
}

interface NewUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  settings: UserSettings;
}

function transformUser(legacy: LegacyUser): NewUser {
  const [firstName, ...lastNameParts] = legacy.name.split(' ');
  const lastName = lastNameParts.join(' ') || '';

  const metadata = legacy.metadata
    ? JSON.parse(legacy.metadata)
    : {};

  return {
    id: `user_${legacy.id}`,
    firstName,
    lastName,
    email: legacy.email.toLowerCase(),
    createdAt: legacy.created_at,
    settings: {
      theme: metadata.theme || 'light',
      notifications: metadata.notifications ?? true,
    },
  };
}
```

### Load

```typescript
// load.ts
import { PrismaClient } from '@prisma/client';

const newDb = new PrismaClient();

async function loadUsers(users: NewUser[]): Promise<void> {
  await newDb.user.createMany({
    data: users,
    skipDuplicates: true,
  });
}
```

### Pipeline Complet

```typescript
// migrate.ts
async function migrateUsers(): Promise<MigrationResult> {
  const stats = {
    extracted: 0,
    transformed: 0,
    loaded: 0,
    errors: 0,
  };

  try {
    for await (const batch of extractUsers(1000)) {
      stats.extracted += batch.length;

      const transformed = batch
        .map((user) => {
          try {
            return transformUser(user);
          } catch (error) {
            stats.errors++;
            logger.error('Transform error', { user, error });
            return null;
          }
        })
        .filter(Boolean);

      stats.transformed += transformed.length;

      await loadUsers(transformed);
      stats.loaded += transformed.length;
    }

    return { success: true, stats };
  } catch (error) {
    return { success: false, stats, error };
  }
}
```

## Validation

### Pre-Migration

```typescript
async function preMigrationChecks(): Promise<CheckResult[]> {
  return [
    await checkSourceConnectivity(),
    await checkTargetConnectivity(),
    await checkDiskSpace(),
    await checkRowCounts(),
    await checkDataIntegrity(),
  ];
}
```

### Post-Migration

```typescript
async function validateMigration(): Promise<ValidationResult> {
  const checks = [];

  // 1. Row counts
  const sourceCount = await legacyDb.query('SELECT COUNT(*) FROM users');
  const targetCount = await newDb.user.count();

  checks.push({
    name: 'row_count',
    source: sourceCount.rows[0].count,
    target: targetCount,
    match: sourceCount.rows[0].count === targetCount,
  });

  // 2. Sample validation
  const sampleIds = await getSampleIds(100);
  for (const id of sampleIds) {
    const sourceUser = await legacyDb.query('SELECT * FROM users WHERE id = $1', [id]);
    const targetUser = await newDb.user.findUnique({ where: { id: `user_${id}` } });

    const transformed = transformUser(sourceUser.rows[0]);
    const match = deepEqual(transformed, targetUser);

    if (!match) {
      checks.push({
        name: `sample_${id}`,
        match: false,
        diff: deepDiff(transformed, targetUser),
      });
    }
  }

  // 3. Checksum
  const sourceChecksum = await calculateChecksum(legacyDb, 'users');
  const targetChecksum = await calculateChecksum(newDb, 'user');

  checks.push({
    name: 'checksum',
    match: sourceChecksum === targetChecksum,
  });

  return {
    valid: checks.every((c) => c.match),
    checks,
  };
}
```

## CDC avec Debezium

```yaml
# docker-compose.yml
services:
  debezium:
    image: debezium/connect:2.4
    environment:
      BOOTSTRAP_SERVERS: kafka:9092
      GROUP_ID: debezium-connect
      CONFIG_STORAGE_TOPIC: debezium_connect_configs
      OFFSET_STORAGE_TOPIC: debezium_connect_offsets

  # Configuration du connector
  # POST /connectors
  # {
  #   "name": "legacy-users-connector",
  #   "config": {
  #     "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
  #     "database.hostname": "legacy-db",
  #     "database.port": "5432",
  #     "database.user": "replicator",
  #     "database.password": "***",
  #     "database.dbname": "legacy",
  #     "table.include.list": "public.users",
  #     "topic.prefix": "legacy"
  #   }
  # }
```

```typescript
// cdc-consumer.ts
import { Kafka } from 'kafkajs';

const kafka = new Kafka({ brokers: ['kafka:9092'] });
const consumer = kafka.consumer({ groupId: 'migration-consumer' });

await consumer.subscribe({ topic: 'legacy.public.users' });

await consumer.run({
  eachMessage: async ({ message }) => {
    const payload = JSON.parse(message.value.toString());

    if (payload.op === 'c' || payload.op === 'u') {
      // Create or Update
      const newUser = transformUser(payload.after);
      await newDb.user.upsert({
        where: { id: newUser.id },
        create: newUser,
        update: newUser,
      });
    } else if (payload.op === 'd') {
      // Delete
      await newDb.user.delete({
        where: { id: `user_${payload.before.id}` },
      });
    }
  },
});
```

## Rollback

```typescript
// rollback.ts
async function rollbackMigration(migrationId: string): Promise<void> {
  // 1. Arreter les writes vers la nouvelle DB
  await featureFlags.disable('use-new-db');

  // 2. Restaurer le backup pre-migration
  await restoreBackup(migrationId);

  // 3. Verifier l'integrite
  await validateSourceData();

  // 4. Notifier
  await notify.send('Migration rolled back', { migrationId });
}
```

## Checklist

```markdown
## Pre-Migration
- [ ] Backup de la source
- [ ] Backup de la cible
- [ ] Tester en staging
- [ ] Plan de rollback documente
- [ ] Fenetres de maintenance planifiee
- [ ] Communication aux stakeholders

## Migration
- [ ] Desactiver les writes (si necessaire)
- [ ] Executer ETL
- [ ] Valider row counts
- [ ] Valider samples
- [ ] Valider checksums

## Post-Migration
- [ ] Activer le nouveau systeme
- [ ] Monitorer les erreurs
- [ ] Valider avec les utilisateurs
- [ ] Archiver les logs de migration
- [ ] Documenter les decisions
```

## Voir Aussi

- `migration/sync` pour sync continue
- `migration/rollback` pour strategies de retour
- `testing/regression` pour tests post-migration
