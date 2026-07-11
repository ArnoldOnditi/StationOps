import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  roleId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  permissions: string[];

  @IsBoolean()
  isActive: boolean;
}