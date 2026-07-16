# System Workflows

## Document Information

| Property | Value |
|----------|-------|
| Document | System Workflows |
| Version | 1.0 |
| Status | Approved |
| Project | StationOps |
| Last Updated | 14 July 2026 |

---

# Purpose

This document describes the major operational workflows supported by StationOps.

Each workflow represents a real business process carried out within a fuel station.

---

# Workflow 1 - User Login

```
User

↓

Enter Credentials

↓

Firebase Authentication

↓

Token Generated

↓

StationOps API

↓

Role Verification

↓

Permissions Loaded

↓

Dashboard Displayed
```

---

# Workflow 2 - Monthly Timetable Generation

```
Supervisor

↓

Select Month

↓

Load Employees

↓

Load Rotation Profiles

↓

Load Leave Requests

↓

Generate Timetable

↓

Generate Pump Rotation

↓

Supervisor Reviews

↓

Approve Timetable

↓

Publish Timetable
```

---

# Workflow 3 - Shift Opening

```
Supervisor

↓

Open Shift

↓

Verify Timetable

↓

Verify Employees

↓

Assign Pumps

↓

Shift Status = OPEN

↓

Sales Assistants Begin Work
```

---

# Workflow 4 - Pump Allocation

```
Supervisor

↓

View Available Pumps

↓

View Employees

↓

Automatic Rotation

↓

Manual Adjustments (Optional)

↓

Save Allocation

↓

Employees Receive Assignment
```

---

# Workflow 5 - Sales Calculation

```
Opening Meter Reading

↓

Fuel Sales

↓

Closing Meter Reading

↓

Litres Sold

↓

Multiply by Selling Price

↓

Gross Sales

↓

Payment Breakdown

↓

Expected Cash
```

---

# Workflow 6 - Payment Reconciliation

```
Gross Sales

↓

Import M-Pesa Sales

↓

Import PDQ Sales

↓

Record Invoice Sales

↓

Calculate Cash Sales

↓

Expected Cash Position
```

---

# Workflow 7 - Cash Drop

```
Sales Assistant

↓

Expected Cash Updated

↓

Create Cash Drop

↓

Enter Denominations

↓

Generate Receipt

↓

Print Receipt

↓

Place Cash into Safe

↓

Status = DROPPED
```

---

# Workflow 8 - Cash Verification

```
Cashier

↓

Open Pending Cash Drops

↓

Retrieve Cash

↓

Count Cash

↓

Compare with Receipt

↓

Amount Correct?

      │
 ┌────┴────┐
 │         │
Yes       No
 │         │
 │         ▼
 │    Escalate
 │    Supervisor
 │         │
 ▼         ▼

VERIFIED  SHORTAGE / EXCESS

↓

Update Safe Balance
```

---

# Workflow 9 - Banking

```
Scheduled Banking Day

↓

Cashier

↓

Prepare MIS

↓

Count Safe Balance

↓

Prepare Deposit

↓

Record Deposit

↓

Safe Balance Updated

↓

Banking Complete
```

---

# Workflow 10 - Shift Closing

```
Closing Meter Readings

↓

Sales Calculated

↓

Payments Reconciled

↓

Cash Verified

↓

MIS Generated

↓

Supervisor Reviews

↓

Shift Closed
```

---

# Workflow 11 - Audit Logging

```
User Action

↓

Business Logic

↓

Audit Service

↓

Audit Log Stored

↓

Action Completed
```

---

# Workflow Design Principles

All workflows must:

- Require authentication.
- Enforce authorization.
- Validate input.
- Record audit logs.
- Prevent inconsistent business states.
- Return meaningful responses.