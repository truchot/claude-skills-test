#!/usr/bin/env node
/**
 * Test: Validate SKILL.md Structure
 *
 * Validates that the main SKILL.md file:
 * - Has valid frontmatter with name, description, version
 * - Documents all domains
 * - Has routing rules
 * - Has decision tree
 *
 * @module tests/validate-skill
 */

const path = require('path');
const {
  safeReadFile,
  parseFrontmatter,
  fileExists,
  printSeparator
} = require('./utils');
const { SKILL_ROOT, DOMAINS, getTotalExpectedAgents } = require('./config');

let passed = 0;
let failed = 0;
const issues = [];

console.log('🧪 Validating Direction Technique SKILL.md\n');
printSeparator();

const skillMdPath = path.join(SKILL_ROOT, 'SKILL.md');

if (!fileExists(skillMdPath)) {
  console.log('❌ SKILL.md not found');
  process.exit(1);
}

const { content, error } = safeReadFile(skillMdPath);
if (error) {
  console.log(`❌ Cannot read SKILL.md: ${error}`);
  process.exit(1);
}

console.log('\n📄 SKILL.md Validation');

// Check frontmatter
console.log('\n1. Frontmatter');
const frontmatter = parseFrontmatter(content);
if (!frontmatter) {
  console.log('   ❌ Missing or invalid frontmatter');
  issues.push('Missing frontmatter');
  failed++;
} else {
  const requiredFields = ['name', 'description', 'version'];
  for (const field of requiredFields) {
    if (frontmatter[field]) {
      console.log(`   ✅ ${field}: ${frontmatter[field]}`);
      passed++;
    } else {
      console.log(`   ❌ Missing ${field}`);
      issues.push(`Missing frontmatter field: ${field}`);
      failed++;
    }
  }
}

// Check domain documentation - stricter pattern matching
console.log('\n2. Domain Documentation');
let documentedDomains = 0;
const missingDomains = [];

for (const domain of DOMAINS) {
  // Check for domain in heading format "### N. domain/" or in table format "`domain/`"
  const headingPattern = new RegExp(`###\\s+\\d+\\.\\s+${domain}\\/`, 'i');
  const tablePattern = new RegExp(`\\|\\s*\`${domain}\\/`, 'i');
  const pathPattern = new RegExp(`${domain}\\/[a-z-]+`, 'i');

  if (headingPattern.test(content) || tablePattern.test(content) || pathPattern.test(content)) {
    documentedDomains++;
  } else {
    missingDomains.push(domain);
  }
}

if (documentedDomains === DOMAINS.length) {
  console.log(`   ✅ All ${DOMAINS.length} domains documented`);
  passed++;
} else {
  console.log(`   ❌ ${documentedDomains}/${DOMAINS.length} domains documented`);
  console.log(`      Missing: ${missingDomains.join(', ')}`);
  issues.push(`Missing domain documentation: ${missingDomains.join(', ')}`);
  failed++;
}

// Check essential sections - stricter patterns
console.log('\n3. Essential Sections');
const essentialSections = [
  { name: 'Règles de Routage', pattern: /^##\s+Règles de Routage\s*$/im },
  { name: 'Arbre de Décision', pattern: /^##\s+Arbre de Décision\s*$/im },
  { name: 'Points d\'Escalade', pattern: /^##\s+Points d'Escalade/im },
  { name: 'Skills Associés', pattern: /^##\s+Skills Associés\s*$/im }
];

for (const section of essentialSections) {
  if (section.pattern.test(content)) {
    console.log(`   ✅ ${section.name}`);
    passed++;
  } else {
    console.log(`   ❌ ${section.name} missing`);
    issues.push(`Missing section: ${section.name}`);
    failed++;
  }
}

// Check agent count - use computed value only
console.log('\n4. Agent Count');
const expectedCount = getTotalExpectedAgents();
const agentCountPattern = new RegExp(`${expectedCount}\\s+agents?`, 'i');
const parenPattern = new RegExp(`\\(${expectedCount}\\)`, 'i');

if (agentCountPattern.test(content) || parenPattern.test(content) || content.includes(String(expectedCount))) {
  console.log(`   ✅ Total agent count mentioned (${expectedCount})`);
  passed++;
} else {
  console.log(`   ⚠️  Agent count may be outdated (expected ${expectedCount})`);
  console.log(`      Update SKILL.md if agent count has changed`);
}

// Check version 2.0+
console.log('\n5. Version');
if (frontmatter && frontmatter.version && frontmatter.version.startsWith('2')) {
  console.log(`   ✅ Version 2.x confirmed (${frontmatter.version})`);
  passed++;
} else {
  console.log(`   ⚠️  Expected version 2.x`);
}

// Check skill name matches directory
console.log('\n6. Skill Name');
if (frontmatter && frontmatter.name === 'direction-technique') {
  console.log(`   ✅ Skill name matches directory`);
  passed++;
} else {
  console.log(`   ❌ Skill name should be 'direction-technique'`);
  issues.push('Skill name mismatch');
  failed++;
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
