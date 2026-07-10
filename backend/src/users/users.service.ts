import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { FirebaseService } from '../firebase/firebase.service';
import { IdGeneratorService } from '../id-generator/id-generator.service';

import { UsersRepository } from './users.repository/users.repository';

import { AuditService } from '../audit/audit.service';
import { AuditAction } from '../audit/enums/audit-action.enum';
import { AuditModule } from '../audit/enums/audit-module.enum';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';

import { EmploymentStatus } from './enums/employment-status.enum';

import { detectChanges } from '../audit/utils/audit-change-detector';

@Injectable()
export class UsersService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly idGeneratorService: IdGeneratorService,
    private readonly usersRepository: UsersRepository,
    private readonly auditService: AuditService,
  ) {}
    async createUser(createUserDto: CreateUserDto) {
    console.log('📥 New User Request Received');

    // Check if employee number already exists
    const existingEmployee =
      await this.usersRepository.findByEmployeeNumber(
        createUserDto.employeeNumber,
      );

    if (existingEmployee) {
      throw new ConflictException({
        success: false,
        message: 'Employee number already exists.',
      });
    }

    // Create Firebase Authentication account
    const firebaseUser =
      await this.firebaseService.createAuthUser(
        createUserDto.email,
        'StnOps#2026',
        `${createUserDto.firstName} ${createUserDto.lastName}`,
      );

    // Generate StationOps User ID
    const userId =
      await this.idGeneratorService.generateId('USER');

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

      employmentStatus: EmploymentStatus.ACTIVE,

      createdAt: new Date(),
      updatedAt: new Date(),

      createdBy: 'SYSTEM',
    };

    await this.usersRepository.createUser(
      userId,
      employeeProfile,
    );

    await this.auditService.logAction({
      module: AuditModule.USERS,
      action: AuditAction.CREATE,
      performedBy: 'SYSTEM',
      targetId: userId,
      description: 'Employee created',

      changes: {
        employeeNumber: {
          new: employeeProfile.employeeNumber,
        },
        fullName: {
          new: employeeProfile.fullName,
        },
        stationId: {
          new: employeeProfile.stationId,
        },
        roleId: {
          new: employeeProfile.roleId,
        },
        employmentStatus: {
          new: employeeProfile.employmentStatus,
        },
      },
    });

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
      async getUserById(userId: string) {
    const user =
      await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException({
        success: false,
        message: 'User not found.',
      });
    }

    return {
      success: true,
      data: user,
    };
  }

  async getAllUsers(query: QueryUsersDto) {
    const result =
      await this.usersRepository.findAll(query);

    return {
      success: true,
      ...result,
    };
  }
    async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ) {
    // Check if user exists
    const existingUser =
      await this.usersRepository.findById(userId);

    if (!existingUser) {
      throw new NotFoundException({
        success: false,
        message: 'User not found.',
      });
    }

    // Ensure employee number is unique
    if (
      updateUserDto.employeeNumber &&
      updateUserDto.employeeNumber !==
        existingUser.employeeNumber
    ) {
      const duplicateEmployee =
        await this.usersRepository.findByEmployeeNumberExcludingUser(
          updateUserDto.employeeNumber,
          userId,
        );

      if (duplicateEmployee) {
        throw new ConflictException({
          success: false,
          message: 'Employee number already exists.',
        });
      }
    }

    // Prevent protected fields from being updated
    const {
      userId: ignoredUserId,
      firebaseUid,
      employeeNumber,
      createdAt,
      createdBy,
      ...allowedUpdates
    } = updateUserDto as any;

    await this.usersRepository.updateUser(
      userId,
      allowedUpdates,
    );

    // Retrieve updated document
    const updatedUser =
      await this.usersRepository.findById(userId);

    if (!updatedUser) {
      throw new NotFoundException({
        success: false,
        message: 'Updated user not found.',
      });
    }

    // Detect changes
    const changes = detectChanges(
      existingUser,
      updatedUser,
      [
        'updatedAt',
        'createdAt',
        'createdBy',
        'firebaseUid',
        'userId',
      ],
    );

    // Write audit log
    await this.auditService.logAction({
      module: AuditModule.USERS,
      action: AuditAction.UPDATE,
      performedBy: 'SYSTEM',
      targetId: userId,
      description: 'Employee updated',
      changes,
    });

    return {
      success: true,
      message: 'Employee updated successfully.',
      data: updatedUser,
    };
  }
    async deactivateUser(userId: string) {
    const user =
      await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException({
        success: false,
        message: 'User not found.',
      });
    }

    if (
      user.employmentStatus ===
      EmploymentStatus.INACTIVE
    ) {
      return {
        success: false,
        message: 'Employee is already inactive.',
      };
    }

    await this.usersRepository.deactivateUser(userId);

    await this.auditService.logAction({
      module: AuditModule.USERS,
      action: AuditAction.DEACTIVATE,
      performedBy: 'SYSTEM',
      targetId: userId,
      description: 'Employee deactivated',

      changes: {
        employmentStatus: {
          old: EmploymentStatus.ACTIVE,
          new: EmploymentStatus.INACTIVE,
        },
      },
    });

    return {
      success: true,
      message: 'Employee deactivated successfully.',
    };
  }

  async reactivateUser(userId: string) {
    const user =
      await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException({
        success: false,
        message: 'User not found.',
      });
    }

    if (
      user.employmentStatus ===
      EmploymentStatus.ACTIVE
    ) {
      return {
        success: false,
        message: 'Employee is already active.',
      };
    }

    await this.usersRepository.reactivateUser(userId);

    const updatedUser =
      await this.usersRepository.findById(userId);

    if (!updatedUser) {
      throw new NotFoundException({
        success: false,
        message: 'Updated user not found.',
      });
    }

    await this.auditService.logAction({
      module: AuditModule.USERS,
      action: AuditAction.REACTIVATE,
      performedBy: 'SYSTEM',
      targetId: userId,
      description: 'Employee reactivated',

      changes: {
        employmentStatus: {
          old: EmploymentStatus.INACTIVE,
          new: EmploymentStatus.ACTIVE,
        },
      },
    });

    return {
      success: true,
      message: 'Employee reactivated successfully.',
      data: updatedUser,
    };
  }
}