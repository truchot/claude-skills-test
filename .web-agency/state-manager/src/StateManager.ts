/**
 * Web Agency State Manager
 * Version: 1.0.0
 *
 * Gère la persistance et le tracking des projets d'agence web
 * Compatible avec le framework Web Agency Skills v4.x
 */

import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';

import {
  Project,
  ProjectStatus,
  Client,
  Phase,
  Task,
  TaskStatus,
  TaskPriority,
  ProjectEvent,
  EventType,
  EventCategory,
  ProjectMetrics,
  Deliverable,
  TechStack,
  StateManagerConfig,
  QueryOptions,
  StateSnapshot,
} from '../types/project';

// ============================================================
// DEFAULT CONFIG
// ============================================================

const DEFAULT_CONFIG: StateManagerConfig = {
  dataDir: path.join(__dirname, '..', 'data'),
  autoSave: true,
  autoSaveInterval: 30000, // 30 secondes
  maxEvents: 1000,
  enableMetrics: true,
};

// ============================================================
// STATE MANAGER CLASS
// ============================================================

export class StateManager {
  private config: StateManagerConfig;
  private projects: Map<string, Project>;
  private isDirty: boolean = false;
  private autoSaveTimer?: NodeJS.Timeout;

  constructor(config: Partial<StateManagerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.projects = new Map();
    this.initialize();
  }

  // ============================================================
  // INITIALIZATION
  // ============================================================

  private initialize(): void {
    // Créer le répertoire data si nécessaire
    if (!fs.existsSync(this.config.dataDir)) {
      fs.mkdirSync(this.config.dataDir, { recursive: true });
    }

    // Charger les projets existants
    this.loadProjects();

    // Démarrer l'auto-save si activé
    if (this.config.autoSave && this.config.autoSaveInterval) {
      this.startAutoSave();
    }
  }

  private loadProjects(): void {
    const projectsFile = path.join(this.config.dataDir, 'projects.json');

    if (fs.existsSync(projectsFile)) {
      try {
        const data = fs.readFileSync(projectsFile, 'utf-8');
        const projectsArray: Project[] = JSON.parse(data);
        projectsArray.forEach((p) => this.projects.set(p.id, p));
        console.log(`[StateManager] Loaded ${this.projects.size} projects`);
      } catch (error) {
        console.error('[StateManager] Error loading projects:', error);
      }
    }
  }

  private startAutoSave(): void {
    this.autoSaveTimer = setInterval(() => {
      if (this.isDirty) {
        this.saveProjects();
      }
    }, this.config.autoSaveInterval);
  }

  // ============================================================
  // PERSISTENCE
  // ============================================================

  public saveProjects(): void {
    const projectsFile = path.join(this.config.dataDir, 'projects.json');
    const projectsArray = Array.from(this.projects.values());

    try {
      fs.writeFileSync(projectsFile, JSON.stringify(projectsArray, null, 2));
      this.isDirty = false;
      console.log(`[StateManager] Saved ${projectsArray.length} projects`);
    } catch (error) {
      console.error('[StateManager] Error saving projects:', error);
      throw error;
    }
  }

  public exportSnapshot(): StateSnapshot {
    const projects = Array.from(this.projects.values());
    return {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      projects,
      metadata: {
        totalProjects: projects.length,
        activeProjects: projects.filter(
          (p) => ![ProjectStatus.COMPLETED, ProjectStatus.CANCELLED].includes(p.status)
        ).length,
        completedProjects: projects.filter(
          (p) => p.status === ProjectStatus.COMPLETED
        ).length,
      },
    };
  }

  public importSnapshot(snapshot: StateSnapshot): void {
    snapshot.projects.forEach((p) => this.projects.set(p.id, p));
    this.isDirty = true;
    this.saveProjects();
  }

  // ============================================================
  // PROJECT CRUD
  // ============================================================

