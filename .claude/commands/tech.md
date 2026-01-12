# /tech - Commande Technique Intelligente

## Rôle
Point d'entrée technique unifié qui route vers le bon agent en fonction du contexte.

## Comportement
1. **Analyse le contexte** de la demande utilisateur
2. **Identifie le niveau** approprié (stratégie → opérations → implémentation)
3. **Descend les niveaux** si des informations manquent
4. **Route vers l'agent** le plus pertinent

## Hiérarchie Technique

### Niveau 2 - Stratégie (POURQUOI)
Référence: `.web-agency/skills/direction-technique/`
- Architecture globale, décisions structurantes
- Vision technique long terme
- Standards et gouvernance

### Niveau 3 - Opérations (QUOI)
Références:
- `.web-agency/skills/lead-dev/` - Coordination développement
- `.web-agency/skills/devops/` - Infrastructure et déploiement
- `.web-agency/skills/testing-process/` - Stratégie de tests

### Niveau 4 - Implémentation (COMMENT)
Références:
- `.web-agency/skills/frontend-developer/` - UI/composants
- `.web-agency/skills/backend-developer/` - API/services
- `.web-agency/skills/react-expert/` - React spécifique
- `.web-agency/skills/nextjs-expert/` - Next.js spécifique
- `.web-agency/skills/wordpress-gutenberg-expert/` - WordPress/Gutenberg

## Logique de Routage

```
SI demande concerne architecture/vision/standards
  → direction-technique (Niveau 2)

SI demande concerne coordination/planning/review
  → lead-dev (Niveau 3)

SI demande concerne infrastructure/CI-CD/déploiement
  → devops (Niveau 3)

SI demande concerne tests/qualité
  → testing-process (Niveau 3)

SI demande concerne implémentation frontend
  → frontend-developer ou react-expert/nextjs-expert (Niveau 4)

SI demande concerne implémentation backend
  → backend-developer (Niveau 4)

SI demande concerne WordPress
  → wordpress-gutenberg-expert (Niveau 4)

SI contexte insuffisant
  → Poser des questions pour clarifier
  → Commencer par le niveau le plus haut pertinent
```

## Utilisation

```
/tech [description de la demande]
```

## Exemples

- `/tech optimiser les performances` → Analyse contexte, route vers frontend/backend/devops selon cas
- `/tech architecture microservices` → direction-technique (stratégie)
- `/tech créer composant Button` → frontend-developer ou react-expert
- `/tech pipeline CI/CD` → devops
- `/tech review PR #123` → lead-dev
