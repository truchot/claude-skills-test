/**
 * Configuration for direction-marketing skill tests
 * @module tests/config
 */

const path = require('path');

const SKILL_ROOT = path.join(__dirname, '..');

const DOMAINS = [
  'strategie',
  'positionnement',
  'acquisition',
  'mesure',
  'orchestration'
];

const EXPECTED_AGENTS_PER_DOMAIN = {
  'strategie': [
    'orchestrator',
    'audit-marche',
    'market-analysis',
    'competitor-analysis',
    'swot-marketing',
    'objectifs-marketing',
    'roadmap-marketing',
    'budget-strategy'
  ],
  'positionnement': [
    'orchestrator',
    'discovery',
    'persona-builder',
    'brand-positioning',
    'value-proposition',
    'differentiation'
  ],
  'acquisition': [
    'orchestrator',
    'channel-strategy',
    'funnel-design',
    'budget-allocation',
    'growth-strategy'
  ],
  'mesure': [
    'orchestrator',
    'kpis-definition',
    'objectives-okr',
    'attribution-model',
    'roi-framework'
  ],
  'orchestration': [
    'orchestrator',
    'brief-marketing',
    'delegation-marketing',
    'validation-strategy'
  ]
};

const TOTAL_EXPECTED_AGENTS = 28;

const ROUTING_KEYWORDS = [
  'stratégie marketing',
  'positionnement',
  'persona',
  'acquisition',
  'KPIs marketing',
  'ROI',
  'funnel',
  'growth'
];

// Triptyque validation configuration
const TRIPTYQUE = {
  files: {
    problemDefinition: '.project/strategy/problem-definition.md',
    offerDefinition: '.project/strategy/offer-definition.md',
    persona: '.project/marketing/persona.md',
  },
  contentValidation: {
    problemDefinition: [
      '## Le Problème en Une Phrase',
      '## Qui est Impacté',
      '## Quantification',
      '## Causes Racines',
    ],
    offerDefinition: [
      '## Offre Principale',
      '## Bénéfices Clés',
      '## Pricing',
      '## Différenciation',
    ],
    persona: [
      '## Identité',
      '## Profil Psychographique',
      '## Comportement Digital',
      '## Parcours d\'Achat',
    ],
  },
  workflow: {
    order: ['discovery', 'persona-builder', 'brand-positioning'],
    maxIterations: 3,
    escalationThresholdDays: 5,
  },
};

module.exports = {
  SKILL_ROOT,
  DOMAINS,
  EXPECTED_AGENTS_PER_DOMAIN,
  TOTAL_EXPECTED_AGENTS,
  ROUTING_KEYWORDS,
  TRIPTYQUE
};
