#!/usr/bin/env node
/**
 * Web Agency State Manager - CLI
 * Version: 1.0.0
 *
 * Interface en ligne de commande pour gérer les projets
 * Les données sont stockées dans .project/ à la racine du projet
 *
 * Usage:
 *   npx ts-node cli.ts <command> [options]
 *
 * Commands:
 *   create    - Créer un nouveau projet
 *   list      - Lister les projets
 *   show      - Afficher un projet
 *   update    - Mettre à jour un projet
 *   delete    - Supprimer un projet
 *   task      - Gérer les tâches
 *   event     - Logger un événement
 *   stats     - Afficher les statistiques
 *   export    - Exporter les données
 */

import * as fs from 'fs';
import * as path from 'path';
import { StateManager, getStateManager } from './StateManager';
import {
  ProjectStatus,
  TaskStatus,
  TaskPriority,
  EventType,
  EventCategory,
} from '../types/project';

// ============================================================
// CONFIGURATION
// ============================================================

// Chemin vers .project/ à la racine
const PROJECT_ROOT = findProjectRoot();
const PROJECT_DATA_DIR = path.join(PROJECT_ROOT, '.project');

function findProjectRoot(): string {
  let currentDir = process.cwd();

  // Remonter jusqu'à trouver .git ou .web-agency
  while (currentDir !== '/') {
    if (
      fs.existsSync(path.join(currentDir, '.git')) ||
      fs.existsSync(path.join(currentDir, '.web-agency'))
    ) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }

  return process.cwd();
}

// Initialiser le StateManager avec le bon chemin
const stateManager = getStateManager({
  dataDir: PROJECT_DATA_DIR,
  autoSave: true,
  enableMetrics: true,
});

// ============================================================
// SECURITY VALIDATORS
// ============================================================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email) && email.length <= 254;
}

function isValidUUID(id: string): boolean {
  return UUID_REGEX.test(id);
}

function sanitizeInput(input: string, maxLength: number = 500): string {
  // Remove control characters and limit length
  return input.replace(/[\x00-\x1F\x7F]/g, '').trim().slice(0, maxLength);
}

function maskEmail(email: string): string {
  // Mask email for logging: john@example.com -> j***@e***.com
  const [local, domain] = email.split('@');
  if (!domain) return '***@***';
  const domainParts = domain.split('.');
  const maskedLocal = local[0] + '***';
  const maskedDomain = domainParts[0][0] + '***.' + domainParts.slice(1).join('.');
  return `${maskedLocal}@${maskedDomain}`;
}

// ============================================================
// CLI HELPERS
// ============================================================

