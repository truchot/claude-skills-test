#!/usr/bin/env node
/**
 * Routing Pattern Analyzer
 *
 * Analyzes agent invocation patterns and routing paths to identify:
 * - Frequently used agents vs underutilized agents
 * - Common routing paths
 * - Bottlenecks in routing hierarchy
 * - Potential dead-end routes
 *
 * Usage:
 *   node analyze-routing-patterns.js [command]
 *
 * Commands:
 *   paths      - Analyze all possible routing paths
 *   coverage   - Check routing coverage completeness
 *   ambiguity  - Detect routing ambiguity hotspots
 *   optimize   - Generate optimization suggestions
 *
 * @module monitoring/routing/analyze-routing-patterns
 */

const fs = require('fs');
const path = require('path');
const {
  SKILLS_ROOT,
  ROUTING_THRESHOLDS,
  MONITORED_SKILLS
} = require('./config');

/**
 * Build routing graph from skill definitions
 * @returns {Object} Routing graph structure
 */
function buildRoutingGraph() {
  const graph = {
    nodes: new Map(),
    edges: [],
    entryPoints: [],
    leafNodes: []
  };

  // Add entry point (web-agency meta-orchestrator)
  graph.entryPoints.push('web-agency');

  for (const [skillName, config] of Object.entries(MONITORED_SKILLS)) {
    const skillPath = path.join(SKILLS_ROOT, skillName);
    if (!fs.existsSync(skillPath)) continue;

    // Add skill node
    graph.nodes.set(skillName, {
      type: config.isMetaOrchestrator ? 'meta-orchestrator' : 'skill',
      agentCount: config.expectedAgents,
      hasOrchestrator: config.hasOrchestrator,
      domains: []
    });

    // Scan for domains and agents
    const agentsDir = path.join(skillPath, 'agents');
    if (fs.existsSync(agentsDir)) {
      const domains = fs.readdirSync(agentsDir).filter(d =>
        fs.statSync(path.join(agentsDir, d)).isDirectory()
      );

      domains.forEach(domain => {
        const domainId = `${skillName}/${domain}`;
        graph.nodes.set(domainId, {
          type: 'domain',
          skill: skillName,
          agents: []
        });

        // Add edge from skill to domain
        graph.edges.push({
          from: skillName,
          to: domainId,
          type: 'contains'
        });

        // Add agent nodes
        const domainPath = path.join(agentsDir, domain);
        const files = fs.readdirSync(domainPath).filter(f => f.endsWith('.md'));

        files.forEach(file => {
          const agentName = file.replace('.md', '');
          const agentId = `${domainId}/${agentName}`;

          const isOrchestrator = agentName === 'orchestrator';
          graph.nodes.set(agentId, {
            type: isOrchestrator ? 'orchestrator' : 'agent',
            domain: domainId,
            skill: skillName
          });

          // Add edge from domain to agent
          graph.edges.push({
            from: isOrchestrator ? skillName : domainId,
            to: agentId,
            type: isOrchestrator ? 'orchestrates' : 'routes-to'
          });

          // Track leaf nodes (non-orchestrator agents)
          if (!isOrchestrator) {
            graph.leafNodes.push(agentId);
          }
        });

        graph.nodes.get(skillName).domains.push(domain);
      });
    }
  }

  return graph;
}

/**
 * Analyze all possible routing paths
 * @param {Object} graph - Routing graph
 * @returns {Object} Path analysis
 */