  public createProject(params: {
    name: string;
    description?: string;
    client: Omit<Client, 'id'>;
    techStack?: TechStack;
    tags?: string[];
  }): Project {
    const now = new Date().toISOString();
    const projectId = randomUUID();

    const client: Client = {
      ...params.client,
      id: randomUUID(),
    };

    const project: Project = {
      id: projectId,
      name: params.name,
      slug: this.slugify(params.name),
      description: params.description || '',
      client,
      status: ProjectStatus.INTAKE,
      createdAt: now,
      updatedAt: now,
      techStack: params.techStack || {},
      phases: this.createDefaultPhases(projectId),
      tasks: [],
      events: [],
      metrics: this.createInitialMetrics(),
      tags: params.tags || [],
      metadata: {},
    };

    // Ajouter l'événement de création
    this.addEventToProject(project, {
      type: 'project_created',
      category: 'project',
      title: `Project "${params.name}" created`,
    });

    this.projects.set(projectId, project);
    this.isDirty = true;

    return project;
  }

  public getProject(id: string): Project | undefined {
    return this.projects.get(id);
  }

  public getProjectBySlug(slug: string): Project | undefined {
    return Array.from(this.projects.values()).find((p) => p.slug === slug);
  }

  public updateProject(id: string, updates: Partial<Project>): Project {
    const project = this.projects.get(id);
    if (!project) {
      throw new Error(`Project not found: ${id}`);
    }

    const oldStatus = project.status;
    const updatedProject = {
      ...project,
      ...updates,
      id, // Empêcher la modification de l'ID
      updatedAt: new Date().toISOString(),
    };

    // Log status change event
    if (updates.status && updates.status !== oldStatus) {
      this.addEventToProject(updatedProject, {
        type: 'project_status_changed',
        category: 'project',
        title: `Status changed: ${oldStatus} -> ${updates.status}`,
        data: { oldStatus, newStatus: updates.status },
      });
    }

    this.projects.set(id, updatedProject);
    this.isDirty = true;

    return updatedProject;
  }

  public deleteProject(id: string): boolean {
    const deleted = this.projects.delete(id);
    if (deleted) {
      this.isDirty = true;
    }
    return deleted;
  }

  public queryProjects(options: QueryOptions = {}): Project[] {
    let results = Array.from(this.projects.values());

    // Filter by status
    if (options.status) {
      const statuses = Array.isArray(options.status)
        ? options.status
        : [options.status];
      results = results.filter((p) => statuses.includes(p.status));
    }

    // Filter by client
    if (options.clientId) {
      results = results.filter((p) => p.client.id === options.clientId);
    }

    // Filter by tags
    if (options.tags?.length) {
      results = results.filter((p) =>
        options.tags!.some((tag) => p.tags.includes(tag))
      );
    }

    // Filter by date
    if (options.createdAfter) {
      results = results.filter((p) => p.createdAt >= options.createdAfter!);
    }
    if (options.createdBefore) {
      results = results.filter((p) => p.createdAt <= options.createdBefore!);
    }

    // Sort
    const orderBy = options.orderBy || 'createdAt';
    const orderDir = options.orderDir || 'desc';
    results.sort((a, b) => {
      const aVal = a[orderBy] as string;
      const bVal = b[orderBy] as string;
      return orderDir === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });

    // Pagination
    if (options.offset) {
      results = results.slice(options.offset);
    }
    if (options.limit) {
      results = results.slice(0, options.limit);
    }

    return results;
  }

  // ============================================================
  // PHASES
  // ============================================================

  private createDefaultPhases(projectId: string): Phase[] {
    const phases: Omit<Phase, 'id'>[] = [
      {
        projectId,
        name: 'Intake & Discovery',
        status: ProjectStatus.INTAKE,
        order: 0,
        primarySkill: 'client-intake',
        progress: 0,
      },
      {
        projectId,
        name: 'Strategic Planning',
        status: ProjectStatus.PLANNING,
        order: 1,
        primarySkill: 'direction-technique',
        supportingSkills: ['direction-marketing', 'direction-artistique'],
        progress: 0,
      },
      {
        projectId,
        name: 'UX/UI Design',
        status: ProjectStatus.DESIGN,
        order: 2,
        primarySkill: 'ux-ui-design',
        supportingSkills: ['direction-artistique'],
        progress: 0,
      },
      {
        projectId,
        name: 'Development',
        status: ProjectStatus.DEVELOPMENT,
        order: 3,
        primarySkill: 'lead-dev',
        supportingSkills: ['frontend-developer', 'backend-api', 'devops-deployment'],
        progress: 0,
      },
      {
        projectId,
        name: 'Testing & QA',
        status: ProjectStatus.TESTING,
        order: 4,
        primarySkill: 'lead-dev',
        progress: 0,
      },
      {
        projectId,
        name: 'Deployment',
        status: ProjectStatus.DEPLOYED,
        order: 5,
        primarySkill: 'devops-deployment',
        progress: 0,
      },
    ];

    return phases.map((p) => ({ ...p, id: randomUUID() }));
  }

