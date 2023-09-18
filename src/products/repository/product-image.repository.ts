import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductImage } from '../entities';

export class ProductImageRepository {
  constructor(
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
  ) {}

  create(images?: string[]) {
    if (!images) return [];
    return Promise.all(
      images?.map((image) => {
        const productImage = new ProductImage();
        productImage.url = image;

        return this.productImageRepository.save(productImage);
      }),
    );
  }
}
