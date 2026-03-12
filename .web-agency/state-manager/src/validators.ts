/**
 * Shared validation utilities for the Web Agency State Manager.
 * Centralizes regex patterns and validation functions used across modules.
 */

export const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

export function isValidUUID(str: string): boolean {
  return typeof str === 'string' && UUID_REGEX.test(str);
}

export function isValidEmail(str: string): boolean {
  return typeof str === 'string' && EMAIL_REGEX.test(str) && str.length <= 254;
}

export function isValidISODate(str: string): boolean {
  return typeof str === 'string' && ISO_DATE_REGEX.test(str);
}

export function sanitizeString(str: unknown, maxLength: number = 1000): string {
  if (typeof str !== 'string') return '';
  return str.replace(/[\x00-\x1F\x7F]/g, '').slice(0, maxLength);
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return '***@***';
  const domainParts = domain.split('.');
  const tld = domainParts.pop() || '';
  const domainName = domainParts.join('.');
  return `${local[0]}***@${domainName[0]}***.${tld}`;
}
