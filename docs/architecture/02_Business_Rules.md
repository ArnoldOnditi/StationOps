# Business Rules

## Document Information

| Property | Value |
|----------|-------|
| Document | Business Rules |
| Version | 1.0 |
| Status | Approved |
| Project | StationOps |
| Last Updated | 14 July 2026 |

---

# Purpose

This document defines the operational business rules that govern how StationOps functions.

These rules are derived from actual fuel station operations and serve as the authoritative reference for software development.

---

# 1. Workforce Management

## Employee Roles

The system supports the following operational roles:

- Sales Assistant
- Cashier
- Supervisor
- Manager
- Administrator

Each role has different responsibilities and permissions.

---

## Shift Rotation

Sales Assistants follow a fixed rotation cycle.

6 Day Shifts

↓

1 Off Day

↓

6 Night Shifts

↓

2 Off Days

↓

Repeat

Each employee maintains an independent position within the rotation cycle.

---

## Pump Rotation

Pump allocation is managed by the Supervisor.

Business Rules

- One Sales Assistant is assigned to one pump.
- A pump can only have one Sales Assistant during a shift.
- Pump allocation rotates daily.
- Employees should rotate fairly across all pumps.

---

## Monthly Timetable

The monthly timetable is generated automatically by StationOps.

The Supervisor may review, edit and approve the generated timetable before publication.

The timetable shall support:

- Shift assignments
- Pump assignments
- Leave
- Off days

The timetable shall be printable and exportable.

---

# 2. Shift Management

Each station operates Day and Night shifts.

The Supervisor opens and closes shifts.

Only employees assigned to a shift may perform operational activities.

---

# 3. Sales Calculation

Fuel sales are determined using meter readings.

Business Formula

Closing Reading

−

Opening Reading

=

Litres Sold

Litres Sold

×

Product Selling Price

=

Gross Sales

Cash Sales are determined by subtracting all non-cash payments.

Cash Sales

=

Gross Sales

−

M-Pesa Sales

−

Invoice Sales

−

PDQ/Card Sales

---

# 4. Cash Management

Each Sales Assistant manages cash collected during their shift.

Cash is monitored continuously.

When required, the Sales Assistant creates a Cash Drop.

A Sales Assistant may create multiple Cash Drops during a shift.

Creating a new Cash Drop does not require previous drops to have been verified.

---

## Cash Drop Workflow

Sales Assistant creates Cash Drop

↓

Receipt printed

↓

Cash packaged with receipt

↓

Cash placed into safe

↓

Status = DROPPED

↓

Cashier verifies

↓

Status = VERIFIED

↓

Included in MIS

---

## Cash Drop Contents

A Cash Drop may contain:

- Notes
- Coins
- Multiple denominations

All denominations must be recorded.

---

## Cashier Verification

Cashier verifies:

- Drop amount
- Receipt
- Safe entry

If the amount matches:

Status becomes VERIFIED.

If there is a discrepancy:

Cashier escalates to Supervisor.

---

## Cash Shortage

If cash is missing:

Supervisor investigates.

Sales Assistant may:

- Pay immediately

or

- Accept recorded shortage.

---

## Cash Excess

If excess cash exists:

Supervisor investigates.

Supervisor determines appropriate action.

---

# 5. Safe Management

Cash deposited into the safe becomes Station Cash.

The system shall maintain the current safe balance.

Cash removed for banking decreases the safe balance.

---

# 6. Banking

Banking occurs on scheduled banking days.

Cashier prepares:

- MIS
- Banking summary
- Deposit

Safe balance decreases after successful banking.

---

# 7. Audit Rules

The following events must be audited:

- User Login
- User Creation
- User Update
- User Deactivation
- Role Changes
- Shift Opening
- Shift Closing
- Pump Assignment
- Cash Drop Creation
- Cash Drop Verification
- Banking
- Timetable Approval

---

# 8. Business Assumptions

The following assumptions have been confirmed.

| Rule | Status |
|------|--------|
| One Sales Assistant per pump | Confirmed |
| Pump rotation occurs daily | Confirmed |
| Rotation follows a 15-day cycle | Confirmed |
| Multiple Cash Drops per shift allowed | Confirmed |
| Cashier verifies drops | Confirmed |
| Supervisor resolves discrepancies | Confirmed |
| Timetable generated automatically | Confirmed |
| Timetable may be edited before approval | Confirmed |

---

# Guiding Principle

StationOps models actual fuel station operations.

Business rules always take precedence over software convenience.