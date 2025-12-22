#!/usr/bin/env node
/**
 * Test: Validate Agent Structure
 *
 * Validates that each technical agent file follows the required structure:
 * - Valid YAML frontmatter with name and description
 * - Main heading (H1)
 * - Minimum content length
 *
 * @module tests/validate-agents
 */

const path = require('path');
const {
  findMarkdownFiles,
  safeReadFile,
  parseFrontmatter,
  directoryExists,
  printSeparator,
  countTechElements
} = require('./utils');
const { SKILL_ROOT, DOMAINS, AGENT_REQUIREMENTS } = require('./config');

let passed = 0;
let failed = 0;
let totalAgents = 0;

/**
 * Validate a single agent file
 *
 * @param {string} filePath - Path to the agent file
 * @returns {string[]} Array of error messages
 */
function validateAgent(filePath) {
  const fileErrors = [];

  const { content, error } = safeReadFile(filePath);
  if (error) {
    return [error];
  }

  // Check frontmatter
  const frontmatter = parseFrontmatter(content);
  if (!frontmatter) {
    fileErrors.push('Missing YAML frontmatter');
  } else {
    for (const field of AGENT_REQUIREMENTS.frontmatter) {
      if (!frontmatter[field]) {
        fileErrors.push(`Missing "${field}" in frontmatter`);
      }
    }
  }

  // Check main heading
  if (!content.match(/^#\s+.+/m)) {
    fileErrors.push('Missing main heading (# Title)');
  }

  // Check minimum content length
  if (content.length < AGENT_REQUIREMENTS.minContentLength) {
    fileErrors.push(`Content too short (< ${AGENT_REQUIREMENTS.minContentLength} characters)`);
  }

  return fileErrors;
}

// Main execution
console.log('🧪 Validating Technical Agent Structure\n');
printSeparator();

// Validate domain agents
for (const domain of DOMAINS) {
  const domainDir = path.join(SKILL_ROOT, domain);

  if (!directoryExists(domainDir)) {
    console.log(`⚠️  Domain directory not found: ${domain}`);
    continue;
  }

  console.log(`\n📁 Domain: ${domain}`);

  const files = findMarkdownFiles(domainDir);
  totalAgents += files.length;

  for (const file of files) {
    const relativePath = path.relative(SKILL_ROOT, file);
    const fileErrors = validateAgent(file);

    if (fileErrors.length === 0) {
      console.log(`  ✅ ${relativePath}`);
      passed++;
    } else {
      console.log(`  ❌ ${relativePath}`);
      for (const err of fileErrors) {
        console.log(`     └─ ${err}`);
      }
      failed++;
    }
  }
}

console.log('\n');
printSeparator();
console.log(`\n📊 Results: ${passed} passed, ${failed} failed (${totalAgents} total agents)`);

if (failed > 0) {
  console.log('\n❌ Some tests failed');
  process.exit(1);
} else {
  console.log('\n✅ All tests passed');
  process.exit(0);
}
