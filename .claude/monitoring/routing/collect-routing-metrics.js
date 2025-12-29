#!/usr/bin/env node
/**
 * Routing Metrics Collector
 *
 * Collects and analyzes agent routing efficiency metrics across all skills.
 * Monitors 360+ agents for routing overhead, ambiguity, and optimization opportunities.
 *
 * Usage:
 *   node collect-routing-metrics.js [format]
 *
 * Formats:
 *   json      - Full metrics as JSON (default)
 *   summary   - Human-readable summary
 *   markdown  - Detailed markdown report
 *   analyze   - Deep analysis with recommendations
 *
 * @module monitoring/routing/collect-routing-metrics
 */

const fs = require('fs');
const path = require('path');
const {
  SKILLS_ROOT,
  OUTPUT_DIR,
  PERFORMANCE_BUDGETS,
  EFFICIENCY_THRESHOLDS,
  MONITORED_SKILLS,
  METRICS_CONFIG
} = require('./config');

/**
 * Parse frontmatter from markdown content
 * @param {string} content - Markdown content
 * @returns {Object} Parsed frontmatter
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const frontmatter = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      frontmatter[key.trim()] = valueParts.join(':').trim();
    }
  }

  return frontmatter;
}

/**
 * Extract keywords from routing rules in markdown
 * @param {string} content - Markdown content
 * @returns {string[]} Extracted keywords
 */
function extractKeywords(content) {
  const keywords = new Set();

  // Match table-based keywords: | keyword1, keyword2 |
  const tableMatches = content.matchAll(/\|\s*([^|]+?)\s*\|.*?\|/g);
  for (const match of tableMatches) {
    const keywordCell = match[1];
    if (!keywordCell.includes('Mots-clés') && !keywordCell.includes('---')) {
      keywordCell.split(',').forEach(kw => {
        const cleaned = kw.trim().toLowerCase();
        if (cleaned && cleaned.length > 2) {
          keywords.add(cleaned);
        }
      });
    }
  }

  // Match SI/ALORS patterns: SI question contient [keywords]
  const siMatches = content.matchAll(/SI.*?\[(.*?)\]/gi);
  for (const match of siMatches) {
    match[1].split(',').forEach(kw => {
      const cleaned = kw.trim().toLowerCase();
      if (cleaned && cleaned.length > 2) {
        keywords.add(cleaned);
      }
    });
  }

  return Array.from(keywords);
}

/**
 * Count agents in a skill directory
 * @param {string} skillPath - Path to skill directory
 * @returns {Object} Agent count details
 */
function countAgents(skillPath) {
  const result = {
    total: 0,
    orchestrators: 0,
    agents: 0,
    domains: [],
    agentFiles: []
  };

  // Check for agents/ directory
  const agentsDir = path.join(skillPath, 'agents');
  if (fs.existsSync(agentsDir)) {
    const domains = fs.readdirSync(agentsDir).filter(d =>
      fs.statSync(path.join(agentsDir, d)).isDirectory()
    );

    result.domains = domains;

    for (const domain of domains) {
      const domainPath = path.join(agentsDir, domain);
      const files = fs.readdirSync(domainPath).filter(f => f.endsWith('.md'));

      for (const file of files) {
        result.total++;
        result.agentFiles.push(`${domain}/${file}`);

        if (file === 'orchestrator.md') {
          result.orchestrators++;
        } else {
          result.agents++;
        }
      }
    }
  }

  // Check for organizational folders (direction-technique, lead-dev style)
  const orgFolders = ['avant-projet', 'pilotage', 'communication', 'livraison',
    'facturation', 'architecture', 'estimation', 'qualite', 'securite',
    'performance', 'code-review', 'team-coordination', 'technical-decisions',
    'mentoring', 'delivery'];

  for (const folder of orgFolders) {
    const folderPath = path.join(skillPath, folder);
    if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
      if (!result.domains.includes(folder)) {
        result.domains.push(folder);
      }

      const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.md'));
      for (const file of files) {
        if (!result.agentFiles.includes(`${folder}/${file}`)) {
          result.total++;
          result.agentFiles.push(`${folder}/${file}`);

          if (file === 'orchestrator.md') {
            result.orchestrators++;
          } else {
            result.agents++;
          }
        }
      }
    }
  }

  return result;
}

