#!/usr/bin/env node
/**
 * Collect Learning Metrics
 *
 * Collects metrics from learning files for dashboard and reporting.
 * Run: node scripts/collect-learning-metrics.js
 */

const fs = require('fs');
const path = require('path');

const LEARNINGS_DIR = path.join(__dirname, '..');

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const frontmatter = {};
  match[1].split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;

    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    // Parse arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(v => v.trim());
    }
    // Parse numbers
    else if (/^\d+$/.test(value)) {
      value = parseInt(value, 10);
    }
    // Parse booleans
    else if (value === 'true') value = true;
    else if (value === 'false') value = false;

    frontmatter[key] = value;
  });
  return frontmatter;
}

function collectFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md') && f !== 'INDEX.md')
    .map(f => {
      const content = fs.readFileSync(path.join(dir, f), 'utf8');
      return {
        file: f,
        ...parseFrontmatter(content),
      };
    });
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
  } else {
    console.error(`Unknown format: ${format}. Use 'json' or 'summary'.`);
    process.exit(1);
  }
}

module.exports = { collectMetrics, parseFrontmatter };
