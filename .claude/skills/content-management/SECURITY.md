# Security Guide - Content Management

Guide de sécurité pour la gestion de contenu, les uploads et l'accès aux ressources.

## File Upload Validation

### Type Checking

```yaml
file_validation:
  images:
    allowed_types:
      - image/jpeg
      - image/png
      - image/gif
      - image/webp
      - image/svg+xml
    max_size: 10MB
    magic_bytes_check: true  # Vérifie les bytes, pas juste l'extension

  videos:
    allowed_types:
      - video/mp4
      - video/webm
      - video/quicktime
    max_size: 500MB
    max_duration: 3600  # 1 heure

  documents:
    allowed_types:
      - application/pdf
      - application/msword
      - application/vnd.openxmlformats-officedocument.wordprocessingml.document
    max_size: 50MB

  blocked_extensions:
    - .exe
    - .bat
    - .sh
    - .php
    - .js
    - .html
    - .htm
```

### Magic Bytes Validation

```javascript
const MAGIC_BYTES = {
  'image/jpeg': [0xFF, 0xD8, 0xFF],
  'image/png': [0x89, 0x50, 0x4E, 0x47],
  'image/gif': [0x47, 0x49, 0x46],
  'image/webp': [0x52, 0x49, 0x46, 0x46],
  'application/pdf': [0x25, 0x50, 0x44, 0x46]
};

function validateMagicBytes(buffer, expectedType) {
  const expected = MAGIC_BYTES[expectedType];
  if (!expected) return false;

  for (let i = 0; i < expected.length; i++) {
    if (buffer[i] !== expected[i]) return false;
  }
  return true;
}
```

### Size Limits

| Contexte | Limite | Raison |
|----------|--------|--------|
| Image upload | 10 MB | Performance optimisation |
| Video upload | 500 MB | Transcoding capacity |
| Batch upload | 100 MB total | Memory limits |
| API payload | 5 MB | Request timeout |
| Base64 inline | 100 KB | Page weight |

## Virus Scanning

### Configuration

```yaml
virus_scanning:
  enabled: true
  provider: clamav  # ou: virustotal, crowdstrike

  scan_on:
    - upload
    - before_publish
    - scheduled  # scan quotidien des assets

  actions:
    on_threat:
      - quarantine_file
      - notify_security_team
      - block_user_temporarily
      - log_incident

  exclusions:
    - file_types: [svg]  # Scanné différemment
    - max_size: 100MB    # Files > 100MB scannés async
```

### Quarantine Process

```
┌─────────────────────────────────────────────────────────────┐
│                    QUARANTINE PROCESS                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌──────────┐      ┌──────────┐      ┌──────────┐         │
│   │  Upload  │─────►│  Scan    │─────►│ Threat?  │         │
│   └──────────┘      └──────────┘      └────┬─────┘         │
│                                            │                │
│                          ┌─────────────────┼────────────┐   │
│                          ▼                 ▼            │   │
│                     ┌────────┐        ┌────────┐        │   │
│                     │  Yes   │        │   No   │        │   │
│                     └───┬────┘        └───┬────┘        │   │
│                         │                 │             │   │
│                         ▼                 ▼             │   │
│                   ┌──────────┐      ┌──────────┐        │   │
│                   │Quarantine│      │ Process  │        │   │
│                   │ + Alert  │      │ normally │        │   │
│                   └──────────┘      └──────────┘        │   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Content Sanitization

### XSS Prevention

```javascript
const sanitizeConfig = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'hr',
    'ul', 'ol', 'li',
    'blockquote', 'pre', 'code',
    'a', 'strong', 'em', 'u', 's',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'img', 'figure', 'figcaption'
  ],

  allowedAttributes: {
    'a': ['href', 'title', 'target', 'rel'],
    'img': ['src', 'alt', 'title', 'width', 'height', 'loading'],
    'code': ['class'],  // Pour syntax highlighting
    '*': ['id', 'class']
  },

  allowedSchemes: ['http', 'https', 'mailto'],

  // Transformations
  transformTags: {
    'a': (tagName, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        rel: 'noopener noreferrer',
        target: attribs.target === '_blank' ? '_blank' : undefined
      }
    })
  },

  // Strip dangerous content
  disallowedTagsMode: 'discard',
  allowProtocolRelative: false
};
```

### SVG Sanitization

```yaml
svg_sanitization:
  enabled: true

  remove:
    - script
    - foreignObject
    - use[href^="data:"]
    - "*[onclick]"
    - "*[onerror]"
    - "*[onload]"

  allowed_elements:
    - svg
    - g
    - path
    - rect
    - circle
    - ellipse
    - line
    - polyline
    - polygon
    - text
    - tspan
    - defs
    - clipPath
    - mask
    - linearGradient
    - radialGradient
    - stop

  allowed_attributes:
    - viewBox
    - width
    - height
    - fill
    - stroke
    - stroke-width
    - d
    - transform
    - class
    - id
