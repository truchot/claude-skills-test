# Changelog

Toutes les modifications notables de ce skill sont documentées ici.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

## [1.0.0] - 2025-12-21

### Added

#### Orchestrateur Principal
- SKILL.md avec architecture Atomic Design complète
- Routing intelligent par niveau (Foundations, Atoms, Molecules, Templates)
- Philosophie et principes fondamentaux documentés

#### Foundations (4 agents)
- `colors.md` - Système de couleurs avec palettes 50-900, tokens sémantiques, contraste WCAG, dark mode
- `typography.md` - Échelle modulaire 1.25, fluid typography, font loading optimisé
- `spacing.md` - Système 8pt, tokens sémantiques (inset, stack, inline), grid system
- `shadows.md` - Niveaux d'élévation, z-index scale, focus rings, dark mode shadows

#### Atoms (5 agents)
- `buttons.md` - 5 variants, 5 tailles, états, icon support, loading state
- `inputs.md` - Text, select, checkbox, radio, toggle, validation states
- `labels.md` - Form labels, tags (solid/soft/outline), chips interactifs
- `icons.md` - Système de tailles, styles (outline/solid), icon registry
- `badges.md` - Status, count, dot indicators, notification badges

#### Molecules (5 agents)
- `forms.md` - FormField, FormGroup, validation patterns, multi-step wizard
- `cards.md` - Base card, product card, user card, stats card
- `navigation.md` - Navbar, sidebar, tabs, breadcrumbs, pagination
- `modals.md` - Dialog, sheet/drawer, popover, alert dialog, focus trap
- `alerts.md` - Inline alert, banner, toast system, snackbar

#### Templates (3 agents)
- `hero-sections.md` - Hero variants, features grid, testimonials, stats, CTA
- `layouts.md` - Dashboard, marketing, auth, docs, settings layouts
- `pages.md` - List, detail, article, error (404/500), empty state, loading

#### Documentation
- `docs/getting-started.md` - Guide de démarrage rapide
- `docs/naming-conventions.md` - Conventions BEM, tokens, composants
- `references/resources.md` - Liens vers outils et design systems publics

### Technical
- Architecture hiérarchique avec orchestrateurs par niveau
- 20 agents spécialisés au total
- CSS + React/TypeScript pour chaque composant
- Checklists d'accessibilité intégrées
- Exemples Storybook inclus
