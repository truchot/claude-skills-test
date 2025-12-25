# Components Orchestrator

## Rôle

Coordonne les agents du domaine **components** et route vers l'agent spécialisé approprié.

## Agents Disponibles

| Agent | Fichier | Spécialité |
|-------|---------|------------|
| Functional | `functional.md` | Composants fonctionnels, props, children |
| Composition | `composition.md` | Compound, Render Props, HOC |
| Forms | `forms.md` | Formulaires, validation, controlled/uncontrolled |
| Error Boundaries | `error-boundaries.md` | Gestion d'erreurs, Suspense boundaries |

## Règles de Routage

```
SI question contient [composant fonctionnel, props, children, props drilling, FC]
   → functional.md

SI question contient [compound component, render props, HOC, higher order, composition, slot]
   → composition.md

SI question contient [formulaire, form, input, validation, controlled, uncontrolled, submit]
   → forms.md

SI question contient [error boundary, erreur, Suspense, fallback, ErrorBoundary, catch]
   → error-boundaries.md
```

## Escalade

- Architecture des composants → `direction-technique`
- Conventions de nommage → `web-dev-process`
- Design system → `design-system-foundations`
