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
    'competitor-analysis',
    'swot-marketing',
    'roadmap-marketing',
    'budget-strategy'
  ],
  'positionnement': [
    'orchestrator',
    'brand-positioning',
    'persona-builder',
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

const TOTAL_EXPECTED_AGENTS = 25;

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

module.exports = {
  SKILL_ROOT,
  DOMAINS,
  EXPECTED_AGENTS_PER_DOMAIN,
  TOTAL_EXPECTED_AGENTS,
  ROUTING_KEYWORDS
};
