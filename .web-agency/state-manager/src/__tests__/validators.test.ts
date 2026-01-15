/**
 * Security Validators Unit Tests
 */

// Import validators from StateManager (we need to export them first)
// For now, we'll test them inline

describe('Security Validators', () => {
  // UUID validation
  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

  function isValidUUID(str: string): boolean {
    return typeof str === 'string' && UUID_REGEX.test(str);
  }

  function isValidEmail(str: string): boolean {
    return typeof str === 'string' && EMAIL_REGEX.test(str) && str.length <= 254;
  }

  function isValidISODate(str: string): boolean {
    return typeof str === 'string' && ISO_DATE_REGEX.test(str);
  }

  function sanitizeString(str: unknown, maxLength: number = 1000): string {
    if (typeof str !== 'string') return '';
    return str.replace(/[\x00-\x1F\x7F]/g, '').slice(0, maxLength);
  }

  describe('isValidUUID', () => {
    it('should accept valid UUIDs', () => {
      expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
      expect(isValidUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
      expect(isValidUUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8')).toBe(true);
    });

    it('should reject invalid UUIDs', () => {
      expect(isValidUUID('')).toBe(false);
      expect(isValidUUID('not-a-uuid')).toBe(false);
      expect(isValidUUID('123e4567-e89b-12d3-a456')).toBe(false); // too short
      expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000-extra')).toBe(false); // too long
      expect(isValidUUID('123e4567_e89b_12d3_a456_426614174000')).toBe(false); // wrong separator
      expect(isValidUUID('gggggggg-gggg-gggg-gggg-gggggggggggg')).toBe(false); // invalid chars
    });

    it('should reject non-strings', () => {
      expect(isValidUUID(null as any)).toBe(false);
      expect(isValidUUID(undefined as any)).toBe(false);
      expect(isValidUUID(123 as any)).toBe(false);
      expect(isValidUUID({} as any)).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    it('should accept valid emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.org')).toBe(true);
      expect(isValidEmail('user+tag@example.co.uk')).toBe(true);
      expect(isValidEmail('a@b.co')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('not-an-email')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('user@.com')).toBe(false);
      expect(isValidEmail('user space@example.com')).toBe(false);
    });

    it('should reject emails over 254 characters', () => {
      const longEmail = 'a'.repeat(250) + '@b.com';
      expect(isValidEmail(longEmail)).toBe(false);
    });

    it('should reject non-strings', () => {
      expect(isValidEmail(null as any)).toBe(false);
      expect(isValidEmail(undefined as any)).toBe(false);
    });
  });

  describe('isValidISODate', () => {
    it('should accept valid ISO dates', () => {
      expect(isValidISODate('2024-01-15T10:30:00')).toBe(true);
      expect(isValidISODate('2024-01-15T10:30:00Z')).toBe(true);
      expect(isValidISODate('2024-01-15T10:30:00+00:00')).toBe(true);
      expect(isValidISODate('2024-01-15T10:30:00.123Z')).toBe(true);
    });

    it('should reject invalid ISO dates', () => {
      expect(isValidISODate('')).toBe(false);
      expect(isValidISODate('2024-01-15')).toBe(false); // date only
      expect(isValidISODate('10:30:00')).toBe(false); // time only
      expect(isValidISODate('Jan 15, 2024')).toBe(false); // wrong format
      expect(isValidISODate('2024/01/15T10:30:00')).toBe(false); // wrong separator
    });

    it('should reject non-strings', () => {
      expect(isValidISODate(null as any)).toBe(false);
      expect(isValidISODate(new Date() as any)).toBe(false);
    });
  });

  describe('sanitizeString', () => {
    it('should remove control characters', () => {
      expect(sanitizeString('hello\x00world')).toBe('helloworld');
      expect(sanitizeString('test\x1Fvalue')).toBe('testvalue');
      expect(sanitizeString('with\x7Fdelete')).toBe('withdelete');
    });

    it('should preserve normal characters', () => {
      expect(sanitizeString('Hello World!')).toBe('Hello World!');
      expect(sanitizeString('user@example.com')).toBe('user@example.com');
      expect(sanitizeString('Special: àéïõü')).toBe('Special: àéïõü');
    });

    it('should truncate to max length', () => {
      const longString = 'a'.repeat(2000);
      expect(sanitizeString(longString, 100)).toHaveLength(100);
      expect(sanitizeString(longString, 1000)).toHaveLength(1000);
    });

    it('should handle non-strings', () => {
      expect(sanitizeString(null)).toBe('');
      expect(sanitizeString(undefined)).toBe('');
      expect(sanitizeString(123)).toBe('');
      expect(sanitizeString({})).toBe('');
    });

    it('should handle empty strings', () => {
      expect(sanitizeString('')).toBe('');
    });
  });

  describe('Input Injection Prevention', () => {
    it('should not allow script injection in strings', () => {
      const malicious = '<script>alert("xss")</script>';
      const sanitized = sanitizeString(malicious);
      // Script tags should be preserved (not executed), but control chars removed
      expect(sanitized).toBe(malicious);
    });

    it('should handle SQL injection attempts', () => {
      const sqlInjection = "'; DROP TABLE users; --";
      const sanitized = sanitizeString(sqlInjection);
      expect(sanitized).toBe(sqlInjection); // String is preserved, but would be escaped by JSON
    });

    it('should handle path traversal in strings', () => {
      const pathTraversal = '../../../etc/passwd';
      const sanitized = sanitizeString(pathTraversal);
      expect(sanitized).toBe(pathTraversal); // Path traversal prevention is done at file operation level
    });
  });
});

describe('Git Ref Validation', () => {
  const safeRefPattern = /^[a-zA-Z0-9._\/-]+$/;

  function isValidGitRef(ref: string): boolean {
    return typeof ref === 'string' && safeRefPattern.test(ref) && ref.length < 256;
  }

  it('should accept valid branch names', () => {
    expect(isValidGitRef('main')).toBe(true);
    expect(isValidGitRef('feature/add-login')).toBe(true);
    expect(isValidGitRef('claude/implement-auth-xyz123')).toBe(true);
    expect(isValidGitRef('v1.0.0')).toBe(true);
    expect(isValidGitRef('release-2024.01.15')).toBe(true);
  });

  it('should accept valid commit hashes', () => {
    expect(isValidGitRef('abc123')).toBe(true);
    expect(isValidGitRef('abc1234567890def')).toBe(true);
    expect(isValidGitRef('1234567890abcdef1234567890abcdef12345678')).toBe(true);
  });

  it('should reject command injection attempts', () => {
    expect(isValidGitRef('main; rm -rf /')).toBe(false);
    expect(isValidGitRef('branch`whoami`')).toBe(false);
    expect(isValidGitRef('$(cat /etc/passwd)')).toBe(false);
    expect(isValidGitRef('branch | cat /etc/passwd')).toBe(false);
    expect(isValidGitRef("branch'; DROP TABLE--")).toBe(false);
  });

  it('should reject refs with spaces', () => {
    expect(isValidGitRef('branch name')).toBe(false);
    expect(isValidGitRef(' main')).toBe(false);
    expect(isValidGitRef('main ')).toBe(false);
  });

  it('should reject very long refs', () => {
    const longRef = 'a'.repeat(300);
    expect(isValidGitRef(longRef)).toBe(false);
  });

  it('should reject empty refs', () => {
    expect(isValidGitRef('')).toBe(false);
  });
});

describe('Date String Validation', () => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  function isValidDateString(date: string): boolean {
    return typeof date === 'string' && datePattern.test(date);
  }

  it('should accept valid date strings', () => {
    expect(isValidDateString('2024-01-15')).toBe(true);
    expect(isValidDateString('2023-12-31')).toBe(true);
    expect(isValidDateString('2025-06-01')).toBe(true);
  });

  it('should reject invalid date formats', () => {
    expect(isValidDateString('2024/01/15')).toBe(false);
    expect(isValidDateString('01-15-2024')).toBe(false);
    expect(isValidDateString('2024-1-15')).toBe(false);
    expect(isValidDateString('2024-01-5')).toBe(false);
    expect(isValidDateString('24-01-15')).toBe(false);
  });

  it('should reject date with injection attempts', () => {
    expect(isValidDateString('2024-01-15; rm -rf /')).toBe(false);
    expect(isValidDateString('2024-01-15`whoami`')).toBe(false);
  });
});
