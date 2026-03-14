#!/usr/bin/env node
/**
 * Centralized test runner for the entire .web-agency/ framework.
 *
 * Usage:
 *   node scripts/run-all-tests.js              # Run all tests
 *   node scripts/run-all-tests.js --skills-only # Only skill tests
 *   node scripts/run-all-tests.js --framework-only # Only framework tests
 *   node scripts/run-all-tests.js --skill experience-client # Single skill
 */

import { readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const args = process.argv.slice(2);
const skillsOnly = args.includes('--skills-only');
const frameworkOnly = args.includes('--framework-only');
const singleSkillIdx = args.indexOf('--skill');
const singleSkill = singleSkillIdx !== -1 ? args[singleSkillIdx + 1] : null;

let passed = 0;
let failed = 0;
let skipped = 0;
const failures = [];

function runTests(label, dir) {
  const testFiles = readdirSync(dir).filter(f => f.endsWith('.test.js'));
  if (testFiles.length === 0) {
    console.log(`  ⏭  ${label}: no test files found`);
    skipped++;
    return;
  }

  const testGlob = join(dir, '*.test.js');
  try {
    execSync(`node --test ${testGlob}`, {
      cwd: ROOT,
      stdio: 'pipe',
      timeout: 30_000
    });
    console.log(`  ✅ ${label} (${testFiles.length} test files)`);
    passed++;
  } catch (err) {
    console.log(`  ❌ ${label} FAILED`);
    const output = (err.stdout?.toString() || '') + (err.stderr?.toString() || '');
    const failLines = output.split('\n').filter(l => l.includes('not ok') || l.includes('FAIL'));
    if (failLines.length > 0) {
      failLines.slice(0, 5).forEach(l => console.log(`     ${l.trim()}`));
    }
    failures.push(label);
    failed++;
  }
}

console.log('');
console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║         Web Agency Framework - Test Runner              ║');
console.log('╚══════════════════════════════════════════════════════════╝');
console.log('');

// --- Skill tests ---
if (!frameworkOnly) {
  console.log('━━━ Skill Tests ━━━');
  const skillsDir = join(ROOT, 'skills');
  const skills = readdirSync(skillsDir)
    .filter(d => statSync(join(skillsDir, d)).isDirectory())
    .filter(d => d !== 'tests' && d !== 'docs')
    .sort();

  for (const skill of skills) {
    if (singleSkill && skill !== singleSkill) continue;

    const testsDir = join(skillsDir, skill, 'tests');
    if (!existsSync(testsDir) || !statSync(testsDir).isDirectory()) {
      if (!singleSkill) {
        skipped++;
      }
      continue;
    }
    runTests(`skill/${skill}`, testsDir);
  }
  console.log('');
}

// --- Framework tests ---
if (!skillsOnly) {
  console.log('━━━ Framework Tests ━━━');

  const frameworkTests = join(ROOT, 'orchestration-framework', 'tests');
  if (existsSync(frameworkTests)) {
    runTests('orchestration-framework', frameworkTests);
  }

  const taskOrchestratorTests = join(ROOT, 'orchestration-framework', 'task-orchestrator', 'tests');
  if (existsSync(taskOrchestratorTests)) {
    runTests('task-orchestrator', taskOrchestratorTests);
  }

  const learningsTests = join(ROOT, 'learnings', 'tests');
  if (existsSync(learningsTests)) {
    runTests('learnings', learningsTests);
  }
  console.log('');
}

// --- Summary ---
console.log('╔══════════════════════════════════════════════════════════╗');
if (failed === 0) {
  console.log(`║  ✅ All passed: ${passed} suites, ${skipped} skipped                  ║`);
} else {
  console.log(`║  ❌ ${failed} failed, ${passed} passed, ${skipped} skipped                    ║`);
  console.log('╠══════════════════════════════════════════════════════════╣');
  for (const f of failures) {
    console.log(`║  FAIL: ${f.padEnd(48)}║`);
  }
}
console.log('╚══════════════════════════════════════════════════════════╝');

process.exit(failed > 0 ? 1 : 0);
