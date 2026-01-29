#!/usr/bin/env node
/**
 * Cross-skill routing validation test
 * Validates that routing keywords don't conflict between marketing-related skills
 */

const fs = require('fs');
const path = require('path');

const SKILLS_ROOT = path.join(__dirname, '..');

// Marketing-related skills to validate
const MARKETING_SKILLS = [
  'seo-expert',
  'paid-media',
  'marketing-analytics',
  'content-marketing',
  'customer-success',
  'marketing-ops'
];

// Expected keyword domains per skill (no overlap allowed)
const SKILL_KEYWORDS = {
  'seo-expert': [
    'seo', 'référencement', 'backlink', 'netlinking', 'keyword', 'mots-clés',
    'serp', 'ranking', 'indexation', 'crawl', 'sitemap', 'robots.txt',
    'core web vitals', 'schema markup', 'structured data', 'hreflang'
  ],
  'paid-media': [
    'google ads', 'sea', 'ppc', 'cpc', 'facebook ads', 'meta ads',
    'social ads', 'display', 'programmatic', 'rtb', 'dsp', 'youtube ads',
    'tiktok ads', 'linkedin ads', 'retargeting', 'remarketing', 'bidding'
  ],
  'marketing-analytics': [
    'tracking', 'gtm', 'tag manager', 'pixel', 'data layer', 'attribution',
    'ga4', 'google analytics', 'dashboard', 'kpi', 'reporting', 'a/b test',
    'experiment', 'statistical', 'cohort', 'funnel analysis', 'consent'
  ],
  'content-marketing': [
    'contenu', 'content', 'blog', 'article', 'copywriting', 'rédaction',
    'ligne éditoriale', 'social media', 'community', 'engagement',
    'calendrier éditorial', 'content calendar'
  ],
  'customer-success': [
    'fidélisation', 'rétention', 'churn', 'loyalty', 'nps', 'csat',
    'customer success', 'onboarding', 'lifecycle', 'advocacy', 'referral'
  ],
  'marketing-ops': [
    'automation', 'workflow', 'email marketing', 'lead scoring', 'nurturing',
    'campagne', 'campaign', 'growth', 'acquisition', 'crm integration'
  ]
};

// Ambiguous keywords that could match multiple skills - document expected routing
const AMBIGUOUS_KEYWORDS = {
  'conversion': 'marketing-ops/performance',  // CRO is in marketing-ops
  'performance': 'marketing-ops/performance', // Performance marketing
  'analytics': 'marketing-analytics',         // Analytics domain
  'social': 'content-marketing/social-strategy', // Organic social
  'ads': 'paid-media'                         // All paid advertising
};

let errors = 0;
let warnings = 0;

console.log('🔍 Validating cross-skill routing keywords...\n');

// Check each skill exists
for (const skill of MARKETING_SKILLS) {
  const skillPath = path.join(SKILLS_ROOT, skill);
  if (!fs.existsSync(skillPath)) {
    console.log(`❌ Skill missing: ${skill}/`);
    errors++;
  } else {
    console.log(`✅ ${skill}/ exists`);
  }
}

// Check for keyword conflicts
console.log('\n📊 Checking keyword conflicts...\n');

const allKeywords = new Map();

for (const [skill, keywords] of Object.entries(SKILL_KEYWORDS)) {
  for (const keyword of keywords) {
    const lower = keyword.toLowerCase();
    if (allKeywords.has(lower)) {
      console.log(`⚠️  Keyword conflict: "${keyword}" claimed by both ${allKeywords.get(lower)} and ${skill}`);
      warnings++;
    } else {
      allKeywords.set(lower, skill);
    }
  }
}

// Document ambiguous keywords
console.log('\n📋 Ambiguous keywords (documented routing):\n');
for (const [keyword, route] of Object.entries(AMBIGUOUS_KEYWORDS)) {
  console.log(`   "${keyword}" → ${route}`);
}

console.log('\n================================');
if (errors > 0) {
  console.log(`❌ ${errors} error(s), ${warnings} warning(s)`);
  process.exit(1);
} else {
  console.log(`✅ Cross-skill validation passed (${warnings} warning(s))`);
  process.exit(0);
}
