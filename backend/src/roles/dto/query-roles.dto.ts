import {
  IsBooleanString,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

export class QueryRolesDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsBooleanString()
  isActive?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}