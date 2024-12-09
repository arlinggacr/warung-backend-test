import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  categoryId: number;

  @Column({ type: 'varchar', length: 255 })
  categoryName: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  sku: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int' })
  weight: number;

  @Column({ type: 'int' })
  width: number;

  @Column({ type: 'int' })
  length: number;

  @Column({ type: 'int' })
  height: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'int' })
  harga: number;
}
