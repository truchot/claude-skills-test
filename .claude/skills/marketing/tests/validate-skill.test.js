#!/usr/bin/env node
/**
 * Test: Validate SKILL.md
 *
 * Validates that the main SKILL.md file has correct frontmatter and structure.
 *
 * @module tests/validate-skill
 */

const path = require('path');
const {
  safeReadFile,
  fileExists,
  parseFrontmatter,
  TestReporter
} = require('./utils');
const { SKILL_ROOT, getExpectedTotal } = require('./config');

const reporter = new TestReporter('validate-skill');
reporter.header('Validating Marketing SKILL.md');

const skillPath = path.join(SKILL_ROOT, 'SKILL.md');

reporter.section('File Existence');
if (fileExists(skillPath)) {
  reporter.pass('SKILL.md exists');
} else {
  reporter.fail('SKILL.md not found');
  reporter.summarize();
}

const { content, error } = safeReadFile(skillPath);
if (error) {
  reporter.fail(`Cannot read SKILL.md: ${error}`);
  reporter.summarize();
}

reporter.section('Frontmatter');
const frontmatter = parseFrontmatter(content);

if (frontmatter) {
  reporter.pass('Frontmatter found');

  // Check required fields
  const requiredFields = ['name', 'description', 'version', 'status'];
  for (const field of requiredFields) {
    if (frontmatter[field]) {
      reporter.pass(`${field}: ${frontmatter[field]}`);
    } else {
      reporter.fail(`Missing frontmatter field: ${field}`);
    }
  }

  // Validate version format
  if (frontmatter.version && /^\d+\.\d+\.\d+$/.test(frontmatter.version)) {
    reporter.pass(`Version format valid: ${frontmatter.version}`);
  } else {
    reporter.fail('Version format invalid (expected x.y.z)');
  }

  // Validate status
  if (frontmatter.status === 'active') {
    reporter.pass('Status is active');
  } else {
    reporter.warn(`Status is not active: ${frontmatter.status}`);
  }
} else {
  reporter.fail('No frontmatter found');
}

reporter.section('Required Sections');

const requiredSections = [
  'Architecture à 3 Niveaux',
  'Sous-Domaines',
  'Règles de Routage',
  'Arbre de Décision'
];

for (const section of requiredSections) {
  if (content.includes(section)) {
    reporter.pass(`Section found: ${section}`);
  } else {
    reporter.fail(`Missing section: ${section}`);
  }
}

reporter.section('Agent Count');

// Check that agent count is documented correctly
const expectedTotal = getExpectedTotal();
const agentCountMatch = content.match(/(\d+)\s*agents?\s*spécialisés/i);
if (agentCountMatch) {
  const documentedCount = parseInt(agentCountMatch[1], 10);
  if (documentedCount === expectedTotal) {
    reporter.pass(`Agent count correct: ${documentedCount}`);
  } else {
    reporter.fail(`Agent count mismatch: documented ${documentedCount}, expected ${expectedTotal}`);
  }
} else {
  reporter.warn('Agent count not found in documentation');
}

reporter.section('Content Quality');

// Check minimum content length
if (content.length >= 3000) {
  reporter.pass(`Content length sufficient (${content.length} chars)`);
} else {
  reporter.warn(`Content too short (${content.length} chars, minimum 3000)`);
}

// Check for ASCII diagrams
if (content.includes('┌') && content.includes('└')) {
  reporter.pass('ASCII diagrams present');
} else {
  reporter.warn('No ASCII diagrams found');
}

reporter.summarize();
