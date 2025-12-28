/**
 * Validation du contenu des agents testing-process
 * Vérifie le frontmatter, le contenu substantiel et la cohérence
 */

const fs = require('fs');
const path = require('path');

const SKILL_ROOT = path.join(__dirname, '..');
const AGENTS_DIR = path.join(SKILL_ROOT, 'agents');

const EXPECTED_STRUCTURE = {
  strategy: ['orchestrator', 'pyramide', 'tdd-bdd', 'planning', 'documentation'],
  types: ['orchestrator', 'unit', 'integration', 'e2e', 'component'],
  quality: ['orchestrator', 'coverage', 'mutation', 'flaky'],
  performance: ['orchestrator', 'load', 'frontend-perf', 'profiling'],
  security: ['orchestrator', 'owasp', 'dependencies', 'headers'],
  accessibility: ['orchestrator', 'wcag', 'audit']
};

console.log('=== Validation du Contenu testing-process ===\n');

let errors = 0;
let warnings = 0;

// Fonction pour valider un agent
function validateAgent(domain, agent) {
  const agentPath = path.join(AGENTS_DIR, domain, `${agent}.md`);

  if (!fs.existsSync(agentPath)) {
    return { error: 'Fichier non trouvé' };
  }

  const content = fs.readFileSync(agentPath, 'utf-8');
  const issues = [];

  // Vérifier le frontmatter
  if (!content.startsWith('---\n')) {
    issues.push('Frontmatter manquant');
  } else {
    const frontmatterEnd = content.indexOf('\n---', 4);
    if (frontmatterEnd === -1) {
      issues.push('Frontmatter non fermé');
    } else {
      const frontmatter = content.substring(4, frontmatterEnd);

      if (!frontmatter.match(/name:\s*.+/)) {
        issues.push('Champ name manquant');
      }

      if (!frontmatter.match(/description:\s*.+/)) {
        issues.push('Champ description manquant');
      }
    }
  }

  // Vérifier la taille minimale
  if (content.length < 500) {
    issues.push(`Contenu trop court (${content.length} caractères)`);
  }

  // Vérifier les fichiers vides
  if (content.trim().length === 0) {
    issues.push('Fichier vide');
  }

  // Vérifications spécifiques pour les orchestrateurs
  if (agent === 'orchestrator') {
    if (!content.match(/routage|routing|agent/i)) {
      issues.push('Orchestrateur sans section routage');
    }
  }

  // Vérifications spécifiques pour les agents normaux
  if (agent !== 'orchestrator') {
    if (!content.match(/## Mission|## Livrables/i)) {
      issues.push('Section Mission ou Livrables manquante');
    }
  }

  return { issues };
}

// Valider tous les agents
Object.entries(EXPECTED_STRUCTURE).forEach(([domain, agents]) => {
  console.log(`📁 ${domain}/`);

  agents.forEach(agent => {
    const result = validateAgent(domain, agent);

    if (result.error) {
      console.log(`  ❌ ${agent}.md: ${result.error}`);
      errors++;
    } else if (result.issues.length > 0) {
      console.log(`  ⚠️ ${agent}.md:`);
      result.issues.forEach(issue => {
        console.log(`     - ${issue}`);
        if (issue.includes('manquant') || issue.includes('vide')) {
          errors++;
        } else {
          warnings++;
        }
      });
    } else {
      console.log(`  ✅ ${agent}.md`);
    }
  });

  console.log('');
});

// Vérifications spécifiques par domaine
console.log('=== Vérifications Spécifiques ===\n');

// strategy/pyramide.md doit mentionner la pyramide
const pyramidePath = path.join(AGENTS_DIR, 'strategy', 'pyramide.md');
if (fs.existsSync(pyramidePath)) {
  const content = fs.readFileSync(pyramidePath, 'utf-8');
  if (content.match(/70.*20.*10|pyramide|unit.*integration.*e2e/i)) {
    console.log('✅ pyramide.md contient la structure pyramide');
  } else {
    console.log('⚠️ pyramide.md ne mentionne pas les ratios');
    warnings++;
  }
}

// strategy/tdd-bdd.md doit mentionner TDD/BDD
const tddPath = path.join(AGENTS_DIR, 'strategy', 'tdd-bdd.md');
if (fs.existsSync(tddPath)) {
  const content = fs.readFileSync(tddPath, 'utf-8');
  if (content.match(/TDD|BDD|red.*green|given.*when.*then/i)) {
    console.log('✅ tdd-bdd.md contient les méthodologies');
  } else {
    console.log('⚠️ tdd-bdd.md ne mentionne pas TDD/BDD');
    warnings++;
  }
}

// security/owasp.md doit mentionner OWASP
const owaspPath = path.join(AGENTS_DIR, 'security', 'owasp.md');
if (fs.existsSync(owaspPath)) {
  const content = fs.readFileSync(owaspPath, 'utf-8');
  if (content.match(/OWASP|XSS|SQL.*injection|CSRF/i)) {
    console.log('✅ owasp.md contient les vulnérabilités OWASP');
  } else {
    console.log('⚠️ owasp.md ne mentionne pas OWASP');
    warnings++;
  }
}

// accessibility/wcag.md doit mentionner WCAG
const wcagPath = path.join(AGENTS_DIR, 'accessibility', 'wcag.md');
if (fs.existsSync(wcagPath)) {
  const content = fs.readFileSync(wcagPath, 'utf-8');
  if (content.match(/WCAG|niveau.*A|level.*A|perceivable|operable/i)) {
    console.log('✅ wcag.md contient les standards WCAG');
  } else {
    console.log('⚠️ wcag.md ne mentionne pas WCAG');
    warnings++;
  }
}

// Résumé
console.log('\n=== Résumé ===');
console.log(`Erreurs: ${errors}`);
console.log(`Avertissements: ${warnings}`);

if (errors > 0) {
  console.log('\n❌ ÉCHEC: Contenu invalide');
  process.exit(1);
}

if (warnings > 0) {
  console.log('\n⚠️ SUCCÈS avec avertissements');
} else {
  console.log('\n✅ SUCCÈS: Contenu valide');
}

process.exit(0);
