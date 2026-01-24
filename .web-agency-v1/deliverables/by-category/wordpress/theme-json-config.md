---
id: theme-json-config
name: Configuration theme.json
version: 1.0.0
category: wordpress
status: active
phase: "3-conception"
order: 1
agents:
  - wordpress-gutenberg-expert/theme-development/theme-json
  - wordpress-gutenberg-expert/theme-development/block-themes
  - design-system-foundations/foundations/colors
  - design-system-foundations/foundations/typography
  - design-system-foundations/foundations/spacing
consumes:
  - design-tokens
  - wireframes
  - brand-guidelines
produces_for:
  - wordpress-gutenberg-expert/gutenberg-blocks/block-development
  - wordpress-gutenberg-expert/theme-development/style-variations
  - frontend-developer/styling/css-moderne
workflows:
  - id: wf-theme-setup
    template: wf-creation
    phase: Conception
    name: Configuration thème WordPress
    duration: 1-2 jours
tags: [wordpress, theme, gutenberg, design-tokens, configuration, fse]
---

# Configuration theme.json

## Description

Fichier central de configuration d'un thème WordPress Full Site Editing (FSE). Définit les presets de design (couleurs, typographie, spacing), les styles globaux et par bloc, ainsi que les fonctionnalités activées. C'est la traduction des design tokens en configuration WordPress.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Fichier JSON |
| **Emplacement** | `wp-content/themes/[theme-name]/theme.json` |
| **Nommage** | `theme.json` |
| **Encoding** | UTF-8 |
| **Schema** | `https://schemas.wp.org/wp/6.5/theme.json` |

## Structure du Contenu

### Sections Obligatoires

- [ ] **$schema** - Référence au schéma JSON WordPress
- [ ] **version** - Version du format (actuellement 3)
- [ ] **settings** - Presets et fonctionnalités activées
- [ ] **styles** - Styles globaux et par bloc

### Sections Optionnelles

- [ ] **customTemplates** - Templates personnalisés
- [ ] **templateParts** - Parties de templates
- [ ] **patterns** - Patterns bundled avec le thème

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Schema valide | Pas d'erreur JSON | Auto (lint) | Oui |
| 2 | Cohérence design tokens | Correspond au Figma | Manuel | Oui |
| 3 | Accessibilité | Contrastes WCAG AA | Auto | Oui |
| 4 | Presets complets | Couleurs, typo, spacing | Manuel | Oui |
| 5 | Responsive | Fluid typography/spacing | Manuel | Non |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `design-system-foundations/*` | `design-tokens` | Variables de design |
| `ux-ui-design/*` | `wireframes` | Structure des pages |
| `direction-artistique/*` | `brand-guidelines` | Charte graphique |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Presets | Designer | Ajuster valeurs |
| 2 | Rendu éditeur | Intégrateur | Corriger styles |
| 3 | Rendu front | QA | Débugger |

## Exemple

### Exemple Complet - E-commerce Artisanat

