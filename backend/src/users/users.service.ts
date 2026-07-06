import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IdGeneratorService } from '../id-generator/id-generator.service';
import { UsersRepository } from './users.repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly firebaseService: FirebaseService,
    private readonly idGeneratorService: IdGeneratorService,
     private readonly usersRepository: UsersRepository,
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
    const employeeProfile = {
  userId,
  firebaseUid: firebaseUser.uid,

  employeeNumber: createUserDto.employeeNumber,

  firstName: createUserDto.firstName,
  lastName: createUserDto.lastName,
  fullName: `${createUserDto.firstName} ${createUserDto.lastName}`,

  email: createUserDto.email,
  phoneNumber: createUserDto.phoneNumber,

  roleId: createUserDto.roleId,
  stationId: createUserDto.stationId,

  employmentStatus: 'ACTIVE',

  createdAt: new Date(),
  updatedAt: new Date(),

  createdBy: 'SYSTEM',
};
await this.usersRepository.createUser(
  userId,
  employeeProfile,
);

   return {
  success: true,
  message: 'Employee created successfully.',

  data: {
    userId,
    firebaseUid: firebaseUser.uid,
    fullName: employeeProfile.fullName,
    email: employeeProfile.email,
    roleId: employeeProfile.roleId,
    stationId: employeeProfile.stationId,
    employmentStatus: employeeProfile.employmentStatus,
  },
};
  }
}