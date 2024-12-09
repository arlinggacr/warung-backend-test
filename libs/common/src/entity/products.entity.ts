import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'category_id', type: 'int', nullable: true })
  categoryId: number;

  @Column({
    name: 'category_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  categoryName: string;

  @Column({
    name: 'sku',
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
  })
  sku: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'weight', type: 'int', nullable: true })
  weight: number;

  @Column({ name: 'width', type: 'int', nullable: true })
  width: number;

  @Column({ name: 'length', type: 'int', nullable: true })
  length: number;

  @Column({ name: 'height', type: 'int', nullable: true })
  height: number;

  @Column({ name: 'image', type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ name: 'price', type: 'int', nullable: true })
  price: number;
}