/**
 * Analyze keyword overlap between skills
 * @param {Object} skillKeywords - Map of skill name to keywords
 * @returns {Object} Overlap analysis
 */
function analyzeKeywordOverlap(skillKeywords) {
  const overlaps = [];
  const skillNames = Object.keys(skillKeywords);

  for (let i = 0; i < skillNames.length; i++) {
    for (let j = i + 1; j < skillNames.length; j++) {
      const skill1 = skillNames[i];
      const skill2 = skillNames[j];
      const keywords1 = new Set(skillKeywords[skill1]);
      const keywords2 = new Set(skillKeywords[skill2]);

      const overlap = [...keywords1].filter(kw => keywords2.has(kw));

      if (overlap.length > 0) {
        overlaps.push({
          skills: [skill1, skill2],
          overlappingKeywords: overlap,
          count: overlap.length,
          severity: overlap.length > PERFORMANCE_BUDGETS.maxKeywordOverlap ? 'high' : 'low'
        });
      }
    }
  }

  return {
    totalOverlaps: overlaps.length,
    highSeverityCount: overlaps.filter(o => o.severity === 'high').length,
    overlaps: overlaps.sort((a, b) => b.count - a.count)
  };
}

/**
 * Calculate routing complexity score
 * @param {Object} skillMetrics - Metrics for a skill
 * @returns {number} Complexity score 0-1
 */
function calculateComplexityScore(skillMetrics) {
  const {
    agentCount,
    domainCount,
    keywordCount,
    orchestratorCount
  } = skillMetrics;

  // Factors contributing to complexity
  const agentFactor = Math.min(agentCount / PERFORMANCE_BUDGETS.maxAgentsPerSkill, 1);
  const domainFactor = Math.min(domainCount / 10, 1);
  const keywordDensity = keywordCount > 0 ? Math.min(keywordCount / (agentCount * 3), 1) : 0;
  const orchestrationFactor = orchestratorCount > 0 ? 0.1 : 0;

  // Weighted average
  return (
    agentFactor * 0.4 +
    domainFactor * 0.2 +
    keywordDensity * 0.3 +
    orchestrationFactor * 0.1
  );
}

/**
 * Calculate ambiguity score
 * @param {Object} overlapAnalysis - Keyword overlap analysis
 * @param {number} totalKeywords - Total keywords across all skills
 * @returns {number} Ambiguity score 0-1
 */
function calculateAmbiguityScore(overlapAnalysis, totalKeywords) {
  if (totalKeywords === 0) return 0;

  const overlappingKeywordCount = overlapAnalysis.overlaps
    .reduce((sum, o) => sum + o.count, 0);

  const overlapRatio = overlappingKeywordCount / totalKeywords;
  const severityBonus = overlapAnalysis.highSeverityCount * 0.05;

  return Math.min(overlapRatio + severityBonus, 1);
}

/**
 * Generate recommendations based on metrics
 * @param {Object} metrics - Collected metrics
 * @returns {string[]} List of recommendations
 */
