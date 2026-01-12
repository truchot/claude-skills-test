# Guide de Migration - Web Agency IA

Ce guide documente les étapes de migration entre les versions majeures de l'agence web IA.

## Migration vers v4.x (Architecture Agnostique)

### Vue d'Ensemble

La v4.0.0 rend l'architecture **agnostique** du framework Claude :
- Séparation `.claude/` (interface) et `.web-agency/` (logique métier)
- 23 commandes granulaires → 4 commandes intelligentes avec routage
- Nouveau système de routage basé sur l'analyse contextuelle

### Breaking Changes

| Avant (v3.x) | Après (v4.x) | Impact |
|--------------|--------------|--------|
| `.claude/skills/` | `.web-agency/skills/` | Mettre à jour tous les imports |
| `.claude/learnings/` | `.web-agency/learnings/` | Mettre à jour références |
| 23 commandes (`/frontend-developer`, `/backend-developer`, ...) | 4 commandes (`/tech`, `/design`, `/marketing`, `/project`) | Adapter les workflows |
| Routage manuel | Routage intelligent contextuel | Aucune action (amélioration) |

### Prérequis

```yaml
version_source: 3.x
version_cible: 4.x
risque: Moyen (breaking changes paths)
```

### Étapes de Migration

#### 1. Sauvegarde

```bash
# Backup complet
cp -r .claude .claude.backup.v3
cp -r .web-agency .web-agency.backup.v3 2>/dev/null || true
```

#### 2. Mise à Jour des Chemins

Rechercher et remplacer dans tout le projet :

```bash
# Trouver les références obsolètes
grep -r "\.claude/skills/" --include="*.md" --include="*.sh" --include="*.yml"
grep -r "\.claude/learnings/" --include="*.md" --include="*.sh" --include="*.yml"

# Remplacer
# .claude/skills/ → .web-agency/skills/
# .claude/learnings/ → .web-agency/learnings/
```

#### 3. Migration des Commandes

Les anciennes commandes sont archivées mais **ne fonctionnent plus** :

| Ancienne Commande | Nouvelle Commande |
|-------------------|-------------------|
| `/frontend-developer` | `/tech` (routage auto) |
| `/backend-developer` | `/tech` (routage auto) |
| `/react-expert` | `/tech` (routage auto) |
| `/direction-technique` | `/tech` (routage auto) |
| `/devops` | `/tech` (routage auto) |
| `/ux-ui-design` | `/design` (routage auto) |
| `/direction-artistique` | `/design` (routage auto) |
| `/direction-marketing` | `/marketing` (routage auto) |
| `/project-management` | `/project` |
| `/web-agency` | `/project` |

#### 4. Adaptation des Scripts Custom

```diff
# Avant (v3.x)
- /frontend-developer créer composant Button
- /devops déployer sur staging

# Après (v4.x)
+ /tech créer composant Button
+ /tech déployer sur staging
```

Le routage intelligent identifie automatiquement le skill approprié.

#### 5. Tests de Validation

```bash
# Vérifier qu'aucune référence obsolète ne reste
bash .github/workflows/validate-paths.yml

# Vérifier les commandes
bash .claude/tests/validate-routing-commands.sh

# Vérifier le compte d'agents
bash .web-agency/skills/scripts/verify-agent-count.sh
```

### Nouvelles Fonctionnalités v4.x

1. **Routage Intelligent**
   - Analyse des mots-clés de la demande
   - Détection du contexte (fichiers, stack, historique)
   - Résolution d'ambiguïté automatique

2. **Architecture Agnostique**
   - `.web-agency/` portable vers d'autres frameworks IA
   - `.claude/` contient uniquement l'interface Claude

3. **CI Renforcée**
   - Validation des chemins sur toutes les PRs
   - Vérification du comptage d'agents
   - Tests des chaînes commande → skill

### Rollback

```bash
# Si problème critique
rm -rf .claude .web-agency
mv .claude.backup.v3 .claude
mv .web-agency.backup.v3 .web-agency
```

### FAQ v4.x

**Q: Les anciennes commandes `/frontend-developer` etc. fonctionnent encore ?**
R: Non. Elles sont archivées dans `.claude/commands-archive/` avec notice DEPRECATED.

**Q: Comment le routage intelligent choisit-il le skill ?**
R: Analyse des mots-clés → contexte projet → niveau hiérarchique. Voir `Algorithme de Routage` dans chaque commande.

**Q: Puis-je restaurer les anciennes commandes ?**
R: Oui, copiez de `commands-archive/` vers `commands/`, mais le routage intelligent est recommandé.

---

## Migration vers v3.x (Full-Automatisée)

### Vue d'Ensemble

La v3.0.0 transforme l'agence en système **full-automatisé** avec :
- Point d'entrée multicanal (`client-intake`)
- Orchestration centralisée (`task-orchestrator`)
- Architecture 5 niveaux

### Prérequis

```yaml
version_source: 2.x
version_cible: 3.x
temps_estimé: 2-4h
risque: Moyen
```

### Étapes de Migration

#### 1. Sauvegarde

```bash
# Backup complet
cp -r .web-agency/skills .web-agency/skills.backup.v2

# Note: Les skills existants ne sont PAS modifiés
# La v3 AJOUTE de nouveaux skills
```

#### 2. Installation des Nouveaux Skills

Les skills v3 sont **additifs** :

