#!/usr/bin/env node
/**
 * Test: Validate Agent Structure
 *
 * Validates that each technical agent file follows the required structure:
 * - Valid YAML frontmatter with name and description
 * - Main heading (H1)
 * - Minimum content length (different thresholds for orchestrators vs agents)
 * - Expected sections based on agent type
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
let warnings = 0;
let totalAgents = 0;

/**
 * Validate a single agent file
 *
 * @param {string} filePath - Path to the agent file
 * @returns {{ errors: string[], warnings: string[] }} Validation results
 */
function validateAgent(filePath) {
  const errors = [];
  const warns = [];
  const isOrchestrator = filePath.includes('orchestrator');

  const { content, error } = safeReadFile(filePath);
  if (error) {
    return { errors: [error], warnings: [] };
  }

  // Check frontmatter
  const frontmatter = parseFrontmatter(content);
  if (!frontmatter) {
    errors.push('Missing YAML frontmatter');
  } else {
    for (const field of AGENT_REQUIREMENTS.frontmatter) {
      if (!frontmatter[field]) {
        errors.push(`Missing "${field}" in frontmatter`);
      }
    }
  }

  // Check main heading
  if (!content.match(/^#\s+.+/m)) {
    errors.push('Missing main heading (# Title)');
  }

  // Check minimum content length - different thresholds
  const minLength = isOrchestrator
    ? AGENT_REQUIREMENTS.minOrchestratorLength
    : AGENT_REQUIREMENTS.minAgentLength;

  if (content.length < minLength) {
    errors.push(`Content too short (${content.length} < ${minLength} chars for ${isOrchestrator ? 'orchestrator' : 'agent'})`);
  }

  // Check expected sections based on type
  if (isOrchestrator) {
    for (const section of AGENT_REQUIREMENTS.orchestratorSections || []) {
      if (!content.includes(section)) {
        warns.push(`Missing recommended section: "${section}"`);
      }
    }
  }

  // Check for code blocks or tables (quality indicator)
  const techElements = countTechElements(content);
  if (techElements.codeBlocks === 0 && techElements.tables === 0) {
    warns.push('No code blocks or tables found');
  }

  return { errors, warnings: warns };
}

// Main execution
console.log('🧪 Validating Direction Technique Agent Structure\n');
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
    const { errors, warnings: fileWarnings } = validateAgent(file);

    if (errors.length === 0) {
      if (fileWarnings.length === 0) {
        console.log(`  ✅ ${relativePath}`);
      } else {
        console.log(`  ✅ ${relativePath} (${fileWarnings.length} warning${fileWarnings.length > 1 ? 's' : ''})`);
        warnings += fileWarnings.length;
      }
      passed++;
    } else {
      console.log(`  ❌ ${relativePath}`);
      for (const err of errors) {
        console.log(`     └─ ${err}`);
      }
      failed++;
    }
  }
}

console.log('\n');
printSeparator();
console.log(`\n📊 Results: ${passed} passed, ${failed} failed, ${warnings} warnings (${totalAgents} total agents)`);

// Show thresholds used
console.log('\n📏 Content Length Thresholds:');
console.log(`   Orchestrators: ${AGENT_REQUIREMENTS.minOrchestratorLength} chars`);
console.log(`   Agents: ${AGENT_REQUIREMENTS.minAgentLength} chars`);

if (failed > 0) {
  console.log('\n❌ Some tests failed');
  process.exit(1);
} else {
  console.log('\n✅ All tests passed');
  process.exit(0);
}
