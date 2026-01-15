#!/usr/bin/env python3
"""
Mise à jour des SKILL.md vers Agent Skills Specification

1. Améliore les descriptions avec "when to use" triggers (max 1024 chars)
2. Déplace les champs non-standard dans metadata {}

Usage:
    python3 update-skills-frontmatter.py [--dry-run] [--skill <name>]
"""

import os
import re
import sys
import yaml
from pathlib import Path

# Descriptions améliorées avec triggers "when to use"
# Format: skill_name -> nouvelle description (max 1024 chars)
IMPROVED_DESCRIPTIONS = {
    "backend-developer": """Expert backend pour APIs REST/GraphQL, bases de données SQL/NoSQL, architecture serveur et sécurité. Utilise ce skill quand: (1) conception ou développement d'APIs, (2) modélisation de données et requêtes complexes, (3) authentification/autorisation, (4) optimisation de performances serveur, (5) intégration de services tiers, (6) architecture microservices.""",

    "client-intake": """Point d'entrée automatisé pour réception, qualification et routage des demandes clients vers l'agence IA. Utilise ce skill quand: (1) un nouveau client contacte l'agence, (2) qualification d'un besoin projet, (3) routage vers le bon interlocuteur/skill, (4) création d'un brief initial, (5) estimation préliminaire de faisabilité.""",

    "commercial-crm": """Expert Commercial & CRM pour pipeline, prospection, négociation et fidélisation. Utilise ce skill quand: (1) gestion du pipeline commercial, (2) suivi des prospects et relances, (3) préparation de propositions commerciales, (4) négociation tarifaire, (5) analyse du taux de conversion, (6) stratégie de fidélisation client.""",

    "content-management": """Expert gestion de contenu et workflow éditorial pour sites web et applications. Utilise ce skill quand: (1) création ou migration de contenus, (2) définition d'une stratégie éditoriale, (3) gestion des assets médias, (4) localisation et traduction, (5) workflow de validation de contenus, (6) optimisation SEO du contenu.""",

    "design-system-foundations": """Expert Design System avec approche Atomic Design industrielle. Utilise ce skill quand: (1) création ou audit d'un design system, (2) définition des tokens (couleurs, typo, espacements), (3) construction de composants atomiques, (4) documentation des patterns UI, (5) garantir la cohérence visuelle cross-platform.""",

    "devops": """Expert DevOps pour CI/CD, containers, Kubernetes et Infrastructure as Code. Utilise ce skill quand: (1) mise en place de pipelines CI/CD, (2) containerisation avec Docker/K8s, (3) infrastructure as code (Terraform, Pulumi), (4) monitoring et alerting, (5) optimisation des déploiements, (6) sécurisation de l'infrastructure.""",

    "direction-artistique": """Direction Artistique pour pilotage stratégique du design et de l'identité visuelle. Utilise ce skill quand: (1) définition d'une identité visuelle, (2) validation de la cohérence créative, (3) brief créatif pour une campagne, (4) arbitrage sur les choix esthétiques, (5) supervision de la charte graphique.""",

    "direction-marketing": """Direction Marketing pour stratégie digitale, positionnement et acquisition. Utilise ce skill quand: (1) définition de la stratégie marketing, (2) positionnement de marque, (3) planification des campagnes, (4) définition des KPIs marketing, (5) arbitrage budgétaire marketing, (6) analyse de la concurrence.""",

    "direction-technique": """Direction Technique pour pilotage stratégique des choix techniques et de l'architecture. Utilise ce skill quand: (1) décisions d'architecture système, (2) choix de stack technique, (3) revue technique stratégique, (4) audit de code ou infrastructure, (5) estimation technique macro, (6) arbitrage dette technique.""",

    "finance-analytics": """Expert Finance & Analytics pour facturation, KPIs et reporting business. Utilise ce skill quand: (1) création de factures ou devis, (2) suivi de la rentabilité projet, (3) analyse des KPIs business, (4) prévisions financières, (5) reporting pour la direction, (6) optimisation des coûts.""",

    "frontend-developer": """Expert développement front-end moderne avec HTML, CSS, JavaScript/TypeScript et frameworks. Utilise ce skill quand: (1) développement d'interfaces utilisateur, (2) intégration de maquettes, (3) optimisation des performances front, (4) accessibilité web (a11y), (5) responsive design, (6) animations et interactions.""",

    "lead-dev": """Lead Développeur pour coordination technique opérationnelle et code review. Utilise ce skill quand: (1) coordination d'une équipe de développeurs, (2) code review et qualité de code, (3) mentoring technique, (4) résolution de problèmes techniques complexes, (5) planification des sprints techniques, (6) validation des merge requests.""",

    "legal-compliance": """Expert Legal & Compliance pour RGPD, CGV et conformité juridique. Utilise ce skill quand: (1) mise en conformité RGPD, (2) rédaction de CGV/CGU, (3) mentions légales, (4) politique de confidentialité, (5) audit de conformité, (6) gestion des cookies et consentements.""",

    "marketing": """Expert Marketing Digital pour stratégie, campagnes et acquisition. Utilise ce skill quand: (1) création de campagnes marketing, (2) stratégie de contenu, (3) SEO/SEA, (4) email marketing et automation, (5) analyse des performances marketing, (6) gestion des réseaux sociaux.""",

    "nextjs-expert": """Expert Next.js pour App Router, Server Components et optimisation. Utilise ce skill quand: (1) développement d'applications Next.js, (2) migration vers App Router, (3) Server Components et Server Actions, (4) stratégies de rendering (SSR/SSG/ISR), (5) optimisation des performances Next.js, (6) déploiement Vercel.""",

    "project-management": """Gestion de projet pour agence Web - du brief à la livraison. Utilise ce skill quand: (1) planification d'un projet web, (2) estimation et chiffrage, (3) suivi d'avancement, (4) communication client, (5) gestion des risques projet, (6) coordination des équipes, (7) livraison et recette.""",

    "react-expert": """Expert React pour hooks, state management et patterns modernes. Utilise ce skill quand: (1) développement de composants React, (2) gestion d'état (Redux, Zustand, Context), (3) hooks personnalisés, (4) optimisation des re-renders, (5) testing de composants React, (6) patterns React avancés.""",

    "support-client": """Expert Support Client pour ticketing, FAQ et satisfaction utilisateur. Utilise ce skill quand: (1) gestion des tickets support, (2) création de FAQ ou base de connaissances, (3) escalade de problèmes, (4) analyse de la satisfaction client, (5) formation des utilisateurs, (6) documentation utilisateur.""",

    "task-orchestrator": """Orchestration des tâches pour queue, state machine et distribution. Utilise ce skill quand: (1) création d'une file de tâches, (2) gestion d'états et transitions, (3) distribution de travail entre skills, (4) suivi d'exécution des tâches, (5) gestion des erreurs et retry, (6) priorisation des tâches.""",

    "testing-process": """Expert stratégie et méthodologie de tests - pyramide, qualité et automatisation. Utilise ce skill quand: (1) définition d'une stratégie de tests, (2) tests unitaires, intégration, e2e, (3) tests de performance, (4) tests de sécurité, (5) tests d'accessibilité, (6) CI/CD et automatisation des tests.""",

    "ux-ui-design": """Expert UX/UI Design pour recherche utilisateur, wireframes et prototypes. Utilise ce skill quand: (1) recherche utilisateur et personas, (2) wireframing et maquettage, (3) prototypage interactif, (4) tests utilisateurs, (5) design d'interfaces, (6) audit UX, (7) branding et identité visuelle.""",

    "web-agency": """Méta-orchestrateur de l'agence Web IA Full-Automatisée. Utilise ce skill quand: (1) routing d'une demande vers le bon skill, (2) orchestration multi-skills, (3) vue d'ensemble d'un projet, (4) coordination entre départements, (5) escalade de décisions stratégiques.""",

    "web-dev-process": """Processus de développement web standardisé en 7 phases. Utilise ce skill quand: (1) démarrage d'un nouveau projet web, (2) structuration des phases de développement, (3) best practices de développement, (4) checklist de livraison, (5) méthodologie agile appliquée au web.""",

    "wordpress-gutenberg-expert": """Expert WordPress et Gutenberg pour thèmes, plugins et blocks. Utilise ce skill quand: (1) développement WordPress (thèmes/plugins), (2) création de blocks Gutenberg, (3) API Block Editor, (4) migration ou optimisation WordPress, (5) hooks et filters WP, (6) WP-CLI et déploiement."""
}

