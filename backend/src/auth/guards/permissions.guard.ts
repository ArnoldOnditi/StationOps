import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import {
  PERMISSIONS_KEY,
} from '../decorators/permissions.decorator';

import { Permission } from '../enums/permission.enum';

import { RolesRepository } from '../../roles/roles.repository/roles.repository';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const requiredPermissions =
      this.reflector.getAllAndOverride<Permission[]>(
        PERMISSIONS_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ],
      );

    // Endpoint doesn't require permissions
    if (!requiredPermissions) {
      return true;
    }

    const request =
      context.switchToHttp().getRequest();

    const user = request.user;

    if (!user) {
      throw new ForbiddenException(
        'User not authenticated.',
      );
    }

    const role =
      await this.rolesRepository.findById(
        user.roleId,
      );

    if (!role) {
      throw new ForbiddenException(
        'Role not found.',
      );
    }

    const permissions =
      role.permissions || [];

    const hasPermission =
      requiredPermissions.every(permission =>
        permissions.includes(permission),
      );

    if (!hasPermission) {
      throw new ForbiddenException(
        'Insufficient permissions.',
      );
    }

    return true;
  }
}