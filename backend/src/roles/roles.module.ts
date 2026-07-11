import { Module } from '@nestjs/common';

import { FirebaseModule } from '../firebase/firebase.module';

import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RolesRepository } from './roles.repository/roles.repository';

@Module({
  imports: [FirebaseModule],

  controllers: [RolesController],

  providers: [
    RolesService,
    RolesRepository,
  ],

  exports: [
    RolesService,
    RolesRepository,
  ],
})
export class RolesModule {}