# Claude Skills - Web Agency

Collection de skills Claude pour industrialiser les métiers d'une agence Web, avec supervision humaine.

## Philosophie

> **Les agents exécutent, les humains supervisent et décident.**

```
CLIENT <--> HUMAIN (supervision) <--> AGENTS (exécution)
```

## Skills Disponibles

| Skill | Description | Agents | Statut |
|-------|-------------|--------|--------|
| [web-agency](.claude/skills/web-agency/) | Gestion de projet, technique, relation client | 30 | Actif |
| [web-dev-process](.claude/skills/web-dev-process/) | Process de développement web (7 phases) | 61 | Actif |
| [wordpress-gutenberg-expert](.claude/skills/wordpress-gutenberg-expert/) | Expert WordPress & Gutenberg | 41 | Actif |

**Total : 132 agents spécialisés**

## Architecture

```
.claude/skills/
├── web-agency/                    # Métiers agence (gestion projet, technique, client)
│   ├── SKILL.md                   # Orchestrateur principal
│   ├── agents/                    # 30 agents spécialisés
│   │   ├── project-management/    # Gestion de projet (24 agents)
│   │   └── technical/             # Technique & Développement (6 agents)
│   ├── templates/                 # 8 templates réutilisables
│   └── tests/                     # Suite de validation
│
├── web-dev-process/               # Process technique générique
│   ├── SKILL.md                   # Orchestrateur 7 phases
│   ├── agents/                    # 61 agents (discovery → maintenance)
│   ├── configs/                   # ESLint, Prettier, Commitlint
│   ├── templates/                 # PR, Issues, ADR
│   └── workflows/                 # GitHub Actions, GitLab CI
│
└── wordpress-gutenberg-expert/    # Implémentation WordPress
    ├── SKILL.md                   # Orchestrateur WP
    ├── agents/                    # 41 agents (WP Core, Gutenberg, Theme)
    ├── docs/                      # Guides et troubleshooting
    └── references/                # Guides d'implémentation
```

## Domaines Métiers

### web-agency

| Domaine | Statut | Description |
|---------|--------|-------------|
| Gestion de projet | Actif | Brief, estimation, planning, suivi, facturation |
| Technique & Développement | Actif | Stack, specs techniques, architecture, qualité |
| Stratégie & Conseil | À venir | Audit, benchmark, recommandations |
| Design & Création | À venir | DA, branding, maquettes |
| Contenu & Rédaction | À venir | Copywriting, SEO éditorial |
| Marketing Digital | À venir | SEO, SEA, analytics, social media |

Le domaine **Technique** orchestre les skills `web-dev-process` et `wordpress-gutenberg-expert` :

```
web-agency/technical (6 agents)
    │
    ├── web-dev-process (61 agents) - Process générique
    │
    └── wordpress-gutenberg-expert (41 agents) - WordPress
```

### web-dev-process (7 phases)

1. **Discovery** - Exigences, user stories, scope
2. **Design** - Architecture, API, UI/UX, accessibilité
3. **Setup** - Git, environnements, CI/CD, qualité
4. **Development** - Standards, code review, documentation
5. **Testing** - Unit, intégration, e2e, performance, sécurité
6. **Deployment** - Staging, production, rollback
7. **Maintenance** - Monitoring, alerting, mises à jour

### wordpress-gutenberg-expert

- **WP Core** : CPT, taxonomies, hooks, meta, sécurité
- **Gutenberg** : Blocks, variations, styles, data stores
- **Theme** : Block themes, theme.json, FSE, Interactivity API
- **Tooling** : WP-CLI, wp-env, CI/CD, déploiement
- **Testing** : PHPUnit, Jest, Playwright
- **Spécialistes** : REST API, RGPD, i18n, SEO, Accessibilité

## Installation

Ces skills sont conçus pour être utilisés avec [Claude Code](https://docs.anthropic.com/claude-code).

```bash
# Cloner le repository
git clone https://github.com/truchot/claude-skills-test.git

# Les skills sont automatiquement disponibles dans Claude Code
# depuis le dossier .claude/skills/
```

## Utilisation

### Avec Claude Code

Les skills sont automatiquement chargés. Exemples de requêtes :

```
# Gestion de projet
"Aide-moi à rédiger un brief client pour un site e-commerce"
"Crée une estimation pour ce projet"
"Génère un planning de production"

# Développement web
"Comment structurer mes user stories ?"
"Quelle architecture pour mon API REST ?"
"Configure mon pipeline CI/CD"

# WordPress
"Comment créer un custom post type ?"
"Aide-moi à créer un block Gutenberg"
"Comment configurer theme.json ?"
```

### Composition des Skills

Les skills fonctionnent ensemble :

```
web-agency (QUOI livrer au client)
    │
    └── web-dev-process (COMMENT développer - générique)
            │
            └── wordpress-gutenberg-expert (COMMENT - WordPress)
```

## Tests

```bash
# Tests web-agency
cd .claude/skills/web-agency/tests
bash run-tests.sh

# Tests individuels
node validate-agents.test.js
node validate-templates.test.js
node validate-routing.test.js
```

## Structure d'un Agent

Chaque agent suit le principe de responsabilité unique (SRP) :

```markdown
---
name: agent-name
description: Description courte
---

# Titre de l'Agent

## Contexte
[Quand utiliser cet agent]

## Responsabilités
[Ce que fait l'agent]

## Entrées
[Ce dont l'agent a besoin]

## Sorties
[Ce que l'agent produit]

## Règles
[Contraintes et bonnes pratiques]
```

## Principes de Conception

1. **Supervision humaine** : Tous les livrables nécessitent une validation humaine
2. **Traçabilité** : Historique complet des décisions et modifications
3. **Escalade claire** : Critères définis pour solliciter un humain
4. **Templates réutilisables** : Modèles standardisés pour chaque type de livrable
5. **Single Responsibility** : Un agent = une responsabilité

## Contribuer

Les contributions sont les bienvenues ! Voir [CONTRIBUTING.md](.claude/skills/web-agency/CONTRIBUTING.md) pour les guidelines.

### Développement

```bash
# Créer une branche
git checkout -b feature/mon-agent

# Valider les tests
cd .claude/skills/web-agency/tests && bash run-tests.sh

# Commit conventionnel
git commit -m "feat(web-agency): add new agent for X"
```

## Roadmap

- [x] Domaine 1 : Gestion de projet (24 agents)
- [x] Domaine 2 : Technique & Développement (6 agents)
- [x] web-dev-process : 7 phases (61 agents)
- [x] wordpress-gutenberg-expert (41 agents)
- [ ] Domaine 3 : Stratégie & Conseil
- [ ] Domaine 4 : Design & Création
- [ ] Domaine 5 : Contenu & Rédaction
- [ ] Domaine 6 : Marketing Digital
- [ ] Tests pour web-dev-process
- [ ] Tests pour wordpress-gutenberg-expert

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Ressources

- [Documentation Claude Code](https://docs.anthropic.com/claude-code)
- [WordPress Developer Resources](https://developer.wordpress.org/)
- [Gutenberg Handbook](https://developer.wordpress.org/block-editor/)
