#!/usr/bin/env node
/**
 * Phase 5: Fix duplicate agent names by prefixing with skill/domain context.
 * Only modifies the `name:` field in frontmatter, not filenames.
 */

const fs = require('fs');
const path = require('path');

const SKILLS_ROOT = path.join(__dirname, '..');

// Step 1: Collect all agent names and their locations
const agentNames = new Map(); // name → [{skill, domain, file, fullPath}, ...]

const existingSkills = fs.readdirSync(SKILLS_ROOT).filter(d => {
  const fullPath = path.join(SKILLS_ROOT, d);
  return fs.statSync(fullPath).isDirectory() && fs.existsSync(path.join(fullPath, 'SKILL.md'));
});

for (const skill of existingSkills) {
  const agentsDir = path.join(SKILLS_ROOT, skill, 'agents');
  if (!fs.existsSync(agentsDir)) continue;

  const walkDir = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        walkDir(path.join(dir, entry.name));
      } else if (entry.name.endsWith('.md')) {
        const fullPath = path.join(dir, entry.name);
        const content = fs.readFileSync(fullPath, 'utf-8');
        const nameMatch = content.match(/^name:\s*(.+)$/m);
        if (nameMatch) {
          const agentName = nameMatch[1].trim().replace(/^["']|["']$/g, '');
          const relPath = path.relative(path.join(SKILLS_ROOT, skill, 'agents'), dir);
          const domain = relPath === '.' ? '' : relPath.split(path.sep)[0];

          const info = { skill, domain, file: entry.name.replace('.md', ''), fullPath, currentName: agentName };
          if (agentNames.has(agentName)) {
            agentNames.get(agentName).push(info);
          } else {
            agentNames.set(agentName, [info]);
          }
        }
      }
    }
  };
  walkDir(agentsDir);
}

// Step 2: Find duplicates
const duplicates = new Map();
for (const [name, locations] of agentNames) {
  if (locations.length > 1) {
    duplicates.set(name, locations);
  }
}

console.log(`Found ${duplicates.size} duplicate name groups across ${[...duplicates.values()].reduce((s, l) => s + l.length, 0)} files\n`);

// Step 3: Generate unique names using skill prefix abbreviations
const SKILL_PREFIX = {
  'backend-developer': 'backend',
  'security-expert': 'secexp',
  'legacy-modernization': 'legacy',
  'testing-process': 'testproc',
  'nextjs-expert': 'nextjs',
  'react-expert': 'react',
  'wordpress-gutenberg-expert': 'wp',
  'content-management': 'cms',
  'support-client': 'support',
  'devops': 'devops',
  'web-dev-process': 'webdev',
  'direction-artistique': 'da',
  'ux-ui-design': 'uxui',
  'direction-marketing': 'dirmkt',
  'marketing-ops': 'mktops',
  'direction-operations': 'dirops',
  'project-management': 'pm',
  'seo-expert': 'seo',
  'direction-technique': 'dirtech',
  'finance-analytics': 'finance',
  'marketing-analytics': 'mktanalytics',
  'lead-dev': 'leaddev',
  'team-management': 'tm',
};

function getPrefix(skill) {
  return SKILL_PREFIX[skill] || skill.replace(/-/g, '').substring(0, 8);
}

function generateUniqueName(info) {
  const prefix = getPrefix(info.skill);
  const domain = info.domain;
  const file = info.file;

  // For orchestrators, use {prefix}-{domain}-orchestrator
  if (file === 'orchestrator') {
    return domain ? `${prefix}-${domain}-orchestrator` : `${prefix}-orchestrator`;
  }

  // For leaf agents, use {prefix}-{domain}-{file} or {prefix}-{file}
  if (domain) {
    return `${prefix}-${domain}-${file}`;
  }
  return `${prefix}-${file}`;
}

// Step 4: Apply renames
let renamed = 0;
let skipped = 0;

for (const [name, locations] of duplicates) {
  for (const loc of locations) {
    const newName = generateUniqueName(loc);

    // Verify new name won't collide
    const content = fs.readFileSync(loc.fullPath, 'utf-8');
    const updated = content.replace(
      /^(name:\s*).+$/m,
      `$1${newName}`
    );

    if (updated !== content) {
      fs.writeFileSync(loc.fullPath, updated, 'utf-8');
      console.log(`  ✅ ${loc.skill}/${loc.domain}/${loc.file}: "${name}" → "${newName}"`);
      renamed++;
    } else {
      console.log(`  ⚠️  ${loc.skill}/${loc.domain}/${loc.file}: no change needed`);
      skipped++;
    }
  }
}

console.log(`\n================================`);
console.log(`✅ ${renamed} agents renamed, ${skipped} skipped`);

// Step 5: Verify no duplicates remain
const verifyNames = new Map();
for (const skill of existingSkills) {
  const agentsDir = path.join(SKILLS_ROOT, skill, 'agents');
  if (!fs.existsSync(agentsDir)) continue;

  const walkDir = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        walkDir(path.join(dir, entry.name));
      } else if (entry.name.endsWith('.md')) {
        const fullPath = path.join(dir, entry.name);
        const content = fs.readFileSync(fullPath, 'utf-8');
        const nameMatch = content.match(/^name:\s*(.+)$/m);
        if (nameMatch) {
          const n = nameMatch[1].trim().replace(/^["']|["']$/g, '');
          if (verifyNames.has(n)) {
            verifyNames.get(n).push(`${skill}/${path.relative(path.join(SKILLS_ROOT, skill), fullPath)}`);
          } else {
            verifyNames.set(n, [`${skill}/${path.relative(path.join(SKILLS_ROOT, skill), fullPath)}`]);
          }
        }
      }
    }
  };
  walkDir(agentsDir);
}

let remainingDupes = 0;
for (const [n, locs] of verifyNames) {
  if (locs.length > 1) {
    console.log(`  ❌ Still duplicate: "${n}" in ${locs.join(', ')}`);
    remainingDupes++;
  }
}

if (remainingDupes === 0) {
  console.log(`\n✅ VERIFICATION PASSED: All ${verifyNames.size} agent names are now unique!`);
} else {
  console.log(`\n❌ VERIFICATION FAILED: ${remainingDupes} duplicates remain`);
  process.exit(1);
}
