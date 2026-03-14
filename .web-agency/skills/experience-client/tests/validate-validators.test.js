import { describe, it } from 'node:test';
import assert from 'node:assert';
import { SKILL_CONFIG } from './config.js';
import { resolveRootPath, fileExists, readFileContent, extractFrontmatter } from './utils.js';

describe('Validators experience-client', () => {

  describe('Répertoire validators/', () => {
    it('Le répertoire validators/ existe', async () => {
      const validatorsPath = resolveRootPath('validators');
      const exists = await fileExists(validatorsPath);
      assert.strictEqual(exists, true, 'Le répertoire validators/ n\'existe pas');
    });
  });

  describe('Existence des validateurs', () => {
    for (const validator of SKILL_CONFIG.expectedValidators) {
      it(`${validator}.md existe`, async () => {
        const validatorPath = resolveRootPath('validators', `${validator}.md`);
        const exists = await fileExists(validatorPath);
        assert.strictEqual(exists, true, `Le validateur ${validator}.md n'existe pas`);
      });
    }
  });

  describe('Frontmatter YAML des validateurs', () => {
    for (const validator of SKILL_CONFIG.expectedValidators) {
      it(`${validator}.md a un frontmatter valide`, async () => {
        const validatorPath = resolveRootPath('validators', `${validator}.md`);
        const content = await readFileContent(validatorPath);

        assert.ok(content, `Impossible de lire ${validator}.md`);
        assert.ok(
          content.startsWith('---'),
          `${validator}.md n'a pas de frontmatter YAML`
        );

        const frontmatter = extractFrontmatter(content);
        assert.ok(frontmatter, `Frontmatter invalide dans ${validator}.md`);
        assert.ok(frontmatter.name, `Champ 'name' manquant dans ${validator}.md`);
        assert.ok(frontmatter.description, `Champ 'description' manquant dans ${validator}.md`);
      });
    }
  });

  describe('Structure des validateurs', () => {
    for (const validator of SKILL_CONFIG.expectedValidators) {
      it(`${validator}.md a un titre H1`, async () => {
        const validatorPath = resolveRootPath('validators', `${validator}.md`);
        const content = await readFileContent(validatorPath);

        assert.ok(content, `Impossible de lire ${validator}.md`);
        assert.ok(
          content.includes('# '),
          `${validator}.md n'a pas de titre H1`
        );
      });

      it(`${validator}.md a une section Règles de Validation`, async () => {
        const validatorPath = resolveRootPath('validators', `${validator}.md`);
        const content = await readFileContent(validatorPath);

        assert.ok(content, `Impossible de lire ${validator}.md`);
        assert.ok(
          content.includes('Règles de Validation'),
          `${validator}.md n'a pas de section Règles de Validation`
        );
      });
    }
  });
});
