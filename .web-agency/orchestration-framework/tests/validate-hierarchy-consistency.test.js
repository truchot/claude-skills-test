import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readFile, readdir, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const WEB_AGENCY_ROOT = join(__dirname, '..', '..');

/**
 * Source de vérité : les labels sémantiques de hiérarchie.
 * Tout document qui mentionne un niveau doit utiliser ces labels.
 */
const HIERARCHY = {
  'ENTRÉE': [
    'client-intake'
  ],
  'STRATÉGIE': [
    'direction-technique',
    'direction-operations',
    'direction-commerciale',
    'direction-marketing',
    'direction-artistique'
  ],
  'PROCESSUS': [
    'project-management',
    'lead-dev',
    'web-dev-process',
    'testing-process',
    'experience-client'
  ],
  'IMPLÉMENTATION': [
    'frontend-developer',
    'backend-developer',
    'devops',
    'react-expert',
    'nextjs-expert',
    'wordpress-gutenberg-expert',
    'design-system-foundations',
    'ux-ui-design',
    'seo-expert',
    'paid-media',
    'marketing-analytics',
    'customer-success',
    'content-marketing',
    'marketing-ops',
    'legal-compliance',
    'support-client',
    'commercial-crm',
    'finance-analytics',
    'content-management',
    'ai-integration',
    'legacy-modernization',
    'security-expert'
  ],
  'TRANSVERSE': [
    'ddd'
  ]
};

// Build reverse map: skill → level
const SKILL_TO_LEVEL = {};
for (const [level, skills] of Object.entries(HIERARCHY)) {
  for (const skill of skills) {
    SKILL_TO_LEVEL[skill] = level;
  }
}

const ALL_SKILLS = Object.values(HIERARCHY).flat();
const VALID_LEVELS = Object.keys(HIERARCHY);

async function readFileContent(path) {
  try {
    return await readFile(path, 'utf-8');
  } catch {
    return null;
  }
}

async function fileExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

function extractFrontmatterLevel(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const yaml = match[1];
  const levelMatch = yaml.match(/level:\s*(.+)/);
  if (!levelMatch) return null;
  return levelMatch[1].trim();
}

function extractTextLevel(content) {
  // Match patterns like "NIVEAU X", "Niveau X", "ENTRÉE", "STRATÉGIE", etc.
  const patterns = [
    /NIVEAU\s*:?\s*(ENTRÉE|STRATÉGIE|PROCESSUS|IMPLÉMENTATION|TRANSVERSE)/i,
    /Position.*Hiérarchie[\s\S]*?(ENTRÉE|STRATÉGIE|PROCESSUS|IMPLÉMENTATION|TRANSVERSE)/i
  ];
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) return match[1].toUpperCase();
  }
  return null;
}

// ============================================================
// TESTS
// ============================================================

