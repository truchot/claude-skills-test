#!/usr/bin/env node
/**
 * Test: Validate Agent Structure
 *
 * Checks that each agent file has:
 * - Valid YAML frontmatter (name, description)
 * - A main heading
 * - "Ta Responsabilité Unique" section (for non-orchestrators)
 * - "Tu NE fais PAS" section (for non-orchestrators)
 */

const fs = require('fs');
const path = require('path');

const AGENTS_DIR = path.join(__dirname, '../agents/project-management');

// Test results
let passed = 0;
let failed = 0;
const errors = [];

/**
 * Find all .md files recursively
 */
function findMarkdownFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      findMarkdownFiles(fullPath, files);
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Parse YAML frontmatter
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      frontmatter[key.trim()] = valueParts.join(':').trim();
    }
  }
  return frontmatter;
}

/**
 * Validate a single agent file
 */
function validateAgent(filePath) {
  const relativePath = path.relative(AGENTS_DIR, filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const isOrchestrator = filePath.includes('orchestrator');
  const fileErrors = [];

  // Check frontmatter
  const frontmatter = parseFrontmatter(content);
  if (!frontmatter) {
    fileErrors.push('Missing YAML frontmatter');
  } else {
    if (!frontmatter.name) {
      fileErrors.push('Missing "name" in frontmatter');
    }
    if (!frontmatter.description) {
      fileErrors.push('Missing "description" in frontmatter');
    }
  }

  // Check main heading
  if (!content.match(/^#\s+.+/m)) {
    fileErrors.push('Missing main heading (# Title)');
  }

  // Non-orchestrator specific checks
  if (!isOrchestrator) {
    // Check for "Ta Responsabilité Unique" section
    if (!content.includes('Ta Responsabilité Unique') && !content.includes('Responsabilité Unique')) {
      fileErrors.push('Missing "Ta Responsabilité Unique" section');
    }

    // Check for "Tu NE fais PAS" section
    if (!content.includes('Tu NE fais PAS') && !content.includes('Tu NE Fais PAS')) {
      fileErrors.push('Missing "Tu NE fais PAS" section');
    }
  }

  // Orchestrator specific checks
  if (isOrchestrator) {
    if (!content.includes('Règles de Routage') && !content.includes('Routage')) {
      fileErrors.push('Missing routing rules section');
    }
  }

  return fileErrors;
}

// Main execution
console.log('🧪 Validating Agent Structure\n');
console.log('=' .repeat(50));

const files = findMarkdownFiles(AGENTS_DIR);
console.log(`Found ${files.length} agent files\n`);

for (const file of files) {
  const relativePath = path.relative(AGENTS_DIR, file);
  const fileErrors = validateAgent(file);

  if (fileErrors.length === 0) {
    console.log(`✅ ${relativePath}`);
    passed++;
  } else {
    console.log(`❌ ${relativePath}`);
    for (const err of fileErrors) {
      console.log(`   └─ ${err}`);
    }
    failed++;
    errors.push({ file: relativePath, errors: fileErrors });
  }
}

console.log('\n' + '='.repeat(50));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  console.log('\n❌ Some tests failed');
  process.exit(1);
} else {
  console.log('\n✅ All tests passed');
  process.exit(0);
}
