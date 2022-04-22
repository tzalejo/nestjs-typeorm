// src/users/entities/order.entity.ts
import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// 👈 new entity
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  user: User;

  @OneToMany((type) => Product, (product) => product.id)
  products: Product[];
}
