# StationOps System Architecture

## Version

1.0.0

---

# Purpose

StationOps is a web-based Forecourt Operations Management System designed for fuel stations.

Its primary objective is to digitize and automate station operations including:

- Workforce Management
- Shift Management
- Pump Allocation
- Meter Readings
- Sales Calculation
- Cash Drop Management
- Safe Management
- MIS Reporting
- Banking
- Audit Logging

The system replaces manual books, spreadsheets and paper-based processes with a secure centralized platform.

---

# System Architecture

```
                 Users

 Sales Assistant
 Cashier
 Supervisor
 Manager
 Administrator

        │

        ▼

Frontend (Web Dashboard)

        │

HTTPS REST API

        ▼

NestJS Backend

        │

Business Logic

        │

Repositories

        │

Firebase Firestore

        │

Firebase Authentication

        │

Firebase Storage
```

---

# Technology Stack

## Backend

- NestJS
- TypeScript

## Database

- Cloud Firestore

## Authentication

- Firebase Authentication

## Storage

- Firebase Storage

## Hosting

- Firebase Hosting (Frontend)

- Cloud Run / VPS (Backend)

---

# System Principles

StationOps follows these principles:

## Business First

The software models actual fuel station operations.

Business rules drive software design.

---

## Modular Architecture

Each module is independent.

Modules communicate through services.

---

## Security First

Authentication required.

Role-based permissions.

Audit logging.

Soft deletes.

---

## Scalability

Designed to support:

- Single station

- Multi-station

- Enterprise deployment

---

# Major Modules

1. Authentication

2. User Management

3. Roles & Permissions

4. Station Configuration

5. Workforce Management

6. Shift Management

7. Pump Allocation

8. Meter Readings

9. Sales Engine

10. Cash Management

11. MIS

12. Banking

13. Reports

14. Audit

---

# User Roles

Sales Assistant

Cashier

Supervisor

Manager

Administrator

---

# High-Level Workflow

Employee Login

↓

Role Validation

↓

Dashboard

↓

Assigned Daily Tasks

↓

Business Operations

↓

Audit Log

↓

Reports

---

# Development Standards

- DTO Validation

- Repository Pattern

- Service Layer

- Controller Layer

- Guards

- Interceptors

- Exception Filters

- Audit Logging

---

# Long-Term Vision

StationOps is intended to become a complete Forecourt Operations Management Platform capable of supporting fuel stations of different sizes while maintaining configurable business rules and operational workflows.