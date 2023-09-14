import { Injectable } from '@nestjs/common';

import { CreateProductDto } from '../dto/create-product.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  createProduct(product: CreateProductDto) {
    return this.productRepository.create(product);
  }

  findAll(pagination: PaginationDto) {
    return this.productRepository.findAll(pagination);
  }

  getOne(term: string) {
    return this.productRepository.findOne(term);
  }

  deleteById(id: string) {
    this.productRepository.deleteById(id);
  }
}
