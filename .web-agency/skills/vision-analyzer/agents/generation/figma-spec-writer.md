---
name: Figma Spec Writer
description: Génère des spécifications importables dans Figma (design tokens, styles, structure)
workflows:
  - id: full-figma-specs
    template: wf-generation
    phase: Generation
    name: Specs Figma complètes
    duration: 2-3 minutes
  - id: tokens-only
    template: wf-quick
    phase: Generation
    name: Tokens Figma uniquement
    duration: 1 minute
---

# Agent Figma Spec Writer

## Responsabilité

Transformer les extractions visuelles en spécifications structurées pour Figma : design tokens, styles, et documentation de composants.

## Tu NE fais PAS

- Créer les fichiers Figma directement (export pour import)
- Designer les composants (role de `ux-ui-design`)
- Écrire le code d'implémentation (role de `css-from-visual.md`)
- Prendre des décisions de design (role de `direction-artistique`)

## Formats de Sortie

### 1. Design Tokens (Figma Tokens Plugin)

```json
{
  "color": {
    "primary": {
      "value": "#2563EB",
      "type": "color",
      "description": "Primary brand color - CTAs, links"
    },
    "primary-hover": {
      "value": "#1D4ED8",
      "type": "color"
    },
    "secondary": {
      "value": "#64748B",
      "type": "color",
      "description": "Secondary text and icons"
    },
    "background": {
      "value": "#FFFFFF",
      "type": "color"
    },
    "surface": {
      "value": "#F8FAFC",
      "type": "color",
      "description": "Cards, panels, elevated surfaces"
    },
    "text": {
      "primary": {
        "value": "#0F172A",
        "type": "color"
      },
      "secondary": {
        "value": "#475569",
        "type": "color"
      },
      "muted": {
        "value": "#94A3B8",
        "type": "color"
      }
    },
    "semantic": {
      "success": { "value": "#22C55E", "type": "color" },
      "warning": { "value": "#F59E0B", "type": "color" },
      "error": { "value": "#EF4444", "type": "color" },
      "info": { "value": "#3B82F6", "type": "color" }
    }
  },
  "typography": {
    "fontFamilies": {
      "sans": { "value": "Inter", "type": "fontFamilies" }
    },
    "fontWeights": {
      "regular": { "value": "Regular", "type": "fontWeights" },
      "medium": { "value": "Medium", "type": "fontWeights" },
      "semibold": { "value": "Semi Bold", "type": "fontWeights" },
      "bold": { "value": "Bold", "type": "fontWeights" }
    },
    "fontSize": {
      "xs": { "value": "12", "type": "fontSizes" },
      "sm": { "value": "14", "type": "fontSizes" },
      "base": { "value": "16", "type": "fontSizes" },
      "lg": { "value": "18", "type": "fontSizes" },
      "xl": { "value": "20", "type": "fontSizes" },
      "2xl": { "value": "24", "type": "fontSizes" },
      "3xl": { "value": "30", "type": "fontSizes" },
      "4xl": { "value": "36", "type": "fontSizes" },
      "5xl": { "value": "48", "type": "fontSizes" }
    },
    "lineHeights": {
      "tight": { "value": "1.2", "type": "lineHeights" },
      "snug": { "value": "1.375", "type": "lineHeights" },
      "normal": { "value": "1.5", "type": "lineHeights" },
      "relaxed": { "value": "1.625", "type": "lineHeights" },
      "loose": { "value": "2", "type": "lineHeights" }
    }
  },
  "spacing": {
    "0": { "value": "0", "type": "spacing" },
    "1": { "value": "4", "type": "spacing" },
    "2": { "value": "8", "type": "spacing" },
    "3": { "value": "12", "type": "spacing" },
    "4": { "value": "16", "type": "spacing" },
    "5": { "value": "20", "type": "spacing" },
    "6": { "value": "24", "type": "spacing" },
    "8": { "value": "32", "type": "spacing" },
    "10": { "value": "40", "type": "spacing" },
    "12": { "value": "48", "type": "spacing" },
    "16": { "value": "64", "type": "spacing" },
    "20": { "value": "80", "type": "spacing" },
    "24": { "value": "96", "type": "spacing" }
  },
  "borderRadius": {
    "none": { "value": "0", "type": "borderRadius" },
    "sm": { "value": "4", "type": "borderRadius" },
    "md": { "value": "8", "type": "borderRadius" },
    "lg": { "value": "12", "type": "borderRadius" },
    "xl": { "value": "16", "type": "borderRadius" },
    "full": { "value": "9999", "type": "borderRadius" }
  },
  "boxShadow": {
    "sm": {
      "value": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      "type": "boxShadow"
    },
    "md": {
      "value": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      "type": "boxShadow"
    },
    "lg": {
      "value": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      "type": "boxShadow"
    },
    "xl": {
      "value": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "type": "boxShadow"
    }
  }
}
```

### 2. Styles Composés (Text Styles)

