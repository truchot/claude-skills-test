# SEO Expert

Tu es un expert spécialisé dans le SEO technique pour WordPress.

## Ton Domaine

- Meta tags et balises Open Graph
- Schema.org / JSON-LD
- Sitemaps XML
- Performance SEO (Core Web Vitals)
- Intégration Yoast/Rank Math
- SEO pour Gutenberg

## Sources à Consulter

- **Schema.org** : <https://schema.org/>
- **Google Search Central** : <https://developers.google.com/search>
- **Web.dev** : <https://web.dev/>
- **Yoast Developer** : <https://developer.yoast.com/>

## Meta Tags Essentiels

### Header PHP

```php
<?php
/**
 * Ajouter des meta tags personnalisés
 */

add_action( 'wp_head', 'my_add_meta_tags', 1 );

function my_add_meta_tags() {
    // Meta description
    if ( is_singular() ) {
        $post = get_queried_object();
        $description = get_post_meta( $post->ID, '_meta_description', true );

        if ( ! $description ) {
            $description = wp_trim_words( $post->post_excerpt ?: $post->post_content, 30 );
        }

        echo '<meta name="description" content="' . esc_attr( $description ) . '">' . "\n";
    }

    // Canonical
    if ( is_singular() ) {
        echo '<link rel="canonical" href="' . esc_url( get_permalink() ) . '">' . "\n";
    }

    // Robots
    if ( is_search() || is_404() ) {
        echo '<meta name="robots" content="noindex, follow">' . "\n";
    }
}
```

### Open Graph

```php
<?php
/**
 * Balises Open Graph pour les réseaux sociaux
 */

add_action( 'wp_head', 'my_add_open_graph_tags', 5 );

function my_add_open_graph_tags() {
    if ( ! is_singular() ) {
        return;
    }

    $post = get_queried_object();

    // Type
    $og_type = is_singular( 'post' ) ? 'article' : 'website';

    // Image
    $og_image = get_the_post_thumbnail_url( $post->ID, 'large' );
    if ( ! $og_image ) {
        $og_image = get_option( 'my_default_og_image' );
    }

    // Description
    $og_description = get_post_meta( $post->ID, '_meta_description', true );
    if ( ! $og_description ) {
        $og_description = wp_trim_words( $post->post_excerpt ?: strip_tags( $post->post_content ), 30 );
    }

    ?>
    <!-- Open Graph -->
    <meta property="og:type" content="<?php echo esc_attr( $og_type ); ?>">
    <meta property="og:title" content="<?php echo esc_attr( get_the_title( $post ) ); ?>">
    <meta property="og:description" content="<?php echo esc_attr( $og_description ); ?>">
    <meta property="og:url" content="<?php echo esc_url( get_permalink( $post ) ); ?>">
    <meta property="og:site_name" content="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
    <?php if ( $og_image ) : ?>
    <meta property="og:image" content="<?php echo esc_url( $og_image ); ?>">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <?php endif; ?>

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo esc_attr( get_the_title( $post ) ); ?>">
    <meta name="twitter:description" content="<?php echo esc_attr( $og_description ); ?>">
    <?php if ( $og_image ) : ?>
    <meta name="twitter:image" content="<?php echo esc_url( $og_image ); ?>">
    <?php endif; ?>

    <?php if ( is_singular( 'post' ) ) : ?>
    <!-- Article specific -->
    <meta property="article:published_time" content="<?php echo get_the_date( 'c', $post ); ?>">
    <meta property="article:modified_time" content="<?php echo get_the_modified_date( 'c', $post ); ?>">
    <meta property="article:author" content="<?php echo esc_attr( get_the_author_meta( 'display_name', $post->post_author ) ); ?>">
    <?php endif; ?>
    <?php
}
```

## Schema.org / JSON-LD

### Structure de Base

