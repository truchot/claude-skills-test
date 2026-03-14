/**
 * Configuration des tests pour experience-client
 */

export const SKILL_CONFIG = {
  name: 'experience-client',
  version: '1.0.0',
  basePath: '..',

  // Domaines attendus
  domains: ['accueil', 'cadrage', 'co-creation', 'suivi', 'lancement', 'fidelisation'],

  // Agents par domaine
  expectedAgents: {
    'accueil': ['orchestrator', 'premier-contact', 'ecoute-active', 'synthese-besoin', 'qualification-rapide'],
    'cadrage': ['orchestrator', 'proposition-projet', 'traducteur-technique', 'options-budget', 'planning-client'],
    'co-creation': ['orchestrator', 'walkthrough-narratif', 'collecte-feedback', 'arbitrage-guide', 'validation-formelle'],
    'suivi': ['orchestrator', 'rapport-avancement', 'demo-intermediaire', 'alerte-proactive', 'guide-mise-en-ligne', 'checkpoint-satisfaction'],
    'lancement': ['orchestrator', 'formation-client', 'bilan-lancement', 'celebration'],
    'fidelisation': ['orchestrator', 'rapport-mensuel', 'point-trimestriel', 'bilan-partenariat', 'veille-opportunites']
  },

  // Validateurs attendus
  expectedValidators: ['zero-jargon', 'ton-et-empathie', 'completude-client', 'sla-reactivite', 'coherence-emotionnelle'],

  // Fichiers requis à la racine
  requiredRootFiles: [
    'SKILL.md',
    'orchestrator.md'
  ],

  // Total attendu
  totalAgents: 30
};