function generateRecommendations(metrics) {
  const recommendations = [];
  const { summary, skills, keywordAnalysis, performanceStatus } = metrics;

  // Agent count recommendations
  if (summary.totalAgents > PERFORMANCE_BUDGETS.maxTotalAgents) {
    recommendations.push({
      priority: 'high',
      category: 'scale',
      message: `Total agent count (${summary.totalAgents}) exceeds budget (${PERFORMANCE_BUDGETS.maxTotalAgents}). Consider consolidating similar agents.`
    });
  }

  // Per-skill recommendations
  for (const [skillName, skill] of Object.entries(skills)) {
    if (skill.agentCount > PERFORMANCE_BUDGETS.maxAgentsPerSkill) {
      recommendations.push({
        priority: 'medium',
        category: 'scale',
        skill: skillName,
        message: `${skillName} has ${skill.agentCount} agents (budget: ${PERFORMANCE_BUDGETS.maxAgentsPerSkill}). Consider splitting into sub-skills.`
      });
    }
  }

  // Keyword overlap recommendations
  if (keywordAnalysis.overlap.highSeverityCount > 0) {
    recommendations.push({
      priority: 'high',
      category: 'ambiguity',
      message: `${keywordAnalysis.overlap.highSeverityCount} high-severity keyword overlaps detected. Review routing rules to reduce ambiguity.`
    });

    // Add specific overlap details
    keywordAnalysis.overlap.overlaps
      .filter(o => o.severity === 'high')
      .slice(0, 3)
      .forEach(o => {
        recommendations.push({
          priority: 'medium',
          category: 'ambiguity',
          message: `Skills "${o.skills[0]}" and "${o.skills[1]}" share ${o.count} keywords: ${o.overlappingKeywords.slice(0, 5).join(', ')}${o.count > 5 ? '...' : ''}`
        });
      });
  }

  // Complexity recommendations
  if (performanceStatus.averageComplexity > EFFICIENCY_THRESHOLDS.complexity.high) {
    recommendations.push({
      priority: 'high',
      category: 'complexity',
      message: `Average routing complexity (${performanceStatus.averageComplexity.toFixed(2)}) is high. Consider simplifying routing rules.`
    });
  }

  // Ambiguity recommendations
  if (performanceStatus.ambiguityScore > EFFICIENCY_THRESHOLDS.ambiguity.medium) {
    recommendations.push({
      priority: 'medium',
      category: 'ambiguity',
      message: `Ambiguity score (${performanceStatus.ambiguityScore.toFixed(2)}) indicates potential misrouting. Add disambiguating keywords.`
    });
  }

  return recommendations;
}

/**
 * Collect all routing metrics
 * @returns {Object} Complete metrics collection
 */
