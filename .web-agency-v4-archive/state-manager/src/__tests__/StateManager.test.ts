/**
 * StateManager Unit Tests
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { StateManager, getStateManager, resetStateManager } from '../StateManager';
import { ProjectStatus, TaskStatus, TaskPriority } from '../../types/project';

describe('StateManager', () => {
  let testDir: string;
  let sm: StateManager;

  beforeEach(() => {
    // Create temp directory for each test
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'state-manager-test-'));
    resetStateManager();
    sm = new StateManager({ dataDir: testDir, autoSave: false });
  });

  afterEach(() => {
    sm.close();
    // Clean up temp directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('Project CRUD', () => {
    it('should create a project with valid data', () => {
      const project = sm.createProject({
        name: 'Test Project',
        description: 'A test project',
        client: {
          name: 'Test Client',
          email: 'test@example.com',
        },
      });

      expect(project.id).toBeDefined();
      expect(project.name).toBe('Test Project');
      expect(project.slug).toBe('test-project');
      expect(project.status).toBe(ProjectStatus.INTAKE);
      expect(project.client.email).toBe('test@example.com');
      expect(project.phases).toHaveLength(6);
      expect(project.tasks).toHaveLength(0);
    });

    it('should generate unique IDs for projects', () => {
      const project1 = sm.createProject({
        name: 'Project 1',
        client: { name: 'Client', email: 'a@b.com' },
      });
      const project2 = sm.createProject({
        name: 'Project 2',
        client: { name: 'Client', email: 'a@b.com' },
      });

      expect(project1.id).not.toBe(project2.id);
    });

    it('should get project by ID', () => {
      const created = sm.createProject({
        name: 'Find Me',
        client: { name: 'Client', email: 'a@b.com' },
      });

      const found = sm.getProject(created.id);
      expect(found).toBeDefined();
      expect(found?.name).toBe('Find Me');
    });

    it('should get project by slug', () => {
      sm.createProject({
        name: 'My Cool Project',
        client: { name: 'Client', email: 'a@b.com' },
      });

      const found = sm.getProjectBySlug('my-cool-project');
      expect(found).toBeDefined();
      expect(found?.name).toBe('My Cool Project');
    });

    it('should return undefined for non-existent project', () => {
      const found = sm.getProject('non-existent-id');
      expect(found).toBeUndefined();
    });

    it('should update project', () => {
      const project = sm.createProject({
        name: 'Original Name',
        client: { name: 'Client', email: 'a@b.com' },
      });

      const updated = sm.updateProject(project.id, {
        name: 'Updated Name',
        status: ProjectStatus.DEVELOPMENT,
      });

      expect(updated.name).toBe('Updated Name');
      expect(updated.status).toBe(ProjectStatus.DEVELOPMENT);
      expect(updated.id).toBe(project.id); // ID should not change
    });

    it('should throw when updating non-existent project', () => {
      expect(() => {
        sm.updateProject('non-existent', { name: 'New Name' });
      }).toThrow('Project not found');
    });

    it('should delete project', () => {
      const project = sm.createProject({
        name: 'To Delete',
        client: { name: 'Client', email: 'a@b.com' },
      });

      const deleted = sm.deleteProject(project.id);
      expect(deleted).toBe(true);
      expect(sm.getProject(project.id)).toBeUndefined();
    });

    it('should return false when deleting non-existent project', () => {
      const deleted = sm.deleteProject('non-existent');
      expect(deleted).toBe(false);
    });
  });

  describe('Task Management', () => {
    let projectId: string;

    beforeEach(() => {
      const project = sm.createProject({
        name: 'Task Test Project',
        client: { name: 'Client', email: 'a@b.com' },
      });
      projectId = project.id;
    });

    it('should create task', () => {
      const task = sm.createTask(projectId, {
        title: 'Test Task',
        description: 'A test task',
        priority: TaskPriority.HIGH,
      });

      expect(task.id).toBeDefined();
      expect(task.title).toBe('Test Task');
      expect(task.status).toBe(TaskStatus.TODO);
      expect(task.priority).toBe(TaskPriority.HIGH);
    });

    it('should update task status', () => {
      const task = sm.createTask(projectId, { title: 'Task' });

      const updated = sm.updateTask(projectId, task.id, {
        status: TaskStatus.IN_PROGRESS,
      });

      expect(updated.status).toBe(TaskStatus.IN_PROGRESS);
    });

    it('should set completedAt when task is done', () => {
      const task = sm.createTask(projectId, { title: 'Task' });

      const updated = sm.updateTask(projectId, task.id, {
        status: TaskStatus.DONE,
      });

      expect(updated.completedAt).toBeDefined();
    });

    it('should delete task', () => {
      const task = sm.createTask(projectId, { title: 'To Delete' });
      const project = sm.getProject(projectId);

      expect(project?.tasks).toHaveLength(1);

      const deleted = sm.deleteTask(projectId, task.id);
      expect(deleted).toBe(true);

      const updatedProject = sm.getProject(projectId);
      expect(updatedProject?.tasks).toHaveLength(0);
    });

    it('should throw when creating task for non-existent project', () => {
      expect(() => {
        sm.createTask('non-existent', { title: 'Task' });
      }).toThrow('Project not found');
    });
  });

  describe('Events and Timeline', () => {
    let projectId: string;

    beforeEach(() => {
      const project = sm.createProject({
        name: 'Event Test Project',
        client: { name: 'Client', email: 'a@b.com' },
      });
      projectId = project.id;
    });

    it('should log event', () => {
      const event = sm.logEvent(projectId, {
        type: 'custom',
        category: 'project',
        title: 'Test Event',
        description: 'A test event',
      });

      expect(event.id).toBeDefined();
      expect(event.title).toBe('Test Event');
      expect(event.timestamp).toBeDefined();
    });

    it('should auto-create project_created event', () => {
      const project = sm.getProject(projectId);
      expect(project?.events).toHaveLength(1);
      expect(project?.events[0].type).toBe('project_created');
    });

    it('should get project timeline', () => {
      sm.logEvent(projectId, { type: 'custom', category: 'project', title: 'Event 1' });
      sm.logEvent(projectId, { type: 'custom', category: 'project', title: 'Event 2' });
      sm.logEvent(projectId, { type: 'custom', category: 'task', title: 'Event 3' });

      const timeline = sm.getProjectTimeline(projectId);
      expect(timeline.length).toBeGreaterThanOrEqual(3);

      const projectEvents = sm.getProjectTimeline(projectId, { category: 'project' });
      expect(projectEvents.every(e => e.category === 'project')).toBe(true);
    });

    it('should limit timeline events', () => {
      for (let i = 0; i < 10; i++) {
        sm.logEvent(projectId, { type: 'custom', category: 'project', title: `Event ${i}` });
      }

      const limited = sm.getProjectTimeline(projectId, { limit: 5 });
      expect(limited).toHaveLength(5);
    });
  });

  describe('Metrics', () => {
    it('should calculate progress based on completed tasks', () => {
      const project = sm.createProject({
        name: 'Metrics Test',
        client: { name: 'Client', email: 'a@b.com' },
      });

      // Create tasks
      const task1 = sm.createTask(project.id, { title: 'Task 1' });
      const task2 = sm.createTask(project.id, { title: 'Task 2' });
      sm.createTask(project.id, { title: 'Task 3' });
      sm.createTask(project.id, { title: 'Task 4' });

      // Complete 2 of 4 tasks
      sm.updateTask(project.id, task1.id, { status: TaskStatus.DONE });
      sm.updateTask(project.id, task2.id, { status: TaskStatus.DONE });

      const updated = sm.getProject(project.id);
      expect(updated?.metrics.totalTasks).toBe(4);
      expect(updated?.metrics.completedTasks).toBe(2);
      expect(updated?.metrics.overallProgress).toBe(50);
    });

    it('should track skill usage', () => {
      const project = sm.createProject({
        name: 'Skill Test',
        client: { name: 'Client', email: 'a@b.com' },
      });

      sm.trackSkillUsage(project.id, 'lead-dev', true);
      sm.trackSkillUsage(project.id, 'lead-dev', true);
      sm.trackSkillUsage(project.id, 'lead-dev', false);
      sm.trackSkillUsage(project.id, 'frontend-developer', true);

      const updated = sm.getProject(project.id);
      const leadDevUsage = updated?.metrics.skillsInvoked.find(s => s.skillName === 'lead-dev');

      expect(leadDevUsage).toBeDefined();
      expect(leadDevUsage?.invocations).toBe(3);
      expect(leadDevUsage?.successRate).toBe(67); // 2/3 success
    });

    it('should calculate risk level based on blocked tasks', () => {
      const project = sm.createProject({
        name: 'Risk Test',
        client: { name: 'Client', email: 'a@b.com' },
      });

      // Create 10 tasks, block 4 (40%)
      for (let i = 0; i < 10; i++) {
        const task = sm.createTask(project.id, { title: `Task ${i}` });
        if (i < 4) {
          sm.updateTask(project.id, task.id, { status: TaskStatus.BLOCKED });
        }
      }

      const updated = sm.getProject(project.id);
      expect(updated?.metrics.blockedTasks).toBe(4);
      expect(updated?.metrics.riskLevel).toBe('critical'); // >30% blocked
    });
  });

  describe('Persistence', () => {
    it('should save and load projects', () => {
      const project = sm.createProject({
        name: 'Persist Test',
        client: { name: 'Client', email: 'a@b.com' },
      });

      sm.saveProjects();

      // Create new instance pointing to same directory
      const sm2 = new StateManager({ dataDir: testDir, autoSave: false });
      const loaded = sm2.getProject(project.id);

      expect(loaded).toBeDefined();
      expect(loaded?.name).toBe('Persist Test');

      sm2.close();
    });

    it('should export snapshot', () => {
      sm.createProject({
        name: 'Export Test 1',
        client: { name: 'Client', email: 'a@b.com' },
      });
      sm.createProject({
        name: 'Export Test 2',
        client: { name: 'Client', email: 'a@b.com' },
      });

      const snapshot = sm.exportSnapshot();

      expect(snapshot.version).toBe('1.0.0');
      expect(snapshot.projects).toHaveLength(2);
      expect(snapshot.metadata.totalProjects).toBe(2);
    });
  });

  describe('Query', () => {
    beforeEach(() => {
      sm.createProject({
        name: 'Active Project',
        client: { name: 'Client', email: 'a@b.com' },
        tags: ['web', 'react'],
      });

      const completed = sm.createProject({
        name: 'Completed Project',
        client: { name: 'Client', email: 'a@b.com' },
        tags: ['web'],
      });
      sm.updateProject(completed.id, { status: ProjectStatus.COMPLETED });

      sm.createProject({
        name: 'Development Project',
        client: { name: 'Client', email: 'a@b.com' },
        tags: ['mobile'],
      });
    });

    it('should filter by status', () => {
      const completed = sm.queryProjects({ status: ProjectStatus.COMPLETED });
      expect(completed).toHaveLength(1);
      expect(completed[0].name).toBe('Completed Project');
    });

    it('should filter by multiple statuses', () => {
      const active = sm.queryProjects({
        status: [ProjectStatus.INTAKE, ProjectStatus.DEVELOPMENT],
      });
      expect(active).toHaveLength(2);
    });

    it('should filter by tags', () => {
      const webProjects = sm.queryProjects({ tags: ['web'] });
      expect(webProjects).toHaveLength(2);

      const reactProjects = sm.queryProjects({ tags: ['react'] });
      expect(reactProjects).toHaveLength(1);
    });

    it('should limit results', () => {
      const limited = sm.queryProjects({ limit: 2 });
      expect(limited).toHaveLength(2);
    });

    it('should sort by name', () => {
      const sorted = sm.queryProjects({ orderBy: 'name', orderDir: 'asc' });
      expect(sorted[0].name).toBe('Active Project');
    });
  });

  describe('Stats', () => {
    it('should return correct statistics', () => {
      sm.createProject({
        name: 'Project 1',
        client: { name: 'Client', email: 'a@b.com' },
      });

      const completed = sm.createProject({
        name: 'Project 2',
        client: { name: 'Client', email: 'a@b.com' },
      });
      sm.updateProject(completed.id, { status: ProjectStatus.COMPLETED });

      const stats = sm.getStats();

      expect(stats.totalProjects).toBe(2);
      expect(stats.activeProjects).toBe(1);
      expect(stats.byStatus[ProjectStatus.INTAKE]).toBe(1);
      expect(stats.byStatus[ProjectStatus.COMPLETED]).toBe(1);
    });
  });
});
