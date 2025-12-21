/**
 * Centralized configuration for web-agency skill tests
 * @module tests/config
 */

const path = require('path');

/** @const {string} Base directory for the web-agency skill */
const SKILL_ROOT = path.join(__dirname, '..');

/** @const {string} Directory containing all agents */
const AGENTS_DIR = path.join(SKILL_ROOT, 'agents');

/** @const {string} Directory for project management domain */
const PROJECT_MANAGEMENT_DIR = path.join(AGENTS_DIR, 'project-management');

/** @const {string} Directory containing templates */
const TEMPLATES_DIR = path.join(SKILL_ROOT, 'templates');

/** @const {string[]} Sub-domains in project management */
const PROJECT_MANAGEMENT_SUBDOMAINS = [
  'avant-projet',
  'pilotage',
  'communication',
  'livraison',
  'facturation'
];

/**
 * Agent validation requirements
 * @const {Object}
 */
const AGENT_REQUIREMENTS = {
  /** Required frontmatter fields */
  frontmatter: ['name', 'description'],

  /** Required markdown sections for SRP agents */
  requiredSections: [
    'Ta Responsabilité Unique',
    'Tu NE fais PAS'
  ],

  /** Required sections for orchestrators */
  orchestratorSections: [
    'Règles de Routage',
    'Agents'
  ],

  /** Minimum content length (characters) */
  minContentLength: 200
};

/**
 * Template validation requirements
 * @const {Object}
 */
const TEMPLATE_REQUIREMENTS = {
  /** Minimum number of heading sections */
  minHeadingCount: 3,

  /** Minimum content length (characters) */
  minContentLength: 500,

  /** Required placeholder patterns */
  placeholderPatterns: [
    /\[.*?\]/,       // [placeholder]
    /<!--.*?-->/s    // <!-- comment -->
  ]
};

/**
 * Keywords to skip when extracting agent references
 * @const {Set<string>}
 */
const SKIP_KEYWORDS = new Set([
  'orchestrator', 'templates', 'docs', 'agents',
  'project-management', 'web-agency',
  ...PROJECT_MANAGEMENT_SUBDOMAINS
]);

/**
 * Regex patterns for extracting agent references from markdown
 * Pre-compiled for performance
 * @const {RegExp[]}
 */
const AGENT_REFERENCE_PATTERNS = [
  /`([a-z][a-z0-9-]*)`/g,
  /→\s*([a-z][a-z0-9-]*\/[a-z][a-z0-9-]*)/g,
  /\|\s*`([a-z][a-z0-9-]*\/[a-z][a-z0-9-]*)`/g,
];

/**
 * Workflow definitions for integration testing
 * Each workflow defines a sequence of agents that should work together
 * @const {Object.<string, Object>}
 */
const WORKFLOWS = {
  'avant-projet-complete': {
    name: 'Workflow Avant-Projet Complet',
    description: 'From client request to commercial proposal',
    subdomain: 'avant-projet',
    steps: [
      { agent: 'collecte-besoin', input: 'client-email', output: 'extracted-data' },
      { agent: 'formalisation-brief', input: 'extracted-data', output: 'structured-brief' },
      { agent: 'questions-clarification', input: 'structured-brief', output: 'structured-brief' },
      { agent: 'analyse-perimetre', input: 'structured-brief', output: 'lots' },
      { agent: 'chiffrage', input: 'lots', output: 'estimation' },
      { agent: 'hypotheses-risques', input: 'estimation', output: 'estimation' },
      { agent: 'redaction-proposition', input: 'estimation', output: 'proposal' }
    ],
    template: 'proposition'
  },
  'pilotage-weekly': {
    name: 'Workflow Pilotage Hebdomadaire',
    description: 'Weekly project monitoring cycle',
    subdomain: 'pilotage',
    steps: [
      { agent: 'analyse-ecarts', input: 'planning-actuel', output: 'deviations' },
      { agent: 'alertes-projet', input: 'deviations', output: 'alerts' },
      { agent: 'reporting-hebdo', input: 'alerts', output: 'report' }
    ],
    template: 'reporting'
  },
  'livraison-recette': {
    name: 'Workflow Recette Livraison',
    description: 'Delivery and acceptance testing',
    subdomain: 'livraison',
    steps: [
      { agent: 'plan-recette', input: 'specs', output: 'test-plan' },
      { agent: 'grille-recette', input: 'test-plan', output: 'test-grid' },
      { agent: 'suivi-anomalies', input: 'test-grid', output: 'issues' },
      { agent: 'pv-recette', input: 'issues', output: 'acceptance-report' }
    ],
    template: 'pv-recette'
  }
};