def parse_frontmatter(content: str) -> tuple:
    """Parse YAML frontmatter from markdown content."""
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if not match:
        return None, content

    try:
        frontmatter = yaml.safe_load(match.group(1))
        body = match.group(2)
        return frontmatter, body
    except yaml.YAMLError as e:
        print(f"  ⚠️  YAML parse error: {e}")
        return None, content

def build_frontmatter(data: dict) -> str:
    """Build YAML frontmatter string."""
    # Custom dumper to handle multiline descriptions nicely
    def str_representer(dumper, data):
        if '\n' in data or len(data) > 80:
            return dumper.represent_scalar('tag:yaml.org,2002:str', data, style='|')
        return dumper.represent_scalar('tag:yaml.org,2002:str', data)

    yaml.add_representer(str, str_representer)
    return yaml.dump(data, default_flow_style=False, allow_unicode=True, sort_keys=False)

def update_skill(skill_dir: Path, dry_run: bool = False) -> bool:
    """Update a single skill's SKILL.md file."""
    skill_md = skill_dir / "SKILL.md"
    skill_name = skill_dir.name

    if not skill_md.exists():
        print(f"  ⚠️  No SKILL.md found")
        return False

    content = skill_md.read_text(encoding='utf-8')
    frontmatter, body = parse_frontmatter(content)

    if frontmatter is None:
        print(f"  ⚠️  Could not parse frontmatter")
        return False

    # Extract standard and non-standard fields
    name = frontmatter.get('name', skill_name)
    old_description = frontmatter.get('description', '')

    # Non-standard fields to move to metadata
    non_standard_fields = ['version', 'status', 'level', 'ecosystem_version']
    metadata = frontmatter.get('metadata', {})

    for field in non_standard_fields:
        if field in frontmatter:
            metadata[field] = frontmatter[field]

    # Get improved description or keep existing
    new_description = IMPROVED_DESCRIPTIONS.get(skill_name, old_description)

    # Ensure description is under 1024 chars
    if len(new_description) > 1024:
        print(f"  ⚠️  Description too long ({len(new_description)} chars), truncating...")
        new_description = new_description[:1020] + "..."

    # Build new frontmatter
    new_frontmatter = {
        'name': name,
        'description': new_description.strip()
    }

    # Add metadata if any non-standard fields exist
    if metadata:
        new_frontmatter['metadata'] = metadata

    # Build new content
    new_yaml = build_frontmatter(new_frontmatter)
    new_content = f"---\n{new_yaml}---\n{body}"

    # Show changes
    desc_changed = old_description.strip() != new_description.strip()
    meta_added = bool(metadata)

    if desc_changed:
        print(f"  ✓ Description améliorée ({len(new_description)} chars)")
    if meta_added:
        print(f"  ✓ Metadata ajouté: {list(metadata.keys())}")

    if not desc_changed and not meta_added:
        print(f"  → Aucun changement nécessaire")
        return False

    if dry_run:
        print(f"  [DRY-RUN] Pas de modification")
        return True

    # Write changes
    skill_md.write_text(new_content, encoding='utf-8')
    print(f"  ✓ SKILL.md mis à jour")
    return True

