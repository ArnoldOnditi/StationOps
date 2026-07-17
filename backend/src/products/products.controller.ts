import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ProductsService } from './products.service';

import { CreateProductDto } from './dto/create-product.dto';

import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';

import { Permissions } from '../auth/decorators/permissions.decorator';

import { Permission } from '../auth/enums/permission.enum';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  @UseGuards(
    FirebaseAuthGuard,
    PermissionsGuard,
  )
  @Permissions(Permission.PRODUCT_CREATE)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Req() request,
  ) {
    return this.productsService.createProduct(
      createProductDto,
      request.user,
    );
  }
}