# Database Design

## 1. Introduction

This document describes the database architecture for the StationOps platform.

StationOps uses Google Firebase Firestore as its primary database. The database is designed to support secure, scalable, and auditable storage of operational data for petrol station activities.

The initial version focuses on the Cash Drop Module while providing a foundation for future modules including Fuel Sales, Banking, Inventory, Shift Management, Tank Measurements, and Reporting.

---

# 2. Database Technology

Database Engine:
- Google Firebase Firestore

Database Type:
- NoSQL Document Database

Advantages

- Cloud Hosted
- Highly Scalable
- Real-time Synchronization
- Automatic Backups
- Secure Authentication Integration
- Offline Support (Future)

---

# 3. Database Design Principles

The StationOps database follows the following principles.

## Principle 1 - Financial Records are Immutable

Cash Drops and Cash Verifications cannot be edited or deleted after creation.

Corrections are handled by creating additional records instead of modifying historical data.

---

## Principle 2 - Complete Audit Trail

Every important business action is logged.

Examples include:

- User Login
- Cash Drop Creation
- Receipt Reprinting
- Cash Verification
- Banking
- User Management

---

## Principle 3 - Backend Enforces Business Rules

Business rules are never enforced solely by the frontend.

All validation and authorization is handled by the NestJS backend.

---

## Principle 4 - Business IDs

Firestore Document IDs are internal.

Business operations use human-readable IDs.

Example:

Document ID

aX91Pkl98Lm

Business ID

KSM-CD-2026-000145

---

## Principle 5 - Business-Oriented Collections

Collections are organized around business entities instead of application screens.

---

# 4. Collections Overview

| Collection | Purpose |
|------------|---------|
| users | Application users |
| roles | User roles and permissions |
| stations | Petrol stations |
| cashDrops | Cash drop records |
| cashVerifications | Cash verification records |
| auditLogs | Audit trail |
| settings | System configuration |
| devices | Registered devices |

---

# 5. Entity Relationships

```text
Station
│
├── Users
│
├── Cash Drops
│      │
│      ▼
│ Cash Verifications
│
├── Devices
│
└── Audit Logs
```

---

# 6. Collection Specifications

## 6.1 users

Purpose

Stores all users who can access StationOps.

| Field | Type | Description |
|------|------|-------------|
| documentId | String | Firestore ID |
| employeeNumber | String | Employee Number |
| fullName | String | User Full Name |
| email | String | Login Email |
| roleId | String | Assigned Role |
| stationId | String | Assigned Station |
| status | String | ACTIVE / INACTIVE |
| createdAt | Timestamp | Record Creation |
| updatedAt | Timestamp | Last Update |
| lastLoginAt | Timestamp | Last Login |

---

## 6.2 roles

Purpose

Stores user roles and permissions.

| Field | Type |
|------|------|
| roleId | String |
| roleName | String |
| description | String |
| permissions | Array |
| createdAt | Timestamp |

Example Permissions

- cashdrop.create
- cashdrop.verify
- reports.view
- users.manage

---

## 6.3 stations

Purpose

Stores petrol station information.

| Field | Type |
|------|------|
| stationId | String |
| stationCode | String |
| stationName | String |
| location | String |
| status | String |
| createdAt | Timestamp |

---

## 6.4 cashDrops

Purpose

Stores every cash drop created by Sales Assistants.

| Field | Type |
|------|------|
| documentId | String |
| dropId | String |
| salesAssistantId | String |
| stationId | String |
| amount | Number |
| status | Enum |
| printStatus | Enum |
| createdAt | Timestamp |
| updatedAt | Timestamp |

Business Rules

- Cannot be edited.
- Cannot be deleted.
- One owner.
- One verification.
- QR generated automatically.

Status Values

- CREATED
- VERIFIED
- VARIANCE
- BANKING_READY
- BANKED

Print Status

- PENDING
- PRINTED
- REPRINTED
- FAILED

---

## 6.5 cashVerifications

Purpose

Stores verification information for each cash drop.

| Field | Type |
|------|------|
| documentId | String |
| cashDropId | String |
| verifiedBy | String |
| expectedAmount | Number |
| actualAmount | Number |
| varianceAmount | Number |
| verificationStatus | Enum |
| remarks | String |
| verifiedAt | Timestamp |

Verification Status

- MATCH
- SHORTAGE
- OVERAGE

Business Rules

- Expected amount is automatically loaded.
- Variance calculated by backend.
- Confirmation required before saving a variance.
- Verification cannot be edited.

---

## 6.6 auditLogs

Purpose

Stores system audit history.

| Field | Type |
|------|------|
| documentId | String |
| action | String |
| performedBy | String |
| roleId | String |
| entityType | String |
| entityId | String |
| description | String |
| ipAddress | String |
| deviceId | String |
| createdAt | Timestamp |

---

## 6.7 settings

Purpose

Stores configurable business settings.

| Field | Type |
|------|------|
| maximumCashBeforeDrop | Number |
| currency | String |
| receiptFooter | String |
| allowReprint | Boolean |
| qrExpiry | Number |
| updatedAt | Timestamp |

---

## 6.8 devices

Purpose

Stores registered StationOps devices.

| Field | Type |
|------|------|
| deviceId | String |
| deviceName | String |
| deviceType | String |
| assignedUser | String |
| stationId | String |
| status | String |
| lastSeen | Timestamp |
| createdAt | Timestamp |

---

# 7. Cash Drop Lifecycle

```
Sales Assistant

↓

Create Cash Drop

↓

Generate QR

↓

Print Receipt

↓

Deposit Cash

↓

Cashier Verification

↓

Verified / Variance

↓

Banking Ready

↓

Banked
```

---

# 8. Security Considerations

- Authentication handled by Firebase Authentication.
- Authorization handled by NestJS.
- Ownership checks performed on every request.
- Sales Assistants can only access their own records.
- Supervisors and Cashiers can access operational records according to their permissions.
- Audit logs cannot be deleted.
- Financial records are immutable.

---

# 9. Major Design Decisions

## Decision 1

Cash Drops are immutable.

Reason

Financial integrity.

---

## Decision 2

QR Codes replace paper receipt books.

Reason

Paperless operation.

---

## Decision 3

Receipt reprinting is allowed.

Reason

Printer failures.

Every reprint is logged.

---

## Decision 4

Variance confirmation is mandatory.

Reason

Reduce counting errors.

---

## Decision 5

Business rules execute in the backend.

Reason

Security.

---

# 10. Future Collections

Future versions may introduce:

- bankingBatches
- bankCollectionItems
- varianceCases
- fuelSales
- shiftManagement
- inventory
- tankMeasurements
- notifications
- reports