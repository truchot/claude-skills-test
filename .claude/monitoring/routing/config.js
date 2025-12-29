/**
 * Routing Monitoring Configuration
 *
 * Centralized configuration for agent routing efficiency monitoring.
 * Monitors 360+ agents across 16 skills for routing overhead and ambiguity.
 *
 * @module monitoring/routing/config
 */

const path = require('path');

/** @const {string} Skills root directory */
const SKILLS_ROOT = path.join(__dirname, '../../skills');

/** @const {string} Monitoring output directory */
const OUTPUT_DIR = path.join(__dirname, 'reports');

/**
 * Performance budgets for routing operations
 * @const {Object}
 */
const PERFORMANCE_BUDGETS = {
  // Maximum acceptable agents per skill before warning
  maxAgentsPerSkill: 50,

  // Maximum total agents before critical warning
  maxTotalAgents: 400,

  // Maximum keywords per domain before ambiguity risk
  maxKeywordsPerDomain: 15,

  // Minimum keyword uniqueness ratio (unique/total)
  minKeywordUniqueness: 0.7,

  // Maximum routing depth (skill → domain → agent)
  maxRoutingDepth: 3,

  // Maximum overlapping keywords between skills
  maxKeywordOverlap: 5,

  // Minimum agent coverage (% of keywords with clear routing)
  minAgentCoverage: 0.85
};

/**
 * Routing efficiency thresholds
 * @const {Object}
 */
const EFFICIENCY_THRESHOLDS = {
  // Routing complexity score thresholds
  complexity: {
    low: 0.3,      // Simple, direct routing
    medium: 0.6,   // Moderate complexity
    high: 0.8,     // High complexity, may need optimization
    critical: 1.0  // Critical - routing overhead likely
  },

  // Ambiguity score thresholds
  ambiguity: {
    low: 0.1,      // Clear, unambiguous routing
    medium: 0.3,   // Some potential for misrouting
    high: 0.5,     // Significant ambiguity risk
    critical: 0.7  // Critical - high misrouting probability
  }
};

/**
 * Skills to monitor with their expected structure
 * @const {Object}
 */
const MONITORED_SKILLS = {
  'backend-developer': { expectedAgents: 45, hasOrchestrator: true },
  'content': { expectedAgents: 1, hasOrchestrator: false },
  'design': { expectedAgents: 1, hasOrchestrator: false },
  'design-system-foundations': { expectedAgents: 21, hasOrchestrator: true },
  'direction-technique': { expectedAgents: 52, hasOrchestrator: true },
  'frontend-developer': { expectedAgents: 33, hasOrchestrator: true },
  'lead-dev': { expectedAgents: 27, hasOrchestrator: true },
  'marketing': { expectedAgents: 1, hasOrchestrator: false },
  'nextjs-expert': { expectedAgents: 35, hasOrchestrator: true },
  'project-management': { expectedAgents: 24, hasOrchestrator: true },
  'react-expert': { expectedAgents: 28, hasOrchestrator: true },
  'strategy': { expectedAgents: 1, hasOrchestrator: false },
  'web-agency': { expectedAgents: 0, hasOrchestrator: true, isMetaOrchestrator: true },
  'web-dev-process': { expectedAgents: 64, hasOrchestrator: true },
  'wordpress-gutenberg-expert': { expectedAgents: 42, hasOrchestrator: true }
};

/**
 * Metric collection configuration
 * @const {Object}
 */
const METRICS_CONFIG = {
  // Collect keyword frequency analysis
  collectKeywordMetrics: true,

  // Collect agent invocation patterns
  collectInvocationPatterns: true,

  // Collect routing path analysis
  collectRoutingPaths: true,

  // Collect ambiguity detection
  collectAmbiguityAnalysis: true,

  // Collect coverage analysis
  collectCoverageMetrics: true,

  // Enable historical comparison
  enableHistoricalComparison: true,

  // Days to keep historical data
  historyRetentionDays: 30
};

/**
 * Report generation settings
 * @const {Object}
 */
const REPORT_SETTINGS = {
  formats: ['json', 'markdown', 'summary'],

  // Include recommendations in report
  includeRecommendations: true,

  // Include skill-by-skill breakdown
  includeSkillBreakdown: true,

  // Include keyword overlap matrix
  includeOverlapMatrix: true,

  // Include routing path visualization
  includeRoutingPaths: true
};

module.exports = {
  SKILLS_ROOT,
  OUTPUT_DIR,
  PERFORMANCE_BUDGETS,
  EFFICIENCY_THRESHOLDS,
  MONITORED_SKILLS,
  METRICS_CONFIG,
  REPORT_SETTINGS
};
