/**
 * CLI Integration Tests
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('CLI Commands', () => {
  let testDir: string;
  let cliPath: string;

  beforeAll(() => {
    cliPath = path.join(__dirname, '..', 'cli.ts');
  });

  beforeEach(() => {
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cli-test-'));
    // Create .project directory
    fs.mkdirSync(path.join(testDir, '.project'), { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  function runCli(args: string): string {
    const env = {
      ...process.env,
      PROJECT_DATA_DIR: path.join(testDir, '.project'),
    };

    try {
      return execSync(`npx ts-node ${cliPath} ${args}`, {
        encoding: 'utf-8',
        cwd: testDir,
        env,
        timeout: 30000,
      });
    } catch (error: any) {
      return error.stdout || error.message;
    }
  }

  describe('help', () => {
    it('should display help message', () => {
      const output = runCli('--help');
      expect(output).toContain('Web Agency State Manager CLI');
      expect(output).toContain('Commands:');
      expect(output).toContain('create');
      expect(output).toContain('list');
    });
  });

  describe('init', () => {
    it('should initialize .project directory', () => {
      const output = runCli('init');
      expect(output).toContain('Initialized');
    });
  });

  describe('stats', () => {
    it('should display statistics', () => {
      const output = runCli('stats');
      expect(output).toContain('PROJECT STATISTICS');
      expect(output).toContain('Total Projects');
    });
  });

  describe('Input Validation', () => {
    it('should reject invalid email format', () => {
      const output = runCli('create --name "Test" --client "Client" --email "invalid-email"');
      expect(output).toContain('Invalid email format');
    });

    it('should require all mandatory fields for create', () => {
      const output = runCli('create --name "Test"');
      expect(output).toContain('required');
    });

    it('should reject empty project name', () => {
      const output = runCli('create --name "" --client "Client" --email "a@b.com"');
      expect(output).toContain('required');
    });
  });
});

describe('Email Masking', () => {
  function maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (!domain) return '***@***';
    const domainParts = domain.split('.');
    const maskedLocal = local[0] + '***';
    const maskedDomain = domainParts[0][0] + '***.' + domainParts.slice(1).join('.');
    return `${maskedLocal}@${maskedDomain}`;
  }

  it('should mask email addresses correctly', () => {
    expect(maskEmail('john@example.com')).toBe('j***@e***.com');
    expect(maskEmail('alice@company.co.uk')).toBe('a***@c***.co.uk');
    expect(maskEmail('bob@test.org')).toBe('b***@t***.org');
  });

  it('should handle edge cases', () => {
    expect(maskEmail('a@b.com')).toBe('a***@b***.com');
    expect(maskEmail('invalid')).toBe('***@***');
  });
});
