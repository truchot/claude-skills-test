# OWASP Security Patterns Reference

## OWASP Top 10 (2021) - Testing Checklist

| # | Vulnerability | Test Method | Prevention |
|---|---------------|-------------|------------|
| A01 | Broken Access Control | IDOR tests, privilege escalation | RBAC, ownership checks |
| A02 | Cryptographic Failures | TLS check, secret scanning | HTTPS everywhere, KMS |
| A03 | Injection | SQLi, XSS, command injection | Parameterized queries, CSP |
| A04 | Insecure Design | Threat modeling, design review | STRIDE, security requirements |
| A05 | Security Misconfiguration | Config audit, defaults check | Hardened configs, IaC |
| A06 | Vulnerable Components | SCA scan, dependency audit | Dependabot, npm audit |
| A07 | Auth Failures | Brute force, session tests | MFA, rate limiting |
| A08 | Software Integrity | Supply chain analysis | SRI, signed commits |
| A09 | Logging Failures | Log review, coverage check | Structured logging, SIEM |
| A10 | SSRF | Internal URL access tests | URL allowlists, network segmentation |

## A01: Broken Access Control Tests

```bash
# IDOR - Access another user's resource
curl -H "Authorization: Bearer $USER_A_TOKEN" \
  https://api.example.com/users/USER_B_ID/data

# Privilege escalation - Modify own role
curl -X PATCH -H "Authorization: Bearer $TOKEN" \
  -d '{"role": "admin"}' \
  https://api.example.com/users/me

# Forced browsing
curl https://example.com/admin/dashboard
curl https://example.com/api/admin/users
```

### Prevention Pattern
```typescript
// Always check ownership + role
async function getResource(userId: string, resourceId: string) {
  const resource = await db.resource.findUnique({ where: { id: resourceId } });
  if (!resource) throw new NotFoundError();
  if (resource.ownerId !== userId && !hasRole(userId, 'admin')) {
    throw new ForbiddenError();
  }
  return resource;
}
```

## A03: Injection Prevention

```typescript
// SQL - Always parameterized
const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
// NEVER: db.query(`SELECT * FROM users WHERE id = ${userId}`)

// XSS - Content Security Policy
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));

// Command Injection - Never use shell
import { execFile } from 'child_process';  // NOT exec()
execFile('convert', [inputFile, outputFile]);
```

## OWASP API Security Top 10

| # | Risk | Prevention |
|---|------|------------|
| API1 | Broken Object Level Auth | Check object ownership |
| API2 | Broken Authentication | Strong auth, rate limit |
| API3 | Broken Object Property Level | Response filtering |
| API4 | Unrestricted Resource Consumption | Rate limiting, pagination |
| API5 | Broken Function Level Auth | RBAC on every endpoint |
| API6 | Unrestricted Mass Assignment | Explicit allowlists |
| API7 | Server Side Request Forgery | URL validation |
| API8 | Security Misconfiguration | Secure defaults |
| API9 | Improper Inventory Management | API versioning, deprecation |
| API10 | Unsafe API Consumption | Validate third-party responses |

## SAST/DAST Integration

| Tool | Type | CI Integration |
|------|------|----------------|
| SonarQube | SAST | `sonarcloud-github-action` |
| Semgrep | SAST | `semgrep/semgrep-action` |
| OWASP ZAP | DAST | `zaproxy/action-baseline` |
| Snyk | SCA | `snyk/actions/node` |
| Trivy | Container | `aquasecurity/trivy-action` |
| TruffleHog | Secrets | `trufflesecurity/trufflehog` |

## Security Headers Validation

```bash
# Check all security headers
curl -I https://example.com | grep -iE \
  "strict-transport|content-security|x-frame|x-content-type|referrer-policy"
```
