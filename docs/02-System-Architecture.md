# StationOps System Architecture

**Version:** 1.0

**Project:** StationOps

**Current Module:** Cash Drop Management

**Prepared By:** Arnold Onditi

---

# 1. Purpose

This document describes the overall architecture of StationOps and explains how the different components of the system interact.

The architecture has been designed to support a secure, scalable, maintainable, and modular application capable of serving multiple petrol stations while remaining flexible enough to accommodate future operational modules.

---

# 2. Architectural Goals

The architecture of StationOps is designed to achieve the following goals:

* Modular design
* Scalability
* Maintainability
* Security
* High cohesion
* Low coupling
* Separation of concerns
* Future extensibility

---

# 3. High-Level Architecture

StationOps follows a layered architecture.

```text
User
   │
   ▼
Web Browser
   │
HTTPS
   │
   ▼
NestJS Backend
   │
   ├── Controllers
   ├── Guards
   ├── Validation
   ├── Services
   └── Repositories
   │
   ▼
Firebase Authentication
   │
   ▼
Firebase Firestore
```

Each layer has a clearly defined responsibility and communicates only with the adjacent layer.

---

# 4. Request Lifecycle

Every request follows the same processing sequence.

1. User performs an action from the browser.
2. The browser sends an HTTPS request.
3. NestJS authenticates the user.
4. Authorization checks verify user permissions.
5. Request data is validated.
6. The Controller receives the request.
7. The Service applies business rules.
8. The Repository communicates with Firebase.
9. Firebase returns the result.
10. NestJS returns an HTTP response to the browser.

---

# 5. Layer Responsibilities

## Browser

Responsibilities:

* Display user interface
* Collect user input
* Display responses

The browser must never enforce business rules.

---

## Controllers

Responsibilities:

* Receive HTTP requests
* Call the appropriate service
* Return HTTP responses

Controllers should contain minimal business logic.

---

## Guards

Responsibilities:

* Authenticate users
* Authorize access to protected resources

Guards prevent unauthorized access before business logic is executed.

---

## Validation

Responsibilities:

* Validate request data
* Reject invalid requests before processing

Examples include checking required fields, numeric values, and acceptable ranges.

---

## Services

Responsibilities:

* Implement business rules
* Coordinate application workflows
* Call repositories
* Generate business responses

Services represent the core business logic of StationOps.

---

## Repositories

Responsibilities:

* Read data from Firebase
* Write data to Firebase
* Isolate database-specific operations

Repositories shield the rest of the application from database implementation details.

---

## Firebase

Responsibilities:

* Store application data
* Retrieve application data
* Provide secure cloud-based persistence

Firebase is responsible for data storage and retrieval, not business decisions.

---

# 6. Module Architecture

StationOps follows a feature-based modular architecture.

Initial modules include:

* Authentication
* Users
* Stations
* Cash Drops
* Verifications
* Reports
* Audit Logs
* Common
* Firebase

Each module contains its own controllers, services, DTOs, interfaces, and related files.

---

# 7. Authentication and Authorization

Authentication verifies the identity of a user.

Authorization determines the actions that an authenticated user is permitted to perform.

StationOps will use Firebase Authentication combined with role-based access control (RBAC).

Example roles include:

* Sales Assistant
* Cashier
* Supervisor
* Auditor
* Administrator

---

# 8. Data Access Strategy

Business logic must never communicate directly with Firebase.

Instead, the following flow will be used:

Service

↓

Repository

↓

Firebase

This separation allows the database implementation to change in the future with minimal impact on business logic.

---

# 9. Error Handling Strategy

The system shall provide consistent error handling.

Examples include:

* Invalid login credentials
* Unauthorized access
* Validation failures
* Missing resources
* Database failures

Error messages should be meaningful while avoiding exposure of sensitive implementation details.

---

# 10. Logging and Audit Strategy

Every significant business action should be recorded.

Examples include:

* User login
* Cash drop creation
* Cash verification
* Variance recording
* Supervisor review

Audit logs improve accountability and simplify investigations.

---

# 11. Scalability Considerations

The architecture supports:

* Multiple petrol stations
* Additional operational modules
* Future mobile applications
* Increased user volume
* Additional reporting capabilities

---

# 12. Architectural Decisions

| Decision                   | Reason                                |
| -------------------------- | ------------------------------------- |
| Multi-station architecture | Future scalability                    |
| Feature-based modules      | Better maintainability                |
| NestJS backend             | Enterprise modular framework          |
| Firebase Firestore         | Managed cloud database                |
| Repository layer           | Decouples business logic from storage |
| Role-Based Access Control  | Improved security                     |

---

# 13. Future Architecture

Future versions of StationOps may include:

* Fuel Sales
* Shift Management
* Tank Management
* Inventory Management
* M-Pesa Reconciliation
* Notifications
* Analytics Dashboard

The architecture has been intentionally designed so these modules can be added without major redesign.

---

# 14. Developer Mapping

| Architectural Concept | NestJS Implementation   |
| --------------------- | ----------------------- |
| Request Handling      | Controllers             |
| Business Logic        | Services                |
| Authentication        | Guards                  |
| Authorization         | Guards + Roles          |
| Validation            | DTOs + Validation Pipes |
| Data Access           | Repositories            |
| Persistence           | Firebase Firestore      |

---

# Conclusion

The StationOps architecture separates user interaction, business logic, security, and data storage into independent layers. This design improves maintainability, supports future growth, and ensures that business rules remain centralized within the backend. The feature-based modular structure allows new operational capabilities to be introduced with minimal impact on existing functionality, providing a strong foundation for the long-term evolution of the StationOps platform.
