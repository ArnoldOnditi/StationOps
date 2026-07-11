import { Module } from '@nestjs/common';

import { FirebaseModule } from '../firebase/firebase.module';
import { UsersModule } from '../users/users.module';

import { AuthService } from './auth.service';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';
import { AuthController } from './auth.controller';
import { PermissionsGuard } from './guards/permissions.guard';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    FirebaseModule,
    UsersModule,
    RolesModule,
  ],

  controllers: [
    AuthController,
  ],

  providers: [
    AuthService,
    FirebaseAuthGuard,
    PermissionsGuard,
  ],

  exports: [
    AuthService,
    FirebaseAuthGuard,
    PermissionsGuard,
  ],
})
export class AuthModule {}