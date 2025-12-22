#!/usr/bin/env node
/**
 * Test: Validate Markdown Quality
 *
 * Validates markdown files for:
 * - Internal link integrity (references to other agents)
 * - Code block syntax validity
 * - Heading structure
 * - Table formatting
 *
 * @module tests/validate-markdown
 */

const path = require('path');
const {
  findMarkdownFiles,
  safeReadFile,
  directoryExists,
  fileExists,
  printSeparator
} = require('./utils');
const { SKILL_ROOT, DOMAINS } = require('./config');

let passed = 0;
let failed = 0;
let warnings = 0;
const issues = [];

console.log('🧪 Validating Markdown Quality\n');
printSeparator();

/**
 * Extract internal links from markdown content
 * @param {string} content - Markdown content
 * @returns {string[]} Array of internal link targets
 */
function extractInternalLinks(content) {
  const links = [];

  // Match [text](path) links that are internal (not http/https)
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = linkPattern.exec(content)) !== null) {
    const target = match[2];
    if (!target.startsWith('http') && !target.startsWith('#') && !target.startsWith('mailto:')) {
      links.push(target);
    }
  }

  return links;
}

/**
 * Validate code blocks in content
 * @param {string} content - Markdown content
 * @returns {{ valid: number, invalid: string[] }}
 */
function validateCodeBlocks(content) {
  const valid = [];
  const invalid = [];

  // Known valid language identifiers
  const validLanguages = [
    'bash', 'sh', 'shell', 'zsh',
    'javascript', 'js', 'typescript', 'ts', 'jsx', 'tsx',
    'python', 'py',
    'json', 'yaml', 'yml', 'xml', 'html', 'css', 'scss', 'sql',
    'markdown', 'md', 'mermaid',
    'php', 'ruby', 'go', 'rust', 'java', 'kotlin', 'swift',
    'dockerfile', 'nginx', 'apache', 'terraform', 'hcl',
    'graphql', 'prisma',
    '', // Empty is valid (generic code block)
  ];

  // Match code blocks with optional language
  // Handles: ```js, ```js\n, ``` \n, ```js  \n, end of file
  const codeBlockPattern = /```(\w*)[ \t]*(?:\n|$)/g;
  let match;

  while ((match = codeBlockPattern.exec(content)) !== null) {
    const lang = match[1].toLowerCase();
    if (validLanguages.includes(lang)) {
      valid.push(lang || 'generic');
    } else {
      invalid.push(lang);
    }
  }

  // Check for unclosed code blocks
  const openBlocks = (content.match(/```/g) || []).length;
  if (openBlocks % 2 !== 0) {
    invalid.push('UNCLOSED_BLOCK');
  }

  return { valid: valid.length, invalid };
}

/**
 * Validate heading structure
 * @param {string} content - Markdown content
 * @returns {{ valid: boolean, issues: string[] }}
 */
