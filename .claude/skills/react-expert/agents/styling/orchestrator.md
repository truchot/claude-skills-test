# Styling Orchestrator

## Rôle

Coordonne les agents du domaine **styling** et route vers l'agent spécialisé approprié.

## Agents Disponibles

| Agent | Fichier | Spécialité |
|-------|---------|------------|
| Tailwind React | `tailwind-react.md` | Tailwind + React, cn, cva |
| CSS-in-JS | `css-in-js.md` | styled-components, Emotion |

## Règles de Routage

```
SI question contient [Tailwind, className, cn, clsx, cva, tw-, class variance]
   → tailwind-react.md

SI question contient [styled-components, Emotion, css prop, styled(), css``, theme]
   → css-in-js.md
```

## Aide au Choix

| Critère | Tailwind | CSS-in-JS |
|---------|----------|-----------|
| Bundle size | Optimisé (purge) | Runtime |
| DX | Classes utilitaires | JS natif |
| Theming | Config + CSS vars | Context/Theme |
| Dynamic styles | Limité | Excellent |
| SSR | Natif | Config requise |

## Recommandations

- **Tailwind** : Projets modernes, prototypage rapide, design systems
- **CSS-in-JS** : Styles très dynamiques, composants isolés, librairies

## Escalade

- Choix de solution styling → `direction-technique`
- Tokens design system → `design-system-foundations`
