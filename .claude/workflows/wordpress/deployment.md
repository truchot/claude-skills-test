---
name: wordpress-deployment
description: Processus de déploiement WordPress (SSH, staging, production)
triggers: [déployer wordpress, deploiement wordpress, mise en production, staging wordpress]
skills: [wordpress, ci-cd, docker]
roles: [devops-engineer, fullstack-developer]
---

# Workflow: Déploiement WordPress

## Objectif
Déployer un projet WordPress de manière sécurisée via SSH/rsync vers staging puis production.

## Prérequis
- Accès SSH au serveur
- Clé SSH dédiée au déploiement
- Serveur configuré (Apache/Nginx + PHP + MySQL)
- Secrets GitHub/GitLab configurés

## Étapes

### 1. Configurer SSH
**Responsable**: DevOps / Lead Dev
**Fréquence**: Une fois par projet

- [ ] Générer clé SSH dédiée
- [ ] Configurer le serveur
- [ ] Tester la connexion

**Output**: Accès SSH fonctionnel

#### Générer la Clé

```bash
# Clé dédiée au déploiement
ssh-keygen -t ed25519 -C "deploy@project" -f ~/.ssh/deploy_key -N ""

# Afficher la clé publique (pour le serveur)
cat ~/.ssh/deploy_key.pub
```

#### Configurer le Serveur

```bash
# Sur le serveur
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo "ssh-ed25519 AAAAC3... deploy@project" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

#### Tester

```bash
ssh -i ~/.ssh/deploy_key user@server.com "echo 'Connection OK'"
```

---

### 2. Configurer les Secrets CI/CD
**Responsable**: DevOps
**Fréquence**: Une fois par environnement

- [ ] Ajouter secrets staging
- [ ] Ajouter secrets production
- [ ] Vérifier les accès

**Output**: Secrets configurés

#### Secrets Requis

| Secret | Description |
|--------|-------------|
| `SSH_HOST` | Hostname du serveur |
| `SSH_USER` | Utilisateur SSH |
| `SSH_PORT` | Port SSH (22) |
| `SSH_PRIVATE_KEY` | Clé privée SSH |
| `DEPLOY_PATH` | Chemin absolu sur le serveur |

#### Via GitHub CLI

```bash
gh secret set STAGING_SSH_HOST --body "staging.example.com"
gh secret set STAGING_SSH_USER --body "deploy"
gh secret set STAGING_SSH_PRIVATE_KEY < ~/.ssh/deploy_key
gh secret set STAGING_DEPLOY_PATH --body "/var/www/staging"
```

---

### 3. Déployer en Staging
**Responsable**: Développeur
**Fréquence**: À chaque merge

- [ ] Build du projet
- [ ] Déployer via rsync
- [ ] Configurer .htpasswd
- [ ] Créer utilisateurs WP

**Output**: Staging accessible et protégé

#### Commande rsync

```bash
rsync -avz --delete \
    -e "ssh -i ~/.ssh/deploy_key" \
    --exclude='.git' \
    --exclude='.github' \
    --exclude='node_modules' \
    --exclude='.env' \
    --exclude='wp-config.php' \
    --exclude='wp-content/uploads' \
    ./ user@staging.example.com:/var/www/staging/
```

#### Protection .htpasswd

```bash
# Sur le serveur
sudo htpasswd -c /etc/apache2/htpasswd/staging client
```

```apache
# .htaccess staging
AuthType Basic
AuthName "Pre-Production"
AuthUserFile /etc/apache2/htpasswd/staging
Require valid-user

# Bloquer indexation
<IfModule mod_headers.c>
    Header set X-Robots-Tag "noindex, nofollow"
</IfModule>
```

#### Créer Utilisateurs WP

```bash
# Via WP-CLI
wp user create client_admin client@example.com \
    --role=administrator \
    --user_pass=TempPassword123!
```

---

### 4. Notifier le Client
**Responsable**: Chef de projet
**Fréquence**: Après chaque déploiement staging

- [ ] Envoyer email avec accès
- [ ] Documenter les changements
- [ ] Planifier la recette

**Output**: Client informé

#### Template Email

```
Objet: Accès pré-production - [Projet]

Bonjour,

Votre environnement de pré-production est disponible.

