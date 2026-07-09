import { Module } from '@nestjs/common';

import { FirebaseModule } from '../firebase/firebase.module';
import { UsersModule } from '../users/users.module';

import { AuthService } from './auth.service';
import { FirebaseAuthGuard } from './firebase-auth.guard';

@Module({
  imports: [
    FirebaseModule,
    UsersModule,
  ],

  providers: [
    AuthService,
    FirebaseAuthGuard,
  ],

  exports: [
    AuthService,
    FirebaseAuthGuard,
  ],
})
export class AuthModule {}