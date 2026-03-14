# WP REST API Reference

## Core Endpoints

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/wp/v2/posts` | GET, POST | Posts CRUD |
| `/wp/v2/pages` | GET, POST | Pages CRUD |
| `/wp/v2/media` | GET, POST | Media uploads |
| `/wp/v2/users` | GET, POST | Users management |
| `/wp/v2/categories` | GET, POST | Categories |
| `/wp/v2/tags` | GET, POST | Tags |

## Custom Endpoint Pattern

```php
add_action('rest_api_init', function () {
  register_rest_route('my-plugin/v1', '/items', [
    [
      'methods'             => WP_REST_Server::READABLE,
      'callback'            => 'get_items',
      'permission_callback' => fn() => current_user_can('read'),
      'args' => [
        'per_page' => ['type' => 'integer', 'default' => 10],
        'page'     => ['type' => 'integer', 'default' => 1],
      ],
    ],
    [
      'methods'             => WP_REST_Server::CREATABLE,
      'callback'            => 'create_item',
      'permission_callback' => fn() => current_user_can('edit_posts'),
      'args' => [
        'title' => ['type' => 'string', 'required' => true, 'sanitize_callback' => 'sanitize_text_field'],
      ],
    ],
  ]);
});
```

## WP_REST_Controller Pattern

```php
class My_REST_Controller extends WP_REST_Controller {
  public function __construct() {
    $this->namespace = 'my-plugin/v1';
    $this->rest_base = 'items';
  }

  public function register_routes() {
    register_rest_route($this->namespace, '/' . $this->rest_base, [
      ['methods' => 'GET', 'callback' => [$this, 'get_items'],
       'permission_callback' => [$this, 'get_items_permissions_check']],
    ]);
  }

  public function get_items_permissions_check($request) {
    return current_user_can('read');
  }

  public function get_items($request) {
    $data = []; // fetch items
    return new WP_REST_Response($data, 200);
  }
}
add_action('rest_api_init', fn() => (new My_REST_Controller())->register_routes());
```

## Client-Side (api-fetch)

```js
import apiFetch from '@wordpress/api-fetch';

// GET
const posts = await apiFetch({ path: '/wp/v2/posts?per_page=5' });

// POST
const newPost = await apiFetch({
  path: '/my-plugin/v1/items',
  method: 'POST',
  data: { title: 'New Item' },
});

// Nonce middleware (auto-configured in admin)
apiFetch.use(apiFetch.createNonceMiddleware(wpApiSettings.nonce));
```

## Extending Native Endpoints

```php
register_rest_field('post', 'reading_time', [
  'get_callback' => function ($post) {
    $content = get_post_field('post_content', $post['id']);
    $word_count = str_word_count(strip_tags($content));
    return ceil($word_count / 200);
  },
  'schema' => ['type' => 'integer', 'description' => 'Reading time in minutes'],
]);
```

## Security Checklist

- Always set `permission_callback` (never omit it)
- Use `sanitize_callback` on all input args
- Validate with `validate_callback` where needed
- Return `WP_Error` for unauthorized access
- Use `rest_ensure_response()` for consistent output
- Never expose sensitive user data without capability checks
