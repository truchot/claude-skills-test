# WordPress Security Reference

## The Security Triad: Sanitize, Validate, Escape

```
INPUT -> Sanitize -> Validate -> Process -> Escape -> OUTPUT
```

## Nonces (CSRF Protection)

### Form Nonce
```php
// Generate
<form method="post">
  <?php wp_nonce_field('my_action', 'my_nonce'); ?>
  <input type="text" name="my_field">
  <button type="submit">Submit</button>
</form>

// Verify
if (!isset($_POST['my_nonce']) ||
    !wp_verify_nonce($_POST['my_nonce'], 'my_action')) {
  wp_die('Security check failed');
}
```

### URL Nonce
```php
$url = wp_nonce_url(admin_url('admin.php?action=delete&id=123'), 'delete_123');
// Verify: check_admin_referer('delete_123');
```

### AJAX Nonce
```php
wp_localize_script('my-script', 'myAjax', [
  'nonce' => wp_create_nonce('my_ajax_nonce'),
]);
// Verify: check_ajax_referer('my_ajax_nonce', 'nonce');
```

## Sanitization Functions

| Function | Use For |
|----------|---------|
| `sanitize_text_field()` | Plain text input |
| `sanitize_textarea_field()` | Multi-line text |
| `sanitize_email()` | Email addresses |
| `sanitize_url()` | URLs |
| `sanitize_file_name()` | File names |
| `sanitize_title()` | Slugs |
| `sanitize_key()` | Keys/identifiers |
| `wp_kses_post()` | Post content HTML |
| `absint()` | Positive integers |

## Escaping Functions

| Function | Use For |
|----------|---------|
| `esc_html()` | HTML content |
| `esc_attr()` | HTML attributes |
| `esc_url()` | URLs in href/src |
| `esc_js()` | Inline JavaScript |
| `esc_textarea()` | Textarea content |
| `wp_kses()` | Allowed HTML subset |
| `wp_kses_post()` | Post-level HTML |

## SQL Injection Prevention

```php
// ALWAYS use $wpdb->prepare()
$results = $wpdb->get_results(
  $wpdb->prepare(
    "SELECT * FROM {$wpdb->posts} WHERE post_type = %s AND post_status = %s",
    $post_type,
    'publish'
  )
);

// NEVER do this:
// $wpdb->query("SELECT * FROM wp_posts WHERE ID = $id");
```

## Capability Checks

```php
// Before any privileged action
if (!current_user_can('manage_options')) {
  wp_die('Unauthorized');
}

// In meta box save
function save_meta($post_id) {
  if (!current_user_can('edit_post', $post_id)) return;
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
  if (!wp_verify_nonce($_POST['_nonce'] ?? '', 'save_meta')) return;

  update_post_meta($post_id, '_key',
    sanitize_text_field($_POST['my_field'] ?? ''));
}
```

## File Upload Security

```php
$allowed_types = ['image/jpeg', 'image/png', 'image/webp'];
$file_type = wp_check_filetype($file['name']);

if (!in_array($file_type['type'], $allowed_types)) {
  wp_die('File type not allowed');
}
```

## Critical Rules

1. **Sanitize ALL input** - never trust user data
2. **Escape ALL output** - even data from the database
3. **Nonce on every action** - forms, AJAX, URL actions
4. **Capability checks** - verify permissions before operations
5. **Prepared statements** - always use `$wpdb->prepare()`
6. **DISALLOW_FILE_EDIT** - set to true in production wp-config.php