```json
{
  "$schema": "https://schemas.wp.org/wp/6.5/theme.json",
  "version": 3,
  "settings": {
    "appearanceTools": true,
    "useRootPaddingAwareAlignments": true,

    "color": {
      "custom": false,
      "customDuotone": false,
      "customGradient": false,
      "defaultDuotone": false,
      "defaultGradients": false,
      "defaultPalette": false,
      "palette": [
        {
          "slug": "primary",
          "name": "Primary (Amber)",
          "color": "#F59E0B"
        },
        {
          "slug": "primary-hover",
          "name": "Primary Hover",
          "color": "#D97706"
        },
        {
          "slug": "secondary",
          "name": "Secondary (Brown)",
          "color": "#78350F"
        },
        {
          "slug": "background",
          "name": "Background",
          "color": "#FFFBEB"
        },
        {
          "slug": "surface",
          "name": "Surface",
          "color": "#FFFFFF"
        },
        {
          "slug": "text-primary",
          "name": "Text Primary",
          "color": "#1C1917"
        },
        {
          "slug": "text-secondary",
          "name": "Text Secondary",
          "color": "#57534E"
        },
        {
          "slug": "text-muted",
          "name": "Text Muted",
          "color": "#A8A29E"
        },
        {
          "slug": "border",
          "name": "Border",
          "color": "#E7E5E4"
        },
        {
          "slug": "success",
          "name": "Success",
          "color": "#10B981"
        },
        {
          "slug": "warning",
          "name": "Warning",
          "color": "#F59E0B"
        },
        {
          "slug": "error",
          "name": "Error",
          "color": "#EF4444"
        }
      ]
    },

    "typography": {
      "customFontSize": false,
      "defaultFontSizes": false,
      "fluid": true,
      "fontFamilies": [
        {
          "slug": "heading",
          "name": "Heading",
          "fontFamily": "'Playfair Display', Georgia, serif",
          "fontFace": [
            {
              "fontFamily": "Playfair Display",
              "fontWeight": "400 700",
              "fontStyle": "normal",
              "fontStretch": "normal",
              "src": ["file:./assets/fonts/playfair-display-variable.woff2"]
            }
          ]
        },
        {
          "slug": "body",
          "name": "Body",
          "fontFamily": "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          "fontFace": [
            {
              "fontFamily": "Inter",
              "fontWeight": "400 700",
              "fontStyle": "normal",
              "fontStretch": "normal",
              "src": ["file:./assets/fonts/inter-variable.woff2"]
            }
          ]
        },
        {
          "slug": "mono",
          "name": "Monospace",
          "fontFamily": "'JetBrains Mono', 'Fira Code', monospace"
        }
      ],
      "fontSizes": [
        {
          "slug": "xs",
          "name": "Extra Small",
          "size": "0.75rem",
          "fluid": false
        },
        {
          "slug": "sm",
          "name": "Small",
          "size": "0.875rem",
          "fluid": false
        },
        {
          "slug": "base",
          "name": "Base",
          "size": "1rem",
          "fluid": {
            "min": "1rem",
            "max": "1.125rem"
          }
        },
        {
          "slug": "lg",
          "name": "Large",
          "size": "1.125rem",
          "fluid": {
            "min": "1.125rem",
            "max": "1.25rem"
          }
        },
        {
          "slug": "xl",
          "name": "Extra Large",
          "size": "1.25rem",
          "fluid": {
            "min": "1.25rem",
            "max": "1.5rem"
          }
        },
        {
          "slug": "2xl",
          "name": "2XL",
          "size": "1.5rem",
          "fluid": {
            "min": "1.5rem",
            "max": "1.875rem"
          }
        },
        {
          "slug": "3xl",
          "name": "3XL",
          "size": "1.875rem",
          "fluid": {
            "min": "1.875rem",
            "max": "2.25rem"
          }
        },
        {
          "slug": "4xl",
          "name": "4XL",
          "size": "2.25rem",
          "fluid": {
            "min": "2.25rem",
            "max": "3rem"
          }
        },
        {
          "slug": "5xl",
          "name": "5XL",
          "size": "3rem",
          "fluid": {
            "min": "3rem",
            "max": "3.75rem"
          }
        }
      ]
    },

    "spacing": {
      "customSpacingSize": false,
      "defaultSpacingSizes": false,
      "spacingScale": {
        "steps": 0
      },
      "spacingSizes": [
        { "slug": "0", "name": "0", "size": "0" },
        { "slug": "1", "name": "1 (4px)", "size": "0.25rem" },
        { "slug": "2", "name": "2 (8px)", "size": "0.5rem" },
        { "slug": "3", "name": "3 (12px)", "size": "0.75rem" },
        { "slug": "4", "name": "4 (16px)", "size": "1rem" },
        { "slug": "5", "name": "5 (20px)", "size": "1.25rem" },
        { "slug": "6", "name": "6 (24px)", "size": "1.5rem" },
        { "slug": "8", "name": "8 (32px)", "size": "2rem" },
        { "slug": "10", "name": "10 (40px)", "size": "2.5rem" },
        { "slug": "12", "name": "12 (48px)", "size": "3rem" },
        { "slug": "16", "name": "16 (64px)", "size": "4rem" },
        { "slug": "20", "name": "20 (80px)", "size": "5rem" },
        { "slug": "24", "name": "24 (96px)", "size": "6rem" }
      ],
      "units": ["px", "rem", "%", "vw", "vh"]
    },

    "layout": {
      "contentSize": "800px",
      "wideSize": "1200px"
    },

    "border": {
      "color": true,
      "radius": true,
      "style": true,
      "width": true
    },

    "shadow": {
      "defaultPresets": false,
      "presets": [
        {
          "slug": "sm",
          "name": "Small",
          "shadow": "0 1px 2px 0 rgb(0 0 0 / 0.05)"
        },
        {
          "slug": "md",
          "name": "Medium",
          "shadow": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
        },
        {
          "slug": "lg",
          "name": "Large",
          "shadow": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
        },
        {
          "slug": "xl",
          "name": "Extra Large",
          "shadow": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
        }
      ]
    },

    "blocks": {
      "core/button": {
        "color": {
          "custom": false
        },
        "border": {
          "radius": true
        }
      },
      "core/navigation": {
        "typography": {
          "fontSizes": true
        }
      },
      "woocommerce/product-price": {
        "color": {
          "text": true,
          "background": false
        }
      }
    }
  },

  "styles": {
    "color": {
      "background": "var(--wp--preset--color--background)",
      "text": "var(--wp--preset--color--text-primary)"
    },
    "typography": {
      "fontFamily": "var(--wp--preset--font-family--body)",
      "fontSize": "var(--wp--preset--font-size--base)",
      "lineHeight": "1.6"
    },
    "spacing": {
      "blockGap": "var(--wp--preset--spacing--6)",
      "padding": {
        "left": "var(--wp--preset--spacing--4)",
        "right": "var(--wp--preset--spacing--4)"
      }
    },

    "elements": {
      "heading": {
        "typography": {
          "fontFamily": "var(--wp--preset--font-family--heading)",
          "fontWeight": "600",
          "lineHeight": "1.2"
        },
        "color": {
          "text": "var(--wp--preset--color--secondary)"
        }
      },
      "h1": {
        "typography": {
          "fontSize": "var(--wp--preset--font-size--5xl)"
        }
      },
      "h2": {
        "typography": {
          "fontSize": "var(--wp--preset--font-size--4xl)"
        }
      },
      "h3": {
        "typography": {
          "fontSize": "var(--wp--preset--font-size--3xl)"
        }
      },
      "h4": {
        "typography": {
          "fontSize": "var(--wp--preset--font-size--2xl)"
        }
      },
      "h5": {
        "typography": {
          "fontSize": "var(--wp--preset--font-size--xl)"
        }
      },
      "h6": {
        "typography": {
          "fontSize": "var(--wp--preset--font-size--lg)"
        }
      },
      "link": {
        "color": {
          "text": "var(--wp--preset--color--primary)"
        },
        ":hover": {
          "color": {
            "text": "var(--wp--preset--color--primary-hover)"
          }
        },
        ":focus": {
          "outline": {
            "offset": "2px",
            "style": "solid",
            "width": "2px"
          }
        }
      },
      "button": {
        "color": {
          "background": "var(--wp--preset--color--primary)",
          "text": "var(--wp--preset--color--surface)"
        },
        "typography": {
          "fontWeight": "600"
        },
        "border": {
          "radius": "0.5rem"
        },
        ":hover": {
          "color": {
            "background": "var(--wp--preset--color--primary-hover)"
          }
        },
        ":focus": {
          "outline": {
            "offset": "2px",
            "style": "solid",
            "width": "2px"
          }
        }
      },
      "caption": {
        "typography": {
          "fontSize": "var(--wp--preset--font-size--sm)"
        },
        "color": {
          "text": "var(--wp--preset--color--text-secondary)"
        }
      }
    },

    "blocks": {
      "core/site-title": {
        "typography": {
          "fontFamily": "var(--wp--preset--font-family--heading)",
          "fontSize": "var(--wp--preset--font-size--2xl)",
          "fontWeight": "700"
        },
        "elements": {
          "link": {
            "color": {
              "text": "var(--wp--preset--color--secondary)"
            },
            ":hover": {
              "color": {
                "text": "var(--wp--preset--color--primary)"
              }
            }
          }
        }
      },
      "core/navigation": {
        "typography": {
          "fontWeight": "500"
        },
        "elements": {
          "link": {
            ":hover": {
              "typography": {
                "textDecoration": "none"
              },
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
              "text": "var(--wp--preset--color--secondary)"
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
            "style": "solid",
            "width": "4px"
          }
        },
        "spacing": {
          "padding": {
            "left": "var(--wp--preset--spacing--6)"
          }
        },
        "typography": {
          "fontStyle": "italic"
        }
      },
      "core/code": {
        "color": {
          "background": "var(--wp--preset--color--surface)",
          "text": "var(--wp--preset--color--secondary)"
        },
        "typography": {
          "fontFamily": "var(--wp--preset--font-family--mono)",
          "fontSize": "var(--wp--preset--font-size--sm)"
        },
        "border": {
          "radius": "0.25rem"
        },
        "spacing": {
          "padding": "var(--wp--preset--spacing--4)"
        }
      },
      "core/separator": {
        "color": {
          "background": "var(--wp--preset--color--border)"
        },
        "border": {
          "width": "0"
        }
      },
      "woocommerce/product-price": {
        "typography": {
          "fontWeight": "700",
          "fontSize": "var(--wp--preset--font-size--xl)"
        },
        "color": {
          "text": "var(--wp--preset--color--secondary)"
        }
      },
      "woocommerce/add-to-cart-form": {
        "elements": {
          "button": {
            "color": {
              "background": "var(--wp--preset--color--primary)",
              "text": "var(--wp--preset--color--surface)"
            }
          }
        }
      }
    }
  },

  "customTemplates": [
    {
      "name": "page-no-title",
      "title": "Page sans titre",
      "postTypes": ["page"]
    },
    {
      "name": "page-full-width",
      "title": "Page pleine largeur",
      "postTypes": ["page"]
    },
    {
      "name": "single-product-featured",
      "title": "Produit mis en avant",
      "postTypes": ["product"]
    }
  ],

  "templateParts": [
    {
      "name": "header",
      "title": "Header",
      "area": "header"
    },
    {
      "name": "header-minimal",
      "title": "Header Minimal",
      "area": "header"
    },
    {
      "name": "footer",
      "title": "Footer",
      "area": "footer"
    },
    {
      "name": "sidebar",
      "title": "Sidebar",
      "area": "uncategorized"
    }
  ],

  "patterns": [
    "hero-artisanat",
    "product-grid-featured",
    "testimonials-carousel",
    "newsletter-signup",
    "faq-accordion"
  ]
}
```

