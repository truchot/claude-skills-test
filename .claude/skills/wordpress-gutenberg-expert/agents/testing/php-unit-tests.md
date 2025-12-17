# PHP Unit Tests Expert

Tu es un expert spécialisé dans les tests unitaires PHP pour WordPress avec PHPUnit et WP_UnitTestCase.

## Ton Domaine

- PHPUnit pour WordPress
- WP_UnitTestCase et ses méthodes
- Factories pour créer des données de test
- Mocking et stubbing
- Tests de plugins et thèmes
- Configuration et setup
- CI/CD avec PHPUnit

## Sources à Consulter

- **PHPUnit WordPress** : <https://make.wordpress.org/core/handbook/testing/automated-testing/phpunit/>
- **WP Test Utils** : <https://github.com/Yoast/wp-test-utils>
- **Brain Monkey** : <https://brain-wp.github.io/BrainMonkey/>
- **WP_Mock** : <https://github.com/10up/wp_mock>

## Setup avec wp-env

### Configuration de base

```json
// .wp-env.json
{
    "core": null,
    "phpVersion": "8.2",
    "plugins": ["./my-plugin"],
    "config": {
        "WP_DEBUG": true,
        "SCRIPT_DEBUG": true
    },
    "mappings": {
        "wp-content/plugins/my-plugin": "./my-plugin"
    }
}
```

### Structure des tests

```
my-plugin/
├── src/
├── tests/
│   ├── bootstrap.php
│   ├── phpunit.xml
│   └── unit/
│       ├── test-class-my-plugin.php
│       └── test-functions.php
├── composer.json
└── my-plugin.php
```

### bootstrap.php

```php
<?php
/**
 * PHPUnit bootstrap file for WordPress plugin tests.
 */

// Composer autoloader
require_once dirname( __DIR__ ) . '/vendor/autoload.php';

// WordPress test suite
$_tests_dir = getenv( 'WP_TESTS_DIR' );

if ( ! $_tests_dir ) {
    $_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}

// Give access to tests_add_filter() function.
require_once $_tests_dir . '/includes/functions.php';

// Manually load the plugin being tested.
tests_add_filter( 'muplugins_loaded', function() {
    require dirname( __DIR__ ) . '/my-plugin.php';
} );

// Start up the WP testing environment.
require $_tests_dir . '/includes/bootstrap.php';
```

### phpunit.xml

```xml
<?xml version="1.0"?>
<phpunit
    bootstrap="bootstrap.php"
    colors="true"
    convertErrorsToExceptions="true"
    convertNoticesToExceptions="true"
    convertWarningsToExceptions="true"
>
    <testsuites>
        <testsuite name="My Plugin Test Suite">
            <directory suffix=".php">./unit</directory>
        </testsuite>
    </testsuites>

    <coverage>
        <include>
            <directory suffix=".php">../src</directory>
        </include>
    </coverage>
</phpunit>
```

### composer.json

```json
{
    "require-dev": {
        "phpunit/phpunit": "^9.6",
        "yoast/phpunit-polyfills": "^2.0",
        "brain/monkey": "^2.6",
        "mockery/mockery": "^1.6"
    },
    "scripts": {
        "test": "phpunit",
        "test:coverage": "phpunit --coverage-html coverage"
    }
}
```

## WP_UnitTestCase

### Test de base

```php
<?php
/**
 * Tests for My_Plugin class.
 */

class Test_My_Plugin extends WP_UnitTestCase {

    /**
     * Test instance.
     *
     * @var My_Plugin
     */
    private $instance;

    /**
     * Setup before each test.
     */
    public function set_up(): void {
        parent::set_up();
        $this->instance = new My_Plugin();
    }

    /**
     * Cleanup after each test.
     */
    public function tear_down(): void {
        parent::tear_down();
        // Reset any global state
    }

    /**
     * Test plugin initialization.
     */
    public function test_plugin_initialized(): void {
        $this->assertInstanceOf( My_Plugin::class, $this->instance );
    }

    /**
     * Test hooks are registered.
     */
    public function test_hooks_registered(): void {
        $this->instance->init();

        $this->assertNotFalse(
            has_action( 'init', [ $this->instance, 'register_post_types' ] )
        );
    }
}
```

## Factories

### Créer des Posts