/**
 * Sample data for template generation tests
 * @const {Object.<string, Object>}
 */
const SAMPLE_DATA = {
  client: {
    name: 'Acme Corp',
    sector: 'E-commerce',
    contact: 'Jean Dupont',
    email: 'jean.dupont@acme.fr'
  },
  project: {
    name: 'Refonte Site Web',
    budget: '50 000 €',
    deadline: '2025-06-01',
    startDate: '2025-02-01'
  },
  features: [
    { name: 'Page d\'accueil', days: 5 },
    { name: 'Catalogue produits', days: 10 },
    { name: 'Panier et checkout', days: 15 },
    { name: 'Espace client', days: 8 }
  ]
};

/**
 * Expected routing rules per subdomain orchestrator
 * Maps user intents to expected agent names
 * @const {Object.<string, Object[]>}
 */
const EXPECTED_ROUTING = {
  'avant-projet': [
    { intent: 'email du client', agent: 'collecte-besoin' },
    { intent: 'notes de réunion', agent: 'collecte-besoin' },
    { intent: 'structure le brief', agent: 'formalisation-brief' },
    { intent: 'questions à poser', agent: 'questions-clarification' },
    { intent: 'découpe en lots', agent: 'analyse-perimetre' },
    { intent: 'chiffrage', agent: 'chiffrage' },
    { intent: 'risques', agent: 'hypotheses-risques' },
    { intent: 'proposition commerciale', agent: 'redaction-proposition' }
  ],
  'pilotage': [
    { intent: 'planning', agent: 'creation-planning' },
    { intent: 'dépendances', agent: 'analyse-dependances' },
    { intent: 'écarts', agent: 'analyse-ecarts' },
    { intent: 'alertes', agent: 'alertes-projet' },
    { intent: 'reporting', agent: 'reporting-hebdo' }
  ],
  'communication': [
    { intent: 'relance', agent: 'email-relance' },
    { intent: 'validation', agent: 'email-demande-validation' },
    { intent: 'livraison', agent: 'email-annonce-livraison' },
    { intent: 'information', agent: 'email-demande-information' },
    { intent: 'retard', agent: 'email-annonce-retard' },
    { intent: 'compte-rendu', agent: 'compte-rendu' }
  ],
  'livraison': [
    { intent: 'plan de recette', agent: 'plan-recette' },
    { intent: 'grille de test', agent: 'grille-recette' },
    { intent: 'anomalies', agent: 'suivi-anomalies' },
    { intent: 'pv recette', agent: 'pv-recette' }
  ],
  'facturation': [
    { intent: 'facture', agent: 'preparation-facture' },
    { intent: 'paiements', agent: 'suivi-paiements' }
  ]
};

module.exports = {
  SKILL_ROOT,
  AGENTS_DIR,
  PROJECT_MANAGEMENT_DIR,
  TEMPLATES_DIR,
  PROJECT_MANAGEMENT_SUBDOMAINS,
  AGENT_REQUIREMENTS,
  TEMPLATE_REQUIREMENTS,
  SKIP_KEYWORDS,
  AGENT_REFERENCE_PATTERNS,
  WORKFLOWS,
  SAMPLE_DATA,
  EXPECTED_ROUTING
};
