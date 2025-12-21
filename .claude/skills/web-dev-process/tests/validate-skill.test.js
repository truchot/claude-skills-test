#!/usr/bin/env node
/**
 * Test: Validate SKILL.md
 *
 * Validates that the main SKILL.md orchestrator:
 * - Has proper frontmatter with version
 * - Documents all 7 phases
 * - Has routing rules
 * - References all phase orchestrators
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
const { SKILL_ROOT, PHASES } = require('./config');

let passed = 0;
let failed = 0;

console.log('🧪 Validating SKILL.md\n');
printSeparator();

const skillPath = path.join(SKILL_ROOT, 'SKILL.md');

// Check SKILL.md exists
if (!fileExists(skillPath)) {
  console.log('❌ SKILL.md not found');
  process.exit(1);
}
console.log('✅ SKILL.md exists');
passed++;

const { content, error } = safeReadFile(skillPath);
if (error) {
  console.log(`❌ Cannot read SKILL.md: ${error}`);
  process.exit(1);
}

// Check frontmatter
console.log('\n📋 Frontmatter:');
const frontmatter = parseFrontmatter(content);
if (!frontmatter) {
  console.log('  ❌ Missing frontmatter');
  failed++;
} else {
  if (frontmatter.name) {
    console.log(`  ✅ name: ${frontmatter.name}`);
    passed++;
  } else {
    console.log('  ❌ Missing name');
    failed++;
  }

  if (frontmatter.description) {
    console.log(`  ✅ description: ${frontmatter.description.substring(0, 50)}...`);
    passed++;
  } else {
    console.log('  ❌ Missing description');
    failed++;
  }

  if (frontmatter.version) {
    console.log(`  ✅ version: ${frontmatter.version}`);
    passed++;
  } else {
    console.log('  ⚠️  Missing version (recommended)');
  }
}

// Check phases are documented
console.log('\n📁 Phases documented:');
for (const phase of PHASES) {
  // Check various ways the phase might be mentioned
  const phaseRegex = new RegExp(phase, 'i');
  if (phaseRegex.test(content)) {
    console.log(`  ✅ ${phase}`);
    passed++;
  } else {
    console.log(`  ❌ ${phase} not mentioned`);
    failed++;
  }
}

// Check routing section exists
console.log('\n🔀 Routing:');
if (content.includes('Routage') || content.includes('routing') || content.includes('Routing')) {
  console.log('  ✅ Routing section present');
  passed++;
} else {
  console.log('  ❌ Routing section missing');
  failed++;
}

// Check mots-clés table exists
if (content.includes('Mots-clés') || content.includes('mots-clés')) {
  console.log('  ✅ Keywords table present');
  passed++;
} else {
  console.log('  ⚠️  Keywords table not found');
}

// Check phase orchestrator references
console.log('\n🔗 Phase orchestrator references:');
let orchestratorsFound = 0;
for (const phase of PHASES) {
  const orchestratorRef = new RegExp(`${phase}/orchestrator`, 'i');
  if (orchestratorRef.test(content)) {
    orchestratorsFound++;
  }
}
if (orchestratorsFound >= 5) {
  console.log(`  ✅ ${orchestratorsFound}/${PHASES.length} orchestrators referenced`);
  passed++;
} else {
  console.log(`  ⚠️  Only ${orchestratorsFound}/${PHASES.length} orchestrators referenced`);
}

console.log('\n');
printSeparator();
console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  console.log('\n❌ Some tests failed');
  process.exit(1);
} else {
  console.log('\n✅ All tests passed');
  process.exit(0);
}
