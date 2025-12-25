/**
 * Validate Learning Hooks Integration
 *
 * Checks that agent files include learning consultation steps
 * as defined in LEARNING-GUIDE.md workflow.
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const SKILLS_DIR = path.join(__dirname, '../../skills');

// Agents that should consult learnings before execution
const AGENTS_REQUIRING_LEARNING_HOOKS = [
  'direction-technique',
  'web-dev-process',
  'wordpress-gutenberg-expert',
];

// Keywords indicating learning consultation
const LEARNING_KEYWORDS = [
  'learnings',
  'learning-loop',
  'patterns/',
  'anti-patterns/',
  'LEARNING-GUIDE',
  'consulter.*apprentissages',
  'éviter.*erreurs passées',
];

function hasLearningReference(content) {
  const lowerContent = content.toLowerCase();
  return LEARNING_KEYWORDS.some(keyword => {
    if (keyword.includes('.*')) {
      const regex = new RegExp(keyword, 'i');
      return regex.test(content);
    }
    return lowerContent.includes(keyword.toLowerCase());
  });
}

describe('Learning Hooks in Agents', () => {
  AGENTS_REQUIRING_LEARNING_HOOKS.forEach(skillName => {
    describe(`${skillName}`, () => {
      const skillDir = path.join(SKILLS_DIR, skillName);

      if (!fs.existsSync(skillDir)) {
        test.skip(`skill directory not found: ${skillName}`, () => {});
        return;
      }

      // Check main prompt file
      const promptFile = path.join(skillDir, 'prompt.md');
      if (fs.existsSync(promptFile)) {
        test('main prompt references learnings', () => {
          const content = fs.readFileSync(promptFile, 'utf8');
          expect(hasLearningReference(content)).toBe(true);
        });
      }

      // Check agent files in agents/ directory
      const agentsDir = path.join(skillDir, 'agents');
      if (fs.existsSync(agentsDir)) {
        const agentFiles = [];
        const walkDir = (dir) => {
          fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
              walkDir(fullPath);
            } else if (file.endsWith('.md')) {
              agentFiles.push(fullPath);
            }
          });
        };
        walkDir(agentsDir);

        // Check at least one agent references learnings
        test('at least one agent references learnings', () => {
          const hasReference = agentFiles.some(file => {
            const content = fs.readFileSync(file, 'utf8');
            return hasLearningReference(content);
          });
          expect(hasReference).toBe(true);
        });
      }
    });
  });
});

describe('Learning Workflow Presence', () => {
  test('LEARNING-GUIDE.md exists', () => {
    const guidePath = path.join(__dirname, '../LEARNING-GUIDE.md');
    expect(fs.existsSync(guidePath)).toBe(true);
  });

  test('patterns/INDEX.md exists', () => {
    const indexPath = path.join(__dirname, '../patterns/INDEX.md');
    expect(fs.existsSync(indexPath)).toBe(true);
  });

  test('anti-patterns/INDEX.md exists', () => {
    const indexPath = path.join(__dirname, '../anti-patterns/INDEX.md');
    expect(fs.existsSync(indexPath)).toBe(true);
  });
});