🔗 URL: https://staging.example.com
🔑 Accès HTTP: [user] / [password]

📋 Admin WordPress: https://staging.example.com/wp-admin
👤 Identifiant: [wp_user]
🔐 Mot de passe: [wp_pass]

⚠️ Merci de changer votre mot de passe à la première connexion.

Pour vos retours: [email]

Cordialement,
[Signature]
```

---

### 5. Valider en Staging
**Responsable**: Client + QA
**Fréquence**: Avant chaque MEP

- [ ] Tests fonctionnels
- [ ] Validation visuelle
- [ ] Tests de performance
- [ ] Validation finale client

**Output**: Go/No-Go pour production

---

### 6. Déployer en Production
**Responsable**: DevOps / Lead Dev
**Fréquence**: Selon planning

- [ ] Backup base de données
- [ ] Backup fichiers
- [ ] Déployer via rsync
- [ ] Vérifier le site
- [ ] Purger les caches

**Output**: Site en production mis à jour

#### Backup Avant Déploiement

```bash
ssh user@production.com "
    cd /var/www/production
    wp db export ~/backups/db_\$(date +%Y%m%d_%H%M%S).sql
    tar -czf ~/backups/files_\$(date +%Y%m%d_%H%M%S).tar.gz wp-content/
"
```

#### Déployer

```bash
rsync -avz --delete \
    -e "ssh -i ~/.ssh/deploy_key" \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='.env' \
    --exclude='wp-config.php' \
    --exclude='wp-content/uploads' \
    ./ user@production.com:/var/www/production/
```

#### Vérification Post-Déploiement

```bash
ssh user@production.com "
    cd /var/www/production
    echo '=== WordPress version ==='
    wp core version
    echo '=== Themes ==='
    wp theme list
    echo '=== Plugins ==='
    wp plugin list
    echo '=== Cache ==='
    wp cache flush
"

# Vérifier HTTP
curl -sI https://example.com | head -5
```

---

### 7. Rollback (si nécessaire)
**Responsable**: DevOps
**Fréquence**: En cas de problème

- [ ] Identifier le problème
- [ ] Restaurer les fichiers
- [ ] Restaurer la BDD si nécessaire
- [ ] Vérifier le site

**Output**: Site restauré à l'état précédent

```bash
ssh user@production.com "
    # Restaurer fichiers
    tar -xzf ~/backups/files_YYYYMMDD_HHMMSS.tar.gz -C /var/www/production/

    # Restaurer BDD
    wp db import ~/backups/db_YYYYMMDD_HHMMSS.sql

    # Flush cache
    wp cache flush
"
```

---

## Pipeline GitHub Actions

```yaml
name: Deploy WordPress

on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy'
        required: true
        default: 'staging'
        type: choice
        options: [staging, production]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: ${{ github.event.inputs.environment || 'staging' }}

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install & Build
        run: |
          npm ci
          npm run build

      - name: Setup SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key
          ssh-keyscan -H ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts

      - name: Deploy
        run: |
          rsync -avz --delete \
            -e "ssh -i ~/.ssh/deploy_key" \
            --exclude='.git' \
            --exclude='node_modules' \
            --exclude='.env' \
            --exclude='wp-content/uploads' \
            ./ ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:${{ secrets.DEPLOY_PATH }}

      - name: Verify
        run: |
          ssh -i ~/.ssh/deploy_key ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} "
            cd ${{ secrets.DEPLOY_PATH }}
            wp cache flush 2>/dev/null || true
          "
```

---

## Checklist Déploiement

### Staging
- [ ] SSH configuré
- [ ] Secrets CI/CD ajoutés
- [ ] Build réussi
- [ ] rsync exécuté
- [ ] .htpasswd actif
- [ ] Utilisateurs WP créés
- [ ] Client notifié

### Production
- [ ] Staging validé par client
- [ ] Backup BDD fait
- [ ] Backup fichiers fait
- [ ] Déploiement exécuté
- [ ] Site accessible (HTTP 200)
- [ ] Fonctionnalités testées
- [ ] Caches purgés

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Échec SSH | Vérifier clés, ports, firewall |
| Erreur rsync | Vérifier permissions, espace disque |
| Site en erreur post-deploy | Rollback immédiat |
| Performance dégradée | Vérifier cache, DB, logs |