  public startPhase(projectId: string, phaseId: string): Phase {
    const project = this.getProject(projectId);
    if (!project) throw new Error(`Project not found: ${projectId}`);

    const phase = project.phases.find((p) => p.id === phaseId);
    if (!phase) throw new Error(`Phase not found: ${phaseId}`);

    phase.startDate = new Date().toISOString();

    // Update project status to match phase
    project.status = phase.status;
    project.updatedAt = new Date().toISOString();

    this.addEventToProject(project, {
      type: 'phase_started',
      category: 'phase',
      title: `Phase "${phase.name}" started`,
      phaseId,
      skill: phase.primarySkill,
    });

    this.isDirty = true;
    return phase;
  }

  public completePhase(projectId: string, phaseId: string): Phase {
    const project = this.getProject(projectId);
    if (!project) throw new Error(`Project not found: ${projectId}`);

    const phase = project.phases.find((p) => p.id === phaseId);
    if (!phase) throw new Error(`Phase not found: ${phaseId}`);

    phase.endDate = new Date().toISOString();
    phase.progress = 100;

    this.addEventToProject(project, {
      type: 'phase_completed',
      category: 'phase',
      title: `Phase "${phase.name}" completed`,
      phaseId,
    });

    // Update metrics
    this.updateProjectMetrics(project);

    this.isDirty = true;
    return phase;
  }

  // ============================================================
  // TASKS
  // ============================================================

  public createTask(
    projectId: string,
    params: {
      title: string;
      description?: string;
      phaseId?: string;
      priority?: TaskPriority;
      assignedSkill?: string;
      dueDate?: string;
      estimatedHours?: number;
    }
  ): Task {
    const project = this.getProject(projectId);
    if (!project) throw new Error(`Project not found: ${projectId}`);

    const now = new Date().toISOString();
    const task: Task = {
      id: randomUUID(),
      projectId,
      phaseId: params.phaseId,
      title: params.title,
      description: params.description,
      status: TaskStatus.TODO,
      priority: params.priority || TaskPriority.MEDIUM,
      assignedSkill: params.assignedSkill,
      createdAt: now,
      updatedAt: now,
      dueDate: params.dueDate,
      estimatedHours: params.estimatedHours,
      deliverables: [],
      metadata: {},
    };

    project.tasks.push(task);

    this.addEventToProject(project, {
      type: 'task_created',
      category: 'task',
      title: `Task created: "${params.title}"`,
      taskId: task.id,
      phaseId: params.phaseId,
      skill: params.assignedSkill,
    });

    this.updateProjectMetrics(project);
    this.isDirty = true;

    return task;
  }

  public updateTask(
    projectId: string,
    taskId: string,
    updates: Partial<Task>
  ): Task {
    const project = this.getProject(projectId);
    if (!project) throw new Error(`Project not found: ${projectId}`);

    const taskIndex = project.tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) throw new Error(`Task not found: ${taskId}`);

    const oldTask = project.tasks[taskIndex];
    const updatedTask: Task = {
      ...oldTask,
      ...updates,
      id: taskId,
      projectId,
      updatedAt: new Date().toISOString(),
    };

    // Track status changes
    if (updates.status && updates.status !== oldTask.status) {
      if (updates.status === TaskStatus.IN_PROGRESS) {
        this.addEventToProject(project, {
          type: 'task_started',
          category: 'task',
          title: `Task started: "${oldTask.title}"`,
          taskId,
        });
      } else if (updates.status === TaskStatus.DONE) {
        updatedTask.completedAt = new Date().toISOString();
        this.addEventToProject(project, {
          type: 'task_completed',
          category: 'task',
          title: `Task completed: "${oldTask.title}"`,
          taskId,
        });
      } else if (updates.status === TaskStatus.BLOCKED) {
        this.addEventToProject(project, {
          type: 'task_blocked',
          category: 'task',
          title: `Task blocked: "${oldTask.title}"`,
          taskId,
          severity: 'warning',
        });
      }
    }

