#!/usr/bin/env node
/**
 * Test: Validate Routing Consistency
 *
 * Checks that orchestrators reference agents that actually exist
 */

const fs = require('fs');
const path = require('path');

const AGENTS_DIR = path.join(__dirname, '../agents/project-management');

let passed = 0;
let failed = 0;

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
 * Get all agent names from file paths
 */
function getAgentNames(files) {
  const agents = new Set();
  for (const file of files) {
    const relativePath = path.relative(AGENTS_DIR, file);
    // Extract agent name: "pilotage/creation-planning.md" -> "creation-planning"
    const name = path.basename(file, '.md');
    agents.add(name);

    // Also add with subdomain prefix: "pilotage/creation-planning"
    const dir = path.dirname(relativePath);
    if (dir !== '.') {
      agents.add(`${dir}/${name}`);
    }
  }
  return agents;
}

/**
 * Extract agent references from orchestrator content
 */
function extractAgentReferences(content) {
  const references = [];

  // Match patterns like: `agent-name` or → agent-name or | `agent-name`
  const patterns = [
    /`([a-z-]+)`/g,                           // `agent-name`
    /→\s*([a-z-]+\/[a-z-]+)/g,                // → subdir/agent-name
    /\|\s*`([a-z-]+\/[a-z-]+)`/g,             // | `subdir/agent-name`
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const ref = match[1];
      // Skip common non-agent references
      if (!['orchestrator', 'templates', 'docs', 'agents'].includes(ref)) {
        references.push(ref);
      }
    }
  }

  return [...new Set(references)];
}

/**
 * Validate orchestrator routing
 */
function validateOrchestrator(filePath, existingAgents) {
  const relativePath = path.relative(AGENTS_DIR, filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const references = extractAgentReferences(content);
  const errors = [];

  for (const ref of references) {
    // Check if the referenced agent exists
    const agentName = ref.includes('/') ? path.basename(ref) : ref;

    if (!existingAgents.has(agentName) && !existingAgents.has(ref)) {
      // Special case: check if it's a subdir reference
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
console.log('='.repeat(50));

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

console.log('\n' + '='.repeat(50));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  console.log('\n❌ Some routing tests failed');
  process.exit(1);
} else {
  console.log('\n✅ All routing tests passed');
  process.exit(0);
}
