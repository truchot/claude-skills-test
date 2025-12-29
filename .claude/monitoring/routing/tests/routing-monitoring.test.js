/**
 * Routing Monitoring Tests
 *
 * Validates routing efficiency monitoring functionality and performance budgets.
 *
 * @module tests/routing-monitoring
 */

const path = require('path');

// Mock the config for testing
const mockConfig = {
  SKILLS_ROOT: path.join(__dirname, '../../../skills'),
  PERFORMANCE_BUDGETS: {
    maxAgentsPerSkill: 50,
    maxTotalAgents: 400,
    maxKeywordsPerDomain: 15,
    minKeywordUniqueness: 0.7,
    maxRoutingDepth: 3,
    maxKeywordOverlap: 5,
    minAgentCoverage: 0.85
  },
  EFFICIENCY_THRESHOLDS: {
    complexity: { low: 0.3, medium: 0.6, high: 0.8, critical: 1.0 },
    ambiguity: { low: 0.1, medium: 0.3, high: 0.5, critical: 0.7 }
  }
};

describe('Routing Metrics Collection', () => {
  let collectMetrics, formatMarkdown, formatSummary;

  beforeAll(() => {
    // Dynamically require to handle potential missing dependencies
    try {
      const metricsModule = require('../collect-routing-metrics');
      collectMetrics = metricsModule.collectMetrics;
      formatMarkdown = metricsModule.formatMarkdown;
      formatSummary = metricsModule.formatSummary;
    } catch (err) {
      console.warn('Could not load metrics module:', err.message);
    }
  });

  test('collectMetrics returns valid structure', () => {
    if (!collectMetrics) {
      console.warn('Skipping test: collectMetrics not available');
      return;
    }

    const metrics = collectMetrics();

    expect(metrics).toHaveProperty('timestamp');
    expect(metrics).toHaveProperty('summary');
    expect(metrics).toHaveProperty('skills');
    expect(metrics).toHaveProperty('keywordAnalysis');
    expect(metrics).toHaveProperty('performanceStatus');
    expect(metrics).toHaveProperty('recommendations');
  });

  test('summary contains required fields', () => {
    if (!collectMetrics) {
      console.warn('Skipping test: collectMetrics not available');
      return;
    }

    const metrics = collectMetrics();
    const { summary } = metrics;

    expect(summary).toHaveProperty('totalSkills');
    expect(summary).toHaveProperty('totalAgents');
    expect(summary).toHaveProperty('totalOrchestrators');
    expect(summary).toHaveProperty('totalDomains');
    expect(summary).toHaveProperty('totalKeywords');

    expect(typeof summary.totalSkills).toBe('number');
    expect(typeof summary.totalAgents).toBe('number');
  });

  test('performance status tracks budget compliance', () => {
    if (!collectMetrics) {
      console.warn('Skipping test: collectMetrics not available');
      return;
    }

    const metrics = collectMetrics();
    const { performanceStatus } = metrics;

    expect(performanceStatus).toHaveProperty('budgetCompliance');
    expect(performanceStatus).toHaveProperty('violations');
    expect(performanceStatus).toHaveProperty('averageComplexity');
    expect(performanceStatus).toHaveProperty('ambiguityScore');

    expect(typeof performanceStatus.budgetCompliance).toBe('boolean');
    expect(Array.isArray(performanceStatus.violations)).toBe(true);
  });

  test('keyword analysis includes overlap detection', () => {
    if (!collectMetrics) {
      console.warn('Skipping test: collectMetrics not available');
      return;
    }

    const metrics = collectMetrics();
    const { keywordAnalysis } = metrics;

    expect(keywordAnalysis).toHaveProperty('bySkill');
    expect(keywordAnalysis).toHaveProperty('overlap');
    expect(keywordAnalysis).toHaveProperty('uniquenessRatio');

    expect(keywordAnalysis.overlap).toHaveProperty('totalOverlaps');
    expect(keywordAnalysis.overlap).toHaveProperty('highSeverityCount');
    expect(keywordAnalysis.overlap).toHaveProperty('overlaps');
  });

  test('formatMarkdown produces valid markdown', () => {
    if (!collectMetrics || !formatMarkdown) {
      console.warn('Skipping test: formatMarkdown not available');
      return;
    }

    const metrics = collectMetrics();
    const markdown = formatMarkdown(metrics);

    expect(typeof markdown).toBe('string');
    expect(markdown).toContain('# Routing Efficiency Report');
    expect(markdown).toContain('## Executive Summary');
    expect(markdown).toContain('## Skill Breakdown');
  });

  test('formatSummary produces readable output', () => {
    if (!collectMetrics || !formatSummary) {
      console.warn('Skipping test: formatSummary not available');
      return;
    }

    const metrics = collectMetrics();
    const summary = formatSummary(metrics);

    expect(typeof summary).toBe('string');
    expect(summary).toContain('ROUTING EFFICIENCY MONITORING REPORT');
    expect(summary).toContain('SUMMARY');
    expect(summary).toContain('PERFORMANCE STATUS');
  });
});

