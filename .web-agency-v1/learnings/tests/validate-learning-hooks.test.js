/**
 * Validate Learning Hooks Integration
 *
 * Checks that agent files include learning consultation steps
 * as defined in LEARNING-GUIDE.md workflow.
 */

const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, '../../skills');

// Agents that should consult learnings before execution
const AGENTS_REQUIRING_LEARNING_HOOKS = [
  'direction-technique',
  'web-dev-process',
  'wordpress-gutenberg-expert',
];

// Keywords indicating learning consultation (literal strings and regex patterns)
const LEARNING_KEYWORDS = [
  { type: 'literal', value: 'learnings' },
  { type: 'literal', value: 'learning-loop' },
  { type: 'literal', value: 'patterns/' },
  { type: 'literal', value: 'anti-patterns/' },
  { type: 'literal', value: 'learning-guide' },
  { type: 'literal', value: '.web-agency/learnings' },
  { type: 'regex', value: /consulter.*apprentissages/i },
  { type: 'regex', value: /éviter.*erreurs/i },
  { type: 'regex', value: /consultation.*learning/i },
];

function hasLearningReference(content) {
  const lowerContent = content.toLowerCase();
  return LEARNING_KEYWORDS.some(keyword => {
    if (keyword.type === 'regex') {
      return keyword.value.test(content);
    }
    return lowerContent.includes(keyword.value.toLowerCase());
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

      // Check main SKILL.md file (primary entry point)
      const skillFile = path.join(skillDir, 'SKILL.md');
      if (fs.existsSync(skillFile)) {
        test('SKILL.md references learnings', () => {
          const content = fs.readFileSync(skillFile, 'utf8');
          expect(hasLearningReference(content)).toBe(true);
        });
      }

      // Check orchestrator.md if exists
      const orchestratorFile = path.join(skillDir, 'orchestrator.md');
      if (fs.existsSync(orchestratorFile)) {
        test('orchestrator.md references learnings', () => {
          const content = fs.readFileSync(orchestratorFile, 'utf8');
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

        if (agentFiles.length > 0) {
          test('at least one agent references learnings', () => {
            const hasReference = agentFiles.some(file => {
              const content = fs.readFileSync(file, 'utf8');
              return hasLearningReference(content);
            });
            expect(hasReference).toBe(true);
          });
        }
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

  test('decisions/INDEX.md exists', () => {
    const indexPath = path.join(__dirname, '../decisions/INDEX.md');
    expect(fs.existsSync(indexPath)).toBe(true);
  });
});
