/**
 * Validation des agents testing-process
 * Vérifie que tous les agents attendus existent
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

const EXPECTED_AGENT_COUNT = Object.values(EXPECTED_STRUCTURE)
  .reduce((sum, agents) => sum + agents.length, 0);

console.log('=== Validation des Agents testing-process ===\n');

let errors = 0;
let totalAgents = 0;

// Vérifier chaque domaine et agent
Object.entries(EXPECTED_STRUCTURE).forEach(([domain, agents]) => {
  console.log(`📁 ${domain}/`);

  agents.forEach(agent => {
    const agentPath = path.join(AGENTS_DIR, domain, `${agent}.md`);

    if (fs.existsSync(agentPath)) {
      const stats = fs.statSync(agentPath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`  ✅ ${agent}.md (${sizeKB} KB)`);
      totalAgents++;
    } else {
      console.log(`  ❌ ${agent}.md MANQUANT`);
      errors++;
    }
  });

  console.log('');
});

// Résumé
console.log('=== Résumé ===');
console.log(`Total agents: ${totalAgents}/${EXPECTED_AGENT_COUNT}`);
console.log(`Erreurs: ${errors}`);

if (errors > 0) {
  console.log('\n❌ ÉCHEC: Des agents sont manquants');
  process.exit(1);
}

if (totalAgents !== EXPECTED_AGENT_COUNT) {
  console.log(`\n❌ ÉCHEC: Nombre d'agents incorrect (attendu: ${EXPECTED_AGENT_COUNT})`);
  process.exit(1);
}

console.log('\n✅ SUCCÈS: Tous les agents sont présents');
process.exit(0);
