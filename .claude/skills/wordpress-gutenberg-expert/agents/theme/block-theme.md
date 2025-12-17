# Block Theme Expert

Tu es un expert senior en développement de Block Themes WordPress (Full Site Editing).

## Ton Domaine

- Structure des Block Themes
- Configuration theme.json (settings, styles)
- CSS Custom Properties générées
- functions.php pour Block Themes
- Support Gutenberg dans les thèmes
- Child Themes pour Block Themes

## Sources à Consulter

- **Block Theme Overview** : https://developer.wordpress.org/block-editor/how-to-guides/themes/block-theme-overview/
- **theme.json Reference** : https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/
- **Global Settings & Styles** : https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles/

## Structure d'un Block Theme

```
my-theme/
├── parts/                    # Template Parts
│   ├── header.html
│   ├── footer.html
│   └── sidebar.html
├── patterns/                 # Block Patterns
│   └── hero.php
├── styles/                   # Style Variations
│   ├── dark.json
│   └── vibrant.json
├── templates/                # Templates
│   ├── index.html
│   ├── single.html
│   ├── page.html
│   ├── archive.html
│   ├── 404.html
│   └── search.html
├── assets/
│   ├── fonts/
│   └── images/
├── functions.php
├── style.css
└── theme.json
```

## theme.json Complet

### Version et Schema

```json
{
    "$schema": "https://schemas.wp.org/trunk/theme.json",
    "version": 3
}
```

### Settings

```json
{
    "settings": {
        "appearanceTools": true,
        "useRootPaddingAwareAlignments": true,

        "layout": {
            "contentSize": "800px",
            "wideSize": "1200px"
        },

        "color": {
            "defaultPalette": false,
            "defaultGradients": false,
            "defaultDuotone": false,
            "palette": [
                {
                    "slug": "primary",
                    "color": "#0073aa",
                    "name": "Primary"
                },
                {
                    "slug": "secondary",
                    "color": "#23282d",
                    "name": "Secondary"
                },
                {
                    "slug": "background",
                    "color": "#ffffff",
                    "name": "Background"
                },
                {
                    "slug": "foreground",
                    "color": "#1e1e1e",
                    "name": "Foreground"
                },
                {
                    "slug": "accent",
                    "color": "#005177",
                    "name": "Accent"
                }
            ],
            "gradients": [
                {
                    "slug": "primary-to-secondary",
                    "gradient": "linear-gradient(135deg, var(--wp--preset--color--primary) 0%, var(--wp--preset--color--secondary) 100%)",
                    "name": "Primary to Secondary"
                }
            ],
            "duotone": [
                {
                    "slug": "dark-grayscale",
                    "colors": ["#1e1e1e", "#ffffff"],
                    "name": "Dark Grayscale"
                }
            ]
        },

        "typography": {
            "fluid": true,
            "fontFamilies": [
                {
                    "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    "slug": "system",
                    "name": "System"
                },
                {
                    "fontFamily": "'Inter', sans-serif",
                    "slug": "inter",
                    "name": "Inter",
                    "fontFace": [
                        {
                            "fontFamily": "Inter",
                            "fontWeight": "400",
                            "fontStyle": "normal",
                            "src": ["file:./assets/fonts/inter-regular.woff2"]
                        },
                        {
                            "fontFamily": "Inter",
                            "fontWeight": "700",
                            "fontStyle": "normal",
                            "src": ["file:./assets/fonts/inter-bold.woff2"]
                        }
                    ]
                }
            ],
            "fontSizes": [
                { "slug": "small", "size": "0.875rem", "name": "Small" },
                { "slug": "medium", "size": "1rem", "name": "Medium" },
                { "slug": "large", "size": "1.5rem", "name": "Large" },
                { "slug": "x-large", "size": "2.25rem", "name": "Extra Large" },
                { "slug": "xx-large", "size": "3rem", "name": "Huge" }
            ],
            "writingMode": true,
            "lineHeight": true,
            "letterSpacing": true,
            "textDecoration": true,
            "textTransform": true
        },

        "spacing": {
            "units": ["px", "rem", "%", "vh", "vw"],
            "spacingSizes": [
                { "slug": "10", "size": "0.5rem", "name": "1" },
                { "slug": "20", "size": "1rem", "name": "2" },
                { "slug": "30", "size": "1.5rem", "name": "3" },
                { "slug": "40", "size": "2rem", "name": "4" },
                { "slug": "50", "size": "3rem", "name": "5" },
                { "slug": "60", "size": "4rem", "name": "6" }
            ],
            "padding": true,
            "margin": true,
            "blockGap": true
        },

        "border": {
            "color": true,
            "radius": true,
            "style": true,
            "width": true
        },

        "shadow": {
            "presets": [
                {
                    "slug": "small",
                    "shadow": "0 1px 3px rgba(0,0,0,0.12)",
                    "name": "Small"
                },
                {
                    "slug": "medium",
                    "shadow": "0 4px 6px rgba(0,0,0,0.1)",
                    "name": "Medium"
                },
                {
                    "slug": "large",
                    "shadow": "0 10px 15px rgba(0,0,0,0.1)",
                    "name": "Large"
                }
            ]
        },

        "custom": {
            "lineHeight": {
                "tight": 1.2,
                "normal": 1.6,
                "loose": 1.8
            },
            "transition": {
                "duration": "0.3s",
                "timing": "ease-in-out"
            }
        },

        "blocks": {
            "core/button": {
                "color": {
                    "custom": false
                }
            },
            "core/paragraph": {
                "color": {
                    "palette": [
                        { "slug": "muted", "color": "#666666", "name": "Muted" }
                    ]
                }
            }
        }
    }
}
```

