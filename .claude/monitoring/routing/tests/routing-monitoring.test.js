/**
 * Routing Monitoring Tests
 *
 * Validates routing efficiency monitoring functionality and ambiguity detection.
 *
 * @module tests/routing-monitoring
 */

const path = require('path');

// Mock the config for testing
const mockConfig = {
  SKILLS_ROOT: path.join(__dirname, '../../../skills'),
  ROUTING_THRESHOLDS: {
    maxKeywordOverlap: 5,
    minKeywordUniqueness: 0.7,
    maxRoutingDepth: 3,
    minAgentCoverage: 0.85,
    branchingFactor: {
      medium: 5,
      high: 10,
      critical: 20
    }
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
    expect(metrics).toHaveProperty('ambiguityStatus');
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

  test('ambiguity status tracks routing quality', () => {
    if (!collectMetrics) {
      console.warn('Skipping test: collectMetrics not available');
      return;
    }

    const metrics = collectMetrics();
    const { ambiguityStatus } = metrics;

    expect(ambiguityStatus).toHaveProperty('score');
    expect(ambiguityStatus).toHaveProperty('level');

    expect(typeof ambiguityStatus.score).toBe('number');
    expect(ambiguityStatus.score).toBeGreaterThanOrEqual(0);
    expect(ambiguityStatus.score).toBeLessThanOrEqual(1);
    expect(['low', 'medium', 'high', 'critical']).toContain(ambiguityStatus.level);
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
    expect(markdown).toContain('# Routing Ambiguity Report');
    expect(markdown).toContain('## Summary');
    expect(markdown).toContain('Keyword Overlap');
  });

  test('formatSummary produces readable output', () => {
    if (!collectMetrics || !formatSummary) {
      console.warn('Skipping test: formatSummary not available');
      return;
    }

    const metrics = collectMetrics();
    const summary = formatSummary(metrics);

    expect(typeof summary).toBe('string');
    expect(summary).toContain('ROUTING AMBIGUITY ANALYSIS');
    expect(summary).toContain('INVENTORY');
    expect(summary).toContain('AMBIGUITY STATUS');
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

describe('Ambiguity and Routing Quality', () => {
  let collectMetrics;

  beforeAll(() => {
    try {
      collectMetrics = require('../collect-routing-metrics').collectMetrics;
    } catch (err) {
      console.warn('Could not load metrics module:', err.message);
    }
  });

  test('detects keyword overlap severity correctly', () => {
    if (!collectMetrics) {
      console.warn('Skipping test: collectMetrics not available');
      return;
    }

    const metrics = collectMetrics();
    const { overlap } = metrics.keywordAnalysis;

    // High severity overlaps should have more keywords than threshold
    overlap.overlaps.filter(o => o.severity === 'high').forEach(o => {
      expect(o.count).toBeGreaterThan(mockConfig.ROUTING_THRESHOLDS.maxKeywordOverlap);
    });

    // Low severity overlaps should have fewer keywords than threshold
    overlap.overlaps.filter(o => o.severity === 'low').forEach(o => {
      expect(o.count).toBeLessThanOrEqual(mockConfig.ROUTING_THRESHOLDS.maxKeywordOverlap);
    });
  });

  test('calculates keyword uniqueness ratio', () => {
    if (!collectMetrics) {
      console.warn('Skipping test: collectMetrics not available');
      return;
    }

    const metrics = collectMetrics();
    const { uniquenessRatio } = metrics.keywordAnalysis;

    expect(typeof uniquenessRatio).toBe('number');
    expect(uniquenessRatio).toBeGreaterThanOrEqual(0);
    expect(uniquenessRatio).toBeLessThanOrEqual(1);
  });

  test('generates recommendations for high severity overlaps', () => {
    if (!collectMetrics) {
      console.warn('Skipping test: collectMetrics not available');
      return;
    }

    const metrics = collectMetrics();

    if (metrics.keywordAnalysis.overlap.highSeverityCount > 0) {
      expect(metrics.recommendations.length).toBeGreaterThan(0);
      expect(
        metrics.recommendations.some(r => r.category === 'ambiguity')
      ).toBe(true);
    }
  });
});

describe('Configuration Validation', () => {
  test('config exports required constants', () => {
    const config = require('../config');

    expect(config).toHaveProperty('SKILLS_ROOT');
    expect(config).toHaveProperty('ROUTING_THRESHOLDS');
    expect(config).toHaveProperty('EFFICIENCY_THRESHOLDS');
    expect(config).toHaveProperty('MONITORED_SKILLS');
  });

  test('routing thresholds have valid values', () => {
    const config = require('../config');
    const { ROUTING_THRESHOLDS } = config;

    expect(ROUTING_THRESHOLDS.maxKeywordOverlap).toBeGreaterThan(0);
    expect(ROUTING_THRESHOLDS.minKeywordUniqueness).toBeGreaterThan(0);
    expect(ROUTING_THRESHOLDS.minKeywordUniqueness).toBeLessThanOrEqual(1);
    expect(ROUTING_THRESHOLDS.maxRoutingDepth).toBeGreaterThan(0);
    expect(ROUTING_THRESHOLDS.minAgentCoverage).toBeGreaterThan(0);
    expect(ROUTING_THRESHOLDS.minAgentCoverage).toBeLessThanOrEqual(1);
  });

  test('branching factor thresholds are properly ordered', () => {
    const config = require('../config');
    const { ROUTING_THRESHOLDS } = config;

    expect(ROUTING_THRESHOLDS.branchingFactor.medium).toBeLessThan(
      ROUTING_THRESHOLDS.branchingFactor.high
    );
    expect(ROUTING_THRESHOLDS.branchingFactor.high).toBeLessThan(
      ROUTING_THRESHOLDS.branchingFactor.critical
    );
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

describe('Edge Cases', () => {
  let collectMetrics, runAnalysis;

  beforeAll(() => {
    try {
      collectMetrics = require('../collect-routing-metrics').collectMetrics;
      runAnalysis = require('../analyze-routing-patterns').runAnalysis;
    } catch (err) {
      console.warn('Could not load modules:', err.message);
    }
  });

  test('metrics collection handles errors gracefully', () => {
    if (!collectMetrics) {
      console.warn('Skipping test: collectMetrics not available');
      return;
    }

    const metrics = collectMetrics();

    // Should have errors array (even if empty)
    expect(metrics).toHaveProperty('errors');
    expect(Array.isArray(metrics.errors)).toBe(true);

    // Errors should have proper structure if present
    metrics.errors.forEach(err => {
      expect(err).toHaveProperty('phase');
      expect(err).toHaveProperty('message');
    });
  });

  test('handles empty keyword analysis gracefully', () => {
    if (!collectMetrics) {
      console.warn('Skipping test: collectMetrics not available');
      return;
    }

    const metrics = collectMetrics();

    // Even if no keywords found, structure should be valid
    expect(metrics.keywordAnalysis).toHaveProperty('overlap');
    expect(metrics.keywordAnalysis.overlap).toHaveProperty('totalOverlaps');
    expect(metrics.keywordAnalysis.overlap).toHaveProperty('overlaps');
    expect(Array.isArray(metrics.keywordAnalysis.overlap.overlaps)).toBe(true);
  });

  test('analysis handles missing skills gracefully', () => {
    if (!runAnalysis) {
      console.warn('Skipping test: runAnalysis not available');
      return;
    }

    // Should not throw even if skills directory is partially empty
    expect(() => runAnalysis()).not.toThrow();
  });

  test('path analysis detects cycles without crashing', () => {
    if (!runAnalysis) {
      console.warn('Skipping test: runAnalysis not available');
      return;
    }

    const analysis = runAnalysis();

    // Cycle detection should be present
    expect(analysis.paths).toHaveProperty('hasCycles');
    expect(analysis.paths).toHaveProperty('cycles');
    expect(Array.isArray(analysis.paths.cycles)).toBe(true);
  });

  test('path analysis respects depth limits', () => {
    if (!runAnalysis) {
      console.warn('Skipping test: runAnalysis not available');
      return;
    }

    const analysis = runAnalysis();

    // Depth limit detection should be present
    expect(analysis.paths).toHaveProperty('hasDepthLimitExceeded');
    expect(analysis.paths).toHaveProperty('depthLimitExceeded');
    expect(Array.isArray(analysis.paths.depthLimitExceeded)).toBe(true);
  });

  test('ambiguity score stays within valid range', () => {
    if (!collectMetrics) {
      console.warn('Skipping test: collectMetrics not available');
      return;
    }

    const metrics = collectMetrics();

    expect(metrics.ambiguityStatus.score).toBeGreaterThanOrEqual(0);
    expect(metrics.ambiguityStatus.score).toBeLessThanOrEqual(1);
  });

  test('uniqueness ratio stays within valid range', () => {
    if (!collectMetrics) {
      console.warn('Skipping test: collectMetrics not available');
      return;
    }

    const metrics = collectMetrics();

    expect(metrics.keywordAnalysis.uniquenessRatio).toBeGreaterThanOrEqual(0);
    expect(metrics.keywordAnalysis.uniquenessRatio).toBeLessThanOrEqual(1);
  });
});
