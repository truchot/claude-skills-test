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
 * Routing quality thresholds
 * Focus on ambiguity detection, not arbitrary quotas
 * @const {Object}
 */
const ROUTING_THRESHOLDS = {
  // Maximum overlapping keywords between skills before warning
  // High overlap = high risk of misrouting
  maxKeywordOverlap: 5,

  // Minimum keyword uniqueness ratio (unique/total)
  minKeywordUniqueness: 0.7,

  // Maximum routing depth (skill → domain → agent)
  maxRoutingDepth: 3,

  // Minimum agent coverage (reachable from entry points)
  minAgentCoverage: 0.85,

  // Maximum path exploration depth (prevents stack overflow)
  maxExplorationDepth: 50,

  // Maximum paths to collect (prevents memory exhaustion)
  maxPaths: 10000,

  // Maximum input size for regex operations (prevents ReDoS)
  maxInputSize: 1048576, // 1MB

  // Branching factor thresholds for ambiguity hotspots
  branchingFactor: {
    medium: 5,   // Warning level
    high: 10,    // Significant ambiguity
    critical: 20 // Needs immediate attention
  }
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
 * Updated after merge with main branch (2025-12-29)
 * @const {Object}
 */
const MONITORED_SKILLS = {
  'backend-developer': { expectedAgents: 38, hasOrchestrator: true },
  'design-system-foundations': { expectedAgents: 21, hasOrchestrator: true },
  'devops': { expectedAgents: 35, hasOrchestrator: true },
  'direction-technique': { expectedAgents: 60, hasOrchestrator: true },
  'frontend-developer': { expectedAgents: 33, hasOrchestrator: true },
  'lead-dev': { expectedAgents: 27, hasOrchestrator: true },
  'nextjs-expert': { expectedAgents: 35, hasOrchestrator: true },
  'project-management': { expectedAgents: 24, hasOrchestrator: true },
  'react-expert': { expectedAgents: 28, hasOrchestrator: true },
  'testing-process': { expectedAgents: 26, hasOrchestrator: true },
  'web-agency': { expectedAgents: 0, hasOrchestrator: true, isMetaOrchestrator: true },
  'web-dev-process': { expectedAgents: 70, hasOrchestrator: true },
  'wordpress-gutenberg-expert': { expectedAgents: 45, hasOrchestrator: true }
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
  ROUTING_THRESHOLDS,
  EFFICIENCY_THRESHOLDS,
  MONITORED_SKILLS,
  METRICS_CONFIG,
  REPORT_SETTINGS
};
