import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './orders.entity';
import { Product } from './products.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => Product, (product) => product.id, { eager: true })
  product: Product;

  @Column({ name: 'quantity', type: 'int' })
  quantity: number;

  @Column({ name: 'price_per_item', type: 'decimal' })
  pricePerItem: number;
}