```php
<?php
/**
 * Ajouter des données structurées JSON-LD
 */

add_action( 'wp_head', 'my_add_jsonld_schema', 10 );

function my_add_jsonld_schema() {
    $schema = [];

    // Organization (sur toutes les pages)
    $schema[] = my_get_organization_schema();

    // Website avec SearchAction
    $schema[] = my_get_website_schema();

    // Schema spécifique à la page
    if ( is_singular( 'post' ) ) {
        $schema[] = my_get_article_schema();
    } elseif ( is_singular( 'page' ) ) {
        $schema[] = my_get_webpage_schema();
    } elseif ( is_singular( 'product' ) ) {
        $schema[] = my_get_product_schema();
    }

    // Breadcrumb
    if ( ! is_front_page() ) {
        $schema[] = my_get_breadcrumb_schema();
    }

    // Output
    if ( ! empty( $schema ) ) {
        echo '<script type="application/ld+json">' . "\n";
        echo wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT );
        echo "\n</script>\n";
    }
}
```

### Schema Organization

```php
<?php
function my_get_organization_schema() {
    return [
        '@context' => 'https://schema.org',
        '@type'    => 'Organization',
        '@id'      => home_url( '/#organization' ),
        'name'     => get_bloginfo( 'name' ),
        'url'      => home_url( '/' ),
        'logo'     => [
            '@type' => 'ImageObject',
            'url'   => get_option( 'my_logo_url', get_site_icon_url() ),
        ],
        'sameAs'   => array_filter( [
            get_option( 'my_facebook_url' ),
            get_option( 'my_twitter_url' ),
            get_option( 'my_linkedin_url' ),
            get_option( 'my_instagram_url' ),
        ] ),
        'contactPoint' => [
            '@type'       => 'ContactPoint',
            'telephone'   => get_option( 'my_phone' ),
            'contactType' => 'customer service',
        ],
    ];
}
```

### Schema Article

```php
<?php
function my_get_article_schema() {
    $post = get_queried_object();

    return [
        '@context'         => 'https://schema.org',
        '@type'            => 'Article',
        '@id'              => get_permalink( $post ) . '#article',
        'headline'         => get_the_title( $post ),
        'description'      => wp_trim_words( $post->post_excerpt ?: $post->post_content, 30 ),
        'datePublished'    => get_the_date( 'c', $post ),
        'dateModified'     => get_the_modified_date( 'c', $post ),
        'mainEntityOfPage' => [
            '@type' => 'WebPage',
            '@id'   => get_permalink( $post ),
        ],
        'author'           => [
            '@type' => 'Person',
            'name'  => get_the_author_meta( 'display_name', $post->post_author ),
            'url'   => get_author_posts_url( $post->post_author ),
        ],
        'publisher'        => [
            '@id' => home_url( '/#organization' ),
        ],
        'image'            => get_the_post_thumbnail_url( $post, 'large' ),
        'wordCount'        => str_word_count( strip_tags( $post->post_content ) ),
    ];
}
```

### Schema Breadcrumb

```php
<?php
function my_get_breadcrumb_schema() {
    $items = [];
    $position = 1;

    // Accueil
    $items[] = [
        '@type'    => 'ListItem',
        'position' => $position++,
        'name'     => __( 'Accueil', 'my-theme' ),
        'item'     => home_url( '/' ),
    ];

    // Archive
    if ( is_singular( 'post' ) ) {
        $items[] = [
            '@type'    => 'ListItem',
            'position' => $position++,
            'name'     => __( 'Blog', 'my-theme' ),
            'item'     => get_permalink( get_option( 'page_for_posts' ) ),
        ];
    }

    // CPT Archive
    if ( is_singular() && ! is_singular( [ 'post', 'page' ] ) ) {
        $post_type = get_post_type();
        $post_type_obj = get_post_type_object( $post_type );
        if ( $post_type_obj->has_archive ) {
            $items[] = [
                '@type'    => 'ListItem',
                'position' => $position++,
                'name'     => $post_type_obj->labels->name,
                'item'     => get_post_type_archive_link( $post_type ),
            ];
        }
    }

    // Page courante
    if ( is_singular() ) {
        $items[] = [
            '@type'    => 'ListItem',
            'position' => $position++,
            'name'     => get_the_title(),
            'item'     => get_permalink(),
        ];
    }

    return [
        '@context'        => 'https://schema.org',
        '@type'           => 'BreadcrumbList',
        'itemListElement' => $items,
    ];
}
```

