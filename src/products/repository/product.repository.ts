import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { slugify } from '../../utils/string.util';
import { CreateProductDto } from '../dto/create-product.dto';
import { FilterProductDto } from '../dto/filter-product.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductImage } from '../entities';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    private readonly dataSource: DataSource,
  ) {}

  create(product: CreateProductDto, images: ProductImage[]) {
    const newProduct = new Product();

    newProduct.title = product.title;
    newProduct.price = product.price;
    newProduct.description = product.description;
    newProduct.slug = slugify(product.slug);
    newProduct.stock = product.stock;
    newProduct.size = product.size;
    newProduct.gender = product.gender;
    newProduct.images = images;

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

    query = query.leftJoinAndSelect('products.images', 'prodImages');

    console.log('query filter', query.getSql(), query.getParameters());

    return query.getMany();
  }

  findById(id: string) {
    return this.productRepository.findOneBy({ id });
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
      },
    });

    return products.map((product) => ({
      ...product,
      images: product.images.map((image) => image.url),
    }));
  }

  deleteById(id: string) {
    this.productRepository.delete({ id });
  }

  async update(id: string, product: UpdateProductDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { images, ...toUpdate } = product;

      const productUpdated = await this.productRepository.preload({
        id,
        ...toUpdate,
      });

      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } });
        productUpdated.images = images.map((image) =>
          this.productImageRepository.create({ url: image }),
        );
      }

      await queryRunner.manager.save(productUpdated);

      await queryRunner.commitTransaction();

      return productUpdated;
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