describe('Cohérence de la hiérarchie des skills', () => {

  describe('Aucun niveau numérique résiduel dans les documents centraux', () => {
    const centralDocs = [
      'README.md',
      'deliverables/MAPPING.md',
      'deliverables/SKILLS-STRUCTURE.md',
      'orchestration-framework/orchestration/dependency-graph.md',
      'orchestration-framework/orchestration/composition.md',
      'orchestration-framework/orchestration/routing.md'
    ];

    for (const doc of centralDocs) {
      it(`${doc} n'utilise pas de niveaux numériques (Niveau 0/1/2/3/4)`, async () => {
        const content = await readFileContent(join(WEB_AGENCY_ROOT, doc));
        if (!content) return; // File may not exist yet

        // Check for old numeric level patterns in tables (e.g., "| 0 |", "| 1 |", "| 2 |", "| 3 |", "| 4 |")
        // But exclude code blocks, mermaid diagrams, and agent counts
        const lines = content.split('\n');
        const problems = [];

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          // Skip code blocks
          if (line.trim().startsWith('```')) continue;
          // Skip mermaid content
          if (line.includes('flowchart') || line.includes('subgraph')) continue;
          // Skip lines that are clearly not level declarations
          if (line.includes('agents') || line.includes('(') || line.includes('Sprint')) continue;

          // Check for "| N |" pattern where N is 0-4 in a table row that looks like a level column
          // This is a heuristic - we check for table rows with a bare number in the Niveau column
          const levelTableMatch = line.match(/\|\s*[0-4]\s*\|/);
          if (levelTableMatch && (line.toLowerCase().includes('niveau') || (i > 0 && lines[i-1] && lines[i-1].toLowerCase().includes('niveau')))) {
            problems.push(`Line ${i+1}: "${line.trim()}" uses numeric level`);
          }
        }

        assert.strictEqual(
          problems.length, 0,
          `${doc} contains numeric levels:\n${problems.join('\n')}`
        );
      });
    }
  });

  describe('Documents centraux utilisent les labels sémantiques', () => {
    it('README.md mentionne les 4 labels sémantiques', async () => {
      const content = await readFileContent(join(WEB_AGENCY_ROOT, 'README.md'));
      assert.ok(content, 'README.md manquant');

      for (const level of ['ENTRÉE', 'STRATÉGIE', 'PROCESSUS', 'IMPLÉMENTATION']) {
        assert.ok(
          content.includes(level),
          `README.md ne mentionne pas le label "${level}"`
        );
      }
    });

    it('composition.md mentionne les labels sémantiques', async () => {
      const content = await readFileContent(
        join(WEB_AGENCY_ROOT, 'orchestration-framework/orchestration/composition.md')
      );
      assert.ok(content, 'composition.md manquant');

      for (const level of ['STRATÉGIE', 'PROCESSUS', 'IMPLÉMENTATION']) {
        assert.ok(
          content.includes(level),
          `composition.md ne mentionne pas le label "${level}"`
        );
      }
    });

    it('routing.md mentionne les labels sémantiques', async () => {
      const content = await readFileContent(
        join(WEB_AGENCY_ROOT, 'orchestration-framework/orchestration/routing.md')
      );
      assert.ok(content, 'routing.md manquant');

      for (const level of ['STRATÉGIE', 'PROCESSUS', 'IMPLÉMENTATION']) {
        assert.ok(
          content.includes(level),
          `routing.md ne mentionne pas le label "${level}"`
        );
      }
    });
  });

  describe('Seuils de complexité documentés', () => {
    it('composition.md contient les seuils de complexité', async () => {
      const content = await readFileContent(
        join(WEB_AGENCY_ROOT, 'orchestration-framework/orchestration/composition.md')
      );
      assert.ok(content, 'composition.md manquant');

      for (const threshold of ['MICRO', 'PETIT', 'MOYEN', 'GRAND']) {
        assert.ok(
          content.includes(threshold),
          `composition.md ne définit pas le seuil "${threshold}"`
        );
      }
    });

    it('routing.md contient les seuils de complexité', async () => {
      const content = await readFileContent(
        join(WEB_AGENCY_ROOT, 'orchestration-framework/orchestration/routing.md')
      );
      assert.ok(content, 'routing.md manquant');

      for (const threshold of ['MICRO', 'PETIT', 'MOYEN', 'GRAND']) {
        assert.ok(
          content.includes(threshold),
          `routing.md ne définit pas le seuil "${threshold}"`
        );
      }
    });
  });

  describe('Tous les skills existent sur le disque', () => {
    for (const skill of ALL_SKILLS) {
      it(`Le skill "${skill}" existe`, async () => {
        const skillPath = join(WEB_AGENCY_ROOT, 'skills', skill);
        const exists = await fileExists(skillPath);
        assert.ok(exists, `Le skill "${skill}" n'existe pas dans skills/`);
      });
    }
  });

  describe('MAPPING.md liste tous les skills', () => {
    it('tous les skills sont mentionnés dans MAPPING.md', async () => {
      const content = await readFileContent(join(WEB_AGENCY_ROOT, 'deliverables/MAPPING.md'));
      assert.ok(content, 'MAPPING.md manquant');

      const missing = [];
      for (const skill of ALL_SKILLS) {
        if (!content.includes(skill)) {
          missing.push(skill);
        }
      }

      assert.strictEqual(
        missing.length, 0,
        `Skills manquants dans MAPPING.md: ${missing.join(', ')}`
      );
    });
  });

  describe('SKILLS-STRUCTURE.md liste tous les skills', () => {
    it('tous les skills sont mentionnés dans SKILLS-STRUCTURE.md', async () => {
      const content = await readFileContent(join(WEB_AGENCY_ROOT, 'deliverables/SKILLS-STRUCTURE.md'));
      assert.ok(content, 'SKILLS-STRUCTURE.md manquant');

      const missing = [];
      for (const skill of ALL_SKILLS) {
        if (!content.includes(skill)) {
          missing.push(skill);
        }
      }

      assert.strictEqual(
        missing.length, 0,
        `Skills manquants dans SKILLS-STRUCTURE.md: ${missing.join(', ')}`
      );
    });
  });

  describe('README.md liste tous les skills', () => {
    it('tous les skills sont mentionnés dans README.md', async () => {
      const content = await readFileContent(join(WEB_AGENCY_ROOT, 'README.md'));
      assert.ok(content, 'README.md manquant');

      const missing = [];
      for (const skill of ALL_SKILLS) {
        if (!content.includes(skill)) {
          missing.push(skill);
        }
      }

      assert.strictEqual(
        missing.length, 0,
        `Skills manquants dans README.md: ${missing.join(', ')}`
      );
    });
  });
});
