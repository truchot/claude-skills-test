#!/usr/bin/env node
/**
 * Test: Validate Routing Keywords
 *
 * Validates that routing keywords are properly defined and don't have conflicts.
 *
 * @module tests/validate-routing
 */

const path = require('path');
const {
  safeReadFile,
  fileExists,
  TestReporter
} = require('./utils');
const { SKILL_ROOT, DOMAINS, DOMAIN_KEYWORDS } = require('./config');

const reporter = new TestReporter('validate-routing');
reporter.header('Validating Marketing Routing Keywords');

const skillPath = path.join(SKILL_ROOT, 'SKILL.md');

reporter.section('SKILL.md Routing Table');

const { content, error } = safeReadFile(skillPath);
if (error) {
  reporter.fail(`Cannot read SKILL.md: ${error}`);
  reporter.summarize();
}

// Check that each domain has routing rules
for (const domain of DOMAINS) {
  const domainLower = domain.toLowerCase();
  const hasRouting = content.toLowerCase().includes(`\`${domainLower}\``);

  if (hasRouting) {
    reporter.pass(`Routing defined for: ${domain}`);
  } else {
    reporter.fail(`No routing rules for: ${domain}`);
  }
}

reporter.section('Keyword Coverage');

// Check that keywords for each domain are mentioned somewhere
for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS)) {
  let foundKeywords = 0;
  for (const keyword of keywords) {
    if (content.toLowerCase().includes(keyword.toLowerCase())) {
      foundKeywords++;
    }
  }

  const coverage = Math.round((foundKeywords / keywords.length) * 100);
  if (coverage >= 50) {
    reporter.pass(`${domain}: ${coverage}% keyword coverage (${foundKeywords}/${keywords.length})`);
  } else {
    reporter.warn(`${domain}: Low keyword coverage ${coverage}% (${foundKeywords}/${keywords.length})`);
  }
}

reporter.section('SEO Routing');

// Check SEO sub-routing
const seoKeywords = [
  'SEO',
  'référencement naturel',
  'mots-clés',
  'backlinks',
  'technique',
  'GEO',
  'local',
  'e-commerce',
  'international'
];

let seoRoutingCount = 0;
for (const keyword of seoKeywords) {
  if (content.toLowerCase().includes(keyword.toLowerCase())) {
    seoRoutingCount++;
  }
}

if (seoRoutingCount >= 5) {
  reporter.pass(`SEO routing keywords present (${seoRoutingCount}/${seoKeywords.length})`);
} else {
  reporter.warn(`Limited SEO routing keywords (${seoRoutingCount}/${seoKeywords.length})`);
}

reporter.section('No Circular Dependencies');

// Check orchestrators don't reference themselves
const agentsDir = path.join(SKILL_ROOT, 'agents');

for (const domain of DOMAINS) {
  const orchPath = path.join(agentsDir, domain, 'orchestrator.md');
  if (fileExists(orchPath)) {
    const { content: orchContent } = safeReadFile(orchPath);
    if (orchContent) {
      // Check for self-reference that would cause circular routing
      const selfRef = new RegExp(`→\\s*${domain}/orchestrator`, 'i');
      if (selfRef.test(orchContent)) {
        reporter.fail(`${domain}/orchestrator has circular reference`);
      } else {
        reporter.pass(`${domain}/orchestrator: No circular references`);
      }
    }
  }
}

reporter.summarize();
