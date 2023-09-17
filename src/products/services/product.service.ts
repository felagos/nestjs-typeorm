import { Injectable } from '@nestjs/common';

import { CreateProductDto } from '../dto/create-product.dto';
import { FilterProductDto } from '../dto/filter-product.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
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