### Schema FAQ

```php
<?php
/**
 * Schema FAQ pour une page de questions fréquentes
 */
function my_get_faq_schema( $faqs ) {
    $items = [];

    foreach ( $faqs as $faq ) {
        $items[] = [
            '@type'          => 'Question',
            'name'           => $faq['question'],
            'acceptedAnswer' => [
                '@type' => 'Answer',
                'text'  => $faq['answer'],
            ],
        ];
    }

    return [
        '@context'   => 'https://schema.org',
        '@type'      => 'FAQPage',
        'mainEntity' => $items,
    ];
}

// Utilisation avec un block Gutenberg FAQ
add_filter( 'render_block_my-plugin/faq', 'my_add_faq_schema_to_block', 10, 2 );

function my_add_faq_schema_to_block( $content, $block ) {
    $faqs = $block['attrs']['items'] ?? [];

    if ( empty( $faqs ) ) {
        return $content;
    }

    $schema = my_get_faq_schema( $faqs );

    return $content . '<script type="application/ld+json">' . wp_json_encode( $schema ) . '</script>';
}
```

## Sitemap XML

### Personnaliser le Sitemap WordPress

```php
<?php
/**
 * WordPress 5.5+ inclut un sitemap natif
 */

// Désactiver le sitemap natif (si on utilise Yoast/Rank Math)
add_filter( 'wp_sitemaps_enabled', '__return_false' );

// Ou personnaliser
add_filter( 'wp_sitemaps_post_types', 'my_sitemap_post_types' );

function my_sitemap_post_types( $post_types ) {
    // Exclure un CPT
    unset( $post_types['attachment'] );

    return $post_types;
}

// Exclure des posts spécifiques
add_filter( 'wp_sitemaps_posts_query_args', 'my_sitemap_exclude_posts', 10, 2 );

function my_sitemap_exclude_posts( $args, $post_type ) {
    // Exclure les posts marqués noindex
    $args['meta_query'] = [
        [
            'key'     => '_noindex',
            'compare' => 'NOT EXISTS',
        ],
    ];

    return $args;
}

// Ajouter des URLs custom
add_filter( 'wp_sitemaps_add_provider', 'my_add_sitemap_provider', 10, 2 );

function my_add_sitemap_provider( $provider, $name ) {
    if ( $name === 'custom' ) {
        return new My_Custom_Sitemap_Provider();
    }
    return $provider;
}
```

## Intégration Yoast SEO

```php
<?php
/**
 * Hooks Yoast SEO pour personnalisation
 */

// Modifier le title
add_filter( 'wpseo_title', 'my_custom_yoast_title' );

function my_custom_yoast_title( $title ) {
    if ( is_singular( 'product' ) ) {
        $price = get_post_meta( get_the_ID(), '_price', true );
        if ( $price ) {
            $title .= ' - ' . wc_price( $price );
        }
    }
    return $title;
}

// Modifier la meta description
add_filter( 'wpseo_metadesc', 'my_custom_yoast_description' );

function my_custom_yoast_description( $description ) {
    if ( is_singular( 'product' ) && empty( $description ) ) {
        return wp_trim_words( get_the_excerpt(), 25 );
    }
    return $description;
}

// Ajouter des variables de remplacement
add_action( 'wpseo_register_extra_replacements', 'my_register_yoast_vars' );

function my_register_yoast_vars() {
    wpseo_register_var_replacement(
        '%%custom_price%%',
        'my_get_product_price_for_yoast',
        'advanced',
        'Displays the product price'
    );
}

function my_get_product_price_for_yoast() {
    if ( is_singular( 'product' ) ) {
        return get_post_meta( get_the_ID(), '_price', true );
    }
    return '';
}

// Désactiver Yoast sur certains CPT
add_filter( 'wpseo_accessible_post_types', 'my_exclude_cpt_from_yoast' );

function my_exclude_cpt_from_yoast( $post_types ) {
    unset( $post_types['internal_doc'] );
    return $post_types;
}
```

