import { Injectable } from '@nestjs/common';

import { AuditRepository } from './audit.repository/audit.repository';
import { IdGeneratorService } from '../id-generator/id-generator.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';

@Injectable()
export class AuditService {
  constructor(
    private readonly auditRepository: AuditRepository,
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  async logAction(auditData: Omit<CreateAuditLogDto, 'auditId'>) {
    const auditId = await this.idGeneratorService.generateId('AUD');

    await this.auditRepository.createAuditLog({
      auditId,
      ...auditData,
    });

    console.log(`📝 Audit Log Created: ${auditId}`);

    return auditId;
  }
}