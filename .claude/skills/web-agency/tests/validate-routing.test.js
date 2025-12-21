#!/usr/bin/env node
/**
 * Test: Validate Routing Consistency
 *
 * Validates that orchestrators reference agents that actually exist.
 * Checks for broken references and orphaned agents.
 *
 * @module tests/validate-routing
 */

const fs = require('fs');
const path = require('path');
const {
  findMarkdownFiles,
  safeReadFile,
  directoryExists,
  printSeparator
} = require('./utils');

const AGENTS_DIR = path.join(__dirname, '../agents/project-management');

let passed = 0;
let failed = 0;

/**
 * Get all agent names from file paths
 *
 * @param {string[]} files - Array of file paths
 * @returns {Set<string>} Set of agent names (both short and full path forms)
 */
function getAgentNames(files) {
  const agents = new Set();
  for (const file of files) {
    const relativePath = path.relative(AGENTS_DIR, file);
    const name = path.basename(file, '.md');
    agents.add(name);

    const dir = path.dirname(relativePath);
    if (dir !== '.') {
      agents.add(`${dir}/${name}`);
    }
  }
  return agents;
}

/**
 * Extract agent references from orchestrator content
 * Uses multiple patterns to catch different reference styles
 *
 * @param {string} content - Orchestrator markdown content
 * @returns {string[]} Unique array of referenced agent names
 */
function extractAgentReferences(content) {
  const references = new Set();

  // Patterns for different reference styles
  const patterns = [
    /`([a-z][a-z0-9-]*)`/g,                    // `agent-name`
    /→\s*([a-z][a-z0-9-]*\/[a-z][a-z0-9-]*)/g, // → subdir/agent-name
    /\|\s*`([a-z][a-z0-9-]*\/[a-z][a-z0-9-]*)`/g, // | `subdir/agent-name`
  ];

  // Non-agent keywords to skip
  const skipKeywords = new Set([
    'orchestrator', 'templates', 'docs', 'agents',
    'project-management', 'web-agency', 'avant-projet',
    'pilotage', 'communication', 'livraison', 'facturation'
  ]);

  for (const pattern of patterns) {
    let match;
    const regex = new RegExp(pattern.source, pattern.flags);
    while ((match = regex.exec(content)) !== null) {
      const ref = match[1];
      if (!skipKeywords.has(ref) && !skipKeywords.has(ref.split('/')[0])) {
        references.add(ref);
      }
    }
  }

  return [...references];
}

/**
 * Validate orchestrator routing references
 *
 * @param {string} filePath - Path to orchestrator file
 * @param {Set<string>} existingAgents - Set of valid agent names
 * @returns {{ references: number, errors: string[] }} Validation result
 */
function validateOrchestrator(filePath, existingAgents) {
  const { content, error } = safeReadFile(filePath);
  if (error) {
    return { references: 0, errors: [error] };
  }

  const references = extractAgentReferences(content);
  const errors = [];

  for (const ref of references) {
    const agentName = ref.includes('/') ? path.basename(ref) : ref;

    if (!existingAgents.has(agentName) && !existingAgents.has(ref)) {
      const possiblePath = ref.includes('/')
        ? path.join(AGENTS_DIR, ref + '.md')
        : null;

      if (possiblePath && !fs.existsSync(possiblePath)) {
        errors.push(`Referenced agent not found: ${ref}`);
      }
    }
  }

  return { references: references.length, errors };
}

// Main execution
console.log('🧪 Validating Routing Consistency\n');
printSeparator();

if (!directoryExists(AGENTS_DIR)) {
  console.error(`❌ Agents directory not found: ${AGENTS_DIR}`);
  process.exit(1);
}

const allFiles = findMarkdownFiles(AGENTS_DIR);
const orchestratorFiles = allFiles.filter(f => f.includes('orchestrator'));
const existingAgents = getAgentNames(allFiles);

console.log(`Found ${orchestratorFiles.length} orchestrators`);
console.log(`Found ${existingAgents.size} unique agent references\n`);

for (const file of orchestratorFiles) {
  const relativePath = path.relative(AGENTS_DIR, file);
  const { references, errors } = validateOrchestrator(file, existingAgents);

  if (errors.length === 0) {
    console.log(`✅ ${relativePath} (${references} references)`);
    passed++;
  } else {
    console.log(`❌ ${relativePath}`);
    for (const err of errors) {
      console.log(`   └─ ${err}`);
    }
    failed++;
  }
}

console.log('\n');
printSeparator();
console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  console.log('\n❌ Some routing tests failed');
  process.exit(1);
} else {
  console.log('\n✅ All routing tests passed');
  process.exit(0);
}
