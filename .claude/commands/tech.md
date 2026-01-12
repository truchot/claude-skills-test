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

## Algorithme de Routage

### 1. Analyse des mots-clés

| Mots-clés | Destination |
|-----------|-------------|
| architecture, vision, standards, gouvernance, stratégie tech | direction-technique |
| planning, sprint, review, coordination, équipe | lead-dev |
| CI/CD, deploy, docker, kubernetes, infra, monitoring | devops |
| test, qualité, coverage, e2e, unit test | testing-process |
| composant, UI, CSS, responsive, animation | frontend-developer |
| API, database, auth, backend, serveur | backend-developer |
| React, hooks, Redux, state | react-expert |
| Next.js, SSR, ISR, App Router | nextjs-expert |
| WordPress, Gutenberg, WP, plugin, theme | wordpress-gutenberg-expert |

### 2. Analyse du contexte

- **Fichiers mentionnés**: `.tsx` → React, `docker-compose.yml` → DevOps
- **Stack du projet**: Détecté via `package.json`, config files
- **Historique conversation**: Continuité avec requêtes précédentes

### 3. Résolution d'ambiguïté

```
SI plusieurs skills possibles:
  → Privilégier le niveau le plus haut (stratégie > opérations > implémentation)
  → Demander clarification si vraiment ambigu

SI aucun mot-clé clair:
  → Analyser l'intention (nouveau projet? bug? optimisation?)
  → Poser 1-2 questions ciblées maximum

SI demande transverse (ex: "optimiser performances"):
  → Identifier le goulet d'étranglement probable
  → Router vers le domaine le plus impacté
```

### 4. Fallback

Si indétermination après analyse:
1. Proposer les 2-3 options les plus probables
2. Laisser l'utilisateur choisir
3. Ne jamais bloquer - toujours avancer

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
