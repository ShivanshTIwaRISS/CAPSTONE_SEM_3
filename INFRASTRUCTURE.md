# Project Infrastructure and CI/CD Walkthrough

This document outlines the implementation of the CI/CD pipeline and infrastructure provisioning for the Capstone Ecommerce project.

## 🚀 Overview

The project now includes a complete automated pipeline that handles testing, infrastructure creation, containerization, and deployment to Amazon EKS.

## 🛠 Phase 1: Testing
- **Configuration**: Integrated into GitHub Actions.
- **Commands**: Runs `npm test` with coverage reporting.
- **Reports**: Test coverage reports are uploaded as build artifacts in GitHub Actions.

## 🏗 Phase 2: Infrastructure (Terraform)
Located in the `terraform/` directory:
- **Provider**: AWS.
- **Resources**: 
  - **S3 Bucket**: Created with a unique name using a random suffix.
  - **Versioning**: Enabled for data recovery and tracking.
  - **Encryption**: AES256 server-side encryption enabled.
  - **Public Access Block**: All public access is strictly blocked for security.

## 🐳 Phase 3: Containerization (Docker)
The `Dockerfile` has been optimized for production:
- **Multi-stage Build**: Separates the build environment from the runtime environment to reduce image size.
- **Non-root User**: The application runs as `appuser`, enhancing security.
- **Healthcheck**: Configured to monitor the Nginx service status.

## ☸️ Phase 4: Kubernetes Deployment (EKS)
Located in the `k8s/` directory:
- **Namespace**: `capstone-ecommerce`.
- **Deployment**:
  - **Replicas**: Minimum 2 replicas for high availability.
  - **Resource Limits**: Defined for CPU and Memory.
  - **Probes**: Liveness and Readiness probes configured to ensure application stability.
- **Service**: Exposed via a `LoadBalancer`.

## 🔄 GitHub Actions Workflow
The workflow (`.github/workflows/main.yml`) follows the strict order:
1. **Push / PR**
2. **Run Tests** (Phase 1)
3. **Terraform Apply** (Phase 2)
4. **Docker Build & Push** (Phase 3)
5. **Deploy to EKS** (Phase 4)

---

### ⚠️ Required Actions
To make this pipeline functional, you **MUST** configure the following secrets in your GitHub repository:
1. `AWS_ACCESS_KEY_ID`
2. `AWS_SECRET_ACCESS_KEY`
3. `AWS_SESSION_TOKEN`
4. `AWS_REGION`

### 📝 Notes
- Ensure your EKS cluster name matches `capstone-eks-cluster` or update it in the `env` section of `main.yml`.
- The ECR repository `capstone-ecommerce-repo` should exist or be created before the build step.
