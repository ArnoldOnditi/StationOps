import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { RolesRepository } from './roles.repository/roles.repository';
import { CreateRoleDto } from './dto/create-role.dto';
import { QueryRolesDto } from './dto/query-roles.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    private readonly rolesRepository: RolesRepository,
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const existingRole =
      await this.rolesRepository.findByRoleId(
        createRoleDto.roleId,
      );

    if (existingRole) {
      throw new ConflictException({
        success: false,
        message: 'Role ID already exists.',
      });
    }

    const role = {
      roleId: createRoleDto.roleId,
      name: createRoleDto.name,
      description: createRoleDto.description,
      permissions: createRoleDto.permissions,
      isActive: createRoleDto.isActive,
      createdBy: 'SYSTEM',
    };

    await this.rolesRepository.createRole(
      createRoleDto.roleId,
      role,
    );

    return {
      success: true,
      message: 'Role created successfully.',
      data: role,
    };
  }
  async getRoleById(roleId: string) {
  const role =
    await this.rolesRepository.findById(roleId);

  if (!role) {
    throw new NotFoundException({
      success: false,
      message: 'Role not found.',
    });
  }

  return {
    success: true,
    data: role,
  };
}
  async getAllRoles(
  query: QueryRolesDto,
) {
  const result =
    await this.rolesRepository.findAll(query);

  return {
    success: true,
    ...result,
  };
}
  async updateRole(
  roleId: string,
  updateRoleDto: UpdateRoleDto,
) {
  // Check if role exists
  const existingRole =
    await this.rolesRepository.findById(roleId);

  if (!existingRole) {
    throw new NotFoundException({
      success: false,
      message: 'Role not found.',
    });
  }

  // Prevent updating immutable fields
  const {
    roleId: ignoredRoleId,
    createdAt,
    createdBy,
    ...allowedUpdates
  } = updateRoleDto as any;

  await this.rolesRepository.updateRole(
    roleId,
    allowedUpdates,
  );

  const updatedRole =
    await this.rolesRepository.findById(roleId);

  if (!updatedRole) {
    throw new NotFoundException({
      success: false,
      message: 'Updated role not found.',
    });
  }

  return {
    success: true,
    message: 'Role updated successfully.',
    data: updatedRole,
  };
}
  async deactivateRole(roleId: string) {
  const role =
    await this.rolesRepository.findById(roleId);

  if (!role) {
    throw new NotFoundException({
      success: false,
      message: 'Role not found.',
    });
  }

  if (!role.isActive) {
    return {
      success: false,
      message: 'Role is already inactive.',
    };
  }

  await this.rolesRepository.deactivateRole(roleId);

  return {
    success: true,
    message: 'Role deactivated successfully.',
  };
}
  async reactivateRole(roleId: string) {
  const role =
    await this.rolesRepository.findById(roleId);

  if (!role) {
    throw new NotFoundException({
      success: false,
      message: 'Role not found.',
    });
  }

  if (role.isActive) {
    return {
      success: false,
      message: 'Role is already active.',
    };
  }

  await this.rolesRepository.reactivateRole(roleId);

  const updatedRole =
    await this.rolesRepository.findById(roleId);

  return {
    success: true,
    message: 'Role reactivated successfully.',
    data: updatedRole,
  };
}
}