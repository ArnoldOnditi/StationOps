import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { IdGeneratorModule } from '../id-generator/id-generator.module';
import { UsersRepository } from './users.repository/users.repository';
import { AuditModule } from '../audit/audit.module';
import { RolesModule } from '../roles/roles.module';


@Module({
  imports: [
    FirebaseModule,
    IdGeneratorModule,
    AuditModule,
    RolesModule,
  ],

  controllers: [
    UsersController,
  ],

  providers: [
    UsersService,
    UsersRepository,
  ],

  exports: [
    UsersService,
    UsersRepository,
  ],
})
export class UsersModule {}