```

### Markdown Sanitization

```yaml
markdown_sanitization:
  # Désactiver les features dangereuses
  disable:
    - html_inline
    - html_block

  # Valider les liens
  link_validation:
    allowed_protocols: [http, https, mailto]
    validate_external: true
    nofollow_external: true

  # Valider les images
  image_validation:
    allowed_sources:
      - cdn.example.com
      - images.example.com
    require_alt: true
    max_dimensions: [4000, 4000]
```

## API Key Management

### Secret Storage

```yaml
secrets:
  storage: vault  # Options: vault, aws_secrets_manager, env

  rotation:
    enabled: true
    interval: 90d
    notify_before: 14d

  keys:
    translation_api:
      provider: deepl
      env_var: DEEPL_API_KEY
      rotation: 90d

    cdn_api:
      provider: cloudflare
      env_var: CLOUDFLARE_API_TOKEN
      rotation: 180d

    storage_api:
      provider: s3
      use_iam_role: true  # Pas de clé statique
```

### Access Patterns

```yaml
api_access:
  translation_service:
    allowed_ips:
      - internal_vpc
    rate_limit: 1000/hour
    timeout: 30s

  cdn_api:
    authentication: bearer_token
    allowed_operations:
      - purge_cache
      - upload_asset
      - get_analytics
    denied_operations:
      - delete_zone
      - modify_dns
```

## CDN Access Control

### Signed URLs

```javascript
function generateSignedUrl(assetPath, expiresIn = 3600) {
  const expires = Math.floor(Date.now() / 1000) + expiresIn;
  const stringToSign = `${assetPath}${expires}`;
  const signature = crypto
    .createHmac('sha256', CDN_SIGNING_KEY)
    .update(stringToSign)
    .digest('hex');

  return `${CDN_URL}${assetPath}?expires=${expires}&sig=${signature}`;
}

