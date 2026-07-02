# API Design

## 1. Introduction

This document defines the REST API specification for the StationOps platform.

The API provides secure communication between frontend applications (PDQ terminals, web dashboard and future mobile applications) and the StationOps backend.

The backend is responsible for authentication, authorization, business rule enforcement, data validation and communication with Firebase Firestore.

All API communication uses HTTPS and JSON.

---

# 2. API Standards

## Architecture

Client

↓

REST API

↓

NestJS Backend

↓

Firebase Firestore

---

## Base URL

Development

```
http://localhost:3000/api/v1
```

Production

```
https://api.stationops.com/api/v1
```

---

## Data Format

All requests and responses use JSON.

Example Request

```json
{
    "amount":10000
}
```

Example Response

```json
{
    "dropId":"KSM-CD-2026-000145",
    "status":"CREATED"
}
```

---

## Authentication

All protected endpoints require a Firebase Authentication token.

```
Authorization: Bearer <firebase_token>
```

The backend validates the token before processing any request.

---

## Standard Response Format

Successful Response

```json
{
    "success":true,
    "data":{}
}
```

Failed Response

```json
{
    "success":false,
    "message":"Validation failed."
}
```

---

# 3. Authentication APIs

## Login

### Endpoint

```
POST /api/v1/auth/login
```

### Description

Validates the Firebase token and initializes a StationOps user session.

### Request

```json
{
    "firebaseToken":"<firebase_token>"
}
```

### Successful Response

```json
{
    "success":true,
    "data":{
        "sessionId":"SES-20260702-0001",

        "user":{
            "userId":"USR-001",
            "fullName":"Arnold Onditi",
            "role":"Sales Assistant"
        },

        "station":{
            "stationId":"KSM001",
            "stationName":"Kisumu Station"
        },

        "device":{
            "deviceId":"PDQ-002",
            "deviceName":"Pump 2 PDQ"
        },

        "permissions":[
            "cashdrop.create",
            "cashdrop.read.own"
        ]
    }
}
```

### Business Rules

- Firebase token must be valid.
- User account must be active.
- User must belong to a station.
- Device assignment is verified.
- Session is created.
- Login recorded in Audit Log.

---

## Logout

### Endpoint

```
POST /api/v1/auth/logout
```

### Description

Ends the active user session.

Business Rules

- Session closed.
- Logout time recorded.
- Audit log created.

---

# 4. User APIs

## Get Current User

### Endpoint

```
GET /api/v1/users/me
```

Returns information about the currently logged-in user.

---

## Get My Permissions

### Endpoint

```
GET /api/v1/users/me/permissions
```

Returns all permissions assigned to the authenticated user.

---

# 5. Cash Drop APIs

## Create Cash Drop

### Endpoint

```
POST /api/v1/cash-drops
```

### Request

```json
{
    "amount":10000
}
```

### Response

```json
{
    "success":true,
    "data":{
        "dropId":"KSM-CD-2026-000145",
        "amount":10000,
        "status":"CREATED",
        "printStatus":"PENDING",
        "qrCode":"<generated QR>"
    }
}
```

### Business Rules

- User must have permission to create a cash drop.
- Amount must be greater than zero.
- QR code generated automatically.
- Thermal receipt printed.
- Audit log created.

---

## Get My Cash Drops

### Endpoint

```
GET /api/v1/cash-drops/my
```

Returns only the authenticated Sales Assistant's cash drops.

---

## Get Cash Drop

### Endpoint

```
GET /api/v1/cash-drops/{dropId}
```

Returns detailed information about a single cash drop.

Authorization Rules

Sales Assistant

- Own records only.

Cashier

- All records.

Supervisor

- All records.

Administrator

- All records.

---

## Reprint Receipt

### Endpoint

```
POST /api/v1/cash-drops/{dropId}/reprint
```

Business Rules

- Sales Assistants may only reprint their own unverified cash drops.
- Cashiers, Supervisors and Administrators may reprint any receipt according to their permissions.
- Every reprint is recorded in the audit log.
- Receipt displays REPRINT and the reprint number.

---

# 6. Cash Verification APIs

## Verify Cash Drop

### Endpoint

```
POST /api/v1/cash-verifications
```

### Request

```json
{
    "dropId":"KSM-CD-2026-000145",
    "actualAmount":10000,
    "remarks":"Verified successfully."
}
```

### Business Rules

- Expected amount loaded automatically.
- Variance calculated by backend.
- Confirmation required before saving a variance.
- Verification becomes immutable after submission.
- Audit log created.

---

# 7. Audit APIs

## View Audit Logs

### Endpoint

```
GET /api/v1/audit-logs
```

Permissions Required

```
audit.view
```

Audit records are read-only.

---

# 8. Standard Error Responses

## Validation Error

HTTP 400

```json
{
    "success":false,
    "message":"Validation failed."
}
```

---

## Unauthorized

HTTP 401

```json
{
    "success":false,
    "message":"Authentication required."
}
```

---

## Forbidden

HTTP 403

```json
{
    "success":false,
    "message":"Access denied."
}
```

---

## Not Found

HTTP 404

```json
{
    "success":false,
    "message":"Resource not found."
}
```

---

## Internal Server Error

HTTP 500

```json
{
    "success":false,
    "message":"Unexpected server error."
}
```

---

# 9. HTTP Status Codes

| Code | Meaning |
|-------|---------|
| 200 | Success |
| 201 | Resource Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

# 10. Future APIs

Future modules will introduce APIs for:

- Fuel Sales
- Shift Management
- Banking
- Bank Collection
- Inventory
- Tank Measurements
- Reports
- Notifications
- Device Management