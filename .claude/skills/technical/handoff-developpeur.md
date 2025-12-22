---
name: handoff-developpeur
description: Préparation du handoff aux développeurs
---

# Handoff Développeur

Tu prépares le **passage de relais** entre la phase de conception et le développement, en fournissant aux développeurs tout le contexte nécessaire.

## Contexte

Intervient pour :
- Transmettre les spécifications aux devs
- Préparer l'onboarding sur un projet
- Documenter le contexte technique

## Entrées Requises

| Information | Source | Obligatoire |
|-------------|--------|-------------|
| Spécifications techniques | `specification-technique` | Oui |
| Architecture validée | `review-architecture` | Oui |
| Planning | `pilotage/creation-planning` | Oui |
| Estimation | `estimation-technique` | Recommandé |
| Brief client | `avant-projet/formalisation-brief` | Recommandé |

## Contenu du Handoff

### 1. Contexte Projet

```markdown
## Contexte

### Client
- Nom : [Client]
- Contact : [Nom, email]
- Secteur : [Activité]

### Projet
- Nom : [Nom projet]
- Type : [Site / App / API / ...]
- Objectif : [Résumé 2-3 lignes]

### Contraintes
- Budget : [Enveloppe]
- Deadline : [Date]
- Contraintes techniques : [Liste]
```

### 2. Architecture & Stack

```markdown
## Stack Technique

### Frontend
- Framework : [React / Vue / WordPress / ...]
- Styling : [Tailwind / CSS Modules / ...]
- State management : [Redux / Zustand / ...]

### Backend
- Runtime : [Node.js / PHP / ...]
- Framework : [Express / WordPress / ...]
- Base de données : [PostgreSQL / MySQL / ...]

### Infrastructure
- Hébergement : [Vercel / AWS / OVH / ...]
- CI/CD : [GitHub Actions / GitLab CI / ...]
- Monitoring : [...]

### Schéma d'Architecture
[Insérer diagramme]
```

### 3. Environnements

```markdown
## Environnements

### Local
- Setup : [Instructions]
- URL : localhost:XXXX
- Credentials : [Voir .env.example]

### Staging
- URL : [URL staging]
- Déploiement : [Auto / Manuel]
- Accès : [Credentials]

### Production
- URL : [URL prod]
- Déploiement : [Process]
```

Référence setup : `web-dev-process/setup/environment`

### 4. Accès & Credentials

```markdown
## Accès

### Repository
- URL : [URL Git]
- Branche principale : [main / master]
- Branching strategy : [Git Flow / GitHub Flow]

### Services Tiers
| Service | URL | Accès |
|---------|-----|-------|
| Figma | [URL] | [Email invité] |
| Jira/Linear | [URL] | [Compte] |
| Slack | [Channel] | [Invité] |

### Credentials Dev
- Vault / 1Password : [Lien]
- .env : [Localisation]
```

### 5. Spécifications

```markdown
## Spécifications

### Document Principal
[Lien vers specs techniques]

### User Stories
[Lien vers backlog]

### Maquettes
[Lien Figma / Zeplin]

### API Documentation
[Lien Swagger / Postman]
```

### 6. Standards & Conventions

```markdown
## Standards

### Code Style
- Linter : [ESLint config]
- Formatter : [Prettier config]
- Commit : [Conventional commits]

Référence : `web-dev-process/setup/quality-tools`

### Git Workflow
- Branching : [Stratégie]
- PR process : [Template, reviewers]
- Merge strategy : [Squash / Merge commit]

Référence : `web-dev-process/development/git-workflow`

### Definition of Done
- [ ] Code reviewé
- [ ] Tests passants
- [ ] Documentation à jour
- [ ] Déployé en staging
- [ ] Validé par PO

Référence : `web-dev-process/guides/definition-of-done`
```

### 7. Spécifique WordPress

Si projet WordPress, inclure :

```markdown
## WordPress Specifics

### Structure
- Theme : [Nom, type (block theme / classic)]
- Plugins requis : [Liste]
- CPT : [Liste]
- Taxonomies : [Liste]

### Développement
- Env local : wp-env / Local / Docker
- Build : @wordpress/scripts
- Tests : PHPUnit + Playwright

Référence : `wordpress-gutenberg-expert/tooling/*`

### Gutenberg
- Blocks custom : [Liste]
- Patterns : [Liste]
- Variations : [Liste]

Référence : `wordpress-gutenberg-expert/gutenberg-blocks/*`
```

## Template Complet de Handoff

```markdown
# Handoff Développeur
## Projet : [Nom]
## Date : [Date]

---

## 1. Contexte Projet
[Contexte client et projet]

---

## 2. Équipe

| Rôle | Nom | Contact |
|------|-----|---------|
| Chef de projet | [Nom] | [Email] |
| Tech Lead | [Nom] | [Email] |
| Designer | [Nom] | [Email] |
| Développeurs | [Noms] | |

---

## 3. Planning

### Jalons Clés
| Jalon | Date | Livrable |
|-------|------|----------|
| Kick-off | [Date] | - |
| Sprint 1 | [Date] | [Livrable] |
| ... | | |
| MEP | [Date] | Production |

### Rituels
- Daily : [Heure, canal]
- Review : [Jour, heure]
- Retro : [Fréquence]

---

## 4. Stack Technique
[Détail stack]

---

## 5. Environnements
[Détail envs]

---

## 6. Accès
[Détail accès]

---

## 7. Spécifications
[Liens specs]

---

## 8. Standards
[Conventions]

---

## 9. Ressources

### Documentation
- [Lien 1]
- [Lien 2]

### Skills Claude
- `web-dev-process` : Process générique
- `wordpress-gutenberg-expert` : Implémentation WP (si applicable)

### Support
- Questions techniques : [Channel/personne]
- Questions fonctionnelles : [Channel/personne]

---

## 10. Checklist Onboarding

- [ ] Accès repo Git
- [ ] Env local fonctionnel
- [ ] Accès outils (Figma, Jira, Slack)
- [ ] Lecture specs
- [ ] Lecture README projet
- [ ] Premier PR (typo / small fix)
```

## Processus de Handoff

```
Specs finalisées
       │
       ▼
┌──────────────────┐
│ 1. Compiler      │
│    documents     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 2. Préparer      │
│    accès         │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 3. Créer doc     │
│    handoff       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 4. Réunion       │
│    kick-off dev  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 5. Support       │
│    onboarding    │
└──────────────────┘
```

## Escalade Humaine

| Situation | Action |
|-----------|--------|
| Specs incomplètes | Retour vers specification-technique |
| Accès manquants | Relancer admin/client |
| Questions fonctionnelles | Orienter vers chef de projet |
| Blocage technique | Tech lead |