    project.tasks[taskIndex] = updatedTask;
    this.updateProjectMetrics(project);
    this.isDirty = true;

    return updatedTask;
  }

  public deleteTask(projectId: string, taskId: string): boolean {
    const project = this.getProject(projectId);
    if (!project) return false;

    const initialLength = project.tasks.length;
    project.tasks = project.tasks.filter((t) => t.id !== taskId);

    if (project.tasks.length < initialLength) {
      this.updateProjectMetrics(project);
      this.isDirty = true;
      return true;
    }
    return false;
  }

  // ============================================================
  // EVENTS
  // ============================================================

  private addEventToProject(
    project: Project,
    params: {
      type: EventType;
      category: EventCategory;
      title: string;
      description?: string;
      skill?: string;
      agent?: string;
      taskId?: string;
      phaseId?: string;
      data?: Record<string, unknown>;
      severity?: 'info' | 'warning' | 'error' | 'critical';
    }
  ): ProjectEvent {
    const event: ProjectEvent = {
      id: randomUUID(),
      projectId: project.id,
      timestamp: new Date().toISOString(),
      ...params,
    };

    project.events.push(event);

    // Limiter le nombre d'events
    if (
      this.config.maxEvents &&
      project.events.length > this.config.maxEvents
    ) {
      project.events = project.events.slice(-this.config.maxEvents);
    }

    return event;
  }

  public logEvent(
    projectId: string,
    params: {
      type: EventType;
      category: EventCategory;
      title: string;
      description?: string;
      skill?: string;
      agent?: string;
      taskId?: string;
      phaseId?: string;
      data?: Record<string, unknown>;
      severity?: 'info' | 'warning' | 'error' | 'critical';
    }
  ): ProjectEvent {
    const project = this.getProject(projectId);
    if (!project) throw new Error(`Project not found: ${projectId}`);

    const event = this.addEventToProject(project, params);
    this.isDirty = true;
    return event;
  }

  public getProjectTimeline(
    projectId: string,
    options?: { limit?: number; category?: EventCategory }
  ): ProjectEvent[] {
    const project = this.getProject(projectId);
    if (!project) return [];

    let events = [...project.events];

    if (options?.category) {
      events = events.filter((e) => e.category === options.category);
    }

    events.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    if (options?.limit) {
      events = events.slice(0, options.limit);
    }

    return events;
  }

  // ============================================================
  // METRICS
  // ============================================================

  private createInitialMetrics(): ProjectMetrics {
    return {
      overallProgress: 0,
      totalTasks: 0,
      completedTasks: 0,
      blockedTasks: 0,
      totalEstimatedHours: 0,
      totalActualHours: 0,
      completedPhases: 0,
      totalPhases: 6,
      skillsInvoked: [],
      healthScore: 100,
      riskLevel: 'low',
      lastUpdated: new Date().toISOString(),
    };
  }

  private updateProjectMetrics(project: Project): void {
    const metrics = project.metrics;

    // Tasks metrics
    metrics.totalTasks = project.tasks.length;
    metrics.completedTasks = project.tasks.filter(
      (t) => t.status === TaskStatus.DONE
    ).length;
    metrics.blockedTasks = project.tasks.filter(
      (t) => t.status === TaskStatus.BLOCKED
    ).length;

    // Hours
    metrics.totalEstimatedHours = project.tasks.reduce(
      (sum, t) => sum + (t.estimatedHours || 0),
      0
    );
    metrics.totalActualHours = project.tasks.reduce(
      (sum, t) => sum + (t.actualHours || 0),
      0
    );

    // Phases
    metrics.completedPhases = project.phases.filter(
      (p) => p.progress === 100
    ).length;
    metrics.totalPhases = project.phases.length;
    metrics.currentPhase = project.phases.find(
      (p) => p.progress > 0 && p.progress < 100
    )?.name;

    // Progress
    if (metrics.totalTasks > 0) {
      metrics.overallProgress = Math.round(
        (metrics.completedTasks / metrics.totalTasks) * 100
      );
    } else {
      metrics.overallProgress = Math.round(
        (metrics.completedPhases / metrics.totalPhases) * 100
      );
    }

    // Health & Risk
    const blockedRatio =
      metrics.totalTasks > 0
        ? metrics.blockedTasks / metrics.totalTasks
        : 0;
    if (blockedRatio > 0.3) {
      metrics.riskLevel = 'critical';
      metrics.healthScore = 40;
    } else if (blockedRatio > 0.2) {
      metrics.riskLevel = 'high';
      metrics.healthScore = 60;
    } else if (blockedRatio > 0.1) {
      metrics.riskLevel = 'medium';
      metrics.healthScore = 80;
    } else {
      metrics.riskLevel = 'low';
      metrics.healthScore = 100 - blockedRatio * 100;
    }

    metrics.lastUpdated = new Date().toISOString();
  }

  public trackSkillUsage(
    projectId: string,
    skillName: string,
    success: boolean = true
  ): void {
    const project = this.getProject(projectId);
    if (!project) return;

    let skillUsage = project.metrics.skillsInvoked.find(
      (s) => s.skillName === skillName
    );

    if (!skillUsage) {
      skillUsage = {
        skillName,
        invocations: 0,
        successRate: 100,
        lastUsed: new Date().toISOString(),
      };
      project.metrics.skillsInvoked.push(skillUsage);
    }

    skillUsage.invocations++;
    skillUsage.lastUsed = new Date().toISOString();

    // Update success rate
    const oldTotal = skillUsage.invocations - 1;
    const oldSuccesses = Math.round((skillUsage.successRate / 100) * oldTotal);
    const newSuccesses = success ? oldSuccesses + 1 : oldSuccesses;
    skillUsage.successRate = Math.round(
      (newSuccesses / skillUsage.invocations) * 100
    );

    this.isDirty = true;
  }

  // ============================================================
  // DELIVERABLES
  // ============================================================

  public addDeliverable(
    projectId: string,
    taskId: string,
    params: {
      name: string;
      type: 'file' | 'url' | 'artifact' | 'document';
      path?: string;
      url?: string;
      description?: string;
    }
  ): Deliverable {
    const project = this.getProject(projectId);
    if (!project) throw new Error(`Project not found: ${projectId}`);

    const task = project.tasks.find((t) => t.id === taskId);
    if (!task) throw new Error(`Task not found: ${taskId}`);

    const deliverable: Deliverable = {
      id: randomUUID(),
      taskId,
      createdAt: new Date().toISOString(),
      ...params,
    };

    if (!task.deliverables) {
      task.deliverables = [];
    }
    task.deliverables.push(deliverable);

    this.addEventToProject(project, {
      type: 'deliverable_created',
      category: 'task',
      title: `Deliverable created: "${params.name}"`,
      taskId,
    });

    this.isDirty = true;
    return deliverable;
  }

  // ============================================================
  // UTILITIES
  // ============================================================

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  public getStats(): {
    totalProjects: number;
    byStatus: Record<ProjectStatus, number>;
    activeProjects: number;
  } {
    const projects = Array.from(this.projects.values());
    const byStatus = {} as Record<ProjectStatus, number>;

    Object.values(ProjectStatus).forEach((status) => {
      byStatus[status] = projects.filter((p) => p.status === status).length;
    });

    return {
      totalProjects: projects.length,
      byStatus,
      activeProjects: projects.filter(
        (p) =>
          ![ProjectStatus.COMPLETED, ProjectStatus.CANCELLED].includes(p.status)
      ).length,
    };
  }

  public close(): void {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
    }
    if (this.isDirty) {
      this.saveProjects();
    }
  }
}

// ============================================================
// SINGLETON EXPORT
// ============================================================

let instance: StateManager | null = null;

export function getStateManager(
  config?: Partial<StateManagerConfig>
): StateManager {
  if (!instance) {
    instance = new StateManager(config);
  }
  return instance;
}

export function resetStateManager(): void {
  if (instance) {
    instance.close();
    instance = null;
  }
}

export default StateManager;
