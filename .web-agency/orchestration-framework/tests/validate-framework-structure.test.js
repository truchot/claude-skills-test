/**
 * Framework Structure Validation Tests
 * Validates v4.2.0 migration: web-agency and task-orchestrator moved to orchestration-framework
 */

const fs = require('fs');
const path = require('path');
const { WEB_AGENCY_ROOT, FRAMEWORK_ROOT, SKILLS_ROOT } = require('./config');

console.log('\n🏗️  Validating Framework Structure (v4.2.0 Migration)\n');
console.log('==================================================\n');

let passed = 0;
let failed = 0;

function test(description, condition) {
  if (condition) {
    console.log(`✅ ${description}`);
    passed++;
  } else {
    console.log(`❌ ${description}`);
    failed++;
  }
}

// Old paths that should NOT exist
const oldPaths = [
  { path: path.join(SKILLS_ROOT, 'web-agency'), name: 'skills/web-agency' },
  { path: path.join(SKILLS_ROOT, 'task-orchestrator'), name: 'skills/task-orchestrator' },
  { path: path.join(SKILLS_ROOT, 'examples'), name: 'skills/examples' },
  { path: path.join(SKILLS_ROOT, 'scripts'), name: 'skills/scripts' }
];

// New paths that SHOULD exist
const newPaths = [
  { path: FRAMEWORK_ROOT, name: 'orchestration-framework' },
  { path: path.join(FRAMEWORK_ROOT, 'task-orchestrator'), name: 'orchestration-framework/task-orchestrator' },
  { path: path.join(FRAMEWORK_ROOT, 'orchestration'), name: 'orchestration-framework/orchestration' },
  { path: path.join(FRAMEWORK_ROOT, 'workflows'), name: 'orchestration-framework/workflows' },
  { path: path.join(WEB_AGENCY_ROOT, 'examples'), name: '.web-agency/examples' },
  { path: path.join(WEB_AGENCY_ROOT, 'scripts'), name: '.web-agency/scripts' }
];

console.log('📂 Verifying old paths are removed:\n');
oldPaths.forEach(({ path: p, name }) => {
  test(`Old path "${name}" should NOT exist`, !fs.existsSync(p));
});

console.log('\n📂 Verifying new paths exist:\n');
newPaths.forEach(({ path: p, name }) => {
  test(`New path "${name}" should exist`, fs.existsSync(p));
});

// Verify task-orchestrator has its agents
console.log('\n📂 Verifying task-orchestrator structure:\n');
const taskOrchestratorAgents = path.join(FRAMEWORK_ROOT, 'task-orchestrator', 'agents');
test('task-orchestrator/agents directory exists', fs.existsSync(taskOrchestratorAgents));

if (fs.existsSync(taskOrchestratorAgents)) {
  const domains = fs.readdirSync(taskOrchestratorAgents);
  test(`task-orchestrator has ${domains.length} agent domains`, domains.length === 4);
}

console.log('\n==================================================\n');
console.log(`📊 Results: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  console.log('❌ Framework structure validation FAILED');
  console.log('   Run migration or check paths manually.\n');
  process.exit(1);
} else {
  console.log('✅ Framework structure is correct for v4.2.0\n');
}
