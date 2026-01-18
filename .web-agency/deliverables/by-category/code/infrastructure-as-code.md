---
id: infrastructure-as-code
name: Infrastructure as Code (IaC)
version: 1.0.0
category: code
status: active
phase: "5-deploiement"
order: 4
agents:
  - devops/infrastructure/terraform-expert
  - devops/infrastructure/cloud-architect
  - devops/cicd/pipeline-builder
consumes:
  - technical-specification
  - stack-recommendation
  - environment-setup
  - docker-compose-config
produces_for:
  - devops/deployment/*
  - devops/monitoring/*
  - direction-technique/*/all
tags: [infrastructure, terraform, pulumi, cloud, aws, gcp, azure, iac, devops]
---

# Infrastructure as Code (IaC)

## Description

Configuration déclarative de l'infrastructure cloud permettant de provisionner, versionner et gérer les ressources de manière reproductible et automatisée. Ce livrable définit l'ensemble de l'infrastructure (compute, réseau, stockage, bases de données, etc.) sous forme de code, facilitant les déploiements cohérents et la gestion des environnements multiples.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Fichiers HCL (Terraform) / TypeScript (Pulumi) / YAML (CloudFormation) |
| **Emplacement** | `/infrastructure/` ou `/terraform/` |
| **Nommage** | `main.tf`, `variables.tf`, `outputs.tf`, `[env].tfvars` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Provider configuration** - Configuration du cloud provider
- [ ] **State management** - Backend pour le state (S3, GCS, etc.)
- [ ] **Network** - VPC, subnets, security groups
- [ ] **Compute** - Instances, containers, serverless
- [ ] **Storage** - Buckets, volumes, file systems
- [ ] **Database** - RDS, managed databases
- [ ] **Variables** - Paramètres configurables
- [ ] **Outputs** - Valeurs exportées (URLs, IPs, etc.)
- [ ] **Documentation** - README avec usage

### Sections Optionnelles

- [ ] **Modules** - Composants réutilisables
- [ ] **CDN** - CloudFront, Cloud CDN
- [ ] **DNS** - Route53, Cloud DNS
- [ ] **Monitoring** - CloudWatch, alertes
- [ ] **IAM** - Rôles et policies
- [ ] **Secrets** - Secrets Manager, Vault

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Syntaxe valide | `terraform validate` pass | Auto | Oui |
| 2 | Plan sans erreur | `terraform plan` success | Auto | Oui |
| 3 | State sécurisé | Backend distant + chiffré | Manuel | Oui |
| 4 | Variables externalisées | Pas de valeurs hardcodées | Auto (tflint) | Oui |
| 5 | Environnements séparés | Dev/Staging/Prod isolés | Manuel | Oui |
| 6 | Tags standardisés | Toutes ressources taggées | Auto (tflint) | Oui |
| 7 | Documentation à jour | README + commentaires | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `direction-technique` | technical-specification | Architecture cible |
| `direction-technique` | stack-recommendation | Cloud provider et services |
| `devops` | environment-setup | Environnements requis |
| `devops` | docker-compose-config | Services à déployer |
| Client | Compte cloud | Accès au cloud provider |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Architecture initiale | Lead DevOps + CTO | Révision design |
| 2 | Avant apply staging | DevOps | Revue du plan |
| 3 | Avant apply prod | CTO + DevOps | Validation formelle |
| 4 | Évolutions majeures | Équipe | PR review |

## Exemple

### Exemple Minimal - AWS

```hcl
# main.tf

terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "myapp-terraform-state"
    key    = "state/terraform.tfstate"
    region = "eu-west-3"
  }
}

provider "aws" {
  region = var.aws_region
}

# Simple EC2 instance
resource "aws_instance" "app" {
  ami           = var.ami_id
  instance_type = var.instance_type

  tags = {
    Name        = "${var.project}-app"
    Environment = var.environment
  }
}
```

### Exemple Complet - Architecture AWS Full

