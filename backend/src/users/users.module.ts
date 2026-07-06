import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { IdGeneratorModule } from '../id-generator/id-generator.module';

@Module({
  imports: [FirebaseModule, IdGeneratorModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
