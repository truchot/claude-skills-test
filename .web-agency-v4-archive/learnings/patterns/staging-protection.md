---
id: pattern-002
category: deployment
tags: [security, staging, htpasswd, wordpress]
created: 2024-01-10
validated: true
usage_count: 15
---

# Pattern: Protection Staging avec htpasswd

## Contexte d'Application

**Quand utiliser ce pattern :**
- Environnement staging accessible publiquement
- Client doit pouvoir tester avant prod
- SEO : éviter l'indexation du staging
- Sécurité : empêcher l'accès non autorisé

**Prérequis :**
- Serveur Apache ou Nginx
- Accès configuration serveur ou `.htaccess`

## Solution

Protection de l'environnement staging par authentification HTTP Basic + headers anti-indexation.

### Structure

```
staging.client.com/
├── .htaccess          # Protection Apache
├── .htpasswd          # Credentials (hors webroot idéalement)
└── wp-content/
    └── mu-plugins/
        └── staging-protection.php  # Fallback PHP
```

### Apache (.htaccess)

```apache
# Authentification
AuthType Basic
AuthName "Staging - Accès restreint"
AuthUserFile /path/outside/webroot/.htpasswd
Require valid-user

# Anti-indexation
Header set X-Robots-Tag "noindex, nofollow"

# Environnement
SetEnv WP_ENVIRONMENT_TYPE staging
```

### Nginx

```nginx
server {
    listen 443 ssl;
    server_name staging.client.com;

    # Authentification
    auth_basic "Staging - Accès restreint";
    auth_basic_user_file /etc/nginx/.htpasswd;

    # Anti-indexation
    add_header X-Robots-Tag "noindex, nofollow" always;

    location / {
        # ... config WordPress
    }
}
```

### Génération htpasswd

```bash
# Créer le fichier (première fois)
htpasswd -c /path/.htpasswd client

# Ajouter un utilisateur
htpasswd /path/.htpasswd developer

# Exemple de contenu
# client:$apr1$xyz123$hashedpassword
```

### Fallback PHP (mu-plugin)

```php
<?php
/**
 * Plugin Name: Staging Protection
 * Description: Protection supplémentaire pour staging
 */

// Uniquement si pas déjà protégé par serveur
if (wp_get_environment_type() === 'staging') {
    // Anti-indexation
    add_action('wp_head', function() {
        echo '<meta name="robots" content="noindex, nofollow">';
    });

    // Désactiver les emails
    add_filter('wp_mail', function($args) {
        error_log('Email blocked on staging: ' . $args['to']);
        return ['to' => '', 'subject' => '', 'message' => ''];
    });

    // Bandeau visuel
    add_action('admin_bar_menu', function($wp_admin_bar) {
        $wp_admin_bar->add_node([
            'id'    => 'staging-notice',
            'title' => '⚠️ STAGING',
            'meta'  => ['class' => 'staging-warning']
        ]);
    }, 100);
}
```

## Bénéfices

- **Sécurité** : Contenu non indexé, accès contrôlé
- **SEO** : Pas de duplicate content avec prod
- **Clarté** : Distinction visuelle staging/prod
- **Simplicité** : Configuration standard Apache/Nginx

## Inconvénients / Trade-offs

- **Credentials à partager** : Client doit gérer un login
- **Cache CDN** : Peut nécessiter configuration spécifique
- **Webhooks** : Certains services externes bloqués par auth

## Projets l'ayant Utilisé

| Projet | Date | Résultat | Notes |
|--------|------|----------|-------|
| 15 projets | 2024 | Succès | Standard agence |

## Variantes

### Variante A : IP Whitelist

```apache
# Autoriser uniquement certaines IPs (bureau, VPN)
Order deny,allow
Deny from all
Allow from 192.168.1.0/24
Allow from 203.0.113.50
```

### Variante B : Token URL

```php
// Accès via ?staging_token=secret
if ($_GET['staging_token'] === getenv('STAGING_TOKEN')) {
    setcookie('staging_auth', 'valid', time() + 86400);
}
```

## Voir Aussi

- [Anti-pattern: no-staging](../anti-patterns/no-staging.md)
- [Pattern: multi-env-config](./multi-env-config.md)

## Sources

- [Apache Auth](https://httpd.apache.org/docs/2.4/howto/auth.html)
- [Nginx Auth Basic](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/)
- [WordPress Environment Types](https://developer.wordpress.org/reference/functions/wp_get_environment_type/)
