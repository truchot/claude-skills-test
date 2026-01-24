/**
 * Validate Learning Files Format
 *
 * Ensures all learning files follow the expected frontmatter structure
 * and naming conventions defined in LEARNING-GUIDE.md
 */

const fs = require('fs');
const path = require('path');
const { parseFrontmatter } = require('./utils/frontmatter');

const LEARNINGS_DIR = path.join(__dirname, '..');

const REQUIRED_FRONTMATTER = {
  patterns: ['id', 'category', 'tags', 'created'],
  'anti-patterns': ['id', 'severity', 'tags', 'first_occurrence'],
  decisions: ['id', 'category', 'tags', 'created'],
};

const VALID_SEVERITIES = ['low', 'medium', 'high', 'critical'];
const VALID_CATEGORIES = ['setup', 'development', 'deployment', 'testing', 'security', 'architecture', 'tooling', 'process'];

describe('Learning Files Validation', () => {
  const learningTypes = ['patterns', 'anti-patterns', 'decisions'];

  learningTypes.forEach(type => {
    describe(`${type}/`, () => {
      const dir = path.join(LEARNINGS_DIR, type);

      if (!fs.existsSync(dir)) {
        test.skip(`${type} directory does not exist`, () => {});
        return;
      }

      const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'INDEX.md');

      if (files.length === 0) {
        test.skip(`no ${type} files found`, () => {});
        return;
      }

      files.forEach(file => {
        describe(file, () => {
          const content = fs.readFileSync(path.join(dir, file), 'utf8');
          const frontmatter = parseFrontmatter(content);

          test('has valid frontmatter', () => {
            expect(frontmatter).not.toBeNull();
          });

          if (frontmatter) {
            REQUIRED_FRONTMATTER[type]?.forEach(field => {
              test(`has required field: ${field}`, () => {
                expect(frontmatter).toHaveProperty(field);
              });
            });

            if (type === 'anti-patterns' && frontmatter.severity) {
              test('has valid severity', () => {
                expect(VALID_SEVERITIES).toContain(frontmatter.severity);
              });
            }

            if (frontmatter.category) {
              test('has valid category', () => {
                const categories = Array.isArray(frontmatter.category)
                  ? frontmatter.category
                  : [frontmatter.category];
                categories.forEach(cat => {
                  expect(VALID_CATEGORIES).toContain(cat);
                });
              });
            }

            test('has non-empty id', () => {
              expect(frontmatter.id).toBeTruthy();
              expect(typeof frontmatter.id).toBe('string');
            });
          }
        });
      });
    });
  });
});

describe('Learning Files Naming', () => {
  test('pattern files follow [domain]-[action].md convention', async () => {
    const patternsDir = path.join(LEARNINGS_DIR, 'patterns');
    if (!fs.existsSync(patternsDir)) return;

    const files = fs.readdirSync(patternsDir).filter(f => f.endsWith('.md') && f !== 'INDEX.md');
    const kebabCase = /^[a-z0-9]+(-[a-z0-9]+)*\.md$/;

    files.forEach(file => {
      expect(file).toMatch(kebabCase);
    });
  });

  test('anti-pattern files follow [symptom]-[cause].md convention', async () => {
    const antiPatternsDir = path.join(LEARNINGS_DIR, 'anti-patterns');
    if (!fs.existsSync(antiPatternsDir)) return;

    const files = fs.readdirSync(antiPatternsDir).filter(f => f.endsWith('.md') && f !== 'INDEX.md');
    const kebabCase = /^[a-z0-9]+(-[a-z0-9]+)*\.md$/;

    files.forEach(file => {
      expect(file).toMatch(kebabCase);
    });
  });

  test('decision files follow when-[option1]-vs-[option2].md convention', async () => {
    const decisionsDir = path.join(LEARNINGS_DIR, 'decisions');
    if (!fs.existsSync(decisionsDir)) return;

    const files = fs.readdirSync(decisionsDir).filter(f => f.endsWith('.md') && f !== 'INDEX.md');
    const whenPattern = /^when-[a-z0-9-]+-vs-[a-z0-9-]+\.md$/;

    files.forEach(file => {
      // Skip INDEX.md and template files
      if (file.startsWith('when-')) {
        expect(file).toMatch(whenPattern);
      }
    });
  });
});
