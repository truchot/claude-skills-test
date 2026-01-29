# Configuration Confidentielle

Ce dossier contient les fichiers de configuration sensibles qui ne doivent **jamais** être commités.

## Structure

```
config/
├── .gitignore              # Protection des fichiers sensibles
├── README.md               # Ce fichier
├── pricing.example.yaml    # Template de configuration pricing
└── pricing.yaml            # ⛔ CONFIDENTIEL (non versionné)
```

## Installation

### 1. Copier les templates

```bash
# Configuration pricing
cp pricing.example.yaml pricing.yaml
```

### 2. Éditer avec vos valeurs

```bash
# Utiliser votre éditeur préféré
nano pricing.yaml
# ou
code pricing.yaml
```

### 3. Vérifier la protection

```bash
# Le fichier ne doit PAS apparaître dans git status
git status

# Si le fichier apparaît, vérifier le .gitignore
cat .gitignore
```

## Fichiers Protégés

Les fichiers suivants sont automatiquement ignorés par Git :

| Pattern | Description |
|---------|-------------|
| `pricing.yaml` | Configuration tarifs |
| `*.secret.yaml` | Fichiers secrets |
| `*.local.yaml` | Configuration locale |
| `credentials.yaml` | Identifiants |
| `api-keys.yaml` | Clés API |

## Bonnes Pratiques

### ✅ À faire

- Toujours partir du fichier `.example.yaml`
- Documenter les changements dans le fichier
- Utiliser des permissions restrictives (`chmod 600`)
- Sauvegarder de manière sécurisée (gestionnaire de secrets)

### ❌ À éviter

- Commiter des valeurs réelles (même "pour test")
- Partager par email ou chat
- Stocker en clair dans un cloud non sécurisé
- Utiliser les mêmes valeurs en dev et prod

## Gestion des Secrets en Production

### Option 1 : Variables d'environnement

```bash
export PRICING_TJM_SENIOR=700
```

### Option 2 : Gestionnaire de secrets

- **GitHub** : Repository Secrets
- **GitLab** : CI/CD Variables (masked)
- **AWS** : Secrets Manager
- **HashiCorp** : Vault

### Option 3 : Fichier chiffré

```bash
# Chiffrer avec age
age -e -r $PUBLIC_KEY pricing.yaml > pricing.yaml.age

# Déchiffrer
age -d -i $PRIVATE_KEY pricing.yaml.age > pricing.yaml
```

## Support

Pour toute question sur la gestion des configurations :
→ `direction-technique` pour les aspects techniques
→ `direction-commerciale` pour les valeurs pricing
