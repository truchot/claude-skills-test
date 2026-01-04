/**
 * Centralized configuration for marketing skill tests
 *
 * @module tests/config
 */

const path = require('path');

/** @const {string} Base directory for the skill */
const SKILL_ROOT = path.join(__dirname, '..');

/** @const {string[]} Marketing domains */
const DOMAINS = [
  'strategie',
  'campagnes',
  'content',
  'acquisition',
  'analytics'
];

/** @const {string[]} SEO sub-domains */
const SEO_DOMAINS = [
  'strategie',
  'technique',
  'contenu',
  'netlinking',
  'pilotage',
  'geo',
  'local',
  'ecommerce',
  'international'
];

/** @const {Object} Expected agents per domain */
const EXPECTED_AGENTS_PER_DOMAIN = {
  'strategie': [
    'orchestrator',
    'market-analysis',
    'persona-definition',
    'brand-positioning',
    'objectifs-marketing'
  ],
  'campagnes': [
    'orchestrator',
    'planning-campagne',
    'budget-allocation',
    'coordination-canaux',
    'suivi-performance'
  ],
  'content': [
    'orchestrator',
    'copywriting',
    'blog-articles',
    'social-media-content',
    'landing-pages'
  ],
  'acquisition': [
    'orchestrator',
    'sea-google-ads',
    'social-ads',
    'email-marketing',
    'growth-hacking'
  ],
  'analytics': [
    'orchestrator',
    'kpi-tracking',
    'reporting',
    'attribution',
    'ab-testing'
  ]
};

/** @const {Object} Expected SEO agents per sub-domain */
const EXPECTED_SEO_AGENTS = {
  'seo': ['orchestrator'],
  'seo/strategie': [
    'orchestrator',
    'audit-global',
    'roadmap-seo',
    'analyse-concurrentielle',
    'opportunites-keywords'
  ],
  'seo/technique': [
    'orchestrator',
    'crawl-indexation',
    'core-web-vitals',
    'architecture-site',
    'javascript-seo',
    'migration-seo'
  ],
  'seo/contenu': [
    'orchestrator',
    'recherche-mots-cles',
    'brief-redactionnel',
    'optimisation-on-page',
    'semantique-seo',
    'content-refresh'
  ],
  'seo/netlinking': [
    'orchestrator',
    'strategie-backlinks',
    'prospection-liens',
    'analyse-profil-liens',
    'outreach-partenariats'
  ],
  'seo/pilotage': [
    'orchestrator',
    'reporting-seo',
    'suivi-positions',
    'analytics-seo',
    'veille-algorithmes'
  ],
  'seo/geo': [
    'orchestrator',
    'ai-search-strategy',
    'ai-overviews',
    'entity-authority',
    'citation-optimization',
    'llm-content-strategy'
  ],
  'seo/local': [
    'orchestrator',
    'google-business',
    'citations-nap',
    'avis-reputation',
    'local-content'
  ],
  'seo/ecommerce': [
    'orchestrator',
    'fiches-produits',
    'categories-navigation',
    'google-merchant',
    'stock-lifecycle'
  ],
  'seo/international': [
    'orchestrator',
    'strategie-structure',
    'hreflang',
    'localisation-contenu',
    'geotargeting'
  ]
};

/**
 * Agent validation requirements
 * @const {Object}
 */
const AGENT_REQUIREMENTS = {
  frontmatter: ['name', 'description'],
  minOrchestratorLength: 500,
  minAgentLength: 300,
  minContentLength: 300,
  orchestratorSections: ['Règles de Routage'],
  agentSections: ['Rôle']
};

/**
 * Domain keywords for routing validation
 * @const {Object}
 */
const DOMAIN_KEYWORDS = {
  'strategie': ['positionnement', 'marque', 'brand', 'marché', 'persona', 'cible', 'objectifs'],
  'campagnes': ['campagne', 'planning', 'budget', 'multicanal', 'coordination'],
  'content': ['copywriting', 'rédaction', 'article', 'blog', 'social media', 'landing page'],
  'acquisition': ['SEO', 'SEA', 'Google Ads', 'Facebook Ads', 'email', 'growth'],
  'analytics': ['analytics', 'données', 'A/B test', 'rapport', 'attribution']
};

/**
 * Get total expected agent count
 * @returns {number} Total agents across all domains
 */
function getTotalExpectedAgents() {
  const baseAgents = Object.values(EXPECTED_AGENTS_PER_DOMAIN)
    .reduce((sum, agents) => sum + agents.length, 0);
  const seoAgents = Object.values(EXPECTED_SEO_AGENTS)
    .reduce((sum, agents) => sum + agents.length, 0);
  return baseAgents + seoAgents;
}

/**
 * Get expected agent count (should be 74)
 * @returns {number}
 */
function getExpectedTotal() {
  return 74;
}

module.exports = {
  SKILL_ROOT,
  DOMAINS,
  SEO_DOMAINS,
  EXPECTED_AGENTS_PER_DOMAIN,
  EXPECTED_SEO_AGENTS,
  AGENT_REQUIREMENTS,
  DOMAIN_KEYWORDS,
  getTotalExpectedAgents,
  getExpectedTotal
};