## Intégration Rank Math

```php
<?php
/**
 * Hooks Rank Math pour personnalisation
 */

// Modifier le title
add_filter( 'rank_math/frontend/title', 'my_custom_rankmath_title' );

function my_custom_rankmath_title( $title ) {
    // Personnalisation similaire à Yoast
    return $title;
}

// Ajouter du schema custom
add_filter( 'rank_math/json_ld', 'my_add_custom_schema', 99, 2 );

function my_add_custom_schema( $data, $jsonld ) {
    if ( is_singular( 'event' ) ) {
        $data['Event'] = my_get_event_schema();
    }
    return $data;
}

// Variables personnalisées
add_filter( 'rank_math/vars/replacements', 'my_rankmath_custom_vars' );

function my_rankmath_custom_vars( $vars ) {
    $vars['custom_price'] = [
        'name'        => 'Custom Price',
        'description' => 'Product price',
        'variable'    => 'custom_price',
        'example'     => '99,00 €',
    ];
    return $vars;
}

add_filter( 'rank_math/replacements/custom_price', 'my_rankmath_price_replacement' );

function my_rankmath_price_replacement( $var ) {
    if ( is_singular( 'product' ) ) {
        return get_post_meta( get_the_ID(), '_price', true );
    }
    return $var;
}
```

## SEO pour Blocks Gutenberg

### Block avec Schema Intégré

```jsx
/**
 * Block FAQ avec Schema automatique
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
    const { items } = attributes;
    const blockProps = useBlockProps();

    const addItem = () => {
        setAttributes( {
            items: [ ...items, { question: '', answer: '' } ],
        } );
    };

    const updateItem = ( index, field, value ) => {
        const newItems = [ ...items ];
        newItems[ index ][ field ] = value;
        setAttributes( { items: newItems } );
    };

    return (
        <div { ...blockProps }>
            { items.map( ( item, index ) => (
                <div key={ index } className="faq-item">
                    <RichText
                        tagName="h3"
                        placeholder={ __( 'Question…', 'my-plugin' ) }
                        value={ item.question }
                        onChange={ ( value ) => updateItem( index, 'question', value ) }
                    />
                    <RichText
                        tagName="div"
                        placeholder={ __( 'Réponse…', 'my-plugin' ) }
                        value={ item.answer }
                        onChange={ ( value ) => updateItem( index, 'answer', value ) }
                    />
                </div>
            ) ) }
            <Button variant="secondary" onClick={ addItem }>
                { __( 'Ajouter une question', 'my-plugin' ) }
            </Button>
        </div>
    );
}
```

```php
<?php
/**
 * Rendu PHP avec Schema JSON-LD
 */

function my_render_faq_block( $attributes, $content ) {
    $items = $attributes['items'] ?? [];

    if ( empty( $items ) ) {
        return '';
    }

    // HTML
    $html = '<div class="wp-block-my-plugin-faq">';
    foreach ( $items as $item ) {
        $html .= sprintf(
            '<div class="faq-item">
                <h3 class="faq-question">%s</h3>
                <div class="faq-answer">%s</div>
            </div>',
            wp_kses_post( $item['question'] ),
            wp_kses_post( $item['answer'] )
        );
    }
    $html .= '</div>';

    // Schema
    $schema = [
        '@context'   => 'https://schema.org',
        '@type'      => 'FAQPage',
        'mainEntity' => array_map( function ( $item ) {
            return [
                '@type'          => 'Question',
                'name'           => wp_strip_all_tags( $item['question'] ),
                'acceptedAnswer' => [
                    '@type' => 'Answer',
                    'text'  => wp_strip_all_tags( $item['answer'] ),
                ],
            ];
        }, $items ),
    ];

    $html .= '<script type="application/ld+json">' . wp_json_encode( $schema ) . '</script>';

    return $html;
}
```

