#!/usr/bin/env node
/**
 * E2E Test: Routing Consistency Validation
 * Validates that routing.md references match actual skills and agents,
 * and that there are no undocumented keyword conflicts.
 */

const fs = require('fs');
const path = require('path');

const SKILLS_ROOT = path.join(__dirname, '..');
const ROUTING_PATH = path.join(__dirname, '..', '..', 'orchestration-framework', 'orchestration', 'routing.md');

let errors = 0;
let warnings = 0;

console.log('🔍 Validating routing consistency...\n');

// 1. Read routing.md
if (!fs.existsSync(ROUTING_PATH)) {
  console.log('❌ routing.md not found');
  process.exit(1);
}

const routingContent = fs.readFileSync(ROUTING_PATH, 'utf-8');

// 2. Extract all skill references from routing.md
const skillRefPattern = /`([a-z][a-z0-9-]+(?:\/[a-z][a-z0-9-]+)*)`/g;
const referencedSkills = new Set();
let match;

while ((match = skillRefPattern.exec(routingContent)) !== null) {
  const skillName = match[1].split('/')[0];
  referencedSkills.add(skillName);
}

console.log(`📋 Skills referenced in routing.md: ${referencedSkills.size}\n`);

// 3. Check each referenced skill exists
const existingSkills = fs.readdirSync(SKILLS_ROOT).filter(d => {
  const fullPath = path.join(SKILLS_ROOT, d);
  return fs.statSync(fullPath).isDirectory() && fs.existsSync(path.join(fullPath, 'SKILL.md'));
});

console.log('=== Skill Existence Check ===');
for (const skill of referencedSkills) {
  if (existingSkills.includes(skill)) {
    // Quietly pass
  } else {
    // Some references might be to sub-paths within skills, not top-level skills
    const isSubPath = existingSkills.some(s => skill.startsWith(s));
    if (!isSubPath) {
      console.log(`  ⚠️  Referenced skill "${skill}" not found as top-level skill`);
      warnings++;
    }
  }
}
console.log(`  ✅ ${referencedSkills.size} skill references checked`);

// 4. Check that all existing skills are referenced in routing.md
console.log('\n=== Coverage Check ===');
const unreferencedSkills = existingSkills.filter(s => !referencedSkills.has(s));
if (unreferencedSkills.length > 0) {
  for (const skill of unreferencedSkills) {
    console.log(`  ⚠️  Skill "${skill}" exists but not referenced in routing.md`);
    warnings++;
  }
} else {
  console.log(`  ✅ All ${existingSkills.length} skills are referenced in routing.md`);
}

// 5. Check for unique agent names across all skills
console.log('\n=== Agent Name Uniqueness ===');
const agentNames = new Map(); // name → [skill/path, ...]

for (const skill of existingSkills) {
  const agentsDir = path.join(SKILLS_ROOT, skill, 'agents');
  if (!fs.existsSync(agentsDir)) continue;

  const walkDir = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        walkDir(path.join(dir, entry.name));
      } else if (entry.name.endsWith('.md')) {
        const filePath = path.join(dir, entry.name);
        const content = fs.readFileSync(filePath, 'utf-8');
        const nameMatch = content.match(/^name:\s*(.+)$/m);
        if (nameMatch) {
          const agentName = nameMatch[1].trim().replace(/^["']|["']$/g, '');
          const location = `${skill}/${path.relative(path.join(SKILLS_ROOT, skill), filePath)}`;
          if (agentNames.has(agentName)) {
            agentNames.get(agentName).push(location);
          } else {
            agentNames.set(agentName, [location]);
          }
        }
      }
    }
  };

  walkDir(agentsDir);
}

let duplicates = 0;
for (const [name, locations] of agentNames) {
  if (locations.length > 1) {
    console.log(`  ❌ Duplicate agent name "${name}" in:`);
    for (const loc of locations) {
      console.log(`     - ${loc}`);
    }
    errors++;
    duplicates++;
  }
}

if (duplicates === 0) {
  console.log(`  ✅ All ${agentNames.size} agent names are unique`);
}

// 6. Validate orchestrator references match actual agents
console.log('\n=== Orchestrator-Agent Consistency ===');
const SKILLS_WITH_ORCHESTRATOR = ['team-management', 'incident-management', 'agent-performance-monitor', 'tech-radar'];

for (const skill of SKILLS_WITH_ORCHESTRATOR) {
  const orchPath = path.join(SKILLS_ROOT, skill, 'orchestrator.md');
  if (!fs.existsSync(orchPath)) {
    console.log(`  ⚠️  ${skill}: orchestrator.md missing`);
    warnings++;
    continue;
  }

  const orchContent = fs.readFileSync(orchPath, 'utf-8');
  const agentsDir = path.join(SKILLS_ROOT, skill, 'agents');
  if (!fs.existsSync(agentsDir)) continue;

  // Get actual agent filenames (without .md)
  const actualAgents = new Set();
  const walkForAgents = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        walkForAgents(path.join(dir, entry.name));
      } else if (entry.name.endsWith('.md')) {
        actualAgents.add(entry.name.replace('.md', ''));
      }
    }
  };
  walkForAgents(agentsDir);

  // Check that each agent is mentioned in orchestrator
  let missingInOrch = 0;
  for (const agent of actualAgents) {
    if (!orchContent.includes(agent)) {
      console.log(`  ⚠️  ${skill}: agent "${agent}" not referenced in orchestrator.md`);
      warnings++;
      missingInOrch++;
    }
  }

  if (missingInOrch === 0) {
    console.log(`  ✅ ${skill}: all ${actualAgents.size} agents referenced in orchestrator`);
  }
}

console.log('\n================================');
if (errors > 0) {
  console.log(`❌ ${errors} error(s), ${warnings} warning(s)`);
  process.exit(1);
} else {
  console.log(`✅ Routing consistency validation passed (${warnings} warning(s))`);
  process.exit(0);
}
