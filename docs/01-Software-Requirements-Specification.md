# StationOps Software Requirements Specification (SRS)

**Version:** 1.0

**Project:** StationOps

**Current Module:** Cash Drop Management

**Prepared By:** Arnold Onditi

**Technology Stack:**

* Backend: NestJS
* Language: TypeScript
* Database: Firebase Firestore
* Authentication: Firebase Authentication
* Version Control: Git & GitHub

---

# 1. Introduction

## 1.1 Purpose

The purpose of StationOps is to digitize and automate operational workflows within petrol stations through a secure, scalable, and cloud-based platform.

Version 1.0 focuses on the Cash Drop Management module, replacing the existing paper-based cash drop process with a digital workflow that improves accountability, efficiency, and record keeping.

---

## 1.2 Scope

The initial release of StationOps will provide functionality for:

* User authentication
* Role-based access control
* Cash drop creation
* Cash drop verification
* Variance recording
* Reporting
* Audit logging

The system will support multiple petrol stations from the initial design.

---

# 2. Business Background

The current cash drop process is manual.

Sales Assistants write cash drop information in a physical cash drop book containing carbon-copy pages. One copy is attached to the deposited cash while another remains in the book.

Cashiers later retrieve the deposited cash from the safe and manually compare the recorded amounts with the physical cash before preparing the MIS report.

Although functional, the process is time-consuming, paper-based, difficult to audit, and susceptible to manual errors.

---

# 3. Problem Statement

The current manual process presents several operational challenges:

* Heavy dependence on paper records.
* Time-consuming verification.
* Difficulty retrieving historical records.
* Increased possibility of human error.
* Slow discrepancy investigations.
* Limited visibility into cash drop history.
* No centralized digital audit trail.

---

# 4. Project Objectives

## Business Objectives

* Reduce paperwork.
* Improve accountability.
* Improve operational efficiency.
* Simplify cash verification.
* Support audit activities.

## Technical Objectives

* Build a scalable cloud-based system.
* Support multiple petrol stations.
* Maintain complete audit history.
* Secure data using role-based access control.
* Build using modern backend technologies.

---

# 5. User Roles

## Sales Assistant

Responsibilities:

* Create cash drops.
* View own cash drops.
* Manage own shift activities.

---

## Cashier

Responsibilities:

* View all cash drops.
* Verify cash drops.
* Record actual cash counted.
* Record variances.

---

## Supervisor

Responsibilities:

* Review cash variances.
* Investigate discrepancies.
* Resolve cash-related issues.

---

## Auditor

Responsibilities:

* View historical records.
* Generate audit reports.

---

## Administrator (Future)

Responsibilities:

* Manage users.
* Manage stations.
* Configure system settings.

---

# 6. Business Rules

1. A Sales Assistant should not retain more than KES 10,000 in cash.

2. Cash drops may be performed below KES 10,000 when necessary, such as at the end of a shift.

3. Only authenticated users may access the system.

4. Sales Assistants may only view their own cash drops.

5. Cashiers may view all cash drops.

6. Cashiers cannot modify the expected amount submitted by a Sales Assistant.

7. During verification, the Cashier records the actual amount found.

8. Variances are automatically calculated.

9. Variance investigations are handled by Supervisors.

10. Every significant action shall be logged for auditing purposes.

---

# 7. Cash Drop Workflow

1. Sales Assistant logs into StationOps.
2. Sales Assistant creates a cash drop.
3. System records:

   * Expected amount
   * Date
   * Time
   * Station
   * User
4. Status becomes "Pending Verification".
5. Cashier retrieves deposits from the safe.
6. Cashier records the actual amount counted.
7. System calculates the variance automatically.
8. If there is no variance, the cash drop is marked as "Verified".
9. If a variance exists, the cash drop is marked as "Variance Found" and referred to the Supervisor for investigation.

---

# 8. Functional Requirements

The system shall:

* Authenticate users.
* Authorize users based on roles.
* Create cash drops.
* View cash drops.
* Search cash drops.
* Filter cash drops.
* Verify cash drops.
* Record actual cash counted.
* Calculate variances.
* Generate reports.
* Maintain audit logs.

---

# 9. Non-Functional Requirements

The system shall be:

* Secure
* Reliable
* Scalable
* Maintainable
* Responsive
* Auditable

---

# 10. Future Modules

Future versions of StationOps may include:

* Shift Management
* Fuel Sales
* M-Pesa Reconciliation
* Tank Management
* Inventory Management
* Notifications
* Dashboard & Analytics

---

# 11. Developer Mapping

| Business Requirement | Planned NestJS Module | Planned Firebase Collection |
| -------------------- | --------------------- | --------------------------- |
| Authentication       | auth                  | users                       |
| Cash Drops           | cash-drops            | cashDrops                   |
| Verification         | verifications         | verifications               |
| Users                | users                 | users                       |
| Stations             | stations              | stations                    |
| Reports              | reports               | reports                     |
| Audit Logs           | audit-logs            | auditLogs                   |

---

# Version History

| Version | Date          | Description                                              |
| ------- | ------------- | -------------------------------------------------------- |
| 1.0     | Initial Draft | First software requirements specification for StationOps |
