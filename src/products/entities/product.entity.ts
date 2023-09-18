import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProductImage } from './product-image.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    name: 'title',
    length: 250,
    unique: true,
  })
  title: string;

  @Column('numeric', { name: 'price' })
  price: number;

  @Column('varchar', { name: 'description', length: 250, nullable: true })
  description: string;

  @Column('varchar', { name: 'slug', length: 250, unique: false })
  slug: string;

  @Column('int', { name: 'stock', default: 0 })
  stock: number;

  @Column('varchar', { array: true, length: 10 })
  size: string[];

  @Column('varchar', { name: 'gender', length: 10 })
  gender: string;

  @Column('varchar', { array: true, default: [] })
  tags: string[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: false,
    eager: true,
  })
  images?: ProductImage[];
}
