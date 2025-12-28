/**
 * Validation de la structure du skill testing-process
 * Vérifie SKILL.md, orchestrator.md et la structure des dossiers
 */

const fs = require('fs');
const path = require('path');

const SKILL_ROOT = path.join(__dirname, '..');

console.log('=== Validation de la Structure testing-process ===\n');

let errors = 0;

// 1. Vérifier SKILL.md
console.log('📄 Vérification SKILL.md...');
const skillPath = path.join(SKILL_ROOT, 'SKILL.md');

if (!fs.existsSync(skillPath)) {
  console.log('  ❌ SKILL.md non trouvé');
  errors++;
} else {
  const content = fs.readFileSync(skillPath, 'utf-8');

  if (!content.startsWith('---\n')) {
    console.log('  ❌ Frontmatter manquant');
    errors++;
  } else {
    console.log('  ✅ Frontmatter présent');
  }

  if (!content.match(/name:\s*testing-process/)) {
    console.log('  ❌ Nom incorrect');
    errors++;
  } else {
    console.log('  ✅ Nom correct');
  }

  if (!content.match(/version:\s*\d+\.\d+\.\d+/)) {
    console.log('  ❌ Version manquante ou invalide');
    errors++;
  } else {
    const version = content.match(/version:\s*(\d+\.\d+\.\d+)/)[1];
    console.log(`  ✅ Version: ${version}`);
  }
}

// 2. Vérifier orchestrator.md
console.log('\n📄 Vérification orchestrator.md...');
const orchestratorPath = path.join(SKILL_ROOT, 'orchestrator.md');

if (!fs.existsSync(orchestratorPath)) {
  console.log('  ❌ orchestrator.md non trouvé');
  errors++;
} else {
  const content = fs.readFileSync(orchestratorPath, 'utf-8');

  if (!content.startsWith('---\n')) {
    console.log('  ❌ Frontmatter manquant');
    errors++;
  } else {
    console.log('  ✅ Frontmatter présent');
  }

  if (!content.match(/routage|routing/i)) {
    console.log('  ⚠️ Section routage non détectée');
  } else {
    console.log('  ✅ Section routage présente');
  }
}

// 3. Vérifier la structure des dossiers
console.log('\n📁 Vérification structure agents/...');
const agentsDir = path.join(SKILL_ROOT, 'agents');
const expectedDomains = ['strategy', 'types', 'quality', 'performance', 'security', 'accessibility'];

if (!fs.existsSync(agentsDir)) {
  console.log('  ❌ Dossier agents/ non trouvé');
  errors++;
} else {
  expectedDomains.forEach(domain => {
    const domainPath = path.join(agentsDir, domain);
    if (fs.existsSync(domainPath) && fs.statSync(domainPath).isDirectory()) {
      const files = fs.readdirSync(domainPath).filter(f => f.endsWith('.md'));
      console.log(`  ✅ ${domain}/ (${files.length} agents)`);
    } else {
      console.log(`  ❌ ${domain}/ non trouvé`);
      errors++;
    }
  });
}

// 4. Vérifier qu'il n'y a pas de dossiers inattendus
console.log('\n🔍 Vérification dossiers inattendus...');
if (fs.existsSync(agentsDir)) {
  const actualDomains = fs.readdirSync(agentsDir).filter(f =>
    fs.statSync(path.join(agentsDir, f)).isDirectory()
  );

  const unexpected = actualDomains.filter(d => !expectedDomains.includes(d));
  if (unexpected.length > 0) {
    console.log(`  ⚠️ Dossiers inattendus: ${unexpected.join(', ')}`);
  } else {
    console.log('  ✅ Aucun dossier inattendu');
  }
}

// Résumé
console.log('\n=== Résumé ===');
console.log(`Erreurs: ${errors}`);

if (errors > 0) {
  console.log('\n❌ ÉCHEC: Structure invalide');
  process.exit(1);
}

console.log('\n✅ SUCCÈS: Structure valide');
process.exit(0);
