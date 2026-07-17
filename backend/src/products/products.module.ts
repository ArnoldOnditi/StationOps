import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository/products.repository';

import { FirebaseModule } from '../firebase/firebase.module';
import { IdGeneratorModule } from '../id-generator/id-generator.module';
import { AuditModule } from '../audit/audit.module';
import { AuthModule } from '../auth/auth.module';
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
    ProductsController,
  ],

  providers: [
    ProductsService,
    ProductsRepository,
  ],

  exports: [
    ProductsService,
    ProductsRepository,
  ],
})
export class ProductsModule {}