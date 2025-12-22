#!/usr/bin/env node
/**
 * Test: Validate Routing Logic
 *
 * Validates that:
 * - All agents referenced in routing rules exist
 * - All orchestrators have valid routing tables
 * - Agent references in SKILL.md point to existing files
 *
 * @module tests/validate-routing
 */

const path = require('path');
const {
  safeReadFile,
  fileExists,
  directoryExists,
  findMarkdownFiles,
  printSeparator
} = require('./utils');
const { SKILL_ROOT, DOMAINS, EXPECTED_AGENTS_PER_DOMAIN } = require('./config');

let passed = 0;
let failed = 0;
const issues = [];

console.log('🧪 Validating Routing Logic\n');
printSeparator();

// Build a map of all existing agents
const existingAgents = new Set();

for (const domain of DOMAINS) {
  const domainDir = path.join(SKILL_ROOT, domain);
  if (directoryExists(domainDir)) {
    const files = findMarkdownFiles(domainDir);
    for (const file of files) {
      const agentName = path.basename(file, '.md');
      existingAgents.add(`${domain}/${agentName}`);
      existingAgents.add(agentName); // Also add without domain prefix
    }
  }
}

console.log(`\n📋 Found ${existingAgents.size} agent references\n`);

// 1. Validate SKILL.md routing references
console.log('1. SKILL.md Agent References');
const skillMdPath = path.join(SKILL_ROOT, 'SKILL.md');
const { content: skillContent, error: skillError } = safeReadFile(skillMdPath);

if (skillError) {
  console.log(`   ❌ Cannot read SKILL.md: ${skillError}`);
  issues.push(`Cannot read SKILL.md: ${skillError}`);
  failed++;
} else if (skillContent) {
  // Extract agent references like `domain/agent` or `agent`
  // Pattern supports: lowercase letters, numbers, and hyphens (kebab-case with optional numbers)
  // Examples: `qualite/code-review`, `architecture/adr-001`, `poc-spike`
  const agentRefPattern = /`([a-z0-9-]+\/[a-z0-9-]+)`|`([a-z0-9-]+)`/g;
  const references = new Set();
  let match;

  while ((match = agentRefPattern.exec(skillContent)) !== null) {
    const ref = match[1] || match[2];
    // Filter out non-agent references (skills, keywords)
    if (ref && !ref.includes(' ') && ref.length > 2) {
      references.add(ref);
    }
  }

  // Check domain/agent references
  let validRefs = 0;
  let invalidRefs = [];

  for (const ref of references) {
    if (ref.includes('/')) {
      // Domain/agent format
      const [domain, agent] = ref.split('/');
      if (DOMAINS.includes(domain)) {
        const agentPath = path.join(SKILL_ROOT, domain, `${agent}.md`);
        if (fileExists(agentPath)) {
          validRefs++;
        } else {
          invalidRefs.push(ref);
        }
      }
    }
  }

  if (invalidRefs.length === 0) {
    console.log(`   ✅ All domain/agent references valid`);
    passed++;
  } else {
    console.log(`   ❌ Invalid references found:`);
    for (const ref of invalidRefs.slice(0, 5)) {
      console.log(`      - ${ref}`);
    }
    if (invalidRefs.length > 5) {
      console.log(`      ... and ${invalidRefs.length - 5} more`);
    }
    issues.push(`Invalid agent references: ${invalidRefs.join(', ')}`);
    failed++;
  }
}

// 2. Validate orchestrator routing tables
console.log('\n2. Orchestrator Routing Tables');

