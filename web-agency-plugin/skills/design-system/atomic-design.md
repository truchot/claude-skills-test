# Atomic Design - Design System

## Pyramide Atomic Design

```
     Templates (Pages)          <- Assemblage de molecules
    Molecules (Composants)      <- Assemblage d'atomes
   Atoms (Elements de base)     <- Plus petits elements indivisibles
  Foundations (Primitives)      <- Design Tokens (couleurs, typo, etc.)
```

## Foundations (agents/foundations/)

### Colors
- Primitives: echelle 50-900 par couleur (blue, gray, green, red, yellow)
- Semantiques: primary, secondary, success, warning, error, background, foreground
- Component tokens: button-primary-bg -> primary -> blue-600
- Contraste WCAG AA: 4.5:1 texte normal, 3:1 grand texte

### Typography
- Familles: sans-serif (UI), serif (contenu), mono (code)
- Echelle modulaire: xs(12), sm(14), base(16), lg(18), xl(20), 2xl(24), 3xl(30), 4xl(36)
- Line-height: tight(1.25), normal(1.5), relaxed(1.75)
- Fluid typography: `clamp(1rem, 2.5vw, 1.5rem)`

### Spacing
- Echelle 4pt: 1(4px), 2(8px), 3(12px), 4(16px), 5(20px), 6(24px), 8(32px), 10(40px)
- Usage: padding, margin, gap
- Grid gutter: 16px mobile, 24px tablet, 32px desktop

### Shadows
- Niveaux d'elevation: sm, md, lg, xl
- Usage semantique: cards(sm), dropdowns(md), modals(lg), popovers(xl)

## Atoms (agents/atoms/)

### Buttons
| Variant | Usage |
|---------|-------|
| primary | CTA, action principale |
| secondary | Action secondaire |
| ghost | Action tertiaire, liens |
| destructive | Actions dangereuses |
| outline | Alternative au secondary |

Tailles: xs(24px), sm(32px), md(40px default), lg(48px), xl(56px)
Etats: default, hover, focus, active, disabled, loading

### Inputs
- Types: text, password, email, textarea, select, checkbox, radio, toggle
- Etats: default, focus, error, disabled, readonly
- Labels obligatoires (accessibilite)

### Icons, Badges, Labels
- Icons: tailles 16/20/24/32, stroke width coherent
- Badges: status indicators, notification dots, counters
- Labels: form labels, tags filtres, chips selection

## Molecules (agents/molecules/)

| Molecule | Composition |
|----------|-------------|
| Forms | Inputs + Labels + Buttons + validation |
| Cards | Container + Image + Title + Content + Actions |
| Navigation | Links + Icons + Badge counters |
| Modals | Overlay + Card + Actions + focus trap |
| Alerts | Icon + Message + Actions + dismiss |

## Templates (agents/templates/)
- Hero sections: header visuels, CTAs, temoignages
- Layouts: dashboard (sidebar), split view, stacked
- Pages: landing, listing, detail, error, empty state