---

### Structure des Fichiers Thème

```
wp-content/themes/artisanat-theme/
├── theme.json                    # 👈 Ce livrable
├── style.css                     # Métadonnées thème
├── functions.php                 # Setup & hooks
├── assets/
│   └── fonts/
│       ├── playfair-display-variable.woff2
│       └── inter-variable.woff2
├── templates/                    # FSE Templates
│   ├── index.html
│   ├── single.html
│   ├── page.html
│   ├── archive.html
│   ├── search.html
│   ├── 404.html
│   └── single-product.html       # WooCommerce
├── parts/                        # Template Parts
│   ├── header.html
│   ├── header-minimal.html
│   ├── footer.html
│   └── sidebar.html
├── patterns/                     # Block Patterns
│   ├── hero-artisanat.php
│   ├── product-grid-featured.php
│   └── ...
└── styles/                       # Style Variations
    └── dark.json
```

---

### Correspondance Design Tokens → theme.json

| Design Token (Figma/JSON) | theme.json Path |
|---------------------------|-----------------|
| `colors.primary` | `settings.color.palette[slug=primary]` |
| `typography.fontFamily.heading` | `settings.typography.fontFamilies[slug=heading]` |
| `typography.fontSize.base` | `settings.typography.fontSizes[slug=base]` |
| `spacing.4` | `settings.spacing.spacingSizes[slug=4]` |
| `shadows.md` | `settings.shadow.presets[slug=md]` |