```bash
# Nouveaux skills v3.0.0
.web-agency/skills/client-intake/    # 23 agents
.web-agency/skills/task-orchestrator/ # 16 agents

# Nouveaux skills v3.1.0
.web-agency/skills/ux-ui-design/      # 22 agents
.web-agency/skills/legal-compliance/  # 16 agents
.web-agency/skills/support-client/    # 16 agents
.web-agency/skills/commercial-crm/    # 17 agents
.web-agency/skills/finance-analytics/ # 17 agents
```

#### 3. Mise à Jour web-agency

```diff
# .web-agency/skills/web-agency/SKILL.md

- version: 2.9.0
+ version: 3.1.0

# Ajouter dans les skills disponibles :
+ | `client-intake` | Réception et qualification | 23 | 🟢 |
+ | `task-orchestrator` | Orchestration des tâches | 16 | 🟢 |
+ | `ux-ui-design` | UX/UI Design | 22 | 🟢 |
+ ...
```

#### 4. Configuration du Routage

Mettre à jour le routage pour intégrer l'intake :

```yaml
# Avant (v2.x) - Routage direct
requête → skill métier

# Après (v3.x) - Routage via intake
requête → client-intake → task-orchestrator → skill métier
```

#### 5. Tests de Validation

```bash
# Exécuter les tests
npm test

# Vérifier le routage
# Tester un email fictif → doit passer par intake
```

### Changements Breaking

| Changement | Impact | Action |
|------------|--------|--------|
| Nouveau niveau 0 | Toutes requêtes passent par intake | Configurer canaux d'entrée |
| Orchestration centralisée | Tâches gérées par task-orchestrator | Adapter workflows custom |
| Architecture 5 niveaux | Documentation | Mettre à jour références |

### Rollback

```bash
# Si problème, restaurer la v2
rm -rf .web-agency/skills/client-intake
rm -rf .web-agency/skills/task-orchestrator
# Restaurer web-agency/SKILL.md depuis backup
```

---

## Migration vers v2.x (Méta-orchestrateur)

### Vue d'Ensemble

La v2.0.0 transforme web-agency en **méta-orchestrateur** pur.

### Changements Majeurs

1. **Extraction des skills métiers**
   - Les agents de production sont extraits vers des skills autonomes
   - web-agency ne fait QUE du routage

2. **Nouvelle hiérarchie**
   - Niveau 2 : Stratégie (`direction-technique`)
   - Niveau 3 : Opérations (`web-dev-process`, `lead-dev`, `testing-process`)
   - Niveau 4 : Implémentation (skills techniques)

### Étapes de Migration

#### 1. Vérifier les Skills Autonomes

```bash
# Skills qui doivent exister en v2
.web-agency/skills/direction-technique/  # v3.0.0
.web-agency/skills/web-dev-process/
.web-agency/skills/lead-dev/
.web-agency/skills/testing-process/
.web-agency/skills/frontend-developer/
.web-agency/skills/backend-developer/
.web-agency/skills/devops/
# etc.
```

#### 2. Migrer les Références

```diff
# Dans les agents custom

- [direction-technique/technology-selector]
+ Utiliser le skill `direction-technique` pour les décisions techniques
```

#### 3. Mettre à Jour les Workflows

Les workflows v1 doivent être adaptés pour utiliser le routage v2 :

```yaml
# v1 - Appel direct
- agent: web-agency/project/chiffrage

# v2 - Via routage
- skill: project-management
  domain: avant-projet
  agent: chiffrage
```

---

## Migration vers v1.x (Initial)

### Création Initiale

La v1.0.0 est la version de création. Pas de migration nécessaire.

### Structure Initiale

```
.web-agency/skills/web-agency/
├── SKILL.md           # Skill principal
├── README.md          # Documentation
├── CHANGELOG.md       # Historique
├── agents/            # Agents par domaine
├── templates/         # Templates de documents
├── tests/             # Tests automatisés
└── docs/              # Documentation étendue
```

---

## Compatibilité

### Matrice de Compatibilité

| Version | Claude Code | Node.js | Breaking Changes |
|---------|-------------|---------|------------------|
| 4.1.0 | 1.0+ | 18+ | Non |
| 4.0.0 | 1.0+ | 18+ | Chemins, Commandes |
| 3.1.0 | 1.0+ | 18+ | Non |
| 3.0.0 | 1.0+ | 18+ | Architecture |
| 2.9.0 | 1.0+ | 18+ | Non |
| 2.0.0 | 1.0+ | 18+ | Extraction skills |
| 1.0.0 | 1.0+ | 18+ | Initial |

### Rétrocompatibilité

- Les skills v2 sont **compatibles** avec web-agency v3
- Les workflows v2 fonctionnent avec v3 (mais sans intake automatique)
- Les templates v1 sont toujours valides

---

## FAQ Migration

### Q: Dois-je migrer tous mes skills custom ?

**R:** Non. Les skills custom v2 restent compatibles. Seul le routage change.

### Q: Comment tester la migration avant production ?

**R:**
1. Créer une branche de test
2. Appliquer la migration
3. Exécuter `npm test`
4. Tester manuellement quelques workflows

### Q: Puis-je utiliser l'intake sans l'orchestrateur ?

**R:** Non recommandé. L'intake route vers l'orchestrateur qui dispatch.

### Q: Que faire si un skill custom ne fonctionne plus ?

**R:**
1. Vérifier les imports/références
2. Adapter au nouveau routage
3. Tester individuellement
4. Ouvrir une issue si besoin

---

## Support

Pour toute question de migration :
1. Consulter ce guide
2. Vérifier les ADRs dans `docs/adr/`
3. Consulter les exemples dans `examples/`
4. Ouvrir une issue GitHub
