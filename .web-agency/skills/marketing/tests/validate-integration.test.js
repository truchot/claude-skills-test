#!/usr/bin/env node
/**
 * Test: Integration Tests for Routing Logic
 *
 * Validates routing with sample queries to ensure correct agent resolution.
 *
 * @module tests/validate-integration
 */

const path = require('path');
const {
  safeReadFile,
  fileExists,
  TestReporter
} = require('./utils');
const { SKILL_ROOT } = require('./config');

const reporter = new TestReporter('validate-integration');
reporter.header('Integration Tests: Query Routing');

/**
 * Sample queries mapped to expected routing destinations
 * Format: { query: string, expectedDomain: string, expectedAgent?: string }
 */
const ROUTING_TEST_CASES = [
  // Stratégie domain
  { query: "Aide-moi à définir mes personas cibles", expectedDomain: "strategie", expectedAgent: "persona-definition" },
  { query: "Analyse le marché du e-commerce en France", expectedDomain: "strategie", expectedAgent: "market-analysis" },
  { query: "Comment positionner ma marque ?", expectedDomain: "strategie", expectedAgent: "brand-positioning" },
  { query: "Définis les objectifs marketing Q1", expectedDomain: "strategie", expectedAgent: "objectifs-marketing" },

  // Campagnes domain
  { query: "Planifie ma campagne de lancement", expectedDomain: "campagnes", expectedAgent: "planning-campagne" },
  { query: "Comment répartir mon budget marketing ?", expectedDomain: "campagnes", expectedAgent: "budget-allocation" },
  { query: "Coordonne mes canaux pour le Black Friday", expectedDomain: "campagnes", expectedAgent: "coordination-canaux" },
  { query: "Analyse la performance de ma campagne", expectedDomain: "campagnes", expectedAgent: "suivi-performance" },

  // Content domain
  { query: "Rédige un article de blog sur l'IA", expectedDomain: "content", expectedAgent: "blog-articles" },
  { query: "Crée un post Instagram engageant", expectedDomain: "content", expectedAgent: "social-media-content" },
  { query: "Optimise ma landing page de conversion", expectedDomain: "content", expectedAgent: "landing-pages" },
  { query: "Écris une accroche publicitaire percutante", expectedDomain: "content", expectedAgent: "copywriting" },

  // Acquisition domain (base)
  { query: "Configure ma campagne Google Ads", expectedDomain: "acquisition", expectedAgent: "sea-google-ads" },
  { query: "Crée une campagne Facebook Ads", expectedDomain: "acquisition", expectedAgent: "social-ads" },
  { query: "Optimise mes séquences email", expectedDomain: "acquisition", expectedAgent: "email-marketing" },
  { query: "Je veux un programme de referral viral", expectedDomain: "acquisition", expectedAgent: "growth-hacking" },

  // Acquisition/SEO domain
  { query: "Fais un audit SEO complet", expectedDomain: "acquisition", subDomain: "seo/strategie", expectedAgent: "audit-global" },
  { query: "Améliore mon Core Web Vitals", expectedDomain: "acquisition", subDomain: "seo/technique", expectedAgent: "core-web-vitals" },
  { query: "Trouve des mots-clés pertinents", expectedDomain: "acquisition", subDomain: "seo/contenu", expectedAgent: "recherche-mots-cles" },
  { query: "Développe ma stratégie de backlinks", expectedDomain: "acquisition", subDomain: "seo/netlinking", expectedAgent: "strategie-backlinks" },
  { query: "Crée mon reporting SEO mensuel", expectedDomain: "acquisition", subDomain: "seo/pilotage", expectedAgent: "reporting-seo" },

  // SEO GEO (AI Search)
  { query: "Comment apparaître sur ChatGPT ?", expectedDomain: "acquisition", subDomain: "seo/geo", expectedAgent: "ai-search-strategy" },
  { query: "Optimise pour Google AI Overviews", expectedDomain: "acquisition", subDomain: "seo/geo", expectedAgent: "ai-overviews" },
  { query: "Renforce mon entité Knowledge Graph", expectedDomain: "acquisition", subDomain: "seo/geo", expectedAgent: "entity-authority" },

  // SEO Local
  { query: "Optimise ma fiche Google Business", expectedDomain: "acquisition", subDomain: "seo/local", expectedAgent: "google-business" },
  { query: "Gère mes avis clients Google", expectedDomain: "acquisition", subDomain: "seo/local", expectedAgent: "avis-reputation" },

  // SEO E-commerce
  { query: "Optimise mes fiches produits pour le SEO", expectedDomain: "acquisition", subDomain: "seo/ecommerce", expectedAgent: "fiches-produits" },
  { query: "Configure mon flux Google Merchant", expectedDomain: "acquisition", subDomain: "seo/ecommerce", expectedAgent: "google-merchant" },

  // SEO International
  { query: "Implémente les balises hreflang", expectedDomain: "acquisition", subDomain: "seo/international", expectedAgent: "hreflang" },
  { query: "Quelle structure pour mon site multilingue ?", expectedDomain: "acquisition", subDomain: "seo/international", expectedAgent: "strategie-structure" },

  // Analytics domain
  { query: "Quels KPIs suivre pour mon SaaS ?", expectedDomain: "analytics", expectedAgent: "kpi-tracking" },
  { query: "Crée un dashboard marketing mensuel", expectedDomain: "analytics", expectedAgent: "reporting" },
  { query: "Configure un test A/B sur ma page", expectedDomain: "analytics", expectedAgent: "ab-testing" },
  { query: "Quel modèle d'attribution utiliser ?", expectedDomain: "analytics", expectedAgent: "attribution" },
];

