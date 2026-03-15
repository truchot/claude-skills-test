---
id: antipattern-007
severity: medium
tags: [code-quality, error-handling, php, javascript]
first_occurrence: 2024-02-10
occurrence_count: 4
---

# Anti-Pattern: Erreurs Non Gérées

## Symptôme

**Comment détecter ce problème :**

- Pages blanches sans message d'erreur
- API retourne 500 sans détails
- Console JavaScript vide mais fonctionnalité cassée
- Logs remplis d'erreurs PHP

**Exemple de manifestation :**

```php
// ❌ MAUVAIS - Pas de gestion d'erreur
$response = wp_remote_get($api_url);
$data = json_decode($response['body']);
echo $data->title; // Fatal si $response est WP_Error
```

```javascript
// ❌ MAUVAIS - Fetch sans catch
fetch('/api/data')
  .then(res => res.json())
  .then(data => render(data)); // Pas de .catch()
```

## Pourquoi c'est un Problème

### Impact Technique

- Debug difficile (pas de message)
- Erreurs silencieuses = bugs cachés
- Expérience utilisateur dégradée
- Logs inutilisables

### Impact Business

- **Utilisateurs perdus** face à page blanche
- **Support surchargé** de tickets vagues
- **Confiance réduite** dans l'application

### Coût Typique

| Aspect | Coût estimé |
|--------|-------------|
| Debug sans contexte | 2-4h |
| Tickets support | +30% |
| Expérience utilisateur | Dégradée |

## Solution

### PHP - WordPress

```php
<?php
/**
 * Gestion d'erreur correcte pour API externe
 */
function fetch_external_data($url) {
    $response = wp_remote_get($url, [
        'timeout' => 10,
    ]);

    // Vérifier erreur WordPress
    if (is_wp_error($response)) {
        error_log('API Error: ' . $response->get_error_message());
        return new WP_Error(
            'api_error',
            __('Service temporairement indisponible', 'plugin'),
            ['status' => 503]
        );
    }

    // Vérifier code HTTP
    $code = wp_remote_retrieve_response_code($response);
    if ($code !== 200) {
        error_log("API returned HTTP {$code}");
        return new WP_Error(
            'api_http_error',
            __('Erreur de communication', 'plugin'),
            ['status' => $code]
        );
    }

    // Vérifier JSON valide
    $body = wp_remote_retrieve_body($response);
    $data = json_decode($body);

    if (json_last_error() !== JSON_ERROR_NONE) {
        error_log('JSON parse error: ' . json_last_error_msg());
        return new WP_Error(
            'json_error',
            __('Réponse invalide', 'plugin'),
            ['status' => 500]
        );
    }

    return $data;
}

// Utilisation
$data = fetch_external_data($url);
if (is_wp_error($data)) {
    wp_send_json_error($data->get_error_message(), $data->get_error_data()['status']);
}
```

### REST API WordPress

```php
<?php
/**
 * Endpoint avec gestion d'erreur complète
 */
add_action('rest_api_init', function() {
    register_rest_route('plugin/v1', '/action', [
        'methods'  => 'POST',
        'callback' => function($request) {
            try {
                $params = $request->get_json_params();

                // Validation
                if (empty($params['required_field'])) {
                    return new WP_Error(
                        'missing_field',
                        __('Champ requis manquant', 'plugin'),
                        ['status' => 400]
                    );
                }

                // Action
                $result = do_something($params);

                if (!$result) {
                    return new WP_Error(
                        'action_failed',
                        __('Action impossible', 'plugin'),
                        ['status' => 422]
                    );
                }

                return rest_ensure_response([
                    'success' => true,
                    'data'    => $result,
                ]);

            } catch (Exception $e) {
                error_log('REST API Exception: ' . $e->getMessage());

                return new WP_Error(
                    'server_error',
                    __('Erreur serveur', 'plugin'),
                    ['status' => 500]
                );
            }
        },
        'permission_callback' => function() {
            return current_user_can('edit_posts');
        },
    ]);
});
```

### JavaScript

```javascript
/**
 * Fetch avec gestion d'erreur complète
 */
async function fetchData(endpoint) {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': wpApiSettings.nonce,
      },
    });

    // Vérifier le statut HTTP
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    // Log pour debug
    console.error('Fetch error:', error);

    // Notification utilisateur
    showNotification({
      type: 'error',
      message: 'Une erreur est survenue. Veuillez réessayer.',
    });

    // Remonter l'erreur ou retourner fallback
    throw error;
  }
}

// Utilisation
try {
  const data = await fetchData('/wp-json/plugin/v1/items');
  renderItems(data);
} catch (error) {
  renderEmptyState();
}
```

### Composant React avec Error Boundary

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error:', error, errorInfo);
    // Envoyer à service de monitoring
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Quelque chose s'est mal passé</h2>
          <button onClick={() => window.location.reload()}>
            Recharger la page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

## Prévention

### Checklist

- [ ] Tous les `wp_remote_*` vérifient `is_wp_error()`
- [ ] Tous les `fetch()` ont un `.catch()` ou try/catch
- [ ] Tous les `json_decode()` vérifient `json_last_error()`
- [ ] Messages d'erreur user-friendly (pas techniques)
- [ ] Logging des erreurs pour debug

### ESLint Rule

```json
{
  "rules": {
    "no-floating-promises": "error"
  }
}
```

## Occurrences Documentées

| Projet | Date | Impact | Résolution |
|--------|------|--------|------------|
| Client A | 2024-02-10 | Page blanche paiement | Try/catch Stripe |
| Client B | 2024-05-20 | Formulaire muet | Error handling fetch |
| Client C | 2024-08-15 | API 500 sans log | WP_Error complet |
| Client D | 2024-10-30 | React crash | Error Boundary |

## Voir Aussi

- [Pattern: github-actions-wp](../patterns/github-actions-wp.md)
- [Anti-pattern: skip-tests-ci](./skip-tests-ci.md)

## Références

- [WordPress Error Handling](https://developer.wordpress.org/plugins/security/data-validation/)
- [JavaScript Error Handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
