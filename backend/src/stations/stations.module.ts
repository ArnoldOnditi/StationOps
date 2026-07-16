import { Module } from '@nestjs/common';

import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';

import { FirebaseModule } from '../firebase/firebase.module';
import { IdGeneratorModule } from '../id-generator/id-generator.module';
import { AuditModule } from '../audit/audit.module';
import { AuthModule } from '../auth/auth.module';
import { StationsRepository } from './stations.repository/stations.repository';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    FirebaseModule,
    IdGeneratorModule,
    AuditModule,
    AuthModule,
    UsersModule,
    RolesModule,
  ],

  controllers: [
    StationsController,
  ],

  providers: [
    StationsService,
    StationsRepository,
  ],

  exports: [
    StationsService,
    StationsRepository,
  ],
})
export class StationsModule {}