```hcl
# ============================================================
# terraform/
# ├── main.tf              # Configuration principale
# ├── variables.tf         # Définition des variables
# ├── outputs.tf           # Valeurs de sortie
# ├── versions.tf          # Contraintes de versions
# ├── environments/
# │   ├── dev.tfvars
# │   ├── staging.tfvars
# │   └── prod.tfvars
# └── modules/
#     ├── networking/
#     ├── compute/
#     ├── database/
#     └── cdn/
# ============================================================

# ============================================================
# versions.tf - Contraintes de versions
# ============================================================

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.30"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }

  # Backend S3 pour le state
  # Initialisé avec : terraform init -backend-config=environments/[env]-backend.hcl
  backend "s3" {
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}

# ============================================================
# main.tf - Configuration principale
# ============================================================

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "Terraform"
      Owner       = var.owner
      CostCenter  = var.cost_center
    }
  }
}

# Données locales
locals {
  name_prefix = "${var.project_name}-${var.environment}"

  common_tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

# ============================================================
# NETWORKING - VPC & Subnets
# ============================================================

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "${local.name_prefix}-vpc"
  cidr = var.vpc_cidr

  azs              = var.availability_zones
  private_subnets  = var.private_subnet_cidrs
  public_subnets   = var.public_subnet_cidrs
  database_subnets = var.database_subnet_cidrs

  # NAT Gateway pour les subnets privés
  enable_nat_gateway     = true
  single_nat_gateway     = var.environment != "prod"
  one_nat_gateway_per_az = var.environment == "prod"

  # DNS
  enable_dns_hostnames = true
  enable_dns_support   = true

  # VPC Flow Logs
  enable_flow_log                      = true
  create_flow_log_cloudwatch_log_group = true
  create_flow_log_cloudwatch_iam_role  = true
  flow_log_max_aggregation_interval    = 60

  tags = local.common_tags
}

# ============================================================
# SECURITY GROUPS
# ============================================================

# ALB Security Group
resource "aws_security_group" "alb" {
  name        = "${local.name_prefix}-alb-sg"
  description = "Security group for Application Load Balancer"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description = "HTTPS from anywhere"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP from anywhere (redirect to HTTPS)"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "All outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.common_tags, {
    Name = "${local.name_prefix}-alb-sg"
  })
}

# Application Security Group
resource "aws_security_group" "app" {
  name        = "${local.name_prefix}-app-sg"
  description = "Security group for application containers"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description     = "Traffic from ALB"
    from_port       = var.app_port
    to_port         = var.app_port
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    description = "All outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.common_tags, {
    Name = "${local.name_prefix}-app-sg"
  })
}

# Database Security Group
resource "aws_security_group" "db" {
  name        = "${local.name_prefix}-db-sg"
  description = "Security group for RDS database"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description     = "PostgreSQL from app"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.app.id]
  }

  tags = merge(local.common_tags, {
    Name = "${local.name_prefix}-db-sg"
  })
}

# ============================================================
# COMPUTE - ECS Fargate
# ============================================================

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "${local.name_prefix}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = local.common_tags
}

resource "aws_ecs_cluster_capacity_providers" "main" {
  cluster_name = aws_ecs_cluster.main.name

  capacity_providers = ["FARGATE", "FARGATE_SPOT"]

  default_capacity_provider_strategy {
    base              = 1
    weight            = 100
    capacity_provider = var.environment == "prod" ? "FARGATE" : "FARGATE_SPOT"
  }
}

# ECR Repository
resource "aws_ecr_repository" "app" {
  name                 = "${var.project_name}/app"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "AES256"
  }

  tags = local.common_tags
}

# ECR Lifecycle Policy
resource "aws_ecr_lifecycle_policy" "app" {
  repository = aws_ecr_repository.app.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 10 images"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 10
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

# ECS Task Definition
resource "aws_ecs_task_definition" "app" {
  family                   = "${local.name_prefix}-app"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.ecs_task_cpu
  memory                   = var.ecs_task_memory
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name  = "app"
      image = "${aws_ecr_repository.app.repository_url}:${var.app_image_tag}"

      portMappings = [
        {
          containerPort = var.app_port
          hostPort      = var.app_port
          protocol      = "tcp"
        }
      ]

      environment = [
        { name = "NODE_ENV", value = var.environment },
        { name = "PORT", value = tostring(var.app_port) }
      ]

      # SECURITY: All sensitive values retrieved from Secrets Manager
      secrets = [
        { name = "JWT_SECRET", valueFrom = aws_secretsmanager_secret.jwt.arn },
        { name = "DATABASE_URL", valueFrom = aws_secretsmanager_secret.database_url.arn }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.app.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }

      healthCheck = {
        command     = ["CMD-SHELL", "curl -f http://localhost:${var.app_port}/health || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }
    }
  ])

  tags = local.common_tags
}

# ECS Service
resource "aws_ecs_service" "app" {
  name                               = "${local.name_prefix}-app"
  cluster                            = aws_ecs_cluster.main.id
  task_definition                    = aws_ecs_task_definition.app.arn
  desired_count                      = var.ecs_desired_count
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200
  launch_type                        = "FARGATE"
  scheduling_strategy                = "REPLICA"
  platform_version                   = "LATEST"

  network_configuration {
    security_groups  = [aws_security_group.app.id]
    subnets          = module.vpc.private_subnets
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.app.arn
    container_name   = "app"
    container_port   = var.app_port
  }

  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  depends_on = [aws_lb_listener.https]

  tags = local.common_tags

  lifecycle {
    ignore_changes = [desired_count]
  }
}

# Auto Scaling
resource "aws_appautoscaling_target" "ecs" {
  max_capacity       = var.ecs_max_count
  min_capacity       = var.ecs_min_count
  resource_id        = "service/${aws_ecs_cluster.main.name}/${aws_ecs_service.app.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "ecs_cpu" {
  name               = "${local.name_prefix}-cpu-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value       = 70.0
    scale_in_cooldown  = 300
    scale_out_cooldown = 60
  }
}

# ============================================================
# LOAD BALANCER
# ============================================================

resource "aws_lb" "main" {
  name               = "${local.name_prefix}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = module.vpc.public_subnets

  enable_deletion_protection = var.environment == "prod"

  access_logs {
    bucket  = aws_s3_bucket.logs.id
    prefix  = "alb-logs"
    enabled = true
  }

  tags = local.common_tags
}

resource "aws_lb_target_group" "app" {
  name        = "${local.name_prefix}-app-tg"
  port        = var.app_port
  protocol    = "HTTP"
  vpc_id      = module.vpc.vpc_id
  target_type = "ip"

  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 3
  }

  tags = local.common_tags
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.main.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = var.acm_certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }
}

resource "aws_lb_listener" "http_redirect" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

# ============================================================
# DATABASE - RDS PostgreSQL
# ============================================================

resource "random_password" "db" {
  length           = 32
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "aws_db_subnet_group" "main" {
  name       = "${local.name_prefix}-db-subnet"
  subnet_ids = module.vpc.database_subnets

  tags = local.common_tags
}

resource "aws_db_instance" "main" {
  identifier = "${local.name_prefix}-db"

  engine               = "postgres"
  engine_version       = "16.1"
  instance_class       = var.db_instance_class
  allocated_storage    = var.db_allocated_storage
  max_allocated_storage = var.db_max_allocated_storage
  storage_type         = "gp3"
  storage_encrypted    = true

  db_name  = var.db_name
  username = var.db_username
  password = random_password.db.result
  port     = 5432

  vpc_security_group_ids = [aws_security_group.db.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name

  multi_az               = var.environment == "prod"
  publicly_accessible    = false
  deletion_protection    = var.environment == "prod"
  skip_final_snapshot    = var.environment != "prod"
  final_snapshot_identifier = var.environment == "prod" ? "${local.name_prefix}-final-snapshot" : null

  backup_retention_period = var.environment == "prod" ? 30 : 7
  backup_window           = "03:00-04:00"
  maintenance_window      = "Mon:04:00-Mon:05:00"

  performance_insights_enabled          = true
  performance_insights_retention_period = 7

  enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]

  tags = local.common_tags
}

# ============================================================
# STORAGE - S3 Buckets
# ============================================================

# Bucket pour les assets
resource "aws_s3_bucket" "assets" {
  bucket = "${local.name_prefix}-assets"

  tags = local.common_tags
}

resource "aws_s3_bucket_versioning" "assets" {
  bucket = aws_s3_bucket.assets.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "assets" {
  bucket = aws_s3_bucket.assets.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "assets" {
  bucket = aws_s3_bucket.assets.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Bucket pour les logs
resource "aws_s3_bucket" "logs" {
  bucket = "${local.name_prefix}-logs"

  tags = local.common_tags
}

resource "aws_s3_bucket_lifecycle_configuration" "logs" {
  bucket = aws_s3_bucket.logs.id

  rule {
    id     = "expire-old-logs"
    status = "Enabled"

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }

    transition {
      days          = 90
      storage_class = "GLACIER"
    }

    expiration {
      days = 365
    }
  }
}

# ============================================================
# SECRETS & IAM
# ============================================================

resource "aws_secretsmanager_secret" "jwt" {
  name        = "${local.name_prefix}/jwt-secret"
  description = "JWT signing secret for ${var.project_name}"

  tags = local.common_tags
}

resource "aws_secretsmanager_secret_version" "jwt" {
  secret_id     = aws_secretsmanager_secret.jwt.id
  secret_string = var.jwt_secret
}

# SECURITY: Database connection string stored in Secrets Manager (not in env vars)
resource "aws_secretsmanager_secret" "database_url" {
  name        = "${local.name_prefix}/database-url"
  description = "Database connection string for ${var.project_name}"

  tags = local.common_tags
}

resource "aws_secretsmanager_secret_version" "database_url" {
  secret_id = aws_secretsmanager_secret.database_url.id
  secret_string = "postgresql://${var.db_username}:${random_password.db.result}@${aws_db_instance.main.endpoint}/${var.db_name}"
}

# ECS Execution Role
resource "aws_iam_role" "ecs_execution" {
  name = "${local.name_prefix}-ecs-execution"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  tags = local.common_tags
}

resource "aws_iam_role_policy_attachment" "ecs_execution" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy" "ecs_execution_secrets" {
  name = "secrets-access"
  role = aws_iam_role.ecs_execution.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue"
        ]
        Resource = [
          aws_secretsmanager_secret.jwt.arn,
          aws_secretsmanager_secret.database_url.arn
        ]
      }
    ]
  })
}

# ECS Task Role
resource "aws_iam_role" "ecs_task" {
  name = "${local.name_prefix}-ecs-task"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  tags = local.common_tags
}

resource "aws_iam_role_policy" "ecs_task_s3" {
  name = "s3-access"
  role = aws_iam_role.ecs_task.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = [
          "${aws_s3_bucket.assets.arn}/*"
        ]
      }
    ]
  })
}

# ============================================================
# MONITORING - CloudWatch
# ============================================================

resource "aws_cloudwatch_log_group" "app" {
  name              = "/ecs/${local.name_prefix}-app"
  retention_in_days = var.environment == "prod" ? 90 : 30

  tags = local.common_tags
}

# Alarme CPU
resource "aws_cloudwatch_metric_alarm" "cpu_high" {
  alarm_name          = "${local.name_prefix}-cpu-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = 300
  statistic           = "Average"
  threshold           = 80
  alarm_description   = "CPU utilization is too high"
  alarm_actions       = [aws_sns_topic.alerts.arn]

  dimensions = {
    ClusterName = aws_ecs_cluster.main.name
    ServiceName = aws_ecs_service.app.name
  }
}

resource "aws_sns_topic" "alerts" {
  name = "${local.name_prefix}-alerts"

  tags = local.common_tags
}

# ============================================================
# variables.tf - Définition des variables
# ============================================================

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-3"
}

variable "project_name" {
  description = "Project name"
  type        = string
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "owner" {
  description = "Owner of the resources"
  type        = string
}

variable "cost_center" {
  description = "Cost center for billing"
  type        = string
  default     = "engineering"
}

# Networking
variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "Availability zones"
  type        = list(string)
  default     = ["eu-west-3a", "eu-west-3b"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.101.0/24", "10.0.102.0/24"]
}

variable "database_subnet_cidrs" {
  description = "CIDR blocks for database subnets"
  type        = list(string)
  default     = ["10.0.201.0/24", "10.0.202.0/24"]
}

# Application
variable "app_port" {
  description = "Application port"
  type        = number
  default     = 4000
}

variable "app_image_tag" {
  description = "Docker image tag"
  type        = string
  default     = "latest"
}

# ECS
variable "ecs_task_cpu" {
  description = "ECS task CPU units"
  type        = number
  default     = 256
}

variable "ecs_task_memory" {
  description = "ECS task memory (MB)"
  type        = number
  default     = 512
}

variable "ecs_desired_count" {
  description = "Desired number of ECS tasks"
  type        = number
  default     = 2
}

variable "ecs_min_count" {
  description = "Minimum number of ECS tasks"
  type        = number
  default     = 1
}

variable "ecs_max_count" {
  description = "Maximum number of ECS tasks"
  type        = number
  default     = 10
}

# Database
variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.micro"
}

variable "db_allocated_storage" {
  description = "RDS allocated storage (GB)"
  type        = number
  default     = 20
}

variable "db_max_allocated_storage" {
  description = "RDS max allocated storage (GB)"
  type        = number
  default     = 100
}

variable "db_name" {
  description = "Database name"
  type        = string
}

variable "db_username" {
  description = "Database username"
  type        = string
}

# SSL
variable "acm_certificate_arn" {
  description = "ACM certificate ARN for HTTPS"
  type        = string
}

# Secrets
variable "jwt_secret" {
  description = "JWT signing secret"
  type        = string
  sensitive   = true
}

# ============================================================
# outputs.tf - Valeurs de sortie
# ============================================================

output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "alb_dns_name" {
  description = "ALB DNS name"
  value       = aws_lb.main.dns_name
}

output "alb_zone_id" {
  description = "ALB Zone ID (for Route53)"
  value       = aws_lb.main.zone_id
}

output "ecr_repository_url" {
  description = "ECR repository URL"
  value       = aws_ecr_repository.app.repository_url
}

output "ecs_cluster_name" {
  description = "ECS cluster name"
  value       = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  description = "ECS service name"
  value       = aws_ecs_service.app.name
}

output "rds_endpoint" {
  description = "RDS endpoint"
  value       = aws_db_instance.main.endpoint
}

output "s3_assets_bucket" {
  description = "S3 assets bucket name"
  value       = aws_s3_bucket.assets.id
}
```