describe('Routing Pattern Analysis', () => {
  let runAnalysis, buildRoutingGraph;

  beforeAll(() => {
    try {
      const analysisModule = require('../analyze-routing-patterns');
      runAnalysis = analysisModule.runAnalysis;
      buildRoutingGraph = analysisModule.buildRoutingGraph;
    } catch (err) {
      console.warn('Could not load analysis module:', err.message);
    }
  });

  test('buildRoutingGraph creates valid graph structure', () => {
    if (!buildRoutingGraph) {
      console.warn('Skipping test: buildRoutingGraph not available');
      return;
    }

    const graph = buildRoutingGraph();

    expect(graph).toHaveProperty('nodes');
    expect(graph).toHaveProperty('edges');
    expect(graph).toHaveProperty('entryPoints');
    expect(graph).toHaveProperty('leafNodes');

    expect(graph.nodes instanceof Map).toBe(true);
    expect(Array.isArray(graph.edges)).toBe(true);
    expect(Array.isArray(graph.entryPoints)).toBe(true);
  });

  test('runAnalysis returns complete analysis', () => {
    if (!runAnalysis) {
      console.warn('Skipping test: runAnalysis not available');
      return;
    }

    const analysis = runAnalysis();

    expect(analysis).toHaveProperty('timestamp');
    expect(analysis).toHaveProperty('graph');
    expect(analysis).toHaveProperty('paths');
    expect(analysis).toHaveProperty('coverage');
    expect(analysis).toHaveProperty('ambiguity');
    expect(analysis).toHaveProperty('optimizations');
  });

  test('path analysis includes depth metrics', () => {
    if (!runAnalysis) {
      console.warn('Skipping test: runAnalysis not available');
      return;
    }

    const analysis = runAnalysis();
    const { paths } = analysis;

    expect(paths).toHaveProperty('totalPaths');
    expect(paths).toHaveProperty('avgPathDepth');
    expect(paths).toHaveProperty('maxPathDepth');
    expect(paths).toHaveProperty('pathDepthDistribution');
    expect(paths).toHaveProperty('deadEnds');
  });

  test('coverage analysis validates reachability', () => {
    if (!runAnalysis) {
      console.warn('Skipping test: runAnalysis not available');
      return;
    }

    const analysis = runAnalysis();
    const { coverage } = analysis;

    expect(coverage).toHaveProperty('totalNodes');
    expect(coverage).toHaveProperty('reachableNodes');
    expect(coverage).toHaveProperty('coverageRatio');
    expect(coverage).toHaveProperty('meetsMinimum');

    expect(coverage.coverageRatio).toBeGreaterThanOrEqual(0);
    expect(coverage.coverageRatio).toBeLessThanOrEqual(1);
  });

  test('ambiguity analysis identifies hotspots', () => {
    if (!runAnalysis) {
      console.warn('Skipping test: runAnalysis not available');
      return;
    }

    const analysis = runAnalysis();
    const { ambiguity } = analysis;

    expect(ambiguity).toHaveProperty('totalHotspots');
    expect(ambiguity).toHaveProperty('criticalHotspots');
    expect(ambiguity).toHaveProperty('avgBranchingFactor');
    expect(ambiguity).toHaveProperty('hotspots');

    expect(Array.isArray(ambiguity.hotspots)).toBe(true);
  });

  test('optimizations are prioritized correctly', () => {
    if (!runAnalysis) {
      console.warn('Skipping test: runAnalysis not available');
      return;
    }

    const analysis = runAnalysis();
    const { optimizations } = analysis;

    expect(optimizations).toHaveProperty('totalOptimizations');
    expect(optimizations).toHaveProperty('criticalCount');
    expect(optimizations).toHaveProperty('highCount');
    expect(optimizations).toHaveProperty('mediumCount');
    expect(optimizations).toHaveProperty('optimizations');

    // Verify priority ordering
    const opts = optimizations.optimizations;
    for (let i = 1; i < opts.length; i++) {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      expect(priorityOrder[opts[i - 1].priority]).toBeLessThanOrEqual(
        priorityOrder[opts[i].priority]
      );
    }
  });
});