def main():
    import argparse
    parser = argparse.ArgumentParser(description='Update skills to Agent Skills spec')
    parser.add_argument('--dry-run', action='store_true', help='Show changes without applying')
    parser.add_argument('--skill', type=str, help='Update single skill by name')
    args = parser.parse_args()

    # Find skills directory
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    skills_dir = project_root / '.web-agency' / 'skills'

    if not skills_dir.exists():
        print(f"Skills directory not found: {skills_dir}")
        sys.exit(1)

    print("╔══════════════════════════════════════════════════════════════╗")
    print("║   Mise à jour des Skills - Agent Skills Specification        ║")
    print("╚══════════════════════════════════════════════════════════════╝")
    print()

    if args.dry_run:
        print("🔍 Mode DRY-RUN activé\n")

    updated = 0
    skipped = 0

    if args.skill:
        # Single skill
        skill_dir = skills_dir / args.skill
        if skill_dir.is_dir():
            print(f"━━━ {args.skill} ━━━")
            if update_skill(skill_dir, args.dry_run):
                updated += 1
        else:
            print(f"Skill not found: {args.skill}")
            sys.exit(1)
    else:
        # All skills
        for skill_dir in sorted(skills_dir.iterdir()):
            if not skill_dir.is_dir():
                continue
            if skill_dir.name in ['examples', 'scripts']:
                continue

            print(f"━━━ {skill_dir.name} ━━━")
            if update_skill(skill_dir, args.dry_run):
                updated += 1
            else:
                skipped += 1
            print()

    print("╔══════════════════════════════════════════════════════════════╗")
    print(f"║  Terminé: {updated} mis à jour, {skipped} inchangés                       ║")
    print("╚══════════════════════════════════════════════════════════════╝")

if __name__ == '__main__':
    main()