function collectMetrics() {
  const metrics = {
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    summary: {
      totalSkills: 0,
      totalAgents: 0,
      totalOrchestrators: 0,
      totalDomains: 0,
      totalKeywords: 0
    },
    skills: {},
    keywordAnalysis: {
      bySkill: {},
      overlap: null,
      uniquenessRatio: 0
    },
    performanceStatus: {
      budgetCompliance: true,
      violations: [],
      averageComplexity: 0,
      ambiguityScore: 0
    },
    recommendations: []
  };

  const allKeywords = new Set();
  const skillKeywordMap = {};

  // Collect metrics for each skill
  for (const [skillName, config] of Object.entries(MONITORED_SKILLS)) {
    const skillPath = path.join(SKILLS_ROOT, skillName);

    if (!fs.existsSync(skillPath)) {
      console.warn(`Warning: Skill not found: ${skillName}`);
      continue;
    }

    metrics.summary.totalSkills++;

    // Read SKILL.md for routing keywords
    const skillMdPath = path.join(skillPath, 'SKILL.md');
    let keywords = [];
    if (fs.existsSync(skillMdPath)) {
      const content = fs.readFileSync(skillMdPath, 'utf8');
      keywords = extractKeywords(content);
    }

    // Count agents
    const agentInfo = countAgents(skillPath);

    // Store skill metrics
    metrics.skills[skillName] = {
      agentCount: agentInfo.total,
      orchestratorCount: agentInfo.orchestrators,
      domainCount: agentInfo.domains.length,
      domains: agentInfo.domains,
      keywordCount: keywords.length,
      expectedAgents: config.expectedAgents,
      deviation: agentInfo.total - config.expectedAgents,
      isMetaOrchestrator: config.isMetaOrchestrator || false
    };

    // Calculate complexity
    metrics.skills[skillName].complexityScore = calculateComplexityScore({
      agentCount: agentInfo.total,
      domainCount: agentInfo.domains.length,
      keywordCount: keywords.length,
      orchestratorCount: agentInfo.orchestrators
    });

    // Update summary
    metrics.summary.totalAgents += agentInfo.total;
    metrics.summary.totalOrchestrators += agentInfo.orchestrators;
    metrics.summary.totalDomains += agentInfo.domains.length;
    metrics.summary.totalKeywords += keywords.length;

    // Track keywords
    skillKeywordMap[skillName] = keywords;
    keywords.forEach(kw => allKeywords.add(kw));

    metrics.keywordAnalysis.bySkill[skillName] = {
      count: keywords.length,
      sample: keywords.slice(0, 10)
    };

    // Check budget compliance
    if (agentInfo.total > PERFORMANCE_BUDGETS.maxAgentsPerSkill) {
      metrics.performanceStatus.budgetCompliance = false;
      metrics.performanceStatus.violations.push({
        type: 'agent_count',
        skill: skillName,
        value: agentInfo.total,
        budget: PERFORMANCE_BUDGETS.maxAgentsPerSkill
      });
    }
  }

  // Analyze keyword overlap
  metrics.keywordAnalysis.overlap = analyzeKeywordOverlap(skillKeywordMap);

  // Calculate uniqueness ratio
  const totalKeywordUsages = Object.values(skillKeywordMap)
    .reduce((sum, kws) => sum + kws.length, 0);
  metrics.keywordAnalysis.uniquenessRatio = totalKeywordUsages > 0
    ? allKeywords.size / totalKeywordUsages
    : 1;

  // Calculate average complexity
  const complexityScores = Object.values(metrics.skills)
    .map(s => s.complexityScore)
    .filter(s => s !== undefined);
  metrics.performanceStatus.averageComplexity = complexityScores.length > 0
    ? complexityScores.reduce((a, b) => a + b, 0) / complexityScores.length
    : 0;

  // Calculate ambiguity score
  metrics.performanceStatus.ambiguityScore = calculateAmbiguityScore(
    metrics.keywordAnalysis.overlap,
    allKeywords.size
  );

  // Check total agent budget
  if (metrics.summary.totalAgents > PERFORMANCE_BUDGETS.maxTotalAgents) {
    metrics.performanceStatus.budgetCompliance = false;
    metrics.performanceStatus.violations.push({
      type: 'total_agents',
      value: metrics.summary.totalAgents,
      budget: PERFORMANCE_BUDGETS.maxTotalAgents
    });
  }

  // Generate recommendations
  metrics.recommendations = generateRecommendations(metrics);

  return metrics;
}

/**
 * Format metrics as markdown report
 * @param {Object} metrics - Collected metrics
 * @returns {string} Markdown formatted report
 */
