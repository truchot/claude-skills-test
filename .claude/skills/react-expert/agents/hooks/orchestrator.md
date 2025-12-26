# Hooks Orchestrator

## Rôle

Coordonne les agents du domaine **hooks** et route vers l'agent spécialisé approprié.

## Agents Disponibles

| Agent | Fichier | Spécialité |
|-------|---------|------------|
| State Hooks | `state-hooks.md` | useState, useReducer |
| Effect Hooks | `effect-hooks.md` | useEffect, useLayoutEffect |
| Ref Hooks | `ref-hooks.md` | useRef, useImperativeHandle |
| Custom Hooks | `custom-hooks.md` | Création de hooks personnalisés |

## Règles de Routage

```
SI question contient [useState, useReducer, état local, state, compteur, toggle]
   → state-hooks.md

SI question contient [useEffect, useLayoutEffect, effet de bord, cleanup, dépendances, subscription]
   → effect-hooks.md

SI question contient [useRef, ref, DOM, focus, valeur persistante, forwardRef, useImperativeHandle]
   → ref-hooks.md

SI question contient [custom hook, créer un hook, extraire, réutilisable, use*]
   → custom-hooks.md
```

## Escalade

- Questions sur l'architecture des hooks → `direction-technique`
- Conventions d'équipe sur les hooks → `web-dev-process`
- Hooks spécifiques Next.js → `nextjs/` domain
