import { Exclude, Expose } from 'class-transformer';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Customer } from './customer.entity';
import { OrderProduct } from './order-product.entity';

// 👈 new entity
@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Exclude()
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProducts: OrderProduct[];

  @Expose()
  get products() {
    if (this.orderProducts) {
      return this.orderProducts
        .filter((product) => !!product) // !!valor es similar a decir valor!=null y valor!=undefined
        .map((product) => ({
          ...product.product,
          quantity: product.quantity,
          orderProductId: product.id,
        }));
    }
    return [];
  }

  @Expose()
  get total() {
    if (this.orderProducts) {
      return this.orderProducts
        .filter(product => !!product)
        .reduce((total, product) => {
          const totalProduct = product.product.price * product.quantity;
          return total + totalProduct;
        }, 0);
    }
    return 0;
  }
}