function validateHeadings(content) {
  const issues = [];

  // Check for H1 heading
  if (!content.match(/^#\s+.+$/m)) {
    issues.push('Missing H1 heading');
  }

  // Check for multiple H1 headings
  const h1Count = (content.match(/^#\s+.+$/gm) || []).length;
  if (h1Count > 1) {
    issues.push(`Multiple H1 headings (${h1Count})`);
  }

  // Check heading hierarchy (no skipping levels)
  const headings = content.match(/^#{1,6}\s+.+$/gm) || [];
  let prevLevel = 0;

  for (const heading of headings) {
    const level = heading.match(/^(#+)/)[1].length;
    if (prevLevel > 0 && level > prevLevel + 1) {
      issues.push(`Heading level skip: H${prevLevel} → H${level}`);
      break; // Only report first skip
    }
    prevLevel = level;
  }

  return { valid: issues.length === 0, issues };
}

/**
 * Validate table formatting
 * @param {string} content - Markdown content
 * @returns {{ count: number, malformed: number }}
 */
function validateTables(content) {
  let count = 0;
  let malformed = 0;

  // Split by lines and look for table patterns
  const lines = content.split('\n');
  let inTable = false;
  let tableColumns = 0;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (!inTable) {
        inTable = true;
        count++;
        tableColumns = (trimmed.match(/\|/g) || []).length - 1;
      } else {
        // Check column count consistency
        const cols = (trimmed.match(/\|/g) || []).length - 1;
        if (cols !== tableColumns && !trimmed.match(/^[\|\s:-]+$/)) {
          malformed++;
        }
      }
    } else if (inTable && trimmed !== '') {
      inTable = false;
      tableColumns = 0;
    }
  }

  return { count, malformed };
}

// 1. Validate all markdown files
console.log('\n1. Markdown File Validation');

const allFiles = [];
for (const domain of DOMAINS) {
  const domainDir = path.join(SKILL_ROOT, domain);
  if (directoryExists(domainDir)) {
    allFiles.push(...findMarkdownFiles(domainDir));
  }
}

// Add SKILL.md
const skillMdPath = path.join(SKILL_ROOT, 'SKILL.md');
if (fileExists(skillMdPath)) {
  allFiles.push(skillMdPath);
}

console.log(`   Found ${allFiles.length} markdown files to validate\n`);

let filesWithIssues = 0;

for (const file of allFiles) {
  const relativePath = path.relative(SKILL_ROOT, file);
  const { content, error } = safeReadFile(file);

  if (error) {
    console.log(`   ❌ ${relativePath}: ${error}`);
    failed++;
    continue;
  }

  const fileIssues = [];

  // Validate headings
  const headingResult = validateHeadings(content);
  if (!headingResult.valid) {
    fileIssues.push(...headingResult.issues);
  }

  // Validate code blocks
  const codeResult = validateCodeBlocks(content);
  if (codeResult.invalid.length > 0) {
    for (const lang of codeResult.invalid) {
      if (lang === 'UNCLOSED_BLOCK') {
        fileIssues.push('Unclosed code block');
      } else {
        fileIssues.push(`Unknown code language: ${lang}`);
      }
    }
  }

  // Validate tables
  const tableResult = validateTables(content);
  if (tableResult.malformed > 0) {
    fileIssues.push(`${tableResult.malformed} malformed table(s)`);
  }

  if (fileIssues.length === 0) {
    passed++;
  } else {
    filesWithIssues++;
    warnings += fileIssues.length;
    // Only show first 10 files with issues
    if (filesWithIssues <= 10) {
      console.log(`   ⚠️  ${relativePath}:`);
      for (const issue of fileIssues.slice(0, 3)) {
        console.log(`      - ${issue}`);
      }
    }
  }
}

if (filesWithIssues > 10) {
  console.log(`   ... and ${filesWithIssues - 10} more files with issues`);
}

if (filesWithIssues === 0) {
  console.log(`   ✅ All ${allFiles.length} files passed validation`);
}

// 2. Validate internal links
console.log('\n2. Internal Link Validation');

let brokenLinks = [];
let totalLinks = 0;

for (const file of allFiles) {
  const { content } = safeReadFile(file);
  if (!content) continue;

  const links = extractInternalLinks(content);
  totalLinks += links.length;

  const fileDir = path.dirname(file);

  for (const link of links) {
    // Resolve relative paths
    const targetPath = link.startsWith('/')
      ? path.join(SKILL_ROOT, link)
      : path.join(fileDir, link);

    // Remove any anchors
    const cleanPath = targetPath.split('#')[0];

    if (cleanPath && !fileExists(cleanPath) && !directoryExists(cleanPath)) {
      brokenLinks.push({
        from: path.relative(SKILL_ROOT, file),
        to: link
      });
    }
  }
}

if (brokenLinks.length === 0) {
  console.log(`   ✅ All ${totalLinks} internal links valid`);
  passed++;
} else {
  console.log(`   ⚠️  ${brokenLinks.length} potentially broken links:`);
  for (const link of brokenLinks.slice(0, 5)) {
    console.log(`      ${link.from} → ${link.to}`);
  }
  if (brokenLinks.length > 5) {
    console.log(`      ... and ${brokenLinks.length - 5} more`);
  }
  warnings += brokenLinks.length;
}

// 3. Code block statistics
console.log('\n3. Code Block Statistics');

const langCounts = new Map();
let totalCodeBlocks = 0;

for (const file of allFiles) {
  const { content } = safeReadFile(file);
  if (!content) continue;

  const codeBlockPattern = /```(\w*)[ \t]*(?:\n|$)/g;
  let match;

  while ((match = codeBlockPattern.exec(content)) !== null) {
    const lang = match[1] || 'generic';
    langCounts.set(lang, (langCounts.get(lang) || 0) + 1);
    totalCodeBlocks++;
  }
}

console.log(`   📊 Total code blocks: ${totalCodeBlocks}`);
console.log('   📊 Languages used:');

// Sort by count
const sortedLangs = [...langCounts.entries()].sort((a, b) => b[1] - a[1]);
for (const [lang, count] of sortedLangs.slice(0, 8)) {
  const bar = '█'.repeat(Math.min(Math.ceil(count / 5), 20));
  console.log(`      ${lang.padEnd(12)} ${bar} (${count})`);
}

console.log('\n');
printSeparator();

// Summary
console.log('\n📊 Results:');
console.log(`   Files checked: ${allFiles.length}`);
console.log(`   Checks passed: ${passed}`);
console.log(`   Files with issues: ${filesWithIssues}`);
console.log(`   Total warnings: ${warnings}`);

if (failed > 0) {
  console.log('\n❌ Some critical checks failed');
  process.exit(1);
} else {
  console.log('\n✅ All critical checks passed');
  process.exit(0);
}