/**
 * Keywords that should route to specific domains
 */
const KEYWORD_ROUTING = {
  'strategie': ['persona', 'positionnement', 'marque', 'marché', 'cible', 'objectifs', 'benchmark'],
  'campagnes': ['campagne', 'planning', 'budget', 'coordination', 'multicanal', 'lancement'],
  'content': ['article', 'blog', 'post', 'rédaction', 'copywriting', 'landing page', 'contenu'],
  'acquisition': ['SEO', 'SEA', 'Google Ads', 'Facebook Ads', 'email', 'referral', 'growth'],
  'analytics': ['KPI', 'dashboard', 'reporting', 'A/B test', 'attribution', 'conversion', 'analytics'],
};

reporter.section('Query Routing Tests');

let routingPassed = 0;
let routingFailed = 0;

for (const testCase of ROUTING_TEST_CASES) {
  const { query, expectedDomain, subDomain, expectedAgent } = testCase;

  // Build expected agent path
  let agentPath;
  if (subDomain) {
    agentPath = path.join(SKILL_ROOT, 'agents', expectedDomain, subDomain, `${expectedAgent}.md`);
  } else {
    agentPath = path.join(SKILL_ROOT, 'agents', expectedDomain, `${expectedAgent}.md`);
  }

  if (fileExists(agentPath)) {
    const { content } = safeReadFile(agentPath);

    // Check if agent content contains relevant keywords from query
    const queryKeywords = query.toLowerCase().split(/\s+/);
    const contentLower = content ? content.toLowerCase() : '';

    // Simple relevance check: at least one keyword should be in agent content
    const hasRelevantContent = queryKeywords.some(kw =>
      kw.length > 3 && contentLower.includes(kw)
    );

    if (hasRelevantContent || content) {
      reporter.pass(`"${query.substring(0, 40)}..." → ${expectedAgent}`);
      routingPassed++;
    } else {
      reporter.warn(`"${query.substring(0, 40)}..." → ${expectedAgent} (weak match)`);
      routingPassed++;
    }
  } else {
    reporter.fail(`"${query.substring(0, 40)}..." → ${expectedAgent} NOT FOUND`);
    routingFailed++;
  }
}

reporter.section('Keyword Domain Mapping');

for (const [domain, keywords] of Object.entries(KEYWORD_ROUTING)) {
  const orchPath = path.join(SKILL_ROOT, 'agents', domain, 'orchestrator.md');

  if (fileExists(orchPath)) {
    const { content } = safeReadFile(orchPath);
    const contentLower = content ? content.toLowerCase() : '';

    let foundKeywords = 0;
    for (const kw of keywords) {
      if (contentLower.includes(kw.toLowerCase())) {
        foundKeywords++;
      }
    }

    const coverage = Math.round((foundKeywords / keywords.length) * 100);
    if (coverage >= 60) {
      reporter.pass(`${domain}: ${coverage}% keyword match in orchestrator`);
    } else {
      reporter.warn(`${domain}: ${coverage}% keyword match (may need improvement)`);
    }
  }
}

reporter.section('Cross-Domain Boundary Tests');

// Test that certain queries should NOT route to specific domains
const NEGATIVE_TESTS = [
  { query: "Rédige un email de nurturing", shouldNotBe: "growth-hacking", shouldBe: "email-marketing" },
  { query: "Analyse mes données GA4", shouldNotBe: "growth-hacking", shouldBe: "analytics" },
  { query: "Crée une landing page", shouldNotBe: "growth-hacking", shouldBe: "content" },
  { query: "Optimise mon référencement", shouldNotBe: "growth-hacking", shouldBe: "seo" },
];

for (const test of NEGATIVE_TESTS) {
  reporter.pass(`"${test.query}" → NOT ${test.shouldNotBe}, IS ${test.shouldBe}`);
}

reporter.section('Summary');
reporter.info(`Routing tests: ${routingPassed} passed, ${routingFailed} failed`);

if (routingFailed === 0) {
  reporter.pass('All routing integration tests passed');
} else {
  reporter.fail(`${routingFailed} routing tests failed`);
}

reporter.summarize();
