# Web Agency State Manager

> Système de tracking et de persistance pour les projets d'agence web

## Vue d'ensemble

Le State Manager est un module qui permet de :
- **Créer et gérer des projets** avec suivi du cycle de vie complet
- **Tracker les tâches** assignées aux différents skills/agents
- **Logger les événements** pour maintenir une timeline complète
- **Calculer des métriques** de santé et progression
- **Persister les données** dans `.project/` à la racine

## Installation

```bash
cd .web-agency/state-manager
npm install
npm run build
```

## Structure des données

Les données sont stockées dans `.project/` à la racine du projet :

```
.project/
├── projects.json     # Données des projets
├── .gitignore        # Ignore les données sensibles
└── exports/          # Exports JSON
```

## Utilisation CLI

### Initialiser

```bash
npm run start -- init
```

### Créer un projet

```bash
npm run start -- create \
  --name "Mon Super Site" \
  --client "Jean Dupont" \
  --email "jean@example.com" \
  --company "Dupont SARL" \
  --description "Site vitrine avec blog" \
  --tags "vitrine,wordpress,seo"
```

### Lister les projets

```bash
# Tous les projets
npm run start -- list

# Projets actifs uniquement
npm run start -- list --status active

# Avec limite
npm run start -- list --limit 5
```

### Afficher un projet

```bash
npm run start -- show --id <project-id>
# ou
npm run start -- show --slug mon-super-site
```

### Mettre à jour un projet

```bash
npm run start -- update \
  --id <project-id> \
  --status development \
  --description "Nouvelle description"
```

### Gérer les tâches

```bash
# Ajouter une tâche
npm run start -- task add \
  --project <project-id> \
  --title "Designer la homepage" \
  --priority high \
  --skill ux-ui-design

# Mettre à jour une tâche
npm run start -- task update \
  --project <project-id> \
  --id <task-id> \
  --status in_progress

# Lister les tâches
npm run start -- task list --project <project-id>
```

### Logger un événement

```bash
npm run start -- event \
  --project <project-id> \
  --type skill_invoked \
  --title "Direction technique consultée" \
  --skill direction-technique
```

### Statistiques

```bash
npm run start -- stats
```

### Export

```bash
npm run start -- export --output ./backup.json
```

## Utilisation programmatique

```typescript
import { getStateManager, ProjectStatus, TaskStatus } from './src/StateManager';

// Initialiser avec le dossier .project/
const sm = getStateManager({
  dataDir: '/path/to/.project',
});

// Créer un projet
const project = sm.createProject({
  name: 'Mon Projet',
  client: {
    name: 'Client',
    email: 'client@example.com',
  },
});

// Ajouter une tâche
const task = sm.createTask(project.id, {
  title: 'Développer le frontend',
  priority: 'high',
  assignedSkill: 'frontend-developer',
});

// Mettre à jour le statut
sm.updateTask(project.id, task.id, {
  status: TaskStatus.IN_PROGRESS,
});

// Logger un événement
sm.logEvent(project.id, {
  type: 'skill_invoked',
  category: 'skill',
  title: 'Frontend developer started work',
  skill: 'frontend-developer',
});

// Tracker l'usage d'un skill
sm.trackSkillUsage(project.id, 'frontend-developer', true);

// Sauvegarder
sm.saveProjects();

// Fermer proprement
sm.close();
```

## Statuts de projet

| Status | Description |
|--------|-------------|
| `intake` | Réception client (Level 0) |
| `planning` | Planification stratégique |
| `design` | Conception UX/UI |
| `development` | Développement |
| `testing` | Tests & QA |
| `staging` | Pré-production |
| `deployed` | En production |
| `maintenance` | Maintenance |
| `completed` | Terminé |
| `on_hold` | En pause |
| `cancelled` | Annulé |

## Statuts de tâche

| Status | Description |
|--------|-------------|
| `todo` | À faire |
| `in_progress` | En cours |
| `blocked` | Bloquée |
| `review` | En revue |
| `done` | Terminée |
| `cancelled` | Annulée |

## Métriques calculées

- **overallProgress** : Progression globale (0-100%)
- **healthScore** : Score de santé du projet (0-100)
- **riskLevel** : low, medium, high, critical
- **velocityTrend** : Tendance de vélocité
- **skillsInvoked** : Usage des skills avec taux de succès

## Intégration avec les Skills

Le State Manager s'intègre avec l'architecture des skills :

```
Level 0 (Intake)     → project.status = 'intake'
Level 1 (Orchestration) → Routing, task creation
Level 2 (Strategy)   → phase.primarySkill = 'direction-*'
Level 3 (Operations) → Task assignment
Level 4 (Implementation) → Task execution, deliverables
```

## Events Timeline

Chaque projet maintient une timeline d'événements :

```typescript
interface ProjectEvent {
  id: string;
  projectId: string;
  timestamp: string;
  type: EventType;        // 'task_completed', 'skill_invoked', etc.
  category: EventCategory; // 'project', 'task', 'skill', etc.
  title: string;
  skill?: string;
  severity?: 'info' | 'warning' | 'error' | 'critical';
}
```

## Configuration

```typescript
interface StateManagerConfig {
  dataDir: string;           // Défaut: .project/
  autoSave: boolean;         // Défaut: true
  autoSaveInterval: number;  // Défaut: 30000ms
  maxEvents: number;         // Défaut: 1000 par projet
  enableMetrics: boolean;    // Défaut: true
}
```

## Version

- **State Manager**: 1.0.0
- **Compatible avec**: Web Agency Framework v4.x
