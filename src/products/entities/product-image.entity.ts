import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from './product.entity';

@Entity({ name: 'product-images' })
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'url',
    length: 250,
  })
  url: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
