/**
 * Web Agency State Manager - Type Definitions
 * Version: 1.0.0
 *
 * Définit les types pour le tracking des projets d'agence web
 */

// ============================================================
// ENUMS
// ============================================================

export enum ProjectStatus {
  INTAKE = 'intake',           // Réception client
  PLANNING = 'planning',       // Planification
  DESIGN = 'design',           // Conception UX/UI
  DEVELOPMENT = 'development', // Développement
  TESTING = 'testing',         // Tests & QA
  STAGING = 'staging',         // Pré-production
  DEPLOYED = 'deployed',       // En production
  MAINTENANCE = 'maintenance', // Maintenance
  COMPLETED = 'completed',     // Terminé
  ON_HOLD = 'on_hold',         // En pause
  CANCELLED = 'cancelled'      // Annulé
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  BLOCKED = 'blocked',
  REVIEW = 'review',
  DONE = 'done',
  CANCELLED = 'cancelled'
}

export enum TaskPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum SkillLevel {
  LEVEL_0_ENTRY = 0,      // client-intake
  LEVEL_1_ORCHESTRATION = 1, // web-agency, task-orchestrator
  LEVEL_2_STRATEGY = 2,   // direction-*
  LEVEL_3_OPERATIONS = 3, // project-management, lead-dev
  LEVEL_4_IMPLEMENTATION = 4 // frontend, backend, etc.
}

// ============================================================
// INTERFACES PRINCIPALES
// ============================================================

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  client: Client;
  status: ProjectStatus;

  // Dates
  createdAt: string;      // ISO 8601
  updatedAt: string;
  startDate?: string;
  targetEndDate?: string;
  actualEndDate?: string;

  // Configuration
  techStack: TechStack;
  budget?: Budget;

  // Relations
  phases: Phase[];
  tasks: Task[];
  events: ProjectEvent[];
  metrics: ProjectMetrics;

  // Metadata
  tags: string[];
  metadata: Record<string, unknown>;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  notes?: string;
  intakeData?: Record<string, unknown>;
}

export interface TechStack {
  frontend?: string[];     // ['react', 'nextjs', 'tailwind']
  backend?: string[];      // ['node', 'express', 'prisma']
  database?: string[];     // ['postgresql', 'redis']
  hosting?: string[];      // ['vercel', 'aws']
  cms?: string;            // 'wordpress', 'strapi', etc.
  other?: string[];
}

export interface Budget {
  estimated: number;
  currency: string;
  spent: number;
  remaining: number;
}

// ============================================================
// PHASES & TASKS
// ============================================================

export interface Phase {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  order: number;

  // Dates
  startDate?: string;
  endDate?: string;
  estimatedDuration?: number; // en jours

  // Skills associés
  primarySkill: string;       // ex: 'direction-technique'
  supportingSkills?: string[];

  // Progress
  progress: number;           // 0-100

  metadata?: Record<string, unknown>;
}

export interface Task {
  id: string;
  projectId: string;
  phaseId?: string;

  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;

  // Assignment
  assignedSkill?: string;     // Skill responsable
  assignedAgent?: string;     // Agent spécifique

  // Dates
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  completedAt?: string;

  // Estimation
  estimatedHours?: number;
  actualHours?: number;

  // Relations
  parentTaskId?: string;      // Pour sous-tâches
  dependencies?: string[];    // IDs des tâches dépendantes
  blockedBy?: string[];       // IDs des tâches bloquantes

  // Outputs
  deliverables?: Deliverable[];

  metadata?: Record<string, unknown>;
}

export interface Deliverable {
  id: string;
  taskId: string;
  name: string;
  type: 'file' | 'url' | 'artifact' | 'document';
  path?: string;
  url?: string;
  description?: string;
  createdAt: string;
}

// ============================================================
// EVENTS & TIMELINE
// ============================================================

export interface ProjectEvent {
  id: string;
  projectId: string;
  timestamp: string;

  type: EventType;
  category: EventCategory;

  title: string;
  description?: string;

  // Contexte
  skill?: string;
  agent?: string;
  taskId?: string;
  phaseId?: string;

  // Data
  data?: Record<string, unknown>;

  // Severity pour les erreurs
  severity?: 'info' | 'warning' | 'error' | 'critical';
}

export type EventType =
  | 'project_created'
  | 'project_status_changed'
  | 'phase_started'
  | 'phase_completed'
  | 'task_created'
  | 'task_started'
  | 'task_completed'
  | 'task_blocked'
  | 'skill_invoked'
  | 'agent_action'
  | 'deliverable_created'
  | 'error_occurred'
  | 'decision_made'
  | 'client_feedback'
  | 'milestone_reached'
  | 'custom';

export type EventCategory =
  | 'project'
  | 'phase'
  | 'task'
  | 'skill'
  | 'system'
  | 'client'
  | 'custom';

// ============================================================
// METRICS
// ============================================================

export interface ProjectMetrics {
  // Progress
  overallProgress: number;    // 0-100

  // Tasks
  totalTasks: number;
  completedTasks: number;
  blockedTasks: number;

  // Time
  totalEstimatedHours: number;
  totalActualHours: number;

  // Phases
  currentPhase?: string;
  completedPhases: number;
  totalPhases: number;

  // Skills usage
  skillsInvoked: SkillUsage[];

  // Health indicators
  healthScore: number;        // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical';

  // Computed
  velocityTrend?: number;     // Tasks/jour récent
  estimatedCompletion?: string; // Date estimée

  lastUpdated: string;
}

export interface SkillUsage {
  skillName: string;
  invocations: number;
  successRate: number;
  avgResponseTime?: number;
  lastUsed: string;
}

// ============================================================
// STATE MANAGER TYPES
// ============================================================

export interface StateManagerConfig {
  dataDir: string;
  autoSave: boolean;
  autoSaveInterval?: number;  // ms
  maxEvents?: number;         // Limite d'events par projet
  enableMetrics: boolean;
}

export interface QueryOptions {
  status?: ProjectStatus | ProjectStatus[];
  clientId?: string;
  tags?: string[];
  createdAfter?: string;
  createdBefore?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'name' | 'status';
  orderDir?: 'asc' | 'desc';
}

export interface StateSnapshot {
  version: string;
  exportedAt: string;
  projects: Project[];
  metadata: {
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
  };
}