// Usage
const privateAssetUrl = generateSignedUrl('/private/document.pdf', 3600);
```

### Access Policies

```yaml
cdn_access:
  public_assets:
    path: /public/*
    access: public
    cache: aggressive

  protected_assets:
    path: /protected/*
    access: signed_url
    expires: 3600
    cache: private

  private_assets:
    path: /private/*
    access: authenticated
    requires: [valid_session, asset_permission]
    cache: no-store

  admin_assets:
    path: /admin/*
    access: ip_whitelist
    allowed_ips:
      - office_ip
      - vpn_range
```

### CORS Configuration

```yaml
cors:
  allowed_origins:
    - https://www.example.com
    - https://app.example.com
    - https://admin.example.com

  allowed_methods:
    - GET
    - POST
    - PUT
    - DELETE

  allowed_headers:
    - Content-Type
    - Authorization
    - X-Requested-With

  expose_headers:
    - X-Request-Id
    - X-RateLimit-Remaining

  max_age: 86400
  credentials: true
```

## Content Security

### Content Security Policy

```yaml
csp:
  default-src: "'self'"
  script-src:
    - "'self'"
    - "https://cdn.example.com"
  style-src:
    - "'self'"
    - "'unsafe-inline'"  # Pour inline styles du CMS
  img-src:
    - "'self'"
    - "https://cdn.example.com"
    - "https://images.example.com"
    - "data:"  # Pour base64 thumbnails
  font-src:
    - "'self'"
    - "https://fonts.googleapis.com"
  connect-src:
    - "'self'"
    - "https://api.example.com"
  frame-ancestors: "'none'"
  base-uri: "'self'"
  form-action: "'self'"
```

### Permissions Policy

```yaml
permissions_policy:
  camera: ()
  microphone: ()
  geolocation: ()
  payment: ()
  usb: ()
  autoplay: (self)
  fullscreen: (self)
```

## Authentication & Authorization

### Role-Based Access

| Role | Create | Edit | Publish | Delete | Admin |
|------|--------|------|---------|--------|-------|
| Viewer | ❌ | ❌ | ❌ | ❌ | ❌ |
| Contributor | ✅ | Own | ❌ | Own | ❌ |
| Editor | ✅ | ✅ | ❌ | ✅ | ❌ |
| Publisher | ✅ | ✅ | ✅ | ✅ | ❌ |
| Admin | ✅ | ✅ | ✅ | ✅ | ✅ |

### Permission Checks

```javascript
const permissions = {
  'content:create': ['contributor', 'editor', 'publisher', 'admin'],
  'content:edit': ['editor', 'publisher', 'admin'],
  'content:publish': ['publisher', 'admin'],
  'content:delete': ['editor', 'publisher', 'admin'],
  'asset:upload': ['contributor', 'editor', 'publisher', 'admin'],
  'asset:delete': ['editor', 'publisher', 'admin'],
  'settings:manage': ['admin']
};

function checkPermission(user, action) {
  const allowedRoles = permissions[action];
  if (!allowedRoles) return false;
  return allowedRoles.includes(user.role);
}
```

## Audit Logging

### Events à Logger

```yaml
audit_events:
  content:
    - content.created
    - content.updated
    - content.published
    - content.unpublished
    - content.deleted

  assets:
    - asset.uploaded
    - asset.replaced
    - asset.deleted

  access:
    - user.login
    - user.logout
    - user.permission_denied
    - api.rate_limited

  security:
    - file.quarantined
    - content.sanitized
    - suspicious_activity.detected
```

### Log Format

```json
{
  "timestamp": "2025-01-10T14:30:00Z",
  "event": "content.published",
  "actor": {
    "id": "user-123",
    "email": "editor@example.com",
    "role": "publisher",
    "ip": "192.168.1.100"
  },
  "resource": {
    "type": "article",
    "id": "CONTENT-456",
    "title": "Guide SEO 2025"
  },
  "changes": {
    "status": ["approved", "published"],
    "published_at": [null, "2025-01-10T14:30:00Z"]
  },
  "metadata": {
    "request_id": "req-789",
    "user_agent": "Mozilla/5.0...",
    "session_id": "sess-abc"
  }
}
```

## Incident Response

### Classification

| Severity | Description | Response Time | Escalation |
|----------|-------------|---------------|------------|
| P1 | Data breach, malware | Immediate | Security team + Management |
| P2 | Unauthorized access | 1 hour | Security team |
| P3 | Suspicious activity | 4 hours | Ops team |
| P4 | Policy violation | 24 hours | Team lead |

### Response Procedures

```yaml
incident_response:
  malware_detected:
    immediate:
      - isolate_asset
      - block_source_ip
      - notify_security_team
    investigation:
      - analyze_upload_chain
      - check_related_uploads
      - review_user_activity
    remediation:
      - remove_infected_files
      - scan_related_assets
      - update_detection_rules

  unauthorized_access:
    immediate:
      - revoke_session
      - lock_account
      - notify_security
    investigation:
      - review_access_logs
      - identify_compromised_data
      - check_lateral_movement
    remediation:
      - force_password_reset
      - review_permissions
      - implement_additional_controls
```

## Compliance

### GDPR Considerations

| Requirement | Implementation |
|-------------|----------------|
| Data minimization | Only store necessary metadata |
| Right to erasure | Content deletion removes all versions |
| Access logging | All access logged with retention |
| Encryption at rest | AES-256 for stored content |
| Encryption in transit | TLS 1.3 required |

### Data Retention

```yaml
retention:
  published_content: indefinite
  draft_content: 1y
  deleted_content: 30d (soft delete)
  audit_logs: 2y
  access_logs: 90d
  error_logs: 30d
```

## Références

- [SKILL.md](./SKILL.md) - Vue d'ensemble du skill
- [OPERATIONS.md](./OPERATIONS.md) - Guide opérationnel
- [legal-compliance/SKILL.md](../legal-compliance/SKILL.md) - Conformité légale
