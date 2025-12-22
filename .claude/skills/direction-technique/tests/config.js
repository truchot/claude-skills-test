/**
 * Centralized configuration for technical skill tests
 * @module tests/config
 */

const path = require('path');

/** @const {string} Base directory for the skill */
const SKILL_ROOT = path.join(__dirname, '..');

/** @const {string[]} Technical domains */
const DOMAINS = [
  'avant-projet',
  'specification',
  'architecture',
  'estimation',
  'qualite',
  'securite',
  'performance',
  'infrastructure',
  'communication',
  'support'
];

/** @const {Object} Expected agents per domain */
const EXPECTED_AGENTS_PER_DOMAIN = {
  'avant-projet': [
    'orchestrator',
    'selection-stack',
    'audit-existant',
    'etude-faisabilite',
    'poc-spike'
  ],
  'specification': [
    'orchestrator',
    'cadrage-technique',
    'specification-technique',
    'modelisation-donnees',
    'specification-api'
  ],
  'architecture': [
    'orchestrator',
    'architecture-systeme',
    'architecture-applicative',
    'patterns-design',
    'review-architecture',
    'adr'
  ],
  'estimation': [
    'orchestrator',
    'estimation-macro',
    'estimation-detaillee',
    'decoupe-taches',
    'analyse-risques'
  ],
  'qualite': [
    'orchestrator',
    'conventions-code',
    'code-review',
    'metriques-qualite',
    'dette-technique',
    'definition-of-done'
  ],
  'securite': [
    'orchestrator',
    'audit-securite',
    'securite-applicative',
    'gestion-secrets',
    'conformite-rgpd'
  ],
  'performance': [
    'orchestrator',
    'audit-performance',
    'optimisation-frontend',
    'optimisation-backend',
    'monitoring-perf'
  ],
  'infrastructure': [
    'orchestrator',
    'architecture-infra',
    'strategie-cicd',
    'environnements',
    'strategie-deploiement'
  ],
  'communication': [
    'orchestrator',
    'handoff-developpeur',
    'documentation-technique',
    'onboarding-technique',
    'reporting-technique'
  ],
  'support': [
    'orchestrator',
    'troubleshooting',
    'gestion-incidents',
    'post-mortem',
    'veille-technologique'
  ]
};

/**
 * Agent validation requirements
 * @const {Object}
 */
const AGENT_REQUIREMENTS = {
  /** Required frontmatter fields */
  frontmatter: ['name', 'description'],

  /** Minimum content length (characters) */
  minContentLength: 300,

  /** Expected sections for technical agents */
  expectedSections: ['Mission', 'Points d\'Escalade']
};

/**
 * Domain keywords for routing validation
 * @const {Object}
 */
const DOMAIN_KEYWORDS = {
  'avant-projet': ['stack', 'framework', 'POC', 'spike', 'audit', 'faisabilité'],
  'specification': ['spec', 'API', 'modèle', 'données', 'schéma'],
  'architecture': ['architecture', 'pattern', 'ADR', 'design'],
  'estimation': ['estimation', 'chiffrage', 'risque', 'tâche'],
  'qualite': ['qualité', 'review', 'test', 'dette', 'DoD', 'convention'],
  'securite': ['sécurité', 'OWASP', 'RGPD', 'secret', 'audit'],
  'performance': ['performance', 'latence', 'Core Web Vitals', 'monitoring'],
  'infrastructure': ['CI/CD', 'pipeline', 'déploiement', 'Kubernetes', 'Terraform'],
  'communication': ['handoff', 'documentation', 'onboarding', 'reporting'],
  'support': ['incident', 'post-mortem', 'troubleshooting', 'veille']
};

/**
 * Get total expected agent count
 * @returns {number} Total agents across all domains
 */
function getTotalExpectedAgents() {
  return Object.values(EXPECTED_AGENTS_PER_DOMAIN)
    .reduce((sum, agents) => sum + agents.length, 0);
}

module.exports = {
  SKILL_ROOT,
  DOMAINS,
  EXPECTED_AGENTS_PER_DOMAIN,
  AGENT_REQUIREMENTS,
  DOMAIN_KEYWORDS,
  getTotalExpectedAgents
};