function printHelp(): void {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║           Web Agency State Manager CLI v1.0.0                ║
╚══════════════════════════════════════════════════════════════╝

Usage: npx ts-node cli.ts <command> [options]

Commands:
  create    Create a new project
  list      List all projects
  show      Show project details
  update    Update a project
  delete    Delete a project
  task      Manage tasks (add/update/list)
  event     Log an event
  stats     Show statistics
  export    Export all data
  init      Initialize .project/ directory

Options:
  --help    Show this help message

Examples:
  npx ts-node cli.ts create --name "Mon Site" --client "John Doe" --email "john@example.com"
  npx ts-node cli.ts list --status active
  npx ts-node cli.ts show --id <project-id>
  npx ts-node cli.ts task add --project <id> --title "Design homepage"
  npx ts-node cli.ts stats

Data is stored in: ${PROJECT_DATA_DIR}
`);
}

function parseArgs(args: string[]): Record<string, string> {
  const result: Record<string, string> = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const value = args[i + 1] && !args[i + 1].startsWith('--')
        ? args[i + 1]
        : 'true';
      result[key] = value;
      if (value !== 'true') i++;
    }
  }

  return result;
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleString('fr-FR');
}

function printTable(headers: string[], rows: string[][]): void {
  const colWidths = headers.map((h, i) =>
    Math.max(h.length, ...rows.map(r => (r[i] || '').length))
  );

  const separator = colWidths.map(w => '─'.repeat(w + 2)).join('┼');

  console.log('┌' + separator.replace(/┼/g, '┬') + '┐');
  console.log('│ ' + headers.map((h, i) => h.padEnd(colWidths[i])).join(' │ ') + ' │');
  console.log('├' + separator + '┤');

  rows.forEach(row => {
    console.log('│ ' + row.map((c, i) => (c || '').padEnd(colWidths[i])).join(' │ ') + ' │');
  });

  console.log('└' + separator.replace(/┼/g, '┴') + '┘');
}

// ============================================================
// COMMANDS
// ============================================================

async function cmdInit(): Promise<void> {
  if (!fs.existsSync(PROJECT_DATA_DIR)) {
    fs.mkdirSync(PROJECT_DATA_DIR, { recursive: true });
    fs.writeFileSync(
      path.join(PROJECT_DATA_DIR, '.gitignore'),
      '# Ignore sensitive project data\n*.json\n!schema.json\n'
    );
    console.log(`✓ Initialized .project/ directory at ${PROJECT_DATA_DIR}`);
  } else {
    console.log(`✓ .project/ already exists at ${PROJECT_DATA_DIR}`);
  }
}

async function cmdCreate(args: Record<string, string>): Promise<void> {
  const { name, client, email, company, description, tags } = args;

  if (!name || !client || !email) {
    console.error('Error: --name, --client, and --email are required');
    console.log('Usage: create --name "Project Name" --client "Client Name" --email "email@example.com"');
    return;
  }

  // Security: Validate email format
  if (!isValidEmail(email)) {
    console.error('Error: Invalid email format');
    console.log('Please provide a valid email address (e.g., john@example.com)');
    return;
  }

  // Security: Sanitize inputs
  const sanitizedName = sanitizeInput(name, 500);
  const sanitizedClient = sanitizeInput(client, 200);
  const sanitizedDescription = sanitizeInput(description || '', 5000);
  const sanitizedCompany = company ? sanitizeInput(company, 200) : undefined;

  const project = stateManager.createProject({
    name: sanitizedName,
    description: sanitizedDescription,
    client: {
      name: sanitizedClient,
      email: email.toLowerCase().trim(), // Normalize email
      company: sanitizedCompany,
    },
    tags: tags ? tags.split(',').map(t => sanitizeInput(t.trim(), 50)) : [],
  });

  stateManager.saveProjects();

  // Security: Mask email in output
  console.log(`
✓ Project created successfully!

  ID:     ${project.id}
  Name:   ${project.name}
  Slug:   ${project.slug}
  Status: ${project.status}
  Client: ${project.client.name} <${maskEmail(project.client.email)}>

  Data stored in: ${PROJECT_DATA_DIR}/projects.json
`);
}

async function cmdList(args: Record<string, string>): Promise<void> {
  const { status, limit } = args;

  let statusFilter: ProjectStatus[] | undefined;
  if (status === 'active') {
    statusFilter = [
      ProjectStatus.INTAKE,
      ProjectStatus.PLANNING,
      ProjectStatus.DESIGN,
      ProjectStatus.DEVELOPMENT,
      ProjectStatus.TESTING,
      ProjectStatus.STAGING,
    ];
  } else if (status && Object.values(ProjectStatus).includes(status as ProjectStatus)) {
    statusFilter = [status as ProjectStatus];
  }

  const projects = stateManager.queryProjects({
    status: statusFilter,
    limit: limit ? parseInt(limit) : undefined,
  });

  if (projects.length === 0) {
    console.log('No projects found.');
    return;
  }

  const headers = ['ID (8 chars)', 'Name', 'Client', 'Status', 'Progress', 'Created'];
  const rows = projects.map(p => [
    p.id.slice(0, 8),
    p.name.slice(0, 20),
    p.client.name.slice(0, 15),
    p.status,
    `${p.metrics.overallProgress}%`,
    formatDate(p.createdAt).split(' ')[0],
  ]);

  console.log(`\nProjects (${projects.length} total):\n`);
  printTable(headers, rows);
}

async function cmdShow(args: Record<string, string>): Promise<void> {
  const { id, slug } = args;

  if (!id && !slug) {
    console.error('Error: --id or --slug is required');
    return;
  }

  const project = id
    ? stateManager.getProject(id)
    : stateManager.getProjectBySlug(slug);

  if (!project) {
    console.error('Project not found');
    return;
  }

  const m = project.metrics;

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║ PROJECT: ${project.name.padEnd(50)}║
╚══════════════════════════════════════════════════════════════╝

  ID:          ${project.id}
  Slug:        ${project.slug}
  Status:      ${project.status}
  Description: ${project.description || '(none)'}

CLIENT
  Name:    ${project.client.name}
  Email:   ${maskEmail(project.client.email)}
  Company: ${project.client.company || '(none)'}

METRICS
  Progress:    ${m.overallProgress}%
  Health:      ${m.healthScore}/100 (Risk: ${m.riskLevel})
  Tasks:       ${m.completedTasks}/${m.totalTasks} completed
  Blocked:     ${m.blockedTasks} tasks
  Phases:      ${m.completedPhases}/${m.totalPhases} completed

PHASES
${project.phases.map(p => `  [${p.progress === 100 ? '✓' : p.progress > 0 ? '◐' : ' '}] ${p.name} (${p.progress}%) - ${p.primarySkill}`).join('\n')}

RECENT EVENTS
${project.events.slice(-5).map(e => `  • ${formatDate(e.timestamp)} - ${e.title}`).join('\n') || '  (no events)'}

TECH STACK
${Object.entries(project.techStack).map(([k, v]) => `  ${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join('\n') || '  (not defined)'}

Created: ${formatDate(project.createdAt)}
Updated: ${formatDate(project.updatedAt)}
`);
}

async function cmdUpdate(args: Record<string, string>): Promise<void> {
  const { id, status, description, name } = args;

  if (!id) {
    console.error('Error: --id is required');
    return;
  }

  const updates: Record<string, unknown> = {};
  if (status) updates.status = status as ProjectStatus;
  if (description) updates.description = description;
  if (name) updates.name = name;

  if (Object.keys(updates).length === 0) {
    console.error('Error: No updates provided. Use --status, --description, or --name');
    return;
  }

  try {
    const project = stateManager.updateProject(id, updates);
    stateManager.saveProjects();
    console.log(`✓ Project updated: ${project.name} (${project.status})`);
  } catch (error) {
    console.error('Error:', (error as Error).message);
  }
}

async function cmdDelete(args: Record<string, string>): Promise<void> {
  const { id, confirm } = args;

  if (!id) {
    console.error('Error: --id is required');
    return;
  }

  if (confirm !== 'true') {
    console.error('Error: Add --confirm to delete the project');
    return;
  }

  const deleted = stateManager.deleteProject(id);
  if (deleted) {
    stateManager.saveProjects();
    console.log('✓ Project deleted');
  } else {
    console.error('Project not found');
  }
}

async function cmdTask(subCommand: string, args: Record<string, string>): Promise<void> {
  const { project: projectId, id: taskId, title, description, status, priority, skill } = args;

  switch (subCommand) {
    case 'add': {
      if (!projectId || !title) {
        console.error('Error: --project and --title are required');
        return;
      }

      const task = stateManager.createTask(projectId, {
        title,
        description,
        priority: priority as TaskPriority || TaskPriority.MEDIUM,
        assignedSkill: skill,
      });

      stateManager.saveProjects();
      console.log(`✓ Task created: ${task.id.slice(0, 8)} - ${task.title}`);
      break;
    }

    case 'update': {
      if (!projectId || !taskId) {
        console.error('Error: --project and --id are required');
        return;
      }

      const updates: Record<string, unknown> = {};
      if (status) updates.status = status as TaskStatus;
      if (title) updates.title = title;
      if (description) updates.description = description;
      if (priority) updates.priority = priority as TaskPriority;

      const task = stateManager.updateTask(projectId, taskId, updates);
      stateManager.saveProjects();
      console.log(`✓ Task updated: ${task.title} (${task.status})`);
      break;
    }

    case 'list': {
      if (!projectId) {
        console.error('Error: --project is required');
        return;
      }

      const project = stateManager.getProject(projectId);
      if (!project) {
        console.error('Project not found');
        return;
      }

      if (project.tasks.length === 0) {
        console.log('No tasks found.');
        return;
      }

      const headers = ['ID', 'Title', 'Status', 'Priority', 'Skill'];
      const rows = project.tasks.map(t => [
        t.id.slice(0, 8),
        t.title.slice(0, 30),
        t.status,
        t.priority,
        t.assignedSkill || '-',
      ]);

      console.log(`\nTasks for "${project.name}":\n`);
      printTable(headers, rows);
      break;
    }

    default:
      console.log('Task subcommands: add, update, list');
  }
}

async function cmdEvent(args: Record<string, string>): Promise<void> {
  const { project: projectId, type, title, description, skill } = args;

  if (!projectId || !type || !title) {
    console.error('Error: --project, --type, and --title are required');
    console.log('Event types: skill_invoked, decision_made, error_occurred, custom');
    return;
  }

  const event = stateManager.logEvent(projectId, {
    type: type as EventType,
    category: 'custom',
    title,
    description,
    skill,
  });

  stateManager.saveProjects();
  console.log(`✓ Event logged: ${event.title} at ${formatDate(event.timestamp)}`);
}

async function cmdStats(): Promise<void> {
  const stats = stateManager.getStats();

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    PROJECT STATISTICS                        ║
╚══════════════════════════════════════════════════════════════╝

  Total Projects:  ${stats.totalProjects}
  Active Projects: ${stats.activeProjects}

  By Status:
${Object.entries(stats.byStatus)
  .filter(([_, count]) => count > 0)
  .map(([status, count]) => `    ${status.padEnd(15)} ${count}`)
  .join('\n') || '    (no projects)'}

  Data Location: ${PROJECT_DATA_DIR}
`);
}

