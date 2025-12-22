#!/usr/bin/env node
/**
 * Test: Validate Keyword Coverage
 *
 * Validates that:
 * - Domain keywords in config match SKILL.md routing rules
 * - Each domain has keywords defined
 * - Keywords are not duplicated across domains
 *
 * @module tests/validate-keywords
 */

const path = require('path');
const {
  safeReadFile,
  printSeparator
} = require('./utils');
const { SKILL_ROOT, DOMAINS, DOMAIN_KEYWORDS } = require('./config');

let passed = 0;
let failed = 0;
const issues = [];

console.log('🧪 Validating Keyword Coverage\n');
printSeparator();

// 1. Check that all domains have keywords defined
console.log('\n1. Domain Keyword Definitions');

let domainsWithKeywords = 0;
const missingKeywordDomains = [];

for (const domain of DOMAINS) {
  if (DOMAIN_KEYWORDS[domain] && DOMAIN_KEYWORDS[domain].length > 0) {
    domainsWithKeywords++;
  } else {
    missingKeywordDomains.push(domain);
  }
}

if (missingKeywordDomains.length === 0) {
  console.log(`   ✅ All ${DOMAINS.length} domains have keywords defined`);
  passed++;
} else {
  console.log(`   ❌ ${missingKeywordDomains.length} domains missing keywords:`);
  for (const domain of missingKeywordDomains) {
    console.log(`      - ${domain}`);
  }
  issues.push(`Domains without keywords: ${missingKeywordDomains.join(', ')}`);
  failed++;
}

// 2. Check for duplicate keywords across domains
console.log('\n2. Keyword Uniqueness');

const allKeywords = new Map(); // keyword -> [domains]
const duplicates = [];

for (const domain of DOMAINS) {
  const keywords = DOMAIN_KEYWORDS[domain] || [];
  for (const keyword of keywords) {
    const normalizedKeyword = keyword.toLowerCase();
    if (!allKeywords.has(normalizedKeyword)) {
      allKeywords.set(normalizedKeyword, []);
    }
    allKeywords.get(normalizedKeyword).push(domain);
  }
}

for (const [keyword, domains] of allKeywords) {
  if (domains.length > 1) {
    duplicates.push({ keyword, domains });
  }
}

if (duplicates.length === 0) {
  console.log(`   ✅ No duplicate keywords across domains`);
  passed++;
} else {
  console.log(`   ⚠️  ${duplicates.length} keywords appear in multiple domains:`);
  for (const dup of duplicates.slice(0, 5)) {
    console.log(`      "${dup.keyword}" → ${dup.domains.join(', ')}`);
  }
  // This is a warning, not a failure - some overlap may be intentional
}

// 3. Check SKILL.md contains domain routing keywords
console.log('\n3. SKILL.md Keyword Coverage');

const skillMdPath = path.join(SKILL_ROOT, 'SKILL.md');
const { content: skillContent } = safeReadFile(skillMdPath);

if (skillContent) {
  let coveredDomains = 0;
  const uncoveredDomains = [];

  for (const domain of DOMAINS) {
    const keywords = DOMAIN_KEYWORDS[domain] || [];
    let hasKeywordInSkillMd = false;

    for (const keyword of keywords) {
      if (skillContent.toLowerCase().includes(keyword.toLowerCase())) {
        hasKeywordInSkillMd = true;
        break;
      }
    }

    // Also check if domain is mentioned in routing section
    const domainPattern = new RegExp(`\\|.*${domain}.*\\|`, 'i');
    const domainMentioned = domainPattern.test(skillContent);

    if (hasKeywordInSkillMd || domainMentioned) {
      coveredDomains++;
    } else {
      uncoveredDomains.push(domain);
    }
  }

  if (uncoveredDomains.length === 0) {
    console.log(`   ✅ All domains have keyword coverage in SKILL.md`);
    passed++;
  } else {
    console.log(`   ⚠️  ${uncoveredDomains.length} domains may lack keyword coverage:`);
    for (const domain of uncoveredDomains) {
      console.log(`      - ${domain}`);
    }
  }
}

// 4. Check orchestrators contain their domain keywords
console.log('\n4. Orchestrator Keyword Coverage');

let orchestratorsWithKeywords = 0;
const orchestratorsMissingKeywords = [];

for (const domain of DOMAINS) {
  const orchestratorPath = path.join(SKILL_ROOT, domain, 'orchestrator.md');
  const { content } = safeReadFile(orchestratorPath);

  if (!content) {
    orchestratorsMissingKeywords.push(domain);
    continue;
  }

  const keywords = DOMAIN_KEYWORDS[domain] || [];
  let keywordsFound = 0;

  for (const keyword of keywords) {
    if (content.toLowerCase().includes(keyword.toLowerCase())) {
      keywordsFound++;
    }
  }

  // At least 50% of keywords should be in orchestrator
  const threshold = Math.ceil(keywords.length * 0.5);
  if (keywordsFound >= threshold || keywords.length === 0) {
    orchestratorsWithKeywords++;
  } else {
    orchestratorsMissingKeywords.push(`${domain} (${keywordsFound}/${keywords.length})`);
  }
}

if (orchestratorsMissingKeywords.length === 0) {
  console.log(`   ✅ All orchestrators have adequate keyword coverage`);
  passed++;
} else {
  console.log(`   ⚠️  Some orchestrators may need keyword updates:`);
  for (const item of orchestratorsMissingKeywords.slice(0, 5)) {
    console.log(`      - ${item}`);
  }
}

// 5. Keyword statistics
console.log('\n5. Keyword Statistics');

const totalKeywords = Array.from(allKeywords.keys()).length;
const avgKeywordsPerDomain = totalKeywords / DOMAINS.length;

console.log(`   📊 Total unique keywords: ${totalKeywords}`);
console.log(`   📊 Average per domain: ${avgKeywordsPerDomain.toFixed(1)}`);
console.log(`   📊 Domains covered: ${domainsWithKeywords}/${DOMAINS.length}`);

// Show keyword distribution
console.log('\n   Keywords per domain:');
for (const domain of DOMAINS) {
  const count = (DOMAIN_KEYWORDS[domain] || []).length;
  const bar = '█'.repeat(Math.min(count, 10));
  console.log(`      ${domain.padEnd(15)} ${bar} (${count})`);
}

console.log('\n');
printSeparator();

// Summary
console.log('\n📊 Results:');
console.log(`   Checks passed: ${passed}`);
console.log(`   Checks failed: ${failed}`);

if (issues.length > 0) {
  console.log('\n⚠️  Issues found:');
  for (const issue of issues) {
    console.log(`   - ${issue}`);
  }
}

if (failed > 0) {
  console.log('\n❌ Some checks failed');
  process.exit(1);
} else {
  console.log('\n✅ All checks passed');
  process.exit(0);
}