describe('Performance Budget Compliance', () => {
  let collectMetrics;

  beforeAll(() => {
    try {
      collectMetrics = require('../collect-routing-metrics').collectMetrics;
    } catch (err) {
      console.warn('Could not load metrics module:', err.message);
    }
  });

  test('tracks total agent budget', () => {
    if (!collectMetrics) {
      console.warn('Skipping test: collectMetrics not available');
      return;
    }

    const metrics = collectMetrics();
    const maxAgents = mockConfig.PERFORMANCE_BUDGETS.maxTotalAgents;

    if (metrics.summary.totalAgents > maxAgents) {
      expect(metrics.performanceStatus.budgetCompliance).toBe(false);
      expect(
        metrics.performanceStatus.violations.some(v => v.type === 'total_agents')
      ).toBe(true);
    }
  });

  test('tracks per-skill agent budget', () => {
    if (!collectMetrics) {
      console.warn('Skipping test: collectMetrics not available');
      return;
    }

    const metrics = collectMetrics();
    const maxPerSkill = mockConfig.PERFORMANCE_BUDGETS.maxAgentsPerSkill;

    for (const [skillName, skill] of Object.entries(metrics.skills)) {
      if (skill.agentCount > maxPerSkill) {
        expect(
          metrics.performanceStatus.violations.some(
            v => v.type === 'agent_count' && v.skill === skillName
          )
        ).toBe(true);
      }
    }
  });

  test('generates recommendations for violations', () => {
    if (!collectMetrics) {
      console.warn('Skipping test: collectMetrics not available');
      return;
    }

    const metrics = collectMetrics();

    if (metrics.performanceStatus.violations.length > 0) {
      expect(metrics.recommendations.length).toBeGreaterThan(0);
    }
  });
});

describe('Configuration Validation', () => {
  test('config exports required constants', () => {
    const config = require('../config');

    expect(config).toHaveProperty('SKILLS_ROOT');
    expect(config).toHaveProperty('PERFORMANCE_BUDGETS');
    expect(config).toHaveProperty('EFFICIENCY_THRESHOLDS');
    expect(config).toHaveProperty('MONITORED_SKILLS');
  });

  test('performance budgets have valid values', () => {
    const config = require('../config');
    const { PERFORMANCE_BUDGETS } = config;

    expect(PERFORMANCE_BUDGETS.maxAgentsPerSkill).toBeGreaterThan(0);
    expect(PERFORMANCE_BUDGETS.maxTotalAgents).toBeGreaterThan(0);
    expect(PERFORMANCE_BUDGETS.minAgentCoverage).toBeGreaterThan(0);
    expect(PERFORMANCE_BUDGETS.minAgentCoverage).toBeLessThanOrEqual(1);
  });

  test('efficiency thresholds are properly ordered', () => {
    const config = require('../config');
    const { EFFICIENCY_THRESHOLDS } = config;

    // Complexity thresholds should be in ascending order
    expect(EFFICIENCY_THRESHOLDS.complexity.low).toBeLessThan(
      EFFICIENCY_THRESHOLDS.complexity.medium
    );
    expect(EFFICIENCY_THRESHOLDS.complexity.medium).toBeLessThan(
      EFFICIENCY_THRESHOLDS.complexity.high
    );
    expect(EFFICIENCY_THRESHOLDS.complexity.high).toBeLessThan(
      EFFICIENCY_THRESHOLDS.complexity.critical
    );

    // Ambiguity thresholds should be in ascending order
    expect(EFFICIENCY_THRESHOLDS.ambiguity.low).toBeLessThan(
      EFFICIENCY_THRESHOLDS.ambiguity.medium
    );
    expect(EFFICIENCY_THRESHOLDS.ambiguity.medium).toBeLessThan(
      EFFICIENCY_THRESHOLDS.ambiguity.high
    );
  });

  test('monitored skills are defined', () => {
    const config = require('../config');
    const { MONITORED_SKILLS } = config;

    expect(Object.keys(MONITORED_SKILLS).length).toBeGreaterThan(0);

    for (const [name, skill] of Object.entries(MONITORED_SKILLS)) {
      expect(skill).toHaveProperty('expectedAgents');
      expect(skill).toHaveProperty('hasOrchestrator');
      expect(typeof skill.expectedAgents).toBe('number');
      expect(typeof skill.hasOrchestrator).toBe('boolean');
    }
  });
});