async function cmdExport(args: Record<string, string>): Promise<void> {
  const { output } = args;

  const snapshot = stateManager.exportSnapshot();
  const outputPath = output || path.join(PROJECT_DATA_DIR, `export-${Date.now()}.json`);

  fs.writeFileSync(outputPath, JSON.stringify(snapshot, null, 2));
  console.log(`✓ Data exported to: ${outputPath}`);
  console.log(`  Projects: ${snapshot.metadata.totalProjects}`);
  console.log(`  Active: ${snapshot.metadata.activeProjects}`);
}

// ============================================================
// MAIN
// ============================================================

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];
  const parsedArgs = parseArgs(args.slice(1));

  if (!command || command === '--help' || parsedArgs.help) {
    printHelp();
    return;
  }

  // Ensure .project/ exists
  if (!fs.existsSync(PROJECT_DATA_DIR)) {
    await cmdInit();
  }

  try {
    switch (command) {
      case 'init':
        await cmdInit();
        break;
      case 'create':
        await cmdCreate(parsedArgs);
        break;
      case 'list':
        await cmdList(parsedArgs);
        break;
      case 'show':
        await cmdShow(parsedArgs);
        break;
      case 'update':
        await cmdUpdate(parsedArgs);
        break;
      case 'delete':
        await cmdDelete(parsedArgs);
        break;
      case 'task':
        await cmdTask(args[1], parseArgs(args.slice(2)));
        break;
      case 'event':
        await cmdEvent(parsedArgs);
        break;
      case 'stats':
        await cmdStats();
        break;
      case 'export':
        await cmdExport(parsedArgs);
        break;
      default:
        console.error(`Unknown command: ${command}`);
        printHelp();
    }
  } finally {
    stateManager.close();
  }
}

main().catch(console.error);