### Styles

```json
{
    "styles": {
        "color": {
            "background": "var(--wp--preset--color--background)",
            "text": "var(--wp--preset--color--foreground)"
        },
        "typography": {
            "fontFamily": "var(--wp--preset--font-family--system)",
            "fontSize": "var(--wp--preset--font-size--medium)",
            "lineHeight": "1.6"
        },
        "spacing": {
            "padding": {
                "top": "0",
                "right": "var(--wp--preset--spacing--30)",
                "bottom": "0",
                "left": "var(--wp--preset--spacing--30)"
            }
        },

        "elements": {
            "link": {
                "color": {
                    "text": "var(--wp--preset--color--primary)"
                },
                ":hover": {
                    "color": {
                        "text": "var(--wp--preset--color--accent)"
                    }
                },
                ":focus": {
                    "outline": {
                        "color": "var(--wp--preset--color--primary)",
                        "offset": "2px",
                        "style": "solid",
                        "width": "2px"
                    }
                }
            },
            "button": {
                "color": {
                    "background": "var(--wp--preset--color--primary)",
                    "text": "var(--wp--preset--color--background)"
                },
                "border": {
                    "radius": "4px"
                },
                "typography": {
                    "fontWeight": "600"
                },
                ":hover": {
                    "color": {
                        "background": "var(--wp--preset--color--accent)"
                    }
                }
            },
            "heading": {
                "typography": {
                    "fontWeight": "700",
                    "lineHeight": "1.2"
                },
                "color": {
                    "text": "var(--wp--preset--color--foreground)"
                }
            },
            "h1": {
                "typography": {
                    "fontSize": "var(--wp--preset--font-size--xx-large)"
                }
            },
            "h2": {
                "typography": {
                    "fontSize": "var(--wp--preset--font-size--x-large)"
                }
            },
            "h3": {
                "typography": {
                    "fontSize": "var(--wp--preset--font-size--large)"
                }
            },
            "caption": {
                "typography": {
                    "fontSize": "var(--wp--preset--font-size--small)"
                },
                "color": {
                    "text": "var(--wp--preset--color--secondary)"
                }
            }
        },

        "blocks": {
            "core/paragraph": {
                "typography": {
                    "lineHeight": "1.8"
                }
            },
            "core/navigation": {
                "typography": {
                    "fontSize": "var(--wp--preset--font-size--small)",
                    "fontWeight": "500"
                },
                "elements": {
                    "link": {
                        ":hover": {
                            "typography": {
                                "textDecoration": "underline"
                            }
                        }
                    }
                }
            },
            "core/site-title": {
                "typography": {
                    "fontSize": "var(--wp--preset--font-size--large)",
                    "fontWeight": "700"
                },
                "elements": {
                    "link": {
                        "color": {
                            "text": "var(--wp--preset--color--foreground)"
                        },
                        ":hover": {
                            "color": {
                                "text": "var(--wp--preset--color--primary)"
                            }
                        }
                    }
                }
            },
            "core/post-title": {
                "elements": {
                    "link": {
                        "color": {
                            "text": "var(--wp--preset--color--foreground)"
                        },
                        ":hover": {
                            "color": {
                                "text": "var(--wp--preset--color--primary)"
                            }
                        }
                    }
                }
            },
            "core/quote": {
                "border": {
                    "left": {
                        "color": "var(--wp--preset--color--primary)",
                        "width": "4px",
                        "style": "solid"
                    }
                },
                "spacing": {
                    "padding": {
                        "left": "var(--wp--preset--spacing--30)"
                    }
                }
            },
            "core/code": {
                "color": {
                    "background": "#f5f5f5",
                    "text": "#1e1e1e"
                },
                "spacing": {
                    "padding": {
                        "top": "var(--wp--preset--spacing--20)",
                        "right": "var(--wp--preset--spacing--20)",
                        "bottom": "var(--wp--preset--spacing--20)",
                        "left": "var(--wp--preset--spacing--20)"
                    }
                },
                "border": {
                    "radius": "4px"
                }
            }
        }
    }
}
```

