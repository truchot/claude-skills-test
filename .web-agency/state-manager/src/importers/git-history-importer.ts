#!/usr/bin/env node
/**
 * Git History Importer
 *
 * Reconstruit l'historique d'un projet à partir des commits Git
 * Permet de brancher le StateManager sur un projet où Claude a déjà travaillé
 *
 * Usage:
 *   npx ts-node git-history-importer.ts [options]
 *
 * Options:
 *   --project-name    Nom du projet à créer
 *   --client-name     Nom du client
 *   --client-email    Email du client
 *   --since           Date de début (ex: 2024-01-01)
 *   --branch          Branche à analyser (défaut: toutes)
 */

import * as fs from 'fs';
import * as path from 'path';
import { execFileSync } from 'child_process';
import { getStateManager } from '../StateManager';
import {
  ProjectStatus,
  TaskStatus,
  TaskPriority,
  EventType,
} from '../../types/project';

// ============================================================
// SECURITY HELPERS
// ============================================================

/**
 * Validate that a string is a safe git ref (branch name, hash, etc.)
 * Prevents command injection via malicious ref names
 */
function isValidGitRef(ref: string): boolean {
  // Git refs can contain: alphanumeric, -, _, /, .
  // Must not contain: shell metacharacters, spaces, control chars
  const safeRefPattern = /^[a-zA-Z0-9._\/-]+$/;
  return safeRefPattern.test(ref) && ref.length < 256;
}

/**
 * Validate ISO date format (YYYY-MM-DD)
 */
function isValidDateString(date: string): boolean {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  return datePattern.test(date);
}

/**
 * Sanitize string for safe logging (remove potential injection)
 */
function sanitizeForLog(str: string): string {
  return str.replace(/[^\w\s@._\-\/]/g, '').slice(0, 200);
}

// ============================================================
// TYPES
// ============================================================

interface GitCommit {
  hash: string;
  shortHash: string;
  author: string;
  email: string;
  date: string;
  message: string;
  branch?: string;
  files: string[];
}

interface GitBranch {
  name: string;
  isRemote: boolean;
  isClaude: boolean;
  lastCommit: string;
}

interface ImportResult {
  projectId: string;
  commitsImported: number;
  eventsCreated: number;
  tasksInferred: number;
  sessionsDetected: ClaudeSession[];
}

interface ClaudeSession {
  branch: string;
  startDate: string;
  endDate: string;
  commits: number;
  description: string;
}

// ============================================================
// GIT HELPERS (Secure - using execFileSync with array args)
// ============================================================

/**
 * Execute git command safely using execFileSync with array arguments
 * This prevents command injection attacks
 */
function execGitSafe(args: string[]): string {
  try {
    return execFileSync('git', args, {
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024,
    }).trim();
  } catch (error) {
    console.error(`Git command failed: git ${args.join(' ')}`);
    return '';
  }
}

function getProjectRoot(): string {
  return execGitSafe(['rev-parse', '--show-toplevel']);
}

function getAllBranches(): GitBranch[] {
  const output = execGitSafe([
    'branch', '-a',
    '--format=%(refname:short)|%(objectname:short)'
  ]);
  if (!output) return [];

  return output.split('\n').map(line => {
    const [name, lastCommit] = line.split('|');
    return {
      name,
      isRemote: name.startsWith('remotes/') || name.startsWith('origin/'),
      isClaude: name.includes('claude/'),
      lastCommit,
    };
  });
}

function getCommits(options: { since?: string; branch?: string } = {}): GitCommit[] {
  const args: string[] = [
    'log',
    '--format=%H|%h|%an|%ae|%aI|%s',
    '--name-only'
  ];

  // Only add --all if no specific branch
  if (!options.branch) {
    args.push('--all');
  }

  // Validate and add since date (prevent injection)
  if (options.since) {
    if (!isValidDateString(options.since)) {
      console.error('Invalid date format. Use YYYY-MM-DD');
      return [];
    }
    args.push(`--since=${options.since}`);
  }

  // Validate and add branch (prevent injection)
  if (options.branch) {
    if (!isValidGitRef(options.branch)) {
      console.error('Invalid branch name');
      return [];
    }
    args.push(options.branch);
  }

  const output = execGitSafe(args);
  if (!output) return [];

  const commits: GitCommit[] = [];
  const blocks = output.split('\n\n');

  for (const block of blocks) {
    const lines = block.split('\n');
    if (lines.length === 0) continue;

    const firstLine = lines[0];
    const parts = firstLine.split('|');

    if (parts.length >= 6) {
      commits.push({
        hash: parts[0],
        shortHash: parts[1],
        author: parts[2],
        email: parts[3],
        date: parts[4],
        message: parts.slice(5).join('|'),
        files: lines.slice(1).filter(f => f.trim()),
      });
    }
  }

  return commits;
}

function getCommitBranches(hash: string): string[] {
  // Validate hash to prevent injection
  if (!isValidGitRef(hash)) {
    console.error('Invalid commit hash');
    return [];
  }

  const output = execGitSafe([
    'branch', '-a',
    '--contains', hash,
    '--format=%(refname:short)'
  ]);
  return output ? output.split('\n').filter(b => b.trim()) : [];
}

