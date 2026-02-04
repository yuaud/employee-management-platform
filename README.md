# Employee Management Platform

A production-grade, cloud-native **Employee Management System** designed with real-world architecture, security, and deployment practices.

---

## Overview

Modern full-stack platform for enterprise employee management, hierarchy modeling (manager–subordinate), secure authentication, and scalable cloud deployment.

Built to simulate **real production systems**, not demo projects.

## Architecture
Detailed technical documentation.
→ [ARCHITECTURE.md](./ARCHITECTURE.md)

## System Architecture

**Cloud-native, single-domain architecture with centralized routing**

- **Frontend**: SPA hosted on S3, distributed via CloudFront  
- **Backend**: Spring Boot API containerized with Docker, running on EC2  
- **Identity**: Keycloak IAM as centralized authentication server, containerized with Docker, running on EC2  
- **Database**: PostgreSQL (AWS RDS)  
- **Storage**: S3 for static assets and media uploads  
- **Routing**: CloudFront path-based routing  
- **Email**: Email delivery (Lambda + SES)

```text
User → CloudFront → S3 (Frontend)
                 → Spring Boot API (EC2)
                 → Keycloak IAM (EC2)
Spring Boot API → PostgreSQL (RDS)
Spring Boot API → AWS Lambda → AWS SES
```

---

## Tech Stack

### Backend

* Java 17
* Spring Boot 3
* Spring Security
* JWT Authentication
* Spring Data JPA
* Global Exception Handling
* Pagination & Sorting  
* DTO Projection 
* Custom JPQL Queries  
* Specification API
* Flyway

### Frontend

* React + TypeScript
* Vite
* Tailwind CSS
* Keycloak JS Adapter
* Axios
* SPA Architecture

### Authentication

* Keycloak (IAM)
* OAuth2 / OIDC
* JWT

### Cloud & Infrastructure

* AWS EC2
* AWS CloudFront
* AWS S3 (Static Hosting + Media Storage)
* AWS RDS (PostgreSQL)
* AWS Lambda
* AWS SES (Email notification service)

### DevOps

* Docker
* Docker Compose
* DockerHub (Image Registry)
* Environment-based Configuration

---

## Core Features

* Employee CRUD
* Manager–Employee hierarchy
* Role-based access control
* Advanced filtering system
* Multi-field sorting
* Pagination
* Secure authentication
* Centralized identity management
* Media upload system
* Serverless email delivery pipeline (Lambda + SES)

---

## Security Model

* OAuth2 / OIDC authentication
* JWT-based stateless security
* Central IAM (Keycloak)
* Role-Based Access Control (RBAC)
* HTTPS via CDN
* Secure API access

---

## Deployment Model

### Frontend

* S3 Static Hosting
* CloudFront CDN

### Backend

* Dockerized Spring Boot API
* EC2 + Docker Compose

### Identity

* Dockerized Keycloak
* EC2 + Docker Compose
* Pre-configured realm import

### Database

* PostgreSQL (AWS RDS)
* Private VPC connectivity

### Routing

* Single-domain access
* CloudFront path routing:

  * `/*` → Frontend
  * `/api/*` → Backend
  * `/realms/*` → Keycloak

---

## CI/CD Summary

### Backend Pipeline

```text
mvn clean package → docker build → docker push → EC2 pull → docker-compose deploy
```

### Frontend Pipeline

```text
npm run build → S3 upload → CloudFront invalidation
```

---

## Project Focus

This project is built as a **real production simulation**, focusing on:

* Cloud architecture
* IAM integration
* Secure system design
* Scalable deployment
* Production-grade configuration
* Real DevOps workflows

---
