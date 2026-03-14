#!/usr/bin/env node
/**
 * Session Logger Hook
 *
 * Hook pour logger automatiquement les sessions Claude futures
 * À intégrer dans les commandes Claude (.claude/commands/)
 *
 * Usage dans un prompt Claude:
 *   Au début: "Exécute d'abord: npx ts-node session-logger-hook.ts start --project <id>"
 *   À la fin: "Exécute: npx ts-node session-logger-hook.ts end --project <id>"
 *
 * Ou via l'API programmatique depuis les skills.
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { getStateManager } from '../StateManager';

// ============================================================
// TYPES
// ============================================================

interface SessionData {
  sessionId: string;
  projectId: string;
  startTime: string;
  endTime?: string;
  branch?: string;
  skill?: string;
  description?: string;
  actions: SessionAction[];
}

interface SessionAction {
  timestamp: string;
  type: 'skill_invoked' | 'task_started' | 'task_completed' | 'decision' | 'error' | 'custom';
  description: string;
  data?: Record<string, unknown>;
}

// ============================================================
// SESSION FILE MANAGEMENT
// ============================================================

function getSessionFilePath(projectRoot: string): string {
  return path.join(projectRoot, '.project', 'current-session.json');
}

function getCurrentSession(projectRoot: string): SessionData | null {
  const filePath = getSessionFilePath(projectRoot);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  return null;
}

function saveSession(projectRoot: string, session: SessionData): void {
  const filePath = getSessionFilePath(projectRoot);
  fs.writeFileSync(filePath, JSON.stringify(session, null, 2));
}

function clearSession(projectRoot: string): void {
  const filePath = getSessionFilePath(projectRoot);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

function getProjectRoot(): string {
  try {
    return execSync('git rev-parse --show-toplevel', { encoding: 'utf-8' }).trim();
  } catch {
    return process.cwd();
  }
}

function getCurrentBranch(): string {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
  } catch {
    return 'unknown';
  }
}

function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// ============================================================
// SESSION OPERATIONS
// ============================================================

/**
 * Démarre une nouvelle session de travail
 */
export function startSession(options: {
  projectId: string;
  skill?: string;
  description?: string;
}): SessionData {
  const projectRoot = getProjectRoot();
  const existing = getCurrentSession(projectRoot);

  if (existing) {
    console.log(`⚠️  Session already active: ${existing.sessionId}`);
    console.log(`   Started: ${existing.startTime}`);
    console.log(`   Use 'end' to close it first, or 'log' to add actions.\n`);
    return existing;
  }

  const session: SessionData = {
    sessionId: generateSessionId(),
    projectId: options.projectId,
    startTime: new Date().toISOString(),
    branch: getCurrentBranch(),
    skill: options.skill,
    description: options.description || `Claude session on ${getCurrentBranch()}`,
    actions: [],
  };

  saveSession(projectRoot, session);

  // Log to StateManager
  const sm = getStateManager({ dataDir: path.join(projectRoot, '.project') });
  sm.logEvent(options.projectId, {
    type: 'custom',
    category: 'project',
    title: `Session started: ${session.sessionId}`,
    description: session.description,
    skill: options.skill,
    data: {
      sessionId: session.sessionId,
      branch: session.branch,
    },
  });
  sm.saveProjects();

  console.log(`\n✓ Session started: ${session.sessionId}`);
  console.log(`  Project: ${options.projectId}`);
  console.log(`  Branch: ${session.branch}`);
  console.log(`  Time: ${session.startTime}\n`);

  return session;
}

/**
 * Termine la session en cours
 */
export function endSession(options: { projectId: string; summary?: string }): SessionData | null {
  const projectRoot = getProjectRoot();
  const session = getCurrentSession(projectRoot);

  if (!session) {
    console.log('⚠️  No active session to end.\n');
    return null;
  }

  session.endTime = new Date().toISOString();

  // Log to StateManager
  const sm = getStateManager({ dataDir: path.join(projectRoot, '.project') });
  sm.logEvent(options.projectId, {
    type: 'custom',
    category: 'project',
    title: `Session ended: ${session.sessionId}`,
    description: options.summary || `${session.actions.length} actions performed`,
    data: {
      sessionId: session.sessionId,
      duration: new Date(session.endTime).getTime() - new Date(session.startTime).getTime(),
      actionsCount: session.actions.length,
    },
  });
  sm.saveProjects();

  // Archive session
  const archiveDir = path.join(projectRoot, '.project', 'sessions');
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(archiveDir, `${session.sessionId}.json`),
    JSON.stringify(session, null, 2)
  );

  clearSession(projectRoot);

  console.log(`\n✓ Session ended: ${session.sessionId}`);
  console.log(`  Duration: ${Math.round((new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / 1000 / 60)} minutes`);
  console.log(`  Actions: ${session.actions.length}`);
  console.log(`  Archived to: .project/sessions/${session.sessionId}.json\n`);

  return session;
}

