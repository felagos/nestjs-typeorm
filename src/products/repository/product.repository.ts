import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from '../dto/create-product.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(product: CreateProductDto) {
    const newProduct = new Product();
    newProduct.title = product.title;
    newProduct.price = product.price;
    newProduct.description = product.description;
    newProduct.slug = product.slug;
    newProduct.stock = product.stock;
    newProduct.size = product.size;
    newProduct.gender = product.gender;

    return this.productRepository.save(newProduct);
  }

  findOne(term: string) {
    return this.productRepository.findOne({
      where: [{ id: term }, { slug: term }],
    });
  }

  findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;

    return this.productRepository.find({
      take: limit,
      skip: offset,
    });
  }

  deleteById(id: string) {
    this.productRepository.delete({ id });
  }
}
