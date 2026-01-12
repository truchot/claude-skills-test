---
id: antipattern-003
severity: critical
tags: [deployment, database, infrastructure]
first_occurrence: 2024-05-10
occurrence_count: 1
---

# Anti-Pattern: Déploiement Prod sans Backup

## Symptôme

**Comment détecter ce problème :**

- Pas de backup avant migration BDD
- Déploiement direct sans snapshot
- Absence de procédure de rollback
- `wp db export` jamais exécuté avant update

**Exemple de manifestation :**

```bash
# ❌ Déploiement direct sans backup
ssh prod "cd /var/www && git pull && wp core update"

# ❌ Migration BDD sans export préalable
wp db query "ALTER TABLE wp_users DROP COLUMN old_field"
```

## Pourquoi c'est un Problème

### Impact Technique

- Perte de données irréversible
- Impossible de rollback après corruption
- Temps d'arrêt prolongé pour récupération

### Impact Business

- **Perte de commandes** e-commerce
- **Données clients** perdues définitivement
- **Temps d'arrêt** non planifié (heures à jours)
- **Confiance client** détruite

### Coût Typique

| Aspect | Coût estimé |
|--------|-------------|
| Récupération (si possible) | 8-24h |
| Perte données | IRRÉVERSIBLE |
| Risque incident | CRITIQUE |
| Impact business | Potentiellement fatal |

## Solution

### Procédure de Déploiement Sécurisée

```bash
#!/bin/bash
# deploy-safe.sh

set -e  # Exit on error

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/$TIMESTAMP"

# 1. Créer le dossier de backup
mkdir -p "$BACKUP_DIR"

# 2. Backup BDD
wp db export "$BACKUP_DIR/database.sql" --add-drop-table

# 3. Backup fichiers
tar -czf "$BACKUP_DIR/uploads.tar.gz" wp-content/uploads/

# 4. Snapshot (si cloud)
# aws rds create-db-snapshot --db-instance-identifier prod-db --db-snapshot-identifier "pre-deploy-$TIMESTAMP"

# 5. Déployer
git pull origin main
wp core update-db

# 6. Vérifier
wp core verify-checksums
curl -sI https://example.com | grep "200 OK"

echo "Deploy complete. Backup: $BACKUP_DIR"
```

### Rollback Procedure

```bash
#!/bin/bash
# rollback.sh

BACKUP_DIR=$1

if [ -z "$BACKUP_DIR" ]; then
  echo "Usage: rollback.sh /backups/YYYYMMDD_HHMMSS"
  exit 1
fi

# Restaurer BDD
wp db import "$BACKUP_DIR/database.sql"

# Restaurer fichiers si nécessaire
# tar -xzf "$BACKUP_DIR/uploads.tar.gz" -C /

echo "Rollback complete from $BACKUP_DIR"
```

## Prévention

### Checklist Avant Déploiement

- [ ] Backup BDD créé et vérifié (`wp db export && wp db tables`)
- [ ] Backup testé en restore sur staging
- [ ] Snapshot cloud créé (si applicable)
- [ ] Procédure de rollback documentée
- [ ] Fenêtre de maintenance communiquée

### Automatisation CI/CD

```yaml
# .github/workflows/deploy.yml
deploy:
  steps:
    - name: Create backup
      run: |
        ssh prod "wp db export /backups/pre-deploy-\$(date +%s).sql"

    - name: Verify backup
      run: |
        ssh prod "ls -la /backups/*.sql | tail -1"

    - name: Deploy
      run: |
        ssh prod "cd /var/www && git pull"

    - name: Health check
      run: |
        curl -f https://example.com/wp-admin/admin-ajax.php?action=health
```

### Backups Automatiques

```bash
# Crontab production
# Backup quotidien à 3h du matin
0 3 * * * /usr/local/bin/backup-wp.sh >> /var/log/backup.log 2>&1

# Retention: 7 jours locaux, 30 jours S3
0 4 * * * find /backups -mtime +7 -delete
```

## Occurrences Documentées

| Projet | Date | Impact | Résolution |
|--------|------|--------|------------|
| Client X | 2024-05-10 | 48h de commandes perdues | Récupération partielle logs |

## Voir Aussi

- [Pattern: staging-protection](../patterns/staging-protection.md)
- [Anti-pattern: no-staging](./no-staging.md)

## Références

- [WordPress Backup Best Practices](https://developer.wordpress.org/advanced-administration/security/backup/)
- [WP-CLI db command](https://developer.wordpress.org/cli/commands/db/)