function analyzeRoutingPaths(graph) {
  const paths = [];
  const pathDepths = [];
  const cycles = [];
  const depthLimitExceeded = [];

  // DFS to find all paths from entry to leaf (with cycle detection and depth limit)
  function findPaths(nodeId, currentPath, depth, visiting) {
    const node = graph.nodes.get(nodeId);
    if (!node) return;

    // Depth limit check to prevent stack overflow
    if (depth > ROUTING_THRESHOLDS.maxExplorationDepth) {
      depthLimitExceeded.push([...currentPath, nodeId]);
      return;
    }

    // Cycle detection: check if we're revisiting a node in current path
    if (visiting.has(nodeId)) {
      cycles.push([...currentPath, nodeId]);
      return;
    }

    const newPath = [...currentPath, nodeId];
    const newVisiting = new Set(visiting);
    newVisiting.add(nodeId);

    // Check if leaf node
    if (graph.leafNodes.includes(nodeId)) {
      paths.push(newPath);
      pathDepths.push(depth);
      return;
    }

    // Find outgoing edges
    const outEdges = graph.edges.filter(e => e.from === nodeId);

    if (outEdges.length === 0 && depth > 0) {
      // Dead end that's not an entry
      paths.push(newPath);
      pathDepths.push(depth);
      return;
    }

    outEdges.forEach(edge => {
      findPaths(edge.to, newPath, depth + 1, newVisiting);
    });
  }

  graph.entryPoints.forEach(entry => {
    findPaths(entry, [], 0, new Set());
  });

  return {
    totalPaths: paths.length,
    avgPathDepth: pathDepths.length > 0
      ? pathDepths.reduce((a, b) => a + b, 0) / pathDepths.length
      : 0,
    maxPathDepth: pathDepths.length > 0 ? Math.max(...pathDepths) : 0,
    minPathDepth: pathDepths.length > 0 ? Math.min(...pathDepths) : 0,
    pathDepthDistribution: pathDepths.reduce((acc, d) => {
      acc[d] = (acc[d] || 0) + 1;
      return acc;
    }, {}),
    longestPaths: paths
      .map((p, i) => ({ path: p, depth: pathDepths[i] }))
      .sort((a, b) => b.depth - a.depth)
      .slice(0, 5),
    deadEnds: paths.filter((p, i) => {
      const lastNode = p[p.length - 1];
      return !graph.leafNodes.includes(lastNode) && pathDepths[i] > 0;
    }),
    cycles: cycles,
    hasCycles: cycles.length > 0,
    depthLimitExceeded: depthLimitExceeded,
    hasDepthLimitExceeded: depthLimitExceeded.length > 0
  };
}

/**
 * Analyze routing coverage
 * @param {Object} graph - Routing graph
 * @returns {Object} Coverage analysis
 */
function analyzeCoverage(graph) {
  const reachableFromEntry = new Set();
  const unreachableNodes = [];

  // BFS from entry points
  function markReachable(startNode) {
    const queue = [startNode];
    while (queue.length > 0) {
      const node = queue.shift();
      if (reachableFromEntry.has(node)) continue;

      reachableFromEntry.add(node);

      const outEdges = graph.edges.filter(e => e.from === node);
      outEdges.forEach(e => {
        if (!reachableFromEntry.has(e.to)) {
          queue.push(e.to);
        }
      });
    }
  }

  graph.entryPoints.forEach(entry => markReachable(entry));

  // Find unreachable nodes
  graph.nodes.forEach((_, nodeId) => {
    if (!reachableFromEntry.has(nodeId)) {
      unreachableNodes.push(nodeId);
    }
  });

  // Calculate coverage metrics
  const totalNodes = graph.nodes.size;
  const reachableCount = reachableFromEntry.size;
  const coverageRatio = totalNodes > 0 ? reachableCount / totalNodes : 1;

  return {
    totalNodes,
    reachableNodes: reachableCount,
    unreachableNodes: unreachableNodes.length,
    coverageRatio,
    coveragePercent: (coverageRatio * 100).toFixed(1),
    meetsMinimum: coverageRatio >= ROUTING_THRESHOLDS.minAgentCoverage,
    unreachableList: unreachableNodes
  };
}

/**
 * Detect routing ambiguity hotspots
 * @param {Object} graph - Routing graph
 * @returns {Object} Ambiguity analysis
 */
