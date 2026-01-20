# /tech - Commande Technique

## Rôle

Point d'entrée pour toutes les tâches techniques. L'orchestrateur analyse ta demande et déclenche automatiquement le workflow approprié.

## Architecture v2

```
/tech [demande]
     │
     ▼
┌─────────────────────────────────────────┐
│           ORCHESTRATOR                   │
│  .web-agency/ORCHESTRATOR.md            │
│                                          │
│  1. Analyse la demande                   │
│  2. Sélectionne le workflow              │
│  3. Enchaîne les agents                  │
│  4. Maintient l'état                     │
└─────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│           WORKFLOWS                      │
│  .web-agency/workflows/                  │
│                                          │
│  • feature.md    → Nouvelle feature      │
│  • bugfix.md     → Correction bug        │
│  • deployment.md → Mise en prod          │
│  • code-review.md→ Revue de code         │
│  • audit.md      → Audit tech            │
└─────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│           AGENTS                         │
│  .web-agency/skills/                     │
│                                          │
│  • strategy/     → Spec, Architecture    │
│  • development/  → Frontend, Backend     │
│  • quality/      → Tests, Code Review    │
│  • operations/   → CI/CD, Deployment     │
└─────────────────────────────────────────┘
```

## Comportement

1. **Charge l'orchestrateur** : `.web-agency/ORCHESTRATOR.md`
2. **Analyse ta demande** et identifie :
   - Le type : feature, bugfix, question, deployment...
   - Le domaine : frontend, backend, devops, fullstack...
   - L'urgence : P1-P4
3. **Sélectionne le workflow** approprié
4. **Exécute les agents** dans l'ordre défini
5. **Maintient l'état** dans `.web-agency/state/`

## Détection automatique

| Tu demandes... | Workflow déclenché | Agents impliqués |
|----------------|-------------------|------------------|
| Nouvelle feature | `feature.md` | specification → architecture → development → testing → review |
| Corriger un bug | `bugfix.md` | diagnostic → fix → test → deploy |
| Déployer | `deployment.md` | pre-deploy → build → staging → production |
| Review une PR | `code-review.md` | analysis → security → feedback |
| Créer un composant | `feature.md` (simplifié) | development/frontend.md |
| Optimiser perf | `audit.md` | quality/performance.md |

## Contextes chargés à la demande

| Domaine | Fichier |
|---------|---------|
| React, Next.js, CSS | `.web-agency/contexts/frontend.md` |
| Node, API, Prisma | `.web-agency/contexts/backend.md` |
| CI/CD, Docker, Deploy | `.web-agency/contexts/devops.md` |
| WordPress, Gutenberg | `.web-agency/contexts/wordpress.md` |
| OWASP, Auth, Crypto | `.web-agency/contexts/security.md` |

## Utilisation

```
/tech [description de ta demande]
```

## Exemples

```
/tech Ajouter un système de paiement Stripe
→ Workflow: feature
→ Agents: specification → architecture → backend → frontend → testing

/tech Le bouton de login ne fonctionne pas
→ Workflow: bugfix
→ Agents: diagnostic → fix → test → deploy

/tech Déployer en production
→ Workflow: deployment
→ Agents: pre-deploy → build → staging → smoke-test → production

/tech Review la PR #42
→ Workflow: code-review
→ Agents: context → analysis → security → feedback

/tech Créer un composant Card réutilisable
→ Workflow: feature (simplifié)
→ Agent: development/frontend.md
```

## Pour les questions simples

Si c'est juste une question technique (pas une tâche), l'orchestrateur répond directement en chargeant le contexte pertinent.

```
/tech Comment faire du SSR avec Next.js ?
→ Charge: contexts/frontend.md
→ Répond directement (pas de workflow)
```
