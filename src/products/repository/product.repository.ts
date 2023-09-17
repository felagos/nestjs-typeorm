import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { slugify } from '../../utils/string.util';
import { CreateProductDto } from '../dto/create-product.dto';
import { FilterProductDto } from '../dto/filter-product.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
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
    newProduct.slug = slugify(product.slug);
    newProduct.stock = product.stock;
    newProduct.size = product.size;
    newProduct.gender = product.gender;

    return this.productRepository.save(newProduct);
  }

  filter(filter: FilterProductDto) {
    let query = this.productRepository.createQueryBuilder();

    if (isUUID(filter.term)) {
      query = query.where('id = :id');
      query.setParameter('id', filter.term);
    }

    query = query.orWhere('title ilike :title');
    query.setParameter('title', `%${filter.term}%`);

    if (filter.price) {
      query = query.orWhere('price >= :price');
      query.setParameter('price', filter.price);
    }

    if (filter.slug) {
      query = query.orWhere('slug ilike :slug');
      query.setParameter('slug', `%${filter.slug}%`);
    }

    if (filter.gender) {
      query = query.orWhere('gender ilike :gender');
      query.setParameter('gender', `%${filter.gender}%`);
    }

    if (filter.size) {
      query = query.orWhere(':size = any(size)');
      query.setParameter('size', filter.size);
    }

    console.log('query filter', query.getSql(), query.getParameters());

    return query.getMany();
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

  async update(id: string, product: UpdateProductDto) {
    const productUpdated = await this.productRepository.preload({
      id,
      ...product,
    });

    if (productUpdated) this.productRepository.save(productUpdated);

    return productUpdated;
  }
}
