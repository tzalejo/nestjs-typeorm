import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderProductDto, UpdateOrderProductDto } from '../dtos/order-product.dto';
import { OrderProduct } from '../entities/order-product.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(OrderProduct)
    private orderProductRepository: Repository<OrderProduct>,
  ) {}

  async create(data: CreateOrderProductDto) {
    const order = await this.orderRepository.findOne(data.orderId);
    const product = await this.productRepository.findOne(data.productId);

    const orderProduct = new OrderProduct();

    orderProduct.order = order;
    orderProduct.product = product;
    orderProduct.quantity = data.quantity;
    return this.orderProductRepository.save(orderProduct);
  }
  async update(id: number, changes: UpdateOrderProductDto) {
    const item = await this.orderProductRepository.findOne(id);
    if (changes.orderId) {
      const order = await this.orderRepository.findOne(changes.orderId);
      item.order = order;
    }
    if (changes.productId) {
      const product = await this.productRepository.findOne(changes.productId);
      item.product = product;
    }
    this.orderProductRepository.merge(item, changes);
    return this.orderProductRepository.save(item);
  }

  async removeProductFromOrder(id: number) {
    const orderProduct = await this.orderProductRepository.findOne(id);
    if (!orderProduct) {
      throw new NotFoundException(`order-product #${id} not found`);
    }
    await this.orderProductRepository.delete(id);

    return orderProduct;
  }
}
