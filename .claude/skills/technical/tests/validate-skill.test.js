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

console.log('🧪 Validating Technical SKILL.md\n');
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

// Check domain documentation
console.log('\n2. Domain Documentation');
let documentedDomains = 0;
for (const domain of DOMAINS) {
  if (content.includes(domain + '/') || content.includes(`### `) && content.includes(domain)) {
    documentedDomains++;
  }
}

if (documentedDomains === DOMAINS.length) {
  console.log(`   ✅ All ${DOMAINS.length} domains documented`);
  passed++;
} else {
  console.log(`   ⚠️  ${documentedDomains}/${DOMAINS.length} domains documented`);
  issues.push(`Missing domain documentation`);
  failed++;
}

// Check essential sections
console.log('\n3. Essential Sections');
const essentialSections = [
  { name: 'Règles de Routage', pattern: /##\s+Règles de Routage/i },
  { name: 'Arbre de Décision', pattern: /##\s+Arbre de Décision/i },
  { name: 'Points d\'Escalade', pattern: /##\s+Points d\'Escalade/i },
  { name: 'Skills Associés', pattern: /##\s+Skills Associés/i }
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

// Check agent count mention
console.log('\n4. Agent Count');
const expectedCount = getTotalExpectedAgents();
if (content.includes('52') || content.includes(String(expectedCount))) {
  console.log(`   ✅ Total agent count mentioned (${expectedCount})`);
  passed++;
} else {
  console.log(`   ⚠️  Agent count may be outdated (expected ${expectedCount})`);
}

// Check version 2.0
console.log('\n5. Version');
if (frontmatter && frontmatter.version && frontmatter.version.startsWith('2')) {
  console.log(`   ✅ Version 2.x confirmed`);
  passed++;
} else {
  console.log(`   ⚠️  Expected version 2.x`);
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
