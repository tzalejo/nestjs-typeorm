import {Exclude} from 'class-transformer';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

// 👈 new entity
@Entity({ name: 'orders_products' })
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Exclude()
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamp',
  })
  updateAt: Date;

  @ManyToOne(() => Product) // no hacemos la relacion vidireccional
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
