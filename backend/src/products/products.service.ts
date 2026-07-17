import { Injectable } from '@nestjs/common';

import { ProductsRepository } from './products.repository/products.repository';
import { IdGeneratorService } from '../id-generator/id-generator.service';
import { AuditService } from '../audit/audit.service';
import { ConflictException } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';

import { ProductStatus } from './enums/product-status.enum';

import { AuditAction } from '../audit/enums/audit-action.enum';
import { AuditModule } from '../audit/enums/audit-module.enum';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly idGeneratorService: IdGeneratorService,
    private readonly auditService: AuditService,
  ) {}
  async createProduct(
  createProductDto: CreateProductDto,
  user: any,
) {
  console.log('📥 New Product Request Received');

  // Check duplicate product code
  const existingProduct =
    await this.productsRepository.findByCode(
      createProductDto.code,
    );

  if (existingProduct) {
    throw new ConflictException({
      success: false,
      message: 'Product code already exists.',
    });
  }

  // Generate Product ID
  const productId =
    await this.idGeneratorService.generateId('PRD');

  const product = {
    productId,

    code: createProductDto.code,
    name: createProductDto.name,
    description:
      createProductDto.description ?? null,
    unit: createProductDto.unit,

    status: ProductStatus.ACTIVE,

    createdBy: user.userId,

    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await this.productsRepository.createProduct(
    productId,
    product,
  );

  await this.auditService.logAction({
    module: AuditModule.PRODUCTS,
    action: AuditAction.CREATE,
    performedBy: user.userId,
    targetId: productId,
    description: 'Product created',

    changes: {
      code: {
        new: product.code,
      },
      name: {
        new: product.name,
      },
      unit: {
        new: product.unit,
      },
      status: {
        new: product.status,
      },
    },
  });

  return {
    success: true,
    message: 'Product created successfully.',
    data: product,
  };
}
}