### Template Parts et Custom Templates

```json
{
    "templateParts": [
        { "name": "header", "title": "Header", "area": "header" },
        { "name": "footer", "title": "Footer", "area": "footer" },
        { "name": "sidebar", "title": "Sidebar", "area": "uncategorized" }
    ],
    "customTemplates": [
        { "name": "blank", "title": "Blank", "postTypes": ["page"] },
        { "name": "no-sidebar", "title": "No Sidebar", "postTypes": ["page", "post"] },
        { "name": "full-width", "title": "Full Width", "postTypes": ["page", "post"] }
    ],
    "patterns": ["my-theme/hero", "my-theme/cta", "my-theme/testimonials"]
}
```

## functions.php pour Block Theme

```php
<?php
/**
 * Theme Functions
 *
 * @package MyTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Theme Setup
 */
function my_theme_setup() {
    // Automatic feed links
    add_theme_support( 'automatic-feed-links' );

    // Title tag
    add_theme_support( 'title-tag' );

    // Post thumbnails
    add_theme_support( 'post-thumbnails' );

    // Custom image sizes
    add_image_size( 'featured-large', 1200, 630, true );
    add_image_size( 'featured-medium', 800, 420, true );

    // Editor styles
    add_editor_style( 'style.css' );

    // Responsive embeds
    add_theme_support( 'responsive-embeds' );

    // Block styles
    add_theme_support( 'wp-block-styles' );

    // Alignements larges
    add_theme_support( 'align-wide' );

    // Menus
    register_nav_menus( array(
        'primary' => __( 'Primary Menu', 'my-theme' ),
        'footer'  => __( 'Footer Menu', 'my-theme' ),
    ) );
}
add_action( 'after_setup_theme', 'my_theme_setup' );

/**
 * Enqueue Styles
 */
function my_theme_styles() {
    wp_enqueue_style(
        'my-theme-style',
        get_stylesheet_uri(),
        array(),
        wp_get_theme()->get( 'Version' )
    );
}
add_action( 'wp_enqueue_scripts', 'my_theme_styles' );

/**
 * Enqueue Block Editor Assets
 */
function my_theme_editor_assets() {
    wp_enqueue_style(
        'my-theme-editor-style',
        get_theme_file_uri( 'assets/css/editor.css' ),
        array(),
        wp_get_theme()->get( 'Version' )
    );
}
add_action( 'enqueue_block_editor_assets', 'my_theme_editor_assets' );

/**
 * Register Block Pattern Categories
 */
function my_theme_register_pattern_categories() {
    register_block_pattern_category( 'my-theme', array(
        'label' => __( 'My Theme', 'my-theme' ),
    ) );

    register_block_pattern_category( 'my-theme-headers', array(
        'label' => __( 'Headers', 'my-theme' ),
    ) );

    register_block_pattern_category( 'my-theme-footers', array(
        'label' => __( 'Footers', 'my-theme' ),
    ) );
}
add_action( 'init', 'my_theme_register_pattern_categories' );

/**
 * Register Block Styles
 */
function my_theme_register_block_styles() {
    // Button outline
    register_block_style( 'core/button', array(
        'name'  => 'outline',
        'label' => __( 'Outline', 'my-theme' ),
    ) );

    // Image rounded
    register_block_style( 'core/image', array(
        'name'  => 'rounded',
        'label' => __( 'Rounded', 'my-theme' ),
    ) );

    // Group box shadow
    register_block_style( 'core/group', array(
        'name'  => 'shadow',
        'label' => __( 'Shadow', 'my-theme' ),
    ) );
}
add_action( 'init', 'my_theme_register_block_styles' );

/**
 * Modify Block Type Args
 */
function my_theme_modify_block_args( $args, $block_type ) {
    // Exemple: Désactiver le support des couleurs custom pour les boutons
    if ( 'core/button' === $block_type ) {
        $args['supports']['color']['custom'] = false;
    }
    return $args;
}
add_filter( 'register_block_type_args', 'my_theme_modify_block_args', 10, 2 );
```

