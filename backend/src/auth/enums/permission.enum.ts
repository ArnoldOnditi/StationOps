export enum Permission {
  // =========================
  // Users
  // =========================
  USER_CREATE = 'USER_CREATE',
  USER_VIEW = 'USER_VIEW',
  USER_UPDATE = 'USER_UPDATE',
  USER_DEACTIVATE = 'USER_DEACTIVATE',

  // =========================
  // Roles
  // =========================
  ROLE_CREATE = 'ROLE_CREATE',
  ROLE_VIEW = 'ROLE_VIEW',
  ROLE_UPDATE = 'ROLE_UPDATE',
  ROLE_DEACTIVATE = 'ROLE_DEACTIVATE',

  // =========================
  // Stations
  // =========================
  STATION_CREATE = 'STATION_CREATE',
  STATION_VIEW = 'STATION_VIEW',
  STATION_UPDATE = 'STATION_UPDATE',

  // =========================
  // Reports
  // =========================
  REPORT_VIEW = 'REPORT_VIEW',
  REPORT_EXPORT = 'REPORT_EXPORT',

  // =========================
  // Audit
  // =========================
  AUDIT_VIEW = 'AUDIT_VIEW',

  // =========================
  // System
  // =========================
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
}