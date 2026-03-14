# Compliance Reference

## RGPD/GDPR - Key Principles

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| Lawfulness | Legal basis for processing | Explicit consent |
| Purpose limitation | Specific, limited purpose | Metadata on data |
| Minimization | Collect strict minimum | Optimized DB schema |
| Accuracy | Data kept up to date | Update processes |
| Storage limitation | Limited retention | TTL, automatic purge |
| Integrity | Data security | Encryption, access control |

## Consent Management

```typescript
interface Consent {
  userId: string;
  purpose: 'marketing' | 'analytics' | 'necessary';
  granted: boolean;
  grantedAt: Date;
  revokedAt?: Date;
  source: 'web' | 'app' | 'api';
  version: string;
}

// API endpoint
app.post('/api/consent', authMiddleware, async (req, res) => {
  const { purposes, granted } = req.body;
  for (const purpose of purposes) {
    await db.consent.upsert({
      where: { userId_purpose: { userId: req.user.id, purpose } },
      update: {
        granted,
        grantedAt: granted ? new Date() : undefined,
        revokedAt: granted ? undefined : new Date(),
        version: CURRENT_VERSION,
      },
      create: {
        userId: req.user.id, purpose, granted,
        grantedAt: granted ? new Date() : undefined,
        version: CURRENT_VERSION, source: 'web',
      },
    });
  }
  res.json({ success: true });
});

// Check before processing
async function hasConsent(userId: string, purpose: string): Promise<boolean> {
  const consent = await db.consent.findUnique({
    where: { userId_purpose: { userId, purpose } },
  });
  return consent?.granted === true && !consent.revokedAt;
}
```

## User Rights (RGPD Articles 15-22)

| Right | Article | Implementation |
|-------|---------|----------------|
| Access | Art. 15 | Export all user data as JSON |
| Rectification | Art. 16 | Edit profile endpoints |
| Erasure | Art. 17 | Account deletion + data purge |
| Portability | Art. 20 | Data export (JSON/CSV) |
| Restriction | Art. 18 | Freeze processing flag |
| Objection | Art. 21 | Opt-out mechanisms |

```typescript
// Right to erasure implementation
app.delete('/api/users/me', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  // 1. Anonymize personal data
  await db.user.update({
    where: { id: userId },
    data: { email: `deleted-${userId}@anonymized.local`,
            name: 'Deleted User', phone: null, address: null },
  });
  // 2. Delete consents
  await db.consent.deleteMany({ where: { userId } });
  // 3. Delete sessions
  await db.session.deleteMany({ where: { userId } });
  // 4. Log the deletion
  await auditLog('user_deleted', { userId, requestedAt: new Date() });
  res.json({ success: true });
});
```

## SOC2 - Trust Service Criteria

| Category | Controls | Evidence |
|----------|----------|----------|
| Security | Access control, encryption, monitoring | Audit logs, configs |
| Availability | Uptime SLA, disaster recovery, backups | Uptime reports, DR tests |
| Confidentiality | Data classification, encryption at rest | Encryption configs |
| Processing Integrity | Input validation, error handling | Test reports |
| Privacy | RGPD compliance, consent | Privacy policy, consent logs |

## ISO 27001 - Key Controls

| Control | Description | Implementation |
|---------|-------------|----------------|
| A.9 Access Control | User access management | RBAC, MFA, reviews |
| A.10 Cryptography | Encryption policy | TLS, at-rest encryption |
| A.12 Operations | Change management, logging | CI/CD, audit trails |
| A.14 System Acquisition | Secure development | SAST, code review |
| A.16 Incident Management | Incident response plan | Runbooks, on-call |

## PCI DSS - Payment Card Security

| Requirement | Description |
|-------------|-------------|
| Req 3 | Never store CVV, minimize cardholder data |
| Req 4 | Encrypt transmission over public networks |
| Req 6 | Secure development lifecycle |
| Req 8 | Unique IDs, strong authentication |
| Req 10 | Log and monitor all access |
| Req 11 | Regular vulnerability scans |

## Data Retention Policy Template

| Data Type | Retention | Action After |
|-----------|-----------|--------------|
| User accounts | Active + 30 days | Anonymize |
| Transaction logs | 7 years | Archive then delete |
| Session data | 24 hours | Delete |
| Analytics | 26 months | Aggregate then delete |
| Audit logs | 5 years | Archive |
| Backups | 90 days | Delete |
