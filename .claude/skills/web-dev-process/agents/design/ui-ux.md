---
name: ui-ux-orchestrator
description: Orchestrateur pour le design UI/UX et l'accessibilité
---

# Orchestrateur UI/UX

Ce module coordonne le design d'interface utilisateur, l'expérience utilisateur et l'accessibilité.

## Agents Spécialisés

| Agent | Responsabilité |
|-------|----------------|
| `ux-principles.md` | Lois de l'UX, hiérarchie visuelle, feedback |
| `responsive-design.md` | Mobile-first, breakpoints, patterns |
| `design-system.md` | Tokens, composants, Storybook |
| `accessibility.md` | WCAG, ARIA, navigation clavier |

## UI vs UX

```
┌─────────────────────────────────────────────────────────┐
│                         UX                               │
│   (Comment l'utilisateur RESSENT le produit)            │
│                                                          │
│   ┌───────────────────────────────────────────────────┐ │
│   │                      UI                            │ │
│   │   (Comment le produit APPARAÎT)                   │ │
│   │                                                    │ │
│   │   Couleurs, typographie, espacements, icônes      │ │
│   └───────────────────────────────────────────────────┘ │
│                                                          │
│   Utilisabilité, parcours, émotions, satisfaction       │
└─────────────────────────────────────────────────────────┘
```

## Performance Perçue

| Technique | Description | Impact |
|-----------|-------------|--------|
| **Skeleton screens** | Structure grise pendant le chargement | Réduit frustration |
| **Optimistic UI** | Afficher le résultat avant confirmation serveur | Sensation de rapidité |
| **Progressive loading** | Charger le contenu critique d'abord | First Paint rapide |
| **Lazy loading** | Charger les images hors-écran à la demande | Réduire la charge initiale |

## Outils Recommandés

| Catégorie | Outils |
|-----------|--------|
| **Design** | Figma, Sketch, Adobe XD |
| **Prototypage** | Figma, Framer, ProtoPie |
| **Accessibilité** | axe DevTools, WAVE, Lighthouse |
| **Contraste** | WebAIM Contrast Checker, Stark |
| **Design System** | Storybook, Chromatic |
| **User Testing** | Hotjar, FullStory, Maze |

## Checklist Globale

- [ ] Principes UX appliqués (Fitts, Hick, Jakob)
- [ ] Hiérarchie visuelle claire
- [ ] Feedback utilisateur immédiat
- [ ] Design responsive mobile-first
- [ ] Accessibilité WCAG AA
- [ ] Design system documenté
- [ ] Performance perçue optimisée

## Ressources

- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Laws of UX](https://lawsofux.com/)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Project](https://www.a11yproject.com/)
- [Refactoring UI](https://www.refactoringui.com/)

## Agents à Consulter

- Pour les principes UX → `ux-principles.md`
- Pour le responsive → `responsive-design.md`
- Pour le design system → `design-system.md`
- Pour l'accessibilité → `accessibility.md`
