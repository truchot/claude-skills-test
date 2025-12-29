#!/usr/bin/env node
/**
 * Migration Validation Script
 *
 * Scans the codebase for deprecated skill references and suggests updates.
 * Run this after major skill extractions or restructuring.
 *
 * Usage:
 *   node validate-migration.js [--fix]
 *
 * Options:
 *   --fix    Automatically fix simple path references (experimental)
 *
 * @module scripts/validate-migration
 */

const fs = require('fs');
const path = require('path');

// =============================================================================
// Configuration
// =============================================================================

const SKILLS_ROOT = path.join(__dirname, '..');

/**
 * Deprecated path mappings
 * Format: { old: RegExp, new: string, description: string }
 */
const DEPRECATED_PATHS = [
  // DevOps extraction (ADR-007)
  {
    old: /backend-developer\/devops/g,
    new: 'devops',
    description: 'DevOps extracted to standalone skill (v1.0.0)',
    since: '2025-12-28'
  },
  {
    old: /backend-developer\/agents\/devops/g,
    new: 'devops/agents',
    description: 'DevOps agents moved to devops skill',
    since: '2025-12-28'
  },
  // Add future migrations here
  // {
  //   old: /some-skill\/old-path/g,
  //   new: 'new-skill/new-path',
  //   description: 'Description of change',
  //   since: 'YYYY-MM-DD'
  // },
];

/**
 * Files/directories to exclude from scanning
 */
const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /CHANGELOG\.md$/,  // Changelogs document old paths intentionally
  /VERSIONING\.md$/, // Versioning docs may reference old paths
  /validate-migration\.js$/, // This script
];

// =============================================================================
// Helpers
// =============================================================================

/**
 * Find all markdown and config files recursively
 */
function findFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Skip excluded patterns
    if (EXCLUDE_PATTERNS.some(pattern => pattern.test(fullPath))) {
      continue;
    }

    if (entry.isDirectory()) {
      findFiles(fullPath, files);
    } else if (
      entry.name.endsWith('.md') ||
      entry.name.endsWith('.yml') ||
      entry.name.endsWith('.yaml') ||
      entry.name.endsWith('.json') ||
      entry.name.endsWith('.js')
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Context patterns that indicate intentional historical references
 * Lines matching these are not flagged as issues
 */
const CONTEXT_EXCLUSIONS = [
  /extraction/i,           // "Extraction depuis..."
  /extracted from/i,       // "Extracted from..."
  /migrated from/i,        // "Migrated from..."
  /moved from/i,           // "Moved from..."
  /suppression.*doublon/i, // "Suppression du doublon..."
  /migration notes/i,      // Migration documentation
  /<!-- legacy -->/i,      // Explicit legacy marker
];

/**
 * Scan file for deprecated references
 */
function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const issues = [];

  for (const mapping of DEPRECATED_PATHS) {
    let realMatches = 0;

    // Check each line for the pattern
    for (const line of lines) {
      if (mapping.old.test(line)) {
        // Skip if line contains context exclusion (migration documentation)
        const isContextual = CONTEXT_EXCLUSIONS.some(ctx => ctx.test(line));
        if (!isContextual) {
          realMatches++;
        }
      }
    }

    if (realMatches > 0) {
      issues.push({
        file: filePath,
        pattern: mapping.old.source,
        replacement: mapping.new,
        description: mapping.description,
        since: mapping.since,
        count: realMatches
      });
    }
  }

  return issues;
}

/**
 * Fix deprecated references in file
 */
function fixFile(filePath, dryRun = false) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  for (const mapping of DEPRECATED_PATHS) {
    if (mapping.old.test(content)) {
      content = content.replace(mapping.old, mapping.new);
      modified = true;
    }
  }

  if (modified && !dryRun) {
    fs.writeFileSync(filePath, content);
  }

  return modified;
}

// =============================================================================
// Main
// =============================================================================

console.log('');
console.log('='.repeat(60));
console.log('  Migration Validation Script');
console.log('='.repeat(60));
console.log('');

const args = process.argv.slice(2);
const shouldFix = args.includes('--fix');
const dryRun = args.includes('--dry-run');

if (shouldFix) {
  console.log('  Mode: FIX (will modify files)');
} else if (dryRun) {
  console.log('  Mode: DRY-RUN (show what would be fixed)');
} else {
  console.log('  Mode: SCAN (read-only)');
}
console.log('');

// Find all files
console.log('  Scanning for deprecated references...');
const files = findFiles(SKILLS_ROOT);
console.log(`  Found ${files.length} files to scan`);
console.log('');

// Scan for issues
const allIssues = [];
for (const file of files) {
  const issues = scanFile(file);
  allIssues.push(...issues);
}

// Report results
if (allIssues.length === 0) {
  console.log('  [OK] No deprecated references found!');
  console.log('');
  console.log('  Your codebase is up to date with all migrations.');
  console.log('');
  process.exit(0);
}

console.log(`  [WARN] Found ${allIssues.length} deprecated reference(s)`);
console.log('');

// Group by file
const byFile = {};
for (const issue of allIssues) {
  if (!byFile[issue.file]) {
    byFile[issue.file] = [];
  }
  byFile[issue.file].push(issue);
}

// Print report
console.log('-'.repeat(60));
console.log('  DEPRECATED REFERENCES');
console.log('-'.repeat(60));
console.log('');

for (const [file, issues] of Object.entries(byFile)) {
  const relativePath = path.relative(SKILLS_ROOT, file);
  console.log(`  File: ${relativePath}`);

  for (const issue of issues) {
    console.log(`    [!] ${issue.pattern}`);
    console.log(`        → Replace with: ${issue.replacement}`);
    console.log(`        Reason: ${issue.description}`);
    console.log(`        Since: ${issue.since}`);
    console.log(`        Occurrences: ${issue.count}`);
    console.log('');
  }
}

// Fix if requested
if (shouldFix || dryRun) {
  console.log('-'.repeat(60));
  console.log(dryRun ? '  WOULD FIX (dry-run)' : '  FIXING');
  console.log('-'.repeat(60));
  console.log('');

  let fixedCount = 0;
  for (const file of Object.keys(byFile)) {
    const relativePath = path.relative(SKILLS_ROOT, file);
    const wasFixed = fixFile(file, dryRun);
    if (wasFixed) {
      console.log(`  ${dryRun ? '[WOULD FIX]' : '[FIXED]'} ${relativePath}`);
      fixedCount++;
    }
  }

  console.log('');
  console.log(`  ${dryRun ? 'Would fix' : 'Fixed'} ${fixedCount} file(s)`);
}

console.log('');
console.log('-'.repeat(60));
console.log('  MIGRATION GUIDE');
console.log('-'.repeat(60));
console.log('');
console.log('  The following skill extractions have occurred:');
console.log('');

const uniqueMappings = new Map();
for (const issue of allIssues) {
  uniqueMappings.set(issue.pattern, issue);
}

for (const [pattern, issue] of uniqueMappings) {
  console.log(`  ${pattern}`);
  console.log(`    → ${issue.replacement}`);
  console.log(`    ${issue.description}`);
  console.log('');
}

console.log('  For more details, see:');
console.log('  - .claude/skills/VERSIONING.md');
console.log('  - .claude/skills/devops/CHANGELOG.md');
console.log('');

process.exit(allIssues.length > 0 ? 1 : 0);