/**
 * Log une action dans la session courante
 */
export function logAction(options: {
  projectId: string;
  type: SessionAction['type'];
  description: string;
  data?: Record<string, unknown>;
}): SessionAction | null {
  const projectRoot = getProjectRoot();
  const session = getCurrentSession(projectRoot);

  if (!session) {
    console.log('⚠️  No active session. Start one with: start --project <id>\n');
    return null;
  }

  const action: SessionAction = {
    timestamp: new Date().toISOString(),
    type: options.type,
    description: options.description,
    data: options.data,
  };

  session.actions.push(action);
  saveSession(projectRoot, session);

  // Also log to StateManager
  const sm = getStateManager({ dataDir: path.join(projectRoot, '.project') });
  sm.logEvent(options.projectId, {
    type: options.type === 'skill_invoked' ? 'skill_invoked' : 'agent_action',
    category: options.type === 'error' ? 'system' : 'skill',
    title: options.description,
    data: {
      sessionId: session.sessionId,
      ...options.data,
    },
    severity: options.type === 'error' ? 'error' : 'info',
  });
  sm.saveProjects();

  console.log(`✓ Action logged: ${options.description}`);
  return action;
}

/**
 * Affiche le statut de la session courante
 */
export function showStatus(): void {
  const projectRoot = getProjectRoot();
  const session = getCurrentSession(projectRoot);

  if (!session) {
    console.log('\n📭 No active session.\n');
    console.log('Start one with:');
    console.log('  npx ts-node session-logger-hook.ts start --project <project-id>\n');
    return;
  }

  const duration = Math.round(
    (Date.now() - new Date(session.startTime).getTime()) / 1000 / 60
  );

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    CURRENT SESSION                           ║
╚══════════════════════════════════════════════════════════════╝

  Session ID:  ${session.sessionId}
  Project:     ${session.projectId}
  Branch:      ${session.branch}
  Started:     ${session.startTime}
  Duration:    ${duration} minutes
  Actions:     ${session.actions.length}

  Recent Actions:
${session.actions.slice(-5).map(a => `    • [${a.type}] ${a.description}`).join('\n') || '    (none yet)'}
`);
}

// ============================================================
// CLI
// ============================================================

function parseArgs(args: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2).replace(/-/g, '_');
      const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : 'true';
      result[key] = value;
      if (value !== 'true') i++;
    }
  }
  return result;
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const options = parseArgs(args.slice(1));

  switch (command) {
    case 'start':
      if (!options.project) {
        console.error('Error: --project is required');
        return;
      }
      startSession({
        projectId: options.project,
        skill: options.skill,
        description: options.description,
      });
      break;

    case 'end':
      if (!options.project) {
        console.error('Error: --project is required');
        return;
      }
      endSession({
        projectId: options.project,
        summary: options.summary,
      });
      break;

    case 'log':
      if (!options.project || !options.type || !options.description) {
        console.error('Error: --project, --type, and --description are required');
        console.log('Types: skill_invoked, task_started, task_completed, decision, error, custom');
        return;
      }
      logAction({
        projectId: options.project,
        type: options.type as SessionAction['type'],
        description: options.description,
      });
      break;

    case 'status':
      showStatus();
      break;

    default:
      console.log(`
Session Logger Hook - Track Claude sessions in real-time

Usage:
  npx ts-node session-logger-hook.ts <command> [options]

Commands:
  start    Start a new session
  end      End the current session
  log      Log an action in the current session
  status   Show current session status

Examples:
  # Start session
  npx ts-node session-logger-hook.ts start --project <id> --skill lead-dev

  # Log action
  npx ts-node session-logger-hook.ts log --project <id> --type skill_invoked --description "Analyzed codebase"

  # End session
  npx ts-node session-logger-hook.ts end --project <id> --summary "Completed feature X"

  # Check status
  npx ts-node session-logger-hook.ts status
      `);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { startSession, endSession, logAction, showStatus };
