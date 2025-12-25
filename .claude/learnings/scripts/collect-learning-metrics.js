#!/usr/bin/env node
/**
 * Collect Learning Metrics
 *
 * Collects metrics from learning files for dashboard and reporting.
 * Run: node scripts/collect-learning-metrics.js [json|summary]
 */

const fs = require('fs');
const path = require('path');
const { parseFrontmatter } = require('../tests/utils/frontmatter');

const LEARNINGS_DIR = path.join(__dirname, '..');

/**
 * Collect all learning files from a directory
 * @param {string} dir - Directory path
 * @returns {Array} Array of parsed file objects
 */
function collectFiles(dir) {
  try {
    if (!fs.existsSync(dir)) {
      console.warn(`Warning: Directory not found: ${dir}`);
      return [];
    }

    const files = fs.readdirSync(dir);
    const results = [];

    for (const f of files) {
      if (!f.endsWith('.md') || f === 'INDEX.md') continue;

      try {
        const filePath = path.join(dir, f);
        const content = fs.readFileSync(filePath, 'utf8');
        const frontmatter = parseFrontmatter(content);

        results.push({
          file: f,
          ...frontmatter,
        });
      } catch (err) {
        console.error(`Error reading file ${f}: ${err.message}`);
      }
    }

    return results;
  } catch (err) {
    console.error(`Error reading directory ${dir}: ${err.message}`);
    return [];
  }
}

function collectMetrics() {
  const patterns = collectFiles(path.join(LEARNINGS_DIR, 'patterns'));
  const antiPatterns = collectFiles(path.join(LEARNINGS_DIR, 'anti-patterns'));
  const decisions = collectFiles(path.join(LEARNINGS_DIR, 'decisions'));

  // Calculate metrics
  const totalUsageCount = patterns.reduce((sum, p) => sum + (p.usage_count || 0), 0);
  const totalOccurrenceCount = antiPatterns.reduce((sum, ap) => sum + (ap.occurrence_count || 0), 0);

  const validatedPatterns = patterns.filter(p => p.validated === true).length;
  const criticalAntiPatterns = antiPatterns.filter(ap => ap.severity === 'critical').length;
  const highAntiPatterns = antiPatterns.filter(ap => ap.severity === 'high').length;

  // Category distribution
  const categoryDistribution = {};
  [...patterns, ...decisions].forEach(item => {
    const cat = Array.isArray(item.category) ? item.category[0] : item.category;
    if (cat) {
      categoryDistribution[cat] = (categoryDistribution[cat] || 0) + 1;
    }
  });

  // Tag frequency
  const tagFrequency = {};
  [...patterns, ...antiPatterns, ...decisions].forEach(item => {
    const tags = Array.isArray(item.tags) ? item.tags : [];
    tags.forEach(tag => {
      tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
    });
  });

  return {
    timestamp: new Date().toISOString(),
    summary: {
      total_patterns: patterns.length,
      total_antipatterns: antiPatterns.length,
      total_decisions: decisions.length,
      validated_patterns: validatedPatterns,
      critical_antipatterns: criticalAntiPatterns,
      high_antipatterns: highAntiPatterns,
    },
    usage: {
      total_pattern_uses: totalUsageCount,
      total_antipattern_occurrences: totalOccurrenceCount,
      avg_pattern_usage: patterns.length ? (totalUsageCount / patterns.length).toFixed(2) : 0,
    },
    distribution: {
      by_category: categoryDistribution,
      top_tags: Object.entries(tagFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([tag, count]) => ({ tag, count })),
    },
    patterns: patterns.map(p => ({
      id: p.id,
      category: p.category,
      validated: p.validated,
      usage_count: p.usage_count || 0,
    })),
    antiPatterns: antiPatterns.map(ap => ({
      id: ap.id,
      severity: ap.severity,
      occurrence_count: ap.occurrence_count || 0,
    })),
    decisions: decisions.map(d => ({
      id: d.id,
      category: d.category,
    })),
  };
}

// Main execution
if (require.main === module) {
  try {
    const metrics = collectMetrics();

    // Output format based on argument
    const format = process.argv[2] || 'json';

    if (format === 'json') {
      console.log(JSON.stringify(metrics, null, 2));
    } else if (format === 'summary') {
      console.log('=== Learning Loop Metrics ===\n');
      console.log(`Patterns: ${metrics.summary.total_patterns} (${metrics.summary.validated_patterns} validated)`);
      console.log(`Anti-patterns: ${metrics.summary.total_antipatterns} (${metrics.summary.critical_antipatterns} critical, ${metrics.summary.high_antipatterns} high)`);
      console.log(`Decisions: ${metrics.summary.total_decisions}`);
      console.log(`\nTotal pattern uses: ${metrics.usage.total_pattern_uses}`);
      console.log(`Total antipattern occurrences: ${metrics.usage.total_antipattern_occurrences}`);
      console.log(`\nTop tags: ${metrics.distribution.top_tags.map(t => t.tag).join(', ')}`);
    } else if (format === 'help' || format === '--help' || format === '-h') {
      console.log('Usage: node collect-learning-metrics.js [format]');
      console.log('\nFormats:');
      console.log('  json     Output full metrics as JSON (default)');
      console.log('  summary  Output human-readable summary');
    } else {
      console.error(`Unknown format: ${format}. Use 'json', 'summary', or 'help'.`);
      process.exit(1);
    }
  } catch (err) {
    console.error(`Error collecting metrics: ${err.message}`);
    process.exit(1);
  }
}

module.exports = { collectMetrics, collectFiles };
