# Audit Module Architecture

## Purpose

The Audit Module provides a centralized, immutable audit trail for all important activities performed within the StationOps system.

Its purpose is to improve accountability, traceability, security, and operational transparency across all business modules.

Rather than allowing each module to write audit logs independently, every module must use the shared AuditService.

---

# Design Principles

The Audit Module follows these principles:

* Single Responsibility Principle (SRP)
* Centralized audit logging
* Immutable audit records
* Standardized action names
* Standardized module names
* Consistent data structure
* Enterprise-grade traceability

---

# Responsibilities

The Audit Module is responsible for:

* Recording business events
* Recording security events
* Recording configuration changes
* Recording financial events
* Recording failed critical operations
* Providing a complete historical record of system activity

It is **not** responsible for business logic.

---

# Architecture

```
Users Module
       │
Cash Drop Module
       │
Banking Module
       │
Fuel Sales Module
       │
Settings Module
       │
       ▼
Audit Service
       │
       ▼
Firestore
auditLogs Collection
```

All modules communicate with the AuditService.

No module writes directly to the auditLogs collection.

---

# Immutable Audit Policy

Audit records are permanent.

Once written:

* They cannot be edited.
* They cannot be deleted.
* They cannot be overwritten.

This policy applies to all users, including Administrators.

---

# Audit Log Lifecycle

1. Business action occurs.
2. Module calls AuditService.
3. AuditService validates the request.
4. AuditService generates audit metadata.
5. AuditService stores the record in Firestore.
6. AuditService returns success.

---

# Firestore Collection

Collection name:

```
auditLogs
```

Example document:

```json
{
  "auditId": "AUD000001",
  "module": "USERS",
  "action": "USER_CREATED",
  "performedBy": "USER001",
  "performedByName": "System Administrator",
  "targetId": "USER010",
  "stationId": "STATION001",
  "deviceId": "PDQ001",
  "timestamp": "...",
  "oldValue": null,
  "newValue": {},
  "result": "SUCCESS",
  "remarks": "Administrator created new employee."
}
```

---

# Standard Modules

The following module names shall be used throughout the system:

* USERS
* AUTH
* CASH_DROP
* BANKING
* DEVICES
* REPORTS
* SETTINGS
* SYSTEM

---

# Standard Results

Every audit event shall contain one of the following result values:

* SUCCESS
* FAILED

---

# Standard Actions

Examples include:

## Users

* USER_CREATED
* USER_UPDATED
* USER_SUSPENDED
* USER_ACTIVATED
* USER_DELETED
* ROLE_CHANGED

## Authentication

* LOGIN_SUCCESS
* LOGIN_FAILED
* PASSWORD_RESET
* EMAIL_VERIFIED

## Cash Drops

* CASH_DROP_CREATED
* CASH_DROP_REPRINTED
* CASH_DROP_VERIFIED
* CASH_DROP_VARIANCE

## Banking

* CASH_BANKED
* BANKING_BATCH_CREATED

## Devices

* DEVICE_ASSIGNED
* DEVICE_UNASSIGNED

## Settings

* SETTINGS_UPDATED

---

# Audit Policy

The following events must always generate audit logs:

* Any modification of business data.
* Any financial transaction.
* Any user account change.
* Any role or permission change.
* Any configuration change.
* Any device assignment.
* Any receipt reprint.
* Any failed authentication attempt.
* Any successful authentication.
* Any administrator action affecting system data.

Read-only operations generally do not generate audit logs unless explicitly required by business or compliance requirements.

---

# Future Enhancements

Future versions of StationOps may include:

* IP address logging
* GPS location logging
* Browser information
* Device fingerprinting
* Digital signatures
* Audit log export
* Audit dashboards
* Advanced search and filtering
* Long-term archive storage
