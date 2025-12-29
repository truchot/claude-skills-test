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
  ROUTING_THRESHOLDS,
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
  try {
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
  } catch (err) {
    console.warn(`Error parsing frontmatter: ${err.message}`);
    return {};
  }
}

/**
 * Extract keywords from routing rules in markdown
 * @param {string} content - Markdown content
 * @returns {string[]} Extracted keywords
 */
function extractKeywords(content) {
  try {
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
  } catch (err) {
    console.warn(`Error extracting keywords: ${err.message}`);
    return [];
  }
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

  try {
    // Check for agents/ directory
    const agentsDir = path.join(skillPath, 'agents');
    if (fs.existsSync(agentsDir)) {
      const domains = fs.readdirSync(agentsDir).filter(d => {
        try {
          return fs.statSync(path.join(agentsDir, d)).isDirectory();
        } catch { return false; }
      });

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

    // Dynamically scan for organizational folders containing .md agent files
    // Excludes known non-agent directories
    const EXCLUDED_DIRS = new Set([
      'agents', 'tests', 'docs', 'templates', 'node_modules',
      'orchestration', '.git', 'scripts', 'examples'
    ]);

    const allDirs = fs.readdirSync(skillPath).filter(item => {
      try {
        const itemPath = path.join(skillPath, item);
        return fs.statSync(itemPath).isDirectory() && !EXCLUDED_DIRS.has(item);
      } catch { return false; }
    });

    for (const folder of allDirs) {
      const folderPath = path.join(skillPath, folder);
      const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.md'));

      // Only consider folders with .md files as agent folders
      if (files.length > 0 && !result.domains.includes(folder)) {
        result.domains.push(folder);

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
  } catch (err) {
    console.warn(`Error counting agents in ${skillPath}: ${err.message}`);
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
          severity: overlap.length > ROUTING_THRESHOLDS.maxKeywordOverlap ? 'high' : 'low'
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
 * Focus on ambiguity - the real risk of misrouting
 * @param {Object} metrics - Collected metrics
 * @returns {string[]} List of recommendations
 */
function generateRecommendations(metrics) {
  const recommendations = [];
  const { keywordAnalysis, ambiguityStatus } = metrics;

  // Keyword overlap recommendations - the main risk for misrouting
  if (keywordAnalysis.overlap.highSeverityCount > 0) {
    recommendations.push({
      priority: 'high',
      category: 'ambiguity',
      message: `${keywordAnalysis.overlap.highSeverityCount} keyword overlaps detected (>${ROUTING_THRESHOLDS.maxKeywordOverlap} shared keywords). High risk of misrouting.`
    });

    // Add specific overlap details with disambiguation suggestions
    keywordAnalysis.overlap.overlaps
      .filter(o => o.severity === 'high')
      .forEach(o => {
        recommendations.push({
          priority: 'medium',
          category: 'ambiguity',
          skills: o.skills,
          sharedKeywords: o.overlappingKeywords,
          message: `"${o.skills[0]}" ↔ "${o.skills[1]}": ${o.count} shared keywords (${o.overlappingKeywords.slice(0, 5).join(', ')}${o.count > 5 ? '...' : ''}). Add context-based disambiguation rules.`
        });
      });
  }

  // Low uniqueness ratio warning
  if (keywordAnalysis.uniquenessRatio < ROUTING_THRESHOLDS.minKeywordUniqueness) {
    recommendations.push({
      priority: 'medium',
      category: 'ambiguity',
      message: `Keyword uniqueness (${(keywordAnalysis.uniquenessRatio * 100).toFixed(1)}%) below threshold (${ROUTING_THRESHOLDS.minKeywordUniqueness * 100}%). Many keywords appear in multiple skills.`
    });
  }

  // Ambiguity score warning
  if (ambiguityStatus.score > EFFICIENCY_THRESHOLDS.ambiguity.medium) {
    recommendations.push({
      priority: 'medium',
      category: 'ambiguity',
      message: `Global ambiguity score (${ambiguityStatus.score.toFixed(2)}) indicates potential misrouting risk. Review disambiguation matrix in routing.md.`
    });
  }

  return recommendations;
}

/**
 * Collect all routing metrics
 * Focus on ambiguity analysis for routing quality
 * @returns {Object} Complete metrics collection
 */
function collectMetrics() {
  const metrics = {
    timestamp: new Date().toISOString(),
    version: '2.0.0',
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
    ambiguityStatus: {
      score: 0,
      level: 'low'
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
      domainCount: agentInfo.domains.length,
      keywordCount: keywords.length
    };

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
  }

  // Analyze keyword overlap
  metrics.keywordAnalysis.overlap = analyzeKeywordOverlap(skillKeywordMap);

  // Calculate uniqueness ratio
  const totalKeywordUsages = Object.values(skillKeywordMap)
    .reduce((sum, kws) => sum + kws.length, 0);
  metrics.keywordAnalysis.uniquenessRatio = totalKeywordUsages > 0
    ? allKeywords.size / totalKeywordUsages
    : 1;

  // Calculate ambiguity score - the key metric for routing quality
  const ambiguityScore = calculateAmbiguityScore(
    metrics.keywordAnalysis.overlap,
    allKeywords.size
  );
  metrics.ambiguityStatus.score = ambiguityScore;
  metrics.ambiguityStatus.level =
    ambiguityScore <= EFFICIENCY_THRESHOLDS.ambiguity.low ? 'low' :
    ambiguityScore <= EFFICIENCY_THRESHOLDS.ambiguity.medium ? 'medium' :
    ambiguityScore <= EFFICIENCY_THRESHOLDS.ambiguity.high ? 'high' : 'critical';

  // Generate recommendations focused on ambiguity
  metrics.recommendations = generateRecommendations(metrics);

  return metrics;
}

/**
 * Format metrics as markdown report
 * @param {Object} metrics - Collected metrics
 * @returns {string} Markdown formatted report
 */
function formatMarkdown(metrics) {
  let md = `# Routing Ambiguity Report

Generated: ${metrics.timestamp}

## Summary

| Metric | Value | Status |
|--------|-------|--------|
| Total Skills | ${metrics.summary.totalSkills} | - |
| Total Agents | ${metrics.summary.totalAgents} | - |
| Unique Keywords | ${metrics.summary.totalKeywords} | - |
| Keyword Uniqueness | ${(metrics.keywordAnalysis.uniquenessRatio * 100).toFixed(1)}% | ${metrics.keywordAnalysis.uniquenessRatio >= ROUTING_THRESHOLDS.minKeywordUniqueness ? '✓' : '⚠️'} |
| **Ambiguity Score** | ${metrics.ambiguityStatus.score.toFixed(2)} | ${metrics.ambiguityStatus.level.toUpperCase()} |
| High-Severity Overlaps | ${metrics.keywordAnalysis.overlap.highSeverityCount} | ${metrics.keywordAnalysis.overlap.highSeverityCount > 0 ? '⚠️' : '✓'} |

## Keyword Overlap Analysis

Keywords shared between multiple skills can cause misrouting. High-severity overlaps (>${ROUTING_THRESHOLDS.maxKeywordOverlap} shared keywords) require disambiguation rules.

### Overlaps by Severity

`;

  const highOverlaps = metrics.keywordAnalysis.overlap.overlaps.filter(o => o.severity === 'high');
  const lowOverlaps = metrics.keywordAnalysis.overlap.overlaps.filter(o => o.severity === 'low');

  if (highOverlaps.length > 0) {
    md += `#### ⚠️ High Severity (needs disambiguation)\n\n`;
    highOverlaps.forEach(overlap => {
      md += `- **${overlap.skills[0]}** ↔ **${overlap.skills[1]}**: ${overlap.count} keywords\n`;
      md += `  - \`${overlap.overlappingKeywords.join('`, `')}\`\n`;
    });
    md += '\n';
  }

  if (lowOverlaps.length > 0) {
    md += `#### Low Severity\n\n`;
    lowOverlaps.slice(0, 10).forEach(overlap => {
      md += `- ${overlap.skills[0]} ↔ ${overlap.skills[1]}: ${overlap.count} keywords\n`;
    });
    if (lowOverlaps.length > 10) {
      md += `- ... and ${lowOverlaps.length - 10} more\n`;
    }
  }

  if (metrics.recommendations.length > 0) {
    md += `
## Recommendations

`;
    metrics.recommendations.forEach(r => {
      const icon = r.priority === 'high' ? '🔴' : r.priority === 'medium' ? '🟡' : '○';
      md += `${icon} ${r.message}\n\n`;
    });
  }

  return md;
}

/**
 * Format metrics as human-readable summary
 * @param {Object} metrics - Collected metrics
 * @returns {string} Summary text
 */
function formatSummary(metrics) {
  const ambiguityIcon = metrics.ambiguityStatus.level === 'low' ? '✓' :
                        metrics.ambiguityStatus.level === 'medium' ? '○' : '⚠️';

  let summary = `
╔══════════════════════════════════════════════════════════════════╗
║            ROUTING AMBIGUITY ANALYSIS                            ║
╠══════════════════════════════════════════════════════════════════╣
║  Generated: ${metrics.timestamp.substring(0, 19).padEnd(42)}     ║
╚══════════════════════════════════════════════════════════════════╝

📊 INVENTORY
────────────────────────────────────────────
  Skills:             ${String(metrics.summary.totalSkills).padStart(5)}
  Agents:             ${String(metrics.summary.totalAgents).padStart(5)}
  Keywords:           ${String(metrics.summary.totalKeywords).padStart(5)}

🎯 AMBIGUITY STATUS
────────────────────────────────────────────
  Ambiguity Score:    ${metrics.ambiguityStatus.score.toFixed(2)} ${ambiguityIcon} ${metrics.ambiguityStatus.level.toUpperCase()}
  Keyword Uniqueness: ${(metrics.keywordAnalysis.uniquenessRatio * 100).toFixed(1)}%
  High-Severity:      ${String(metrics.keywordAnalysis.overlap.highSeverityCount).padStart(5)} overlaps`;

  if (metrics.keywordAnalysis.overlap.highSeverityCount > 0) {
    summary += `

⚠️  KEYWORD OVERLAPS (risk of misrouting)
────────────────────────────────────────────`;
    metrics.keywordAnalysis.overlap.overlaps
      .filter(o => o.severity === 'high')
      .forEach(o => {
        summary += `\n  ${o.skills[0]} ↔ ${o.skills[1]}`;
        summary += `\n    → ${o.overlappingKeywords.slice(0, 5).join(', ')}${o.count > 5 ? '...' : ''}`;
      });
  }

  if (metrics.recommendations.length > 0) {
    summary += `

📋 ACTIONS
────────────────────────────────────────────`;
    metrics.recommendations
      .filter(r => r.priority === 'high')
      .forEach(r => {
        summary += `\n  🔴 ${r.message}`;
      });
    metrics.recommendations
      .filter(r => r.priority === 'medium')
      .slice(0, 3)
      .forEach(r => {
        summary += `\n  🟡 ${r.message}`;
      });
  }

  summary += '\n';
  return summary;
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
