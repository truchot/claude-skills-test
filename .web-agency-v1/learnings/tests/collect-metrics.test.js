/**
 * Tests for collect-learning-metrics.js
 */

const path = require('path');
const { collectMetrics, collectFiles } = require('../scripts/collect-learning-metrics');

describe('collectMetrics', () => {
  test('returns metrics object with required fields', () => {
    const metrics = collectMetrics();

    expect(metrics).toHaveProperty('timestamp');
    expect(metrics).toHaveProperty('summary');
    expect(metrics).toHaveProperty('usage');
    expect(metrics).toHaveProperty('distribution');
    expect(metrics).toHaveProperty('patterns');
    expect(metrics).toHaveProperty('antiPatterns');
    expect(metrics).toHaveProperty('decisions');
  });

  test('summary contains correct counts', () => {
    const metrics = collectMetrics();

    expect(typeof metrics.summary.total_patterns).toBe('number');
    expect(typeof metrics.summary.total_antipatterns).toBe('number');
    expect(typeof metrics.summary.total_decisions).toBe('number');
    expect(metrics.summary.total_patterns).toBeGreaterThanOrEqual(0);
    expect(metrics.summary.total_antipatterns).toBeGreaterThanOrEqual(0);
  });

  test('patterns array contains valid entries', () => {
    const metrics = collectMetrics();

    metrics.patterns.forEach(pattern => {
      expect(pattern).toHaveProperty('id');
      expect(pattern).toHaveProperty('category');
      expect(pattern).toHaveProperty('usage_count');
      expect(typeof pattern.usage_count).toBe('number');
    });
  });

  test('antiPatterns array contains valid entries', () => {
    const metrics = collectMetrics();

    metrics.antiPatterns.forEach(ap => {
      expect(ap).toHaveProperty('id');
      expect(ap).toHaveProperty('severity');
      expect(ap).toHaveProperty('occurrence_count');
      expect(typeof ap.occurrence_count).toBe('number');
    });
  });

  test('distribution contains top_tags array', () => {
    const metrics = collectMetrics();

    expect(Array.isArray(metrics.distribution.top_tags)).toBe(true);
    metrics.distribution.top_tags.forEach(tagEntry => {
      expect(tagEntry).toHaveProperty('tag');
      expect(tagEntry).toHaveProperty('count');
      expect(typeof tagEntry.count).toBe('number');
    });
  });

  test('timestamp is valid ISO string', () => {
    const metrics = collectMetrics();

    expect(new Date(metrics.timestamp).toISOString()).toBe(metrics.timestamp);
  });
});

describe('collectFiles', () => {
  test('returns empty array for non-existent directory', () => {
    const result = collectFiles('/non/existent/path');
    expect(result).toEqual([]);
  });

  test('collects files from patterns directory', () => {
    const patternsDir = path.join(__dirname, '../patterns');
    const result = collectFiles(patternsDir);

    expect(Array.isArray(result)).toBe(true);
    // Should not include INDEX.md
    expect(result.every(f => f.file !== 'INDEX.md')).toBe(true);
    // All entries should have file property
    expect(result.every(f => f.file.endsWith('.md'))).toBe(true);
  });

  test('parses frontmatter correctly', () => {
    const patternsDir = path.join(__dirname, '../patterns');
    const result = collectFiles(patternsDir);

    // At least one file should have parsed frontmatter
    const withId = result.filter(f => f.id);
    expect(withId.length).toBeGreaterThan(0);
  });
});
