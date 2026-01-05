#!/usr/bin/env node
/**
 * Test: Validate Cross-References
 *
 * Ensures agent cross-references are accurate and targets exist.
 *
 * @module tests/validate-crossrefs
 */

const path = require('path');
const {
  findMarkdownFiles,
  safeReadFile,
  fileExists,
  TestReporter
} = require('./utils');
const { SKILL_ROOT } = require('./config');

const reporter = new TestReporter('validate-crossrefs');
reporter.header('Cross-Reference Validation');

const agentsDir = path.join(SKILL_ROOT, 'agents');
const allAgentFiles = findMarkdownFiles(agentsDir, { maxDepth: 6 });

/**
 * Extract cross-references from content
 * Only validates path-style references (domain/agent)
 */
function extractCrossRefs(content) {
  const refs = [];

  // Pattern: → `domain/agent` or → domain/agent (path-style only)
  const arrowPattern = /→\s*`?([a-z-]+\/[a-z-]+(?:\/[a-z-]+)*)`?/gi;
  let match;
  while ((match = arrowPattern.exec(content)) !== null) {
    const target = match[1];
    // Skip common non-reference patterns
    if (!target.includes('.') && !target.includes('=') && !target.includes(':')) {
      refs.push({ type: 'arrow', target });
    }
  }

  // Pattern: backtick path references only (must contain /)
  const backtickPattern = /`([a-z-]+\/[a-z-]+(?:\/[a-z-]+)*)`/gi;
  while ((match = backtickPattern.exec(content)) !== null) {
    const target = match[1];
    // Filter out code snippets and non-agent references
    if (!target.includes('.') && !target.includes('=') && !target.includes(':')) {
      refs.push({ type: 'backtick', target });
    }
  }

  return refs;
}

/**
 * Resolve reference to file path
 */
function resolveRef(ref, currentDir) {
  const target = ref.target;

  // Full path reference: domain/subdomain/agent
  if (target.includes('/')) {
    const parts = target.split('/');
    const agent = parts[parts.length - 1];
    const pathParts = parts.slice(0, -1);

    // Try as full path
    let testPath = path.join(agentsDir, ...pathParts, `${agent}.md`);
    if (fileExists(testPath)) return testPath;

    // Try with orchestrator
    testPath = path.join(agentsDir, ...parts, 'orchestrator.md');
    if (fileExists(testPath)) return testPath;

    // Try from current directory
    testPath = path.join(currentDir, ...pathParts, `${agent}.md`);
    if (fileExists(testPath)) return testPath;
  }

  // Simple reference: agent-name
  // First try in current directory
  let testPath = path.join(currentDir, `${target}.md`);
  if (fileExists(testPath)) return testPath;

  // Try in sibling directories
  const parentDir = path.dirname(currentDir);
  testPath = path.join(parentDir, target, 'orchestrator.md');
  if (fileExists(testPath)) return testPath;

  testPath = path.join(parentDir, `${target}.md`);
  if (fileExists(testPath)) return testPath;

  // Try in agents root
  testPath = path.join(agentsDir, target, 'orchestrator.md');
  if (fileExists(testPath)) return testPath;

  return null;
}

reporter.section('Scanning Cross-References');

let totalRefs = 0;
let validRefs = 0;
let brokenRefs = [];
let externalRefs = [];

// Known external skill references (not in this skill)
const EXTERNAL_SKILLS = [
  'project-management', 'direction-technique', 'frontend-developer',
  'backend-developer', 'design-system-foundations', 'web-dev-process',
  'testing-process', 'devops', 'react-expert', 'nextjs-expert',
  'wordpress-gutenberg-expert', 'web-agency', 'lead-dev'
];

for (const file of allAgentFiles) {
  const relativePath = path.relative(agentsDir, file);
  const currentDir = path.dirname(file);
  const { content } = safeReadFile(file);

  if (!content) continue;

  const refs = extractCrossRefs(content);

  for (const ref of refs) {
    totalRefs++;

    // Check if it's an external skill reference
    const isExternal = EXTERNAL_SKILLS.some(skill =>
      ref.target.startsWith(skill) || ref.target === skill
    );

    if (isExternal) {
      externalRefs.push({ file: relativePath, ref: ref.target });
      validRefs++;
      continue;
    }

    // Try to resolve internal reference
    const resolvedPath = resolveRef(ref, currentDir);

    if (resolvedPath) {
      validRefs++;
    } else {
      brokenRefs.push({ file: relativePath, ref: ref.target, type: ref.type });
    }
  }
}

reporter.info(`Total references found: ${totalRefs}`);
reporter.info(`External skill references: ${externalRefs.length}`);

reporter.section('Broken References');

if (brokenRefs.length === 0) {
  reporter.pass('No broken cross-references found');
} else {
  for (const broken of brokenRefs.slice(0, 10)) {
    reporter.fail(`${broken.file}: "${broken.ref}" not found`);
  }
  if (brokenRefs.length > 10) {
    reporter.info(`... and ${brokenRefs.length - 10} more`);
  }
}

reporter.section('External Skill References');

// Group by target skill
const externalBySkill = {};
for (const ext of externalRefs) {
  const skill = ext.ref.split('/')[0];
  externalBySkill[skill] = (externalBySkill[skill] || 0) + 1;
}

for (const [skill, count] of Object.entries(externalBySkill)) {
  reporter.info(`→ ${skill}: ${count} reference(s)`);
}

reporter.section('Internal Reference Graph');

// Build reference graph for internal links
const refGraph = {};
for (const file of allAgentFiles) {
  const relativePath = path.relative(agentsDir, file);
  const agentName = relativePath.replace(/\.md$/, '');
  const { content } = safeReadFile(file);

  if (!content) continue;

  const refs = extractCrossRefs(content);
  const internalRefs = refs.filter(ref =>
    !EXTERNAL_SKILLS.some(skill => ref.target.startsWith(skill))
  );

  if (internalRefs.length > 0) {
    refGraph[agentName] = internalRefs.map(r => r.target);
  }
}

// Check for circular references
let circularFound = 0;
for (const [agent, refs] of Object.entries(refGraph)) {
  for (const ref of refs) {
    if (refGraph[ref] && refGraph[ref].includes(agent)) {
      // Bidirectional is OK for orchestrators
      if (!agent.includes('orchestrator') && !ref.includes('orchestrator')) {
        reporter.warn(`Bidirectional: ${agent} <-> ${ref}`);
        circularFound++;
      }
    }
  }
}

if (circularFound === 0) {
  reporter.pass('No problematic circular references');
}

reporter.section('Summary');

const successRate = Math.round((validRefs / totalRefs) * 100);
reporter.info(`Reference validity: ${validRefs}/${totalRefs} (${successRate}%)`);

if (brokenRefs.length === 0) {
  reporter.pass('All cross-references are valid');
} else {
  reporter.fail(`${brokenRefs.length} broken reference(s) found`);
}

reporter.summarize();
