import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './controller/product.controller';
import { Product, ProductImage } from './entities';
import { ProductRepository } from './repository/product.repository';
import { ProductImageRepository } from './repository/product-image.repository';
import { ProductService } from './services/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, ProductImageRepository],
})
export class ProductsModule {}
