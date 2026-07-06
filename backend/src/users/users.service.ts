import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IdGeneratorService } from '../id-generator/id-generator.service';

@Injectable()
export class UsersService {
  constructor(private readonly firebaseService: FirebaseService,
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    console.log('📥 New User Request Received');

    const firebaseUser = await this.firebaseService.createAuthUser(
      createUserDto.email,
      'StnOps#2026',
      `${createUserDto.firstName} ${createUserDto.lastName}`,
    );
    const userId = await this.idGeneratorService.generateId('USER');

console.log('Generated User ID:', userId);

    return {
      success: true,
      message: 'Firebase Authentication user created successfully.',
      userId,
      firebaseUid: firebaseUser.uid,
      email: firebaseUser.email,
    };
  }
}