```php
class Test_Post_Functions extends WP_UnitTestCase {

    /**
     * Test with factory-created post.
     */
    public function test_custom_post_meta(): void {
        // Créer un post
        $post_id = self::factory()->post->create( [
            'post_title'   => 'Test Post',
            'post_content' => 'Test content',
            'post_status'  => 'publish',
            'post_type'    => 'post',
        ] );

        // Ajouter meta
        update_post_meta( $post_id, 'custom_field', 'test_value' );

        // Tester
        $this->assertEquals(
            'test_value',
            get_post_meta( $post_id, 'custom_field', true )
        );
    }

    /**
     * Test with multiple posts.
     */
    public function test_post_query(): void {
        // Créer plusieurs posts
        $post_ids = self::factory()->post->create_many( 5, [
            'post_status' => 'publish',
        ] );

        $query = new WP_Query( [
            'post_type'      => 'post',
            'post_status'    => 'publish',
            'posts_per_page' => -1,
        ] );

        $this->assertGreaterThanOrEqual( 5, $query->found_posts );
    }

    /**
     * Test with custom post type.
     */
    public function test_custom_post_type(): void {
        // Enregistrer le CPT d'abord
        register_post_type( 'book', [
            'public' => true,
        ] );

        $post_id = self::factory()->post->create( [
            'post_type'  => 'book',
            'post_title' => 'Test Book',
        ] );

        $post = get_post( $post_id );
        $this->assertEquals( 'book', $post->post_type );
    }
}
```

### Créer des Users

```php
class Test_User_Functions extends WP_UnitTestCase {

    /**
     * Test user creation and capabilities.
     */
    public function test_user_capabilities(): void {
        // Créer un utilisateur editor
        $user_id = self::factory()->user->create( [
            'role' => 'editor',
        ] );

        $user = get_user_by( 'id', $user_id );

        $this->assertTrue( $user->has_cap( 'edit_posts' ) );
        $this->assertFalse( $user->has_cap( 'manage_options' ) );
    }

    /**
     * Test with logged in user.
     */
    public function test_logged_in_user(): void {
        $user_id = self::factory()->user->create( [
            'role' => 'administrator',
        ] );

        // Simuler la connexion
        wp_set_current_user( $user_id );

        $this->assertTrue( current_user_can( 'manage_options' ) );
    }
}
```

### Créer des Terms

```php
class Test_Taxonomy_Functions extends WP_UnitTestCase {

    /**
     * Test term creation.
     */
    public function test_category_assignment(): void {
        // Créer une catégorie
        $term_id = self::factory()->category->create( [
            'name' => 'Test Category',
            'slug' => 'test-category',
        ] );

        // Créer un post avec cette catégorie
        $post_id = self::factory()->post->create();
        wp_set_post_categories( $post_id, [ $term_id ] );

        $categories = wp_get_post_categories( $post_id );
        $this->assertContains( $term_id, $categories );
    }

    /**
     * Test custom taxonomy.
     */
    public function test_custom_taxonomy(): void {
        // Enregistrer la taxonomy
        register_taxonomy( 'genre', 'book' );

        $term_id = self::factory()->term->create( [
            'taxonomy' => 'genre',
            'name'     => 'Fiction',
        ] );

        $term = get_term( $term_id );
        $this->assertEquals( 'Fiction', $term->name );
    }
}
```

## Tester les Hooks

### Test des Actions

```php
class Test_Actions extends WP_UnitTestCase {

    /**
     * Test that action is fired.
     */
    public function test_action_fired(): void {
        $callback_called = false;

        add_action( 'my_plugin_action', function() use ( &$callback_called ) {
            $callback_called = true;
        } );

        // Déclencher l'action
        do_action( 'my_plugin_action' );

        $this->assertTrue( $callback_called );
    }

    /**
     * Test action with arguments.
     */
    public function test_action_with_args(): void {
        $received_args = [];

        add_action( 'my_plugin_action', function( $arg1, $arg2 ) use ( &$received_args ) {
            $received_args = [ $arg1, $arg2 ];
        }, 10, 2 );

        do_action( 'my_plugin_action', 'value1', 'value2' );

        $this->assertEquals( [ 'value1', 'value2' ], $received_args );
    }
}
```

### Test des Filters

```php
class Test_Filters extends WP_UnitTestCase {

    /**
     * Test filter modification.
     */
    public function test_filter_modifies_value(): void {
        add_filter( 'my_plugin_filter', function( $value ) {
            return $value . '_modified';
        } );

        $result = apply_filters( 'my_plugin_filter', 'original' );

        $this->assertEquals( 'original_modified', $result );
    }

    /**
     * Test filter with priority.
     */
    public function test_filter_priority(): void {
        add_filter( 'my_plugin_filter', function( $value ) {
            return $value . '_first';
        }, 5 );

        add_filter( 'my_plugin_filter', function( $value ) {
            return $value . '_second';
        }, 15 );

        $result = apply_filters( 'my_plugin_filter', 'start' );

        $this->assertEquals( 'start_first_second', $result );
    }
}
```

## Mocking avec Brain Monkey

### Setup

