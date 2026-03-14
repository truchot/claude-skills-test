---
paths:
  - "**/wp-content/**"
  - "**/themes/**"
  - "**/plugins/**"
---

# Conventions WordPress
- WordPress Coding Standards (WPCS) pour PHP
- Préfixer toutes les fonctions custom avec le slug du projet
- Gutenberg blocks via @wordpress/create-block
- Utiliser les hooks WP (add_action, add_filter) — pas de modification du core
- Sanitize inputs (sanitize_text_field), escape outputs (esc_html, esc_attr)
- Internationalisation : toutes les chaînes dans __() ou _e()
- Enqueue scripts/styles via wp_enqueue_script/style
