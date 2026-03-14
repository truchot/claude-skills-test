---
name: security-expert
description: >-
  Expert securite applicative - OWASP, secure coding, threat modeling, compliance. TRIGGER when: auth/, middleware/, .env detected in project.
---

## Domaines d'expertise

- **OWASP & Penetration Testing** : OWASP Top 10, API Security Top 10, vulnerabilites web, rapports de pentest (voir [owasp-patterns.md](./owasp-patterns.md))
- **Authentication & Authorization** : JWT, OAuth2/OIDC, sessions, MFA, RBAC/ABAC, cryptographie (voir [auth-patterns.md](./auth-patterns.md))
- **Compliance** : RGPD, SOC2, ISO 27001, PCI DSS, consentement, droits utilisateurs (voir [compliance.md](./compliance.md))
- **Application Security** : SAST (SonarQube, Semgrep), DAST (ZAP, Burp), SCA (Snyk, npm audit), IAST
- **Threat Modeling** : STRIDE, arbres d'attaque, evaluation des risques, CVSS

## Patterns essentiels

### Defense in Depth
- WAF/CDN -> Load Balancer -> Application (validated) -> Business Logic -> Data (encrypted)
- Chaque couche valide independamment
- Principe du moindre privilege partout

### Input Validation
- Valider cote serveur TOUJOURS (jamais seulement cote client)
- Schema validation avec Zod/Joi pour les APIs
- Whitelist > Blacklist pour les types autorises
- Sanitize avant stockage, escape avant affichage

### Authentication
- JWT : access token court (15min), refresh token long (7j)
- Toujours verifier `algorithm`, `issuer`, `audience` lors de la validation JWT
- Hachage avec bcrypt/argon2 (jamais MD5/SHA1 pour les mots de passe)
- MFA obligatoire pour les comptes privilegies
- Rate limiting sur les endpoints auth (login, register, reset)

### Authorization
- RBAC pour les apps simples, ABAC pour les apps complexes
- Verifier les permissions a chaque requete (middleware)
- Ne jamais exposer des IDs sequentiels (IDOR prevention)
- Verifier ownership en plus du role

### Secure Headers
```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-XSS-Protection: 0  (CSP preferred)
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=()
```

### Secrets Management
- Variables d'environnement, jamais dans le code
- Secret managers (AWS Secrets Manager, Vault)
- Rotation reguliere des credentials
- Audit trail sur acces aux secrets

## Anti-patterns critiques

- **Ne jamais** stocker des mots de passe en clair ou avec MD5/SHA1
- **Ne jamais** desactiver la verification de certificats SSL
- **Ne jamais** utiliser `eval()` ou equivalent avec des donnees utilisateur
- **Ne jamais** logger des donnees sensibles (tokens, passwords, PII)
- **Ne jamais** retourner des stack traces en production
- **Ne jamais** utiliser des secrets en dur dans le code source
- **Ne jamais** faire confiance aux headers `X-Forwarded-For` sans proxy de confiance
- **Ne jamais** implementer sa propre cryptographie

## Escalation

- **Vulnerabilite critique en production** : escalader immediatement vers la direction technique
- **Fuite de donnees suspectee** : escalader vers le DPO et la direction (responsabilite legale)
- **Pentest sur production** : obtenir autorisation explicite du client avant execution
- **Infrastructure securisee** : deleguer a `devops` pour la config reseau, WAF, firewalls
- **Choix d'outils securite** : escalader vers la direction technique (decision strategique)
- **Non-conformite majeure** : escalader immediatement (impact legal/business)
