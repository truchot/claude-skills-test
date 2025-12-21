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
 * Find all .md files recursively (with depth limit)
 */
function findMarkdownFiles(dir, files = [], depth = 0, maxDepth = 5) {
  if (depth > maxDepth) return files;

  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          findMarkdownFiles(fullPath, files, depth + 1, maxDepth);
        } else if (item.endsWith('.md')) {
          files.push(fullPath);
        }
      } catch (err) {
        console.error(`Warning: Cannot access ${fullPath}: ${err.message}`);
      }
    }
  } catch (err) {
    console.error(`Warning: Cannot read directory ${dir}: ${err.message}`);
  }
  return files;
}

/**
 * Parse YAML frontmatter (simple parser for basic key: value)
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      if (key) {
        frontmatter[key] = value;
      }
    }
  }
  return frontmatter;
}

/**
 * Validate a single agent file
 */
function validateAgent(filePath) {
  const isOrchestrator = filePath.includes('orchestrator');
  const fileErrors = [];

  let content;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    return [`Cannot read file: ${err.message}`];
  }

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
console.log('='.repeat(50));

// Check if agents directory exists
if (!fs.existsSync(AGENTS_DIR)) {
  console.error(`❌ Agents directory not found: ${AGENTS_DIR}`);
  process.exit(1);
}

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
