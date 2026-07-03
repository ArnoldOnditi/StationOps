import { Injectable } from '@nestjs/common';
import { AuditLog } from './interfaces/audit-log.interface';

@Injectable()
export class AuditService {
  log(entry: AuditLog): void {
    console.log('📜 AUDIT EVENT');
    console.log(entry);
  }
}