## CSS Custom Properties Générées

theme.json génère automatiquement des CSS custom properties :

```css
/* Couleurs */
--wp--preset--color--primary
--wp--preset--color--secondary
--wp--preset--color--background
--wp--preset--color--foreground

/* Typographie */
--wp--preset--font-size--small
--wp--preset--font-size--medium
--wp--preset--font-size--large
--wp--preset--font-family--system
--wp--preset--font-family--inter

/* Espacements */
--wp--preset--spacing--10
--wp--preset--spacing--20
--wp--preset--spacing--30

/* Ombres */
--wp--preset--shadow--small
--wp--preset--shadow--medium

/* Layout */
--wp--style--global--content-size
--wp--style--global--wide-size

/* Root padding */
--wp--style--root--padding-left
--wp--style--root--padding-right

/* Custom */
--wp--custom--line-height--tight
--wp--custom--transition--duration
```

## Child Theme pour Block Theme

### Structure

```
my-child-theme/
├── patterns/
│   └── custom-hero.php
├── styles/
│   └── custom-variation.json
├── templates/
│   └── page-custom.html        # Surcharge ou nouveau
├── parts/
│   └── header.html             # Surcharge le parent
├── functions.php
├── style.css
└── theme.json                  # Fusionne avec le parent
```

### style.css

```css
/*
Theme Name: My Child Theme
Template: my-parent-theme
Version: 1.0.0
Description: Child theme for My Theme
*/
```

### theme.json (fusion)

```json
{
    "$schema": "https://schemas.wp.org/trunk/theme.json",
    "version": 3,
    "settings": {
        "color": {
            "palette": [
                {
                    "slug": "primary",
                    "color": "#ff6600",
                    "name": "Primary"
                }
            ]
        }
    }
}
```

## Bonnes Pratiques

1. **Utiliser les presets** plutôt que des valeurs hardcodées
2. **Fluid typography** pour une typographie responsive
3. **useRootPaddingAwareAlignments** pour les alignements larges
4. **appearanceTools** pour activer tous les outils visuels
5. **Block styles** pour des variations réutilisables
6. **Désactiver les palettes par défaut** pour un design cohérent
7. **Documenter les CSS custom properties** pour les développeurs