function detectAmbiguity(graph) {
  const ambiguityHotspots = [];
  const branchingFactors = [];

  // Calculate branching factor for each non-leaf node
  graph.nodes.forEach((node, nodeId) => {
    if (node.type === 'agent') return; // Skip leaf nodes

    const outEdges = graph.edges.filter(e => e.from === nodeId);
    const branchingFactor = outEdges.length;

    branchingFactors.push(branchingFactor);

    // High branching factor indicates potential ambiguity
    if (branchingFactor > ROUTING_THRESHOLDS.branchingFactor.high) {
      ambiguityHotspots.push({
        node: nodeId,
        type: node.type,
        branchingFactor,
        severity: branchingFactor > ROUTING_THRESHOLDS.branchingFactor.critical ? 'critical' : 'high',
        targets: outEdges.map(e => e.to)
      });
    } else if (branchingFactor > ROUTING_THRESHOLDS.branchingFactor.medium) {
      ambiguityHotspots.push({
        node: nodeId,
        type: node.type,
        branchingFactor,
        severity: 'medium',
        targets: outEdges.map(e => e.to)
      });
    }
  });

  const avgBranchingFactor = branchingFactors.length > 0
    ? branchingFactors.reduce((a, b) => a + b, 0) / branchingFactors.length
    : 0;

  return {
    totalHotspots: ambiguityHotspots.length,
    criticalHotspots: ambiguityHotspots.filter(h => h.severity === 'critical').length,
    highHotspots: ambiguityHotspots.filter(h => h.severity === 'high').length,
    mediumHotspots: ambiguityHotspots.filter(h => h.severity === 'medium').length,
    avgBranchingFactor: avgBranchingFactor.toFixed(2),
    maxBranchingFactor: branchingFactors.length > 0 ? Math.max(...branchingFactors) : 0,
    hotspots: ambiguityHotspots.sort((a, b) => b.branchingFactor - a.branchingFactor)
  };
}

/**
 * Generate optimization suggestions
 * @param {Object} pathAnalysis - Path analysis results
 * @param {Object} coverageAnalysis - Coverage analysis results
 * @param {Object} ambiguityAnalysis - Ambiguity analysis results
 * @returns {Object} Optimization suggestions
 */
function generateOptimizations(pathAnalysis, coverageAnalysis, ambiguityAnalysis) {
  const optimizations = [];

  // Path depth optimizations
  if (pathAnalysis.maxPathDepth > ROUTING_THRESHOLDS.maxRoutingDepth) {
    optimizations.push({
      category: 'path-depth',
      priority: 'high',
      issue: `Maximum path depth (${pathAnalysis.maxPathDepth}) exceeds threshold (${ROUTING_THRESHOLDS.maxRoutingDepth})`,
      suggestion: 'Consider flattening the routing hierarchy or creating direct routes for common paths',
      affectedPaths: pathAnalysis.longestPaths.map(p => p.path.join(' → '))
    });
  }

  // Coverage optimizations
  if (!coverageAnalysis.meetsMinimum) {
    optimizations.push({
      category: 'coverage',
      priority: 'high',
      issue: `Coverage (${coverageAnalysis.coveragePercent}%) below minimum (${ROUTING_THRESHOLDS.minAgentCoverage * 100}%)`,
      suggestion: 'Add routing rules to reach unreachable agents',
      unreachableAgents: coverageAnalysis.unreachableList.slice(0, 10)
    });
  }

  // Dead-end optimizations
  if (pathAnalysis.deadEnds.length > 0) {
    optimizations.push({
      category: 'dead-ends',
      priority: 'medium',
      issue: `${pathAnalysis.deadEnds.length} dead-end routes detected`,
      suggestion: 'Remove or fix dead-end routing paths',
      deadEnds: pathAnalysis.deadEnds.slice(0, 5).map(p => p.join(' → '))
    });
  }

  // Ambiguity optimizations
  if (ambiguityAnalysis.criticalHotspots > 0) {
    const criticalHotspots = ambiguityAnalysis.hotspots.filter(h => h.severity === 'critical');
    optimizations.push({
      category: 'ambiguity',
      priority: 'critical',
      issue: `${ambiguityAnalysis.criticalHotspots} critical ambiguity hotspots with branching factor > 20`,
      suggestion: 'Split high-branching nodes into sub-categories or add disambiguation keywords',
      hotspots: criticalHotspots.map(h => ({
        node: h.node,
        branchingFactor: h.branchingFactor
      }))
    });
  }

  // Branching factor optimization
  if (parseFloat(ambiguityAnalysis.avgBranchingFactor) > 8) {
    optimizations.push({
      category: 'branching',
      priority: 'medium',
      issue: `Average branching factor (${ambiguityAnalysis.avgBranchingFactor}) is high`,
      suggestion: 'Consider hierarchical grouping to reduce decision points at each level'
    });
  }

  return {
    totalOptimizations: optimizations.length,
    criticalCount: optimizations.filter(o => o.priority === 'critical').length,
    highCount: optimizations.filter(o => o.priority === 'high').length,
    mediumCount: optimizations.filter(o => o.priority === 'medium').length,
    optimizations: optimizations.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
  };
}

