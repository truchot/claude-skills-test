#!/usr/bin/env node
/**
 * Test: Validate Template Consistency
 *
 * Ensures all agents follow consistent template structure.
 *
 * @module tests/validate-templates
 */

const path = require('path');
const {
  findMarkdownFiles,
  safeReadFile,
  parseFrontmatter,
  TestReporter
} = require('./utils');
const { SKILL_ROOT } = require('./config');

const reporter = new TestReporter('validate-templates');
reporter.header('Template Consistency Validation');

const agentsDir = path.join(SKILL_ROOT, 'agents');

/**
 * Required sections for orchestrators
 */
const ORCHESTRATOR_REQUIREMENTS = {
  sections: ['Règles de Routage', 'Routage'],
  minLength: 500,
  mustHave: ['orchestrator', 'routing', 'délègu'],
};

/**
 * Required sections for regular agents
 */
const AGENT_REQUIREMENTS = {
  sections: ['Responsabilité', 'Rôle', 'Input', 'Output', 'Livrable', 'Template'],
  minLength: 300,
  mustHave: ['Tu ', 'fais PAS', 'NE fais'],
};

reporter.section('Finding All Agents');

const allAgentFiles = findMarkdownFiles(agentsDir, { maxDepth: 6 });
reporter.info(`Found ${allAgentFiles.length} agent files`);

reporter.section('Frontmatter Validation');

let frontmatterPass = 0;
let frontmatterFail = 0;

for (const file of allAgentFiles) {
  const relativePath = path.relative(agentsDir, file);
  const { content, error } = safeReadFile(file);

  if (error) {
    reporter.fail(`${relativePath}: Cannot read`);
    frontmatterFail++;
    continue;
  }

  const frontmatter = parseFrontmatter(content);

  if (!frontmatter) {
    reporter.fail(`${relativePath}: No frontmatter`);
    frontmatterFail++;
    continue;
  }

  if (!frontmatter.name) {
    reporter.fail(`${relativePath}: Missing 'name' in frontmatter`);
    frontmatterFail++;
    continue;
  }

  if (!frontmatter.description) {
    reporter.fail(`${relativePath}: Missing 'description' in frontmatter`);
    frontmatterFail++;
    continue;
  }

  frontmatterPass++;
}

if (frontmatterFail === 0) {
  reporter.pass(`All ${frontmatterPass} agents have valid frontmatter`);
} else {
  reporter.warn(`${frontmatterPass} valid, ${frontmatterFail} invalid frontmatter`);
}

reporter.section('Orchestrator Structure');

let orchPass = 0;
let orchFail = 0;

for (const file of allAgentFiles) {
  const fileName = path.basename(file);
  if (fileName !== 'orchestrator.md') continue;

  const relativePath = path.relative(agentsDir, file);
  const { content } = safeReadFile(file);

  if (!content) continue;

  const contentLower = content.toLowerCase();

  // Check for routing section
  const hasRouting = ORCHESTRATOR_REQUIREMENTS.sections.some(
    section => contentLower.includes(section.toLowerCase())
  );

  // Check minimum length
  const hasMinLength = content.length >= ORCHESTRATOR_REQUIREMENTS.minLength;

  // Check for delegation pattern
  const hasDelegation = contentLower.includes('délègu') ||
                        contentLower.includes('route') ||
                        contentLower.includes('→');

  if (hasRouting && hasMinLength && hasDelegation) {
    reporter.pass(`${relativePath}: Valid orchestrator structure`);
    orchPass++;
  } else {
    const issues = [];
    if (!hasRouting) issues.push('no routing section');
    if (!hasMinLength) issues.push(`short (${content.length}/${ORCHESTRATOR_REQUIREMENTS.minLength})`);
    if (!hasDelegation) issues.push('no delegation pattern');
    reporter.warn(`${relativePath}: ${issues.join(', ')}`);
    orchFail++;
  }
}

reporter.section('Agent Delegation Pattern');

let delegationPass = 0;
let delegationWarn = 0;

for (const file of allAgentFiles) {
  const fileName = path.basename(file);
  if (fileName === 'orchestrator.md') continue;

  const relativePath = path.relative(agentsDir, file);
  const { content } = safeReadFile(file);

  if (!content) continue;

  // Check for "Tu NE fais PAS" pattern (SRP delegation)
  const hasDelegationPattern = content.includes('Tu NE fais PAS') ||
                                content.includes('NE fais PAS') ||
                                content.includes('Tu ne fais pas');

  if (hasDelegationPattern) {
    delegationPass++;
  } else {
    reporter.warn(`${relativePath}: Missing delegation boundaries`);
    delegationWarn++;
  }
}

if (delegationWarn === 0) {
  reporter.pass(`All ${delegationPass} agents have delegation pattern`);
} else {
  reporter.info(`${delegationPass} with pattern, ${delegationWarn} without`);
}

reporter.section('Template Sections');

const sectionCounts = {};

for (const file of allAgentFiles) {
  const fileName = path.basename(file);
  if (fileName === 'orchestrator.md') continue;

  const { content } = safeReadFile(file);
  if (!content) continue;

  // Count common sections
  const sections = ['## Input', '## Output', '## Livrable', '## Template', '## Exemple', '## Rôle', '## Responsabilité'];

  for (const section of sections) {
    if (content.includes(section)) {
      sectionCounts[section] = (sectionCounts[section] || 0) + 1;
    }
  }
}

const totalAgents = allAgentFiles.filter(f => !f.endsWith('orchestrator.md')).length;

for (const [section, count] of Object.entries(sectionCounts)) {
  const percentage = Math.round((count / totalAgents) * 100);
  if (percentage >= 50) {
    reporter.pass(`${section}: ${percentage}% coverage (${count}/${totalAgents})`);
  } else {
    reporter.info(`${section}: ${percentage}% coverage (${count}/${totalAgents})`);
  }
}

reporter.section('Content Quality');

let qualityPass = 0;
let qualityWarn = 0;

for (const file of allAgentFiles) {
  const relativePath = path.relative(agentsDir, file);
  const { content } = safeReadFile(file);

  if (!content) continue;

  const isOrchestrator = file.endsWith('orchestrator.md');
  const minLength = isOrchestrator ? 500 : 300;

  if (content.length >= minLength) {
    qualityPass++;
  } else {
    reporter.warn(`${relativePath}: Short content (${content.length}/${minLength})`);
    qualityWarn++;
  }
}

if (qualityWarn === 0) {
  reporter.pass(`All ${qualityPass} agents meet minimum content length`);
} else {
  reporter.info(`${qualityPass} adequate, ${qualityWarn} short`);
}

reporter.summarize();