function formatMarkdown(metrics) {
  let md = `# Routing Efficiency Report

Generated: ${metrics.timestamp}

## Executive Summary

| Metric | Value | Status |
|--------|-------|--------|
| Total Skills | ${metrics.summary.totalSkills} | ✓ |
| Total Agents | ${metrics.summary.totalAgents} | ${metrics.summary.totalAgents > PERFORMANCE_BUDGETS.maxTotalAgents ? '⚠️' : '✓'} |
| Total Orchestrators | ${metrics.summary.totalOrchestrators} | ✓ |
| Total Domains | ${metrics.summary.totalDomains} | ✓ |
| Unique Keywords | ${metrics.summary.totalKeywords} | ✓ |
| Budget Compliant | ${metrics.performanceStatus.budgetCompliance ? 'Yes' : 'No'} | ${metrics.performanceStatus.budgetCompliance ? '✓' : '⚠️'} |
| Avg Complexity | ${metrics.performanceStatus.averageComplexity.toFixed(2)} | ${metrics.performanceStatus.averageComplexity > EFFICIENCY_THRESHOLDS.complexity.high ? '⚠️' : '✓'} |
| Ambiguity Score | ${metrics.performanceStatus.ambiguityScore.toFixed(2)} | ${metrics.performanceStatus.ambiguityScore > EFFICIENCY_THRESHOLDS.ambiguity.medium ? '⚠️' : '✓'} |

## Skill Breakdown

| Skill | Agents | Domains | Keywords | Complexity |
|-------|--------|---------|----------|------------|
`;

  for (const [name, skill] of Object.entries(metrics.skills)) {
    const complexityIcon = skill.complexityScore > EFFICIENCY_THRESHOLDS.complexity.high ? '⚠️' :
                          skill.complexityScore > EFFICIENCY_THRESHOLDS.complexity.medium ? '○' : '✓';
    md += `| ${name} | ${skill.agentCount} | ${skill.domainCount} | ${skill.keywordCount} | ${skill.complexityScore.toFixed(2)} ${complexityIcon} |\n`;
  }

  md += `
## Keyword Overlap Analysis

**Uniqueness Ratio:** ${(metrics.keywordAnalysis.uniquenessRatio * 100).toFixed(1)}%
**High-Severity Overlaps:** ${metrics.keywordAnalysis.overlap.highSeverityCount}

### Top Overlaps

`;

  metrics.keywordAnalysis.overlap.overlaps.slice(0, 5).forEach(overlap => {
    md += `- **${overlap.skills[0]}** ↔ **${overlap.skills[1]}**: ${overlap.count} keywords (${overlap.severity})\n`;
    md += `  - Keywords: ${overlap.overlappingKeywords.slice(0, 5).join(', ')}${overlap.count > 5 ? '...' : ''}\n`;
  });

  if (metrics.performanceStatus.violations.length > 0) {
    md += `
## Budget Violations

`;
    metrics.performanceStatus.violations.forEach(v => {
      md += `- **${v.type}**${v.skill ? ` (${v.skill})` : ''}: ${v.value} (budget: ${v.budget})\n`;
    });
  }

  if (metrics.recommendations.length > 0) {
    md += `
## Recommendations

`;
    const grouped = { high: [], medium: [], low: [] };
    metrics.recommendations.forEach(r => {
      grouped[r.priority] = grouped[r.priority] || [];
      grouped[r.priority].push(r);
    });

    if (grouped.high.length > 0) {
      md += `### High Priority\n\n`;
      grouped.high.forEach(r => md += `- ${r.message}\n`);
    }
    if (grouped.medium.length > 0) {
      md += `\n### Medium Priority\n\n`;
      grouped.medium.forEach(r => md += `- ${r.message}\n`);
    }
    if (grouped.low && grouped.low.length > 0) {
      md += `\n### Low Priority\n\n`;
      grouped.low.forEach(r => md += `- ${r.message}\n`);
    }
  }

  return md;
}

/**
 * Format metrics as human-readable summary
 * @param {Object} metrics - Collected metrics
 * @returns {string} Summary text
 */
