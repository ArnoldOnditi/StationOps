import { Module } from '@nestjs/common';

import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';

import { AuditRepository } from './audit.repository/audit.repository';

import { FirebaseModule } from '../firebase/firebase.module';
import { IdGeneratorModule } from '../id-generator/id-generator.module';

@Module({
  imports: [
    FirebaseModule,
    IdGeneratorModule,
  ],
  controllers: [AuditController],
  providers: [
    AuditService,
    AuditRepository,
  ],
  exports: [
    AuditService,
  ],
})
export class AuditModule {}