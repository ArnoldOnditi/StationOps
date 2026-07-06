import { Module } from '@nestjs/common';
import { IdGeneratorService } from './id-generator.service';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [IdGeneratorService],
  exports: [IdGeneratorService],
})
export class IdGeneratorModule {}