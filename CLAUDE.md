# Web Agency AI Framework

## Stack & Conventions
- Framework web-agency v5 : plugin Claude Code pour agence web digitale
- Architecture : skills auto-détectés + agents à contexte isolé + commandes métier
- Langue de communication : français par défaut

## Plugin web-agency
Le plugin `web-agency` fournit 34 skills, 17 agents et 5 commandes.
- Commandes : `/web-agency:tech`, `/web-agency:design`, `/web-agency:marketing`, `/web-agency:project`, `/web-agency:client`
- Skills techniques : auto-détectés par contexte (fichiers, imports, configs)
- Skills métier : invoqués automatiquement par Claude selon la conversation
- Agents : délégation automatique pour tâches lourdes (audits, rapports, analyses)

## Routing des demandes
| Type de demande | Action |
|---|---|
| Développement, debug, architecture | `/web-agency:tech` |
| Design, UX, identité visuelle | `/web-agency:design` |
| SEO, ads, content, analytics | `/web-agency:marketing` |
| Planning, estimation, suivi | `/web-agency:project` |
| Communication client, rapports | `/web-agency:client` |
| Audit de code/sécu/perf | Délégué automatiquement aux agents |

## Conventions de code
- Composants : PascalCase (ex: `UserProfile.tsx`)
- Hooks : camelCase avec préfixe `use` (ex: `useAuth.ts`)
- Fichiers utilitaires : camelCase (ex: `formatDate.ts`)
- Tests : `*.test.ts` ou `*.spec.ts` côté fichier testé
- Styles : CSS Modules ou Tailwind selon le projet

## Git
- Ne jamais push directement sur main
- Commits en français, format conventionnel
- Une branche par feature/fix