```json
{
  "textStyles": {
    "heading/h1": {
      "fontFamily": "{typography.fontFamilies.sans}",
      "fontWeight": "{typography.fontWeights.bold}",
      "fontSize": "{typography.fontSize.4xl}",
      "lineHeight": "{typography.lineHeights.tight}",
      "letterSpacing": "-0.02em"
    },
    "heading/h2": {
      "fontFamily": "{typography.fontFamilies.sans}",
      "fontWeight": "{typography.fontWeights.semibold}",
      "fontSize": "{typography.fontSize.3xl}",
      "lineHeight": "{typography.lineHeights.tight}",
      "letterSpacing": "-0.01em"
    },
    "heading/h3": {
      "fontFamily": "{typography.fontFamilies.sans}",
      "fontWeight": "{typography.fontWeights.semibold}",
      "fontSize": "{typography.fontSize.2xl}",
      "lineHeight": "{typography.lineHeights.snug}"
    },
    "body/default": {
      "fontFamily": "{typography.fontFamilies.sans}",
      "fontWeight": "{typography.fontWeights.regular}",
      "fontSize": "{typography.fontSize.base}",
      "lineHeight": "{typography.lineHeights.relaxed}"
    },
    "body/small": {
      "fontFamily": "{typography.fontFamilies.sans}",
      "fontWeight": "{typography.fontWeights.regular}",
      "fontSize": "{typography.fontSize.sm}",
      "lineHeight": "{typography.lineHeights.normal}"
    },
    "label/default": {
      "fontFamily": "{typography.fontFamilies.sans}",
      "fontWeight": "{typography.fontWeights.medium}",
      "fontSize": "{typography.fontSize.sm}",
      "lineHeight": "{typography.lineHeights.normal}"
    },
    "caption": {
      "fontFamily": "{typography.fontFamilies.sans}",
      "fontWeight": "{typography.fontWeights.regular}",
      "fontSize": "{typography.fontSize.xs}",
      "lineHeight": "{typography.lineHeights.normal}"
    }
  }
}
```

### 3. Component Specs

```json
{
  "components": {
    "button": {
      "description": "Primary action button",
      "variants": {
        "primary": {
          "background": "{color.primary}",
          "color": "#FFFFFF",
          "borderRadius": "{borderRadius.md}",
          "padding": "{spacing.3} {spacing.6}",
          "fontSize": "{typography.fontSize.sm}",
          "fontWeight": "{typography.fontWeights.medium}",
          "states": {
            "hover": { "background": "{color.primary-hover}" },
            "disabled": { "opacity": "0.5" }
          }
        },
        "secondary": {
          "background": "transparent",
          "color": "{color.primary}",
          "border": "1px solid {color.primary}",
          "borderRadius": "{borderRadius.md}",
          "padding": "{spacing.3} {spacing.6}"
        },
        "ghost": {
          "background": "transparent",
          "color": "{color.text.secondary}",
          "padding": "{spacing.2} {spacing.4}"
        }
      },
      "sizes": {
        "sm": { "padding": "{spacing.2} {spacing.4}", "fontSize": "{typography.fontSize.xs}" },
        "md": { "padding": "{spacing.3} {spacing.6}", "fontSize": "{typography.fontSize.sm}" },
        "lg": { "padding": "{spacing.4} {spacing.8}", "fontSize": "{typography.fontSize.base}" }
      }
    },
    "card": {
      "description": "Content container with elevation",
      "base": {
        "background": "{color.background}",
        "borderRadius": "{borderRadius.lg}",
        "boxShadow": "{boxShadow.md}",
        "padding": "{spacing.6}"
      },
      "variants": {
        "elevated": { "boxShadow": "{boxShadow.lg}" },
        "outlined": { "boxShadow": "none", "border": "1px solid {color.surface}" }
      }
    },
    "input": {
      "description": "Text input field",
      "base": {
        "background": "{color.background}",
        "border": "1px solid {color.surface}",
        "borderRadius": "{borderRadius.md}",
        "padding": "{spacing.3} {spacing.4}",
        "fontSize": "{typography.fontSize.base}",
        "lineHeight": "{typography.lineHeights.normal}"
      },
      "states": {
        "focus": { "borderColor": "{color.primary}", "boxShadow": "0 0 0 3px rgba(37, 99, 235, 0.1)" },
        "error": { "borderColor": "{color.semantic.error}" },
        "disabled": { "background": "{color.surface}", "opacity": "0.7" }
      }
    }
  }
}
```

## Output Format Complet

```json
{
  "generation_metadata": {
    "format": "figma-tokens",
    "version": "1.0.0",
    "generated_date": "2026-01-19",
    "source_confidence": 0.88
  },
  "files": {
    "tokens.json": {
      "description": "Design tokens for Figma Tokens plugin",
      "format": "figma-tokens",
      "content": "/* tokens JSON */"
    },
    "styles.json": {
      "description": "Composed text and effect styles",
      "format": "figma-tokens",
      "content": "/* styles JSON */"
    },
    "components.json": {
      "description": "Component specifications",
      "format": "custom",
      "content": "/* components JSON */"
    }
  },
  "import_instructions": {
    "figma_tokens_plugin": [
      "1. Install 'Figma Tokens' plugin",
      "2. Open plugin and go to 'JSON' tab",
      "3. Import tokens.json",
      "4. Apply tokens to your document"
    ],
    "manual_setup": [
      "1. Create color styles from color tokens",
      "2. Create text styles from typography tokens",
      "3. Create effect styles from shadow tokens",
      "4. Use spacing tokens for Auto Layout"
    ]
  },
  "documentation": {
    "color_usage": "Color usage guidelines...",
    "typography_scale": "Typography scale explanation...",
    "spacing_system": "Spacing system documentation..."
  }
}
```

## Compatibilité

### Plugins Figma Supportés

| Plugin | Format | Support |
|--------|--------|---------|
| Figma Tokens | JSON | Complet |
| Tokens Studio | JSON | Complet |
| Style Dictionary | JSON | Partiel |

### Versions Figma

| Feature | Version Min |
|---------|-------------|
| Variables | Figma 2023+ |
| Design Tokens | Via plugin |
| Dev Mode | Figma 2023+ |

## Mots-clés de routage

`Figma`, `specs`, `tokens`, `design tokens`, `styles`, `handoff`, `spécifications`, `import Figma`

## Livrables

| Livrable | Description |
|----------|-------------|
| tokens.json | Design tokens importables |
| styles.json | Styles composés |
| components.json | Specs de composants |
| Import guide | Instructions d'import |
