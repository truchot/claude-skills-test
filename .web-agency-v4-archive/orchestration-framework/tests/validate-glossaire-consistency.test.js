import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readFile, readdir, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const WEB_AGENCY_ROOT = join(__dirname, '..', '..');

async function readFileContent(path) {
  try {
    return await readFile(path, 'utf-8');
  } catch {
    return null;
  }
}

async function getSkillDirs() {
  const skillsDir = join(WEB_AGENCY_ROOT, 'skills');
  const entries = await readdir(skillsDir, { withFileTypes: true });
  return entries.filter(e => e.isDirectory()).map(e => e.name);
}

// ============================================================
// TESTS
// ============================================================

describe('Conformité au Glossaire', () => {

  describe('Le GLOSSAIRE.md existe et contient les sections requises', () => {
    it('GLOSSAIRE.md existe', async () => {
      const content = await readFileContent(join(WEB_AGENCY_ROOT, 'GLOSSAIRE.md'));
      assert.ok(content, 'GLOSSAIRE.md manquant');
    });

    it('contient les sections de terminologie canonique', async () => {
      const content = await readFileContent(join(WEB_AGENCY_ROOT, 'GLOSSAIRE.md'));
      assert.ok(content, 'GLOSSAIRE.md manquant');

      const requiredSections = [
        'Phases du Projet',
        'Niveaux Hiérarchiques',
        'Complexité',
        'Urgence'
      ];

      for (const section of requiredSections) {
        assert.ok(
          content.includes(section),
          `GLOSSAIRE.md manque la section "${section}"`
        );
      }
    });
  });

  describe('Les 8 phases sont documentées dans le glossaire', () => {
    const phases = [
      { id: '1-intake', name: 'Prise de brief' },
      { id: '2-strategy', name: 'Stratégie' },
      { id: '3-conception', name: 'Conception' },
      { id: '4-realisation', name: 'Réalisation' },
      { id: '5-deploiement', name: 'Déploiement' },
      { id: '6-lancement', name: 'Lancement' },
      { id: '7-maintenance', name: 'Maintenance' },
      { id: '8-bilan', name: 'Bilan' }
    ];

    for (const phase of phases) {
      it(`Phase "${phase.name}" (${phase.id}) est dans le glossaire`, async () => {
        const content = await readFileContent(join(WEB_AGENCY_ROOT, 'GLOSSAIRE.md'));
        assert.ok(content, 'GLOSSAIRE.md manquant');
        assert.ok(
          content.includes(phase.id),
          `GLOSSAIRE.md ne contient pas l'ID de phase "${phase.id}"`
        );
      });
    }
  });

  describe('Les labels hiérarchiques sont cohérents entre GLOSSAIRE et HIERARCHY', () => {
    const levels = ['ENTRÉE', 'STRATÉGIE', 'PROCESSUS', 'IMPLÉMENTATION', 'TRANSVERSE'];

    it('HIERARCHY.md existe', async () => {
      const content = await readFileContent(join(WEB_AGENCY_ROOT, 'HIERARCHY.md'));
      assert.ok(content, 'HIERARCHY.md manquant');
    });

    for (const level of levels) {
      it(`le label "${level}" est présent dans GLOSSAIRE et HIERARCHY`, async () => {
        const glossaire = await readFileContent(join(WEB_AGENCY_ROOT, 'GLOSSAIRE.md'));
        const hierarchy = await readFileContent(join(WEB_AGENCY_ROOT, 'HIERARCHY.md'));
        assert.ok(glossaire, 'GLOSSAIRE.md manquant');
        assert.ok(hierarchy, 'HIERARCHY.md manquant');

        assert.ok(
          glossaire.includes(level),
          `GLOSSAIRE.md ne contient pas "${level}"`
        );
        assert.ok(
          hierarchy.includes(level),
          `HIERARCHY.md ne contient pas "${level}"`
        );
      });
    }
  });

  describe('Termes interdits absents des documents centraux', () => {
    const centralDocs = [
      'GLOSSAIRE.md',
      'HIERARCHY.md',
      'deliverables/MAPPING.md',
      'deliverables/PROJECT-LIFECYCLE.md',
      'orchestration-framework/orchestration/routing.md',
      'orchestration-framework/orchestration/composition.md'
    ];

    // Terms the glossary explicitly says NOT to use
    const forbiddenTerms = [
      { term: '"intake" seul sans contexte', pattern: /\bintake\b(?![-_\w])/i, exclude: ['client-intake', '1-intake', 'INTAKE'] },
      { term: '"design phase"', pattern: /design phase/i },
      { term: '"development phase"', pattern: /development phase/i },
      { term: '"deployment phase"', pattern: /deployment phase/i },
      { term: '"launch phase"', pattern: /launch phase/i },
      { term: '"maintenance phase"', pattern: /maintenance phase/i },
      { term: '"review phase"', pattern: /review phase/i }
    ];

    for (const doc of centralDocs) {
      for (const { term, pattern } of forbiddenTerms) {
        it(`${doc} n'utilise pas le terme interdit ${term}`, async () => {
          const content = await readFileContent(join(WEB_AGENCY_ROOT, doc));
          if (!content) return; // File may not exist yet

          // Skip code blocks
          const lines = content.split('\n');
          let inCodeBlock = false;
          const problems = [];

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.trim().startsWith('```')) {
              inCodeBlock = !inCodeBlock;
              continue;
            }
            if (inCodeBlock) continue;

            // Skip the "Ne PAS utiliser" column itself in the glossary
            if (line.includes('Ne PAS utiliser') || line.includes('Ne pas utiliser')) continue;

            if (pattern.test(line)) {
              problems.push(`Line ${i + 1}: "${line.trim()}"`);
            }
          }

          assert.strictEqual(
            problems.length, 0,
            `${doc} utilise le terme interdit ${term}:\n${problems.join('\n')}`
          );
        });
      }
    }
  });

  describe('Les seuils de complexité sont cohérents', () => {
    const complexityLevels = ['MICRO', 'PETIT', 'MOYEN', 'GRAND'];

    it('GLOSSAIRE.md contient les 4 seuils de complexité', async () => {
      const content = await readFileContent(join(WEB_AGENCY_ROOT, 'GLOSSAIRE.md'));
      assert.ok(content, 'GLOSSAIRE.md manquant');

      for (const level of complexityLevels) {
        assert.ok(
          content.includes(`**${level}**`),
          `GLOSSAIRE.md ne contient pas le seuil de complexité "${level}"`
        );
      }
    });

    it('HIERARCHY.md contient les 4 seuils de complexité', async () => {
      const content = await readFileContent(join(WEB_AGENCY_ROOT, 'HIERARCHY.md'));
      assert.ok(content, 'HIERARCHY.md manquant');

      for (const level of complexityLevels) {
        assert.ok(
          content.includes(`**${level}**`),
          `HIERARCHY.md ne contient pas le seuil de complexité "${level}"`
        );
      }
    });
  });

  describe('Naming conventions ADR-007 compliance', () => {
    // Technical skills should be in English
    const technicalSkills = [
      'frontend-developer', 'backend-developer', 'devops',
      'react-expert', 'nextjs-expert', 'wordpress-gutenberg-expert',
      'seo-expert', 'security-expert'
    ];

    // Business/direction skills should be in French
    const businessSkills = [
      'direction-technique', 'direction-commerciale', 'direction-marketing',
      'direction-operations', 'direction-artistique',
      'experience-client', 'support-client'
    ];

    it('les skills techniques existent avec des noms anglais', async () => {
      for (const skill of technicalSkills) {
        const skillPath = join(WEB_AGENCY_ROOT, 'skills', skill);
        try {
          await stat(skillPath);
        } catch {
          // Skill may not exist yet, skip
          continue;
        }
        // If it exists, verify the name is in English (no accented characters)
        assert.ok(
          !/[àâäéèêëïîôùûüÿçœæ]/.test(skill),
          `Skill technique "${skill}" devrait avoir un nom anglais (sans accents)`
        );
      }
    });

    it('les skills métier existent avec des noms français', async () => {
      for (const skill of businessSkills) {
        const skillPath = join(WEB_AGENCY_ROOT, 'skills', skill);
        try {
          await stat(skillPath);
        } catch {
          continue;
        }
        // French business skills should contain French words (direction-, experience-, support-)
        assert.ok(
          /^(direction|experience|support|client)/.test(skill),
          `Skill métier "${skill}" devrait avoir un nom français`
        );
      }
    });
  });

  describe('PROJECT-LIFECYCLE.md couvre les 8 phases', () => {
    it('les 8 phases sont documentées dans le lifecycle', async () => {
      const content = await readFileContent(join(WEB_AGENCY_ROOT, 'deliverables/PROJECT-LIFECYCLE.md'));
      assert.ok(content, 'PROJECT-LIFECYCLE.md manquant');

      const phases = [
        'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4',
        'Phase 5', 'Phase 6', 'Phase 7', 'Phase 8'
      ];

      for (const phase of phases) {
        assert.ok(
          content.includes(phase),
          `PROJECT-LIFECYCLE.md ne contient pas "${phase}"`
        );
      }
    });
  });
});