for (const domain of DOMAINS) {
  const orchestratorPath = path.join(SKILL_ROOT, domain, 'orchestrator.md');

  if (!fileExists(orchestratorPath)) {
    console.log(`   ⚠️  ${domain}/orchestrator.md not found`);
    continue;
  }

  const { content, error } = safeReadFile(orchestratorPath);
  if (error) {
    console.log(`   ❌ ${domain}/orchestrator.md: ${error}`);
    issues.push(`Cannot read ${domain}/orchestrator.md: ${error}`);
    failed++;
    continue;
  }
  if (!content) continue;

  // Extract agent references from routing tables
  // Pattern supports: lowercase letters, numbers, and hyphens (kebab-case)
  const tablePattern = /\|\s*`([a-z0-9-]+)`\s*\|/g;
  const referencedAgents = new Set();
  let tableMatch;

  while ((tableMatch = tablePattern.exec(content)) !== null) {
    const agentName = tableMatch[1];
    if (agentName !== 'orchestrator') {
      referencedAgents.add(agentName);
    }
  }

  // Check if referenced agents exist in this domain
  const expectedAgents = EXPECTED_AGENTS_PER_DOMAIN[domain] || [];
  let missingAgents = [];

  for (const agentName of referencedAgents) {
    const agentPath = path.join(SKILL_ROOT, domain, `${agentName}.md`);
    if (!fileExists(agentPath)) {
      missingAgents.push(agentName);
    }
  }

  if (missingAgents.length === 0) {
    console.log(`   ✅ ${domain}/orchestrator.md - all references valid`);
    passed++;
  } else {
    console.log(`   ❌ ${domain}/orchestrator.md - missing agents: ${missingAgents.join(', ')}`);
    issues.push(`${domain}: missing agents ${missingAgents.join(', ')}`);
    failed++;
  }
}

// 3. Validate cross-domain references
console.log('\n3. Cross-Domain References');

let crossDomainIssues = [];

for (const domain of DOMAINS) {
  const domainDir = path.join(SKILL_ROOT, domain);
  if (!directoryExists(domainDir)) continue;

  const files = findMarkdownFiles(domainDir);

  for (const file of files) {
    const { content, error } = safeReadFile(file);
    if (error) {
      console.log(`   ⚠️  Cannot read ${path.relative(SKILL_ROOT, file)}: ${error}`);
      continue;
    }
    if (!content) continue;

    // Look for cross-domain references like "domain/agent"
    // Pattern supports: lowercase letters, numbers, and hyphens (kebab-case)
    const crossRefPattern = /([a-z0-9-]+)\/([a-z0-9-]+)(?:\.md)?/g;
    let crossMatch;

    while ((crossMatch = crossRefPattern.exec(content)) !== null) {
      const [, refDomain, refAgent] = crossMatch;

      // Only check if it looks like a domain reference
      if (DOMAINS.includes(refDomain) && refDomain !== domain) {
        const targetPath = path.join(SKILL_ROOT, refDomain, `${refAgent}.md`);
        if (!fileExists(targetPath) && refAgent !== 'orchestrator') {
          // Check if it's a known agent
          const expectedInDomain = EXPECTED_AGENTS_PER_DOMAIN[refDomain] || [];
          if (expectedInDomain.includes(refAgent)) {
            crossDomainIssues.push({
              from: path.relative(SKILL_ROOT, file),
              to: `${refDomain}/${refAgent}`
            });
          }
        }
      }
    }
  }
}

if (crossDomainIssues.length === 0) {
  console.log(`   ✅ All cross-domain references valid`);
  passed++;
} else {
  console.log(`   ⚠️  ${crossDomainIssues.length} potential broken cross-references`);
  for (const issue of crossDomainIssues.slice(0, 3)) {
    console.log(`      ${issue.from} → ${issue.to}`);
  }
}

console.log('\n');
printSeparator();

// Summary
console.log('\n📊 Results:');
console.log(`   Checks passed: ${passed}`);
console.log(`   Checks failed: ${failed}`);

if (issues.length > 0) {
  console.log('\n⚠️  Issues found:');
  for (const issue of issues) {
    console.log(`   - ${issue}`);
  }
}

if (failed > 0) {
  console.log('\n❌ Some checks failed');
  process.exit(1);
} else {
  console.log('\n✅ All checks passed');
  process.exit(0);
}
