import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { IdGeneratorModule } from '../id-generator/id-generator.module';
import { UsersRepository } from './users.repository/users.repository';

@Module({
  imports: [FirebaseModule, IdGeneratorModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository]
})
export class UsersModule {}
