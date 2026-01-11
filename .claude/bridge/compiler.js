#!/usr/bin/env node

/**
 * Bridge Compiler - Compile .web-agency/ to .claude/ format
 *
 * Usage:
 *   node compiler.js                    # Compile all skills
 *   node compiler.js --skill=react-expert  # Compile specific skill
 *   node compiler.js --watch            # Watch mode
 *   node compiler.js --dry-run          # Validate without writing
 */

const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

// Configuration
const CONFIG_PATH = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));

// Paths
const WEB_AGENCY_ROOT = path.resolve(__dirname, config.source.root);
const CLAUDE_ROOT = path.resolve(__dirname, config.output.root);

/**
 * Load YAML file and parse it
 */
function loadYaml(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return yaml.parse(content);
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Convert skill.yaml to SKILL.md format
 */
function compileSkill(skillData) {
  const frontmatter = [
    '---',
    `name: ${skillData.name}`,
    `description: ${skillData.description}`,
    `version: ${skillData.version || '1.0.0'}`,
    `status: ${skillData.status || 'active'}`,
    '---'
  ].join('\n');

  const sections = [];

  // Title
  sections.push(`# ${skillData.name}`);
  sections.push('');
  sections.push(skillData.description);
  sections.push('');

  // Philosophy
  if (skillData.philosophy) {
    sections.push('## Philosophie');
    sections.push('');
    if (skillData.philosophy.role) {
      sections.push(skillData.philosophy.role);
      sections.push('');
    }
    if (skillData.philosophy.does && skillData.philosophy.does.length > 0) {
      sections.push('### Ce que fait ce skill');
      sections.push('');
      skillData.philosophy.does.forEach(item => {
        sections.push(`- ${item}`);
      });
      sections.push('');
    }
    if (skillData.philosophy.doesNot && skillData.philosophy.doesNot.length > 0) {
      sections.push('### Tu NE fais PAS');
      sections.push('');
      skillData.philosophy.doesNot.forEach(item => {
        sections.push(`- ${item}`);
      });
      sections.push('');
    }
  }

  // Architecture / Domains
  if (skillData.domains && skillData.domains.length > 0) {
    sections.push('## Architecture');
    sections.push('');
    sections.push('| Domaine | Agents |');
    sections.push('|---------|--------|');
    skillData.domains.forEach(domain => {
      const agents = Array.isArray(domain.agents) ? domain.agents.join(', ') : domain.agents;
      sections.push(`| ${domain.name} | ${agents} |`);
    });
    sections.push('');
  }

  // Routing
  if (skillData.routing) {
    sections.push('## Regles de Routage');
    sections.push('');
    if (skillData.routing.keywords && skillData.routing.keywords.length > 0) {
      sections.push('### Mots-cles');
      sections.push('');
      sections.push(skillData.routing.keywords.map(k => `\`${k}\``).join(', '));
      sections.push('');
    }
    if (skillData.routing.rules && skillData.routing.rules.length > 0) {
      sections.push('### Regles');
      sections.push('');
      skillData.routing.rules.forEach(rule => {
        sections.push(`IF ${rule.if}`);
        sections.push(`   -> ${rule.then}`);
        sections.push('');
      });
    }
  }

  // Composition
  if (skillData.composition) {
    sections.push('## Composition');
    sections.push('');
    if (skillData.composition.parent) {
      sections.push(`- **Parent**: ${skillData.composition.parent}`);
    }
    if (skillData.composition.peers && skillData.composition.peers.length > 0) {
      sections.push(`- **Peers**: ${skillData.composition.peers.join(', ')}`);
    }
    if (skillData.composition.delegates && skillData.composition.delegates.length > 0) {
      sections.push(`- **Delegue a**: ${skillData.composition.delegates.join(', ')}`);
    }
    sections.push('');
  }

  // Escalation
  if (skillData.escalation && skillData.escalation.length > 0) {
    sections.push('## Escalade');
    sections.push('');
    skillData.escalation.forEach(esc => {
      sections.push(`- **${esc.target}**: ${esc.condition}`);
      if (esc.reason) {
        sections.push(`  - Raison: ${esc.reason}`);
      }
    });
    sections.push('');
  }

  return frontmatter + '\n\n' + sections.join('\n');
}

/**
 * Convert agent.yaml to agent.md format
 */
function compileAgent(agentData) {
  const frontmatter = [
    '---',
    `name: ${agentData.name}`,
    `description: ${agentData.description}`,
  ];

  if (agentData.workflows && agentData.workflows.length > 0) {
    frontmatter.push('workflows:');
    agentData.workflows.forEach(wf => {
      frontmatter.push(`  - id: ${wf.id}`);
      if (wf.template) frontmatter.push(`    template: ${wf.template}`);
      if (wf.phase) frontmatter.push(`    phase: ${wf.phase}`);
      if (wf.name) frontmatter.push(`    name: ${wf.name}`);
      if (wf.duration) frontmatter.push(`    duration: ${wf.duration}`);
    });
  }

  frontmatter.push('---');

  const sections = [];

  // Title
  const title = agentData.name.split('-').map(w =>
    w.charAt(0).toUpperCase() + w.slice(1)
  ).join(' ');
  sections.push(`# ${title}`);
  sections.push('');

  // Role
  if (agentData.role) {
    sections.push('## Role');
    sections.push('');
    sections.push(agentData.role);
    sections.push('');
  }

  // Responsibilities - Does
  if (agentData.responsibilities) {
    if (agentData.responsibilities.does && agentData.responsibilities.does.length > 0) {
      sections.push('## Responsabilites');
      sections.push('');
      agentData.responsibilities.does.forEach(item => {
        sections.push(`- ${item}`);
      });
      sections.push('');
    }

    // Does Not
    if (agentData.responsibilities.doesNot && agentData.responsibilities.doesNot.length > 0) {
      sections.push('## Tu NE fais PAS');
      sections.push('');
      agentData.responsibilities.doesNot.forEach(item => {
        sections.push(`- ${item}`);
      });
      sections.push('');
    }
  }

  // Content
  if (agentData.content) {
    // Instructions
    if (agentData.content.instructions && agentData.content.instructions.length > 0) {
      sections.push('## Instructions');
      sections.push('');
      agentData.content.instructions.forEach(item => {
        sections.push(`- ${item}`);
      });
      sections.push('');
    }

    // Examples
    if (agentData.content.examples && agentData.content.examples.length > 0) {
      sections.push('## Exemples');
      sections.push('');
      agentData.content.examples.forEach(ex => {
        if (ex.title) {
          sections.push(`### ${ex.title}`);
          sections.push('');
        }
        if (ex.code) {
          sections.push('```javascript');
          sections.push(ex.code.trim());
          sections.push('```');
          sections.push('');
        }
        if (ex.input) {
          sections.push(`**Input**: ${ex.input}`);
        }
        if (ex.output) {
          sections.push(`**Output**: ${ex.output}`);
        }
        sections.push('');
      });
    }

    // Best Practices
    if (agentData.content.bestPractices && agentData.content.bestPractices.length > 0) {
      sections.push('## Best Practices');
      sections.push('');
      sections.push('| Pratique | Au lieu de | Raison |');
      sections.push('|----------|------------|--------|');
      agentData.content.bestPractices.forEach(bp => {
        sections.push(`| ${bp.practice} | ${bp.instead || '-'} | ${bp.reason || '-'} |`);
      });
      sections.push('');
    }

    // References
    if (agentData.content.references && agentData.content.references.length > 0) {
      sections.push('## References');
      sections.push('');
      agentData.content.references.forEach(ref => {
        sections.push(`- [${ref.title}](${ref.url})`);
      });
      sections.push('');
    }
  }

  // Deliverables
  if (agentData.deliverables && agentData.deliverables.length > 0) {
    sections.push('## Livrables');
    sections.push('');
    sections.push('| Livrable | Format | Description |');
    sections.push('|----------|--------|-------------|');
    agentData.deliverables.forEach(d => {
      sections.push(`| ${d.name} | ${d.format || '-'} | ${d.description || '-'} |`);
    });
    sections.push('');
  }

  // Escalation
  if (agentData.escalation && agentData.escalation.length > 0) {
    sections.push('## Escalade');
    sections.push('');
    agentData.escalation.forEach(esc => {
      sections.push(`- **${esc.target}**: ${esc.condition}`);
    });
    sections.push('');
  }

  // Routing (for orchestrators)
  if (agentData.routing) {
    if (agentData.routing.agents && agentData.routing.agents.length > 0) {
      sections.push('## Agents Disponibles');
      sections.push('');
      sections.push('| Agent | Fichier | Specialite |');
      sections.push('|-------|---------|------------|');
      agentData.routing.agents.forEach(a => {
        sections.push(`| ${a.name} | ${a.file} | ${a.specialty || '-'} |`);
      });
      sections.push('');
    }

    if (agentData.routing.rules && agentData.routing.rules.length > 0) {
      sections.push('## Regles de Routage');
      sections.push('');
      agentData.routing.rules.forEach(rule => {
        sections.push(`IF question contient [${rule.keywords.join(', ')}]`);
        sections.push(`   -> ${rule.then}`);
        sections.push('');
      });
    }
  }

  return frontmatter.join('\n') + '\n\n' + sections.join('\n');
}

/**
 * Compile all skills from .web-agency/ to .claude/
 */
async function compileAll(options = {}) {
  const { dryRun = false, skill: targetSkill = null } = options;

  console.log('🔄 Starting compilation...');
  console.log(`   Source: ${WEB_AGENCY_ROOT}`);
  console.log(`   Output: ${CLAUDE_ROOT}`);
  console.log(`   Mode: ${dryRun ? 'Dry run' : 'Write'}`);
  console.log('');

  // Load skills index
  const indexPath = path.join(WEB_AGENCY_ROOT, 'skills', 'index.json');
  if (!fs.existsSync(indexPath)) {
    console.log('⚠️  Skills index not found. Scanning directories...');
    // Fallback: scan directories
  }

  const skillsDir = path.join(WEB_AGENCY_ROOT, 'skills');
  const skills = [];

  // Scan for skill directories
  if (fs.existsSync(skillsDir)) {
    const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const skillYamlPath = path.join(skillsDir, entry.name, 'skill.yaml');
        if (fs.existsSync(skillYamlPath)) {
          skills.push(entry.name);
        }
      }
    }
  }

  if (skills.length === 0) {
    console.log('ℹ️  No skills found in .web-agency/skills/');
    console.log('   Create skill.yaml files to compile.');
    return;
  }

  console.log(`📦 Found ${skills.length} skill(s):`);
  skills.forEach(s => console.log(`   - ${s}`));
  console.log('');

  // Compile each skill
  for (const skillName of skills) {
    if (targetSkill && skillName !== targetSkill) {
      continue;
    }

    console.log(`📝 Compiling: ${skillName}`);

    const skillYamlPath = path.join(skillsDir, skillName, 'skill.yaml');
    const skillData = loadYaml(skillYamlPath);

    if (!skillData) {
      console.log(`   ❌ Failed to load skill.yaml`);
      continue;
    }

    // Compile skill
    const skillMd = compileSkill(skillData);
    const outputSkillDir = path.join(CLAUDE_ROOT, 'skills', skillName);
    const outputSkillPath = path.join(outputSkillDir, 'SKILL.md');

    if (!dryRun) {
      fs.mkdirSync(outputSkillDir, { recursive: true });
      fs.writeFileSync(outputSkillPath, skillMd);
      console.log(`   ✅ Generated: ${outputSkillPath}`);
    } else {
      console.log(`   📋 Would generate: ${outputSkillPath}`);
    }

    // Compile agents
    const agentsDir = path.join(skillsDir, skillName, 'agents');
    if (fs.existsSync(agentsDir)) {
      const domains = fs.readdirSync(agentsDir, { withFileTypes: true });

      for (const domain of domains) {
        if (domain.isDirectory()) {
          const domainPath = path.join(agentsDir, domain.name);
          const agentFiles = fs.readdirSync(domainPath).filter(f => f.endsWith('.yaml'));

          for (const agentFile of agentFiles) {
            const agentYamlPath = path.join(domainPath, agentFile);
            const agentData = loadYaml(agentYamlPath);

            if (!agentData) {
              console.log(`   ❌ Failed to load ${agentFile}`);
              continue;
            }

            const agentMd = compileAgent(agentData);
            const outputAgentDir = path.join(outputSkillDir, 'agents', domain.name);
            const outputAgentPath = path.join(outputAgentDir, agentFile.replace('.yaml', '.md'));

            if (!dryRun) {
              fs.mkdirSync(outputAgentDir, { recursive: true });
              fs.writeFileSync(outputAgentPath, agentMd);
            }
          }

          console.log(`   ✅ Domain ${domain.name}: ${agentFiles.length} agent(s)`);
        }
      }
    }
  }

  console.log('');
  console.log('✨ Compilation complete!');
}

// CLI
const args = process.argv.slice(2);
const options = {
  dryRun: args.includes('--dry-run'),
  watch: args.includes('--watch'),
  skill: args.find(a => a.startsWith('--skill='))?.split('=')[1]
};

if (options.watch) {
  console.log('👀 Watch mode not yet implemented');
  // TODO: Implement file watching
} else {
  compileAll(options);
}

module.exports = { compileSkill, compileAgent, compileAll };