function formatSummary(metrics) {
  let summary = `
╔══════════════════════════════════════════════════════════════════╗
║            ROUTING EFFICIENCY MONITORING REPORT                  ║
╠══════════════════════════════════════════════════════════════════╣
║  Generated: ${metrics.timestamp.substring(0, 19).padEnd(42)}     ║
╚══════════════════════════════════════════════════════════════════╝

📊 SUMMARY
────────────────────────────────────────────
  Total Skills:       ${String(metrics.summary.totalSkills).padStart(5)}
  Total Agents:       ${String(metrics.summary.totalAgents).padStart(5)} ${metrics.summary.totalAgents > PERFORMANCE_BUDGETS.maxTotalAgents ? '⚠️  EXCEEDS BUDGET' : '✓'}
  Total Orchestrators:${String(metrics.summary.totalOrchestrators).padStart(5)}
  Total Domains:      ${String(metrics.summary.totalDomains).padStart(5)}
  Unique Keywords:    ${String(metrics.summary.totalKeywords).padStart(5)}

⚡ PERFORMANCE STATUS
────────────────────────────────────────────
  Budget Compliance:  ${metrics.performanceStatus.budgetCompliance ? '✓ PASS' : '✗ FAIL'}
  Avg Complexity:     ${metrics.performanceStatus.averageComplexity.toFixed(2)} ${getComplexityLabel(metrics.performanceStatus.averageComplexity)}
  Ambiguity Score:    ${metrics.performanceStatus.ambiguityScore.toFixed(2)} ${getAmbiguityLabel(metrics.performanceStatus.ambiguityScore)}
  Keyword Uniqueness: ${(metrics.keywordAnalysis.uniquenessRatio * 100).toFixed(1)}%

📈 TOP 5 SKILLS BY AGENT COUNT
────────────────────────────────────────────`;

  const sortedSkills = Object.entries(metrics.skills)
    .sort((a, b) => b[1].agentCount - a[1].agentCount)
    .slice(0, 5);

  for (const [name, skill] of sortedSkills) {
    const bar = '█'.repeat(Math.min(Math.floor(skill.agentCount / 5), 20));
    summary += `\n  ${name.padEnd(30)} ${String(skill.agentCount).padStart(3)} ${bar}`;
  }

  if (metrics.keywordAnalysis.overlap.highSeverityCount > 0) {
    summary += `

⚠️  KEYWORD OVERLAP WARNINGS
────────────────────────────────────────────`;
    metrics.keywordAnalysis.overlap.overlaps
      .filter(o => o.severity === 'high')
      .slice(0, 3)
      .forEach(o => {
        summary += `\n  ${o.skills[0]} ↔ ${o.skills[1]}: ${o.count} shared keywords`;
      });
  }

  if (metrics.recommendations.filter(r => r.priority === 'high').length > 0) {
    summary += `

🔴 HIGH PRIORITY RECOMMENDATIONS
────────────────────────────────────────────`;
    metrics.recommendations
      .filter(r => r.priority === 'high')
      .forEach(r => {
        summary += `\n  • ${r.message}`;
      });
  }

  summary += '\n';
  return summary;
}

function getComplexityLabel(score) {
  if (score <= EFFICIENCY_THRESHOLDS.complexity.low) return '(LOW)';
  if (score <= EFFICIENCY_THRESHOLDS.complexity.medium) return '(MEDIUM)';
  if (score <= EFFICIENCY_THRESHOLDS.complexity.high) return '(HIGH)';
  return '(CRITICAL)';
}

function getAmbiguityLabel(score) {
  if (score <= EFFICIENCY_THRESHOLDS.ambiguity.low) return '(LOW)';
  if (score <= EFFICIENCY_THRESHOLDS.ambiguity.medium) return '(MEDIUM)';
  if (score <= EFFICIENCY_THRESHOLDS.ambiguity.high) return '(HIGH)';
  return '(CRITICAL)';
}

// Main execution
if (require.main === module) {
  try {
    const metrics = collectMetrics();
    const format = process.argv[2] || 'json';

    switch (format) {
      case 'json':
        console.log(JSON.stringify(metrics, null, 2));
        break;

      case 'summary':
        console.log(formatSummary(metrics));
        break;

      case 'markdown':
        console.log(formatMarkdown(metrics));
        break;

      case 'analyze':
        console.log(formatSummary(metrics));
        console.log('\n' + formatMarkdown(metrics));
        break;

      case 'help':
      case '--help':
      case '-h':
        console.log(`Usage: node collect-routing-metrics.js [format]

Formats:
  json      Full metrics as JSON (default)
  summary   Human-readable summary with visual indicators
  markdown  Detailed markdown report
  analyze   Combined summary and markdown report

Examples:
  node collect-routing-metrics.js summary
  node collect-routing-metrics.js markdown > report.md
  node collect-routing-metrics.js json | jq '.summary'
`);
        break;

      default:
        console.error(`Unknown format: ${format}. Use 'json', 'summary', 'markdown', 'analyze', or 'help'.`);
        process.exit(1);
    }
  } catch (err) {
    console.error(`Error collecting metrics: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
  }
}

module.exports = { collectMetrics, formatMarkdown, formatSummary };
