#!/usr/bin/env node
/**
 * Standardize workflow metadata format
 *
 * Converts:
 *   workflow: wf-audit
 *   phase: Collecte
 *
 * To:
 *   workflows:
 *     - template: wf-audit
 *       phase: Collecte
 */

const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, '..');

function findAgentFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !['tests', 'scripts', 'node_modules', '.git'].includes(item)) {
      files.push(...findAgentFiles(fullPath));
    } else if (item.endsWith('.md') && dir.includes('/agents/')) {
      files.push(fullPath);
    }
  }

  return files;
}

function convertWorkflowFormat(content) {
  // Check if already using workflows: format
  if (content.includes('workflows:')) {
    return { content, converted: false };
  }

  // Check for workflow: with array (already has - id: structure)
  if (content.match(/^workflow:\s*$/m) && content.includes('  - id:')) {
    // Just rename workflow: to workflows:
    const newContent = content.replace(/^workflow:\s*$/m, 'workflows:');
    return { content: newContent, converted: true };
  }

  // Check for workflow: with single object (id: without dash)
  if (content.match(/^workflow:\s*$/m) && content.match(/^\s{2}id:\s/m)) {
    // Convert single object to array format
    let newContent = content.replace(/^workflow:\s*$/m, 'workflows:');
    // Add dash before id:
    newContent = newContent.replace(/^(\s{2})(id:\s)/m, '$1- $2');
    return { content: newContent, converted: true };
  }

  // Check for workflow: with single object (ref: without dash)
  if (content.match(/^workflow:\s*$/m) && content.match(/^\s{2}ref:\s/m)) {
    // Convert single object to array format
    let newContent = content.replace(/^workflow:\s*$/m, 'workflows:');
    // Add dash before ref: and rename to template:
    newContent = newContent.replace(/^(\s{2})ref:\s(\S+)/m, '$1- template: $2');
    return { content: newContent, converted: true };
  }

  // Check for singular workflow: format
  const workflowMatch = content.match(/^workflow:\s*(\S+)\s*$/m);
  if (!workflowMatch) {
    return { content, converted: false };
  }

  const template = workflowMatch[1];

  // Find phase if present
  const phaseMatch = content.match(/^phase:\s*(.+)\s*$/m);
  const phase = phaseMatch ? phaseMatch[1].trim() : null;

  // Build new workflows block
  let newBlock = 'workflows:\n  - template: ' + template;
  if (phase) {
    newBlock += '\n    phase: ' + phase;
  }

  // Replace workflow: line with workflows: block
  let newContent = content.replace(/^workflow:\s*\S+\s*$/m, newBlock);

  // Remove separate phase: line if it exists (it's now in the workflows block)
  if (phase) {
    newContent = newContent.replace(/^phase:\s*.+\s*$/m, '');
    // Clean up extra empty lines in frontmatter
    newContent = newContent.replace(/---\n(\n)+/g, '---\n');
    newContent = newContent.replace(/\n(\n)+---/g, '\n---');
  }

  return { content: newContent, converted: true };
}

// Main execution
console.log('Standardizing workflow metadata format...\n');

const skillDirs = fs.readdirSync(SKILLS_DIR)
  .filter(item => {
    const fullPath = path.join(SKILLS_DIR, item);
    return fs.statSync(fullPath).isDirectory() &&
           !['tests', 'scripts', 'node_modules', '.git', 'examples'].includes(item);
  });

let totalConverted = 0;
let totalSkipped = 0;

for (const skill of skillDirs) {
  const agentsDir = path.join(SKILLS_DIR, skill, 'agents');
  if (!fs.existsSync(agentsDir)) continue;

  const files = findAgentFiles(agentsDir);
  let skillConverted = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const { content: newContent, converted } = convertWorkflowFormat(content);

    if (converted) {
      fs.writeFileSync(file, newContent);
      skillConverted++;
      totalConverted++;
    } else {
      totalSkipped++;
    }
  }

  if (skillConverted > 0) {
    console.log(`${skill}: ${skillConverted} files converted`);
  }
}

console.log(`\n✅ Done: ${totalConverted} files converted, ${totalSkipped} skipped`);
