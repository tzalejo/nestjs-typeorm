// src/users/entities/order.entity.ts
import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';

export class Order { // 👈 new entity
  date: Date;
  user: User;
  products: Product[];
}
