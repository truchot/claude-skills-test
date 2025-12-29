#!/usr/bin/env node
/**
 * Routing Validation Framework
 *
 * Measures the delta between observed routing (what the AI chose)
 * and expected routing (what should have been chosen).
 *
 * Usage:
 *   node routing-validation.js test     # Run all test cases
 *   node routing-validation.js add      # Add a new test case interactively
 *   node routing-validation.js report   # Generate validation report
 *
 * @module monitoring/routing/routing-validation
 */

const fs = require('fs');
const path = require('path');

const TEST_CASES_FILE = path.join(__dirname, 'test-cases.json');
const RESULTS_FILE = path.join(__dirname, 'validation-results.json');

/**
 * Load test cases from file
 * @returns {Array} Test cases
 */
function loadTestCases() {
  if (!fs.existsSync(TEST_CASES_FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(TEST_CASES_FILE, 'utf8'));
}

/**
 * Save test cases to file
 * @param {Array} testCases - Test cases to save
 */
function saveTestCases(testCases) {
  fs.writeFileSync(TEST_CASES_FILE, JSON.stringify(testCases, null, 2));
}

/**
 * Load validation results
 * @returns {Object} Results history
 */
function loadResults() {
  if (!fs.existsSync(RESULTS_FILE)) {
    return { runs: [] };
  }
  return JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));
}

/**
 * Save validation results
 * @param {Object} results - Results to save
 */
function saveResults(results) {
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
}

/**
 * Record an observed routing decision
 * Call this when the AI makes a routing decision
 *
 * @param {string} query - The user query
 * @param {string} observedSkill - The skill that was chosen
 * @param {string} expectedSkill - The skill that should have been chosen (if known)
 * @param {Object} context - Additional context (conversation history, etc.)
 */
function recordRoutingDecision(query, observedSkill, expectedSkill = null, context = {}) {
  const results = loadResults();

  const decision = {
    timestamp: new Date().toISOString(),
    query,
    observed: observedSkill,
    expected: expectedSkill,
    correct: expectedSkill ? observedSkill === expectedSkill : null,
    context
  };

  if (!results.decisions) {
    results.decisions = [];
  }
  results.decisions.push(decision);

  saveResults(results);
  return decision;
}

/**
 * Calculate routing accuracy metrics
 * @param {Array} decisions - Array of routing decisions
 * @returns {Object} Accuracy metrics
 */
function calculateMetrics(decisions) {
  const evaluated = decisions.filter(d => d.expected !== null);

  if (evaluated.length === 0) {
    return {
      total: decisions.length,
      evaluated: 0,
      accuracy: null,
      message: 'No decisions with expected values to evaluate'
    };
  }

  const correct = evaluated.filter(d => d.correct).length;
  const incorrect = evaluated.filter(d => !d.correct).length;

  // Group errors by skill pair
  const errorPatterns = {};
  evaluated.filter(d => !d.correct).forEach(d => {
    const key = `${d.expected} → ${d.observed}`;
    if (!errorPatterns[key]) {
      errorPatterns[key] = { count: 0, examples: [] };
    }
    errorPatterns[key].count++;
    if (errorPatterns[key].examples.length < 3) {
      errorPatterns[key].examples.push(d.query);
    }
  });

  // Accuracy by skill
  const bySkill = {};
  evaluated.forEach(d => {
    if (!bySkill[d.expected]) {
      bySkill[d.expected] = { total: 0, correct: 0 };
    }
    bySkill[d.expected].total++;
    if (d.correct) bySkill[d.expected].correct++;
  });

  Object.keys(bySkill).forEach(skill => {
    bySkill[skill].accuracy = bySkill[skill].correct / bySkill[skill].total;
  });

  return {
    total: decisions.length,
    evaluated: evaluated.length,
    correct,
    incorrect,
    accuracy: correct / evaluated.length,
    errorPatterns: Object.entries(errorPatterns)
      .sort((a, b) => b[1].count - a[1].count)
      .map(([pattern, data]) => ({ pattern, ...data })),
    bySkill
  };
}

/**
 * Format metrics as a report
 * @param {Object} metrics - Calculated metrics
 * @returns {string} Formatted report
 */
function formatReport(metrics) {
  if (metrics.accuracy === null) {
    return `
No routing decisions with expected values to evaluate.

To start collecting data:
1. Add test cases: node routing-validation.js add
2. Or record decisions programmatically with recordRoutingDecision()
`;
  }

  const accuracyPercent = (metrics.accuracy * 100).toFixed(1);
  const icon = metrics.accuracy >= 0.9 ? '✓' :
               metrics.accuracy >= 0.7 ? '○' : '⚠️';

  let report = `
╔══════════════════════════════════════════════════════════════════╗
║            ROUTING VALIDATION REPORT                             ║
╚══════════════════════════════════════════════════════════════════╝

📊 ACCURACY
────────────────────────────────────────────
  Total Decisions:    ${String(metrics.total).padStart(5)}
  Evaluated:          ${String(metrics.evaluated).padStart(5)}
  Correct:            ${String(metrics.correct).padStart(5)} ✓
  Incorrect:          ${String(metrics.incorrect).padStart(5)} ✗

  ACCURACY:           ${accuracyPercent.padStart(5)}% ${icon}
`;

  if (metrics.errorPatterns.length > 0) {
    report += `
⚠️  ERROR PATTERNS (expected → observed)
────────────────────────────────────────────`;
    metrics.errorPatterns.slice(0, 5).forEach(ep => {
      report += `\n  ${ep.pattern}: ${ep.count} occurrences`;
      ep.examples.forEach(ex => {
        report += `\n    • "${ex.substring(0, 50)}${ex.length > 50 ? '...' : ''}"`;
      });
    });
  }

  report += `

📈 ACCURACY BY SKILL
────────────────────────────────────────────`;
  Object.entries(metrics.bySkill)
    .sort((a, b) => a[1].accuracy - b[1].accuracy)
    .forEach(([skill, data]) => {
      const pct = (data.accuracy * 100).toFixed(0);
      const bar = '█'.repeat(Math.floor(data.accuracy * 20));
      const skillIcon = data.accuracy >= 0.9 ? '✓' : data.accuracy >= 0.7 ? '○' : '✗';
      report += `\n  ${skill.padEnd(35)} ${pct.padStart(3)}% ${bar} ${skillIcon}`;
    });

  report += '\n';
  return report;
}

