import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Get, Param, Post, Patch, Delete, } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Query } from '@nestjs/common';
import { QueryUsersDto } from './dto/query-users.dto';
import { UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '../auth/enums/permission.enum';
import { PermissionsGuard } from '../auth/guards/permissions.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }
  @Get(':id')
async getUserById(
  @Param('id') id: string,
) {
  return await this.usersService.getUserById(id);
}
  
  @Patch(':id')
async updateUser(
  @Param('id') userId: string,
  @Body() updateUserDto: UpdateUserDto,
) {
  return this.usersService.updateUser(
    userId,
    updateUserDto,
  );
}
  @Delete(':id')
async deactivateUser(
  @Param('id') userId: string,
) {
  return this.usersService.deactivateUser(userId);
}
  @Patch(':id/reactivate')
async reactivateUser(
  @Param('id') userId: string,
) {
  return this.usersService.reactivateUser(userId);
}
 @Get()
@UseGuards(
  FirebaseAuthGuard,
  PermissionsGuard,
)
@Permissions(Permission.USER_VIEW)
findAll(
  @Query() query: QueryUsersDto,
) {
  return this.usersService.getAllUsers(query);
}
}