---

### CSS Variables Générées

WordPress génère automatiquement ces variables CSS :

```css
:root {
  /* Colors */
  --wp--preset--color--primary: #F59E0B;
  --wp--preset--color--secondary: #78350F;
  --wp--preset--color--background: #FFFBEB;

  /* Typography */
  --wp--preset--font-family--heading: 'Playfair Display', Georgia, serif;
  --wp--preset--font-family--body: 'Inter', -apple-system, sans-serif;
  --wp--preset--font-size--base: 1rem;
  --wp--preset--font-size--xl: 1.25rem;

  /* Spacing */
  --wp--preset--spacing--4: 1rem;
  --wp--preset--spacing--6: 1.5rem;

  /* Shadows */
  --wp--preset--shadow--md: 0 4px 6px -1px rgb(0 0 0 / 0.1);

  /* Layout */
  --wp--style--global--content-size: 800px;
  --wp--style--global--wide-size: 1200px;
}
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Palette par défaut | Incohérence avec brand | `defaultPalette: false` |
| Tailles custom | Chaos de valeurs | Désactiver custom sizes |
| Pas de fluid | Non responsive | Activer fluid typography |
| Oublier WooCommerce | Styles incohérents | Styliser les blocs Woo |
| Pas de variations | Pas de dark mode | Créer `styles/dark.json` |

## Références

- [WordPress theme.json Documentation](https://developer.wordpress.org/themes/global-settings-and-styles/)
- [theme.json Schema](https://schemas.wp.org/)
- [Full Site Editing](https://fullsiteediting.com/)
- Livrables liés : `design-tokens`, `gutenberg-block`, `block-pattern`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | wordpress-gutenberg-expert | Création initiale |
