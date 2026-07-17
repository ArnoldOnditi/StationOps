import {
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

import { ProductStatus } from '../enums/product-status.enum';

export class QueryProductsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}