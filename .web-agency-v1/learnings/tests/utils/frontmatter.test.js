/**
 * Tests for frontmatter parsing utility
 */

const { parseFrontmatter, validateRequiredFields } = require('./frontmatter');

describe('parseFrontmatter', () => {
  test('parses basic frontmatter', () => {
    const content = `---
id: test-001
category: testing
---

# Content`;

    const result = parseFrontmatter(content);

    expect(result).toEqual({
      id: 'test-001',
      category: 'testing',
    });
  });

  test('parses arrays', () => {
    const content = `---
tags: [tag1, tag2, tag3]
---`;

    const result = parseFrontmatter(content);

    expect(result.tags).toEqual(['tag1', 'tag2', 'tag3']);
  });

  test('parses numbers', () => {
    const content = `---
usage_count: 42
---`;

    const result = parseFrontmatter(content);

    expect(result.usage_count).toBe(42);
  });

  test('parses booleans', () => {
    const content = `---
validated: true
deprecated: false
---`;

    const result = parseFrontmatter(content);

    expect(result.validated).toBe(true);
    expect(result.deprecated).toBe(false);
  });

  test('handles values with colons', () => {
    const content = `---
url: https://example.com
---`;

    const result = parseFrontmatter(content);

    expect(result.url).toBe('https://example.com');
  });

  test('returns null for content without frontmatter', () => {
    const content = `# Just a heading

No frontmatter here.`;

    const result = parseFrontmatter(content);

    expect(result).toBeNull();
  });

  test('handles empty frontmatter', () => {
    const content = `---
---

# Content`;

    const result = parseFrontmatter(content);

    expect(result).toEqual({});
  });

  test('trims whitespace from keys and values', () => {
    const content = `---
  key  :   value
---`;

    const result = parseFrontmatter(content);

    expect(result.key).toBe('value');
  });

  test('handles empty arrays', () => {
    const content = `---
tags: []
---`;

    const result = parseFrontmatter(content);

    expect(result.tags).toEqual([]);
  });
});

describe('validateRequiredFields', () => {
  test('returns valid for complete frontmatter', () => {
    const frontmatter = {
      id: 'test-001',
      category: 'testing',
      tags: ['test'],
    };
    const required = ['id', 'category'];

    const result = validateRequiredFields(frontmatter, required);

    expect(result.valid).toBe(true);
    expect(result.missing).toEqual([]);
  });

  test('returns invalid with missing fields', () => {
    const frontmatter = {
      id: 'test-001',
    };
    const required = ['id', 'category', 'tags'];

    const result = validateRequiredFields(frontmatter, required);

    expect(result.valid).toBe(false);
    expect(result.missing).toContain('category');
    expect(result.missing).toContain('tags');
    expect(result.missing).not.toContain('id');
  });

  test('handles empty required array', () => {
    const frontmatter = { id: 'test' };
    const required = [];

    const result = validateRequiredFields(frontmatter, required);

    expect(result.valid).toBe(true);
    expect(result.missing).toEqual([]);
  });
});
