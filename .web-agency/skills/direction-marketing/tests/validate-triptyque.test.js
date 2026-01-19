#!/usr/bin/env node
/**
 * Validates triptyque workflow and content
 */

const fs = require('fs');
const path = require('path');
const { TRIPTYQUE } = require('./config');

let errors = 0;
let warnings = 0;

console.log('🔍 Validating triptyque workflow...\n');

// Get project root (assuming tests are run from repo root)
const PROJECT_ROOT = process.cwd();

/**
 * Check if a file exists
 */
function fileExists(filePath) {
  const fullPath = path.join(PROJECT_ROOT, filePath);
  return fs.existsSync(fullPath);
}

/**
 * Check if file contains required sections
 */
function validateContent(filePath, requiredSections) {
  const fullPath = path.join(PROJECT_ROOT, filePath);
  if (!fs.existsSync(fullPath)) {
    return { valid: false, missing: requiredSections };
  }
  
  const content = fs.readFileSync(fullPath, 'utf8');
  const missing = [];
  
  for (const section of requiredSections) {
    if (!content.includes(section)) {
      missing.push(section);
    }
  }
  
  return { valid: missing.length === 0, missing };
}

console.log('--- File Existence ---');

// Check triptyque files exist
for (const [key, filePath] of Object.entries(TRIPTYQUE.files)) {
  if (fileExists(filePath)) {
    console.log(`✅ ${key}: ${filePath}`);
  } else {
    console.log(`⚠️  ${key}: ${filePath} (not found - expected for new projects)`);
    warnings++;
  }
}

console.log('\n--- Content Validation ---');

// Validate content if files exist
for (const [key, filePath] of Object.entries(TRIPTYQUE.files)) {
  if (!fileExists(filePath)) {
    console.log(`⏭️  Skipping ${key} (file not found)`);
    continue;
  }
  
  const requiredSections = TRIPTYQUE.contentValidation[key];
  if (!requiredSections) {
    console.log(`⚠️  No validation rules for ${key}`);
    warnings++;
    continue;
  }
  
  const result = validateContent(filePath, requiredSections);
  if (result.valid) {
    console.log(`✅ ${key}: All required sections present`);
  } else {
    console.log(`❌ ${key}: Missing sections: ${result.missing.join(', ')}`);
    errors++;
  }
}

console.log('\n--- Workflow Configuration ---');

// Validate workflow order is defined
const { order, maxIterations, escalationThresholdDays } = TRIPTYQUE.workflow;
console.log(`✅ Workflow order: ${order.join(' → ')}`);
console.log(`✅ Max iterations: ${maxIterations}`);
console.log(`✅ Escalation threshold: ${escalationThresholdDays} days`);

console.log('\n================================');
if (errors > 0) {
  console.log(`❌ ${errors} error(s), ${warnings} warning(s)`);
  process.exit(1);
} else {
  console.log(`✅ Triptyque validation passed (${warnings} warning(s))`);
  process.exit(0);
}
