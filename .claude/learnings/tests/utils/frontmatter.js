/**
 * Frontmatter Parsing Utility
 *
 * Shared utility for parsing YAML frontmatter from markdown files.
 */

/**
 * Parse YAML frontmatter from markdown content
 * @param {string} content - The markdown file content
 * @returns {object|null} Parsed frontmatter object or null if not found
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = {};

  match[1].split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;

    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    if (!key) return;

    // Parse arrays [item1, item2]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map(v => v.trim())
        .filter(v => v.length > 0);
    }
    // Parse numbers
    else if (/^\d+$/.test(value)) {
      value = parseInt(value, 10);
    }
    // Parse booleans
    else if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    }

    frontmatter[key] = value;
  });

  return frontmatter;
}

/**
 * Check if frontmatter has all required fields
 * @param {object} frontmatter - Parsed frontmatter
 * @param {string[]} requiredFields - List of required field names
 * @returns {object} { valid: boolean, missing: string[] }
 */
function validateRequiredFields(frontmatter, requiredFields) {
  const missing = requiredFields.filter(field => !(field in frontmatter));
  return {
    valid: missing.length === 0,
    missing,
  };
}

module.exports = {
  parseFrontmatter,
  validateRequiredFields,
};
