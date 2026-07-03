import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    console.log('📥 New User Request Received');

    return {
      success: true,
      message: 'User request received successfully.',
      data: createUserDto,
    };
  }
}