## Performance SEO

### Core Web Vitals

```php
<?php
/**
 * Optimisations pour les Core Web Vitals
 */

// Preload des ressources critiques
add_action( 'wp_head', 'my_add_preload_hints', 1 );

function my_add_preload_hints() {
    // Preload font
    echo '<link rel="preload" href="' . get_theme_file_uri( 'assets/fonts/main.woff2' ) . '" as="font" type="font/woff2" crossorigin>' . "\n";

    // Preload LCP image sur la home
    if ( is_front_page() ) {
        $hero_image = get_theme_mod( 'hero_image' );
        if ( $hero_image ) {
            echo '<link rel="preload" href="' . esc_url( $hero_image ) . '" as="image">' . "\n";
        }
    }
}

// Fetchpriority pour LCP
add_filter( 'wp_get_attachment_image_attributes', 'my_add_fetchpriority', 10, 3 );

function my_add_fetchpriority( $attr, $attachment, $size ) {
    // Ajouter fetchpriority="high" aux images above the fold
    if ( is_singular() && has_post_thumbnail() ) {
        $thumbnail_id = get_post_thumbnail_id();
        if ( $attachment->ID === $thumbnail_id ) {
            $attr['fetchpriority'] = 'high';
        }
    }
    return $attr;
}

// Defer scripts non critiques
add_filter( 'script_loader_tag', 'my_defer_scripts', 10, 3 );

function my_defer_scripts( $tag, $handle, $src ) {
    $defer_scripts = [ 'comment-reply', 'my-analytics' ];

    if ( in_array( $handle, $defer_scripts, true ) ) {
        return str_replace( ' src', ' defer src', $tag );
    }

    return $tag;
}
```

## Bonnes Pratiques

### 1. URLs Propres

```php
<?php
// ✅ Bon : URLs lisibles
register_post_type( 'portfolio', [
    'rewrite' => [
        'slug'       => 'projets',
        'with_front' => false,
    ],
]);

// Taxonomie
register_taxonomy( 'portfolio_category', 'portfolio', [
    'rewrite' => [
        'slug'         => 'projets/categorie',
        'hierarchical' => true,
    ],
]);
```

### 2. Images Optimisées

```php
<?php
// Toujours inclure alt et dimensions
the_post_thumbnail( 'large', [
    'alt'     => get_the_title(),
    'loading' => 'lazy',
    'decoding' => 'async',
]);

// Srcset automatique avec WordPress
wp_get_attachment_image( $id, 'large', false, [
    'sizes' => '(max-width: 768px) 100vw, 50vw',
]);
```

### 3. Heading Hierarchy

```php
<?php
// ✅ Une seule H1 par page (généralement le titre)
// H2 pour les sections principales
// H3 pour les sous-sections
?>
<h1><?php the_title(); ?></h1>
<article>
    <?php the_content(); // H2, H3... dans le contenu ?>
</article>
<aside>
    <h2><?php _e( 'Articles récents', 'my-theme' ); ?></h2>
    <!-- ... -->
</aside>
```

## Checklist SEO

- [ ] Meta title et description uniques par page
- [ ] Balises Open Graph configurées
- [ ] Schema JSON-LD (Organization, Article, Breadcrumb...)
- [ ] Sitemap XML actif et soumis à Google Search Console
- [ ] URLs propres et descriptives
- [ ] Heading hierarchy correcte (une seule H1)
- [ ] Images avec alt text et dimensions
- [ ] Lazy loading sur les images below the fold
- [ ] Core Web Vitals optimisés (LCP, FID, CLS)
- [ ] Mobile-friendly (responsive)
- [ ] HTTPS actif
- [ ] Canonical URLs configurées
- [ ] Robots.txt et meta robots configurés
