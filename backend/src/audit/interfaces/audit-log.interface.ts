export interface AuditLog {
  auditId: string;

  module: string;

  action: string;

  performedBy: string;

  performedByName: string;

  targetId?: string;

  stationId?: string;

  deviceId?: string;

  timestamp: Date;

  oldValue?: unknown;

  newValue?: unknown;

  result: string;

  remarks?: string;
}