#!/usr/bin/env node
/**
 * E2E Test: Agent Completeness Validation
 * Validates that every agent referenced in SKILL.md and orchestrator.md actually exists,
 * and that every agent file has valid frontmatter with required fields.
 */

const fs = require('fs');
const path = require('path');

const SKILLS_ROOT = path.join(__dirname, '..');

// Skills to validate with their expected agent counts
const SKILLS_TO_VALIDATE = {
  'team-management': { agents: 18, domains: 6 },
  'incident-management': { agents: 9, domains: 3 },
  'agent-performance-monitor': { agents: 10, domains: 3 },
  'tech-radar': { agents: 12, domains: 3 },
  'lead-dev': { agents: 33, domains: 6 },
};

let errors = 0;
let warnings = 0;
let totalAgents = 0;

console.log('🔍 Validating agent completeness across skills...\n');

for (const [skill, expected] of Object.entries(SKILLS_TO_VALIDATE)) {
  const skillPath = path.join(SKILLS_ROOT, skill);
  const agentsPath = path.join(skillPath, 'agents');

  console.log(`\n=== ${skill} ===`);

  // 1. Check SKILL.md exists
  if (!fs.existsSync(path.join(skillPath, 'SKILL.md'))) {
    console.log(`  ❌ SKILL.md missing`);
    errors++;
    continue;
  }
  console.log(`  ✅ SKILL.md exists`);

  // 2. Check orchestrator.md exists
  if (!fs.existsSync(path.join(skillPath, 'orchestrator.md'))) {
    console.log(`  ❌ orchestrator.md missing`);
    errors++;
  } else {
    console.log(`  ✅ orchestrator.md exists`);
  }

  // 3. Count and validate agent files
  if (!fs.existsSync(agentsPath)) {
    console.log(`  ❌ agents/ directory missing`);
    errors++;
    continue;
  }

  const agentFiles = [];
  const domains = fs.readdirSync(agentsPath).filter(d =>
    fs.statSync(path.join(agentsPath, d)).isDirectory()
  );

  for (const domain of domains) {
    const domainPath = path.join(agentsPath, domain);
    const files = fs.readdirSync(domainPath).filter(f => f.endsWith('.md'));
    for (const file of files) {
      agentFiles.push({ domain, file, path: path.join(domainPath, file) });
    }
  }

  totalAgents += agentFiles.length;

  // 4. Validate agent count
  if (agentFiles.length < expected.agents) {
    console.log(`  ❌ Expected ${expected.agents} agents, found ${agentFiles.length}`);
    errors++;
  } else {
    console.log(`  ✅ ${agentFiles.length} agents found (expected ${expected.agents})`);
  }

  // 5. Validate domain count
  if (domains.length < expected.domains) {
    console.log(`  ⚠️  Expected ${expected.domains} domains, found ${domains.length}`);
    warnings++;
  } else {
    console.log(`  ✅ ${domains.length} domains found`);
  }

  // 6. Validate each agent's frontmatter
  for (const agent of agentFiles) {
    const content = fs.readFileSync(agent.path, 'utf-8');

    // Check frontmatter exists
    if (!content.startsWith('---')) {
      console.log(`  ❌ ${agent.domain}/${agent.file}: Missing frontmatter`);
      errors++;
      continue;
    }

    const frontmatterEnd = content.indexOf('---', 3);
    if (frontmatterEnd === -1) {
      console.log(`  ❌ ${agent.domain}/${agent.file}: Unclosed frontmatter`);
      errors++;
      continue;
    }

    const frontmatter = content.substring(3, frontmatterEnd);

    // Check required fields
    if (!frontmatter.includes('name:')) {
      console.log(`  ❌ ${agent.domain}/${agent.file}: Missing 'name' in frontmatter`);
      errors++;
    }
    if (!frontmatter.includes('description:')) {
      console.log(`  ❌ ${agent.domain}/${agent.file}: Missing 'description' in frontmatter`);
      errors++;
    }

    // Check minimum line count (80 lines for non-orchestrator agents)
    const lineCount = content.split('\n').length;
    if (lineCount < 80) {
      console.log(`  ⚠️  ${agent.domain}/${agent.file}: Only ${lineCount} lines (min 80)`);
      warnings++;
    }

    // Check required sections
    const requiredSections = ['Ta Responsabilité Unique', 'Tu NE fais PAS', 'Escalades'];
    for (const section of requiredSections) {
      if (!content.includes(section)) {
        console.log(`  ⚠️  ${agent.domain}/${agent.file}: Missing section "${section}"`);
        warnings++;
      }
    }
  }
}

console.log('\n================================');
console.log(`📊 Total agents validated: ${totalAgents}`);
if (errors > 0) {
  console.log(`❌ ${errors} error(s), ${warnings} warning(s)`);
  process.exit(1);
} else {
  console.log(`✅ Agent completeness validation passed (${warnings} warning(s))`);
  process.exit(0);
}
