import { Injectable } from '@nestjs/common';

import { CreateProductDto } from '../dto/create-product.dto';
import { FilterProductDto } from '../dto/filter-product.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductRepository } from '../repository/product.repository';
import { ProductImageRepository } from '../repository/product-image.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productImageRepository: ProductImageRepository,
  ) {}

  async createProduct(product: CreateProductDto) {
    const images = await this.productImageRepository.create(product.images);
    return this.productRepository.create(product, images);
  }

  findOne(id: string) {
    return this.productRepository.findById(id);
  }

  findAll(pagination: PaginationDto) {
    return this.productRepository.findAll(pagination);
  }

  filterProduct(filter: FilterProductDto) {
    return this.productRepository.filter(filter);
  }

  deleteById(id: string) {
    this.productRepository.deleteById(id);
  }

  updateProduct(id: string, product: UpdateProductDto) {
    this.productRepository.update(id, product);
  }
}
