#!/usr/bin/env node
/**
 * Test: Validate SEO Sub-Skill Structure
 *
 * Validates the comprehensive SEO sub-skill with all 9 domains.
 *
 * @module tests/validate-seo
 */

const path = require('path');
const {
  safeReadFile,
  fileExists,
  directoryExists,
  TestReporter
} = require('./utils');
const { SKILL_ROOT, SEO_DOMAINS, EXPECTED_SEO_AGENTS } = require('./config');

const reporter = new TestReporter('validate-seo');
reporter.header('Validating SEO Sub-Skill (49 agents, 9 domains)');

const seoDir = path.join(SKILL_ROOT, 'agents', 'acquisition', 'seo');

reporter.section('SEO Directory Structure');

if (directoryExists(seoDir)) {
  reporter.pass('SEO directory exists');
} else {
  reporter.fail('SEO directory not found');
  reporter.summarize();
}

// Check main SEO orchestrator
const seoOrchestratorPath = path.join(seoDir, 'orchestrator.md');
if (fileExists(seoOrchestratorPath)) {
  reporter.pass('SEO orchestrator exists');

  const { content } = safeReadFile(seoOrchestratorPath);
  if (content && content.length >= 1000) {
    reporter.pass(`SEO orchestrator content sufficient (${content.length} chars)`);
  } else {
    reporter.warn('SEO orchestrator content may be too short');
  }
} else {
  reporter.fail('SEO orchestrator not found');
}

reporter.section('SEO Domain Directories');

for (const domain of SEO_DOMAINS) {
  const domainDir = path.join(seoDir, domain);
  if (directoryExists(domainDir)) {
    reporter.pass(`${domain}/ directory exists`);
  } else {
    reporter.fail(`${domain}/ directory not found`);
  }
}

reporter.section('SEO Domain Coverage');

const domainDescriptions = {
  'strategie': 'Audit, roadmap, concurrence',
  'technique': 'Crawl, Core Web Vitals, architecture',
  'contenu': 'Keywords, briefs, on-page',
  'netlinking': 'Backlinks, outreach, prospection',
  'pilotage': 'Reporting, positions, veille',
  'geo': 'AI Search, ChatGPT, AI Overviews',
  'local': 'Google Business, NAP, avis',
  'ecommerce': 'Fiches produits, Google Merchant',
  'international': 'Hreflang, localisation, geotargeting'
};

for (const [domain, description] of Object.entries(domainDescriptions)) {
  const orchPath = path.join(seoDir, domain, 'orchestrator.md');
  if (fileExists(orchPath)) {
    reporter.pass(`${domain}: ${description}`);
  } else {
    reporter.fail(`${domain}: Orchestrator missing`);
  }
}

reporter.section('Agent Count by Domain');

let totalSeoAgents = 0;
for (const [subDomain, agents] of Object.entries(EXPECTED_SEO_AGENTS)) {
  let foundCount = 0;
  for (const agent of agents) {
    const agentPath = path.join(SKILL_ROOT, 'agents', 'acquisition', subDomain, `${agent}.md`);
    if (fileExists(agentPath)) {
      foundCount++;
    }
  }
  totalSeoAgents += foundCount;

  if (foundCount === agents.length) {
    reporter.pass(`${subDomain}: ${foundCount}/${agents.length} agents`);
  } else {
    reporter.fail(`${subDomain}: ${foundCount}/${agents.length} agents (missing ${agents.length - foundCount})`);
  }
}

reporter.section('Total SEO Agents');

const expectedSeoTotal = 49;
if (totalSeoAgents === expectedSeoTotal) {
  reporter.pass(`Total SEO agents: ${totalSeoAgents}/${expectedSeoTotal}`);
} else {
  reporter.fail(`Total SEO agents: ${totalSeoAgents}/${expectedSeoTotal} (missing ${expectedSeoTotal - totalSeoAgents})`);
}

reporter.section('GEO (Generative Engine Optimization)');

// Specifically validate GEO domain as it's new and critical
const geoAgents = ['ai-search-strategy', 'ai-overviews', 'entity-authority', 'citation-optimization', 'llm-content-strategy'];
for (const agent of geoAgents) {
  const agentPath = path.join(seoDir, 'geo', `${agent}.md`);
  if (fileExists(agentPath)) {
    reporter.pass(`GEO agent: ${agent}`);
  } else {
    reporter.fail(`GEO agent missing: ${agent}`);
  }
}

reporter.summarize();