### Fichier tfvars pour environnement

```hcl
# environments/prod.tfvars

project_name = "myapp"
environment  = "prod"
owner        = "team-platform"
cost_center  = "engineering"

# Networking
vpc_cidr             = "10.0.0.0/16"
availability_zones   = ["eu-west-3a", "eu-west-3b", "eu-west-3c"]
private_subnet_cidrs = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
public_subnet_cidrs  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

# ECS
ecs_task_cpu      = 512
ecs_task_memory   = 1024
ecs_desired_count = 3
ecs_min_count     = 2
ecs_max_count     = 20

# Database
db_instance_class        = "db.r6g.large"
db_allocated_storage     = 100
db_max_allocated_storage = 500
db_name                  = "myapp_prod"
db_username              = "myapp_admin"

# SSL
acm_certificate_arn = "arn:aws:acm:eu-west-3:123456789:certificate/xxx"
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| State local | Pas de collaboration, risque de perte | Backend distant (S3, GCS) |
| Secrets dans le code | Fuite de credentials | Variables + Secrets Manager |
| Pas de locking du state | Corruptions lors de runs parallèles | DynamoDB lock table |
| Tout dans un seul fichier | Difficile à maintenir | Modulariser par composant |
| Pas de tags | Impossible de tracker les coûts | Tagging systématique |
| Hardcoded values | Pas de réutilisation | Variables pour tout |
| Pas de remote state data | Duplication, désync | terraform_remote_state |

## Références

- [Terraform Best Practices](https://www.terraform-best-practices.com/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [Terraform AWS Modules](https://registry.terraform.io/namespaces/terraform-aws-modules)
- [Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/)
- Livrables liés : `docker-compose-config`, `ci-pipeline`, `environment-setup`, `technical-specification`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | devops | Création initiale |
