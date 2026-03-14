---
paths:
  - "**/*.tsx"
  - "**/*.jsx"
---

# Conventions React
- Composants fonctionnels uniquement (pas de classes)
- Hooks custom dans des fichiers séparés, préfixés `use`
- Props typées avec interface (pas type alias)
- Éviter les inline styles, préférer CSS Modules ou Tailwind
- useEffect : toujours spécifier le tableau de dépendances
- Pas de logique métier dans les composants — extraire dans des hooks
- Mémoisation (memo, useMemo, useCallback) uniquement si mesurée nécessaire