/**
 * Format analysis results for display
 * @param {Object} analysis - Complete analysis
 * @returns {string} Formatted output
 */
function formatAnalysis(analysis) {
  let output = `
╔══════════════════════════════════════════════════════════════════╗
║            ROUTING PATTERN ANALYSIS                              ║
╠══════════════════════════════════════════════════════════════════╣
║  Generated: ${new Date().toISOString().substring(0, 19).padEnd(42)}     ║
╚══════════════════════════════════════════════════════════════════╝

📍 ROUTING PATHS
────────────────────────────────────────────
  Total Paths:        ${String(analysis.paths.totalPaths).padStart(5)}
  Avg Path Depth:     ${analysis.paths.avgPathDepth.toFixed(2).padStart(5)} ${analysis.paths.avgPathDepth > ROUTING_THRESHOLDS.maxRoutingDepth ? '⚠️' : '✓'}
  Max Path Depth:     ${String(analysis.paths.maxPathDepth).padStart(5)} ${analysis.paths.maxPathDepth > ROUTING_THRESHOLDS.maxRoutingDepth ? '⚠️' : '✓'}
  Dead Ends:          ${String(analysis.paths.deadEnds.length).padStart(5)} ${analysis.paths.deadEnds.length > 0 ? '⚠️' : '✓'}

📊 COVERAGE
────────────────────────────────────────────
  Total Nodes:        ${String(analysis.coverage.totalNodes).padStart(5)}
  Reachable:          ${String(analysis.coverage.reachableNodes).padStart(5)}
  Unreachable:        ${String(analysis.coverage.unreachableNodes).padStart(5)} ${analysis.coverage.unreachableNodes > 0 ? '⚠️' : '✓'}
  Coverage:           ${analysis.coverage.coveragePercent.padStart(4)}% ${analysis.coverage.meetsMinimum ? '✓' : '⚠️'}

🎯 AMBIGUITY HOTSPOTS
────────────────────────────────────────────
  Total Hotspots:     ${String(analysis.ambiguity.totalHotspots).padStart(5)}
  Critical:           ${String(analysis.ambiguity.criticalHotspots).padStart(5)} ${analysis.ambiguity.criticalHotspots > 0 ? '🔴' : '✓'}
  High:               ${String(analysis.ambiguity.highHotspots).padStart(5)} ${analysis.ambiguity.highHotspots > 0 ? '🟡' : '✓'}
  Medium:             ${String(analysis.ambiguity.mediumHotspots).padStart(5)}
  Avg Branching:      ${analysis.ambiguity.avgBranchingFactor.padStart(5)}
  Max Branching:      ${String(analysis.ambiguity.maxBranchingFactor).padStart(5)}
`;

  if (analysis.ambiguity.hotspots.length > 0) {
    output += `
  Top Hotspots:`;
    analysis.ambiguity.hotspots.slice(0, 5).forEach(h => {
      const icon = h.severity === 'critical' ? '🔴' : h.severity === 'high' ? '🟡' : '○';
      output += `\n    ${icon} ${h.node}: ${h.branchingFactor} branches`;
    });
  }

  output += `

📈 PATH DEPTH DISTRIBUTION
────────────────────────────────────────────`;

  const maxDepth = Math.max(...Object.keys(analysis.paths.pathDepthDistribution).map(Number));
  for (let d = 0; d <= maxDepth; d++) {
    const count = analysis.paths.pathDepthDistribution[d] || 0;
    const bar = '█'.repeat(Math.min(Math.ceil(count / 5), 30));
    output += `\n  Depth ${d}: ${String(count).padStart(4)} ${bar}`;
  }

  if (analysis.optimizations.totalOptimizations > 0) {
    output += `

🔧 OPTIMIZATION RECOMMENDATIONS
────────────────────────────────────────────
  Total:              ${analysis.optimizations.totalOptimizations}
  Critical:           ${analysis.optimizations.criticalCount} 🔴
  High:               ${analysis.optimizations.highCount} 🟡
  Medium:             ${analysis.optimizations.mediumCount}
`;

    analysis.optimizations.optimizations.forEach(opt => {
      const icon = opt.priority === 'critical' ? '🔴' : opt.priority === 'high' ? '🟡' : '○';
      output += `\n  ${icon} [${opt.category.toUpperCase()}] ${opt.issue}`;
      output += `\n     → ${opt.suggestion}`;
    });
  }

  output += '\n';
  return output;
}

