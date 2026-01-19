# Pending Deliverables Issues

> Ce fichier liste les livrables restant à créer. Chaque entrée peut être convertie en GitHub Issue.

---

## P1 - Transversal

### [Deliverable] Create configuration-guide

**Skills concernés**: backend, devops, wordpress

**Description**:
Créer le template `configuration-guide` pour documenter les guides de configuration (variables d'environnement, fichiers de config, feature flags, etc.)

**Structure suggérée**:
- Configuration overview
- Environment variables
- Config files (format, location)
- Secret management
- Feature flags
- Validation & defaults
- Environment-specific configs

**Location**: `.web-agency/deliverables/by-category/documentation/configuration-guide.md`

**Labels**: `enhancement`, `deliverable`, `P1`

---

## P2 - Domaine Technique

### [Deliverable] Create security-audit

**Skills concernés**: direction-technique, backend, devops

**Description**:
Créer le template `security-audit` pour documenter les audits de sécurité (OWASP, pentest, vulnérabilités, etc.)

**Structure suggérée**:
- Executive summary
- Scope & methodology
- Vulnerability findings (Critical/High/Medium/Low)
- OWASP Top 10 coverage
- Remediation roadmap
- Compliance status (RGPD, PCI-DSS, etc.)
- Re-test plan

**Location**: `.web-agency/deliverables/by-category/report/security-audit.md`

**Labels**: `enhancement`, `deliverable`, `P2`, `security`

---

### [Deliverable] Create performance-report

**Skills concernés**: backend, frontend, direction-technique

**Description**:
Créer le template `performance-report` pour documenter les rapports de performance (load tests, benchmarks, Core Web Vitals, etc.)

**Structure suggérée**:
- Executive summary
- Test environment & methodology
- Load test results (throughput, latency, error rate)
- Core Web Vitals (LCP, INP, CLS)
- Database performance
- API response times
- Bottleneck analysis
- Optimization recommendations
- Before/after comparison

**Location**: `.web-agency/deliverables/by-category/report/performance-report.md`

**Labels**: `enhancement`, `deliverable`, `P2`, `performance`

---

## P3 - Domaine Métier

### [Deliverable] Create brand-guidelines

**Skills concernés**: direction-artistique, ux-ui-design

**Description**:
Créer le template `brand-guidelines` pour documenter les chartes graphiques (logo, couleurs, typographie, imagery, etc.)

**Structure suggérée**:
- Brand overview & values
- Logo usage (do's and don'ts, clear space, minimum sizes)
- Color palette (primary, secondary, semantic)
- Typography (font families, hierarchy, usage)
- Imagery style (photography, illustrations)
- Iconography
- Tone of voice
- Applications (print, digital, social)

**Location**: `.web-agency/deliverables/by-category/design/brand-guidelines.md`

**Labels**: `enhancement`, `deliverable`, `P3`, `design`

---

### [Deliverable] Create content-brief

**Skills concernés**: content-management, marketing

**Description**:
Créer le template `content-brief` pour documenter les briefs de contenu (articles, landing pages, etc.)

**Structure suggérée**:
- Content objective
- Target persona
- SEO requirements (keyword, intent, competitors)
- Content structure (H1, H2, sections)
- Key messages & CTA
- Tone & style
- Internal/external links
- Visual requirements
- Deadline & workflow

**Location**: `.web-agency/deliverables/by-category/content-marketing/content-brief.md`

**Labels**: `enhancement`, `deliverable`, `P3`, `content`

---

## P4 - Spécifique WordPress

### [Deliverable] Create wp-plugin

**Skills concernés**: wordpress-gutenberg-expert

**Description**:
Créer le template `wp-plugin` pour documenter la structure d'un plugin WordPress custom.

**Structure suggérée**:
- Plugin header & metadata
- File structure
- Activation/deactivation hooks
- Admin pages (if any)
- Custom post types & taxonomies
- REST API endpoints
- Shortcodes
- Hooks provided (actions/filters)
- Dependencies
- Testing approach
- Distribution (update mechanism)

**Location**: `.web-agency/deliverables/by-category/wordpress/wp-plugin.md`

**Labels**: `enhancement`, `deliverable`, `P4`, `wordpress`

---

### [Deliverable] Create wp-env-setup

**Skills concernés**: wordpress-gutenberg-expert, devops

**Description**:
Créer le template `wp-env-setup` pour documenter la configuration d'un environnement WordPress local/staging/prod.

**Structure suggérée**:
- Environment overview (Local, Staging, Production)
- wp-env.json configuration
- Docker setup (if applicable)
- Database setup & sync
- Plugin/theme dependencies
- Environment variables
- SSL configuration
- Multisite considerations
- Development workflow
- Debugging tools

**Location**: `.web-agency/deliverables/by-category/wordpress/wp-env-setup.md`

**Labels**: `enhancement`, `deliverable`, `P4`, `wordpress`, `devops`

---

## Summary

| ID | Priority | Status |
|----|----------|--------|
| `configuration-guide` | P1 | 📝 To Create |
| `security-audit` | P2 | 📝 To Create |
| `performance-report` | P2 | 📝 To Create |
| `brand-guidelines` | P3 | 📝 To Create |
| `content-brief` | P3 | 📝 To Create |
| `wp-plugin` | P4 | 📝 To Create |
| `wp-env-setup` | P4 | 📝 To Create |

**Total**: 7 deliverables remaining
