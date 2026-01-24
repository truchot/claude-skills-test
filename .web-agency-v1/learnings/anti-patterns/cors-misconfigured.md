---
id: antipattern-006
severity: medium
tags: [security, api, cors, configuration]
first_occurrence: 2024-01-20
occurrence_count: 6
---

# Anti-Pattern: CORS Mal Configuré

## Symptôme

**Comment détecter ce problème :**

- Erreurs console : "Access-Control-Allow-Origin"
- API fonctionne en local mais pas en staging/prod
- Requêtes AJAX bloquées entre domaines
- Wildcard `*` en production

**Exemple de manifestation :**

```
Console browser:
Access to fetch at 'https://api.example.com/data' from origin
'https://example.com' has been blocked by CORS policy
```

```php
// ❌ MAUVAIS - Trop permissif en production
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
```

## Pourquoi c'est un Problème

### Impact Technique

- API inaccessible depuis le frontend
- Tests staging impossibles
- Failles de sécurité si trop permissif
- Headers incorrects cassent les preflight

### Impact Business

- **Fonctionnalités cassées** pour l'utilisateur
- **Temps debug** important
- **Sécurité** compromise (XSS, CSRF)

### Coût Typique

| Aspect | Coût estimé |
|--------|-------------|
| Temps debug | 2-4h |
| Risque sécurité | Moyen |
| Frustration | Élevée |

## Solution

### Configuration PHP (WordPress REST API)

```php
<?php
/**
 * Configuration CORS pour WordPress
 */
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $origin = get_http_origin();
        $allowed_origins = [
            'https://example.com',
            'https://staging.example.com',
        ];

        // Local dev
        if (wp_get_environment_type() === 'local') {
            $allowed_origins[] = 'http://localhost:3000';
            $allowed_origins[] = 'http://localhost:8080';
        }

        if (in_array($origin, $allowed_origins, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');
        }

        return $value;
    });
}, 15);

// Gérer les preflight OPTIONS
add_action('init', function() {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit();
    }
});
```

### Configuration Apache (.htaccess)

```apache
<IfModule mod_headers.c>
    # Origines autorisées
    SetEnvIf Origin "^https://(www\.)?(example\.com|staging\.example\.com)$" ORIGIN=$0
    Header set Access-Control-Allow-Origin %{ORIGIN}e env=ORIGIN
    Header set Access-Control-Allow-Credentials "true" env=ORIGIN
    Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" env=ORIGIN
    Header set Access-Control-Allow-Headers "Authorization, Content-Type, X-WP-Nonce" env=ORIGIN
    Header set Access-Control-Max-Age "86400" env=ORIGIN

    # Preflight
    RewriteEngine On
    RewriteCond %{REQUEST_METHOD} OPTIONS
    RewriteRule ^(.*)$ $1 [R=200,L]
</IfModule>
```

### Configuration Nginx

```nginx
server {
    # Définir les origines autorisées
    set $cors_origin "";
    if ($http_origin ~* "^https://(www\.)?(example\.com|staging\.example\.com)$") {
        set $cors_origin $http_origin;
    }

    location /wp-json/ {
        if ($cors_origin) {
            add_header 'Access-Control-Allow-Origin' $cors_origin always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type, X-WP-Nonce' always;
            add_header 'Access-Control-Max-Age' 86400 always;
        }

        if ($request_method = 'OPTIONS') {
            return 204;
        }

        # ... reste de la config
    }
}
```

## Prévention

### Checklist CORS

- [ ] Origines explicitement listées (pas de `*` en prod)
- [ ] Credentials: true si cookies/auth nécessaires
- [ ] OPTIONS (preflight) géré correctement
- [ ] Headers autorisés listés explicitement
- [ ] Testé sur staging avant production

### Debug CORS

```javascript
// Test en console browser
fetch('https://api.example.com/wp-json/wp/v2/posts', {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(r => console.log('OK', r))
.catch(e => console.error('CORS Error', e));
```

```bash
# Test avec curl
curl -I -X OPTIONS https://api.example.com/wp-json/wp/v2/posts \
  -H "Origin: https://example.com" \
  -H "Access-Control-Request-Method: GET"
```

## Occurrences Documentées

| Projet | Date | Impact | Résolution |
|--------|------|--------|------------|
| Client A | 2024-01-20 | API headless cassée | Config Nginx |
| Client B | 2024-03-15 | Login frontend KO | Headers PHP |
| Client C | 2024-05-10 | Staging inaccessible | Ajout origine |
| Client D | 2024-07-20 | Preflight timeout | Fix OPTIONS |
| Client E | 2024-09-05 | Faille sécurité (*) | Whitelist |
| Client F | 2024-11-12 | App mobile bloquée | Config complète |

## Voir Aussi

- [Pattern: multi-env-config](../patterns/multi-env-config.md)
- [Anti-pattern: env-hardcoded](./env-hardcoded.md)

## Références

- [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