/**
 * Example test cases for routing validation
 * These define the expected routing for specific queries
 */
const EXAMPLE_TEST_CASES = [
  // Project Management
  { query: "Le client veut un devis pour un site e-commerce", expected: "project-management/avant-projet" },
  { query: "Prépare un compte-rendu de la réunion", expected: "project-management/communication" },
  { query: "Où en est le planning du projet ?", expected: "project-management/pilotage" },

  // Direction Technique
  { query: "Quelle stack choisir pour ce projet ?", expected: "direction-technique/avant-projet" },
  { query: "Comment architecturer le système d'authentification ?", expected: "direction-technique/architecture" },
  { query: "Quelles sont les normes RGPD à respecter ?", expected: "direction-technique/securite" },

  // Lead Dev
  { query: "Review cette PR s'il te plaît", expected: "lead-dev/code-review" },
  { query: "Comment débloquer le dev junior sur ce bug ?", expected: "lead-dev/mentoring" },
  { query: "Prépare la release de vendredi", expected: "lead-dev/delivery" },

  // React Expert
  { query: "Comment utiliser useEffect correctement ?", expected: "react-expert/hooks" },
  { query: "Quelle lib de state management choisir ?", expected: "react-expert/state" },
  { query: "Comment tester ce composant avec RTL ?", expected: "react-expert/testing" },

  // Next.js Expert
  { query: "Comment fonctionne le App Router ?", expected: "nextjs-expert/app-router" },
  { query: "Quand utiliser un Server Component ?", expected: "nextjs-expert/server-components" },
  { query: "Comment configurer le déploiement Vercel ?", expected: "nextjs-expert/deployment" },

  // DevOps
  { query: "Configure le pipeline GitHub Actions", expected: "devops/cicd" },
  { query: "Comment écrire le Dockerfile ?", expected: "devops/containers" },
  { query: "Configure le déploiement Kubernetes", expected: "devops/kubernetes" },

  // Ambiguous cases - test disambiguation
  { query: "Comment améliorer les performances ?", expected: "direction-technique/performance", context: "Première question, pas de contexte techno" },
  { query: "Comment améliorer les performances du bundle React ?", expected: "frontend-developer/performance", context: "Contexte frontend explicite" },
  { query: "Configure les tests de performance", expected: "testing-process/performance", context: "Contexte testing explicite" }
];

/**
 * Initialize test cases file with examples
 */
function initTestCases() {
  if (!fs.existsSync(TEST_CASES_FILE)) {
    saveTestCases(EXAMPLE_TEST_CASES);
    console.log(`Created ${TEST_CASES_FILE} with ${EXAMPLE_TEST_CASES.length} example test cases`);
  } else {
    console.log(`${TEST_CASES_FILE} already exists`);
  }
}

/**
 * Run validation and generate report
 */
function runValidation() {
  const results = loadResults();
  const decisions = results.decisions || [];

  if (decisions.length === 0) {
    console.log(`
No routing decisions recorded yet.

To collect data, call recordRoutingDecision() when the AI makes a routing choice:

  const { recordRoutingDecision } = require('./routing-validation');

  // When AI chooses a skill:
  recordRoutingDecision(
    "Comment utiliser useEffect ?",  // User query
    "react-expert/hooks",             // Skill the AI chose
    "react-expert/hooks"              // Expected skill (optional, for validation)
  );

Or import the test cases to simulate:
  node routing-validation.js init
`);
    return;
  }

  const metrics = calculateMetrics(decisions);
  console.log(formatReport(metrics));
}

// Main execution
if (require.main === module) {
  const command = process.argv[2] || 'report';

  switch (command) {
    case 'init':
      initTestCases();
      break;

    case 'report':
      runValidation();
      break;

    case 'clear':
      saveResults({ runs: [], decisions: [] });
      console.log('Cleared all validation results');
      break;

    case 'help':
    case '--help':
    case '-h':
      console.log(`
Routing Validation Framework

Usage:
  node routing-validation.js [command]

Commands:
  init     Create test-cases.json with example test cases
  report   Generate validation report from recorded decisions
  clear    Clear all recorded decisions

Programmatic usage:
  const { recordRoutingDecision } = require('./routing-validation');

  // Record a routing decision for later analysis
  recordRoutingDecision(query, observedSkill, expectedSkill);
`);
      break;

    default:
      console.error(`Unknown command: ${command}`);
      process.exit(1);
  }
}

module.exports = {
  recordRoutingDecision,
  calculateMetrics,
  loadTestCases,
  loadResults
};
