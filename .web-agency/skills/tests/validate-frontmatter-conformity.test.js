#!/usr/bin/env node
/**
 * E2E Test: Frontmatter Conformity Validation
 * Validates SKILL.md frontmatter conformity with agentskills.io specification.
 * Checks: name format, description triggers, body size.
 */

const fs = require('fs');
const path = require('path');

const SKILLS_ROOT = path.join(__dirname, '..');

let errors = 0;
let warnings = 0;
let skillCount = 0;

console.log('🔍 Validating SKILL.md frontmatter conformity...\n');

// Get all skill directories
const skillDirs = fs.readdirSync(SKILLS_ROOT).filter(d => {
  const fullPath = path.join(SKILLS_ROOT, d);
  return fs.statSync(fullPath).isDirectory() && fs.existsSync(path.join(fullPath, 'SKILL.md'));
});

for (const skill of skillDirs) {
  const skillMdPath = path.join(SKILLS_ROOT, skill, 'SKILL.md');
  const content = fs.readFileSync(skillMdPath, 'utf-8');
  skillCount++;

  // 1. Check frontmatter exists
  if (!content.startsWith('---')) {
    console.log(`❌ ${skill}: Missing frontmatter`);
    errors++;
    continue;
  }

  const frontmatterEnd = content.indexOf('---', 3);
  if (frontmatterEnd === -1) {
    console.log(`❌ ${skill}: Unclosed frontmatter`);
    errors++;
    continue;
  }

  const frontmatter = content.substring(3, frontmatterEnd);
  const body = content.substring(frontmatterEnd + 3);

  // 2. Check name field
  const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
  if (!nameMatch) {
    console.log(`❌ ${skill}: Missing 'name' field`);
    errors++;
  } else {
    const name = nameMatch[1].trim().replace(/^["']|["']$/g, '');

    // Validate name format: lowercase, hyphens, numbers only, max 64 chars
    if (!/^[a-z][a-z0-9-]*$/.test(name)) {
      console.log(`❌ ${skill}: Invalid name format "${name}" (must be lowercase, hyphens, numbers)`);
      errors++;
    }
    if (name.length > 64) {
      console.log(`❌ ${skill}: Name too long (${name.length} chars, max 64)`);
      errors++;
    }

    // Verify name matches directory name
    if (name !== skill) {
      console.log(`⚠️  ${skill}: Name "${name}" doesn't match directory "${skill}"`);
      warnings++;
    }
  }

  // 3. Check description field with triggers
  const descMatch = frontmatter.match(/description:\s*([\s\S]*?)(?=\n[a-z]|\n---)/);
  if (!descMatch) {
    console.log(`❌ ${skill}: Missing 'description' field`);
    errors++;
  } else {
    const desc = descMatch[1].trim();

    // Check for "when to use" triggers
    const hasTriggers = desc.toLowerCase().includes('utilise ce skill quand') ||
                        desc.toLowerCase().includes('when to use') ||
                        desc.toLowerCase().includes('use this skill when');
    if (!hasTriggers) {
      console.log(`⚠️  ${skill}: Description missing "when to use" triggers`);
      warnings++;
    }

    // Check description length (max 1024 chars)
    if (desc.length > 1024) {
      console.log(`⚠️  ${skill}: Description too long (${desc.length} chars, max 1024)`);
      warnings++;
    }
  }

  // 4. Check body size (< 500 lines recommended)
  const bodyLines = body.split('\n').length;
  if (bodyLines > 500) {
    console.log(`⚠️  ${skill}: SKILL.md body too long (${bodyLines} lines, max 500)`);
    warnings++;
  }
}

// 5. Summary
console.log('\n================================');
console.log(`📊 ${skillCount} SKILL.md files validated`);
if (errors > 0) {
  console.log(`❌ ${errors} error(s), ${warnings} warning(s)`);
  process.exit(1);
} else {
  console.log(`✅ Frontmatter conformity validation passed (${warnings} warning(s))`);
  process.exit(0);
}
