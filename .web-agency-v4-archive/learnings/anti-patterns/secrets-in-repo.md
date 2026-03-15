---
id: antipattern-002
severity: critical
tags: [security, git, configuration]
first_occurrence: 2024-03-15
occurrence_count: 2
---

# Anti-Pattern: Secrets Committés dans le Repo

## Symptôme

**Comment détecter ce problème :**

- Clés API en clair dans les fichiers versionnés
- Mots de passe dans `wp-config.php` committé
- Fichiers `.env` sans `.gitignore`
- Tokens d'accès dans le code source

**Exemple de manifestation :**

```php
// ❌ wp-config.php COMMITTÉ
define('DB_PASSWORD', 'real_prod_password_123!');
define('AWS_SECRET_KEY', 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY');
```

```javascript
// ❌ config.js COMMITTÉ
const STRIPE_SECRET = 'sk_live_abc123xyz789...';
const SENDGRID_API_KEY = 'SG.xxxxxxxxx.yyyyyyyy';
```

## Pourquoi c'est un Problème

### Impact Technique

- Secrets exposés publiquement (GitHub, GitLab)
- Rotation de clés obligatoire immédiate
- Historique Git compromis (secrets restent même après suppression)

### Impact Business

- **Violation RGPD** potentielle
- **Fuite de données** clients
- **Coûts imprévus** (utilisation frauduleuse AWS/Stripe)
- **Réputation** de l'agence compromise

### Coût Typique

| Aspect | Coût estimé |
|--------|-------------|
| Rotation secrets | 4-8h |
| Audit sécurité | 1-2j |
| Risque incident | CRITIQUE |
| Nettoyage historique Git | 2-4h |

## Solution

### Correction Immédiate

```bash
# 1. Révoquer immédiatement tous les secrets exposés
# (Stripe, AWS, SendGrid, etc.)

# 2. Nettoyer l'historique Git avec git-filter-repo
pip install git-filter-repo
git filter-repo --invert-paths --path wp-config.php --force

# 3. Forcer le push (coordination équipe requise)
git push origin --force --all
```

### Nouvelle Configuration

```bash
# .gitignore (AVANT tout commit)
.env
.env.*
!.env.example
wp-config.php
**/credentials.json
**/*secret*
```

```php
// wp-config.php (gitignored, copié depuis template)
define('DB_PASSWORD', getenv('DB_PASSWORD'));
```

## Prévention

### Checklist Avant Action

- [ ] `.gitignore` contient `.env` et `wp-config.php`
- [ ] `.env.example` existe sans valeurs réelles
- [ ] Pre-commit hook gitleaks installé
- [ ] Audit `git log --all --full-history -- "*secret*"`

### Outils de Détection

| Outil | Configuration | Quand |
|-------|---------------|-------|
| [gitleaks](https://github.com/gitleaks/gitleaks) | `.gitleaks.toml` | Pre-commit + CI |
| [git-secrets](https://github.com/awslabs/git-secrets) | AWS patterns | Pre-commit |
| [truffleHog](https://github.com/trufflesecurity/trufflehog) | All patterns | CI |

### Configuration gitleaks

```toml
# .gitleaks.toml
[allowlist]
  paths = [
    '''\.env\.example''',
    '''tests/fixtures/'''
  ]
```

## Occurrences Documentées

| Projet | Date | Impact | Résolution |
|--------|------|--------|------------|
| Client A | 2024-03-15 | Clé Stripe exposée 2h | Rotation + audit |
| Client B | 2024-09-20 | AWS creds sur GitHub | Rotation immédiate + cleanup |

## Voir Aussi

- [Pattern: secrets-management](../patterns/secrets-management.md)
- [Anti-pattern: env-hardcoded](./env-hardcoded.md)
- [Decision: when-dotenv-vs-constants](../decisions/when-dotenv-vs-constants.md)

## Références

- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [GitLab Secret Detection](https://docs.gitlab.com/ee/user/application_security/secret_detection/)
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
