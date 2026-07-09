export class CreateAuditLogDto {
  auditId: string;

  module: string;

  action: string;

  performedBy: string;

  targetId: string;

  description: string;

  changes: Record<string, any>;

  createdAt?: any;
}