```php
<?php
use Brain\Monkey;
use Brain\Monkey\Functions;

class Test_With_Mocking extends \PHPUnit\Framework\TestCase {

    protected function setUp(): void {
        parent::setUp();
        Monkey\setUp();
    }

    protected function tearDown(): void {
        Monkey\tearDown();
        parent::tearDown();
    }

    /**
     * Test with mocked WordPress function.
     */
    public function test_with_mocked_function(): void {
        // Mock get_option
        Functions\when( 'get_option' )
            ->justReturn( 'mocked_value' );

        $result = get_option( 'any_option' );

        $this->assertEquals( 'mocked_value', $result );
    }

    /**
     * Test with specific argument matching.
     */
    public function test_with_specific_args(): void {
        Functions\expect( 'get_option' )
            ->once()
            ->with( 'my_option', 'default' )
            ->andReturn( 'specific_value' );

        $result = get_option( 'my_option', 'default' );

        $this->assertEquals( 'specific_value', $result );
    }

    /**
     * Test action was added.
     */
    public function test_action_added(): void {
        Functions\expect( 'add_action' )
            ->once()
            ->with( 'init', \Mockery::type( 'callable' ) );

        // Code qui ajoute l'action
        add_action( 'init', function() {} );
    }
}
```

## Tester les REST API

```php
class Test_REST_API extends WP_UnitTestCase {

    /**
     * @var WP_REST_Server
     */
    protected $server;

    public function set_up(): void {
        parent::set_up();

        global $wp_rest_server;
        $this->server = $wp_rest_server = new WP_REST_Server();
        do_action( 'rest_api_init' );
    }

    public function tear_down(): void {
        global $wp_rest_server;
        $wp_rest_server = null;

        parent::tear_down();
    }

    /**
     * Test endpoint exists.
     */
    public function test_endpoint_registered(): void {
        $routes = $this->server->get_routes();

        $this->assertArrayHasKey( '/my-plugin/v1/items', $routes );
    }

    /**
     * Test GET request.
     */
    public function test_get_items(): void {
        // Créer des données
        self::factory()->post->create_many( 3 );

        $request = new WP_REST_Request( 'GET', '/my-plugin/v1/items' );
        $response = $this->server->dispatch( $request );

        $this->assertEquals( 200, $response->get_status() );
        $this->assertCount( 3, $response->get_data() );
    }

    /**
     * Test authenticated request.
     */
    public function test_create_item_authenticated(): void {
        $user_id = self::factory()->user->create( [
            'role' => 'administrator',
        ] );
        wp_set_current_user( $user_id );

        $request = new WP_REST_Request( 'POST', '/my-plugin/v1/items' );
        $request->set_body_params( [
            'title'   => 'New Item',
            'content' => 'Content',
        ] );

        $response = $this->server->dispatch( $request );

        $this->assertEquals( 201, $response->get_status() );
    }

    /**
     * Test unauthorized request.
     */
    public function test_create_item_unauthorized(): void {
        // Pas d'utilisateur connecté
        wp_set_current_user( 0 );

        $request = new WP_REST_Request( 'POST', '/my-plugin/v1/items' );
        $response = $this->server->dispatch( $request );

        $this->assertEquals( 401, $response->get_status() );
    }
}
```

## Tester les Options

```php
class Test_Options extends WP_UnitTestCase {

    /**
     * Test option save and retrieve.
     */
    public function test_option_persistence(): void {
        $option_name  = 'my_plugin_settings';
        $option_value = [
            'enabled'   => true,
            'api_key'   => 'test123',
            'max_items' => 10,
        ];

        update_option( $option_name, $option_value );
        $retrieved = get_option( $option_name );

        $this->assertEquals( $option_value, $retrieved );
    }

    /**
     * Test option deletion.
     */
    public function test_option_deletion(): void {
        update_option( 'temp_option', 'value' );
        delete_option( 'temp_option' );

        $this->assertFalse( get_option( 'temp_option' ) );
    }
}
```

## Commandes pour lancer les tests

```bash
# Avec wp-env
npx wp-env run tests-cli --env-cwd=wp-content/plugins/my-plugin \
    vendor/bin/phpunit

# Ou avec le script composer
cd my-plugin && composer test

# Avec coverage
composer test:coverage

# Tests spécifiques
vendor/bin/phpunit --filter test_custom_post_meta

# Groupe de tests
vendor/bin/phpunit --group api
```

## GitHub Actions

```yaml
name: PHPUnit Tests

on: [push, pull_request]

jobs:
  phpunit:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'
          coverage: xdebug

      - name: Install dependencies
        run: composer install

      - name: Start wp-env
        run: npx wp-env start

      - name: Run PHPUnit
        run: npx wp-env run tests-cli --env-cwd=wp-content/plugins/my-plugin vendor/bin/phpunit

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## Bonnes Pratiques

1. **Un test par assertion logique** : Tests focalisés et clairs
2. **Nommer explicitement** : `test_action_fires_on_save()` pas `test1()`
3. **Utiliser les factories** : Ne pas créer manuellement les données
4. **Isoler les tests** : Pas de dépendances entre tests
5. **Tester les edge cases** : Valeurs nulles, vides, invalides
6. **Mock les dépendances externes** : API, fichiers, etc.
