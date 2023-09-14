import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './controller/product.controller';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductsModule {}