// ============================================================
// ANALYSIS HELPERS
// ============================================================

function detectClaudeSessions(branches: GitBranch[], commits: GitCommit[]): ClaudeSession[] {
  const claudeBranches = branches.filter(b => b.isClaude);
  const sessions: ClaudeSession[] = [];

  for (const branch of claudeBranches) {
    // Récupérer les commits de cette branche
    const branchCommits = commits.filter(c => {
      const commitBranches = getCommitBranches(c.shortHash);
      return commitBranches.some(b => b.includes(branch.name));
    });

    if (branchCommits.length === 0) continue;

    // Trier par date
    branchCommits.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Extraire la description depuis le nom de branche
    // Format: claude/action-description-sessionId
    const nameParts = branch.name.replace('claude/', '').split('-');
    const description = nameParts.slice(0, -1).join(' ') || 'Claude session';

    sessions.push({
      branch: branch.name,
      startDate: branchCommits[0].date,
      endDate: branchCommits[branchCommits.length - 1].date,
      commits: branchCommits.length,
      description: description.replace(/-/g, ' '),
    });
  }

  return sessions.sort((a, b) =>
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
}

function inferPhaseFromCommit(commit: GitCommit): ProjectStatus {
  const message = commit.message.toLowerCase();
  const files = commit.files.join(' ').toLowerCase();

  // Design phase
  if (
    message.includes('design') ||
    message.includes('ui') ||
    message.includes('ux') ||
    files.includes('.figma') ||
    files.includes('design')
  ) {
    return ProjectStatus.DESIGN;
  }

  // Development phase
  if (
    message.includes('feat') ||
    message.includes('add') ||
    message.includes('implement') ||
    files.includes('.ts') ||
    files.includes('.js') ||
    files.includes('.tsx')
  ) {
    return ProjectStatus.DEVELOPMENT;
  }

  // Testing phase
  if (
    message.includes('test') ||
    message.includes('spec') ||
    files.includes('.test.') ||
    files.includes('.spec.')
  ) {
    return ProjectStatus.TESTING;
  }

  // Deployment phase
  if (
    message.includes('deploy') ||
    message.includes('release') ||
    message.includes('publish') ||
    files.includes('dockerfile') ||
    files.includes('.yaml')
  ) {
    return ProjectStatus.DEPLOYED;
  }

  // Documentation/Planning
  if (
    message.includes('doc') ||
    message.includes('readme') ||
    message.includes('plan') ||
    files.includes('.md')
  ) {
    return ProjectStatus.PLANNING;
  }

  // Fix = maintenance or development
  if (message.includes('fix') || message.includes('bug')) {
    return ProjectStatus.DEVELOPMENT;
  }

  return ProjectStatus.DEVELOPMENT;
}

function inferSkillFromCommit(commit: GitCommit): string | undefined {
  const message = commit.message.toLowerCase();
  const files = commit.files.join(' ').toLowerCase();

  // Skills techniques
  if (files.includes('frontend') || files.includes('component')) return 'frontend-developer';
  if (files.includes('backend') || files.includes('api')) return 'backend-developer';
  if (files.includes('devops') || files.includes('deploy')) return 'devops-deployment';
  if (files.includes('wordpress') || files.includes('gutenberg')) return 'wordpress-gutenberg-expert';
  if (files.includes('nextjs') || files.includes('next.config')) return 'nextjs-expert';
  if (files.includes('react')) return 'react-expert';

  // Skills stratégiques
  if (files.includes('direction-technique')) return 'direction-technique';
  if (files.includes('marketing')) return 'direction-marketing';
  if (files.includes('design') || files.includes('ui')) return 'ux-ui-design';

  // Par défaut selon le type de commit
  if (message.includes('feat') || message.includes('add')) return 'lead-dev';
  if (message.includes('fix')) return 'lead-dev';
  if (message.includes('doc')) return 'direction-technique';
  if (message.includes('test')) return 'testing-process';

  return undefined;
}

function inferTaskPriority(commit: GitCommit): TaskPriority {
  const message = commit.message.toLowerCase();

  if (message.includes('critical') || message.includes('urgent') || message.includes('hotfix')) {
    return TaskPriority.CRITICAL;
  }
  if (message.includes('important') || message.includes('major')) {
    return TaskPriority.HIGH;
  }
  if (message.includes('minor') || message.includes('small')) {
    return TaskPriority.LOW;
  }

  return TaskPriority.MEDIUM;
}

// ============================================================
// MAIN IMPORT FUNCTION
// ============================================================

export async function importFromGitHistory(options: {
  projectName: string;
  clientName: string;
  clientEmail: string;
  since?: string;
  branch?: string;
  dataDir?: string;
}): Promise<ImportResult> {
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║           Git History Importer v1.0.0                        ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  const projectRoot = getProjectRoot();
  const dataDir = options.dataDir || path.join(projectRoot, '.project');

  // Initialize StateManager
  const sm = getStateManager({ dataDir });

  console.log(`📁 Project root: ${projectRoot}`);
  console.log(`💾 Data directory: ${dataDir}\n`);

  // Get git data
  console.log('🔍 Analyzing git history...');
  const branches = getAllBranches();
  const commits = getCommits({ since: options.since, branch: options.branch });

  console.log(`   Found ${branches.length} branches`);
  console.log(`   Found ${commits.length} commits`);

  // Detect Claude sessions
  const claudeSessions = detectClaudeSessions(branches, commits);
  console.log(`   Detected ${claudeSessions.length} Claude sessions\n`);

  // Create project
  console.log('📦 Creating project...');
  const project = sm.createProject({
    name: options.projectName,
    description: `Imported from git history on ${new Date().toISOString()}`,
    client: {
      name: options.clientName,
      email: options.clientEmail,
    },
    tags: ['imported', 'git-history'],
  });

  // Determine current phase from latest commits
  if (commits.length > 0) {
    const latestPhase = inferPhaseFromCommit(commits[0]);
    sm.updateProject(project.id, { status: latestPhase });
  }

  // Import commits as events and infer tasks
  console.log('📝 Importing commits as events...\n');
  let eventsCreated = 0;
  let tasksInferred = 0;
  const processedTasks = new Set<string>();

  for (const commit of commits) {
    // Log commit as event
    sm.logEvent(project.id, {
      type: 'custom',
      category: 'project',
      title: `[${commit.shortHash}] ${commit.message}`,
      description: `Author: ${commit.author} <${commit.email}>\nFiles: ${commit.files.slice(0, 5).join(', ')}`,
      skill: inferSkillFromCommit(commit),
      data: {
        hash: commit.hash,
        author: commit.author,
        files: commit.files,
      },
    });
    eventsCreated++;

    // Create task from commit if it looks like a feature/fix
    const message = commit.message.toLowerCase();
    if (
      (message.startsWith('feat') ||
        message.startsWith('fix') ||
        message.startsWith('add')) &&
      !processedTasks.has(commit.message)
    ) {
      sm.createTask(project.id, {
        title: commit.message,
        description: `Imported from commit ${commit.shortHash}`,
        priority: inferTaskPriority(commit),
        assignedSkill: inferSkillFromCommit(commit),
      });

      // Mark as done (it's historical)
      const task = project.tasks[project.tasks.length - 1];
      sm.updateTask(project.id, task.id, {
        status: TaskStatus.DONE,
      });

      processedTasks.add(commit.message);
      tasksInferred++;
    }
  }

  // Import Claude sessions as milestone events
  for (const session of claudeSessions) {
    sm.logEvent(project.id, {
      type: 'milestone_reached',
      category: 'project',
      title: `Claude Session: ${session.description}`,
      description: `Branch: ${session.branch}\nCommits: ${session.commits}`,
      data: {
        branch: session.branch,
        startDate: session.startDate,
        endDate: session.endDate,
        commits: session.commits,
      },
    });
    eventsCreated++;
  }

  // Save
  sm.saveProjects();

  // Results
  const result: ImportResult = {
    projectId: project.id,
    commitsImported: commits.length,
    eventsCreated,
    tasksInferred,
    sessionsDetected: claudeSessions,
  };

  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║                    IMPORT COMPLETE                           ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log(`
  Project ID:      ${result.projectId}
  Commits:         ${result.commitsImported}
  Events created:  ${result.eventsCreated}
  Tasks inferred:  ${result.tasksInferred}
  Claude sessions: ${result.sessionsDetected.length}
  `);

  if (claudeSessions.length > 0) {
    console.log('  Detected Claude Sessions:');
    claudeSessions.forEach((s, i) => {
      console.log(`    ${i + 1}. ${s.branch}`);
      console.log(`       ${s.commits} commits (${s.startDate.split('T')[0]} - ${s.endDate.split('T')[0]})`);
    });
  }

  console.log(`\n  Data saved to: ${dataDir}/projects.json\n`);

  return result;
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
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    console.log(`
Git History Importer - Import existing project history into StateManager

Usage:
  npx ts-node git-history-importer.ts [options]

Required:
  --project-name    Project name to create
  --client-name     Client name
  --client-email    Client email

Optional:
  --since           Only import commits after this date (YYYY-MM-DD)
  --branch          Only import from specific branch
  --data-dir        Custom data directory (default: .project/)

Example:
  npx ts-node git-history-importer.ts \\
    --project-name "Web Agency Skills" \\
    --client-name "Internal" \\
    --client-email "dev@example.com" \\
    --since "2024-01-01"
    `);
    return;
  }

  if (!args.project_name || !args.client_name || !args.client_email) {
    console.error('Error: --project-name, --client-name, and --client-email are required');
    console.log('Use --help for usage information');
    process.exit(1);
  }

  await importFromGitHistory({
    projectName: args.project_name,
    clientName: args.client_name,
    clientEmail: args.client_email,
    since: args.since,
    branch: args.branch,
    dataDir: args.data_dir,
  });
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

export default importFromGitHistory;
