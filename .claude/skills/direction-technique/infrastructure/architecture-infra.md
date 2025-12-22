---
name: architecture-infra
description: Conception d'infrastructure cloud
---

# Architecture Infrastructure

Tu conçois l'**architecture d'infrastructure** pour héberger les applications de manière fiable et scalable.

## Infrastructure as Code (IaC)

### Terraform

```hcl
# main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket = "terraform-state-bucket"
    key    = "prod/terraform.tfstate"
    region = "eu-west-1"
  }
}

# VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "${var.project}-vpc"
    Environment = var.environment
  }
}

# Subnets
resource "aws_subnet" "public" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 1}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "${var.project}-public-${count.index + 1}"
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "${var.project}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}
```

### Pulumi (TypeScript)

```typescript
import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const environment = config.require("environment");

// VPC
const vpc = new aws.ec2.Vpc("main", {
  cidrBlock: "10.0.0.0/16",
  enableDnsHostnames: true,
  tags: { Environment: environment },
});

// ECS Cluster
const cluster = new aws.ecs.Cluster("app", {
  name: `${pulumi.getProject()}-${environment}`,
  settings: [{
    name: "containerInsights",
    value: "enabled",
  }],
});

export const vpcId = vpc.id;
export const clusterId = cluster.id;
```

## Patterns d'Architecture

### Three-Tier Architecture

```
                    Internet
                        │
                        ▼
               ┌────────────────┐
               │   CloudFront   │  CDN / WAF
               └────────┬───────┘
                        │
               ┌────────▼───────┐
               │    ALB/NLB     │  Load Balancer
               └────────┬───────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
   ┌─────────┐    ┌─────────┐    ┌─────────┐
   │  App 1  │    │  App 2  │    │  App 3  │  Application
   └────┬────┘    └────┬────┘    └────┬────┘
        │              │              │
        └──────────────┼──────────────┘
                       ▼
               ┌───────────────┐
               │    RDS/Cache  │  Data
               └───────────────┘
```

### Serverless Architecture

```
       API Gateway
            │
            ▼
    ┌───────────────┐
    │    Lambda     │───► DynamoDB
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │     SQS       │───► Lambda Worker
    └───────────────┘
```

### Microservices on Kubernetes

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: myregistry/api:v1.0.0
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        envFrom:
        - secretRef:
            name: api-secrets
---
apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  selector:
    app: api
  ports:
  - port: 80
    targetPort: 3000
```

## Composants par Provider

### AWS

| Besoin | Service | Alternative |
|--------|---------|-------------|
| Compute | ECS Fargate | EC2, Lambda |
| Database | RDS PostgreSQL | Aurora, DynamoDB |
| Cache | ElastiCache Redis | DAX |
| Storage | S3 | EFS |
| CDN | CloudFront | - |
| DNS | Route 53 | - |
| Secrets | Secrets Manager | Parameter Store |
| Queue | SQS | EventBridge |

### GCP

| Besoin | Service |
|--------|---------|
| Compute | Cloud Run |
| Database | Cloud SQL |
| Cache | Memorystore |
| Storage | Cloud Storage |
| CDN | Cloud CDN |
| DNS | Cloud DNS |

## Bonnes Pratiques

### Sécurité

- [ ] VPC avec subnets privés
- [ ] Security Groups restrictifs
- [ ] Chiffrement at rest et in transit
- [ ] IAM roles (pas de credentials)
- [ ] Secrets Manager pour les secrets

### Haute Disponibilité

- [ ] Multi-AZ (au minimum)
- [ ] Auto-scaling configuré
- [ ] Health checks
- [ ] Backup automatisés
- [ ] DR plan documenté

### Coût

- [ ] Right-sizing des instances
- [ ] Spot/Preemptible pour workloads tolerants
- [ ] Reserved instances pour stable
- [ ] Monitoring des coûts (AWS Cost Explorer)
- [ ] Tags pour allocation

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Besoin multi-region | Architecture + coûts à valider |
| Compliance spécifique | Consultation sécurité/légal |
| Migration cloud | Plan détaillé + POC |
| Coût > budget | Optimisation ou arbitrage |
