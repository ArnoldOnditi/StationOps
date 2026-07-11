import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';

import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { QueryRolesDto } from './dto/query-roles.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
  ) {}

  @Post()
  createRole(
    @Body() createRoleDto: CreateRoleDto,
  ) {
    return this.rolesService.createRole(
      createRoleDto,
    );
  }
    @Get(':id')
getRoleById(
  @Param('id') roleId: string,
) {
  return this.rolesService.getRoleById(roleId);
}
  @Get()
getAllRoles(
  @Query() query: QueryRolesDto,
) {
  return this.rolesService.getAllRoles(query);
}
  @Patch(':id')
updateRole(
  @Param('id') roleId: string,
  @Body() updateRoleDto: UpdateRoleDto,
) {
  return this.rolesService.updateRole(
    roleId,
    updateRoleDto,
  );
}
  @Delete(':id')
deactivateRole(
  @Param('id') roleId: string,
) {
  return this.rolesService.deactivateRole(roleId);
}
  @Patch(':id/reactivate')
reactivateRole(
  @Param('id') roleId: string,
) {
  return this.rolesService.reactivateRole(roleId);
}
}