/**
 * Run complete routing pattern analysis
 * @returns {Object} Complete analysis results
 */
function runAnalysis() {
  const graph = buildRoutingGraph();
  const pathAnalysis = analyzeRoutingPaths(graph);
  const coverageAnalysis = analyzeCoverage(graph);
  const ambiguityAnalysis = detectAmbiguity(graph);
  const optimizations = generateOptimizations(pathAnalysis, coverageAnalysis, ambiguityAnalysis);

  return {
    timestamp: new Date().toISOString(),
    graph: {
      nodeCount: graph.nodes.size,
      edgeCount: graph.edges.length,
      entryPoints: graph.entryPoints,
      leafNodeCount: graph.leafNodes.length
    },
    paths: pathAnalysis,
    coverage: coverageAnalysis,
    ambiguity: ambiguityAnalysis,
    optimizations
  };
}

// Main execution
if (require.main === module) {
  try {
    const command = process.argv[2] || 'all';
    const analysis = runAnalysis();

    switch (command) {
      case 'paths':
        console.log(JSON.stringify(analysis.paths, null, 2));
        break;

      case 'coverage':
        console.log(JSON.stringify(analysis.coverage, null, 2));
        break;

      case 'ambiguity':
        console.log(JSON.stringify(analysis.ambiguity, null, 2));
        break;

      case 'optimize':
        console.log(JSON.stringify(analysis.optimizations, null, 2));
        break;

      case 'all':
      case 'summary':
        console.log(formatAnalysis(analysis));
        break;

      case 'json':
        console.log(JSON.stringify(analysis, null, 2));
        break;

      case 'help':
      case '--help':
      case '-h':
        console.log(`Usage: node analyze-routing-patterns.js [command]

Commands:
  all       Complete analysis with visual summary (default)
  paths     Analyze routing paths (JSON)
  coverage  Check routing coverage (JSON)
  ambiguity Detect ambiguity hotspots (JSON)
  optimize  Generate optimization suggestions (JSON)
  json      Full analysis as JSON

Examples:
  node analyze-routing-patterns.js
  node analyze-routing-patterns.js ambiguity
  node analyze-routing-patterns.js json | jq '.optimizations'
`);
        break;

      default:
        console.error(`Unknown command: ${command}. Use 'all', 'paths', 'coverage', 'ambiguity', 'optimize', 'json', or 'help'.`);
        process.exit(1);
    }
  } catch (err) {
    console.error(`Error analyzing routing patterns: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
  }
}

module.exports = { runAnalysis, buildRoutingGraph };
