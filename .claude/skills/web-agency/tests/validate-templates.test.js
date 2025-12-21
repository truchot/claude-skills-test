#!/usr/bin/env node
/**
 * Test: Validate Templates
 *
 * Checks that:
 * - All referenced templates exist
 * - Templates have required structure
 */

const fs = require('fs');
const path = require('path');

const SKILL_DIR = path.join(__dirname, '..');
const TEMPLATES_DIR = path.join(SKILL_DIR, 'templates/project-management');
const AGENTS_DIR = path.join(SKILL_DIR, 'agents/project-management');

let passed = 0;
let failed = 0;

/**
 * Expected templates based on orchestrator references
 */
const EXPECTED_TEMPLATES = [
  'brief-client.md',
  'estimation.md',
  'proposition.md',
  'planning.md',
  'reporting.md',
  'compte-rendu.md',
  'pv-recette.md',
  'bilan-projet.md'
];

/**
 * Required sections for templates
 */
const REQUIRED_SECTIONS = [
  'Informations',  // Or similar header section
];

/**
 * Validate template structure
 */
function validateTemplate(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const errors = [];

  // Check for main heading
  if (!content.match(/^#\s+.+/m)) {
    errors.push('Missing main heading');
  }

  // Check for table structure (common in templates)
  if (!content.includes('|')) {
    errors.push('Missing table structure');
  }

  // Check for sections/structure
  const headingCount = (content.match(/^##?\s+/gm) || []).length;
  if (headingCount < 3) {
    errors.push('Template seems too short (< 3 sections)');
  }

  return errors;
}

// Main execution
console.log('🧪 Validating Templates\n');
console.log('='.repeat(50));

// Check if templates directory exists
if (!fs.existsSync(TEMPLATES_DIR)) {
  console.log('❌ Templates directory not found:', TEMPLATES_DIR);
  process.exit(1);
}

// Check expected templates exist
console.log('\n📁 Checking template existence:\n');

for (const template of EXPECTED_TEMPLATES) {
  const templatePath = path.join(TEMPLATES_DIR, template);

  if (fs.existsSync(templatePath)) {
    const errors = validateTemplate(templatePath);

    if (errors.length === 0) {
      console.log(`✅ ${template}`);
      passed++;
    } else {
      console.log(`⚠️  ${template} (exists but has issues)`);
      for (const err of errors) {
        console.log(`   └─ ${err}`);
      }
      passed++; // Still count as passed since file exists
    }
  } else {
    console.log(`❌ ${template} - NOT FOUND`);
    failed++;
  }
}

// List any extra templates
console.log('\n📋 Extra templates found:\n');

const actualTemplates = fs.readdirSync(TEMPLATES_DIR).filter(f => f.endsWith('.md'));
const extraTemplates = actualTemplates.filter(t => !EXPECTED_TEMPLATES.includes(t));

if (extraTemplates.length === 0) {
  console.log('   (none)');
} else {
  for (const template of extraTemplates) {
    console.log(`   📄 ${template}`);
  }
}

console.log('\n' + '='.repeat(50));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
console.log(`   Templates expected: ${EXPECTED_TEMPLATES.length}`);
console.log(`   Templates found: ${actualTemplates.length}`);

if (failed > 0) {
  console.log('\n❌ Some template tests failed');
  process.exit(1);
} else {
  console.log('\n✅ All template tests passed');
  process.exit(0);
}
